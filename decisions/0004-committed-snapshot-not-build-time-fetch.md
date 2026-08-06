# Build from a committed Snapshot, not a build-time fetch

Skills are copied into this repository as a committed Snapshot by a human-triggered `npm run sync:skills`, which shallow-clones the Upstream Repository to a temporary directory, copies the `SKILL.md` files, records the exact `HEAD` commit in the Manifest, and deletes the clone. The site builds only from committed files and never contacts GitHub at build time.

The governing constraint is that this project must not endanger the Portfolio. The homepage already makes a live GitHub call, but it does so in `getServerSideProps`, so a bad day degrades one section. A failed `getStaticProps` fails the build for the *entire site* — meaning an expired token or a GitHub outage would leave the whole Portfolio stale. A committed Snapshot also makes synced content reviewable in a diff and supplies the local bytes needed to digest each Skill for the Discovery Index.

## Considered Options

- **ISR / build-time fetch with `revalidate`** — rejected for the build-coupling reason above.
- **Git submodule** — rejected: submodule friction inside a Vercel build for no benefit over a copy.
- **GitHub Contents API per file** — rejected: ~35 requests against a 60/hour unauthenticated limit, every Sync.
- **Codeload tarball** — rejected: needs a tar dependency to solve a problem `git clone --depth 1` already solves, and the shallow clone yields the commit SHA for free, guaranteeing the recorded Provenance matches the copied bytes exactly.
- **A GitHub Action in the Upstream Repository that opens a PR here** — rejected for now: it requires a personal access token with write access to the Portfolio stored as a secret in a public repository. That is real secret sprawl and blast radius for a Catalog that changes rarely. Revisit if it starts changing weekly.

## Consequences

The Snapshot can go stale silently, so two things are non-negotiable: every Skill Page states its Provenance, and the Sync asserts that the Skill count has not dropped and that all frontmatter is complete before it exits.
