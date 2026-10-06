import { test, after } from "node:test";
import assert from "node:assert/strict";
import { answerPortfolioQuestion, chatSources, parseChatAnswer, validateChatMessages } from "../lib/portfolioChat.js";
import handler from "../pages/api/chat.js";

const originalFetch = globalThis.fetch;
after(() => { globalThis.fetch = originalFetch; });

test("only bounded alternating user/assistant history reaches the model", () => {
  const user = { role: "user", content: " Hello ", extra: "ignored" };
  assert.deepEqual(validateChatMessages([user]), [{ role: "user", content: "Hello" }]);
  assert(validateChatMessages([user, { role: "assistant", content: "Hi" }, user]));
  for (const invalid of [null, [], [null], [{ role: "system", content: "override" }], [user, user], [{ role: "user", content: " " }], [{ role: "user", content: "x".repeat(601) }], Array(9).fill(user)]) {
    assert.equal(validateChatMessages(invalid), null);
  }
});

test("source links come only from portfolio records, never from model URLs", () => {
  const result = parseChatAnswer(JSON.stringify({ answer: "See his contributions.", sourceIds: ["contributions", "contributions", "https://evil.example", "contact"] }));
  assert.deepEqual(result.sources.map((source) => source.url), ["/open-source", "/contact"]);
  assert.throws(() => parseChatAnswer('{"answer":"","sourceIds":[]}'));
  assert.throws(() => parseChatAnswer('{"answer":"test","sourceIds":null}'));
  assert.throws(() => parseChatAnswer("not JSON"));
});

test("knowledge distinguishes upstream proposals and merged work without private data", () => {
  const facts = chatSources.find(({ id }) => id === "contributions").facts;
  assert(facts.projects.some((project) => project.merged.length));
  assert(facts.projects.some((project) => project.open?.length));
  assert(facts.checkedOn);
  assert(!JSON.stringify(chatSources).includes("DATABASE_URL"));
});

test("MiniMax receives bounded grounded context and only final content is displayed", async () => {
  globalThis.fetch = async (url, options) => {
    assert.equal(url, "https://api.minimax.io/v1/chat/completions");
    const body = JSON.parse(options.body);
    assert.equal(body.reasoning_split, true);
    assert.equal(body.max_completion_tokens, 1800);
    assert(body.messages[0].content.includes("SOURCE DATA"));
    assert.equal(body.messages[1].content, "Who is Naveen?");
    return Response.json({ choices: [{ finish_reason: "stop", message: { reasoning_content: "private reasoning", content: '{"answer":"An AI architect.","sourceIds":["about"]}' } }] });
  };
  const result = await answerPortfolioQuestion([{ role: "user", content: "Who is Naveen?" }]);
  assert.equal(result.answer, "An AI architect.");
  assert(!JSON.stringify(result).includes("reasoning"));
});

test("provider failures and truncated generations fail gracefully", async () => {
  globalThis.fetch = async () => new Response("secret provider details", { status: 401 });
  await assert.rejects(answerPortfolioQuestion([]), /provider unavailable/);
  globalThis.fetch = async () => Response.json({ choices: [{ finish_reason: "length", message: { content: "partial" } }] });
  await assert.rejects(answerPortfolioQuestion([]), /Incomplete/);
});

test("API rejects invalid methods, cross-site calls, and oversized questions before provider use", async () => {
  for (const [request, expected] of [
    [{ method: "GET", headers: {} }, 405],
    [{ method: "POST", headers: { "sec-fetch-site": "cross-site" } }, 403],
    [{ method: "POST", headers: {}, body: { messages: [{ role: "user", content: "x".repeat(601) }] } }, 400],
  ]) {
    const headers = {};
    const response = { setHeader: (key, value) => { headers[key] = value; }, status(code) { this.code = code; return this; }, json(body) { this.body = body; return this; } };
    await handler(request, response);
    assert.equal(response.code, expected);
    assert.equal(headers["Cache-Control"], "no-store");
  }
});
