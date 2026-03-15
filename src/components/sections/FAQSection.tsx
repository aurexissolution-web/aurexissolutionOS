"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";
import { AnimatedBadge } from "@/components/ui/animated-badge";

const faqs = [
  {
    q: "What industries do you typically work with?",
    a: "We work across industries — SaaS, e-commerce, fintech, logistics, healthcare, and professional services. Our methodology is industry-agnostic: we diagnose the specific bottlenecks and engineer solutions tailored to your context, not a generic template.",
  },
  {
    q: "How long does a typical project take from start to launch?",
    a: "Most projects run 6–12 weeks depending on scope. A focused AI automation workflow can go live in as little as 3 weeks. A full-stack web platform with custom integrations typically takes 8–12 weeks. We'll give you a precise timeline in the Discovery phase.",
  },
  {
    q: "Do you offer post-launch support and maintenance?",
    a: "Yes. All projects include a 30-day post-launch support window as standard. For ongoing maintenance, performance monitoring, or iterative feature development, we offer monthly retainer packages tailored to your scale.",
  },
  {
    q: "How do you ensure the security of our data?",
    a: "Security is built into the stack from day one. We use end-to-end encryption, role-based access control, and deploy exclusively on enterprise-grade infrastructure (Vercel, Supabase, AWS). We never store sensitive client data beyond what is operationally necessary.",
  },
  {
    q: "Can you work with our existing tools and infrastructure?",
    a: "Absolutely. We integrate with your existing CRM, ERP, analytics stack, and communication tools. Before recommending any changes, we audit what you already have — often the best move is augmenting your current setup rather than replacing it.",
  },
  {
    q: "What does the pricing structure look like?",
    a: "We operate on transparent, project-based pricing — no retainers forced upfront, no hidden fees. Pricing is scoped after the Discovery Audit so you know exactly what you're getting before committing. Reach out and we'll share a detailed breakdown.",
  },
  {
    q: "Do I need to be technical to work with Aurexis?",
    a: "Not at all. We're built to serve founders and operators who want powerful technology without having to speak it fluently. We handle the full technical lifecycle and keep you informed in plain language at every stage.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <button
      onClick={() => setOpen((p) => !p)}
      className="group w-full text-left focus:outline-none"
      aria-expanded={open}
    >
      <div
        className="relative rounded-2xl border transition-all duration-400"
        style={{
          borderColor: open ? "rgba(0,240,255,0.2)" : "rgba(255,255,255,0.06)",
          background: open
            ? "linear-gradient(135deg, rgba(0,240,255,0.04) 0%, rgba(255,255,255,0.02) 100%)"
            : "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: open
            ? "0 0 0 1px rgba(0,240,255,0.06), inset 0 1px 0 rgba(255,255,255,0.05)"
            : "0 0 0 1px rgba(255,255,255,0.02), inset 0 1px 0 rgba(255,255,255,0.03)",
        }}
      >
        {/* Question row */}
        <div className="flex items-center justify-between gap-4 px-5 py-4">
          <span
            className="text-[15px] font-medium transition-colors duration-300 text-left"
            style={{ color: open ? "#ffffff" : "rgba(255,255,255,0.75)" }}
          >
            {q}
          </span>

          {/* +/- button */}
          <span
            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-400"
            style={{
              borderColor: open ? "rgba(0,240,255,0.5)" : "rgba(255,255,255,0.1)",
              background: open ? "rgba(0,240,255,0.12)" : "rgba(255,255,255,0.03)",
              boxShadow: open ? "0 0 16px rgba(0,240,255,0.2)" : "none",
              transform: open ? "rotate(45deg)" : "rotate(0deg)",
              transitionDuration: "350ms",
            }}
          >
            <Plus
              className="w-3.5 h-3.5 transition-colors duration-300"
              style={{ color: open ? "#00F0FF" : "rgba(255,255,255,0.45)" }}
            />
          </span>
        </div>

        {/* Answer */}
        <div
          className="overflow-hidden transition-all"
          style={{
            maxHeight: open ? "300px" : "0px",
            transitionDuration: "400ms",
            transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <div className="px-5 pb-5">
            <div className="h-px w-full mb-4" style={{ background: "rgba(0,240,255,0.08)" }} />
            <p className="text-[14px] text-neutral-400 leading-relaxed text-left">
              {a}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}

export function FAQSection() {
  return (
    <section className="py-20 bg-[#000000] border-t border-white/[0.04]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">

          {/* Left panel */}
          <div className="lg:col-span-2 flex flex-col gap-6 lg:sticky lg:top-24 self-start">
            <AnimatedBadge text="FAQ's" color="#00F0FF" />

            <div>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-white leading-[1.08] mt-2">
                Frequently<br />
                <span className="text-[#2a2a2a]">Asked Questions</span>
              </h2>
            </div>

            <p className="text-[15px] text-neutral-500 leading-relaxed max-w-xs">
              Still have questions? Feel free to reach out to our team directly.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center w-fit px-6 py-3 rounded-full text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #00F0FF 0%, rgba(0,240,255,0.7) 100%)",
                boxShadow: "0 0 24px rgba(0,240,255,0.25)",
              }}
            >
              Email us
            </Link>
          </div>

          {/* Right accordion */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
