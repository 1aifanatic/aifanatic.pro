import ContainerBlock from "@components/ContainerBlock";
import PageIntro from "@components/PageIntro";
import Icon from "@components/Icon";
import userData from "@constants/data";

const { contributions } = userData;
const mergedCount = contributions.projects.reduce((sum, project) => sum + project.merged.length, 0);
const projectCount = contributions.projects.filter((project) => project.merged.length).length;

export default function OpenSource() {
  return (
    <ContainerBlock title="Open Source - Naveen Chatlapalli" description={contributions.description} image="/og-open-source.png">
      <PageIntro eyebrow="Open-source contributions" title={contributions.title} aside={`Verified on ${contributions.checkedOn}. Counts reflect public upstream pull requests, excluding my own repositories and organizations.`}>
        {contributions.description}
      </PageIntro>
      <section className="site-container page-section">
        <div className="grid gap-6 border-b border-[#d8ddd8] pb-10 dark:border-[#34413d] sm:grid-cols-3">
          <div><p className="text-5xl font-serif">{mergedCount}</p><p className="mt-2 text-sm">Merged pull requests</p></div>
          <div><p className="text-5xl font-serif">{projectCount}</p><p className="mt-2 text-sm">Upstream projects with merged work</p></div>
          <div><p className="eyebrow">The through line</p><p className="mt-3 leading-7 text-[#5f6864] dark:text-[#b7c0bb]">{contributions.focus}</p></div>
        </div>
        <h2 className="section-title mt-12">What the contributions changed.</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {contributions.highlights.map((item) => (
            <article key={item.url} className="paper-card flex flex-col">
              <div className="flex flex-wrap items-center justify-between gap-3"><p className="eyebrow">{item.project}</p><span className="rounded-full bg-[#e9eff8] px-3 py-1 text-xs font-semibold text-[#174b8b] dark:bg-[#203a5a] dark:text-[#a8c7ee]">Merged</span></div>
              <h3 className="mt-5 text-2xl">{item.title}</h3>
              <p className="mt-4 leading-7 text-[#5f6864] dark:text-[#b7c0bb]">{item.description}</p>
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="source-label mt-auto pt-6">Read merged PR #{item.number} <Icon name="arrowUpRight" /></a>
            </article>
          ))}
        </div>
      </section>
      <section className="site-container page-section border-t border-[#d8ddd8] dark:border-[#34413d]" id="projects">
        <p className="eyebrow">Contribution record</p><h2 className="section-title mt-4">Across the ecosystem.</h2>
        <p className="mt-4 max-w-2xl leading-7 text-[#5f6864] dark:text-[#b7c0bb]">Merged work and open proposals are listed separately. Each count links to its recorded pull requests; open proposals may still change or close without merging.</p>
        <div className="mt-8 space-y-4">
          {contributions.projects.map((project) => (
            <article key={project.repo} className="paper-card grid gap-5 lg:grid-cols-[1fr_2fr]">
              <div><a href={`https://github.com/${project.repo}`} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-[#174b8b] dark:text-[#a8c7ee]">{project.name} <span aria-hidden="true">↗</span></a><p className="mt-2 text-sm leading-6 text-[#5f6864] dark:text-[#b7c0bb]">{project.focus}</p></div>
              <div className="space-y-3 text-sm">
                {[['merged', 'Merged'], ['open', 'Open proposals']].map(([key, label]) => project[key].length > 0 && (
                  <div key={key}><p className="font-semibold">{label} · {project[key].length}</p><div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">{project[key].map((pr) => <a key={pr.number} href={`https://github.com/${project.repo}/pull/${pr.number}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[36px] items-center underline decoration-[#b9cce5] underline-offset-4" title={pr.title} aria-label={`${project.name} PR ${pr.number}: ${pr.title}`}>#{pr.number}</a>)}</div></div>
                ))}
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 text-sm text-[#5f6864] dark:text-[#b7c0bb]">Snapshot: {contributions.checkedOn}. Open-source contributions and technical opinions are my own.</p>
        <a href={contributions.activityUrl} target="_blank" rel="noopener noreferrer" className="button-primary mt-6">Follow my GitHub activity <Icon name="arrowUpRight" /></a>
      </section>
    </ContainerBlock>
  );
}
