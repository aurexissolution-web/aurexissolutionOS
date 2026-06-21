/**
 * Pillar data for /services/* sub-pages.
 *
 * Each pillar shares the same atmospheric hero structure as the Ecosystem
 * flagship, but applies its own signature accent colour. Body sections (pain,
 * what-we-build, use cases, process, comparison, FAQ, closing CTA) will be
 * added here as those sections get parametrised.
 *
 * Source of copy: COPY_SERVICES_SUBPAGES.md (production-ready, 2026-05-03).
 */

import type { ReactNode } from "react";

export type PillarSlug = "ai-automation" | "web-engineering" | "mobile-ecosystems" | "data-engineering";

export type PillarAccent = {
  /** Hex string, e.g. "#8B5CF6" */
  hex: string;
  /** Short slug, used in CSS class names */
  name: "violet" | "blue" | "emerald" | "amber";
  /** "r, g, b" — used in rgba(...) shadows and washes */
  rgb: string;
  /** Three-stop linear-gradient string for the headline italic em */
  gradient: string;
  /** Subtle drop-shadow rgba — same colour as accent at low alpha */
  drop: string;
  /** CTA hover box-shadow rgba */
  glow: string;
};

export type PillarHeroData = {
  /** Mono eyebrow label, e.g. "Component · AI" */
  eyebrowLabel: string;
  /** Position indicator, e.g. "02 / 04" */
  position: string;
  /** Headline before the italic em, e.g. "AI agents that " */
  headlineLead: string;
  /** Italic em phrase that gets the accent gradient, e.g. "replace" */
  headlineEm: string;
  /** Headline after the italic em, e.g. " machine-level work." */
  headlineRest: string;
  /** ARIA-label for the eyebrow row */
  eyebrowAria: string;
  /** Subhead — accepts inline italic emphasis via [...em...] markers */
  subhead: ReactNode;
  /** Primary CTA */
  primaryCta: { label: string; href: string };
  /** Small grey caption beside the CTA, e.g. "~3 min · live walkthrough" */
  ctaCaption: string;
  /** Below-md mobile-only marker line shown beneath the CTA row.
   *  Pass `null` to omit. */
  mobileMarker: string | null;
};

export type PillarPainItem = {
  /** Two-digit numeral, e.g. "01" */
  index: string;
  /** Short uppercase category label, e.g. "VOLUME" */
  category: string;
  /** Punchy verdict-style title (rendered serif italic) */
  title: string;
  /** Explanatory body sentence */
  body: string;
  /** Mono metric row anchored at the bottom of the card */
  metric: { label: string; value: string };
};

export type PillarPainData = {
  header: {
    /** Section number eyebrow, e.g. "01" */
    eyebrowNum: string;
    /** Section label eyebrow, e.g. "The Problem" */
    eyebrowLabel: string;
    /** Headline before the italic em */
    headlineLead: string;
    /** Italic em phrase that takes the pillar accent */
    headlineEm: string;
    /** Headline after the italic em */
    headlineRest: string;
    /** Italic subhead beneath the headline (right column on lg+) */
    subhead: string;
  };
  /** 3 pain items rendered as a triptych on lg+ */
  items: [PillarPainItem, PillarPainItem, PillarPainItem];
};

export type PillarBuildDetailUseCase = {
  /** Concrete situational title, e.g. "Dental clinics handling 50+ calls a day" */
  title: string;
  /** 1–2 sentence narrative of that scenario */
  body: string;
};

export type PillarBuildDetailFAQ = {
  question: string;
  answer: string;
};

export type PillarBuildDetail = {
  /** URL segment used by /services/[pillar]/[feature], e.g. "receptionists" */
  slug: string;
  /** One-line italic tagline shown beneath the hero title */
  tagline: string;
  /** 4–6 concrete deliverables shown in the What's Included list */
  included: string[];
  /** 2–3 situational use cases shown in the Built For section */
  builtFor: PillarBuildDetailUseCase[];
  /** Paragraph describing how this sub-feature pairs with siblings */
  slotsIn: string;
  /** 3 short Q&A pairs shown in the detail-page FAQ */
  faq: PillarBuildDetailFAQ[];
};

export type PillarBuildItem = {
  /** Two-digit numeral, e.g. "01" */
  index: string;
  /** Top-left eyebrow, single uppercase word (e.g. "Receptionists") */
  eyebrow: string;
  /** Top-right tag, short uppercase (e.g. "24/7" or "LHDN · PDPA · SST") */
  tag: string;
  /** Big italic serif title — period appended in the component */
  name: string;
  /** One-sentence description body */
  description: string;
  /** Long-form detail content rendered at /services/[pillar]/[slug] */
  detail: PillarBuildDetail;
};

/** Caption part — used for inline emphasis in the right-side caption.
 *  String → plain text. `{ em }` → italic accent-coloured phrase.
 *  `{ br: true }` → forced line break. */
export type CaptionPart =
  | string
  | { em: string }
  | { br: true };

export type PillarBuildData = {
  /** Italic serif headline, e.g. "We build the AI workforce." */
  headline: string;
  /** Right-side italic caption, parts array (supports inline em + line breaks) */
  caption: CaptionPart[];
  /** 5 cards rendered as a 2-col grid with the 5th item spanning full width */
  items: [
    PillarBuildItem,
    PillarBuildItem,
    PillarBuildItem,
    PillarBuildItem,
    PillarBuildItem,
  ];
};

export type SplitText = {
  /** Plain text before the italic em phrase */
  lead: string;
  /** Italic em phrase that takes the pillar accent */
  em: string;
  /** Plain text after the italic em phrase */
  rest: string;
};

export type PillarUseCaseSurface = {
  /** Two-digit numeral, e.g. "01" */
  index: string;
  /** Italic serif row label (e.g. "AI receptionist") */
  name: string;
  /** Right-aligned mono caption (e.g. "voice + chat") */
  desc: string;
};

export type PillarUseCase = {
  /** Two-digit numeral, e.g. "01" */
  index: string;
  /** Slug used as React key + tab/panel id */
  id: string;
  /** Tab + scene-overlay name, e.g. "Dental Clinic" */
  name: string;
  /** Short uppercase mono row, e.g. "4 surfaces · ai · whatsapp · reminders" */
  metaShort: string;
  /** Italic serif headline split for the accent em phrase */
  headline: SplitText;
  /** Narrative body paragraph */
  body: string;
  /** 4 numbered sub-components rendered as a definition list */
  surfaces: [PillarUseCaseSurface, PillarUseCaseSurface, PillarUseCaseSurface, PillarUseCaseSurface];
  /** "Result: …" line, split for the accent em phrase */
  outcome: SplitText;
  /** Industry photo for the scene panel backdrop */
  photo: { url: string; alt: string };
};

export type PillarUseCasesData = [
  PillarUseCase,
  PillarUseCase,
  PillarUseCase,
  PillarUseCase,
];

export type ProcessStep = {
  /** Two-digit numeral, e.g. "01" */
  index: string;
  /** Italic serif step name, e.g. "Workflow audit" */
  name: string;
  /** Sub-description sentence */
  sub: string;
  /** Mono duration cell, e.g. "1 week" or "3–6 weeks" */
  term: string;
  /** Mono fee cell — "Free" / "— quoted —" / "Included" */
  fee: string;
  /** True for "Free" cell — uses pillar accent colour */
  feeIsAccent: boolean;
};

export type PillarProcessData = {
  /** Italic serif body in the aside */
  description: string;
  /** Mono "Term" cell value in the aside footer (e.g. "5-9 weeks") */
  termValue: string;
  /** 4 process steps, in order */
  steps: [ProcessStep, ProcessStep, ProcessStep, ProcessStep];
};

export type ComparisonColumn = {
  /** Mono uppercase column header (e.g. "Generic ChatGPT") */
  label: string;
  /** True for the rightmost (Aurexis) column — gets the pillar-accent treatment */
  isAccent?: boolean;
};

export type ComparisonRow = {
  /** Italic serif criterion (left column), e.g. "Knows your business" */
  topic: string;
  /** One value per non-criterion column, in order */
  values: string[];
};

/** Verdict cell — plain string for competitor cells, SplitText for the
 *  Aurexis cell so its em phrase can take a different colour. */
export type VerdictCell = string | SplitText;

export type PillarComparisonData = {
  /** Mono eyebrow label, e.g. "Why custom AI" */
  eyebrowLabel: string;
  /** Italic serif headline — split for the accent em phrase */
  headline: SplitText;
  /** Right-side italic caption — split for the accent em phrase */
  rightCaption: SplitText;
  /** Column headers (criterion column is added by the component) */
  columns: ComparisonColumn[];
  /** Rows of the table; each `values` array length must match columns length */
  rows: ComparisonRow[];
  /** Footer row of verdict cells; length matches columns length */
  verdict: VerdictCell[];
};

/** FAQ answer segment — plain string or `{ em }` for inline emphasis. */
export type FAQSegment = string | { em: string };

export type PillarFAQItem = {
  /** Two-digit numeral, e.g. "01" — rendered large in pillar accent */
  index: string;
  /** Italic serif question */
  question: string;
  /** Answer body, parts array supports inline italic emphasis */
  answer: FAQSegment[];
};

export type PillarFAQData = {
  /** Italic serif headline, e.g. "Four honest answers." */
  headline: string;
  /** 3–5 FAQ items */
  items: PillarFAQItem[];
};

export type RelatedLink = {
  /** Italic serif label */
  label: string;
  /** Internal href */
  href: string;
};

export type PillarClosingCTAData = {
  /** Italic serif headline — split for the accent em phrase */
  headline: SplitText;
  /** Italic subhead beneath the headline */
  subhead: string;
  /** Primary pill button: label + href (e.g. /the-lab, /portfolio) */
  primary: { label: string; href: string };
  /** Secondary "WhatsApp us about a …" link text */
  whatsappLabel: string;
  /** 3 related-surface links shown in the bottom row */
  related: [RelatedLink, RelatedLink, RelatedLink];
};

export type Pillar = {
  slug: PillarSlug;
  accent: PillarAccent;
  hero: PillarHeroData;
  pain: PillarPainData;
  whatWeBuild: PillarBuildData;
  useCases: PillarUseCasesData;
  process: PillarProcessData;
  comparison: PillarComparisonData;
  faq: PillarFAQData;
  closingCTA: PillarClosingCTAData;
};

const ACCENTS: Record<PillarAccent["name"], PillarAccent> = {
  violet: {
    hex: "#8B5CF6",
    name: "violet",
    rgb: "139, 92, 246",
    gradient: "linear-gradient(110deg, #C4B5FD 0%, #8B5CF6 50%, #6D28D9 100%)",
    drop: "drop-shadow(0 0 28px rgba(139, 92, 246, 0.32))",
    glow: "0 14px 36px rgba(139, 92, 246, 0.32)",
  },
  blue: {
    hex: "#0047FF",
    name: "blue",
    rgb: "0, 71, 255",
    gradient: "linear-gradient(110deg, #5B8DFF 0%, #0047FF 50%, #1E40AF 100%)",
    drop: "drop-shadow(0 0 28px rgba(0, 71, 255, 0.32))",
    glow: "0 14px 36px rgba(0, 71, 255, 0.32)",
  },
  emerald: {
    hex: "#10B981",
    name: "emerald",
    rgb: "16, 185, 129",
    gradient: "linear-gradient(110deg, #6EE7B7 0%, #10B981 50%, #047857 100%)",
    drop: "drop-shadow(0 0 28px rgba(16, 185, 129, 0.32))",
    glow: "0 14px 36px rgba(16, 185, 129, 0.32)",
  },
  amber: {
    hex: "#F59E0B",
    name: "amber",
    rgb: "245, 158, 11",
    gradient: "linear-gradient(110deg, #FCD34D 0%, #F59E0B 50%, #B45309 100%)",
    drop: "drop-shadow(0 0 28px rgba(245, 158, 11, 0.32))",
    glow: "0 14px 36px rgba(245, 158, 11, 0.32)",
  },
};

export const PILLARS: Record<PillarSlug, Pillar> = {
  "ai-automation": {
    slug: "ai-automation",
    accent: ACCENTS.violet,
    hero: {
      eyebrowLabel: "Component · AI",
      position: "02 / 04",
      eyebrowAria: "Section: AI Workflows & Agents, two of four pillars",
      headlineLead: "AI agents that ",
      headlineEm: "replace",
      headlineRest: " machine-level work.",
      subhead:
        "Custom AI receptionists, internal copilots, and automation agents — trained on your specific business, integrated with your real workflows. Typical builds RM 15–60k. ", // The italic em is appended in the component via headlineEmTrailing if needed; subhead-em is rendered through a richer pattern in the component.
      primaryCta: {
        label: "Try Our AI Receptionist",
        href: "/the-lab",
      },
      ctaCaption: "~3 min · live walkthrough",
      mobileMarker: "Receptionists · Copilots · Automations · Compliance",
    },
    pain: {
      header: {
        eyebrowNum: "01",
        eyebrowLabel: "The Problem",
        headlineLead: "Manual admin is ",
        headlineEm: "eating",
        headlineRest: " your margin.",
        subhead: "You don’t need a chatbot. You need a worker.",
      },
      items: [
        {
          index: "01",
          category: "Volume",
          title: "Manual admin volume",
          body:
            "Your team spends 30–40% of their time on routine work an AI could handle.",
          metric: { label: "Hidden cost", value: "30–40% of team time" },
        },
        {
          index: "02",
          category: "Generic AI",
          title: "Generic SaaS doesn’t fit",
          body:
            "Off-the-shelf chatbots don’t know your business. They give bad answers and hurt your brand.",
          metric: { label: "Escalation rate", value: "~70% to humans" },
        },
        {
          index: "03",
          category: "Headcount",
          title: "Hiring more isn’t the answer",
          body:
            "Wages are climbing. Adding headcount for routine work doesn’t scale.",
          metric: { label: "Wage floor", value: "RM 1,700+ rising" },
        },
      ],
    },
    whatWeBuild: {
      headline: "We build the AI workforce.",
      caption: [
        "Five workers.",
        { br: true },
        "Trained on ",
        { em: "you" },
        ". Shipped ",
        { em: "together" },
        ".",
      ],
      items: [
        {
          index: "01",
          eyebrow: "Receptionists",
          tag: "24/7",
          name: "AI Receptionists",
          description:
            "Customer-facing agents on WhatsApp, web, and voice. Trained on your business, integrated with your real workflows.",
          detail: {
            slug: "receptionists",
            tagline: "Your customer-facing voice and chat — answering at 3am, on a public holiday, in two languages.",
            included: [
              "Voice agent answering inbound calls on a Malaysian number",
              "WhatsApp Business agent on a verified business profile",
              "Web chat widget embedded on your site",
              "Trained on your services, pricing, hours, and FAQ",
              "Booking and calendar integration (Cal.com, Google Calendar, your CRM)",
              "Escalation to a human via WhatsApp when the agent isn't confident",
            ],
            builtFor: [
              {
                title: "Clinics and salons drowning in after-hours bookings",
                body: "The agent picks up at 11pm, confirms the slot on WhatsApp, and reminds the patient the day before. Your reception starts Monday with a calendar already booked.",
              },
              {
                title: "Service businesses with one receptionist and ten phone lines",
                body: "Calls that used to ring out now get answered. The agent qualifies the lead, captures the brief, and books a callback — even when your one person is on the other line.",
              },
              {
                title: "Multi-language Malaysian SMEs",
                body: "English, Bahasa Malaysia, code-switched — the agent handles all three natively. No more lost leads because the caller switched mid-sentence.",
              },
            ],
            slotsIn:
              "The receptionist pairs naturally with Internal Copilots (your team sees a full transcript and summary inside their tools) and Automation Agents (the post-booking follow-up fires without anyone touching it). It also feeds Compliance Automations when a transaction needs an e-invoice trail.",
            faq: [
              {
                question: "What happens when the agent doesn't know the answer?",
                answer: "It says so, takes a callback request, and escalates to a real human on WhatsApp with full context. We design for graceful escalation — never a hallucinated answer.",
              },
              {
                question: "Will it sound like a robot on a phone call?",
                answer: "No. We use modern realistic voice models tuned to a Malaysian accent of your choice. Most callers don't realise it's not human until they hear the speed.",
              },
              {
                question: "How long until it's live on my number?",
                answer: "Roughly 3–5 weeks. One week of training on your business, two weeks of build and supervised testing, then a soft launch on a small share of traffic before we open it up.",
              },
            ],
          },
        },
        {
          index: "02",
          eyebrow: "Copilots",
          tag: "Internal",
          name: "Internal Copilots",
          description:
            "Your team asks questions in plain English; gets instant answers from your knowledge base, files, and CRM.",
          detail: {
            slug: "copilots",
            tagline: "A search bar your team can ask anything — grounded in your real files, not the open web.",
            included: [
              "Indexed search across your SOPs, contracts, case files, and CRM notes",
              "Plain-English Q&A grounded in your actual documents",
              "Source citations on every answer — no black-box responses",
              "Role-based access so juniors only see what they're allowed to",
              "Slack or Teams integration so it lives where your team already is",
              "Self-service training — add documents without coming back to us",
            ],
            builtFor: [
              {
                title: "Law and consulting firms where seniors get interrupted hourly",
                body: "Juniors ask the copilot first. The senior's calendar stops being a help desk. Knowledge stops being trapped in one partner's head.",
              },
              {
                title: "Operations-heavy SMEs with SOPs nobody reads",
                body: "Instead of digging through a Drive folder, your floor manager asks the copilot and gets the answer in seconds — with the exact SOP attached for proof.",
              },
              {
                title: "Sales teams that lose deals to slow internal lookups",
                body: "Mid-call, your rep asks the copilot for the latest pricing or the contract terms for a returning client. Answer lands before the silence gets awkward.",
              },
            ],
            slotsIn:
              "The copilot is the inward-facing twin of the AI Receptionist — same training pipeline, different audience. It draws on the same knowledge base, which means updates to one improve the other. Pairs with Automation Agents when a question turns into a task ('schedule the follow-up' or 'create the proposal').",
            faq: [
              {
                question: "Is my data sent to OpenAI?",
                answer: "Your files stay in your database. Only the question and the relevant snippets are sent to the model — never the full document set. We use zero-retention API tiers.",
              },
              {
                question: "Can it handle scanned PDFs and Excel?",
                answer: "Yes. We run OCR on scanned documents and structured extraction on spreadsheets. It works on the messy real-world files your team actually has.",
              },
              {
                question: "Will it make things up?",
                answer: "Every answer is grounded in retrieved sources with citations. When the copilot can't find an answer in your documents, it tells you — instead of inventing one.",
              },
            ],
          },
        },
        {
          index: "03",
          eyebrow: "Agents",
          tag: "Routine",
          name: "Automation Agents",
          description:
            "Repetitive admin handled quietly: data entry, follow-ups, status checks, scheduling — work an AI could own.",
          detail: {
            slug: "agents",
            tagline: "The silent worker that handles the routine — running overnight, escalating only when something genuinely needs you.",
            included: [
              "Multi-step task automation across your existing software stack",
              "Trigger library — schedule, webhook, email-in, form submission, file drop",
              "Step-by-step audit log of every action the agent takes",
              "Pause / approve checkpoints for high-stakes steps",
              "Escalation to humans on WhatsApp or Slack when needed",
              "Self-healing retry logic for transient API failures",
            ],
            builtFor: [
              {
                title: "Back offices buried in data entry between systems",
                body: "The agent watches the source (a form, an email, a spreadsheet) and writes the same data into the destination (the CRM, the ledger, the warehouse system) — every time, without typos.",
              },
              {
                title: "Sales teams forgetting to follow up",
                body: "Three days after a quote goes out, the agent sends a check-in WhatsApp. Seven days later, a soft nudge. Stops when the prospect replies. Reports weekly to the sales manager.",
              },
              {
                title: "Ops teams chasing status across vendors",
                body: "The agent polls supplier portals, parses email confirmations, and tells your team only when something has actually changed. No more daily 'any update?' threads.",
              },
            ],
            slotsIn:
              "Agents are the verbs of the AI workforce — Receptionists and Copilots answer; Agents act. When a customer requests a callback through the receptionist, an agent schedules it. When the copilot is asked to send a follow-up, an agent sends it. They're how every AI interaction translates into actual work being done.",
            faq: [
              {
                question: "What happens if an agent makes a mistake?",
                answer: "Every action is logged with a reversal path. For destructive steps (sending external messages, editing records, processing payments), we add an approval checkpoint before the agent commits.",
              },
              {
                question: "Can it work with our existing tools?",
                answer: "Almost always yes. We use official APIs where available, browser automation for tools without APIs, and email gateways for the rest. Few systems are truly closed off.",
              },
              {
                question: "How is this different from Zapier or Make.com?",
                answer: "Zapier handles one trigger and one action. Our agents handle multi-step decisions — 'if the customer hasn't replied AND the invoice is unpaid AND it's been over 14 days, send the polite reminder template' — without you wiring every branch.",
              },
            ],
          },
        },
        {
          index: "04",
          eyebrow: "Generators",
          tag: "Docs",
          name: "Quote Generators",
          description:
            "Templated outputs from a few inputs. Quotes, contracts, proposals, reports — produced in seconds.",
          detail: {
            slug: "generators",
            tagline: "Branded documents in fifteen seconds — quotes, proposals, contracts, reports — from a short form instead of a blank page.",
            included: [
              "Custom template designed to match your existing branding",
              "Short input form — only the fields that actually change",
              "Auto-pulled context from your CRM (client name, address, history)",
              "PDF export with proper typography, headers, photos, and pricing tables",
              "Tracked send links so you know when the client opened it",
              "Version history per document — every quote you've sent, searchable",
            ],
            builtFor: [
              {
                title: "Property and construction agencies writing quotes daily",
                body: "Spec intake takes 30 seconds. Branded PDF lands in another 15. The agent who used to spend an hour per quote now does ten before lunch — and every one looks identical.",
              },
              {
                title: "Consultants stuck on the proposal hamster wheel",
                body: "Pick a project archetype, drop in the client name and the scope bullets — the generator pulls in your case studies, methodology, and pricing model. Ship a 12-page proposal in minutes.",
              },
              {
                title: "Service businesses with messy invoice and contract handovers",
                body: "Sales closes the deal, fills the short form, and the contract + invoice ship together — branded, dated, e-signature-ready, copied to ops automatically.",
              },
            ],
            slotsIn:
              "Generators are the output side of the system. They consume data from your CRM (where Automation Agents have already organised it), reference templates approved by the team, and emit documents that the Receptionist can attach to a WhatsApp reply or that Compliance Automations can submit to LHDN. The factory floor for paperwork.",
            faq: [
              {
                question: "Will the output look templated?",
                answer: "No. We build the template to your design — your fonts, your colours, your photography. The generated PDFs look like your design team made each one by hand.",
              },
              {
                question: "Can the AI write the proposal content too?",
                answer: "Yes, where it makes sense. For repeating sections (scope, methodology, terms) we use your library. For bespoke sections (client context, risks) we use an LLM grounded in your past proposals.",
              },
              {
                question: "Who owns the templates and the generated documents?",
                answer: "You do. Templates live in your repo. Documents save to your storage. We hand over full source and admin access on day one.",
              },
            ],
          },
        },
        {
          index: "05",
          eyebrow: "Compliance",
          tag: "LHDN · PDPA · SST",
          name: "Compliance Automations",
          description:
            "LHDN e-invoicing, PDPA logging, SST reporting — kept current as the regulations move. The piece nobody else wants to maintain.",
          detail: {
            slug: "compliance",
            tagline: "The regulatory plumbing nobody wants to own — built once, maintained as the law moves.",
            included: [
              "LHDN MyInvois e-invoicing — auto-submitted on every qualifying transaction",
              "SST tracking and monthly report generation",
              "PDPA audit logs for every personal-data access",
              "Document retention rules with auto-archival",
              "Compliance dashboard showing what's submitted, pending, and overdue",
              "Ongoing updates as regulations change (included with the retainer)",
            ],
            builtFor: [
              {
                title: "SMEs caught by the LHDN e-invoicing rollout",
                body: "We connect to your POS or invoicing system, submit every qualifying invoice to MyInvois in the background, and surface any rejection with the exact field that needs fixing.",
              },
              {
                title: "Service businesses with PDPA blind spots",
                body: "Every time a staff member looks at a customer record, an audit row gets written. You can answer 'who accessed what, when, why' without spending a week reconstructing it.",
              },
              {
                title: "Finance teams hand-tallying monthly SST",
                body: "The system tags every transaction with the right SST treatment as it lands. The monthly report writes itself — you just review and submit.",
              },
            ],
            slotsIn:
              "Compliance is the layer that turns every other agent into a defensible process. Receptionist bookings get e-invoice trails. Quote Generators emit documents that are PDPA-clean. Automation Agents check their own actions against compliance rules before committing. The piece you don't think about until you really, really need it.",
            faq: [
              {
                question: "What happens when LHDN updates the e-invoicing schema?",
                answer: "We track it and ship the update before your next submission — included in the retainer. You don't need to know the rule changed; you'll just notice your dashboard stayed green.",
              },
              {
                question: "Is this a replacement for our accountant?",
                answer: "No — it's what makes your accountant's job sane. They get clean, timestamped, audit-trailed data instead of a month-end reconciliation nightmare.",
              },
              {
                question: "What if the regulation changes mean we owe back-filing?",
                answer: "We tell you up front during the audit phase. If back-filing is needed, we scope it as a one-time project — and our system makes sure you never have to do it again.",
              },
            ],
          },
        },
      ],
    },
    useCases: [
      {
        index: "01",
        id: "dental",
        name: "Dental Clinic",
        metaShort: "4 surfaces · receptionist · whatsapp · reminders · calendar",
        headline: {
          lead: "A single-chair practice that ",
          em: "fired its receptionist",
          rest: " on a busy Tuesday and never looked back.",
        },
        body:
          "After hours, the AI receptionist takes the call. WhatsApp confirms the booking. The day-before reminder fires automatically. Every patient and slot syncs back to the calendar.",
        surfaces: [
          { index: "01", name: "AI receptionist", desc: "voice + chat" },
          { index: "02", name: "WhatsApp booking", desc: "native channel" },
          { index: "03", name: "Reminders", desc: "24h before" },
          { index: "04", name: "Calendar sync", desc: "live" },
        ],
        outcome: {
          lead: "Result: ",
          em: "after-hours bookings handled without staff",
          rest: ", every visit confirmed before the patient walks in.",
        },
        photo: {
          url: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1200&q=80",
          alt: "A modern dental clinic interior with treatment chair.",
        },
      },
      {
        index: "02",
        id: "law",
        name: "Law Firm",
        metaShort: "4 surfaces · copilot · search · drafts · citations",
        headline: {
          lead: "A 4-partner firm that turned its case files into ",
          em: "instant answers",
          rest: " for every junior associate.",
        },
        body:
          "Junior associates ask in plain English. The copilot pulls from indexed case files, drafts intake letters from precedents, and surfaces citations live. The seniors stop being interrupted.",
        surfaces: [
          { index: "01", name: "Case-file Q&A", desc: "plain English" },
          { index: "02", name: "Document search", desc: "indexed" },
          { index: "03", name: "Intake-letter draft", desc: "auto-generated" },
          { index: "04", name: "Citation lookup", desc: "live" },
        ],
        outcome: {
          lead: "Result: ",
          em: "senior time freed by 30%",
          rest: ", juniors finding answers without an interrupt.",
        },
        photo: {
          url: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=1200&q=80",
          alt: "A law office with shelves of legal books and case files.",
        },
      },
      {
        index: "03",
        id: "fnb",
        name: "F&B Chain",
        metaShort: "4 surfaces · monitor · reorder · alerts · cost",
        headline: {
          lead: "A 12-outlet chain whose stockroom finally ",
          em: "reorders itself",
          rest: " before the inventory runs dry.",
        },
        body:
          "The agent watches stock against a sales-velocity baseline. Reorders go to suppliers automatically. Daily WhatsApp digests show outlet managers what's running low. Cost tracking lands in a Sheet by 7am.",
        surfaces: [
          { index: "01", name: "Inventory monitor", desc: "realtime" },
          { index: "02", name: "Supplier reorder", desc: "auto-trigger" },
          { index: "03", name: "Stock alerts", desc: "whatsapp" },
          { index: "04", name: "Cost tracking", desc: "daily digest" },
        ],
        outcome: {
          lead: "Result: ",
          em: "zero stockouts across 12 outlets",
          rest: ", with reorders running themselves overnight.",
        },
        photo: {
          url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
          alt: "A modern restaurant interior showing kitchen and dining.",
        },
      },
      {
        index: "04",
        id: "property",
        name: "Property Agency",
        metaShort: "4 surfaces · intake · pdf · photos · tracking",
        headline: {
          lead: "An agency that turned 90 minutes of quote-writing into ",
          em: "fifteen seconds",
          rest: " per branded PDF.",
        },
        body:
          "An agent fills the form. The quote generator pulls in branded headers, inserts the property photos, lays out the spec, and exports a PDF. Send and track in one click.",
        surfaces: [
          { index: "01", name: "Spec intake", desc: "form-driven" },
          { index: "02", name: "PDF builder", desc: "branded" },
          { index: "03", name: "Photo embed", desc: "auto-laid" },
          { index: "04", name: "Send & track", desc: "live link" },
        ],
        outcome: {
          lead: "Result: ",
          em: "quote turnaround dropped to fifteen seconds",
          rest: ", and not a single template-looking PDF in the bunch.",
        },
        photo: {
          url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
          alt: "A modern Malaysian residential property exterior at dusk.",
        },
      },
    ],
    process: {
      description:
        "Four steps from the discovery call to a production agent. Discovery is free. The Workflow Audit is yours to keep, and credited to the build if we proceed.",
      termValue: "5–9 weeks",
      steps: [
        {
          index: "01",
          name: "Workflow audit",
          sub: "We map what's automatable in your day-to-day operations.",
          term: "1 week",
          fee: "Free",
          feeIsAccent: true,
        },
        {
          index: "02",
          name: "Agent design",
          sub: "System prompts, knowledge base, escalation rules — written and reviewed.",
          term: "1–2 weeks",
          fee: "— quoted —",
          feeIsAccent: false,
        },
        {
          index: "03",
          name: "Build & training",
          sub: "Trained on your real workflows. Iterated to production-grade.",
          term: "3–6 weeks",
          fee: "— quoted —",
          feeIsAccent: false,
        },
        {
          index: "04",
          name: "Launch + ongoing tuning",
          sub: "Live for users. Tuning passes for 30 days, then handed over with docs.",
          term: "30 days",
          fee: "Included",
          feeIsAccent: false,
        },
      ],
    },
    comparison: {
      eyebrowLabel: "Why custom AI",
      headline: {
        lead: "Why we’d rather build it than ",
        em: "rent it",
        rest: ".",
      },
      rightCaption: {
        lead: "Powerful, generic — or ",
        em: "built for your business",
        rest: ".",
      },
      columns: [
        { label: "Generic ChatGPT" },
        { label: "Off-the-shelf chatbot" },
        { label: "Aurexis Custom AI", isAccent: true },
      ],
      rows: [
        {
          topic: "Knows your business",
          values: ["No", "Trained on FAQs only", "Trained on your data"],
        },
        {
          topic: "Integrates with your tools",
          values: ["Separate workflow", "Limited webhooks", "Native integrations"],
        },
        {
          topic: "Owns the data",
          values: ["OpenAI does", "Vendor does", "You do"],
        },
        {
          topic: "PDPA-compliant by design",
          values: ["Depends on use", "Depends on vendor", "Yes, contractually"],
        },
        {
          topic: "Routes to humans intelligently",
          values: ["No", "Basic", "Custom escalation rules"],
        },
      ],
      verdict: [
        "Powerful, generic.",
        "Templated, shallow.",
        { lead: "Built for ", em: "your business", rest: "." },
      ],
    },
    faq: {
      headline: "Four honest answers.",
      items: [
        {
          index: "01",
          question: "What models do you use?",
          answer: [
            { em: "Anthropic Claude as default" },
            ". We pick the ",
            { em: "best model for the task" },
            " — sometimes mixed. Open-source models for privacy-sensitive workloads, frontier models for reasoning-heavy ones.",
          ],
        },
        {
          index: "02",
          question: "What about hallucinations?",
          answer: [
            "We design for ",
            { em: "graceful escalation" },
            ". The agent flags uncertainty and routes to a human. Hallucination risk stays low because we ",
            { em: "ground every response in your real data" },
            " — not the open web.",
          ],
        },
        {
          index: "03",
          question: "Can it handle Malay / Bahasa?",
          answer: [
            "Yes. ",
            { em: "Multilingual is a Malaysian advantage" },
            " we lean into. English, Bahasa Malaysia, and code-switched conversations — all native to the agent.",
          ],
        },
        {
          index: "04",
          question: "Will my data be safe?",
          answer: [
            { em: "Your data is yours" },
            ". We use API access (",
            { em: "no training on your data" },
            "). We sign DPAs. ",
            { em: "PDPA-compliant by design" },
            ".",
          ],
        },
      ],
    },
    closingCTA: {
      headline: {
        lead: "See what an AI worker ",
        em: "actually sounds",
        rest: " like.",
      },
      subhead:
        "Our AI receptionist takes a real call — no deck, no pitch. Just the agent, in production.",
      primary: { label: "See AI Receptionist Live", href: "/the-lab" },
      whatsappLabel: "WhatsApp us about an AI build",
      related: [
        { label: "The Ecosystem", href: "/services/ecosystem" },
        { label: "Web Platforms", href: "/services/web-engineering" },
        { label: "Mobile Apps", href: "/services/mobile-ecosystems" },
      ],
    },
  },
  "web-engineering": {
    slug: "web-engineering",
    accent: ACCENTS.blue,
    hero: {
      eyebrowLabel: "Component · Web",
      position: "03 / 04",
      eyebrowAria: "Section: Web Platforms, three of four pillars",
      headlineLead: "Websites that ",
      headlineEm: "actually",
      headlineRest: " load.",
      subhead:
        "Custom-built websites, e-commerce stores, and customer portals. Performance-first — Lighthouse 90+ as default, not aspiration. Typical builds RM 15–50k. ",
      primaryCta: {
        label: "See Our Work",
        href: "/portfolio",
      },
      ctaCaption: "~5 min · case studies",
      mobileMarker: "Marketing · Commerce · Portals · Booking",
    },
    pain: {
      header: {
        eyebrowNum: "01",
        eyebrowLabel: "The Problem",
        headlineLead: "Most Malaysian SME sites are ",
        headlineEm: "costing",
        headlineRest: " you customers.",
        subhead:
          "Your website is your front door. It should open fast and look like yours alone.",
      },
      items: [
        {
          index: "01",
          category: "Speed",
          title: "Slow sites kill conversion",
          body:
            "Every 1s of load delay = 7% drop in conversions. Most Malaysian SME sites load in 4–9 seconds.",
          metric: { label: "Lighthouse", value: "35–55 typical" },
        },
        {
          index: "02",
          category: "Templates",
          title: "Templates feel templated",
          body:
            "Wix, Squarespace, GoDaddy templates make you look like every other shop. There’s no premium signal.",
          metric: { label: "Concentration", value: "5 templates dominate" },
        },
        {
          index: "03",
          category: "Lock-in",
          title: "You can’t extend it",
          body:
            "The moment you need a custom feature, the platform fights you. You’re locked in.",
          metric: { label: "Migration cost", value: "4–8 weeks" },
        },
      ],
    },
    whatWeBuild: {
      headline: "We build the web that loads.",
      caption: [
        "Five surfaces.",
        { br: true },
        "Built for ",
        { em: "speed" },
        ". Shipped ",
        { em: "together" },
        ".",
      ],
      items: [
        {
          index: "01",
          eyebrow: "Marketing",
          tag: "Lighthouse 90+",
          name: "Marketing Sites",
          description:
            "Custom-built, performance-first marketing sites. Lighthouse 90+ as default, not aspiration.",
          detail: {
            slug: "marketing-sites",
            tagline: "Your front door — engineered to load in under a second on Malaysian 4G and convert what the ad spend brought in.",
            included: [
              "Custom design — no template, no theme, your brand only",
              "Lighthouse 90+ on mobile as the build-time gate",
              "Headless CMS so non-developers can edit copy and images",
              "Schema markup, semantic HTML, and Core Web Vitals tuning baked in",
              "Edge-deployed on Vercel or Cloudflare — sub-second TTFB globally",
              "Analytics, conversion tracking, and a/b testing wired from day one",
            ],
            builtFor: [
              {
                title: "Brands graduating from WordPress and Wix",
                body: "Your template-shaped site is bleeding conversions before the visitor scrolls. We rebuild it as a custom front, keep all your content, and watch the bounce rate halve.",
              },
              {
                title: "Companies pouring ad spend into a slow landing page",
                body: "Meta and Google ads sending traffic to a 5-second loading site is a 30% conversion tax. We get you to sub-second so every ringgit of spend lands properly.",
              },
              {
                title: "B2B firms losing trust before the first scroll",
                body: "Premium services need a premium front. A bespoke site signals you're serious — and stops you losing leads to competitors with better-looking homepages.",
              },
            ],
            slotsIn:
              "Marketing Sites are the public face of the system. They hand leads off cleanly to Booking & Intake (the calendar and payment flow), or to Lead Pages (when running campaigns), or to Customer Portals (for existing clients logging in). The same design system carries through every surface.",
            faq: [
              {
                question: "Can I edit the site myself after launch?",
                answer: "Yes. We integrate a headless CMS (Sanity, Payload, or Contentlayer) so your marketing team can update copy, swap images, and publish new posts without coming back to us.",
              },
              {
                question: "What does Lighthouse 90+ actually mean for my business?",
                answer: "Faster load times mean lower bounce rates, higher conversion, and better search ranking. The 90+ score is the contract; you'll see it in the analytics dashboard.",
              },
              {
                question: "Will my SEO survive the rebuild?",
                answer: "Yes. We map every existing URL, set up redirects, preserve schema, and submit a new sitemap on launch. Most clients see SEO improve within 4–6 weeks of going live.",
              },
            ],
          },
        },
        {
          index: "02",
          eyebrow: "Commerce",
          tag: "Stores",
          name: "E-commerce",
          description:
            "Custom or Shopify-fluent — your call. Built for the way Malaysian buyers actually pay and check out.",
          detail: {
            slug: "e-commerce",
            tagline: "Stores built around Malaysian buyer behaviour — FPX, GrabPay, instalments, and a checkout that doesn't fight the customer.",
            included: [
              "Custom storefront on Next.js, or Shopify with custom theming — your choice",
              "Malaysian payment rails: FPX, GrabPay, Touch 'n Go, ShopeePay, Stripe",
              "Cart and abandoned-checkout recovery via WhatsApp and email",
              "Inventory sync with your warehouse system or POS",
              "Live product CMS — your team manages the catalog without developer help",
              "Performance-tuned product pages with proper image optimisation",
            ],
            builtFor: [
              {
                title: "D2C brands stuck on Shopify themes that don't fit",
                body: "We keep the Shopify backend (where your ops team is comfortable) but rebuild the storefront as a custom experience. Same admin, much better front.",
              },
              {
                title: "Stores losing checkouts to clunky payment flows",
                body: "Malaysians abandon when they can't see their bank. We wire every relevant local rail so the customer sees their option and finishes the buy.",
              },
              {
                title: "Catalog-heavy businesses outgrowing template constraints",
                body: "Hundreds of SKUs, complex variants, custom pricing logic. The platform stops fighting you — your team gets the controls they actually need.",
              },
            ],
            slotsIn:
              "E-commerce sits at the intersection of Marketing Sites (shared design system) and the Data Engineering Pipelines that feed inventory, customer LTV, and margin into your dashboards. AI Receptionists can answer order-status questions; Automation Agents can chase the abandoned carts overnight.",
            faq: [
              {
                question: "Custom build or Shopify — which is right for me?",
                answer: "Shopify is faster to launch and ops-friendly. A custom build gives total control and zero platform fees. We help you decide in the audit phase based on volume, complexity, and your team's comfort.",
              },
              {
                question: "Will my checkout work for older customers?",
                answer: "Yes. We support all major Malaysian payment methods and design the checkout for low cognitive load — no surprises, no jargon. Tested on actual phones, not just designer mockups.",
              },
              {
                question: "What about ongoing maintenance?",
                answer: "Custom stores include a 30-day support window. After that, you can self-manage (we leave clean docs) or sign onto a monthly retainer for updates and feature additions.",
              },
            ],
          },
        },
        {
          index: "03",
          eyebrow: "Portals",
          tag: "Login",
          name: "Customer Portals",
          description:
            "Login, dashboard, self-service. Where your customers manage what they bought after the sale.",
          detail: {
            slug: "customer-portals",
            tagline: "Where the relationship lives after the sale — self-service that cuts support tickets and signals you're not a fly-by-night.",
            included: [
              "Custom auth with email, social login, and SSO options",
              "Personal dashboard showing what each customer cares about",
              "Self-service actions: download invoices, upgrade plans, manage seats",
              "Activity feed and notifications, real-time where it matters",
              "Role-based permissions for multi-user customer accounts",
              "Audit logs for compliance and account-recovery flows",
            ],
            builtFor: [
              {
                title: "SaaS-like services tired of email-based account management",
                body: "Stop being the help desk for password resets and invoice copies. The portal handles 80% of the routine requests; your team gets the interesting 20%.",
              },
              {
                title: "Professional services managing long client engagements",
                body: "Clients log in to see project status, download deliverables, and message your team in one place. No more 'where's that document we sent you last quarter?'",
              },
              {
                title: "Subscription businesses growing past 100 customers",
                body: "Manual onboarding doesn't scale. The portal handles signup → trial → conversion → renewal as a coherent flow your customer drives themselves.",
              },
            ],
            slotsIn:
              "Portals are the long-tail relationship layer. They share auth and design with the Marketing Site and E-commerce store, integrate with Booking & Intake for follow-up sessions, and feed Data Engineering Dashboards so you see customer behaviour in aggregate. Internal Copilots can use portal data to answer staff queries about specific accounts.",
            faq: [
              {
                question: "Can it integrate with my existing CRM?",
                answer: "Yes. We sync two-way with HubSpot, Pipedrive, Zoho, Salesforce, and most others. Account changes in the portal show up in the CRM and vice versa.",
              },
              {
                question: "What about security?",
                answer: "Standard practices: bcrypt password hashing, JWT or session-based auth, MFA option, audit logs, encryption at rest. PDPA-compliant by design. Optional SOC2 prep available.",
              },
              {
                question: "How do customers actually find and use it?",
                answer: "Branded subdomain (portal.yourdomain.com), single-click login from email, intuitive UI that doesn't require training. We measure adoption in week one to confirm it's actually being used.",
              },
            ],
          },
        },
        {
          index: "04",
          eyebrow: "Leads",
          tag: "Campaigns",
          name: "Lead Pages",
          description:
            "For ad campaigns, calculators, lead magnets. Fast, focused, instrumented.",
          detail: {
            slug: "lead-pages",
            tagline: "Single-purpose pages that turn ad clicks into qualified leads — instrumented, A/B-able, fast to ship.",
            included: [
              "Custom single-page design optimised for one specific conversion",
              "Interactive calculators, quizzes, or comparison tools where it helps",
              "Form-to-CRM wiring (HubSpot, Pipedrive, your custom DB)",
              "Full conversion tracking: GA4, Meta Pixel, Google Ads, server-side fallbacks",
              "A/B testing setup so you can iterate on copy and layout",
              "Sub-second load times — every ad ringgit lands on a fast page",
            ],
            builtFor: [
              {
                title: "Performance marketers burning budget on slow landing pages",
                body: "We rebuild the landing page so the page load doesn't tax your CPL. Most clients see CPL drop 20–35% in the first 30 days just from page speed.",
              },
              {
                title: "B2B teams running interactive lead magnets",
                body: "Calculators and tools convert better than static PDFs. We build the calculator, capture the lead, and pipe the qualified data straight into your sales workflow.",
              },
              {
                title: "Launch campaigns that need a focused page in a hurry",
                body: "New product, new campaign, tight timeline. We ship a dedicated landing page in 1–2 weeks while your main site stays untouched.",
              },
            ],
            slotsIn:
              "Lead Pages are the spear tip. They're tuned for a single funnel and feed directly into the rest of the system — leads land in the CRM (where Data Engineering Pipelines track them), trigger Automation Agents (for instant follow-up), and surface in Internal Copilots (so your sales team can answer 'what did this lead look at before reaching out?').",
            faq: [
              {
                question: "How is this different from a marketing site?",
                answer: "A marketing site explains the whole company. A lead page does one job: convert a specific audience for a specific offer. Different copy strategy, different layout, different metrics.",
              },
              {
                question: "Can I run multiple variants for A/B testing?",
                answer: "Yes. We wire up variant routing on day one — copy, headlines, hero images, CTA labels. The testing dashboard lets non-developers spin up and decide variants.",
              },
              {
                question: "How fast can a lead page actually be shipped?",
                answer: "1–2 weeks for a focused single-page build. Faster if you have existing brand assets. We've shipped same-week for emergency campaign launches.",
              },
            ],
          },
        },
        {
          index: "05",
          eyebrow: "Booking",
          tag: "Calendar · Pay · Wired",
          name: "Booking & Intake",
          description:
            "Replace your form-on-WordPress with a real system. Calendars, payments, follow-ups — wired to the rest of your stack.",
          detail: {
            slug: "booking-and-intake",
            tagline: "Bookings that actually sync — calendar, payment, reminders, and follow-up, wired into the rest of your stack.",
            included: [
              "Embedded booking calendar with real-time availability",
              "Payment collection at booking (Stripe, FPX, GrabPay)",
              "Automatic confirmation email and WhatsApp message",
              "Day-before reminder, post-session follow-up, no-show recovery",
              "Two-way sync with Google Calendar, Cal.com, or your existing system",
              "Custom intake forms per service with conditional logic",
            ],
            builtFor: [
              {
                title: "Service providers losing bookings to forgotten emails",
                body: "Clients book themselves. Payment is settled before the session. The reminder fires the day before. No-shows drop and your admin time drops with them.",
              },
              {
                title: "Multi-staff clinics juggling complex availability",
                body: "Each practitioner has their own calendar, their own services, their own pricing. Clients see a clean unified booking flow; your back-office sees clean data.",
              },
              {
                title: "Workshop and event organisers selling limited seats",
                body: "Seat counts update live. Waitlists trigger when fully booked. Cancellation policies enforce themselves. You stop being the seat-counting middleman.",
              },
            ],
            slotsIn:
              "Booking & Intake is the conversion point — where Marketing Sites and Lead Pages send qualified interest. AI Receptionists can take bookings by voice or WhatsApp. Automation Agents handle the post-booking sequence. Customer Portals show booking history for repeat clients. Data Engineering Dashboards turn it all into utilisation and revenue charts.",
            faq: [
              {
                question: "Do I still need Cal.com or Calendly?",
                answer: "If you only need basic scheduling, those are fine. We build this when you need payment-at-booking, custom intake forms, multi-staff routing, or deep integration with the rest of your business. Many clients migrate off Cal.com as their workflow grows.",
              },
              {
                question: "How are payments handled?",
                answer: "Full payment, deposit, or 'pay later' — your choice per service. Stripe handles the rails; refund and cancellation policies are enforced automatically based on your rules.",
              },
              {
                question: "Will it integrate with my existing software?",
                answer: "Yes — Google Calendar, Cal.com, Microsoft 365, most CRMs. If your tool has an API or webhook, we wire it. If it doesn't, we'll tell you up front what's possible.",
              },
            ],
          },
        },
      ],
    },
    useCases: [
      {
        index: "01",
        id: "service",
        name: "Service Business",
        metaShort: "4 surfaces · marketing · booking · whatsapp · follow-up",
        headline: {
          lead: "A 6-tech service crew whose old WordPress form ",
          em: "leaked half its leads",
          rest: " before we replaced it.",
        },
        body:
          "A new homepage replaced the old WordPress site. Bookings now go through a real calendar with payments. Lead WhatsApps land in a routed inbox. Day-after follow-ups are automatic.",
        surfaces: [
          { index: "01", name: "Marketing site", desc: "lighthouse 96" },
          { index: "02", name: "Booking form", desc: "live calendar" },
          { index: "03", name: "WhatsApp lead", desc: "auto-routed" },
          { index: "04", name: "Follow-up", desc: "day-after" },
        ],
        outcome: {
          lead: "Result: ",
          em: "lead capture up 4×",
          rest: ", and not one missed WhatsApp request since.",
        },
        photo: {
          url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
          alt: "A modern, well-lit office workspace with monitors.",
        },
      },
      {
        index: "02",
        id: "dtc",
        name: "D2C Brand",
        metaShort: "4 surfaces · storefront · cms · ops · stripe",
        headline: {
          lead: "A homegrown skincare label whose checkout ",
          em: "tripled in conversion",
          rest: " after a custom rebuild.",
        },
        body:
          "A custom storefront with their own typography, photography, and motion. Product copy goes in via a self-serve CMS. The ops dashboard shows live orders. Stripe handles MY rails.",
        surfaces: [
          { index: "01", name: "Storefront", desc: "custom-built" },
          { index: "02", name: "Product CMS", desc: "self-serve" },
          { index: "03", name: "Ops dashboard", desc: "order routing" },
          { index: "04", name: "Stripe checkout", desc: "MY rails" },
        ],
        outcome: {
          lead: "Result: ",
          em: "checkout conversion tripled",
          rest: ", with the brand finally looking like the brand.",
        },
        photo: {
          url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80",
          alt: "A skincare product photographed on a clean editorial backdrop.",
        },
      },
      {
        index: "03",
        id: "agency",
        name: "B2B Agency",
        metaShort: "4 surfaces · cms · capture · calculator · ga4",
        headline: {
          lead: "A consultancy that turned their case studies into ",
          em: "their #1 sales channel",
          rest: " in eight weeks.",
        },
        body:
          "A headless CMS for case studies. Per-campaign landing pages with embedded calculators. Lead capture wired to GA4 and the CRM. The case study page became their highest-converting surface.",
        surfaces: [
          { index: "01", name: "Case study CMS", desc: "headless" },
          { index: "02", name: "Lead-capture", desc: "per campaign" },
          { index: "03", name: "Calculator", desc: "embedded" },
          { index: "04", name: "GA4 events", desc: "piped to crm" },
        ],
        outcome: {
          lead: "Result: ",
          em: "case study traffic became #1 channel",
          rest: ", calculators driving most of the inbound.",
        },
        photo: {
          url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
          alt: "An empty modern meeting room with daylight pouring through floor-to-ceiling windows.",
        },
      },
      {
        index: "04",
        id: "membership",
        name: "Membership",
        metaShort: "4 surfaces · auth · dashboard · stripe · gating",
        headline: {
          lead: "A creator membership site where every Stripe receipt ",
          em: "unlocks a tier",
          rest: " automatically.",
        },
        body:
          "Custom auth and paywall. Members get a self-serve dashboard. Stripe handles monthly subscriptions. Content gates per tier — no manual access grants since launch.",
        surfaces: [
          { index: "01", name: "Auth + paywall", desc: "custom" },
          { index: "02", name: "Member dashboard", desc: "self-serve" },
          { index: "03", name: "Stripe subscription", desc: "monthly" },
          { index: "04", name: "Content gating", desc: "per-tier" },
        ],
        outcome: {
          lead: "Result: ",
          em: "tier unlocks fully automated",
          rest: ", with not a single manual access grant since.",
        },
        photo: {
          url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80",
          alt: "A laptop on a dark desk, displaying long-form editorial content.",
        },
      },
    ],
    process: {
      description:
        "Four steps from strategy to a live site. The wireframe is free. The design system is yours to keep, and credited to the build if we proceed.",
      termValue: "5–9 weeks",
      steps: [
        {
          index: "01",
          name: "Strategy & wireframe",
          sub: "We map information architecture and key conversion paths.",
          term: "1 week",
          fee: "Free",
          feeIsAccent: true,
        },
        {
          index: "02",
          name: "Design",
          sub: "High-fidelity in your design system — typography, motion, the whole stack.",
          term: "1–2 weeks",
          fee: "— quoted —",
          feeIsAccent: false,
        },
        {
          index: "03",
          name: "Build",
          sub: "Shipped in Astro or Next.js. Lighthouse 90+ before we hand over.",
          term: "3–6 weeks",
          fee: "— quoted —",
          feeIsAccent: false,
        },
        {
          index: "04",
          name: "Launch + 30-day support",
          sub: "Live on your domain. Bug fixes, copy tweaks, team training.",
          term: "30 days",
          fee: "Included",
          feeIsAccent: false,
        },
      ],
    },
    comparison: {
      eyebrowLabel: "Why custom web",
      headline: {
        lead: "Why we’d rather build it than ",
        em: "template it",
        rest: ".",
      },
      rightCaption: {
        lead: "Cheap to launch, hits wall — or ",
        em: "built once, scales",
        rest: ".",
      },
      columns: [
        { label: "WordPress + plugins" },
        { label: "Wix / Squarespace" },
        { label: "Cheap freelance build" },
        { label: "Aurexis Web", isAccent: true },
      ],
      rows: [
        {
          topic: "Performance (Lighthouse)",
          values: ["50–70 typical", "60–80 typical", "40–70 typical", "90+ default"],
        },
        {
          topic: "Customisation",
          values: ["Plugin-limited", "Template-limited", "Skill-dependent", "Anything"],
        },
        {
          topic: "Maintenance burden",
          values: ["Plugin updates weekly", "Vendor lock-in", "Fragile code", "Clean codebase"],
        },
        {
          topic: "You own the code",
          values: ["Yes but messy", "Locked in vendor", "Depends", "Clean repo, yours"],
        },
        {
          topic: "Loads fast on Malaysian 4G",
          values: ["Often no", "Sometimes", "Maybe", "Always"],
        },
      ],
      verdict: [
        "Cheap, fragile, slow.",
        "Fast to launch, hits wall.",
        "Hit or miss.",
        { lead: "Built once, ", em: "scales", rest: "." },
      ],
    },
    faq: {
      headline: "Three honest answers.",
      items: [
        {
          index: "01",
          question: "What stack do you build on?",
          answer: [
            { em: "Astro" },
            " for marketing sites, ",
            { em: "Next.js" },
            " for app-like sites. Tailwind for styling. Cloudflare or Vercel for hosting. ",
            { em: "No WordPress" },
            ".",
          ],
        },
        {
          index: "02",
          question: "Can I edit content myself after launch?",
          answer: [
            "Yes. We integrate a CMS (Sanity / Payload / Contentlayer) so ",
            { em: "non-developers can update copy and images" },
            " without going back to us.",
          ],
        },
        {
          index: "03",
          question: "What about SEO?",
          answer: [
            "Built in ",
            { em: "from day one" },
            ". Schema markup, semantic HTML, fast Core Web Vitals, sitemap, robots.txt. We don’t add SEO at the end — we ",
            { em: "build for it from the start" },
            ".",
          ],
        },
      ],
    },
    closingCTA: {
      headline: {
        lead: "See what a fast site ",
        em: "actually feels",
        rest: " like.",
      },
      subhead:
        "Our portfolio is the pitch. Real sites, real Lighthouse scores, real clients — no filters.",
      primary: { label: "See Our Work", href: "/portfolio" },
      whatsappLabel: "WhatsApp us about a web build",
      related: [
        { label: "The Ecosystem", href: "/services/ecosystem" },
        { label: "AI Workflows", href: "/services/ai-automation" },
        { label: "Mobile Apps", href: "/services/mobile-ecosystems" },
      ],
    },
  },
  "mobile-ecosystems": {
    slug: "mobile-ecosystems",
    accent: ACCENTS.emerald,
    hero: {
      eyebrowLabel: "Component · App",
      position: "04 / 04",
      eyebrowAria: "Section: Mobile Apps, four of four pillars",
      headlineLead: "Mobile apps that ",
      headlineEm: "integrate,",
      headlineRest: " not float.",
      subhead:
        "iOS and Android apps built to talk to the rest of your stack — your website, your AI, your operations system. Typical builds RM 30–120k. ",
      primaryCta: {
        label: "See an App Demo",
        href: "/the-lab",
      },
      ctaCaption: "~4 min · live preview",
      mobileMarker: "Internal · Customer · Hybrid · Offline-first",
    },
    pain: {
      header: {
        eyebrowNum: "01",
        eyebrowLabel: "The Problem",
        headlineLead: "Most agency-built apps are ",
        headlineEm: "islands",
        headlineRest: ".",
        subhead:
          "Your app should feel like part of your business, not a side project.",
      },
      items: [
        {
          index: "01",
          category: "Disconnected",
          title: "Apps that don’t connect",
          body:
            "Most agency-built apps are islands. Your data lives there and nowhere else.",
          metric: { label: "Backend share", value: "~70% don’t" },
        },
        {
          index: "02",
          category: "Quality",
          title: "Bad app store ratings hurt your business",
          body:
            "A 3-star app in 2026 signals “low effort.” Customers don’t download.",
          metric: { label: "Download drop", value: "60% if <4.0★" },
        },
        {
          index: "03",
          category: "Wrong stack",
          title: "React Native vs. native confusion",
          body:
            "Most agencies push React Native because it’s cheaper for them. We pick what’s right for your use case.",
          metric: { label: "RN default", value: "~85% of agencies" },
        },
      ],
    },
    whatWeBuild: {
      headline: "We build apps that integrate.",
      caption: [
        "Five surfaces.",
        { br: true },
        "Built ",
        { em: "native-first" },
        ". Shipped ",
        { em: "together" },
        ".",
      ],
      items: [
        {
          index: "01",
          eyebrow: "Internal",
          tag: "Staff",
          name: "Internal Apps",
          description:
            "Operations, dispatch, field service. The staff app your team actually opens at 8am.",
          detail: {
            slug: "internal-apps",
            tagline: "The staff app your team actually opens at 8am — built for the floor, the field, and the friction you've been working around.",
            included: [
              "Native-feel app on iOS and Android (React Native or full native)",
              "Role-based dashboards — drivers see drivers' work, managers see managers'",
              "Real-time data sync with your backend and other staff devices",
              "Photo capture, barcode scanning, signature capture, location tagging",
              "Offline-capable for spotty warehouses, basements, and remote jobs",
              "Push notifications for assignments, alerts, and status changes",
            ],
            builtFor: [
              {
                title: "Workshops and service crews still running off WhatsApp groups",
                body: "Dispatch shows up on the staff app instead of a chat. Customer history, photos, and notes per job. The whiteboard finally retires.",
              },
              {
                title: "Field teams losing data between visits",
                body: "Service techs log every job on the spot — photos, parts used, signatures. Sync runs the moment they're back on network. Office sees real-time progress without anyone calling in.",
              },
              {
                title: "Operations managers buried in 'where are we' questions",
                body: "Live status across every active job, every active staff member, every active customer. The dashboard becomes their single source — the standup gets 50% shorter.",
              },
            ],
            slotsIn:
              "Internal Apps are the operations spine. They share a backend with Customer Apps (so the customer sees their order status reflect what staff actually does), feed Data Engineering Dashboards (so management sees utilisation and bottlenecks), and host Internal Copilots (so staff can ask 'what's this customer's history' without leaving the app).",
            faq: [
              {
                question: "iOS, Android, or both?",
                answer: "Both, from one React Native codebase. Same UX on both, cuts cost vs separate native apps roughly in half, and updates ship to both stores together.",
              },
              {
                question: "How do you handle staff onboarding for the app?",
                answer: "We design for zero training. The first-time login walks the staff member through their workflow. Most teams are productive in under 30 minutes.",
              },
              {
                question: "What about devices the company doesn't own?",
                answer: "Works on personal devices too, with proper MDM (mobile device management) and remote-wipe for departing staff. Or we recommend a cheap Android fleet for full company control.",
              },
            ],
          },
        },
        {
          index: "02",
          eyebrow: "Customer",
          tag: "Loyalty",
          name: "Customer Apps",
          description:
            "Loyalty, ordering, account management. Built to make repeat business effortless.",
          detail: {
            slug: "customer-apps",
            tagline: "An app your customers actually keep installed — because it makes the repeat purchase easier, not because you nagged them.",
            included: [
              "Native iOS + Android app with App Store and Play Store submission",
              "Loyalty wallet with QR stamps or points (no plastic cards)",
              "In-app ordering, scheduling, or account management",
              "Push notifications for offers, status updates, and re-engagement",
              "Customer history, preferences, and saved payment methods",
              "Branded onboarding flow that converts first-time users",
            ],
            builtFor: [
              {
                title: "F&B chains replacing punch cards with digital wallets",
                body: "QR stamps live in the app. Customer scans at the counter, the stamp lands instantly. The free coffee redemption is a tap. Loyalty data finally tells you which outlets and offers actually drive returns.",
              },
              {
                title: "Salons, gyms, and clinics managing memberships",
                body: "Members book sessions, see their package balance, and pay top-ups in-app. Renewal nudges go out automatically. Reception spends less time on the phone.",
              },
              {
                title: "Retailers wanting a direct line to repeat customers",
                body: "Instead of paying Meta to retarget them, you push a notification when their favourite product restocks. Cheaper, faster, and 10× higher engagement.",
              },
            ],
            slotsIn:
              "Customer Apps share a backend with Internal Apps (staff sees what customers do in real time), tie into Booking & Intake (calendar logic lives in one place), and feed Data Engineering Dashboards (cohort behaviour, LTV, retention). Push & Re-engage handles the messaging that brings customers back.",
            faq: [
              {
                question: "Why an app instead of just a mobile-friendly site?",
                answer: "Apps get push notifications, work offline, and live one tap away on the home screen. For loyalty and repeat-purchase businesses, that home-screen presence is worth the build.",
              },
              {
                question: "How do you get customers to actually install it?",
                answer: "First-purchase incentive (extra stamp, discount) is the highest-converting trigger. We build a clean install flow into the receipt, the website, and the in-store QR codes.",
              },
              {
                question: "What about App Store fees and approval?",
                answer: "We handle the entire App Store + Play Store submission, screenshots, listing copy, and first-round review responses. Apple's 30% fee only applies to digital subscriptions; physical-product apps are exempt.",
              },
            ],
          },
        },
        {
          index: "03",
          eyebrow: "Hybrid",
          tag: "Web + App",
          name: "Hybrid Platforms",
          description:
            "Web + app sharing one backend. Same data, same flows, surfaced for the device that fits.",
          detail: {
            slug: "hybrid-platforms",
            tagline: "One backend, two surfaces — web for the desktop work, app for the on-the-go work, no copy-paste between them.",
            included: [
              "Shared backend and database — single source of truth across web and mobile",
              "Mirrored auth — login once on web, you're logged in on the app and vice versa",
              "Feature parity for core flows, plus device-specific affordances",
              "Real-time sync — change on one surface shows on the other in seconds",
              "Unified design system with platform-appropriate variants",
              "One admin panel managing data for both surfaces",
            ],
            builtFor: [
              {
                title: "B2B platforms with desktop power-users and mobile checkers",
                body: "Sales managers do the heavy work on web; reps in the field need quick status checks on phone. Both feel like the same product — because they are.",
              },
              {
                title: "Logistics and dispatch operations",
                body: "Dispatcher works the web dashboard. Drivers work the app. Updates flow between them in real time. Nobody calls anyone to ask 'where are you?'.",
              },
              {
                title: "Marketplaces with admins, sellers, and buyers",
                body: "Web admin for ops; seller dashboard works on either surface; buyer app for the actual purchase. Three roles, one platform, zero data drift.",
              },
            ],
            slotsIn:
              "Hybrid is the meta-pattern — it's how Internal Apps and Customer Apps share a brain, how Booking & Intake works the same on the booking site and the customer app, and how Data Engineering Pipelines feed a unified analytics view. The decision is rarely 'web OR app' — usually the answer is 'both, sharing the same backend.'",
            faq: [
              {
                question: "Does this cost twice as much as building one?",
                answer: "No — typically 30–50% more than a web build alone, because the heavy lifting (backend, business logic, data model) is shared. The app becomes a different surface, not a second product.",
              },
              {
                question: "Do I have to build both at once?",
                answer: "No. Most clients start with web, then add the app once they know the workflow. We architect from day one to be hybrid-ready, even if the app comes 6 months later.",
              },
              {
                question: "What about feature parity?",
                answer: "Core flows match. Device-specific affordances (camera, push, location) live on mobile; bulk operations and heavy admin live on web. We map the split during the audit phase.",
              },
            ],
          },
        },
        {
          index: "04",
          eyebrow: "Push",
          tag: "WhatsApp",
          name: "Push & Re-engage",
          description:
            "Push notifications and WhatsApp re-engagement, built in. Messages that hit at the right moment, on the channel customers already use.",
          detail: {
            slug: "push-and-re-engage",
            tagline: "Reach customers on the channels they actually check — push, WhatsApp, SMS — without becoming the brand they mute.",
            included: [
              "Push notification infrastructure (FCM, APNs) for iOS and Android",
              "WhatsApp Business API for transactional and re-engagement messages",
              "SMS fallback for users without the app installed",
              "Segmentation by behaviour, location, purchase history, or app activity",
              "Send-time optimisation — messages land when each user is most likely to open",
              "Frequency caps and quiet hours so customers never feel spammed",
            ],
            builtFor: [
              {
                title: "Retailers losing customers between purchases",
                body: "Push restock alerts for the products each customer cares about. WhatsApp reminders for routine repurchases. The 60-day repeat purchase rate climbs without paying for ads.",
              },
              {
                title: "Service businesses with booking cycles",
                body: "Reminders go out the day before, follow-ups the day after, re-booking nudges at the right interval per service. The calendar stops looking empty.",
              },
              {
                title: "Apps with poor day-30 retention",
                body: "We instrument the silent drop-off points and re-engage at exactly those moments. Most apps see day-30 retention improve 1.5–2× within the first re-engagement campaign cycle.",
              },
            ],
            slotsIn:
              "Push & Re-engage is the lifecycle layer — it acts on signals from Customer Apps (behaviour), Booking & Intake (upcoming and past sessions), Data Engineering Pipelines (cohort triggers), and AI Receptionist conversations (when a lead goes cold). The trigger logic uses the same Automation Agent infrastructure as the AI pillar.",
            faq: [
              {
                question: "Won't notifications annoy customers?",
                answer: "Done badly, yes. We design relevance-first: every message earns its tap with content the customer actually wants. Frequency caps, segmentation, and opt-out flows are baked in.",
              },
              {
                question: "WhatsApp vs push — which is better?",
                answer: "Push for in-app users, WhatsApp for reach beyond the app (especially in Malaysia where WhatsApp is universal). Most successful campaigns use both at different lifecycle stages.",
              },
              {
                question: "What's the WhatsApp cost structure?",
                answer: "Transactional messages (within 24 hours of a customer message) are free. Re-engagement messages outside that window are priced per conversation by Meta — typically a few sen each in Malaysia.",
              },
            ],
          },
        },
        {
          index: "05",
          eyebrow: "Offline",
          tag: "Field · Low-connect",
          name: "Offline-first",
          description:
            "For field work and low-connectivity environments. Syncs cleanly when the network comes back. Works in the basement, in the warehouse, on the boat.",
          detail: {
            slug: "offline-first",
            tagline: "Apps that work when the bars don't — basement carparks, rural fieldwork, in-flight, anywhere your team actually has to do the job.",
            included: [
              "Local-first data storage with smart caching",
              "Conflict-resolution rules for changes made on multiple devices while offline",
              "Background sync when network returns — no manual 'upload' button",
              "Visual sync status so staff know what's pending",
              "Optimistic UI so the app feels fast even when the network is slow",
              "Bandwidth-aware media handling — compress photos for slow connections",
            ],
            builtFor: [
              {
                title: "Logistics fleets working basement loading bays and rural routes",
                body: "Drivers log deliveries, capture proof of delivery, and check off jobs without bars. Everything syncs the moment they hit a tower. Office never notices the offline gap.",
              },
              {
                title: "Field inspectors and surveyors out of network",
                body: "Forms, photos, GPS tags, signatures — captured on-site, queued locally, uploaded when the inspector hits Wi-Fi. No more 'I had it on my phone but lost it.'",
              },
              {
                title: "Maritime and remote-site teams",
                body: "Boats, oil platforms, construction sites with intermittent satellite. The app keeps working; the data flows in batches when connectivity allows.",
              },
            ],
            slotsIn:
              "Offline-first is a capability, not a separate product — we add it to Internal Apps when the work demands it. It pairs with Hybrid Platforms (so the web admin sees the offline-captured data as soon as it lands), and feeds Data Engineering Pipelines without losing the timestamp of when the work actually happened (vs when the sync completed).",
            faq: [
              {
                question: "What happens if two staff edit the same record offline?",
                answer: "We define conflict-resolution rules in the audit phase — usually last-write-wins for simple fields, merge-friendly for lists, and explicit conflict UI for genuinely ambiguous cases.",
              },
              {
                question: "How much data can the app hold offline?",
                answer: "Modern phones can comfortably cache thousands of records and gigabytes of media. We optimise for the use case — only sync what each role actually needs.",
              },
              {
                question: "Will the app work fully offline forever?",
                answer: "Read-and-capture always works. Some flows that need server validation (payment, third-party API calls) queue and run on reconnect. We map this explicitly per flow.",
              },
            ],
          },
        },
      ],
    },
    useCases: [
      {
        index: "01",
        id: "workshop",
        name: "Auto Workshop",
        metaShort: "4 surfaces · dispatch · history · photos · log",
        headline: {
          lead: "A workshop whose dispatch sheet ",
          em: "lived in a WhatsApp group",
          rest: " until the staff app replaced it.",
        },
        body:
          "A staff app on the floor. Real-time job dispatch from the front desk. Customer history at every bay. Photo uploads per job. The whiteboard finally got recycled.",
        surfaces: [
          { index: "01", name: "Job dispatch", desc: "real-time" },
          { index: "02", name: "Customer history", desc: "synced" },
          { index: "03", name: "Photo upload", desc: "per-job" },
          { index: "04", name: "Service log", desc: "digital" },
        ],
        outcome: {
          lead: "Result: ",
          em: "the whiteboard is gone",
          rest: ", and dispatch finally happens in real time.",
        },
        photo: {
          url: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1200&q=80",
          alt: "An auto workshop interior with a vehicle on a lift and tools laid out.",
        },
      },
      {
        index: "02",
        id: "restaurant",
        name: "Restaurant Chain",
        metaShort: "4 surfaces · loyalty · ordering · push · history",
        headline: {
          lead: "A 22-outlet chain that turned a printed loyalty card into ",
          em: "40,000 active wallets",
          rest: " in six months.",
        },
        body:
          "A loyalty wallet and ordering app. QR stamps replace plastic cards. Push offers land geo-aware. Order history per-user. The card-stamping habit got carried over without printing a single receipt.",
        surfaces: [
          { index: "01", name: "Loyalty wallet", desc: "qr stamps" },
          { index: "02", name: "In-app ordering", desc: "scheduled" },
          { index: "03", name: "Push offers", desc: "geo-aware" },
          { index: "04", name: "Order history", desc: "per-user" },
        ],
        outcome: {
          lead: "Result: ",
          em: "40,000 monthly active wallets in six months",
          rest: ", with QR adoption at 92% across outlets.",
        },
        photo: {
          url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
          alt: "A buzzing restaurant interior at night with warm pendant lighting.",
        },
      },
      {
        index: "03",
        id: "logistics",
        name: "Logistics Field",
        metaShort: "4 surfaces · dispatch · pod · offline · routing",
        headline: {
          lead: "A logistics fleet whose drivers stayed connected ",
          em: "even in basement carparks",
          rest: " thanks to offline-first.",
        },
        body:
          "Drivers carry a dispatch app that works without bars. Proof of delivery (photo and signature) syncs when connection returns. Routes optimise live. Even basement carparks aren't a problem anymore.",
        surfaces: [
          { index: "01", name: "Driver dispatch", desc: "routed" },
          { index: "02", name: "Proof of delivery", desc: "photo + sig" },
          { index: "03", name: "Offline-first", desc: "syncs later" },
          { index: "04", name: "Route optimise", desc: "live" },
        ],
        outcome: {
          lead: "Result: ",
          em: "drivers stayed productive in basement carparks",
          rest: ", with deliveries syncing the moment the bars return.",
        },
        photo: {
          url: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d3?auto=format&fit=crop&w=1200&q=80",
          alt: "A delivery driver walking past a logistics warehouse loading bay.",
        },
      },
      {
        index: "04",
        id: "healthcare",
        name: "Healthcare",
        metaShort: "4 surfaces · booking · records · messaging · reminders",
        headline: {
          lead: "A specialist clinic whose patient app ",
          em: "cut no-shows by 38%",
          rest: " with native push reminders.",
        },
        body:
          "A native patient app with appointment booking, encrypted records, secure messaging, and push + SMS reminders. No-shows dropped 38% within three months of launch.",
        surfaces: [
          { index: "01", name: "Appointment booking", desc: "native" },
          { index: "02", name: "Records vault", desc: "encrypted" },
          { index: "03", name: "Secure messaging", desc: "compliant" },
          { index: "04", name: "Reminders", desc: "push + sms" },
        ],
        outcome: {
          lead: "Result: ",
          em: "no-shows cut 38%",
          rest: ", with reminder reach hitting 99% across native + SMS.",
        },
        photo: {
          url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
          alt: "A healthcare professional in scrubs reviewing records on a tablet.",
        },
      },
    ],
    process: {
      description:
        "Four steps from strategy to App Store submission. The wireframe is free. The design system is yours to keep, and credited to the build if we proceed.",
      termValue: "8–12 weeks",
      steps: [
        {
          index: "01",
          name: "Strategy & wireframe",
          sub: "Native vs React Native — decided by your actual needs, not our convenience.",
          term: "1 week",
          fee: "Free",
          feeIsAccent: true,
        },
        {
          index: "02",
          name: "Design",
          sub: "Matched to platform conventions — iOS HIG and Material You, no awkward middle.",
          term: "1–2 weeks",
          fee: "— quoted —",
          feeIsAccent: false,
        },
        {
          index: "03",
          name: "Build & beta",
          sub: "TestFlight + Play Console rolling builds. Crash-free before we ship.",
          term: "6–10 weeks",
          fee: "— quoted —",
          feeIsAccent: false,
        },
        {
          index: "04",
          name: "Launch + store submission",
          sub: "App Store and Play Store submitted. 30-day support for fixes and tuning.",
          term: "30 days",
          fee: "Included",
          feeIsAccent: false,
        },
      ],
    },
    comparison: {
      eyebrowLabel: "Why custom apps",
      headline: {
        lead: "Why we’d rather build it than ",
        em: "glue it",
        rest: ".",
      },
      rightCaption: {
        lead: "Fast and cheap, hits ceiling — or ",
        em: "done right, once",
        rest: ".",
      },
      columns: [
        { label: "No-code app builder" },
        { label: "Cheap off-shore agency" },
        { label: "Aurexis App", isAccent: true },
      ],
      rows: [
        {
          topic: "App Store quality",
          values: ["Often rejected", "Hit or miss", "Built for review pass"],
        },
        {
          topic: "Integrates with your stack",
          values: ["Limited", "Inconsistent", "Native"],
        },
        {
          topic: "Performance on real devices",
          values: ["Slow on Android", "Variable", "60fps default"],
        },
        {
          topic: "You can extend it later",
          values: ["Locked to platform", "Spaghetti code", "Clean React Native or native"],
        },
        {
          topic: "Communication during build",
          values: ["Self-serve", "Time zones, language", "Direct WhatsApp to founder"],
        },
      ],
      verdict: [
        "Fast and cheap, hits ceiling.",
        "Hidden cost in rework.",
        { lead: "Done right, ", em: "once", rest: "." },
      ],
    },
    faq: {
      headline: "Four honest answers.",
      items: [
        {
          index: "01",
          question: "React Native or native?",
          answer: [
            { em: "Depends" },
            ". ",
            { em: "React Native" },
            " for most internal and dual-platform apps. ",
            { em: "Native (Swift / Kotlin)" },
            " for performance-critical apps or platform-specific features.",
          ],
        },
        {
          index: "02",
          question: "Will you submit to the App Store / Play Store?",
          answer: [
            "Yes. We handle ",
            { em: "submission, review responses, and the first round of feedback resolution" },
            " — you don’t need to learn the review portals to ship.",
          ],
        },
        {
          index: "03",
          question: "Can you take over an existing app?",
          answer: [
            "Sometimes. ",
            { em: "Codebase audit first" },
            ". We’ll ",
            { em: "tell you honestly" },
            " whether to continue or rebuild — including when a clean rebuild is cheaper.",
          ],
        },
        {
          index: "04",
          question: "How long until it’s in the store?",
          answer: [
            "Build 6–10 weeks. Apple review 1–3 days. Play Store 1–7 days. Total: ",
            { em: "~2–3 months from kickoff to live" },
            ".",
          ],
        },
      ],
    },
    closingCTA: {
      headline: {
        lead: "See what a native app ",
        em: "actually runs",
        rest: " like.",
      },
      subhead:
        "Live demos on iOS and Android. The actual build, running on actual hardware — not a mockup.",
      primary: { label: "See App Demos", href: "/the-lab" },
      whatsappLabel: "WhatsApp us about an app build",
      related: [
        { label: "The Ecosystem", href: "/services/ecosystem" },
        { label: "AI Workflows", href: "/services/ai-automation" },
        { label: "Web Platforms", href: "/services/web-engineering" },
      ],
    },
  },
  "data-engineering": {
    slug: "data-engineering",
    accent: ACCENTS.amber,
    hero: {
      eyebrowLabel: "Component · Data",
      position: "05 / 05",
      eyebrowAria: "Section: Data Engineering, five of five pillars",
      headlineLead: "One source of ",
      headlineEm: "truth",
      headlineRest: ". Dashboards that update themselves.",
      subhead:
        "Stripe, your CRM, your website, and three messy spreadsheets — unified into one live database, then surfaced in dashboards built into your portal. ",
      primaryCta: {
        label: "Book a Strategy Session",
        href: "/contact#brief",
      },
      ctaCaption: "~3 min · live walkthrough",
      mobileMarker: "Pipelines · Database · Dashboards · DaaS",
    },
    pain: {
      header: {
        eyebrowNum: "01",
        eyebrowLabel: "The Problem",
        headlineLead: "You're running your business out of ",
        headlineEm: "eight spreadsheets",
        headlineRest: ".",
        subhead:
          "Your data is everywhere and nowhere. Decisions get made on month-old PDFs.",
      },
      items: [
        {
          index: "01",
          category: "Scatter",
          title: "Numbers in eight places",
          body:
            "Stripe says one thing. The CRM says another. The spreadsheet says a third. Nobody knows which is correct.",
          metric: { label: "Tools per SME", value: "12+ on average" },
        },
        {
          index: "02",
          category: "Manual",
          title: "Hours lost to copy-paste",
          body:
            "Your team spends half a day a week shuffling numbers between systems. The errors compound silently.",
          metric: { label: "Weekly cost", value: "4–8 hours / person" },
        },
        {
          index: "03",
          category: "Stale",
          title: "Decisions on stale data",
          body:
            "By the time the monthly report lands, the picture has already shifted. You're driving by the rear-view mirror.",
          metric: { label: "Lag", value: "30+ days typical" },
        },
      ],
    },
    whatWeBuild: {
      headline: "We build the data backbone.",
      caption: [
        "Five layers.",
        { br: true },
        "Centralised. ",
        { em: "Live" },
        ". Shipped ",
        { em: "together" },
        ".",
      ],
      items: [
        {
          index: "01",
          eyebrow: "Integrations",
          tag: "API · Webhooks",
          name: "System Integration",
          description:
            "We connect Stripe, your CRM, your POS, your website forms, your accounting — so they talk to each other automatically. No more manual exports.",
          detail: {
            slug: "system-integration",
            tagline: "The connective tissue between your tools — so the numbers in Stripe match the numbers in your CRM match the numbers in your dashboard.",
            included: [
              "Two-way sync between your CRM, payment gateway, and accounting system",
              "Webhook listeners that react to every relevant event in real time",
              "Custom API connectors for systems without native integrations",
              "Error handling and retry logic so a single API hiccup doesn't break the chain",
              "Integration health monitoring with alerts when a connector breaks",
              "Full audit trail of every data flow between systems",
            ],
            builtFor: [
              {
                title: "SMEs running Stripe, HubSpot, and Xero that don't agree",
                body: "We wire them so a Stripe payment updates HubSpot and Xero simultaneously. Reconciliation goes from a monthly headache to a moot question.",
              },
              {
                title: "Retailers with POS, e-commerce, and warehouse out of sync",
                body: "A sale in-store or online updates inventory in one place — and that one place feeds every other system. Stockouts and overselling stop being daily fires.",
              },
              {
                title: "Service businesses with leads scattered across forms and chats",
                body: "Every web form, WhatsApp message, and ad lead lands in one inbox with full source attribution. No more 'where did this lead come from?'",
              },
            ],
            slotsIn:
              "System Integration is the foundation — without it, the rest of the data pillar can't do its job. It feeds the central Database Architecture, enables clean Data Migration from legacy systems, and provides the live signals that Live BI Dashboards turn into charts. Pairs with Automation Agents from the AI pillar when an integration needs decision logic.",
            faq: [
              {
                question: "What if my software doesn't have an API?",
                answer: "Most do, even if it's poorly documented. Where there's no API, we use webhooks, email parsing, or browser automation. Genuine dead ends are rare — we tell you in the audit if we find one.",
              },
              {
                question: "How long do integrations stay healthy?",
                answer: "Modern APIs are stable but they do change. The DaaS retainer covers ongoing maintenance — when an integration breaks, we fix it before it shows up in your numbers.",
              },
              {
                question: "Can I see what's flowing where?",
                answer: "Yes. The integration dashboard shows every active connection, the volume flowing through, and the last successful sync. Transparency is the whole point.",
              },
            ],
          },
        },
        {
          index: "02",
          eyebrow: "Database",
          tag: "Postgres · Supabase",
          name: "Database Architecture",
          description:
            "A secure, scalable database designed for your business — proper schemas, row-level security, audit trails. The source of truth nothing else can drift from.",
          detail: {
            slug: "database-architecture",
            tagline: "A real database designed for your business — schemas that fit, security baked in, scaled for years not weeks.",
            included: [
              "Custom Postgres or Supabase schema tailored to your business model",
              "Row-level security so every row enforces its own access rules",
              "Indexes and query optimisation for the access patterns you actually use",
              "Full audit logging — who changed what, when, why",
              "Automated backups with point-in-time recovery",
              "Documentation, migration scripts, and admin runbooks",
            ],
            builtFor: [
              {
                title: "Companies outgrowing Airtable, Notion, or spreadsheets",
                body: "When your no-code tool starts to choke, we migrate you to a real database without losing a row. Same workflows, much more headroom.",
              },
              {
                title: "Multi-team businesses needing role-based access",
                body: "Sales sees sales data. Finance sees finance. Admins see everything. Enforced at the database layer, not patched at the app layer where it can be bypassed.",
              },
              {
                title: "Regulated industries with audit requirements",
                body: "PDPA, financial audits, healthcare compliance — every record change is logged with user, timestamp, and before/after values. Audit prep stops being a fire drill.",
              },
            ],
            slotsIn:
              "Database Architecture is the spine — it's where System Integration sends data, where Data Migration lands historical records, and where Live BI Dashboards read from. Internal Copilots (AI pillar) can query it with your team's natural-language questions. Customer Portals (Web pillar) use it as their source of truth for what each user sees.",
            faq: [
              {
                question: "Why Postgres or Supabase specifically?",
                answer: "Postgres is the most battle-tested open-source database — it scales from your laptop to billions of rows. Supabase wraps it with auth, storage, and instant APIs, which speeds up the build significantly without locking you in.",
              },
              {
                question: "How is this different from using my CRM as the database?",
                answer: "CRMs are optimised for one use case (managing leads). A custom database holds everything — customers, projects, invoices, inventory, audit logs — and integrates cleanly with every tool, not just the CRM's preferred partners.",
              },
              {
                question: "What about scale?",
                answer: "We design for your 5-year horizon, not just today. Most Malaysian SMEs comfortably scale to millions of records on a starter Supabase tier — and the upgrade path is one config change.",
              },
            ],
          },
        },
        {
          index: "03",
          eyebrow: "Migration",
          tag: "Legacy · Clean",
          name: "Data Cleaning & Migration",
          description:
            "We take your messy legacy data — Excel files, old CRMs, exported PDFs — clean it, normalise it, and import it into the new database.",
          detail: {
            slug: "data-migration",
            tagline: "The unglamorous, business-critical work of getting fifteen years of legacy data into the new system without losing anything.",
            included: [
              "Inventory of every legacy data source — spreadsheets, old systems, paper archives",
              "Custom cleaning scripts to normalise inconsistent formats and fix duplicates",
              "Mapping logic from legacy fields to the new schema",
              "Validated staged imports — review the data before it goes live",
              "Reconciliation reports proving nothing got lost in the migration",
              "Rollback plan in case something needs to be undone",
            ],
            builtFor: [
              {
                title: "Businesses with twenty Excel files representing one truth",
                body: "We catalog them all, identify the duplicates, resolve the conflicts, and import the clean version into the new system. The 'real' file finally exists.",
              },
              {
                title: "Companies abandoning legacy CRM or ERP systems",
                body: "Vendor lock-in ends. We export every record, transform it to the new schema, and validate that contacts, deals, and history all survive. No lost relationships.",
              },
              {
                title: "Multi-acquisition rollups with mismatched databases",
                body: "Each acquired company brought its own systems. We unify them into one schema — customer codes, product taxonomies, pricing structures — without breaking historical reporting.",
              },
            ],
            slotsIn:
              "Data Migration is the bridge from your past to the new Database Architecture. It runs once but it has to be right — that's why we ship reconciliation reports proving every row landed. Once data is in, System Integration keeps it fresh, and Live BI Dashboards make it visible.",
            faq: [
              {
                question: "What about the dirty data we know is dirty?",
                answer: "We surface it during the audit and decide together — fix it programmatically, fix it manually, archive it, or accept it. We don't silently throw away records you might need.",
              },
              {
                question: "How long does migration usually take?",
                answer: "1–4 weeks depending on how messy the source is. Most of the time is in scripting the cleaning rules and verifying nothing drops. The actual import is usually a few hours.",
              },
              {
                question: "Will my team still recognise their data?",
                answer: "Yes. We keep your business identifiers (customer codes, invoice numbers) intact, even when normalising other fields. The new system feels familiar from day one.",
              },
            ],
          },
        },
        {
          index: "04",
          eyebrow: "Dashboards",
          tag: "Live · Custom",
          name: "Live BI Dashboards",
          description:
            "Custom-coded dashboards built directly into your portal — KPIs, revenue, conversion, team metrics. Updating in real time, with role-based access.",
          detail: {
            slug: "dashboards",
            tagline: "Charts you actually open every morning — embedded in your portal, tailored to your KPIs, updating without anyone refreshing.",
            included: [
              "Custom dashboard pages built into your existing portal (not a separate tool)",
              "KPIs designed around your actual business metrics, not generic templates",
              "Real-time updates — most metrics refresh in under 5 seconds",
              "Role-based access — CEO sees everything, team sees their slice",
              "Drill-down from summary to row-level detail in one click",
              "Mobile-responsive so you can check the numbers from the WhatsApp queue",
            ],
            builtFor: [
              {
                title: "Founders running their business out of monthly PDFs",
                body: "Replace the month-old report with a live dashboard. Decisions stop being three weeks late.",
              },
              {
                title: "Sales managers without visibility into the pipeline",
                body: "Per-rep performance, deal velocity, conversion by stage — all live, with the ability to drill from chart to individual deal in seconds.",
              },
              {
                title: "Operations teams chasing 'how are we doing today?'",
                body: "Today's bookings, today's revenue, today's stockouts, today's blockers — visible without anyone running a query or sending a screenshot.",
              },
            ],
            slotsIn:
              "Dashboards are the output layer — they read from Database Architecture (where System Integration and Data Migration delivered the data) and live inside Customer Portals or your internal admin (Web Engineering). Pipeline Operations (DaaS) keeps the data flowing; without that, even the prettiest dashboard goes stale fast.",
            faq: [
              {
                question: "Looker Studio or custom — which should I have?",
                answer: "Looker Studio is faster to launch and free, but generic. Custom dashboards live inside your portal, match your brand, and combine data in ways Looker can't. We start with Looker for proofs of concept; we go custom when the dashboard is a core operational tool.",
              },
              {
                question: "How fast is 'real time' really?",
                answer: "Most metrics update within 1–5 seconds of the underlying event. Anything that needs aggregation across millions of rows gets a 1–5 minute refresh cycle. We tell you exactly what the latency is for every chart.",
              },
              {
                question: "Can I add new metrics later?",
                answer: "Yes — that's part of the DaaS retainer. New metric requests typically ship in days, not weeks, because the data layer is already in place.",
              },
            ],
          },
        },
        {
          index: "05",
          eyebrow: "DaaS",
          tag: "Retainer · Monthly",
          name: "Pipeline Operations",
          description:
            "We act as your outsourced data department — monitoring pipelines, adding metrics, interpreting numbers monthly. The piece that keeps the system honest.",
          detail: {
            slug: "daas-retainer",
            tagline: "Your outsourced data department — pipelines monitored, dashboards expanded, numbers interpreted, monthly.",
            included: [
              "24/7 monitoring of every data pipeline with auto-alerts on failure",
              "First-response fixes when an integration or sync breaks",
              "Monthly strategy call to interpret the numbers and pinpoint operational issues",
              "Ongoing dashboard expansion — new metrics, new views, new drill-downs",
              "Quarterly architecture review to make sure the system fits as you grow",
              "Optional automated weekly or monthly PDF reports for stakeholders",
            ],
            builtFor: [
              {
                title: "SMEs that don't need a full-time data hire",
                body: "A real data team costs RM 15k+/month. The DaaS retainer covers the same scope — monitoring, building, interpreting — at a fraction of the cost.",
              },
              {
                title: "Founders who built the system but can't stay ahead of it",
                body: "You launched the dashboard. Now you need someone to keep it accurate, add to it as the business changes, and tell you what the numbers actually mean.",
              },
              {
                title: "Companies whose dashboards quietly died after launch",
                body: "Without ongoing operations, pipelines silently break, integrations rot, and dashboards lie. The retainer is the difference between a system that works and one that used to work.",
              },
            ],
            slotsIn:
              "DaaS is the long-running heartbeat of the data pillar. It keeps System Integration alive, monitors Database Architecture for performance, and continuously evolves Live BI Dashboards as the business asks new questions. Most clients on the DaaS retainer also use Internal Copilots from the AI pillar — the copilot answers ad-hoc questions, the dashboards answer recurring ones, and the monthly call connects both to strategy.",
            faq: [
              {
                question: "What does a monthly call actually cover?",
                answer: "45 minutes. We walk through what the numbers show, highlight anything unusual, flag bottlenecks we've noticed in your operations, and capture any new dashboard requests for the next month.",
              },
              {
                question: "Can I cancel the retainer and keep the dashboards?",
                answer: "Yes. Everything we build is yours — code, database, dashboards, documentation. If you cancel, the system keeps running; you just lose the monitoring, fixes, and ongoing expansion.",
              },
              {
                question: "What's the response time when something breaks?",
                answer: "Critical breaks (data not flowing, dashboard down): under 4 hours during business days, with notification to you regardless. Non-critical (a single chart misbehaving): same business day.",
              },
            ],
          },
        },
      ],
    },
    useCases: [
      {
        index: "01",
        id: "professional-services",
        name: "Professional Services",
        metaShort: "4 surfaces · billable · onboarding · pipeline · cases",
        headline: {
          lead: "A 6-partner firm that turned a stack of timesheets into ",
          em: "live billable visibility",
          rest: " across every active client.",
        },
        body:
          "Timesheets and case files were scattered across drive folders and a legacy CRM. Now: one database, live billable-hours tracking, an onboarding pipeline visible to every partner, and unbilled revenue surfaced before month-end.",
        surfaces: [
          { index: "01", name: "Billable tracking", desc: "live" },
          { index: "02", name: "Onboarding pipeline", desc: "per client" },
          { index: "03", name: "Case status", desc: "synced" },
          { index: "04", name: "Unbilled flag", desc: "auto-detected" },
        ],
        outcome: {
          lead: "Result: ",
          em: "unbilled revenue surfaced in real time",
          rest: ", with partners seeing the full firm from one dashboard.",
        },
        photo: {
          url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
          alt: "A professional services office with people working at desks.",
        },
      },
      {
        index: "02",
        id: "ecommerce",
        name: "E-commerce",
        metaShort: "4 surfaces · abandonment · ltv · margin · inventory",
        headline: {
          lead: "A D2C brand whose checkout, ads, and inventory finally ",
          em: "spoke the same language",
          rest: " after the data layer was rebuilt.",
        },
        body:
          "Shopify, Meta Ads, and the warehouse system stopped agreeing. We pulled them all into one Postgres source, then surfaced cart abandonment, per-product margin, customer LTV, and live inventory in one ops dashboard.",
        surfaces: [
          { index: "01", name: "Cart abandonment", desc: "by funnel step" },
          { index: "02", name: "Per-product margin", desc: "live" },
          { index: "03", name: "Customer LTV", desc: "per cohort" },
          { index: "04", name: "Inventory turnover", desc: "by sku" },
        ],
        outcome: {
          lead: "Result: ",
          em: "decisions in hours, not weeks",
          rest: ", and the ad spend finally optimised against real margin.",
        },
        photo: {
          url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80",
          alt: "A skincare product photographed on a clean editorial backdrop.",
        },
      },
      {
        index: "03",
        id: "property",
        name: "Property Developers",
        metaShort: "4 surfaces · leads · velocity · payments · agents",
        headline: {
          lead: "A property developer who tracked every showroom visit back to the ",
          em: "exact ad that triggered it",
          rest: ".",
        },
        body:
          "Lead generation from Meta and Google was a black box. Now: every ad click, lead form, and showroom visit traces back through one funnel. Unit sales velocity, outstanding down payments, and agent performance all live in one place.",
        surfaces: [
          { index: "01", name: "Lead attribution", desc: "ad → visit" },
          { index: "02", name: "Sales velocity", desc: "per unit" },
          { index: "03", name: "Down payments", desc: "outstanding" },
          { index: "04", name: "Agent leaderboard", desc: "live" },
        ],
        outcome: {
          lead: "Result: ",
          em: "ad spend tied to actual unit sales",
          rest: ", with sales managers reading the funnel in real time.",
        },
        photo: {
          url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
          alt: "A modern Malaysian residential property exterior at dusk.",
        },
      },
      {
        index: "04",
        id: "manufacturing",
        name: "Manufacturing",
        metaShort: "4 surfaces · materials · projects · maintenance · supply",
        headline: {
          lead: "A fabricator whose raw-material costs ",
          em: "stopped surprising them at month-end",
          rest: " once the pipelines were live.",
        },
        body:
          "Raw-material POs, project budgets, machine maintenance, and supplier delivery dates all lived in separate sheets. We unified them — live margin per project, maintenance alerts before breakdowns, supplier-bottleneck visibility before the floor stops.",
        surfaces: [
          { index: "01", name: "Material cost vs budget", desc: "live" },
          { index: "02", name: "Project margin", desc: "per job" },
          { index: "03", name: "Maintenance schedule", desc: "auto-alert" },
          { index: "04", name: "Supplier delays", desc: "early warning" },
        ],
        outcome: {
          lead: "Result: ",
          em: "margin slippage caught in days, not months",
          rest: ", with maintenance fired before the line goes down.",
        },
        photo: {
          url: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1200&q=80",
          alt: "A manufacturing facility interior with machinery and operators.",
        },
      },
    ],
    process: {
      description:
        "Four steps from audit to a live dashboard. The audit is free. The data map is yours to keep, and credited to the build if we proceed.",
      termValue: "4–8 weeks",
      steps: [
        {
          index: "01",
          name: "Data audit",
          sub: "We catalog every tool you're running and map where data actually lives today.",
          term: "1 week",
          fee: "Free",
          feeIsAccent: true,
        },
        {
          index: "02",
          name: "Architecture & migration",
          sub: "Database schema designed, legacy data cleaned, pipelines built and tested.",
          term: "2–4 weeks",
          fee: "— quoted —",
          feeIsAccent: false,
        },
        {
          index: "03",
          name: "Dashboard build",
          sub: "Custom dashboards shipped into your portal with role-based access from day one.",
          term: "1–3 weeks",
          fee: "— quoted —",
          feeIsAccent: false,
        },
        {
          index: "04",
          name: "DaaS handover + retainer",
          sub: "Monitoring live. Monthly interpretation calls scheduled. Dashboard expansion as you grow.",
          term: "Ongoing",
          fee: "Included",
          feeIsAccent: false,
        },
      ],
    },
    comparison: {
      eyebrowLabel: "Why custom data",
      headline: {
        lead: "Why we'd rather build it than ",
        em: "bolt on a tool",
        rest: ".",
      },
      rightCaption: {
        lead: "Generic dashboards in a box — or ",
        em: "built around your business",
        rest: ".",
      },
      columns: [
        { label: "Google Looker Studio" },
        { label: "Off-the-shelf SaaS BI" },
        { label: "Aurexis Data Layer", isAccent: true },
      ],
      rows: [
        {
          topic: "Pulls from your real systems",
          values: ["Limited connectors", "Plugin-dependent", "Any source, native"],
        },
        {
          topic: "Custom metrics for your business",
          values: ["Generic only", "Vendor templates", "Designed to your KPIs"],
        },
        {
          topic: "Lives in your portal",
          values: ["External tool", "External tool", "Embedded in your app"],
        },
        {
          topic: "Owns the data",
          values: ["Google does", "Vendor does", "You do"],
        },
        {
          topic: "Ongoing interpretation",
          values: ["DIY", "DIY", "Monthly strategy call"],
        },
      ],
      verdict: [
        "Fast to deploy, generic.",
        "Templated, vendor-locked.",
        { lead: "Built around ", em: "your business", rest: "." },
      ],
    },
    faq: {
      headline: "Four honest answers.",
      items: [
        {
          index: "01",
          question: "How is my business data kept secure?",
          answer: [
            "Your data lives in ",
            { em: "your own database" },
            ", isolated and encrypted at rest. We follow row-level security best practices, sign DPAs, and stay ",
            { em: "PDPA-compliant by design" },
            ".",
          ],
        },
        {
          index: "02",
          question: "What if my data is currently a mess of Excel files?",
          answer: [
            "That's the ",
            { em: "normal starting point" },
            ". Data cleaning and migration are part of the build — we take your legacy files, normalise the formats, and import them cleanly into the new database.",
          ],
        },
        {
          index: "03",
          question: "How long until I see my first live dashboard?",
          answer: [
            "Infrastructure + first dashboard usually lands in ",
            { em: "3–5 weeks" },
            " depending on how many sources we're connecting. Subsequent expansions take days, not weeks.",
          ],
        },
        {
          index: "04",
          question: "What does the DaaS retainer actually cover?",
          answer: [
            "Pipeline monitoring, a ",
            { em: "monthly strategy call" },
            " where we interpret the numbers with you, and ongoing dashboard expansion as the business evolves. The piece that keeps the system honest.",
          ],
        },
      ],
    },
    closingCTA: {
      headline: {
        lead: "See what running your business from one ",
        em: "live dashboard",
        rest: " actually feels like.",
      },
      subhead:
        "We'll walk through a real client dashboard end-to-end. Real numbers, real pipelines, no demo data.",
      primary: { label: "Book a Walkthrough", href: "/contact#brief" },
      whatsappLabel: "WhatsApp us about a data build",
      related: [
        { label: "The Ecosystem", href: "/services/ecosystem" },
        { label: "AI Workflows", href: "/services/ai-automation" },
        { label: "Web Platforms", href: "/services/web-engineering" },
      ],
    },
  },
};
