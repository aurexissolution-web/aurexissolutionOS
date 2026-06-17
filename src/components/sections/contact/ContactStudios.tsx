// src/components/sections/contact/ContactStudios.tsx
import { STUDIOS } from '@/data/contact-config';
import { ContactStudioCard } from './ContactStudioCard';

const MONO = 'var(--font-geist-mono), ui-monospace, monospace';
const SERIF = 'var(--font-instrument-serif), ui-serif, Georgia, serif';
const SANS = 'var(--font-plus-jakarta), system-ui, sans-serif';

export function ContactStudios() {
  return (
    <section
      style={{
        padding: '96px 0',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <header
        className="grid items-end"
        style={{
          gridTemplateColumns: '1fr 1.5fr',
          gap: 56,
          marginBottom: 56,
        }}
      >
        <div>
          <p
            className="inline-flex items-center"
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#00F0FF',
              margin: '0 0 14px',
              gap: 10,
            }}
          >
            <span aria-hidden style={{ width: 20, height: 1, background: '#00F0FF' }} />
            Where we work
          </p>
          <h2
            style={{
              fontFamily: SANS,
              fontWeight: 800,
              fontSize: 'clamp(36px, 4.4vw, 60px)',
              lineHeight: 1,
              letterSpacing: '-0.035em',
              margin: 0,
              color: '#f5f5f7',
            }}
          >
            Two studios.
            <br />
            One{' '}
            <span
              style={{
                fontFamily: SERIF,
                fontStyle: 'italic',
                fontWeight: 400,
                color: '#00F0FF',
                letterSpacing: '-0.03em',
              }}
            >
              handshake
            </span>{' '}
            away.
          </h2>
        </div>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.6,
            color: '#94a3b8',
            maxWidth: 540,
            margin: 0,
          }}
        >
          We split the team between Kuala Lumpur and Sungai Petani — KL for client-facing work, SP for deep build. Walk-ins by appointment; coffee&rsquo;s on us.
        </p>
      </header>

      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 22 }}>
        {STUDIOS.map((s) => (
          <ContactStudioCard key={s.city} studio={s} />
        ))}
      </div>
    </section>
  );
}
