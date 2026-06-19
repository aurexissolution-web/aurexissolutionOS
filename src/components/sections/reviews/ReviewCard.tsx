import type { Review } from "@/types/portal";
import { ReviewAvatar } from "./ReviewAvatar";
import { StarRating } from "./StarRating";

/**
 * Mirrors the original TestimonialCard structure (340px, dark card,
 * quote mark accent, hover cyan rim) — but with a brand orb avatar
 * and a small star-rating row.
 */
export function ReviewCard({ review }: { review: Review }) {
  return (
    <div
      className="group relative flex w-[340px] shrink-0 flex-col rounded-[20px] border border-white/[0.06] bg-[#050505] p-6 transition-all duration-300 hover:border-[rgba(0,240,255,0.15)] hover:bg-[#070709]"
      style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.02)" }}
    >
      {/* Top accent line on hover */}
      <div
        aria-hidden
        className="absolute inset-x-8 top-0 h-px rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,240,255,0.5), transparent)" }}
      />

      {/* Quote mark */}
      <span
        aria-hidden
        className="absolute right-6 top-5 select-none text-4xl font-bold leading-none opacity-10 transition-opacity duration-300 group-hover:opacity-20"
        style={{ color: "#00F0FF" }}
      >
        &ldquo;
      </span>

      {/* Author */}
      <div className="mb-4 flex items-center gap-3">
        <ReviewAvatar avatarKey={review.avatar_key} size={40} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold leading-tight text-white">{review.name}</p>
          {review.role && (
            <p className="mt-0.5 truncate text-xs text-neutral-500">{review.role}</p>
          )}
        </div>
      </div>

      {/* Stars */}
      <div className="mb-3">
        <StarRating value={review.rating} readOnly size={13} />
      </div>

      {/* Body */}
      <p className="flex-1 text-sm leading-relaxed text-neutral-400">{review.content}</p>
    </div>
  );
}
