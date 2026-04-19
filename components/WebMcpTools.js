import { useEffect } from "react";
import userData from "../constants/data";

/**
 * Registers WebMCP tools when `navigator.modelContext.registerTool` is available.
 * @see https://developer.chrome.com/blog/webmcp-epp
 */
export default function WebMcpTools() {
  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const mc = navigator.modelContext;
    if (!mc || typeof mc.registerTool !== "function") return undefined;

    const controllers = [];

    const register = (definition) => {
      const ac = new AbortController();
      controllers.push(ac);
      try {
        mc.registerTool(definition, { signal: ac.signal });
      } catch (err) {
        console.warn("WebMCP registerTool failed:", err);
      }
    };

    register({
      name: "navigate",
      description:
        "Navigate the browser to an internal path on this origin (portfolio navigation).",
      inputSchema: {
        type: "object",
        properties: {
          path: {
            type: "string",
            description: "Absolute path on this site, must start with a single /",
          },
        },
        required: ["path"],
      },
      execute: async (input) => {
        const path = input?.path;
        if (
          typeof path !== "string" ||
          !path.startsWith("/") ||
          path.startsWith("//")
        ) {
          throw new Error("path must be a same-origin path starting with /");
        }
        window.location.assign(path);
        return { ok: true, path };
      },
    });

    register({
      name: "site_info",
      description:
        "Return structured metadata for this portfolio (name, role, email, useful paths).",
      inputSchema: { type: "object", additionalProperties: false },
      execute: async () => ({
        name: userData.name,
        designation: userData.designation,
        email: userData.email,
        origin: window.location.origin,
        suggestedPaths: ["/blog", "/writing", "/work", "/contact"],
      }),
    });

    return () => {
      controllers.forEach((c) => c.abort());
    };
  }, []);

  return null;
}
