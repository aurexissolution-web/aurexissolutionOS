import type { Review } from "@/types/portal";
import { ReviewAvatar } from "./ReviewAvatar";
import { StarRating } from "./StarRating";

const SERIF = "var(--font-instrument-serif), ui-serif, Georgia, serif";
const MONO = "var(--font-geist-mono), ui-monospace, monospace";
const SANS = "var(--font-plus-jakarta), system-ui, sans-serif";

/**
 * OPTION B — Spotlight card.
 *
 * The brand orb avatar is the hero. Centered composition with a halo
 * glow that bloats softly behind the orb. Name (sans bold) + role
 * (mono caps) underneath, then a clean star row, then the body. Feels
 * like an Apple product card or a museum-exhibit label.
 */
export function ReviewCardSpotlight({ review }: { review: Review }) {
  return (
    <article
      className="group relative flex w-[340px] shrink-0 flex-col items-center overflow-hidden rounded-3xl p-7 text-center transition-all duration-500"
      style={{
        minHeight: 340,
        background:
          "radial-gradient(ellipse 100% 70% at 50% 0%, rgba(0,240,255,0.06), transparent 65%), linear-gradient(180deg, #0A0C14 0%, #050810 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.04), 0 24px 60px rgba(0,0,0,0.35)",
      }}
    >
      {/* Hover-only top accent line */}
      <span
        aria-hidden
        className="absolute inset-x-12 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "linear-gradient(to right, transparent, rgba(0,240,255,0.7), transparent)" }}
      />

      {/* Spotlight halo behind the avatar */}
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          top: 16,
          width: 180,
          height: 180,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(0,240,255,0.18) 0%, rgba(0,240,255,0) 65%)",
          filter: "blur(20px)",
        }}
      />

      {/* Big orb */}
      <div className="relative mt-2">
        <ReviewAvatar avatarKey={review.avatar_key} size={72} />
      </div>

      {/* Name */}
      <h3
        className="mt-5 truncate"
        style={{
          fontFamily: SANS,
          fontSize: 17,
          fontWeight: 600,
          color: "white",
          margin: 0,
          letterSpacing: "-0.015em",
          maxWidth: "100%",
        }}
      >
        {review.name}
      </h3>

      {/* Role */}
      {review.role && (
        <p
          className="mt-1 truncate"
          style={{
            fontFamily: MONO,
            fontSize: 10,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)",
            margin: 0,
            maxWidth: "100%",
          }}
        >
          {review.role}
        </p>
      )}

      {/* Star rating */}
      <div className="mt-3">
        <StarRating value={review.rating} readOnly size={14} />
      </div>

      {/* Hairline before body */}
      <span aria-hidden className="mt-5 inline-block h-px w-10 bg-white/15" />

      {/* Body — italic serif, slightly smaller */}
      <p
        className="mt-4 flex-1"
        style={{
          fontFamily: SERIF,
          fontStyle: "italic",
          fontSize: 15,
          lineHeight: 1.55,
          color: "rgba(255,255,255,0.72)",
          margin: 0,
        }}
      >
        &ldquo;{review.content}&rdquo;
      </p>
    </article>
  );
}
