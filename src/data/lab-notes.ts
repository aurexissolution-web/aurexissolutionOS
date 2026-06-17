import type { LabPillar } from "./lab-explorations";

export type LabNote = {
  slug: string;
  date: string;
  when: string;
  pillar: LabPillar;
  title: string;
  excerpt: string;
  readTime: string;
  href: string;
};

// Add lab notes here as they're written. Empty until the first one is published.
export const LAB_NOTES: LabNote[] = [];
