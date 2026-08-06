import fs from "fs";
import path from "path";
import crypto from "crypto";
import { getSiteBaseUrl } from "@lib/siteUrl";
import { getAllCatalogs } from "@lib/skillCatalog";

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

  // site-overview stays first and unchanged — it is a published contract.
  // Catalog skills are appended. See decisions/0007.
  const skills = [
    {
      name: "site-overview",
      type: "skill-md",
      description:
        "Machine-oriented overview of aifanatic.pro: pages, APIs, and contact points.",
      url,
      digest,
    },
  ];

  for (const catalog of getAllCatalogs()) {
    for (const skill of catalog.skills) {
      skills.push({
        name: skill.name,
        type: "skill-md",
        description: skill.description,
        url: `${base}/agent-skills/${catalog.slug}/${skill.name}/SKILL.md`,
        digest: skill.digest,
        catalog: catalog.slug,
        category: skill.category,
        invocation: skill.invocation,
        license: catalog.license,
        source: `https://github.com/${catalog.repository}/blob/${catalog.commit}/skills/${skill.name}/SKILL.md`,
        install: `npx skills add ${catalog.repository} --skill ${skill.name} --agent claude-code --global --yes`,
      });
    }
  }

  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.status(200).json({
    $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    skills,
  });
}
