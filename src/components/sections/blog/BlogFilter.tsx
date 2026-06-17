"use client";

import { useStickyFilter } from "@/components/sections/blog/shared/useStickyFilter";
import { BLOG_CATEGORIES } from "@/data/blog-articles";
import { cn } from "@/lib/utils";

const TABS = ["All", ...BLOG_CATEGORIES] as const;
export type BlogFilterValue = (typeof TABS)[number];

type Props = {
  active: BlogFilterValue;
  onChange: (v: BlogFilterValue) => void;
};

export function BlogFilter({ active, onChange }: Props) {
  const { sentinelRef, isPinned } = useStickyFilter();

  return (
    <>
      <div ref={sentinelRef} aria-hidden className="h-px" />
      <div
        className={cn(
          "sticky top-0 z-30 transition-all duration-300",
          isPinned
            ? "bg-black/80 backdrop-blur-md border-b border-white/[0.10]"
            : "bg-transparent border-b border-white/[0.10]"
        )}
      >
        <div className="mx-auto max-w-[1180px] px-6 lg:px-10 py-5">
          <div className="flex items-center justify-between gap-4">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.32em] text-white/35 hidden lg:block">
              Filter by section
            </div>
            <div className="flex items-center gap-x-7 gap-y-2 flex-wrap">
              {TABS.map((tab) => {
                const isActive = tab === active;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => onChange(tab)}
                    className="group relative inline-flex items-center gap-2 py-1"
                  >
                    {isActive && (
                      <span
                        aria-hidden
                        className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-electric-cyan)]"
                        style={{ boxShadow: "0 0 8px rgba(0,240,255,0.65)" }}
                      />
                    )}
                    <span
                      className={cn(
                        "font-mono text-[11px] uppercase tracking-[0.20em] transition-colors duration-200",
                        isActive ? "text-white" : "text-white/45 hover:text-white/85"
                      )}
                    >
                      {tab}
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "absolute left-0 right-0 -bottom-0.5 h-px origin-center transition-transform duration-300",
                        isActive
                          ? "scale-x-100 bg-[var(--color-electric-cyan)]"
                          : "scale-x-0 bg-white/30 group-hover:scale-x-100"
                      )}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
