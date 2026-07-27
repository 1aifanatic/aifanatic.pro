import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ContainerBlock from "@components/ContainerBlock";
import Icon from "@components/Icon";
import userData from "@constants/data";

const plainText = (html = "") => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const slugify = (value = "") => plainText(value).toLowerCase().replace(/&[^;]+;/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const enhanceHeadings = (html = "") => {
  const headings = [];
  const content = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, title) => { const id = slugify(title); headings.push({ id, title: plainText(title) }); return `<h2 id="${id}" class="scroll-mt-28">${title}</h2>`; });
  return { content, headings };
};

export default function BlogPost() {
  const router = useRouter();
  const posts = userData.blogs || [];
  const post = posts.find((item) => item.slug === router.query.slug);
  if (!post) return <ContainerBlock title="Article not found — Naveen Chatlapalli"><section className="site-container page-section"><p className="eyebrow">Archive</p><h1 className="display-title">That article is not available.</h1><Link href="/blog" className="button-primary mt-8">Browse articles <Icon name="arrowRight" /></Link></section></ContainerBlock>;
  const { content, headings } = enhanceHeadings(post.content);
  const minutes = Math.max(1, Math.ceil(plainText(post.content).split(/\s+/).length / 220));
  const related = posts.filter((item) => item.slug !== post.slug && (item.category === post.category || item.tags?.some((tag) => post.tags?.includes(tag)))).slice(0, 2);
  return <ContainerBlock title={`${post.title} — Naveen Chatlapalli`} description={post.excerpt || "Article by Naveen Chatlapalli."} date={post.date}><article className="site-container page-section"><div className="mx-auto max-w-6xl"><Link href="/blog" className="source-label">← All articles</Link><div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_260px]"><div className="min-w-0"><p className="eyebrow">{post.category || "Article"}</p><h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[1.02] tracking-[-.04em] sm:text-6xl">{post.title}</h1><div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[#5f6864] dark:text-[#b7c0bb]"><span>By Naveen Chatlapalli</span><span aria-hidden="true">·</span><span>{post.date}</span><span aria-hidden="true">·</span><span>{minutes} min read</span></div>{post.tags?.length > 0 && <div className="mt-5 flex flex-wrap gap-2">{post.tags.map((tag) => <span key={tag} className="topic-chip">{tag}</span>)}</div>}{post.excerpt && <p className="mt-8 max-w-3xl text-xl leading-9 text-[#46514c] dark:text-[#c5cec8]">{post.excerpt}</p>}<div className="article-copy mt-12 max-w-3xl" dangerouslySetInnerHTML={{ __html: content }} /></div>{headings.length > 2 && <aside className="hidden lg:block"><nav className="sticky top-28 border-l border-[#d8ddd8] pl-5 dark:border-[#34413d]" aria-label="Table of contents"><p className="eyebrow">On this page</p><ol className="mt-4 space-y-3">{headings.map((heading) => <li key={heading.id}><a href={`#${heading.id}`} className="text-sm leading-5 text-[#5f6864] hover:text-[#174b8b] dark:text-[#b7c0bb] dark:hover:text-[#a8c7ee]">{heading.title}</a></li>)}</ol></nav></aside>}</div>{related.length > 0 && <section className="mt-16 border-t border-[#d8ddd8] pt-10 dark:border-[#34413d]"><p className="eyebrow">Continue reading</p><div className="mt-6 grid gap-5 sm:grid-cols-2">{related.map((item) => <Link key={item.slug} href={`/blog/${item.slug}`} className="paper-card group"><h2 className="text-2xl transition group-hover:text-[#174b8b] dark:group-hover:text-[#a8c7ee]">{item.title}</h2><span className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#174b8b] dark:text-[#a8c7ee]">Read next <Icon name="arrowRight" /></span></Link>)}</div></section>}</div></article></ContainerBlock>;
}
