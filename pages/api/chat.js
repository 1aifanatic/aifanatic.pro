import { createHmac } from "node:crypto";
import { answerPortfolioQuestion, validateChatMessages } from "../../lib/portfolioChat.js";
import { reserveChatRequest } from "../../lib/chatQuota.js";

export const config = { api: { bodyParser: { sizeLimit: "16kb" } }, maxDuration: 30 };

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (req.headers["sec-fetch-site"] === "cross-site") return res.status(403).json({ error: "Please use the chat on this website." });
  const messages = validateChatMessages(req.body?.messages);
  if (!messages) return res.status(400).json({ error: "Please send a question of up to 600 characters." });
  if (!process.env.MINIMAX_API_KEY || !process.env.DATABASE_URL) return res.status(503).json({ error: "The assistant is not available yet. Please contact Naveen directly." });
  try {
    const { pool } = await import("../../lib/database.js");
    const address = String(req.headers["x-vercel-forwarded-for"] || req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown").split(",")[0].trim();
    const visitor = createHmac("sha256", process.env.MINIMAX_API_KEY).update(address).digest("hex");
    if (!await reserveChatRequest(pool, visitor)) {
      res.setHeader("Retry-After", "3600");
      return res.status(429).json({ error: "The chat has reached its request limit. Please try again later or contact Naveen." });
    }
    return res.status(200).json(await answerPortfolioQuestion(messages));
  } catch {
    // Never log questions, provider responses, or credentials.
    return res.status(503).json({ error: "The assistant could not answer right now. Please try again." });
  }
}
