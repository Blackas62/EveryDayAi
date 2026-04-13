import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Graham Blackwell — from finance and operations to AI solutions. 20+ years of business experience, now helping companies work smarter with AI.",
};

export default function AboutPage() {
  return (
    <>
      {/* Header with photo */}
      <section className="bg-gradient-to-br from-secondary via-background to-accent/10 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-3">
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-accent/25 to-primary/15 blur-xl" />
                <Image
                  src="/graham.jpg"
                  alt="Graham Blackwell"
                  width={280}
                  height={280}
                  className="relative rounded-2xl object-cover shadow-lg"
                  priority
                />
              </div>
            </div>
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                About Graham
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Finance and operations professional turned AI builder. I bridge
                the gap between business needs and technology solutions — and I
                reckon that&apos;s where the magic happens.
              </p>
            </div>
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
                  One stint stands out. As CFO of a regional airline, I steered
                  the business through the 9/11 aftermath and the Ansett
                  collapse landing at the same time — renegotiating with
                  bankers, holding the cash position, keeping 200+ staff paid
                  while the industry was in freefall. You learn a lot about
                  what matters when everything&apos;s on the line at once.
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
                  I&apos;ve been writing about business disruption and
                  data-driven decision-making since 2018 — so this isn&apos;t a
                  bandwagon for me. It&apos;s the direction I&apos;ve been
                  pointing at for years, finally with the tools to back it up.
                </p>
                <p>
                  So I taught myself to build. Python, React, Next.js, APIs —
                  not from a CS degree, but from a genuine need to make things
                  work. I built an AI assistant that manages my email and makes
                  phone calls. I built a nurse safety app for hospital workers.
                  I built an automated video production pipeline for
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
              <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                <h2 className="text-2xl font-bold tracking-tight">
                  Beyond Work
                </h2>
                <div className="mt-4 space-y-4 text-muted-foreground text-sm leading-relaxed">
                  <p>
                    Based in Perth, Western Australia. When I&apos;m not building
                    AI solutions, you&apos;ll find me out on the road bike —
                    usually with a group called the Fat Bastards — or involved
                    with the local Men&apos;s Shed.
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
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-primary to-primary/85 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-primary-foreground sm:text-3xl">
            Want to work together?
          </h2>
          <p className="mt-4 text-primary-foreground/80">
            I&apos;m always happy to chat about how AI can help your business.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex h-11 items-center justify-center rounded-xl bg-white px-7 text-sm font-medium text-primary shadow-sm transition-all hover:bg-white/90 hover:shadow-md"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
