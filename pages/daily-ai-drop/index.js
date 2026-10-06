import { useState } from "react";
import Link from "next/link";
import ContainerBlock from "@components/ContainerBlock";
import DailyDropPlayer from "@components/DailyDropPlayer";
import Icon from "@components/Icon";
import userData from "@constants/data";
import { getEpisodes, withAudioStatus } from "@lib/dailyDrop";

const { dailyDrop } = userData;

export default function DailyDrop({ episodes, latest, unavailable }) {
  const [query, setQuery] = useState("");
  const [edition, setEdition] = useState("All");
  const filtered = episodes.filter((episode) => (edition === "All" || episode.edition === edition) && `${episode.title} ${episode.description}`.toLowerCase().includes(query.toLowerCase().trim()));

  return <ContainerBlock title={`${dailyDrop.title} - Naveen Chatlapalli`} description={dailyDrop.description}>
    <section className="site-container page-section">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#d8ddd8] pb-5 dark:border-[#34413d]"><p className="eyebrow">The listening desk / AI, in perspective</p><p className="text-xs font-semibold text-[#5f6864] dark:text-[#b7c0bb]">{dailyDrop.schedule}</p></div>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end"><div><h1 className="display-title !mt-0">The Daily<br /><span className="italic">AI Drop.</span></h1><p className="page-lede">{dailyDrop.description}</p></div><p className="max-w-sm border-l border-[#c9b894] pl-5 text-sm leading-6 text-[#5f6864] dark:border-[#665a43] dark:text-[#b7c0bb]">{dailyDrop.disclosure}</p></div>
      {latest && <article className="mt-10 overflow-hidden rounded-[1.35rem] border border-[#d8c7a7] bg-[#f4ead8] dark:border-[#665a43] dark:bg-[#29261e]">
        <div className="grid md:grid-cols-[.7fr_1.3fr]">
          <div className="relative flex min-h-[240px] flex-col justify-between overflow-hidden bg-[#18211f] p-8 text-[#f4ead8] sm:p-10">
            <div className="absolute -right-16 top-6 h-64 w-64 rounded-full border border-[#c9b894]/25 before:absolute before:inset-7 before:rounded-full before:border before:border-[#c9b894]/25 after:absolute after:inset-14 after:rounded-full after:border after:border-[#c9b894]/25" aria-hidden="true" />
            <p className="relative text-[11px] font-semibold uppercase tracking-[.2em] text-[#e1bd7e]">On the desk now</p>
            <div className="relative mt-10"><Icon name={latest.edition === "Morning" ? "sun" : "moon"} className="mb-4 h-8 w-8 text-[#e1bd7e]" /><p className="font-serif text-5xl italic">{latest.edition}<br />edition.</p><p className="mt-4 text-sm text-[#ddc9a6]">{latest.dateLabel}{latest.duration && ` · ${latest.duration} listen`}</p></div>
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-10"><p className="text-[11px] font-bold uppercase tracking-[.16em] text-[#775528] dark:text-[#e1bd7e]">Latest episode</p><h2 className="mt-4 text-3xl leading-tight">{latest.title}</h2><p className="my-5 leading-7 text-[#635134] dark:text-[#ddc9a6]">{latest.description}</p><DailyDropPlayer key={latest.slug} episode={latest} /><Link href={`/daily-ai-drop/${latest.slug}`} className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold underline underline-offset-4">Open the field notes <Icon name="arrowRight" /></Link></div>
        </div>
      </article>}
    </section>

    <section className="site-container pb-16" id="episodes">
      <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">The collection</p><h2 className="section-title mt-3">Every drop. Every rabbit hole.</h2></div><p className="text-sm text-[#5f6864] dark:text-[#b7c0bb]">{episodes.length} {episodes.length === 1 ? "episode" : "episodes"} in the archive</p></div>
      {!unavailable && episodes.length > 0 && <div className="my-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><label className="block sm:w-80"><span className="mb-2 block text-xs font-semibold">Find a topic or episode</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try LangChain, agents, October…" className="w-full rounded-xl border border-[#aeb8b1] bg-white px-4 py-3 text-sm dark:border-[#53605b] dark:bg-[#18211f]" /></label><div className="flex flex-wrap gap-2" role="group" aria-label="Filter by edition">{["All", "Morning", "Evening"].map((value) => <button key={value} type="button" aria-pressed={edition === value} onClick={() => setEdition(value)} className={edition === value ? "button-primary" : "button-secondary"}>{value}</button>)}</div></div>}
      {unavailable ? <div className="paper-card mt-7"><h3 className="text-2xl">The archive is taking a short break.</h3><p className="mt-3">Episodes could not be loaded right now.</p><a href="/daily-ai-drop" className="source-label mt-3">Try again <Icon name="arrowRight" /></a><a href={dailyDrop.repositoryUrl} target="_blank" rel="noopener noreferrer" className="source-label ml-5">Read on GitHub <Icon name="arrowUpRight" /></a></div> : <>
        <p role="status" className="sr-only">{filtered.length} matching episodes</p>
        <div className="divide-y divide-[#d8ddd8] border-y border-[#d8ddd8] dark:divide-[#34413d] dark:border-[#34413d]">
          {filtered.map((episode) => <Link key={episode.slug} href={`/daily-ai-drop/${episode.slug}`} className="group grid gap-5 py-7 transition sm:grid-cols-[130px_1fr_32px] sm:items-center">
            <div><time dateTime={episode.date} className="block text-sm font-semibold">{episode.dateLabel}</time><p className="mt-2 inline-flex items-center gap-2 text-xs text-[#775528] dark:text-[#e1bd7e]"><Icon name={episode.edition === "Morning" ? "sun" : "moon"} />{episode.edition}{episode.duration && ` · ${episode.duration}`}</p></div>
            <div><h3 className="text-2xl leading-snug group-hover:text-[#174b8b] dark:group-hover:text-[#a8c7ee]">{episode.title}</h3><p className="mt-3 max-w-3xl text-sm leading-6 text-[#5f6864] dark:text-[#b7c0bb]">{episode.description}</p><p className="mt-3 text-sm font-semibold underline underline-offset-4">Listen & explore the notes</p></div><Icon name="arrowUpRight" className="h-6 w-6" />
          </Link>)}
        </div>
        {filtered.length === 0 && <div className="py-12"><h3 className="text-2xl">{episodes.length ? "No drops here just yet." : "The first drop is on its way."}</h3><p className="mt-3 text-[#5f6864] dark:text-[#b7c0bb]">{episodes.length ? "Try another topic or switch editions." : "Check back for new conversations and episode notes."}</p>{episodes.length > 0 && <button type="button" onClick={() => { setQuery(""); setEdition("All"); }} className="source-label mt-3">Show all episodes <Icon name="arrowRight" /></button>}</div>}
      </>}
      <a href={dailyDrop.repositoryUrl} target="_blank" rel="noopener noreferrer" className="source-label mt-8">Follow the show on GitHub <Icon name="arrowUpRight" /></a>
    </section>
  </ContainerBlock>;
}

export async function getServerSideProps({ res }) {
  try {
    const episodes = await getEpisodes();
    const latest = await withAudioStatus(episodes[0]);
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
    return { props: { episodes, latest, unavailable: false } };
  } catch {
    res.statusCode = 503;
    res.setHeader("Cache-Control", "no-store");
    return { props: { episodes: [], latest: null, unavailable: true } };
  }
}
