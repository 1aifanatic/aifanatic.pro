import { useEffect, useRef, useState } from "react";
import userData from "@constants/data";
import Icon from "./Icon";

export default function PortfolioChat() {
  const dialog = useRef(null);
  const launcher = useRef(null);
  const transcript = useRef(null);
  const request = useRef(null);
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const { chat } = userData;

  useEffect(() => () => request.current?.abort(), []);
  useEffect(() => {
    if (transcript.current) transcript.current.scrollTop = transcript.current.scrollHeight;
  }, [messages, busy, error]);

  async function ask(text) {
    const content = text.trim();
    if (!content || request.current) return;
    const history = [...messages, { role: "user", content }];
    const controller = new AbortController();
    request.current = controller;
    setMessages(history);
    setQuestion("");
    setError("");
    setBusy(true);
    const timeout = setTimeout(() => controller.abort(), 30000);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.slice(-7).map(({ role, content }) => ({ role, content })) }),
        signal: controller.signal,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "The chat is unavailable. Please try again.");
      setMessages([...history, { role: "assistant", content: result.answer, sources: result.sources }]);
    } catch (failure) {
      setMessages(history.slice(0, -1));
      setQuestion(content);
      setError(failure.name === "AbortError" ? "That took too long. Please try again." : failure.message);
    } finally {
      clearTimeout(timeout);
      request.current = null;
      setBusy(false);
    }
  }

  return <>
    <button ref={launcher} type="button" onClick={() => dialog.current.showModal()} aria-haspopup="dialog" className="button-primary fixed bottom-5 right-5 z-40 gap-2 border border-[#aeb8b1] shadow-lg">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true"><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l-1 1V11.5a9 9 0 0 1 18 0Z"/><path d="M7 9h10M7 13h7"/></svg>
      {chat.title}
    </button>
    <dialog ref={dialog} onClose={() => launcher.current?.focus()} aria-labelledby="portfolio-chat-title" className="portfolio-chat rounded-2xl border border-[#c7cfca] bg-[#f8f7f3] p-0 text-[#18211f] shadow-2xl backdrop:bg-black/30 dark:border-[#46514c] dark:bg-[#18211f] dark:text-[#eef1ed]">
      <div className="flex h-full flex-col">
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-[#c7cfca] p-4 dark:border-[#46514c]">
          <div><p className="eyebrow">Portfolio assistant</p><h2 id="portfolio-chat-title" className="mt-1 text-2xl">{chat.title}</h2></div>
          <button type="button" onClick={() => dialog.current.close()} aria-label="Close chat" autoFocus className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#aeb8b1]"><Icon name="close" /></button>
        </header>
        <div ref={transcript} className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4" role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions text">
          <p className="text-sm leading-6">{chat.welcome}</p>
          {messages.length === 0 && <div className="mt-4 grid gap-2">{chat.suggestions.map((text) => <button type="button" key={text} onClick={() => ask(text)} className="rounded-xl border border-[#aeb8b1] p-3 text-left text-sm transition hover:bg-[#e9eff8] dark:hover:bg-[#203a5a]">{text} <span aria-hidden="true">↗</span></button>)}</div>}
          {messages.map((message, i) => <article key={i} className={`mt-4 rounded-xl p-3 ${message.role === "user" ? "ml-6 bg-[#e9eff8] dark:bg-[#203a5a]" : "mr-3 border border-[#c7cfca] bg-white dark:border-[#46514c] dark:bg-[#111716]"}`}>
            <p className="mb-1 text-xs font-semibold">{message.role === "user" ? "You" : "Portfolio assistant"}</p>
            <p className="whitespace-pre-wrap break-words text-sm leading-6">{message.content}</p>
            {message.sources?.length > 0 && <ul className="mt-3 space-y-2 border-t border-[#aeb8b1] pt-2" aria-label="Sources">{message.sources.map((source) => <li key={source.url}><a href={source.url} className="text-link text-xs" onClick={() => dialog.current.close()}>{source.title} ↗</a></li>)}</ul>}
          </article>)}
          {busy && <p role="status" className="mt-4 text-sm">Looking through the portfolio…</p>}
        </div>
        <form onSubmit={(event) => { event.preventDefault(); ask(question); }} className="shrink-0 border-t border-[#c7cfca] p-4 dark:border-[#46514c]">
          {error && <p role="alert" className="mb-3 text-sm text-[#a02727] dark:text-[#ffb4b4]">{error} <a href="/contact" className="underline">Contact Naveen</a></p>}
          <label htmlFor="portfolio-question" className="sr-only">Your question about Naveen</label>
          <div className="flex gap-2"><input id="portfolio-question" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask about my work…" maxLength={600} required autoComplete="off" className="min-w-0 flex-1 rounded-xl border border-[#aeb8b1] bg-white px-3 py-3 text-base dark:bg-[#111716]" /><button type="submit" disabled={busy || !question.trim()} className="button-primary px-4 disabled:cursor-not-allowed disabled:opacity-50">Send</button></div>
          <p className="mt-2 text-[11px] leading-4 text-[#5f6864] dark:text-[#b7c0bb]">{chat.disclosure}</p>
        </form>
      </div>
    </dialog>
  </>;
}
