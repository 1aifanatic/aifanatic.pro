import React, { useMemo, useState } from "react";
import Link from "next/link";
import ContainerBlock from "@components/ContainerBlock";
import PageIntro from "@components/PageIntro";
import Icon from "@components/Icon";
import userData from "@constants/data";

const readingTime = (content = "") => Math.max(1, Math.ceil(content.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length / 220));

export default function Blog() {
  const [query, setQuery] = useState("");
  const blogs = userData.blogs || [];
  const featured = blogs[0];
  const results = useMemo(() => { const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean); return blogs.filter((blog) => terms.every((term) => [blog.title, blog.excerpt, blog.category, ...(blog.tags || [])].filter(Boolean).join(" ").toLowerCase().includes(term))); }, [blogs, query]);
  return <ContainerBlock title="Articles — Naveen Chatlapalli" description="Articles on AI agents, solution architecture, automation, and applied technology."><PageIntro eyebrow="Article archive" title="Longer notes on systems that matter.">Writing on agentic AI, automation, evaluation, and the practical work of making technology dependable.</PageIntro><section className="site-container page-section">
    {featured && <Link href={`/blog/${featured.slug}`} className="paper-card group mb-12 grid gap-8 bg-[#e9eff8] transition hover:border-[#91aed2] dark:bg-[#172c3c] lg:grid-cols-[.7fr_1.3fr]"><div><p className="eyebrow">Featured article</p><p className="mt-4 text-sm text-[#5f6864] dark:text-[#b7c0bb]">{featured.date} · {readingTime(featured.content)} min read</p></div><div><h2 className="text-4xl transition group-hover:text-[#174b8b] dark:group-hover:text-[#a8c7ee]">{featured.title}</h2><p className="mt-4 leading-7 text-[#5f6864] dark:text-[#b7c0bb]">{featured.excerpt}</p><span className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#174b8b] dark:text-[#a8c7ee]">Read article <Icon name="arrowRight" /></span></div></Link>}
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">Browse the archive</p><p className="mt-3 text-sm text-[#5f6864] dark:text-[#b7c0bb]">{results.length} article{results.length === 1 ? "" : "s"}</p></div><label className="relative block w-full max-w-xl"><span className="sr-only">Search articles</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search articles and topics" className="min-h-[48px] w-full rounded-full border border-[#c7cfca] bg-white px-5 py-3 text-sm text-[#18211f] placeholder:text-[#7a847e] dark:border-[#46514c] dark:bg-[#18211f] dark:text-[#eef1ed]" /></label></div>
    <div className="mt-6 divide-y divide-[#d8ddd8] border-y border-[#d8ddd8] dark:divide-[#34413d] dark:border-[#34413d]">{results.map((blog) => <Link key={blog.slug} href={`/blog/${blog.slug}`} className="group block py-7 transition hover:bg-white/70 hover:px-5 dark:hover:bg-[#18211f]/50"><div className="flex flex-wrap items-center justify-between gap-3"><p className="eyebrow">{blog.category || "Article"}</p><p className="text-sm text-[#5f6864] dark:text-[#b7c0bb]">{blog.date} · {readingTime(blog.content)} min read</p></div><h2 className="mt-3 max-w-4xl text-3xl transition group-hover:text-[#174b8b] dark:group-hover:text-[#a8c7ee]">{blog.title}</h2>{blog.excerpt && <p className="mt-3 max-w-3xl leading-7 text-[#5f6864] dark:text-[#b7c0bb]">{blog.excerpt}</p>}<p className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#174b8b] dark:text-[#a8c7ee]">Read article <Icon name="arrowRight" /></p></Link>)}</div>
  </section></ContainerBlock>;
}
