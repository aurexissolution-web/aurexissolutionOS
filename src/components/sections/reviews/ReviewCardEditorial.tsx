import type { Review } from "@/types/portal";

const SERIF = "var(--font-instrument-serif), ui-serif, Georgia, serif";
const MONO = "var(--font-geist-mono), ui-monospace, monospace";

/**
 * OPTION A — Editorial pull-quote.
 *
 * The body quote IS the design. No avatar, no big stars — just the
 * voice of the client rendered as a magazine quote callout. Star
 * rating becomes five tiny pips at the bottom; attribution lives in
 * mono-caps. Reads like the New York Times opinion column.
 */
export function ReviewCardEditorial({ review }: { review: Review }) {
  const ratingPips = Array.from({ length: 5 }, (_, i) => i < review.rating);

  return (
    <article
      className="group relative flex w-[340px] shrink-0 flex-col justify-between overflow-hidden bg-[#02040A] p-7"
      style={{
        minHeight: 320,
        border: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Top + bottom hairlines for editorial frame */}
      <span aria-hidden className="absolute inset-x-7 top-0 h-px bg-white/[0.06]" />
      <span aria-hidden className="absolute inset-x-7 bottom-0 h-px bg-white/[0.06]" />

      {/* Hover cyan accent — slim top rule */}
      <span
        aria-hidden
        className="absolute left-7 top-0 h-px w-0 opacity-0 transition-all duration-500 group-hover:w-12 group-hover:opacity-100"
        style={{ background: "#00F0FF", boxShadow: "0 0 12px rgba(0,240,255,0.6)" }}
      />

      <div>
        {/* Massive italic open-quote glyph */}
        <span
          aria-hidden
          className="block leading-none"
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontSize: 64,
            color: "rgba(0,240,255,0.35)",
            marginBottom: -18,
          }}
        >
          &ldquo;
        </span>

        {/* The quote — italic serif, generous line-height, dominant */}
        <p
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontSize: 17,
            lineHeight: 1.5,
            color: "rgba(255,255,255,0.92)",
            margin: 0,
            letterSpacing: "0.005em",
          }}
        >
          {review.content}
        </p>
      </div>

      <footer className="mt-6 pt-5" style={{ borderTop: "1px dotted rgba(255,255,255,0.10)" }}>
        {/* Rating pips */}
        <div className="mb-3 flex items-center gap-1.5" aria-label={`${review.rating} of 5 stars`}>
          {ratingPips.map((on, i) => (
            <span
              key={i}
              aria-hidden
              className="inline-block rounded-full"
              style={{
                width: 5,
                height: 5,
                background: on ? "#FBBF24" : "rgba(255,255,255,0.12)",
                boxShadow: on ? "0 0 4px rgba(251,191,36,0.65)" : "none",
              }}
            />
          ))}
        </div>

        {/* Attribution — name in mono caps, role italic serif */}
        <p
          className="truncate"
          style={{
            fontFamily: MONO,
            fontSize: 10.5,
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
              fontFamily: SERIF,
              fontStyle: "italic",
              fontSize: 13,
              color: "rgba(255,255,255,0.45)",
              margin: 0,
              marginTop: 4,
            }}
          >
            {review.role}
          </p>
        )}
      </footer>
    </article>
  );
}
