// src/components/sections/contact/ContactCommittee.tsx
import { FOUNDERS } from '@/data/contact-config';
import { ContactFounderCard } from './ContactFounderCard';
import { ContactCommitteeCTA } from './ContactCommitteeCTA';

const MONO = 'var(--font-geist-mono), ui-monospace, monospace';
const SERIF = 'var(--font-instrument-serif), ui-serif, Georgia, serif';
const SANS = 'var(--font-plus-jakarta), system-ui, sans-serif';

export function ContactCommittee() {
  return (
    <section
      style={{
        padding: '96px 0',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Section header */}
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
            The Committee
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
            Founders take
            <br />
            every{' '}
            <span
              style={{
                fontFamily: SERIF,
                fontStyle: 'italic',
                fontWeight: 400,
                color: '#00F0FF',
                letterSpacing: '-0.03em',
              }}
            >
              first call.
            </span>
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
          No SDRs. No &ldquo;discovery&rdquo; reps. The three of us split the room — one of us will be on your call, and the same person will be on the project if you proceed.{' '}
          <em
            style={{
              color: '#f5f5f7',
              fontStyle: 'italic',
              fontFamily: SERIF,
              fontSize: 18,
            }}
          >
            We do the work we sell.
          </em>
        </p>
      </header>

      <div
        className="grid"
        style={{
          gridTemplateColumns: '1fr 1fr',
          gap: 20,
          marginBottom: 48,
          maxWidth: 760,
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '100%',
        }}
      >
        {FOUNDERS.map((f) => (
          <ContactFounderCard key={f.name} founder={f} />
        ))}
      </div>

      <ContactCommitteeCTA />
    </section>
  );
}
