import Link from "next/link";
import ContainerBlock from "@components/ContainerBlock";
import Icon from "@components/Icon";
import { getAllCatalogs } from "@lib/skillCatalog";

export default function SkillsShelf({ catalogs }) {
  const total = catalogs.reduce((sum, catalog) => sum + catalog.skillCount, 0);

  return (
    <ContainerBlock
      title="Agent Skills - Naveen Chatlapalli"
      description={`${total} open-source Agent Skills for AI coding agents, browsable and installable from aifanatic.pro.`}
      image="/og-uipath-boost.png"
    >
      <section className="site-container page-section">
        <p className="eyebrow">Agent Skills</p>
        <h1 className="display-title mt-4 max-w-4xl">
          Skills I publish for AI coding agents.
        </h1>
        <p className="mt-7 max-w-3xl text-xl leading-9 text-[#46514c] dark:text-[#c5cec8]">
          An Agent Skill is a single instruction file an AI coding agent can load on demand.
          I publish them as open catalogs — every skill readable here in full, installable
          with one command, and discoverable by agents without scraping a single line of HTML.
        </p>

        <div className="mt-12 space-y-6">
          {catalogs.map((catalog) => (
            <article
              key={catalog.slug}
              className="overflow-hidden rounded-[1.75rem] border border-[#b9cce5] bg-[#e9eff8] dark:border-[#315169] dark:bg-[#172c3c]"
            >
              <div className="grid lg:grid-cols-[1.15fr_.85fr]">
                <div className="px-6 py-9 sm:px-10 sm:py-11">
                  <p className="eyebrow">{catalog.eyebrow}</p>
                  <h2 className="mt-4 text-4xl sm:text-5xl">{catalog.title}</h2>
                  <p className="mt-5 max-w-xl leading-7 text-[#25332f] dark:text-[#e0e7e3]">
                    {catalog.tagline}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="topic-chip bg-white/60 dark:bg-[#18211f]/60">
                      {catalog.skillCount} skills
                    </span>
                    <span className="topic-chip bg-white/60 dark:bg-[#18211f]/60">
                      {catalog.categories.length} categories
                    </span>
                    <span className="topic-chip bg-white/60 dark:bg-[#18211f]/60">
                      {catalog.license} licensed
                    </span>
                  </div>
                  <Link
                    href={`/skills/${catalog.slug}`}
                    className="button-primary mt-8 inline-flex"
                  >
                    Browse {catalog.skillCount} skills <Icon name="arrowRight" />
                  </Link>
                </div>
                <div className="border-t border-[#b9cce5] px-6 py-8 dark:border-[#315169] sm:px-8 lg:border-l lg:border-t-0">
                  <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#174b8b] dark:text-[#a8c7ee]">
                    Categories
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {catalog.categories.map((category) => (
                      <li
                        key={category.name}
                        className="flex items-baseline justify-between gap-4 text-sm"
                      >
                        <span className="text-[#25332f] dark:text-[#e0e7e3]">
                          {category.name}
                        </span>
                        <span className="font-mono text-xs text-[#5f6864] dark:text-[#b7c0bb]">
                          {category.skills.length}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-[#d8ddd8] bg-white/60 dark:border-[#34413d] dark:bg-[#18211f]/50">
        <div className="site-container page-section grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">For agents</p>
            <h2 className="mt-4 text-3xl sm:text-4xl">Discoverable without scraping.</h2>
            <p className="mt-5 leading-7 text-[#5f6864] dark:text-[#b7c0bb]">
              Every skill published here is advertised in this site&apos;s agent-skills
              discovery index, with a content digest for each one. An agent can enumerate
              and verify the catalog directly instead of parsing these pages.
            </p>
            <a
              href="/.well-known/agent-skills/index.json"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#174b8b] dark:text-[#a8c7ee]"
            >
              /.well-known/agent-skills/index.json <Icon name="arrowRight" />
            </a>
          </div>
          <div>
            <p className="eyebrow">Credit where due</p>
            <p className="mt-4 leading-7 text-[#5f6864] dark:text-[#b7c0bb]">
              The structure of these catalogs was inspired by{" "}
              <a
                className="font-semibold text-[#174b8b] underline decoration-[#b9cce5] underline-offset-4 dark:text-[#a8c7ee]"
                href="https://github.com/mattpocock/skills"
                target="_blank"
                rel="noreferrer"
              >
                mattpocock/skills
              </a>
              , and they are listed on{" "}
              <a
                className="font-semibold text-[#174b8b] underline decoration-[#b9cce5] underline-offset-4 dark:text-[#a8c7ee]"
                href="https://www.skills.sh/"
                target="_blank"
                rel="noreferrer"
              >
                skills.sh
              </a>
              , the open directory for agent skills.
            </p>
          </div>
        </div>
      </section>
    </ContainerBlock>
  );
}

export async function getStaticProps() {
  return { props: { catalogs: getAllCatalogs() } };
}
