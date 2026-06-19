"use client";

import { useState } from "react";
import { LeaveReviewModal } from "./LeaveReviewModal";

const MONO = "var(--font-geist-mono), ui-monospace, monospace";

/**
 * OPTION C — Floating pill with '+' icon. Compact, universally
 * clear glyph, short label.
 */
export function LeaveReviewDockButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap"
          style={{
            fontFamily: MONO,
            fontSize: 8.5,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(0,240,255,0.85)",
          }}
        >
          Option C
        </span>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Leave a review"
          className="flex h-[48px] items-center gap-2 rounded-full outline-none transition-all hover:-translate-y-px"
          style={{
            padding: "0 16px 0 12px",
            background: "rgba(2,4,10,0.72)",
            backdropFilter: "blur(20px) saturate(160%)",
            WebkitBackdropFilter: "blur(20px) saturate(160%)",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 24px rgba(0,0,0,0.55)",
          }}
        >
          <span
            aria-hidden
            className="grid place-items-center rounded-full"
            style={{
              width: 22,
              height: 22,
              background: "rgba(0,240,255,0.12)",
              border: "1px solid rgba(0,240,255,0.45)",
              color: "#00F0FF",
              fontSize: 16,
              lineHeight: 1,
              fontWeight: 300,
              boxShadow: "0 0 10px rgba(0,240,255,0.30)",
            }}
          >
            +
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
            Review
          </span>
        </button>
      </div>

      <LeaveReviewModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
