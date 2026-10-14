import Link from "next/link";
import userData from "@constants/data";
import Icon from "./Icon";
import AgentConstellation, { AGENT_NODES } from "./home/AgentConstellation";
import { KineticHeadline, Magnetic } from "./home/Kinetic";

export default function Hero() {
  const { homeSnapshot } = userData;
  return (
    <section className="relative isolate flex min-h-[100svh] pb-64 sm:pb-0 flex-col overflow-hidden" aria-labelledby="hero-title">
      <AgentConstellation className="absolute inset-0 -z-10" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_45%_at_50%_28%,rgba(5,8,22,.92),rgba(5,8,22,.55)_55%,transparent_80%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-[#05070f]" />

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-5 pt-28 text-center sm:px-8 sm:pt-36 md:pt-40">
        <p className="ix-mono text-[11px] uppercase tracking-[.28em] text-cyan-200/80">
          <span className="hidden sm:inline">{userData.name} · </span>Agentic AI Architect · Dallas
        </p>
        <div id="hero-title" className="w-full">
          <KineticHeadline
            lines={[homeSnapshot.headline, homeSnapshot.headlineAccent]}
            className="mt-6 w-full text-[clamp(2.3rem,5.3vw,5.6rem)] md:[&>span]:whitespace-nowrap font-semibold leading-[1.02] tracking-[-0.045em] text-white"
          />
        </div>
        <p className="mt-7 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
          {homeSnapshot.description}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <Link href="/open-source" className="ix-btn-primary">Explore contributions <Icon name="arrowRight" /></Link>
          </Magnetic>
          <Magnetic>
            <a href={userData.resumeUrl} className="ix-btn-ghost" download>Download CV <Icon name="download" /></a>
          </Magnetic>
        </div>
      </div>

      <ul className="sr-only" aria-label="Agent system capabilities shown in the constellation">
        {AGENT_NODES.map((node) => <li key={node.id}>{node.label}: {node.note}</li>)}
      </ul>
      <a href="#manifesto" className="ix-mono mx-auto mb-8 mt-auto hidden min-h-[44px] items-center gap-3 pt-10 sm:flex text-[11px] uppercase tracking-[.24em] text-slate-400 transition hover:text-cyan-200">
        <span className="relative block h-8 w-px overflow-hidden bg-white/15"><span className="ix-scroll-cue absolute inset-x-0 top-0 h-3 bg-cyan-300" /></span>
        Move the cursor. Then scroll.
      </a>
    </section>
  );
}
