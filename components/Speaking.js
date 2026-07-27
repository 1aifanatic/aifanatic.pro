import React from "react";
import Link from "next/link";
import PageIntro from "./PageIntro";
import Icon from "./Icon";
import ArchiveList from "./ArchiveList";
import userData from "@constants/data";

const topics = ["Enterprise AI agents", "Solution architecture", "Agentic automation", "Responsible production systems"];

export default function Speaking() {
  return <><PageIntro eyebrow="Speaking" title="Teaching the practical side of AI." aside="Available for technical sessions, panels, workshops, and community education.">Sessions and conversations focused on the architecture, delivery, and governance choices behind useful AI systems.</PageIntro><section className="site-container page-section"><div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]"><div className="paper-card bg-[#e9eff8] dark:bg-[#172c3c]"><p className="eyebrow">Speaker profile</p><h2 className="mt-4 text-4xl">Sessions grounded in delivery experience.</h2><p className="mt-4 max-w-2xl leading-7 text-[#46514c] dark:text-[#c5cec8]">Talks are shaped for builders and leaders who need practical patterns, honest tradeoffs, and a path from experimentation to operation.</p><a href="https://sessionize.com/aifanatic/" target="_blank" rel="noopener noreferrer" className="source-label mt-6">View Sessionize profile <Icon name="arrowUpRight" /></a></div><div className="paper-card"><p className="eyebrow">Core topics</p><ul className="mt-5 divide-y divide-[#d8ddd8] dark:divide-[#34413d]">{topics.map((topic) => <li key={topic} className="py-4 font-semibold">{topic}</li>)}</ul></div></div><div className="mt-10"><Link href="/contact" className="button-primary">Discuss a session <Icon name="arrowRight" /></Link></div></section><ArchiveList eyebrow="Session archive" title="Selected talks and interviews." lede="Recordings and event appearances across automation, AI, and applied technical practice." entries={userData.talks} action="Watch" showIntro={false} /></>;
}
