import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const services = [
  {
    title: "AI Automation",
    description:
      "Custom AI agents, automated workflows, and intelligent systems that handle the repetitive work — so your team can focus on what matters.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714a2.25 2.25 0 0 0 .659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-2.47 2.47a2.25 2.25 0 0 1-1.591.659H9.061a2.25 2.25 0 0 1-1.591-.659L5 14.5m14 0V17a2.25 2.25 0 0 1-2.25 2.25H7.25A2.25 2.25 0 0 1 5 17v-2.5" />
      </svg>
    ),
  },
  {
    title: "Cost Reduction",
    description:
      "20+ years in finance and operations, applied to finding where AI can cut costs without cutting corners. Real savings, not hype.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    ),
  },
  {
    title: "Custom Software",
    description:
      "Full-stack web apps built to solve your specific problem. From warehouse management to safety apps — practical tools that work.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
  },
];

const stats = [
  { value: "20+", label: "Years in Finance & Operations" },
  { value: "$60M+", label: "Turnover Companies Managed" },
  { value: "5+", label: "AI Apps Built & Deployed" },
  { value: "Daily", label: "AI User Since Dec 2022" },
];

export default function Home() {
  return (
    <>
      {/* Hero — warm, personal, photo-forward */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-accent/10">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-sm font-medium tracking-wide text-accent uppercase">EveryDay AI with Graham</p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                G&apos;day, I&apos;m Graham.
              </h1>
              <p className="mt-4 text-xl leading-relaxed text-foreground/80">
                I help Australian businesses make sense of AI — and put it to work.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                After 20+ years in finance and operations, I got my hands dirty
                with AI and never looked back. Now I build practical tools,
                automate workflows, and help businesses save time and money
                with technology that actually works.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-7 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/85 hover:shadow-md"
                >
                  Let&apos;s Have a Chat
                </Link>
                <Link
                  href="/services"
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-card px-7 text-sm font-medium transition-all hover:bg-secondary hover:shadow-sm"
                >
                  See My Work
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/30 to-primary/20 blur-2xl" />
                <Image
                  src="/graham.jpg"
                  alt="Graham Blackwell"
                  width={380}
                  height={380}
                  className="relative rounded-2xl object-cover shadow-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal tagline strip */}
      <section className="border-y border-border/60 bg-card py-8">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-lg italic text-muted-foreground">
            &ldquo;I don&apos;t do jargon or hype. If AI can help your business,
            I&apos;ll show you how. If it can&apos;t, I&apos;ll tell you that too.&rdquo;
          </p>
        </div>
      </section>

      {/* What I Do */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              What I Do
            </h2>
            <p className="mt-3 text-muted-foreground">
              Practical AI that delivers measurable results for your business.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card key={service.title} className="border-border/60 bg-card shadow-sm transition-all hover:shadow-md">
                <CardHeader>
                  <div className="mb-2 text-primary">{service.icon}</div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/services"
              className="text-sm font-medium text-primary hover:underline"
            >
              View all services & case studies &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Credibility Strip */}
      <section className="border-y border-border/60 bg-secondary/50 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Preview */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Latest from YouTube
            </h2>
            <p className="mt-3 text-muted-foreground">
              Making AI accessible for everyday Australians.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm"
              >
                <div className="aspect-video bg-secondary" />
                <div className="p-4">
                  <div className="h-4 w-3/4 rounded bg-secondary" />
                  <div className="mt-2 h-3 w-1/2 rounded bg-secondary" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/youtube"
              className="text-sm font-medium text-primary hover:underline"
            >
              See all videos &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Footer CTA — warm, not corporate */}
      <section className="bg-gradient-to-br from-primary to-primary/85 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-primary-foreground sm:text-3xl">
            Curious how AI could help your business?
          </h2>
          <p className="mt-4 text-primary-foreground/80">
            Drop me a line — I&apos;m always happy to have a yarn about what&apos;s
            possible.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex h-11 items-center justify-center rounded-xl bg-white px-7 text-sm font-medium text-primary shadow-sm transition-all hover:bg-white/90 hover:shadow-md"
          >
            Let&apos;s Talk
          </Link>
        </div>
      </section>
    </>
  );
}
