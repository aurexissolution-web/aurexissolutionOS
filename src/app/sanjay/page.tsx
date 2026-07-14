import type { Metadata, Viewport } from "next";
import { founderCard, SITE_URL, IS_PRODUCTION } from "@/data/founder-card";
import { FounderCardBackground } from "@/components/founder-card/FounderCardBackground";
import { FounderHero } from "@/components/founder-card/FounderHero";
import { Capabilities } from "@/components/founder-card/Capabilities";
import { OwnershipPanel } from "@/components/founder-card/OwnershipPanel";
import { ConnectSection } from "@/components/founder-card/ConnectSection";
import { FounderFooter } from "@/components/founder-card/FounderFooter";

const DESCRIPTION =
  "Connect with Sanjay Gunabalan, Founder & CEO of Aurexis Solution. Aurexis helps growing businesses reduce manual work, improve visibility and operate with greater control.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Sanjay Gunabalan | Founder & CEO, Aurexis Solution",
  description: DESCRIPTION,
  alternates: { canonical: founderCard.cardPath },
  // index/follow only on the confirmed production host; noindex everywhere else.
  robots: IS_PRODUCTION
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: {
    type: "profile",
    title: "Sanjay Gunabalan | Founder & CEO, Aurexis Solution",
    description: DESCRIPTION,
    url: founderCard.cardPath,
    siteName: "Aurexis Solution",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanjay Gunabalan | Founder & CEO, Aurexis Solution",
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#050709",
  colorScheme: "dark",
};

function structuredData() {
  const portraitUrl = founderCard.portrait
    ? `${SITE_URL}${founderCard.portrait}`
    : undefined;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${founderCard.cardUrl}#person`,
      name: founderCard.name,
      givenName: founderCard.firstName,
      familyName: founderCard.lastName,
      jobTitle: founderCard.title,
      url: founderCard.cardUrl,
      ...(portraitUrl ? { image: portraitUrl } : {}),
      email: `mailto:${founderCard.email}`,
      telephone: founderCard.phoneLink,
      worksFor: { "@id": `${SITE_URL}#organization` },
      address: { "@type": "PostalAddress", addressCountry: "MY" },
      ...(founderCard.linkedinIsPersonal ? { sameAs: [founderCard.linkedin] } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: founderCard.company,
      url: SITE_URL,
      logo: `${SITE_URL}/brand/aurexis-logo-transparent.png`,
      description: founderCard.positioning,
      email: founderCard.email,
      areaServed: ["Malaysia", "Singapore"],
      founder: { "@id": `${founderCard.cardUrl}#person` },
      sameAs: ["https://www.linkedin.com/company/aurexissolution/"],
    },
  ];
}

/** A section wrapper that applies a subtle, staggered one-time load reveal
 * (disabled entirely under prefers-reduced-motion via the .fc-rise rule). */
function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`fc-rise ${className ?? ""}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function SanjayFounderCardPage() {
  return (
    <>
      <div className="fc-page">
        <FounderCardBackground />
        <main className="fc-root fc-main relative z-10">
          <FounderHero />
          <div className="fc-content-shell">
            <Reveal delay={80} className="fc-section fc-capabilities-section">
              <Capabilities />
            </Reveal>
            <Reveal delay={140} className="fc-section fc-ownership-section">
              <OwnershipPanel />
            </Reveal>
            <Reveal delay={200} className="fc-section fc-connect-section">
              <ConnectSection />
            </Reveal>
            <Reveal delay={240}>
              <FounderFooter />
            </Reveal>
          </div>
        </main>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
      />
    </>
  );
}
