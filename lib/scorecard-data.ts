export type ScorecardQuestion = {
  q: string;
  answers: [string, number][];
};

export const QUESTIONS: ScorecardQuestion[] = [
  {
    q: "How many people work in the business?",
    answers: [
      ["Just me / 1-5", 2],
      ["6-15", 3],
      ["16-50", 4],
      ["51-200", 4],
      ["200+", 3],
    ],
  },
  {
    q: "What does the business turn over in a year?",
    answers: [
      ["Under $500k", 2],
      ["$500k - $2M", 3],
      ["$2M - $10M", 4],
      ["$10M - $50M", 4],
      ["$50M+", 3],
    ],
  },
  {
    q: "What runs the accounting?",
    answers: [
      ["Spreadsheets / nothing formal", 4],
      ["MYOB", 3],
      ["Xero", 2],
      ["Procore / Jobpac / InEight / Sage / similar", 2],
      ["Custom or legacy ERP", 4],
    ],
  },
  {
    q: "How do you quote jobs today?",
    answers: [
      ["Manually in Word or Excel", 4],
      ["A custom spreadsheet template", 3],
      ["A quoting tool (ServiceM8, Simpro, Buildxact)", 2],
      ["Built into the ERP", 1],
      ["Not applicable", 0],
    ],
  },
  {
    q: "How do subbies or suppliers submit invoices?",
    answers: [
      ["Email PDFs — someone re-keys them", 4],
      ["A portal, but we still re-key", 3],
      ["Directly into the accounting system", 2],
      ["OCR or integration, no re-keying", 0],
      ["Not applicable", 0],
    ],
  },
  {
    q: "How are timesheets captured?",
    answers: [
      ["Paper", 4],
      ["Email / text", 3],
      ["An app, but not integrated with payroll", 2],
      ["An app that feeds payroll automatically", 1],
      ["Not applicable", 0],
    ],
  },
  {
    q: "Where do most of your documents live?",
    answers: [
      ["Mix of paper, inboxes, and personal drives", 4],
      ["A shared drive with no real structure", 3],
      ["A well-organised shared drive", 2],
      ["A structured DMS (SharePoint, Procore docs, etc.)", 1],
      ["Indexed and searchable across the business", 0],
    ],
  },
  {
    q: "Has the team used AI in the business yet?",
    answers: [
      ["Not at all", 3],
      ["People play with ChatGPT on their own", 3],
      ["A few people use it informally for work", 2],
      ["There is a formal pilot in one area", 1],
      ["AI is already embedded in multiple workflows", 0],
    ],
  },
  {
    q: "As owner or senior lead, what % of your week is admin and paperwork?",
    answers: [
      ["Over 50%", 4],
      ["30-50%", 3],
      ["15-30%", 2],
      ["Under 15%", 1],
    ],
  },
  {
    q: "Where does the most repetitive data-entry happen?",
    answers: [
      ["Supplier invoices / AP", 4],
      ["Quotes and proposals", 3],
      ["Timesheets and payroll", 3],
      ["Compliance, safety, reporting", 4],
      ["Client or head-contractor reports", 4],
      ["Honestly, pretty clean", 1],
    ],
  },
  {
    q: "How does the team react to new software?",
    answers: [
      ["Very resistant", 2],
      ["Tolerate it", 3],
      ["Willing but slow", 3],
      ["Adopts quickly", 4],
    ],
  },
  {
    q: "Do you know profit-by-job in real time?",
    answers: [
      ["Only after the fact, quarters later", 4],
      ["Monthly, once the books close", 3],
      ["Weekly", 2],
      ["Daily or live", 1],
    ],
  },
  {
    q: "What does end-of-month look like?",
    answers: [
      ["Chaos. Five-plus days of manual reconciliation", 4],
      ["Stressful, three days", 3],
      ["Tidy, one to two days", 2],
      ["Largely automated, minimal manual work", 1],
    ],
  },
  {
    q: "How do customer and supplier emails get handled?",
    answers: [
      ["All in everyone's inbox, no shared view", 4],
      ["Shared inbox, no triage", 3],
      ["Triage with template responses", 2],
      ["A CRM or workflow with assignments", 1],
    ],
  },
  {
    q: "If AI could do ONE thing for your business tomorrow, it would be…",
    answers: [
      ["Answer email and handle admin", 4],
      ["Turn briefs into quotes faster", 4],
      ["Read invoices and enter the data", 4],
      ["Handle compliance and reporting", 4],
      ["Honestly, I'm not sure yet", 3],
      ["Nothing, we're fine", 1],
    ],
  },
];

export type Opportunity = { triggers: number[]; label: string };

export const OPPORTUNITIES: Opportunity[] = [
  { triggers: [4, 9], label: "AP automation — OCR invoices directly into your accounting system, payback typically 3-6 months." },
  { triggers: [3, 14], label: "AI-assisted quoting — turn a brief into a draft quote in minutes instead of hours." },
  { triggers: [5], label: "Digital timesheet capture + payroll sync — cut weekly payroll effort by 60-80%." },
  { triggers: [6, 13], label: "Document + email triage — AI reads incoming mail, tags, and surfaces what needs you." },
  { triggers: [11, 12], label: "Live job-cost visibility — dashboards that show profit per job while you can still change the outcome." },
  { triggers: [10, 9], label: "Compliance and reporting automation — auto-draft safety, toolbox, and head-contractor reports." },
  { triggers: [7, 14], label: "Internal AI assistant trained on your SOPs and past jobs — your team asks, it answers." },
];

export type Tier = { key: "automated" | "targeted" | "big" | "transformation"; title: string; blurb: string };

export function computeScore(answers: (number | null)[]): number {
  let raw = 0;
  answers.forEach((idx, qi) => {
    if (idx != null) raw += QUESTIONS[qi].answers[idx][1];
  });
  const max = QUESTIONS.reduce((s, q) => s + Math.max(...q.answers.map((a) => a[1])), 0);
  return Math.round((raw / max) * 100);
}

export function tierFor(score: number): Tier {
  if (score <= 30)
    return {
      key: "automated",
      title: "Already well-automated.",
      blurb:
        "You are further along than most. Your next win is a narrow Sprint on a specific pain-point rather than a broad readiness exercise. Pick one process and attack it.",
    };
  if (score <= 60)
    return {
      key: "targeted",
      title: "Targeted opportunity.",
      blurb:
        "There are two or three AI plays in your business that would pay back inside 12 months. A Readiness Review identifies exactly which, ranked by payback and risk.",
    };
  if (score <= 85)
    return {
      key: "big",
      title: "Big opportunity.",
      blurb:
        "Multiple 5-figure-a-year payback workflows are sitting there waiting. Start with a Readiness Review to pick the right three. Do not try to tackle everything at once.",
    };
  return {
    key: "transformation",
    title: "Transformation opportunity.",
    blurb:
      "Your business is primed for a material rebuild of how information moves. A Readiness Review first, then back-to-back Implementation Sprints. This is a 12-18 month programme of work.",
  };
}
