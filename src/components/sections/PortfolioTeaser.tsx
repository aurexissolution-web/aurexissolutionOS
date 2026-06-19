import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase/server";
import type { PortfolioItem } from "@/types/portal";

const SERIF = "var(--font-instrument-serif), ui-serif, Georgia, serif";
const MONO = "var(--font-geist-mono), ui-monospace, monospace";
const SANS = "var(--font-plus-jakarta), system-ui, sans-serif";

const SECTION_BG = "#05080F";

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

  const [featured, ...rest] = items;
  const secondary = rest.slice(0, 2);
  const hasSecondary = secondary.length > 0;

  return (
    <section
      className="relative overflow-hidden py-24 md:py-28"
      style={{ background: SECTION_BG }}
    >
      {/* ── Atmospheric background stack ───────────────────────── */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent 8%, rgba(167,139,250,0.30) 50%, transparent 92%)",
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent 8%, rgba(167,139,250,0.30) 50%, transparent 92%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse 90% 80% at 50% 50%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 80% at 50% 50%, black 30%, transparent 80%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 h-[520px] w-[720px] rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(0,240,255,0.10), transparent 65%)",
          filter: "blur(70px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-24 h-[420px] w-[620px] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(167,139,250,0.12), transparent 60%)",
          filter: "blur(70px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* ── Content ────────────────────────────────────────────── */}
      <div className="relative mx-auto flex max-w-[1280px] flex-col gap-12 px-6">
        {/* Header */}
        <header className="flex flex-col items-center gap-4 text-center">
          <span
            className="inline-flex items-center gap-3"
            style={{
              fontFamily: MONO,
              fontSize: 10.5,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "rgba(167,139,250,0.85)",
            }}
          >
            <span
              aria-hidden
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                background: "#A78BFA",
                boxShadow: "0 0 8px rgba(167,139,250,0.7)",
                display: "inline-block",
              }}
            />
            Selected Work
          </span>
          <h2
            className="max-w-[640px] text-3xl font-medium leading-[1.05] tracking-tight text-white md:text-5xl"
            style={{ fontFamily: SANS, fontWeight: 600, letterSpacing: "-0.025em" }}
          >
            A few things we&rsquo;ve{" "}
            <em
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: 400,
                backgroundImage:
                  "linear-gradient(120deg, #C4B5FD, #A78BFA 60%, #7C3AED)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              actually shipped.
            </em>
          </h2>
          <p
            className="max-w-[520px]"
            style={{
              fontSize: 15.5,
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.55)",
              margin: 0,
            }}
          >
            Real Malaysian businesses, real outcomes, real code in production.
            One we&rsquo;re especially proud of below.
          </p>
        </header>

        {/* Grid */}
        <div
          className={
            hasSecondary
              ? "grid grid-cols-1 gap-5 lg:grid-cols-[7fr_5fr]"
              : "grid grid-cols-1 gap-5"
          }
        >
          <FeaturedCard item={featured} />
          {hasSecondary && (
            <div className="flex flex-col gap-5">
              {secondary.map((item) => (
                <SecondaryCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Archive CTA */}
        <div className="flex justify-center">
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/[0.12] px-5 py-2.5 transition-all hover:border-[#A78BFA]/40 hover:bg-[#A78BFA]/[0.06] hover:text-[#A78BFA]"
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.92)",
            }}
          >
            View the full archive
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Featured card — 7-col, big cover, metrics row + CTA
   ───────────────────────────────────────────────────────────── */
function FeaturedCard({ item }: { item: PortfolioItem }) {
  const cover = item.images?.[0] ?? null;
  const titleParts = splitAccent(item.title, item.accent_word);
  const metrics = (item.outcome_metrics ?? []).slice(0, 2);
  const tags = (item.tech_tags ?? []).slice(0, 3);

  return (
    <Link
      href={`/portfolio/${item.slug}`}
      className="group relative flex flex-col overflow-hidden border border-white/[0.06] bg-[#02040A] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#A78BFA]/35"
      style={{
        boxShadow: "0 0 0 1px rgba(255,255,255,0.01)",
      }}
    >
      {/* top accent rule */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent 8%, rgba(167,139,250,0.55) 50%, transparent 92%)",
        }}
      />

      {/* Cover */}
      <div
        className="relative aspect-[16/10] w-full overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1a0e2a 0%, #0a0e1a 50%, #02040A 100%)",
        }}
      >
        {cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt={item.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        {/* darken bottom for legibility of overlays */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 60%, transparent 20%, rgba(2,4,10,0.7) 100%)",
          }}
        />
        {item.featured && (
          <span
            aria-hidden
            className="absolute left-5 top-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 backdrop-blur-md"
            style={{
              background: "rgba(2,4,10,0.78)",
              border: "1px solid rgba(167,139,250,0.40)",
              fontFamily: MONO,
              fontSize: 9.5,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#A78BFA",
            }}
          >
            ★ Featured
          </span>
        )}
        <span
          aria-hidden
          className="absolute bottom-5 left-7"
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontSize: 96,
            lineHeight: 0.8,
            color: "rgba(167,139,250,0.85)",
            textShadow: "0 4px 24px rgba(0,0,0,0.6)",
          }}
        >
          01
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-4 p-8 md:p-9">
        <p
          style={{
            fontFamily: MONO,
            fontSize: 10.5,
            letterSpacing: "0.28em",
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
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontSize: "clamp(28px, 3.4vw, 44px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "rgba(255,255,255,0.96)",
            margin: 0,
          }}
        >
          {titleParts.before}
          {titleParts.accent && (
            <em style={{ fontStyle: "italic", color: "#A78BFA" }}>
              {titleParts.accent}
            </em>
          )}
          {titleParts.after}
        </h3>
        <p
          className="max-w-[560px]"
          style={{
            fontFamily: SANS,
            fontSize: 15,
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.65)",
            margin: 0,
          }}
        >
          {item.description}
        </p>

        <div
          className="mt-1 flex flex-wrap items-center gap-5 pt-5"
          style={{ borderTop: "1px dotted rgba(255,255,255,0.12)" }}
        >
          {metrics.length > 0 && (
            <dl className="flex items-baseline gap-5">
              {metrics.map((m) => (
                <div key={m.label} className="flex flex-col gap-1">
                  <dt
                    style={{
                      fontFamily: MONO,
                      fontSize: 9,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.40)",
                      margin: 0,
                    }}
                  >
                    {m.label}
                  </dt>
                  <dd
                    style={{
                      fontFamily: SERIF,
                      fontStyle: "italic",
                      fontSize: 28,
                      lineHeight: 1,
                      color: "#A78BFA",
                      margin: 0,
                    }}
                  >
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {tags.length > 0 && (
            <div className="flex items-center gap-2">
              {tags.map((tag, i) => (
                <span key={tag} className="inline-flex items-center gap-2">
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 9.5,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.40)",
                    }}
                  >
                    {tag}
                  </span>
                  {i < tags.length - 1 && (
                    <span
                      aria-hidden
                      style={{
                        width: 3,
                        height: 3,
                        borderRadius: 999,
                        background: "rgba(255,255,255,0.20)",
                        display: "inline-block",
                      }}
                    />
                  )}
                </span>
              ))}
            </div>
          )}

          <span
            className="ml-auto inline-flex items-center gap-2 transition-all group-hover:gap-3"
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#A78BFA",
            }}
          >
            Read the case <span aria-hidden>→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────
   Secondary card — 132px cover left + body right, 1-line outcome
   ───────────────────────────────────────────────────────────── */
function SecondaryCard({ item }: { item: PortfolioItem }) {
  const cover = item.images?.[0] ?? null;
  const titleParts = splitAccent(item.title, item.accent_word);
  const tags = (item.tech_tags ?? []).slice(0, 2);
  // 1-line outcome: prefer first outcome metric, fall back to description
  const firstMetric = item.outcome_metrics?.[0];
  const outcomeLine = firstMetric
    ? `${firstMetric.value} · ${firstMetric.label.toLowerCase()}`
    : item.description;

  return (
    <Link
      href={`/portfolio/${item.slug}`}
      className="group relative flex flex-1 items-center gap-5 overflow-hidden border border-white/[0.06] bg-[#02040A] p-4 transition-all duration-300 hover:-translate-y-px hover:border-[#00F0FF]/20"
    >
      {/* top accent rule (hover only) */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(0,240,255,0.55), transparent)",
        }}
      />

      {/* Cover thumb */}
      <div
        className="relative aspect-[4/3] w-[132px] shrink-0 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0c2030 0%, #02040A 100%)",
        }}
      >
        {cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt={item.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(2,4,10,0.55) 100%)",
          }}
        />
      </div>

      {/* Body */}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <p
          className="truncate"
          style={{
            fontFamily: MONO,
            fontSize: 9.5,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)",
            margin: 0,
          }}
        >
          {[item.category?.replace(/-/g, " "), item.client_name]
            .filter(Boolean)
            .join(" · ") || "Case"}
        </p>
        <h3
          className="truncate"
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontSize: 19,
            lineHeight: 1.2,
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
          className="line-clamp-2"
          style={{
            fontFamily: SANS,
            fontSize: 12.5,
            lineHeight: 1.5,
            color: "rgba(255,255,255,0.50)",
            margin: 0,
          }}
        >
          {outcomeLine}
        </p>
        {tags.length > 0 && (
          <div className="mt-1 flex items-center gap-2">
            {tags.map((tag, i) => (
              <span key={tag} className="inline-flex items-center gap-2">
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 9,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.35)",
                  }}
                >
                  {tag}
                </span>
                {i < tags.length - 1 && (
                  <span
                    aria-hidden
                    style={{
                      width: 2,
                      height: 2,
                      borderRadius: 999,
                      background: "rgba(255,255,255,0.18)",
                      display: "inline-block",
                    }}
                  />
                )}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

/* Helper: split a title around the accent word so we can style it inline.
   Case-insensitive match on first occurrence; falls back to plain title. */
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
