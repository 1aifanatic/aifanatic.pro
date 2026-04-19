import { getSiteBaseUrl } from "@lib/siteUrl";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const base = getSiteBaseUrl(req);

  res.status(200).json({
    serverInfo: {
      name: "aifanatic.pro",
      version: "1.0.0",
    },
    transport: {
      type: "streamable-http",
      endpoint: `${base}/api/mcp`,
    },
    capabilities: {
      tools: {},
      resources: {},
      prompts: {},
    },
  });
}
