"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  defaultTrade: string;
  refUrl: string;
};

const TRADE_OPTIONS = [
  { value: "plumber", label: "Plumber" },
  { value: "electrician", label: "Electrician" },
  { value: "builder", label: "Builder" },
  { value: "real-estate", label: "Real estate" },
  { value: "other", label: "Something else" },
];

export function DemoGateForm({ defaultTrade, refUrl }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [trade, setTrade] = useState(defaultTrade);
  const [businessName, setBusinessName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const resp = await fetch("/api/demo-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          trade,
          business_name: businessName,
          ref_url: refUrl,
        }),
      });
      const data = await resp.json();
      if (!resp.ok) {
        setError(data.error || "Could not save your details — try again?");
        setSubmitting(false);
        return;
      }
      router.push(data.redirectTo);
      router.refresh();
    } catch (err) {
      setError("Network hiccup — give it another go.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@business.com.au"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="trade" className="block text-sm font-medium mb-1">
          What kind of business do you run?
        </label>
        <select
          id="trade"
          value={trade}
          onChange={(e) => setTrade(e.target.value)}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          {TRADE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="business" className="block text-sm font-medium mb-1">
          Business name <span className="text-muted-foreground">(optional)</span>
        </label>
        <input
          id="business"
          type="text"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          placeholder="e.g. Smith & Sons Plumbing"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
      </div>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting || !email}
        className="w-full rounded-md bg-primary text-primary-foreground py-2.5 px-4 text-sm font-medium disabled:opacity-50"
      >
        {submitting ? "One moment…" : "Try the demo"}
      </button>

      <p className="text-xs text-muted-foreground">
        We&apos;ll email you a one-pager about Always On Front Desk afterwards. No spam, no list rental.
      </p>
    </form>
  );
}
