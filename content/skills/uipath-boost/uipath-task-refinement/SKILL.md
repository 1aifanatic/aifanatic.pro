---
name: uipath-task-refinement
description: "Use only when the user explicitly asks to refine an approved UiPath plan into session-sized tracer-bullet tasks with blocking edges."
category: "Build, test, and change quality"
---

# UiPath Task Refinement

Improve an approved plan through tracer-bullet tasks: thin end-to-end slices that produce observable behavior and declare genuine blocking edges.

**Maturity:** core.

## Ownership Boundary

**This custom skill owns:** Improve the execution quality of an approved plan without creating a competing plan or duplicating architecture content.

Keep current product commands, schemas, artifact validation, live tenant operations, and policy administration with official UiPath skills.

## Compose With Official UiPath Skills

Use official skills for current product commands and artifact contracts:

- `uipath-planner`

## Workflow

### 1. Load the canonical plan

Read the ready SDD, planner handoff marker, canonical task file, parent work item, and current statuses. Stop when no approved source exists.

**Completion criterion:** One authoritative task list and its parent design are pinned.

### 2. Test each item for executability

Check outcome, owner, input, acceptance evidence, product owner, estimated context size, blockers, and independence. Mark items that are horizontal layers, duplicate architecture, or mix several official owners.

**Completion criterion:** Every item has a concrete refinement reason or is accepted as-is.

### 3. Split or merge vertically

Create the smallest end-to-end tracer bullets that can be validated independently. Represent each task as one tracker item or one Markdown file rather than a combined backlog body. Use expand-contract for wide migrations and preserve planner architecture by reference rather than copying it.

**Completion criterion:** Each refined item fits one focused execution session and produces observable behavior.

### 4. Rebuild dependencies and frontier

Declare only genuine blocking edges, identify parallel work, shared prerequisites, integration checkpoints, and the next unblocked frontier.

**Completion criterion:** The dependency graph has no unexplained cycles or artificial serialization.

### 5. Approve and update the canonical location

Present the proposed delta. Update the task file or tracker only with explicit authority, preserving IDs, history, and parent links.

**Completion criterion:** The canonical list is refined once, and no shadow backlog exists.

## Output Contract

- Refinement assessment for each original task.
- Proposed split, merge, or dependency delta.
- Session-sized acceptance criteria.
- Updated frontier and ownership map.
- Optional authorized update to the canonical task location.

## Guardrails

- Require an existing planner task list or explicit backlog.
- Never create a second SDD or initial implementation plan.
- Do not copy architecture sections into every task.
- Do not create or modify tracker items without authority.
- Do not place multiple independently executable tasks in one local Markdown file.

## Example Requests

- "Refine these planner tasks so each fits one coding-agent session."
- "Split this oversized multi-product task without changing the SDD."
- "Correct the blocking edges in this approved UiPath task plan."

## Finish

Report completed work, observed evidence, the next official owner, and every blocker. Mark unobserved actions as pending.
