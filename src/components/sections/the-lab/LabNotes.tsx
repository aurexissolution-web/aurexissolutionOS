import { LabNoteCard } from "./LabNoteCard";
import type { LabNote } from "@/data/lab-notes";

export function LabNotes({ notes }: { notes: LabNote[] }) {
  if (notes.length === 0) return null;

  return (
    <section className="relative px-6 lg:px-12 py-20 md:py-32 border-t border-white/[0.08]">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid lg:grid-cols-12 gap-10 mb-12 md:mb-16 items-end">
          <div className="lg:col-span-7">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.32em] text-white/45 mb-6">
              ◆ Lab Notes
            </p>
            <h2 className="font-serif italic font-normal text-[clamp(40px,5.4vw,84px)] leading-[1.02] tracking-[-0.025em] text-white pb-[0.08em]">
              Behind the{" "}
              <em
                className="not-italic font-serif italic"
                style={{
                  backgroundImage:
                    "linear-gradient(110deg, #00F0FF 0%, #C4B5FD 95%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                  filter: "drop-shadow(0 0 24px rgba(0,240,255,0.22))",
                }}
              >
                build.
              </em>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="font-serif italic text-[clamp(16px,1.25vw,19px)] leading-[1.55] text-[#B6BCC8] max-w-[44ch]">
              Short writeups on how each exploration came together — what
              worked, what didn&apos;t, what we learned. Across web, app, AI,
              and ecosystems.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
          {notes.map((note) => (
            <LabNoteCard key={note.slug} note={note} />
          ))}
        </div>
      </div>
    </section>
  );
}
