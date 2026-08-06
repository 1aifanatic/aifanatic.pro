---
name: uipath-project-boundaries
description: "Define and enforce public entry points and dependency boundaries across a UiPath solution or repository. Use when reusable libraries, coded components, agents, apps, API workflows, tests, and orchestration projects have deep imports, circular dependencies, duplicated contracts, or unclear ownership that makes agent navigation and safe change difficult."
category: "Design and architecture"
---

# UiPath Project Boundaries

Make each project or package a deep module with a small public surface, hidden implementation, explicit allowed dependencies, and tests that use the same public entry points as consumers.

**Maturity:** pilot.

## Ownership Boundary

**This custom skill owns:** Make each project or package a deep module with a small public surface, hidden implementation, explicit allowed dependencies, and tests that use the same public entry points as consumers.

Keep current product commands, schemas, artifact validation, live tenant operations, and policy administration with official UiPath skills.

## Compose With Official UiPath Skills

Use official skills for current product commands and artifact contracts:

- `uipath-rpa`
- `uipath-agents`
- `uipath-solution`
- `uipath-review`

## Workflow

### 1. Inventory the dependency graph

Discover solution projects, libraries, coded packages, shared configuration, test projects, runtime resources, and current cross-project references.

**Completion criterion:** Every executable and reusable unit has a known owner and dependency set.

### 2. Define public entry points

For each unit, name the small set of workflow, class, API, event, or contract surfaces external consumers may use and what remains private.

**Completion criterion:** Public and private surfaces are explicit.

### 3. Set allowed dependency rules

Specify permitted directions, forbidden deep references, cycle rules, test access, generated artifacts, and versioning expectations. Keep deployment and runtime resource dependencies separate from source dependencies.

**Completion criterion:** The boundary policy is precise enough to automate.

### 4. Implement checks

Use repository-native analyzers, scripts, package rules, solution validation, or CI checks. Avoid inventing unsupported UiPath CLI commands; compose with official skills for product validation.

**Completion criterion:** A documented command detects boundary violations.

### 5. Prove the checks bite

Run a clean pass, add one temporary representative forbidden dependency, observe failure, revert it, and observe a clean pass again.

**Completion criterion:** The enforcement has demonstrated pass-fail-pass evidence.

### 6. Migrate existing violations

Plan or execute bounded expand-contract changes through uipath-safe-refactor-plan and uipath-pattern-migration rather than blocking the whole repository without a path forward.

**Completion criterion:** Existing violations have owners and a safe transition.

### 7. Document discovery paths

Link the boundary rules from repository agent instructions and project README files so humans and agents find them before adding dependencies.

**Completion criterion:** The policy is discoverable at the point of change.

## Output Contract

- Dependency inventory and diagram.
- Public-entry-point policy.
- Automated boundary checks with pass-fail-pass evidence.
- Violation migration plan.
- Repository documentation pointers.

## Guardrails

- Do not hide necessary shared contracts behind arbitrary folder rules.
- Do not add a seam when only one implementation exists and no isolation need is present.
- Do not break all current consumers without an expand-contract migration.
- Do not treat deployed resource references as identical to source-code dependencies.

## Example Requests

- "Stop projects from importing library internals."
- "Define boundaries across a multi-project UiPath solution."
- "Remove circular dependencies between coded automation packages."

## Finish

Report completed work, observed evidence, the next official owner, and every blocker. Mark unobserved actions as pending.
