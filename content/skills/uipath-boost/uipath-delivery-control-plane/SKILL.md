---
name: uipath-delivery-control-plane
description: "Use only when the user explicitly asks to establish durable delivery governance around an already discovered UiPath repository or solution."
category: "Routing and project continuity"
---

# UiPath Delivery Control Plane

Create the project-management and evidence control plane that complements the official project-discovery context instead of duplicating it.

**Maturity:** core.

## Ownership Boundary

**This custom skill owns:** Create the project-management and evidence control plane that complements the official project-discovery context instead of duplicating it.

Keep current product commands, schemas, artifact validation, live tenant operations, and policy administration with official UiPath skills.

## Compose With Official UiPath Skills

Use official skills for current product commands and artifact contracts:

- `uipath-project-discovery-agent`
- `uipath-planner`
- `uipath-platform`
- `uipath-admin`
- `uipath-governance`

## Workflow

### 1. Verify official project context

Look for the context produced by the official project-discovery agent, such as .claude/rules/project-context.md or an equivalent AGENTS.md section. When it is absent or stale, route to that agent and stop rather than building a second artifact inventory.

**Completion criterion:** A current official project-context artifact is available or the missing prerequisite is explicitly reported.

### 2. Audit delivery controls

Run the bundled audit script or inspect issue tracking, decision records, evidence indexes, environment aliases, source-control policy, CI, ownership, approvals, release gates, runbooks, and handoff conventions.

**Completion criterion:** Existing controls and concrete gaps are known without rescanning product artifacts.

### 3. Choose one authoritative layout

Reuse the repository conventions where possible. Define one home for delivery context, decisions, evidence, risks, environment aliases, approvals, and support ownership; avoid duplicate sources of truth.

**Completion criterion:** Each recurring delivery fact has one authoritative location.

### 4. Create or update the control-plane documents

Write only the missing delivery-governance sections and link to the official project context rather than copying it. Preserve user-authored instructions and record unknowns as owned gaps.

**Completion criterion:** The repository has a concise delivery control plane with explicit links and owners.

### 5. Validate non-duplication and usability

Re-read the result, confirm no artifact inventory was duplicated, and walk one example handoff and one release-evidence lookup.

**Completion criterion:** A new contributor can orient to delivery rules while product structure remains owned by official discovery.

## Output Contract

- Delivery control-plane document.
- Tracker and decision-record conventions.
- Environment, approval, evidence, and ownership map.
- Named control gaps and next owners.

## Guardrails

- Do not inventory UiPath artifacts, dependencies, entry points, or coding conventions already owned by the official project-discovery agent.
- Do not duplicate AGENTS.md or project-context content.
- Never store credentials, tokens, customer payloads, or production secrets.
- Do not change cloud, tenant, identity, policy, or deployment state.

## Example Requests

- "The official discovery context exists; now set up delivery governance for the project."
- "Create environment aliases, evidence rules, and approval boundaries for this UiPath solution."
- "Standardize handoffs and decision records across this automation repository."

## Finish

Report completed work, observed evidence, the next official owner, and every blocker. Mark unobserved actions as pending.
