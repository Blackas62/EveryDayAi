import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "AI Consulting for Australian Businesses — Services & Pricing",
  description:
    "Three clear ways to work with us: a 1-week AI Readiness Audit, a 4-week Implementation Sprint, or an ongoing AI Advisor Retainer. Fixed prices, clear deliverables.",
};

const offers = [
  {
    id: "ai-readiness-audit",
    name: "AI Readiness Audit",
    tagline: "Find out exactly where AI will pay you back",
    price: "From AUD $2,500",
    duration: "1 week",
    summary:
      "We interview your team, map your workflows, and deliver a written report on the five highest-value AI opportunities in your business — ranked by payback, effort, and risk.",
    deliverables: [
      "90-minute discovery call with you and up to 3 team members",
      "Review of your current systems and key workflows",
      "Written report: 5 prioritised AI opportunities with estimated ROI",
      "Recommended next step for each opportunity",
      "90-minute walk-through call to answer questions",
    ],
    rightFor:
      "Owners and leaders who keep hearing about AI but don't know where to start, or which opportunities are worth the effort.",
    recommended: true,
  },
  {
    id: "ai-implementation-sprint",
    name: "AI Implementation Sprint",
    tagline: "Pick one process. We build the automation end-to-end.",
    price: "From AUD $12,000",
    duration: "4 weeks",
    summary:
      "A focused build: we take one of your workflows, design the AI-powered replacement, deploy it into your business, and train your team to use it. You end the sprint with a working system — not a slide deck.",
    deliverables: [
      "Week 1 — deep process mapping and solution design",
      "Weeks 2-3 — build, integrate with your existing systems, test",
      "Week 4 — deploy, train your team, document",
      "30 days of bug-fix support after go-live",
      "All code and access handed over to you",
    ],
    rightFor:
      "Businesses who know the process they want to automate and are ready to actually ship something.",
    recommended: false,
  },
  {
    id: "ai-advisor-retainer",
    name: "AI Advisor Retainer",
    tagline: "A trusted AI brain on call — month after month",
    price: "From AUD $1,500 / month",
    duration: "Ongoing, 3-month minimum",
    summary:
      "For businesses that want AI to keep compounding. Monthly strategy call, async help when you get stuck, and one small implementation per quarter — built into the fee.",
    deliverables: [
      "Monthly 60-minute strategy call",
      "Unlimited async Q&A (email / chat) during business hours",
      "One quarterly implementation (up to 20 hours of build work)",
      "Priority booking for ad-hoc work at preferred rates",
      "Quarterly written review of what's working and what's next",
    ],
    rightFor:
      "Businesses that want AI embedded in how they operate, not bolted on once.",
    recommended: false,
  },
];

const faqs = [
  {
    q: "What is an AI Readiness Audit?",
    a: "An AI Readiness Audit is a structured, one-week review of your business where we identify the five workflows or processes where AI will deliver the biggest, fastest return. You receive a written report ranking each opportunity by estimated payback, effort, and risk — plus a recommended next step for each one. It is designed for owners and leaders who know AI matters but don't yet know where to start.",
  },
  {
    q: "How is this different from a generic AI consultant?",
    a: "Most AI consultants sell hours or slide decks. We sell fixed-price packages with clear deliverables. We also bring 20+ years of finance and operations experience running businesses turning over up to $60 million — so the recommendations are grounded in how businesses actually work, not just what's technically possible.",
  },
  {
    q: "What size business do you work with?",
    a: "Our sweet spot is Australian small-to-mid businesses turning over between $1 million and $50 million — established enough to have real workflows worth automating, small enough that we deal directly with the owner or senior leader. We also work with larger organisations on specific departmental projects.",
  },
  {
    q: "Do you work on-site or remote?",
    a: "Mostly remote, with optional on-site days for discovery calls and team training. We are based in Perth, Western Australia, and work with businesses right across Australia.",
  },
  {
    q: "What happens after the Audit?",
    a: "You own the report and can act on it however you choose — in-house, with another consultant, or with us. About two-thirds of Audit clients move into an Implementation Sprint on one of the top opportunities, but there is no obligation.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes. Everything shared during an engagement is confidential. We are happy to sign your NDA before the discovery call if preferred.",
  },
];

const caseStudies = [
  {
    title: "Harry Agent",
    subtitle: "Always-On AI Business Assistant",
    problem:
      "Needed a personal AI assistant available 24/7 via Telegram, email, and phone — not just chat, but one that could take actions, manage emails, make phone calls, and remember context across conversations.",
    solution:
      "Built a multi-model AI agent running on a dedicated Linux server. Claude handles primary intelligence with Gemini and GPT fallbacks. Integrates Gmail for email management, ElevenLabs for voice messages, Twilio for phone calls, and a shared semantic memory system.",
    tech: ["Python", "Claude API", "Gemini", "Telegram", "Gmail API", "Twilio", "ElevenLabs", "Ollama", "SQLite"],
    result:
      "Runs 24/7 with automatic self-healing. Handles email triage, voice calls, shell commands, and persistent memory. Three-provider failover ensures zero downtime.",
  },
  {
    title: "WalkMate",
    subtitle: "Nurse Safety Companion App",
    problem:
      "Hospital nurses finishing evening shifts often walk to their cars alone in poorly lit areas. There was no easy way to find a colleague heading the same direction for a safer walk.",
    solution:
      "Built a progressive web app that pairs hospital workers within 2km of their workplace at end of shift for safe walking companionship. Hospitals subscribe and their staff get access automatically based on location.",
    tech: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "WebSockets", "Leaflet Maps", "PWA"],
    result:
      "Fully built and working. $5K/year hospital subscription model. AI monitoring for misuse detection without overriding human decisions.",
  },
  {
    title: "YouTube Pipeline",
    subtitle: "Automated Video Production",
    problem:
      "Producing YouTube videos as a solo creator is incredibly time-consuming. Scripting, recording, editing, B-roll, captions, music — each video was taking days of manual work.",
    solution:
      "Built a fully automated pipeline: AI topic scouting, script generation, HeyGen avatar recording, ElevenLabs voiceover, automated B-roll selection from a self-generating library, and a custom Studio editor for final assembly.",
    tech: ["Python", "Flask", "HeyGen API", "ElevenLabs", "LTX-Video", "Google Veo", "FFmpeg", "Claude API"],
    result:
      "End-to-end video production with a custom local studio editor. B-roll library grows automatically via daily cron jobs. Videos go from topic to final export with minimal manual intervention.",
  },
  {
    title: "Stock Manager",
    subtitle: "Warehouse Management System",
    problem:
      "A distribution business was running on a decades-old Microsoft Access database. No web access, no barcode scanning, limited reporting, and constant risk of data loss.",
    solution:
      "Rebuilt the entire system as a modern web application with barcode scanning, real-time stock management, supplier tracking, storage charge invoicing (PDF + Excel), and carrier integration.",
    tech: ["Next.js", "Supabase", "PostgreSQL", "Vercel", "Resend", "Barcode Scanning"],
    result:
      "Live and in daily use. Web-accessible from anywhere, with proper user management, activity tracking, and automated invoicing.",
  },
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@graph": offers.map((o) => ({
    "@type": "Service",
    "@id": `https://everydayaiwithgraham.com/services#${o.id}`,
    name: o.name,
    description: o.summary,
    provider: {
      "@type": "Organization",
      name: "EveryDay AI with Graham",
      url: "https://everydayaiwithgraham.com",
    },
    areaServed: {
      "@type": "Country",
      name: "Australia",
    },
    offers: {
      "@type": "Offer",
      price: o.price.replace(/[^0-9]/g, ""),
      priceCurrency: "AUD",
      priceSpecification: {
        "@type": "PriceSpecification",
        price: o.price,
        priceCurrency: "AUD",
      },
    },
  })),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary via-background to-accent/10 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            AI for your business — three clear ways to work together.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Fixed prices. Clear deliverables. No open-ended consulting.
            Pick the package that fits where you are, and we'll get started.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#offers"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-7 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90"
            >
              See the packages
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-primary/20 bg-background px-7 text-sm font-medium text-primary transition-all hover:bg-primary/5"
            >
              Book a discovery call
            </Link>
          </div>
        </div>
      </section>

      {/* Offers */}
      <section id="offers" className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Which package is right for you?
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Most businesses start with the Audit so we can agree on the highest-value opportunity before any build work begins.
          </p>

          <div className="mx-auto mt-10 max-w-3xl space-y-10">
            {offers.map((o) => (
              <Card
                key={o.id}
                id={o.id}
                className={`relative flex flex-col overflow-visible border-border/60 shadow-sm ${
                  o.recommended ? "ring-2 ring-accent" : ""
                }`}
              >
                {o.recommended && (
                  <Badge className="absolute -top-3 left-6 h-7 bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground shadow-sm">
                    Most popular — start here
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{o.name}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {o.tagline}
                  </CardDescription>
                  <div className="pt-3">
                    <p className="text-2xl font-semibold text-primary">{o.price}</p>
                    <p className="text-xs text-muted-foreground">{o.duration}</p>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col space-y-5">
                  <p className="text-sm leading-relaxed">{o.summary}</p>

                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-primary">
                      What you get
                    </h4>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      {o.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground">
                    <span className="font-semibold text-primary">Right for: </span>
                    {o.rightFor}
                  </div>

                  <Link
                    href={`/contact?package=${o.id}`}
                    className="mt-auto inline-flex h-10 items-center justify-center rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90"
                  >
                    Enquire about this package
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Voice assistant nudge */}
      <section className="border-t bg-accent/5 py-10 sm:py-12">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            Prefer to talk?
          </p>
          <h2 className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">
            Ask our AI assistant about any of the packages.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
            Click the voice button on the bottom-right of the page. It can answer questions about the Audit, Sprint, or Retainer — or take your details so Graham can call you back within 24 hours. It is an AI assistant, not Graham, and the call is logged so he can follow up properly.
          </p>
        </div>
      </section>

      {/* FAQ — AEO-friendly, question-first */}
      <section className="border-t bg-muted/20 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Common questions
          </h2>
          <div className="mt-8 space-y-6">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-xl border border-border/60 bg-background p-6">
                <h3 className="text-base font-semibold text-primary">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="border-t py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            What we've built for others
          </h2>
          <p className="mt-3 text-muted-foreground">
            Real projects, real results. Every one of these started with a business problem, not a technology wish-list.
          </p>
          <div className="mt-10 space-y-8">
            {caseStudies.map((cs) => (
              <Card key={cs.title} className="overflow-hidden">
                <CardHeader className="bg-muted/30">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                    <CardTitle className="text-xl">{cs.title}</CardTitle>
                    <span className="text-sm text-muted-foreground">
                      {cs.subtitle}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-6 p-6 lg:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-primary">
                        The Problem
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {cs.problem}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-primary">
                        The Solution
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {cs.solution}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-primary">
                        The Result
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {cs.result}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-primary">
                        Tech Stack
                      </h4>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {cs.tech.map((t) => (
                          <Badge key={t} variant="secondary" className="text-xs">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-primary to-primary/85 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-primary-foreground sm:text-3xl">
            Not sure which package fits?
          </h2>
          <p className="mt-4 text-primary-foreground/80">
            Book a free 20-minute call. We'll listen, ask a few sharp questions, and tell you honestly which package — if any — is the right next step.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex h-11 items-center justify-center rounded-xl bg-white px-7 text-sm font-medium text-primary shadow-sm transition-all hover:bg-white/90 hover:shadow-md"
          >
            Book a discovery call
          </Link>
        </div>
      </section>
    </>
  );
}
