/**
 * Canonical site origin for sitemaps, robots, and discovery JSON.
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://aifanatic.pro).
 */
export function getSiteBaseUrl(req) {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  const vercel = process.env.VERCEL_URL?.replace(/\/$/, "");
  if (vercel) return `https://${vercel}`;

  if (req?.headers?.host) {
    const host = req.headers.host;
    const proto =
      req.headers["x-forwarded-proto"] ||
      (host.startsWith("localhost") ? "http" : "https");
    return `${proto}://${host}`;
  }

  return "https://aifanatic.pro";
}
