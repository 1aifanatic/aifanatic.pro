import React from "react";
import Link from "next/link";
import Icon from "./Icon";

export default function AboutMe() {
  return <section className="site-container page-section">
    <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
      <div><p className="eyebrow">How I work</p><h2 className="section-title mt-4">Architecture that connects ambition to dependable delivery.</h2></div>
      <div><p className="text-xl leading-9 text-[#46514c] dark:text-[#c5cec8]">I connect business goals, architecture decisions, and delivery constraints. My focus is the hard part after the prototype: governing AI agents, designing maintainable automation, and helping technical teams move with clarity.</p><div className="mt-7 flex flex-wrap gap-5"><Link href="/experience" className="source-label">View experience <Icon name="arrowRight" /></Link><Link href="/about" className="source-label">Read my profile <Icon name="arrowRight" /></Link></div></div>
    </div>
  </section>;
}
