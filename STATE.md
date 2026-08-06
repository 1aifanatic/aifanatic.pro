# STATE

**Last updated:** 2026-08-06

## What works

The Portfolio is live at **https://naveen.aifanatic.pro** (200 direct). `aifanatic.pro` → `www.aifanatic.pro` → `naveen.aifanatic.pro` via the GitHub Pages apex redirect in `docs/`, path-preserving. Latest commit at time of writing: `7456972 Preserve paths in apex redirect`.

Working: all Portfolio pages, dark/light theme, blog (HTML strings in `constants/data.js`), Guest Book capture → Neon Postgres, `/admin/leads`, live GitHub repo metrics on the homepage, and the agent-facing surface — `/.well-known/agent-skills/index.json` (one Skill: `site-overview`), MCP server card, OAuth well-knowns, `openapi.json`, markdown content negotiation on `/`.

UiPath Boost already appears on the homepage via `components/UiPathBoostFeature.js`, with its "View on GitHub" CTA gated behind the Guest Book.

## What's broken / rotting

- `constants/data.js` hardcodes `skillCount: 34`, the Install Command, and four Category labels. The four labels **already disagree** with the Upstream Repository README's six. These rot the moment Skill 35 is added — [0003](./decisions/0003-categories-in-upstream-frontmatter.md) fixes the taxonomy, and the build plan below derives the rest.
- `content/posts/the-great-collapse-agentic-orchestration.md` is orphaned. Nothing reads it; the blog uses `userData.blogs[].content`. See NEXT.md.

## In progress: UiPath Boost Catalog

**Design is settled and documented. Implementation has not started — no code written yet.**

Read [CONTEXT.md](./CONTEXT.md) for vocabulary and [decisions/](./decisions/) for the eight ADRs, numbered in build order.

### Build plan

**Phase 1 — Upstream Repository (`1aifanatic/uipath-boost`)**

1. Clone to `D:\D-Solopreneur\uipath-boost` (not currently on disk anywhere).
2. Add `category` frontmatter to all 34 `SKILL.md` files, using the six canonical Categories exactly as the README names them: Routing and project continuity (4), Discovery and decision-making (8), Design and architecture (5), Build, test, and change quality (9), Release, operations, and governance (4), Learning and communication (4).
3. Add the attribution line to the README: structure inspired by `mattpocock/skills`, Catalog listed on skills.sh.
4. **Show Naveen the diff. Do not push without approval.** Then push, and deploy nothing else in this phase.

**Phase 2 — Portfolio, one coherent deploy**

5. `scripts/sync-skills.mjs` + `npm run sync:skills`: shallow-clone upstream to a temp dir → copy 34 `SKILL.md` into `content/skills/uipath-boost/` → write Manifest with the `HEAD` SHA and sync date → delete clone. Assertions that exit non-zero: Skill count not below the previous Manifest, every Skill has `name`/`description`/`category`, every Category is one of the known six.
6. `constants/skillCatalogs.js` — single source for Catalog slug, Upstream Repository, Category order, Install Command templates. Strip `repository` / `skillCount` / `installCommand` out of `userData.uipathBoost`, leaving it marketing copy only; derive counts from the Manifest.
7. Add `marked` + `gray-matter` (build-time only, used in `getStaticProps`).
8. `/skills` — Shelf. Catalog card, the narrative, and a pointer to the Discovery Index. One attribution line.
9. `/skills/uipath-boost` — Catalog. Grouped by the six Categories with counts, plus a client-side search over name + description (`useState` + `filter`, no library, no pagination). Whole-Catalog Install Command at the top.
10. `/skills/uipath-boost/[skill]` — Skill Page, full SSG via `getStaticPaths`/`getStaticProps` (no ISR; content is committed). Breadcrumb, Category chip, `name` as H1, `description` as lede, both Install Commands as copy-to-clipboard lines, rendered body in `.article-copy`, sticky TOC reusing the blog's `enhanceHeadings` helper, named links to Supplementary Files, Provenance line linking the file at its exact SHA, prev/next within Category. No "related skills".
11. Install Commands — two labelled lines, Claude Code first: `npx skills add 1aifanatic/uipath-boost --skill <name> --agent claude-code --global --yes` and the same with `--agent codex`. **Agent id is `claude-code`, not `claude`.** Verified against `vercel-labs/skills` v1.5.22.
12. Navbar — add "Skills" after "Work". Homepage `UiPathBoostFeature` — retarget the primary button to `/skills/uipath-boost` (ungated), keep the gated GitHub link as secondary, and render all six Categories with counts derived from the registry instead of the four hardcoded labels.
13. `sitemap.xml.js` — add `/skills`, `/skills/uipath-boost`, and the 34 Skill Pages.
14. `/.well-known/agent-skills/index.json` — extend to all 34 with URL + `sha256` digest, `site-overview` first and unchanged.
15. One shared OG card image for all 35 pages (not the avatar, not per-Skill generation).
16. Add the `AGENTS.md` / `CLAUDE.md` section: the `/skills` routes, the `npm run sync:skills` workflow, and the warning that `docs/` is a publish directory.
17. Build, deploy, then **verify the live URLs with curl** before reporting done.

### Do not

- Do not gate any Catalog, Shelf, or Skill Page, or the Install Command copy buttons — [0006](./decisions/0006-catalog-stays-open.md).
- Do not refactor `ContainerBlock`'s hardcoded `naveen.aifanatic.pro` canonical. It is correct, and touching it risks every existing page's canonical tag for no gain.
- Do not put documentation in `docs/` — [0008](./decisions/0008-project-docs-live-outside-docs.md).
- Do not fetch Skills at build time — [0004](./decisions/0004-committed-snapshot-not-build-time-fetch.md).

## Next

Phase 1, step 1: clone the Upstream Repository. Deferred ideas are in [NEXT.md](./NEXT.md).
