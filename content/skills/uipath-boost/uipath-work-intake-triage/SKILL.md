---
name: uipath-work-intake-triage
description: "Use only when the user explicitly asks to classify, verify, and route incoming UiPath work before it enters an official workflow."
category: "Discovery and decision-making"
---

# UiPath Work Intake Triage

Move incoming work through a small state machine, verify claims before planning, and create durable briefs for a human or agent.

**Maturity:** core.

## Ownership Boundary

**This custom skill owns:** Move incoming work through a small state machine, verify claims before planning, and create durable briefs for a human or agent.

Keep current product commands, schemas, artifact validation, live tenant operations, and policy administration with official UiPath skills.

## Compose With Official UiPath Skills

Use official skills for current product commands and artifact contracts:

- `uipath-automation-discovery`
- `uipath-feedback`
- `uipath-troubleshoot`
- `uipath-planner`
- `uipath-admin`
- `uipath-platform`
- `uipath-test`

## Workflow

### 1. Gather the full item

Read the request, comments, artifacts, history, labels, project context, duplicates, existing behavior, and prior rejected decisions.

**Completion criterion:** The item and its history are understood.

### 2. Classify category and state

Choose one category and recommend one state: new, needs-evidence, ready-for-discovery, ready-for-design, ready-for-build, ready-for-human, parked, or rejected.

**Completion criterion:** One category and one state are explicit.

### 3. Verify before elaborating

Reproduce defects or route them to tight-loop debugging. Confirm observed work and value evidence for ideas. Verify requested resources and owners for access items.

**Completion criterion:** The central claim is confirmed, disproved, or unverified.

### 4. Close information gaps

Ask targeted evidence questions only for unresolved decisions and preserve established facts.

**Completion criterion:** No generic request for more information remains.

### 5. Apply the outcome

Create an agent-ready brief, evidence request, rejection rationale, or discovery handoff. Change tracker state only with authority.

**Completion criterion:** The next owner knows what to do and what proves completion.

## Output Contract

- Attention queue by state and age.
- Agent-ready brief.
- Specific evidence request.
- Parked or rejected rationale.

## Guardrails

- Do not turn unverified claims into build tasks.
- Do not re-triage the canonical implementation tasks already emitted by uipath-planner.
- Do not submit product feedback, diagnose root cause, change access, or operate platform resources inside triage.
- Do not close or relabel tracker items without authority.
- Redact customer and employee data.

## Example Requests

- "Triage ten new automation requests."
- "Turn a vague defect into an agent-ready issue."
- "Show which backlog items need attention."

## Finish

Report completed work, observed evidence, the next official owner, and every blocker. Mark unobserved actions as pending.
