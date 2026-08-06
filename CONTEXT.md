# aifanatic.pro

The personal site of Naveen Chatlapalli, which serves two audiences from one Next.js app: humans reading a portfolio, and coding agents discovering and installing published Agent Skills.

## Language

### The site

**Portfolio**:
The human-facing pages of aifanatic.pro — work, experience, recognition, insights, about, contact.
_Avoid_: site, webapp, personal website

**Guest Book**:
A modal that asks a visitor for their name and email immediately before they leave the Portfolio for an external destination. It is a courtesy ask on the way out, never a gate on Portfolio content.
_Avoid_: lead capture form, popup, download form

### Skills publishing

**Skill**:
A single unit of agent instruction, authored as one `SKILL.md` file with `name`, `description`, and `category` frontmatter, plus a body an agent follows.
_Avoid_: prompt, playbook, command, recipe

**Catalog**:
A named, versioned collection of Skills published from one Upstream Repository, presented as a browsable set of pages under aifanatic.pro. UiPath Boost is the first Catalog.
_Avoid_: skills webapp, skills directory site, skills library, registry

**Shelf**:
The single page that presents every Catalog and explains how agents discover them. It carries the narrative; a Catalog carries the Skills.
_Avoid_: skills index, landing page, hub

**Skill Page**:
One page per Skill, rendering that Skill's authored content along with its Install Commands and Provenance.
_Avoid_: detail page, skill doc

**Category**:
One of the fixed groupings a Skill belongs to, declared in the Skill's own frontmatter and used to organise a Catalog. A Skill has exactly one.
_Avoid_: group, tag, section, topic

**Supplementary File**:
A file inside a Skill's folder that the Skill's body references but which is not itself a Skill. Named and linked, never rendered as a page.
_Avoid_: attachment, resource, asset

**Registry**:
A third-party, multi-author service that indexes Catalogs from many authors — skills.sh is one. Explicitly not something this project builds.

### Publishing pipeline

**Upstream Repository**:
The public GitHub repository that authors a Catalog's Skills and is the sole source of truth for their content and Categories. `1aifanatic/uipath-boost` is the first.
_Avoid_: source repo, skills repo

**Sync**:
The deliberate, human-triggered act of copying Skills from an Upstream Repository into this repository as a Snapshot.
_Avoid_: fetch, pull, import, update

**Snapshot**:
The committed copy of a Catalog's Skills inside this repository, pinned to one Upstream Repository commit. It is what the site builds from, so the site never depends on GitHub at build time.
_Avoid_: cache, mirror, vendored copy

**Manifest**:
The generated record accompanying a Snapshot, holding the Upstream Repository commit it came from, when it was taken, and every Skill in it. The site derives counts and Categories from this rather than from hand-maintained values.
_Avoid_: index, lockfile, metadata

**Provenance**:
The statement on a Skill Page naming the exact Upstream Repository commit its content came from and when it was Synced, linked to that file at that commit. What keeps a Snapshot honest rather than merely plausible.

**Install Command**:
A copyable one-line command that installs a Skill or a whole Catalog into a named Agent via the `skills` CLI.

**Agent**:
A coding agent that consumes Skills — Claude Code, Codex, and others. Identified by the `skills` CLI's agent id, so Claude Code is `claude-code`, never `claude`.

**Discovery Index**:
The machine-readable document at `/.well-known/agent-skills/index.json` advertising every Skill this domain publishes, so an Agent can install from aifanatic.pro without reading HTML.
_Avoid_: well-known, manifest, feed
