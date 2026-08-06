import Link from "next/link";
import ContainerBlock from "@components/ContainerBlock";
import Icon from "@components/Icon";
import InstallCommands from "@components/InstallCommands";
import { getAllSkillParams, getSkill } from "@lib/skillCatalog";
import { installCommands, upstreamFileUrl } from "@constants/skillCatalogs";

export default function SkillPage({ skill, commands }) {
  const { catalog } = skill;
  // Recorded by the sync — upstream layouts differ between catalogs.
  const skillPath = skill.path;

  return (
    <ContainerBlock
      title={`${skill.name} - ${catalog.title} Agent Skill`}
      description={skill.description}
      image={`/og-${catalog.slug}.png`}
    >
      <article className="site-container page-section">
        <div className="mx-auto max-w-6xl">
          <Link href={`/skills/${catalog.slug}`} className="source-label">
            ← {catalog.title}
          </Link>

          <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <p className="eyebrow">{skill.category}</p>
                <span className="rounded-full border border-[#d8ddd8] px-3 py-1 text-[10px] font-semibold uppercase tracking-[.12em] text-[#5f6864] dark:border-[#46514c] dark:text-[#b7c0bb]">
                  {skill.invocation === "user" ? "You invoke it" : "The agent picks it"}
                </span>
              </div>

              <h1 className="mt-4 break-words font-mono text-3xl font-semibold leading-tight tracking-[-.02em] sm:text-4xl">
                {skill.name}
              </h1>
              <p className="mt-6 max-w-3xl text-xl leading-9 text-[#46514c] dark:text-[#c5cec8]">
                {skill.description}
              </p>

              <div className="mt-10 rounded-[1.5rem] border border-[#34413d] bg-[#111716] p-6 text-[#eef1ed] sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#a8c7ee]">
                  Install this skill
                </p>
                <div className="mt-5">
                  <InstallCommands commands={commands} />
                </div>
              </div>

              <div
                className="article-copy mt-12 max-w-3xl"
                dangerouslySetInnerHTML={{ __html: skill.html }}
              />

              {skill.supplementary.length > 0 && (
                <div className="mt-12 max-w-3xl border-t border-[#d8ddd8] pt-8 dark:border-[#34413d]">
                  <p className="eyebrow">Files this skill uses</p>
                  <ul className="mt-4 space-y-2">
                    {skill.supplementary.map((file) => (
                      <li key={file}>
                        <a
                          href={upstreamFileUrl(
                            catalog.repository,
                            catalog.commit,
                            `${skillPath}/${file}`
                          )}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-sm text-[#174b8b] underline decoration-[#b9cce5] underline-offset-4 dark:text-[#a8c7ee]"
                        >
                          {file}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-12 max-w-3xl rounded-2xl border border-[#d8ddd8] bg-white/70 p-5 text-xs leading-6 text-[#6b7670] dark:border-[#34413d] dark:bg-[#18211f]/60 dark:text-[#aab4ae]">
                Synced from{" "}
                <a
                  className="font-mono underline underline-offset-2"
                  href={upstreamFileUrl(
                    catalog.repository,
                    catalog.commit,
                    `${skillPath}/SKILL.md`
                  )}
                  target="_blank"
                  rel="noreferrer"
                >
                  {catalog.repository}@{catalog.shortCommit}
                </a>{" "}
                on {catalog.syncedAt}. {catalog.disclaimer}
              </div>
            </div>

            {skill.headings.length > 2 && (
              <aside className="hidden lg:block">
                <nav
                  className="sticky top-28 border-l border-[#d8ddd8] pl-5 dark:border-[#34413d]"
                  aria-label="Table of contents"
                >
                  <p className="eyebrow">On this page</p>
                  <ol className="mt-4 space-y-3">
                    {skill.headings.map((heading) => (
                      <li key={heading.id}>
                        <a
                          href={`#${heading.id}`}
                          className="text-sm leading-5 text-[#5f6864] hover:text-[#174b8b] dark:text-[#b7c0bb] dark:hover:text-[#a8c7ee]"
                        >
                          {heading.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </aside>
            )}
          </div>

          {(skill.previous || skill.next) && (
            <nav
              className="mt-16 grid gap-5 border-t border-[#d8ddd8] pt-10 sm:grid-cols-2 dark:border-[#34413d]"
              aria-label="More in this category"
            >
              {[skill.previous, skill.next].map((sibling, index) =>
                sibling ? (
                  <Link
                    key={sibling.name}
                    href={`/skills/${catalog.slug}/${sibling.name}`}
                    className="paper-card group"
                  >
                    <p className="source-label">
                      {index === 0 ? "Previous" : "Next"} in {skill.category}
                    </p>
                    <h2 className="mt-3 font-mono text-lg font-semibold transition group-hover:text-[#174b8b] dark:group-hover:text-[#a8c7ee]">
                      {sibling.name}
                    </h2>
                  </Link>
                ) : (
                  <span key={`empty-${index}`} className="hidden sm:block" />
                )
              )}
            </nav>
          )}

          <Link
            href={`/skills/${catalog.slug}`}
            className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-[#174b8b] dark:text-[#a8c7ee]"
          >
            Back to all {catalog.title} skills <Icon name="arrowRight" />
          </Link>
        </div>
      </article>
    </ContainerBlock>
  );
}

export async function getStaticPaths() {
  return { paths: getAllSkillParams(), fallback: false };
}

export async function getStaticProps({ params }) {
  const skill = getSkill(params.catalog, params.skill);
  if (!skill) return { notFound: true };

  return {
    props: {
      skill,
      commands: installCommands(skill.catalog.repository, skill.name),
    },
  };
}
