import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test from "node:test";
import sharp from "sharp";

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

const heroSource = await readFile(
  new URL("../src/components/founder-card/FounderHero.tsx", import.meta.url),
  "utf8",
);

const footerSource = await readFile(
  new URL("../src/components/founder-card/FounderFooter.tsx", import.meta.url),
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

test("uses Sanjay's dedicated CEO email on the founder card", () => {
  assert.match(
    founderCardSource,
    /email:\s*"ceo\.sanjay@aurexissolution\.com"/,
  );
});

test("uses the approved discovery call booking route", () => {
  assert.match(
    founderCardSource,
    /https:\/\/cal\.com\/aurexis-solution\/discoverycall/,
  );
});

test("uses the approved value statement with only the growth phrase highlighted", () => {
  assert.match(
    heroSource,
    /Helping growing businesses cut operational waste, recover valuable time and create room for\s*<span className="fc-value-emphasis">more profitable growth<\/span>\./,
  );
  assert.doesNotMatch(
    heroSource,
    /Helping growing businesses operate with greater clarity, control and less manual work/,
  );
});

test("uses one genuinely transparent official logo in the header and footer", async () => {
  const expectedPath = "/brand/aurexis-logo-transparent.png";
  assert.match(heroSource, new RegExp(`src=["']${expectedPath}["']`));
  assert.match(footerSource, new RegExp(`src=["']${expectedPath}["']`));
  assert.doesNotMatch(heroSource, /mixBlendMode/);
  assert.doesNotMatch(footerSource, /mixBlendMode/);

  const logoPath = fileURLToPath(
    new URL("../public/brand/aurexis-logo-transparent.png", import.meta.url),
  );
  const { channels } = await sharp(logoPath).stats();
  assert.equal(channels.length, 4);
  assert.equal(channels[3].min, 0);
  assert.equal(channels[3].max, 255);
});
