// src/components/sections/portfolio/PortfolioColophon.tsx
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { DISPATCH_NUMBER, VOLUME } from '@/data/portfolio-config';

const MONO = 'var(--font-geist-mono), ui-monospace, monospace';
const SERIF = 'var(--font-instrument-serif), ui-serif, Georgia, serif';

export function PortfolioColophon() {
  return (
    <section
      className="mt-24 pt-12 grid gap-x-[60px] gap-y-10 items-center grid-cols-1 lg:grid-cols-[1.5fr_1fr]"
      style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div>
        <div
          style={{
            fontFamily: SERIF,
            fontStyle: 'italic',
            fontSize: 120,
            lineHeight: 0.85,
            backgroundImage: 'linear-gradient(120deg, #00F0FF, #7C3AED)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: 12,
          }}
        >
          Fin.
        </div>
        <p
          style={{
            fontFamily: MONO,
            fontSize: 10,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#475569',
          }}
        >
          End of issue · No. {DISPATCH_NUMBER} · Vol. {VOLUME}
        </p>
      </div>

      <div>
        <h3
          style={{
            fontFamily: SERIF,
            fontStyle: 'italic',
            fontSize: 36,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: 12,
          }}
        >
          Inspired by these results?
        </h3>
        <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.55, marginBottom: 18 }}>
          Forty-five minutes. Tell us what you&apos;re building. We&apos;ll tell you what it actually needs.
        </p>
        <Link
          href="/contact#brief"
          className="inline-flex items-center gap-2.5 rounded-full font-semibold transition-opacity hover:opacity-90"
          style={{ background: '#fff', color: '#02040A', padding: '13px 24px', fontSize: 13 }}
        >
          Book a discovery <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
