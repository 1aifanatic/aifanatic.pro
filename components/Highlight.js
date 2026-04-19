import React, { useMemo, useState } from "react";
import Image from "next/image";
import userData from "@constants/data";

const PLACEHOLDER = "/images/highlight-placeholder.svg";

/** YouTube video id: 11 chars from [A-Za-z0-9_-] */
const YT_ID_RE = /^[a-zA-Z0-9_-]{11}$/;

/** Extract YouTube video id from common URL shapes. */
function getYoutubeVideoId(url) {
  if (!url || typeof url !== "string") return null;
  try {
    const normalized = /^https?:\/\//i.test(url) ? url : `https://${url}`;
    const parsed = new URL(normalized);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const seg = parsed.pathname.split("/").filter(Boolean)[0] || "";
      const id = seg.split("?")[0];
      return id && YT_ID_RE.test(id) ? id : null;
    }

    const isYoutubeHost =
      host === "youtube.com" ||
      host === "m.youtube.com" ||
      host === "www.youtube.com" ||
      host.endsWith(".youtube.com");

    if (isYoutubeHost) {
      if (parsed.pathname.startsWith("/watch")) {
        const v = parsed.searchParams.get("v");
        if (v && YT_ID_RE.test(v)) return v;
      }
      const embed = parsed.pathname.match(/^\/embed\/([a-zA-Z0-9_-]{11})/);
      if (embed) return embed[1];
      const shorts = parsed.pathname.match(/^\/shorts\/([a-zA-Z0-9_-]{11})/);
      if (shorts) return shorts[1];
    }
  } catch {
    return null;
  }
  return null;
}

function youtubeImgYoutubeCom(videoId) {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

function inferKind(proj) {
  if (proj.kind) return proj.kind;
  const u = proj.link || "";
  if (/youtube\.com|youtu\.be/i.test(u)) return "youtube";
  return "event";
}

function KindBadge({ kind }) {
  const isYt = kind === "youtube";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide backdrop-blur-md ${
        isYt
          ? "bg-red-600/90 text-white ring-1 ring-white/20"
          : "bg-violet-600/90 text-white ring-1 ring-white/20"
      }`}
    >
      {isYt ? (
        <>
          <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          Video
        </>
      ) : (
        <>
          <span className="text-[0.65rem] leading-none">◇</span>
          Community
        </>
      )}
    </span>
  );
}

function PlayOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      aria-hidden
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black/55 text-white shadow-lg ring-2 ring-white/30 backdrop-blur-sm md:h-20 md:w-20">
        <svg className="ml-1 h-8 w-8 md:h-10 md:w-10" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </div>
  );
}

function HighlightCard({ proj, featured }) {
  const kind = inferKind(proj);
  const isYoutube = kind === "youtube";
  const videoId = useMemo(() => getYoutubeVideoId(proj.link), [proj.link]);

  const [imgSrc, setImgSrc] = useState(() => {
    if (videoId) return youtubeImgYoutubeCom(videoId);
    return proj.imgUrl || PLACEHOLDER;
  });

  const handleImgError = () => {
    setImgSrc((prev) => {
      if (prev === PLACEHOLDER) return prev;

      if (videoId) {
        if (prev.includes("img.youtube.com")) {
          return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
        }
        if (prev.includes("i.ytimg.com") && prev.endsWith("/hqdefault.jpg")) {
          return `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;
        }
        if (prev.includes("i.ytimg.com") && prev.endsWith("/mqdefault.jpg")) {
          return `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`;
        }
        if (prev.includes("i.ytimg.com") && prev.endsWith("/sddefault.jpg")) {
          return `/api/yt-thumbnail?id=${encodeURIComponent(videoId)}`;
        }
        if (prev.includes("/api/yt-thumbnail")) {
          if (
            proj.imgUrl &&
            !String(proj.imgUrl).includes("ytimg") &&
            !String(proj.imgUrl).includes("youtube")
          ) {
            return proj.imgUrl;
          }
          return PLACEHOLDER;
        }
        return PLACEHOLDER;
      }

      if (proj.imgUrl && prev === proj.imgUrl) {
        return PLACEHOLDER;
      }
      return PLACEHOLDER;
    });
  };

  return (
    <a
      href={proj.link}
      className={`group relative flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-200/80 transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:bg-gray-800/80 dark:ring-white/10 dark:hover:ring-white/20 ${
        featured ? "md:rounded-3xl" : ""
      }`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={proj.title}
    >
      <div
        className={`relative isolate w-full min-h-[14rem] shrink-0 overflow-hidden bg-slate-900 ${
          featured ? "aspect-video md:min-h-[17rem]" : "aspect-[16/10] md:aspect-video"
        }`}
      >
        <Image
          key={imgSrc}
          src={imgSrc}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 720px"
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
          unoptimized
          priority={Boolean(featured)}
          referrerPolicy="no-referrer"
          onError={handleImgError}
        />
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black via-black/75 to-black/25" />
        {isYoutube ? <PlayOverlay /> : null}
        <div className="absolute left-0 right-0 top-0 z-20 flex flex-wrap items-start justify-between gap-2 p-4 md:p-5">
          {proj.featured ? (
            <span className="rounded-full bg-amber-400/95 px-3 py-1 text-xs font-bold uppercase tracking-wide text-gray-900 shadow-sm">
              Latest
            </span>
          ) : (
            <span className="w-0 shrink-0" />
          )}
          <KindBadge kind={kind} />
        </div>
        <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/90 to-transparent p-4 pt-10 md:p-6 md:pt-12">
          <h2
            className={`font-semibold leading-snug text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.85)] ${
              featured ? "text-xl md:text-2xl lg:text-3xl" : "text-base md:text-lg lg:text-xl"
            }`}
          >
            {proj.title}
          </h2>
          <p className="mt-2 text-sm font-medium text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.8)]">
            {isYoutube ? "Watch on YouTube" : "Open event page"}
            <span className="ml-1 inline-block transition group-hover:translate-x-0.5">→</span>
          </p>
        </div>
      </div>
    </a>
  );
}

export default function Highlight() {
  const list = userData.highlight || [];
  const featuredIdx = list.findIndex((h) => h.featured);
  const featured = featuredIdx >= 0 ? list[featuredIdx] : null;
  const gridItems =
    featuredIdx >= 0 ? list.filter((_, i) => i !== featuredIdx) : list;

  return (
    <section className="relative overflow-hidden border-t border-gray-200/80 bg-gradient-to-b from-slate-50 to-white dark:border-white/10 dark:from-gray-900 dark:to-gray-950">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent dark:via-violet-500/40"
        aria-hidden
      />
      <div className="mx-auto max-w-6xl px-4 pt-14 pb-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400 md:text-left">
          Stay in the loop
        </p>
        <div className="mt-2 flex flex-col items-center gap-4 md:flex-row md:items-end md:justify-between">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
              Recent highlights
            </h2>
            <p className="mt-3 max-w-2xl text-base text-gray-600 dark:text-gray-400">
              Community sessions, recordings, and videos—curated so you can catch up quickly.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        {featured ? (
          <div className="mb-10 md:mb-12">
            <HighlightCard proj={featured} featured />
          </div>
        ) : null}

        <div
          className={`grid gap-6 sm:gap-8 ${
            gridItems.length === 1
              ? "grid-cols-1"
              : "grid-cols-1 md:grid-cols-2"
          }`}
        >
          {gridItems.map((proj, idx) => (
            <HighlightCard key={`${proj.link}-${idx}`} proj={proj} featured={false} />
          ))}
        </div>
      </div>
    </section>
  );
}
