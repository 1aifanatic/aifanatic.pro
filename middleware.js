import { NextResponse } from "next/server";

function mediaQuality(accept, mediaType) {
  let best = 0;
  const want = mediaType.toLowerCase();
  for (const part of accept.split(",")) {
    const [mime, ...params] = part.trim().split(";").map((s) => s.trim());
    if (mime.toLowerCase() !== want) continue;
    let q = 1;
    for (const p of params) {
      const [k, v] = p.split("=").map((s) => s.trim());
      if (k === "q" && v) q = Number.parseFloat(v) || 0;
    }
    best = Math.max(best, q);
  }
  return best;
}

function prefersMarkdown(request) {
  const accept = request.headers.get("accept");
  if (!accept || !/\btext\/markdown\b/i.test(accept)) return false;
  if (!/\btext\/html\b/i.test(accept)) return true;
  return mediaQuality(accept, "text/markdown") > mediaQuality(accept, "text/html");
}

export function middleware(request) {
  if (request.nextUrl.pathname !== "/") {
    return NextResponse.next();
  }
  if (!prefersMarkdown(request)) {
    return NextResponse.next();
  }

  const host = request.headers.get("host") || "aifanatic.pro";
  const proto = request.headers.get("x-forwarded-proto") || "https";
  const base = `${proto}://${host}`;

  const body = [
    "# Naveen Chatlapalli",
    "",
    "Personal site: **Manager of Solution Architecture**, UiPath community leader, and solopreneur.",
    "",
    "## Key pages",
    `- Home: ${base}/`,
    `- About: ${base}/about`,
    `- Bio: ${base}/bio`,
    `- Blog: ${base}/blog`,
    `- Writing: ${base}/writing`,
    `- Work: ${base}/work`,
    `- Experience: ${base}/experience`,
    `- Contact: ${base}/contact`,
    "",
    "## Machine discovery",
    `- API catalog (RFC 9727): ${base}/.well-known/api-catalog`,
    `- OpenAPI: ${base}/openapi.json`,
    `- Sitemap: ${base}/sitemap.xml`,
    `- Robots: ${base}/robots.txt`,
    `- Agent skills index: ${base}/.well-known/agent-skills/index.json`,
    "",
    "## HTTP APIs",
    "See `openapi.json`. `/api/*` is listed as `Disallow` for crawlers in `robots.txt` but is valid for agents that follow your policy.",
    "",
    `- GET ${base}/api/hello`,
    `- GET ${base}/api/leads (Bearer ADMIN_SECRET_KEY)`,
    `- POST ${base}/api/download`,
    "",
    "HTML remains the default representation when `Accept` does not prefer `text/markdown`.",
  ].join("\n");

  const tokenEstimate = Math.max(1, Math.ceil(body.length / 4));

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "x-markdown-tokens": String(tokenEstimate),
      Link: `</.well-known/api-catalog>; rel="api-catalog", </openapi.json>; rel="service-desc"; type="application/vnd.oai.openapi+json", </.well-known/agent-skills/index.json>; rel="describedby"`,
    },
  });
}

export const config = {
  matcher: "/",
};
