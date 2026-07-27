import React from "react";
import Link from "next/link";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import userData from "@constants/data";
import Icon from "./Icon";

const proofPoints = [
  { value: "3×", label: "UiPath MVP", href: "/recognition#distinctions" },
  { value: "10+", label: "years in technology", href: "/experience" },
  { value: "Global", label: "awards judging", href: "/recognition#judging" },
  { value: "Public", label: "talks & writing", href: "/insights" },
];

export default function Hero() {
  return <section className="site-container page-section overflow-hidden lg:pt-24">
    <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_.85fr]">
      <div>
        <p className="eyebrow">Naveen Chatlapalli · Dallas, Texas</p>
        <RoughNotationGroup show={true}>
          <h1 className="display-title">Solution architecture for AI agents that <RoughNotation type="underline" color="#91aed2" strokeWidth={2} padding={2}>work in the real world.</RoughNotation></h1>
        </RoughNotationGroup>
        <p className="page-lede">I lead enterprise solution architecture across automation and AI—turning agentic ideas into reliable systems that teams can govern, operate, and scale.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/work" className="button-primary">Explore selected work <Icon name="arrowRight" /></Link>
          <a href={userData.resumeUrl} className="button-secondary" download>Download CV <Icon name="download" /></a>
        </div>
      </div>
      <div className="relative mx-auto w-full max-w-sm lg:justify-self-end">
        <div className="absolute -inset-3 rounded-[2rem] border border-[#c9d6e7] bg-[#e9eff8] dark:border-[#314b65] dark:bg-[#172c3c]" />
        <img src={userData.avatarUrl} alt={`Portrait of ${userData.name}`} className="relative aspect-[4/5] w-full rounded-[1.5rem] object-cover shadow-[0_18px_50px_rgba(24,33,31,.16)]" />
        <p className="relative mt-4 text-right text-xs font-semibold uppercase tracking-[.16em] text-[#5f6864] dark:text-[#b7c0bb]">Solution Architecture · AI Agents · Enterprise Automation</p>
      </div>
    </div>
    <div className="mt-12 grid grid-cols-2 border-y border-[#d8ddd8] dark:border-[#34413d] lg:mt-16 lg:grid-cols-4">
      {proofPoints.map((item) => <Link key={item.label} href={item.href} className="group min-h-[112px] border-[#d8ddd8] px-4 py-5 transition hover:bg-white/70 dark:border-[#34413d] dark:hover:bg-[#18211f]/50 sm:px-6 lg:not-last:border-r">
        <p className="font-serif text-3xl text-[#18211f] transition group-hover:text-[#174b8b] dark:text-[#eef1ed] dark:group-hover:text-[#a8c7ee]">{item.value}</p>
        <p className="mt-1 text-sm text-[#5f6864] dark:text-[#b7c0bb]">{item.label}</p>
      </Link>)}
    </div>
  </section>;
}
