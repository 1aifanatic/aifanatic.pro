/** Placeholder MCP streamable-HTTP endpoint (see /.well-known/mcp/server-card.json). */
export default function handler(req, res) {
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }
  return res.status(501).json({
    message:
      "MCP streamable HTTP is not deployed on this origin. The server card advertises the intended endpoint for future use.",
  });
}
