import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

const pageSource = readFileSync("src/components/solutions/SolutionsPage.tsx", "utf8");
const heroStart = pageSource.indexOf("function Hero()");
const sectionTwoStart = pageSource.indexOf(
  "// ─────────────────────────────────────────────────────────────────────────────\n// SECTION 2",
);
const heroSource = pageSource.slice(heroStart, sectionTwoStart);

test("solutions page design pass preserves the existing hero section", () => {
  assert.equal(
    createHash("sha256").update(heroSource).digest("hex"),
    "515d13c1f17cdb207e781f01df6ef8a59f08b9e9d55d2c7b8300969c7704e135",
  );
});

test("solutions page post-hero sections use the upgraded editorial design system", () => {
  assert.match(pageSource, /function SectionShell/);
  assert.match(pageSource, /solution-proof-strip/);
  assert.match(pageSource, /solution-journey-spine/);
  assert.match(pageSource, /Architecture note/);
  assert.match(pageSource, /Signal, fit, next move/);
});
