import { useMemo, useState } from "react";
import Link from "next/link";
import ContainerBlock from "@components/ContainerBlock";
import Icon from "@components/Icon";
import InstallCommands from "@components/InstallCommands";
import { openGuestBook } from "@lib/guestBook";
import { getCatalog } from "@lib/skillCatalog";
import { installCommands, skillCatalogs } from "@constants/skillCatalogs";

export default function CatalogPage({ catalog, commands }) {
  const [query, setQuery] = useState("");

  const categories = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return catalog.categories;
    return catalog.categories
      .map((category) => ({
        ...category,
        skills: category.skills.filter(
          (skill) =>
            skill.name.toLowerCase().includes(term) ||
            skill.description.toLowerCase().includes(term)
        ),
      }))
      .filter((category) => category.skills.length > 0);
  }, [catalog.categories, query]);

  const matches = categories.reduce((sum, category) => sum + category.skills.length, 0);

  return (
    <ContainerBlock
      title={`${catalog.title} - ${catalog.skillCount} Agent Skills`}
      description={catalog.tagline}
      image="/og-uipath-boost.png"
    >
      <section className="site-container page-section">
        <Link href="/skills" className="source-label">
          ← All catalogs
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="eyebrow">{catalog.eyebrow}</p>
            <h1 className="display-title mt-4">{catalog.title}</h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-[#46514c] dark:text-[#c5cec8]">
              {catalog.tagline}
            </p>
            <p className="mt-5 max-w-2xl leading-7 text-[#5f6864] dark:text-[#b7c0bb]">
              {catalog.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              <span className="topic-chip">{catalog.skillCount} skills</span>
              <span className="topic-chip">{catalog.userInvokedCount} user-invoked</span>
              <span className="topic-chip">{catalog.license} licensed</span>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => openGuestBook(catalog.repositoryUrl)}
                className="button-primary"
              >
                View on GitHub <Icon name="arrowRight" />
              </button>
              <a
                href={catalog.registryUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-[#174b8b] dark:text-[#a8c7ee]"
              >
                Listing on skills.sh
              </a>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-[#34413d] bg-[#111716] p-6 text-[#eef1ed] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#a8c7ee]">
              Install the whole catalog
            </p>
            <div className="mt-5">
              <InstallCommands commands={commands} />
            </div>
            <p className="mt-6 text-xs leading-5 text-[#aab4ae]">
              Drop <code className="font-mono">--global</code> to install into the current
              project instead of your user directory.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-[#d8ddd8] bg-white/60 dark:border-[#34413d] dark:bg-[#18211f]/50">
        <div className="site-container page-section">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">The catalog</p>
              <h2 className="mt-3 text-3xl sm:text-4xl">
                {matches === catalog.skillCount
                  ? `All ${catalog.skillCount} skills`
                  : `${matches} of ${catalog.skillCount} skills`}
              </h2>
            </div>
            <div className="w-full sm:w-80">
              <label htmlFor="skill-search" className="sr-only">
                Search skills
              </label>
              <input
                id="skill-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by name or description"
                className="min-h-[48px] w-full rounded-xl border border-[#c7cfca] bg-white px-4 text-[#18211f] placeholder:text-[#7a847e] focus:border-[#174b8b] focus:outline-none focus:ring-2 focus:ring-[#91aed2] dark:border-[#46514c] dark:bg-[#18211f] dark:text-[#eef1ed]"
              />
            </div>
          </div>

          {matches === 0 && (
            <p className="mt-12 text-lg text-[#5f6864] dark:text-[#b7c0bb]">
              No skills match “{query}”.
            </p>
          )}

          <div className="mt-12 space-y-14">
            {categories.map((category) => (
              <div key={category.name}>
                <div className="flex items-baseline gap-4 border-b border-[#d8ddd8] pb-4 dark:border-[#34413d]">
                  <h3 className="text-2xl">{category.name}</h3>
                  <span className="font-mono text-xs text-[#5f6864] dark:text-[#b7c0bb]">
                    {category.skills.length}
                  </span>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {category.skills.map((skill) => (
                    <Link
                      key={skill.name}
                      href={`/skills/${catalog.slug}/${skill.name}`}
                      className="paper-card group flex flex-col"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="font-mono text-base font-semibold transition group-hover:text-[#174b8b] dark:group-hover:text-[#a8c7ee]">
                          {skill.name}
                        </h4>
                        <span className="shrink-0 rounded-full border border-[#d8ddd8] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[.12em] text-[#5f6864] dark:border-[#46514c] dark:text-[#b7c0bb]">
                          {skill.invocation === "user" ? "You invoke" : "Agent picks"}
                        </span>
                      </div>
                      <p className="mt-3 flex-1 text-sm leading-6 text-[#5f6864] dark:text-[#b7c0bb]">
                        {skill.description}
                      </p>
                      <span className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#174b8b] dark:text-[#a8c7ee]">
                        Read the skill <Icon name="arrowRight" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-16 max-w-3xl text-xs leading-5 text-[#6b7670] dark:text-[#aab4ae]">
            {catalog.disclaimer} Synced from{" "}
            <a
              className="underline underline-offset-2"
              href={`${catalog.repositoryUrl}/tree/${catalog.commit}`}
              target="_blank"
              rel="noreferrer"
            >
              {catalog.repository}@{catalog.shortCommit}
            </a>{" "}
            on {catalog.syncedAt}.
          </p>
        </div>
      </section>
    </ContainerBlock>
  );
}

export async function getStaticPaths() {
  return {
    paths: skillCatalogs.map((catalog) => ({ params: { catalog: catalog.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const catalog = getCatalog(params.catalog);
  if (!catalog) return { notFound: true };

  return {
    props: {
      catalog,
      commands: installCommands(catalog.repository),
    },
  };
}
