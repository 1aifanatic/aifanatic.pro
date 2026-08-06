---
name: uipath-project-router
description: "Use only when the user explicitly asks which skill, workflow, or starting point to use; choose the smallest correct official UiPath and UiPath Boost route."
category: "Routing and project continuity"
---

# UiPath Project Router

Provide a human-invoked index over the official UiPath product skills and the complementary delivery disciplines without competing with the official router behavior in uipath-planner.

**Maturity:** core.

## Ownership Boundary

**This custom skill owns:** Provide a human-invoked index over the official UiPath product skills and the complementary delivery disciplines without competing with the official router behavior in uipath-planner.

Keep current product commands, schemas, artifact validation, live tenant operations, and policy administration with official UiPath skills.

## Compose With Official UiPath Skills

Use official skills for current product commands and artifact contracts:

- `uipath-admin`
- `uipath-agents`
- `uipath-api-workflow`
- `uipath-automation-discovery`
- `uipath-coded-apps`
- `uipath-connector-builder`
- `uipath-feedback`
- `uipath-functions`
- `uipath-governance`
- `uipath-human-in-the-loop`
- `uipath-insights`
- `uipath-ixp`
- `uipath-maestro-bpmn`
- `uipath-maestro-case`
- `uipath-maestro-flow`
- `uipath-mcp-servers`
- `uipath-planner`
- `uipath-platform`
- `uipath-process-mining`
- `uipath-review`
- `uipath-rpa`
- `uipath-solution`
- `uipath-tasks`
- `uipath-test`
- `uipath-troubleshoot`
- `uipath-project-discovery-agent`

Read [references/official-uipath-skill-map.md](references/official-uipath-skill-map.md) when routing is unclear.
Read [references/phase-boundaries.md](references/phase-boundaries.md) when the question is whether to continue, clear, hand off, delegate, or compact.

## Workflow

### 1. Anchor the routing question

Identify the requested outcome, available artifact or document, lifecycle phase, product surface, environment, and whether the user wants advice, a read-only assessment, source changes, or platform changes.

**Completion criterion:** The route is based on an explicit outcome and operating context.

### 2. Apply official ownership first

Use the bundled ownership table. Route PDD/SDD and multi-project planning to uipath-planner; artifact authoring to the owning official skill; platform, admin, governance, Test Manager, Action Center, Insights, review, feedback, and causal diagnosis to their official owners.

**Completion criterion:** No official capability is shadowed by a custom skill.

### 3. Choose the route shape

Classify the request as a lifecycle route, an on-ramp, a standalone discipline, or a phase-boundary decision. Use the smallest route that reaches an authoritative owner; avoid drawing the whole catalog when one or two steps are sufficient.

**Completion criterion:** The route shape matches the user's immediate outcome and context.

### 4. Add one complementary extension only when needed

Add a custom skill for discovery discipline, durable project controls, architecture deepening, task refinement, regression evidence, traceability, release evidence, observability design, security assessment, continuity, or enablement only when that outcome is explicitly needed.

**Completion criterion:** Every custom skill adds a distinct artifact not produced by the official owner.

### 5. Return the route card

Name the primary skill, optional next skill, required input, expected artifact, approval boundary, and stop condition. Do not perform the specialist task in the router.

**Completion criterion:** The user can invoke the next skill without another routing discussion.

## Output Contract

- Primary route and optional extension.
- Required input and expected artifact.
- Official ownership explanation.
- Approval boundary and stop condition.

## Guardrails

- Use only for explicit routing or skill-selection requests.
- Never replace uipath-planner as the automatic router for ambiguous or multi-project builds.
- Never reproduce product commands, schemas, or operational procedures.
- Never write source, mutate tenant state, or send feedback while routing.

## Example Requests

- "Which UiPath skill should I use for this PDD?"
- "Show me the correct flow from an intermittent production failure to a regression test."
- "Which official and custom skills should I use for a pre-production security review?"

## Finish

Report completed work, observed evidence, the next official owner, and every blocker. Mark unobserved actions as pending.
