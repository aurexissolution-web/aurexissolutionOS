import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase/server";
import type { PortfolioItem } from "@/types/portal";

const SERIF = "var(--font-instrument-serif), ui-serif, Georgia, serif";
const MONO = "var(--font-geist-mono), ui-monospace, monospace";
const SANS = "var(--font-plus-jakarta), system-ui, sans-serif";

async function fetchTeaserItems(): Promise<PortfolioItem[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from("portfolio_items")
      .select("*")
      .order("featured", { ascending: false, nullsFirst: false })
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false })
      .limit(3);
    if (error) {
      console.error("[portfolio-teaser] fetch error:", error);
      return [];
    }
    return (data ?? []) as PortfolioItem[];
  } catch (err) {
    console.error("[portfolio-teaser] fetch threw:", err);
    return [];
  }
}

export async function PortfolioTeaser() {
  const items = await fetchTeaserItems();
  if (items.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-[var(--color-background)] py-16 md:py-20">
      <div className="relative mx-auto flex max-w-[1200px] flex-col gap-10 px-6">
        {/* Header — title left, archive button right */}
        <header className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <div className="flex flex-col gap-2.5">
            <span
              className="inline-flex items-center gap-2.5"
              style={{
                fontFamily: MONO,
                fontSize: 10,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "rgba(0,240,255,0.85)",
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: 999,
                  background: "#00F0FF",
                  boxShadow: "0 0 8px rgba(0,240,255,0.7)",
                  display: "inline-block",
                }}
              />
              Selected Work
            </span>
            <h2
              className="text-2xl leading-[1.1] tracking-tight text-white md:text-[34px]"
              style={{ fontFamily: SANS, fontWeight: 600, letterSpacing: "-0.025em" }}
            >
              A few things we&rsquo;ve{" "}
              <em
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontWeight: 400,
                  backgroundImage:
                    "linear-gradient(120deg, #A0FFFF, #00F0FF 60%, #5B8DFF)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                actually shipped.
              </em>
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/[0.12] px-4 py-2 transition-all hover:border-[#00F0FF]/40 hover:bg-[#00F0FF]/[0.06] hover:text-[#00F0FF] sm:self-auto"
            style={{
              fontFamily: MONO,
              fontSize: 10.5,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.92)",
            }}
          >
            Full archive
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </header>

        {/* 3 equal cards — balanced row */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <TeaserCard key={item.id} item={item} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   3-up equal teaser card — cover + body, single design used
   for all three slots. Featured row gets a small star pill.
   ───────────────────────────────────────────────────────────── */
function TeaserCard({ item, index }: { item: PortfolioItem; index: number }) {
  const cover = item.images?.[0] ?? null;
  const titleParts = splitAccent(item.title, item.accent_word);
  const firstMetric = item.outcome_metrics?.[0];
  const tags = (item.tech_tags ?? []).slice(0, 3);

  return (
    <Link
      href={`/portfolio/${item.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.015] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#00F0FF]/30"
    >
      {/* top accent rule — brightens on hover */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px opacity-60 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(to right, transparent 8%, rgba(0,240,255,0.55) 50%, transparent 92%)",
        }}
      />

      {/* Cover */}
      <div
        className="relative aspect-[16/10] w-full overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0a1525 0%, #050a15 50%, #030408 100%)",
        }}
      >
        {cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt={item.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        )}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 45%, rgba(2,4,10,0.65) 100%)",
          }}
        />
        {item.featured && index === 1 && (
          <span
            aria-hidden
            className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 backdrop-blur-md"
            style={{
              background: "rgba(2,4,10,0.78)",
              border: "1px solid rgba(0,240,255,0.40)",
              fontFamily: MONO,
              fontSize: 9,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#00F0FF",
            }}
          >
            ★ Featured
          </span>
        )}
        <span
          aria-hidden
          className="absolute bottom-2.5 left-4"
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontSize: 48,
            lineHeight: 0.8,
            color: "rgba(255,255,255,0.85)",
            textShadow: "0 4px 16px rgba(0,0,0,0.6)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {String(index).padStart(2, "0")}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <p
          className="truncate"
          style={{
            fontFamily: MONO,
            fontSize: 9.5,
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)",
            margin: 0,
          }}
        >
          {[item.category?.replace(/-/g, " "), item.client_name]
            .filter(Boolean)
            .join(" · ")}
        </p>

        <h3
          className="line-clamp-2"
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontSize: 22,
            lineHeight: 1.15,
            letterSpacing: "-0.015em",
            color: "rgba(255,255,255,0.96)",
            margin: 0,
          }}
        >
          {titleParts.before}
          {titleParts.accent && (
            <em style={{ fontStyle: "italic", color: "#00F0FF" }}>
              {titleParts.accent}
            </em>
          )}
          {titleParts.after}
        </h3>

        <p
          className="line-clamp-2 flex-1"
          style={{
            fontFamily: SANS,
            fontSize: 13,
            lineHeight: 1.5,
            color: "rgba(255,255,255,0.55)",
            margin: 0,
          }}
        >
          {item.description}
        </p>

        {/* Footer — metric (if any) + tags + arrow */}
        <div
          className="mt-1 flex items-center gap-3 pt-3"
          style={{ borderTop: "1px dotted rgba(255,255,255,0.10)" }}
        >
          {firstMetric ? (
            <span
              className="flex items-baseline gap-1.5"
              style={{ minWidth: 0 }}
            >
              <span
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontSize: 18,
                  lineHeight: 1,
                  color: "#00F0FF",
                }}
              >
                {firstMetric.value}
              </span>
              <span
                className="truncate"
                style={{
                  fontFamily: MONO,
                  fontSize: 8.5,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.40)",
                }}
              >
                {firstMetric.label}
              </span>
            </span>
          ) : (
            tags.length > 0 && (
              <span className="flex items-center gap-2 truncate">
                {tags.slice(0, 2).map((tag, i) => (
                  <span key={tag} className="inline-flex items-center gap-2">
                    <span
                      style={{
                        fontFamily: MONO,
                        fontSize: 9,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.45)",
                      }}
                    >
                      {tag}
                    </span>
                    {i < Math.min(tags.length, 2) - 1 && (
                      <span
                        aria-hidden
                        style={{
                          width: 2,
                          height: 2,
                          borderRadius: 999,
                          background: "rgba(255,255,255,0.20)",
                          display: "inline-block",
                        }}
                      />
                    )}
                  </span>
                ))}
              </span>
            )
          )}

          <span
            aria-hidden
            className="ml-auto text-white/30 transition-all group-hover:translate-x-0.5 group-hover:text-[#00F0FF]"
            style={{ fontSize: 16, lineHeight: 1, flexShrink: 0 }}
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

function splitAccent(
  title: string,
  accent: string | null,
): { before: string; accent: string | null; after: string } {
  if (!accent) return { before: title, accent: null, after: "" };
  const idx = title.toLowerCase().indexOf(accent.toLowerCase());
  if (idx === -1) return { before: title, accent: null, after: "" };
  return {
    before: title.slice(0, idx),
    accent: title.slice(idx, idx + accent.length),
    after: title.slice(idx + accent.length),
  };
}
