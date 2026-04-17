# Voice Assistant — Setup Steps

**Code is built. This doc is what you (Graham) need to do in the ElevenLabs dashboard + Vercel to turn it on.**

Uses ElevenLabs' native features (Data Collection + Post-Call Webhook + Knowledge Base) rather than a custom tool call. Less code, more of their platform doing the work.

Code that shipped:
- `app/api/voice-leads/route.ts` — receives ElevenLabs' post-call webhook, verifies HMAC signature, pulls lead fields out of `analysis.data_collection_results`.
- `lib/voice-leads.ts` — fans out to Gmail (Resend) + Telegram (Harry's bot).
- `components/voice-widget.tsx` — loads the ElevenLabs widget site-wide.
- `app/services/page.tsx` — "Prefer to talk?" nudge above the FAQ.

Nothing is live until the five steps below are done.

---

## Step 1 — Create the ElevenAgents agent

1. Log in to https://elevenlabs.io and open **Agents → Create agent**.
2. Name: `EveryDayAi Assistant`.
3. **Voice** — audition 2–3 stock voices. Pick a warm female Australian voice (receptionist feel). **Do NOT pick your own clone.**
4. **LLM** — Claude Sonnet 4.6 if available, otherwise Claude 3.5 Sonnet.
5. **First message:**
   > Hi, I'm Graham's AI assistant — not Graham himself. I can answer questions about the three service packages or take your details so Graham can call you back. What brings you here today?
6. **System prompt** — paste the shortened version from [Appendix A](#appendix-a--system-prompt). It's deliberately short because the Knowledge Base (Step 2) does the heavy lifting.
7. **Language detection** — enable if you want non-English callers handled gracefully. Optional.
8. **Daily cap** — set to 30 minutes (protects against runaway cost).
9. Save. Copy the **Agent ID** from the URL or settings panel — needed in Step 4.

---

## Step 2 — Upload Knowledge Base documents

Still inside the agent's settings, open **Knowledge Base** and add these sources. ElevenLabs will scrape and index them automatically.

| Type | Source |
|---|---|
| URL | `https://everydayaiwithgraham.com/services` |
| URL | `https://everydayaiwithgraham.com/about` |
| URL | `https://everydayaiwithgraham.com/` |

Benefit: whenever you update a page, the agent picks up the changes the next time ElevenLabs re-indexes (daily by default). No need to edit the system prompt.

---

## Step 3 — Configure Data Collection fields

Inside the agent, open **Analysis → Data Collection** (or equivalent — may be called "Variable Extraction").

Add these fields. ElevenLabs' analyser will extract them from the transcript automatically after every call.

| Field name | Type | Description |
|---|---|---|
| `name` | string | Caller's full name |
| `email` | string | Caller's email address |
| `phone` | string | Caller's phone number |
| `business_name` | string | Caller's business name |
| `staff_count` | string | Approximate number of staff |
| `interest` | string | One of: audit, sprint, retainer, unsure |
| `pain_point` | string | What problem are they trying to solve |
| `notes` | string | Any other context worth flagging |

Also enable **Transcript summary** in the same section — a one-paragraph summary gets generated per call and we use it in the email.

---

## Step 4 — Configure the post-call webhook

In the agent's **Webhooks** or **Integrations** panel, add a **post-call transcription webhook**:

- **URL:** `https://everydayaiwithgraham.com/api/voice-leads`
- **Event type:** `post_call_transcription`
- **Signing secret:** generate a long random string (`openssl rand -hex 32`). ElevenLabs will use this to HMAC-sign every webhook request. Copy it — needed in Step 5 as `ELEVENLABS_WEBHOOK_SECRET`.

ElevenLabs will send one POST to your route per completed call with the full transcript, the extracted data fields, and the summary. Our route only notifies you if at least one of name/email/phone was captured — so tire-kickers don't spam your inbox.

---

## Step 5 — Add env vars to Vercel

In the Vercel dashboard for the EveryDayAi project, go to **Settings → Environment Variables** and add these to **Production** (and Preview if you want):

| Key | Value |
|---|---|
| `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` | Agent ID from Step 1 |
| `ELEVENLABS_WEBHOOK_SECRET` | The signing secret from Step 4 |
| `TELEGRAM_BOT_TOKEN` | Harry's bot token (copy from `~/.graham-secrets` on harry-node) |
| `TELEGRAM_CHAT_ID` | `8558368116` |

Trigger a redeploy (Vercel does this automatically on env var change, or run `vercel --prod` from `~/everydayai/`).

Also copy these into `~/everydayai/.env.local` if you want to test locally.

---

## Step 6 — Test with ElevenLabs' Simulate Conversations

Don't hand-test 10 scenarios — use the native feature:

1. In the agent dashboard, open **Tests → Simulate Conversations**.
2. Define these scenarios as test cases:
   - **Happy path:** Caller with business and pain point, leaves full details
   - **Asks if you're Graham:** Agent must say no
   - **Out-of-scope question:** "Can you fix my computer?" — must decline
   - **Price negotiation:** "Can you do it cheaper?" — must not negotiate
   - **Competitor mention:** Must not engage
   - **Refuses to leave details:** Must politely end the call
3. For each, set pass criteria (e.g. "captured email" = true, "mentioned all three packages" = true).
4. Run the suite. It gives a pass/fail report.
5. Once passing, do one live end-to-end test from your own browser to confirm the webhook lands — you should get both a Gmail + Telegram notification within ~2 seconds of hanging up.

If the webhook fails, check Vercel logs: `vercel logs --follow` from the project directory.

---

## Appendix A — System prompt (short version)

```
You are Graham's AI assistant on everydayaiwithgraham.com. You are NOT Graham. If asked directly, say so.

Your job:
1. Greet warmly. Identify yourself as Graham's AI assistant.
2. Answer questions about the three service offers using the information in the knowledge base. Do not invent details.
3. Qualify the caller — ask about their business, how many staff, and what's slowing them down.
4. If they're interested, collect name, email, phone, business name. Data collection happens automatically after the call, you just need to make sure those details come up naturally in conversation.
5. Tell them Graham will personally call back within 24 hours.

You must NOT:
- Pretend to be Graham.
- Give free consulting or specific technical advice.
- Name competitors.
- Negotiate prices.
- Book calendar slots directly.
- Drift off-topic.

Tone: calm, practical, Australian. Short sentences. Plain English — if a technical term is unavoidable, explain it in parentheses.

If a question is outside the three offers, say: "That's a good question for Graham directly — let me take your details and he'll call you back."

If the caller won't leave details, thank them politely, point them at the services page, and end the call.
```

---

## Notes

- The widget loads site-wide via `app/layout.tsx`. If `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` is missing, the widget renders nothing — no broken UI.
- Webhook auth: HMAC-SHA256 over `<timestamp>.<raw-body>`, signature in the `ElevenLabs-Signature` header. 30-minute timestamp tolerance to prevent replay attacks.
- Both notification channels fire via `Promise.allSettled` — if Telegram breaks, email still sends.
- `transcript_url` in the Gmail goes straight to the ElevenLabs history page for that call, so you can listen back and read the full transcript.
- No database. Gmail is your searchable archive. Revisit if call volume passes ~100/month.
