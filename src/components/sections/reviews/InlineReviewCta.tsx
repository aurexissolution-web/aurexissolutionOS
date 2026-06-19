"use client";

import { useState } from "react";
import { LeaveReviewModal } from "./LeaveReviewModal";

const MONO = "var(--font-geist-mono), ui-monospace, monospace";
const SERIF = "var(--font-instrument-serif), ui-serif, Georgia, serif";

/**
 * Editorial endnote CTA placed below the reviews marquee.
 * 'Worked with us? — Share your experience' pattern.
 */
export function InlineReviewCta() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center gap-3 px-6">
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
