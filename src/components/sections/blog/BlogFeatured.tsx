import Image from "next/image";
import {
  type BlogArticle,
  formatDate,
} from "@/data/blog-articles";

export function BlogFeatured({ article }: { article: BlogArticle }) {
  const { title, italicCyanWord } = article;
  const before =
    italicCyanWord && title.includes(italicCyanWord)
      ? title.slice(0, title.indexOf(italicCyanWord))
      : title;
  const after = italicCyanWord
    ? title.slice(title.indexOf(italicCyanWord) + italicCyanWord.length)
    : "";

  return (
    <section className="border-y border-white/[0.18] bg-[#020308]">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-16 lg:py-24">
        <div className="flex items-center gap-3 mb-8">
          <span
            className="text-[var(--color-electric-cyan)] text-[14px]"
            style={{ textShadow: "0 0 8px rgba(0,240,255,0.5)" }}
            aria-hidden
          >
            ★
          </span>
          <div className="font-mono text-[10.5px] uppercase tracking-[0.32em] text-[var(--color-electric-cyan)]">
            Latest · {article.category}
          </div>
          <span className="h-px flex-1 bg-white/[0.10]" />
          <div className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-white/40">
            The Cover Story
          </div>
        </div>

        <div className="grid lg:grid-cols-[0.92fr_1.08fr] gap-12 items-end">
          {/* image with overlaid numeral */}
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              {article.coverImage ? (
                <Image
                  src={article.coverImage}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 540px, 100vw"
                  className="object-cover"
                  style={{
                    filter: "contrast(1.06) saturate(1.04) brightness(0.97)",
                  }}
                />
              ) : (
                <TypographicCover title={article.title} />
              )}
              {/* gentle bottom darken so the floating numeral reads cleanly */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.55) 100%)",
                }}
              />
              {/* hairline frame */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none border border-white/[0.10]"
              />
            </div>

            {/* floating cover numeral — confident solid-white italic serif */}
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-3 left-2 lg:-bottom-6 lg:left-3"
              style={{
                fontFamily: "var(--font-instrument-serif), serif",
                fontStyle: "italic",
                fontSize: "clamp(140px, 19vw, 280px)",
                lineHeight: 0.85,
                color: "#FFFFFF",
                textShadow:
                  "0 6px 36px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.45)",
              }}
            >
              01
            </div>
          </div>

          {/* text */}
          <div className="lg:pl-4 lg:pb-10">
            <h2 className="font-serif italic font-normal leading-[0.95] tracking-[-0.025em] text-white text-[clamp(38px,5vw,72px)] mb-8">
              {before}
              {italicCyanWord && (
                <span
                  style={{
                    fontStyle: "italic",
                    backgroundImage:
                      "linear-gradient(120deg, #00F0FF, #FFFFFF 75%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {italicCyanWord}
                </span>
              )}
              {after}
            </h2>

            <p className="font-serif italic text-[clamp(17px,1.4vw,21px)] leading-[1.55] text-[#C8CDD7] max-w-[560px] mb-10">
              {article.excerpt}
            </p>

            <div className="border-t border-white/[0.10] pt-5 flex flex-wrap items-baseline gap-x-6 gap-y-2 mb-8">
              <div className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-white/85">
                By{" "}
                <span className="text-white">
                  {article.author.name}
                </span>
              </div>
              <div className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-white/40">
                {article.author.role}
              </div>
              <div className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-white/55 ml-auto">
                {article.readMinutes} min · {formatDate(article.publishedAt)}
              </div>
            </div>

            <a
              href={`/blog/${article.slug}`}
              className="group inline-flex items-baseline gap-3 font-serif italic text-[22px] text-white border-b border-white/[0.30] pb-1 transition-all duration-300 hover:border-[var(--color-electric-cyan)] hover:text-[var(--color-electric-cyan)]"
            >
              <span>Read article</span>
              <span
                aria-hidden
                className="font-sans not-italic text-[16px] transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[1px]"
              >
                ↗
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function TypographicCover({ title }: { title: string }) {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F18] to-[#04060B] flex items-end p-6">
      <div className="font-serif italic text-white/85 leading-[0.9] tracking-[-0.03em] text-[clamp(34px,4.4vw,64px)]">
        {title}
      </div>
    </div>
  );
}
