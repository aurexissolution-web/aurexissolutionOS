// src/components/sections/contact/ContactFAQ.tsx
import { FAQ_ITEMS } from '@/data/contact-config';

const MONO = 'var(--font-geist-mono), ui-monospace, monospace';
const SERIF = 'var(--font-instrument-serif), ui-serif, Georgia, serif';
const SANS = 'var(--font-plus-jakarta), system-ui, sans-serif';

export function ContactFAQ() {
  return (
    <section
      className="contact-roster-faq"
      style={{ padding: '96px 0' }}
    >
      <div className="grid" style={{ gridTemplateColumns: '1fr 1.6fr', gap: 56 }}>
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
          Common
          <br />
          <span
            style={{
              fontFamily: SERIF,
              fontStyle: 'italic',
              fontWeight: 400,
              color: '#00F0FF',
            }}
          >
            questions.
          </span>
        </h2>
        <div>
          {FAQ_ITEMS.map((item, i) => (
            <details
              key={item.q}
              open={i === 0}
              style={{
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                borderTop: i === 0 ? '1px solid rgba(255,255,255,0.06)' : undefined,
                padding: '20px 0',
              }}
            >
              <summary
                className="flex items-center justify-between cursor-pointer"
                style={{
                  fontFamily: SANS,
                  fontWeight: 500,
                  fontSize: 17,
                  color: '#f5f5f7',
                  letterSpacing: '-0.005em',
                  gap: 24,
                }}
              >
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 10.5,
                    letterSpacing: '0.22em',
                    color: '#00F0FF',
                    flexShrink: 0,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ flex: 1 }}>{item.q}</span>
                <span
                  className="contact-roster-faq-toggle"
                  aria-hidden
                  style={{
                    color: '#475569',
                    fontSize: 22,
                    flexShrink: 0,
                    lineHeight: 1,
                  }}
                >
                  +
                </span>
              </summary>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: '#94a3b8',
                  maxWidth: 660,
                  margin: '14px 0 0',
                  paddingRight: 40,
                  paddingLeft: 'calc(10.5px * 5)',
                }}
              >
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
