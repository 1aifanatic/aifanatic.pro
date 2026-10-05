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

// ponytail: Retired catalogs stay in git history; an empty registry unpublishes pages and raw skills.
export const skillCatalogs = [];

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
