# STATE

**Contribution visibility — 2026-10-06:** The homepage underline now marks "Building reliable AI.". A linked logo row for Microsoft, OpenAI, Google, W3C WebMCP, UiPath, and Omi appears on the homepage and `/open-source`. Brand mappings live in `contributions.brands`; displayed counts are derived from the dated PR snapshot. Google is labelled with open proposals rather than merged work. Logo links open the corresponding project record. Locally hosted organization avatars and source URLs live in `public/brands/`.

**Portfolio assistant — 2026-10-06:** Added an opt-in "Ask about Naveen" dialog on public pages. `/api/chat` calls MiniMax with public portfolio facts from `constants/data.js`, short conversation history, and approved source IDs. Replies render as plain text and source links resolve server-side to known portfolio pages. Required production secret: `MINIMAX_API_KEY`; optional model override: `MINIMAX_CHAT_MODEL` (default `MiniMax-M2.7`). No new dependencies or vector database. Conversation text is not stored by the app; requests go to MiniMax. Postgres `portfolio_chat_limits` holds only HMAC visitor identifiers, counts, and expiry times, enforcing 10 requests per visitor per hour and 200 globally per 24 hours across instances. Provider failures consume quota, and database failures fail closed. Validation: `node --test tests/portfolio-chat.test.mjs`, production build, live MiniMax answers, real Postgres temporary-table quota checks, and desktop/mobile light/dark browser checks. Production activation requires the Vercel secret.

**Homepage follow-up — 2026-10-06:** At the user's request, removed the Daily AI Drop homepage feature and its episode fetch. The existing AI Drop navigation link leads to the archive, player, and notes. Restored the selected merged contribution cards in the homepage panel.

**Audio follow-up — 2026-10-06:** The publisher updated the RSS enclosure to Muse, where the MP3 now returns 200 with `audio/mpeg`. Added Muse's podcast media path to `dailyDrop.mediaBases`; the prior GitHub Pages-only check was rejecting this valid cross-host enclosure. Playback uses the final CDN URL resolved during the server's media check because Muse's intermediate redirect blocks cross-origin embeds. This signed URL refreshes with the page's five-minute cache. The upstream 404 limitation recorded below is resolved. Media hosts are configured explicitly; a future hosting-provider change may require updating that list.

**Current update — 2026-10-06:** Daily AI Drop now has a latest-episode homepage feature, a searchable archive at `/daily-ai-drop`, and per-episode listening / notes pages at `/daily-ai-drop/YYYY-MM-DD-am` (or `-pm`). Public metadata and notes are fetched from `navdatascience/daily-ai-drop`; playback URLs come from RSS enclosures in its `feed.xml`. Successful pages use a five-minute shared cache, so future editions need no portfolio deployment. A failed source fetch does not break the homepage. Audio is enabled only when its URL responds with a successful audio content type; inaccessible media is labelled unavailable while episode notes remain readable.

At implementation time the repository contains one morning edition with ten stories and eleven video links. Its GitHub Pages audio enclosure returns 404, and the MP3 is not in the source tree. Publishing that upstream file / host is still required for real playback; the portfolio will detect it automatically. Tests: `node --test tests/daily-drop.test.mjs`; production build; light/dark browser checks at 1440, 1024, 390, and 320 pixels covering the homepage, archive, notes, filters, search, source links, and sitemap.

---

**Current update — 2026-10-05:** The portfolio now leads with upstream open-source contributions. `/open-source` documents 37 merged PRs across seven independent projects, seven selected fixes, and separately labelled open proposals. The dated snapshot and PR links live in `constants/data.js`; verify GitHub author, ownership, and `merged_at` before refreshing it. Regenerate the social card with `node scripts/generate-og.mjs` when counts change.

The UiPath skills catalogs are retired: the registry is empty, `/skills` and nested URLs redirect permanently to `/open-source`, raw catalog skill endpoints return 404, and discovery retains only `site-overview`. Committed snapshots remain archival source files, not published catalogs. The homepage animation and photograph are preserved. The homepage no longer fetches repository stars.

Validation: production build passed; Chromium checks passed at 1440, 1024, and 390 pixels in light/dark themes, including mobile navigation, retirement redirects, discovery, sitemap, and social image. The entries below describe the earlier catalog release and are historical.

---

**Last updated:** 2026-08-06 — two catalogs shipped and verified live: UiPath Boost and UiPath Coded App Launchpad.

## What works

The Portfolio is live at **https://naveen.aifanatic.pro** (200 direct). `aifanatic.pro` → `www.aifanatic.pro` → `naveen.aifanatic.pro` via the GitHub Pages apex redirect in `docs/`, path-preserving. Latest commit at time of writing: `7456972 Preserve paths in apex redirect`.

Working: all Portfolio pages, dark/light theme, blog (HTML strings in `constants/data.js`), Guest Book capture → Neon Postgres, `/admin/leads`, live GitHub repo metrics on the homepage, and the agent-facing surface — `/.well-known/agent-skills/index.json` (one Skill: `site-overview`), MCP server card, OAuth well-knowns, `openapi.json`, markdown content negotiation on `/`.

UiPath Boost already appears on the homepage via `components/UiPathBoostFeature.js`, with its "View on GitHub" CTA gated behind the Guest Book.

## What's broken / rotting

- `content/posts/the-great-collapse-agentic-orchestration.md` is orphaned. Nothing reads it; the blog uses `userData.blogs[].content`. Now that `marked` + `gray-matter` are installed, wiring it up is cheap. See NEXT.md.
- `data.js` is still a 31KB+ object mixing marketing copy, blog HTML, and project facts. The catalog work carved out one slice; the rest is untouched.

*(Resolved 2026-08-06: `data.js` no longer hardcodes the skill count, install command, or category labels — all derived from the Snapshot.)*

## Shipped: Agent Skills Catalogs

Live and verified 2026-08-06. Read [CONTEXT.md](./CONTEXT.md) for vocabulary and [decisions/](./decisions/) for the eight ADRs.

**Live URLs**
- Shelf: https://naveen.aifanatic.pro/skills
- Catalog 1: https://naveen.aifanatic.pro/skills/uipath-boost — 34 skills, six categories, search
- Catalog 2: https://naveen.aifanatic.pro/skills/uipath-coded-app-launchpad — 1 skill, plus a hand-written Overview
- Skill Pages: `/skills/<catalog>/<skill>` — all 35 verified 200
- Discovery Index: https://naveen.aifanatic.pro/.well-known/agent-skills/index.json — 36 entries, `site-overview` first
- Raw Skill markdown: `/agent-skills/<catalog>/<skill>/SKILL.md`

**Two catalog layouts are supported.** Boost keeps skills under `skills/`; Launchpad keeps its single skill at the repo root. The catalog's `skillsPath` records which, and each skill's upstream `path` is stored in the manifest so permalinks work for both.

**Invocation type** is derived from each skill's `agents/openai.yaml`: `allow_implicit_invocation: false` means user-invoked. This is portable across catalogs and reproduces Boost's own 15/19 test exactly. Note: `create-uipath-coded-app` has no such policy line, so it is labelled agent-invocable even though its README documents `$create-uipath-coded-app` usage — add the policy line upstream if that is not intended.

**Verified in production**: every Skill Page returns 200; the served `SKILL.md` sha256 matches the digest published in the Discovery Index; the sitemap carries every catalog URL; the apex redirect preserves catalog paths (`aifanatic.pro/skills/...` → `naveen.aifanatic.pro/skills/...`).

`.gitattributes` pins Snapshots to LF, because CRLF conversion on a Windows checkout would change the bytes and invalidate every published digest. For the same reason the sync **normalises CRLF to LF before both digesting and writing** — the Launchpad's upstream uses CRLF, and hashing unnormalised bytes published a digest the served file could never match. Do not remove that normalisation.

### How to update a catalog

1. Change skills upstream (`D:\D-Solopreneur\uipath-boost` or `D:\D-Solopreneur\uipath-coded-app-launchpad`). Boost has its own suite — run `npm run validate && node --test` there. Push to `main`.
2. In this repo: `npm run sync:skills <catalog-slug>` (defaults to `uipath-boost`), review the diff, run `node scripts/generate-og.mjs` if a count changed.
3. Commit and push. Vercel deploys from `main`.

### How to add a third catalog

1. Add an entry to `CATALOGS` in `scripts/sync-skills.mjs` (repository, branch, `skillsPath`, categories).
2. Add a matching entry to `skillCatalogs` in `constants/skillCatalogs.js`. Add an `overview` block if the skills alone will not explain the project — that is what makes a one-skill catalog page worth visiting.
3. Add a card to `CARDS` in `scripts/generate-og.mjs`.
4. `npm run sync:skills <slug>`, then build. The shelf, sitemap, and discovery index pick it up automatically.

### Do not

- Do not gate any Catalog, Shelf, or Skill Page, or the Install Command copy buttons — [0006](./decisions/0006-catalog-stays-open.md).
- Do not refactor `ContainerBlock`'s hardcoded `naveen.aifanatic.pro` canonical. It is correct, and touching it risks every existing page's canonical tag for no gain.
- Do not put documentation in `docs/` — [0008](./decisions/0008-project-docs-live-outside-docs.md).
- Do not fetch Skills at build time — [0004](./decisions/0004-committed-snapshot-not-build-time-fetch.md).

## Next

Nothing outstanding on the catalog. Deferred ideas are in [NEXT.md](./NEXT.md) — the strongest candidate is wiring `content/posts/` into the markdown pipeline that now exists.
