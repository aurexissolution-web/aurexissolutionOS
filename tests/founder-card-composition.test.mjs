import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pageSource = await readFile(
  new URL("../src/app/sanjay/page.tsx", import.meta.url),
  "utf8",
);

const connectSource = await readFile(
  new URL("../src/components/founder-card/ConnectSection.tsx", import.meta.url),
  "utf8",
);

const founderCardSource = await readFile(
  new URL("../src/data/founder-card.ts", import.meta.url),
  "utf8",
);

test("uses the approved cinematic founder-card composition", () => {
  assert.match(pageSource, /<FounderHero\s*\/>/);
  assert.match(pageSource, /<Capabilities\s*\/>/);
  assert.match(pageSource, /<OwnershipPanel\s*\/>/);
  assert.match(pageSource, /<ConnectSection\s*\/>/);
  assert.match(pageSource, /<FounderFooter\s*\/>/);
});

test("removes the previous centred SaaS-style component sequence", () => {
  assert.doesNotMatch(pageSource, /<Hero\s*\/>/);
  assert.doesNotMatch(pageSource, /<FounderProfile\s*\/>/);
  assert.doesNotMatch(pageSource, /<AboutAurexis\s*\/>/);
  assert.doesNotMatch(pageSource, /<TrustPoints\s*\/>/);
  assert.doesNotMatch(pageSource, /max-w-\[580px\]/);
});

test("uses Instagram instead of duplicating WhatsApp in the connect grid", () => {
  assert.match(connectSource, /label:\s*"Instagram"/);
  assert.match(connectSource, /href:\s*founderCard\.instagramUrl/);
  assert.doesNotMatch(connectSource, /label:\s*"WhatsApp"/);
  assert.match(
    founderCardSource,
    /https:\/\/www\.instagram\.com\/aurexissolution/,
  );
});
