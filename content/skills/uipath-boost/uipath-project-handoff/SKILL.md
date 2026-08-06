---
name: uipath-project-handoff
description: "Use only when the user explicitly asks to create a portable, redacted UiPath project handoff for another person, harness, or directory."
category: "Routing and project continuity"
---

# UiPath Project Handoff

Carry verified context when it must travel to another person, harness, directory, or side investigation through concise pointers, exact next actions, and redaction.

**Maturity:** core.

## Ownership Boundary

**This custom skill owns:** Carry verified context across people and sessions through concise pointers, exact next actions, and explicit suggested skills while redacting sensitive information.

Keep current product commands, schemas, artifact validation, live tenant operations, and policy administration with official UiPath skills.

## Workflow

### 1. Prove that context must travel

Use a handoff for a new person, harness, directory, paused project, or side task forked from the current phase. Continue in place when the same session and directory can accurately perform the next step; compact only at a genuine phase boundary when continuity is needed but the context is too large.

**Completion criterion:** Portability is required and a cheaper context option does not fit.

### 2. Name the next purpose

State what the receiving session or person must accomplish and what is intentionally outside that handoff.

**Completion criterion:** The handoff has one clear destination.

### 3. Inventory durable artifacts

List and verify the SDD, work items, ADRs, glossary, evidence, branches, commits, logs, prototypes, reviews, and test results that already contain detail.

**Completion criterion:** Every referenced artifact exists or is marked unavailable.

### 4. Summarize only live context

Capture objective, current state, verified facts, decisions, assumptions, blockers, environment, access gaps, and current branch or item without copying existing documents.

**Completion criterion:** The receiver can orient without rereading the entire conversation.

### 5. Specify the exact next action

Name the next skill, file or item, command or question, success signal, and approval boundary. Include fallback when the primary action is blocked.

**Completion criterion:** The receiver can begin without guessing.

### 6. Redact and bound

Remove credentials, tokens, personal data, customer content, and sensitive endpoints. State what source data may be accessed and what must remain untouched.

**Completion criterion:** The handoff is safe to share with its intended receiver.

### 7. Save or launch intentionally

Write the handoff to a temporary or requested Markdown path. Launch another agent only when the environment supports it and the user explicitly authorizes that action.

**Completion criterion:** The handoff location or launched target is reported with no implied background promise.

## Output Contract

- Concise handoff Markdown document.
- Durable context pointers.
- Exact next action and success signal.
- Suggested custom and official skills.
- Redaction confirmation.

## Guardrails

- Do not duplicate full SDDs, issue bodies, logs, diffs, or review reports.
- Do not include secrets, personal information, or unredacted customer data.
- Do not claim a receiving agent started unless the launch command actually succeeded.
- Do not leave the next action vague.
- Prefer continuation or compaction when no portability boundary exists.

## Example Requests

- "Prepare a handoff before opening a fresh debugging session."
- "Transfer this project from architect to developer."
- "Preserve context before prototyping a separate UI approach."

## Finish

Report completed work, observed evidence, the next official owner, and every blocker. Mark unobserved actions as pending.
