import Link from "next/link";
import ContainerBlock from "@components/ContainerBlock";
import DailyDropPlayer from "@components/DailyDropPlayer";
import Icon from "@components/Icon";
import userData from "@constants/data";
import { getEpisodes, getEpisodeNotes, withAudioStatus } from "@lib/dailyDrop";

export default function Episode({ episode, notes, previous, next }) {
  if (!episode) return <ContainerBlock title="Episode unavailable - The Daily AI Drop" noIndex><section className="site-container page-section"><h1 className="display-title">A brief interruption.</h1><p className="page-lede">This episode could not be loaded. Please try again shortly.</p><Link href="/daily-ai-drop" className="source-label mt-6">Back to all episodes <Icon name="arrowRight" /></Link></section></ContainerBlock>;
  return <ContainerBlock title={`${episode.title} - Naveen Chatlapalli`} description={episode.description}>
    <section className="site-container page-section">
      <Link href="/daily-ai-drop" className="source-label">← All episodes</Link>
      <div className="mt-7 grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
        <aside className="lg:sticky lg:top-24">
          <div className="rounded-[1.35rem] border border-[#d8c7a7] bg-[#f4ead8] p-6 dark:border-[#665a43] dark:bg-[#29261e] sm:p-8">
            <div className="flex items-center gap-3 text-[#775528] dark:text-[#e1bd7e]"><Icon name={episode.edition === "Morning" ? "sun" : "moon"} className="h-6 w-6" /><p className="text-xs font-semibold uppercase tracking-[.15em]">{episode.edition} edition{episode.duration && ` · ${episode.duration}`}</p></div>
            <p className="mt-5 font-serif text-3xl">{userData.dailyDrop.title}</p><time dateTime={episode.date} className="mt-2 block text-sm text-[#635134] dark:text-[#ddc9a6]">{episode.dateLabel}</time>
            <div className="mt-6"><DailyDropPlayer key={episode.slug} episode={episode} /></div>
            <p className="mt-5 text-xs leading-6 text-[#635134] dark:text-[#ddc9a6]">{userData.dailyDrop.disclosure}</p>
          </div>
          {notes?.headings.length > 0 && <details className="mt-7 rounded-xl border border-[#d8ddd8] p-4 dark:border-[#34413d]"><summary className="cursor-pointer text-sm font-semibold">Explore the {notes.headings.length} stories in this episode</summary><nav aria-label="Stories in this episode"><ol className="mt-3 space-y-1">{notes.headings.map((heading) => <li key={heading.id}><a href={`#${heading.id}`} className="block rounded-lg px-2 py-2 text-sm leading-5 text-[#5f6864] hover:bg-white hover:text-[#174b8b] dark:text-[#b7c0bb] dark:hover:bg-[#18211f] dark:hover:text-[#a8c7ee]">{heading.title}</a></li>)}</ol></nav></details>}
        </aside>
        <article className="min-w-0">
          <p className="eyebrow">The field notes</p><h1 className="mt-4 text-4xl leading-tight sm:text-5xl">{episode.title}</h1><p className="mt-5 text-lg leading-8 text-[#5f6864] dark:text-[#b7c0bb]">{episode.description}</p>
          {notes ? <div className="article-copy daily-drop-notes mt-8 border-t border-[#d8ddd8] pt-3 dark:border-[#34413d]" dangerouslySetInnerHTML={{ __html: notes.html }} /> : <div className="paper-card mt-8"><h2 className="text-2xl">The notes aren’t available right now.</h2><p className="mt-3 leading-7">You can check the original notes or return to this episode shortly.</p></div>}
          <a href={`${userData.dailyDrop.repositoryUrl}/blob/main/${episode.notesPath}`} target="_blank" rel="noopener noreferrer" className="source-label mt-6">Original episode notes <Icon name="arrowUpRight" /></a>
          <nav aria-label="More episodes" className="mt-10 flex flex-wrap justify-between gap-4 border-t border-[#d8ddd8] pt-6 dark:border-[#34413d]">{previous && <Link href={`/daily-ai-drop/${previous.slug}`} className="source-label">← Older: {previous.dateLabel} · {previous.edition}</Link>}{next && <Link href={`/daily-ai-drop/${next.slug}`} className="source-label">Newer: {next.dateLabel} · {next.edition} →</Link>}</nav>
        </article>
      </div>
    </section>
  </ContainerBlock>;
}

export async function getServerSideProps({ params, res }) {
  if (!/^\d{4}-\d{2}-\d{2}-(am|pm)$/.test(params.episode)) return { notFound: true };
  try {
    const episodes = await getEpisodes();
    const index = episodes.findIndex((episode) => episode.slug === params.episode);
    if (index === -1) return { notFound: true };
    const [episode, notes] = await Promise.all([withAudioStatus(episodes[index]), getEpisodeNotes(episodes[index]).catch(() => null)]);
    res.setHeader("Cache-Control", notes ? "public, s-maxage=300, stale-while-revalidate=600" : "no-store");
    return { props: { episode, notes, previous: episodes[index + 1] || null, next: episodes[index - 1] || null } };
  } catch {
    res.statusCode = 503;
    res.setHeader("Cache-Control", "no-store");
    return { props: { episode: null, notes: null, previous: null, next: null } };
  }
}
