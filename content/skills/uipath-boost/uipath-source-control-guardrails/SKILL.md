---
name: uipath-source-control-guardrails
description: "Use only when the user explicitly asks to install and test command guardrails around destructive Git and UiPath release operations."
category: "Build, test, and change quality"
---

# UiPath Source Control Guardrails

Make authority boundaries executable so an agent can inspect and edit safely while high-consequence operations remain explicit human decisions.

**Maturity:** pilot.

## Ownership Boundary

**This custom skill owns:** Make authority boundaries executable so an agent can inspect and edit safely while high-consequence operations remain explicit human decisions.

Keep current product commands, schemas, artifact validation, live tenant operations, and policy administration with official UiPath skills.

## Workflow

### 1. Choose scope and authority

Determine project-only or user-level installation, the agent environment, commands the agent may run autonomously, and commands that require human execution or explicit per-action approval.

**Completion criterion:** A written command policy and installation target exist.

### 2. Install the hook

Choose [Bash](scripts/block_dangerous_commands.sh) for Unix-like or WSL hooks and [PowerShell](scripts/block_dangerous_commands.ps1) for native Windows hooks. Copy the matching blocker into the supported hook location and merge its invocation into existing agent settings without replacing unrelated hooks.

**Completion criterion:** The guardrail is executable and connected to the intended command tool.

### 3. Customize patterns

Keep destructive Git patterns by default. Enable optional UiPath release-command blocking only when the team wants those commands guarded, and add organization-specific patterns sparingly.

**Completion criterion:** The block list matches the authority policy.

### 4. Verify blocked paths

Feed representative destructive commands to the hook on the target shell and observe a blocked exit and message for each policy class.

**Completion criterion:** Every guarded command class has a failing test.

### 5. Verify allowed paths

Test status, diff, log, read-only CLI, validation, and other approved commands so normal engineering work remains possible.

**Completion criterion:** Representative safe commands pass.

### 6. Document recovery

Explain how to run an approved operation manually, temporarily change policy through review, uninstall the hook, and recover from accidental partial operations.

**Completion criterion:** Users can distinguish protection from a broken tool.

## Output Contract

- Command authority policy.
- Installed guardrail hook.
- Blocked and allowed command evidence.
- Recovery and maintenance instructions.

## Guardrails

- Do not claim a hook protects environments it does not intercept.
- Do not hide the block list from repository maintainers.
- Do not block read-only or validation commands unnecessarily.
- Do not use the hook as a substitute for branch protection, least privilege, and platform authorization.

## Example Requests

- "Prevent an agent from pushing or force-resetting this repository."
- "Require human execution for UiPath deploy and activate commands."
- "Add project-level source-control safety hooks."

## Finish

Report completed work, observed evidence, the next official owner, and every blocker. Mark unobserved actions as pending.
