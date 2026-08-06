---
name: uipath-discovery-interview
description: "Run evidence-based UiPath discovery in frontier rounds. Use to sharpen an automation idea, stress-test a proposed solution, clarify a process before a PDD or SDD, or resolve business, data, exception, security, volume, SLA, access, and acceptance decisions."
category: "Discovery and decision-making"
---

# UiPath Discovery Interview

Resolve project decisions through evidence-based questions while looking up facts available in artifacts or systems instead of asking the user to remember them.

**Maturity:** core.

## Ownership Boundary

**This custom skill owns:** Resolve project decisions through evidence-based questions while looking up facts available in artifacts or systems instead of asking the user to remember them.

Keep current product commands, schemas, artifact validation, live tenant operations, and policy administration with official UiPath skills.

## Compose With Official UiPath Skills

Use official skills for current product commands and artifact contracts:

- `uipath-automation-discovery`
- `uipath-planner`

## Workflow

### 1. Map the decision tree

Separate facts from decisions. Investigate facts from supplied artifacts or safe read-only sources. Put decisions to the accountable human and track their prerequisites.

**Completion criterion:** Every open item is classified as an investigable fact or a human decision with prerequisites.

### 2. Ask the frontier round

Ask every question whose prerequisites are settled in one numbered round. Use one-question mode only when the user requests it or a sensitive decision requires privacy or focus. Format each question as a short title, the question, and a recommendation on its own line.

**Completion criterion:** The round contains every currently answerable decision and no blocked question.

### 3. Prefer evidence

Ask for recent examples, samples, screenshots, logs, reports, SOPs, workarounds, time spent, error rates, and consequences. Read repository facts directly.

**Completion criterion:** Material claims have evidence or are marked unverified.

### 4. Recommend then ask

For each decision, offer a recommended answer with rationale, then let the accountable person decide. Record disagreement and assumptions.

**Completion criterion:** Every decision has a recommendation and owner.

### 5. Recompute and close the frontier

Incorporate the answers, finish independent fact-finding when available, recompute the frontier, and ask the next round. Continue until no unresolved branch remains, or each open item has an owner, evidence request, and due condition.

**Completion criterion:** The project can be handed to uipath-planner without hidden assumptions.

## Output Contract

- Decision log.
- Evidence index.
- Open questions with owners.
- Readiness verdict for discovery or planning.

## Guardrails

- Do not pitch a solution before understanding the current workflow and problem.
- Do not ask compound or hypothetical feature-wishlist questions.
- Do not ask for facts that can be read from provided artifacts.
- Do not turn unknown business rules into silent technical defaults.

## Example Requests

- "Interview the claims intake team before automation."
- "Stress-test whether this needs RPA, an agent, Maestro, or no automation."
- "Collect everything needed before an SDD."

## Finish

Report completed work, observed evidence, the next official owner, and every blocker. Mark unobserved actions as pending.
