"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

const tech = [
  {
    name: "Supabase",
    color: "#3ECF8E",
    icon: (
      <svg viewBox="0 0 109 113" fill="none" className="w-5 h-5 flex-shrink-0">
        <path d="M63.7 110.284C60.5 114.453 53.8 112.217 53.8 107.022V60.3H4.3C-.7 60.3-1.6 53.8 2.8 51L45.8 2.7C49-1.47 55.7.77 55.7 5.96V52.6H105.2C110.2 52.6 111.1 59.1 106.7 61.9L63.7 110.284Z" fill="url(#supa-a)" />
        <defs>
          <linearGradient id="supa-a" x1="53.974" y1="2.178" x2="53.974" y2="113" gradientUnits="userSpaceOnUse">
            <stop stopColor="#249361" /><stop offset="1" stopColor="#3ECF8E" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "GitHub",
    color: "#E6EDF3",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5 flex-shrink-0">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    name: "Bun",
    color: "#FBF0DF",
    icon: (
      <svg viewBox="0 0 800 820" fill="none" className="w-5 h-5 flex-shrink-0">
        <ellipse cx="400" cy="490" rx="380" ry="320" fill="#FBF0DF" />
        <ellipse cx="400" cy="390" rx="280" ry="220" fill="#F6DECE" />
        <circle cx="280" cy="370" r="30" fill="#1C1C1C" />
        <circle cx="520" cy="370" r="30" fill="#1C1C1C" />
        <path d="M320 440 Q400 490 480 440" stroke="#1C1C1C" strokeWidth="16" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    name: "Next.js",
    color: "#FFFFFF",
    icon: (
      <svg viewBox="0 0 180 180" fill="none" className="w-5 h-5 flex-shrink-0">
        <mask id="next-mask" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
          <circle cx="90" cy="90" r="90" fill="black" />
        </mask>
        <g mask="url(#next-mask)">
          <circle cx="90" cy="90" r="90" fill="black" />
          <path d="M149.508 157.52L69.142 54H54V125.97H66.1V69.3L139.716 164.093C143.12 162.078 146.377 159.904 149.508 157.52Z" fill="url(#next-grad)" />
          <rect x="115" y="54" width="12" height="72" fill="white" />
          <defs>
            <linearGradient id="next-grad" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" /><stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </g>
      </svg>
    ),
  },
  {
    name: "Vercel",
    color: "#FFFFFF",
    icon: (
      <svg viewBox="0 0 116 100" fill="white" className="w-5 h-5 flex-shrink-0">
        <path d="M57.5 0L115 100H0L57.5 0z" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    color: "#3178C6",
    icon: (
      <svg viewBox="0 0 400 400" fill="none" className="w-5 h-5 flex-shrink-0">
        <rect width="400" height="400" rx="50" fill="#3178C6" />
        <path d="M87.7 242v35.7c5.8 3 12.7 5.2 20.6 6.5 7.9 1.3 16.3 2 25.2 2 8.6 0 16.8-.8 24.5-2.5 7.7-1.7 14.5-4.6 20.2-8.6 5.7-4 10.2-9.3 13.5-15.8 3.3-6.5 5-14.6 5-24.2 0-6.9-1-13-3.1-18.1-2.1-5.1-5-9.7-8.9-13.6-3.9-3.9-8.5-7.4-14-10.5-5.5-3.1-11.6-6-18.4-8.7-5-2.1-9.5-4.1-13.4-6.1-3.9-2-7.2-4-10-6.1-2.8-2.1-4.9-4.3-6.4-6.6-1.5-2.3-2.2-4.9-2.2-7.9 0-2.7.6-5.1 1.9-7.2 1.3-2.1 3.1-3.9 5.5-5.3 2.4-1.4 5.3-2.5 8.7-3.2 3.4-.7 7.2-1.1 11.3-1.1 3 0 6.2.2 9.5.7 3.3.5 6.7 1.2 10 2.1 3.3.9 6.5 2.1 9.5 3.5 3 1.4 5.7 3.1 8.1 5v-33.3c-5.2-2-10.9-3.4-17.1-4.3-6.2-.9-13.3-1.4-21.3-1.4-8.5 0-16.6.9-24.1 2.7-7.5 1.8-14.1 4.7-19.7 8.7-5.6 4-10 9.1-13.2 15.3-3.2 6.2-4.8 13.7-4.8 22.4 0 11.1 3.2 20.6 9.6 28.4 6.4 7.8 16.2 14.4 29.3 19.9 5.2 2.1 10.1 4.2 14.6 6.3 4.5 2.1 8.4 4.3 11.7 6.7 3.3 2.4 5.9 5 7.8 7.9 1.9 2.9 2.8 6.2 2.8 10 0 2.6-.6 5-1.7 7.2-1.1 2.2-2.9 4.2-5.2 5.8-2.3 1.6-5.2 2.9-8.7 3.8-3.5.9-7.5 1.3-12 1.3-7.8 0-15.6-1.4-23.2-4.1-7.6-2.7-14.6-6.9-21-12.4z" fill="white" />
        <path d="M314.1 85.7H214v28.3h36.7V308h34.6V114h29V85.7z" fill="white" />
      </svg>
    ),
  },
  {
    name: "Tailwind",
    color: "#38BDF8",
    icon: (
      <svg viewBox="0 0 248 31" fill="none" className="w-7 h-4 flex-shrink-0">
        <path d="M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.94.482 3.328 1.882 4.861 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.146-2.551 3.382-5.528 4.65-8.93 3.805-1.94-.482-3.328-1.882-4.861-3.432C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.931-3.805 1.94.482 3.328 1.882 4.861 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.146-2.551 3.382-5.528 4.65-8.93 3.805-1.94-.482-3.328-1.882-4.861-3.432-2.503-2.524-5.398-5.445-11.723-5.445z" fill="#38BDF8" />
      </svg>
    ),
  },
  {
    name: "React",
    color: "#61DAFB",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 flex-shrink-0">
        <circle cx="12" cy="12" r="2.139" fill="#61DAFB" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
];

export function TechStackMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
  };
  const handleLeave = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "running";
  };

  return (
    <section className="relative py-14 bg-[#02040A] overflow-hidden border-y border-white/[0.04]">
      {/* Edge shimmer lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Heading */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.25em] uppercase text-[#94A3B8]">
          <span className="w-12 h-px bg-gradient-to-r from-transparent to-white/20 inline-block" />
          Powered by
          <span className="w-12 h-px bg-gradient-to-l from-transparent to-white/20 inline-block" />
        </span>
      </motion.div>

      {/* Gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#02040A] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#02040A] to-transparent pointer-events-none" />

      {/* Track: pure CSS transform — runs fully on the GPU compositor thread */}
      <div className="overflow-hidden" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
        <div
          ref={trackRef}
          className="flex gap-4 w-max marquee-track"
        >
          {[...tech, ...tech].map((item, i) => (
            <div
              key={i}
              className="tech-card flex items-center gap-3 px-6 py-3 rounded-full border border-white/[0.06] cursor-pointer select-none"
              // CSS custom property drives glow colour without JS
              style={{ "--glow": item.color } as React.CSSProperties}
            >
              {item.icon}
              <span className="text-sm font-semibold text-[#94A3B8] whitespace-nowrap tech-label">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* Compositor-only translate — no layout or paint cost */
        @keyframes marquee {
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 28s linear infinite;
          will-change: transform;
        }

        /* All hover effects are pure CSS so React never re-renders on hover */
        .tech-card {
          background: rgba(9, 9, 11, 0.5);
          transition:
            border-color 0.25s,
            background 0.25s,
            box-shadow 0.25s,
            transform 0.25s;
        }
        .tech-card:hover {
          transform: translateY(-3px) scale(1.05);
          border-color: color-mix(in srgb, var(--glow) 30%, transparent);
          background: radial-gradient(ellipse at center, color-mix(in srgb, var(--glow) 10%, transparent) 0%, rgba(9,9,11,0.85) 70%);
          box-shadow:
            0 0 22px color-mix(in srgb, var(--glow) 20%, transparent),
            0 0 6px  color-mix(in srgb, var(--glow) 12%, transparent);
        }
        .tech-label {
          transition: color 0.25s;
        }
        .tech-card:hover .tech-label {
          color: var(--glow);
        }
      `}</style>
    </section>
  );
}
