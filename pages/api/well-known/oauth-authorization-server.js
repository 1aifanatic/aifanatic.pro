import { getSiteBaseUrl } from "@lib/siteUrl";

/**
 * OAuth 2.0 Authorization Server Metadata (RFC 8414).
 * Token issuance is limited; /api/oauth/token documents supported vs unsupported grants.
 */
export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const base = getSiteBaseUrl(req);

  res.status(200).json({
    issuer: base,
    authorization_endpoint: `${base}/contact`,
    token_endpoint: `${base}/api/oauth/token`,
    jwks_uri: `${base}/.well-known/jwks.json`,
    grant_types_supported: ["client_credentials"],
    token_endpoint_auth_methods_supported: ["client_secret_basic", "private_key_jwt"],
    scopes_supported: ["leads.read"],
    registration_endpoint: `${base}/contact`,
    protected_resources: [base],
  });
}
