import { getSiteBaseUrl } from "@lib/siteUrl";

/**
 * OAuth 2.0 Protected Resource Metadata (RFC 9728).
 * Served at `/.well-known/oauth-protected-resource` (see next.config.mjs).
 * The `resource` identifier MUST match the URL into which that well-known path
 * was inserted (RFC 9728 §3.3) — here the site origin, not a specific API path.
 */
export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const base = getSiteBaseUrl(req);

  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.status(200).json({
    resource: base,
    authorization_servers: [base],
    scopes_supported: ["leads.read"],
    bearer_methods_supported: ["header"],
    resource_name: "aifanatic.pro HTTP APIs",
    resource_documentation: `${base}/openapi.json`,
  });
}
