/**
 * Catalog registry — the single source for which Catalogs exist, where they
 * come from, and how they are installed.
 *
 * Facts that belong to the Upstream Repository (skill count, categories, the
 * skills themselves) are NOT listed here. They are derived from the Snapshot
 * manifest written by `npm run sync:skills`, so they cannot rot.
 *
 * See decisions/0003 and CONTEXT.md.
 */

// Agent ids are the `skills` CLI's own identifiers. Claude Code is
// "claude-code", never "claude" — verified against vercel-labs/skills v1.5.22.
export const AGENTS = [
  { id: "claude-code", label: "Claude Code" },
  { id: "codex", label: "Codex" },
];

export const skillCatalogs = [
  {
    slug: "uipath-boost",
    title: "UiPath Boost",
    eyebrow: "Open source · Community toolkit",
    tagline:
      "The engineering process around UiPath delivery — discovery, design, testing, release, and operations.",
    description:
      "Official UiPath skills build and operate the platform. UiPath Boost adds the repeatable engineering process before, after, and around that product work.",
    repository: "1aifanatic/uipath-boost",
    repositoryUrl: "https://github.com/1aifanatic/uipath-boost",
    registryUrl: "https://www.skills.sh/1aifanatic/uipath-boost",
    license: "MIT",
    disclaimer:
      "Independent community project. UiPath's official skills remain the source of truth for product commands, schemas, deployment, and platform behavior.",
  },
];

export function getCatalogConfig(slug) {
  return skillCatalogs.find((catalog) => catalog.slug === slug) || null;
}

/** Install one Skill, or the whole Catalog when `skill` is omitted. */
export function installCommand(repository, agent, skill) {
  const selector = skill ? skill : "'*'";
  return `npx skills add ${repository} --skill ${selector} --agent ${agent} --global --yes`;
}

export function installCommands(repository, skill) {
  return AGENTS.map((agent) => ({
    ...agent,
    command: installCommand(repository, agent.id, skill),
  }));
}

/** Permalink to a file in the Upstream Repository, pinned to the synced commit. */
export function upstreamFileUrl(repository, commit, filePath) {
  return `https://github.com/${repository}/blob/${commit}/${filePath}`;
}
