import { notFound } from "next/navigation";
import { servicesData, ServiceSlug } from "@/data/services";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import { ServiceHero } from "@/components/services/ServiceHero";
import { ServiceBeforeAfter } from "@/components/services/ServiceBeforeAfter";
import { ServiceTechStack } from "@/components/services/ServiceTechStack";
import { ServiceFeatures } from "@/components/services/ServiceFeatures";
import { ServiceProcess } from "@/components/services/ServiceProcess";
import { ServicePricing } from "@/components/services/ServicePricing";
import { ServiceFAQ } from "@/components/services/ServiceFAQ";
import { ServiceConversion } from "@/components/services/ServiceConversion";

export function generateStaticParams() {
  return [
    { slug: "ai-automation" },
    { slug: "web-engineering" },
    { slug: "mobile-ecosystems" },
  ];
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Validate slug against our known services
  if (!servicesData[slug as ServiceSlug]) {
    notFound();
  }

  const data = servicesData[slug as ServiceSlug];

  return (
    <div className="min-h-screen bg-[#02040A] flex flex-col">
      <Navbar />
      
      <main className="flex-1 w-full relative z-10">
        <ServiceHero data={data} />
        <ServiceTechStack data={data} />
        <ServiceBeforeAfter data={data} />
        <ServiceFeatures data={data} />
        <ServiceProcess data={data} />
        <ServicePricing data={data} />
        <ServiceFAQ data={data} />
        <ServiceConversion data={data} />
      </main>

      <Footer />
    </div>
  );
}
