import { fetchApprovedReviews } from "@/lib/portal/reviews-data";
import { TestimonialsClient } from "./TestimonialsClient";

/* Section bg: slightly elevated above the page so the cards read as a
   gently recessed surface. */
const SECTION_BG = "#05080F";

export async function ReviewsSection() {
  const reviews = await fetchApprovedReviews();

  return (
    <section
      className="relative overflow-hidden px-0 py-14 md:py-16"
      style={{ background: SECTION_BG }}
    >
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

      {/* Dotted grid texture — kept faint so it never competes with the cards */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse 90% 80% at 50% 50%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 80% at 50% 50%, black 30%, transparent 80%)",
        }}
      />

      <div className="relative">
        <TestimonialsClient reviews={reviews} />
      </div>
    </section>
  );
}
