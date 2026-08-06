# Decisions

Architecture decision records for aifanatic.pro.

**Numbering is build order, not chronological.** These were all recorded in one design session, so they are numbered in the sequence you would implement them. Read them top to bottom to follow the work. Future ADRs append at the end in the normal way.

**They live here, not in `docs/adr/`.** `docs/` is a GitHub Pages publish root (it holds the `CNAME` and the apex redirect for `aifanatic.pro`), so anything placed there is served publicly. See [0008](./0008-project-docs-live-outside-docs.md).

| # | Decision |
|---|---|
| [0001](./0001-skills-catalog-inside-the-portfolio.md) | Publish the skills Catalog inside the Portfolio app |
| [0002](./0002-url-shape-shelf-catalog-skill.md) | URL shape: Shelf, then Catalog, then Skill |
| [0003](./0003-categories-in-upstream-frontmatter.md) | Categories live in upstream `SKILL.md` frontmatter |
| [0004](./0004-committed-snapshot-not-build-time-fetch.md) | Build from a committed Snapshot, not a build-time fetch |
| [0005](./0005-markdown-parser-not-raw-html.md) | Render Skills with a markdown parser, not the blog's raw-HTML pattern |
| [0006](./0006-catalog-stays-open.md) | Catalog pages stay open; the Guest Book stays on the outbound link |
| [0007](./0007-advertise-every-skill-in-discovery-index.md) | Advertise every Skill in the Discovery Index |
| [0008](./0008-project-docs-live-outside-docs.md) | Project documentation lives outside `docs/` |

Vocabulary used by all of these is defined in [CONTEXT.md](../CONTEXT.md).
