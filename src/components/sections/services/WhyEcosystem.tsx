"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

type Row = {
  topic: string;
  buy: string;
  saas: string;
  aurexis: string;
};

const ROWS: Row[] = [
  {
    topic: "Tools talk to each other",
    buy: "Manual bridges",
    saas: "Within bundle only",
    aurexis: "Designed together",
  },
  {
    topic: "Source of truth",
    buy: "Multiple",
    saas: "Vendor-controlled",
    aurexis: "Yours",
  },
  {
    topic: "Customisation",
    buy: "Per tool",
    saas: "Limited",
    aurexis: "Built for your workflow",
  },
  {
    topic: "Scales with you",
    buy: "Breaks at scale",
    saas: "Higher tier = more $$",
    aurexis: "Same system, more capacity",
  },
  {
    topic: "Long-term cost",
    buy: "High (subscription stack)",
    saas: "Predictable but high",
    aurexis: "One build + retainer",
  },
];

const VERDICT = {
  buy: "Cheap to start, expensive to maintain.",
  saas: "Convenient, never quite fits.",
  aurexis: { lead: "Built once, ", em: "runs forever", rest: "." },
};

function ComparisonRow({
  row,
  index,
  reduce,
}: {
  row: Row;
  index: number;
  reduce: boolean;
}) {
  const reveal = reduce
    ? { initial: false, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 8 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.25 },
        transition: {
          duration: 0.55,
          ease: EASE,
          delay: 0.32 + index * 0.05,
        },
      };

  return (
    <motion.tr {...reveal} className="w-row">
      <th scope="row" className="w-cell w-cell-topic">
        {row.topic}
      </th>
      <td className="w-cell w-cell-buy" data-label="Buying separately">
        <span className="w-dot" aria-hidden />
        <span>{row.buy}</span>
      </td>
      <td className="w-cell w-cell-saas" data-label="SaaS bundle">
        <span className="w-dot" aria-hidden />
        <span>{row.saas}</span>
      </td>
      <td className="w-cell w-cell-aurexis" data-label="Aurexis Ecosystem">
        <span className="w-dot" aria-hidden />
        <span>{row.aurexis}</span>
      </td>
    </motion.tr>
  );
}

export function WhyEcosystem() {
  const reduceMotion = useReducedMotion();
  const reduce = !!reduceMotion;

  const reveal = (delay: number) =>
    reduce
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.7, ease: EASE, delay },
        };

  return (
    <section
      aria-labelledby="why-ecosystem-heading"
      className="relative isolate w-full"
    >
      <style>{`
        .w-scope {
          --w-cream-95: rgba(244, 238, 225, 0.95);
          --w-cream-65: rgba(244, 238, 225, 0.65);
          --w-cream-55: rgba(244, 238, 225, 0.55);
          --w-cream-45: rgba(244, 238, 225, 0.45);
          --w-cream-30: rgba(244, 238, 225, 0.30);
          --w-line:        rgba(244, 238, 225, 0.08);
          --w-line-strong: rgba(244, 238, 225, 0.18);
          --w-emerald: #6FA68A;
          --w-emerald-soft: rgba(111, 166, 138, 0.55);
          --w-emerald-wash: rgba(111, 166, 138, 0.10);
          --w-emerald-wash-soft: rgba(111, 166, 138, 0.06);
        }

        .w-table {
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
          border-top: 1px solid var(--w-line-strong);
        }
        .w-col-topic   { width: 28%; }
        .w-col-opt     { width: 23%; }
        .w-col-aurexis { width: 26%; }

        .w-h {
          padding: 16px 22px;
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 9.5px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          text-align: left;
          font-weight: 400;
          border-bottom: 1px solid var(--w-line-strong);
          vertical-align: middle;
        }
        .w-h-label     { color: var(--w-cream-30); }
        .w-h-buy       { color: var(--w-cream-45); }
        .w-h-saas      { color: var(--w-cream-45); }
        .w-h-aurexis {
          color: var(--w-emerald);
          background: var(--w-emerald-wash);
          font-weight: 600;
          box-shadow: inset 0 1px 0 var(--w-emerald-soft);
        }

        .w-row > * {
          padding: 14px 22px;
          border-bottom: 1px solid var(--w-line);
          vertical-align: middle;
        }
        .w-cell-topic {
          font-family: var(--font-serif), Georgia, serif;
          font-style: italic;
          font-weight: 400;
          font-size: 16px;
          color: var(--w-cream-95);
          letter-spacing: -0.012em;
          text-align: left;
        }
        .w-cell-buy, .w-cell-saas {
          font-family: var(--font-sans), system-ui, sans-serif;
          font-weight: 300;
          font-size: 13.5px;
          line-height: 1.4;
          color: var(--w-cream-45);
        }
        .w-cell-aurexis {
          font-family: var(--font-sans), system-ui, sans-serif;
          font-weight: 400;
          font-size: 13.5px;
          line-height: 1.4;
          color: var(--w-cream-95);
          background: var(--w-emerald-wash-soft);
        }

        .w-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          display: inline-block;
          margin-right: 8px;
          vertical-align: middle;
          flex-shrink: 0;
        }
        .w-cell-buy .w-dot, .w-cell-saas .w-dot { background: var(--w-cream-30); }
        .w-cell-aurexis .w-dot { background: var(--w-emerald); }

        .w-verdict-row > * {
          padding: 20px 22px;
          font-family: var(--font-serif), Georgia, serif;
          font-style: italic;
          font-size: 15px;
          line-height: 1.4;
          border-top: 1px solid var(--w-line-strong);
          vertical-align: middle;
        }
        .w-v-label {
          font-family: var(--font-mono), ui-monospace, monospace;
          font-style: normal;
          font-size: 9.5px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--w-cream-30);
          font-weight: 400;
          text-align: left;
        }
        .w-v-buy, .w-v-saas { color: var(--w-cream-55); }
        .w-v-aurexis {
          color: var(--w-emerald);
          background: var(--w-emerald-wash);
          font-weight: 500;
        }
        .w-v-aurexis em {
          color: var(--w-cream-95);
          font-style: italic;
        }

        /* Mobile — collapse table to stacked row cards */
        @media (max-width: 640px) {
          .w-table, .w-table thead, .w-table tbody, .w-table tfoot,
          .w-table tr, .w-table th, .w-table td { display: block; }
          .w-table { table-layout: auto; border-top: 1px solid var(--w-line-strong); }
          .w-table thead { display: none; }

          .w-row { padding: 14px 0 4px; border-bottom: 1px solid var(--w-line); }
          .w-row > * { padding: 0; border: 0; box-shadow: none; }

          .w-cell-topic {
            display: block;
            font-size: 17px;
            padding: 0 0 10px;
          }
          .w-cell-buy, .w-cell-saas, .w-cell-aurexis {
            display: grid;
            grid-template-columns: 130px 1fr;
            gap: 14px;
            align-items: baseline;
            padding: 8px 12px;
            margin: 0 -12px;
          }
          .w-cell-buy::before, .w-cell-saas::before, .w-cell-aurexis::before {
            content: attr(data-label);
            font-family: var(--font-mono), ui-monospace, monospace;
            font-size: 9px;
            letter-spacing: 0.30em;
            text-transform: uppercase;
            color: var(--w-cream-45);
          }
          .w-cell-aurexis::before { color: var(--w-emerald); }

          .w-verdict-row { display: block; padding: 14px 0; border-top: 1px solid var(--w-line-strong); }
          .w-verdict-row > * {
            display: grid;
            grid-template-columns: 130px 1fr;
            gap: 14px;
            align-items: baseline;
            padding: 8px 12px;
            margin: 0 -12px;
            border-top: 0;
            font-size: 14px;
          }
          .w-verdict-row .w-v-label { font-style: normal; padding-bottom: 12px; }
          .w-v-buy::before, .w-v-saas::before, .w-v-aurexis::before {
            content: attr(data-label);
            font-family: var(--font-mono), ui-monospace, monospace;
            font-style: normal;
            font-size: 9px;
            letter-spacing: 0.30em;
            text-transform: uppercase;
            color: var(--w-cream-45);
          }
          .w-v-aurexis::before { color: var(--w-emerald); }
        }
      `}</style>

      <div className="w-scope mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 xl:px-20 py-10 md:py-12 lg:py-14">
        {/* Section header */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-y-5 md:gap-x-8 items-end mb-8">
          <div>
            <motion.p
              {...reveal(0)}
              className="font-mono text-[11px] uppercase tracking-[0.32em] mb-4"
              style={{ color: "var(--w-cream-55)" }}
            >
              <span style={{ color: "var(--w-cream-45)" }} className="mr-2">
                05
              </span>
              <span style={{ color: "var(--w-cream-30)" }} className="mr-2">
                /
              </span>
              Why an ecosystem
            </motion.p>
            <motion.h2
              id="why-ecosystem-heading"
              {...reveal(0.08)}
              className="font-serif italic font-normal m-0 max-w-[22ch]"
              style={{
                color: "var(--w-cream-95)",
                fontSize: "clamp(1.625rem, 2.6vw, 2.25rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.018em",
              }}
            >
              Why we&rsquo;d rather build one than glue four together.
            </motion.h2>
          </div>
          <motion.p
            {...reveal(0.16)}
            className="font-serif italic m-0 max-w-[28ch] md:text-right md:self-end"
            style={{
              color: "var(--w-cream-65)",
              fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
              lineHeight: 1.5,
              letterSpacing: "0.005em",
            }}
          >
            Cheap to start,{" "}
            <em
              className="not-italic"
              style={{
                color: "var(--w-cream-95)",
                fontStyle: "italic",
              }}
            >
              expensive to maintain
            </em>
            {" "}— or built once.
          </motion.p>
        </div>

        {/* Comparison ledger */}
        <motion.div
          {...(reduce
            ? { initial: false, animate: { opacity: 1, scale: 1, y: 0 } }
            : {
                initial: { opacity: 0, scale: 0.99, y: 8 },
                whileInView: { opacity: 1, scale: 1, y: 0 },
                viewport: { once: true, amount: 0.2 },
                transition: { duration: 0.8, ease: EASE, delay: 0.18 },
              })}
        >
          <table className="w-table">
            <colgroup>
              <col className="w-col-topic" />
              <col className="w-col-opt" />
              <col className="w-col-opt" />
              <col className="w-col-aurexis" />
            </colgroup>
            <thead>
              <motion.tr {...reveal(0.26)}>
                <th scope="col" className="w-h w-h-label">
                  Criterion
                </th>
                <th scope="col" className="w-h w-h-buy">
                  Buying separately
                </th>
                <th scope="col" className="w-h w-h-saas">
                  SaaS bundle
                </th>
                <th
                  scope="col"
                  className="w-h w-h-aurexis"
                  aria-current="true"
                >
                  Aurexis Ecosystem
                </th>
              </motion.tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <ComparisonRow
                  key={row.topic}
                  row={row}
                  index={i}
                  reduce={reduce}
                />
              ))}
            </tbody>
            <tfoot>
              <motion.tr {...reveal(0.62)} className="w-verdict-row">
                <th scope="row" className="w-v-label">
                  Verdict
                </th>
                <td className="w-v-buy" data-label="Buying separately">
                  {VERDICT.buy}
                </td>
                <td className="w-v-saas" data-label="SaaS bundle">
                  {VERDICT.saas}
                </td>
                <td className="w-v-aurexis" data-label="Aurexis Ecosystem">
                  {VERDICT.aurexis.lead}
                  <em
                    className="not-italic"
                    style={{
                      color: "var(--w-cream-95)",
                      fontStyle: "italic",
                    }}
                  >
                    {VERDICT.aurexis.em}
                  </em>
                  {VERDICT.aurexis.rest}
                </td>
              </motion.tr>
            </tfoot>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
