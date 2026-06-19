"use client";

import { useState } from "react";
import { LeaveReviewModal } from "./LeaveReviewModal";

const MONO = "var(--font-geist-mono), ui-monospace, monospace";

/**
 * Floating "Leave a review" widget — small square pill, fixed to the
 * bottom-right of the viewport just above the Ask Aurexis chat dock.
 * Click opens the review modal.
 */
export function LeaveReviewWidget() {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        aria-label="Leave a review"
        className="fixed z-[60] flex items-center gap-2 rounded-full backdrop-blur-md transition-all"
        style={{
          // Sits above the 48px-tall Ask Aurexis dock (which is at bottom: 24px) with a 12px gap.
          right: 24,
          bottom: 84,
          padding: hover ? "10px 16px 10px 12px" : 12,
          background: "rgba(2,4,10,0.72)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 24px rgba(0,0,0,0.55), 0 0 18px rgba(251,191,36,0.18)",
        }}
      >
        {/* Star icon */}
        <svg
          width={20}
          height={20}
          viewBox="0 0 24 24"
          fill="#FBBF24"
          aria-hidden
          style={{ filter: "drop-shadow(0 0 6px rgba(251,191,36,0.55))", flexShrink: 0 }}
        >
          <path d="M12 2.25l2.92 6.51 7.08.65-5.36 4.72 1.6 6.98L12 17.77l-6.24 3.34 1.6-6.98L2 9.41l7.08-.65L12 2.25z" />
        </svg>

        {/* Label — slides in on hover */}
        <span
          style={{
            fontFamily: MONO,
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.92)",
            whiteSpace: "nowrap",
            maxWidth: hover ? 140 : 0,
            opacity: hover ? 1 : 0,
            overflow: "hidden",
            transition: "max-width 0.32s cubic-bezier(.16,1,.3,1), opacity 0.2s ease",
          }}
        >
          Leave a review
        </span>
      </button>

      <LeaveReviewModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
