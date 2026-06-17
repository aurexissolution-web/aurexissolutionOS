"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type {
  ComparisonRow,
  Pillar,
  SplitText,
  VerdictCell,
} from "@/data/pillars";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * "Why custom" comparison ledger for sub-service pillar pages.
 *
 * Mirrors `WhyEcosystem` (used by /services/ecosystem) — same table-based
 * comparison ledger with mono column headers, italic serif criterion
 * column, neutral grey dots for competitor cells, accent dot + tinted
 * column for the rightmost (Aurexis) cell, and a verdict tfoot row.
 *
 * Differences:
 *   1. **Variable column count** — AI/Mobile have 3 columns, Web has 4.
 *      The component reads `columns` length and renders accordingly;
 *      table-layout: auto distributes the remaining width across
 *      competitor columns.
 *   2. **Pillar accent** (violet / blue / emerald) replaces the
 *      ecosystem's emerald in: column header background tint, accent
 *      dots, accent-column cell tint, verdict-row Aurexis cell.
 */
export function PillarComparison({ pillar }: { pillar: Pillar }) {
  const reduceMotion = useReducedMotion();
  const reduce = !!reduceMotion;
  const { accent, comparison } = pillar;

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
      aria-labelledby="pillar-comparison-heading"
      className="relative isolate w-full"
    >
      <style>{`
        .pc-scope {
          --pc-cream-95: rgba(244, 238, 225, 0.95);
          --pc-cream-65: rgba(244, 238, 225, 0.65);
          --pc-cream-55: rgba(244, 238, 225, 0.55);
          --pc-cream-45: rgba(244, 238, 225, 0.45);
          --pc-cream-30: rgba(244, 238, 225, 0.30);
          --pc-line:        rgba(244, 238, 225, 0.08);
          --pc-line-strong: rgba(244, 238, 225, 0.18);
          --pc-accent:           ${accent.hex};
          --pc-accent-soft:      rgba(${accent.rgb}, 0.55);
          --pc-accent-wash:      rgba(${accent.rgb}, 0.10);
          --pc-accent-wash-soft: rgba(${accent.rgb}, 0.06);
        }

        .pc-table {
          width: 100%;
          border-collapse: collapse;
          table-layout: auto;
          border-top: 1px solid var(--pc-line-strong);
        }

        .pc-h {
          padding: 16px 22px;
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 9.5px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          text-align: left;
          font-weight: 400;
          border-bottom: 1px solid var(--pc-line-strong);
          vertical-align: middle;
        }
        .pc-h-label  { color: var(--pc-cream-30); }
        .pc-h-comp   { color: var(--pc-cream-45); }
        .pc-h-accent {
          color: var(--pc-accent);
          background: var(--pc-accent-wash);
          font-weight: 600;
          box-shadow: inset 0 1px 0 var(--pc-accent-soft);
        }

        .pc-row > * {
          padding: 14px 22px;
          border-bottom: 1px solid var(--pc-line);
          vertical-align: middle;
        }
        .pc-cell-topic {
          font-family: var(--font-serif), Georgia, serif;
          font-style: italic;
          font-weight: 400;
          font-size: 16px;
          color: var(--pc-cream-95);
          letter-spacing: -0.012em;
          text-align: left;
        }
        .pc-cell-comp {
          font-family: var(--font-sans), system-ui, sans-serif;
          font-weight: 300;
          font-size: 13.5px;
          line-height: 1.4;
          color: var(--pc-cream-45);
        }
        .pc-cell-accent {
          font-family: var(--font-sans), system-ui, sans-serif;
          font-weight: 400;
          font-size: 13.5px;
          line-height: 1.4;
          color: var(--pc-cream-95);
          background: var(--pc-accent-wash-soft);
        }

        .pc-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          display: inline-block;
          margin-right: 8px;
          vertical-align: middle;
          flex-shrink: 0;
        }
        .pc-cell-comp .pc-dot   { background: var(--pc-cream-30); }
        .pc-cell-accent .pc-dot { background: var(--pc-accent); }

        .pc-verdict-row > * {
          padding: 20px 22px;
          font-family: var(--font-serif), Georgia, serif;
          font-style: italic;
          font-size: 15px;
          line-height: 1.4;
          border-top: 1px solid var(--pc-line-strong);
          vertical-align: middle;
        }
        .pc-v-label {
          font-family: var(--font-mono), ui-monospace, monospace;
          font-style: normal;
          font-size: 9.5px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--pc-cream-30);
          font-weight: 400;
          text-align: left;
        }
        .pc-v-comp { color: var(--pc-cream-55); }
        .pc-v-accent {
          color: var(--pc-accent);
          background: var(--pc-accent-wash);
          font-weight: 500;
        }
        .pc-v-accent em {
          color: var(--pc-cream-95);
          font-style: italic;
        }

        /* Mobile — collapse table to stacked row cards */
        @media (max-width: 640px) {
          .pc-table, .pc-table thead, .pc-table tbody, .pc-table tfoot,
          .pc-table tr, .pc-table th, .pc-table td { display: block; }
          .pc-table { table-layout: auto; border-top: 1px solid var(--pc-line-strong); }
          .pc-table thead { display: none; }

          .pc-row { padding: 14px 0 4px; border-bottom: 1px solid var(--pc-line); }
          .pc-row > * { padding: 0; border: 0; box-shadow: none; }

          .pc-cell-topic {
            display: block;
            font-size: 17px;
            padding: 0 0 10px;
          }
          .pc-cell-comp, .pc-cell-accent {
            display: grid;
            grid-template-columns: 130px 1fr;
            gap: 14px;
            align-items: baseline;
            padding: 8px 12px;
            margin: 0 -12px;
          }
          .pc-cell-comp::before, .pc-cell-accent::before {
            content: attr(data-label);
            font-family: var(--font-mono), ui-monospace, monospace;
            font-size: 9px;
            letter-spacing: 0.30em;
            text-transform: uppercase;
            color: var(--pc-cream-45);
          }
          .pc-cell-accent::before { color: var(--pc-accent); }

          .pc-verdict-row { display: block; padding: 14px 0; border-top: 1px solid var(--pc-line-strong); }
          .pc-verdict-row > * {
            display: grid;
            grid-template-columns: 130px 1fr;
            gap: 14px;
            align-items: baseline;
            padding: 8px 12px;
            margin: 0 -12px;
            border-top: 0;
            font-size: 14px;
          }
          .pc-verdict-row .pc-v-label { font-style: normal; padding-bottom: 12px; }
          .pc-v-comp::before, .pc-v-accent::before {
            content: attr(data-label);
            font-family: var(--font-mono), ui-monospace, monospace;
            font-style: normal;
            font-size: 9px;
            letter-spacing: 0.30em;
            text-transform: uppercase;
            color: var(--pc-cream-45);
          }
          .pc-v-accent::before { color: var(--pc-accent); }
        }
      `}</style>

      <div className="pc-scope mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 xl:px-20 pt-4 md:pt-6 lg:pt-6 pb-10 md:pb-12 lg:pb-14">
        {/* Section header */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-y-5 md:gap-x-8 items-end mb-8">
          <div>
            <motion.p
              {...reveal(0)}
              className="font-mono text-[11px] uppercase tracking-[0.32em] mb-4"
              style={{ color: "var(--pc-cream-55)" }}
            >
              <span style={{ color: "var(--pc-cream-45)" }} className="mr-2">
                05
              </span>
              <span style={{ color: "var(--pc-cream-30)" }} className="mr-2">
                /
              </span>
              {comparison.eyebrowLabel}
            </motion.p>
            <motion.h2
              id="pillar-comparison-heading"
              {...reveal(0.08)}
              className="font-serif italic font-normal m-0 max-w-[22ch]"
              style={{
                color: "var(--pc-cream-95)",
                fontSize: "clamp(1.625rem, 2.6vw, 2.25rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.018em",
              }}
            >
              {comparison.headline.lead}
              <em
                className="not-italic"
                style={{ color: "var(--pc-accent)", fontStyle: "italic" }}
              >
                {comparison.headline.em}
              </em>
              {comparison.headline.rest}
            </motion.h2>
          </div>
          <motion.p
            {...reveal(0.16)}
            className="font-serif italic m-0 max-w-[28ch] md:text-right md:self-end"
            style={{
              color: "var(--pc-cream-65)",
              fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
              lineHeight: 1.5,
              letterSpacing: "0.005em",
            }}
          >
            {comparison.rightCaption.lead}
            <em
              className="not-italic"
              style={{ color: "var(--pc-cream-95)", fontStyle: "italic" }}
            >
              {comparison.rightCaption.em}
            </em>
            {comparison.rightCaption.rest}
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
          <table className="pc-table">
            <thead>
              <motion.tr {...reveal(0.26)}>
                <th scope="col" className="pc-h pc-h-label">
                  Criterion
                </th>
                {comparison.columns.map((col, i) => (
                  <th
                    key={i}
                    scope="col"
                    className={`pc-h ${col.isAccent ? "pc-h-accent" : "pc-h-comp"}`}
                    aria-current={col.isAccent ? "true" : undefined}
                  >
                    {col.label}
                  </th>
                ))}
              </motion.tr>
            </thead>
            <tbody>
              {comparison.rows.map((row, i) => (
                <Row
                  key={row.topic}
                  row={row}
                  rowIdx={i}
                  reduce={reduce}
                  columns={comparison.columns}
                />
              ))}
            </tbody>
            <tfoot>
              <motion.tr {...reveal(0.62)} className="pc-verdict-row">
                <th scope="row" className="pc-v-label">
                  Verdict
                </th>
                {comparison.verdict.map((cell, i) => {
                  const col = comparison.columns[i];
                  return (
                    <td
                      key={i}
                      className={col?.isAccent ? "pc-v-accent" : "pc-v-comp"}
                      data-label={col?.label}
                    >
                      {renderVerdictCell(cell)}
                    </td>
                  );
                })}
              </motion.tr>
            </tfoot>
          </table>
        </motion.div>
      </div>
    </section>
  );
}

function Row({
  row,
  rowIdx,
  reduce,
  columns,
}: {
  row: ComparisonRow;
  rowIdx: number;
  reduce: boolean;
  columns: { label: string; isAccent?: boolean }[];
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
          delay: 0.32 + rowIdx * 0.05,
        },
      };

  return (
    <motion.tr {...reveal} className="pc-row">
      <th scope="row" className="pc-cell-topic">
        {row.topic}
      </th>
      {row.values.map((value, i) => {
        const col = columns[i];
        return (
          <td
            key={i}
            className={col?.isAccent ? "pc-cell-accent" : "pc-cell-comp"}
            data-label={col?.label}
          >
            <span className="pc-dot" aria-hidden />
            <span>{value}</span>
          </td>
        );
      })}
    </motion.tr>
  );
}

function renderVerdictCell(cell: VerdictCell) {
  if (typeof cell === "string") return <Fragment>{cell}</Fragment>;
  return renderSplit(cell);
}

function renderSplit(t: SplitText) {
  return (
    <>
      {t.lead}
      <em className="not-italic" style={{ fontStyle: "italic" }}>
        {t.em}
      </em>
      {t.rest}
    </>
  );
}
