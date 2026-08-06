---
name: uipath-quality-gates-setup
description: "Use only when the user explicitly asks to install and prove local and CI quality gates for a UiPath repository."
category: "Build, test, and change quality"
---

# UiPath Quality Gates Setup

Discover the repository, obtain exact validation commands from official UiPath skills, wire tiered gates into existing developer and CI workflows, and prove each critical gate catches a real violation.

**Maturity:** pilot.

## Ownership Boundary

**This custom skill owns:** Discover the repository, obtain exact validation commands from official UiPath skills, wire tiered gates into existing developer and CI workflows, and prove each critical gate catches a real violation.

Keep current product commands, schemas, artifact validation, live tenant operations, and policy administration with official UiPath skills.

## Compose With Official UiPath Skills

Use official skills for current product commands and artifact contracts:

- `uipath-rpa`
- `uipath-agents`
- `uipath-maestro-flow`
- `uipath-maestro-bpmn`
- `uipath-maestro-case`
- `uipath-coded-apps`
- `uipath-api-workflow`
- `uipath-test`
- `uipath-review`
- `uipath-solution`

## Workflow

### 1. Detect the repository

Run the bundled marker check and inspect package managers, build files, existing hooks, pipelines, branch policy, solution wrappers, test projects, and generated artifacts.

**Completion criterion:** All project types and existing gates are inventoried.

### 2. Get exact product commands

Invoke the applicable official UiPath skills for their current validate, build, test, review, pack, or publish-preparation commands. Record delivery-model and version assumptions.

**Completion criterion:** Every product command has an official owner and current contract.

### 3. Design gate tiers

Separate fast developer checks, commit or pre-push checks, pull-request checks, nightly or environment-dependent checks, and release gates. Include format, schema, boundary, tests, security, build, and packaging according to risk.

**Completion criterion:** Each gate has a trigger, expected duration class, failure owner, and evidence output.

### 4. Merge into existing automation

Add or update scripts and pipeline stages without overwriting unrelated configuration. Keep credentials in approved secret stores and avoid running environment-dependent checks on every commit.

**Completion criterion:** The new gates coexist with current workflows.

### 5. Prove critical gates

Run clean checks, introduce controlled representative violations where safe, observe failure, revert, and observe success. Use static validation where a live environment is unavailable.

**Completion criterion:** Critical gates have pass-fail-pass or documented static evidence.

### 6. Document operation

Explain local commands, CI triggers, artifacts, skip behavior, troubleshooting, ownership, and how to update commands when official skills or the CLI change.

**Completion criterion:** Developers and maintainers can operate the gates without hidden knowledge.

### 7. Report limitations

List unavailable tenants, credentials, runners, licenses, UI dependencies, or preview products that prevented end-to-end verification.

**Completion criterion:** The setup does not overstate what was tested.

## Output Contract

- Project-type inventory.
- Tiered quality-gate design.
- Updated local and CI configuration.
- Pass-fail-pass evidence.
- Operations and limitations guide.

## Guardrails

- Do not guess UiPath CLI subcommands or flags.
- Do not overwrite existing hooks or pipeline jobs wholesale.
- Do not place secrets in repository configuration or logs.
- Do not make slow environment tests mandatory for every local commit without team agreement.

## Example Requests

- "Add PR validation for a multi-project UiPath solution."
- "Set up local checks for XAML and coded projects."
- "Create a release gate that validates and packs the solution."

## Finish

Report completed work, observed evidence, the next official owner, and every blocker. Mark unobserved actions as pending.
