---
name: create-uipath-coded-app
description: "Create and deliver UiPath Coded Web Apps or Coded Action Apps from simple UI prototypes through production-oriented builds. Use when identifying a small coded-app use case, scaffolding a TypeScript UI with safe dummy data, checking developer prerequisites, configuring UiPath SDK authentication and access, publishing and deploying to an Orchestrator folder, opening the deployed URL in a browser, or documenting and publishing the source to Git or GitHub."
category: "Scaffolding and delivery"
---

# Create UiPath Coded App

Turn a developer's idea into an understandable, build-verified, optionally deployed and source-published UiPath Coded App.

## Ownership boundary

Own use-case shaping, developer readiness, UI-first delivery, naming recommendations, evidence gates, README requirements, and cross-owner orchestration.

Compose with these installed owners instead of copying their volatile truth:

- `$uipath-coded-apps`: app types, templates, CLI lifecycle, SDK imports and methods, OAuth scopes, Action schemas, packaging, publishing, and deployment.
- `$uipath-platform`: CLI authentication, tenant selection, Orchestrator folder discovery or creation, users, groups, roles, and access verification.
- `$skill-installer`: approved installation of `$uipath-coded-apps` when it is absent and an authoritative install source is available.
- `$github:yeet`: GitHub branch, commit, push, and draft pull-request publication.
- `$browser:control-in-app-browser`: local and deployed visual verification when browser control is available.

Read each owner's instructions and routed reference before its operation. If an owner is unavailable, stop before that owner's operation and report the missing capability; never reconstruct current commands from memory.

## Workflow

### 1. Choose the app and delivery mode

Require explicit confirmation of **Coded Web App** or **Coded Action App**. Capture the app name, intended users, primary outcome, destination, and requested delivery mode:

1. `local`: scaffold, display locally, and build.
2. `deploy`: local delivery plus UiPath publish, deploy, and live browser verification.
3. `deploy-and-git`: deployment plus structured README and source publication.

Treat "create, publish/deploy, and open it" as explicit authorization for `deploy`. Treat "publish it to Git/GitHub" as authorization for the Git stage, but still require a known remote and clean scope. If the user only asks to create an app, stop at `local` and offer the later stages.

**Gate:** Record app type, delivery mode, destination, and explicit authority for every external write.

### 2. Shape a simple use case quickly

Use [references/simple-ui-delivery.md](references/simple-ui-delivery.md). Classify a request as simple when it has one primary persona, one main outcome, at most three views, and no required live write integration for the first display.

For a simple request, infer a compact UI brief from the prompt, show the inferred page title, primary objects, actions, and demo fields, then proceed unless the developer corrects it. Do not conduct a long discovery interview. Use safe typed dummy records and keep them behind a replaceable data adapter.

For a platform-integrated request, capture exact UiPath services and operations before deriving SDK methods or scopes.

**Gate:** Require an accepted or uncorrected UI brief and a clear distinction between demo data and live integrations.

### 3. Apply names and repository conventions

Read [references/naming-folders-access.md](references/naming-folders-access.md). Propose consistent app, source folder, package, External Application, Git branch, and Orchestrator folder names. Label them as recommendations, preserve an organization's established convention when supplied, and never rename existing tenant resources silently.

Refuse to overwrite a non-empty destination without explicit approval of the overlapping files.

**Gate:** Require valid, non-conflicting names and an approved destination.

### 4. Bootstrap the developer environment

Confirm `$uipath-coded-apps` is available. If absent, use `$skill-installer` only after approval and only from an authoritative known source; otherwise stop with an installation blocker.

Run the bundled checker from this skill directory, adding `-SourcePublish GitHub` or `-SourcePublish Git` when applicable:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/check-prerequisites.ps1 -Stage Scaffold -AppType Web -SourcePublish GitHub -OutputFormat Json
```

Use the official owners to install missing UiPath CLI or `codedapp-tool` components after approval. Do not silently install or upgrade global software. Re-run the checker and preserve before/after evidence.

**Gate:** Require passing Node.js, npm, UiPath CLI, coded-app tool, app-type, and requested source-publication checks.

### 5. Scaffold and display the initial UI

Follow the selected branch in `$uipath-coded-apps`. For simple mode, build a purposeful initial screen with safe dummy data, a visible "Demo data" indicator, and loading, populated, empty, and error states. Use responsive layout, keyboard-accessible controls, useful labels, text-overflow protection, and pagination for operational tables.

Keep demo data in an obvious replaceable module such as `src/data/demo/`; do not embed customer data, credentials, tenant identifiers, or copied production records. Do not invent SDK calls for a UI-only prototype.

Create the generated application's `README.md` using [references/git-readme-browser.md](references/git-readme-browser.md). This README belongs in the generated application, not in this reusable skill directory.

**Gate:** Require a coherent visible UI, isolated dummy data, all official scaffold artifacts, and the structured application README.

### 6. Configure SDK and authentication only as needed

For live UiPath features, map every requested operation to an official SDK method, subpath import, identifier type, pagination behavior, and smallest sufficient scope. Verify the existing External Application supports the scopes and redirect URIs before reusing it. If none is suitable, request approval before creating or changing one through the official flow.

Keep two authentication contexts distinct:

- **CLI session:** authorizes publish/deploy. Reuse only when its environment, organization, and tenant match the requested target. If absent or mismatched, start supported interactive login and ask the user to finish authentication in the opened browser; never request their password or token.
- **Runtime SDK application:** authorizes browser SDK calls. Configure only when the UI uses those services.

**Gate:** Require a matching CLI target for cloud work and an approved, scope-correct runtime identity for every SDK integration.

### 7. Build and verify locally

Run the checker against the generated project:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/check-prerequisites.ps1 -Stage Build -AppType Web -ProjectPath <project-path> -RequirePlatformSdk -SourcePublish GitHub -OutputFormat Json
```

Omit `-RequirePlatformSdk` only for an Action App that uses no platform service. Run the project's documented build command and require a zero exit code plus an observed `dist/` directory.

Start the local development server, open its reported URL through the browser owner, and verify the expected title, primary screen, demo-data indicator, representative dummy record, responsive layout, and absence of visible runtime errors. Stop the temporary server when verification finishes.

**Gate:** Require a passing checker, successful build, `dist/`, and observed local UI. File presence alone does not prove a build or visual check succeeded.

### 8. Prepare the Orchestrator target and access

For `deploy` modes, use `$uipath-platform` to check login status and list accessible folders. Resolve an exact folder path and key; never use an ambiguous name. If the folder is absent, propose the recommended path and obtain explicit approval before creation.

Verify that the authenticated principal can publish and deploy to the target. Prefer group-based, least-privilege access. If access is missing and the user has not authorized an exact grant, generate the access request from [references/naming-folders-access.md](references/naming-folders-access.md) and stop at the access gate. Never silently broaden roles, and preserve existing role membership when an assignment API has replace semantics.

**Gate:** Require matching authentication, an observed folder key, and sufficient existing or explicitly granted access.

### 9. Pack, publish, deploy, and open

Follow `$uipath-coded-apps` for the full build, pack, publish, and non-interactive deploy sequence. Observe each output and keep the required version and app-type rules. Immediately before deploy, run:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/check-prerequisites.ps1 -Stage Deploy -AppType Web -ProjectPath <project-path> -FolderKey <guid> -OutputFormat Json
```

After successful deployment, read the observed `appUrl` from `.uipath/app.config.json`. For a Web App, open that exact URL through the browser owner. If authentication appears, ask the user to complete sign-in in that browser and continue only after they confirm. Verify the expected UI and demo-data indicator on the live page. For an Action App, verify it through a real Action Center task when one is available; do not claim that opening a package URL proves task rendering.

Display the live URL as a clickable link even when browser control is unavailable, and state whether visual verification occurred.

**Gate:** Require observed pack, publish, deploy, app URL, and app-type-appropriate live verification before claiming deployment success.

### 10. Publish the source repository

Read [references/git-readme-browser.md](references/git-readme-browser.md). Update the application README with the observed deployment URL and target summary without secrets. Inspect Git status and diffs, confirm intended files, verify `.env`, credentials, tokens, `node_modules/`, build output, and packages are excluded, and run the relevant validation again.

For GitHub, use `$github:yeet` to create or retain the correct branch, stage only intended files, commit, push, and open a draft pull request. Require authenticated `gh` and an accessible remote. For another Git provider, use its available official owner; if none exists, require an explicit existing remote and stop before guessing repository creation or permissions.

**Gate:** Require an observed remote, pushed commit, branch, and, when applicable, draft pull-request URL. Never claim "published to Git" from a local commit alone.

## Completion report

Report only observed evidence:

- Use case, app type, delivery mode, naming decisions, project path, and demo/live data status.
- Prerequisite checks, installations approved and performed, authentication target, folder path/key, and access state.
- SDK services, methods, imports, and scopes used.
- Build, package, publish, deploy, local URL, live URL, and browser verification status.
- README path, Git remote, branch, commit, push, and pull-request URL.
- Highest completed stage and every unresolved blocker.

Use [references/evaluation-scenarios.md](references/evaluation-scenarios.md) when reviewing this skill.

## Guardrails

- Do not duplicate current UiPath CLI commands, SDK tables, OAuth mappings, tenant roles, or portal behavior.
- Do not expose `.env` values, credentials, access tokens, or secrets in logs, README files, commits, or reports.
- Do not silently install global prerequisites, create identities or folders, alter access, overwrite files, publish, deploy, create repositories, or push unrelated changes.
- Do not use dummy data that resembles real personal, financial, health, authentication, or tenant data.
- Do not claim browser, tenant, deployment, or Git evidence that was not directly observed.
- Do not claim compatibility outside the tested operating system and PowerShell environment.
