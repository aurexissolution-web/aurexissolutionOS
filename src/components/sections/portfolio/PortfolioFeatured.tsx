// src/components/sections/portfolio/PortfolioFeatured.tsx
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { PortfolioItem } from '@/types/portal';
import { CATEGORY_LABEL } from '@/data/portfolio-config';
import { PortfolioFolioDivider } from './PortfolioFolioDivider';

interface Props {
  item: PortfolioItem;
  totalCases: number;
}

const MONO = 'var(--font-geist-mono), ui-monospace, monospace';
const SERIF = 'var(--font-instrument-serif), ui-serif, Georgia, serif';

export function PortfolioFeatured({ item, totalCases }: Props) {
  const [first, ...rest] = item.title.split(' ');
  const titleLineOne = first;
  const titleLineTwo = item.accent_word ?? rest.join(' ');

  const cover = item.images?.[0];
  const metric1 = item.outcome_metrics?.[0];
  const metric2 = item.outcome_metrics?.[1];

  const totalPadded = String(totalCases).padStart(2, '0');

  return (
    <section>
      <PortfolioFolioDivider
        title="Folio I —"
        italicWord="Featured"
        count={`01 / ${totalPadded}`}
      />

      <div
        className="grid gap-12 items-stretch mb-3 pt-[30px] pb-10 grid-cols-1 lg:grid-cols-[1.2fr_1fr]"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Cover */}
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: 18,
            border: '1px solid rgba(255,255,255,0.08)',
            height: 360,
            backgroundImage: cover
              ? `linear-gradient(135deg, rgba(26,32,48,0.6), rgba(15,20,32,0.6) 60%, rgba(26,32,48,0.6)), url(${cover})`
              : 'linear-gradient(135deg, #1a2030, #0f1420 60%, #1a2030)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Radial wash overlay (matches mockup) */}
          {!cover && (
            <span
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 60% 60% at 30% 40%, rgba(0,240,255,0.15), transparent 60%), radial-gradient(ellipse 50% 50% at 80% 80%, rgba(124,58,237,0.18), transparent 60%)',
              }}
            />
          )}

          {/* Live pill */}
          {item.live_url && (
            <span
              className="absolute top-4 right-4 rounded-full px-[11px] py-[6px] backdrop-blur"
              style={{
                background: 'rgba(0,0,0,0.55)',
                border: '1px solid rgba(0,240,255,0.4)',
                fontFamily: MONO,
                fontSize: '9.5px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#00F0FF',
              }}
            >
              <span
                aria-hidden="true"
                className="inline-block rounded-full mr-[6px] align-middle"
                style={{ width: 6, height: 6, background: '#00F0FF', boxShadow: '0 0 8px #00F0FF' }}
              />
              Live
            </span>
          )}

          {/* Bottom caption */}
          <span
            className="absolute bottom-4 left-[18px]"
            style={{
              fontFamily: MONO,
              fontSize: '9px',
              letterSpacing: '0.3em',
              color: 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase',
            }}
          >
            COVER · {item.title.toUpperCase()}
          </span>
        </div>

        {/* Copy side */}
        <div className="flex flex-col justify-center py-3.5">
          <div
            style={{
              fontFamily: MONO,
              fontSize: '10px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#00F0FF',
              marginBottom: 14,
            }}
          >
            {CATEGORY_LABEL[item.category]}
            {item.client_name ? ` · ${item.client_name}` : ''}
          </div>

          <h2
            style={{
              fontFamily: SERIF,
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 64,
              lineHeight: 0.94,
              letterSpacing: '-0.028em',
              marginBottom: 16,
            }}
          >
            {titleLineOne}
            {titleLineTwo && (
              <>
                <br />
                {titleLineTwo}
              </>
            )}
          </h2>

          {item.pull_quote && (
            <p
              style={{
                fontFamily: SERIF,
                fontStyle: 'italic',
                fontSize: 22,
                lineHeight: 1.4,
                color: '#cbd5e1',
                marginBottom: 22,
              }}
            >
              &ldquo;{item.pull_quote}&rdquo;
            </p>
          )}

          {(metric1 || metric2) && (
            <div
              className="flex gap-9 mb-6 py-[18px]"
              style={{
                borderTop: '1px solid rgba(255,255,255,0.08)',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {metric1 && (
                <div>
                  <div
                    style={{
                      fontFamily: SERIF,
                      fontStyle: 'italic',
                      fontSize: 42,
                      lineHeight: 1,
                      color: '#00F0FF',
                    }}
                  >
                    {metric1.value}
                  </div>
                  <div
                    className="mt-1.5"
                    style={{
                      fontFamily: MONO,
                      fontSize: 9,
                      letterSpacing: '0.26em',
                      color: '#94a3b8',
                      textTransform: 'uppercase',
                    }}
                  >
                    {metric1.label}
                  </div>
                </div>
              )}
              {metric2 && (
                <div>
                  <div
                    style={{
                      fontFamily: SERIF,
                      fontStyle: 'italic',
                      fontSize: 42,
                      lineHeight: 1,
                      color: '#F59E0B',
                    }}
                  >
                    {metric2.value}
                  </div>
                  <div
                    className="mt-1.5"
                    style={{
                      fontFamily: MONO,
                      fontSize: 9,
                      letterSpacing: '0.26em',
                      color: '#94a3b8',
                      textTransform: 'uppercase',
                    }}
                  >
                    {metric2.label}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3 items-center">
            <Link
              href={`/portfolio/${item.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full font-semibold transition-opacity hover:opacity-90"
              style={{
                background: '#fff',
                color: '#02040A',
                padding: '11px 22px',
                fontSize: 13,
                letterSpacing: '0.02em',
              }}
            >
              Read the case <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            {item.live_url && (
              <a
                href={item.live_url}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-white"
                style={{
                  color: '#00F0FF',
                  fontFamily: MONO,
                  fontSize: 11,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  padding: '11px 8px',
                  borderBottom: '1px solid #00F0FF',
                }}
              >
                View live →
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
