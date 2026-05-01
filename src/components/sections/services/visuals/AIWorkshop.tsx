"use client";

import { useEffect, useState } from "react";

type Token = { kind: "p" | "h" | "v" | "c" | ""; text: string };

const SCENARIOS: Token[][] = [
  [
    { kind: "p", text: "› " },
    { kind: "c", text: "# pipeline scheduled · ops-agent" },
    { kind: "", text: "\n" },
    { kind: "p", text: "› " },
    { kind: "", text: "retrieve(" },
    { kind: "h", text: '"Q3 churn risk"' },
    { kind: "", text: ", scope=" },
    { kind: "v", text: '"30d"' },
    { kind: "", text: ")" },
    { kind: "", text: "\n" },
    { kind: "c", text: "↳ 14 records · vector match · 0.42s" },
    { kind: "", text: "\n" },
    { kind: "p", text: "› " },
    { kind: "", text: "summarize → " },
    { kind: "h", text: "action_plan.md" },
  ],
  [
    { kind: "p", text: "› " },
    { kind: "c", text: "# new ticket · routing" },
    { kind: "", text: "\n" },
    { kind: "p", text: "› " },
    { kind: "", text: "classify(" },
    { kind: "h", text: '"refund_request_4127"' },
    { kind: "", text: ")" },
    { kind: "", text: "\n" },
    { kind: "c", text: "↳ tier=2 · sentiment=neutral · 0.18s" },
    { kind: "", text: "\n" },
    { kind: "p", text: "› " },
    { kind: "", text: "route → " },
    { kind: "h", text: "cs_lead" },
  ],
  [
    { kind: "p", text: "› " },
    { kind: "c", text: "# nightly insight build" },
    { kind: "", text: "\n" },
    { kind: "p", text: "› " },
    { kind: "", text: "aggregate(" },
    { kind: "h", text: '"sales_24h"' },
    { kind: "", text: ")" },
    { kind: "", text: "\n" },
    { kind: "c", text: "↳ 1,420 events · pattern match · 0.61s" },
    { kind: "", text: "\n" },
    { kind: "p", text: "› " },
    { kind: "", text: "digest → " },
    { kind: "h", text: "founder@" },
  ],
];

const KIND_CLASS: Record<Token["kind"], string> = {
  p: "text-[var(--color-electric-cyan)] mr-2",
  h: "text-white",
  v: "text-[#F59E0B]",
  c: "text-[#6B7588]",
  "": "text-[#B7BFCC]",
};

export function AIWorkshop() {
  const [scenarioIdx, setScenarioIdx] = useState(0);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = setInterval(() => {
      setScenarioIdx((i) => (i + 1) % SCENARIOS.length);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  const scenario = SCENARIOS[scenarioIdx];

  return (
    <div className="w-full max-w-[620px] flex flex-col gap-3.5">
      {/* Terminal */}
      <Panel head={{ title: "ops-agent · v3", right: "retrieve · summarize · route" }}>
        <div className="px-[18px] py-4 min-h-[130px] font-mono text-[12.5px] leading-[1.85]">
          <div className="whitespace-pre-wrap">
            {scenario.map((tok, i) => (
              <span key={i} className={KIND_CLASS[tok.kind]}>
                {tok.text}
              </span>
            ))}
            <span className="text-[var(--color-electric-cyan)] [animation:services-cursor-blink_0.85s_step-end_infinite]">
              ▌
            </span>
          </div>
        </div>
      </Panel>

      {/* Ingest stream */}
      <Panel head={{ title: "ingest · vector store", right: "streaming" }}>
        <div className="px-4 py-3 min-h-[90px]">
          <div className="relative h-[60px] overflow-hidden">
            <div className="[animation:services-stream-up_12s_linear_infinite]">
              {[
                { tag: "CSV", tone: "cyan" as const, file: "customers_2026q3.csv", size: "42KB" },
                { tag: "PDF", tone: "amber" as const, file: "contract_v4_redline.pdf", size: "1.2MB" },
                { tag: "SLACK", tone: "violet" as const, file: "#sales-feedback · 47 msgs", size: "live" },
                { tag: "CRM", tone: "cyan" as const, file: "opportunity_pipeline.json", size: "8KB" },
                { tag: "EMAIL", tone: "amber" as const, file: "reply_drafts/#41-#52", size: "12" },
                { tag: "CSV", tone: "cyan" as const, file: "customers_2026q3.csv", size: "42KB" },
              ].map((row, i) => (
                <StreamRow key={i} {...row} />
              ))}
            </div>
          </div>
        </div>
      </Panel>

      {/* Metrics */}
      <Panel head={{ title: "outcomes", right: "last 30d" }}>
        <div className="px-[18px] py-3.5 grid grid-cols-2 gap-3.5">
          <Metric value="50+ hr" label="Reclaimed / wk" />
          <Metric value="32" label="Agents shipped" />
        </div>
      </Panel>
    </div>
  );
}

function Panel({
  head,
  children,
}: {
  head: { title: string; right: string };
  children: React.ReactNode;
}) {
  return (
    <div className="relative bg-[rgba(8,9,13,0.7)] backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px opacity-50"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-electric-cyan), transparent)",
        }}
      />
      <div className="px-3.5 py-2.5 border-b border-white/10 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7588]">
        <span
          className="w-1.5 h-1.5 rounded-full bg-[var(--color-electric-cyan)] [box-shadow:0_0_8px_var(--color-electric-cyan)] [animation:services-pulse-soft_1.4s_ease-in-out_infinite]"
        />
        {head.title}
        <span className="ml-auto">{head.right}</span>
      </div>
      {children}
    </div>
  );
}

function StreamRow({
  tag,
  tone,
  file,
  size,
}: {
  tag: string;
  tone: "cyan" | "amber" | "violet";
  file: string;
  size: string;
}) {
  const toneStyles = {
    cyan: { bg: "rgba(0,240,255,0.14)", color: "#00F0FF" },
    amber: { bg: "rgba(245,158,11,0.14)", color: "#F59E0B" },
    violet: { bg: "rgba(139,92,246,0.16)", color: "#C4B5FD" },
  }[tone];
  return (
    <div className="flex items-center gap-2.5 py-1 font-mono text-[10.5px] text-[#B7BFCC]">
      <span
        className="px-1.5 py-0.5 rounded text-[9px] tracking-[0.12em]"
        style={{ background: toneStyles.bg, color: toneStyles.color }}
      >
        {tag}
      </span>
      <span>{file}</span>
      <span className="ml-auto text-[#6B7588]">{size}</span>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-l-2 border-[var(--color-electric-cyan)] pl-3.5">
      <div className="font-serif italic text-[32px] leading-none tracking-[-0.02em] text-white">
        {value}
      </div>
      <div className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-[#6B7588] mt-1">
        {label}
      </div>
    </div>
  );
}
