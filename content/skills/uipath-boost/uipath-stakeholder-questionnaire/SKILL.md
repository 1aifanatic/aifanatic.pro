---
name: uipath-stakeholder-questionnaire
description: "Use only when the user explicitly asks to create a focused UiPath questionnaire for the person who owns missing information."
category: "Discovery and decision-making"
---

# UiPath Stakeholder Questionnaire

Ask the right person for only the knowledge they uniquely hold, in a format that is easy to answer and directly tied to pending project decisions.

**Maturity:** core.

## Ownership Boundary

**This custom skill owns:** Ask the right person for only the knowledge they uniquely hold, in a format that is easy to answer and directly tied to pending project decisions.

Keep current product commands, schemas, artifact validation, live tenant operations, and policy administration with official UiPath skills.

## Workflow

### 1. Identify the recipient

Capture role, expertise, relationship to the project, authority, likely context, and what knowledge they hold that the sender lacks.

**Completion criterion:** The tone and assumed background are fixed.

### 2. Define what must come back

List the facts, decisions, samples, evidence, access, owners, or approvals the project must receive and the downstream decision each enables.

**Completion criterion:** Every requested outcome is concrete and usable.

### 3. Write gap-targeted questions

Order most important first, use one idea per question, provide answer stubs, and explain why an answer matters only where misinterpretation is likely.

**Completion criterion:** Every required outcome is covered by at least one answerable question.

### 4. Request evidence safely

Ask for representative files, screenshots, logs, policies, field definitions, volume data, or access contacts with redaction and secure-transfer guidance.

**Completion criterion:** Artifact requests state what they prove and how to share safely.

### 5. Make completion easy

Add purpose, context, expected effort, due date, partial-answer guidance, uncertainty markers, and a closing catch-all.

**Completion criterion:** A recipient can respond asynchronously without a separate orientation meeting.

### 6. Verify coverage and hand off

Trace each answer need to a question, remove duplicates and compound questions, then save the Markdown document and state how answers will re-enter discovery.

**Completion criterion:** No named information gap is left uncovered.

## Output Contract

- Recipient-specific Markdown questionnaire.
- Coverage map from needed outcome to question.
- Evidence request and safe-sharing instructions.
- Answer-intake plan.

## Guardrails

- Do not ask the sender to answer subject-matter questions they already said belong to the recipient.
- Do not create a generic fifty-question checklist unrelated to pending decisions.
- Do not combine several decisions into one question.
- Do not request secrets or raw sensitive data through insecure channels.

## Example Requests

- "Create a questionnaire for the SAP SME."
- "Ask security for the facts needed to approve unattended automation."
- "Prepare an async business-rules questionnaire before the workshop."

## Finish

Report completed work, observed evidence, the next official owner, and every blocker. Mark unobserved actions as pending.
