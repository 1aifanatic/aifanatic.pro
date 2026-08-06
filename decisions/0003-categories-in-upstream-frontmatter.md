# Categories live in upstream `SKILL.md` frontmatter

A `category` field is added to the frontmatter of all 34 `SKILL.md` files in the Upstream Repository, and the Catalog reads Categories from the Snapshot rather than from any list maintained in this repository. At the time of this decision the taxonomy existed in two places that already disagreed: the Upstream Repository README grouped the Skills under six headings, while `components/UiPathBoostFeature.js` hardcoded a different set of four. A Category is a property of a Skill, so it belongs next to the Skill.

## Considered Options

- **A mapping table in the Portfolio** (`constants/`) — rejected: it is the same duplication that produced the existing disagreement, just with the copies one repo further apart.
- **No Categories, flat alphabetical list** — rejected: 34 items is past the point where a flat list is scannable.

## Consequences

The Portfolio now has a content dependency on frontmatter in another repository, and the Sync asserts that every Skill declares a Category from the known six. Adding a Skill upstream without a `category` fails the Sync loudly rather than publishing an uncategorised page.
