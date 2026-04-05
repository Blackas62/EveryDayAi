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
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              AI solutions for{" "}
              <span className="text-primary">real businesses</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              I help Australian businesses cut costs and work smarter with
              practical AI automation, custom software, and hands-on experience
              from 20+ years in finance and operations.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/services"
                className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
              >
                See What I Can Build
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-6 text-sm font-medium transition-colors hover:bg-muted"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
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
              <Card key={service.title} className="transition-shadow hover:shadow-md">
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
      <section className="border-y bg-muted/40 py-12 sm:py-16">
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

      {/* YouTube Preview — placeholder until Phase 4 wires up API */}
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
                className="overflow-hidden rounded-lg border bg-card"
              >
                <div className="aspect-video bg-muted" />
                <div className="p-4">
                  <div className="h-4 w-3/4 rounded bg-muted" />
                  <div className="mt-2 h-3 w-1/2 rounded bg-muted" />
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

      {/* Footer CTA */}
      <section className="bg-primary py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-primary-foreground sm:text-3xl">
            Ready to put AI to work for your business?
          </h2>
          <p className="mt-4 text-primary-foreground/80">
            No jargon. No hype. Just practical solutions that save you time and
            money.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex h-10 items-center justify-center rounded-lg bg-white px-6 text-sm font-medium text-primary transition-colors hover:bg-white/90"
          >
            Let&apos;s Talk
          </Link>
        </div>
      </section>
    </>
  );
}
