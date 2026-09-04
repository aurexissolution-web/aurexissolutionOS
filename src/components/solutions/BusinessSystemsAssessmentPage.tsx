'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ArrowDown,
  Check,
  Cpu,
  FileSearch,
  Layers,
  Monitor,
  Network,
  Plus,
  Puzzle,
  Search,
  Target,
  Workflow,
  X,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DarkGradientBg } from '@/components/ui/elegant-dark-pattern';
import { SOLUTIONS_DISCOVERY_PANEL } from '@/data/navigation';
import { ECOSYSTEM_CAPABILITIES } from '@/data/solutions';

const EASE = [0.16, 1, 0.3, 1] as const;

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center'
      )}
    >
      <span className='inline-block text-[11px] font-semibold uppercase tracking-[0.28em] text-white/40'>
        {eyebrow}
      </span>
      <h2 className='mt-4 text-3xl font-extrabold leading-[1.05] tracking-[-0.02em] text-white text-balance md:text-4xl lg:text-5xl'>
        {title}
      </h2>
      {description && (
        <p className='mt-4 text-[15px] leading-[1.6] text-white/55 md:text-[16px]'>
          {description}
        </p>
      )}
    </div>
  );
}

function SectionShell({
  id,
  children,
  className,
  surface = 'plain',
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  surface?: 'plain' | 'muted' | 'grid' | 'beam';
}) {
  return (
    <section
      id={id}
      className={cn(
        'relative overflow-hidden border-t border-white/[0.08] px-6 py-20 md:py-28',
        surface === 'muted' && 'bg-white/[0.014]',
        surface === 'grid' && 'bg-[#02040A]',
        surface === 'beam' && 'bg-[#02040A]',
        className
      )}
    >
      {surface === 'grid' && (
        <div
          aria-hidden
          className='pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.028)_1px,transparent_1px)] [background-size:104px_104px] [mask-image:radial-gradient(ellipse_at_50%_0%,black_24%,transparent_82%)]'
        />
      )}
      {surface === 'beam' && (
        <div
          aria-hidden
          className='pointer-events-none absolute inset-x-0 top-0 h-[460px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,240,255,0.11),transparent_64%)]'
        />
      )}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent'
      />
      <div className='relative z-10 mx-auto max-w-7xl'>{children}</div>
    </section>
  );
}

function CyanCta({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const classes = cn(
    'group inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--color-electric-cyan)] px-6 py-3 text-[14px] font-semibold text-[#020408] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_32px_rgba(0,240,255,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70',
    className
  );
  return href.startsWith('#') ? (
    <a href={href} className={classes}>
      {children}
      <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5' />
    </a>
  ) : (
    <Link href={href} className={classes}>
      {children}
      <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5' />
    </Link>
  );
}

function GhostButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className='group inline-flex items-center gap-1.5 rounded-full border border-white/[0.14] bg-white/[0.03] px-6 py-3 text-[14px] font-semibold text-white backdrop-blur-md transition-all hover:bg-white/[0.07] hover:border-white/[0.25] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-electric-cyan)]/60'
    >
      {children}
      <ArrowRight className='h-4 w-4 text-[var(--color-electric-cyan)] transition-transform group-hover:translate-x-0.5' />
    </Link>
  );
}

const WHEN_SIGNALS = [
  'Too much manual work',
  'Teams rely heavily on spreadsheets',
  'Information is copied between tools',
  'Processes feel slow',
  'Responsibilities or handoffs are unclear',
  'Reporting takes too long',
  'Management lacks visibility',
  'Systems do not work together',
  'The business wants automation but does not know where to start',
  'The company is considering software but is unsure what it actually needs',
  'Growth is creating operational complexity',
  'Several departments work differently or inconsistently',
];

const INVESTIGATION_AREAS = [
  { title: 'Workflows', icon: Workflow, description: 'How work actually moves through the business.' },
  { title: 'Repetitive Work', icon: Layers, description: 'Tasks that consume time without requiring meaningful judgement.' },
  { title: 'Bottlenecks', icon: Target, description: 'Where processes slow down or become dependent on one person.' },
  { title: 'Handoffs', icon: ArrowRight, description: 'How work and information move between people or teams.' },
  { title: 'Tools', icon: Cpu, description: 'The systems, spreadsheets and applications currently being used.' },
  { title: 'Information Flow', icon: Network, description: 'Where business information originates, moves and gets duplicated.' },
  { title: 'Reporting', icon: Monitor, description: 'How management information is created and consumed.' },
  { title: 'Visibility', icon: Search, description: 'What management can and cannot currently see.' },
  { title: 'Integrations', icon: Puzzle, description: 'Where systems should communicate instead of relying on manual transfer.' },
  { title: 'Automation', icon: Zap, description: 'Where automation may create real operational value.' },
  { title: 'Data Quality', icon: FileSearch, description: 'Whether the business has reliable information underneath its operation.' },
];

const SYMPTOMS_AND_CAUSES = [
  {
    symptom: 'Reporting takes too long.',
    causes: ['Data lives in several places', 'Employees update reports manually', 'Systems do not share information', 'Data is inconsistent'],
  },
  {
    symptom: 'Sales follow-up is inconsistent.',
    causes: ['Leads are not routed properly', 'Ownership is unclear', 'Reminders are manual', 'Information is scattered'],
  },
  {
    symptom: 'We need AI.',
    causes: ['No one has defined which process actually needs improvement', 'The business is looking for technology before clarity'],
  },
];

const DELIVERABLES = [
  { title: 'Current-state understanding', description: 'A clear view of how important processes currently operate.' },
  { title: 'Friction points', description: 'Where time, information or coordination is breaking down.' },
  { title: 'Priority opportunities', description: 'Which improvements are most worth addressing.' },
  { title: 'Recommended direction', description: 'What should happen next.' },
  { title: 'Implementation options', description: 'Focused Improvement, Business Control System, integration, workflow improvement, process change, or no major build.' },
  { title: 'What not to build', description: 'Explicit clarity about unnecessary technology or premature automation.' },
  { title: 'Roadmap', description: 'A practical order for improvement.' },
];

const PRIORITY_CATEGORIES = [
  { label: 'Fix Now', color: 'cyan', items: ['High business impact', 'Time saved', 'Operational risk', 'Urgency'] },
  { label: 'Plan Next', color: 'white', items: ['Dependency', 'Complexity', 'Implementation effort', 'Affected people'] },
  { label: 'Monitor', color: 'white', items: ['Management visibility', 'Scalability', 'Lower immediate risk'] },
  { label: 'Leave Alone', color: 'white', items: ['Low impact', 'High effort', 'Not enough evidence', 'Stable as-is'] },
];

const AFTER_PATHS = [
  { title: 'Focused Improvement Project', description: 'When one specific high-value process should be improved.' },
  { title: 'Business Control System™', description: 'When several parts of the operation need to work together.' },
  { title: 'Managed Operations™', description: 'Where an existing environment needs ongoing improvement.' },
  { title: 'Integration / targeted technical work', description: 'When the problem can be solved without a larger system.' },
  { title: 'Internal process change', description: 'When technology is not the primary answer.' },
  { title: 'No immediate build', description: 'When the correct decision is to leave something alone.' },
];

const IS_NOT = [
  'A free consulting session',
  'A generic IT audit',
  'A checklist copied between clients',
  'A sales exercise designed to justify the largest project',
  'An AI strategy workshop for the sake of AI',
  'A promise to automate everything',
  'A software replacement exercise',
  'A technical architecture review without business context',
];

const IS = [
  'A structured investigation into how the business operates',
  'A commercial engagement with clear outputs',
  'A prioritised view of where improvement actually matters',
  'A recommendation based on evidence, not assumptions',
];

const PROCESS_STEPS = [
  { title: 'Understand', description: 'Learn the business context and objectives.' },
  { title: 'Observe', description: 'Examine how real work currently happens.' },
  { title: 'Map', description: 'Understand workflows, handoffs, tools and information movement.' },
  { title: 'Identify', description: 'Find meaningful operational friction.' },
  { title: 'Prioritise', description: 'Determine which opportunities matter most.' },
  { title: 'Recommend', description: 'Define the most sensible next step.' },
];

const EXAMPLE_SCENARIO = {
  setup: 'A growing service business uses WhatsApp for customer communication, spreadsheets for job tracking, email for approvals, accounting software, manual weekly reporting and shared documents.',
  belief: 'We need one big system.',
  reveal: [
    'The largest delay comes from job handoffs',
    'Customer information is duplicated',
    'Reporting is manual because tools are disconnected',
    'Only selected parts need improvement',
  ],
  recommendation: 'Connect the existing tools, improve the handoff workflow, create a central operational view, and avoid replacing useful software.',
};

const WHO_FOR = [
  'Growing SMEs',
  'Businesses with operational complexity',
  'Teams relying on manual workflows',
  'Companies with several disconnected systems',
  'Businesses preparing to invest in automation or software',
  'Leadership that wants clarity before committing to a build',
];

const WHO_NOT_FOR = [
  'Someone looking only for free advice',
  'A business wanting software built without discussing the problem',
  'Someone shopping only for the cheapest development hours',
  'Someone expecting guaranteed savings before any analysis',
  'Someone wanting AI simply because it is fashionable',
  'A business unwilling to involve relevant process owners',
];

const ASSESSMENT_FAQS = [
  {
    q: 'What is Business Systems Assessment™?',
    a: 'A structured engagement to understand how a business currently operates, where friction exists and which improvements are most worth doing first.',
  },
  {
    q: 'Do I need an Assessment before working with Aurexis?',
    a: 'Not always. If you already know the exact process to improve, a Focused Improvement Project may be more appropriate. The Assessment is ideal when you need clarity first.',
  },
  {
    q: 'What happens during the Assessment?',
    a: 'We learn the business context, observe how work currently happens, map workflows and handoffs, identify friction and prioritise the most valuable opportunities.',
  },
  {
    q: 'How long does an Assessment take?',
    a: 'The typical engagement shape is around one to two weeks, depending on the size and complexity of the operation.',
  },
  {
    q: 'What does Aurexis need from our team?',
    a: 'We need access to the people who actually run the processes — not just leadership. Operational reality lives with the people doing the work.',
  },
  {
    q: 'Will you need access to our current systems?',
    a: 'Usually yes. Understanding the tools and data already in use is essential. We do not need admin access to everything at once, but we do need to see how systems fit together.',
  },
  {
    q: 'Does the Assessment include implementation?',
    a: 'No. The Assessment produces a clear recommendation and roadmap. Implementation is a separate decision and engagement.',
  },
  {
    q: 'What do we receive at the end?',
    a: 'A current-state understanding, a prioritised list of friction points, a recommended direction and a practical improvement roadmap.',
  },
  {
    q: 'What happens if you determine we do not need a new system?',
    a: 'We tell you. A key part of the Assessment is identifying what should not be built, not recommending software for its own sake.',
  },
  {
    q: 'Can the Assessment recommend improving tools we already use?',
    a: 'Yes. We often recommend integrating, reconfiguring or improving existing tools before introducing anything new.',
  },
  {
    q: 'Will you recommend AI or automation?',
    a: 'Only where it genuinely improves the operation. The Assessment determines whether automation or AI is appropriate, not assumed.',
  },
  {
    q: 'What happens after the Assessment?',
    a: 'You receive a recommendation. The next step may be a Focused Improvement Project, a Business Control System™, integration work, process change, or no immediate build.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// HERO VISUAL — abstract diagnostic map
// ─────────────────────────────────────────────────────────────────────────────
function HeroDiagnosticMap() {
  const reduce = useReducedMotion() ?? false;
  const nodes = [
    { x: 270, y: 160, label: 'BUSINESS', r: 22 },
    { x: 140, y: 80, label: 'TEAMS' },
    { x: 400, y: 80, label: 'WORKFLOWS' },
    { x: 100, y: 210, label: 'TOOLS' },
    { x: 440, y: 210, label: 'DATA' },
    { x: 270, y: 280, label: 'REPORTS' },
  ];
  const links = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
    [1, 2], [2, 4], [3, 5], [4, 5],
  ];
  return (
    <motion.svg
      viewBox='0 0 540 340'
      className='w-full h-auto max-w-2xl'
      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <defs>
        <marker id='hero-arrow' markerWidth='5' markerHeight='5' refX='4' refY='2.5' orient='auto'>
          <path d='M0,0 L5,2.5 L0,5 Z' fill='rgba(255,255,255,0.12)' />
        </marker>
      </defs>
      {links.map(([a, b], i) => (
        <motion.line
          key={`${a}-${b}`}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke={i < 5 ? 'rgba(0,240,255,0.18)' : 'rgba(255,255,255,0.08)'}
          strokeWidth={1}
          strokeDasharray={i < 5 ? undefined : '3 5'}
          markerEnd='url(#hero-arrow)'
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 + i * 0.06 }}
        />
      ))}
      {nodes.map((n, i) => (
        <g key={n.label}>
          {i === 0 && (
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={n.r}
              fill='rgba(0,240,255,0.08)'
              stroke='rgba(0,240,255,0.4)'
              strokeWidth={1.5}
              initial={reduce ? false : { scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: EASE, delay: 0.3 }}
            />
          )}
          {i > 0 && (
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={5}
              fill={i < 3 ? 'rgba(0,240,255,0.75)' : 'rgba(255,255,255,0.4)'}
              initial={reduce ? false : { scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, ease: EASE, delay: 0.35 + i * 0.05 }}
            />
          )}
          <text
            x={n.x}
            y={n.y + (i === 0 ? 5 : 22)}
            textAnchor='middle'
            fontSize={i === 0 ? 11 : 9}
            fontWeight={i === 0 ? 700 : 500}
            fill={i === 0 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.55)'}
          >
            {n.label}
          </text>
        </g>
      ))}
      <motion.circle
        cx={270}
        cy={160}
        r={90}
        fill='none'
        stroke='rgba(0,240,255,0.08)'
        strokeWidth={1}
        initial={reduce ? false : { scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE }}
      />
    </motion.svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1 — HERO
// ─────────────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <DarkGradientBg>
      <section className='relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-36 pb-24 md:pt-44 md:pb-32 lg:pt-52 lg:pb-40'>
        <div className='relative z-10 mx-auto max-w-7xl'>
          <div className='grid gap-12 lg:grid-cols-2 lg:items-center'>
            <div className='order-2 lg:order-1'>
              <Reveal>
                <span className='inline-flex items-center gap-2 rounded-full border border-[var(--color-electric-cyan)]/15 bg-white/[0.04] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-electric-cyan)] backdrop-blur-xl'>
                  <Target className='h-3 w-3' />
                  01 — Business Systems Assessment™
                </span>
              </Reveal>

              <Reveal delay={0.05} className='mt-8'>
                <h1 className='text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-white text-balance md:text-6xl lg:text-7xl'>
                  Find the friction before you{' '}
                  <em
                    className='font-serif italic text-[var(--color-electric-cyan)] font-normal'
                    style={{ filter: 'drop-shadow(0 0 22px rgba(0,240,255,0.32))' }}
                  >
                    build
                  </em>
                  .
                </h1>
              </Reveal>

              <Reveal delay={0.1} className='mt-6'>
                <p className='max-w-2xl text-[17px] leading-[1.6] text-white/55 md:text-[19px]'>
                  Understand how the business really works before deciding what should change.
                  Aurexis diagnoses operational friction first, then recommends the right intervention — if any.
                </p>
              </Reveal>

              <Reveal delay={0.15} className='mt-10'>
                <div className='flex flex-col items-start gap-4 sm:flex-row'>
                  <CyanCta href={SOLUTIONS_DISCOVERY_PANEL.buttonHref}>
                    Book a Discovery Call
                  </CyanCta>
                  <a
                    href='#what-we-investigate'
                    className='group inline-flex items-center gap-1.5 rounded-full border border-white/[0.14] bg-white/[0.03] px-6 py-3 text-[14px] font-semibold text-white backdrop-blur-md transition-all hover:bg-white/[0.07] hover:border-white/[0.25] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-electric-cyan)]/60'
                  >
                    See What We Assess
                    <ArrowDown className='h-4 w-4 text-[var(--color-electric-cyan)] transition-transform group-hover:translate-y-0.5' />
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.2} className='mt-4'>
                <p className='text-[12px] text-white/35'>
                  Qualification conversation — not a free consulting session.
                </p>
              </Reveal>
            </div>

            <div className='order-1 lg:order-2'>
              <HeroDiagnosticMap />
            </div>
          </div>
        </div>
      </section>
    </DarkGradientBg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2 — WHEN AN ASSESSMENT MAKES SENSE
// ─────────────────────────────────────────────────────────────────────────────
function WhenAssessmentMakesSense() {
  const reduce = useReducedMotion() ?? false;
  return (
    <SectionShell id='when-it-makes-sense' surface='muted'>
      <SectionHeader
        eyebrow='When an Assessment makes sense'
        title={
          <>
            Does any of this sound like{' '}
            <em
              className='font-serif italic text-[var(--color-electric-cyan)] font-normal'
              style={{ filter: 'drop-shadow(0 0 20px rgba(0,240,255,0.3))' }}
            >
              your
            </em>{' '}
            business?
          </>
        }
        description='These are the signals that operational friction is hiding beneath the surface.'
      />

      <div className='mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
        {WHEN_SIGNALS.map((signal, i) => (
          <motion.div
            key={signal}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, ease: EASE, delay: i * 0.03 }}
            className='group flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition hover:border-white/[0.12] hover:bg-white/[0.04]'
          >
            <span className='mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-electric-cyan)]/[0.08] text-[var(--color-electric-cyan)]'>
              <Check className='h-3 w-3' />
            </span>
            <span className='text-[14px] leading-[1.5] text-white/70'>{signal}</span>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3 — WHAT AUREXIS INVESTIGATES
// ─────────────────────────────────────────────────────────────────────────────
function WhatAurexisInvestigates() {
  const reduce = useReducedMotion() ?? false;
  return (
    <SectionShell id='what-we-investigate' surface='grid'>
      <SectionHeader
        eyebrow='What Aurexis investigates'
        title={
          <>
            Not an IT audit. A view of how the business{' '}
            <em
              className='font-serif italic text-[var(--color-electric-cyan)] font-normal'
              style={{ filter: 'drop-shadow(0 0 20px rgba(0,240,255,0.3))' }}
            >
              actually
            </em>{' '}
            operates.
          </>
        }
        description='We examine the operational reality underneath the tools, not the tools in isolation.'
      />

      <div className='mt-14 grid gap-px overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3'>
        {INVESTIGATION_AREAS.map((area, i) => {
          const Icon = area.icon;
          return (
            <motion.div
              key={area.title}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, ease: EASE, delay: i * 0.04 }}
              className='bg-[#05070d] p-6 transition hover:bg-[#071015]'
            >
              <div className='flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.10] bg-white/[0.04] text-[var(--color-electric-cyan)]'>
                <Icon className='h-4 w-4' />
              </div>
              <h3 className='mt-4 text-[16px] font-bold text-white'>{area.title}</h3>
              <p className='mt-2 text-[13.5px] leading-[1.6] text-white/55'>{area.description}</p>
            </motion.div>
          );
        })}
      </div>
    </SectionShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4 — OPERATIONAL FRICTION MAP
// ─────────────────────────────────────────────────────────────────────────────
function FrictionMapVisual() {
  const reduce = useReducedMotion() ?? false;
  const people = [
    { x: 90, y: 60, label: 'SALES' },
    { x: 90, y: 160, label: 'OPS' },
    { x: 90, y: 260, label: 'FINANCE' },
  ];
  const tools = [
    { x: 280, y: 60, label: 'CRM' },
    { x: 280, y: 130, label: 'SPREADSHEETS' },
    { x: 280, y: 200, label: 'EMAIL' },
    { x: 280, y: 270, label: 'WHATSAPP' },
  ];
  const outputs = [
    { x: 470, y: 110, label: 'REPORTS' },
    { x: 470, y: 230, label: 'MANAGEMENT' },
  ];
  return (
    <motion.svg
      viewBox='0 0 560 340'
      className='w-full h-auto'
      initial={reduce ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      {people.map((p, i) =>
        tools.map((t, j) => (
          <motion.line
            key={`p-${i}-t-${j}`}
            x1={p.x + 22}
            y1={p.y}
            x2={t.x - 34}
            y2={t.y}
            stroke={(i + j) % 3 === 0 ? 'rgba(0,240,255,0.2)' : 'rgba(255,255,255,0.08)'}
            strokeWidth={1}
            strokeDasharray={(i + j) % 3 === 0 ? undefined : '3 5'}
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 + (i + j) * 0.03 }}
          />
        ))
      )}
      {tools.map((t, i) =>
        outputs.map((o, j) => (
          <motion.line
            key={`t-${i}-o-${j}`}
            x1={t.x + 40}
            y1={t.y}
            x2={o.x - 32}
            y2={o.y}
            stroke='rgba(255,255,255,0.08)'
            strokeWidth={1}
            strokeDasharray='3 5'
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 + (i + j) * 0.05 }}
          />
        ))
      )}
      {people.map((p) => (
        <g key={p.label}>
          <rect
            x={p.x - 22}
            y={p.y - 14}
            width={44}
            height={28}
            rx={8}
            fill='rgba(255,255,255,0.05)'
            stroke='rgba(255,255,255,0.12)'
            strokeWidth={1}
          />
          <text x={p.x} y={p.y + 4} textAnchor='middle' fontSize={9} fontWeight={500} fill='rgba(255,255,255,0.65)'>
            {p.label}
          </text>
        </g>
      ))}
      {tools.map((t) => (
        <g key={t.label}>
          <rect
            x={t.x - 40}
            y={t.y - 14}
            width={80}
            height={28}
            rx={8}
            fill='rgba(255,255,255,0.04)'
            stroke='rgba(255,255,255,0.12)'
            strokeWidth={1}
          />
          <text x={t.x} y={t.y + 4} textAnchor='middle' fontSize={9} fontWeight={500} fill='rgba(255,255,255,0.6)'>
            {t.label}
          </text>
        </g>
      ))}
      {outputs.map((o) => (
        <g key={o.label}>
          <rect
            x={o.x - 32}
            y={o.y - 18}
            width={64}
            height={36}
            rx={10}
            fill='rgba(0,240,255,0.08)'
            stroke='rgba(0,240,255,0.3)'
            strokeWidth={1}
          />
          <text x={o.x} y={o.y + 4} textAnchor='middle' fontSize={10} fontWeight={600} fill='rgba(255,255,255,0.75)'>
            {o.label}
          </text>
        </g>
      ))}
      <motion.circle
        cx={280}
        cy={170}
        r={120}
        fill='none'
        stroke='rgba(0,240,255,0.06)'
        strokeWidth={1}
        initial={reduce ? false : { scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE }}
      />
    </motion.svg>
  );
}

function OperationalFrictionMap() {
  const frictionTypes = [
    'Duplicated work',
    'Manual handoffs',
    'Broken connections',
    'Waiting',
    'Repeated entry',
    'Unclear ownership',
    'Information silos',
    'Delayed reporting',
    'Unnecessary steps',
  ];
  return (
    <SectionShell id='operational-friction-map' surface='plain'>
      <div className='grid gap-12 lg:grid-cols-2 lg:items-center'>
        <div>
          <SectionHeader
            eyebrow='Operational friction map'
            title={
              <>
                See where work, people and systems{' '}
                <em
                  className='font-serif italic text-[var(--color-electric-cyan)] font-normal'
                  style={{ filter: 'drop-shadow(0 0 20px rgba(0,240,255,0.3))' }}
                >
                  collide
                </em>
                .
              </>
            }
            description='Aurexis maps how the business actually functions. The visual is a diagnostic — not a dashboard, not a network monitor.'
          />
          <Reveal delay={0.1} className='mt-8'>
            <div className='rounded-2xl border border-white/[0.08] bg-black/20 p-5 backdrop-blur-xl'>
              <p className='text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40'>
                Friction may appear as
              </p>
              <div className='mt-4 flex flex-wrap gap-2'>
                {frictionTypes.map((type) => (
                  <span
                    key={type}
                    className='rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-[12px] text-white/70'
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <div className='relative overflow-hidden rounded-[28px] border border-white/[0.10] bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.015))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl md:p-8'>
            <FrictionMapVisual />
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 5 — FROM SYMPTOM TO ROOT CAUSE
// ─────────────────────────────────────────────────────────────────────────────
function SymptomToRootCause() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion() ?? false;
  return (
    <SectionShell id='symptom-to-root-cause' surface='muted'>
      <SectionHeader
        eyebrow='From symptom to root cause'
        title={
          <>
            The first visible problem is rarely the{' '}
            <em
              className='font-serif italic text-[var(--color-electric-cyan)] font-normal'
              style={{ filter: 'drop-shadow(0 0 20px rgba(0,240,255,0.3))' }}
            >
              real
            </em>{' '}
            problem.
          </>
        }
        description='Aurexis investigates the operation before recommending intervention.'
      />

      <div className='mt-14 grid gap-6 lg:grid-cols-[1fr_1.2fr]'>
        <div className='space-y-3'>
          {SYMPTOMS_AND_CAUSES.map((item, i) => (
            <button
              key={item.symptom}
              type='button'
              onClick={() => setActive(i)}
              className={cn(
                'w-full rounded-xl border p-5 text-left transition',
                active === i
                  ? 'border-[var(--color-electric-cyan)]/30 bg-[var(--color-electric-cyan)]/[0.08]'
                  : 'border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.05]'
              )}
            >
              <span className='text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40'>
                Symptom
              </span>
              <p className='mt-2 text-[16px] font-semibold text-white'>{item.symptom}</p>
            </button>
          ))}
        </div>

        <AnimatePresence mode='wait'>
          <motion.div
            key={active}
            initial={reduce ? undefined : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: EASE }}
            className='rounded-[28px] border border-white/[0.08] bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.015))] p-6 backdrop-blur-xl md:p-8'
          >
            <span className='text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-electric-cyan)]/80'>
              Possible underlying causes
            </span>
            <ul className='mt-5 space-y-3'>
              {SYMPTOMS_AND_CAUSES[active].causes.map((cause) => (
                <li key={cause} className='flex items-start gap-3 text-[15px] leading-[1.55] text-white/70'>
                  <span className='mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-electric-cyan)]' />
                  {cause}
                </li>
              ))}
            </ul>
            <div className='mt-8 border-t border-white/[0.08] pt-5'>
              <p className='text-[13px] leading-[1.6] text-white/55'>
                The symptom is real. The cause is usually deeper. The Assessment separates the two.
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 6 — WHAT YOU LEAVE WITH
// ─────────────────────────────────────────────────────────────────────────────
function WhatYouLeaveWith() {
  const reduce = useReducedMotion() ?? false;
  return (
    <SectionShell id='what-you-leave-with' surface='grid'>
      <SectionHeader
        eyebrow='What you leave with'
        title={
          <>
            Clarity, priorities and a{' '}
            <em
              className='font-serif italic text-[var(--color-electric-cyan)] font-normal'
              style={{ filter: 'drop-shadow(0 0 20px rgba(0,240,255,0.3))' }}
            >
              practical
            </em>{' '}
            direction.
          </>
        }
        description='The Assessment produces a commercial roadmap, not a vague report.'
      />

      <div className='mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {DELIVERABLES.map((item, i) => (
          <motion.div
            key={item.title}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, ease: EASE, delay: i * 0.05 }}
            className='group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl transition hover:border-white/[0.16] hover:bg-white/[0.05]'
          >
            <span
              aria-hidden
              className='pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-electric-cyan)]/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100'
            />
            <h3 className='text-[16px] font-bold text-white'>{item.title}</h3>
            <p className='mt-2 text-[14px] leading-[1.6] text-white/55'>{item.description}</p>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 7 — PRIORITISATION
// ─────────────────────────────────────────────────────────────────────────────
function Prioritisation() {
  const reduce = useReducedMotion() ?? false;
  return (
    <SectionShell id='prioritisation' surface='beam'>
      <SectionHeader
        eyebrow='Prioritisation'
        title={
          <>
            Not every inefficiency deserves{' '}
            <em
              className='font-serif italic text-[var(--color-electric-cyan)] font-normal'
              style={{ filter: 'drop-shadow(0 0 20px rgba(0,240,255,0.3))' }}
            >
              software
            </em>
            .
          </>
        }
        description='Opportunities are evaluated by impact, effort, risk and timing — then placed into one of four stances.'
      />

      <div className='mt-14 grid gap-4 md:grid-cols-2'>
        {PRIORITY_CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.label}
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, ease: EASE, delay: i * 0.08 }}
            className={cn(
              'relative overflow-hidden rounded-[28px] border p-6 backdrop-blur-xl md:p-8',
              cat.color === 'cyan'
                ? 'border-[var(--color-electric-cyan)]/25 bg-[var(--color-electric-cyan)]/[0.05]'
                : 'border-white/[0.08] bg-white/[0.03]'
            )}
          >
            <span
              className={cn(
                'text-[11px] font-bold uppercase tracking-[0.22em]',
                cat.color === 'cyan' ? 'text-[var(--color-electric-cyan)]' : 'text-white/40'
              )}
            >
              {cat.label}
            </span>
            <ul className='mt-5 grid gap-2'>
              {cat.items.map((it) => (
                <li key={it} className='flex items-center gap-2 text-[14px] text-white/65'>
                  <span className={cn('h-1 w-1 rounded-full', cat.color === 'cyan' ? 'bg-[var(--color-electric-cyan)]' : 'bg-white/30')} />
                  {it}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 8 — WHAT HAPPENS AFTER THE ASSESSMENT?
// ─────────────────────────────────────────────────────────────────────────────
function WhatHappensAfter() {
  const reduce = useReducedMotion() ?? false;
  return (
    <SectionShell id='what-happens-after' surface='plain'>
      <SectionHeader
        eyebrow='What happens after the Assessment?'
        title={
          <>
            The Assessment does not mean a large project is{' '}
            <em
              className='font-serif italic text-[var(--color-electric-cyan)] font-normal'
              style={{ filter: 'drop-shadow(0 0 20px rgba(0,240,255,0.3))' }}
            >
              automatic
            </em>
            .
          </>
        }
        description='Aurexis is comfortable recommending less when less is appropriate.'
      />

      <div className='mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {AFTER_PATHS.map((path, i) => (
          <motion.div
            key={path.title}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, ease: EASE, delay: i * 0.05 }}
            className='rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition hover:border-white/[0.16] hover:bg-white/[0.04]'
          >
            <h3 className='text-[17px] font-bold text-white'>{path.title}</h3>
            <p className='mt-2 text-[14px] leading-[1.6] text-white/55'>{path.description}</p>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 9 — ASSESSMENT → SOLUTIONS
// ─────────────────────────────────────────────────────────────────────────────
function AssessmentToSolutionsVisual() {
  const reduce = useReducedMotion() ?? false;
  const paths = [
    { title: 'Focused Improvement', x: 140, y: 80 },
    { title: 'Business Control System', x: 260, y: 80 },
    { title: 'Managed Operations', x: 380, y: 80 },
  ];
  return (
    <motion.svg
      viewBox='0 0 520 180'
      className='w-full h-auto'
      initial={reduce ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <motion.circle
        cx={260}
        cy={130}
        r={28}
        fill='rgba(0,240,255,0.1)'
        stroke='rgba(0,240,255,0.45)'
        strokeWidth={1.5}
        initial={reduce ? false : { scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE }}
      />
      <text x={260} y={134} textAnchor='middle' fontSize={10} fontWeight={600} fill='rgba(255,255,255,0.85)'>
        ASSESS
      </text>
      {paths.map((p, i) => (
        <g key={p.title}>
          <motion.line
            x1={260}
            y1={102}
            x2={p.x}
            y2={108}
            stroke='rgba(0,240,255,0.2)'
            strokeWidth={1}
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 + i * 0.1 }}
          />
          <rect
            x={p.x - 58}
            y={50}
            width={116}
            height={26}
            rx={8}
            fill='rgba(255,255,255,0.05)'
            stroke='rgba(255,255,255,0.12)'
            strokeWidth={1}
          />
          <text x={p.x} y={67} textAnchor='middle' fontSize={9} fontWeight={500} fill='rgba(255,255,255,0.7)'>
            {p.title.replace('™', '')}
          </text>
        </g>
      ))}
    </motion.svg>
  );
}

function AssessmentToSolutions() {
  return (
    <SectionShell id='assessment-to-solutions' surface='muted'>
      <div className='grid gap-12 lg:grid-cols-2 lg:items-center'>
        <div>
          <SectionHeader
            eyebrow='Assessment → Solutions'
            title={
              <>
                The next step follows the{' '}
                <em
                  className='font-serif italic text-[var(--color-electric-cyan)] font-normal'
                  style={{ filter: 'drop-shadow(0 0 20px rgba(0,240,255,0.3))' }}
                >
                  evidence
                </em>
                .
              </>
            }
            description='Business Systems Assessment™ creates clarity. What the business does next depends on what the Assessment reveals.'
          />
          <Reveal delay={0.1} className='mt-8'>
            <p className='max-w-xl text-[15px] leading-[1.7] text-white/60'>
              It is not a compulsory sales funnel. It is a way to make sure the right
              intervention is chosen for the right situation. Sometimes that means a
              small project. Sometimes it means no build at all.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <div className='relative overflow-hidden rounded-[28px] border border-white/[0.10] bg-black/20 p-6 backdrop-blur-xl md:p-8'>
            <AssessmentToSolutionsVisual />
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 10 — WHAT THE ASSESSMENT IS NOT
// ─────────────────────────────────────────────────────────────────────────────
function WhatItIsNot() {
  const reduce = useReducedMotion() ?? false;
  return (
    <SectionShell id='what-it-is-not' surface='grid'>
      <SectionHeader
        eyebrow='What the Assessment is — and is not'
        title='A structured investigation, not a sales exercise.'
        description='The Assessment is positioned clearly so expectations are set correctly from the start.'
        align='center'
      />

      <div className='mt-14 grid gap-6 lg:grid-cols-2'>
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          className='rounded-[28px] border border-white/[0.08] bg-white/[0.02] p-6 md:p-8'
        >
          <span className='text-[11px] font-bold uppercase tracking-[0.22em] text-white/40'>
            It is not
          </span>
          <ul className='mt-6 space-y-4'>
            {IS_NOT.map((item) => (
              <li key={item} className='flex items-start gap-3 text-[14px] leading-[1.55] text-white/55'>
                <X className='mt-0.5 h-4 w-4 shrink-0 text-white/25' />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
          className='rounded-[28px] border border-[var(--color-electric-cyan)]/20 bg-[var(--color-electric-cyan)]/[0.04] p-6 shadow-[inset_0_1px_0_rgba(0,240,255,0.08)] backdrop-blur-xl md:p-8'
        >
          <span className='text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--color-electric-cyan)]'>
            It is
          </span>
          <ul className='mt-6 space-y-4'>
            {IS.map((item) => (
              <li key={item} className='flex items-start gap-3 text-[14px] leading-[1.55] text-white/75'>
                <Check className='mt-0.5 h-4 w-4 shrink-0 text-[var(--color-electric-cyan)]' />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </SectionShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 11 — HOW THE ASSESSMENT WORKS
// ─────────────────────────────────────────────────────────────────────────────
function HowItWorks() {
  const reduce = useReducedMotion() ?? false;
  return (
    <SectionShell id='how-it-works' surface='plain'>
      <SectionHeader
        eyebrow='How the Assessment works'
        title={
          <>
            A clear method, not a{' '}
            <em
              className='font-serif italic text-[var(--color-electric-cyan)] font-normal'
              style={{ filter: 'drop-shadow(0 0 20px rgba(0,240,255,0.3))' }}
            >
              black box
            </em>
            .
          </>
        }
        description='Six stages. Each one builds a clearer picture of the operation and what matters most.'
      />

      <div className='relative mt-14'>
        <div
          aria-hidden
          className='absolute left-6 top-0 bottom-0 hidden w-px bg-gradient-to-b from-transparent via-[var(--color-electric-cyan)]/30 to-transparent md:block'
        />
        <div className='grid gap-6 md:grid-cols-2 md:gap-x-12 md:gap-y-8'>
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, ease: EASE, delay: i * 0.06 }}
              className='group relative flex gap-4 md:pl-12'
            >
              <span className='hidden md: absolute left-0 top-0 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-electric-cyan)]/30 bg-[#02040A] font-mono text-[13px] text-[var(--color-electric-cyan)] md:flex'>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className='flex-1 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 transition hover:border-white/[0.14] hover:bg-white/[0.05]'>
                <span className='md:hidden font-mono text-[11px] tracking-[0.22em] text-[var(--color-electric-cyan)]/80'>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className='mt-1 text-[17px] font-bold text-white'>{step.title}</h3>
                <p className='mt-2 text-[14px] leading-[1.6] text-white/55'>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 12 — EXAMPLE SCENARIO
// ─────────────────────────────────────────────────────────────────────────────
function ExampleScenario() {
  const reduce = useReducedMotion() ?? false;
  return (
    <SectionShell id='example-scenario' surface='beam'>
      <SectionHeader
        eyebrow='Example scenario'
        title='How Aurexis thinking works in practice.'
        description='A clearly labelled illustrative situation — not a real case study, and not a guaranteed result.'
        align='center'
      />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: EASE }}
        className='mx-auto mt-14 max-w-4xl rounded-[28px] border border-white/[0.08] bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.015))] p-6 backdrop-blur-xl md:p-10'
      >
        <div className='grid gap-8 md:grid-cols-[1fr_1.2fr]'>
          <div>
            <span className='text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40'>
              The situation
            </span>
            <p className='mt-3 text-[15px] leading-[1.65] text-white/65'>
              {EXAMPLE_SCENARIO.setup}
            </p>
            <div className='mt-5 rounded-xl border border-[var(--color-electric-cyan)]/15 bg-[var(--color-electric-cyan)]/[0.05] p-4'>
              <p className='text-[13px] italic text-white/60'>
                Belief: {EXAMPLE_SCENARIO.belief}
              </p>
            </div>
          </div>
          <div>
            <span className='text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-electric-cyan)]/80'>
              What the Assessment may reveal
            </span>
            <ul className='mt-3 space-y-2'>
              {EXAMPLE_SCENARIO.reveal.map((item) => (
                <li key={item} className='flex items-start gap-2 text-[14px] leading-[1.55] text-white/70'>
                  <span className='mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-electric-cyan)]' />
                  {item}
                </li>
              ))}
            </ul>
            <p className='mt-5 border-t border-white/[0.08] pt-5 text-[14px] leading-[1.65] text-white/55'>
              Recommendation: {EXAMPLE_SCENARIO.recommendation}
            </p>
          </div>
        </div>
      </motion.div>
    </SectionShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 13 — TECH ECOSYSTEM CONNECTION
// ─────────────────────────────────────────────────────────────────────────────
function TechEcosystemConnection() {
  const reduce = useReducedMotion() ?? false;
  return (
    <SectionShell id='tech-ecosystem' surface='plain'>
      <SectionHeader
        eyebrow='Tech Ecosystem connection'
        title={
          <>
            The business problem determines which capabilities{' '}
            <em
              className='font-serif italic text-[var(--color-electric-cyan)] font-normal'
              style={{ filter: 'drop-shadow(0 0 20px rgba(0,240,255,0.3))' }}
            >
              matter
            </em>
            .
          </>
        }
        description='The Assessment may examine any relevant layer of the Aurexis Tech Ecosystem — not all of them, and not by default.'
      />

      <div className='mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {ECOSYSTEM_CAPABILITIES.map((cap, i) => (
          <motion.div
            key={cap.name}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, ease: EASE, delay: i * 0.04 }}
            className='rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition hover:border-white/[0.14] hover:bg-white/[0.04]'
          >
            <span className='font-mono text-[11px] tracking-[0.22em] text-[var(--color-electric-cyan)]/75'>
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className='mt-3 text-[17px] font-bold text-white'>{cap.name}</h3>
            <p className='mt-2 text-[14px] leading-[1.6] text-white/55'>{cap.description}</p>
          </motion.div>
        ))}
      </div>

      <Reveal delay={0.1} className='mt-10 text-center'>
        <GhostButton href='/tech-ecosystem'>Explore the Tech Ecosystem</GhostButton>
      </Reveal>
    </SectionShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 14 & 15 — WHO THIS IS FOR AND NOT FOR
// ─────────────────────────────────────────────────────────────────────────────
function WhoFor() {
  const reduce = useReducedMotion() ?? false;
  return (
    <SectionShell id='who-for' surface='muted'>
      <SectionHeader
        eyebrow='Who this is for'
        title='A strong fit, and an honest qualification.'
        description='Aurexis works best with businesses that want clarity before committing to a build.'
        align='center'
      />

      <div className='mt-14 grid gap-6 lg:grid-cols-2'>
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          className='rounded-[28px] border border-[var(--color-electric-cyan)]/20 bg-[var(--color-electric-cyan)]/[0.04] p-6 shadow-[inset_0_1px_0_rgba(0,240,255,0.08)] backdrop-blur-xl md:p-8'
        >
          <span className='text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--color-electric-cyan)]'>
            Good fit
          </span>
          <ul className='mt-6 space-y-4'>
            {WHO_FOR.map((item) => (
              <li key={item} className='flex items-start gap-3 text-[14px] leading-[1.55] text-white/75'>
                <Check className='mt-0.5 h-4 w-4 shrink-0 text-[var(--color-electric-cyan)]' />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
          className='rounded-[28px] border border-white/[0.08] bg-white/[0.02] p-6 md:p-8'
        >
          <span className='text-[11px] font-bold uppercase tracking-[0.22em] text-white/40'>
            May not be a fit
          </span>
          <ul className='mt-6 space-y-4'>
            {WHO_NOT_FOR.map((item) => (
              <li key={item} className='flex items-start gap-3 text-[14px] leading-[1.55] text-white/55'>
                <X className='mt-0.5 h-4 w-4 shrink-0 text-white/25' />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </SectionShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 16 — PROOF / CASE STUDY
// ─────────────────────────────────────────────────────────────────────────────
function CaseStudyField({ label, value }: { label: string; value: string }) {
  return (
    <div className='border-b border-white/[0.06] pb-3 last:border-0 last:pb-0'>
      <p className='text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40'>
        {label}
      </p>
      <p className='mt-1 text-[14px] leading-[1.55] text-white/65'>{value}</p>
    </div>
  );
}

function Proof() {
  return (
    <SectionShell id='proof' surface='grid'>
      <SectionHeader
        eyebrow='Proof / Case studies'
        title='Real work. Real outcomes.'
        description='Verified Aurexis work is shared when we have client permission and verified results.'
      />

      <div className='mt-14 grid gap-10 lg:grid-cols-2 lg:items-start'>
        <div>
          <Reveal delay={0.1} className='mt-6'>
            <p className='max-w-lg text-[15px] leading-[1.65] text-white/60'>
              Case studies are published only when we have verified outcomes and client permission.
              The structure below is how we document Aurexis work.
            </p>
            <div className='mt-6'>
              <GhostButton href='/portfolio'>View Case Studies</GhostButton>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className='rounded-[28px] border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl md:p-8'>
            <p className='font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-electric-cyan)]/70'>
              Case-study format
            </p>
            <div className='mt-5 grid gap-4'>
              <CaseStudyField label='Business type' value='Verified client industry and size' />
              <CaseStudyField label='Original problem' value='What was slowing the business down' />
              <CaseStudyField label='Aurexis Solution' value='Business Systems Assessment™, Focused Improvement, Business Control System™ or Managed Operations™' />
              <CaseStudyField label='Tech Ecosystem capabilities' value='Presence, Flow, Core, Connect, Data Foundation™, Intelligence' />
              <CaseStudyField label='What changed' value='The specific operational or system improvement' />
              <CaseStudyField label='Verified outcome' value='The measured or observed result' />
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 17 — FAQ
// ─────────────────────────────────────────────────────────────────────────────
function FAQRow({
  q,
  a,
  idx,
  isOpen,
  onToggle,
}: {
  q: string;
  a: string;
  idx: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion() ?? false;
  return (
    <div
      className={cn(
        'border-b border-white/[0.08]',
        isOpen && 'bg-gradient-to-b from-[var(--color-electric-cyan)]/[0.04] to-transparent'
      )}
    >
      <button
        type='button'
        onClick={onToggle}
        aria-expanded={isOpen}
        className='flex w-full items-center justify-between gap-4 px-4 py-5 text-left transition hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-electric-cyan)]/60 md:px-6'
      >
        <span className='flex items-center gap-3'>
          <span className='font-mono text-[11px] text-white/35'>
            {String(idx + 1).padStart(2, '0')}
          </span>
          <span className='text-[15px] font-semibold text-white'>{q}</span>
        </span>
        <span
          className={cn(
            'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] text-white/60 transition',
            isOpen && 'rotate-45 border-[var(--color-electric-cyan)]/30 text-[var(--color-electric-cyan)]'
          )}
        >
          <Plus className='h-3.5 w-3.5' />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={reduce ? undefined : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className='overflow-hidden'
          >
            <p className='px-4 pb-5 text-[15px] leading-[1.65] text-white/60 md:px-6 md:pl-[3.25rem]'>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <SectionShell id='faq' surface='plain'>
      <SectionHeader
        eyebrow='FAQ'
        title='Common questions about Business Systems Assessment™.'
        align='center'
      />

      <div className='mx-auto mt-14 max-w-3xl overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.02]'>
        {ASSESSMENT_FAQS.map((item, i) => (
          <FAQRow
            key={item.q}
            q={item.q}
            a={item.a}
            idx={i}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </SectionShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 18 — FINAL CTA
// ─────────────────────────────────────────────────────────────────────────────
function FinalCta() {
  return (
    <SectionShell surface='beam'>
      <div className='text-center'>
        <span className='inline-block text-[11px] font-bold uppercase tracking-[0.28em] text-white/40'>
          Not sure what needs fixing first?
        </span>
        <h2 className='mx-auto mt-4 max-w-3xl text-3xl font-extrabold leading-[1.05] tracking-[-0.02em] text-white text-balance md:text-5xl'>
          Find the friction before you invest in the{' '}
          <em
            className='font-serif italic text-[var(--color-electric-cyan)] font-normal'
            style={{ filter: 'drop-shadow(0 0 22px rgba(0,240,255,0.32))' }}
          >
            solution
          </em>
          .
        </h2>
        <p className='mx-auto mt-5 max-w-2xl text-[16px] leading-[1.65] text-white/55'>
          Start with a Discovery Call. We will determine whether Business Systems Assessment™
          is the appropriate next step for your business.
        </p>
        <Reveal delay={0.1} className='mt-10'>
          <CyanCta href={SOLUTIONS_DISCOVERY_PANEL.buttonHref}>
            Book a Discovery Call
          </CyanCta>
        </Reveal>
        <Reveal delay={0.15} className='mt-4'>
          <p className='text-[12px] text-white/35'>
            Qualification conversation — not a free consulting session.
          </p>
        </Reveal>
      </div>
    </SectionShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
export function BusinessSystemsAssessmentPage() {
  return (
    <main className='flex-1 overflow-hidden'>
      <Hero />
      <WhenAssessmentMakesSense />
      <WhatAurexisInvestigates />
      <OperationalFrictionMap />
      <SymptomToRootCause />
      <WhatYouLeaveWith />
      <Prioritisation />
      <WhatHappensAfter />
      <AssessmentToSolutions />
      <WhatItIsNot />
      <HowItWorks />
      <ExampleScenario />
      <TechEcosystemConnection />
      <WhoFor />
      <Proof />
      <FAQ />
      <FinalCta />
    </main>
  );
}
