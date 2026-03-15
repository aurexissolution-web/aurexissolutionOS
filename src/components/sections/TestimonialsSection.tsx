"use client";

import { cn } from "@/lib/utils";
import { TestimonialCard, TestimonialAuthor } from "@/components/ui/testimonial-card";
import { AnimatedBadge } from "@/components/ui/animated-badge";

const testimonials: Array<{ author: TestimonialAuthor; text: string; href?: string }> = [
  {
    author: {
      name: "Arjun Mehta",
      handle: "@arjun_builds",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    text: "Aurexis completely transformed our operations. Within 8 weeks we had a custom AI agent running 24/7 — our team's capacity effectively tripled overnight.",
  },
  {
    author: {
      name: "Priya Suresh",
      handle: "@priyauk_dev",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    },
    text: "The web platform they delivered scored 99 on Lighthouse out of the box. Our conversion rate went up 34% in the first month. Genuinely impressive engineering.",
  },
  {
    author: {
      name: "Zack Okonkwo",
      handle: "@zack_tech_kl",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    },
    text: "From discovery to app launch in under 10 weeks. The team at Aurexis doesn't just build — they think strategically about your business first and foremost.",
  },
  {
    author: {
      name: "Nurul Hakim",
      handle: "@nurul.digital",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    },
    text: "Our social media reach grew 280% in 3 months. The data-backed content strategy they built is something our in-house team could never have pulled off alone.",
  },
  {
    author: {
      name: "Marcus Chen",
      handle: "@marcuschen_io",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    },
    text: "Switching to Aurexis was the highest-ROI decision we made last year. The RAG pipeline they implemented for our support workflow cut resolution time by 65%.",
  },
  {
    author: {
      name: "Aisha Rahman",
      handle: "@aishar_founder",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
    text: "What sets them apart is the actual depth of thinking. Every decision — design, stack, architecture — is justified with real data. That's rare at this price point.",
  },
];

interface TestimonialsSectionProps {
  title?: string;
  description?: string;
  className?: string;
}

export function TestimonialsSection({
  title = "Trusted by founders & operators",
  description = "Real results from businesses that chose to build smarter.",
  className,
}: TestimonialsSectionProps) {
  return (
    <section
      className={cn(
        "relative py-20 bg-[#000000] border-t border-white/[0.04] overflow-hidden",
        className
      )}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-60 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,240,255,0.08)_0%,_transparent_70%)]" />
      </div>

      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-12 text-center">

        {/* Header */}
        <div className="flex flex-col items-center gap-4 px-6">
          <AnimatedBadge text="Client Results" color="#00F0FF" />
          <h2 className="max-w-[640px] text-3xl md:text-5xl font-medium tracking-tighter text-white leading-tight mt-2">
            {title}
          </h2>
          <p className="max-w-[520px] text-base text-neutral-500 font-light">
            {description}
          </p>
        </div>

        {/* Marquee track */}
        <div className="relative w-full flex flex-col items-center overflow-hidden">
          <div
            className="group flex overflow-hidden [--gap:1.25rem] [gap:var(--gap)] flex-row [--duration:45s]"
          >
            {/* Duplicated set × 4 for seamless loop */}
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
              {[...Array(4)].map((_, setIndex) =>
                testimonials.map((t, i) => (
                  <TestimonialCard key={`${setIndex}-${i}`} {...t} />
                ))
              )}
            </div>
          </div>

          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-black to-transparent z-10" />
        </div>
      </div>
    </section>
  );
}
