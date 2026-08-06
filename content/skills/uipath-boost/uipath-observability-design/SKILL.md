---
name: uipath-observability-design
description: "Design end-to-end observability for a UiPath process, agent, Maestro journey, integration, application, or multi-project solution. Use for correlation, structured events, business and technical metrics, SLOs, alert logic, dashboard requirements, runbook links, retention, and support ownership. This skill designs the model only; live job analytics belong to uipath-insights, Action Center task operations to uipath-tasks, audit events to uipath-admin, platform resources to uipath-platform, and causal diagnosis to uipath-troubleshoot."
category: "Release, operations, and governance"
---

# UiPath Observability Design

Make business and technical journeys observable through one correlation model, meaningful signals, decision-ready alerts, and a support path that can explain failures rather than only count them.

**Maturity:** core.

## Ownership Boundary

**This custom skill owns:** Make business and technical journeys observable through one correlation model, meaningful signals, decision-ready alerts, and a support path that can explain failures rather than only count them.

Keep current product commands, schemas, artifact validation, live tenant operations, and policy administration with official UiPath skills.

## Compose With Official UiPath Skills

Use official skills for current product commands and artifact contracts:

- `uipath-insights`
- `uipath-process-mining`
- `uipath-tasks`
- `uipath-admin`
- `uipath-platform`
- `uipath-governance`
- `uipath-troubleshoot`

## Workflow

### 1. Map the observable journey

Trace trigger, documents or messages, orchestrations, jobs, queue items, agents, human tasks, APIs, data stores, outputs, and business completion. Mark ownership and trust boundaries.

**Completion criterion:** Every critical handoff and completion state is visible on one journey map.

### 2. Define correlation

Choose business case, transaction, execution, job, queue, agent, task, integration, and release identifiers plus propagation rules and redaction requirements.

**Completion criterion:** An incident can be followed end to end without relying on free-text searches.

### 3. Choose signals and service levels

Define business outcomes, throughput, timeliness, quality, confidence, exception, retry, human aging, integration, cost, and saturation metrics. Set SLOs only where owners and measurement exist.

**Completion criterion:** Each metric answers an operational or business decision.

### 4. Design logs and traces

Specify structured events, required fields, severity, lifecycle points, error evidence, version context, sampling, retention, and links to raw evidence while avoiding secrets and sensitive payloads.

**Completion criterion:** Logs can distinguish symptom, propagation, and originating cause.

### 5. Design alerts and dashboards

Create audience-specific views and alerts with threshold or anomaly logic, deduplication, context, runbook, owner, escalation, and recovery signal.

**Completion criterion:** Every alert is actionable and every dashboard has a named user.

### 6. Check privacy, security, and cost

Review sensitive fields, tenant boundaries, access, retention, export, sampling, cardinality, storage, and AI data concerns with governance owners.

**Completion criterion:** The design meets evidence needs without uncontrolled data exposure or cost.

### 7. Walk an incident

Simulate at least one technical fault, one silent business failure, and one slow or aging path from detection through diagnosis and recovery using the proposed signals.

**Completion criterion:** The design supports a complete incident story or exposes a named gap.

## Output Contract

- End-to-end observability map.
- Correlation and structured-event schema.
- Metrics, SLO, dashboard, and alert catalog.
- Retention, privacy, and cost decisions.
- Incident walkthrough and gap list.

## Guardrails

- Design only; do not query live analytics, create dashboards, change resources, complete tasks, query audit events, or diagnose root cause.
- Do not log credentials, tokens, full sensitive documents, or unnecessary personal data.
- Do not create metrics without a decision, user, data source, or owner.
- Do not use current snapshots to explain historical incidents without correlated historical evidence.
- Do not alert on every exception without deduplication and business context.

## Example Requests

- "Design monitoring for a Maestro-orchestrated claims journey."
- "Create correlation across email intake, queue, agent, and Action Center."
- "Define dashboards and alerts before production release."

## Finish

Report completed work, observed evidence, the next official owner, and every blocker. Mark unobserved actions as pending.
