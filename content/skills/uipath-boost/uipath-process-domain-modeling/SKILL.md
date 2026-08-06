---
name: uipath-process-domain-modeling
description: "Build and sharpen the business language used by a UiPath project. Use when process terms are vague, overloaded, inconsistent across business and technical teams, or when discovery, design, testing, and support need one canonical glossary and a small set of durable architectural decisions."
category: "Discovery and decision-making"
---

# UiPath Process Domain Modeling

Create a precise process vocabulary that keeps business rules, queue semantics, exception types, human decisions, documents, and system records consistent across every project artifact.

**Maturity:** core.

## Ownership Boundary

**This custom skill owns:** Create a precise process vocabulary that keeps business rules, queue semantics, exception types, human decisions, documents, and system records consistent across every project artifact.

Keep current product commands, schemas, artifact validation, live tenant operations, and policy administration with official UiPath skills.

## Compose With Official UiPath Skills

Use official skills for current product commands and artifact contracts:

- `uipath-planner`
- `uipath-automation-discovery`

## Workflow

### 1. Load the current language

Read CONTEXT.md, PDD or SDD, process maps, queue schemas, test cases, ADRs, and representative project artifacts. Separate business concepts from implementation names.

**Completion criterion:** Existing terms, contradictions, and missing concepts are listed.

### 2. Challenge fuzzy terms

Flag overloaded words such as transaction, case, request, document, exception, retry, and completion. Recommend one canonical term per concept and aliases to avoid.

**Completion criterion:** Every material ambiguity has a proposed resolution.

### 3. Stress-test relationships

Use concrete normal, exception, retry, cancellation, duplicate, partial-success, and human-review scenarios to expose lifecycle and cardinality assumptions.

**Completion criterion:** The glossary explains how related concepts behave at boundaries.

### 4. Update the glossary inline

Record each resolved term immediately in CONTEXT.md with a one-sentence definition, aliases, and an example. Keep selectors, file paths, class names, and implementation details out.

**Completion criterion:** Resolved terms have one source of truth.

### 5. Record only load-bearing decisions

Create an ADR only when a choice is hard to reverse, surprising without context, and the result of a real trade-off. Put ordinary clarifications in the glossary or decision log.

**Completion criterion:** Every ADR satisfies all three tests.

### 6. Propagate the language

Identify PDD, SDD, backlog, test, dashboard, runbook, and support artifacts that must adopt the canonical terms.

**Completion criterion:** The next artifact owners know which vocabulary to update.

## Output Contract

- Canonical process glossary.
- Flagged ambiguities and recommended terms.
- Lifecycle and relationship notes.
- ADRs only where justified.
- Propagation checklist.

## Guardrails

- Do not turn implementation identifiers into business terminology.
- Do not preserve two synonyms when they represent one concept.
- Do not overwrite an established term without surfacing the conflict.
- Do not create ADRs for reversible or obvious choices.

## Example Requests

- "Clarify transaction versus queue item versus business case."
- "Create a glossary for an insurance intake automation."
- "Resolve conflicting meanings of exception across business and developers."

## Finish

Report completed work, observed evidence, the next official owner, and every blocker. Mark unobserved actions as pending.
