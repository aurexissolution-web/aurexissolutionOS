export const BLOG_CATEGORIES = [
  "AI For Business",
  "AI Chatbots",
  "Web Engineering",
  "Applications",
  "The Ecosystem",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export type BlogArticle = {
  slug: string;
  title: string;
  italicCyanWord?: string;
  excerpt: string;
  category: BlogCategory;
  author: { name: string; role: string };
  readMinutes: number;
  publishedAt: string;
  coverImage?: string;
  featured?: boolean;
};

export const blogArticles: BlogArticle[] = [];

export function categoryCounts(articles: BlogArticle[] = blogArticles) {
  const counts: Record<BlogCategory | "All", number> = {
    All: articles.length,
    "AI For Business": 0,
    "AI Chatbots": 0,
    "Web Engineering": 0,
    Applications: 0,
    "The Ecosystem": 0,
  };
  for (const a of articles) counts[a.category]++;
  return counts;
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function shortDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
}
