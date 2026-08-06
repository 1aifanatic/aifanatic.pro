---
name: uipath-runbook-wizard
description: "Create an interactive or document-based wizard for a UiPath setup, access, migration, deployment-preparation, or operational procedure that requires human actions. Use when a repeatable manual process involves portals, approvals, values to capture, environment configuration, credentials, tenant resources, or irreversible checkpoints that should not be re-explained from scratch."
category: "Release, operations, and governance"
---

# UiPath Runbook Wizard

Turn steps only a human can perform into a precise Bash, PowerShell, or document-based wizard with confirmation gates, idempotent writes, and a closing verification summary.

**Maturity:** pilot.

## Ownership Boundary

**This custom skill owns:** Turn a tedious human procedure into precise, current, staged instructions with captured outputs, confirmation gates, idempotent writes, and a closing verification summary.

Keep current product commands, schemas, artifact validation, live tenant operations, and policy administration with official UiPath skills.

## Compose With Official UiPath Skills

Use official skills for current product commands and artifact contracts:

- `uipath-platform`
- `uipath-admin`
- `uipath-solution`

## Workflow

### 1. Scope the procedure

Inspect existing configuration, documentation, environment files, pipelines, project context, and official skill guidance. Separate work the agent can safely perform with available tools from portal clicks, approvals, secret entry, and authority gates that require a human. Enumerate only the human stages and the values they produce.

**Completion criterion:** Each stage has a name, input, output, destination, sensitivity, and owner.

### 2. Verify the current journey

Use official documentation or the applicable official UiPath skill to confirm exact commands, portal paths, prerequisites, and delivery-model differences. Mark any UI step that cannot be verified.

**Completion criterion:** No click path or command is invented.

### 3. Confirm the stages

Present the proposed stage list, outputs, sensitivity, and irreversible checkpoints before authoring the artifact. Continue only after the user confirms the scope.

**Completion criterion:** The authorized human stages are confirmed and agent-runnable work is excluded.

### 4. Choose the wizard form

Use Bash for Unix-like or WSL environments, PowerShell for native Windows environments, and Markdown when the procedure spans teams, approvals, or unsupported interactive environments. Start from the matching bundled template.

**Completion criterion:** The format matches where the procedure will actually run.

### 5. Author safe stages

Open or link the required page before requesting a value, hide secrets, write public and secret values only to approved destinations, make reruns idempotent, and confirm before irreversible actions.

**Completion criterion:** A stranger can follow each stage without exposing secrets or guessing.

### 6. Add progress and recovery

Show stage count, prerequisites, completion checks, retry guidance, rollback or stop conditions, and the exact artifact or state produced.

**Completion criterion:** The user knows what remains and how to recover from interruption.

### 7. Verify statically

Check Bash with `bash -n` and ShellCheck when available; parse PowerShell with its language parser. Trace every captured value to its destination. Leave browser, approval, secret, and production-changing stages for the authorized human run.

**Completion criterion:** The wizard is structurally valid and every declared output is accounted for.

### 8. Hand off

State how to run or use the wizard, what permissions are required, which stages need explicit human authority, and when to delete or retain it.

**Completion criterion:** The procedure is ready for an authorized human run.

## Output Contract

- Ordered procedure map.
- Interactive wizard or Markdown runbook.
- Value-to-destination map.
- Verification, recovery, and retention instructions.

## Guardrails

- Do not invent current portal labels or commands.
- Do not echo secrets or write them to unapproved plaintext files.
- Do not run irreversible, browser-driven, approval, deployment, or production operations while authoring the wizard.
- Do not make a one-off script permanent unless the user wants a maintained runbook.
- Use the matching [Bash](assets/wizard-template.sh) or [PowerShell](assets/wizard-template.ps1) template rather than rebuilding wizard mechanics.

## Example Requests

- "Create a wizard for UiPath tenant onboarding."
- "Turn the production cutover checklist into an interactive runbook."
- "Guide a developer through local CLI and environment setup."

## Finish

Report completed work, observed evidence, the next official owner, and every blocker. Mark unobserved actions as pending.
