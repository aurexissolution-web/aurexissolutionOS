"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const criteria = [
  {
    id: "speed",
    num: "01",
    headline: "Speed is a strategy.",
    body: "You ship, then refine. You don't wait for perfect specs to come down from a committee. We're built for founders and operators who treat velocity as a competitive weapon.",
    tag: "Move fast. Ship faster.",
  },
  {
    id: "partner",
    num: "02",
    headline: "You want a partner, not a pair of hands.",
    body: "We push back when something won't work, bring strategy to every sprint, and care about your users as much as you do. We don't disappear after delivery.",
    tag: "Strategic. Opinionated. Invested.",
  },
  {
    id: "automation",
    num: "03",
    headline: "You're done doing things manually.",
    body: "You see AI and automation for what they really are — a permanent lever on your capacity. You want an infrastructure that learns, adapts, and scales without you babysitting it.",
    tag: "Leverage over labor.",
  },
];

export function CulturalFit() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section className="container mx-auto px-6 max-w-7xl mb-0 pt-8">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="h-px w-10 bg-[#00F0FF]" />
          <p className="text-xs font-semibold tracking-[0.35em] text-[#00F0FF] uppercase">
            The Right Fit
          </p>
        </div>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-5xl md:text-7xl font-medium text-white tracking-tight leading-[1.05] mb-12"
      >
        We're built for
        <br />
        <span className="text-neutral-600">a certain kind of client.</span>
      </motion.h3>

      {/* Accordion rows */}
      <div className="relative">
        {/* Vertical rail */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-white/5" />

        {criteria.map((item, i) => {
          const isOpen = expanded === item.id;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Top border */}
              <div className="h-px bg-white/8" />

              <button
                onClick={() => setExpanded(isOpen ? null : item.id)}
                className="w-full text-left group pl-6 pr-4 py-6 md:py-8 flex items-start gap-8 md:gap-16 relative"
              >
                {/* Accent bar */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      exit={{ scaleY: 0 }}
                      transition={{ duration: 0.35, ease: "circOut" }}
                      className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#00F0FF] origin-top"
                    />
                  )}
                </AnimatePresence>

                {/* Number */}
                <span
                  className={`font-mono text-sm shrink-0 mt-1 transition-colors duration-300 ${
                    isOpen ? "text-[#00F0FF]" : "text-white/20"
                  }`}
                >
                  {item.num}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-6">
                    <h4
                      className={`text-2xl md:text-4xl font-medium tracking-tight leading-snug transition-colors duration-300 ${
                        isOpen ? "text-white" : "text-white/50"
                      }`}
                    >
                      {item.headline}
                    </h4>

                    {/* Plus / minus */}
                    <div
                      className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 mt-2 ${
                        isOpen
                          ? "border-[#00F0FF]/50 bg-[#00F0FF]/10"
                          : "border-white/10 bg-transparent"
                      }`}
                    >
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`text-lg leading-none ${isOpen ? "text-[#00F0FF]" : "text-white/40"}`}
                      >
                        +
                      </motion.span>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-[#94A3B8] text-lg font-light leading-relaxed mt-5 max-w-2xl">
                          {item.body}
                        </p>
                        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-xs font-semibold tracking-widest text-white/50 uppercase">
                          {item.tag}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </button>
            </motion.div>
          );
        })}

        {/* Bottom border */}
        <div className="h-px bg-white/8" />
      </div>
    </section>
  );
}
