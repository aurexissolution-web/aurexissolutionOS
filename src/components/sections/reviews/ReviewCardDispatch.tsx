import type { Review } from "@/types/portal";
import { ReviewAvatar } from "./ReviewAvatar";

const SERIF = "var(--font-instrument-serif), ui-serif, Georgia, serif";
const MONO = "var(--font-geist-mono), ui-monospace, monospace";

/**
 * OPTION C — Editorial dispatch.
 *
 * Visually cohesive with the rest of the site (portfolio masthead, about
 * founder cards). Numbered italic-serif index at top-left, cyan hairline
 * rule, italic serif quote, dotted divider, footer row with small avatar
 * + mono-caps name + star pips on the right.
 */
export function ReviewCardDispatch({ review, index }: { review: Review; index: number }) {
  const ratingPips = Array.from({ length: 5 }, (_, i) => i < review.rating);

  return (
    <article
      className="group relative flex w-[340px] shrink-0 flex-col bg-[#02040A] p-6 transition-colors duration-300"
      style={{
        minHeight: 320,
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Top accent hairline (always visible, brightens on hover) */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px transition-opacity duration-500"
        style={{
          background: "linear-gradient(to right, transparent 8%, rgba(0,240,255,0.40) 50%, transparent 92%)",
          opacity: 0.5,
        }}
      />

      {/* Index + eyebrow row */}
      <div className="flex items-baseline gap-4">
        <span
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontSize: 36,
            color: "rgba(255,255,255,0.85)",
            lineHeight: 0.85,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {String(index).padStart(2, "0")}
        </span>
        <span aria-hidden className="h-px w-6 bg-white/15" />
        <span
          style={{
            fontFamily: MONO,
            fontSize: 9.5,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(0,240,255,0.85)",
          }}
        >
          From the Client
        </span>
      </div>

      {/* Quote — italic serif, dominant */}
      <p
        className="mt-6 flex-1"
        style={{
          fontFamily: SERIF,
          fontStyle: "italic",
          fontSize: 16.5,
          lineHeight: 1.5,
          color: "rgba(255,255,255,0.88)",
          margin: 0,
        }}
      >
        &ldquo;{review.content}&rdquo;
      </p>

      {/* Dotted divider */}
      <span
        aria-hidden
        className="my-5 block"
        style={{
          borderTop: "1px dotted rgba(255,255,255,0.14)",
        }}
      />

      {/* Footer row — avatar + attribution + stars */}
      <footer className="flex items-center gap-3">
        <ReviewAvatar avatarKey={review.avatar_key} size={28} />
        <div className="min-w-0 flex-1">
          <p
            className="truncate"
            style={{
              fontFamily: MONO,
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.78)",
              margin: 0,
            }}
          >
            {review.name}
          </p>
          {review.role && (
            <p
              className="truncate"
              style={{
                fontFamily: MONO,
                fontSize: 9,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
                margin: 0,
                marginTop: 2,
              }}
            >
              {review.role}
            </p>
          )}
        </div>
        <div className="flex items-center gap-1" aria-label={`${review.rating} of 5 stars`}>
          {ratingPips.map((on, i) => (
            <span
              key={i}
              aria-hidden
              className="inline-block"
              style={{
                width: 4,
                height: 4,
                borderRadius: 999,
                background: on ? "#FBBF24" : "rgba(255,255,255,0.10)",
                boxShadow: on ? "0 0 3px rgba(251,191,36,0.65)" : "none",
              }}
            />
          ))}
        </div>
      </footer>
    </article>
  );
}
