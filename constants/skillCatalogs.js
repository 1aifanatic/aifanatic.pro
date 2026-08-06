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
  {
    slug: "uipath-coded-app-launchpad",
    title: "UiPath Coded App Launchpad",
    eyebrow: "Open source · Guided workflow",
    tagline:
      "One guided workflow that takes a UiPath Coded App from an idea to a live, verified URL.",
    description:
      "Shape a small use case, check the machine is ready, scaffold a TypeScript UI with clearly labelled demo data, build it, authenticate, publish, deploy, open the live URL, and optionally publish the source to GitHub.",
    repository: "1aifanatic/uipath-coded-app-launchpad",
    repositoryUrl: "https://github.com/1aifanatic/uipath-coded-app-launchpad",
    registryUrl: "https://www.skills.sh/1aifanatic/uipath-coded-app-launchpad",
    license: "MIT",
    disclaimer:
      "Independent community skill. It is not an official UiPath product. Current UiPath commands, SDK contracts, OAuth scopes, and platform operations remain owned by the installed official UiPath skills.",
    // Rendered on the catalog page. A one-skill catalog needs the project
    // explained on the page itself, not just a single card.
    overview: {
      outcomes: [
        "Turn a simple idea into a focused UI without a lengthy discovery process.",
        "Confirm the developer machine is ready before creating any files.",
        "Build a React and TypeScript UI with clearly labelled fictional data.",
        "Configure the UiPath TypeScript SDK only when live services are actually needed.",
        "Recommend consistent application, package, branch, and Orchestrator folder names.",
        "Produce a least-privilege access request when deployment access is missing.",
        "Build, pack, publish, and deploy through the official owner skill.",
        "Open and visually verify both local and deployed URLs.",
      ],
      deliveryModes: [
        {
          name: "local",
          result:
            "Scaffold, demo UI, structured README, local browser verification, and a successful build.",
        },
        {
          name: "deploy",
          result:
            "Everything in local, plus authentication, folder resolution, pack, publish, deploy, and live URL verification.",
        },
        {
          name: "deploy-and-git",
          result:
            "Everything in deploy, plus an intentional commit, push, and draft GitHub pull request.",
        },
      ],
      workflow: [
        "Use case and app type",
        "Delivery authority",
        "Machine preflight",
        "UI and demo data",
        "SDK and authentication, when needed",
        "Build and local browser verification",
        "Orchestrator folder and access",
        "Pack, publish, deploy",
        "Live browser verification",
        "Optional GitHub publication",
      ],
      owners: [
        { name: "uipath-coded-apps", owns: "Coded App artifacts and lifecycle operations" },
        {
          name: "uipath-platform",
          owns: "Authentication, tenant, folder, user, group, and role operations",
        },
        { name: "github:yeet", owns: "Intentional commit, push, and pull-request publication" },
        { name: "Browser control", owns: "Visual navigation and verification, when available" },
      ],
      neverDoesSilently: [
        "Install or upgrade global software",
        "Create or change OAuth applications",
        "Create Orchestrator folders or alter access",
        "Overwrite non-empty destinations",
        "Publish or deploy to a tenant",
        "Create GitHub repositories, push branches, or stage unrelated changes",
      ],
      preflight: {
        summary:
          "A read-only Windows PowerShell checker reports readiness without installing software, authenticating, changing tenant state, deploying, or pushing. Exit code 0 means every required check passed. The JSON report never prints .env values, credentials, tokens, folder keys, or deployment URLs.",
        command:
          "powershell -NoProfile -ExecutionPolicy Bypass -File .\\create-uipath-coded-app\\scripts\\check-prerequisites.ps1 -Stage Scaffold -AppType Web -SourcePublish GitHub -OutputFormat Json",
      },
      quickStart: `Use $create-uipath-coded-app.

Create a Coded Web App named claims-review-dashboard.
Build a responsive dashboard for claims reviewers to see pending claims.
Use safe fictional demo data and clearly label it.
Use local delivery mode and open the interface in a browser.
Create the project in C:\\projects\\claims-review-dashboard.`,
      links: [
        {
          label: "Prompt cookbook",
          href: "https://github.com/1aifanatic/uipath-coded-app-launchpad/blob/main/docs/PROMPTS.md",
        },
        {
          label: "Readiness contract",
          href: "https://github.com/1aifanatic/uipath-coded-app-launchpad/blob/main/create-uipath-coded-app/references/readiness-contract.md",
        },
        {
          label: "Evaluation scenarios",
          href: "https://github.com/1aifanatic/uipath-coded-app-launchpad/blob/main/create-uipath-coded-app/references/evaluation-scenarios.md",
        },
      ],
    },
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
