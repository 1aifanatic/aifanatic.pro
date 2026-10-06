import { useState } from "react";

export default function DailyDropPlayer({ episode }) {
  const [failed, setFailed] = useState(false);
  if (!episode.audioAvailable || failed) {
    return <p role="status" className="rounded-xl border border-[#c9b894] bg-white/50 px-4 py-3 text-sm leading-5 text-[#635134] dark:border-[#665a43] dark:bg-[#111716]/40 dark:text-[#ddc9a6]">Audio is currently unavailable. The episode notes are ready to explore.</p>;
  }
  return <audio key={episode.audioUrl} controls preload="none" className="h-11 w-full min-w-0" aria-label={`Listen to ${episode.title}`} onError={() => setFailed(true)} src={episode.audioUrl}>Your browser does not support audio playback. <a href={episode.audioUrl}>Open the audio file</a></audio>;
}
