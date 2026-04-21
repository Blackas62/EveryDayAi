import type { NextRequest } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";
import { notifyVoiceLead, type VoiceLead } from "@/lib/voice-leads";

const MAX_SIGNATURE_AGE_SECONDS = 30 * 60;

export async function POST(request: NextRequest) {
  const secret = process.env.ELEVENLABS_WEBHOOK_SECRET;
  if (!secret) {
    console.error("ELEVENLABS_WEBHOOK_SECRET not configured");
    return Response.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const rawBody = await request.text();
  const signatureHeader = request.headers.get("elevenlabs-signature");

  if (!verifyElevenLabsSignature(signatureHeader, rawBody, secret)) {
    return Response.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!payload || typeof payload !== "object") {
    return Response.json({ error: "Invalid payload" }, { status: 400 });
  }
  const event = payload as Record<string, unknown>;
  const eventType = typeof event.type === "string" ? event.type : undefined;

  if (eventType !== "post_call_transcription") {
    return Response.json({ ok: true, ignored: eventType ?? "unknown" });
  }

  const lead = extractLeadFromEvent(event);

  try {
    const result = await notifyVoiceLead(lead);
    return Response.json({ ok: true, ...result });
  } catch (err) {
    console.error("Voice lead notify failed:", err);
    return Response.json({ error: "Notification failed" }, { status: 500 });
  }
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

function extractLeadFromEvent(event: Record<string, unknown>): VoiceLead {
  const data = (event.data ?? {}) as Record<string, unknown>;
  const analysis = (data.analysis ?? {}) as Record<string, unknown>;
  const metadata = (data.metadata ?? {}) as Record<string, unknown>;
  const collection = (analysis.data_collection_results ?? {}) as Record<string, unknown>;

  const field = (key: string): string | undefined => {
    const raw = collection[key];
    if (raw === undefined || raw === null) return undefined;
    if (typeof raw === "string") return raw.trim() || undefined;
    if (typeof raw === "number" || typeof raw === "boolean") return String(raw);
    if (typeof raw === "object") {
      const obj = raw as Record<string, unknown>;
      const v = obj.value ?? obj.result ?? obj.extracted_value;
      if (typeof v === "string") return v.trim() || undefined;
      if (typeof v === "number" || typeof v === "boolean") return String(v);
    }
    return undefined;
  };

  const duration = typeof metadata.call_duration_secs === "number"
    ? metadata.call_duration_secs
    : typeof metadata.duration_seconds === "number"
    ? metadata.duration_seconds
    : undefined;

  const conversationId = typeof data.conversation_id === "string" ? data.conversation_id : undefined;
  const summary = typeof analysis.transcript_summary === "string" ? analysis.transcript_summary : undefined;
  const callSuccessful = typeof analysis.call_successful === "string" ? analysis.call_successful : undefined;

  return {
    name: field("name"),
    email: field("email"),
    phone: field("phone"),
    business_name: field("business_name"),
    staff_count: field("staff_count"),
    interest: field("interest"),
    pain_point: field("pain_point"),
    notes: field("notes"),
    summary,
    call_id: conversationId,
    call_duration_seconds: duration,
    call_successful: callSuccessful,
    transcript_url: conversationId
      ? `https://elevenlabs.io/app/conversational-ai/history/${conversationId}`
      : undefined,
  };
}
