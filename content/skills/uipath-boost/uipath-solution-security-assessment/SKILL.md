---
name: uipath-solution-security-assessment
description: "Perform project-level threat modeling and evidence-backed security, privacy, AI, integration, and operational control assessment for a defined UiPath solution design or release. Use when the team needs data-flow threats, trust boundaries, misuse cases, control gaps, residual risks, or security evidence requests. Do not author or deploy UiPath governance policies, manage identities or roles, query audit logs, operate tenant resources, or replace uipath-review."
category: "Release, operations, and governance"
---

# UiPath Solution Security Assessment

Identify solution-specific threats and control gaps while delegating policy, identity, audit, platform, and artifact-quality operations to the official UiPath owners.

**Maturity:** core.

## Ownership Boundary

**This custom skill owns:** Identify solution-specific threats and control gaps while delegating policy, identity, audit, platform, and artifact-quality operations to the official UiPath owners.

Keep current product commands, schemas, artifact validation, live tenant operations, and policy administration with official UiPath skills.

## Compose With Official UiPath Skills

Use official skills for current product commands and artifact contracts:

- `uipath-governance`
- `uipath-admin`
- `uipath-platform`
- `uipath-review`
- `uipath-troubleshoot`

## Workflow

### 1. Define the assessment boundary

Pin the approved design or release, environments, tenants and folders by alias, actors, business criticality, data classifications, jurisdictions, AI usage, integrations, external parties, and accountable security or privacy owners.

**Completion criterion:** The solution boundary and applicable decision owners are explicit.

### 2. Map assets, data flows, and trust boundaries

Trace credentials by reference, documents, prompts, model context, human tasks, queue data, storage, logs, APIs, connectors, functions, packages, outputs, and cross-environment paths without collecting secret values.

**Completion criterion:** Critical assets and trust crossings are visible.

### 3. Develop concrete threat and misuse scenarios

Consider unauthorized invocation, excess privilege, data leakage, prompt or tool abuse, poisoned inputs, insecure connector behavior, package or model provenance, weak separation, replay, tampering, silent business failure, and recovery abuse.

**Completion criterion:** Each scenario names an asset, actor, precondition, path, and impact.

### 4. Map controls and evidence

Link preventive, detective, and recovery controls to observed evidence or an authoritative attestation. Route live policy evidence to uipath-governance, identity and audit evidence to uipath-admin, platform evidence to uipath-platform, and artifact findings to uipath-review.

**Completion criterion:** Every control is proven, unproven, not applicable, or explicitly requested from its official owner.

### 5. Assess residual risk and recommend

Rate likelihood and impact using the organization method, state assumptions, propose proportionate changes, identify required approvals, and distinguish design blockers from accepted residual risk.

**Completion criterion:** Every material risk has an owner, disposition, and evidence need.

### 6. Hand off without mutation

Produce the threat model, control matrix, evidence requests, and remediation routes. Do not apply policies, roles, credentials, connector, tenant, or source changes.

**Completion criterion:** The official owners can act on precise requests without the assessment overstepping authority.

## Output Contract

- Solution security scope and data-flow map.
- Threat and misuse-case register.
- Control-to-evidence matrix.
- Residual-risk and approval register.
- Official-skill evidence and remediation handoffs.

## Guardrails

- Never claim compliance, privacy, legal, or security approval.
- Never author or deploy governance policies; use uipath-governance.
- Never manage identities, permissions, IP restrictions, or audit events; use uipath-admin.
- Never perform artifact validation or quality grading; use uipath-review.
- Never expose or request secret values or unnecessary personal data.

## Example Requests

- "Threat-model this agentic claims solution before production."
- "Assess data leakage and tool-use risks in this Maestro and Agent design."
- "Create a security evidence request list without changing tenant policy."

## Finish

Report completed work, observed evidence, the next official owner, and every blocker. Mark unobserved actions as pending.
