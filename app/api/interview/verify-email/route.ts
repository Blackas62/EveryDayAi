import type { NextRequest } from "next/server";
import {
  verifyTicket,
  incrementCallCount,
  MAX_CALLS_PER_TICKET,
} from "@/lib/readiness-tickets";

export async function POST(request: NextRequest) {
  let body: { token?: unknown; email?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const token = typeof body.token === "string" ? body.token : "";
  const email = typeof body.email === "string" ? body.email : "";

  if (!token || !email) {
    return Response.json({ error: "Missing token or email" }, { status: 400 });
  }

  let ticket;
  try {
    ticket = await verifyTicket(token);
  } catch {
    return Response.json({ error: "Link expired or invalid." }, { status: 401 });
  }

  const submitted = email.trim().toLowerCase();
  const expected = ticket.email.trim().toLowerCase();
  if (submitted !== expected) {
    return Response.json(
      { error: "That email doesn't match the booking. Check your confirmation email." },
      { status: 403 }
    );
  }

  const { count, exceeded } = await incrementCallCount(ticket.bookingId);
  if (exceeded) {
    await notifyOveruse(ticket.bookingId, ticket.email, count);
    return Response.json(
      {
        error: `You've already used your ${MAX_CALLS_PER_TICKET} allowed interview sessions. Email Graham@EveryDayAiWithGraham.com if you need another.`,
      },
      { status: 429 }
    );
  }

  const agentId = process.env.NEXT_PUBLIC_IAN_AGENT_ID ?? process.env.IAN_AGENT_ID;
  if (!agentId) {
    console.error("IAN_AGENT_ID not configured");
    return Response.json({ error: "Server misconfigured" }, { status: 500 });
  }

  return Response.json({
    ok: true,
    agentId,
    callCount: count,
    bookingId: ticket.bookingId,
    clientName: ticket.name,
    companyName: ticket.company ?? null,
  });
}

async function notifyOveruse(bookingId: string, email: string, count: number) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;
  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: `⚠️ George interview call cap exceeded\nBooking: ${bookingId}\nEmail: ${email}\nAttempts: ${count}`,
        disable_web_page_preview: true,
      }),
    });
  } catch (err) {
    console.error("Telegram overuse alert failed:", err);
  }
}
