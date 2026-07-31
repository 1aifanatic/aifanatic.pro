import React from "react";
import Link from "next/link";
import PageIntro from "./PageIntro";
import Icon from "./Icon";
import UiPathBoostFeature from "./UiPathBoostFeature";
import userData from "@constants/data";

const caseStudy = {
  title: "Risk Orbit",
  problem: "Supply-chain teams need to turn fragmented risk signals into timely decisions without losing the context required for responsible action.",
  role: "Solution architecture and lead development",
  scope: "Agent orchestration, context grounding, risk synthesis, and automation workflow design.",
  architecture: ["Parallel signal collection", "MCP-based context grounding", "Specialized analysis agents", "Human-readable risk brief"],
  outcome: "Top 7 winner in the UiPath Specialist Coded Agent Challenge.",
  links: [
    { label: "Read the Ashling case study", url: "https://ashling.ai/resources/risk-orbit-uipath-coded-agents-meet-real-world-supply-chain-risk" },
    { label: "Review the UiPath technical discussion", url: "https://forum.uipath.com/t/risk-orbit-uipath-coded-agent-with-langchain-mcp-context-grounding-uipath-sdk-supported/5676124" },
  ],
};

const featuredIds = [1, 4, 15, 18, 21, 3];

export default function Work() {
  const products = featuredIds.map((id) => userData.solopreneurProjects.find((project) => project.id === id)).filter(Boolean);
  return <>
    <PageIntro eyebrow="Selected work" title="Architecture made tangible." aside="Featured work is limited to projects with a public destination or supporting source.">A curated set of systems and products spanning enterprise automation, AI agents, and independent product development.</PageIntro>
    <UiPathBoostFeature bordered={false} />
    <section className="site-container page-section" id="risk-orbit">
      <article className="paper-card overflow-hidden p-0">
        <div className="grid lg:grid-cols-[.78fr_1.22fr]">
          <div className="bg-[#e9eff8] p-7 dark:bg-[#172c3c] sm:p-10">
            <p className="eyebrow">Featured case study · Applied AI</p><h2 className="mt-4 text-5xl">{caseStudy.title}</h2>
            <p className="mt-6 leading-8 text-[#46514c] dark:text-[#c5cec8]">{caseStudy.problem}</p>
            <dl className="mt-10 space-y-5 border-t border-[#b9cce5] pt-6 dark:border-[#315169]"><div><dt className="eyebrow">Role</dt><dd className="mt-2 font-semibold">{caseStudy.role}</dd></div><div><dt className="eyebrow">Scope</dt><dd className="mt-2 leading-7 text-[#46514c] dark:text-[#c5cec8]">{caseStudy.scope}</dd></div></dl>
          </div>
          <div className="p-7 sm:p-10">
            <p className="eyebrow">System path</p>
            <ol className="mt-6 grid gap-3 sm:grid-cols-2">{caseStudy.architecture.map((item, index) => <li key={item} className="rounded-2xl border border-[#d8ddd8] p-5 dark:border-[#34413d]"><span className="text-xs font-semibold text-[#174b8b] dark:text-[#a8c7ee]">0{index + 1}</span><p className="mt-2 font-semibold">{item}</p></li>)}</ol>
            <div className="mt-8 rounded-xl border-l-2 border-[#174b8b] bg-[#f8f7f3] p-5 dark:bg-[#111716]"><p className="eyebrow">Verified outcome</p><p className="mt-3 leading-7 text-[#46514c] dark:text-[#c5cec8]">{caseStudy.outcome}</p></div>
            <div className="mt-7 flex flex-wrap gap-x-6">{caseStudy.links.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="source-label">{link.label} <Icon name="arrowUpRight" /></a>)}</div>
          </div>
        </div>
      </article>
    </section>
    <section className="border-t border-[#d8ddd8] bg-white/60 dark:border-[#34413d] dark:bg-[#18211f]/50"><div className="site-container page-section">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">Selected products</p><h2 className="section-title mt-4">Independent work with a clear purpose.</h2></div><Link href="/solopreneur-projects" className="source-label">Browse the experiments archive <Icon name="arrowRight" /></Link></div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{products.map((project) => <a key={project.id} href={project.url.startsWith("http") ? project.url : `https://${project.url}`} target="_blank" rel="noopener noreferrer" className="paper-card group flex min-h-[270px] flex-col transition hover:-translate-y-1 hover:border-[#91aed2]"><div className="flex items-start justify-between gap-4"><p className="eyebrow">{project.category}</p><Icon name="arrowUpRight" className="h-5 w-5 text-[#174b8b] dark:text-[#a8c7ee]" /></div><h3 className="mt-4 text-2xl transition group-hover:text-[#174b8b] dark:group-hover:text-[#a8c7ee]">{project.name}</h3><p className="mt-3 leading-7 text-[#5f6864] dark:text-[#b7c0bb]">{project.description}</p><p className="mt-auto pt-6 text-xs font-semibold uppercase tracking-[.13em] text-[#5f6864] dark:text-[#b7c0bb]">{project.stage}</p></a>)}</div>
    </div></section>
  </>;
}
