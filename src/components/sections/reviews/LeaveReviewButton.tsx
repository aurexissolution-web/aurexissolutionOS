"use client";

import { useState } from "react";
import { LeaveReviewModal } from "./LeaveReviewModal";

const MONO = "var(--font-geist-mono), ui-monospace, monospace";

export function LeaveReviewButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.02] px-5 py-2.5 transition-all hover:border-[#00F0FF]/40 hover:bg-[#00F0FF]/[0.06]"
        style={{
          fontFamily: MONO,
          fontSize: 11,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.85)",
        }}
      >
        <span
          aria-hidden
          className="inline-block h-1.5 w-1.5 rounded-full transition-all"
          style={{
            background: "#00F0FF",
            boxShadow: "0 0 8px rgba(0,240,255,0.7)",
          }}
        />
        Leave a review
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </button>

      <LeaveReviewModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
