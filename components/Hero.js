import React from "react";
import Link from "next/link";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import userData from "@constants/data";
import { openGuestBook } from "@lib/guestBook";
import Icon from "./Icon";

const boostAreas = [
  "Discovery",
  "Architecture",
  "Quality",
  "Release",
];

export default function Hero() {
  const { uipathBoost, loanShield, homeSnapshot } = userData;

  return (
    <section className="site-container py-4 sm:py-5 lg:h-[calc(100vh-64px)] lg:min-h-[720px] lg:max-h-[840px]">
      <div className="grid gap-4 lg:h-full lg:grid-cols-12 lg:grid-rows-[minmax(0,1.03fr)_minmax(0,.97fr)_74px]">
        <article className="overflow-hidden rounded-[1.35rem] border border-[#d8ddd8] bg-white p-5 shadow-[0_10px_30px_rgba(24,33,31,.04)] dark:border-[#34413d] dark:bg-[#18211f] sm:p-6 lg:col-span-7 lg:flex lg:flex-col lg:justify-center lg:p-5 2xl:p-7">
          <p className="eyebrow">Naveen Chatlapalli · Dallas, Texas</p>
          <RoughNotationGroup show={true}>
            <h1 className="mt-2 max-w-4xl text-[2.55rem] leading-[.98] text-[#18211f] dark:text-[#eef1ed] sm:text-5xl lg:text-[2.55rem] xl:text-[2.8rem] 2xl:text-[3.35rem]">
              Solution architecture for AI agents that{" "}
              <RoughNotation
                type="underline"
                color="#91aed2"
                strokeWidth={2}
                padding={2}
              >
                work in the real world.
              </RoughNotation>
            </h1>
          </RoughNotationGroup>
          <p className="mt-3 max-w-2xl text-base leading-6 text-[#5f6864] dark:text-[#b7c0bb] 2xl:text-lg 2xl:leading-7">
            I lead enterprise solution architecture across automation and
            AI—turning ambitious agent ideas into governed, production-ready
            systems.
          </p>
          <div className="mt-3 flex flex-wrap gap-2.5 2xl:mt-5">
            <Link href="/work" className="button-primary px-4 py-2.5">
              View work <Icon name="arrowRight" />
            </Link>
            <a
              href={userData.resumeUrl}
              className="button-secondary px-4 py-2.5"
              download
            >
              Download CV <Icon name="download" />
            </a>
          </div>
        </article>

        <figure className="relative overflow-hidden rounded-[1.35rem] border border-[#c9d6e7] bg-[#e9eff8] p-2.5 dark:border-[#314b65] dark:bg-[#172c3c] lg:col-span-3">
          <img
            src={userData.avatarUrl}
            alt={`Portrait of ${userData.name}`}
            className="h-[360px] w-full rounded-[1rem] object-cover object-top shadow-[0_16px_40px_rgba(24,33,31,.13)] sm:h-[430px] lg:h-[calc(100%-34px)]"
          />
          <figcaption className="flex h-[34px] items-center justify-center pt-2 text-center text-[9px] font-semibold uppercase tracking-[.14em] text-[#5f6864] dark:text-[#b7c0bb]">
            Enterprise automation · AI agents
          </figcaption>
        </figure>

        <aside className="grid overflow-hidden rounded-[1.35rem] border border-[#d8ddd8] bg-white shadow-[0_10px_30px_rgba(24,33,31,.04)] dark:border-[#34413d] dark:bg-[#18211f] sm:grid-cols-3 lg:col-span-2 lg:grid-cols-1" aria-label="Career highlights">
          <div className="flex flex-col justify-center border-b border-[#d8ddd8] p-5 dark:border-[#34413d] sm:border-b-0 sm:border-r lg:border-b lg:border-r-0 lg:p-3 2xl:p-4">
            <p className="eyebrow">Current</p>
            <p className="mt-2 font-serif text-xl leading-tight text-[#18211f] dark:text-[#eef1ed] lg:text-base 2xl:text-xl">
              {userData.designation}
            </p>
          </div>
          {homeSnapshot.proof.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group flex flex-col justify-center border-b border-[#d8ddd8] p-5 transition last:border-0 hover:bg-[#e9eff8]/70 dark:border-[#34413d] dark:hover:bg-[#203a5a]/50 sm:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b lg:border-r-0 lg:p-3 lg:last:border-b-0 2xl:p-4"
            >
              <p className="font-serif text-3xl leading-none transition group-hover:text-[#174b8b] dark:group-hover:text-[#a8c7ee] lg:text-[1.7rem] 2xl:text-3xl">
                {item.value}
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[.1em] text-[#5f6864] dark:text-[#b7c0bb]">
                {item.label}
              </p>
            </Link>
          ))}
        </aside>

        <article className="overflow-hidden rounded-[1.35rem] border border-[#314b65] bg-[#111716] text-[#eef1ed] shadow-[0_14px_35px_rgba(24,33,31,.12)] lg:col-span-7">
          <div className="grid h-full md:grid-cols-[1.2fr_.8fr]">
            <div className="flex flex-col justify-center p-5 sm:p-6 lg:p-5 2xl:p-7">
              <div className="flex flex-wrap items-center gap-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-[#a8c7ee]">
                  {uipathBoost.eyebrow}
                </p>
                <span className="rounded-full border border-[#46514c] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[.13em] text-[#b7c0bb]">
                  Featured
                </span>
              </div>
              <h2 className="mt-2 text-4xl leading-none sm:text-5xl lg:text-4xl 2xl:text-5xl">
                {uipathBoost.title}
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-5 text-[#c5cec8] 2xl:text-base 2xl:leading-7">
                {uipathBoost.summary}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2.5 2xl:mt-5">
                <button
                  type="button"
                  onClick={() => openGuestBook(uipathBoost.url)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#eef1ed] px-4 py-2.5 text-sm font-semibold text-[#18211f] transition hover:-translate-y-0.5 hover:bg-[#a8c7ee] motion-reduce:transform-none"
                >
                  View on GitHub <Icon name="arrowRight" />
                </button>
                <span className="text-xs text-[#96a09a]">{uipathBoost.facts[0]}</span>
              </div>
            </div>
            <div className="border-t border-[#34413d] p-5 md:border-l md:border-t-0 sm:p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-[#a8c7ee]">
                Engineering around delivery
              </p>
              <ol className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-1 xl:grid-cols-2">
                {boostAreas.map((area, index) => (
                  <li
                    key={area}
                    className="rounded-xl border border-[#34413d] bg-[#18211f] px-3 py-2.5"
                  >
                    <span className="font-mono text-[9px] text-[#7ea5d4]">
                      0{index + 1}
                    </span>
                    <p className="mt-1 text-xs font-semibold">{area}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-3 text-[10px] leading-4 text-[#96a09a]">
                Independent community project complementing official UiPath
                product skills.
              </p>
            </div>
          </div>
        </article>

        <article className="flex flex-col justify-center overflow-hidden rounded-[1.35rem] border border-[#b9cce5] bg-[#e9eff8] p-5 shadow-[0_12px_32px_rgba(24,33,31,.06)] dark:border-[#315169] dark:bg-[#172c3c] sm:p-6 lg:col-span-5 lg:p-5 2xl:p-7">
          <p className="eyebrow">{loanShield.eyebrow}</p>
          <div className="mt-2">
            <div>
              <h2 className="text-4xl leading-none sm:text-5xl lg:text-4xl 2xl:text-5xl">{loanShield.title}</h2>
              <p className="mt-2 text-sm leading-5 text-[#46514c] dark:text-[#c5cec8] 2xl:text-base 2xl:leading-6">
                {loanShield.summary}
              </p>
            </div>
          </div>
          <ol className="mt-3 grid grid-cols-4 overflow-hidden rounded-xl border border-[#b9cce5] bg-white/60 dark:border-[#315169] dark:bg-[#18211f]/60 2xl:mt-5">
            {loanShield.systemPath.map((step, index) => (
              <li
                key={step}
                className="border-r border-[#b9cce5] px-2 py-2 text-center last:border-0 dark:border-[#315169] 2xl:py-3"
              >
                <span className="block font-mono text-[9px] text-[#174b8b] dark:text-[#a8c7ee]">
                  0{index + 1}
                </span>
                <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[.08em] text-[#46514c] dark:text-[#c5cec8]">
                  {step}
                </span>
              </li>
            ))}
          </ol>
          <a
            href={loanShield.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex min-h-9 items-center gap-2 self-start text-sm font-semibold text-[#174b8b] transition hover:text-[#0d376b] dark:text-[#a8c7ee] dark:hover:text-white 2xl:mt-3"
          >
            View on Devpost <Icon name="arrowUpRight" />
          </a>
        </article>

        <nav className="overflow-hidden rounded-[1.2rem] border border-[#d8ddd8] bg-white shadow-[0_8px_24px_rgba(24,33,31,.035)] dark:border-[#34413d] dark:bg-[#18211f] lg:col-span-12" aria-label="Public contributions">
          <div className="grid h-full md:grid-cols-[1.1fr_repeat(4,1fr)]">
            <div className="flex items-center border-b border-[#d8ddd8] px-5 py-4 dark:border-[#34413d] md:border-b-0 md:border-r">
              <div>
                <p className="eyebrow">Public contribution</p>
                <p className="mt-1 text-xs text-[#5f6864] dark:text-[#b7c0bb]">
                  Leadership beyond delivery
                </p>
              </div>
            </div>
            {homeSnapshot.contributions.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group flex items-center justify-between gap-3 border-b border-[#d8ddd8] px-5 py-4 transition last:border-0 hover:bg-[#e9eff8]/70 dark:border-[#34413d] dark:hover:bg-[#203a5a]/40 md:border-b-0 md:border-r md:last:border-r-0"
              >
                <span>
                  <span className="block text-xs font-semibold text-[#18211f] dark:text-[#eef1ed]">
                    {item.label}
                  </span>
                  <span className="mt-1 block text-[10px] text-[#5f6864] dark:text-[#b7c0bb]">
                    {item.detail}
                  </span>
                </span>
                <Icon
                  name="arrowRight"
                  className="h-4 w-4 shrink-0 text-[#174b8b] transition group-hover:translate-x-0.5 dark:text-[#a8c7ee] motion-reduce:transform-none"
                />
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </section>
  );
}
