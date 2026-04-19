import fs from "fs";
import path from "path";
import crypto from "crypto";
import { getSiteBaseUrl } from "@lib/siteUrl";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const base = getSiteBaseUrl(req);
  const skillPath = path.join(
    process.cwd(),
    "public",
    "agent-skills",
    "site-overview",
    "SKILL.md"
  );

  let buf;
  try {
    buf = fs.readFileSync(skillPath);
  } catch {
    return res.status(500).json({ error: "Skill artifact not found on server." });
  }

  const digest = `sha256:${crypto.createHash("sha256").update(buf).digest("hex")}`;
  const url = `${base}/agent-skills/site-overview/SKILL.md`;

  res.status(200).json({
    $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    skills: [
      {
        name: "site-overview",
        type: "skill-md",
        description:
          "Machine-oriented overview of aifanatic.pro: pages, APIs, and contact points.",
        url,
        digest,
      },
    ],
  });
}
