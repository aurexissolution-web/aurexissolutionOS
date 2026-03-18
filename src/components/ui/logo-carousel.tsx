"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export interface LogoItem {
  src: string;
  alt: string;
}

interface LogoCarouselProps {
  title?: string;
  logos: LogoItem[];
  autoPlayInterval?: number;
  itemsPerViewMobile?: number;
  itemsPerViewDesktop?: number;
  themeColor?: string;
}

export function LogoCarousel({
  title = "Powered By",
  logos,
  autoPlayInterval = 2500,
  itemsPerViewMobile = 3,
  themeColor = "#00F0FF",
}: LogoCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const timer = setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, autoPlayInterval);
    return () => clearTimeout(timer);
  }, [api, current, autoPlayInterval]);

  return (
    <div className="w-full py-16 bg-[#02040A] relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute inset-x-0 top-0 h-[300px] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${themeColor}10 0%, transparent 70%)`
        }}
      />

      {/* "POWERED BY" header */}
      <div className="flex items-center justify-center gap-4 mb-14 px-6 relative z-10">
        <div className="h-[1px] w-full max-w-[120px] bg-gradient-to-r from-transparent to-white/[0.08]" />
        <p
          className="text-[10px] font-mono tracking-[0.3em] font-semibold uppercase whitespace-nowrap select-none"
          style={{ color: themeColor }}
        >
          {title}
        </p>
        <div className="h-[1px] w-full max-w-[120px] bg-gradient-to-l from-transparent to-white/[0.08]" />
      </div>

      <div className="relative z-10">
        <Carousel
          setApi={setApi}
          opts={{ loop: true, align: "center", dragFree: true }}
          className="w-full"
        >
          <CarouselContent className="ml-0">
            {logos.map((logo, index) => (
              <CarouselItem
                key={index}
                className={`pl-4 basis-1/${itemsPerViewMobile} md:basis-1/5 lg:basis-[12.5%] xl:basis-[10%]`}
              >
                <div
                  className="group flex flex-col justify-between items-center py-6 px-4 rounded-2xl w-full aspect-[4/5]
                             border border-white/[0.04] bg-[#05060A] hover:bg-[#0A0C12]
                             transition-all duration-500 cursor-default relative overflow-hidden"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${themeColor}40`;
                    e.currentTarget.style.boxShadow = `0 10px 30px -10px ${themeColor}30, inset 0 0 20px -10px ${themeColor}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                  {/* Subtle top highlight on hover inside card */}
                  <div
                    className="absolute top-0 left-0 w-full h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, ${themeColor}80, transparent)` }}
                  />

                  {/* Icon */}
                  <div className="flex-1 flex items-center justify-center w-full relative h-9">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      className="object-contain opacity-40 group-hover:opacity-100 transition-all duration-500 filter grayscale group-hover:grayscale-0 group-hover:scale-110"
                      onError={(e) => {
                        // Fallback square if image fails to load
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.parentElement?.querySelector('.fallback-icon');
                        if (fallback) (fallback as HTMLElement).style.display = 'flex';
                      }}
                    />
                    {/* Fallback box that matches screenshot */}
                    <div className="fallback-icon hidden w-8 h-8 rounded border border-white/20 items-center justify-center bg-white/5 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-3 h-3 bg-white/40 rounded-sm" />
                    </div>
                  </div>

                  {/* Name */}
                  <span className="text-[9px] mt-4 font-mono tracking-[0.2em] uppercase text-white/30 group-hover:text-white/80 transition-colors duration-500 whitespace-nowrap">
                    {logo.alt}
                  </span>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Side Fade Overlays */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#02040A] to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#02040A] to-transparent pointer-events-none" />
        </Carousel>
      </div>
    </div>
  );
}
