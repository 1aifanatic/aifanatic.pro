import userData from "../constants/data";

/** Serializable data for `public/webmcp-register.js` (no secrets). */
export function getWebmcpPayload() {
  return {
    site: {
      name: userData.name,
      designation: userData.designation,
      email: userData.email,
      suggestedPaths: [
        "/blog",
        "/writing",
        "/work",
        "/contact",
        "/about",
        "/bio",
        "/downloads",
      ],
    },
    blogs: (userData.blogs || []).map((b) => ({
      slug: b.slug,
      title: b.title,
    })),
  };
}
