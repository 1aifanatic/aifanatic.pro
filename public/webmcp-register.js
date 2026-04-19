/**
 * WebMCP: register tools before React hydrates (see pages/_document.js).
 * @see https://webmachinelearning.github.io/webmcp/
 */
(function webmcpBootstrap() {
  try {
    var el = document.getElementById("__WEBMCP_PAYLOAD__");
    if (!el || !el.textContent) return;

    var payload = JSON.parse(el.textContent);
    var mc = navigator.modelContext;
    if (!mc || typeof mc.registerTool !== "function") return;

    var controllers = [];

    function register(def) {
      var ac = new AbortController();
      controllers.push(ac);
      mc.registerTool(def, { signal: ac.signal });
    }

    register({
      name: "navigate",
      title: "Navigate",
      description:
        "Go to an internal path on this origin (portfolio pages only). Path must start with a single slash.",
      inputSchema: {
        type: "object",
        properties: {
          path: {
            type: "string",
            description: "Absolute path on this site, e.g. /blog or /contact",
          },
        },
        required: ["path"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false },
      execute: async function (input) {
        var path = input && input.path;
        if (
          typeof path !== "string" ||
          !path.startsWith("/") ||
          path.startsWith("//")
        ) {
          throw new Error("path must be a same-origin path starting with /");
        }
        window.location.assign(path);
        return { ok: true, path: path };
      },
    });

    register({
      name: "site_info",
      title: "Site info",
      description:
        "Return public portfolio metadata: name, role, email, suggested paths, and origin.",
      inputSchema: { type: "object", additionalProperties: false },
      annotations: { readOnlyHint: true },
      execute: async function () {
        var site = payload.site || {};
        return {
          name: site.name,
          designation: site.designation,
          email: site.email,
          suggestedPaths: site.suggestedPaths || [],
          origin: window.location.origin,
        };
      },
    });

    register({
      name: "machine_discovery",
      title: "Machine discovery",
      description:
        "Return URLs for machine-readable discovery on this origin (API catalog RFC 9727, OpenAPI, OAuth resource metadata RFC 9728, agent skills index).",
      inputSchema: { type: "object", additionalProperties: false },
      annotations: { readOnlyHint: true },
      execute: async function () {
        var o = window.location.origin;
        return {
          apiCatalog: o + "/.well-known/api-catalog",
          openapi: o + "/openapi.json",
          oauthProtectedResource: o + "/.well-known/oauth-protected-resource",
          oauthAuthorizationServer: o + "/.well-known/oauth-authorization-server",
          agentSkillsIndex: o + "/.well-known/agent-skills/index.json",
          sitemap: o + "/sitemap.xml",
        };
      },
    });

    register({
      name: "search_blog",
      title: "Search blog",
      description:
        "Search on-site blog posts by keyword matched against title or slug. Returns up to 12 matches.",
      inputSchema: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Case-insensitive substring to match in title or slug",
          },
        },
        required: ["query"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true },
      execute: async function (input) {
        var q = String((input && input.query) || "").toLowerCase().trim();
        var blogs = payload.blogs || [];
        if (!q) return { matches: blogs.slice(0, 12) };
        var matches = blogs.filter(function (b) {
          var title = (b.title || "").toLowerCase();
          var slug = (b.slug || "").toLowerCase();
          return title.indexOf(q) !== -1 || slug.indexOf(q) !== -1;
        });
        return { matches: matches.slice(0, 12) };
      },
    });

    window.addEventListener("pagehide", function () {
      controllers.forEach(function (c) {
        c.abort();
      });
    });
  } catch (err) {
    console.warn("[WebMCP] bootstrap failed", err);
  }
})();
