import { supabaseAdmin } from "@/lib/supabase/server";
import type { LabExploration, LabPillar } from "@/data/lab-explorations";
import type { LabNote } from "@/data/lab-notes";
import type { BlogPost } from "@/types/portal";

interface ExplorationRow {
  id: string;
  slug: string;
  pillar: LabPillar;
  type: LabExploration["type"];
  status_tone: "live" | "build";
  status_label: string;
  hook: string;
  title: string;
  description: string;
  thumbnail: string | null;
  outcome: string;
  primary_cta_label: string;
  primary_cta_href: string;
  secondary_cta_label: string | null;
  secondary_cta_href: string | null;
  note_title: string | null;
  note_href: string | null;
  is_featured: boolean;
  display_order: number;
}

function rowToExploration(r: ExplorationRow): LabExploration {
  return {
    slug: r.slug,
    pillar: r.pillar,
    type: r.type,
    status: { tone: r.status_tone, label: r.status_label },
    hook: r.hook,
    title: r.title,
    description: r.description,
    thumbnail: r.thumbnail ?? "",
    outcome: r.outcome,
    primaryCta: { label: r.primary_cta_label, href: r.primary_cta_href },
    secondaryCta:
      r.secondary_cta_label && r.secondary_cta_href
        ? { label: r.secondary_cta_label, href: r.secondary_cta_href }
        : undefined,
    note:
      r.note_title && r.note_href
        ? { title: r.note_title, href: r.note_href }
        : undefined,
    isFeatured: r.is_featured,
  };
}

export interface LabPageData {
  featured: LabExploration | null;
  explorations: LabExploration[];
  notes: LabNote[];
}

const PILLAR_KEYS: LabPillar[] = ["ecosystem", "ai", "web", "app"];

function formatNoteDate(iso: string): string {
  const d = new Date(iso);
  return d
    .toLocaleDateString("en-US", { month: "short", day: "2-digit" })
    .toUpperCase();
}

function formatNoteWhen(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function postToLabNote(post: BlogPost): LabNote {
  const pillar =
    (post.tags?.find((t) => PILLAR_KEYS.includes(t as LabPillar)) as
      | LabPillar
      | undefined) ?? "ai";
  const wordCount = post.content ? post.content.split(/\s+/).length : 0;
  const readMinutes = Math.max(1, Math.round(wordCount / 220));
  return {
    slug: post.slug,
    date: formatNoteDate(post.created_at),
    when: formatNoteWhen(post.created_at),
    pillar,
    title: post.title,
    excerpt: post.excerpt,
    readTime: `${readMinutes} min`,
    href: `/blog/${post.slug}`,
  };
}

export async function fetchLabPageData(): Promise<LabPageData> {
  const [explorationsRes, notesRes] = await Promise.all([
    supabaseAdmin
      .from("lab_explorations")
      .select("*")
      .order("is_featured", { ascending: false })
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false }),
    supabaseAdmin
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .contains("tags", ["lab"])
      .order("created_at", { ascending: false })
      .limit(8),
  ]);

  const rows = (explorationsRes.data ?? []) as ExplorationRow[];
  const all = rows.map(rowToExploration);
  const featured = all.find((e) => e.isFeatured) ?? null;
  const explorations = featured ? all.filter((e) => e.slug !== featured.slug) : all;

  const notes = ((notesRes.data ?? []) as BlogPost[]).map(postToLabNote);

  return { featured, explorations, notes };
}

// ── Admin mutations (client-side via supabase browser client) ──
// Kept in a separate file because supabaseAdmin is server-only.
