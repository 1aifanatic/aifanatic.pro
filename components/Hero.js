import React from "react";
import Link from "next/link";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import userData from "@constants/data";

export default function Hero() {
  return <section className="site-container page-section overflow-hidden lg:pt-24">
    <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_.85fr]">
      <div>
        <p className="eyebrow">Naveen Chatlapalli · Dallas, Texas</p>
        <RoughNotationGroup show={true}>
          <h1 className="display-title">AI product and applied-ML leadership for <RoughNotation type="underline" color="#91aed2" strokeWidth={2} padding={2}>practical systems.</RoughNotation></h1>
        </RoughNotationGroup>
        <p className="page-lede">I lead solution architecture for enterprise automation and AI programs—translating emerging technology into systems that teams can trust, use, and scale.</p>
        <div className="mt-8 flex flex-wrap gap-3"><Link href="/work" className="button-primary">Explore selected work <span aria-hidden="true">→</span></Link><a href={userData.resumeUrl} className="button-secondary" download>Download CV <span aria-hidden="true">↓</span></a></div>
      </div>
      <div className="relative mx-auto w-full max-w-sm lg:justify-self-end">
        <div className="absolute -inset-3 rounded-[2rem] border border-[#c9d6e7] bg-[#e9eff8] dark:border-[#314b65] dark:bg-[#172c3c]" />
        <img src={userData.avatarUrl} alt={`Portrait of ${userData.name}`} className="relative aspect-[4/5] w-full rounded-[1.5rem] object-cover shadow-[0_18px_50px_rgba(24,33,31,.16)]" />
        <p className="relative mt-4 text-right text-xs font-semibold uppercase tracking-[.16em] text-[#5f6864] dark:text-[#b7c0bb]">Enterprise AI · Architecture · Community</p>
      </div>
    </div>
    <div className="mt-16 grid border-y border-[#d8ddd8] py-6 dark:border-[#34413d] sm:grid-cols-2 lg:grid-cols-4">
      {[['3×','UiPath MVP'], ['10+','years in technology'], ['Global','awards judging'], ['Public','talks & writing']].map(([value, label]) => <div key={label} className="border-[#d8ddd8] px-0 py-4 first:pt-0 sm:border-l sm:px-6 sm:first:border-l-0 sm:first:pl-0 lg:py-0 lg:not-last:border-r dark:border-[#34413d]"><p className="font-serif text-3xl text-[#18211f] dark:text-[#eef1ed]">{value}</p><p className="mt-1 text-sm text-[#5f6864] dark:text-[#b7c0bb]">{label}</p></div>)}
    </div>
  </section>;
}
