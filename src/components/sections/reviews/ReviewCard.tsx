import type { Review } from "@/types/portal";
import { ReviewAvatar } from "./ReviewAvatar";
import { StarRating } from "./StarRating";

const SERIF = "var(--font-instrument-serif), ui-serif, Georgia, serif";
const MONO = "var(--font-geist-mono), ui-monospace, monospace";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article
      className="flex w-[320px] shrink-0 flex-col gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-colors hover:bg-white/[0.04] sm:w-[360px]"
      style={{ minHeight: 220 }}
    >
      <div className="flex items-center gap-3">
        <ReviewAvatar avatarKey={review.avatar_key} size={44} />
        <div className="min-w-0 flex-1">
          <p
            className="truncate text-[15px] font-medium text-white"
            style={{ fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif" }}
          >
            {review.name}
          </p>
          {review.role && (
            <p
              className="truncate"
              style={{
                fontFamily: MONO,
                fontSize: 10.5,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.40)",
                margin: 0,
                marginTop: 2,
              }}
            >
              {review.role}
            </p>
          )}
        </div>
      </div>

      <StarRating value={review.rating} readOnly size={16} />

      <p
        className="flex-1"
        style={{
          fontFamily: SERIF,
          fontStyle: "italic",
          fontSize: 16,
          lineHeight: 1.55,
          color: "rgba(255,255,255,0.80)",
          margin: 0,
        }}
      >
        &ldquo;{review.content}&rdquo;
      </p>
    </article>
  );
}
