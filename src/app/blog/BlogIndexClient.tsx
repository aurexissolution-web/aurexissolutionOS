"use client";

import { useMemo, useState } from "react";
import { BlogHero } from "@/components/sections/blog/BlogHero";
import { BlogFeatured } from "@/components/sections/blog/BlogFeatured";
import {
  BlogFilter,
  type BlogFilterValue,
} from "@/components/sections/blog/BlogFilter";
import { BlogGrid } from "@/components/sections/blog/BlogGrid";
import { BlogNewsletter } from "@/components/sections/blog/BlogNewsletter";
import type { BlogArticle } from "@/data/blog-articles";

interface BlogIndexClientProps {
  articles: BlogArticle[];
}

export function BlogIndexClient({ articles }: BlogIndexClientProps) {
  const [active, setActive] = useState<BlogFilterValue>("All");

  const featured = useMemo(
    () => articles.find((a) => a.featured) ?? articles[0] ?? null,
    [articles],
  );

  const rest = useMemo(
    () => (featured ? articles.filter((a) => a.slug !== featured.slug) : []),
    [articles, featured],
  );

  const visible = useMemo(
    () => (active === "All" ? rest : rest.filter((a) => a.category === active)),
    [active, rest],
  );

  return (
    <>
      <BlogHero entryCount={articles.length} />
      {featured && <BlogFeatured article={featured} />}
      <BlogFilter active={active} onChange={setActive} />
      <BlogGrid articles={visible} />
      <BlogNewsletter />
    </>
  );
}
