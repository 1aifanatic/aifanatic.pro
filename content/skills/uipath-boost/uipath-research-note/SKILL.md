---
name: uipath-research-note
description: "Research a UiPath technical, product, platform, API, compatibility, or governance question using primary sources and capture the result as a cited Markdown note. Use when a project decision depends on current UiPath documentation, official repositories, release notes, specifications, or first-party APIs."
category: "Discovery and decision-making"
---

# UiPath Research Note

Trace every material claim to the source that owns it and leave a reusable, date-aware decision input in the repository.

**Maturity:** core.

## Ownership Boundary

**This custom skill owns:** Trace every material claim to the source that owns it and leave a reusable, date-aware decision input in the repository.

Keep current product commands, schemas, artifact validation, live tenant operations, and policy administration with official UiPath skills.

## Workflow

### 1. Frame the decision

State the exact question, the decision it informs, scope, delivery model, and freshness requirement.

**Completion criterion:** The research can end with an actionable answer.

### 2. Use primary sources

Prefer official UiPath docs, official repositories, release notes, installed CLI help, API specifications, and product-owned support articles.

**Completion criterion:** Each load-bearing claim has first-party evidence or is marked inference.

### 3. Resolve version and date

Record research date, product version or service context, maturity when relevant, and conflicting documentation.

**Completion criterion:** Readers can judge staleness.

### 4. Separate fact and inference

Quote sparingly, paraphrase accurately, and label recommendations and architectural inferences.

**Completion criterion:** Source facts and analysis are distinguishable.

### 5. Write the note

Save question, answer, evidence, constraints, gaps, confidence, and decision implications in one Markdown file.

**Completion criterion:** The note can be consumed by discovery, design, or review.

## Output Contract

- Cited Markdown research note.
- Concise answer with confidence and gaps.
- Recommended follow-up decision or experiment.

## Guardrails

- Do not rely on memory for current product behavior.
- Do not use marketing summaries for technical contracts when first-party evidence exists.
- Do not present preview behavior as a stable guarantee.
- Do not include secrets or private internal URLs in a portable note.

## Example Requests

- "Research whether a Maestro feature is available in our deployment model."
- "Compare official testing options for coded and XAML projects."
- "Verify current CLI support before designing CI."

## Finish

Report completed work, observed evidence, the next official owner, and every blocker. Mark unobserved actions as pending.
