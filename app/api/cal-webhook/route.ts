import type { NextRequest } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";
import nodemailer from "nodemailer";
import { createTicket } from "@/lib/readiness-tickets";

const SITE = "https://everydayaiwithgraham.com";
const READINESS_EVENT_TYPE_ID = 5443855;

type CalAttendee = { name?: string; email?: string; timeZone?: string };
type CalResponseValue = string | { value?: string } | string[] | undefined;
type CalBookingPayload = {
  uid?: string;
  id?: string | number;
  eventTypeId?: number;
  startTime?: string;
  endTime?: string;
  attendees?: CalAttendee[];
  responses?: Record<string, CalResponseValue>;
  bookingFieldsResponses?: Record<string, CalResponseValue>;
};
type CalWebhook = {
  triggerEvent?: string;
  payload?: CalBookingPayload;
};

export async function POST(request: NextRequest) {
  const secret = process.env.CAL_COM_WEBHOOK_SECRET;
  if (!secret) {
    console.error("CAL_COM_WEBHOOK_SECRET not configured");
    return Response.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const rawBody = await request.text();
  const sigHeader = request.headers.get("x-cal-signature-256");
  if (!verifySignature(sigHeader, rawBody, secret)) {
    const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
    console.warn("cal-webhook signature mismatch", {
      headerNames: Array.from(request.headers.keys()),
      sigHeader,
      sigHeaderLen: sigHeader?.length,
      expectedLen: expected.length,
      bodyLen: rawBody.length,
      bodyHead: rawBody.slice(0, 200),
    });
    return Response.json({ error: "Invalid signature" }, { status: 401 });
  }

  let webhook: CalWebhook;
  try {
    webhook = JSON.parse(rawBody) as CalWebhook;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (webhook.triggerEvent !== "BOOKING_CREATED") {
    return Response.json({ ok: true, ignored: webhook.triggerEvent ?? "unknown" });
  }

  const booking = webhook.payload ?? {};
  if (booking.eventTypeId && booking.eventTypeId !== READINESS_EVENT_TYPE_ID) {
    return Response.json({ ok: true, ignored: `eventTypeId=${booking.eventTypeId}` });
  }

  const bookingId = String(booking.uid ?? booking.id ?? "").trim();
  const attendee = booking.attendees?.[0] ?? {};
  const responses = { ...(booking.responses ?? {}), ...(booking.bookingFieldsResponses ?? {}) };
  const email = (attendee.email ?? getResponse(responses, "email") ?? "").trim().toLowerCase();
  const name = (attendee.name ?? getResponse(responses, "name") ?? "").trim();
  const scheduledAt = booking.startTime ?? new Date().toISOString();

  if (!bookingId || !email || !name) {
    console.error("Cal webhook missing required fields", { bookingId, email: !!email, name: !!name });
    return Response.json({ error: "Missing booking fields" }, { status: 400 });
  }

  const { token, payload: ticket } = await createTicket({
    bookingId,
    name,
    email,
    company: getResponse(responses, "company"),
    role: getResponse(responses, "role"),
    preCallNotes: getResponse(responses, "pre-call-notes"),
    scheduledAt,
  });

  const interviewUrl = `${SITE}/interview/${token}`;

  const results = await Promise.allSettled([
    emailClient({ to: email, name, interviewUrl, scheduledAt }),
    telegramGraham({ bookingId, name, email, scheduledAt, company: ticket.company }),
  ]);

  const failures = results
    .map((r, i) => (r.status === "rejected" ? { channel: ["email", "telegram"][i], reason: String(r.reason) } : null))
    .filter((x): x is { channel: string; reason: string } => x !== null);

  if (failures.length) {
    console.error("Cal webhook partial failure:", JSON.stringify(failures));
  }

  return Response.json({ ok: true, bookingId, delivered: failures.length === 0, failures });
}

function verifySignature(header: string | null, rawBody: string, secret: string): boolean {
  if (!header) return false;
  // Cal.com may send as plain hex or with a "sha256=" prefix; accept both.
  const stripped = header.trim().replace(/^sha256=/i, "");
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const expectedBuf = Buffer.from(expected, "hex");
  let actualBuf: Buffer;
  try {
    actualBuf = Buffer.from(stripped, "hex");
  } catch {
    return false;
  }
  if (expectedBuf.length !== actualBuf.length) return false;
  return timingSafeEqual(expectedBuf, actualBuf);
}

function getResponse(responses: Record<string, CalResponseValue>, key: string): string | undefined {
  const v = responses[key];
  if (typeof v === "string") return v.trim() || undefined;
  if (Array.isArray(v)) return v.filter(Boolean).join(", ") || undefined;
  if (v && typeof v === "object" && typeof v.value === "string") return v.value.trim() || undefined;
  return undefined;
}

function gmailTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) throw new Error("GMAIL_USER or GMAIL_APP_PASSWORD not configured");
  return {
    user,
    transport: nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass },
    }),
  };
}

async function emailClient(input: { to: string; name: string; interviewUrl: string; scheduledAt: string }) {
  const { user, transport } = gmailTransporter();
  const firstName = input.name.split(" ")[0] || "there";
  const when = new Date(input.scheduledAt).toLocaleString("en-AU", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Australia/Perth",
  });

  const html = `
    <p>Hi ${esc(firstName)},</p>
    <p>Thanks for booking your AI Readiness Review with me. Your intake call is confirmed for <strong>${esc(when)}</strong> (Perth time).</p>
    <p>The call runs 45–55 minutes with <strong>George</strong>, my AI intake assistant. He'll walk you through a structured conversation about your business so I've got real context before I write your report.</p>
    <p><strong>Your unique interview link:</strong></p>
    <p><a href="${input.interviewUrl}">${input.interviewUrl}</a></p>
    <p>Open it at your scheduled time. The page will ask you to confirm the email address you booked with, then George will join on voice.</p>
    <p>If anything changes, just reply to this email.</p>
    <p>Cheers,<br>Graham Blackwell<br>EveryDay AI with Graham</p>
  `;

  return transport.sendMail({
    from: `"Graham Blackwell" <${user}>`,
    to: input.to,
    replyTo: user,
    subject: "Your AI Readiness Review interview link",
    html,
  });
}

async function telegramGraham(input: {
  bookingId: string;
  name: string;
  email: string;
  scheduledAt: string;
  company?: string;
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) throw new Error("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not configured");

  const when = new Date(input.scheduledAt).toLocaleString("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Australia/Perth",
  });

  const text = [
    "Readiness Review booked",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    input.company ? `Company: ${input.company}` : null,
    `When: ${when} AWST`,
    `Booking: ${input.bookingId}`,
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
  });

  if (!res.ok) {
    throw new Error(`Telegram ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
