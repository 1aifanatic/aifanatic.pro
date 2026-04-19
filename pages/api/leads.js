import { getSiteBaseUrl } from "@lib/siteUrl";
import { getLeads } from "../../lib/database";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Basic authentication check (you can enhance this)
    const authHeader = req.headers.authorization;
    if (
      !authHeader ||
      authHeader !==
        `Bearer ${process.env.ADMIN_SECRET_KEY || "your-secret-key"}`
    ) {
      const resourceMetadata = `${getSiteBaseUrl(
        req
      )}/.well-known/oauth-protected-resource`;
      res.setHeader(
        "WWW-Authenticate",
        `Bearer resource_metadata="${resourceMetadata}"`
      );
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { limit = 100, offset = 0 } = req.query;

    const leads = await getLeads(parseInt(limit), parseInt(offset));

    return res.status(200).json({
      success: true,
      data: leads,
      count: leads.length,
    });
  } catch (error) {
    console.error("Leads API error:", error);
    return res.status(500).json({
      error: "Internal server error",
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    });
  }
}
