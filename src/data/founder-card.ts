// src/data/founder-card.ts
// Central, typed content configuration for the /sanjay digital founder card.
// Shared phone / WhatsApp facts are reused from contact-config.ts. Sanjay's
// dedicated email remains scoped to this card.
import { CHANNELS, FOUNDERS } from "@/data/contact-config";

const sanjay = FOUNDERS.find((f) => f.initials === "SG");

/** Canonical production origin (non-www). One host used for EVERY absolute URL:
 * metadata, JSON-LD, QR target, vCard, and sharing — so they never diverge. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://aurexissolution.com"
).replace(/\/+$/, "");

const CARD_PATH = "/sanjay";

/** Whether this deployment is the confirmed production host (drives robots). */
export const IS_PRODUCTION = process.env.VERCEL_ENV === "production";

const COMPANY_LINKEDIN = "https://www.linkedin.com/company/aurexissolution/";
const PERSONAL_LINKEDIN = (process.env.NEXT_PUBLIC_FOUNDER_LINKEDIN_URL || "").trim();

export const WHATSAPP_MESSAGE =
  "Hi Sanjay, I found your Aurexis digital card and would like to discuss a business systems requirement.";

export const founderCard = {
  // ── Identity ──────────────────────────────────────────────
  name: "Sanjay Gunabalan",
  firstName: "Sanjay",
  lastName: "Gunabalan",
  title: "Founder & CEO",
  company: "Aurexis Solution",
  initials: sanjay?.initials ?? "SG",
  portrait: sanjay?.imageSrc ?? null, // "/images/cto.jpg"
  publicLocation: "Malaysia",
  serviceMarket: "Malaysia and Singapore",
  locationLine: "Malaysia · Serving Malaysia & Singapore",

  // ── Positioning & trust principles (used in metadata/JSON-LD) ─
  positioning:
    "Turning scattered operations into connected, visible and manageable business systems.",
  ownershipPrinciple: "Clients own their systems, accounts and data.",
  aiPrinciple: "Clients own their AI. Aurexis enables it.",

  // ── Contact ───────────────────────────────────────────────
  email: "ceo.sanjay@aurexissolution.com",
  phoneDisplay: "+60 16-407 1129",
  phoneLink: CHANNELS.phone, // "+60164071129" (tel: value)
  whatsappUrl: `${CHANNELS.whatsappUrl}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
  whatsappMessage: WHATSAPP_MESSAGE,

  // ── Links (empty => hide the action) ──────────────────────
  website: SITE_URL,
  websiteDisplay: SITE_URL.replace(/^https?:\/\//, ""),
  linkedin: PERSONAL_LINKEDIN || COMPANY_LINKEDIN,
  /** true only when Sanjay's personal profile is configured; controls the label. */
  linkedinIsPersonal: Boolean(PERSONAL_LINKEDIN),
  instagramUrl: "https://www.instagram.com/aurexissolution",
  instagramDisplay: "@aurexissolution",
  bookingUrl:
    (process.env.NEXT_PUBLIC_FOUNDER_BOOKING_URL || "").trim() ||
    "https://cal.com/aurexis-solution/discoverycall",
  checklistUrl: (process.env.NEXT_PUBLIC_CHECKLIST_URL || "").trim(), // empty => section hidden
  privacyUrl: "/privacy-policy",

  // ── URLs ──────────────────────────────────────────────────
  cardPath: CARD_PATH,
  cardUrl: `${SITE_URL}${CARD_PATH}`,

  // ── Confirmed-only (omit until supplied) ──────────────────
  companyRegistrationNumber: "",

  // ── vCard + sharing copy ──────────────────────────────────
  vcardFileName: "sanjay-gunabalan-aurexis.vcf",
  vcardNote:
    "Founder & CEO of Aurexis Solution. Helping growing businesses turn scattered operations into connected, visible and manageable business systems.",
  shareTitle: "Sanjay Gunabalan | Founder & CEO, Aurexis Solution",
  shareText:
    "Connect with Sanjay Gunabalan, Founder & CEO of Aurexis Solution — helping growing businesses turn scattered operations into connected, visible and manageable business systems.",
} as const;

export type FounderCard = typeof founderCard;

// ── Content blocks (data-driven rendering) ──────────────────

/** Three concise capabilities. No ™/® — plain names, short descriptions. */
export const CAPABILITIES: ReadonlyArray<{ name: string; body: string }> = [
  {
    name: "Business Systems Assessment",
    body: "Find gaps across workflows, tools, data and reporting.",
  },
  {
    name: "Workflow Improvement",
    body: "Simplify repetitive processes and connect disconnected work.",
  },
  {
    name: "Managed Operations",
    body: "Monitor, optimise and improve the system after launch.",
  },
];
