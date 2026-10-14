import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import userData from "@constants/data";
import Icon from "../Icon";

const COMMUNITY = ["UiPath MVP", "Vice President of Public Relations", "Telugu Teacher (Volunteer)"];

// ponytail: native sticky pins the title column (no GSAP pin-spacer jank); GSAP only scrubs the rail and role reveals.
export default function CareerTimeline() {
  const ref = useRef(null);
  const roles = userData.experience.filter((e) => !COMMUNITY.includes(e.title));
  const community = userData.experience.filter((e) => COMMUNITY.includes(e.title));

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo("[data-rail]", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-roles]", start: "top 60%", end: "bottom 60%", scrub: true } });
      gsap.utils.toArray("[data-role]").forEach((el) => {
        gsap.fromTo(el, { opacity: 0.25, x: 40 }, { opacity: 1, x: 0, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 80%", end: "top 50%", scrub: true } });
      });
    }, ref);
    return () => mm.revert();
  }, []);

  return (
    <section ref={ref} className="mx-auto grid max-w-7xl gap-14 px-5 py-32 sm:px-8 md:py-48 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]" aria-labelledby="career-title">
      <div className="lg:self-start lg:sticky lg:top-28">
        <div>
          <h2 id="career-title" className="text-[clamp(2rem,4.4vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
            From ERP code to <span className="ix-gradient-text">agentic architecture.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg text-slate-400">Started as a .NET developer, discovered UiPath, won a hackathon, and grew from RPA developer to Agentic AI Architect to leading solution architecture.</p>
          <figure className="relative mt-10 aspect-[4/5] max-w-[19rem] overflow-hidden rounded-[2rem] ring-1 ring-white/10">
            <img src={userData.avatarUrl} alt={`Portrait of ${userData.name}`} className="h-full w-full object-cover object-top grayscale contrast-125 transition duration-700 hover:grayscale-0" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05070f] via-transparent to-cyan-400/10 mix-blend-normal" />
          </figure>
        </div>
      </div>

      <div>
        <ol data-roles className="relative space-y-6 pl-8">
          <span className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-white/10" aria-hidden="true" />
          <span data-rail className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px origin-top bg-gradient-to-b from-cyan-300 via-blue-400 to-violet-400" aria-hidden="true" />
          {roles.map((r) => <li key={r.title + r.year} data-role className="relative">
            <span className="absolute -left-8 top-8 h-[15px] w-[15px] rounded-full border-2 border-cyan-300 bg-[#05070f]" aria-hidden="true" />
            <article className="ix-glass rounded-[1.75rem] p-7">
              <p className="ix-mono text-[11px] uppercase tracking-[.2em] text-cyan-300">{r.year}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-white">{r.title}</h3>
              <a href={r.companyLink} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex min-h-[32px] items-center gap-1.5 text-slate-300 hover:text-cyan-200">{r.company} <Icon name="arrowUpRight" className="h-3.5 w-3.5" /></a>
              <p className="mt-3 leading-7 text-slate-400">{r.desc}</p>
            </article>
          </li>)}
        </ol>
        <div className="mt-10 pl-8">
          <p className="ix-mono text-[11px] uppercase tracking-[.2em] text-violet-300">Alongside</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {community.map((c) => <li key={c.title}><a href={c.companyLink} target="_blank" rel="noopener noreferrer" className="ix-glass block h-full rounded-2xl p-4 transition hover:ring-cyan-300/40">
              <span className="block font-medium text-white">{c.title}</span><span className="mt-1 block text-sm text-slate-400">{c.company} · {c.year}</span>
            </a></li>)}
          </ul>
          <Link href="/experience" className="ix-btn-ghost mt-8">Full experience <Icon name="arrowRight" /></Link>
        </div>
      </div>
    </section>
  );
}
