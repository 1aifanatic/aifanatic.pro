---
name: uipath-discovery-with-docs
description: "Use only when the user explicitly asks to run UiPath discovery while maintaining durable project documentation."
category: "Discovery and decision-making"
---

# UiPath Discovery With Docs

Combine rigorous discovery with immediate documentation so decisions survive context windows and later agents use the same business language.

**Maturity:** core.

## Ownership Boundary

**This custom skill owns:** Combine rigorous discovery with immediate documentation so decisions survive context windows and later agents use the same business language.

Keep current product commands, schemas, artifact validation, live tenant operations, and policy administration with official UiPath skills.

## Compose With Official UiPath Skills

Use official skills for current product commands and artifact contracts:

- `uipath-automation-discovery`
- `uipath-planner`

## Workflow

### 1. Load existing context

Read project context, CONTEXT.md, PDD or SDD, ADRs, evidence index, and prior notes. Do not re-ask resolved questions.

**Completion criterion:** The current source of truth is identified.

### 2. Run focused discovery

Apply uipath-discovery-interview using one-question or frontier-batch mode as appropriate.

**Completion criterion:** The active decision frontier is explicit.

### 3. Update language inline

When a term is clarified, update CONTEXT.md immediately and keep implementation details out of the glossary.

**Completion criterion:** Resolved domain terms are captured once.

### 4. Record durable choices

Use ADRs only for hard-to-reverse, surprising trade-offs. Put ordinary choices in the decision log.

**Completion criterion:** Every load-bearing choice has a durable home.

### 5. Index evidence and gaps

Link samples, logs, policies, screenshots, and source documents with owner, freshness, sensitivity, and what each proves.

**Completion criterion:** The evidence index supports major requirements.

### 6. Hand off at readiness

Create a planner-ready summary and route PDD or SDD work to uipath-planner.

**Completion criterion:** The next agent can design without replaying the interview.

## Output Contract

- CONTEXT.md.
- Discovery decision log.
- Evidence index.
- ADRs when justified.
- Planner-ready handoff.

## Guardrails

- Preserve user edits and existing document structure.
- Link rather than duplicate content already captured elsewhere.
- Never place secrets or unredacted production data in discovery docs.
- Do not write implementation code during discovery.

## Example Requests

- "Continue a discovery workshop across sessions."
- "Turn meeting notes and samples into project knowledge."
- "Prepare a clean business-to-architecture handoff."

## Finish

Report completed work, observed evidence, the next official owner, and every blocker. Mark unobserved actions as pending.
