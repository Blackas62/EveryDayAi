import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SHOW_YOUTUBE } from "@/lib/feature-flags";

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
      "20+ years in finance and operations, applied to finding where AI can cut costs without cutting corners. Concrete savings analysis, not hype.",
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

const testimonials = [
  {
    quote:
      "The senior Procore support manager said Graham's understanding and implementation was at a quality equivalent to his top-level support staff.",
    name: "Ken Banks",
    role: "Non-Executive Chairman, Paterson Resources",
  },
  {
    quote:
      "He has a natural talent for detailed forensic financial analysis. His teaching approach is engaging and inspiring — he's passionate about technology and how it can improve business practices and the bottom line.",
    name: "Shane Powell",
    role: "People & Culture Consultant, Dept of Transport",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero — dark, photo-forward */}
      <section className="relative overflow-hidden bg-dark text-dark-foreground">
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark to-primary/40" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-sm font-medium tracking-widest text-accent uppercase">G&apos;day, I&apos;m Graham</p>
              <h1 className="mt-3 font-display text-5xl tracking-tight sm:text-6xl lg:text-7xl">
                Practical AI for Australian small and mid-sized businesses.
              </h1>
              <p className="mt-6 text-xl leading-relaxed text-dark-foreground/90">
                Fixed-price readiness reviews, 4-week implementation sprints, and ongoing advisory — built on 20+ years running finance and systems inside Western Australian civil, construction, and mining-services businesses.
              </p>
              <p className="mt-4 text-base leading-relaxed text-dark-muted">
                After 20+ years in finance and operations, I started building
                with AI and never looked back. Now I build practical tools and
                design workflows that save time and money for businesses ready
                to put AI to work.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-accent px-7 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-accent/85 hover:shadow-md"
                >
                  Let&apos;s Have a Chat
                </Link>
                <Link
                  href="/services"
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-dark-border bg-transparent px-7 text-sm font-medium text-dark-foreground transition-all hover:bg-dark-border/40"
                >
                  See My Work
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 -z-10 translate-y-8 scale-90 rounded-full bg-gradient-to-br from-accent/40 via-primary/30 to-transparent blur-3xl" />
                <Image
                  src="/graham-cutout.png"
                  alt="Graham Blackwell"
                  width={460}
                  height={460}
                  className="relative drop-shadow-2xl"
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
              Practical AI designed for measurable results.
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

      {/* Credibility Strip — dark with gold accents */}
      <section className="bg-dark py-14 sm:py-20 text-dark-foreground">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-10 text-center lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-bold text-dark-foreground sm:text-5xl">
                  {stat.value}
                </div>
                <div className="mx-auto mt-3 h-0.5 w-10 bg-accent" />
                <div className="mt-3 text-sm text-dark-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              What People Say
            </h2>
            <p className="mt-3 text-muted-foreground">
              From people I&apos;ve worked with over the years.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm"
              >
                <blockquote className="text-base leading-relaxed text-foreground/85">
                  <span className="mr-1 text-accent">&ldquo;</span>
                  {t.quote}
                  <span className="ml-1 text-accent">&rdquo;</span>
                </blockquote>
                <figcaption className="mt-4 text-sm">
                  <div className="font-medium">{t.name}</div>
                  <div className="text-muted-foreground">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Preview — gated by SHOW_YOUTUBE flag */}
      {SHOW_YOUTUBE && (
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
      )}

      {/* Footer CTA — dark with gold CTA */}
      <section className="bg-dark py-16 sm:py-24 text-dark-foreground">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-dark-foreground sm:text-4xl">
            Curious how AI could help your business?
          </h2>
          <p className="mt-4 text-dark-muted">
            Drop me a line — I&apos;m always happy to have a yarn about what&apos;s
            possible.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex h-11 items-center justify-center rounded-xl bg-accent px-7 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-accent/85 hover:shadow-md"
          >
            Let&apos;s Talk
          </Link>
        </div>
      </section>
    </>
  );
}
