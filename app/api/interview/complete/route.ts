import type { NextRequest } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";
import nodemailer from "nodemailer";
import { completeCall, type Answer, type Flag } from "@/lib/readiness-tickets";

const MAX_SIGNATURE_AGE_SECONDS = 30 * 60;

const CATEGORY_LABELS: Record<string, string> = {
  business_snapshot: "Business snapshot",
  team: "Team",
  systems_stack: "Systems stack",
  data_volumes: "Data volumes",
  weekly_time_sinks: "Weekly time sinks",
  customer_supplier_comms: "Customer & supplier comms",
  compliance: "Compliance",
  reporting: "Reporting",
  previous_ai_attempts: "Previous AI attempts",
  data_sensitivity: "Data sensitivity",
  budget: "Budget",
  success_definition: "Success definition",
};

type TranscriptTurn = { role?: string; message?: string; text?: string };

export async function POST(request: NextRequest) {
  const secret = process.env.IAN_WEBHOOK_SECRET;
  if (!secret) {
    console.error("IAN_WEBHOOK_SECRET not configured");
    return Response.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const rawBody = await request.text();
  const sigHeader = request.headers.get("elevenlabs-signature");
  if (!verifyElevenLabsSignature(sigHeader, rawBody, secret)) {
    return Response.json({ error: "Invalid signature" }, { status: 401 });
  }

  let event: Record<string, unknown>;
  try {
    event = JSON.parse(rawBody) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (event.type !== "post_call_transcription") {
    return Response.json({ ok: true, ignored: String(event.type ?? "unknown") });
  }

  const data = (event.data ?? {}) as Record<string, unknown>;
  const conversationId = typeof data.conversation_id === "string" ? data.conversation_id : undefined;
  const bookingId = extractBookingId(data);

  if (!bookingId) {
    console.error("complete webhook missing booking_id", { conversationId });
    return Response.json({ error: "Missing booking_id in dynamic variables" }, { status: 400 });
  }

  const state = await completeCall(bookingId);
  const transcript = extractTranscript(data);

  const subject = `Readiness Review — Ian transcript for booking ${bookingId}`;
  const markdown = buildMarkdown({
    bookingId,
    conversationId,
    answers: state.answers,
    flags: state.flags,
    callCount: state.callCount,
    transcript,
  });

  try {
    await emailGraham({ subject, markdown, bookingId });
  } catch (err) {
    console.error("complete webhook email failed:", err);
    return Response.json({ error: "Email failed" }, { status: 500 });
  }

  return Response.json({ ok: true, bookingId, answers: state.answers.length, flags: state.flags.length });
}

function extractBookingId(data: Record<string, unknown>): string | undefined {
  const init = (data.conversation_initiation_client_data ?? {}) as Record<string, unknown>;
  const fromInit = (init.dynamic_variables ?? {}) as Record<string, unknown>;
  const fromMeta = ((data.metadata ?? {}) as Record<string, unknown>).dynamic_variables as
    | Record<string, unknown>
    | undefined;
  const candidates = [fromInit.booking_id, fromMeta?.booking_id];
  for (const c of candidates) {
    if (typeof c === "string" && c.trim()) return c.trim();
  }
  return undefined;
}

function extractTranscript(data: Record<string, unknown>): TranscriptTurn[] {
  const t = data.transcript;
  if (!Array.isArray(t)) return [];
  return t.filter((x): x is TranscriptTurn => !!x && typeof x === "object");
}

function buildMarkdown(input: {
  bookingId: string;
  conversationId?: string;
  answers: Answer[];
  flags: Flag[];
  callCount: number;
  transcript: TranscriptTurn[];
}): string {
  const byCategory = new Map<string, Answer>();
  for (const a of input.answers) byCategory.set(a.category, a);

  const lines: string[] = [];
  lines.push(`# Readiness Review intake — booking ${input.bookingId}`);
  lines.push("");
  if (input.conversationId) lines.push(`ElevenLabs conversation: \`${input.conversationId}\``);
  lines.push(`Call count: ${input.callCount}`);
  lines.push("");

  lines.push(`## Answers`);
  lines.push("");
  for (const [slug, label] of Object.entries(CATEGORY_LABELS)) {
    const a = byCategory.get(slug);
    lines.push(`### ${label}`);
    if (!a) {
      lines.push("_Not covered._");
    } else {
      lines.push(`_Confidence: ${a.confidence}_`);
      lines.push("");
      lines.push(a.summary);
      if (a.quotes.length > 0) {
        lines.push("");
        lines.push("Direct quotes:");
        for (const q of a.quotes) lines.push(`> ${q}`);
      }
    }
    lines.push("");
  }

  lines.push(`## Uncertain — Graham to confirm`);
  lines.push("");
  if (input.flags.length === 0) {
    lines.push("_Nothing flagged._");
  } else {
    for (const f of input.flags) {
      lines.push(`- **${f.topic}** — ${f.detail}`);
    }
  }
  lines.push("");

  lines.push(`## Full transcript`);
  lines.push("");
  if (input.transcript.length === 0) {
    lines.push("_Transcript not included in webhook payload._");
  } else {
    for (const turn of input.transcript) {
      const role = turn.role === "agent" ? "Ian" : turn.role === "user" ? "Client" : turn.role ?? "?";
      const text = (turn.message ?? turn.text ?? "").trim();
      if (!text) continue;
      lines.push(`**${role}:** ${text}`);
      lines.push("");
    }
  }

  return lines.join("\n");
}

async function emailGraham(input: { subject: string; markdown: string; bookingId: string }) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) throw new Error("GMAIL_USER or GMAIL_APP_PASSWORD not configured");

  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  const html = `<pre style="font-family: ui-monospace, Menlo, monospace; font-size: 13px; white-space: pre-wrap;">${esc(
    input.markdown
  )}</pre>`;

  await transport.sendMail({
    from: `"Ian (Readiness intake)" <${user}>`,
    to: user,
    subject: input.subject,
    text: input.markdown,
    html,
    attachments: [
      {
        filename: `readiness-${input.bookingId}.md`,
        content: input.markdown,
        contentType: "text/markdown",
      },
    ],
  });
}

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function verifyElevenLabsSignature(header: string | null, rawBody: string, secret: string): boolean {
  if (!header) return false;

  const parts = header.split(",").reduce<Record<string, string>>((acc, p) => {
    const [k, v] = p.split("=", 2);
    if (k && v) acc[k.trim()] = v.trim();
    return acc;
  }, {});

  const timestamp = parts["t"];
  const signature = parts["v0"];
  if (!timestamp || !signature) return false;

  const ts = parseInt(timestamp, 10);
  if (Number.isNaN(ts)) return false;
  const age = Math.floor(Date.now() / 1000) - ts;
  if (Math.abs(age) > MAX_SIGNATURE_AGE_SECONDS) return false;

  const expected = createHmac("sha256", secret).update(`${timestamp}.${rawBody}`).digest("hex");
  const expectedBuf = Buffer.from(expected, "hex");
  const actualBuf = Buffer.from(signature, "hex");
  if (expectedBuf.length !== actualBuf.length) return false;
  return timingSafeEqual(expectedBuf, actualBuf);
}
