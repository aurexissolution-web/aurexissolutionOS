export type ServiceVisual = "topology" | "workshop" | "gauge" | "phone";
export type ServiceAccent = "#F59E0B" | "#00F0FF" | "#8B5CF6" | "#10B981";

export type ServiceHubEntry = {
  id: "ecosystem" | "ai-automation" | "web-engineering" | "mobile-ecosystems";
  act: "I" | "II" | "III" | "IV";
  index: "01" | "02" | "03" | "04";
  label: string;
  title: string;
  /** Optional substring of `title` that should render in the accent gradient (e.g. "AI" in "AI Automation."). */
  titleColored?: string;
  what: string;
  pull: string;
  desc: string;
  /**
   * 2-3 stat tiles shown under the body copy. `count` (when present) animates from 0 on scroll-into-view.
   * `value` is what gets rendered (suffix + prefix included).
   */
  stats: { value: string; label: string; count?: number; suffix?: string }[];
  accent: ServiceAccent;
  visual: ServiceVisual;
  /** Side the visual sits on at desktop widths. Acts I & III: right. Acts II & IV: left. */
  visualSide: "left" | "right";
};

export const servicesHub: ServiceHubEntry[] = [
  {
    id: "ecosystem",
    act: "I",
    index: "01",
    label: "Full Stack",
    title: "Ecosystem.",
    what: "Web, mobile, and AI engineered as one organism.",
    pull: "Web, mobile, and AI engineered as one organism — shared data, shared design, one team.",
    desc:
      "Most agencies hand you three vendors and call it a stack. We architect Web, Mobile, and AI Automation as a single intelligent system — the kind that compounds, not competes.",
    stats: [
      { value: "3 → 1", label: "Vendors collapsed" },
      { value: "1 SoT", label: "Source of truth" },
      { value: "1 team", label: "Accountable" },
    ],
    accent: "#F59E0B",
    visual: "topology",
    visualSide: "right",
  },
  {
    id: "ai-automation",
    act: "II",
    index: "02",
    label: "AI & LLM",
    title: "AI Automation.",
    titleColored: "AI",
    what: "Replace headcount with intelligent systems.",
    pull:
      "Custom LLMs, RAG pipelines, and autonomous workflow agents — engineered to replace repetitive ops, not just speed them up.",
    desc:
      "Off-the-shelf chatbots speed up a broken process. We re-engineer the process. Fine-tuned agents that hold context, retrieval pipelines anchored to your real source-of-truth, autonomous decisions where they earn the right.",
    stats: [
      { value: "0+", label: "Hours / wk reclaimed", count: 50, suffix: "+" },
      { value: "0", label: "Agents shipped", count: 32, suffix: "" },
    ],
    accent: "#00F0FF",
    visual: "workshop",
    visualSide: "left",
  },
  {
    id: "web-engineering",
    act: "III",
    index: "03",
    label: "Web & SEO",
    title: "Web Engineering.",
    titleColored: "Engineering.",
    what: "Performance is a feature, not an afterthought.",
    pull:
      "Ultra-fast, meticulously designed digital platforms — built for SEO dominance and conversion, not for the design awards reel.",
    desc:
      "Every interaction is a performance budget decision. Sub-1.5s global load times because we engineered the entire pipeline. Lighthouse 99+ as the floor, not the ceiling.",
    stats: [
      { value: "0+", label: "Lighthouse", count: 99, suffix: "+" },
      { value: "0.92s", label: "Avg LCP" },
      { value: "0", label: "Sites shipped", count: 47, suffix: "" },
    ],
    accent: "#8B5CF6",
    visual: "gauge",
    visualSide: "right",
  },
  {
    id: "mobile-ecosystems",
    act: "IV",
    index: "04",
    label: "Mobile & App",
    title: "Mobile Ecosystems.",
    titleColored: "Ecosystems.",
    what: "Native performance. Zero compromise.",
    pull:
      "Seamless iOS and Android experiences built with React Native — designed to scale from zero to a hundred thousand users without friction.",
    desc:
      "A single codebase shouldn't mean a single compromise. 60fps because the architecture demanded it. Offline-first because users don't have signal in the elevator.",
    stats: [
      { value: "60 fps", label: "Native baseline" },
      { value: "0k", label: "User scale tested", count: 100, suffix: "k" },
    ],
    accent: "#10B981",
    visual: "phone",
    visualSide: "left",
  },
];
