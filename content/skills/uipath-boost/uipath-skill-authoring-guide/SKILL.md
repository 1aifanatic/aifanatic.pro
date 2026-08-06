---
name: uipath-skill-authoring-guide
description: "Design, review, and improve reusable AI skills for UiPath work. Use when creating a skill for discovery, architecture, development, testing, operations, governance, training, or project management; when deciding whether a workflow belongs in a custom skill or the official UiPath catalog; or when an existing skill is inconsistent, bloated, poorly triggered, or difficult to evaluate."
category: "Learning and communication"
---

# UiPath Skill Authoring Guide

Make a stochastic agent follow a predictable process by giving each skill one earned job, precise invocation, checkable completion gates, progressive references, official-skill ownership, and executable tests where determinism matters.

**Maturity:** pilot.

## Ownership Boundary

**This custom skill owns:** Make a stochastic agent follow a predictable process by giving each skill one earned job, precise invocation, checkable completion gates, progressive references, official-skill ownership, and executable tests where determinism matters.

Keep current product commands, schemas, artifact validation, live tenant operations, and policy administration with official UiPath skills.

Read [references/skill-mechanics.md](references/skill-mechanics.md) when choosing invocation, pruning context, splitting references, or designing evaluations.

## Workflow

### 1. Prove the repeatable job

Collect concrete input and output examples, recurring failure modes, user authority boundaries, environment needs, and what should be identical in process across runs.

**Completion criterion:** The proposed skill solves a recurring task rather than a one-off prompt.

### 2. Check the official catalog first

Inspect current UiPath official skills and route product commands, artifact contracts, validation, deployment, and platform operations to their owners. Define only the complementary discipline or organization-specific convention.

**Completion criterion:** The custom skill does not fork official product truth.

### 3. Design invocation

Choose user invocation when only a human should start the workflow; choose model invocation when the agent or another skill must reach it automatically. For a model-invoked skill, write a description with one distinct trigger branch per case. For a user-invoked skill, use an explicit-use description and supported agent metadata, then validate every target package. Use a router when user-invoked skills become difficult to remember.

**Completion criterion:** The skill fires for its intended tasks without broadly capturing neighboring work.

### 4. Write steps with gates

Use imperative steps in execution order and end each important step with a checkable, exhaustive completion criterion. Split sequences when visibility of later steps causes premature completion.

**Completion criterion:** The agent can distinguish done from partially done at every gate.

### 5. Move detail to the right place

Keep the control plane concise. Spend context load only on instructions every matching run needs. Put branch-specific rules in references, fragile deterministic operations in scripts, and output templates or reusable files in assets. Treat configuration, directory structure, scripts, and command help as source truth; cache only conventions, reasons, or traps that are expensive to rediscover.

**Completion criterion:** SKILL.md remains readable and supporting resources have clear context pointers.

### 6. Add UiPath safety and composition

Name official skills, approval boundaries, data handling, environment assumptions, forbidden fabrication, evidence requirements, and what the skill never edits or executes.

**Completion criterion:** High-consequence actions and ownership are explicit.

### 7. Test, validate, and package

Run structural validation, deterministic script tests, trigger and non-trigger scenarios, safety and completion scenarios, happy and failure routes, and package validation. Forward-test complex skills on raw realistic artifacts without leaking the expected answer. Record limitations and iterate from observed use.

**Completion criterion:** The packaged skill passes validation and has evidence for its critical behaviors.

## Output Contract

- Skill definition and invocation examples.
- SKILL.md with checkable gates.
- Supporting references, scripts, and assets.
- Evaluation scenarios and validation evidence.
- Packaged skill archive.

## Guardrails

- Do not copy current product commands into a custom skill when an official owner exists.
- Do not put obvious generic advice into skill context without changing behavior.
- Do not add scripts that were not actually tested.
- Do not claim runtime coverage beyond the tested environment.

## Example Requests

- "Create a skill for UiPath production readiness review."
- "Improve this oversized automation-discovery skill."
- "Decide whether this workflow belongs in the official or custom catalog."

## Finish

Report completed work, observed evidence, the next official owner, and every blocker. Mark unobserved actions as pending.
