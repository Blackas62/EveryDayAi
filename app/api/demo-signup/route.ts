import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { DEMO_GATE_COOKIE, DEMO_GATE_TTL_SECONDS, signDemoGate } from "@/lib/demo-gate";

const TRADES = ["plumber", "electrician", "builder", "real-estate", "other"] as const;

const submissionSchema = z.object({
  email: z.string().email().toLowerCase().max(200),
  trade: z.enum(TRADES),
  business_name: z.string().trim().max(200).optional().default(""),
  ref_url: z.string().trim().max(500).optional().default(""),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const parsed = submissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation failed", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const { email, trade, business_name, ref_url } = parsed.data;
  const userAgent = req.headers.get("user-agent") ?? "";
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "";

  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("demo_signups")
    .insert({
      email,
      trade,
      business_name: business_name || null,
      ref_url: ref_url || null,
      user_agent: userAgent || null,
      ip: ip || null,
    });

  if (error) {
    console.error("demo_signups insert failed", error);
    return NextResponse.json(
      { error: "could not save signup" },
      { status: 500 },
    );
  }

  const token = await signDemoGate({ email, trade });

  // Pick the destination — if "other", drop them at the landing page; otherwise
  // their picked trade demo.
  const redirectTo =
    trade === "other" ? "/services/always-on-front-desk" : `/demo/${trade}`;

  const res = NextResponse.json({ ok: true, redirectTo });
  res.cookies.set(DEMO_GATE_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: DEMO_GATE_TTL_SECONDS,
    path: "/",
  });

  return res;
}
