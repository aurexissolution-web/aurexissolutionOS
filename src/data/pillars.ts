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

export type PillarSlug = "ai-automation" | "web-engineering" | "mobile-ecosystems";

export type PillarAccent = {
  /** Hex string, e.g. "#8B5CF6" */
  hex: string;
  /** Short slug, used in CSS class names */
  name: "violet" | "blue" | "emerald";
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
        },
        {
          index: "02",
          eyebrow: "Copilots",
          tag: "Internal",
          name: "Internal Copilots",
          description:
            "Your team asks questions in plain English; gets instant answers from your knowledge base, files, and CRM.",
        },
        {
          index: "03",
          eyebrow: "Agents",
          tag: "Routine",
          name: "Automation Agents",
          description:
            "Repetitive admin handled quietly: data entry, follow-ups, status checks, scheduling — work an AI could own.",
        },
        {
          index: "04",
          eyebrow: "Generators",
          tag: "Docs",
          name: "Quote Generators",
          description:
            "Templated outputs from a few inputs. Quotes, contracts, proposals, reports — produced in seconds.",
        },
        {
          index: "05",
          eyebrow: "Compliance",
          tag: "LHDN · PDPA · SST",
          name: "Compliance Automations",
          description:
            "LHDN e-invoicing, PDPA logging, SST reporting — kept current as the regulations move. The piece nobody else wants to maintain.",
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
        },
        {
          index: "02",
          eyebrow: "Commerce",
          tag: "Stores",
          name: "E-commerce",
          description:
            "Custom or Shopify-fluent — your call. Built for the way Malaysian buyers actually pay and check out.",
        },
        {
          index: "03",
          eyebrow: "Portals",
          tag: "Login",
          name: "Customer Portals",
          description:
            "Login, dashboard, self-service. Where your customers manage what they bought after the sale.",
        },
        {
          index: "04",
          eyebrow: "Leads",
          tag: "Campaigns",
          name: "Lead Pages",
          description:
            "For ad campaigns, calculators, lead magnets. Fast, focused, instrumented.",
        },
        {
          index: "05",
          eyebrow: "Booking",
          tag: "Calendar · Pay · Wired",
          name: "Booking & Intake",
          description:
            "Replace your form-on-WordPress with a real system. Calendars, payments, follow-ups — wired to the rest of your stack.",
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
        },
        {
          index: "02",
          eyebrow: "Customer",
          tag: "Loyalty",
          name: "Customer Apps",
          description:
            "Loyalty, ordering, account management. Built to make repeat business effortless.",
        },
        {
          index: "03",
          eyebrow: "Hybrid",
          tag: "Web + App",
          name: "Hybrid Platforms",
          description:
            "Web + app sharing one backend. Same data, same flows, surfaced for the device that fits.",
        },
        {
          index: "04",
          eyebrow: "Push",
          tag: "WhatsApp",
          name: "Push & Re-engage",
          description:
            "Push notifications and WhatsApp re-engagement, built in. Messages that hit at the right moment, on the channel customers already use.",
        },
        {
          index: "05",
          eyebrow: "Offline",
          tag: "Field · Low-connect",
          name: "Offline-first",
          description:
            "For field work and low-connectivity environments. Syncs cleanly when the network comes back. Works in the basement, in the warehouse, on the boat.",
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
};
