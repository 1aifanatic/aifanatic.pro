# NEXT

Ideas parked deliberately, not forgotten. Nothing here is in scope for the current task.

## From the UiPath Boost Catalog design session (2026-08-06)

- **Per-Skill generated OG images.** All 35 Catalog pages share one static card. Per-Skill images need `@vercel/og` and an edge runtime — a new dependency and runtime for a Catalog nobody is sharing yet. Revisit when the pages get traffic.
- **Automate the Sync.** A GitHub Action in `1aifanatic/uipath-boost` that opens a PR here on every Skill change. Deliberately rejected for now because it needs a PAT with write access to this repo stored as a secret in a public repo. Revisit if the Catalog starts changing weekly. See [decisions/0004](./decisions/0004-committed-snapshot-not-build-time-fetch.md).
- **The orphaned blog markdown.** `content/posts/the-great-collapse-agentic-orchestration.md` is read by nothing — the blog renders HTML strings from `constants/data.js`. Either wire `content/posts/` up to the markdown pipeline being added for Skills (they can share `marked` + `gray-matter`) or delete the file. Do not leave it as a decoy.
- **A second Catalog.** The URL shape in [decisions/0002](./decisions/0002-url-shape-shelf-catalog-skill.md) was chosen to make this additive. Candidates already on disk: `uipath-aiskills`, `uipath-coded-workflows`, `uipath-saferclaw`.
- **`data.js` is doing too much.** 31KB+ single object mixing marketing copy, blog bodies, and repo facts. The Catalog work carves out one slice (`skillCatalogs.js`); the rest is still tangled.
