"use client";

import { useState } from "react";
import { LeaveReviewModal } from "./LeaveReviewModal";

const MONO = "var(--font-geist-mono), ui-monospace, monospace";

/**
 * Sister pill to the Aurexis Architect chat dock. Shares the same
 * glass language (height, background, border, shadow) so the two
 * read as a single floating control cluster in the bottom-right.
 *
 * Rendered by ChatbotWidget so it inherits the same route gating
 * (hidden on /login and /portal/*).
 */
export function LeaveReviewDockButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Leave a review"
        className="group flex h-[48px] items-center justify-center outline-none transition-transform hover:-translate-y-px"
        style={{
          gap: 10,
          padding: "0 16px 0 12px",
          background: "rgba(2,4,10,0.72)",
          backdropFilter: "blur(20px) saturate(160%)",
          WebkitBackdropFilter: "blur(20px) saturate(160%)",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: 999,
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 24px rgba(0,0,0,0.55), 0 0 24px rgba(251,191,36,0.12)",
        }}
      >
        {/* 3D star-orb (amber/gold) — matches the cyan orb on the chat dock */}
        <span
          aria-hidden
          className="relative inline-flex items-center justify-center"
          style={{ width: 22, height: 22, flexShrink: 0 }}
        >
          <span
            className="absolute rounded-full motion-safe:animate-[reviewWidgetPulse_2.6s_ease-in-out_infinite]"
            style={{
              inset: -6,
              background:
                "radial-gradient(circle at 50% 50%, rgba(251,191,36,0.55) 0%, rgba(251,191,36,0) 70%)",
              filter: "blur(6px)",
            }}
          />
          <span
            className="relative grid place-items-center rounded-full"
            style={{
              width: 20,
              height: 20,
              background: [
                "radial-gradient(ellipse 35% 25% at 50% 20%, rgba(255,255,255,0.95), transparent 70%)",
                "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(251,191,36,0.55), transparent 65%)",
                "linear-gradient(135deg, rgba(251,191,36,0.85) 0%, rgba(245,158,11,0.90) 50%, rgba(120,53,15,0.95) 100%)",
              ].join(", "),
              boxShadow:
                "inset 0 -2px 4px rgba(0,0,0,0.40), inset 0 1px 2px rgba(255,255,255,0.45), 0 0 8px rgba(251,191,36,0.50)",
            }}
          >
            <svg width={10} height={10} viewBox="0 0 24 24" fill="rgba(255,255,255,0.95)" aria-hidden>
              <path d="M12 2.25l2.92 6.51 7.08.65-5.36 4.72 1.6 6.98L12 17.77l-6.24 3.34 1.6-6.98L2 9.41l7.08-.65L12 2.25z" />
            </svg>
          </span>
        </span>

        <span
          style={{
            fontFamily: MONO,
            fontSize: 12,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.92)",
            whiteSpace: "nowrap",
          }}
        >
          Review
        </span>

        <style>{`
          @keyframes reviewWidgetPulse {
            0%, 100% { opacity: 0.55; transform: scale(1); }
            50%      { opacity: 1;    transform: scale(1.18); }
          }
        `}</style>
      </button>

      <LeaveReviewModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
