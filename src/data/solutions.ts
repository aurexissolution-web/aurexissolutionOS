// src/data/solutions.ts
// Content for the /solutions landing page — kept separate from components so
// the page can be iterated without touching render logic.

export const SOLUTION_DETAILS: Record<
  string,
  {
    eyebrow: string;
    title: string;
    tagline: string;
    longDescription: string;
    body: {
      label: string;
      items: string[];
    };
    outcomes: string[];
    scope: string;
    nextStep: string;
    forWho: string;
  }
> = {
  "/solutions/business-systems-assessment": {
    eyebrow: "01 — Business Systems Assessment™",
    title: "Business Systems Assessment™",
    tagline: "We know things could work better, but we need clarity.",
    longDescription:
      "A structured engagement to map where friction lives, what is creating it, and which improvements will matter most. We examine how work actually moves through the business before recommending anything.",
    body: {
      label: "We examine",
      items: [
        "Workflows and handoffs",
        "Repetitive or manual work",
        "Bottlenecks and delays",
        "Tools currently in use",
        "Information movement",
        "Duplicated effort",
        "Reporting and visibility",
        "Integration and automation opportunities",
      ],
    },
    outcomes: [
      "A clear picture of operational friction",
      "Prioritised improvement roadmap",
      "Clarity on what to build, improve or leave alone",
      "A sensible next step",
    ],
    scope: "1–2 weeks",
    nextStep: "Book a Discovery Call",
    forWho: "Businesses that know something is inefficient but are not sure what to fix first.",
  },
  "/solutions/focused-improvement": {
    eyebrow: "02 — Focused Improvement Project",
    title: "Focused Improvement Project",
    tagline: "We know the problem. We want to fix this specific area.",
    longDescription:
      "A scoped project to solve one high-impact process without rebuilding the whole operation. Start focused, prove value, then decide where to expand.",
    body: {
      label: "Common examples",
      items: [
        "Automating a repetitive workflow",
        "Improving lead handling",
        "Customer onboarding",
        "Replacing a spreadsheet-heavy process",
        "Integrating two disconnected tools",
        "Streamlining approvals",
        "Internal reporting",
        "Document generation",
      ],
    },
    outcomes: [
      "A meaningful process is fixed",
      "Value is demonstrated before scaling",
      "Minimal disruption to the rest of the business",
      "Foundation for further improvements",
    ],
    scope: "4–10 weeks",
    nextStep: "Define the focused project",
    forWho: "Businesses that already know which process is causing the most friction.",
  },
  "/solutions/business-control-system": {
    eyebrow: "03 — Business Control System™",
    title: "Business Control System™",
    tagline: "Several parts of the business need to work together.",
    longDescription:
      "A connected operational system designed around how the business actually works. It brings workflows, information and reporting into one place — not a generic ERP or admin panel, but a system built for the business.",
    body: {
      label: "Can bring together",
      items: [
        "Customers and leads",
        "Sales and projects",
        "Jobs, tasks and workflows",
        "Approvals and documents",
        "Operational information",
        "Dashboards and management reporting",
        "Integrations and automation",
      ],
    },
    outcomes: [
      "Less fragmented work",
      "Reduced duplication",
      "Clearer workflows",
      "Better information flow",
      "Greater management visibility",
    ],
    scope: "3–6 months",
    nextStep: "Design the connected system",
    forWho: "Businesses where the problem is larger than a single workflow.",
  },
  "/solutions/managed-operations": {
    eyebrow: "04 — Managed Operations™",
    title: "Managed Operations™",
    tagline: "We need ongoing support and continuous improvement.",
    longDescription:
      "The ongoing relationship that keeps Aurexis systems running, improving and adapting as the business changes. Not a maintenance contract — a technology and operational-improvement partnership.",
    body: {
      label: "Includes",
      items: [
        "Monitoring and maintenance",
        "Technical support and fixes",
        "System and feature improvements",
        "Workflow optimisation",
        "New automation and integrations",
        "Reporting and performance improvements",
        "Adapting the system as the business evolves",
      ],
    },
    outcomes: [
      "Systems stay healthy and current",
      "Continuous improvement without ad hoc hires",
      "Faster response to changing needs",
      "A long-term operational partner",
    ],
    scope: "Ongoing retainer",
    nextStep: "Discuss a Managed Operations plan",
    forWho: "Businesses with live Aurexis systems that need to keep evolving.",
  },
};

export type ProblemScenario = {
  stage: string;
  title: string;
  problem: string;
  signals: string[];
  recommendationTitle: string;
  recommendationDescription: string;
  whyThisFits: string;
  firstLook: string[];
  visualType:
    | 'unclear'
    | 'bottleneck'
    | 'fragmentation'
    | 'visibility'
    | 'evolution'
    | 'automation';
  recommendations: string[];
};

export const PROBLEM_SCENARIOS: ProblemScenario[] = [
  {
    stage: '01',
    title: 'UNCLEAR PRIORITY',
    problem:
      'We know something is inefficient, but we do not know what to fix first.',
    signals: [
      'repeated admin',
      'too many spreadsheets',
      'unclear bottlenecks',
      'manual reporting',
      'duplicated work',
      'unclear priorities',
    ],
    recommendationTitle: 'Business Systems Assessment™',
    recommendationDescription:
      'Find where operational friction exists, prioritise what matters, and determine the most sensible next step.',
    whyThisFits:
      'You have not identified one specific process yet. The Assessment creates the clarity needed to decide where intervention will create the most value.',
    firstLook: ['Workflow', 'Information Flow', 'Tools', 'Reporting'],
    visualType: 'unclear',
    recommendations: ['Business Systems Assessment™'],
  },
  {
    stage: '02',
    title: 'BOTTLENECK',
    problem:
      'One important process takes too long or requires too much manual work.',
    signals: [
      'one process dominates time',
      'manual handoffs',
      'approval delays',
      'repetitive data entry',
      'single point of failure',
      'output waits on one person',
    ],
    recommendationTitle: 'Focused Improvement Project',
    recommendationDescription:
      'The problem is already identifiable and can be improved without rebuilding the entire operation.',
    whyThisFits:
      'The problem is already identifiable and can be improved without rebuilding the entire operation.',
    firstLook: ['Process Steps', 'Handoffs', 'Repetition', 'Automation Potential'],
    visualType: 'bottleneck',
    recommendations: ['Focused Improvement Project'],
  },
  {
    stage: '03',
    title: 'FRAGMENTATION',
    problem:
      'Our tools, spreadsheets, workflows and information do not work together.',
    signals: [
      'multiple spreadsheets',
      'data re-entry',
      'tool overlap',
      'missing context',
      'manual exports',
      'conflicting versions',
    ],
    recommendationTitle: 'Business Control System™',
    recommendationDescription:
      'Several parts of the operation need to be connected into a more coordinated environment.',
    whyThisFits:
      'Several parts of the operation need to be connected into a more coordinated environment.',
    firstLook: ['Core Operations', 'System Connections', 'Data Structure', 'Information Flow'],
    visualType: 'fragmentation',
    recommendations: ['Business Control System™'],
  },
  {
    stage: '04',
    title: 'VISIBILITY GAP',
    problem: 'Management cannot clearly see what is happening across the operation.',
    signals: [
      'reports take too long',
      'decisions from anecdotes',
      'inconsistent numbers',
      'no live view',
      'data hidden in tools',
      'late surprises',
    ],
    recommendationTitle: 'Business Control System™',
    recommendationDescription:
      'Operational information needs to flow into a clearer management and reporting layer.',
    whyThisFits:
      'Operational information needs to flow into a clearer management and reporting layer.',
    firstLook: ['Reporting', 'Data Sources', 'Management Signals', 'Operational Metrics'],
    visualType: 'visibility',
    recommendations: ['Business Control System™'],
  },
  {
    stage: '05',
    title: 'SYSTEM EVOLUTION',
    problem:
      'Our existing systems need ongoing support, optimisation and improvement.',
    signals: [
      'system drift',
      'technical debt',
      'slow improvements',
      'patchwork fixes',
      'changing needs',
      'support dependency',
    ],
    recommendationTitle: 'Managed Operations™',
    recommendationDescription:
      'The foundation already exists, but it needs continuous technical improvement as the business evolves.',
    whyThisFits:
      'The foundation already exists, but it needs continuous technical improvement as the business evolves.',
    firstLook: ['Reliability', 'Usage', 'Performance', 'Improvement Opportunities'],
    visualType: 'evolution',
    recommendations: ['Managed Operations™'],
  },
  {
    stage: '06',
    title: 'AUTOMATION QUESTION',
    problem:
      'We want to automate, but we are not sure where automation would create real value.',
    signals: [
      'many repetitive tasks',
      'unclear ROI',
      'automation ideas scattered',
      'fear of over-engineering',
      'manual work everywhere',
      'no clear starting point',
    ],
    recommendationTitle: 'Business Systems Assessment™ / Focused Improvement Project',
    recommendationDescription:
      'First determine where automation is actually justified, then improve the highest-value process.',
    whyThisFits:
      'First determine where automation is actually justified, then improve the highest-value process.',
    firstLook: ['Repetition', 'Decision Points', 'Human Oversight', 'Automation Value'],
    visualType: 'automation',
    recommendations: ['Business Systems Assessment™', 'Focused Improvement Project'],
  },
];

export const PRINCIPLES = [
  {
    title: "Understand before building",
    description:
      "We do not recommend technology before understanding how the business operates.",
  },
  {
    title: "Fix meaningful problems",
    description:
      "We prioritise improvements capable of creating genuine operational value.",
  },
  {
    title: "Integrate before replacing",
    description:
      "Existing software may already perform useful functions. We do not rebuild something simply because we can.",
  },
  {
    title: "Build around real operations",
    description:
      "Systems should support how the business actually needs to work.",
  },
  {
    title: "Use automation deliberately",
    description:
      "We automate repetitive or predictable work where it improves the operation, not for novelty.",
  },
  {
    title: "Keep humans in control",
    description:
      "AI and automation should improve productivity, information and decisions without removing human oversight.",
  },
  {
    title: "Design for evolution",
    description:
      "Business systems should be capable of changing as the business develops.",
  },
];

export const PROCESS = [
  { title: "Understand", description: "Learn how the company currently operates." },
  { title: "Identify", description: "Find the most important problems and opportunities." },
  { title: "Define", description: "Determine the appropriate intervention." },
  { title: "Build", description: "Implement the system, workflow, automation or integration." },
  { title: "Launch", description: "Put the improvement into real operations." },
  { title: "Improve", description: "Support, monitor and evolve it over time." },
];

export const ECOSYSTEM_CAPABILITIES = [
  {
    name: "Presence",
    description: "Customer-facing digital platforms that attract, engage and convert.",
  },
  {
    name: "Flow",
    description: "Connected workflows that reduce manual follow-up and delays.",
  },
  {
    name: "Core",
    description: "Central systems for customers, projects, operations and finance.",
  },
  {
    name: "Connect",
    description: "Integrations that keep tools, teams and information in sync.",
  },
  {
    name: "Data Foundation™",
    description: "Structured, governed data for reporting and future scalability.",
  },
  {
    name: "Intelligence",
    description: "AI, automation and insights built on top of connected systems.",
  },
];

export const FAQS = [
  {
    q: "Which Aurexis Solution does my business need?",
    a: "It depends on where you are. If you are unsure what is broken, start with a Business Systems Assessment™. If you know the exact process, a Focused Improvement Project is usually right. If the problem is organisation-wide, a Business Control System™ is more appropriate. Managed Operations™ is for ongoing support after something is already live.",
  },
  {
    q: "Do I need a Business Systems Assessment™ first?",
    a: "Not always. If you already know exactly which process needs fixing, we can start with a Focused Improvement Project. If the problem is larger, we may recommend a Business Control System™ directly. The Assessment is the best starting point when you need clarity.",
  },
  {
    q: "Can Aurexis improve only one process?",
    a: "Yes. A Focused Improvement Project is designed exactly for that — one high-impact process without a full rebuild.",
  },
  {
    q: "Do we need to replace our existing software?",
    a: "Usually not. We prefer to integrate existing tools where they already work well and only replace something when it is genuinely holding the business back.",
  },
  {
    q: "Can Aurexis connect tools we already use?",
    a: "Yes. Integration is a core part of how we work. We connect the tools that already do a job well so the business operates as one system.",
  },
  {
    q: "What is the difference between a Focused Improvement Project and Business Control System™?",
    a: "A Focused Improvement Project solves one specific workflow or process. A Business Control System™ connects multiple parts of the business — customers, projects, operations, reporting — into a single coherent system.",
  },
  {
    q: "Can a solution expand later?",
    a: "Yes. Many clients start with an Assessment, then a Focused Improvement, then a Business Control System™, and later move into Managed Operations™. But this is not compulsory.",
  },
  {
    q: "What happens after the system launches?",
    a: "You can move into Managed Operations™, where we monitor, maintain and continue improving the system as the business changes.",
  },
  {
    q: "What is Managed Operations™?",
    a: "It is an ongoing technology and operational-improvement relationship. We keep your systems supported, monitored and evolving — not just a maintenance contract.",
  },
  {
    q: "What happens during the Discovery Call?",
    a: "We learn what is slowing the business down, confirm whether Aurexis is the right fit, and recommend the most sensible next step. It is a qualification conversation, not a free consulting session.",
  },
];
