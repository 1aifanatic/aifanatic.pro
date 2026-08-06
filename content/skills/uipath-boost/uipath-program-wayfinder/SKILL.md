---
name: uipath-program-wayfinder
description: "Use only when the user explicitly asks to map the decisions required to make a large, foggy UiPath program plannable."
category: "Discovery and decision-making"
---

# UiPath Program Wayfinder

Create a shared map of decision tickets, work only the current frontier, and produce decisions rather than premature implementation deliverables.

**Maturity:** core.

## Ownership Boundary

**This custom skill owns:** Create a shared map of decision tickets, work only the current frontier, and produce decisions rather than premature implementation deliverables.

Keep current product commands, schemas, artifact validation, live tenant operations, and policy administration with official UiPath skills.

## Compose With Official UiPath Skills

Use official skills for current product commands and artifact contracts:

- `uipath-automation-discovery`
- `uipath-planner`

## Workflow

### 1. Name the destination

Define what the map must make possible: approved architecture, portfolio roadmap, migration decision, or planner-ready solution designs.

**Completion criterion:** The destination fixes scope in one or two sentences.

### 2. Map the visible frontier

Create precise decision tickets, keep suspected but unformulated questions in Not Yet Specified, and separate out-of-scope work.

**Completion criterion:** Tickets, fog, and exclusions are distinct.

### 3. Type and connect tickets

Use research, prototype, discovery, or enabling-task tickets. Mark discovery and prototype decisions as human-in-the-loop; mark independent research as agent-runnable. Add genuine blocking edges and identify the unblocked frontier.

**Completion criterion:** Each ticket fits one focused session and has dependencies.

### 4. Burn down independent research

After the map is visible, delegate independent research tickets when the environment supports safe parallel work. Keep one note or branch per research question and return only cited findings and context pointers to the map. Research tickets are the exception to one ticket per session.

**Completion criterion:** Every runnable research ticket is completed, running, or explicitly blocked without stopping unrelated mapping work.

### 5. Resolve one human decision

Claim one frontier ticket, gather evidence, record a durable resolution, close it, and update the map.

**Completion criterion:** One decision has a resolution and context pointer.

### 6. Advance the frontier

Create newly visible tickets, graduate clarified fog, and remove invalidated work until no decision blocks the destination.

**Completion criterion:** The route to the destination is visible.

If the opening discovery reveals no meaningful fog, stop without creating a map and route the well-scoped work to discovery or planning.

### 7. Hand off instead of building

Collapse decisions into process or solution-design inputs and invoke uipath-planner.

**Completion criterion:** A planner-ready handoff replaces the decision map as build entry point.

## Output Contract

- Program map with destination, decisions, fog, and exclusions.
- Decision tickets with evidence and dependencies.
- Final planning handoff.

## Guardrails

- Do not pre-slice fog into fake precision.
- Do not resolve more than one non-research decision per session.
- Do not replace unanswered decisions with implementation tasks.
- Use meaningful ticket names, not only IDs.

## Example Requests

- "Plan an enterprise agentic operating model."
- "Map a thirty-process Finance transformation."
- "Resolve platform, security, and sequencing decisions."

## Finish

Report completed work, observed evidence, the next official owner, and every blocker. Mark unobserved actions as pending.
