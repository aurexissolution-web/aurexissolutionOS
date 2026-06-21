import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PILLARS, type PillarSlug } from "@/data/pillars";
import { SubFeatureHero } from "@/components/services/SubFeatureHero";
import { SubFeatureBody } from "@/components/services/SubFeatureBody";

const PILLAR_LABEL: Record<PillarSlug, string> = {
  "ai-automation": "AI Automation",
  "web-engineering": "Web Engineering",
  "mobile-ecosystems": "Mobile Ecosystems",
  "data-engineering": "Data Engineering",
};

export function generateStaticParams() {
  const out: { slug: string; feature: string }[] = [];
  for (const pillarSlug of Object.keys(PILLARS) as PillarSlug[]) {
    for (const item of PILLARS[pillarSlug].whatWeBuild.items) {
      out.push({ slug: pillarSlug, feature: item.detail.slug });
    }
  }
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; feature: string }>;
}): Promise<Metadata> {
  const { slug, feature } = await params;
  const p = PILLARS[slug as PillarSlug];
  if (!p) return { title: "Aurexis" };
  const item = p.whatWeBuild.items.find((it) => it.detail.slug === feature);
  if (!item) return { title: "Aurexis" };

  return {
    title: `${item.name} — ${PILLAR_LABEL[slug as PillarSlug]} · Aurexis`,
    description: item.detail.tagline,
  };
}

export default async function SubFeaturePage({
  params,
}: {
  params: Promise<{ slug: string; feature: string }>;
}) {
  const { slug, feature } = await params;
  const p = PILLARS[slug as PillarSlug];
  if (!p) notFound();

  const item = p.whatWeBuild.items.find((it) => it.detail.slug === feature);
  if (!item) notFound();

  const parentHref = `/services/${slug}`;
  const parentLabel = PILLAR_LABEL[slug as PillarSlug];

  return (
    <div
      className="min-h-screen flex flex-col text-white"
      style={{ backgroundColor: "#02030A" }}
    >
      <Navbar />

      <div
        aria-hidden
        className="fixed inset-0 z-[1] pointer-events-none mix-blend-overlay opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />

      <main className="flex-1 relative z-[2]">
        <SubFeatureHero pillar={p} item={item} parentHref={parentHref} parentLabel={parentLabel} />
        <SubFeatureBody pillar={p} item={item} parentHref={parentHref} parentLabel={parentLabel} />
      </main>

      <Footer />
    </div>
  );
}
