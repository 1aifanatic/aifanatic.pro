import { useRef, useState } from "react";
import Icon from "@components/Icon";

const clock = (seconds) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;

export default function DailyDropPlayer({ episode }) {
  const audio = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [failed, setFailed] = useState(false);
  if (!episode.audioAvailable) {
    return <p role="status" className="rounded-xl border border-[#c9b894] bg-white/50 px-4 py-3 text-sm leading-5 text-[#635134] dark:border-[#665a43] dark:bg-[#111716]/40 dark:text-[#ddc9a6]">Audio is currently unavailable. The episode notes are ready to explore.</p>;
  }

  const toggle = async () => {
    if (!audio.current.paused) return audio.current.pause();
    setBuffering(true);
    try { await audio.current.play(); }
    catch { setFailed(true); setBuffering(false); }
  };
  const seek = (seconds) => {
    if (!duration) return;
    audio.current.currentTime = Math.max(0, Math.min(duration, seconds));
    setPosition(audio.current.currentTime);
  };
  const changeSpeed = () => {
    const rates = [1, 1.25, 1.5, 2];
    const next = rates[(rates.indexOf(speed) + 1) % rates.length];
    audio.current.playbackRate = next;
    setSpeed(next);
  };

  return <div role="group" aria-label={`Audio player: ${episode.title}`} className="rounded-2xl bg-[#18211f] p-4 text-[#f4ead8] shadow-sm sm:p-5">
    {/* ponytail: Native audio handles streaming; this card supplies the listening controls. */}
    <audio ref={audio} src={episode.audioUrl} preload="metadata" hidden
      onLoadedMetadata={(event) => { if (Number.isFinite(event.currentTarget.duration)) setDuration(event.currentTarget.duration); event.currentTarget.playbackRate = speed; }}
      onTimeUpdate={(event) => setPosition(event.currentTarget.currentTime)}
      onPlay={() => setPlaying(true)} onPause={() => { setPlaying(false); setBuffering(false); }}
      onPlaying={() => setBuffering(false)} onWaiting={() => setBuffering(true)} onCanPlay={() => setBuffering(false)}
      onEnded={() => { setPlaying(false); setBuffering(false); }}
      onError={() => { setFailed(true); setPlaying(false); setBuffering(false); }} />
    <div className="flex items-center gap-4">
      <button type="button" onClick={toggle} disabled={failed} aria-label={playing ? "Pause episode" : "Play episode"} className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#e1bd7e] text-[#18211f] transition hover:bg-[#f0ce95] focus-visible:outline-[#e1bd7e] disabled:opacity-40">
        <Icon name={playing ? "pause" : "play"} className="h-6 w-6" />
      </button>
      <div className="min-w-0"><p className="text-[10px] font-semibold uppercase tracking-[.18em] text-[#e1bd7e]">Listen to this drop</p><p role="status" className="mt-1 text-sm font-medium">{failed ? "Unable to load audio" : buffering ? "Loading audio…" : playing ? "Now playing" : duration && position >= duration ? "Episode finished. Listen again." : position > 0 ? "Paused · pick up where you left off" : "Press play. Get the perspective."}</p></div>
    </div>
    {failed ? <div className="mt-4 border-t border-[#46514c] pt-3"><p className="text-sm text-[#c5cec8]">Please retry, or explore the notes below.</p><button type="button" className="mt-2 min-h-[44px] text-sm font-semibold text-[#e1bd7e] underline underline-offset-4" onClick={() => { setFailed(false); setBuffering(true); audio.current.load(); }}>Retry audio</button></div> : <>
      <input type="range" min="0" max={duration || 1} step="1" value={Math.min(position, duration || 0)} disabled={!duration} onChange={(event) => seek(Number(event.target.value))} aria-label="Episode progress" aria-valuetext={`${clock(position)} of ${duration ? clock(duration) : episode.duration || "unknown duration"}`} className="mt-3 block h-8 w-full cursor-pointer accent-[#e1bd7e] focus-visible:outline-[#e1bd7e] disabled:cursor-wait" />
      <div className="flex justify-between text-xs tabular-nums text-[#c5cec8]"><span>{clock(position)}</span><span>{duration ? clock(duration) : episode.duration || "--:--"}</span></div>
      <div className="mt-2 flex items-center justify-between border-t border-[#46514c] pt-2">
        <div className="flex gap-1"><button type="button" onClick={() => seek(position - 15)} disabled={!duration} aria-label="Rewind 15 seconds" className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10 focus-visible:outline-[#e1bd7e] disabled:opacity-40"><Icon name="rewind" className="h-5 w-5" /></button><button type="button" onClick={() => seek(position + 15)} disabled={!duration} aria-label="Forward 15 seconds" className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10 focus-visible:outline-[#e1bd7e] disabled:opacity-40"><Icon name="forward" className="h-5 w-5" /></button><span className="self-center text-[10px] text-[#c5cec8]">15 sec</span></div>
        <button type="button" onClick={changeSpeed} aria-label={`Playback speed ${speed} times. Click to change speed.`} className="min-h-[44px] min-w-[44px] rounded-lg px-2 text-sm font-semibold tabular-nums hover:bg-white/10 focus-visible:outline-[#e1bd7e]">{speed}×</button>
      </div>
    </>}
  </div>;
}
