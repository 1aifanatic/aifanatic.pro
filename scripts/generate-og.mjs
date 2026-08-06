/**
 * Generates one social card per Catalog, from the synced Snapshot.
 * Per-Skill cards are deliberately deferred — see NEXT.md.
 *
 * Usage: node scripts/generate-og.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const CARDS = [
  {
    slug: "uipath-boost",
    title: "UiPath Boost",
    subtitleFor: (s) => `${s.skillCount} Agent Skills for AI coding agents`,
    strip: "Discovery · Design · Testing · Release · Operations",
    install: "npx skills add 1aifanatic/uipath-boost",
    titleSize: 96,
  },
  {
    slug: "uipath-coded-app-launchpad",
    title: "Coded App Launchpad",
    subtitleFor: () => "Idea to a live UiPath Coded App, one workflow",
    strip: "Scaffold · Build · Authenticate · Deploy · Verify",
    install: "npx skills add 1aifanatic/uipath-coded-app-launchpad",
    titleSize: 76,
  },
];

const escape = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

for (const card of CARDS) {
  const summary = JSON.parse(
    fs.readFileSync(path.join(root, "content", "skills", card.slug, "summary.json"), "utf8")
  );

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#111716"/>
  <rect x="0" y="0" width="1200" height="8" fill="#a8c7ee"/>
  <g font-family="Georgia, 'Times New Roman', serif">
    <text x="80" y="150" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="bold"
      letter-spacing="4" fill="#a8c7ee">NAVEEN CHATLAPALLI · AGENT SKILLS</text>
    <text x="80" y="278" font-size="${card.titleSize}" font-weight="bold" fill="#eef1ed">${escape(card.title)}</text>
    <text x="80" y="352" font-size="40" fill="#c5cec8">${escape(card.subtitleFor(summary))}</text>
  </g>
  <g font-family="Arial, Helvetica, sans-serif">
    <text x="80" y="425" font-size="25" fill="#96a09a">${escape(card.strip)}</text>
    <rect x="80" y="468" width="760" height="66" rx="33" fill="#18211f" stroke="#34413d" stroke-width="2"/>
    <text x="112" y="510" font-family="Consolas, 'Courier New', monospace" font-size="23" fill="#d8e6f7">${escape(card.install)}</text>
    <text x="80" y="590" font-size="24" font-weight="bold" fill="#a8c7ee">naveen.aifanatic.pro/skills</text>
  </g>
</svg>`;

  const out = path.join(root, "public", `og-${card.slug}.png`);
  // eslint-disable-next-line no-await-in-loop
  await sharp(Buffer.from(svg)).png().toFile(out);
  console.log(`Wrote ${path.relative(root, out)}`);
}
