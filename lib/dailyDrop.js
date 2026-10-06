import { marked } from "marked";
import userData from "../constants/data.js";

const { dailyDrop } = userData;
const read = async (file) => {
  const response = await fetch(new URL(file, dailyDrop.sourceBase), { signal: AbortSignal.timeout(6000) });
  if (!response.ok) throw new Error(`Daily Drop source returned ${response.status}`);
  return response.text();
};

const xmlText = (text) => text.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/&(amp|quot|apos|lt|gt);/g, (_, name) => ({ amp: "&", quot: '"', apos: "'", lt: "<", gt: ">" }[name]));

export async function getEpisodes() {
  const [registry, feed] = await Promise.all([read("episodes.json"), read("feed.xml")]);
  // ponytail: Read only the RSS enclosure map; the publisher's JSON supplies episode metadata.
  const enclosures = new Map([...feed.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/g)].map(([, item]) => {
    const guid = item.match(/<guid\b[^>]*>([\s\S]*?)<\/guid>/)?.[1];
    const url = item.match(/<enclosure\b[^>]*\burl=["']([^"']+)["']/)?.[1];
    return [xmlText(guid || "").trim(), xmlText(url || "")];
  }));
  const rows = JSON.parse(registry);
  if (!Array.isArray(rows)) throw new Error("Invalid Daily Drop registry");
  return rows.flatMap((row) => {
    const path = /^episodes\/(\d{4}-\d{2}-\d{2})\/(am|pm)\/episode\.mp3$/.exec(row.mp3_path || "");
    const timestamp = Date.parse(row.pub_utc);
    if (!path || !row.title || !Number.isFinite(timestamp)) return [];
    const audioUrl = enclosures.get(row.guid) || "";
    // Feed metadata and episode audio can be hosted on different services.
    const validAudio = dailyDrop.mediaBases.some((base) => audioUrl.startsWith(base));
    return [{
      slug: `${path[1]}-${path[2]}`,
      title: String(row.title),
      description: String(row.description || ""),
      publishedAt: new Date(timestamp).toISOString(),
      date: path[1],
      dateLabel: new Date(`${path[1]}T12:00:00Z`).toLocaleDateString("en-US", { timeZone: "UTC", month: "long", day: "numeric", year: "numeric" }),
      edition: path[2] === "am" ? "Morning" : "Evening",
      duration: Number.isFinite(row.duration_secs) && row.duration_secs > 0 ? `${Math.floor(row.duration_secs / 60)}:${String(Math.floor(row.duration_secs % 60)).padStart(2, "0")}` : null,
      notesPath: row.mp3_path.replace("episode.mp3", "notes.md"),
      audioUrl: validAudio ? audioUrl : null,
    }];
  }).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function withAudioStatus(episode) {
  if (!episode) return null;
  let audioAvailable = false;
  let audioUrl = episode.audioUrl;
  if (episode.audioUrl) {
    try {
      const response = await fetch(episode.audioUrl, { method: "HEAD", signal: AbortSignal.timeout(4000) });
      audioAvailable = response.ok && /^(audio\/|application\/octet-stream)/i.test(response.headers.get("content-type") || "");
      // Muse's redirect blocks cross-origin embeds; its final CDN response permits them.
      if (audioAvailable && response.url) audioUrl = response.url;
    } catch { /* The notes remain readable when audio hosting is unavailable. */ }
  }
  return { ...episode, audioUrl, audioAvailable };
}

export async function getEpisodeNotes(episode) {
  const markdown = await read(episode.notesPath);
  const headings = [];
  let headingIndex = 0;
  const renderer = new marked.Renderer();
  // Raw HTML is displayed as text, and links are restricted to ordinary Web URLs.
  renderer.html = ({ text }) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  renderer.link = function ({ href, tokens }) {
    const label = /^https:\/\/(www\.)?(youtube\.com|youtu\.be)\//i.test(href) && tokens.length === 1 && tokens[0].text === href
      ? "Watch source video ↗"
      : this.parser.parseInline(tokens);
    if (!/^https?:\/\//i.test(href)) return label;
    const safeHref = href.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return `<a href="${safeHref}" target="_blank" rel="noopener noreferrer">${label}</a>`;
  };
  renderer.image = ({ text }) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  renderer.heading = function ({ tokens, depth }) {
    const label = this.parser.parseInline(tokens);
    const id = `note-${++headingIndex}`;
    if (depth === 3) headings.push({ id, title: tokens.map((token) => token.text || "").join("") });
    return `<h${Math.max(2, depth)} id="${id}" class="scroll-mt-24">${label}</h${Math.max(2, depth)}>`;
  };
  const html = marked.parse(markdown.replace(/^# [^\n]+\n/, "").replace(/^(\*\*Channel:\*\*[^\n]*)$/gm, "$1\n"), { renderer });
  return { html, headings };
}
