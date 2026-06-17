// src/app/portfolio/page.tsx
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { supabaseAdmin } from '@/lib/supabase/server';
import { PortfolioMasthead } from '@/components/sections/portfolio/PortfolioMasthead';
import { PortfolioFeatured } from '@/components/sections/portfolio/PortfolioFeatured';
import { PortfolioIndex } from '@/components/sections/portfolio/PortfolioIndex';
import { PortfolioColophon } from '@/components/sections/portfolio/PortfolioColophon';
import type { PortfolioItem } from '@/types/portal';

// Render on every request: admin edits show up immediately, no ISR staleness.
// Supabase env vars aren't available during `next build`, so we can't prerender either.
export const dynamic = 'force-dynamic';

export default async function PortfolioPage() {
  let items: PortfolioItem[] = [];
  try {
    const { data } = await supabaseAdmin
      .from('portfolio_items')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });
    items = (data ?? []) as PortfolioItem[];
  } catch (err) {
    console.error('[portfolio] failed to load items — check Supabase env vars and migration 012:', err);
  }

  const featured = items.find((it) => it.featured) ?? null;
  const rest = featured ? items.filter((it) => it.id !== featured.id) : items;
  const startIndex = featured ? 2 : 1;

  return (
    <div className="flex flex-col min-h-screen" style={{ background: '#02040A', color: '#f5f5f7' }}>
      <Navbar />
      <main className="flex-1 relative overflow-hidden">
        {/* Background radial washes */}
        <span
          aria-hidden="true"
          className="absolute top-0 right-0 pointer-events-none"
          style={{
            width: 700,
            height: 500,
            background: 'rgba(0,240,255,0.06)',
            filter: 'blur(140px)',
            borderRadius: '50%',
          }}
        />
        <span
          aria-hidden="true"
          className="absolute top-0 left-0 pointer-events-none"
          style={{
            width: 600,
            height: 400,
            background: 'rgba(124,58,237,0.07)',
            filter: 'blur(140px)',
            borderRadius: '50%',
          }}
        />

        <div className="relative z-10 mx-auto max-w-[1240px] px-6 lg:px-12 pt-36 pb-20">
          <PortfolioMasthead casesLive={items.length} />
          {featured && <PortfolioFeatured item={featured} totalCases={items.length} />}
          {rest.length > 0 && <PortfolioIndex items={rest} startIndex={startIndex} />}
          <PortfolioColophon />
        </div>
      </main>
      <Footer />
    </div>
  );
}
