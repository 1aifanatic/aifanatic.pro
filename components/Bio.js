import React from "react";
import Link from "next/link";
import PageIntro from "./PageIntro";
import Icon from "./Icon";
import userData from "@constants/data";

const sections = [
  { label: "Current focus", text: "I lead solution architecture for enterprise automation and AI programs, connecting technical strategy, governance, and delivery." },
  { label: "Career", text: "My path spans software development, applied machine learning, automation engineering, agentic AI architecture, and technical leadership." },
  { label: "Community", text: "I contribute through technical writing, public speaking, the UiPath Dallas community, Toastmasters, and volunteer teaching." },
  { label: "Education", text: "M.S. in Computer Science from San Francisco Bay University, with undergraduate studies at Jawaharlal Nehru Technological University, Kakinada." },
];

export default function Bio() {
  return <><PageIntro eyebrow="About" title="A systems-minded approach to useful AI.">I design the conditions that help enterprise automation and AI-agent systems move from promising prototypes to dependable practice.</PageIntro><section className="site-container page-section"><div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
    <aside className="space-y-5"><div className="paper-card"><p className="eyebrow">At a glance</p><dl className="mt-5 space-y-5 text-sm"><div><dt className="text-[#5f6864] dark:text-[#b7c0bb]">Current role</dt><dd className="mt-1 font-semibold">{userData.designation}</dd></div><div><dt className="text-[#5f6864] dark:text-[#b7c0bb]">Based in</dt><dd className="mt-1 font-semibold">{userData.address}</dd></div><div><dt className="text-[#5f6864] dark:text-[#b7c0bb]">Focus</dt><dd className="mt-1 font-semibold">Solution architecture · AI agents</dd></div></dl></div><div className="paper-card" id="resources"><p className="eyebrow">Profiles & resources</p><div className="mt-4 grid"><Link className="source-label" href="/work">Selected work <Icon name="arrowRight" /></Link><Link className="source-label" href="/insights">Writing and talks <Icon name="arrowRight" /></Link><a className="source-label" target="_blank" rel="noopener noreferrer" href={userData.socialLinks.linkedin}>LinkedIn <Icon name="arrowUpRight" /></a><a className="source-label" target="_blank" rel="noopener noreferrer" href={userData.socialLinks.github}>GitHub <Icon name="arrowUpRight" /></a><a className="source-label" href={userData.resumeUrl} download>Download CV <Icon name="download" /></a></div></div></aside>
    <article><p className="eyebrow">Profile</p><div className="mt-5 grid gap-5 sm:grid-cols-2">{sections.map((section) => <section key={section.label} className="border-t border-[#d8ddd8] pt-5 dark:border-[#34413d]"><h2 className="text-2xl">{section.label}</h2><p className="mt-3 leading-7 text-[#46514c] dark:text-[#c5cec8]">{section.text}</p></section>)}</div>
      <div className="mt-10 rounded-[1.35rem] border border-[#b9cce5] bg-[#e9eff8] p-6 dark:border-[#315169] dark:bg-[#172c3c] sm:p-8"><p className="eyebrow">Niche expertise</p><h2 className="mt-4 text-3xl">Agentic Automation Architect</h2><p className="mt-4 leading-7 text-[#46514c] dark:text-[#c5cec8]">Enterprise-grade AI agents for business process automation - designed, delivered, and operated with governance.</p><ul className="mt-5 space-y-3">{userData.expertise.map((point) => <li key={point} className="flex items-start gap-3 text-sm leading-6 text-[#46514c] dark:text-[#c5cec8]"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#174b8b] dark:bg-[#a8c7ee]" />{point}</li>)}</ul></div><div className="mt-10 border-t border-[#d8ddd8] pt-7 dark:border-[#34413d]"><a href={`mailto:${userData.email}`} className="button-primary">Start a conversation <Icon name="arrowRight" /></a></div></article>
  </div></section></>;
}
