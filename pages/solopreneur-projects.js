import React, { useMemo, useState } from "react";
import ContainerBlock from "@components/ContainerBlock";
import PageIntro from "@components/PageIntro";
import Icon from "@components/Icon";
import userData from "@constants/data";

const groups = {
  "AI & Automation": ["AI Documentation", "AI Marketplace", "Enterprise AI", "Content Generation", "Finance", "Business Tools"],
  "Products & Productivity": ["Productivity", "Startup Platform", "Management Tool", "CRM", "E-commerce", "Social Media", "Event Management"],
};
const groupFor = (category) => Object.entries(groups).find(([, categories]) => categories.includes(category))?.[0] || "Experiments";
// Community, learning, and browser projects are hidden - they don't support the agentic automation niche.

export default function SolopreneurProjects() {
  const [filter, setFilter] = useState("All");
  const projects = useMemo(() => (userData.solopreneurProjects || []).filter((project) => filter === "All" || groupFor(project.category) === filter), [filter]);
  const filters = ["All", ...Object.keys(groups)];
  return <ContainerBlock title="Independent products - Naveen Chatlapalli" description="Independent products and experiments by Naveen Chatlapalli."><PageIntro eyebrow="Product archive" title="Independent products, clearly organized." aside="Featured and live work appears first; early experiments remain available as a secondary record.">An evolving collection of AI, productivity, business, and community tools built outside client work.</PageIntro><section className="site-container page-section"><div className="flex flex-wrap gap-2" role="group" aria-label="Filter products">{filters.map((category) => <button key={category} type="button" onClick={() => setFilter(category)} aria-pressed={filter === category} className={`min-h-[44px] rounded-full border px-4 py-2 text-sm font-semibold transition ${filter === category ? "border-[#174b8b] bg-[#174b8b] text-white dark:border-[#a8c7ee] dark:bg-[#a8c7ee] dark:text-[#18211f]" : "border-[#d8ddd8] text-[#46514c] hover:border-[#174b8b] dark:border-[#46514c] dark:text-[#c5cec8]"}`}>{category}</button>)}</div><p className="mt-5 text-sm text-[#5f6864] dark:text-[#b7c0bb]">Showing {projects.length} projects</p><div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{projects.map((project) => <a key={project.id} href={project.url.startsWith("http") ? project.url : `https://${project.url}`} target="_blank" rel="noopener noreferrer" className="paper-card group flex min-h-[270px] flex-col transition hover:-translate-y-1 hover:border-[#91aed2]"><div className="flex items-start justify-between gap-4"><p className="eyebrow">{groupFor(project.category)}</p><Icon name="arrowUpRight" className="h-5 w-5 text-[#174b8b] dark:text-[#a8c7ee]" /></div><h2 className="mt-4 text-3xl transition group-hover:text-[#174b8b] dark:group-hover:text-[#a8c7ee]">{project.name}</h2><p className="mt-3 leading-7 text-[#5f6864] dark:text-[#b7c0bb]">{project.description}</p><div className="mt-auto flex flex-wrap items-center gap-2 pt-6"><span className="topic-chip">{project.category}</span><span className="topic-chip">{project.stage}</span></div></a>)}</div></section></ContainerBlock>;
}
