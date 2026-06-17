// src/components/sections/portfolio/PortfolioFolioDivider.tsx
import { cn } from '@/lib/utils';

interface Props {
  title: string;
  italicWord?: string;
  count: string;
  className?: string;
}

export function PortfolioFolioDivider({ title, italicWord, count, className }: Props) {
  return (
    <div
      className={cn('flex items-center gap-3.5 my-14 mb-6', className)}
      style={{
        fontFamily: 'var(--font-geist-mono), ui-monospace, monospace',
        fontSize: '10.5px',
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        color: '#00F0FF',
      }}
    >
      <span
        aria-hidden="true"
        className="inline-block rounded-full motion-safe:animate-[portfolioPulse_2s_infinite]"
        style={{
          width: 8,
          height: 8,
          background: '#00F0FF',
          boxShadow: '0 0 10px #00F0FF',
        }}
      />
      <span className="font-semibold" style={{ color: '#f5f5f7' }}>
        {title}
        {italicWord && (
          <>
            {' '}
            <span style={{ color: '#00F0FF', fontStyle: 'normal' }}>{italicWord}</span>
          </>
        )}
      </span>
      <span className="flex-1 h-px" style={{ background: 'rgba(0,240,255,0.18)' }} />
      <span style={{ color: '#64748b' }}>{count}</span>
    </div>
  );
}
