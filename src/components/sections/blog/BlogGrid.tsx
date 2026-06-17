import Link from "next/link";
import {
  type BlogArticle,
  formatDate,
} from "@/data/blog-articles";

export function BlogGrid({ articles }: { articles: BlogArticle[] }) {
  if (articles.length === 0) {
    return (
      <div className="mx-auto max-w-[1180px] px-6 lg:px-10 py-24 text-center">
        <div className="font-mono text-[11px] uppercase tracking-[0.32em] text-white/40 mb-4">
          ── Going to press ──
        </div>
        <p className="font-serif italic text-[clamp(22px,2vw,30px)] leading-[1.35] text-white/75 max-w-[560px] mx-auto">
          Nothing filed here yet.
          <br />
          The first issue is mailing shortly.
        </p>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-[1180px] px-6 lg:px-10 py-20 lg:py-28">
      <div className="font-mono text-[10.5px] uppercase tracking-[0.32em] text-white/40 mb-10">
        Table of Contents · {String(articles.length).padStart(2, "0")} entries
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
        {articles.map((a, i) => (
          <ArticleCard key={a.slug} article={a} index={i + 2} />
        ))}
      </div>
    </section>
  );
}

function ArticleCard({
  article,
  index,
}: {
  article: BlogArticle;
  index: number;
}) {
  const { title, italicCyanWord } = article;
  const before =
    italicCyanWord && title.includes(italicCyanWord)
      ? title.slice(0, title.indexOf(italicCyanWord))
      : title;
  const after = italicCyanWord
    ? title.slice(title.indexOf(italicCyanWord) + italicCyanWord.length)
    : "";
  const num = String(index).padStart(2, "0");

  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group flex flex-col h-full pb-7 border-b border-white/[0.12] transition-all duration-300 hover:border-white/[0.32]"
    >
      {/* number + category */}
      <div className="flex items-baseline justify-between mb-5">
        <span className="font-serif italic text-[44px] leading-none text-white/30 tracking-[-0.02em] transition-colors duration-300 group-hover:text-white/85">
          {num}
        </span>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-[var(--color-electric-cyan)]/85">
          {article.category}
        </span>
      </div>

      <h3 className="font-serif italic font-normal leading-[1.05] tracking-[-0.02em] text-white text-[clamp(22px,1.7vw,28px)] mb-4">
        {before}
        {italicCyanWord && (
          <span
            style={{
              fontStyle: "italic",
              backgroundImage: "linear-gradient(120deg, #00F0FF, #FFFFFF 80%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {italicCyanWord}
          </span>
        )}
        {after}
      </h3>

      <p
        className="font-serif italic text-[15.5px] leading-[1.55] text-[#A4ABB8] mb-6"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {article.excerpt}
      </p>

      <div className="mt-auto flex items-baseline justify-between gap-3 font-mono text-[10.5px] uppercase tracking-[0.20em] text-white/55">
        <span>By {article.author.name}</span>
        <span className="text-white/35">
          {article.readMinutes} min · {formatDate(article.publishedAt)}
        </span>
      </div>
    </Link>
  );
}
