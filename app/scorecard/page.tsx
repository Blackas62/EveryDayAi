"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  QUESTIONS,
  computeScore,
  tierFor,
  type Tier,
} from "@/lib/scorecard-data";

type Screen = "hero" | "quiz" | "score" | "done";

export default function ScorecardPage() {
  const [screen, setScreen] = useState<Screen>("hero");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => new Array(QUESTIONS.length).fill(null),
  );
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const score = useMemo(() => computeScore(answers), [answers]);
  const tier: Tier = useMemo(() => tierFor(score), [score]);

  const start = () => {
    setScreen("quiz");
    setCurrent(0);
  };

  const pickAnswer = (i: number) => {
    const next = [...answers];
    next[current] = i;
    setAnswers(next);
    window.setTimeout(() => {
      if (current < QUESTIONS.length - 1) setCurrent(current + 1);
      else setScreen("score");
    }, 280);
  };

  const back = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const submitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/scorecard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company, answers }),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error || `error ${res.status}`);
      }
      setScreen("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Could not submit. Try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-scorecard-bg text-scorecard-fg">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        {screen === "hero" && <Hero onStart={start} />}
        {screen === "quiz" && (
          <Quiz
            current={current}
            answers={answers}
            onBack={back}
            onPick={pickAnswer}
          />
        )}
        {screen === "score" && (
          <Score
            score={score}
            tier={tier}
            email={email}
            company={company}
            submitting={submitting}
            submitError={submitError}
            setEmail={setEmail}
            setCompany={setCompany}
            onSubmit={submitEmail}
          />
        )}
        {screen === "done" && <Done />}
      </main>
      <ScorecardStyles />
    </div>
  );
}

/* ── Screens ────────────────────────────────────────────── */

function Header() {
  return (
    <header className="border-b border-scorecard-border bg-white/70 backdrop-blur">
      <div className="mx-auto max-w-3xl px-4 py-5 sm:py-6 flex items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-3 group">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-scorecard-primary shadow-sm group-hover:scale-105 transition">
            <SunriseMark />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-scorecard-primary">
              EveryDayAi
            </span>
            <span className="text-xs sm:text-sm text-scorecard-muted font-medium tracking-wide">
              with Graham
            </span>
          </span>
        </a>
        <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest text-scorecard-muted">
          AI Opportunity Scorecard
        </span>
      </div>
    </header>
  );
}

function Hero({ onStart }: { onStart: () => void }) {
  return (
    <section className="fade-in">
      <p className="text-xs uppercase tracking-widest text-scorecard-accent font-semibold">
        Free · 3 minutes · 15 questions
      </p>
      <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
        Find out exactly where AI will pay you back
        <br className="hidden sm:block" /> in{" "}
        <em className="not-italic text-scorecard-primary">your</em> business.
      </h1>
      <p className="mt-5 text-scorecard-muted text-base sm:text-lg leading-relaxed max-w-xl">
        Built for Australian small-to-mid businesses. Answer 15 short questions
        about how your business actually runs today, and you will get an AI
        Opportunity Score out of 100 plus the three workflows where AI will earn
        its keep fastest.
      </p>
      <ul className="mt-6 space-y-2 text-sm text-scorecard-muted max-w-xl">
        <li className="flex items-start gap-2">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-scorecard-accent shrink-0"></span>
          Based on 20+ years of rebuilding finance and operations systems for
          Australian businesses.
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-scorecard-accent shrink-0"></span>
          No jargon. No salesman. No &quot;AI transformation strategy&quot;
          waffle.
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-scorecard-accent shrink-0"></span>
          Get the score instantly. Full written report emailed when you finish.
        </li>
      </ul>
      <div className="mt-10">
        <button className="btn-primary text-base" onClick={onStart}>
          Start the scorecard →
        </button>
        <p className="mt-3 text-xs text-scorecard-muted">
          Your answers are private. We will not add you to a list or send
          promotional email.
        </p>
      </div>
    </section>
  );
}

function Quiz({
  current,
  answers,
  onBack,
  onPick,
}: {
  current: number;
  answers: (number | null)[];
  onBack: () => void;
  onPick: (i: number) => void;
}) {
  const q = QUESTIONS[current];
  const progress = (current / QUESTIONS.length) * 100;
  return (
    <section>
      <div className="flex items-center justify-between text-xs text-scorecard-muted">
        <span>
          Question {current + 1} of {QUESTIONS.length}
        </span>
        <button
          className="text-scorecard-primary hover:underline disabled:opacity-30"
          disabled={current === 0}
          onClick={onBack}
        >
          ← Back
        </button>
      </div>
      <div className="mt-3 progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div key={current} className="mt-10 fade-in">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-snug">
          {q.q}
        </h2>
        <div className="mt-8 space-y-3">
          {q.answers.map(([label], i) => (
            <div
              key={i}
              className={`answer ${answers[current] === i ? "selected" : ""}`}
              onClick={() => onPick(i)}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Score({
  score,
  tier,
  email,
  company,
  submitting,
  submitError,
  setEmail,
  setCompany,
  onSubmit,
}: {
  score: number;
  tier: Tier;
  email: string;
  company: string;
  submitting: boolean;
  submitError: string | null;
  setEmail: (v: string) => void;
  setCompany: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  const ringRef = useRef<SVGCircleElement>(null);
  const [displayScore, setDisplayScore] = useState(0);
  const circ = 2 * Math.PI * 72;

  useEffect(() => {
    const ring = ringRef.current;
    if (ring) {
      ring.setAttribute("stroke-dasharray", String(circ));
      ring.setAttribute("stroke-dashoffset", String(circ));
      window.setTimeout(() => {
        ring.setAttribute("stroke-dashoffset", String(circ * (1 - score / 100)));
      }, 80);
    }
    const start = performance.now();
    const dur = 1200;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setDisplayScore(Math.round(p * score));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [score, circ]);

  return (
    <section className="fade-in">
      <div className="text-center">
        <p className="text-xs uppercase tracking-widest text-scorecard-accent font-semibold">
          Your AI Opportunity Score
        </p>
        <div className="mt-6 inline-block relative">
          <svg
            viewBox="0 0 160 160"
            width="220"
            height="220"
            className="-rotate-90"
          >
            <circle
              cx="80"
              cy="80"
              r="72"
              fill="none"
              stroke="#e7dfd2"
              strokeWidth="12"
            />
            <circle
              ref={ringRef}
              className="score-ring"
              cx="80"
              cy="80"
              r="72"
              fill="none"
              stroke="#1a5a6e"
              strokeWidth="12"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-6xl font-bold text-scorecard-primary tabular-nums">
              {displayScore}
            </span>
            <span className="text-xs text-scorecard-muted tracking-wider mt-1">
              OUT OF 100
            </span>
          </div>
        </div>
        <h2 className="mt-8 text-2xl font-bold tracking-tight">{tier.title}</h2>
        <p className="mt-3 text-scorecard-muted max-w-xl mx-auto leading-relaxed">
          {tier.blurb}
        </p>
      </div>

      <div className="card p-7 sm:p-9 mt-12 max-w-lg mx-auto">
        <p className="text-xs uppercase tracking-widest text-scorecard-accent font-semibold">
          Locked · unlock with email
        </p>
        <h3 className="mt-2 text-xl font-bold tracking-tight">
          The three workflows where AI will pay you back first — in your
          business.
        </h3>
        <p className="mt-3 text-sm text-scorecard-muted leading-relaxed">
          Tailored to how you answered. Delivered as a written report to your
          inbox in under a minute. No follow-up sequence. No promo emails.
        </p>
        <form onSubmit={onSubmit} className="mt-5 space-y-3">
          <input
            type="email"
            required
            placeholder="you@company.com.au"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border-2 border-scorecard-border px-4 py-3 text-sm focus:outline-none focus:border-scorecard-primary"
          />
          <input
            type="text"
            placeholder="Your company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full rounded-lg border-2 border-scorecard-border px-4 py-3 text-sm focus:outline-none focus:border-scorecard-primary"
          />
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full text-base"
          >
            {submitting ? "Sending…" : "Email me the full report"}
          </button>
        </form>
        {submitError && (
          <p className="mt-3 text-sm text-red-700 text-center">
            {submitError}
          </p>
        )}
        <p className="mt-4 text-xs text-scorecard-muted text-center">
          We capture your answers and email only. One-off report, no newsletter.
        </p>
      </div>
    </section>
  );
}

function Done() {
  return (
    <section className="fade-in">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-scorecard-primary text-white text-2xl">
          ✓
        </div>
        <h2 className="mt-6 text-3xl font-bold tracking-tight">
          Report on its way.
        </h2>
        <p className="mt-3 text-scorecard-muted max-w-xl mx-auto">
          Check your inbox (and junk folder, just in case). The full Top-3
          Opportunities report should land inside 60 seconds.
        </p>
      </div>

      <div className="card p-7 sm:p-9 mt-12 max-w-lg mx-auto text-center">
        <p className="text-xs uppercase tracking-widest text-scorecard-accent font-semibold">
          Optional next step
        </p>
        <h3 className="mt-2 text-xl font-bold tracking-tight">
          Want to walk through the results with Graham?
        </h3>
        <p className="mt-3 text-sm text-scorecard-muted leading-relaxed">
          Book a free 30-minute discovery call. We go through your three
          opportunities, answer any questions, and work out whether one of the
          EveryDayAi packages is a fit. No pitch, no pressure.
        </p>
        <a
          href="https://cal.com/everydayaiwithgraham/book-a-free-30-min-discovery-call"
          className="inline-block btn-primary mt-5 w-full text-base"
        >
          Book a free discovery call
        </a>
      </div>
    </section>
  );
}

/* ── Bits ───────────────────────────────────────────────── */

function SunriseMark() {
  return (
    <svg
      viewBox="0 0 40 40"
      width="40"
      height="40"
      aria-label="EveryDayAi sunrise mark"
      role="img"
    >
      <defs>
        <linearGradient id="edai-sun" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#f2bc6e" />
          <stop offset="1" stopColor="#d4994b" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="26" r="9" fill="url(#edai-sun)" />
      <rect x="4" y="26" width="32" height="2" rx="1" fill="#ffffff" opacity="0.9" />
      <g stroke="#f2bc6e" strokeWidth="1.5" strokeLinecap="round" opacity="0.7">
        <line x1="20" y1="6" x2="20" y2="10" />
        <line x1="8" y1="10" x2="11" y2="13" />
        <line x1="32" y1="10" x2="29" y2="13" />
      </g>
    </svg>
  );
}

function ScorecardStyles() {
  return (
    <style jsx global>{`
      :root {
        --scorecard-primary: #1a5a6e;
        --scorecard-primary-hover: #164e5f;
        --scorecard-accent: #d4994b;
        --scorecard-bg: #faf7f2;
        --scorecard-fg: #2d2620;
        --scorecard-muted: #6b6156;
        --scorecard-card: #ffffff;
        --scorecard-border: #e7dfd2;
      }
      .bg-scorecard-bg { background: var(--scorecard-bg); }
      .text-scorecard-fg { color: var(--scorecard-fg); }
      .text-scorecard-muted { color: var(--scorecard-muted); }
      .text-scorecard-primary { color: var(--scorecard-primary); }
      .text-scorecard-accent { color: var(--scorecard-accent); }
      .bg-scorecard-primary { background: var(--scorecard-primary); }
      .bg-scorecard-accent { background: var(--scorecard-accent); }
      .border-scorecard-border { border-color: var(--scorecard-border); }
      .focus\\:border-scorecard-primary:focus { border-color: var(--scorecard-primary); }
      .btn-primary {
        background: var(--scorecard-primary);
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 0.75rem;
        font-weight: 500;
        transition: background 150ms;
      }
      .btn-primary:hover { background: var(--scorecard-primary-hover); }
      .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }
      .card {
        background: var(--scorecard-card);
        border: 1px solid var(--scorecard-border);
        border-radius: 1rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
      }
      .answer {
        background: var(--scorecard-card);
        border: 2px solid var(--scorecard-border);
        border-radius: 0.75rem;
        padding: 1rem 1.25rem;
        cursor: pointer;
        font-size: 0.95rem;
        transition: border-color 150ms, background 150ms, transform 100ms;
      }
      .answer:hover { border-color: var(--scorecard-primary); }
      .answer.selected {
        border-color: var(--scorecard-primary);
        background: rgba(26, 90, 110, 0.05);
      }
      .progress-bar {
        height: 4px;
        background: var(--scorecard-border);
        border-radius: 2px;
        overflow: hidden;
      }
      .progress-fill {
        height: 100%;
        background: var(--scorecard-primary);
        transition: width 400ms ease-out;
      }
      .score-ring { transition: stroke-dashoffset 1.4s ease-out; }
      .fade-in { animation: fadeIn 450ms ease-out; }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `}</style>
  );
}
