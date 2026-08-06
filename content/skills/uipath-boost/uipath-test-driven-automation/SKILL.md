---
name: uipath-test-driven-automation
description: "Apply behavior-first red-green development to UiPath automation work. Use when implementing a feature or defect through tests, when critical business rules need durable regression coverage, or when a team must choose the right public seams across workflows, coded components, queues, APIs, agents, Maestro, and human tasks."
category: "Build, test, and change quality"
---

# UiPath Test Driven Automation

Build one observable business behavior at a time so tests remain useful through refactoring and verify the same seam production callers use.

**Maturity:** core.

## Ownership Boundary

**This custom skill owns:** Build one observable business behavior at a time so tests remain useful through refactoring and verify the same seam production callers use.

Keep current product commands, schemas, artifact validation, live tenant operations, and policy administration with official UiPath skills.

## Compose With Official UiPath Skills

Use official skills for current product commands and artifact contracts:

- `uipath-test`
- `uipath-rpa`
- `uipath-agents`
- `uipath-maestro-flow`
- `uipath-maestro-bpmn`
- `uipath-maestro-case`
- `uipath-coded-apps`
- `uipath-api-workflow`

## Workflow

### 1. Agree the public seams

Identify the highest stable interfaces where behavior is observed: workflow invocation, library contract, queue transition, API response, agent evaluation, Maestro outcome, or user-visible task result.

**Completion criterion:** The user confirms which seams deserve tests.

### 2. Choose one behavior slice

Write one small acceptance example with independent expected values, including the relevant business context and observable outcome.

**Completion criterion:** The example reads like a capability, not an implementation assertion.

### 3. Make it red

Use the official owning skill to create or run the narrowest test that fails for the intended reason before implementation changes.

**Completion criterion:** The exact test or command has been observed failing on the missing behavior.

### 4. Make it green

Implement only enough through the owning product skill to pass the current behavior. Re-run the same test and observe success.

**Completion criterion:** The previously red test is green without unrelated scope.

### 5. Repeat vertically

Add the next behavior only after learning from the prior slice. Include normal, edge, exception, retry, idempotency, and human-decision paths according to risk.

**Completion criterion:** Each retained test protects an externally meaningful behavior.

### 6. Run broader gates

Run project validation, build, focused suites, relevant integrations, and the agreed full regression gate. Record evidence and route code review separately.

**Completion criterion:** All required quality gates have observed results.

## Output Contract

- Confirmed test seams.
- Red-green evidence per behavior.
- Durable regression tests.
- Final validation and regression record.

## Guardrails

- Do not test private implementation details or activity arrangement.
- Do not write all imagined tests before the first implementation slice.
- Do not use expected values computed by the same logic under test.
- Do not mock away the integration that caused the real risk.

## Example Requests

- "Build a queue retry rule test-first."
- "Add regression coverage for a document validation defect."
- "Test an agent outcome contract through evaluations."

## Finish

Report completed work, observed evidence, the next official owner, and every blocker. Mark unobserved actions as pending.
