"use client";

import { useMemo, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BlogHero } from "@/components/sections/blog/BlogHero";
import { BlogFeatured } from "@/components/sections/blog/BlogFeatured";
import {
  BlogFilter,
  type BlogFilterValue,
} from "@/components/sections/blog/BlogFilter";
import { BlogGrid } from "@/components/sections/blog/BlogGrid";
import { BlogNewsletter } from "@/components/sections/blog/BlogNewsletter";
import { blogArticles } from "@/data/blog-articles";

export default function BlogPage() {
  const [active, setActive] = useState<BlogFilterValue>("All");

  const featured = useMemo(
    () =>
      blogArticles.find((a) => a.featured) ?? blogArticles[0] ?? null,
    []
  );

  const rest = useMemo(
    () =>
      featured
        ? blogArticles.filter((a) => a.slug !== featured.slug)
        : [],
    [featured]
  );

  const visible = useMemo(
    () =>
      active === "All" ? rest : rest.filter((a) => a.category === active),
    [active, rest]
  );

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Navbar />
      <main className="flex-1">
        <BlogHero entryCount={blogArticles.length} />
        {featured && <BlogFeatured article={featured} />}
        <BlogFilter active={active} onChange={setActive} />
        <BlogGrid articles={visible} />
        <BlogNewsletter />
      </main>
      <Footer />
    </div>
  );
}
