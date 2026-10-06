import { test, after } from "node:test";
import assert from "node:assert/strict";
import { getEpisodes, getEpisodeNotes, withAudioStatus } from "../lib/dailyDrop.js";

const originalFetch = globalThis.fetch;
after(() => { globalThis.fetch = originalFetch; });
const row = (date, edition, time) => ({
  title: `${date} ${edition}`, description: "A daily conversation", pub_utc: time,
  mp3_path: `episodes/${date}/${edition}/episode.mp3`, duration_secs: 381, guid: `${date}-${edition}`,
});

test("latest is chosen by publication time, with playback from the RSS enclosure", async () => {
  const rows = [row("2026-10-06", "am", "2026-10-06T12:00:00Z"), row("2026-10-05", "pm", "2026-10-06T00:00:00Z"), row("2026-10-06", "pm", "2026-10-07T00:00:00Z"), row("2026-10-07", "am", "invalid")];
  globalThis.fetch = async (url) => new Response(String(url).endsWith("episodes.json") ? JSON.stringify(rows) : `<rss><channel><item><guid isPermaLink="false">2026-10-06-pm</guid><enclosure type="audio/mpeg" url="https://navdatascience.github.io/daily-ai-drop/published.mp3?x=1&amp;y=2" /></item></channel></rss>`);
  const episodes = await getEpisodes();
  assert.deepEqual(episodes.map((episode) => episode.slug), ["2026-10-06-pm", "2026-10-06-am", "2026-10-05-pm"]);
  assert.equal(episodes[0].audioUrl, "https://navdatascience.github.io/daily-ai-drop/published.mp3?x=1&y=2");
  assert.equal(episodes[0].duration, "6:21");
  assert.equal(episodes[1].audioUrl, null);
});

test("Muse-hosted RSS audio is accepted while unrelated hosts are rejected", async () => {
  const rows = [row("2026-10-06", "am", "2026-10-06T12:00:00Z")];
  for (const audioUrl of ["https://muse.ai/podcasts/media/account/show/episode.mp3", "https://muse.ai.example.com/podcasts/media/episode.mp3", "http://127.0.0.1/audio.mp3"]) {
    globalThis.fetch = async (url) => new Response(String(url).endsWith("episodes.json") ? JSON.stringify(rows) : `<rss><channel><item><guid>2026-10-06-am</guid><enclosure url="${audioUrl}" /></item></channel></rss>`);
    const [episode] = await getEpisodes();
    assert.equal(episode.audioUrl, audioUrl === "https://muse.ai/podcasts/media/account/show/episode.mp3" ? audioUrl : null);
  }
});

test("remote notes cannot execute HTML or JavaScript and story anchors are unique", async () => {
  globalThis.fetch = async () => new Response('# Episode title\n\n## Stories\n\n### First\n\n[Watch](https://youtube.com/watch?v=abc)\n\n<script>alert(1)</script>\n\n[Unsafe](javascript:alert%281%29)\n\n<img src=x onerror=alert(1)>\n\n### Second\n\nA **useful** note.');
  const notes = await getEpisodeNotes({ notesPath: "episodes/2026-10-06/am/notes.md" });
  assert(!notes.html.includes("<script>"));
  assert(!notes.html.includes("<img"));
  assert(!notes.html.includes('href="javascript:'));
  assert(notes.html.includes('href="https://youtube.com/watch?v=abc"'));
  assert(notes.html.includes("<strong>useful</strong>"));
  const ids = [...notes.html.matchAll(/id="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(notes.headings.length, 2);
  assert(notes.headings.every((heading) => ids.includes(heading.id)));
});

test("missing media and HTML fallbacks do not become a broken player", async () => {
  const episode = { audioUrl: "https://navdatascience.github.io/daily-ai-drop/episode.mp3" };
  globalThis.fetch = async () => new Response("missing", { status: 404 });
  assert.equal((await withAudioStatus(episode)).audioAvailable, false);
  globalThis.fetch = async () => new Response("page", { headers: { "content-type": "text/html" } });
  assert.equal((await withAudioStatus(episode)).audioAvailable, false);
  globalThis.fetch = async () => new Response(null, { headers: { "content-type": "audio/mpeg" } });
  assert.equal((await withAudioStatus(episode)).audioAvailable, true);
  globalThis.fetch = async () => { throw new Error("offline"); };
  assert.equal((await withAudioStatus(episode)).audioAvailable, false);
  assert.equal(await withAudioStatus(null), null);
});

test("playback uses the final media URL after the publisher redirects", async () => {
  const finalUrl = "https://cdn.fbsbx.com/episode.mp3?signature=current";
  globalThis.fetch = async () => ({ ok: true, url: finalUrl, headers: new Headers({ "content-type": "audio/mpeg" }) });
  const result = await withAudioStatus({ audioUrl: "https://muse.ai/podcasts/media/account/show/episode.mp3" });
  assert.equal(result.audioUrl, finalUrl);
  assert.equal(result.audioAvailable, true);
});

test("source failures are explicit, and an empty registry is a valid empty archive", async () => {
  globalThis.fetch = async () => new Response("missing", { status: 404 });
  await assert.rejects(getEpisodes(), /404/);
  globalThis.fetch = async (url) => new Response(String(url).endsWith("episodes.json") ? '[]' : '<rss/>');
  assert.deepEqual(await getEpisodes(), []);
});
