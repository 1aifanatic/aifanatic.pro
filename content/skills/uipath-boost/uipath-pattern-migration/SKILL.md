---
name: uipath-pattern-migration
description: "Plan and execute a bounded, reversible migration from one repeated UiPath project pattern to another. Use for naming changes, configuration key changes, queue field migrations, package references, argument conventions, test fixture updates, documentation conventions, or other mechanically discoverable transformations across many files or projects."
category: "Build, test, and change quality"
---

# UiPath Pattern Migration

Turn a wide repetitive change into an explicit contract, complete inventory, reviewed dry run, bounded batches, backups, verification, and a searchable manifest.

**Maturity:** pilot.

## Ownership Boundary

**This custom skill owns:** Turn a wide repetitive change into an explicit contract, complete inventory, reviewed dry run, bounded batches, backups, verification, and a searchable manifest.

Keep current product commands, schemas, artifact validation, live tenant operations, and policy administration with official UiPath skills.

## Workflow

### 1. Define the migration contract

State exact old forms, new forms, scope, exclusions, semantic assumptions, generated files, binary or structured artifacts requiring specialist handling, and rollback requirements.

**Completion criterion:** A reviewer can distinguish a safe match from a false positive.

### 2. Inventory every occurrence

Search all relevant projects, tests, docs, configuration, and examples. Group results by transformation class and identify ambiguous cases for manual treatment.

**Completion criterion:** Every in-scope occurrence is classified before modification.

### 3. Run a dry transformation

Use the bundled literal-text helper only for approved plain-text classes. Produce proposed changes without writing and review representative samples plus the full count.

**Completion criterion:** The dry run matches the contract and exposes no unreviewed class.

### 4. Apply bounded batches

Back up changed files, write a manifest, apply one project or transformation class at a time, and route structured UiPath artifacts to their owning official skill rather than blind text replacement.

**Completion criterion:** Each batch can be rolled back independently.

### 5. Validate after every batch

Run applicable syntax, schema, build, test, review, boundary, and solution checks. Compare expected and actual occurrence counts.

**Completion criterion:** The batch is green and the remaining inventory is known.

### 6. Complete and reconcile

Verify no approved old forms remain, no out-of-scope forms changed, every backup and manifest is present, and all manual cases are resolved or assigned.

**Completion criterion:** The migration has completeness and rollback evidence.

### 7. Retire compatibility deliberately

Remove temporary dual-write, aliases, or old contracts only after all consumers and environments are verified.

**Completion criterion:** The contract phase ends without orphaned callers.

## Output Contract

- Migration contract and inventory.
- Dry-run report.
- Backups and change manifest.
- Batch validation evidence.
- Completeness and cleanup report.

## Guardrails

- Do not use literal replacement on XAML, BPMN, JSON, or other structured artifacts without structure-aware ownership and validation.
- Do not apply a migration before reviewing the full inventory and dry run.
- Do not delete compatibility before all consumers are migrated.
- Do not omit backup and manifest evidence for automated writes.

## Example Requests

- "Rename a queue field across projects and tests."
- "Migrate environment configuration keys."
- "Replace a repeated coded-test pattern safely."

## Finish

Report completed work, observed evidence, the next official owner, and every blocker. Mark unobserved actions as pending.
