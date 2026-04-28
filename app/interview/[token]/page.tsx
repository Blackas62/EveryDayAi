import type { Metadata } from "next";
import { verifyTicket } from "@/lib/readiness-tickets";
import { InterviewGate } from "@/components/interview-gate";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "AI Readiness Review — Interview",
  description: "Your unique interview link with George, Graham's AI intake assistant.",
  robots: { index: false, follow: false },
};

type Params = { token: string };

export default async function InterviewPage({ params }: { params: Promise<Params> }) {
  const { token } = await params;

  try {
    const ticket = await verifyTicket(token);
    const firstName = ticket.name.split(" ")[0] || "there";
    return (
      <main className="min-h-[70vh] bg-background">
        <section className="relative overflow-hidden bg-dark py-16 text-dark-foreground sm:py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark to-primary/40" />
          <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
            <p className="text-sm font-medium tracking-widest text-accent uppercase">
              AI Readiness Review
            </p>
            <h1 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
              Your intake interview
            </h1>
            <p className="mt-4 text-lg text-dark-muted">
              Hi {firstName} — George's Graham's AI intake assistant. Confirm it's you, then he'll join on voice.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-2xl px-4 sm:px-6">
            <InterviewGate
              token={token}
              firstName={firstName}
              scheduledAt={ticket.scheduledAt}
            />
          </div>
        </section>
      </main>
    );
  } catch {
    return (
      <main className="min-h-[70vh] bg-background">
        <section className="py-20">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
            <h1 className="font-display text-4xl tracking-tight sm:text-5xl">
              This link isn't valid
            </h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              The interview link has expired or the URL is malformed. If this is
              your link and something's gone wrong, email Graham at{" "}
              <a href="mailto:Graham@EveryDayAiWithGraham.com" className="text-primary hover:underline">
                Graham@EveryDayAiWithGraham.com
              </a>{" "}
              and he'll sort it out.
            </p>
          </div>
        </section>
      </main>
    );
  }
}
