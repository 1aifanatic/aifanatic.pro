import userData from "@constants/data";
import Icon from "./Icon";

const skillGroups = [
  "Discovery & decisions",
  "Architecture & safe change",
  "Testing & traceability",
  "Release & operations",
];

export default function UiPathBoostFeature({ bordered = true }) {
  const project = userData.uipathBoost;

  return (
    <section
      id="uipath-boost"
      className={
        bordered
          ? "scroll-mt-24 border-y border-[#d8ddd8] bg-white/60 dark:border-[#34413d] dark:bg-[#18211f]/50"
          : "scroll-mt-24"
      }
    >
      <div className="site-container page-section">
        <article className="overflow-hidden rounded-[1.75rem] border border-[#b9cce5] bg-[#e9eff8] shadow-[0_18px_55px_rgba(24,33,31,.08)] dark:border-[#315169] dark:bg-[#172c3c]">
          <div className="grid lg:grid-cols-[1.08fr_.92fr]">
            <div className="px-6 py-9 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
              <div className="flex flex-wrap items-center gap-3">
                <p className="eyebrow">{project.eyebrow}</p>
                <span className="rounded-full border border-[#91aed2] bg-white/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[.14em] text-[#174b8b] dark:border-[#527ba8] dark:bg-[#18211f]/70 dark:text-[#a8c7ee]">
                  New project
                </span>
              </div>
              <h2 className="mt-5 text-5xl leading-none sm:text-6xl">
                {project.title}
              </h2>
              <p className="mt-6 max-w-2xl text-xl leading-8 text-[#25332f] dark:text-[#e0e7e3]">
                {project.summary}
              </p>
              <p className="mt-4 max-w-2xl leading-7 text-[#5f6864] dark:text-[#b7c0bb]">
                {project.description}
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {project.facts.map((fact) => (
                  <span key={fact} className="topic-chip bg-white/60 dark:bg-[#18211f]/60">
                    {fact}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-primary"
                >
                  Explore on GitHub <Icon name="arrowUpRight" />
                </a>
                <a
                  href={`${project.url}#recommended-starter-set`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-secondary"
                >
                  View starter set <Icon name="arrowUpRight" />
                </a>
              </div>
              <p className="mt-6 text-xs leading-5 text-[#6b7670] dark:text-[#aab4ae]">
                Independent community project. UiPath’s official skills remain
                the source of truth for product commands, schemas, deployment,
                and platform behavior.
              </p>
            </div>

            <div className="border-t border-[#b9cce5] bg-[#111716] p-6 text-[#eef1ed] dark:border-[#315169] sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#a8c7ee]">
                  Start with the router
                </p>
                <span className="rounded-full border border-[#46514c] px-3 py-1 text-[10px] font-semibold uppercase tracking-[.14em] text-[#b7c0bb]">
                  Codex
                </span>
              </div>
              <pre className="mt-5 overflow-x-auto whitespace-pre-wrap break-words rounded-2xl border border-[#34413d] bg-[#0b1210] p-5 font-mono text-sm leading-7 text-[#d8e6f7]">
                <code>{project.installCommand}</code>
              </pre>
              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#a8c7ee]">
                  The engineering layer around delivery
                </p>
                <ol className="mt-4 divide-y divide-[#34413d] border-y border-[#34413d]">
                  {skillGroups.map((group, index) => (
                    <li key={group} className="flex items-center gap-4 py-4">
                      <span className="font-mono text-xs text-[#7ea5d4]">
                        0{index + 1}
                      </span>
                      <span className="font-semibold">{group}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
