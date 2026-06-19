import { fetchApprovedReviews } from "@/lib/portal/reviews-data";
import { ReviewCardEditorial } from "./ReviewCardEditorial";
import { ReviewCardSpotlight } from "./ReviewCardSpotlight";
import { ReviewCardDispatch } from "./ReviewCardDispatch";
import { InlineReviewCta } from "./InlineReviewCta";
import { AnimatedBadge } from "@/components/ui/animated-badge";
import type { Review } from "@/types/portal";

const MONO = "var(--font-geist-mono), ui-monospace, monospace";
const SERIF = "var(--font-instrument-serif), ui-serif, Georgia, serif";

interface VariantInfo {
  key: "editorial" | "spotlight" | "dispatch";
  label: string;
  description: string;
  Card: (props: { review: Review; index: number }) => React.ReactNode;
}

const VARIANTS: VariantInfo[] = [
  {
    key: "editorial",
    label: "Option A · Editorial pull-quote",
    description: "Magazine callout — quote dominates, no avatar, mono-caps attribution.",
    Card: ({ review }) => <ReviewCardEditorial review={review} />,
  },
  {
    key: "spotlight",
    label: "Option B · Spotlight card",
    description: "Centered with the brand orb as hero, halo glow, museum-label feel.",
    Card: ({ review }) => <ReviewCardSpotlight review={review} />,
  },
  {
    key: "dispatch",
    label: "Option C · Editorial dispatch",
    description: "Numbered index + cyan rule + dotted divider — matches /portfolio + /about.",
    Card: ({ review, index }) => <ReviewCardDispatch review={review} index={index} />,
  },
];

export async function ReviewsSection() {
  const reviews = await fetchApprovedReviews();

  return (
    <section className="relative overflow-hidden bg-[var(--color-background)] py-20">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-60 w-full max-w-3xl -translate-x-1/2 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,240,255,0.08)_0%,_transparent_70%)]" />
      </div>

      <div className="relative mx-auto flex max-w-[1280px] flex-col gap-14 px-6">
        {/* Section header */}
        <div className="flex flex-col items-center gap-4 text-center">
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
        ) : (
          // PREVIEW MODE: render each variant in its own labelled row so
          // the user can compare side by side. Once a pick is locked in,
          // collapse this to a single marquee using the chosen card.
          <div className="flex flex-col gap-16">
            {VARIANTS.map((v) => (
              <div key={v.key} className="flex flex-col gap-5">
                <header className="flex flex-col items-center gap-2 text-center">
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 10,
                      letterSpacing: "0.32em",
                      textTransform: "uppercase",
                      color: "rgba(0,240,255,0.85)",
                    }}
                  >
                    {v.label}
                  </span>
                  <p
                    style={{
                      fontFamily: SERIF,
                      fontStyle: "italic",
                      fontSize: 15,
                      color: "rgba(255,255,255,0.55)",
                      margin: 0,
                    }}
                  >
                    {v.description}
                  </p>
                </header>
                <div className="flex flex-wrap justify-center gap-5">
                  {reviews.slice(0, 3).map((r, i) => (
                    <v.Card key={`${v.key}-${r.id}`} review={r} index={i + 1} />
                  ))}
                </div>
              </div>
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
