import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Graham Blackwell — from finance and operations to AI solutions. 20+ years of business experience, now helping companies work smarter with AI.",
};

const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://everydayaiwithgraham.com/about#webpage",
  url: "https://everydayaiwithgraham.com/about",
  name: "About Graham Blackwell — AI Consultant, Perth WA",
  description:
    "Background and credentials of Graham Blackwell — AI consultant based in Perth, Western Australia, focused on civil engineering, mining services, and construction SMEs.",
  mainEntity: { "@id": "https://everydayaiwithgraham.com/#graham" },
  isPartOf: { "@id": "https://everydayaiwithgraham.com/#organization" },
};

const faqs: { q: string; a: string }[] = [
  {
    q: "Who is Graham Blackwell?",
    a: "Graham Blackwell is an Australian AI consultant based in Perth, Western Australia. He spent 20+ years in finance and business systems leadership at Halo Civil Engineering, Decmil, and Pilbara Resource Group before moving full-time into practical AI consulting for small-to-mid businesses.",
  },
  {
    q: "What does Graham Blackwell do?",
    a: "Graham helps Australian SMEs adopt AI through three productised offers: a fixed-price AI Readiness Review (from AUD $2,500), a 4-week AI Implementation Sprint (from AUD $12,000), and an ongoing AI Advisor Retainer (from AUD $1,500 per month). Common projects include accounts payable automation, document processing, and AI integrations with Procore, InEight, MYOB, and Xero.",
  },
  {
    q: "Where is Graham Blackwell based?",
    a: "Bayswater, Perth, Western Australia. Graham serves clients across Australia and has deep on-the-ground knowledge of the Western Australian civil construction and mining services sector.",
  },
  {
    q: "What industries does Graham work with?",
    a: "Graham specialises in Western Australian civil engineering, earthworks, mining services, drilling, and specialty subcontractor SMEs in the AUD $10M to $100M revenue range. He has hands-on experience implementing Procore at Halo Civil Engineering and Pilbara Resource Group, and InEight remediation at Decmil.",
  },
  {
    q: "What is Graham's professional background?",
    a: "Graham was Finance and Business Systems Manager at Halo Civil Engineering through to October 2025, where he led a successful business rescue from voluntary administration and managed finance across multiple entities at $60 million turnover. Prior roles include Business Systems Manager at Decmil and Business Systems Specialist at Pilbara Resource Group. He also runs the YouTube channel EveryDay AI with Graham, aimed at older Australians learning to use AI.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://everydayaiwithgraham.com/about#faq",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutPageJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {/* Header with photo */}
      <section className="relative overflow-hidden bg-dark py-20 text-dark-foreground sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark to-primary/40" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-3">
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <div className="absolute inset-0 -z-10 translate-y-6 scale-90 rounded-full bg-gradient-to-br from-accent/40 via-primary/30 to-transparent blur-3xl" />
                <Image
                  src="/graham-cutout.png"
                  alt="Graham Blackwell"
                  width={340}
                  height={340}
                  className="relative drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
            <div className="lg:col-span-2">
              <p className="text-sm font-medium tracking-widest text-accent uppercase">About</p>
              <h1 className="mt-3 font-display text-5xl tracking-tight sm:text-6xl lg:text-7xl">
                About Graham
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-dark-muted">
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

      {/* FAQ */}
      <section className="border-t border-border/40 bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Frequently Asked Questions
          </h2>
          <dl className="mt-10 space-y-8">
            {faqs.map((f) => (
              <div key={f.q}>
                <dt className="text-lg font-semibold tracking-tight">{f.q}</dt>
                <dd className="mt-3 text-muted-foreground leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>
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
