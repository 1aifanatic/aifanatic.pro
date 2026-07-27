import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ContainerBlock from "@components/ContainerBlock";
import userData from "@constants/data";

export default function BlogPost() {
  const router = useRouter();
  const post = (userData.blogs || []).find((item) => item.slug === router.query.slug);
  if (!post) return <ContainerBlock title="Article not found — Naveen Chatlapalli"><section className="site-container page-section"><p className="eyebrow">Archive</p><h1 className="display-title">That article is not available.</h1><Link href="/blog" className="button-primary mt-8">Browse articles →</Link></section></ContainerBlock>;
  return <ContainerBlock title={`${post.title} — Naveen Chatlapalli`} description={post.excerpt || "Article by Naveen Chatlapalli."} date={post.date}><article className="site-container page-section"><div className="mx-auto max-w-3xl"><Link href="/blog" className="text-link">← All articles</Link><p className="eyebrow mt-10">{post.category || "Article"}</p><h1 className="display-title">{post.title}</h1><div className="mt-6 flex flex-wrap gap-3 text-sm text-[#5f6864] dark:text-[#b7c0bb]"><span>{post.date}</span>{post.tags?.map((tag) => <span key={tag} className="rounded-full border border-[#d8ddd8] px-3 py-1 dark:border-[#46514c]">{tag}</span>)}</div>{post.excerpt && <p className="mt-8 text-xl leading-9 text-[#46514c] dark:text-[#c5cec8]">{post.excerpt}</p>}<div className="article-copy mt-12" dangerouslySetInnerHTML={{ __html: post.content }} /></div></article></ContainerBlock>;
}
