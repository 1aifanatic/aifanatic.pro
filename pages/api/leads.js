import { getSiteBaseUrl } from "@lib/siteUrl";
import { isAdminConfigured, isAdminRequest } from "@lib/adminAuth";
import { getLeads } from "../../lib/database";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    res.setHeader("Cache-Control", "no-store");

    if (!isAdminConfigured()) {
      return res.status(503).json({ error: "Admin access is not configured" });
    }

    if (!isAdminRequest(req)) {
      const resourceMetadata = `${getSiteBaseUrl(
        req
      )}/.well-known/oauth-protected-resource`;
      res.setHeader(
        "WWW-Authenticate",
        `Bearer resource_metadata="${resourceMetadata}"`
      );
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { limit = 100, offset = 0, kind } = req.query;
    if (kind && kind !== "guestbook") {
      return res.status(400).json({ error: "Unsupported lead type" });
    }

    const parsedLimit = Math.min(
      Math.max(Number.parseInt(limit, 10) || 100, 1),
      200
    );
    const parsedOffset = Math.max(Number.parseInt(offset, 10) || 0, 0);
    const documentName = kind === "guestbook" ? "Guest book access" : null;

    const leads = await getLeads(parsedLimit, parsedOffset, documentName);
    const safeLeads = leads.map(
      ({ id, name, email, document_name, download_count, created_at }) => ({
        id,
        name,
        email,
        document_name,
        download_count,
        created_at,
      })
    );

    return res.status(200).json({
      success: true,
      data: safeLeads,
      count: safeLeads.length,
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
