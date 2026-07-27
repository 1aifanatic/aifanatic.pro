import React from "react";
import Link from "next/link";
import userData from "@constants/data";

export default function AboutMe() {
  return <section className="site-container page-section">
    <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
      <div><p className="eyebrow">How I work</p><h2 className="section-title mt-4">Technical depth, clear decisions, useful outcomes.</h2></div>
      <div><p className="text-xl leading-9 text-[#46514c] dark:text-[#c5cec8]">{userData.about.title1} I focus on the hard part after the prototype: shaping responsible, maintainable systems that help real teams move forward.</p><div className="mt-7 flex flex-wrap gap-3"><Link href="/experience" className="text-link">Career progression →</Link><Link href="/about" className="text-link">Read my profile →</Link></div></div>
    </div>
  </section>;
}
