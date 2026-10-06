import { getSiteBaseUrl } from "../lib/siteUrl";
import userData from "../constants/data";
import { getAllCatalogs } from "../lib/skillCatalog";
import { getEpisodes } from "../lib/dailyDrop";

const STATIC_PATHS = [
  "/",
  "/about",
  "/blog",
  "/contact",
  "/experience",
  "/insights",
  "/recognition",
  "/open-source",
  "/daily-ai-drop",
  "/solopreneur-projects",
  "/speaking",
  "/work",
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
  const catalogs = getAllCatalogs();
  const episodes = await getEpisodes().catch(() => []);
  const urls = [
    ...STATIC_PATHS.map((path) => ({ loc: `${base}${path}` })),
    ...episodes.map((episode) => ({ loc: `${base}/daily-ai-drop/${episode.slug}` })),
    ...blogSlugs.map((slug) => ({ loc: `${base}/blog/${encodeURIComponent(slug)}` })),
    ...catalogs.flatMap((catalog) => [
      { loc: `${base}/skills/${catalog.slug}` },
      ...catalog.skills.map((skill) => ({
        loc: `${base}/skills/${catalog.slug}/${skill.name}`,
      })),
    ]),
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
