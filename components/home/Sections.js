import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import userData from "@constants/data";
import Icon from "../Icon";
import { Magnetic } from "./Kinetic";

export const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const contributionTotals = () => {
  const { projects } = userData.contributions;
  return {
    merged: projects.reduce((sum, p) => sum + p.merged.length, 0),
    open: projects.reduce((sum, p) => sum + p.open.length, 0),
    projects: projects.filter((p) => p.merged.length).length,
  };
};

// Words scrub from 0.12 to full opacity as the paragraph crosses the viewport.
export function Manifesto() {
  const ref = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-word]", { opacity: 0.12 }, {
        opacity: 1, stagger: 0.08, ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top 78%", end: "bottom 45%", scrub: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const words = (text) => text.split(" ").map((w, i) => <span key={i} data-word className="inline">{w} </span>);
  return (
    <section id="manifesto" ref={ref} className="relative mx-auto max-w-6xl px-5 py-32 sm:px-8 md:py-48">
      <p className="text-[clamp(1.7rem,3.6vw,3.3rem)] font-medium leading-[1.18] tracking-[-0.03em] text-white">
        {words("I design enterprise-grade AI agents")}
        <span data-word className="mx-1 inline-block h-[0.82em] w-[1.9em] -translate-y-[0.06em] overflow-hidden rounded-full align-middle ring-1 ring-cyan-300/40">
          <img src={userData.avatarUrl} alt="" className="h-full w-full object-cover object-[50%_22%] grayscale contrast-125" />
        </span>
        {words("that reason in the open, call tools safely, remember responsibly, and hand control to people at exactly the right moment.")}
        <span className="text-slate-500">{words("Then I fix the open-source frameworks they run on.")}</span>
      </p>
    </section>
  );
}

function TiltCard({ className = "", children, href }) {
  const ref = useRef(null);
  const move = (e) => {
    if (reducedMotion()) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(1000px) rotateX(${-y * 6}deg) rotateY(${x * 8}deg)`;
    ref.current.style.setProperty("--mx", `${(x + 0.5) * 100}%`);
    ref.current.style.setProperty("--my", `${(y + 0.5) * 100}%`);
  };
  const leave = () => { ref.current.style.transform = ""; };
  const Tag = href ? Link : "div";
  return <Tag ref={ref} href={href} onPointerMove={move} onPointerLeave={leave} className={`ix-glass ix-spot group relative overflow-hidden rounded-[1.75rem] p-7 transition-transform duration-300 ease-out ${className}`}>{children}</Tag>;
}

// 4 columns x 3 rows: A(2x2) + B(2x1) + C(1x1) + D(1x1) + E(4x1) = 12 cells, no voids.
export function ProofBento() {
  const { contributions, homeSnapshot } = userData;
  const t = contributionTotals();
  return (
    <section className="mx-auto max-w-7xl px-5 py-32 sm:px-8 md:py-48" aria-labelledby="proof-title">
      <h2 id="proof-title" className="max-w-5xl text-[clamp(2rem,4.4vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
        Credibility you can <span className="ix-gradient-text">click through</span>.
      </h2>
      <div className="mt-14 grid grid-flow-dense grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[repeat(2,minmax(13rem,auto))_auto]">
        <TiltCard href="/open-source" className="sm:col-span-2 lg:row-span-2 flex flex-col justify-between">
          <div>
            <p className="ix-mono text-[11px] uppercase tracking-[.22em] text-cyan-300">Upstream, verified {contributions.checkedOn}</p>
            <p className="mt-6 text-[clamp(5rem,11vw,9.5rem)] font-semibold leading-none tracking-[-0.06em] text-white">{t.merged}</p>
            <p className="mt-2 text-xl text-slate-300">merged pull requests across {t.projects} independent projects</p>
          </div>
          <ul className="mt-10 flex flex-wrap gap-2" aria-label="Organizations">
            {contributions.brands.map((b) => <li key={b.name} className="flex items-center gap-2 rounded-full bg-white/[.06] py-1.5 pl-1.5 pr-3 text-xs text-slate-200 ring-1 ring-white/10">
              <img src={b.logo} alt="" className="h-6 w-6 rounded-full bg-white object-contain p-0.5" />{b.name}
            </li>)}
          </ul>
        </TiltCard>
        <TiltCard href="/experience" className="sm:col-span-2 flex flex-col justify-end">
          <p className="ix-mono text-[11px] uppercase tracking-[.22em] text-violet-300">Now</p>
          <p className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.03em] text-white">{userData.designation}</p>
          <p className="mt-2 text-slate-400">Ashling Partners. Leading solution architecture for enterprise automation and AI programs.</p>
        </TiltCard>
        {homeSnapshot.proof.map((p) => <TiltCard key={p.label} href={p.href} className="flex flex-col justify-end">
          <p className="text-6xl font-semibold tracking-[-0.05em] text-white transition-colors group-hover:text-cyan-200">{p.value}</p>
          <p className="mt-2 text-slate-400">{p.label}</p>
        </TiltCard>)}
        <div className="ix-glass grid overflow-hidden rounded-[1.75rem] sm:col-span-2 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-4">
          {homeSnapshot.contributions.map((c) => <Link key={c.label} href={c.href} className="group flex min-h-[7rem] items-center justify-between gap-4 border-b border-white/10 p-6 transition hover:bg-white/[.04] last:border-0 sm:border-r lg:border-b-0">
            <span><span className="block text-lg font-medium text-white">{c.label}</span><span className="mt-1 block text-sm text-slate-400">{c.detail}</span></span>
            <Icon name="arrowUpRight" className="h-5 w-5 shrink-0 text-cyan-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>)}
        </div>
      </div>
    </section>
  );
}

export function BrandMarquee() {
  const { projects } = userData.contributions;
  const row = projects.map((p) => p.name);
  return (
    <div className="ix-marquee relative overflow-hidden border-y border-white/10 py-7" aria-label="Projects with recorded contributions">
      <div className="ix-marquee-track flex w-max gap-14">
        {[...row, ...row].map((name, i) => <span key={i} aria-hidden={i >= row.length} className="flex items-center gap-14 whitespace-nowrap text-2xl font-medium tracking-[-0.02em] text-slate-500 sm:text-3xl">
          {name}<span className="h-1.5 w-1.5 rounded-full bg-cyan-400/70" />
        </span>)}
      </div>
    </div>
  );
}

// Horizontal accordion: slices widen on hover / focus to reveal the fix narrative.
export function SelectedFixes() {
  const fixes = userData.contributions.highlights;
  const [active, setActive] = useState(0);
  return (
    <section className="mx-auto max-w-7xl px-5 py-32 sm:px-8 md:py-48" aria-labelledby="fixes-title">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 id="fixes-title" className="max-w-3xl text-[clamp(2rem,4.4vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
          Small fixes. <span className="ix-gradient-text">Load-bearing</span> consequences.
        </h2>
        <Link href="/open-source" className="ix-btn-ghost self-start md:self-auto">All {contributionTotals().merged} merged PRs <Icon name="arrowRight" /></Link>
      </div>
      <ul className="mt-14 flex flex-col gap-3 lg:h-[30rem] lg:flex-row">
        {fixes.map((f, i) => {
          const open = active === i;
          return <li key={f.url} onPointerEnter={() => setActive(i)} className={`ix-glass relative overflow-hidden rounded-[1.5rem] transition-[flex-grow] duration-700 ease-[cubic-bezier(.2,.8,.2,1)] lg:min-w-[4.5rem] ${open ? "lg:flex-[6]" : "lg:flex-1"}`}>
            <a href={f.url} target="_blank" rel="noopener noreferrer" onFocus={() => setActive(i)} className="flex h-full flex-col p-6 lg:p-7">
              <span className="ix-mono text-[11px] uppercase tracking-[.2em] text-cyan-300">PR #{f.number}</span>
              <span className={`mt-3 text-sm text-slate-400 lg:mt-auto lg:whitespace-nowrap ${open ? "" : "lg:[writing-mode:vertical-rl] lg:rotate-180"}`}>{f.project}</span>
              <span className={`block transition-opacity duration-500 ${open ? "lg:opacity-100 lg:delay-200" : "lg:pointer-events-none lg:absolute lg:opacity-0"}`}>
                <span className="mt-4 block text-2xl font-semibold leading-tight tracking-[-0.02em] text-white lg:text-3xl">{f.title}</span>
                <span className="mt-4 block max-w-xl text-[15px] leading-7 text-slate-300">{f.description}</span>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cyan-200">Read the merged PR <Icon name="arrowUpRight" /></span>
              </span>
            </a>
          </li>;
        })}
      </ul>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="relative overflow-hidden px-5 py-32 text-center sm:px-8 md:py-48">
      <div className="pointer-events-none absolute inset-0 -z-10 ix-aurora" />
      <h2 className="mx-auto max-w-6xl text-[clamp(2.6rem,7vw,6.5rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-white">
        Building agents that have to <span className="ix-gradient-text">hold up in production?</span>
      </h2>
      <p className="mx-auto mt-8 max-w-xl text-lg text-slate-300">Architecture reviews, enterprise agent programs, open-source collaboration, speaking, and judging.</p>
      <div className="mt-12 flex flex-wrap justify-center gap-4">
        <Magnetic><Link href="/contact" className="ix-btn-primary">Start a conversation <Icon name="arrowRight" /></Link></Magnetic>
        <Magnetic><a href={userData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="ix-btn-ghost">LinkedIn <Icon name="arrowUpRight" /></a></Magnetic>
        <Magnetic><a href={userData.socialLinks.github} target="_blank" rel="noopener noreferrer" className="ix-btn-ghost">GitHub <Icon name="arrowUpRight" /></a></Magnetic>
      </div>
    </section>
  );
}
