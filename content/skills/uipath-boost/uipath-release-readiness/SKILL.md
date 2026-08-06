---
name: uipath-release-readiness
description: "Aggregate authoritative build, review, test, security, operational, governance, deployment, and support evidence into a Ready, Conditionally Ready, or Not Ready verdict for a specific UiPath release unit and target. Use after official product validation and review evidence exists. Do not run product review, Test Manager operations, policy changes, deployment, activation, or production mutation."
category: "Release, operations, and governance"
---

# UiPath Release Readiness

Produce a clear ready, conditionally ready, or not ready verdict from observed evidence while keeping deployment and activation as separate explicitly authorized actions.

**Maturity:** core.

## Ownership Boundary

**This custom skill owns:** Produce a clear ready, conditionally ready, or not ready verdict from observed evidence while keeping deployment and activation as separate explicitly authorized actions.

Keep current product commands, schemas, artifact validation, live tenant operations, and policy administration with official UiPath skills.

## Compose With Official UiPath Skills

Use official skills for current product commands and artifact contracts:

- `uipath-review`
- `uipath-test`
- `uipath-solution`
- `uipath-platform`
- `uipath-admin`
- `uipath-governance`
- `uipath-insights`
- `uipath-troubleshoot`

## Workflow

### 1. Define the release unit

Pin package or solution version, source commit, target environment, release scope, change window, business owner, technical owner, deployment method, and rollback target.

**Completion criterion:** The exact artifact and target are unambiguous.

### 2. Collect build and requirement evidence

Run or verify official validation, build, test, two-axis review, acceptance, packaging, dependency, and known-defect results. Account for every required check and skipped rule.

**Completion criterion:** Technical and specification readiness have observed evidence.

### 3. Verify environment readiness

Check target resources, folders, machines or serverless runtime, connections, credentials, assets, queues, storage, data, licenses, policies, network paths, and separation of duties through official platform and admin skills.

**Completion criterion:** Required target dependencies exist or have named blockers.

### 4. Verify operational readiness

Confirm monitoring, correlation, dashboards, alerts, runbooks, support ownership, on-call contacts, retry and recovery, business continuity, rollback steps, backup, data reconciliation, and post-release verification.

**Completion criterion:** The team can detect, diagnose, contain, and recover from failure.

### 5. Review security and governance

Consume the latest uipath-solution-security-assessment for the release scope and account for all critical or accepted residual findings.

**Completion criterion:** Security, privacy, AI, access, and change-control gates have an owner and disposition.

### 6. Assess residual risk

List unresolved items with probability, impact, exposure window, mitigation, owner, due date, and whether each blocks release or is formally accepted.

**Completion criterion:** No risk is hidden inside a generic caveat.

### 7. Issue the verdict

State Ready, Conditionally Ready, or Not Ready with conditions, evidence links, approvers, go or no-go checks, rollback trigger, and exact next authorized action.

**Completion criterion:** The verdict is reproducible from the evidence and does not itself deploy anything.

## Output Contract

- Release-unit and target record.
- Evidence matrix.
- Environment and operations checklist.
- Residual-risk register.
- Ready, Conditionally Ready, or Not Ready verdict.

## Guardrails

- Never deploy, publish, activate, promote, change policy, or manage identities as part of the verdict.
- Do not rerun or duplicate uipath-review; consume its report and account for skipped rules.
- Do not treat successful build or test execution as proof of business, security, or operational readiness.
- Do not mark unavailable or stale evidence as passed.
- Do not bury release blockers in a long recommendation list.

## Example Requests

- "Is this UiPath solution ready for production?"
- "Run a go-live readiness review for the claims automation."
- "Assess readiness before upgrading and activating the new package."

## Finish

Report completed work, observed evidence, the next official owner, and every blocker. Mark unobserved actions as pending.
