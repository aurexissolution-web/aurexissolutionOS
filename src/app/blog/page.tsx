// src/app/blog/page.tsx
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { supabaseAdmin } from "@/lib/supabase/server";
import { BlogIndexClient } from "./BlogIndexClient";
import {
  BLOG_CATEGORIES,
  type BlogArticle,
  type BlogCategory,
} from "@/data/blog-articles";
import type { BlogPost } from "@/types/portal";

// Render on every request so admin edits show up immediately.
// Supabase env vars aren't available during `next build` for prerender.
export const dynamic = "force-dynamic";

function toArticle(post: BlogPost): BlogArticle {
  const matchedCategory = post.tags?.find((t) =>
    (BLOG_CATEGORIES as readonly string[]).includes(t),
  ) as BlogCategory | undefined;

  const wordCount = post.content ? post.content.split(/\s+/).length : 0;
  const readMinutes = Math.max(1, Math.round(wordCount / 220));

  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: matchedCategory ?? "AI For Business",
    author: {
      name: post.author || "Aurexis Architect",
      role: "Aurexis Solution",
    },
    readMinutes,
    publishedAt: post.created_at,
    coverImage: post.cover_image ?? undefined,
    featured: post.tags?.includes("featured") ?? false,
  };
}

export default async function BlogPage() {
  let articles: BlogArticle[] = [];

  try {
    const { data } = await supabaseAdmin
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    articles = (data ?? []).map((row) => toArticle(row as BlogPost));
  } catch (err) {
    console.error(
      "[blog] failed to load posts — check Supabase env vars + RLS:",
      err,
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Navbar />
      <main className="flex-1">
        <BlogIndexClient articles={articles} />
      </main>
      <Footer />
    </div>
  );
}
