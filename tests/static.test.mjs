import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const app = await readFile(new URL("../app.js", import.meta.url), "utf8");
const contentData = await readFile(new URL("../content-data.js", import.meta.url), "utf8");
const aiStudio = await readFile(new URL("../ai-studio.js", import.meta.url), "utf8");
const css = await readFile(new URL("../app.css", import.meta.url), "utf8");
const sw = await readFile(new URL("../sw.js", import.meta.url), "utf8");
const manifest = JSON.parse(await readFile(new URL("../manifest.json", import.meta.url), "utf8"));
const worker = await readFile(new URL("../ai-worker/src/index.js", import.meta.url), "utf8");

test("external app assets parse and HTML IDs are unique", () => {
  assert.match(html, /<script src="\.\/app\.js" defer><\/script>/);
  assert.match(html, /<link rel="stylesheet" href="\.\/app\.css">/);
  assert.doesNotMatch(html, /<script>([\s\S]*?)<\/script>/);
  new Function(app);
  new Function(contentData);
  assert.ok(contentData.includes("window.BQ_DATA"));
  assert.ok(app.includes("} = window.BQ_DATA;"));
  assert.ok(html.indexOf("./content-data.js") < html.indexOf("./app.js"));
  new Function(aiStudio);
  assert.match(html, /<script src="\.\/ai-studio\.js" defer><\/script>/);
  assert.doesNotMatch(app, /AI Studio client/);
  assert.match(aiStudio, /if\(window\.applyAiStudioLanguage\)window\.applyAiStudioLanguage\(\)/);
  const ids = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, "duplicate HTML IDs found");
});

test("core features, AI studio and safe message display are present", () => {
  for (const id of ["quickHub", "aiTestEndpoint", "cats", "message", "favorites", "aiGenerateBtn", "aiEndpoint", "saveAiEndpoint", "aiUseBtn", "aiCopyBtn", "aiMoreBtn", "rescueGenerate", "buildMessageBtn"]) {
    assert.match(html, new RegExp(`id=["']${id}["']`));
  }
  assert.match(app, /function displayMessageInMain/);
  assert.match(app, /applyLanguage\(\);\s*\};/);
  assert.match(html, /data-quick="ai"/);
  assert.ok(aiStudio.includes("https://bein-qalbein.etudiantourg.workers.dev"));
  assert.match(html, /<textarea id="aiOutput"/);
  assert.match(aiStudio, /displayMessageInMain\(finalMessage/);
  assert.match(app, /function validBackupValue/);
  assert.match(aiStudio, /endsWith\('\.workers\.dev'\)/);
  assert.match(aiStudio, /optionLabels/);
  assert.match(aiStudio, /aiPrivacyNote/);
  assert.match(aiStudio, /Live generation test passed/);
  assert.ok(aiStudio.includes("url+'/generate'"));
  assert.ok(app.includes("Unified interaction router"));
  assert.match(aiStudio, /Your situation details are sent to Cloudflare AI/);
  assert.match(aiStudio, /تفاصيل الموقف تُرسل إلى Cloudflare AI/);
  assert.match(aiStudio, /aiSafetyNote/);
  assert.match(aiStudio, /rateLimited:/);
  assert.match(aiStudio, /safetyRejected:/);
  assert.match(aiStudio, /engineUnavailable:/);
  assert.match(aiStudio, /bq_ai_language_manual/);
  assert.match(aiStudio, /role==='wife'\?'للزوج':'للزوجة'/);
});

test("saved user data remains compatible and backup import is validated", () => {
  for (const key of ["bq_favorites", "bq_recent_messages", "bq_custom_notes", "bq_favorite_folders", "bq_ai_language", "bq_ai_language_manual"]) assert.ok(app.includes(key));
  assert.match(app, /file\.size>2\*1024\*1024/);
  assert.ok(app.includes("if(!bqStorage.persistent)throw Error('storage-unavailable')"));
  assert.ok(app.includes("rollback-incomplete"));
  assert.match(app, /x\.length<=10000/);
  assert.match(app, /version:62,exportedAt:/);
  assert.match(app, /Your current data was left unchanged|لم نغيّر بياناتك الحالية/);
  assert.match(app, /const bqStorage=\(\(\)=>/);
  assert.ok(app.includes("window.localStorage"));
  const storage = app.slice(app.indexOf("const bqStorage=(()=>"), app.indexOf("let role="));
  assert.match(storage, /if\(memory\.has\(k\)\)return memory\.get\(k\)/);
  assert.match(storage, /if\(cleared\|\|removed\.has\(k\)\)return null/);
  assert.match(storage, /const keys=\(\)=>/);
  assert.match(storage, /get persistent\(\)/);
  assert.ok(app.includes("if(page==='settings')updateStorageStatus();"));
  assert.match(html, /id="storageWarning" role="status"/);
});

test("HTML is accessible and unnecessary visual effects are removed", () => {
  assert.doesNotMatch(html, /🕊/u);
  assert.doesNotMatch(html, /fonts\.bunny\.net/);
  assert.doesNotMatch(html, /floral-garden|heart-bubbles|hero-motion/);
  assert.match(html, /class="skip-link" href="#mainContent"/);
  assert.match(html, /id="mainContent"/);
  assert.match(html, /id="message" aria-live="polite"/);
  assert.match(app, /section\.inert=!active/);
  assert.match(app, /section\.setAttribute\('aria-hidden'/);
  assert.match(app, /cardBtn:'card'/);
  assert.doesNotMatch(app, /cardBtn:'gift'/);
  assert.match(app, /ليس تشفيراً/);
});

test("design system supports responsive layouts, focus and reduced motion", () => {
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /safe-area-inset-bottom/);
  assert.match(css, /@media\(max-width:420px\)/);
  assert.match(css, /body\.dark-mode/);
  assert.match(css, /body\.dark-mode \.feature-btn\{background:#40313f;color:#fff/);
  assert.ok(css.length < 30000, "stylesheet should stay within the lightweight budget");
});

test("PWA cache and manifest remain coherent and avoid heavy first-install downloads", () => {
  assert.equal(manifest.name, "BEIN QALBEIN PRO");
  assert.match(html, /<meta name="theme-color" content="#64132f">/);
  assert.equal(manifest.start_url, "./");
  assert.ok(sw.includes("'./app.js'") && sw.includes("'./ai-studio.js'") && sw.includes("'./app.css'"));
  assert.doesNotMatch(sw, /couple-header\.jpg\.png/);
  assert.match(sw, /navigationPreload/);
  assert.match(sw, /const CACHE='bein-qalbein-royal-v[0-9]+'/);
  assert.match(sw, /await fetch\(request\)/);
  assert.match(sw, /caches\.match\(request\)/);
  for (const file of ["./index.html", "./content-data.js", "./app.js", "./ai-studio.js", "./app.css", "./manifest.json", "./icon.svg"]) assert.ok(sw.includes(file));
});

test("AI worker exposes a health route and bounded request processing", () => {
  assert.match(worker, /url\.pathname === "\/health"/);
  assert.match(worker, /readBoundedBody/);
  assert.match(worker, /clearlyUnsafeOutput/);
  assert.match(worker, /containsReligiousAttribution/);
  assert.match(worker, /enable_thinking:\s*false/);
  assert.match(worker, /chat_template_kwargs/);
  assert.match(worker, /max_completion_tokens/);
  assert.match(worker, /result\?\.choices\?\.\[0\]\?\.message\?\.content/);
  assert.match(aiStudio, /data\.error&&status/);
});

test("language initialization uses the real category renderer (regression: no undefined renderCats)", () => {
  assert.doesNotMatch(app, /\brenderCats\s*\(/);
  assert.match(app, /groupedRenderCats\(\$\('search'\)\.value\);generate\(\)/);
  assert.ok(app.indexOf("function groupedRenderCats") < app.indexOf("applyLanguage();applyTheme();"));
});

test("category taps always generate a visible message, including the initially selected category", () => {
  const grouped = app.slice(app.indexOf("function groupedRenderCats"), app.indexOf("function goPage"));
  assert.match(grouped, /messageWasOpen=!!inline\?\.parentElement\?\.classList\.contains\('category-item'\)/);
  assert.match(grouped, /if\(messageWasOpen&&selectedItem\)\{selectedItem\.append\(inline\)/);
  assert.doesNotMatch(grouped, /prepareInlineMessage\s*\(/, "initial category rendering must not detach the live message node");
  const router = app.slice(app.indexOf("b=t.closest('#cats button.cat')"), app.indexOf("b=t.closest('#smartChips"));
  assert.match(router, /if\(!id\|\|!messages\[id\]\)return/);
  assert.match(router, /selected=id;generate\(\)/);
  assert.doesNotMatch(router, /if\(selected===id&&p\.parentElement===item\)/);
});

test("competing legacy click routers and inline bindings stay removed", () => {
  assert.ok(app.includes("Unified interaction router"));
  assert.ok(app.includes("#bottomNav button[data-go]"));
  assert.ok(!app.includes("V40 HOTFIX") && !app.includes("V44 — repair the four") && !app.includes("V46 — reliable bottom navigation"));
  assert.ok(!app.includes("hub.addEventListener('click'"));
  for (const oldHandler of ["rescueSituation').onchange=showRescue", "buildMessageBtn').onclick", "useBuiltMessage').onclick", "copyBuiltMessage').onclick", "copyBtn').onclick", "b.onclick=()=>{selected=c.id"]) {
    assert.ok(!app.includes(oldHandler), `obsolete handler remains: ${oldHandler}`);
  }
});

test("image-card wrapping uses whitespace and worker text arrays use real newlines", () => {
  assert.match(app, /current\.trim\(\)\.split\(\/\\s\+\/u\)/);
  assert.doesNotMatch(app, /current\.split\(\/\\\\s\+\//);
  assert.match(worker, /\.filter\(Boolean\)\.join\("\\n"\)/);
});
test("daily kindness challenge is stable per local calendar day", () => {
  assert.match(app, /function renderDailyChallenge\(\)/);
  assert.match(app, /day=now\.getFullYear\(\)\*10000\+\(now\.getMonth\(\)\+1\)\*100\+now\.getDate\(\)/);
  assert.match(app, /newChallenge'\)\.onclick=nextKindness;renderDailyChallenge\(\)/);
});
