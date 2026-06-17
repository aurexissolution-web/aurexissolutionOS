import Link from "next/link";
import type { LabNote } from "@/data/lab-notes";
import { PILLAR_LABELS } from "@/data/lab-explorations";

const CYAN = "#00F0FF";

export function LabNoteCard({ note }: { note: LabNote }) {
  return (
    <Link
      href={note.href}
      className="group relative bg-[#02030A] p-8 lg:p-9 flex flex-col gap-4 transition-colors duration-300 hover:bg-white/[0.015]"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-white/45">
          {note.date}
        </span>
        <span
          className="font-mono text-[10px] uppercase tracking-[0.28em]"
          style={{ color: CYAN }}
        >
          {PILLAR_LABELS[note.pillar]}
        </span>
      </div>

      <h3 className="font-serif italic font-normal text-[clamp(22px,1.85vw,28px)] leading-[1.18] tracking-[-0.018em] text-white mt-2">
        {note.title}
      </h3>

      <p className="font-serif italic text-[14.5px] leading-[1.55] text-[#A4ABB8] flex-1">
        {note.excerpt}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-white/[0.08] mt-2">
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
          <span aria-hidden>⏱</span>
          <span>{note.readTime}</span>
          <span className="text-white/15" aria-hidden>
            ·
          </span>
          <span aria-hidden>🗓</span>
          <span>{note.when}</span>
        </div>
        <span
          aria-hidden
          className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-white/[0.16] text-white/55 transition-all duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px] group-hover:border-[var(--color-electric-cyan)]/55 group-hover:text-[var(--color-electric-cyan)]"
        >
          →
        </span>
      </div>
    </Link>
  );
}
