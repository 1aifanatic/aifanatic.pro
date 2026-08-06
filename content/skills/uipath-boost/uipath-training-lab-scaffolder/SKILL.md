---
name: uipath-training-lab-scaffolder
description: "Use only when the user explicitly asks to scaffold and validate a consistent UiPath training lab from an approved curriculum."
category: "Learning and communication"
---

# UiPath Training Lab Scaffolder

Create a navigable, non-empty lab skeleton that makes learner tasks, reference implementations, fixtures, prerequisites, and verification conventions predictable across a course.

**Maturity:** pilot.

## Ownership Boundary

**This custom skill owns:** Create a navigable, non-empty lab skeleton that makes learner tasks, reference implementations, fixtures, prerequisites, and verification conventions predictable across a course.

Keep current product commands, schemas, artifact validation, live tenant operations, and policy administration with official UiPath skills.

## Workflow

### 1. Parse the curriculum

Extract ordered sections, exercises, variants, objectives, prerequisites, expected artifacts, and which exercises need UiPath projects or only conceptual material.

**Completion criterion:** Every planned exercise has a unique position and purpose.

### 2. Create the structure

Use the bundled scaffolder with a reviewed JSON plan to create numbered section and exercise directories and requested problem, solution, explainer, fixture, and reference variants.

**Completion criterion:** The directory tree matches the approved plan.

### 3. Write meaningful stubs

Populate each README with the exercise title, objective, learner task or explanation purpose, expected evidence, prerequisites, and completion signal. Do not use empty placeholders.

**Completion criterion:** Every primary variant is understandable without instructor narration.

### 4. Add UiPath-specific pointers

For project exercises, state the artifact type, official skill owner, sample-data policy, setup prerequisites, and validation expectations without fabricating product files.

**Completion criterion:** Learners know how the lab connects to current UiPath tooling.

### 5. Validate the scaffold

Check naming, ordering, required variants, non-empty files, duplicate identifiers, broken internal links, and plan-to-tree completeness.

**Completion criterion:** The scaffold passes deterministic structural validation.

### 6. Hand off authoring

List the exercises that still need real project assets, solutions, diagrams, recordings, or test data and assign the next authoring route.

**Completion criterion:** The skeleton is ready for content development rather than mistaken for a finished course.

## Output Contract

- Numbered lab directory tree.
- Meaningful exercise README stubs.
- Structural validation report.
- Remaining content-authoring backlog.

## Guardrails

- Do not create empty README files or meaningless placeholder-only stubs.
- Do not invent working UiPath project assets when the request is only scaffolding.
- Do not expose solution content inside problem variants.
- Do not renumber existing exercises without preserving references and history.

## Example Requests

- "Scaffold a ten-module UiPath Agent Builder course."
- "Create problem and solution folders for RPA exercises."
- "Generate a workshop lab skeleton from this lesson plan."

## Finish

Report completed work, observed evidence, the next official owner, and every blocker. Mark unobserved actions as pending.
