import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How EveryDayAiWithGraham collects, uses, and protects your information. Plain English, no lawyer-speak.",
};

const LAST_UPDATED = "24 April 2026";

export default function PrivacyPage() {
  return (
    <main className="bg-background">
      <section className="border-b border-border/60 bg-dark py-16 text-dark-foreground">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-sm font-medium tracking-widest text-accent uppercase">
            Privacy
          </p>
          <h1 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-base text-dark-muted">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-8 px-4 sm:px-6">
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              This site is operated by Graham Blackwell, trading as EveryDayAi
              with Graham, based in Perth, Western Australia. This policy
              explains what we collect, why, who we share it with, and how you
              can ask us to change or delete it.
            </p>
            <p>
              Plain English. No lawyer-speak. If something here is unclear,
              email{" "}
              <a
                href="mailto:Graham@EveryDayAiWithGraham.com"
                className="font-medium text-primary hover:underline"
              >
                Graham@EveryDayAiWithGraham.com
              </a>{" "}
              and ask.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              What we collect
            </h2>
            <ul className="ml-5 list-disc space-y-2 text-base leading-relaxed text-muted-foreground">
              <li>
                <strong>Contact form and email</strong> — your name, email, any
                notes you include. We use this to reply.
              </li>
              <li>
                <strong>Chat widget conversations</strong> — the assistant on
                this site (powered by ElevenLabs) records the text and audio of
                your conversation so we can improve our answers. See the
                ElevenLabs section below for how they handle the audio.
              </li>
              <li>
                <strong>Discovery call bookings</strong> — name, email, company,
                role, optional pre-call notes. Captured by Cal.com. Required so
                the call can actually happen.
              </li>
              <li>
                <strong>Paid intake calls</strong> — payment details handled by
                Stripe. We never see your card number. Stripe sends us the last
                4 digits, transaction ID, and billing email only.
              </li>
              <li>
                <strong>Website analytics</strong> — standard page-view counts
                and referrer data via Vercel Analytics. No tracking pixels, no
                ad networks.
              </li>
              <li>
                <strong>Free tool submissions</strong> (e.g. the AI Opportunity
                Scorecard) — your answers and email, so we can show you your
                result and so the follow-up intake call doesn&apos;t start from
                zero.
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              What we do with it
            </h2>
            <ul className="ml-5 list-disc space-y-2 text-base leading-relaxed text-muted-foreground">
              <li>
                Respond to your enquiry or deliver the service you&apos;ve
                booked.
              </li>
              <li>
                Improve our assistants and content. If we quote anything from a
                conversation publicly, we strip identifying details first.
              </li>
              <li>
                Keep proper records for our own business purposes (tax, billing,
                delivery).
              </li>
            </ul>
            <p className="text-base leading-relaxed text-muted-foreground">
              We do <strong>not</strong> sell your data. We do not use it to
              target advertising. We do not share it with third parties except
              the service providers listed below.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Who we share it with
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              A short list of services that see your information in order to
              make this site work:
            </p>
            <ul className="ml-5 list-disc space-y-2 text-base leading-relaxed text-muted-foreground">
              <li>
                <strong>Vercel</strong> — hosts the site and the contact form.
              </li>
              <li>
                <strong>ElevenLabs</strong> — powers the voice and chat
                assistant. Conversations are stored on their infrastructure
                subject to their{" "}
                <a
                  href="https://elevenlabs.io/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  privacy policy
                </a>
                .
              </li>
              <li>
                <strong>Cal.com</strong> — manages bookings for discovery calls
                and paid intake calls.
              </li>
              <li>
                <strong>Stripe</strong> — handles payment processing for paid
                engagements.
              </li>
              <li>
                <strong>Google Workspace</strong> — we receive and send email
                via Google Workspace (Gmail).
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Client confidentiality
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Anything discussed on a discovery call, an intake call, or inside
              a delivery engagement stays inside that engagement. We do not
              publish client names, project details, or specific findings
              without written permission.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              The AI assistants we build for clients are deployed inside the
              client&apos;s own environment wherever practical. Your client data
              does not go into our public tools or training.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How long we keep it
            </h2>
            <ul className="ml-5 list-disc space-y-2 text-base leading-relaxed text-muted-foreground">
              <li>
                Contact form messages: 12 months, then deleted, unless the
                conversation is ongoing.
              </li>
              <li>
                Chat widget transcripts: up to 24 months, then deleted.
              </li>
              <li>
                Paid engagement records: 7 years, as required by Australian tax
                law.
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Your rights
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              You can ask us at any time to:
            </p>
            <ul className="ml-5 list-disc space-y-2 text-base leading-relaxed text-muted-foreground">
              <li>Tell you what information we hold about you.</li>
              <li>Correct anything that&apos;s wrong.</li>
              <li>
                Delete your information (subject to the tax-record obligation
                above).
              </li>
            </ul>
            <p className="text-base leading-relaxed text-muted-foreground">
              Email{" "}
              <a
                href="mailto:Graham@EveryDayAiWithGraham.com"
                className="font-medium text-primary hover:underline"
              >
                Graham@EveryDayAiWithGraham.com
              </a>{" "}
              with &quot;Privacy request&quot; in the subject line.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Changes to this policy
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              If we change how we handle your information in any material way,
              we&apos;ll update the date at the top of this page and, where
              reasonable, let you know by email.
            </p>
          </div>

          <div className="space-y-3 rounded-2xl border border-border/60 bg-muted/30 p-6">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Contact
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Graham Blackwell, trading as EveryDayAi with Graham
              <br />
              Perth, Western Australia
              <br />
              <a
                href="mailto:Graham@EveryDayAiWithGraham.com"
                className="font-medium text-primary hover:underline"
              >
                Graham@EveryDayAiWithGraham.com
              </a>
            </p>
            <p className="pt-2 text-sm text-muted-foreground">
              Looking for something else?{" "}
              <Link href="/contact" className="font-medium text-primary hover:underline">
                Get in touch
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
