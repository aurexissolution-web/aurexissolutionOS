"use client";

import { useState } from "react";
import { LeaveReviewModal } from "./LeaveReviewModal";

const MONO = "var(--font-geist-mono), ui-monospace, monospace";

/**
 * Floating "Leave a review" widget. Pill design matches the Aurexis
 * Architect chat dock language — small 3D orb + label, premium glass.
 * Positioned bottom-right, above the chat dock with a 12px gap.
 */
export function LeaveReviewWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Leave a review"
        className="group fixed z-[60] flex h-[44px] items-center gap-2.5 rounded-full transition-all hover:-translate-y-0.5"
        style={{
          right: 24,
          bottom: 84, // above the 48px Ask Aurexis dock (bottom: 24) + 12px gap
          padding: "0 18px 0 12px",
          background: "rgba(2,4,10,0.72)",
          backdropFilter: "blur(20px) saturate(160%)",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 24px rgba(0,0,0,0.55), 0 0 24px rgba(251,191,36,0.15)",
        }}
      >
        {/* 3D star-orb — amber/gold premium feel */}
        <span
          aria-hidden
          className="relative inline-flex items-center justify-center"
          style={{ width: 22, height: 22, flexShrink: 0 }}
        >
          {/* Outer pulsing halo */}
          <span
            className="absolute rounded-full motion-safe:animate-[reviewWidgetPulse_2.6s_ease-in-out_infinite]"
            style={{
              inset: -6,
              background:
                "radial-gradient(circle at 50% 50%, rgba(251,191,36,0.55) 0%, rgba(251,191,36,0) 70%)",
              filter: "blur(6px)",
            }}
          />
          {/* 3D orb */}
          <span
            className="relative grid place-items-center rounded-full"
            style={{
              width: 20,
              height: 20,
              background: [
                "radial-gradient(ellipse 35% 25% at 50% 20%, rgba(255,255,255,0.95), transparent 70%)",
                "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(251,191,36,0.55), transparent 65%)",
                "linear-gradient(135deg, rgba(251,191,36,0.8) 0%, rgba(245,158,11,0.85) 50%, rgba(120,53,15,0.95) 100%)",
              ].join(", "),
              boxShadow:
                "inset 0 -2px 4px rgba(0,0,0,0.40), inset 0 1px 2px rgba(255,255,255,0.40), 0 0 8px rgba(251,191,36,0.45)",
            }}
          >
            {/* tiny star glyph inside the orb */}
            <svg width={10} height={10} viewBox="0 0 24 24" fill="rgba(255,255,255,0.95)" aria-hidden>
              <path d="M12 2.25l2.92 6.51 7.08.65-5.36 4.72 1.6 6.98L12 17.77l-6.24 3.34 1.6-6.98L2 9.41l7.08-.65L12 2.25z" />
            </svg>
          </span>
        </span>

        <span
          style={{
            fontFamily: MONO,
            fontSize: 11.5,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.92)",
            whiteSpace: "nowrap",
          }}
        >
          Leave a review
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
