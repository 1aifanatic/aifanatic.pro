import { getSiteBaseUrl } from "@lib/siteUrl";

/** OAuth 2.0 Protected Resource Metadata (RFC 9728) for operator APIs. */
export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const base = getSiteBaseUrl(req);

  res.status(200).json({
    resource: `${base}/api/leads`,
    authorization_servers: [base],
    scopes_supported: ["leads.read"],
    bearer_methods_supported: ["header"],
    resource_documentation: `${base}/contact`,
  });
}
