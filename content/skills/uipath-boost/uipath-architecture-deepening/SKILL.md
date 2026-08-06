---
name: uipath-architecture-deepening
description: "Use only when the user explicitly asks to deepen a proven UiPath architecture hotspot into ranked design options and a safe handoff."
category: "Design and architecture"
---

# UiPath Architecture Deepening

Transform a proven architecture friction point into a focused design decision that increases locality, leverage, testability, and agent navigability.

**Maturity:** core.

## Ownership Boundary

**This custom skill owns:** Transform a proven architecture friction point into a focused design decision that increases locality, leverage, testability, and agent navigability.

Keep current product commands, schemas, artifact validation, live tenant operations, and policy administration with official UiPath skills.

## Compose With Official UiPath Skills

Use official skills for current product commands and artifact contracts:

- `uipath-review`

## Workflow

### 1. Load the proven hotspot

Start from an official review finding, incident post-mortem, or a specific user-named pain point. When no direction is supplied, inspect roughly the last 20 commit messages and prioritize proven friction in actively changing paths. Capture the business behavior affected and the evidence proving the friction.

**Completion criterion:** One concrete architecture hotspot and its evidence are pinned.

Apply a YAGNI filter: an improvement in dormant code must show a near-term change, reliability, or ownership payoff before it competes with an active hotspot.

### 2. Map the current change surface

Trace callers, workflows, arguments, configuration, queues, assets, external systems, tests, and ownership involved in changing the behavior. Separate product validation findings from design judgment.

**Completion criterion:** The current seam, coupling, and blast radius are visible.

### 3. Generate distinct deepening options

Use component-design to produce at least two materially different shapes, including what moves behind the interface, what stays public, migration implications, and test seams.

**Completion criterion:** The alternatives differ in seam placement or interface shape rather than naming alone.

### 4. Compare and recommend

Evaluate locality, leverage, behavior preservation, compatibility, rollback, operational impact, migration cost, and evidence quality. Flag conflicts with an ADR or SDD.

**Completion criterion:** A recommended option and the reasons against alternatives are explicit.

### 5. Hand off safely

Create a decision record or safe-refactor-plan with acceptance evidence. Route source changes to the official artifact-owning skill.

**Completion criterion:** The next owner has a bounded design decision and no implied source change.

## Output Contract

- Hotspot evidence summary.
- Current change-surface map.
- Two or more deepening options.
- Recommended seam and interface shape.
- Refactor or decision-record handoff.

## Guardrails

- Require a validated hotspot; do not run a broad project audit.
- Do not repeat Workflow Analyzer, build, validation, or official review findings.
- Do not edit UiPath artifacts in this skill.
- Do not recommend a refactor without behavior-preservation and rollback evidence.

## Example Requests

- "Use this uipath-review finding to design a deeper transaction-processing boundary."
- "The same exception logic is spread across six workflows; compare better architecture shapes."
- "Turn this incident post-mortem into an architecture deepening proposal."

## Finish

Report completed work, observed evidence, the next official owner, and every blocker. Mark unobserved actions as pending.
