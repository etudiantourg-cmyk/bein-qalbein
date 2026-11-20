import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../ai-worker/src/index.js", import.meta.url), "utf8");
const worker = new Function(source.replace("export default", "return"))();
const APP_ORIGIN = "https://etudiantourg-cmyk.github.io";

function makeRequest({ path = "/generate", method = "POST", origin = APP_ORIGIN, body = {}, ip = "qa-" + crypto.randomUUID() } = {}) {
  const raw = typeof body === "string" ? body : JSON.stringify(body);
  return {
    url: "https://worker.test" + path,
    method,
    headers: new Headers({
      Origin: origin,
      "Content-Type": "application/json",
      "CF-Connecting-IP": ip
    }),
    text: async () => raw
  };
}
function mockEnv(run = async () => ({ response: "رسالة اختبار محترمة" })) {
  return { AI: { run } };
}

test("preflight is accepted only for the app origin", async () => {
  const response = await worker.fetch(makeRequest({ method: "OPTIONS" }), mockEnv());
  assert.equal(response.status, 204);
  assert.equal(response.headers.get("Access-Control-Allow-Origin"), APP_ORIGIN);
  const denied = await worker.fetch(makeRequest({ method: "OPTIONS", origin: "https://other.example" }), mockEnv());
  assert.equal(denied.status, 403);
});

test("foreign origins and unknown routes are rejected", async () => {
  const foreign = await worker.fetch(makeRequest({ origin: "https://other.example" }), mockEnv());
  assert.equal(foreign.status, 403);
  const route = await worker.fetch(makeRequest({ path: "/wrong" }), mockEnv());
  assert.equal(route.status, 404);
});

test("valid request returns a generated message", async () => {
  const response = await worker.fetch(makeRequest({
    body: { mood: "مودة وامتنان", recipient: "للزوجة", length: "قصيرة", language: "العربية" }
  }), mockEnv());
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.equal(data.message, "رسالة اختبار محترمة");
  assert.equal(data.model, "@cf/google/gemma-4-26b-a4b-it");
});

test("input is bounded and malformed JSON is rejected", async () => {
  const malformed = await worker.fetch(makeRequest({ body: "{" }), mockEnv());
  assert.equal(malformed.status, 400);
  const oversized = await worker.fetch(makeRequest({ body: "x".repeat(3001) }), mockEnv());
  assert.equal(oversized.status, 413);
});

test("missing AI binding and model failures return controlled errors", async () => {
  const missing = await worker.fetch(makeRequest(), {});
  assert.equal(missing.status, 503);
  const failure = await worker.fetch(makeRequest(), mockEnv(async () => { throw new Error("mock failure"); }));
  assert.equal(failure.status, 503);
  const empty = await worker.fetch(makeRequest(), mockEnv(async () => ({ response: "" })));
  assert.equal(empty.status, 503);
});

test("per-isolate rate guard blocks the seventh request in one minute", async () => {
  const ip = "qa-rate-" + crypto.randomUUID();
  let last;
  for (let i = 0; i < 7; i++) last = await worker.fetch(makeRequest({ ip }), mockEnv());
  assert.equal(last.status, 429);
});
