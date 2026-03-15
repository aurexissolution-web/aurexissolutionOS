"use client"

import { Component as FeatureCarousel, type Step } from "@/components/ui/feature-carousel"

const aurexisSteps: readonly Step[] = [
  {
    id: "1",
    name: "01",
    title: "The Mission",
    description: "To architect intelligent systems that eliminate manual friction and 10x human output. We believe in software that works for you, not the other way around.",
  },
  {
    id: "2",
    name: "02",
    title: "The Vision",
    description: "To be the premier engine behind the most automated, efficient companies in Southeast Asia. Your technical infrastructure should be a catalyst for exponential growth.",
  },
  {
    id: "3",
    name: "03",
    title: "The Goals",
    description: "To transform workflows into autonomous operations. We integrate custom AI agents, high-performance web platforms, and data-driven systems seamlessly.",
  },
  {
    id: "4",
    name: "04",
    title: "The Standard",
    description: "Speed-to-Market, Privacy-First rigor, and Architect-led execution. We don't believe in development hell; we believe in shipping secure, scalable solutions.",
  },
] as const

export function AurexisFeatureCarousel() {
  return (
    <FeatureCarousel
      title=""
      description=""
      steps={aurexisSteps}
      bgClass="bg-gradient-to-tr from-[#02040A] to-[#0A0A0F]"
    />
  )
}
