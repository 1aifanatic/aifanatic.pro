---
name: uipath-uat-session
description: "Use only when the user explicitly asks to facilitate UiPath UAT and capture reproducible business acceptance evidence."
category: "Build, test, and change quality"
---

# UiPath UAT Session

Capture one observation at a time, gather enough evidence to reproduce it, distinguish defects from requirement gaps or environment issues, and produce focused work items without over-interviewing the tester.

**Maturity:** pilot.

## Ownership Boundary

**This custom skill owns:** Capture one observation at a time, gather enough evidence to reproduce it, distinguish defects from requirement gaps or environment issues, and produce focused work items without over-interviewing the tester.

Keep current product commands, schemas, artifact validation, live tenant operations, and policy administration with official UiPath skills.

## Compose With Official UiPath Skills

Use official skills for current product commands and artifact contracts:

- `uipath-test`
- `uipath-tasks`
- `uipath-troubleshoot`
- `uipath-feedback`
- `uipath-review`

## Workflow

### 1. Anchor the UAT run

Record build or package version, environment, process or solution, test data set, tester, business scenario, timestamp, and expected source such as acceptance criteria.

**Completion criterion:** Every observation belongs to one reproducible UAT context.

### 2. Capture one observation

Listen in the tester's language and ask only the short questions needed for expected versus actual behavior, steps, frequency, impact, and whether the run can be repeated.

**Completion criterion:** The observation is clear enough to verify or route.

### 3. Collect evidence

Request safe screenshots, logs, transaction keys, task or instance IDs, sample identifiers, and timestamps. Redact personal, customer, and secret data.

**Completion criterion:** Evidence can be correlated to the anchored run.

### 4. Classify and scope

Distinguish confirmed defect, suspected defect, requirement ambiguity, test-data issue, access or environment issue, usability feedback, or accepted behavior. Split independent symptoms and preserve related evidence.

**Completion criterion:** Each record has one behavior and one category.

### 5. Verify or route

Use uipath-troubleshoot for causal investigation, uipath-test for test evidence, discovery for requirement ambiguity, or work intake for backlog state. Do not guess the cause during capture.

**Completion criterion:** The observation has a verified result or named next owner.

### 6. Write the durable record

Create expected, actual, reproduction, environment, impact, evidence, acceptance criterion, and verification status using business language rather than transient file paths.

**Completion criterion:** A developer or investigator can act without replaying the conversation.

### 7. Continue deliberately

Report the created record and ask for the next independent observation until the tester ends the session. Summarize counts and blockers at the end.

**Completion criterion:** Every reported observation is captured exactly once.

## Output Contract

- Anchored UAT session record.
- Focused defects and acceptance observations.
- Evidence links and reproduction steps.
- Routing and end-of-session summary.

## Guardrails

- Do not manage Test Manager projects, cases, sets, executions, or reports; use uipath-test.
- Do not assign or complete Action Center tasks; use uipath-tasks.
- Capture observed behavior without guessing root cause; use uipath-troubleshoot when diagnosis is requested.
- Do not submit product feedback without the uipath-feedback confirmation flow.
- Protect customer data and attach only authorized evidence.

## Example Requests

- "Run UAT while the business tests a new intake process."
- "Capture issues from a Coded App validation session."
- "Turn agent evaluation feedback into focused work items."

## Finish

Report completed work, observed evidence, the next official owner, and every blocker. Mark unobserved actions as pending.
