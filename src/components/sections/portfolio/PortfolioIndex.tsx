// src/components/sections/portfolio/PortfolioIndex.tsx
import Link from 'next/link';
import type { PortfolioItem } from '@/types/portal';
import { CATEGORY_ACCENT, CATEGORY_LABEL } from '@/data/portfolio-config';
import { PortfolioFolioDivider } from './PortfolioFolioDivider';

interface Props {
  items: PortfolioItem[];
  startIndex: number; // 1 if no featured, 2 if featured
}

const MONO = 'var(--font-geist-mono), ui-monospace, monospace';
const SERIF = 'var(--font-instrument-serif), ui-serif, Georgia, serif';

export function PortfolioIndex({ items, startIndex }: Props) {
  return (
    <section>
      <PortfolioFolioDivider
        title="Folio II —"
        italicWord="The Index"
        count={`${items.length} case${items.length === 1 ? '' : 's'}`}
      />

      <div className="pt-1">
        {items.map((item, i) => {
          const accent = CATEGORY_ACCENT[item.category];
          const indexLabel = String(startIndex + i).padStart(2, '0');
          const year = new Date(item.created_at).getFullYear();
          const metric = item.outcome_metrics?.[0];
          const thumb = item.images?.[0];

          return (
            <Link
              key={item.id}
              href={`/portfolio/${item.slug}`}
              className="portfolio-row group block"
              style={
                {
                  '--row-accent': accent,
                } as React.CSSProperties
              }
            >
              {/* Desktop grid */}
              <div
                className="hidden lg:grid items-center gap-6 py-[22px] px-2 portfolio-row-grid transition-colors"
                style={{
                  gridTemplateColumns: '36px 60px 1fr 180px 140px 50px',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <span style={{ fontFamily: MONO, fontSize: 11, color: '#475569' }}>{indexLabel}</span>
                <span
                  className="block"
                  style={{
                    width: 60,
                    height: 42,
                    borderRadius: 6,
                    border: '1px solid rgba(255,255,255,0.06)',
                    background: thumb
                      ? `url(${thumb}) center / cover no-repeat`
                      : 'linear-gradient(135deg, #1a2030, #0f1420)',
                  }}
                />
                <span>
                  <span
                    className="block font-bold text-white"
                    style={{ fontSize: 22, letterSpacing: '-0.015em' }}
                  >
                    {item.title}
                  </span>
                  <span
                    className="block mt-1"
                    style={{
                      fontFamily: MONO,
                      fontWeight: 400,
                      fontSize: 10,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: '#64748b',
                    }}
                  >
                    {CATEGORY_LABEL[item.category]} · {year}
                  </span>
                </span>
                <span
                  className="line-clamp-2"
                  style={{ fontSize: 12.5, color: '#94a3b8', lineHeight: 1.5 }}
                >
                  {item.description}
                </span>
                <span className="text-right">
                  <span
                    className="block"
                    style={{
                      fontFamily: SERIF,
                      fontStyle: 'italic',
                      fontSize: 38,
                      lineHeight: 1,
                      color: accent,
                    }}
                  >
                    {metric?.value ?? '—'}
                  </span>
                  {metric?.label && (
                    <span
                      className="block mt-1.5"
                      style={{
                        fontFamily: MONO,
                        fontSize: 9,
                        letterSpacing: '0.24em',
                        textTransform: 'uppercase',
                        color: '#64748b',
                      }}
                    >
                      {metric.label}
                    </span>
                  )}
                </span>
                <span
                  className="text-right portfolio-row-arrow transition-all"
                  style={{
                    fontFamily: SERIF,
                    fontStyle: 'italic',
                    fontSize: 26,
                    color: '#475569',
                  }}
                >
                  →
                </span>
              </div>

              {/* Mobile card */}
              <div
                className="lg:hidden p-5 rounded-2xl mb-4 transition-colors portfolio-row-card"
                style={{
                  border: '1px solid rgba(255,255,255,0.06)',
                  background: 'rgba(255,255,255,0.01)',
                }}
              >
                <div
                  className="-mx-5 -mt-5 mb-4 h-32 overflow-hidden rounded-t-2xl"
                  style={{
                    background: thumb
                      ? `url(${thumb}) center / cover no-repeat`
                      : 'linear-gradient(135deg, #1a2030, #0f1420)',
                  }}
                />
                <div className="flex items-center justify-between mb-2">
                  <span style={{ fontFamily: MONO, fontSize: 11, color: '#475569' }}>{indexLabel}</span>
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 9,
                      letterSpacing: '0.24em',
                      textTransform: 'uppercase',
                      color: '#64748b',
                    }}
                  >
                    {CATEGORY_LABEL[item.category]} · {year}
                  </span>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-xs mb-3" style={{ color: '#94a3b8', lineHeight: 1.5 }}>
                  {item.description}
                </p>
                <div className="flex items-end justify-between">
                  <span
                    style={{
                      fontFamily: SERIF,
                      fontStyle: 'italic',
                      fontSize: 30,
                      lineHeight: 1,
                      color: accent,
                    }}
                  >
                    {metric?.value ?? '—'}
                  </span>
                  <span
                    style={{
                      fontFamily: SERIF,
                      fontStyle: 'italic',
                      fontSize: 24,
                      color: '#475569',
                    }}
                  >
                    →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
