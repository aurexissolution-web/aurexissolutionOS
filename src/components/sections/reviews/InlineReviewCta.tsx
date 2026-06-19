"use client";

import { useState } from "react";
import { LeaveReviewModal } from "./LeaveReviewModal";

const MONO = "var(--font-geist-mono), ui-monospace, monospace";
const SERIF = "var(--font-instrument-serif), ui-serif, Georgia, serif";

type Variant = "header" | "tail";

/**
 * Inline CTA placed inside the Trusted-by section. Two visual variants:
 *   - 'header' (OPTION A) — small pill above the marquee
 *   - 'tail'   (OPTION B) — editorial endnote below the marquee
 */
export function InlineReviewCta({ variant }: { variant: Variant }) {
  const [open, setOpen] = useState(false);

  if (variant === "header") {
    return (
      <>
        <div className="flex flex-col items-center gap-1">
          <span
            style={{
              fontFamily: MONO,
              fontSize: 8.5,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "rgba(0,240,255,0.85)",
            }}
          >
            Option A · Header
          </span>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.02] px-5 py-2.5 transition-all hover:border-[#00F0FF]/40 hover:bg-[#00F0FF]/[0.06]"
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.92)",
            }}
          >
            <span aria-hidden style={{ color: "#FBBF24" }}>★</span>
            Share your experience
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
          </button>
        </div>

        <LeaveReviewModal open={open} onClose={() => setOpen(false)} />
      </>
    );
  }

  // tail variant — editorial endnote below the marquee
  return (
    <>
      <div className="flex flex-col items-center gap-3 px-6">
        <span
          style={{
            fontFamily: MONO,
            fontSize: 8.5,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(0,240,255,0.85)",
          }}
        >
          Option B · Tail
        </span>
        <div className="flex items-center gap-4">
          <span aria-hidden className="h-px w-12 bg-white/15" />
          <span
            style={{
              fontFamily: SERIF,
              fontStyle: "italic",
              fontSize: 17,
              color: "rgba(255,255,255,0.60)",
            }}
          >
            Worked with us?
          </span>
          <span aria-hidden className="h-px w-12 bg-white/15" />
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-black transition-all hover:bg-white/90"
          style={{
            fontFamily: MONO,
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <span aria-hidden>★</span>
          Share your experience
        </button>
      </div>

      <LeaveReviewModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
