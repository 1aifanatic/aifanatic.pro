// Generate the portfolio social card from its published contribution snapshot.
import sharp from "sharp";
import userData from "../constants/data.js";
const { contributions } = userData;
const merged = contributions.projects.reduce((sum, project) => sum + project.merged.length, 0);
const projects = contributions.projects.filter((project) => project.merged.length).length;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
<rect width="1200" height="630" fill="#111716"/><rect width="1200" height="8" fill="#a8c7ee"/>
<g font-family="Arial, sans-serif">
<text x="80" y="110" font-size="22" letter-spacing="4" fill="#a8c7ee">NAVEEN CHATLAPALLI · OPEN SOURCE</text>
<text x="80" y="225" font-family="Georgia, serif" font-size="66" fill="#eef1ed">Making agent systems</text>
<text x="80" y="305" font-family="Georgia, serif" font-size="66" fill="#eef1ed">more reliable.</text>
<text x="80" y="400" font-size="34" fill="#c5cec8">${merged} merged pull requests · ${projects} upstream projects</text>
<text x="80" y="465" font-size="26" fill="#a8c7ee">Microsoft · OpenAI · Omi · W3C WebMCP</text>
<text x="80" y="550" font-size="22" fill="#b7c0bb">Verified ${contributions.checkedOn}</text>
<text x="80" y="590" font-size="22" fill="#b7c0bb">naveen.aifanatic.pro/open-source</text>
</g></svg>`;
await sharp(Buffer.from(svg)).png().toFile("public/og-open-source.png");
console.log("Wrote public/og-open-source.png");
