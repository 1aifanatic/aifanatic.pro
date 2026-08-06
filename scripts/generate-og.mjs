/**
 * Generates the shared social card for the Agent Skills catalog pages.
 * One card for all catalog pages — see decisions/0001 and NEXT.md (per-skill
 * generated cards are deliberately deferred).
 *
 * Usage: node scripts/generate-og.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const summary = JSON.parse(
  fs.readFileSync(path.join(root, "content", "skills", "uipath-boost", "summary.json"), "utf8")
);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#111716"/>
  <rect x="0" y="0" width="1200" height="8" fill="#a8c7ee"/>
  <g font-family="Georgia, 'Times New Roman', serif">
    <text x="80" y="150" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="bold"
      letter-spacing="4" fill="#a8c7ee">OPEN SOURCE · COMMUNITY TOOLKIT</text>
    <text x="80" y="270" font-size="96" font-weight="bold" fill="#eef1ed">UiPath Boost</text>
    <text x="80" y="350" font-size="46" fill="#c5cec8">${summary.skillCount} Agent Skills for AI coding agents</text>
  </g>
  <g font-family="Arial, Helvetica, sans-serif">
    <text x="80" y="425" font-size="26" fill="#96a09a">Discovery · Design · Testing · Release · Operations</text>
    <rect x="80" y="470" width="620" height="66" rx="33" fill="#18211f" stroke="#34413d" stroke-width="2"/>
    <text x="112" y="512" font-family="Consolas, 'Courier New', monospace" font-size="24" fill="#d8e6f7">npx skills add 1aifanatic/uipath-boost</text>
    <text x="80" y="590" font-size="24" font-weight="bold" fill="#a8c7ee">naveen.aifanatic.pro/skills</text>
  </g>
</svg>`;

const out = path.join(root, "public", "og-uipath-boost.png");
await sharp(Buffer.from(svg)).png().toFile(out);
console.log(`Wrote ${path.relative(root, out)} (${summary.skillCount} skills)`);
