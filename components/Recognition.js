import React from "react";
import Link from "next/link";
import PageIntro from "./PageIntro";
import Icon from "./Icon";

const groups = [
  { id: "distinctions", label: "Awards & distinctions", entries: [
    { title: "UiPath MVP", organization: "UiPath", year: "2024–present", detail: "Three-time recognition for technical contribution and community leadership.", href: "https://www.uipath.com/community/mvp" },
    { title: "Risk Orbit", organization: "UiPath Specialist Coded Agent Challenge", year: "Top 7", detail: "A multi-agent supply-chain risk system recognized in a global technical challenge.", href: "/work#risk-orbit", internal: true },
    { title: "AI Innovation Award finalist", organization: "TechX Awards", year: "Finalist", detail: "Recognition for applied AI innovation.", href: "https://www.chattanoogapulse.com/local-news/business-news/chatech-announces-finalists-for-the-6th-annual-techx-awards/" },
  ]},
  { id: "judging", label: "Judging & review", entries: [
    { title: "Business Awards judge", organization: "Globee Awards", year: "2024", detail: "Selected to evaluate technology and business award submissions.", href: "https://globeeawards.com/2024-business-awards-judge/" },
    { title: "Hackathon judge", organization: "HackSharks 2.0", year: "Public program", detail: "Reviewed and evaluated hackathon submissions.", href: "https://hacksharks-2-0.devpost.com/" },
  ]},
  { id: "media", label: "Media & public contribution", entries: [
    { title: "AI-agent liability coverage", organization: "Wired", year: "Media feature", detail: "Featured in reporting on accountability and liability for autonomous AI agents.", href: "https://www.wired.com/story/ai-agents-legal-liability-issues/" },
    { title: "Public speaking", organization: "Technical and community events", year: "Ongoing", detail: "Sessions, interviews, and education on AI, automation, and solution architecture.", href: "/speaking", internal: true },
    { title: "Technical writing", organization: "Industry publications", year: "Ongoing", detail: "Published perspectives on machine learning, agentic systems, and applied practice.", href: "/insights", internal: true },
  ]},
];

export default function Recognition() {
  return <><PageIntro eyebrow="Recognition" title="Contribution recognized in public." aside="Each entry links to an organization, event, publication, or supporting page.">Selected distinctions, judging work, media coverage, and public contribution across AI and automation.</PageIntro><section className="site-container page-section space-y-16">{groups.map((group) => <section key={group.id} id={group.id} className="scroll-mt-28"><div className="flex items-center gap-4"><h2 className="eyebrow">{group.label}</h2><span className="h-px flex-1 bg-[#d8ddd8] dark:bg-[#34413d]" /></div><div className={`mt-6 grid gap-5 ${group.entries.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>{group.entries.map((entry) => {
    const body = <><div className="flex items-start justify-between gap-4"><p className="eyebrow">{entry.organization}</p><span className="text-xs font-semibold text-[#5f6864] dark:text-[#b7c0bb]">{entry.year}</span></div><h3 className="mt-4 text-2xl transition group-hover:text-[#174b8b] dark:group-hover:text-[#a8c7ee]">{entry.title}</h3><p className="mt-3 leading-7 text-[#5f6864] dark:text-[#b7c0bb]">{entry.detail}</p><span className="mt-auto flex min-h-[44px] items-center gap-2 pt-6 text-sm font-semibold text-[#174b8b] dark:text-[#a8c7ee]">View evidence <Icon name={entry.internal ? "arrowRight" : "arrowUpRight"} /></span></>;
    const classes = "paper-card group flex min-h-[275px] flex-col transition hover:-translate-y-1 hover:border-[#91aed2]";
    return entry.internal ? <Link key={entry.title} href={entry.href} className={classes}>{body}</Link> : <a key={entry.title} href={entry.href} target="_blank" rel="noopener noreferrer" className={classes}>{body}</a>;
  })}</div></section>)}</section></>;
}
