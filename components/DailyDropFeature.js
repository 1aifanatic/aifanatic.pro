import Link from "next/link";
import userData from "@constants/data";
import Icon from "./Icon";
import DailyDropPlayer from "./DailyDropPlayer";

export default function DailyDropFeature({ episode }) {
  return <article className="flex flex-col justify-center rounded-[1.35rem] border border-[#d8c7a7] bg-[#f4ead8] p-5 dark:border-[#665a43] dark:bg-[#29261e] sm:p-6 lg:col-span-5" aria-label="Latest Daily AI Drop episode">
    <div className="flex items-center justify-between gap-3"><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#775528] dark:text-[#e1bd7e]">Latest from the listening desk</p><Icon name={episode?.edition === "Evening" ? "moon" : "sun"} className="h-5 w-5 shrink-0 text-[#775528] dark:text-[#e1bd7e]" /></div>
    <h2 className="mt-2 text-3xl">{userData.dailyDrop.title}</h2>
    {episode ? <>
      <p className="mt-2 text-xs font-semibold text-[#775528] dark:text-[#e1bd7e]">{episode.edition} edition · {episode.dateLabel}{episode.duration && ` · ${episode.duration}`}</p>
      <p className="daily-drop-summary my-3 text-xs leading-5 text-[#635134] dark:text-[#ddc9a6]">{episode.description}</p>
      <DailyDropPlayer key={episode.slug} episode={episode} />
      <div className="mt-3 flex flex-wrap items-center gap-x-5"><Link href={`/daily-ai-drop/${episode.slug}`} className="inline-flex min-h-9 items-center gap-2 text-sm font-semibold underline underline-offset-4">Episode notes <Icon name="arrowRight" /></Link><Link href="/daily-ai-drop" className="inline-flex min-h-9 items-center text-sm font-semibold">All episodes ↗</Link></div>
    </> : <><p className="my-4 text-sm leading-6 text-[#635134] dark:text-[#ddc9a6]">{userData.dailyDrop.tagline} Explore the archive for episodes and show notes.</p><Link href="/daily-ai-drop" className="source-label">Visit the listening desk <Icon name="arrowRight" /></Link></>}
    <p className="mt-1 text-[10px] text-[#775528] dark:text-[#ddc9a6]">AI-generated conversations · Curated by Naveen</p>
  </article>;
}
