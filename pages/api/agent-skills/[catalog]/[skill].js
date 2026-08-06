import fs from "fs";
import path from "path";
import { getCatalogConfig } from "@constants/skillCatalogs";

/**
 * Serves a Skill's raw SKILL.md from the committed Snapshot, so an agent can
 * fetch exactly the bytes digested in the Discovery Index.
 *
 * Reached via the /agent-skills/:catalog/:skill/SKILL.md rewrite.
 */
export default function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const { catalog, skill } = req.query;
  if (!getCatalogConfig(catalog)) {
    return res.status(404).json({ error: "Unknown catalog." });
  }
  // The skill name is a path segment; reject anything that could escape.
  if (!/^[a-z0-9][a-z0-9-]*$/.test(String(skill))) {
    return res.status(400).json({ error: "Invalid skill name." });
  }

  const file = path.join(process.cwd(), "content", "skills", catalog, skill, "SKILL.md");

  let body;
  try {
    body = fs.readFileSync(file, "utf8");
  } catch {
    return res.status(404).json({ error: "Skill not found." });
  }

  res.setHeader("Content-Type", "text/markdown; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.status(200).send(body);
}
