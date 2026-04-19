import { getSiteBaseUrl } from "../lib/siteUrl";
import userData from "../constants/data";

const STATIC_PATHS = [
  "/",
  "/about",
  "/bio",
  "/blog",
  "/contact",
  "/career-progression",
  "/download",
  "/downloads",
  "/eb1visa",
  "/experience",
  "/judging",
  "/press",
  "/publications",
  "/solopreneur-projects",
  "/speaking",
  "/talks",
  "/videos",
  "/work",
  "/writing",
];

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function getServerSideProps({ req, res }) {
  const base = getSiteBaseUrl(req);
  const blogSlugs = (userData.blogs || []).map((b) => b.slug).filter(Boolean);
  const urls = [
    ...STATIC_PATHS.map((path) => ({ loc: `${base}${path}` })),
    ...blogSlugs.map((slug) => ({ loc: `${base}/blog/${encodeURIComponent(slug)}` })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
  </url>`
  )
  .join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.write(xml);
  res.end();
  return { props: {} };
}

export default function SitemapXml() {
  return null;
}
