"use client";

import { motion } from "framer-motion";

const shifts = [
  {
    number: "01",
    label: "Labor",
    stat: "Wages climbing 8%/year",
    body: "Malaysia's minimum wage hit RM 1,700+ in 2025. Your headcount cost trajectory is no longer matching your revenue trajectory.",
  },
  {
    number: "02",
    label: "Tools",
    stat: "Your tools don't talk to each other",
    body: "Sales lives in HubSpot. Ops in Notion. Finance in spreadsheets. You're paying humans to be the integration layer.",
  },
  {
    number: "03",
    label: "Compliance",
    stat: "LHDN, PDPA, SST — rules tightening",
    body: "Every quarter brings new reporting, new data-handling rules, new audit surfaces. Manual compliance is a ticking liability.",
  },
];

export function TheShift() {
  return (
    <section className="bg-[var(--color-background)] pt-12 pb-16 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mx-auto max-w-3xl text-center mb-14"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.28em] text-white/40 mb-5">
            The Shift
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.02em] leading-[1.05] text-white text-balance">
            You can&apos;t{" "}
            <em
              className="font-serif italic text-[var(--color-electric-cyan)] font-normal"
              style={{ filter: "drop-shadow(0 0 18px rgba(0,240,255,0.32))" }}
            >
              hire
            </em>{" "}
            your way out anymore.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 lg:divide-x lg:divide-white/[0.06]">
          {shifts.map((shift, i) => (
            <motion.article
              key={shift.number}
              className="px-0 py-8 lg:px-10 lg:py-0 lg:first:pl-0 lg:last:pr-0 border-b border-white/[0.06] lg:border-b-0 last:border-b-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
            >
              <div
                aria-hidden
                className="font-serif italic text-[64px] md:text-[88px] lg:text-[104px] leading-none text-white/10 mb-3 select-none"
              >
                {shift.number}
              </div>

              <div
                aria-hidden
                className="h-px w-10 bg-[var(--color-electric-cyan)]/60 mb-4"
              />

              <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55 mb-4">
                {shift.label}
              </div>

              <div
                className="font-serif italic text-[18px] md:text-[20px] leading-snug text-[var(--color-electric-cyan)] mb-4"
                style={{ filter: "drop-shadow(0 0 12px rgba(0,240,255,0.18))" }}
              >
                {shift.stat}
              </div>

              <p className="text-[15px] leading-[1.6] text-white/55 max-w-md">
                {shift.body}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.p
          className="mx-auto max-w-3xl text-center mt-16 text-lg md:text-xl lg:text-2xl text-white/65 leading-relaxed text-balance"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          You can&apos;t buy your way out with another SaaS subscription. You need a{" "}
          <em
            className="font-serif italic text-[var(--color-electric-cyan)] font-normal"
            style={{ filter: "drop-shadow(0 0 14px rgba(0,240,255,0.28))" }}
          >
            connected system.
          </em>
        </motion.p>
      </div>
    </section>
  );
}
