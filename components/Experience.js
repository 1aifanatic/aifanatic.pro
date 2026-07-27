import React from "react";
import PageIntro from "./PageIntro";
import Icon from "./Icon";
import userData from "@constants/data";

const communityTitles = new Set(["Vice President of Public Relations", "Telugu Teacher (Volunteer)", "UiPath MVP"]);

function Timeline({ entries }) {
  return <ol className="max-w-5xl border-l border-[#c7cfca] dark:border-[#46514c]">{entries.map((exp) => <li key={`${exp.company}-${exp.title}`} className="relative ml-7 pb-8 last:pb-0"><span className="absolute -left-[33px] top-2 h-3.5 w-3.5 rounded-full border-2 border-[#f8f7f3] bg-[#174b8b] dark:border-[#111716] dark:bg-[#a8c7ee]" /><article className="paper-card"><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-sm font-semibold text-[#174b8b] dark:text-[#a8c7ee]">{exp.company}</p><h3 className="mt-2 text-2xl">{exp.title}</h3></div><span className="shrink-0 text-sm font-medium text-[#5f6864] dark:text-[#b7c0bb]">{exp.year}</span></div><p className="mt-5 leading-7 text-[#5f6864] dark:text-[#b7c0bb]">{exp.desc}</p>{exp.companyLink && <a href={exp.companyLink} target="_blank" rel="noopener noreferrer" className="source-label mt-4">Visit {exp.company} <Icon name="arrowUpRight" /></a>}</article></li>)}</ol>;
}

export default function Experience() {
  const professional = userData.experience.filter((entry) => !communityTitles.has(entry.title));
  const community = userData.experience.filter((entry) => communityTitles.has(entry.title));
  return <><PageIntro eyebrow="Experience" title="Technical practice, architecture, and leadership.">A progression from hands-on software development to leading solution architecture for enterprise automation and AI.</PageIntro><section className="site-container page-section"><p className="eyebrow">Professional experience</p><h2 className="section-title mt-4 mb-10">Building and leading across the delivery lifecycle.</h2><Timeline entries={professional} /></section><section className="border-t border-[#d8ddd8] bg-white/60 dark:border-[#34413d] dark:bg-[#18211f]/50"><div className="site-container page-section"><p className="eyebrow">Community leadership</p><h2 className="section-title mt-4 mb-10">Contribution beyond the day-to-day role.</h2><Timeline entries={community} /></div></section></>;
}
