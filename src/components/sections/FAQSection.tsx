"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Category = "all" | "ai" | "web" | "app" | "ecosystem";

type FAQ = {
  id: string;
  category: Exclude<Category, "all">;
  q: string;
  a: string;
};

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

const categories: Array<{ id: Category; label: string }> = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI Automation" },
  { id: "web", label: "Web" },
  { id: "app", label: "App" },
  { id: "ecosystem", label: "Ecosystem" },
];

const CATEGORY_LABEL: Record<Exclude<Category, "all">, string> = {
  ai: "AI AUTOMATION",
  web: "WEB",
  app: "APP",
  ecosystem: "ECOSYSTEM",
};

const CATEGORY_HUMAN: Record<Exclude<Category, "all">, string> = {
  ai: "AI automation",
  web: "your website",
  app: "your app",
  ecosystem: "the full ecosystem",
};

export function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [activeId, setActiveId] = useState<string>(faqs[0].id);
  const readerRef = useRef<HTMLDivElement>(null);

  const visibleFaqs =
    activeCategory === "all"
      ? faqs
      : faqs.filter((f) => f.category === activeCategory);

  const activeFaq = faqs.find((f) => f.id === activeId) ?? faqs[0];
  const visibleIdx = visibleFaqs.findIndex((f) => f.id === activeFaq.id);
  const counterIdx = visibleIdx >= 0 ? visibleIdx + 1 : 1;
  const counterTotal = visibleFaqs.length;

  const groups = visibleFaqs.reduce<
    Array<{
      cat: Exclude<Category, "all">;
      items: { faq: FAQ; idx: number }[];
    }>
  >((acc, faq, i) => {
    const item = { faq, idx: i + 1 };
    const last = acc[acc.length - 1];
    if (last && last.cat === faq.category) last.items.push(item);
    else acc.push({ cat: faq.category, items: [item] });
    return acc;
  }, []);

  function selectCategory(cat: Category) {
    setActiveCategory(cat);
    if (cat !== "all") {
      const stillVisible = faqs.some(
        (f) => f.id === activeId && f.category === cat
      );
      if (!stillVisible) {
        const first = faqs.find((f) => f.category === cat);
        if (first) setActiveId(first.id);
      }
    }
  }

  function selectFaq(id: string) {
    setActiveId(id);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      requestAnimationFrame(() => {
        readerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  }

  return (
    <section className="bg-[var(--color-background)] pt-4 pb-10 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mx-auto max-w-3xl text-center mb-5"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.28em] text-white/40 mb-2">
            Frequently Asked
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.02em] leading-[1.05] text-white text-balance mb-3">
            Honest{" "}
            <em
              className="font-serif italic text-[var(--color-electric-cyan)] font-normal"
              style={{ filter: "drop-shadow(0 0 18px rgba(0,240,255,0.32))" }}
            >
              answers
            </em>
            . No marketing fluff.
          </h2>
          <p className="mx-auto max-w-xl text-[13px] md:text-[14px] leading-[1.5] text-white/55 text-balance">
            Filter by what you&apos;re solving. Click any question to read the
            full answer.
          </p>
        </motion.div>

        <div className="mx-auto max-w-6xl">
          <motion.div
            aria-hidden
            className="h-px w-20 mx-auto bg-[var(--color-electric-cyan)]/60 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />

          <div className="relative mt-6">
            <motion.div
              aria-hidden
              className="hidden lg:block absolute inset-y-0 left-0 w-px bg-[var(--color-electric-cyan)]/40 origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            />

            <div className="relative pl-0 lg:pl-10 grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-10 items-start">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="mb-5">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.28em] text-white/40 mb-2">
                    Filter
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {categories.map((cat) => {
                      const isActive = activeCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => selectCategory(cat.id)}
                          aria-pressed={isActive}
                          className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.22em] border transition-colors ${
                            isActive
                              ? "bg-[var(--color-electric-cyan)]/15 border-[var(--color-electric-cyan)]/45 text-white"
                              : "bg-white/[0.03] border-white/[0.08] text-white/55 hover:text-white/85 hover:border-white/[0.15]"
                          }`}
                        >
                          {cat.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <AnimatePresence mode="popLayout" initial={false}>
                    {groups.map((group, gi) => (
                      <motion.div
                        key={group.cat}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className={gi > 0 ? "mt-4" : ""}
                      >
                        <div className="flex items-baseline gap-3 text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.22em] text-white/85 mb-2">
                          <span
                            aria-hidden
                            className="text-[var(--color-electric-cyan)]/70 select-none"
                          >
                            ──
                          </span>
                          <span>{CATEGORY_LABEL[group.cat]}</span>
                        </div>
                        <div>
                          {group.items.map(({ faq, idx }) => {
                            const isActive = activeId === faq.id;
                            return (
                              <button
                                key={faq.id}
                                type="button"
                                onClick={() => selectFaq(faq.id)}
                                aria-pressed={isActive}
                                className="relative w-full text-left flex items-baseline gap-3 py-1 group/row"
                              >
                                {isActive && (
                                  <motion.span
                                    layoutId="faq-active-bar"
                                    aria-hidden
                                    className="hidden lg:block absolute -left-10 top-1 bottom-1 w-px bg-[var(--color-electric-cyan)]/70"
                                    transition={{
                                      type: "spring",
                                      stiffness: 400,
                                      damping: 32,
                                    }}
                                  />
                                )}
                                <span className="font-mono text-[10px] tracking-[0.22em] text-white/40 w-7 shrink-0 tabular-nums">
                                  {String(idx).padStart(2, "0")}
                                </span>
                                <span
                                  aria-hidden
                                  className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all ${
                                    isActive
                                      ? "bg-[var(--color-electric-cyan)] shadow-[0_0_8px_rgba(0,240,255,0.6)]"
                                      : "bg-white/30 group-hover/row:bg-white/55"
                                  }`}
                                />
                                <span
                                  className={`text-[13px] md:text-[14px] leading-snug truncate transition-colors ${
                                    isActive
                                      ? "text-white font-serif italic"
                                      : "text-white/55 group-hover/row:text-white/85"
                                  }`}
                                >
                                  {faq.q}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>

              <motion.div
                ref={readerRef}
                className="relative lg:sticky lg:top-24 lg:self-start lg:min-h-[340px]"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-6 -right-6 w-64 h-64 rounded-full bg-[var(--color-electric-cyan)]/15 blur-3xl -z-10"
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFaq.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <div className="font-mono text-[11px] tracking-[0.22em] text-white/45 mb-3">
                      Q.{String(counterIdx).padStart(2, "0")} ·{" "}
                      {CATEGORY_LABEL[activeFaq.category]}
                    </div>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-[-0.02em] leading-[1.15] text-white text-balance">
                      {activeFaq.q}
                    </h3>
                    <motion.div
                      aria-hidden
                      className="h-px w-24 bg-[var(--color-electric-cyan)]/60 origin-left mt-4 mb-4"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                    />
                    <p className="text-[14px] md:text-[15px] leading-[1.65] text-white/70 max-w-[60ch]">
                      {activeFaq.a}
                    </p>
                    <Link
                      href={`/contact?topic=${activeFaq.category}`}
                      className="group inline-flex items-center gap-2 mt-5 text-[13px] text-white/55 hover:text-white transition-colors"
                    >
                      Talk to us about {CATEGORY_HUMAN[activeFaq.category]}
                      <ArrowRight className="w-3.5 h-3.5 text-[var(--color-electric-cyan)] transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>

          <motion.div
            aria-hidden
            className="h-px w-20 mx-auto bg-[var(--color-electric-cyan)]/60 origin-left mt-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.9 }}
          />

          <motion.div
            className="mt-4 lg:mt-5 flex flex-col sm:flex-row items-center sm:items-baseline justify-between gap-3"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: 1 }}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40 tabular-nums">
              Q.{String(counterIdx).padStart(2, "0")} / Q.
              {String(counterTotal).padStart(2, "0")}
            </span>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 text-[14px] text-white/55 hover:text-white transition-colors"
            >
              Still have questions? Talk to us
              <ArrowRight className="w-3.5 h-3.5 text-[var(--color-electric-cyan)] transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
