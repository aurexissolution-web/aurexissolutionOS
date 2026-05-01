import Link from "next/link";
import { servicesHub, type ServiceHubEntry } from "@/data/services-hub";

// The detail-page route exists for these slugs (see src/app/services/[slug]/page.tsx).
// `ecosystem` doesn't have a detail page yet — link it to /contact instead.
const SLUGS_WITH_DETAIL: ReadonlySet<ServiceHubEntry["id"]> = new Set([
  "ai-automation",
  "web-engineering",
  "mobile-ecosystems",
]);

function detailHref(id: ServiceHubEntry["id"]): string {
  return SLUGS_WITH_DETAIL.has(id) ? `/services/${id}` : "/contact";
}

export function ServicesRoster() {
  return (
    <section>
      {servicesHub.map((entry) => (
        <RosterRow key={entry.id} entry={entry} />
      ))}
    </section>
  );
}

function RosterRow({ entry }: { entry: ServiceHubEntry }) {
  const colored = entry.titleColored;
  const before =
    colored && entry.title.startsWith(colored)
      ? ""
      : colored
        ? entry.title.slice(0, entry.title.indexOf(colored))
        : entry.title;
  const after = colored
    ? entry.title.slice(entry.title.indexOf(colored) + colored.length)
    : "";

  return (
    <Link
      href={detailHref(entry.id)}
      className="services-roster-row group relative grid items-center gap-7 lg:gap-10 py-9 lg:py-11 border-b border-white/[0.07]
                 grid-cols-[56px_1fr_auto] lg:grid-cols-[80px_1.2fr_1.5fr_1.6fr_auto]"
      style={{ ["--accent" as string]: entry.accent }}
    >
      {/* numeral */}
      <div
        className="font-serif italic font-normal text-[clamp(44px,5.2vw,84px)] leading-[0.85] tracking-[-0.04em] text-white"
        style={{ textShadow: "0 2px 22px rgba(0,0,0,0.4)" }}
      >
        {entry.index}
      </div>

      {/* title col */}
      <div>
        <div
          className="hidden lg:inline-flex items-center gap-2 mb-2.5 font-mono text-[10px] uppercase tracking-[0.32em]"
          style={{ color: entry.accent }}
        >
          <span
            className="w-[5px] h-[5px] rounded-full"
            style={{
              background: entry.accent,
              boxShadow: `0 0 10px color-mix(in srgb, ${entry.accent} 80%, transparent)`,
            }}
          />
          {entry.label}
        </div>
        <h2 className="font-serif italic font-normal text-[clamp(28px,3.6vw,56px)] leading-none tracking-[-0.025em] text-white">
          {before}
          {colored && (
            <em
              className="not-italic-fix"
              style={{
                fontStyle: "italic",
                backgroundImage: `linear-gradient(120deg, ${entry.accent}, color-mix(in srgb, ${entry.accent} 50%, white))`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {colored}
            </em>
          )}
          {after}
        </h2>
      </div>

      {/* pull */}
      <div className="hidden lg:block font-serif italic text-[clamp(15px,1.25vw,19px)] leading-[1.45] text-[#C4CCD9]">
        {entry.pull}
      </div>

      {/* outcomes */}
      <ul className="hidden lg:flex flex-col gap-1.5 list-none">
        {entry.outcomes.map((o) => (
          <li
            key={o}
            className="font-mono text-[11.5px] text-[#C4CCD9] leading-[1.55] flex items-baseline gap-2.5"
          >
            <span
              className="text-[18px] leading-none mt-px"
              style={{ color: entry.accent }}
            >
              ·
            </span>
            {o}
          </li>
        ))}
      </ul>

      {/* arrow */}
      <div
        className="services-roster-arrow w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-white/[0.14]
                   flex items-center justify-center font-serif italic text-[22px] lg:text-[26px] text-[#8E96A6]
                   transition-all duration-[350ms] ease-[cubic-bezier(.2,.7,.2,1)]
                   group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
        style={{ ["--accent" as string]: entry.accent }}
      >
        →
      </div>
    </Link>
  );
}
