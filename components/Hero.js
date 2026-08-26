import React from "react";
import Link from "next/link";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import userData from "@constants/data";
import { openGuestBook } from "@lib/guestBook";
import boostSummary from "../content/skills/uipath-boost/summary.json";
import Icon from "./Icon";

export default function Hero({ boostMetrics = null, openSourceMetrics = {} }) {
  const { uipathBoost, homeSnapshot, openSource, nicheFocus } = userData;
  const starCount = Number.isFinite(boostMetrics?.stars)
    ? boostMetrics.stars.toLocaleString("en-US")
    : "Live";
  const repoStars = (repo) => {
    const metrics = openSourceMetrics[repo];
    return Number.isFinite(metrics?.stars) ? metrics.stars.toLocaleString("en-US") : "0";
  };

  return (
    <section className="site-container py-4 sm:py-5 lg:h-[calc(100vh-64px)] lg:min-h-[720px] lg:max-h-[840px]">
      <div className="grid gap-4 lg:h-full lg:grid-cols-12 lg:grid-rows-[minmax(0,1.03fr)_minmax(0,.97fr)_74px]">
        <article className="overflow-hidden rounded-[1.35rem] border border-[#d8ddd8] bg-white p-5 shadow-[0_10px_30px_rgba(24,33,31,.04)] dark:border-[#34413d] dark:bg-[#18211f] sm:p-6 lg:col-span-7 lg:flex lg:flex-col lg:justify-center lg:p-5 2xl:p-7">
          <p className="eyebrow">Naveen Chatlapalli · Dallas, Texas</p>
          <RoughNotationGroup show={true}>
            <h1 className="mt-1.5 max-w-4xl text-[2.2rem] leading-[.98] text-[#18211f] dark:text-[#eef1ed] sm:text-[2.5rem] lg:text-[2rem] xl:text-[2.4rem] 2xl:text-[2.8rem]">
              AI agents that work. {" "}
              <RoughNotation
                type="underline"
                color="#91aed2"
                strokeWidth={2}
                padding={2}
              >
                Systems that scale.
              </RoughNotation>
            </h1>
          </RoughNotationGroup>
          <p className="mt-2 max-w-2xl text-sm leading-5 text-[#5f6864] dark:text-[#b7c0bb] xl:text-base xl:leading-6">
            Agentic Automation Architect building enterprise-grade AI agents for
            business process automation.
          </p>
          <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Niche focus areas">
            {nicheFocus.map((focus) => (
              <li key={focus} className="rounded-full border border-[#c7cfca] px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[.06em] text-[#46514c] dark:border-[#46514c] dark:text-[#c5cec8]">
                {focus}
              </li>
            ))}
          </ul>
          <div className="mt-2.5 flex flex-wrap gap-2.5">
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
          <div className="flex flex-col justify-center border-b border-[#d8ddd8] p-5 dark:border-[#34413d] sm:border-b-0 sm:border-r lg:border-b lg:border-r-0 lg:p-2.5 2xl:p-4">
            <p className="eyebrow">Current</p>
            <p className="mt-1.5 font-serif text-lg leading-tight text-[#18211f] dark:text-[#eef1ed] lg:text-sm 2xl:text-lg">
              {userData.designation}
            </p>
          </div>
          {homeSnapshot.proof.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group flex flex-col justify-center border-b border-[#d8ddd8] p-5 transition last:border-0 hover:bg-[#e9eff8]/70 dark:border-[#34413d] dark:hover:bg-[#203a5a]/50 sm:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b lg:border-r-0 lg:p-2.5 lg:last:border-b-0 2xl:p-4"
            >
              <p className="font-serif text-3xl leading-none transition group-hover:text-[#174b8b] dark:group-hover:text-[#a8c7ee] lg:text-2xl 2xl:text-3xl">
                {item.value}
              </p>
              <p className="mt-1.5 text-[10px] font-medium uppercase tracking-[.1em] text-[#5f6864] dark:text-[#b7c0bb]">
                {item.label}
              </p>
            </Link>
          ))}
        </aside>

        <article className="overflow-hidden rounded-[1.35rem] border border-[#314b65] bg-[#111716] text-[#eef1ed] shadow-[0_14px_35px_rgba(24,33,31,.12)] lg:col-span-7">
          <div className="grid h-full md:grid-cols-[1.2fr_.8fr]">
            <div className="flex flex-col justify-center p-4 sm:p-5 lg:p-4">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-[#a8c7ee]">
                  {uipathBoost.eyebrow}
                </p>
                <span className="rounded-full border border-[#46514c] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[.13em] text-[#b7c0bb]">
                  Featured
                </span>
              </div>
              <h2 className="mt-1.5 text-3xl leading-none sm:text-4xl lg:text-3xl 2xl:text-4xl">
                {uipathBoost.title}
              </h2>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="font-serif text-2xl leading-none text-white">
                  {boostSummary.skillCount}
                </span>
                <span className="rounded-full bg-[#a8c7ee] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[.12em] text-[#172c3c]">
                  {uipathBoost.skillLabel}
                </span>
              </div>
              <p className="mt-1.5 max-w-xl text-xs leading-4 text-[#c5cec8] 2xl:text-sm 2xl:leading-5">
                {uipathBoost.summary}
              </p>
              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                <Link
                  href="/skills/uipath-boost"
                  className="inline-flex min-h-[36px] items-center justify-center gap-2 rounded-full bg-[#eef1ed] px-3 py-2 text-xs font-semibold text-[#18211f] transition hover:-translate-y-0.5 hover:bg-[#a8c7ee] motion-reduce:transform-none"
                >
                  Browse the {boostSummary.skillCount} skills <Icon name="arrowRight" />
                </Link>
                <button
                  type="button"
                  onClick={() => openGuestBook(uipathBoost.url)}
                  className="inline-flex min-h-[36px] items-center justify-center gap-2 rounded-full border border-[#46514c] px-3 py-2 text-xs font-semibold text-[#c5cec8] transition hover:border-[#a8c7ee] hover:text-white"
                >
                  GitHub
                </button>
                <div
                  className="flex min-h-[36px] shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-[#46514c] bg-[#18211f] px-3"
                  aria-label={`${starCount} GitHub stars`}
                  title="Live repository metric from GitHub"
                >
                  <Icon name="star" className="h-4 w-4 fill-[#f2c86b] text-[#f2c86b]" />
                  <span className="font-serif text-lg leading-none text-white">
                    {starCount}
                  </span>
                  <span className="text-[9px] font-semibold uppercase leading-3 tracking-[.1em] text-[#96a09a]">
                    GitHub<br />stars
                  </span>
                </div>
              </div>
            </div>
            <div className="border-t border-[#34413d] p-4 md:border-l md:border-t-0 sm:p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-[#a8c7ee]">
                Why teams need these skills
              </p>
              <ol className="mt-2.5 grid grid-cols-2 gap-2">
                {uipathBoost.benefits.map((benefit) => (
                  <li
                    key={benefit.title}
                    className="rounded-lg border border-[#34413d] bg-[#18211f] px-2.5 py-2"
                  >
                    <p className="text-[11px] font-semibold">{benefit.title}</p>
                    <p className="mt-0.5 text-[9px] leading-3 text-[#96a09a]">
                      {benefit.detail}
                    </p>
                  </li>
                ))}
              </ol>
              <p className="mt-2 text-[9px] leading-4 text-[#96a09a]">
                One reusable system for clearer decisions and safer delivery.
              </p>
            </div>
          </div>
        </article>

        <article className="relative flex flex-col justify-center overflow-hidden rounded-[1.35rem] border border-[#b9cce5] bg-[#e9eff8] p-5 shadow-[0_12px_32px_rgba(24,33,31,.06)] dark:border-[#315169] dark:bg-[#172c3c] sm:p-6 lg:col-span-5 lg:p-5 2xl:p-7">
          <div className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full border-[24px] border-white/30 dark:border-[#315169]/30" />
          <div className="relative flex flex-wrap items-center justify-between gap-2">
            <p className="eyebrow">Latest open source</p>
            <a
              href={`https://github.com/${userData.githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-9 items-center gap-2 text-sm font-semibold text-[#174b8b] transition hover:text-[#0d376b] dark:text-[#a8c7ee] dark:hover:text-white"
            >
              GitHub <Icon name="arrowUpRight" />
            </a>
          </div>
          <div className="relative mt-3 grid grid-cols-2 gap-2">
            {openSource.map((repo) => (
              <a
                key={repo.id}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[96px] flex-col justify-between rounded-xl border border-[#b9cce5] bg-white/70 p-3 transition hover:-translate-y-0.5 hover:border-[#174b8b] dark:border-[#315169] dark:bg-[#18211f]/70 dark:hover:border-[#a8c7ee] motion-reduce:transform-none"
              >
                <p className="text-xs font-bold leading-4 text-[#18211f] transition group-hover:text-[#174b8b] dark:text-[#eef1ed] dark:group-hover:text-[#a8c7ee]">
                  {repo.name}
                </p>
                <ul className="mt-1.5 space-y-0.5">
                  {repo.points.map((point) => (
                    <li key={point} className="flex items-start gap-1.5 text-[9px] font-semibold leading-3 text-[#46514c] dark:text-[#c5cec8]">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[#174b8b] dark:bg-[#a8c7ee]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-1.5 flex shrink-0 items-center gap-1 text-[10px] font-semibold text-[#46514c] dark:text-[#c5cec8]">
                  <Icon name="star" className="h-3 w-3 fill-[#f2c86b] text-[#f2c86b]" />
                  {repoStars(repo.repo)}
                </div>
              </a>
            ))}
          </div>
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
