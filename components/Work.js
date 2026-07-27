import React from "react";
import PageIntro from "./PageIntro";
import userData from "@constants/data";

const caseStudy = {
  title: "Risk Orbit",
  label: "Selected case study · Applied AI",
  problem: "Supply-chain risk teams need to make sense of fragmented signals quickly, without losing the context needed for responsible action.",
  role: "Solution architecture & lead development",
  approach: ["Multi-agent workflow built with UiPath Coded Agents and LangChain", "Context grounding through MCP for more reliable risk assessment", "Parallel data aggregation and automation workflows for timely response"],
  outcome: "Recognized as a Top 7 winner in the UiPath Specialist Coded Agent Challenge.",
  links: [{ label: "Read the Ashling case study", url: "https://ashling.ai/resources/risk-orbit-uipath-coded-agents-meet-real-world-supply-chain-risk" }, { label: "View the UiPath discussion", url: "https://forum.uipath.com/t/risk-orbit-uipath-coded-agent-with-langchain-mcp-context-grounding-uipath-sdk-supported/5676124" }],
};

export default function Work() {
  const products = (userData.solopreneurProjects || []).slice(0, 4);
  return <><PageIntro eyebrow="Selected work" title="From architecture to systems people can use." aside="Each featured item includes context and a source where one is available.">I work across enterprise automation, agentic AI, and independent products—with a bias toward practical delivery.</PageIntro>
    <section className="site-container page-section"><article className="paper-card overflow-hidden p-0"><div className="grid lg:grid-cols-[.78fr_1.22fr]"><div className="bg-[#e9eff8] p-7 dark:bg-[#172c3c] sm:p-10"><p className="eyebrow">{caseStudy.label}</p><h2 className="mt-4 text-4xl">{caseStudy.title}</h2><p className="mt-5 leading-8 text-[#46514c] dark:text-[#c5cec8]">{caseStudy.problem}</p><div className="mt-10 border-t border-[#b9cce5] pt-5 dark:border-[#315169]"><p className="text-[11px] font-semibold uppercase tracking-[.16em] text-[#174b8b] dark:text-[#a8c7ee]">Role</p><p className="mt-2 font-semibold">{caseStudy.role}</p></div></div><div className="p-7 sm:p-10"><p className="eyebrow">Approach</p><ul className="mt-5 space-y-4">{caseStudy.approach.map((item) => <li key={item} className="flex gap-3 leading-7 text-[#46514c] dark:text-[#c5cec8]"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#174b8b] dark:bg-[#a8c7ee]" />{item}</li>)}</ul><div className="mt-8 rounded-xl border-l-2 border-[#174b8b] bg-[#f8f7f3] p-5 dark:bg-[#111716]"><p className="text-sm font-semibold">Outcome</p><p className="mt-2 leading-7 text-[#46514c] dark:text-[#c5cec8]">{caseStudy.outcome}</p></div><div className="mt-8 flex flex-wrap gap-4">{caseStudy.links.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="text-link">{link.label} ↗</a>)}</div></div></div></article></section>
    <section className="border-t border-[#d8ddd8] bg-white/60 dark:border-[#34413d] dark:bg-[#18211f]/50"><div className="site-container page-section"><p className="eyebrow">Independent products</p><h2 className="section-title mt-4">Ideas taken into the world.</h2><div className="mt-10 grid gap-5 md:grid-cols-2">{products.map((project) => <a key={project.id} href={project.url.startsWith("http") ? project.url : `https://${project.url}`} target="_blank" rel="noopener noreferrer" className="paper-card group transition hover:-translate-y-1 hover:border-[#91aed2]"><div className="flex items-start justify-between gap-4"><h3 className="text-2xl">{project.name}</h3><span className="text-[#174b8b] transition group-hover:translate-x-1 dark:text-[#a8c7ee]">↗</span></div><p className="mt-3 leading-7 text-[#5f6864] dark:text-[#b7c0bb]">{project.description}</p><p className="mt-5 text-xs font-semibold uppercase tracking-[.14em] text-[#5f6864] dark:text-[#b7c0bb]">{project.category} · {project.stage}</p></a>)}</div></div></section></>;
}
