"use client";

import Script from "next/script";
import { useState } from "react";

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        "elevenlabs-convai": {
          "agent-id"?: string;
          "default-expanded"?: string;
          transcript?: string;
          "dynamic-variables"?: string;
          children?: React.ReactNode;
        };
      }
    }
  }
}

type Props = {
  token: string;
  firstName: string;
  scheduledAt: string;
};

type Step = "verify" | "ready";

export function InterviewGate({ token, firstName, scheduledAt }: Props) {
  const [step, setStep] = useState<Step>("verify");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agentId, setAgentId] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);

  const when = new Date(scheduledAt).toLocaleString("en-AU", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Australia/Perth",
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/interview/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, email }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        agentId?: string;
        bookingId?: string;
        error?: string;
      };
      if (!res.ok || !data.ok || !data.agentId || !data.bookingId) {
        setError(data.error || "Couldn't verify — try again.");
        return;
      }
      setAgentId(data.agentId);
      setBookingId(data.bookingId);
      setStep("ready");
    } catch {
      setError("Network error — try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (step === "ready" && agentId && bookingId) {
    return (
      <div className="space-y-6">
        <div className="rounded-lg border border-border/60 bg-card p-6">
          <h2 className="text-2xl font-bold tracking-tight">Ian's ready when you are</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Click the chat widget (bottom-right of your screen) to start. Ian will
            walk you through a 45–55 minute conversation about your business.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
            <li>• Find somewhere quiet with a decent microphone</li>
            <li>• Speak naturally — Ian will ask follow-ups if he needs more</li>
            <li>• If you need to stop and come back, just close the tab — the link still works</li>
          </ul>
        </div>

        <elevenlabs-convai
          agent-id={agentId}
          default-expanded="true"
          transcript="true"
          dynamic-variables={JSON.stringify({ booking_id: bookingId })}
        />
        <Script
          src="https://unpkg.com/@elevenlabs/convai-widget-embed"
          strategy="afterInteractive"
          async
          type="text/javascript"
        />
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 rounded-lg border border-border/60 bg-card p-6 sm:p-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Just confirming it's you, {firstName}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Scheduled for <strong>{when}</strong> (Perth time).
        </p>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email you used to book
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 block w-full rounded-md border border-border bg-background px-3 py-2 text-base shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="you@company.com"
          disabled={submitting}
        />
      </div>

      {error ? (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting || !email}
        className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 disabled:opacity-60"
      >
        {submitting ? "Checking…" : "Continue"}
      </button>

      <p className="text-xs text-muted-foreground leading-relaxed">
        We check this against the email on your booking. Nothing gets sent
        anywhere — it's just to make sure this link didn't land in the wrong
        inbox.
      </p>
    </form>
  );
}
