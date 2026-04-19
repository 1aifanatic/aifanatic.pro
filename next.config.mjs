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
