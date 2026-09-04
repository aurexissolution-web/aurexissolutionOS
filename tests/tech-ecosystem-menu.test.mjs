import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const navigation = readFileSync("src/data/navigation.ts", "utf8");
const navbar = readFileSync("src/components/layout/Navbar.tsx", "utf8");
const techPage = readFileSync("src/app/tech-ecosystem/page.tsx", "utf8");

test("tech ecosystem menu exposes the six capability anchors", () => {
  const expected = [
    "/tech-ecosystem#presence",
    "/tech-ecosystem#flow",
    "/tech-ecosystem#core",
    "/tech-ecosystem#connect",
    "/tech-ecosystem#data-foundation",
    "/tech-ecosystem#intelligence",
  ];

  for (const href of expected) {
    assert.match(navigation, new RegExp(href.replace("#", "#")));
  }
  assert.match(navigation, /TECH_ECOSYSTEM_ITEMS/);
  assert.match(navigation, /TECH_ECOSYSTEM_OVERVIEW/);
});

test("navbar renders a dedicated tech ecosystem dropdown and mobile accordion", () => {
  assert.equal(existsSync("src/components/layout/TechEcosystemMenu.tsx"), true);
  assert.equal(existsSync("src/app/tech-ecosystem/page.tsx"), true);
  assert.match(navbar, /TechEcosystemMenu/);
  assert.match(navbar, /ecosystem-dropdown/);
  assert.match(navbar, /mobile-ecosystem-panel/);
});

test("tech ecosystem page exposes real capability anchor targets", () => {
  for (const id of [
    "presence",
    "flow",
    "core",
    "connect",
    "data-foundation",
    "intelligence",
  ]) {
    assert.match(techPage, new RegExp(`id="${id}"`));
  }
});
