# EveryDayAi Voice Assistant — Build Spec

**Status:** Draft, ready to test
**Last updated:** 2026-04-17
**Target site:** everydayaiwithgraham.com (Next.js 16, Vercel)

---

## 1. Purpose

A browser-based voice assistant on the EveryDayAi site that:
- Answers inbound visitor questions about the three service offers.
- Qualifies the caller (business, size, pain point).
- Captures contact details so Graham can follow up within 24 hours.

Target audience: older Australian SME owners who would rather talk than fill in a form.

---

## 2. Stack

| Layer | Choice | Why |
|---|---|---|
| Voice platform | **ElevenLabs Conversational AI** | Bundled STT + LLM + TTS over one WebRTC socket. ~400ms first audio. |
| LLM backend | **Claude Sonnet 4.6** (via ElevenLabs ConvAI) | Matches Harry's brain, best reasoning for qualification |
| Voice | Stock ElevenLabs voice — **not** Graham's clone | See §4 |
| Embed | `<elevenlabs-convai>` web component in Next.js root layout | One script tag, zero build complexity |
| Lead capture | `POST /api/voice-leads` → Postgres + Resend email | Reuse existing stack |
| Hosting | Vercel (existing) | No change |

**Rejected:** Twilio browser SDK + separate Deepgram/Claude/ElevenLabs pipeline (700ms+ latency, three bills, more to break).

---

## 3. Latency target

- **<500ms first audio** after user finishes speaking.
- ElevenLabs ConvAI + WebRTC delivers this out-of-the-box on good connections.
- Fallback: if visitor is on a bad connection, widget degrades to text chat gracefully.

---

## 4. Voice identity

**Clearly not Graham.** Introduced explicitly as "Graham's AI assistant."

Reasons:
1. Avoids impersonation ambiguity on a commercial page.
2. Sets honest expectations — reinforces the AI-first brand positioning.
3. Keeps Graham's voice clone reserved for Harry + video content.

**Shortlist to audition:**
- A warm female Australian voice (receptionist feel, most trusted by SME audience).
- A neutral English voice (professional services firm feel).
- **Avoid:** Charlie — already used for UpfrontJobs VO. Keep brand voices distinct.

---

## 5. System prompt (v1)

```
You are Graham's AI assistant on everydayaiwithgraham.com. Graham
Blackwell is a 20-year operations and finance operator who helps
Australian SMEs put AI to work in their business.

You are NOT Graham. If asked directly, say so.

Your job:
1. Greet warmly. Identify yourself as Graham's AI assistant.
2. Answer questions about the three service offers:
   - AI Readiness Review — $2,500 one-off
   - 90-Day Sprint — $12,000 fixed scope
   - Ongoing Retainer — $1,500/month
3. Qualify: what's the business, what's slowing them down, how many
   staff, where are they based.
4. If they're interested, call the capture_lead tool with their name,
   email, phone, business, and notes.
5. Tell them Graham will personally call back within 24 hours.

You must NOT:
- Pretend to be Graham.
- Give free consulting or specific technical advice.
- Name or discuss competitors.
- Negotiate prices.
- Book calendar slots directly.
- Drift off-topic or discuss anything outside the three offers.

Tone: calm, practical, Australian. Short sentences. Plain English —
if you need a technical term, explain it in parentheses.

If a question is outside the three offers, say:
"That's a good question for Graham directly — let me take your
details and he'll call you back."
```

---

## 6. Tools (function calls)

### `capture_lead`
Called when a visitor shares contact details.

```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "business_name": "string",
  "staff_count": "string",
  "interest": "audit | sprint | retainer | unsure",
  "pain_point": "string",
  "notes": "string"
}
```

Endpoint: `POST /api/voice-leads`
Behaviour: store row in Postgres, email Graham (Resend), ack back to the agent so it can tell the caller.

---

## 7. Widget placement

- **Floating button** bottom-right on every page.
- **Prominent CTA** on `/services`: *"Prefer to talk? Ask our assistant."*
- **Honest framing** in the UI before the call starts:
  > Speak with Graham's AI assistant — ask about our offers or leave your details for a callback.

---

## 8. Guardrails

| Control | Value |
|---|---|
| Rate limit | 5 calls per IP per day |
| Call duration cap | 5 minutes hard cap |
| Daily cost ceiling | $20 AUD (~60 min) — ElevenLabs dashboard |
| PII handling | Only store in our DB; don't repeat PII back beyond confirmation |
| Logging | Full transcript + timestamp + lead status |
| Failover | If ElevenLabs down, widget shows "Chat with us" text form |

---

## 9. Build steps (half-day)

1. Create ElevenLabs ConvAI agent in their dashboard.
2. Paste system prompt; pick voice (from §4 shortlist); select Claude Sonnet 4.6.
3. Define `capture_lead` tool webhook → pointing at our Next.js API route.
4. Add `<elevenlabs-convai agent-id="...">` script to `app/layout.tsx`.
5. Build `/api/voice-leads` — validate payload, write row, send email.
6. Add the floating button + `/services` CTA.
7. Test against §10 scenarios.
8. Soft launch — enable widget on `/services` only for 48h before going site-wide.

---

## 10. Test scenarios

| # | Input | Expected behaviour |
|---|---|---|
| 1 | "What do you do?" | Explain EveryDayAi in one sentence, list 3 offers |
| 2 | "How much is the review?" | $2,500 one-off, what's included |
| 3 | "Are you Graham?" | "No, I'm his AI assistant" |
| 4 | "Can you help me fix my computer?" | Decline politely, offer callback |
| 5 | "15-person plumbing business, drowning in quotes" | Qualify further, probably steer to Sprint |
| 6 | "Can you do it cheaper?" | No negotiation, offer Review as lower-cost entry |
| 7 | "What about [competitor]?" | Don't engage, refocus on EveryDayAi value |
| 8 | "Book me a call Tuesday 2pm" | Take details, promise Graham calls — don't book |
| 9 | "My email is graham@example.com" | Confirm spelling, capture via tool |
| 10 | Silent / noisy audio | Graceful re-prompt, offer text chat |

---

## 11. Cost projections

- ElevenLabs ConvAI: ~$0.08/min all-in.
- Baseline: 20 calls/day × 3 min = 60 min/day = **$4.80/day (~$144/mo)**.
- Daily hard cap at $20 covers bursty days.

---

## 12. Decisions (resolved 2026-04-17)

1. **ElevenLabs account** — ConvAI is included on all paid plans (and free tier). No upgrade needed. Overage $0.08/min.
2. **Lead storage** — **No database**. Leads are delivered to Gmail (Resend) + Telegram (Harry's bot). Gmail is the searchable archive. Revisit if call volume passes ~100/mo.
3. **Notification channel** — **Both**: email via Resend + Telegram via Harry's @Grahambot_bot.
4. **Analytics** — Vercel Analytics (already installed) + ElevenLabs dashboard for call metrics. Skip PostHog for v1.
5. **Privacy page** — Disclosure is baked into the agent's first message + the /services nudge copy.

## 13. Shipped 2026-04-17

Code:
- `lib/voice-leads.ts` — email + Telegram fan-out via `Promise.allSettled`.
- `app/api/voice-leads/route.ts` — receives ElevenLabs' post-call webhook, verifies HMAC signature, extracts fields from `analysis.data_collection_results`.
- `components/voice-widget.tsx` — loads `<elevenlabs-convai>` + `next/script`, renders nothing if agent ID env var missing.
- `app/layout.tsx` — mounts `<VoiceWidget />` site-wide.
- `app/services/page.tsx` — "Prefer to talk?" nudge above the FAQ.
- `.env.local.example` — documents the four new env vars.
- `VOICE_ASSISTANT_SETUP.md` — manual ElevenLabs + Vercel steps to flip it on.

Build status: `next build` passes clean. New route appears as `ƒ /api/voice-leads` (dynamic).

## 14. Refactor 2026-04-17 (later that day)

Dropped bespoke bits in favour of ElevenLabs' native platform features:
- **Data Collection** — agent's dashboard defines the fields (name, email, phone, business_name, staff_count, interest, pain_point, notes). Their LLM extracts them from the transcript after every call. No more custom tool call.
- **Post-call webhook** — one webhook per call with transcript + extracted data + summary + call_successful flag. HMAC-signed with `ElevenLabs-Signature` header. Our route validates and only notifies if name/email/phone was captured (skips tire-kickers).
- **Knowledge Base** — agent pulls from uploaded URLs (/services, /about, /). System prompt shrunk to tone + guardrails only. Site edits auto-propagate.
- **Simulate Conversations** — built-in test harness replaces manual run-through.

Net result: ~40% less custom code, tighter integration, prompt stays short.

Still required (manual, Graham):
1. Create ElevenAgents agent (voice + short system prompt).
2. Upload 3 URLs to the agent's Knowledge Base.
3. Define 8 Data Collection fields.
4. Configure post-call webhook URL + HMAC secret.
5. Drop 4 env vars into Vercel.
6. Test via Simulate Conversations + one live call.

---

## 13. Success metrics (first 30 days)

- ≥50 calls initiated
- ≥60% call completion rate (not abandoned in first 10s)
- ≥10 qualified leads captured (contact details + real business)
- ≥2 paid engagements attributed to the widget
- Zero impersonation complaints
