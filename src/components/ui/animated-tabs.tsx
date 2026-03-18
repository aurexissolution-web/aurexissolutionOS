"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface AnimatedTabsProps {
  tabs?: Tab[];
  defaultTab?: string;
  className?: string;
}

const defaultTabs: Tab[] = [
  {
    id: "tab1",
    label: "Tab 1",
    content: (
      <div className="grid grid-cols-2 gap-4 w-full h-full relative">
        <div className="relative w-full h-60 rounded-lg overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.2)]">
          <Image
            src="https://images.unsplash.com/photo-1493552152660-f915ab47ae9d?q=80&w=3087&auto=format&fit=crop"
            alt="Tab 1"
            fill
            className="object-cover mt-0 !m-0 border-none"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <h2 className="text-2xl font-bold mb-0 text-white mt-0 !m-0">
            Tab 1
          </h2>
          <p className="text-sm text-gray-200 mt-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "tab2",
    label: "Tab 2",
    content: (
      <div className="grid grid-cols-2 gap-4 w-full h-full relative">
        <div className="relative w-full h-60 rounded-lg overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.2)]">
          <Image
            src="https://images.unsplash.com/photo-1506543730435-e2c1d4553a84?q=80&w=2362&auto=format&fit=crop"
            alt="Tab 2"
            fill
            className="object-cover mt-0 !m-0 border-none"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <h2 className="text-2xl font-bold mb-0 text-white mt-0 !m-0">
            Tab 2
          </h2>
          <p className="text-sm text-gray-200 mt-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "tab3",
    label: "Tab 3",
    content: (
      <div className="grid grid-cols-2 gap-4 w-full h-full relative">
        <div className="relative w-full h-60 rounded-lg overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.2)]">
          <Image
            src="https://images.unsplash.com/photo-1522428938647-2baa7c899f2f?q=80&w=2000&auto=format&fit=crop"
            alt="Tab 3"
            fill
            className="object-cover mt-0 !m-0 border-none"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <h2 className="text-2xl font-bold mb-0 text-white mt-0 !m-0">
            Tab 3
          </h2>
          <p className="text-sm text-gray-200 mt-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
        </div>
      </div>
    ),
  },
];

const AnimatedTabs = ({
  tabs = defaultTabs,
  defaultTab,
  className,
}: AnimatedTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab || tabs[0]?.id);

  if (!tabs?.length) return null;

  return (
    <div className={cn("w-full flex flex-col gap-y-4", className)}>
      <div className="flex gap-2 bg-[#0A0A0F] border border-white/[0.05] p-1.5 rounded-full w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative px-4 py-2 text-sm font-medium rounded-full outline-none transition-colors",
              activeTab === tab.id ? "text-white" : "text-neutral-400 hover:text-neutral-200"
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-[#1A1A24] rounded-full"
                transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="p-1 min-h-60 h-full">
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="h-full rounded-[24px] border border-white/[0.08] bg-[#050505] p-6 lg:p-8"
              >
                {tab.content}
              </motion.div>
            )
        )}
      </div>
    </div>
  );
};

export { AnimatedTabs };
