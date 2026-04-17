export type VoiceLead = {
  name?: string;
  email?: string;
  phone?: string;
  business_name?: string;
  staff_count?: string;
  interest?: string;
  pain_point?: string;
  notes?: string;
  summary?: string;
  call_id?: string;
  call_duration_seconds?: number;
  call_successful?: string;
  transcript_url?: string;
};

export async function notifyVoiceLead(lead: VoiceLead) {
  const tasks: [string, Promise<unknown>][] = [
    ["operator_email", emailOperator(lead)],
    ["telegram", telegramVoiceLead(lead)],
  ];
  if (lead.email) {
    tasks.push(["caller_email", emailCaller(lead)]);
  }

  const results = await Promise.allSettled(tasks.map(([, p]) => p));
  const failures = results
    .map((r, i) => (r.status === "rejected" ? { channel: tasks[i][0], reason: String(r.reason) } : null))
    .filter((x): x is { channel: string; reason: string } => x !== null);

  if (failures.length) {
    console.error("Voice lead notification failures:", JSON.stringify(failures));
  }

  return { delivered: results.filter((r) => r.status === "fulfilled").length, failures };
}

async function emailOperator(lead: VoiceLead) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY not configured");

  const subject = lead.name
    ? `Voice lead from ${lead.name}${lead.business_name ? ` (${lead.business_name})` : ""}`
    : "Voice lead — caller did not leave details";

  const rows: [string, string | undefined][] = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Business", lead.business_name],
    ["Staff", lead.staff_count],
    ["Interest", lead.interest],
    ["Pain point", lead.pain_point],
    ["Notes", lead.notes],
    ["Summary", lead.summary],
    ["Call ID", lead.call_id],
    ["Duration", lead.call_duration_seconds ? `${lead.call_duration_seconds}s` : undefined],
    ["Outcome", lead.call_successful],
    ["Transcript", lead.transcript_url],
  ];

  const html = `
    <h2>New voice lead from the website</h2>
    <p>Someone used the voice assistant on everydayaiwithgraham.com and left their details.</p>
    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;border:1px solid #ddd">
      ${rows
        .filter(([, v]) => v !== undefined && v !== "")
        .map(
          ([k, v]) =>
            `<tr><td style="border:1px solid #ddd;font-weight:600">${escapeHtml(k)}</td><td style="border:1px solid #ddd">${escapeHtml(String(v))}</td></tr>`
        )
        .join("")}
    </table>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "EveryDay AI Voice <noreply@everydayaiwithgraham.com>",
      to: "graham@everydayaiwithgraham.com",
      subject,
      reply_to: lead.email || undefined,
      html,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend API error ${res.status}: ${body}`);
  }

  return res.json();
}

async function emailCaller(lead: VoiceLead) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY not configured");
  if (!lead.email) throw new Error("No caller email");

  const firstName = (lead.name || "").split(" ")[0] || "there";
  const packageLabel = {
    audit: "AI Readiness Audit",
    sprint: "AI Implementation Sprint",
    retainer: "AI Advisor Retainer",
  }[lead.interest?.toLowerCase() || ""] || null;

  const lines: string[] = [
    `<p>Hi ${escapeHtml(firstName)},</p>`,
    `<p>Thanks for speaking with my AI assistant on everydayaiwithgraham.com just now — I've had the details passed through and I'll personally call you back within 24 hours.</p>`,
  ];

  if (lead.summary) {
    lines.push(`<p><strong>What we covered:</strong><br>${escapeHtml(lead.summary)}</p>`);
  }
  if (packageLabel) {
    lines.push(`<p>You seemed most interested in the <strong>${escapeHtml(packageLabel)}</strong> — I'll have some specifics ready when I call.</p>`);
  }

  lines.push(
    `<p>In the meantime, the full breakdown of the three packages is here: <a href="https://everydayaiwithgraham.com/services">everydayaiwithgraham.com/services</a></p>`,
    `<p>If anything is time-sensitive, just reply to this email.</p>`,
    `<p>Cheers,<br>Graham Blackwell<br>EveryDay AI with Graham</p>`,
  );

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Graham Blackwell <graham@everydayaiwithgraham.com>",
      to: lead.email,
      subject: `Thanks ${firstName} — I'll call you back within 24 hours`,
      reply_to: "graham@everydayaiwithgraham.com",
      html: lines.join("\n"),
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend caller-email error ${res.status}: ${body}`);
  }

  return res.json();
}

async function telegramVoiceLead(lead: VoiceLead) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) throw new Error("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not configured");

  const lines = [
    "Voice lead from everydayaiwithgraham.com",
    "",
    lead.name ? `Name: ${lead.name}` : null,
    lead.business_name ? `Business: ${lead.business_name}` : null,
    lead.staff_count ? `Staff: ${lead.staff_count}` : null,
    lead.email ? `Email: ${lead.email}` : null,
    lead.phone ? `Phone: ${lead.phone}` : null,
    lead.interest ? `Interest: ${lead.interest}` : null,
    lead.pain_point ? `Pain: ${lead.pain_point}` : null,
    lead.notes ? `Notes: ${lead.notes}` : null,
    lead.summary ? `\nSummary: ${lead.summary}` : null,
    lead.call_duration_seconds ? `Duration: ${lead.call_duration_seconds}s` : null,
  ].filter(Boolean);

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: lines.join("\n"),
      disable_web_page_preview: true,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Telegram API error ${res.status}: ${body}`);
  }

  return res.json();
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
