"use client";

import { useEffect, useId, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type Category = "ai" | "web" | "app" | "ecosystem";

type FAQ = {
  id: string;
  category: Category;
  q: string;
  a: string;
};

const EASE = [0.16, 1, 0.3, 1] as const;

const faqs: FAQ[] = [
  {
    id: "ai-1",
    category: "ai",
    q: "Which workflows can AI agents actually replace?",
    a: "Repetitive judgment calls — invoice categorization, lead qualification, support triage, data entry, content drafting. Anything where a human is reading inputs, applying rules, producing outputs. We don't replace strategy, creative work, or decisions that need human accountability.",
  },
  {
    id: "ai-2",
    category: "ai",
    q: "Do I need clean data first, or can you work with my mess?",
    a: "Most clients have messy data. We start there. Part of Build is normalizing what you have into a usable layer. We don't refuse to start because the spreadsheets are inconsistent.",
  },
  {
    id: "ai-3",
    category: "ai",
    q: "What happens when the AI gets it wrong?",
    a: "Every agent has fallback logic and human-in-the-loop checkpoints. Critical decisions route to a human approver. We log every agent action so you can audit and tune. Our SLA includes correcting mistakes within 24 hours.",
  },
  {
    id: "web-1",
    category: "web",
    q: "Why Next.js over Webflow or WordPress?",
    a: "Webflow is great for a brochure. WordPress is great until it isn't. Next.js gives you a real platform — real performance, real auth, real integrations — the things you'll need 6 months in. Plus you own the source.",
  },
  {
    id: "web-2",
    category: "web",
    q: "Do I get the source code? Can my team take over later?",
    a: "Yes — full source on Day 1, in your GitHub. Documented, type-safe, deployable to your own Vercel. If you want to take it in-house in year 2, you can.",
  },
  {
    id: "web-3",
    category: "web",
    q: "How do you handle SEO and performance?",
    a: "Lighthouse 90+ on every site we ship. Server-rendered, image-optimized, structured data, sitemap, OG tags — the full kit. SEO content strategy is separate (and can be part of the retainer).",
  },
  {
    id: "app-1",
    category: "app",
    q: "React Native or fully native?",
    a: "React Native for 90% of cases. One codebase, two platforms, ~70% the cost of fully native. We go native when you need device-specific performance — heavy AR, real-time video, advanced ML on-device.",
  },
  {
    id: "app-2",
    category: "app",
    q: "Who handles App Store and Play Store submission?",
    a: "We do. Apple developer account, screenshots, descriptions, review responses — the whole submission cycle. You hand us your branding; we hand you a live app.",
  },
  {
    id: "app-3",
    category: "app",
    q: "What if I just need an MVP?",
    a: "We have a 6-week MVP track for mobile. Core flow only, ships to TestFlight + Play internal track. RM 30–50k range. Good for validating an idea before committing to the full build.",
  },
  {
    id: "eco-1",
    category: "ecosystem",
    q: "What's the difference between buying one component vs the full ecosystem?",
    a: "Components are great if you have one acute pain point and the rest of your stack is solid. Ecosystem is when you want everything to talk to each other — your web, your app, your AI agents, your data. Higher upfront, but eliminates the integration tax forever.",
  },
  {
    id: "eco-2",
    category: "ecosystem",
    q: "Can we start with one layer and expand?",
    a: "Yes. Most clients start with Web or AI and add the others over 6–12 months. We design every component with future ecosystem expansion in mind, so adding Layer 2 doesn't mean rebuilding Layer 1.",
  },
  {
    id: "eco-3",
    category: "ecosystem",
    q: "Why a retainer? What does it cover?",
    a: "The retainer is for what comes after launch — monitoring, optimization, new features, breaking-change updates, agent retraining. Software that ships isn't done. The retainer keeps your ecosystem alive and improving. Cancel any time.",
  },
];

function askAurexis() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("aurexis:open-chat"));
  }
}

function FAQRow({
  faq,
  idx,
  isOpen,
  onToggle,
  reduce,
  revealDelay,
}: {
  faq: FAQ;
  idx: number;
  isOpen: boolean;
  onToggle: () => void;
  reduce: boolean;
  revealDelay: number;
}) {
  const buttonId = useId();
  const panelId = useId();

  return (
    <motion.div
      className="faqx-row group relative"
      data-open={isOpen}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: EASE, delay: revealDelay }}
    >
      {/* active top hairline */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-electric-cyan)]/70 to-transparent opacity-0 transition-opacity duration-500",
          isOpen && "opacity-100"
        )}
      />
      {/* travelling signal along the bottom hairline */}
      <span aria-hidden className="faqx-signal" />

      <h3 className="m-0">
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className={cn(
            "grid w-full grid-cols-[40px_1fr_44px] items-center gap-4 py-6 text-left transition-colors duration-300 sm:grid-cols-[64px_1fr_48px] sm:gap-6 sm:py-8 lg:grid-cols-[88px_1fr_56px] lg:py-10",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-electric-cyan)]/60 focus-visible:ring-inset",
            isOpen && "faqx-row-active"
          )}
        >
          <span
            className={cn(
              "font-mono text-[11px] tracking-[0.2em] tabular-nums transition-colors duration-300 sm:text-[12px]",
              isOpen ? "text-[var(--color-electric-cyan)]" : "text-white/35"
            )}
          >
            {String(idx).padStart(2, "0")}
          </span>
          <span
            className={cn(
              "text-[19px] font-semibold leading-[1.25] tracking-[-0.01em] text-balance transition-colors duration-300 sm:text-[22px] lg:text-[28px] lg:leading-[1.2] xl:text-[30px]",
              isOpen ? "text-white" : "text-white/85 group-hover:text-white"
            )}
          >
            {faq.q}
          </span>
          <span
            aria-hidden
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center justify-self-end rounded-full border transition-all duration-300",
              isOpen
                ? "rotate-45 border-[var(--color-electric-cyan)]/60 text-[var(--color-electric-cyan)]"
                : "border-white/[0.14] text-white/50 group-hover:border-white/30 group-hover:text-white/80"
            )}
          >
            <Plus className="h-4 w-4" />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: reduce ? 1 : 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: reduce ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 8, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.35, ease: "easeOut", delay: reduce ? 0 : 0.06 }}
              className="relative grid grid-cols-1 gap-3 pb-8 pl-[40px] pr-[44px] sm:pl-[64px] sm:pr-[48px] lg:grid-cols-[88px_1fr] lg:gap-8 lg:pl-0 lg:pr-[56px]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -left-10 top-1/2 -z-10 h-40 w-64 -translate-y-1/2 rounded-full bg-[var(--color-electric-cyan)]/[0.07] blur-3xl"
              />
              <span aria-hidden className="hidden lg:block" />
              <p className="max-w-[68ch] text-[17px] leading-[1.7] text-white/65 sm:text-[18px]">
                {faq.a}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection() {
  const reduceMotion = useReducedMotion() ?? false;
  const [activeId, setActiveId] = useState<string | null>(faqs[0].id);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 1023px)").matches) {
      setActiveId(null);
    }
  }, []);

  function toggle(id: string) {
    setActiveId((current) => (current === id ? null : id));
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <section className="bg-[var(--color-background)] px-6 py-16 md:py-20">
      <style>{`
        .faqx-row::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
        }
        .faqx-signal {
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 64px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--color-electric-cyan), transparent);
          opacity: 0;
          pointer-events: none;
          transform: translateX(-64px);
        }
        .faqx-row:hover .faqx-signal,
        .faqx-row:focus-within .faqx-signal,
        .faqx-row[data-open="true"] .faqx-signal {
          animation: faqxSignal 750ms ease-out forwards;
        }
        @keyframes faqxSignal {
          0% { opacity: 1; transform: translateX(-64px); }
          85% { opacity: 1; }
          100% { opacity: 0; transform: translateX(calc(100% - 0px)); }
        }
        .faqx-row-active {
          background: linear-gradient(180deg, rgba(0, 240, 255, 0.05), rgba(0, 240, 255, 0) 60%);
        }
        @media (prefers-reduced-motion: reduce) {
          .faqx-signal { animation: none !important; opacity: 0 !important; }
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.3fr_1fr] md:items-end md:gap-10">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <span className="mb-3 inline-block text-[11px] font-semibold uppercase tracking-[0.28em] text-white/40">
              Frequently Asked
            </span>
            <h2 className="text-4xl font-extrabold leading-[1.02] tracking-[-0.02em] text-balance text-white md:text-6xl lg:text-7xl">
              Clear answers.{" "}
              <em
                className="font-serif italic text-[var(--color-electric-cyan)] font-normal"
                style={{ filter: "drop-shadow(0 0 22px rgba(0,240,255,0.32))" }}
              >
                Better decisions.
              </em>
            </h2>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
            className="md:text-right"
          >
            <p className="text-[15px] leading-[1.6] text-white/55 text-balance md:ml-auto md:max-w-sm">
              Practical answers about scope, delivery, ownership and what it
              is like to work with Aurexis.
            </p>
            <p className="mt-4 text-[13px] text-white/40">
              Can&apos;t find your question?{" "}
              <button
                type="button"
                onClick={askAurexis}
                className="rounded text-[13px] font-semibold text-[var(--color-electric-cyan)]/85 underline-offset-4 transition-colors hover:text-[var(--color-electric-cyan)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-electric-cyan)]/60"
              >
                Ask Aurexis →
              </button>
            </p>
          </motion.div>
        </div>

        <motion.div
          aria-hidden
          className="mt-10 h-px w-full origin-left bg-white/10 md:mt-14"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
        />

        <div>
          {faqs.map((faq, i) => (
            <FAQRow
              key={faq.id}
              faq={faq}
              idx={i + 1}
              isOpen={activeId === faq.id}
              onToggle={() => toggle(faq.id)}
              reduce={reduceMotion}
              revealDelay={reduceMotion ? 0 : 0.25 + i * 0.05}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
