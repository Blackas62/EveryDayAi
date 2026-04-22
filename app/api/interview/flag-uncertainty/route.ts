import type { NextRequest } from "next/server";
import { recordFlag } from "@/lib/readiness-tickets";

export async function POST(request: NextRequest) {
  if (!checkIanToolAuth(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const bookingId = readString(body, "booking_id");
  const topic = readString(body, "topic");
  const detail = readString(body, "detail");

  if (!bookingId || !topic || !detail) {
    return Response.json({ error: "Missing booking_id, topic, or detail" }, { status: 400 });
  }

  try {
    const entry = await recordFlag(bookingId, { topic, detail });
    return Response.json({ ok: true, recordedAt: entry.recordedAt });
  } catch (err) {
    console.error("flag-uncertainty failed:", err);
    return Response.json({ error: "Save failed" }, { status: 500 });
  }
}

function checkIanToolAuth(request: NextRequest): boolean {
  const secret = process.env.IAN_TOOL_SECRET;
  if (!secret) return false;
  const header = request.headers.get("authorization") ?? "";
  const expected = `Bearer ${secret}`;
  if (header.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < header.length; i++) diff |= header.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}

function readString(obj: Record<string, unknown>, key: string): string | undefined {
  const v = obj[key];
  return typeof v === "string" && v.trim().length > 0 ? v.trim() : undefined;
}
