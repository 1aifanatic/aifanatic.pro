import { storeLead } from "@lib/database";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GUEST_BOOK_SOURCE = "Guest book access";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name = "", email = "", company = "" } = req.body || {};

    // A filled hidden field is almost always an automated submission.
    if (company) {
      return res.status(200).json({ success: true });
    }

    const normalizedName = String(name).trim();
    const normalizedEmail = String(email).trim().toLowerCase();

    if (!normalizedName || !normalizedEmail) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    if (normalizedName.length > 120) {
      return res.status(400).json({ error: "Please use a shorter name" });
    }

    if (
      normalizedEmail.length > 254 ||
      !EMAIL_PATTERN.test(normalizedEmail)
    ) {
      return res.status(400).json({ error: "Enter a valid email address" });
    }

    const forwardedFor = req.headers["x-forwarded-for"];
    const ipAddress = Array.isArray(forwardedFor)
      ? forwardedFor[0]
      : forwardedFor?.split(",")[0]?.trim() ||
        req.headers["x-real-ip"] ||
        req.socket?.remoteAddress ||
        "unknown";
    const userAgent = req.headers["user-agent"] || "unknown";

    const leadId = await storeLead(
      normalizedName,
      normalizedEmail,
      GUEST_BOOK_SOURCE,
      ipAddress,
      userAgent
    );

    return res.status(201).json({
      success: true,
      message: "Guest book signed",
      leadId,
      name: normalizedName,
    });
  } catch (error) {
    console.error("Guest book API error:", error);
    return res.status(500).json({
      error: "We could not sign the guest book right now. Please try again.",
      message:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}
