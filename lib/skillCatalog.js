/**
 * Server-only readers for committed Catalog Snapshots.
 *
 * Only ever called from getStaticProps / API routes — never from a component,
 * so `marked` and the Snapshot itself stay out of the client bundle.
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { getCatalogConfig, skillCatalogs } from "@constants/skillCatalogs";

const contentRoot = path.join(process.cwd(), "content", "skills");

const slugifyHeading = (value = "") =>
  value
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function readManifest(slug) {
  const file = path.join(contentRoot, slug, "manifest.json");
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

/** Catalog config + everything derived from the Snapshot manifest. */
export function getCatalog(slug) {
  const config = getCatalogConfig(slug);
  if (!config) return null;

  const manifest = readManifest(slug);
  const categories = manifest.categories
    .map((name) => ({
      name,
      skills: manifest.skills.filter((skill) => skill.category === name),
    }))
    .filter((category) => category.skills.length > 0);

  return {
    ...config,
    commit: manifest.commit,
    shortCommit: manifest.commit.slice(0, 7),
    syncedAt: manifest.syncedAt,
    skillCount: manifest.skills.length,
    userInvokedCount: manifest.skills.filter((skill) => skill.invocation === "user").length,
    categories,
    skills: manifest.skills,
  };
}

export function getAllCatalogs() {
  return skillCatalogs.map((catalog) => getCatalog(catalog.slug)).filter(Boolean);
}

/** Every /skills/<catalog>/<skill> path, for getStaticPaths. */
export function getAllSkillParams() {
  return skillCatalogs.flatMap((catalog) =>
    readManifest(catalog.slug).skills.map((skill) => ({
      params: { catalog: catalog.slug, skill: skill.name },
    }))
  );
}

/**
 * One Skill, with its body rendered to HTML at build time.
 * Returns the H2 headings too, so the page can build the same table of
 * contents the blog uses.
 */
export function getSkill(catalogSlug, skillName) {
  const catalog = getCatalog(catalogSlug);
  if (!catalog) return null;

  const entry = catalog.skills.find((skill) => skill.name === skillName);
  if (!entry) return null;

  const file = path.join(contentRoot, catalogSlug, skillName, "SKILL.md");
  const { content } = matter(fs.readFileSync(file, "utf8"));

  // The page renders `name` as its own H1, so drop the body's leading H1.
  const body = content.replace(/^\s*#\s+.*\n/, "");

  const headings = [];
  const renderer = new marked.Renderer();
  renderer.heading = function heading({ tokens, depth }) {
    const text = this.parser.parseInline(tokens);
    const plain = text.replace(/<[^>]+>/g, "").trim();
    const id = slugifyHeading(plain);
    if (depth === 2) headings.push({ id, title: plain });
    return `<h${depth} id="${id}" class="scroll-mt-28">${text}</h${depth}>\n`;
  };

  const html = marked.parse(body, { renderer });

  const index = catalog.skills.findIndex((skill) => skill.name === skillName);
  const siblings = catalog.skills.filter((skill) => skill.category === entry.category);
  const position = siblings.findIndex((skill) => skill.name === skillName);

  return {
    ...entry,
    html,
    headings,
    catalog: {
      slug: catalog.slug,
      title: catalog.title,
      repository: catalog.repository,
      repositoryUrl: catalog.repositoryUrl,
      commit: catalog.commit,
      shortCommit: catalog.shortCommit,
      syncedAt: catalog.syncedAt,
      disclaimer: catalog.disclaimer,
    },
    previous: position > 0 ? pick(siblings[position - 1]) : null,
    next: position < siblings.length - 1 ? pick(siblings[position + 1]) : null,
    ordinal: index + 1,
  };
}

function pick(skill) {
  return skill ? { name: skill.name, description: skill.description } : null;
}
