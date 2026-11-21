import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const sw = await readFile(new URL("../sw.js", import.meta.url), "utf8");
const manifest = JSON.parse(await readFile(new URL("../manifest.json", import.meta.url), "utf8"));
const worker = await readFile(new URL("../ai-worker/src/index.js", import.meta.url), "utf8");

test("application JavaScript parses and element IDs are unique", () => {
  const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map(match => match[1]).filter(Boolean);
  assert.ok(scripts.length > 0, "expected an application script");
  for (const script of scripts) new Function(script);
  const ids = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, "duplicate HTML IDs found");
});

test("main controls, AI connection test and safe message display exist", () => {
  for (const id of ["quickHub", "aiTestEndpoint", "cats", "message", "favorites", "aiGenerateBtn", "aiEndpoint", "saveAiEndpoint", "aiTestEndpoint", "aiUseBtn", "aiCopyBtn", "aiMoreBtn", "rescueGenerate", "buildMessageBtn"]) {
    assert.match(html, new RegExp(`id=["']${id}["']`));
  }
  assert.match(html, /function displayMessageInMain/);
  assert.match(html, /applyLanguage\(\);\s*\};/);
  assert.match(html, /data-quick="ai"/);
  assert.match(html, /<textarea id="aiOutput"/);
  assert.match(html, /displayMessageInMain\(finalMessage/);
  assert.match(html, /function validBackupValue/);
  assert.match(html, /endsWith\('\.workers\.dev'\)/);
  assert.match(html, /optionLabels/);
  assert.match(html, /aiPrivacyNote/);
  assert.match(html, /Your situation details are sent to Cloudflare AI/);
  assert.match(html, /تفاصيل الموقف تُرسل إلى Cloudflare AI/);
  assert.match(html, /aiSafetyNote/);
  assert.match(html, /rateLimited:/);
  assert.match(html, /safetyRejected:/);
  assert.match(html, /engineUnavailable:/);
  assert.match(html, /bq_ai_language_manual/);
  assert.match(html, /role==='wife'\?'للزوج':'للزوجة'/);
});

test("existing saved data is preserved and backup import is validated", () => {
  assert.match(html, /bq_favorites/);
  assert.match(html, /bq_recent_messages/);
  assert.match(html, /bq_custom_notes/);
  assert.match(html, /bq_favorite_folders/);
  assert.match(html, /bq_ai_language/);
  assert.match(html, /bq_ai_language_manual/);
  assert.match(html, /file\.size>2\*1024\*1024/);
  assert.match(html, /x\.length<=10000/);
  assert.match(html, /version:62,exportedAt:/);
  assert.match(html, /Your current data was left unchanged|لم نغيّر بياناتك الحالية/);
});

test("visual exclusions and honest privacy note remain in place", () => {
  assert.doesNotMatch(html, /🕊/u);
  assert.match(html, /cardBtn:'card'/);
  assert.doesNotMatch(html, /cardBtn:'gift'/);
  assert.match(html, /ليس تشفيراً/);
});

test("PWA cache and manifest remain coherent", () => {
  assert.equal(manifest.name, "BEIN QALBEIN PRO");
  assert.equal(manifest.start_url, "./");
  assert.ok(sw.includes('keys.filter(k=>k.startsWith("bein-qalbein-royal-")&&k!==CACHE)'));
  assert.match(sw, /const response=await fetch\\(event\\.request\\)/);
  assert.match(sw, /const cached=await caches\\.match\\(event\\.request\\)/);
  assert.match(sw, /const CACHE='bein-qalbein-royal-v[0-9]+'/);
  for (const file of ["./index.html", "./manifest.json", "./icon.svg", "./couple-header.jpg.png"]) assert.ok(sw.includes(file));
});

test("AI worker has a real health route and bounded request processing", () => {
  assert.match(worker, /url\.pathname === "\/health"/);
  assert.match(worker, /readBoundedBody/);
  assert.match(worker, /clearlyUnsafeOutput/);
  assert.match(worker, /containsReligiousAttribution/);
  assert.match(worker, /enable_thinking:\s*false/);
  assert.match(worker, /chat_template_kwargs/);
  assert.match(worker, /max_completion_tokens/);
  assert.match(worker, /result\?\.choices\?\.\[0\]\?\.message\?\.content/);
  assert.match(html, /data\.error&&status/);
});
