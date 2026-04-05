import type { Metadata } from "next";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "About",
  description:
    "Graham Blackwell — from finance and operations to AI solutions. 20+ years of business experience, now helping companies work smarter with AI.",
};

const timeline = [
  {
    period: "2023 — Present",
    role: "AI Solutions & Consulting",
    detail:
      "Building AI agents, automated pipelines, and custom software for businesses. Daily AI user since December 2022. YouTube channel educating older Australians about practical AI.",
  },
  {
    period: "2023 — 2025",
    role: "Finance & Business Systems Manager — Halo Civil Engineering",
    detail:
      "$60M turnover, AFR Top 100 fastest growing company. Managed finance across 4+ entities. Led Maali Group rescue from voluntary administration, DVH Industries acquisition, Procore implementation, and Philippines remote team setup.",
  },
  {
    period: "2021 — 2023",
    role: "Business Systems Manager — Decmil",
    detail:
      "InEight construction PM suite implementation. HR/Payroll system evaluation. OCR technology for automated AP data capture.",
  },
  {
    period: "2021",
    role: "Business Systems Specialist — Pilbara Resource Group",
    detail:
      "Procore implementation, chart of accounts design, finance integration for construction projects.",
  },
  {
    period: "Earlier Career",
    role: "Finance & Operations Leadership",
    detail:
      "20+ years across finance, operations, treasury, credit management, payroll, and business systems. Hands-on experience with MYOB, Xero, Procore, Definitiv, and more.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              About Graham
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Finance and operations professional turned AI builder. I bridge
              the gap between business needs and technology solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="space-y-6 lg:col-span-3">
              <h2 className="text-2xl font-bold tracking-tight">My Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I spent 20+ years in finance and operations — managing
                  multi-million dollar budgets, implementing business systems,
                  and finding ways to make companies run more efficiently. From
                  construction firms to resource companies, I&apos;ve seen
                  first-hand how much time and money gets wasted on manual
                  processes.
                </p>
                <p>
                  When AI tools started becoming practical in late 2022, I saw
                  the opportunity immediately. Not the hype — the real,
                  practical applications. The accounts payable clerk spending
                  hours on data entry. The estimator taking days to produce a
                  cost report. The manager drowning in emails. These are
                  problems I&apos;d spent my career trying to solve with
                  spreadsheets and systems. AI changes everything.
                </p>
                <p>
                  So I taught myself to build. Python, React, Next.js, APIs —
                  not from a CS degree, but from a genuine need to make things
                  work. I built an AI assistant that manages my email and makes
                  phone calls. I built a nurse safety app inspired by my
                  daughter. I built an automated video production pipeline for
                  my YouTube channel. Each project taught me something new
                  about what AI can actually do for businesses.
                </p>
                <p>
                  Now I help other businesses do the same. Not with jargon or
                  hype, but with practical solutions built by someone who
                  understands both the technology and the business problems
                  it&apos;s solving.
                </p>
              </div>
            </div>

            <div className="space-y-6 lg:col-span-2">
              <h2 className="text-2xl font-bold tracking-tight">
                Beyond Work
              </h2>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  Based in Perth, Western Australia. When I&apos;m not building
                  AI solutions, you&apos;ll find me on the bike — I ride 8km
                  each way to work and regularly do 60km+ weekend rides with
                  the &ldquo;Fat Bastards&rdquo; cycling group.
                </p>
                <p>
                  I&apos;m a committed plant-based eater (going on 10+ years),
                  an active member of the Bayswater Community Men&apos;s Shed,
                  and a proud dad. My daughter Anna is a nurse in Melbourne —
                  she&apos;s the inspiration behind the WalkMate safety app.
                </p>
                <p>
                  I run a YouTube channel called{" "}
                  <a
                    href="https://www.youtube.com/@EveryDayAiWithGraham"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary hover:underline"
                  >
                    EveryDay AI with Graham
                  </a>
                  , specifically aimed at older Australians who want to
                  understand AI without the tech jargon. Because this stuff
                  matters for everyone, not just the tech crowd.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator className="mx-auto max-w-6xl" />

      {/* Career Timeline */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Career Highlights
          </h2>
          <div className="mt-8 space-y-0">
            {timeline.map((item, i) => (
              <div key={i} className="relative border-l-2 border-primary/20 pb-8 pl-6 last:pb-0">
                <div className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-primary" />
                <div className="text-sm font-medium text-primary">
                  {item.period}
                </div>
                <h3 className="mt-1 font-semibold">{item.role}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-primary-foreground sm:text-3xl">
            Want to work together?
          </h2>
          <p className="mt-4 text-primary-foreground/80">
            I&apos;m always happy to chat about how AI can help your business.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex h-10 items-center justify-center rounded-lg bg-white px-6 text-sm font-medium text-primary transition-colors hover:bg-white/90"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
