import React from "react";
import Link from "next/link";
import PageIntro from "./PageIntro";
import Icon from "./Icon";
import userData from "@constants/data";

function ExternalEntry({ entry, action = "Read" }) {
  return <a href={entry.link} target="_blank" rel="noopener noreferrer" className="group grid min-h-[112px] gap-3 border-b border-[#d8ddd8] py-5 transition hover:px-3 dark:border-[#34413d]"><div className="flex flex-wrap items-baseline justify-between gap-3"><h3 className="max-w-xl text-xl transition group-hover:text-[#174b8b] dark:group-hover:text-[#a8c7ee]">{entry.title}</h3><span className="text-xs font-semibold uppercase tracking-[.13em] text-[#5f6864] dark:text-[#b7c0bb]">{entry.date || "Archive"}</span></div><p className="flex items-center gap-2 text-sm text-[#5f6864] dark:text-[#b7c0bb]">{entry.source} · {action} <Icon name="arrowUpRight" /></p></a>;
}

export default function Insights() {
  const featuredArticles = (userData.blogs || []).slice(0, 3);
  const writing = userData.blogpost.slice(0, 5);
  const media = [...userData.talks.slice(0, 3), ...userData.video.slice(0, 3)];
  return <><PageIntro eyebrow="Insights" title="Ideas from building systems in practice.">Writing, talks, and technical explainers on solution architecture, AI agents, automation, evaluation, and responsible delivery.</PageIntro>
    <section className="site-container page-section"><div className="flex items-end justify-between gap-4"><div><p className="eyebrow">Featured writing</p><h2 className="section-title mt-4">Current perspectives</h2></div><Link href="/blog" className="source-label">Article archive <Icon name="arrowRight" /></Link></div><div className="mt-8 grid gap-5 lg:grid-cols-3">{featuredArticles.map((article) => <Link key={article.slug} href={`/blog/${article.slug}`} className="paper-card group flex min-h-[300px] flex-col transition hover:-translate-y-1 hover:border-[#91aed2]"><div className="flex items-start justify-between gap-3"><p className="eyebrow">{article.category}</p><span className="text-xs text-[#5f6864] dark:text-[#b7c0bb]">{article.date}</span></div><h3 className="mt-4 text-2xl transition group-hover:text-[#174b8b] dark:group-hover:text-[#a8c7ee]">{article.title}</h3><p className="mt-3 line-clamp-3 leading-7 text-[#5f6864] dark:text-[#b7c0bb]">{article.excerpt}</p><span className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-[#174b8b] dark:text-[#a8c7ee]">Read article <Icon name="arrowRight" /></span></Link>)}</div></section>
    <section className="border-t border-[#d8ddd8] bg-white/60 dark:border-[#34413d] dark:bg-[#18211f]/50"><div className="site-container page-section"><div className="grid gap-12 lg:grid-cols-2"><div><p className="eyebrow">Published writing</p><h2 className="mt-3 text-3xl">Across technical platforms</h2><div className="mt-5">{writing.map((entry) => <ExternalEntry key={entry.link} entry={entry} />)}</div></div><div><div className="flex items-end justify-between gap-4"><div><p className="eyebrow">Watch & listen</p><h2 className="mt-3 text-3xl">Talks and explainers</h2></div><Link href="/speaking" className="source-label">Speaking <Icon name="arrowRight" /></Link></div><div className="mt-5">{media.map((entry) => <ExternalEntry key={entry.link} entry={entry} action="Watch" />)}</div></div></div></div></section>
  </>;
}
