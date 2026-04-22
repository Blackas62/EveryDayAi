import type { NextRequest } from "next/server";
import { recordAnswer, type Answer } from "@/lib/readiness-tickets";

const ALLOWED_CATEGORIES = new Set([
  "business_snapshot",
  "team",
  "systems_stack",
  "data_volumes",
  "weekly_time_sinks",
  "customer_supplier_comms",
  "compliance",
  "reporting",
  "previous_ai_attempts",
  "data_sensitivity",
  "budget",
  "success_definition",
]);

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
  const category = readString(body, "category");
  const summary = readString(body, "summary");
  const confidence = readString(body, "confidence");
  const quotes = readStringArray(body, "quotes") ?? [];

  if (!bookingId || !category || !summary || !confidence) {
    return Response.json(
      { error: "Missing booking_id, category, summary, or confidence" },
      { status: 400 }
    );
  }

  if (!ALLOWED_CATEGORIES.has(category)) {
    return Response.json({ error: `Unknown category: ${category}` }, { status: 400 });
  }

  if (!["high", "medium", "low"].includes(confidence)) {
    return Response.json({ error: "confidence must be high|medium|low" }, { status: 400 });
  }

  try {
    const entry = await recordAnswer(bookingId, {
      category,
      summary,
      confidence: confidence as Answer["confidence"],
      quotes,
    });
    return Response.json({ ok: true, recordedAt: entry.recordedAt });
  } catch (err) {
    console.error("save-answer failed:", err);
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

function readStringArray(obj: Record<string, unknown>, key: string): string[] | undefined {
  const v = obj[key];
  if (!Array.isArray(v)) return undefined;
  return v.filter((x): x is string => typeof x === "string" && x.trim().length > 0);
}
