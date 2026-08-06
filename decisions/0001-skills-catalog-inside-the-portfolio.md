# Publish the skills Catalog inside the Portfolio app

UiPath Boost's 34 Skills are published as a browsable Catalog — an index plus one Skill Page per Skill, rendering the real authored content — served from new routes inside the existing Portfolio Next.js app rather than a separate app on a subdomain. The brief was that this must "blend in" with the Portfolio and not interfere with it, and a new route segment is the literal expression of that: it inherits the existing design system, typography, theme, and deploy, and touches no existing page beyond the navbar and one homepage block.

## Considered Options

- **A landing page** — a single marketing page for the Upstream Repository. Rejected: this already substantially exists as the homepage block, and nothing links to a page with no per-Skill URLs.
- **A Registry** — multi-author submissions, cross-repo search, ranking. Rejected: it is a product, not a page, and skills.sh already holds that network effect. This project is explicitly not a Registry.
- **A separate app on `skills.aifanatic.pro`** — rejected: a second deploy target and a duplicated design system, which visually drifts from the Portfolio within a month. That is the opposite of blending in.

## Consequences

The Portfolio gains 35 indexable pages of agent-instruction prose, which is a meaningful shift for a site otherwise curated as a tight executive snapshot. Accepted knowingly: the citable per-Skill URL is the entire thing a GitHub folder cannot give you.
