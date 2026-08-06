/**
 * Sync a Catalog's Skills from its Upstream Repository into a committed Snapshot.
 *
 * See decisions/0004-committed-snapshot-not-build-time-fetch.md — the site builds
 * only from committed files, so a GitHub outage can never fail the Portfolio build.
 *
 * Usage: npm run sync:skills [-- <catalog-slug>]
 */
import { execFileSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Kept in sync with constants/skillCatalogs.js. Duplicated as plain data here
// because that module is consumed by Next's bundler, not by node scripts.
const CATALOGS = {
  "uipath-boost": {
    repository: "1aifanatic/uipath-boost",
    branch: "main",
    categories: [
      "Routing and project continuity",
      "Discovery and decision-making",
      "Design and architecture",
      "Build, test, and change quality",
      "Release, operations, and governance",
      "Learning and communication",
    ],
  },
};

const slug = process.argv[2] || "uipath-boost";
const catalog = CATALOGS[slug];
if (!catalog) {
  console.error(`Unknown catalog "${slug}". Known: ${Object.keys(CATALOGS).join(", ")}`);
  process.exit(1);
}

const destination = path.join(root, "content", "skills", slug);
const manifestPath = path.join(destination, "manifest.json");

function fail(message) {
  console.error(`\n  sync failed: ${message}\n`);
  process.exit(1);
}

function listFiles(dir, prefix) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    return entry.isDirectory() ? listFiles(path.join(dir, entry.name), rel) : [rel];
  });
}

function previousManifest() {
  try {
    return JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  } catch {
    return null;
  }
}

const temp = fs.mkdtempSync(path.join(os.tmpdir(), `sync-${slug}-`));
const clone = path.join(temp, "repo");

try {
  console.log(`Cloning ${catalog.repository}#${catalog.branch}...`);
  execFileSync(
    "git",
    [
      "clone",
      "--depth",
      "1",
      "--branch",
      catalog.branch,
      `https://github.com/${catalog.repository}.git`,
      clone,
    ],
    { stdio: ["ignore", "ignore", "inherit"] }
  );

  const commit = execFileSync("git", ["rev-parse", "HEAD"], { cwd: clone })
    .toString()
    .trim();

  // Invocation type lives in the upstream module, not in frontmatter. Read it
  // by pattern rather than importing, so we never execute cloned code and a
  // change in that module's shape degrades instead of failing the sync.
  let userInvoked = new Set();
  try {
    const contracts = fs.readFileSync(path.join(clone, "src", "skill-contracts.mjs"), "utf8");
    const block = contracts.match(/USER_INVOKED_SKILLS\s*=\s*Object\.freeze\(\[([\s\S]*?)\]\)/);
    if (block) {
      userInvoked = new Set([...block[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]));
    }
  } catch {
    /* optional metadata */
  }

  const skillsDir = path.join(clone, "skills");
  if (!fs.existsSync(skillsDir)) fail(`no skills/ directory in ${catalog.repository}`);

  const names = fs
    .readdirSync(skillsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  const known = new Set(catalog.categories);
  const skills = [];

  for (const name of names) {
    const source = path.join(skillsDir, name, "SKILL.md");
    if (!fs.existsSync(source)) fail(`${name} has no SKILL.md`);

    const raw = fs.readFileSync(source, "utf8");
    const { data } = matter(raw);

    if (!data.name) fail(`${name}: SKILL.md has no "name"`);
    if (!data.description) fail(`${name}: SKILL.md has no "description"`);
    if (!data.category) fail(`${name}: SKILL.md has no "category"`);
    if (!known.has(data.category)) {
      fail(`${name}: category "${data.category}" is not one of the known ${known.size}`);
    }
    if (data.name !== name) fail(`${name}: frontmatter name is "${data.name}"`);

    // Supplementary files sit beside SKILL.md; named and linked, never rendered.
    // `agents/` is per-skill invocation-policy boilerplate present in every
    // skill, so it carries no information on a page and is excluded.
    const supplementary = listFiles(path.join(skillsDir, name), "")
      .filter((file) => file !== "SKILL.md" && !file.startsWith("agents/"))
      .sort();

    skills.push({
      name,
      description: String(data.description),
      category: data.category,
      invocation: userInvoked.has(name) ? "user" : "model",
      supplementary,
      digest: `sha256:${crypto.createHash("sha256").update(raw).digest("hex")}`,
    });
  }

  const previous = previousManifest();
  if (previous && skills.length < previous.skills.length) {
    fail(
      `skill count dropped from ${previous.skills.length} to ${skills.length}. ` +
        `If this is intended, delete ${path.relative(root, manifestPath)} and re-run.`
    );
  }
  if (!skills.length) fail("no skills found");

  // Only replace the Snapshot once every assertion above has passed.
  fs.rmSync(destination, { recursive: true, force: true });
  for (const skill of skills) {
    const target = path.join(destination, skill.name);
    fs.mkdirSync(target, { recursive: true });
    fs.copyFileSync(path.join(skillsDir, skill.name, "SKILL.md"), path.join(target, "SKILL.md"));
  }

  const manifest = {
    catalog: slug,
    repository: catalog.repository,
    branch: catalog.branch,
    commit,
    syncedAt: new Date().toISOString().slice(0, 10),
    categories: catalog.categories,
    skills,
  };
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

  // A tiny derived summary so client components (homepage hero, work page) can
  // show live counts without pulling the whole manifest into the bundle.
  const summary = {
    skillCount: skills.length,
    userInvokedCount: skills.filter((skill) => skill.invocation === "user").length,
    categories: catalog.categories.map((name) => ({
      name,
      count: skills.filter((skill) => skill.category === name).length,
    })),
  };
  fs.writeFileSync(
    path.join(destination, "summary.json"),
    `${JSON.stringify(summary, null, 2)}\n`
  );

  const byCategory = catalog.categories.map(
    (category) => `  ${category} — ${skills.filter((s) => s.category === category).length}`
  );
  console.log(
    [
      "",
      `Synced ${skills.length} skills from ${catalog.repository}@${commit.slice(0, 7)}`,
      ...byCategory,
      "",
      `Snapshot: ${path.relative(root, destination)}`,
      "Review the diff, then commit.",
      "",
    ].join("\n")
  );
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
