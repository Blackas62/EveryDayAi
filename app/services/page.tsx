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
  title: "Services & Case Studies",
  description:
    "AI automation, business cost reduction, and custom software development. See real projects delivered for real businesses.",
};

const serviceCategories = [
  {
    title: "AI Automation",
    description:
      "From always-on AI assistants to automated video production pipelines, I build systems that handle complex workflows end-to-end — freeing your team to focus on high-value work.",
    examples: [
      "Custom AI agents (Telegram, email, phone)",
      "Automated content pipelines",
      "Intelligent document processing",
      "AI-powered data analysis and reporting",
    ],
  },
  {
    title: "Business Cost Reduction",
    description:
      "With 20+ years managing finance and operations for companies up to $60M turnover, I know where the money goes. I identify where AI and automation can deliver real, measurable savings.",
    examples: [
      "Process automation audits",
      "AP/AR workflow automation",
      "Reporting and compliance automation",
      "System integration and migration",
    ],
  },
  {
    title: "Custom Software Development",
    description:
      "Full-stack web applications built to solve your specific business problem. Modern tech stacks, deployed to the cloud, with ongoing support.",
    examples: [
      "Web applications (Next.js, React, Node.js)",
      "Database design and migration",
      "API integrations",
      "Mobile-friendly progressive web apps",
    ],
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
    title: "EstimateAI",
    subtitle: "AI Construction Cost Estimating",
    problem:
      "Construction cost estimating is manual, slow, and expensive. Estimators spend days analysing drawings and building spreadsheets. Small errors cascade into major cost blowouts.",
    solution:
      "Built an AI-powered tool that analyses construction drawings to produce work breakdown structures, resource costs, and multi-tab Excel estimates. Uses Claude's vision capabilities to interpret architectural and engineering drawings.",
    tech: ["Next.js", "Claude API", "Vision AI", "Excel Generation", "Vercel"],
    result:
      "Prototype generating structured estimates from drawing uploads. Dramatically reduces the time from drawings to cost estimate.",
  },
  {
    title: "Parallel.Net",
    subtitle: "Warehouse Management System",
    problem:
      "A book distribution business was running on a decades-old Microsoft Access database. No web access, no barcode scanning, limited reporting, and constant risk of data loss.",
    solution:
      "Rebuilt the entire system as a modern web application with ISBN barcode scanning, real-time stock management, publisher tracking, storage charge invoicing (PDF + Excel), and carrier integration for Royal Mail and DHL.",
    tech: ["Next.js", "Supabase", "PostgreSQL", "Vercel", "Resend", "Barcode Scanning"],
    result:
      "Live and in daily use. Web-accessible from anywhere, with proper user management, activity tracking, and automated invoicing.",
  },
  {
    title: "YouTube Pipeline",
    subtitle: "Automated Video Production",
    problem:
      "Producing YouTube videos as a solo creator is incredibly time-consuming. Scripting, recording, editing, B-roll, captions, music — each video was taking days of manual work.",
    solution:
      "Built a fully automated pipeline: AI topic scouting, script generation, HeyGen avatar recording, ElevenLabs voiceover, automated B-roll selection from a self-generating library (LTX-Video + Google Veo), and a custom Studio editor for final assembly.",
    tech: ["Python", "Flask", "HeyGen API", "ElevenLabs", "LTX-Video", "Google Veo", "FFmpeg", "Claude API"],
    result:
      "End-to-end video production with a custom local studio editor. B-roll library grows automatically via daily cron jobs. Videos go from topic to final export with minimal manual intervention.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Services & Case Studies
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Real projects, real results. Here&apos;s what I build and the
            problems I solve.
          </p>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            How I Help
          </h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {serviceCategories.map((cat) => (
              <Card key={cat.title}>
                <CardHeader>
                  <CardTitle className="text-lg">{cat.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-sm leading-relaxed">
                    {cat.description}
                  </CardDescription>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    {cat.examples.map((ex) => (
                      <li key={ex} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {ex}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="border-t py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Case Studies
          </h2>
          <p className="mt-3 text-muted-foreground">
            Real projects I&apos;ve built — each one solving a genuine business
            problem.
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
      <section className="bg-primary py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-primary-foreground sm:text-3xl">
            Got a problem that needs solving?
          </h2>
          <p className="mt-4 text-primary-foreground/80">
            Tell me about your business and I&apos;ll show you where AI can make
            a real difference.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex h-10 items-center justify-center rounded-lg bg-white px-6 text-sm font-medium text-primary transition-colors hover:bg-white/90"
          >
            Start a Conversation
          </Link>
        </div>
      </section>
    </>
  );
}
