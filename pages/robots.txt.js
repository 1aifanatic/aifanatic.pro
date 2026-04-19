import { getSiteBaseUrl } from "../lib/siteUrl";

export async function getServerSideProps({ req, res }) {
  const base = getSiteBaseUrl(req);
  const body = [
    "# See https://www.rfc-editor.org/rfc/rfc9309",
    "",
    "User-agent: *",
    "Allow: /",
    "Disallow: /admin/",
    "Disallow: /api/",
    "Content-Signal: ai-train=no, search=yes, ai-input=no",
    "",
    "User-agent: GPTBot",
    "Allow: /",
    "Content-Signal: ai-train=no, search=yes, ai-input=no",
    "",
    "User-agent: OAI-SearchBot",
    "Allow: /",
    "Content-Signal: ai-train=no, search=yes, ai-input=no",
    "",
    "User-agent: Claude-Web",
    "Allow: /",
    "Content-Signal: ai-train=no, search=yes, ai-input=no",
    "",
    "User-agent: Google-Extended",
    "Allow: /",
    "Content-Signal: ai-train=no, search=yes, ai-input=no",
    "",
    `Sitemap: ${base}/sitemap.xml`,
    "",
  ].join("\n");

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.write(body);
  res.end();
  return { props: {} };
}

export default function RobotsTxt() {
  return null;
}
