import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Glossary",
  description:
    "Plain-English definitions of the AI terms and productised offers used across EveryDay AI with Graham — from AI Readiness Reviews to RFQ Automation, written for Australian SME owners.",
};

const terms: { name: string; aka?: string; description: string }[] = [
  {
    name: "AI Advisor Retainer",
    description:
      "Ongoing engagement where a senior AI consultant acts as a fractional advisor for an SME — monthly strategy call, async Q&A access, and one quarterly implementation included. Sized for businesses that want continuous AI coverage without hiring a full-time lead. Priced from AUD $1,500 per month, three-month minimum, via EveryDay AI with Graham.",
  },
  {
    name: "AI Agent",
    description:
      "An AI system that takes actions on behalf of a user — sending emails, querying systems, triggering workflows — rather than only answering questions. Common SME applications include customer-service triage, internal knowledge assistants, and scheduled monitoring. Graham runs his own multi-model agent, Harry, which handles email, phone calls, and home automation around the clock.",
  },
  {
    name: "AI Implementation Sprint",
    description:
      "Fixed-scope four-week engagement that picks one workflow — invoice processing, document extraction, RFQ drafting — and ships a working AI-powered replacement plus team training. The buyer ends with deployed software, not a slide deck. Priced from AUD $12,000 via EveryDay AI with Graham.",
  },
  {
    name: "AI Readiness Review",
    description:
      "Structured one-week assessment of where AI can deliver the highest ROI in a small-to-mid business. Outputs a written report ranking five to ten opportunities by payback, effort, and risk, plus a 90-minute walk-through. Designed for businesses that want a defensible \"where do we start\" answer before committing budget. Priced from AUD $2,500 via EveryDay AI with Graham.",
  },
  {
    name: "AP Automation",
    aka: "Accounts Payable Automation",
    description:
      "End-to-end automation of supplier invoice processing — extraction (OCR), GL coding, GST treatment, approval routing, and posting to the accounting ledger. A mature category with clear ROI for any business processing 100 or more invoices a month. Common Australian stack pairings: Xero with Hubdoc, MYOB with ApprovalMax, and Procore Invoice Management.",
  },
  {
    name: "Custom GPT",
    description:
      "A version of OpenAI's ChatGPT customised with company-specific knowledge, tone, and instructions. Useful for trainee onboarding assistants, standardising RFI responses, and \"ask the company manual\" lookups. Graham built one for Halo Civil Engineering's internal use during his time as Finance and Business Systems Manager.",
  },
  {
    name: "Document AI",
    aka: "Document OCR",
    description:
      "Using machine learning to extract structured data from PDFs, scans, and photos — drawings, invoices, timesheets, ITPs, and compliance certificates. Modern document AI handles handwriting and low-quality scans far better than legacy OCR. Often the first AI implementation a construction SME runs.",
  },
  {
    name: "RFQ Automation",
    aka: "Request for Quote Automation",
    description:
      "Using AI to draft, classify, or partially respond to RFQs received from head contractors or clients. In construction, common targets are extracting requirements from bid documents, populating estimating templates, and drafting standard schedules of rates. Saves estimators hours per week.",
  },
];

const definedTermSetJsonLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": "https://everydayaiwithgraham.com/glossary#termset",
  name: "EveryDay AI Glossary",
  description:
    "Plain-English definitions of AI terms and productised consulting offers used across EveryDay AI with Graham.",
  url: "https://everydayaiwithgraham.com/glossary",
  hasDefinedTerm: terms.map((t) => ({
    "@type": "DefinedTerm",
    "@id": `https://everydayaiwithgraham.com/glossary#${t.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    name: t.name,
    ...(t.aka ? { alternateName: t.aka } : {}),
    description: t.description,
    inDefinedTermSet: "https://everydayaiwithgraham.com/glossary#termset",
  })),
};

const glossaryWebPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://everydayaiwithgraham.com/glossary#webpage",
  url: "https://everydayaiwithgraham.com/glossary",
  name: "AI Glossary — EveryDay AI with Graham",
  description:
    "Plain-English definitions of the AI terms and productised offers used across EveryDay AI with Graham.",
  isPartOf: { "@id": "https://everydayaiwithgraham.com/#organization" },
  mainEntity: { "@id": "https://everydayaiwithgraham.com/glossary#termset" },
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function GlossaryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(definedTermSetJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(glossaryWebPageJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Header */}
      <section className="relative overflow-hidden bg-dark py-20 text-dark-foreground sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark to-primary/40" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <p className="text-sm font-medium tracking-widest text-accent uppercase">Reference</p>
          <h1 className="mt-3 font-display text-5xl tracking-tight sm:text-6xl">
            AI Glossary
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-dark-muted">
            Plain-English definitions of the AI terms and productised offers used across this site —
            written for SME owners, not engineers.
          </p>
        </div>
      </section>

      {/* Quick index */}
      <section className="border-b border-border/40 py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <nav aria-label="Glossary terms">
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {terms.map((t) => (
                <li key={t.name}>
                  <a href={`#${slugify(t.name)}`} className="text-primary hover:underline">
                    {t.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* Terms */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <dl className="space-y-12">
            {terms.map((t) => (
              <div key={t.name} id={slugify(t.name)} className="scroll-mt-24">
                <dt className="text-2xl font-bold tracking-tight">
                  {t.name}
                  {t.aka ? (
                    <span className="ml-2 text-base font-normal text-muted-foreground">
                      ({t.aka})
                    </span>
                  ) : null}
                </dt>
                <dd className="mt-3 text-muted-foreground leading-relaxed">{t.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-primary to-primary/85 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-primary-foreground sm:text-3xl">
            Got a term we should add?
          </h2>
          <p className="mt-4 text-primary-foreground/80">
            If there&apos;s an AI term you keep running into and can&apos;t pin down, send it through.
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
