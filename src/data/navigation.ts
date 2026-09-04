// src/data/navigation.ts
// Centralised primary navigation data — shared by desktop mega menu and
// mobile accordion so content never has to be duplicated by hand.
import { CHANNELS } from "@/data/contact-config";

export type SolutionNavItem = {
  stage: string;
  title: string;
  description: string;
  href: string;
  analyticsId: string;
};

export const SOLUTIONS_ITEMS: ReadonlyArray<SolutionNavItem> = [
  {
    stage: "01",
    title: "Business Systems Assessment™",
    description:
      "Find operational friction and leave with a clear improvement roadmap.",
    href: "/solutions/business-systems-assessment",
    analyticsId: "business_systems_assessment",
  },
  {
    stage: "02",
    title: "Focused Improvement Project",
    description: "Fix one high-impact process without rebuilding everything.",
    href: "/solutions/focused-improvement",
    analyticsId: "focused_improvement",
  },
  {
    stage: "03",
    title: "Business Control System™",
    description:
      "Bring workflows, information and reporting into one connected system.",
    href: "/solutions/business-control-system",
    analyticsId: "business_control_system",
  },
  {
    stage: "04",
    title: "Managed Operations™",
    description: "Keep your systems supported, monitored and improving.",
    href: "/solutions/managed-operations",
    analyticsId: "managed_operations",
  },
];

export type SolutionsFooterLink = {
  label: string;
  href: string;
  analyticsId: "solutions_view_all_click" | "ecosystem_crosslink_click";
};

export const SOLUTIONS_FOOTER_LINKS: ReadonlyArray<SolutionsFooterLink> = [
  {
    label: "Explore All Solutions",
    href: "/solutions",
    analyticsId: "solutions_view_all_click",
  },
  {
    label: "Explore the Tech Ecosystem",
    href: "/tech-ecosystem",
    analyticsId: "ecosystem_crosslink_click",
  },
];

export const SOLUTIONS_DISCOVERY_PANEL = {
  eyebrow: "NOT SURE WHERE TO BEGIN?",
  body: "Tell us what is slowing the business down. We'll confirm whether Aurexis is the right fit and recommend the most sensible next step.",
  buttonLabel: "Book a Discovery Call",
  buttonHref: CHANNELS.bookingUrl,
  supportingText: "Qualification conversation—not a free consulting session.",
} as const;

export type TechEcosystemItem = {
  stage: string;
  title: string;
  description: string;
  microcopy: string;
  href: string;
  analyticsId: string;
};

export const TECH_ECOSYSTEM_ITEMS: ReadonlyArray<TechEcosystemItem> = [
  {
    stage: "01",
    title: "Presence",
    description: "Digital experiences where customers meet the business.",
    microcopy: "Where customers meet the business.",
    href: "/tech-ecosystem#presence",
    analyticsId: "ecosystem_presence",
  },
  {
    stage: "02",
    title: "Flow",
    description: "Workflows and automation that keep work moving.",
    microcopy: "How work moves.",
    href: "/tech-ecosystem#flow",
    analyticsId: "ecosystem_flow",
  },
  {
    stage: "03",
    title: "Core",
    description: "Operational systems where the business comes together.",
    microcopy: "Where operations come together.",
    href: "/tech-ecosystem#core",
    analyticsId: "ecosystem_core",
  },
  {
    stage: "04",
    title: "Connect",
    description: "Integrations that let systems work together.",
    microcopy: "How systems communicate.",
    href: "/tech-ecosystem#connect",
    analyticsId: "ecosystem_connect",
  },
  {
    stage: "05",
    title: "Data Foundation™",
    description: "Reliable, structured information beneath the operation.",
    microcopy: "What reliable operations are built on.",
    href: "/tech-ecosystem#data-foundation",
    analyticsId: "ecosystem_data_foundation",
  },
  {
    stage: "06",
    title: "Intelligence",
    description: "AI, analytics and intelligent capabilities where they create value.",
    microcopy: "Where information becomes insight.",
    href: "/tech-ecosystem#intelligence",
    analyticsId: "ecosystem_intelligence",
  },
];

export const TECH_ECOSYSTEM_OVERVIEW = {
  eyebrow: "TECH ECOSYSTEM",
  body: "Six connected capabilities. Combined around what the business actually needs.",
  footerText:
    "Built to work together — selected according to the business, not sold as a fixed bundle.",
  buttonLabel: "Explore the Tech Ecosystem",
  buttonHref: "/tech-ecosystem",
} as const;

export type PrimaryNavLink =
  | { label: string; href: string; type?: undefined }
  | { label: "Solutions"; type: "solutions-dropdown" }
  | { label: "Tech Ecosystem"; type: "ecosystem-dropdown" };

export const PRIMARY_NAV_LINKS: ReadonlyArray<PrimaryNavLink> = [
  { label: "Home", href: "/" },
  { label: "Solutions", type: "solutions-dropdown" },
  { label: "Tech Ecosystem", type: "ecosystem-dropdown" },
  { label: "How We Work", href: "/how-we-work" },
  { label: "Case Studies", href: "/portfolio" },
  { label: "Insights", href: "/blog" },
  { label: "About", href: "/about" },
];
