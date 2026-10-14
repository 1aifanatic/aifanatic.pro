import { useState } from "react";
import userData from "@constants/data";
import Icon from "../Icon";
import { contributionTotals } from "./Sections";

const RINGS = [130, 205, 280];
const prUrl = (repo, n) => `https://github.com/${repo}/pull/${n}`;

// Orbits are CSS-animated <g> rings; each planet counter-rotates so labels stay upright.
export default function ImpactUniverse() {
  const { contributions } = userData;
  const projects = [...contributions.projects].sort((a, b) => b.merged.length - a.merged.length || b.open.length - a.open.length);
  const [selected, setSelected] = useState(projects[0].repo);
  const project = projects.find((p) => p.repo === selected);
  const totals = contributionTotals();
  const rings = RINGS.map((_, r) => projects.filter((_, i) => i % RINGS.length === r));

  return (
    <section id="impact" className="mx-auto max-w-7xl px-5 py-32 sm:px-8 md:py-48" aria-labelledby="impact-title">
      <h2 id="impact-title" className="max-w-6xl text-[clamp(2rem,4.2vw,3.8rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
        An open-source <span className="ix-gradient-text">impact universe</span>, every orbit backed by a pull request.
      </h2>
      <p className="mt-6 max-w-2xl text-lg text-slate-400">
        {totals.merged} merged, {totals.open} open proposals, {contributions.projects.length} upstream projects. Filled planets carry merged work; hollow ones are proposals still in review. Select one to inspect the evidence.
      </p>

      <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <div className="ix-glass relative overflow-hidden rounded-[2rem] p-4">
          <svg viewBox="-320 -320 640 640" className="ix-orbits mx-auto block aspect-square w-full max-w-[640px]" aria-hidden="true">
            <defs>
              <radialGradient id="core-glow"><stop offset="0" stopColor="#67e8f9" stopOpacity=".55" /><stop offset="1" stopColor="#67e8f9" stopOpacity="0" /></radialGradient>
              <linearGradient id="planet" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#22d3ee" /><stop offset="1" stopColor="#8b5cf6" /></linearGradient>
            </defs>
            {RINGS.map((r) => <circle key={r} r={r} fill="none" stroke="rgba(148,197,255,.13)" strokeDasharray="2 6" />)}
            <circle r="70" fill="url(#core-glow)" />
            <circle r="26" fill="#0b1224" stroke="#67e8f9" strokeOpacity=".6" />
            <text y="4" textAnchor="middle" className="ix-mono" fontSize="10" fill="#cffafe">NAVEEN</text>
            {rings.map((items, r) => <g key={r} className="ix-orbit" style={{ animationDuration: `${90 + r * 40}s`, animationDirection: r % 2 ? "reverse" : "normal" }}>
              {/* Invisible bounds keep the fill-box centred on the core so the ring spins in place. */}
              <circle r={RINGS[r] + 40} fill="none" />
              {items.map((p, i) => {
                const a = (i / items.length) * Math.PI * 2 + r * 0.7;
                const x = Math.cos(a) * RINGS[r], y = Math.sin(a) * RINGS[r];
                const size = 7 + Math.sqrt(p.merged.length + p.open.length * 0.5) * 4.2;
                const on = p.repo === selected;
                return <g key={p.repo} transform={`translate(${x} ${y})`} onClick={() => setSelected(p.repo)} className="cursor-pointer">
                  <g className="ix-orbit-counter" style={{ animationDuration: `${90 + r * 40}s`, animationDirection: r % 2 ? "normal" : "reverse" }}>
                    <circle r={size + 34} fill="none" />
                    {on && <circle r={size + 12} fill="none" stroke="#67e8f9" strokeOpacity=".7"><animate attributeName="r" values={`${size + 8};${size + 16};${size + 8}`} dur="2.4s" repeatCount="indefinite" /></circle>}
                    <circle r={size} fill={p.merged.length ? "url(#planet)" : "rgba(11,18,36,.9)"} stroke={p.merged.length ? "none" : "#a78bfa"} strokeWidth="1.5" opacity={on ? 1 : 0.82} />
                    <text y={size + 16} textAnchor="middle" fontSize="11" fill={on ? "#ecfeff" : "#94a3b8"}>{p.name.replace("Microsoft ", "MS ")}</text>
                  </g>
                </g>;
              })}
            </g>)}
          </svg>
        </div>

        <div className="flex min-w-0 flex-col gap-4">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Choose a project">
            {projects.map((p) => <button key={p.repo} type="button" aria-pressed={p.repo === selected} onClick={() => setSelected(p.repo)}
              className={`min-h-[40px] rounded-full px-3.5 text-xs font-medium ring-1 transition ${p.repo === selected ? "bg-cyan-300 text-[#020617] ring-cyan-300" : "bg-white/[.04] text-slate-300 ring-white/10 hover:ring-cyan-300/50"}`}>
              {p.name}
            </button>)}
          </div>
          <article className="ix-glass flex min-h-[26rem] flex-1 flex-col rounded-[2rem] p-7" aria-live="polite">
            <a href={`https://github.com/${project.repo}`} target="_blank" rel="noopener noreferrer" className="ix-mono inline-flex items-center gap-2 text-[11px] uppercase tracking-[.2em] text-cyan-300 hover:text-cyan-100">{project.repo} <Icon name="arrowUpRight" className="h-3.5 w-3.5" /></a>
            <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white">{project.name}</h3>
            <p className="mt-2 text-slate-400">{project.focus}</p>
            <div className="mt-6 flex gap-8">
              <p><span className="block text-4xl font-semibold text-white">{project.merged.length}</span><span className="text-sm text-slate-400">merged</span></p>
              <p><span className="block text-4xl font-semibold text-violet-200">{project.open.length}</span><span className="text-sm text-slate-400">open proposals</span></p>
            </div>
            <ul className="ix-scroll mt-6 max-h-[18rem] flex-1 space-y-1 overflow-y-auto pr-2">
              {project.merged.map((pr) => <li key={pr.number}><PrLink repo={project.repo} pr={pr} state="Merged" /></li>)}
              {project.open.map((pr) => <li key={pr.number}><PrLink repo={project.repo} pr={pr} state="Open" /></li>)}
            </ul>
            <a href={contributions.activityUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-cyan-200 hover:text-white">Audit all activity on GitHub <Icon name="arrowUpRight" /></a>
          </article>
        </div>
      </div>
    </section>
  );
}

function PrLink({ repo, pr, state }) {
  return <a href={prUrl(repo, pr.number)} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition hover:bg-white/[.05]">
    <span className={`ix-mono mt-0.5 shrink-0 rounded-md px-1.5 py-0.5 text-[10px] ${state === "Merged" ? "bg-cyan-400/15 text-cyan-200" : "bg-violet-400/15 text-violet-200"}`}>{state}</span>
    <span className="min-w-0 text-sm leading-6 text-slate-300 group-hover:text-white"><span className="text-slate-500">#{pr.number}</span> {pr.title}</span>
  </a>;
}
