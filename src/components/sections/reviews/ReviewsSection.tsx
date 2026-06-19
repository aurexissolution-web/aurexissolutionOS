import { fetchApprovedReviews } from "@/lib/portal/reviews-data";
import { ReviewCard } from "./ReviewCard";
import { AnimatedBadge } from "@/components/ui/animated-badge";

const STATIC_THRESHOLD = 5;

/**
 * Public reviews section (homepage).
 *
 * Visual mirrors the prior TestimonialsSection exactly — same heading,
 * description, AnimatedBadge, ambient glow, marquee animation, and fade
 * edges. The only change is that data now comes from approved reviews
 * in the DB instead of a hardcoded array.
 *
 * Display rules:
 *   - 0 reviews  → empty-state card
 *   - <5 reviews → static centered row, no animation
 *   - ≥5         → seamless marquee scroll (same animation as before)
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

      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-12 text-center">
        {/* Header — preserved from original TestimonialsSection */}
        <div className="flex flex-col items-center gap-4 px-6">
          <AnimatedBadge text="Client Results" color="#00F0FF" />
          <h2 className="mt-2 max-w-[640px] text-3xl font-medium leading-tight tracking-tighter text-white md:text-5xl">
            Trusted by founders &amp; operators
          </h2>
          <p className="max-w-[520px] text-base font-light text-neutral-500">
            Real results from businesses that chose to build smarter.
          </p>
        </div>

        {/* Reviews */}
        {reviews.length === 0 ? (
          <div className="mx-auto max-w-md rounded-2xl border border-dashed border-white/[0.10] py-14 text-center">
            <p
              style={{
                fontFamily: "var(--font-instrument-serif), ui-serif, Georgia, serif",
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
      <div className="group flex w-full flex-row overflow-hidden [--duration:45s] [--gap:1.25rem] [gap:var(--gap)]">
        {/* Two sibling tracks for a seamless loop */}
        <div className="flex shrink-0 flex-row [gap:var(--gap)] animate-marquee group-hover:[animation-play-state:paused]">
          {reviews.map((r) => (
            <ReviewCard key={`a-${r.id}`} review={r} />
          ))}
        </div>
        <div
          aria-hidden
          className="flex shrink-0 flex-row [gap:var(--gap)] animate-marquee group-hover:[animation-play-state:paused]"
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
