"use client";

import { motion, useReducedMotion } from "framer-motion";

const problems = [
  {
    number: "01",
    category: "Customer Journey",
    title: "Opportunities are scattered",
    body: "Leads arrive through websites, WhatsApp, email and social channels—but without one connected journey, follow-ups slow down and potential revenue disappears.",
  },
  {
    number: "02",
    category: "Operations",
    title: "Work depends on manual coordination",
    body: "Tasks, approvals, customer information and delivery updates live across different tools. Your team spends more time connecting the work than completing it.",
  },
  {
    number: "03",
    category: "Visibility",
    title: "Decisions arrive too late",
    body: "Business data is fragmented across spreadsheets and platforms, leaving leaders without a clear view of performance, priorities or what should happen next.",
  },
];

export function TheShift() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-[var(--color-background)] pt-12 pb-16 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mx-auto max-w-6xl text-center mb-14"
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: reduce ? 0 : 0.5 }}
        >
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.28em] text-white/40 mb-5">
            When Growth Outruns Your Systems
          </span>
          <h2 className="text-3xl md:text-5xl xl:text-[56px] font-extrabold tracking-[-0.02em] leading-[1.05] text-white">
            Your business is growing.
            <br />
            <span className="lg:whitespace-nowrap">
              Your systems are{" "}
              <em
                className="font-serif italic text-[var(--color-electric-cyan)] font-normal whitespace-nowrap"
                style={{ filter: "drop-shadow(0 0 18px rgba(0,240,255,0.32))" }}
              >
                falling behind
              </em>
              .
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 lg:divide-x lg:divide-white/[0.06]">
          {problems.map((item, i) => (
            <motion.article
              key={item.number}
              className="px-0 py-8 lg:px-10 lg:py-0 lg:first:pl-0 lg:last:pr-0 border-b border-white/[0.06] lg:border-b-0 last:border-b-0"
              initial={{ opacity: 0, y: reduce ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : i * 0.08, ease: "easeOut" }}
            >
              <div
                aria-hidden
                className="font-serif italic text-[64px] md:text-[88px] lg:text-[104px] leading-none text-white/[0.08] mb-3 select-none"
              >
                {item.number}
              </div>

              <motion.div
                aria-hidden
                className="h-px w-10 origin-left bg-[var(--color-electric-cyan)]/60 mb-4"
                initial={{ scaleX: reduce ? 1 : 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: reduce ? 0 : 0.5,
                  delay: reduce ? 0 : i * 0.08 + 0.22,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />

              <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55 mb-4">
                {item.category}
              </div>

              <h3
                className="font-serif italic text-[18px] md:text-[20px] leading-snug text-[var(--color-electric-cyan)] mb-4"
                style={{ filter: "drop-shadow(0 0 12px rgba(0,240,255,0.18))" }}
              >
                {item.title}
              </h3>

              <p className="text-[15px] leading-[1.6] text-white/70 max-w-md text-pretty">
                {item.body}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.p
          className="mx-auto max-w-none text-center mt-16 text-base md:text-lg xl:text-xl lg:whitespace-nowrap text-white/65 leading-relaxed text-balance"
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: reduce ? 0 : 0.5 }}
        >
          More disconnected tools will not solve a disconnected business. You need{" "}
          <em
            className="font-serif italic text-[var(--color-electric-cyan)] font-normal whitespace-nowrap"
            style={{ filter: "drop-shadow(0 0 14px rgba(0,240,255,0.28))" }}
          >
            one connected ecosystem
          </em>
          .
        </motion.p>
      </div>
    </section>
  );
}
