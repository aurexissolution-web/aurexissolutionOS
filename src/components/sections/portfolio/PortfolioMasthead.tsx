// src/components/sections/portfolio/PortfolioMasthead.tsx
import { DISPATCH_NUMBER, ISSUE_NAME, VOLUME, todayDispatchDate } from '@/data/portfolio-config';

interface Props {
  casesLive: number;
}

const MONO = 'var(--font-geist-mono), ui-monospace, monospace';
const SERIF = 'var(--font-instrument-serif), ui-serif, Georgia, serif';

export function PortfolioMasthead({ casesLive }: Props) {
  const today = todayDispatchDate();

  return (
    <header>
      {/* Top rule */}
      <div
        className="flex items-center gap-3.5 pb-[18px]"
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          fontFamily: MONO,
          fontSize: '10.5px',
          letterSpacing: '0.26em',
          textTransform: 'uppercase',
          color: '#94a3b8',
        }}
      >
        <span className="flex items-center gap-2" style={{ color: '#00F0FF' }}>
          <span
            aria-hidden="true"
            className="inline-block rounded-full motion-safe:animate-[portfolioPulse_2s_infinite]"
            style={{ width: 7, height: 7, background: '#00F0FF', boxShadow: '0 0 10px #00F0FF' }}
          />
          Live · {today}
        </span>
        <span className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.10)' }} />
        <span style={{ color: '#f5f5f7' }}>
          Dispatch № {DISPATCH_NUMBER} · Vol. {VOLUME} · {ISSUE_NAME}
        </span>
      </div>

      {/* Headline */}
      <h1
        className="my-7"
        style={{
          fontFamily: SERIF,
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 'clamp(72px, 14vw, 200px)',
          lineHeight: 0.9,
          letterSpacing: '-0.035em',
          marginBottom: '22px',
        }}
      >
        The{' '}
        <span
          style={{
            backgroundImage: 'linear-gradient(120deg, #00F0FF, #7C3AED 60%, #A78BFA)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Work
        </span>
        <br />
        Issue.
      </h1>

      {/* Meta-ledger + lede */}
      <div
        className="grid gap-x-[60px] gap-y-8 pb-9 grid-cols-1 md:grid-cols-[320px_1fr]"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
      >
        <dl style={{ fontFamily: MONO, fontSize: '11px', color: '#94a3b8' }}>
          <MetaRow label="Editor" value="Aurexis Studio" />
          <MetaRow label="Edition" value="Q2 · 2026" />
          <MetaRow label="Filed under" value="Selected Work" />
          <MetaRow label="Cases live" value={`${casesLive} engagements`} />
          <MetaRow label="Surfaces" value="Web · Mobile · AI" />
        </dl>

        <p
          style={{
            fontFamily: 'var(--font-plus-jakarta), system-ui, sans-serif',
            fontSize: '17px',
            lineHeight: 1.55,
            color: '#cbd5e1',
            maxWidth: 640,
          }}
        >
          <span
            className="float-left pr-3 pt-2"
            style={{
              fontFamily: SERIF,
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: '76px',
              lineHeight: 0.82,
              color: '#00F0FF',
            }}
            aria-hidden="true"
          >
            T
          </span>
          welve engagements. Four service lines. Every page in this issue is a case we&apos;ve actually shipped — what the client came to us with, how we attacked it, and{' '}
          <em
            style={{
              fontFamily: SERIF,
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: '19px',
              color: '#fff',
            }}
          >
            the number we moved.
          </em>{' '}
          Hover any row to peek; click to read the full file.
        </p>
      </div>
    </header>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="grid py-2 grid-cols-[90px_1fr]"
      style={{ borderBottom: '1px dashed rgba(255,255,255,0.07)' }}
    >
      <dt
        style={{
          color: '#cbd5e1',
          fontWeight: 500,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          fontSize: '9.5px',
        }}
      >
        {label}
      </dt>
      <dd>{value}</dd>
    </div>
  );
}
