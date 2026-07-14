import Image from "next/image";
import { MapPin } from "lucide-react";
import { founderCard } from "@/data/founder-card";
import { PrimaryActions } from "./PrimaryActions";

export function FounderHero() {
  return (
    <section className="fc-hero" aria-labelledby="founder-name">
      <div className="fc-hero-shell">
        <header className="fc-hero-logo fc-rise">
          <Image
            src="/brand/aurexis-logo-transparent.png"
            alt="Aurexis Solution"
            width={1546}
            height={368}
            priority
            sizes="(min-width: 768px) 190px, 142px"
            className="h-auto w-[142px] object-contain md:w-[190px]"
          />
        </header>

        <div className="fc-hero-portrait fc-rise" style={{ animationDelay: "70ms" }}>
          <span aria-hidden className="fc-hero-angle" />
          {founderCard.portrait ? (
            <Image
              src={founderCard.portrait}
              alt={`Portrait of ${founderCard.name}, ${founderCard.title} of ${founderCard.company}`}
              fill
              priority
              sizes="(min-width: 1200px) 610px, (min-width: 768px) 48vw, 280px"
              className="fc-hero-portrait-image object-cover"
            />
          ) : (
            <div className="fc-portrait-fallback" aria-hidden>
              {founderCard.initials}
            </div>
          )}
        </div>

        <div className="fc-hero-copy fc-rise" style={{ animationDelay: "120ms" }}>
          <p className="fc-eyebrow">
            <span>Founder-led</span>
            <span aria-hidden>•</span>
            <span>Business systems</span>
          </p>

          <h1 id="founder-name" className="fc-founder-name">
            <span>{founderCard.firstName}</span>
            <span>{founderCard.lastName}</span>
          </h1>

          <p className="fc-founder-role">
            <span>{founderCard.title}</span>
            <span aria-hidden className="fc-role-dot">•</span>
            <span>{founderCard.company}</span>
          </p>

          <p className="fc-founder-location">
            <MapPin aria-hidden className="h-[18px] w-[18px] shrink-0" strokeWidth={1.8} />
            <span>{founderCard.publicLocation}</span>
            <span aria-hidden className="fc-location-rule" />
            <span>Serving Malaysia &amp; Singapore</span>
          </p>

          <p className="fc-value-statement">
            Helping growing businesses cut operational waste, recover valuable time and create room for <span className="fc-value-emphasis">more profitable growth</span>.
          </p>

          <div className="fc-hero-actions">
            <PrimaryActions />
          </div>
        </div>
      </div>
    </section>
  );
}
