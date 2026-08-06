---
name: uipath-component-design
description: "Design a deep UiPath component or project contract by exploring several genuinely different shapes before selecting one. Use for reusable libraries, workflow interfaces, coded automation modules, agents, Maestro processes, API workflows, human tasks, queue contracts, and integration adapters that need clear seams and testable behavior."
category: "Design and architecture"
---

# UiPath Component Design

Hide substantial behavior behind a small, stable contract so callers gain leverage, maintainers gain locality, and tests exercise the same seam used in production.

**Maturity:** core.

## Ownership Boundary

**This custom skill owns:** Hide substantial behavior behind a small, stable contract so callers gain leverage, maintainers gain locality, and tests exercise the same seam used in production.

Keep current product commands, schemas, artifact validation, live tenant operations, and policy administration with official UiPath skills.

## Compose With Official UiPath Skills

Use official skills for current product commands and artifact contracts:

- `uipath-rpa`
- `uipath-agents`
- `uipath-maestro-flow`
- `uipath-maestro-bpmn`
- `uipath-maestro-case`
- `uipath-api-workflow`
- `uipath-human-in-the-loop`

## Workflow

### 1. Define behavior and callers

State the business capability, callers, inputs, outputs, invariants, error modes, performance expectations, audit needs, and what must remain hidden.

**Completion criterion:** The contract can be judged independently of implementation.

### 2. Choose the seam

Place the public seam at the highest practical boundary used by real callers and tests. Introduce an adapter only where behavior actually varies or an external dependency must be isolated.

**Completion criterion:** The seam and its reason are explicit.

### 3. Design it more than once

Produce at least three radically different contract shapes: minimal common-case, explicit stateful, and extensible or event-oriented. Include representative usage and hidden complexity for each.

**Completion criterion:** The options differ in more than naming.

### 4. Compare the options

Evaluate interface size, correct-use ergonomics, misuse risk, observability, testability, versioning, locality, leverage, platform fit, and operational burden.

**Completion criterion:** Trade-offs are visible without assuming the first design wins.

### 5. Select and specify

Choose or synthesize the strongest design, define the contract and acceptance examples, and identify which official UiPath skill owns implementation.

**Completion criterion:** An implementer can build through the selected seam.

### 6. Verify depth

Apply the deletion test: removing the component should redistribute meaningful complexity to callers rather than simply eliminate pass-through code.

**Completion criterion:** The selected component earns its abstraction cost.

## Output Contract

- Caller and behavior brief.
- Three or more contrasting designs.
- Trade-off analysis.
- Selected contract with acceptance examples.
- Official implementation route.

## Guardrails

- Do not implement during interface exploration.
- Do not add extension points without a current variation.
- Do not expose selectors, credentials, vendor payload quirks, or retry mechanics unless callers must control them.
- Do not create pass-through wrappers that add no leverage.

## Example Requests

- "Design a reusable email-intake component."
- "Compare queue transaction contracts for a dispatcher and performer."
- "Design the boundary between Maestro and an RPA process."

## Finish

Report completed work, observed evidence, the next official owner, and every blocker. Mark unobserved actions as pending.
