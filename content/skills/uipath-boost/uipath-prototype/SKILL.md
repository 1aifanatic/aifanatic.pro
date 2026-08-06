---
name: uipath-prototype
description: "Build a deliberately throwaway UiPath-oriented prototype to answer one design question. Use when a team must validate a selector strategy, extraction result shape, state model, human-review experience, queue contract, API interaction, agent behavior, or orchestration flow before committing to production architecture."
category: "Design and architecture"
---

# UiPath Prototype

Increase discussion fidelity with the cheapest safe artifact that produces a decisive verdict. Treat the prototype as primary-source evidence that stays out of main and production.

**Maturity:** core.

## Ownership Boundary

**This custom skill owns:** Increase discussion fidelity with the cheapest safe artifact that can produce a decisive verdict, while keeping prototype code and data out of production by default.

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
- `uipath-human-in-the-loop`
- `uipath-ixp`

## Workflow

### 1. State one falsifiable question

Write the exact uncertainty and the observable result that would answer it. Split multiple questions into separate prototypes.

**Completion criterion:** A pass, fail, or trade-off verdict is possible.

### 2. Choose the lowest-cost artifact

Select a mock, isolated workflow, coded harness, sample form, disposable flow, extraction experiment, or UI variation that exercises only the uncertain behavior. For a logic, state, or human-review question, prefer one self-contained HTML file with no build or server, visible state, free-play controls, and guided scenarios. For a visual question, produce materially different layouts rather than cosmetic variants.

**Completion criterion:** The artifact is smaller than a production slice.

### 3. Define safety boundaries

Use synthetic or approved redacted data, non-production resources, bounded permissions, obvious PROTOTYPE naming, and no persistent side effects unless persistence is the question.

**Completion criterion:** The prototype cannot be confused with or damage production.

### 4. Build and expose evidence

Use the owning official skill. Make inputs, state transitions, outputs, timings, confidence, errors, and human reactions visible enough to judge the question.

**Completion criterion:** A reviewer can see why the result supports the verdict.

### 5. Run representative cases

Exercise the minimum normal, edge, and failure cases needed to challenge the proposed design.

**Completion criterion:** The verdict is not based on one convenient example.

### 6. Preserve the answer and its primary source

Record the question, setup, observations, verdict, limitations, and resulting decision in the authoritative project record. When source control is available and the user authorizes the write, preserve the runnable prototype on an unmerged `prototype/<name>` branch and place a context pointer in the decision or implementation item. Otherwise save it in an explicitly isolated location and report the retention decision.

**Completion criterion:** Main contains the decision rather than prototype code, while the evidence remains findable and cannot be mistaken for production.

## Output Contract

- Prototype question and success signal.
- Throwaway artifact or mock.
- Observed evidence and verdict.
- Decision handoff and cleanup record.

## Guardrails

- Keep the prototype narrow, visibly temporary, and outside main; build production behavior separately.
- Do not use unrestricted production credentials or live customer data.
- Do not add broad abstractions, comprehensive error handling, or polish unrelated to the question.
- Do not claim product feasibility beyond the tested conditions.

## Example Requests

- "Prototype a Coded App validation screen."
- "Test whether an IXP extraction schema handles three broker variants."
- "Compare two Maestro state models before writing the SDD."

## Finish

Report completed work, observed evidence, the next official owner, and every blocker. Mark unobserved actions as pending.
