import {
  createAdminSession,
  isAdminConfigured,
  isAdminRequest,
  isValidAdminPassword,
  serializeAdminCookie,
} from "@lib/adminAuth";

export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "GET") {
    return res.status(200).json({ authenticated: isAdminRequest(req) });
  }

  if (req.method === "DELETE") {
    res.setHeader("Set-Cookie", serializeAdminCookie("", 0));
    return res.status(200).json({ success: true });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST, DELETE");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!isAdminConfigured()) {
    return res.status(503).json({ error: "Admin access is not configured" });
  }

  const password = String(req.body?.password || "");
  if (!isValidAdminPassword(password)) {
    return res.status(401).json({ error: "Invalid admin access key" });
  }

  res.setHeader("Set-Cookie", serializeAdminCookie(createAdminSession()));
  return res.status(200).json({ success: true });
}
