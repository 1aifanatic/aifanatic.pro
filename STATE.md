# STATE

**Last updated:** 2026-08-06 — UiPath Boost catalog shipped and verified live.

## What works

The Portfolio is live at **https://naveen.aifanatic.pro** (200 direct). `aifanatic.pro` → `www.aifanatic.pro` → `naveen.aifanatic.pro` via the GitHub Pages apex redirect in `docs/`, path-preserving. Latest commit at time of writing: `7456972 Preserve paths in apex redirect`.

Working: all Portfolio pages, dark/light theme, blog (HTML strings in `constants/data.js`), Guest Book capture → Neon Postgres, `/admin/leads`, live GitHub repo metrics on the homepage, and the agent-facing surface — `/.well-known/agent-skills/index.json` (one Skill: `site-overview`), MCP server card, OAuth well-knowns, `openapi.json`, markdown content negotiation on `/`.

UiPath Boost already appears on the homepage via `components/UiPathBoostFeature.js`, with its "View on GitHub" CTA gated behind the Guest Book.

## What's broken / rotting

- `content/posts/the-great-collapse-agentic-orchestration.md` is orphaned. Nothing reads it; the blog uses `userData.blogs[].content`. Now that `marked` + `gray-matter` are installed, wiring it up is cheap. See NEXT.md.
- `data.js` is still a 31KB+ object mixing marketing copy, blog HTML, and project facts. The catalog work carved out one slice; the rest is untouched.

*(Resolved 2026-08-06: `data.js` no longer hardcodes the skill count, install command, or category labels — all derived from the Snapshot.)*

## Shipped: UiPath Boost Catalog

Live and verified 2026-08-06. Read [CONTEXT.md](./CONTEXT.md) for vocabulary and [decisions/](./decisions/) for the eight ADRs.

**Live URLs**
- Shelf: https://naveen.aifanatic.pro/skills
- Catalog: https://naveen.aifanatic.pro/skills/uipath-boost
- 34 Skill Pages: `/skills/uipath-boost/<skill>` — all verified 200
- Discovery Index: https://naveen.aifanatic.pro/.well-known/agent-skills/index.json — 35 entries, `site-overview` first
- Raw Skill markdown: `/agent-skills/uipath-boost/<skill>/SKILL.md`

**Verified in production**: all 34 Skill Pages return 200; the served `SKILL.md` sha256 matches the digest published in the Discovery Index; sitemap carries 35 catalog URLs; the apex redirect preserves catalog paths (`aifanatic.pro/skills/...` → `naveen.aifanatic.pro/skills/...`).

**Commits**: portfolio `3c13922` + `b6c4df5`; upstream `1aifanatic/uipath-boost@8a9791b`.

### How to update the catalog

1. Change skills in `D:\D-Solopreneur\uipath-boost`, run `npm run validate && node --test` there, push to `main`.
2. In this repo: `npm run sync:skills`, review the diff, `node scripts/generate-og.mjs` if the count changed.
3. Commit and push. Vercel deploys from `main`.

Two implementation notes beyond the ADRs. Invocation type (15 user / 19 model) is not frontmatter — the sync reads `src/skill-contracts.mjs` from the clone by pattern, and degrades to "model" rather than failing if that module's shape changes. And `.gitattributes` pins the Snapshot to LF, because CRLF conversion on a Windows checkout would change the bytes and invalidate every published digest.

### Do not

- Do not gate any Catalog, Shelf, or Skill Page, or the Install Command copy buttons — [0006](./decisions/0006-catalog-stays-open.md).
- Do not refactor `ContainerBlock`'s hardcoded `naveen.aifanatic.pro` canonical. It is correct, and touching it risks every existing page's canonical tag for no gain.
- Do not put documentation in `docs/` — [0008](./decisions/0008-project-docs-live-outside-docs.md).
- Do not fetch Skills at build time — [0004](./decisions/0004-committed-snapshot-not-build-time-fetch.md).

## Next

Nothing outstanding on the catalog. Deferred ideas are in [NEXT.md](./NEXT.md) — the strongest candidate is wiring `content/posts/` into the markdown pipeline that now exists.
