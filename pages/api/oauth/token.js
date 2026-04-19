/**
 * OAuth 2.0 token endpoint (RFC 6749 error responses).
 * This deployment does not mint third-party access tokens programmatically.
 */
export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "method_not_allowed" });
  }

  return res.status(400).json({
    error: "unsupported_grant_type",
    error_description:
      "No public token grants are available. Use pre-provisioned Bearer credentials for /api/leads as documented in /openapi.json.",
  });
}
