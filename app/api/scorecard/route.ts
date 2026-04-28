import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { QUESTIONS, computeScore, tierFor } from "@/lib/scorecard-data";

const submissionSchema = z.object({
  email: z.string().email().toLowerCase(),
  company: z.string().trim().max(200).optional().default(""),
  answers: z.array(z.number().int().min(0).nullable()).length(QUESTIONS.length),
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

  const { email, company, answers } = parsed.data;

  for (let i = 0; i < answers.length; i++) {
    const a = answers[i];
    if (a === null) continue;
    const opts = QUESTIONS[i].answers;
    if (a < 0 || a >= opts.length) {
      return NextResponse.json(
        { error: `answer ${i} out of range` },
        { status: 400 },
      );
    }
  }

  const score = computeScore(answers);
  const tier = tierFor(score);

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("scorecard_submissions")
    .insert({
      email,
      company: company || null,
      answers,
      total_score: score,
      tier: tier.key,
      source: "web",
    })
    .select("id")
    .single();

  if (error) {
    console.error("scorecard insert failed", error);
    return NextResponse.json(
      { error: "could not save submission" },
      { status: 500 },
    );
  }

  return NextResponse.json({
    id: data.id,
    score,
    tier: { key: tier.key, title: tier.title, blurb: tier.blurb },
  });
}
