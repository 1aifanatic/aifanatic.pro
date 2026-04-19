import { getSiteBaseUrl } from "@lib/siteUrl";

/**
 * OpenID Provider metadata shape for discovery scanners.
 * This site does not issue end-user OpenID tokens; operator APIs use Bearer secrets.
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
    response_types_supported: ["code", "token"],
    subject_types_supported: ["public"],
    id_token_signing_alg_values_supported: ["RS256"],
    scopes_supported: ["openid", "profile", "email", "leads.read"],
    grant_types_supported: ["authorization_code", "client_credentials"],
    token_endpoint_auth_methods_supported: ["client_secret_basic"],
    claims_supported: ["sub", "email", "name"],
  });
}
