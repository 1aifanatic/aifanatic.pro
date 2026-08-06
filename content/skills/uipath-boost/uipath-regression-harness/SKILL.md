---
name: uipath-regression-harness
description: "Create a fast, deterministic, red-capable reproduction and regression harness for a UiPath defect after the incident, symptom, or cause has been anchored by uipath-troubleshoot or the owning product skill. Use when a confirmed defect needs repeatable evidence before and after a fix. Do not use to perform root-cause diagnosis, investigate live production broadly, or apply the fix."
category: "Build, test, and change quality"
---

# UiPath Regression Harness

Convert a known failure into one command or bounded test that fails on the exact symptom, passes after correction, and remains as durable regression evidence.

**Maturity:** core.

## Ownership Boundary

**This custom skill owns:** Convert a known failure into one command or bounded test that fails on the exact symptom, passes after correction, and remains as durable regression evidence.

Keep current product commands, schemas, artifact validation, live tenant operations, and policy administration with official UiPath skills.

## Compose With Official UiPath Skills

Use official skills for current product commands and artifact contracts:

- `uipath-troubleshoot`
- `uipath-test`
- `uipath-rpa`
- `uipath-agents`
- `uipath-maestro-flow`
- `uipath-maestro-bpmn`
- `uipath-maestro-case`
- `uipath-coded-apps`
- `uipath-api-workflow`
- `uipath-functions`
- `uipath-connector-builder`

## Workflow

### 1. Import the diagnosis contract

Record the anchored entity, exact user-visible symptom, correlated evidence, known-good comparison if any, and the official owner that will implement a fix. If the cause or symptom is not anchored, route to uipath-troubleshoot first.

**Completion criterion:** The harness target is a specific observable failure, not a theory.

### 2. Choose the highest valid seam

Select the smallest public behavior boundary that reproduces the real failure pattern: test case, local run, fixture replay, mocked integration boundary, API call, trace replay, or structured human loop.

**Completion criterion:** The seam exercises the real pattern without reaching into private implementation details.

### 3. Build the fixture and assertion

Capture the minimal permitted input and independent expected result. Redact sensitive data and pin time, randomness, versions, environment aliases, and external dependencies where possible.

**Completion criterion:** The fixture is reproducible, safe, and independently verifiable.

### 4. Observe red and tighten

Run the harness at least once, confirm it catches the exact symptom, then reduce duration and flakiness. For intermittent failures, raise the reproduction rate and report it.

**Completion criterion:** One documented command is red-capable, deterministic enough, and practical to rerun.

### 5. Hand off and preserve evidence

Provide the command, fixture, observed output, ownership, and expected green condition to the official artifact skill. After the fix, rerun the original and minimized scenarios and retain the regression asset.

**Completion criterion:** The fix owner can prove both failure and recovery without repeating diagnosis.

## Output Contract

- Anchored symptom contract.
- Minimal safe fixture.
- One-command or bounded regression harness.
- Observed red evidence and reproduction rate.
- Expected green and handoff to the official owner.

## Guardrails

- Do not infer or declare root cause; causal investigation belongs to uipath-troubleshoot.
- Do not query or mutate production beyond evidence already authorized by the diagnosis.
- Do not apply the source or platform fix.
- Do not call a harness valid until it has actually observed the exact failure or clearly reports why that is impossible.

## Example Requests

- "The cause is confirmed; create a regression harness before the RPA fix."
- "Turn this intermittent queue-processing symptom into a repeatable fixture."
- "Build a one-command reproduction for this coded-agent output defect."

## Finish

Report completed work, observed evidence, the next official owner, and every blocker. Mark unobserved actions as pending.
