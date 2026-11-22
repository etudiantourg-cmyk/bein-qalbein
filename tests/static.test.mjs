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
const appIcon = await readFile(new URL("../icon.svg", import.meta.url), "utf8");
const maskableIcon = await readFile(new URL("../icon-maskable.svg", import.meta.url), "utf8");

test("external app assets parse and HTML IDs are unique", () => {
  assert.match(html, /<script src="\.\/app\.js(?:\?v=\d+)?" defer><\/script>/);
  assert.match(html, /<link rel="stylesheet" href="\.\/app\.css(?:\?v=\d+)?"\s*>/);
  assert.equal((html.match(/<script\b[^>]*>/g) || []).length, 3, "the app should load its three external scripts");
  assert.doesNotMatch(html, /<script(?!\s+src=)[^>]*>/, "no inline scripts should be embedded in the HTML");
  new Function(app);
  new Function(contentData);
  assert.ok(contentData.includes("window.BQ_DATA"));
  assert.ok(contentData.includes("translatedClosings"));
  assert.ok(contentData.includes("translatedBaseExpansions"));
  assert.ok(app.includes("} = window.BQ_DATA;"));
  assert.ok(html.indexOf("./content-data.js") < html.indexOf("./app.js"));
  new Function(aiStudio);
  assert.match(html, /<script src="\.\/ai-studio\.js(?:\?v=\d+)?" defer><\/script>/);
  assert.doesNotMatch(app, /AI Studio client/);
  assert.match(aiStudio, /if\(window\.applyAiStudioLanguage\)window\.applyAiStudioLanguage\(\)/);
  const ids = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, "duplicate HTML IDs found");
});

test("core features, AI studio and safe message display are present", () => {
  for (const id of ["quickHub", "cats", "message", "favorites", "favoritesSubnav", "favoriteTipsList", "favoriteBooksList", "favoriteGamesList", "libraryPage", "aiGenerateBtn", "aiUseBtn", "aiCopyBtn", "aiMoreBtn", "rescueGenerate", "buildMessageBtn"]) {
    assert.match(html, new RegExp(`id=["']${id}["']`));
  }
  assert.match(app, /function displayMessageInMain/);
  assert.match(app, /applyLanguage\(\);\s*\};/);
  assert.match(html, /data-quick="ai"/);
  assert.ok(aiStudio.includes("https://bein-qalbein.etudiantourg.workers.dev"));
  assert.match(html, /<textarea id="aiOutput"/);
  assert.match(aiStudio, /displayMessageInMain\(value/);
  assert.match(app, /function validBackupValue/);
  assert.match(aiStudio, /const ENDPOINT=/);
  assert.match(aiStudio, /const labels=/);
  assert.match(aiStudio, /aiPrivacyNote/);
  assert.doesNotMatch(html, /aiEndpoint|saveAiEndpoint|aiTestEndpoint|aiConnectionState|ai-connection|إعداد الاتصال بمحرك/);
  assert.ok(aiStudio.includes("ENDPOINT+'/generate'"));
  assert.ok(app.includes("Unified interaction router"));
  assert.match(aiStudio, /Your situation description is sent to the AI service/);
  assert.match(aiStudio, /يُرسل وصف الموقف إلى خدمة الذكاء الاصطناعي/);
  assert.match(aiStudio, /aiSafetyNote/);
  assert.match(aiStudio, /rateLimited:/);
  assert.match(aiStudio, /safetyRejected:/);
  assert.match(aiStudio, /unavailable:/);
  assert.match(aiStudio, /bq_ai_language_manual/);
  assert.doesNotMatch(aiStudio, /aiEndpoint|saveAiEndpoint|aiTestEndpoint|bq_ai_endpoint|Cloudflare Worker|رابط المحرك/);
  assert.match(aiStudio, /value='محايدة'/);
  assert.doesNotMatch(aiStudio, /role==='wife'|querySelectorAll\('\.role'\)/);
});

test("saved user data remains compatible and backup import is validated", () => {
  assert.match(aiStudio, /bq_ai_language_manual/);
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
  assert.ok(css.length < 110000, `stylesheet should stay within the bounded stylesheet budget (actual: ${css.length} bytes)`);
});

test("PWA cache and manifest remain coherent and avoid heavy first-install downloads", () => {
  assert.equal(manifest.name, "BEIN QALBEIN PRO");
  assert.match(html, /<meta name="theme-color" content="#64132f">/);
  assert.equal(manifest.start_url, "./");
  assert.ok(manifest.icons.some(icon => icon.src === "icon-maskable.svg" && icon.purpose === "maskable"));
  assert.ok(manifest.icons.some(icon => icon.src === "icon.svg" && icon.purpose === "any"));
  assert.ok(sw.includes("'./app.js'") && sw.includes("'./ai-studio.js'") && sw.includes("'./app.css'"));
  assert.doesNotMatch(sw, /couple-header\.jpg\.png/);
  assert.match(sw, /navigationPreload/);
  assert.match(sw, /const CACHE='bein-qalbein-royal-v[0-9]+'/);
  assert.match(sw, /await fetch\(request\)/);
  assert.match(sw, /caches\.match\(request\)/);
  for (const file of ["./index.html", "./content-data.js", "./app.js", "./ai-studio.js", "./app.css", "./manifest.json", "./icon.svg", "./icon-maskable.svg"]) assert.ok(sw.includes(file));
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
  assert.doesNotMatch(aiStudio, /data\.error|error\.message|Cloudflare Worker|رابط المحرك/);
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
  assert.ok(app.includes("#topNav button[data-go]"));
  assert.ok(!html.includes("bottom-nav") && html.includes("top-navigation"));
  assert.match(html, /data-menu-toggle/);
  assert.match(html, /id="settingsDrawer"/);
  assert.match(app, /Settings open as an overlay drawer/);
  assert.ok(!app.includes("V40 HOTFIX") && !app.includes("V44 — repair the four") && !app.includes("V46 — reliable bottom navigation"));
  assert.ok(!app.includes("hub.addEventListener('click'"));
  for (const oldHandler of ["rescueSituation').onchange=showRescue", "buildMessageBtn').onclick", "useBuiltMessage').onclick", "copyBuiltMessage').onclick", "copyBtn').onclick", "b.onclick=()=>{selected=c.id"]) {
    assert.ok(!app.includes(oldHandler), `obsolete handler remains: ${oldHandler}`);
  }
});

test("Card Atelier renders high-resolution cards with robust multilingual layout", () => {
  assert.match(app, /function cardWrap\(/);
  assert.match(app, /Intl\.Segmenter/);
  assert.match(app, /function drawCardArtwork\(/);
  assert.match(app, /drawCardArtwork\(canvas,2\)/);
  assert.match(app, /const cardThemes=/);
  assert.match(app, /function renderCardPreview\(/);
  assert.match(worker, /\.filter\(Boolean\)\.join\("\\n"\)/);
  for (const style of ["royal","rose","noor","midnight","minimal","mosaic","velvet","sand","pearl","emerald","copper","ink"]) assert.ok(app.includes(style));
  assert.match(html, /id="cardSmartSuggest"/);
  assert.match(app, /function suggestCardDesign\(\)/);
  assert.match(app, /overflow:contentHeight>areaBottom-areaTop/);
});
test("daily kindness challenge is stable per local calendar day", () => {
  assert.match(app, /function renderDailyChallenge\(\)/);
  assert.match(app, /day=now\.getFullYear\(\)\*10000\+\(now\.getMonth\(\)\+1\)\*100\+now\.getDate\(\)/);
  assert.match(app, /newChallenge'\)\.onclick=nextKindness;renderDailyChallenge\(\)/);
});

test("luxury typography and dimensional icon design remain available", () => {
  assert.match(html, /fonts\.googleapis\.com\/css2\?family=Alexandria/);
  assert.match(css, /--font-ui:"Alexandria"/);
  assert.match(css, /--font-display:"Amiri"/);
  assert.match(css, /--font-latin-display:"Playfair Display"/);
  assert.match(css, /inset 0 2px 3px/);
  assert.match(css, /drop-shadow\(/);
  assert.match(css, /\.top-tabs button\.active:after/);
  assert.match(app, /"Amiri", "Noto Naskh Arabic", serif/);
  assert.match(app, /"Playfair Display", Georgia, serif/);
});


test("surprise shortcut uses a refined lightbulb and the shared icon palette", () => {
  assert.match(html, /data-quick="surprise"[^>]*><span class="quick-icon" data-icon="bulb"/);
  assert.match(contentData, /bulb:'<path d="M9 17\.2c/);
  assert.ok(css.includes(".quick-icon{display:grid;place-items:center;flex:0 0 40px;width:40px;height:40px;"), "quick action icons keep their compact 40px geometry");
  assert.doesNotMatch(css, /data-quick="surprise"[^}]*background:linear-gradient\(145deg,#fff8df/);
});

test("blue identity colors the active top navigation and backup accepts blue", () => {
  assert.match(css, /body\.theme-blue \.top-navigation\{background:#285b86\}/);
  assert.match(css, /body\.theme-rose \.top-navigation\{background:#7b2147\}/);
  assert.match(css, /\.top-navigation \.top-tabs button\.active\{color:#fff;background:rgba\(255,255,255,\.16\)\}/);
  assert.match(app, /if\(key==='bq_palette'\)return \['blue','rose','royal','night','custom'\]\.includes\(raw\)/);
});

test("the home screen stays free of the removed role selector", () => {
  assert.doesNotMatch(html, /data-bq-role=|class="bq-identity-control"/);
  assert.doesNotMatch(html, /id="bqIdentity(?:Husband|Wife)"/);
  assert.match(html, /id="aiRecipient"/);
  assert.match(css, /\.theme-blue\{--wine:#285b86/);
  assert.match(css, /\.theme-rose\{--wine:#7b2147/);
});
test("Islamic visual constraint: no cross glyphs or cross-shaped icon ornament", () => {
  const forbidden = [0x271d,0x271e,0x2626,0x271f,0x2020,0x2021,0x2670,0x2671,0x2720].map(code => String.fromCodePoint(code));
  const visibleSource = html + app + contentData + appIcon + maskableIcon;
  for (const mark of forbidden) assert.ok(!visibleSource.includes(mark), "forbidden cross-like glyph found");
  assert.doesNotMatch(appIcon + maskableIcon, /M256 173v-51m-18 26h36/);
});

test("legacy role data remains backup-compatible without restoring the removed selector", () => {
  assert.match(app, /'bq_role'/);
  assert.match(app, /if\(key==='bq_role'\)return \['husband','wife'\]\.includes\(raw\)/);
  assert.doesNotMatch(html, /data-start-role|data-bq-role=|id="bqIdentity(?:Husband|Wife)"/);
  assert.doesNotMatch(app, /rolePalette=role===/);
});
test("primary navigation is moved to a two-row sticky top bar", () => {
  assert.match(html, /id="topNavigation"/);
  assert.match(html, /id="topNav"/);
  assert.match(html, /id="topSearchBtn"/);
  assert.match(html, /id="themeToggle"/);
  assert.doesNotMatch(html, /bottom-nav|id="bottomNav"/);
  assert.match(css, /\.top-navigation\{position:sticky;top:0/);
  assert.match(css, /\.top-tabs button\.active:after/);
  assert.match(app, /#topNav button\[data-go\]/);
  assert.match(app, /goPage\('home'\);/);
  assert.match(app, /page==='library'\|\|page==='favorites'/);
});

test("top navigation uses strong identity colors with high-contrast labels", () => {
  assert.match(css, /body\.theme-blue \.top-navigation\{background:#285b86\}/);
  assert.match(css, /body\.theme-rose \.top-navigation\{background:#7b2147\}/);
  assert.match(css, /\.top-navigation \.top-brand,\.top-navigation \.top-brand small\{color:#fff\}/);
  assert.match(css, /\.top-navigation \.top-tabs button\.active:after\{background:#f1d59b\}/);
  assert.doesNotMatch(css, /body\.dark-mode \.top-navigation,body\.theme-night \.top-navigation\{background:rgba/);
});

test("official app icon is displayed in the top brand header", () => {
  assert.match(html, /class="top-brand"[^>]*aria-label="بين قلبين برو - الرئيسية"/);
  assert.match(html, /<link rel="icon" href="icon\.svg"/);
  assert.ok(manifest.icons.some(icon => icon.src === "icon.svg"));
  assert.ok(appIcon.includes('data:image/png;base64,'));
  assert.ok(maskableIcon.includes('x="51.2" y="51.2" width="409.6" height="409.6"'));
});

test("favorites are separated into messages, advice, books and games with compact settings", () => {
  for (const tab of ["messages","advice","books","games"]) assert.match(html, new RegExp('data-fav-tab="'+tab+'"'));
  for (const panel of ["messages","advice","books","games"]) assert.match(html, new RegExp('data-fav-panel="'+panel+'"'));
  assert.match(app, /function setFavoriteTab\(tab\)/);
  assert.match(app, /bq_favorite_tips/);
  assert.match(app, /bq_favorite_books/);
  assert.match(app, /bq_favorite_games/);
  assert.match(css, /width:min\(82vw,310px\)/);
  assert.match(css, /max-height:min\(78vh,620px\)/);
});


test("navigation icon system is semantic, consistent and versioned", () => {
  assert.match(html, /app\.css\?v=192/);
  const sharia = html.match(/<nav class="sharia-door-nav"[\s\S]*?<\/nav>/)?.[0] || "";
  assert.ok(sharia, "Sharia navigation must exist");
  for (const [tab, label] of [["prayer", "الصلاة"], ["quran", "القرآن"], ["dhikr", "الأذكار"], ["library", "المكتبة"]]) {
    const button = sharia.match(new RegExp('<button[^>]*data-sharia-tab="' + tab + '"[^>]*>[\\s\\S]*?<\\/button>'))?.[0] || "";
    assert.ok(button.includes(label), tab + " icon button label missing");
    assert.match(button, /<svg[\s\S]*?<\/svg>/, tab + " SVG icon missing");
  }
  assert.match(sharia, /data-sharia-tab="prayer"[\\s\\S]*?M8 39h32[\\s\\S]*?M17 22v-5/ , "prayer icon should depict a mosque");
  assert.match(sharia, /data-sharia-tab="dhikr"[\\s\\S]*?circle cx="24" cy="7\\.5"[\\s\\S]*?circle cx="33\\.8" cy="12\\.2"/ , "dhikr icon should depict a beaded tasbih");
  assert.match(css, /\\.top-navigation \\.top-tabs button svg[\\s\\S]*?color:#fff!important/);
  assert.match(css, /\.home-top-shortcuts \.home-shortcut>svg[\\s\\S]*?color:#fff!important/);
  assert.match(css, /\.sharia-door-nav\{[\\s\\S]*?position:fixed/);
});
