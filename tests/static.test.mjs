import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const app = await readFile(new URL("../app.js", import.meta.url), "utf8");
const css = await readFile(new URL("../app.css", import.meta.url), "utf8");
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
    assert.match(app, new RegExp(`id=["']${id}["']`));
  }
  assert.match(app, /function displayMessageInMain/);
  assert.match(app, /applyLanguage\(\);\s*\};/);
  assert.match(app, /data-quick="ai"/);
  assert.ok(app.includes("https://bein-qalbein.etudiantourg.workers.dev"));
  assert.match(app, /<textarea id="aiOutput"/);
  assert.match(app, /displayMessageInMain\(finalMessage/);
  assert.match(app, /function validBackupValue/);
  assert.match(app, /endsWith\('\.workers\.dev'\)/);
  assert.match(app, /optionLabels/);
  assert.match(app, /aiPrivacyNote/);
  assert.match(app, /Live generation test passed/);
  assert.ok(app.includes("url+'/generate'"));
  assert.ok(app.includes("Unified interaction router"));
  assert.match(app, /Your situation details are sent to Cloudflare AI/);
  assert.match(app, /تفاصيل الموقف تُرسل إلى Cloudflare AI/);
  assert.match(app, /aiSafetyNote/);
  assert.match(app, /rateLimited:/);
  assert.match(app, /safetyRejected:/);
  assert.match(app, /engineUnavailable:/);
  assert.match(app, /bq_ai_language_manual/);
  assert.match(app, /role==='wife'\?'للزوج':'للزوجة'/);
});

test("existing saved data is preserved and backup import is validated", () => {
  assert.match(app, /bq_favorites/);
  assert.match(app, /bq_recent_messages/);
  assert.match(app, /bq_custom_notes/);
  assert.match(app, /bq_favorite_folders/);
  assert.match(app, /bq_ai_language/);
  assert.match(app, /bq_ai_language_manual/);
  assert.match(app, /file\.size>2\*1024\*1024/);
  assert.match(app, /x\.length<=10000/);
  assert.match(app, /version:62,exportedAt:/);
  assert.match(app, /Your current data was left unchanged|لم نغيّر بياناتك الحالية/);
});

test("visual exclusions and honest privacy note remain in place", () => {
  assert.doesNotMatch(html, /🕊/u);
  assert.doesNotMatch(html, /fonts\\.bunny\\.net/);
  assert.doesNotMatch(html, /floral-garden|heart-bubbles|hero-motion/);
  assert.match(html, /class="skip-link" href="#mainContent"/);
  assert.match(html, /id="mainContent"/);
  assert.match(html, /id="message" aria-live="polite"/);
  assert.match(app, /const bqStorage=\\(\\(\\)=>/);
  assert.match(app, /section\\.inert=!active/);
  assert.match(app, /cardBtn:'card'/);
  assert.doesNotMatch(app, /cardBtn:'gift'/);
  assert.match(app, /ليس تشفيراً/);
});

test("new design system is responsive, accessible and motion-aware", () => {
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /safe-area-inset-bottom/);
  assert.match(css, /@media\\(max-width:420px\\)/);
  assert.match(css, /body\\.dark-mode/);
});

test("PWA cache and manifest remain coherent", () => {
  assert.equal(manifest.name, "BEIN QALBEIN PRO");
  assert.ok(sw.includes("'./app.js'") && sw.includes("'./app.css'"));
  assert.doesNotMatch(sw, /couple-header\\.jpg\\.png/); // large hero is runtime-cached, not precached on first install
  assert.match(sw, /navigationPreload/);
  assert.equal(manifest.start_url, "./");
  assert.ok(sw.includes('keys.filter(k=>k.startsWith("bein-qalbein-royal-")&&k!==CACHE)'));
  assert.match(sw, /const response=await fetch\(event\.request\)/);
  assert.match(sw, /const cached=await caches\.match\(event\.request\)/);
  assert.match(sw, /const CACHE='bein-qalbein-royal-v[0-9]+'/);
  for (const file of ["./index.html", "./app.js", "./app.css", "./manifest.json", "./icon.svg"]) assert.ok(sw.includes(file));
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
  assert.match(app, /data\.error&&status/);
});

test("legacy competing click routers were consolidated", () => {
  assert.ok(app.includes("Unified interaction router"));
  assert.ok(app.includes("#bottomNav button[data-go]"));
  assert.ok(!app.includes("V40 HOTFIX") && !app.includes("V44 — repair the four") && !app.includes("V46 — reliable bottom navigation"));
  assert.ok(!app.includes("hub.addEventListener('click'"));
  assert.match(app, /bq_favorites/);
  assert.match(app, /bq_recent_messages/);
  assert.match(app, /bq_custom_notes/);
});

test("delegated actions have no competing legacy inline handlers", () => {
  assert.ok(!app.includes("rescueSituation').onchange=showRescue"));
  assert.ok(!app.includes("buildMessageBtn').onclick"));
  assert.ok(!app.includes("useBuiltMessage').onclick"));
  assert.ok(!app.includes("copyBuiltMessage').onclick"));
  assert.ok(!app.includes("copyBtn').onclick"));
  assert.ok(!app.includes("b.onclick=()=>{selected=c.id"));
});
