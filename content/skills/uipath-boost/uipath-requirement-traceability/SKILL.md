---
name: uipath-requirement-traceability
description: "Build a requirement-to-implementation-to-test-to-evidence traceability matrix from an approved SDD, official uipath-review report, Test Manager evidence, and release artifacts. Use when the user explicitly needs coverage, missing-evidence analysis, auditability, UAT mapping, or release traceability. Do not perform the underlying artifact quality review, invent requirement coverage, or replace Test Manager reporting."
category: "Build, test, and change quality"
---

# UiPath Requirement Traceability

Make it possible to prove which requirements are implemented, tested, evidenced, accepted, or still uncovered without rerunning the official product review.

**Maturity:** core.

## Ownership Boundary

**This custom skill owns:** Make it possible to prove which requirements are implemented, tested, evidenced, accepted, or still uncovered without rerunning the official product review.

Keep current product commands, schemas, artifact validation, live tenant operations, and policy administration with official UiPath skills.

## Compose With Official UiPath Skills

Use official skills for current product commands and artifact contracts:

- `uipath-planner`
- `uipath-review`
- `uipath-test`
- `uipath-insights`

## Workflow

### 1. Pin authoritative sources

Identify the approved requirements or SDD version, official review report, implementation release or commit, test executions, UAT evidence, and acceptance owner.

**Completion criterion:** Every trace row can cite a versioned source.

### 2. Normalize requirement identities

Create stable requirement IDs, split compound requirements only when the source allows it, and retain exact source references and acceptance language.

**Completion criterion:** No requirement is silently rewritten or lost.

### 3. Link implementation and verification

Map each requirement to implemented artifact or behavior, official review finding status, automated or manual tests, execution evidence, UAT result, and production-readiness evidence.

**Completion criterion:** Each claimed link points to observed evidence rather than inference.

### 4. Classify coverage and gaps

Mark Covered, Partially Covered, Not Covered, Not Testable, Evidence Missing, Out of Scope, or Accepted Risk with owner and rationale.

**Completion criterion:** Every requirement has one transparent status and next action.

### 5. Publish the matrix and exceptions

Produce the trace matrix, uncovered-requirement list, stale-evidence list, and summary for business, QA, and release owners.

**Completion criterion:** The matrix can support an audit or release decision without pretending to be the underlying review.

## Output Contract

- Versioned traceability matrix.
- Uncovered and partially covered requirements.
- Missing or stale evidence list.
- Ownership and next-action summary.
- Coverage statistics with explicit denominators.

## Guardrails

- Do not run or duplicate uipath-review inside this skill.
- Do not mark a requirement covered from file-name similarity or unverified prose.
- Do not alter the source requirements while normalizing identities.
- Do not treat a traceability result as security, legal, or release approval.

## Example Requests

- "Create a trace matrix from this SDD, review report, and Test Manager execution."
- "Show which UAT requirements lack implementation or evidence."
- "Prepare audit-ready requirement coverage for the release candidate."

## Finish

Report completed work, observed evidence, the next official owner, and every blocker. Mark unobserved actions as pending.
