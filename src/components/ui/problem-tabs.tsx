'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CircleDot, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type VisualType =
  | 'unclear'
  | 'bottleneck'
  | 'fragmentation'
  | 'visibility'
  | 'evolution'
  | 'automation';

export interface Problem {
  id: string;
  stage: string;
  title: string;
  problem: string;
  signals: string[];
  recommendationTitle: string;
  recommendationDescription: string;
  whyThisFits: string;
  firstLook: string[];
  visualType: VisualType;
  recommendations: string[];
  icon?: LucideIcon;
}

export interface SolutionRef {
  title: string;
  stage: string;
  href: string;
}

export interface ProblemTabsProps {
  problems: readonly Problem[];
  solutions: readonly SolutionRef[];
  defaultId?: string;
  className?: string;
}

const transition = { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const };

export function ProblemTabs({
  problems,
  solutions,
  defaultId,
  className,
}: ProblemTabsProps) {
  const [activeId, setActiveId] = useState<string>(defaultId || problems[0]?.id);
  const active = problems.find((p) => p.id === activeId) ?? problems[0];

  const getSolution = (title: string) =>
    solutions.find((s) => s.title === title);

  const ActiveIcon = active?.icon ?? CircleDot;

  if (!problems?.length) return null;

  return (
    <div className={cn('w-full', className)}>
      {/* Tab bar */}
      <div className='relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-1.5 backdrop-blur-xl'>
        <div className='flex flex-nowrap gap-1 overflow-x-auto pb-1'>
          {problems.map((p) => {
            const on = p.id === activeId;
            return (
              <button
                key={p.id}
                type='button'
                role='tab'
                aria-selected={on}
                onClick={() => setActiveId(p.id)}
                className={cn(
                  'relative z-10 flex-1 min-w-[88px] rounded-xl px-2 py-3 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-electric-cyan)]/60',
                  on
                    ? 'text-white'
                    : 'text-white/45 hover:bg-white/[0.03] hover:text-white'
                )}
              >
                {on && (
                  <motion.div
                    layoutId='problem-active-pill'
                    className='absolute inset-0 rounded-xl border border-[var(--color-electric-cyan)]/30 bg-[var(--color-electric-cyan)]/[0.12] shadow-[0_0_24px_rgba(0,240,255,0.12)]'
                    transition={transition}
                  />
                )}
                <span className='relative z-10 flex flex-col items-center gap-1'>
                  <span className='text-[15px] font-semibold leading-none'>
                    {p.stage}
                  </span>
                  <span className='text-[9px] font-medium uppercase tracking-wider leading-none opacity-80'>
                    {p.title}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content panel */}
      <div className='relative mt-5 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.015] p-6 backdrop-blur-2xl md:p-8'>
        <span
          aria-hidden
          className='pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-electric-cyan)]/60 to-transparent'
        />
        <div
          aria-hidden
          className='pointer-events-none absolute right-0 bottom-0 h-80 w-80 -translate-y-1/4 translate-x-1/4 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.07),transparent_60%)]'
        />

        <AnimatePresence mode='wait'>
          {active && (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
              transition={transition}
            >
              <div className='grid gap-8 lg:grid-cols-2'>
                {/* Left — business situation */}
                <div className='flex flex-col gap-5'>
                  <div className='flex items-start gap-4'>
                    <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[var(--color-electric-cyan)]/20 bg-[var(--color-electric-cyan)]/[0.08] text-[var(--color-electric-cyan)] shadow-[0_0_20px_rgba(0,240,255,0.08)]'>
                      <ActiveIcon className='h-6 w-6' />
                    </div>
                    <div>
                      <span className='font-mono text-[12px] uppercase tracking-[0.18em] text-[var(--color-electric-cyan)]/80'>
                        {active.stage} / {active.title}
                      </span>
                      <h3 className='mt-1 text-[20px] font-bold leading-[1.3] text-white md:text-[22px]'>
                        {active.problem}
                      </h3>
                    </div>
                  </div>

                  <div className='rounded-xl border border-white/[0.06] bg-white/[0.025] p-4'>
                    <p className='text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45'>
                      Common signals
                    </p>
                    <ul className='mt-3 grid grid-cols-2 gap-x-4 gap-y-2'>
                      {active.signals.map((s) => (
                        <li
                          key={s}
                          className='flex items-center gap-2 text-[13px] text-white/70'
                        >
                          <span className='h-1 w-1 shrink-0 rounded-full bg-[var(--color-electric-cyan)]/70' />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right — recommended path */}
                <div className='flex flex-col gap-5 rounded-xl border border-white/[0.06] bg-white/[0.025] p-5'>
                  <div>
                    <p className='text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-electric-cyan)]/80'>
                      Recommended Path
                    </p>
                    <h4 className='mt-3 text-[18px] font-bold text-white md:text-[20px]'>
                      {active.recommendationTitle}
                    </h4>
                    <p className='mt-2 text-[14px] leading-[1.6] text-white/60'>
                      {active.recommendationDescription}
                    </p>
                    {(() => {
                      const primaryTitle = active.recommendations[0];
                      const primary = primaryTitle
                        ? getSolution(primaryTitle)
                        : undefined;
                      if (!primary) return null;
                      const slug = primary.href.replace('/solutions/', '');
                      const label = active.recommendationTitle
                        .split('/')[0]
                        .trim()
                        .replace('™', '');
                      return (
                        <a
                          href={`#${slug}`}
                          className='mt-5 group inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--color-electric-cyan)] transition-colors hover:text-white'
                        >
                          Explore {label}
                          <ArrowRight className='h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5' />
                        </a>
                      );
                    })()}
                  </div>
                  <div className='border-t border-white/[0.06] pt-4'>
                    <p className='text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45'>
                      Why this fits
                    </p>
                    <p className='mt-2 text-[13px] leading-[1.6] text-white/55'>
                      {active.whyThisFits}
                    </p>
                  </div>
                </div>
              </div>

              {/* Lower — operational friction visual + first look */}
              <div className='mt-8 grid gap-6 lg:grid-cols-[1.25fr_1fr]'>
                <div className='relative overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-5'>
                  <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,255,0.06),transparent_70%)]' />
                  <DiagnosticVisual type={active.visualType} />
                </div>

                <div className='flex flex-col justify-center rounded-xl border border-white/[0.06] bg-white/[0.025] p-5'>
                  <p className='text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45'>
                    What we&apos;d look at first
                  </p>
                  <div className='mt-4 flex flex-wrap gap-2'>
                    {active.firstLook.map((item) => (
                      <span
                        key={item}
                        className='rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-[12px] text-white/75'
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function DiagnosticVisual({ type }: { type: VisualType }) {
  switch (type) {
    case 'unclear':
      return <UnclearVisual />;
    case 'bottleneck':
      return <BottleneckVisual />;
    case 'fragmentation':
      return <FragmentationVisual />;
    case 'visibility':
      return <VisibilityVisual />;
    case 'evolution':
      return <EvolutionVisual />;
    case 'automation':
      return <AutomationVisual />;
  }
}

function SvgLabel({
  x,
  y,
  children,
  fontSize = 10,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  fontSize?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor='middle'
      fontSize={fontSize}
      fontWeight='500'
      fill='rgba(255,255,255,0.65)'
    >
      {children}
    </text>
  );
}

function SvgNode({
  x,
  y,
  label,
  active = false,
}: {
  x: number;
  y: number;
  label: string;
  active?: boolean;
}) {
  return (
    <g>
      {active && (
        <motion.circle
          cx={x}
          cy={y}
          r={8}
          fill='rgba(0,240,255,0.15)'
          animate={{
            r: [8, 14, 8],
            opacity: [0.25, 0.08, 0.25],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.2,
            ease: 'easeInOut',
          }}
        />
      )}
      <circle
        cx={x}
        cy={y}
        r={active ? 5 : 4}
        fill={active ? 'rgba(0,240,255,0.9)' : 'rgba(255,255,255,0.55)'}
      />
      {label && <SvgLabel x={x} y={y + 18}>{label}</SvgLabel>}
    </g>
  );
}

function SvgBox({
  x,
  y,
  label,
  active = false,
  width = 80,
  height = 28,
  fontSize = 10,
}: {
  x: number;
  y: number;
  label: string;
  active?: boolean;
  width?: number;
  height?: number;
  fontSize?: number;
}) {
  return (
    <g>
      {active && (
        <motion.rect
          x={x - width / 2 - 2}
          y={y - height / 2 - 2}
          width={width + 4}
          height={height + 4}
          rx={10}
          fill='rgba(0,240,255,0.1)'
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
            ease: 'easeInOut',
          }}
        />
      )}
      <rect
        x={x - width / 2}
        y={y - height / 2}
        width={width}
        height={height}
        rx={8}
        fill={active ? 'rgba(0,240,255,0.15)' : 'rgba(255,255,255,0.05)'}
        stroke={active ? 'rgba(0,240,255,0.45)' : 'rgba(255,255,255,0.12)'}
        strokeWidth={1}
      />
      <text
        x={x}
        y={y + fontSize / 3}
        textAnchor='middle'
        fontSize={fontSize}
        fontWeight='500'
        fill='rgba(255,255,255,0.7)'
      >
        {label}
      </text>
    </g>
  );
}

function UnclearVisual() {
  const nodes = [
    { x: 50, y: 75, label: 'WORKFLOW' },
    { x: 110, y: 50, label: 'DATA' },
    { x: 180, y: 70, label: 'TOOLS' },
    { x: 250, y: 50, label: 'REPORTING' },
    { x: 310, y: 80, label: 'HANDOFFS' },
    { x: 360, y: 115, label: 'MANAGEMENT' },
  ];
  return (
    <svg viewBox='0 0 420 140' className='w-full h-28 md:h-36'>
      {[
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
      ].map(([a, b], i) => (
        <line
          key={`${a}-${b}`}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke='rgba(255,255,255,0.12)'
          strokeWidth={1}
          strokeDasharray={i === 2 || i === 4 ? '3 3' : undefined}
          opacity={i === 2 ? 0.4 : i === 4 ? 0.5 : 0.6}
        />
      ))}
      {nodes.map((n) => (
        <SvgNode key={n.label} x={n.x} y={n.y} label={n.label} />
      ))}
    </svg>
  );
}

function BottleneckVisual() {
  const centers = [70, 150, 230, 310, 390];
  return (
    <svg viewBox='0 0 460 110' className='w-full h-28 md:h-36'>
      <defs>
        <marker
          id='bottleneck-arrow'
          markerWidth='6'
          markerHeight='6'
          refX='5'
          refY='3'
          orient='auto'
        >
          <path d='M0,0 L6,3 L0,6 Z' fill='rgba(255,255,255,0.2)' />
        </marker>
      </defs>
      {centers.slice(0, -1).map((x, i) => (
        <line
          key={i}
          x1={x + 42}
          y1={55}
          x2={centers[i + 1] - 42}
          y2={55}
          stroke='rgba(255,255,255,0.15)'
          markerEnd='url(#bottleneck-arrow)'
        />
      ))}
      <SvgBox x={centers[0]} y={55} label='INPUT' />
      <SvgBox x={centers[1]} y={55} label='PROCESS' />
      <SvgBox x={centers[2]} y={55} label='BOTTLENECK' active width={92} fontSize={9} />
      <SvgBox x={centers[3]} y={55} label='APPROVAL' />
      <SvgBox x={centers[4]} y={55} label='OUTPUT' />
    </svg>
  );
}

function FragmentationVisual() {
  const boxes = [
    { x: 70, y: 45, label: 'CRM', w: 55 },
    { x: 200, y: 40, label: 'SPREADSHEETS', w: 90 },
    { x: 330, y: 45, label: 'EMAIL', w: 60 },
    { x: 90, y: 105, label: 'WHATSAPP', w: 70 },
    { x: 230, y: 110, label: 'DOCUMENTS', w: 75 },
    { x: 350, y: 105, label: 'REPORTING', w: 72 },
  ];
  return (
    <svg viewBox='0 0 420 150' className='w-full h-28 md:h-36'>
      {[
        [0, 1],
        [1, 2],
        [0, 3],
        [3, 4],
        [2, 5],
        [4, 5],
      ].map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={boxes[a].x}
          y1={boxes[a].y}
          x2={boxes[b].x}
          y2={boxes[b].y}
          stroke='rgba(255,255,255,0.1)'
          strokeWidth={1}
          strokeDasharray='2 4'
          opacity={0.5}
        />
      ))}
      {boxes.map((b) => (
        <SvgBox
          key={b.label}
          x={b.x}
          y={b.y}
          width={b.w}
          label={b.label}
          fontSize={9}
        />
      ))}
    </svg>
  );
}

function VisibilityVisual() {
  const left = [
    { x: 50, y: 45, label: 'WORKFLOW' },
    { x: 50, y: 105, label: 'DATA' },
    { x: 110, y: 75, label: 'TOOLS' },
  ];
  const right = [
    { x: 330, y: 55, label: 'MANAGEMENT' },
    { x: 330, y: 105, label: 'REPORTING' },
  ];
  return (
    <svg viewBox='0 0 400 150' className='w-full h-28 md:h-36'>
      {left.map((n) =>
        right.map((m) => (
          <line
            key={`${n.label}-${m.label}`}
            x1={n.x}
            y1={n.y}
            x2={m.x}
            y2={m.y}
            stroke='rgba(255,255,255,0.08)'
            strokeWidth={1}
            strokeDasharray='3 3'
          />
        ))
      )}
      {left.map((n) => (
        <SvgNode key={n.label} x={n.x} y={n.y} label={n.label} />
      ))}
      {right.map((n) => (
        <SvgNode key={n.label} x={n.x} y={n.y} label={n.label} />
      ))}
    </svg>
  );
}

function EvolutionVisual() {
  const center = { x: 200, y: 75, label: 'CORE SYSTEM' };
  const outer = [
    { x: 110, y: 40, label: 'MODULES' },
    { x: 290, y: 40, label: 'SIGNALS' },
    { x: 90, y: 110, label: 'EXTENSIONS' },
    { x: 310, y: 110, label: 'AUTOMATION' },
  ];
  return (
    <svg viewBox='0 0 400 150' className='w-full h-28 md:h-36'>
      {outer.map((n) => (
        <line
          key={n.label}
          x1={center.x}
          y1={center.y}
          x2={n.x}
          y2={n.y}
          stroke='rgba(0,240,255,0.12)'
          strokeWidth={1}
        />
      ))}
      <SvgNode x={center.x} y={center.y} label={center.label} active />
      {outer.map((n, i) => (
        <motion.g
          key={n.label}
          initial={{ opacity: 0.6, scale: 0.95 }}
          animate={{ opacity: 1, scale: [1, 1.06, 1] }}
          transition={{
            duration: 2.4,
            delay: i * 0.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <SvgNode x={n.x} y={n.y} label={n.label} />
        </motion.g>
      ))}
    </svg>
  );
}

function AutomationVisual() {
  return (
    <svg viewBox='0 0 400 140' className='w-full h-28 md:h-36'>
      <SvgBox x={70} y={40} width={78} label='WORKFLOW A' fontSize={9} />
      <line
        x1={108}
        y1={40}
        x2={142}
        y2={40}
        stroke='rgba(255,255,255,0.12)'
      />
      <SvgNode x={160} y={40} label='' active />
      <line
        x1={178}
        y1={40}
        x2={222}
        y2={40}
        stroke='rgba(255,255,255,0.12)'
      />
      <SvgBox x={260} y={40} width={60} label='OUTPUT' fontSize={9} />

      <SvgBox x={70} y={100} width={78} label='WORKFLOW B' fontSize={9} />
      <line
        x1={108}
        y1={100}
        x2={142}
        y2={100}
        stroke='rgba(255,255,255,0.12)'
      />
      <SvgNode x={160} y={100} label='' />
      <line
        x1={178}
        y1={100}
        x2={222}
        y2={100}
        stroke='rgba(255,255,255,0.12)'
      />
      <SvgBox x={260} y={100} width={60} label='OUTPUT' fontSize={9} />
    </svg>
  );
}
