import { fetchApprovedReviews } from "@/lib/portal/reviews-data";
import { ReviewCardDispatch } from "./ReviewCardDispatch";
import { InlineReviewCta } from "./InlineReviewCta";
import { AnimatedBadge } from "@/components/ui/animated-badge";
import type { Review } from "@/types/portal";

const SERIF = "var(--font-instrument-serif), ui-serif, Georgia, serif";

const STATIC_THRESHOLD = 5;

/* Section bg: slightly elevated above the page so the cards (which are
   #02040A) appear gently recessed against the dotted-grid plate. */
const SECTION_BG = "#05080F";

export async function ReviewsSection() {
  const reviews = await fetchApprovedReviews();
  const useMarquee = reviews.length >= STATIC_THRESHOLD;

  return (
    <section
      className="relative overflow-hidden py-24 md:py-28"
      style={{ background: SECTION_BG }}
    >
      {/* ── Atmospheric background stack ───────────────────────── */}

      {/* Top + bottom hairline rules with subtle cyan tint at center */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent 8%, rgba(0,240,255,0.30) 50%, transparent 92%)",
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent 8%, rgba(0,240,255,0.30) 50%, transparent 92%)",
        }}
      />

      {/* Dotted grid texture — extremely subtle, evokes editorial paper */}
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

      {/* Two ambient color glows — cyan at top, violet at bottom-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(0,240,255,0.10), transparent 65%)",
          filter: "blur(60px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-20 h-[420px] w-[620px] rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(167,139,250,0.08), transparent 60%)",
          filter: "blur(70px)",
        }}
      />

      {/* Fine grain overlay — matches /the-lab + /services photographic feel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* ── Content ────────────────────────────────────────────── */}
      <div className="relative mx-auto flex max-w-[1280px] flex-col gap-14">
        {/* Section header */}
        <div className="flex flex-col items-center gap-4 px-6 text-center">
          <AnimatedBadge text="Client Results" color="#00F0FF" />
          <h2 className="mt-2 max-w-[640px] text-3xl font-medium leading-tight tracking-tighter text-white md:text-5xl">
            Trusted by founders &amp; operators
          </h2>
          <p className="max-w-[520px] text-base font-light text-neutral-500">
            Real results from businesses that chose to build smarter.
          </p>
        </div>

        {reviews.length === 0 ? (
          <div className="mx-auto max-w-md rounded-2xl border border-dashed border-white/[0.10] py-14 text-center">
            <p
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontSize: 20,
                color: "rgba(255,255,255,0.55)",
                margin: 0,
              }}
            >
              First reviews shipping soon.
            </p>
          </div>
        ) : useMarquee ? (
          <MarqueeReviews reviews={reviews} />
        ) : (
          <div className="flex flex-wrap justify-center gap-5 px-6">
            {reviews.map((r, i) => (
              <ReviewCardDispatch key={r.id} review={r} index={i + 1} />
            ))}
          </div>
        )}

        <div className="mt-2">
          <InlineReviewCta />
        </div>
      </div>
    </section>
  );
}

function MarqueeReviews({ reviews }: { reviews: Review[] }) {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="group flex w-full flex-row overflow-hidden [--duration:45s] [--gap:1.25rem] [gap:var(--gap)]">
        <div className="flex shrink-0 flex-row [gap:var(--gap)] animate-marquee group-hover:[animation-play-state:paused]">
          {reviews.map((r, i) => (
            <ReviewCardDispatch key={`a-${r.id}`} review={r} index={i + 1} />
          ))}
        </div>
        <div
          aria-hidden
          className="flex shrink-0 flex-row [gap:var(--gap)] animate-marquee group-hover:[animation-play-state:paused]"
        >
          {reviews.map((r, i) => (
            <ReviewCardDispatch key={`b-${r.id}`} review={r} index={i + 1} />
          ))}
        </div>
      </div>

      {/* Fade edges — tuned to match the new SECTION_BG so they blend */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 md:w-64"
        style={{
          background: `linear-gradient(to right, ${SECTION_BG}, transparent)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 md:w-64"
        style={{
          background: `linear-gradient(to left, ${SECTION_BG}, transparent)`,
        }}
      />
    </div>
  );
}
