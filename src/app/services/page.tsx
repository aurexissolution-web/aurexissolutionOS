import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { servicesHub } from "@/data/services-hub";
import { ServicesShaderBackground } from "@/components/sections/services/ServicesShaderBackground";
import { ServicesMasthead } from "@/components/sections/services/ServicesMasthead";
import { ServicesAct } from "@/components/sections/services/ServicesAct";
import { ServicesInterlude } from "@/components/sections/services/ServicesInterlude";
import { ServicesColophon } from "@/components/sections/services/ServicesColophon";
import { EcosystemTopology } from "@/components/sections/services/visuals/EcosystemTopology";
import { AIWorkshop } from "@/components/sections/services/visuals/AIWorkshop";
import { WebGauge } from "@/components/sections/services/visuals/WebGauge";
import { MobilePhone } from "@/components/sections/services/visuals/MobilePhone";
import type { ServiceVisual } from "@/data/services-hub";
import type { ReactNode } from "react";

const VISUALS: Record<ServiceVisual, ReactNode> = {
  topology: <EcosystemTopology />,
  workshop: <AIWorkshop />,
  gauge: <WebGauge />,
  phone: <MobilePhone />,
};

export default function ServicesHubPage() {
  // Find the entries by act so we can drop the Interlude between Act II and Act III
  const actI = servicesHub.find((e) => e.act === "I")!;
  const actII = servicesHub.find((e) => e.act === "II")!;
  const actIII = servicesHub.find((e) => e.act === "III")!;
  const actIV = servicesHub.find((e) => e.act === "IV")!;

  return (
    <div className="min-h-screen bg-[var(--color-background,#030408)] text-white flex flex-col">
      <Navbar />
      <ServicesShaderBackground />

      <main className="flex-1 relative z-[2] w-full max-w-[1680px] mx-auto px-[6vw]">
        <ServicesMasthead />

        <ServicesAct entry={actI} visual={VISUALS[actI.visual]} />
        <ServicesAct entry={actII} visual={VISUALS[actII.visual]} />

        <ServicesInterlude />

        <ServicesAct entry={actIII} visual={VISUALS[actIII.visual]} />
        <ServicesAct entry={actIV} visual={VISUALS[actIV.visual]} />

        <ServicesColophon />
      </main>

      <Footer />
    </div>
  );
}
