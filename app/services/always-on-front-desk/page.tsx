import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AOFD_TRADES } from "@/lib/aofd-config";

export const metadata: Metadata = {
  title: "Always On Front Desk — AI Receptionist for Australian Trades & Real Estate",
  description:
    "Your competitor calls back in 47 hours. Yours can call back in 90 seconds. Always On Front Desk is an AI-powered first responder that captures missed-call leads for tradies, real estate agents, and any small business with a phone. Fixed price AUD $5,000.",
};

const faqs = [
  {
    q: "Will the AI quote prices to my customers?",
    a: "No, never. The AI captures the enquiry, gathers what's needed, and books a callback. Pricing always goes through you. That's a hard rule baked into every install.",
  },
  {
    q: "What happens to the lead after the AI takes the call?",
    a: "Standard install: the AI sends you an SMS summary the moment the call ends. Name, suburb, phone, what they need, urgency level, and a transcript. Read it whenever you next pick up your mobile and ring them back.",
  },
  {
    q: "Do I need to change my phone number?",
    a: "No. We set up a simple call-forwarding rule on your existing business mobile or landline: if you don't pick up in four rings, the call rolls to the AI. Your customers keep dialling the same number you've always had.",
  },
  {
    q: "Can it be customised for my exact business?",
    a: "Yes. Every install is tuned to your services, your suburbs, your typical jobs, and the way you talk to customers. The four demos on this page are configured for sample businesses — yours will be tuned to you.",
  },
  {
    q: "What if it gets something wrong in the early weeks?",
    a: "Thirty days of fine-tuning support is included. You forward us anything the AI handled badly, we adjust the prompt and the knowledge base, and the next call gets it right. Most installs settle inside two weeks.",
  },
  {
    q: "What if I want it to actually book jobs in my calendar, not just take messages?",
    a: "That's a paid upgrade — we wire the AI into your existing calendar (Google Calendar, Cal.com, Outlook) so it can offer real available times. Adds about a day to setup. Discuss on the discovery call.",
  },
  {
    q: "How is this different from a regular voicemail or answering service?",
    a: "Voicemail asks the customer to leave a message and most don't. A human answering service costs roughly $300-500 a month and is only available during their hours. The AI handles every call instantly, twenty-four hours a day, captures structured detail, and never has a sick day.",
  },
];

export default function AlwaysOnFrontDeskPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      {/* Hero */}
      <section className="text-center mb-16">
        <p className="text-sm uppercase tracking-widest text-accent mb-4 font-semibold">
          Always On Front Desk
        </p>
        <h1 className="font-display text-4xl tracking-tight sm:text-5xl lg:text-6xl">
          Your competitor calls back in 47 hours.
        </h1>
        <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl text-accent">
          Yours can call back in 90 seconds.
        </h2>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
          Always On Front Desk is an AI-powered first responder that catches the
          calls and enquiries you miss. It captures what the customer needs, books a
          callback, and sends the lead summary straight to your mobile. After hours,
          weekends, while you&apos;re up a ladder.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="#try-it"
            className="inline-block rounded-md bg-primary text-primary-foreground py-3 px-6 text-base font-medium"
          >
            Try a live demo
          </Link>
          <Link
            href="/contact?topic=always-on-front-desk"
            className="inline-block rounded-md border border-border bg-background py-3 px-6 text-base font-medium hover:bg-secondary"
          >
            Book a discovery call
          </Link>
        </div>
      </section>

      {/* Problem */}
      <section className="mb-16 rounded-lg border border-border bg-card p-6 sm:p-8">
        <h2 className="font-display text-2xl tracking-tight sm:text-3xl mb-4">
          Half your leads quietly slip through the cracks
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          The research is clear and brutal: businesses that respond to a new
          enquiry inside five minutes win roughly ten times more deals than those
          that take thirty minutes or longer. For a tradie up a ladder, a real
          estate agent at an open home, or a small business owner doing the actual
          work, those five minutes are usually impossible. So the customer rings
          the next person on the list.
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Always On Front Desk closes that gap by being available the moment your
          phone rings. The customer feels handled instantly. You get a summary on
          your mobile. You ring back when you&apos;re free, with the context already
          there.
        </p>
      </section>

      {/* What you get */}
      <section className="mb-16">
        <h2 className="font-display text-2xl tracking-tight sm:text-3xl mb-2">
          What you get
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Fixed price AUD $5,000. One week setup. Thirty days of fine-tuning
          support included.
        </p>
        <ul className="space-y-3 text-base leading-relaxed">
          <li className="flex gap-3">
            <span className="text-accent flex-shrink-0">✓</span>
            <span>
              An AI-powered first responder configured for your business, your
              services, your suburbs, your tone of voice.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent flex-shrink-0">✓</span>
            <span>
              Live on your existing phone number (call forwarding) and on your
              website (chat widget). No number changes, no new tools to learn.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent flex-shrink-0">✓</span>
            <span>
              Every captured lead arrives as an SMS to your mobile within
              seconds: name, suburb, phone, what they need, urgency, full
              transcript.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent flex-shrink-0">✓</span>
            <span>
              Hard rule baked in: the AI never quotes prices and never makes
              commitments on your behalf. You stay in control of the
              relationship.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent flex-shrink-0">✓</span>
            <span>
              Thirty days of fine-tuning after go-live. We adjust the wording, the
              knowledge base, the escalation rules until it sounds right.
            </span>
          </li>
        </ul>
      </section>

      {/* Try the demos */}
      <section id="try-it" className="mb-16">
        <h2 className="font-display text-2xl tracking-tight sm:text-3xl mb-2">
          Try it for yourself
        </h2>
        <p className="text-base text-muted-foreground mb-6">
          Pick the closest match to your business and have a real conversation
          with the AI. Voice or text. Tell us where to send your demo access link.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {Object.values(AOFD_TRADES).map((trade) => (
            <Link key={trade.slug} href={`/demo/${trade.slug}`} className="block">
              <Card className="h-full transition-colors hover:border-accent">
                <CardHeader>
                  <CardTitle className="text-xl">
                    {trade.slug === "real-estate"
                      ? "Real estate agency"
                      : trade.slug.charAt(0).toUpperCase() + trade.slug.slice(1)}
                  </CardTitle>
                  <CardDescription>{trade.personaName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {trade.scenarioPrompt}
                  </p>
                  <p className="mt-3 text-sm text-accent font-medium">
                    Try this demo →
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mb-16 rounded-lg border border-border bg-card p-6 sm:p-8">
        <h2 className="font-display text-2xl tracking-tight sm:text-3xl mb-6">
          How a paying engagement runs
        </h2>
        <ol className="space-y-6">
          <li className="flex gap-4">
            <span className="font-display text-3xl text-accent flex-shrink-0 leading-none">
              1
            </span>
            <div>
              <h3 className="font-semibold text-lg mb-1">
                Free 30-minute discovery call
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We walk through how leads currently reach you, what your typical
                customer interaction sounds like, and where the AI will and
                won&apos;t add value. Honest fit-or-no-fit conversation. No
                obligation.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="font-display text-3xl text-accent flex-shrink-0 leading-none">
              2
            </span>
            <div>
              <h3 className="font-semibold text-lg mb-1">
                One week of setup
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We configure the AI for your business, write the knowledge base
                from your existing materials, hook up call forwarding from your
                mobile, and embed the chat widget on your website. You sign off
                on the dialogue before it goes live.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="font-display text-3xl text-accent flex-shrink-0 leading-none">
              3
            </span>
            <div>
              <h3 className="font-semibold text-lg mb-1">
                Go live with thirty days of tuning
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The AI handles missed calls and after-hours enquiries from day
                one. You forward us anything that sounds off in the first month
                and we adjust. Most installs settle inside two weeks.
              </p>
            </div>
          </li>
        </ol>
      </section>

      {/* FAQs */}
      <section className="mb-16">
        <h2 className="font-display text-2xl tracking-tight sm:text-3xl mb-6">
          Common questions
        </h2>
        <dl className="space-y-6">
          {faqs.map((f) => (
            <div key={f.q}>
              <dt className="font-semibold mb-2">{f.q}</dt>
              <dd className="text-sm text-muted-foreground leading-relaxed">
                {f.a}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Final CTA */}
      <section className="rounded-lg border border-border bg-card p-6 sm:p-10 text-center">
        <h2 className="font-display text-2xl tracking-tight sm:text-3xl mb-3">
          Ready to stop losing leads?
        </h2>
        <p className="text-base text-muted-foreground mb-6 max-w-xl mx-auto">
          Book a free thirty-minute discovery call. We&apos;ll work out together
          whether Always On Front Desk is the right fit for how you operate.
        </p>
        <Link
          href="/contact?topic=always-on-front-desk"
          className="inline-block rounded-md bg-primary text-primary-foreground py-3 px-6 text-base font-medium"
        >
          Book a discovery call
        </Link>
      </section>
    </main>
  );
}
