import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

import { AOFD_TRADES, getTrade } from "@/lib/aofd-config";
import { DEMO_GATE_COOKIE, verifyDemoGate } from "@/lib/demo-gate";
import { DemoGateForm } from "@/components/demo-gate-form";
import { DemoWidget } from "@/components/demo-widget";

type RouteProps = {
  params: Promise<{ trade: string }>;
};

export async function generateStaticParams() {
  return Object.keys(AOFD_TRADES).map((trade) => ({ trade }));
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { trade } = await params;
  const cfg = getTrade(trade);
  if (!cfg) return { title: "Demo not found" };
  return {
    title: cfg.pageTitle,
    description: `Try the Always On Front Desk AI ${cfg.slug.replace("-", " ")} demo. See exactly what your customers would experience when they call after hours.`,
  };
}

export default async function DemoPage({ params }: RouteProps) {
  const { trade } = await params;
  const cfg = getTrade(trade);
  if (!cfg) notFound();

  const cookieJar = await cookies();
  const token = cookieJar.get(DEMO_GATE_COOKIE)?.value ?? "";
  const gate = token ? await verifyDemoGate(token) : null;
  const unlocked = gate !== null;

  const refUrl = `/demo/${cfg.slug}`;

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-2">
        <Link
          href="/services/always-on-front-desk"
          className="text-sm text-muted-foreground hover:text-accent"
        >
          ← Back to Always On Front Desk
        </Link>
      </div>

      <h1 className="font-display text-4xl tracking-tight sm:text-5xl">
        {cfg.pageTitle.replace("Always On Front Desk — ", "")}
      </h1>

      <p className="mt-4 text-base text-muted-foreground">
        Persona for this demo: <strong className="text-foreground">{cfg.personaName}</strong>{" "}
        (a fictional business). The AI you&apos;ll talk to is the same agent we&apos;d set up for a paying client, configured for {cfg.personaDescriptor}.
      </p>

      <div className="mt-8 rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">Try this scenario</h2>
        <p className="mt-2 text-sm leading-relaxed">{cfg.scenarioPrompt}</p>
      </div>

      <div className="mt-10">
        {unlocked ? (
          <>
            <h2 className="text-xl font-semibold mb-4">Start the demo</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Click the chat bubble in the bottom corner to begin. You can speak or type — the AI will adapt.
            </p>
            <DemoWidget agentId={cfg.agentId} />

            <div className="mt-12 rounded-lg border border-border bg-card p-6">
              <h2 className="text-lg font-semibold">Like what you see?</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                On a paying engagement we wire this AI to your actual phone number, your calendar, and your team&apos;s mobile so missed calls become captured leads in seconds. Fixed price AUD $5,000.
              </p>
              <Link
                href="https://cal.com/everydayaiwithgraham/book-a-free-30-min-discovery-call"
                className="mt-4 inline-block rounded-md bg-primary text-primary-foreground py-2 px-4 text-sm font-medium"
              >
                Book a free 30-min discovery call
              </Link>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-2">Quick details first</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Three fields, one click. The demo unlocks straight after.
            </p>
            <DemoGateForm defaultTrade={cfg.slug} refUrl={refUrl} />
          </>
        )}
      </div>
    </main>
  );
}
