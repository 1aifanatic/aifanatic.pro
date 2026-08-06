# AGENTS.md

**Project Summary**
- Personal portfolio website built with Next.js (pages router) and Tailwind CSS.
- Includes lead capture, admin dashboard, dark/light mode, and GitHub repo showcase.

**Primary Stack**
- Next.js `16.1.6`, React `18.2.0`, Tailwind CSS `3.2.1`, `next-themes`, `react-rough-notation`.
- Database: Postgres via Neon using `@neondatabase/serverless` and `pg`.

**Core Commands**
- `npm run dev` starts the dev server on `http://localhost:3000`.
- `npm run build` builds for production.
- `npm start` runs the production server.

**Architecture Map**
- `pages/` routes and API endpoints (`pages/api/*`).
- `components/` reusable UI components.
- `constants/data.js` is the single source of truth for portfolio content.
- `lib/` utilities (database, GitHub integration).
- `styles/` Tailwind globals and fonts.
- `public/` static assets and downloadable documents.

**Conventions**
- Functional React components only.
- Wrap new pages with `components/ContainerBlock.js` for layout + SEO.
- Prefer Tailwind utilities; dark mode uses `class` on `<html>` via `next-themes`.
- Use path aliases from `jsconfig.json` (`@components`, `@constants`, `@lib`, `@styles`).
- Update content in `constants/data.js` instead of hardcoding values in components.

**SSR and Data Fetching**
- Home page uses `getServerSideProps` with `lib/getLatestRepos.js` and `GITHUB_AUTH_TOKEN`.

**API and Database**
- API routes validate HTTP method and use try/catch with proper status codes.
- Admin endpoints require `Authorization: Bearer ${ADMIN_SECRET_KEY}`.
- Tables `leads` and `downloads` are auto-created on first API use.

**Environment Variables**
- Configure in `.env.local` (do not commit).
- Required: `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `GITHUB_AUTH_TOKEN`, `DATABASE_URL`, `ADMIN_SECRET_KEY`, `NEXT_PUBLIC_ADMIN_SECRET`.

**Content and Design Constraints**
- Do not change the homepage animation or avatar/photo without explicit approval.
- Do not mention immigration, visas, or criteria language anywhere on the site.
- If adding pages, update navigation in `components/Navbar.js` as needed.

**Assets**
- Store images in `public/`; prefer WebP when possible.
- Use `<Image>` where practical, but existing code uses `<img>` in places.

**Agent Skills Catalog (`/skills`)**
- Routes: `/skills` (Shelf), `/skills/[catalog]` (Catalog), `/skills/[catalog]/[skill]` (Skill Page). All fully static via `getStaticProps`.
- Skill content is a **committed Snapshot** in `content/skills/<catalog>/`, produced by `npm run sync:skills`. The build never fetches from GitHub — do not "improve" this into a build-time fetch. See `decisions/0004`.
- To publish upstream skill changes: push to the upstream repo, run `npm run sync:skills`, review the diff, commit, deploy.
- Skill count, categories, and install commands are **derived** from the Snapshot manifest / `summary.json`. Never hardcode them in `constants/data.js` again.
- Categories come from `category:` frontmatter in the upstream `SKILL.md` files, not from any list kept here. See `decisions/0003`.
- Catalog pages are ungated and indexable. The Guest Book belongs only on outbound GitHub links. See `decisions/0006`.
- Agent id for Claude Code in install commands is `claude-code`, never `claude`.
- Regenerate the social card with `node scripts/generate-og.mjs` if the skill count changes.

**Documentation**
- `docs/` is **not** a documentation directory — it is the GitHub Pages publish root for the `aifanatic.pro` apex redirect (`CNAME`, `index.html`, `404.html`). Anything placed there is served publicly. Do not put project docs in it.
- ADRs live in `decisions/`, the glossary in `CONTEXT.md`, current status in `STATE.md`, parked ideas in `NEXT.md`.

**Testing**
- No testing framework configured. If requested, use Jest + Testing Library.
- The upstream `1aifanatic/uipath-boost` repo has its own suite: `npm run validate && node --test`. Run it there before pushing skill changes.

**Deployment**
- Vercel deploys from `main`. Build output is `.next`.

**Reference Docs**
- `CLAUDE.md` for detailed conventions and workflows.
- `updates.md` for content roadmap and non-negotiable rules.
- `README-DATABASE-SETUP.md` for lead capture setup details.
