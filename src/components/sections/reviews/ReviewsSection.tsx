import { fetchApprovedReviews } from "@/lib/portal/reviews-data";
import { ReviewCard } from "./ReviewCard";
import { LeaveReviewButton } from "./LeaveReviewButton";

const SERIF = "var(--font-instrument-serif), ui-serif, Georgia, serif";
const MONO = "var(--font-geist-mono), ui-monospace, monospace";

const STATIC_THRESHOLD = 5;

/**
 * Public reviews section (homepage).
 *
 * Behaviour rules:
 *   - <  5 approved reviews → render statically, centered
 *   - ≥  5 approved reviews → marquee scroll (same animation as the
 *     old TestimonialsSection — uses globals.css `animate-marquee`)
 *   - = 0 approved reviews  → render only the section header + CTA
 */
export async function ReviewsSection() {
  const reviews = await fetchApprovedReviews();
  const useMarquee = reviews.length >= STATIC_THRESHOLD;

  return (
    <section className="relative overflow-hidden bg-[var(--color-background)] py-20">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-60 w-full max-w-3xl -translate-x-1/2 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,240,255,0.08)_0%,_transparent_70%)]" />
      </div>

      <div className="relative mx-auto flex max-w-[1280px] flex-col gap-12 px-6">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <span
            style={{
              fontFamily: MONO,
              fontSize: 10.5,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "rgba(0,240,255,0.85)",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              aria-hidden
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                background: "#00F0FF",
                boxShadow: "0 0 8px rgba(0,240,255,0.7)",
              }}
            />
            Client voices
          </span>

          <h2
            className="max-w-[640px] text-3xl font-medium leading-tight tracking-tighter text-white md:text-5xl"
            style={{
              fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
              fontWeight: 600,
            }}
          >
            What founders &amp; operators{" "}
            <span
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: 400,
                backgroundImage: "linear-gradient(110deg, #A0FFFF 0%, #00F0FF 60%, #5B8DFF 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              actually say.
            </span>
          </h2>

          <p
            className="max-w-[520px] text-base font-light text-neutral-500"
            style={{ fontFamily: SERIF, fontStyle: "italic" }}
          >
            Real, moderated reviews from teams who&rsquo;ve worked with us.
          </p>

          <div className="mt-3">
            <LeaveReviewButton />
          </div>
        </div>

        {/* Reviews */}
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
            <p
              className="mt-3"
              style={{
                fontFamily: MONO,
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.30)",
              }}
            >
              Be the first to share.
            </p>
          </div>
        ) : useMarquee ? (
          <MarqueeReviews reviews={reviews} />
        ) : (
          <div className="mx-auto flex flex-wrap justify-center gap-5">
            {reviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function MarqueeReviews({ reviews }: { reviews: Awaited<ReturnType<typeof fetchApprovedReviews>> }) {
  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="group flex w-full overflow-hidden flex-row [--gap:1.25rem] [gap:var(--gap)] [--duration:45s]"
      >
        {/* Two sibling tracks for a seamless loop (matches the prior
            TestimonialsSection marquee pattern) */}
        <div className="flex shrink-0 [gap:var(--gap)] flex-row animate-marquee group-hover:[animation-play-state:paused]">
          {reviews.map((r) => (
            <ReviewCard key={`a-${r.id}`} review={r} />
          ))}
        </div>
        <div
          aria-hidden
          className="flex shrink-0 [gap:var(--gap)] flex-row animate-marquee group-hover:[animation-play-state:paused]"
        >
          {reviews.map((r) => (
            <ReviewCard key={`b-${r.id}`} review={r} />
          ))}
        </div>
      </div>

      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[var(--color-background)] to-transparent md:w-64" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[var(--color-background)] to-transparent md:w-64" />
    </div>
  );
}
