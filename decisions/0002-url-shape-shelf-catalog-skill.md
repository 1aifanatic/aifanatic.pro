# URL shape: Shelf, then Catalog, then Skill

URLs nest as `/skills` (the Shelf) → `/skills/uipath-boost` (the Catalog) → `/skills/uipath-boost/<skill-name>` (the Skill Page), even though there is only one Catalog today. URLs are the hardest thing in this project to reverse, and the flat alternative (`/boost/<skill-name>`) would have to break every published and agent-installed URL the first time a second Catalog appears. There are already several other candidate repositories on disk, so a second Catalog is likely rather than hypothetical.

The Shelf and the Catalog are kept as two real pages rather than collapsing `/skills` into the Catalog listing, because they do different jobs for different readers: the Shelf carries the portfolio narrative ("I author Agent Skills, and here is how agents discover them"), which is what earns the navbar slot and blends into the Portfolio, while the Catalog is the utility for someone who arrived to install something.

## Consequences

A first-time visitor pays one extra click to reach the Skills. Accepted: the alternative is either a duplicate-content pair of pages or a Shelf with nothing to say.
