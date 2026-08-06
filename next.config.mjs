/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/bio", destination: "/about", permanent: true },
      { source: "/career-progression", destination: "/experience", permanent: true },
      { source: "/download", destination: "/about#resources", permanent: true },
      { source: "/downloads", destination: "/about#resources", permanent: true },
      { source: "/talks", destination: "/speaking", permanent: true },
      { source: "/videos", destination: "/speaking", permanent: true },
      { source: "/writing", destination: "/insights", permanent: true },
      { source: "/publications", destination: "/insights", permanent: true },
      { source: "/judging", destination: "/recognition#judging", permanent: true },
      { source: "/press", destination: "/recognition#media", permanent: true },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/.well-known/api-catalog",
        destination: "/api/well-known/api-catalog",
      },
      {
        source: "/.well-known/agent-skills/index.json",
        destination: "/api/well-known/agent-skills-index",
      },
      {
        // Raw SKILL.md for synced catalogs. The static
        // /agent-skills/site-overview/SKILL.md file is served from public/
        // and is unaffected — public files win over rewrites.
        source: "/agent-skills/:catalog/:skill/SKILL.md",
        destination: "/api/agent-skills/:catalog/:skill",
      },
      {
        source: "/.well-known/mcp/server-card.json",
        destination: "/api/well-known/mcp-server-card",
      },
      {
        source: "/.well-known/openid-configuration",
        destination: "/api/well-known/openid-configuration",
      },
      {
        source: "/.well-known/oauth-authorization-server",
        destination: "/api/well-known/oauth-authorization-server",
      },
      {
        source: "/.well-known/oauth-protected-resource",
        destination: "/api/well-known/oauth-protected-resource",
      },
      { source: "/.well-known/jwks.json", destination: "/api/well-known/jwks" },
    ];
  },
};

export default nextConfig;
