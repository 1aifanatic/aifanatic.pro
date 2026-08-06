# Advertise every Skill in the Discovery Index

`/.well-known/agent-skills/index.json` is extended from the single `site-overview` entry to list every published Skill, each with its URL and a `sha256` digest computed from the Snapshot bytes, and the 35 new pages are added to `sitemap.xml`. This is the difference between a domain an Agent can *read* and a domain an Agent can *install from*, and it is the substantive advantage this Catalog holds over the same files sitting in a GitHub folder.

## Consequences

This is a published contract that other Agents may come to depend on, so entries are additive: `site-overview` stays first and its shape is unchanged, so no existing consumer breaks. Because digests are computed from the committed Snapshot, the Discovery Index and the Skill Pages can never disagree — which is only true because of [0004](./0004-committed-snapshot-not-build-time-fetch.md).
