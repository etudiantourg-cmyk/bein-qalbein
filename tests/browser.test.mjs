import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { chromium } from "playwright";
import axe from "axe-core";

const root = resolve(process.cwd());
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png"
};

test("real browser smoke: startup, categories, language, favorites, guide and settings", { timeout: 90000 }, async () => {
  const server = createServer(async (req, res) => {
    try {
      const requestedPath = decodeURIComponent(new URL(req.url, "http://127.0.0.1").pathname);
      const pathname = requestedPath === "/" ? "/index.html" : requestedPath;
      const file = resolve(root, "." + pathname);
      if (file !== root && !file.startsWith(root + sep)) {
        res.writeHead(403).end("Forbidden");
        return;
      }
      const body = await readFile(file);
      res.writeHead(200, { "Content-Type": mime[extname(file)] || "application/octet-stream" });
      res.end(body);
    } catch {
      res.writeHead(404).end("Not found");
    }
  });

  await new Promise(resolveListen => server.listen(0, "127.0.0.1", resolveListen));
  const address = server.address();
  const browser = await chromium.launch({ headless: true, channel: "chrome" });
  const page = await browser.newPage({ serviceWorkers: "block" });
  const pageErrors = [];
  const consoleErrors = [];
  const openFavorites = async () => {
    await page.locator('#topNav button[data-go="home"]').click();
    await page.locator('[data-menu-toggle]').click();
    await page.locator('#openSavedArchive').click();
  };

  const openAiStudio = async () => {
    await page.locator('#topNav button[data-go="home"]').click();
    await page.locator('.home-top-shortcuts [data-home-go="ai"]').click();
  };
  const auditAccessibility = async label => {
    await page.addScriptTag({ content: axe.source });
    const result = await page.evaluate(async () => axe.run(document, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"] }
    }));
    assert.deepEqual(
      result.violations.map(item => ({ id: item.id, impact: item.impact, help: item.help, nodes: item.nodes.map(node => node.target) })),
      [],
      `WCAG accessibility violations on ${label}`
    );
  };
  page.on("pageerror", error => pageErrors.push(error.stack || error.message));
  page.on("console", message => { if (message.type() === "error") consoleErrors.push(message.text()); });

  try {
    await page.route("https://bein-qalbein.etudiantourg.workers.dev/**", async route => {
      const path = new URL(route.request().url()).pathname;
      if (path === "/generate") {
        await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ message: "رسالة اختبارية رقيقة تعبّر عن المودة والاحترام." }) });
      } else {
        await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true, bindingReady: true }) });
      }
    });
    await page.goto(`http://127.0.0.1:${address.port}/`, { waitUntil: "domcontentloaded" });
    await page.locator("#cats .cat").first().waitFor();
    assert.match(await page.locator("body").evaluate(el => getComputedStyle(el).fontFamily), /Alexandria/);
    assert.match(await page.locator(".quick-icon").first().evaluate(el => getComputedStyle(el).boxShadow), /rgb/);
    await page.addScriptTag({ content: axe.source });
    await auditAccessibility("home");
    assert.equal(await page.locator("#cats .cat").count(), 14, "all 14 categories should render");
    for (const [tab, section] of [["library", "#libraryTitle"], ["favorites", "#favTitle"], ["guide", "#guideTitle"], ["games", "#gamesPage"]]) {
      if (tab === "favorites") {
        await openFavorites();
        await page.locator(section).waitFor({ state: "visible" });
        assert.equal(await page.locator("#settingsDrawer").isHidden(), true, "saved archive action should close the settings drawer");
      } else if (tab === "guide") {
        await page.locator('#topNav button[data-go="home"]').click();
        await page.locator('.home-top-shortcuts [data-home-go="guide"]').click();
        await page.locator(section).waitFor({ state: "visible" });
        assert.equal(await page.locator('.home-top-shortcuts [data-home-go="guide"]').getAttribute("aria-expanded"), "true");
      } else {
        await page.locator(`#topNav button[data-go="${tab}"]`).click();
        await page.locator(section).waitFor({ state: "visible" });
        assert.equal(await page.locator(`#topNav button[data-go="${tab}"]`).getAttribute("aria-current"), "page");
      }
    }
    await page.locator('#topNav button[data-go="games"]').click();
    await page.locator('#gameAnswers button[data-game-answer="1"]').click();
    assert.equal(await page.locator("#gameScore").innerText(), "1");
    await page.locator("#nextGameQuestion").click();
    await page.locator('#topNav button[data-go="home"]').click();

    await page.locator('#topNav button[data-go="library"]').click();
    await page.locator('[data-save-book="kind-dialogue"]').click();
    await openFavorites();
    await page.locator('[data-fav-tab="books"]').click();
    await page.locator("#favoriteBooksList").getByText("فن الحوار الهادئ").waitFor();
    await page.locator('[data-fav-tab="messages"]').click();
    await page.locator('#topNav button[data-go="home"]').click();
    await page.locator('.home-top-shortcuts [data-home-go="guide"]').click();
    await page.locator("#husbandTips").click();
    await page.locator('#adviceList [data-save-tip]').first().click();
    await page.locator("#closeAdvice").click();
    await openFavorites();
    await page.locator('[data-fav-tab="advice"]').click();
    await page.locator("#favoriteTipsList .saved-collection-item").first().waitFor();
    await page.locator('#topNav button[data-go="games"]').click();
    await page.locator("#saveGameBtn").click();
    await openFavorites();
    await page.locator('[data-fav-tab="games"]').click();
    await page.locator("#favoriteGamesList .saved-collection-item").first().waitFor();
    await page.locator('button[data-menu-toggle]').click();
    const drawerBox = await page.locator("#settingsDrawer .settings-drawer-panel").boundingBox();
    assert.ok(drawerBox.width <= 320 && drawerBox.height < 650, "settings drawer should stay compact");
    await page.locator("#settingsCloseBtn").click();
    await page.locator('#topNav button[data-go="home"]').click();

    assert.equal(await page.locator("html").getAttribute("data-message-count"), "2100", "the 14 categories should expose 150 message variants each");
    assert.deepEqual(await page.evaluate(() => Object.values(window.BQ_DATA.messages).map(pool => pool.length)), Array(14).fill(150));

    assert.deepEqual(pageErrors, [], `uncaught startup errors: ${pageErrors.join(" | ")}`);
    // Every intent chip must reveal its matching message panel on a fresh page.
    for (const id of ["thanks", "miss", "sorry", "support", "sad", "upset", "dua"]) {
      await page.locator(`#smartChips button[data-pick="${id}"]`).click();
      await page.waitForFunction(expected => {
        const panel = document.querySelector("#inlineMessagePanel");
        return panel && !panel.hidden && panel.parentElement?.dataset.categoryId === expected;
      }, id);
      assert.ok((await page.locator("#message").innerText()).trim().length > 0, `chip ${id} should show a message`);
    }
    await page.locator("#cats .cat").first().click();
    await page.waitForTimeout(150);
    const categoryState = await page.evaluate(() => ({
      panel: !!document.querySelector("#inlineMessagePanel"),
      parent: document.querySelector("#inlineMessagePanel")?.parentElement?.className || null,
      categoryId: document.querySelector("#inlineMessagePanel")?.parentElement?.dataset?.categoryId || null,
      message: document.querySelector("#message")?.textContent || null
    }));
    assert.ok(categoryState.parent === "category-item", `category click did not mount message panel: ${JSON.stringify({ categoryState, pageErrors, consoleErrors })}`);
    assert.notEqual(await page.locator("#message").innerText(), "اختر تصنيفاً لتظهر لك رسالة جميلة هنا.");
    await openAiStudio();
    await page.locator("#aiGenerateBtn").click();
    await page.waitForFunction(() => !document.querySelector("#aiOutput")?.hidden);
    assert.equal(await page.locator("#aiOutput").inputValue(), "رسالة اختبارية رقيقة تعبّر عن المودة والاحترام.");
    await page.locator("#aiUseBtn").click();
    assert.equal(await page.locator("#message").innerText(), "رسالة اختبارية رقيقة تعبّر عن المودة والاحترام.");

    await page.locator('button[data-menu-toggle]').click();
    await page.locator("#settingsDrawer:not([hidden])").waitFor();
    await page.locator("#lang").selectOption("en");
    assert.equal(await page.locator("html").getAttribute("lang"), "en");
    assert.equal(await page.locator("html").getAttribute("data-message-count"), "2100");
    assert.match(await page.locator("#message").innerText(), /[A-Za-z]/);
    assert.doesNotMatch(await page.locator("#message").innerText(), /[\u0600-\u06FF]/);
    assert.equal(await page.locator("#aiMessageTitle").innerText(), "AI Message Studio");
    assert.equal(await page.locator("#cats .cat").count(), 14);
    await page.locator("#lang").selectOption("fr");
    assert.equal(await page.locator("html").getAttribute("lang"), "fr");
    assert.equal(await page.locator("html").getAttribute("data-message-count"), "2100");
    assert.match(await page.locator("#message").innerText(), /[A-Za-zÀ-ÿ]/);
    assert.doesNotMatch(await page.locator("#message").innerText(), /[\u0600-\u06FF]/);
    assert.equal(await page.locator("#aiMessageTitle").innerText(), "Studio de messages IA");
    await page.locator("#lang").selectOption("ar");
    assert.equal(await page.locator("html").getAttribute("lang"), "ar");
    await page.locator("#settingsCloseBtn").click();
    await page.locator('#topNav button[data-go="home"]').click();
    await page.locator("#search").fill("صباح");
    await page.waitForTimeout(150);
    assert.equal(await page.locator("#cats .cat").count(), 1, "category search should filter results");
    await page.locator("#search").fill("");
    await page.waitForTimeout(150);
    assert.equal(await page.locator("#cats .cat").count(), 14);

    const dailyChallenge = await page.locator("#challengeTask").innerText();
    await page.reload({ waitUntil: "domcontentloaded" });
    assert.equal(await page.locator("#challengeTask").innerText(), dailyChallenge, "daily kindness challenge should remain stable for the day");
    await page.locator("#cats .cat").first().click();
    await page.locator("#cardBtn").click();
    await page.locator("#cardStudio").waitFor({ state: "visible" });
    assert.equal(await page.locator("#cardDesigns [data-card-style]").count(), 12);
    assert.equal(await page.locator("#cardPreview").isVisible(), true);
    await page.locator('[data-card-style="noor"]').click();
    assert.equal(await page.locator('[data-card-style="noor"]').getAttribute("aria-pressed"), "true");
    await page.locator("#cardFormat").selectOption("square");
    assert.equal(await page.locator("#cardPreview").evaluate(canvas => canvas.width / canvas.height), 1);
    await page.locator("#cardFormat").selectOption("portrait");
    await page.locator("#cardMessageInput").fill("رسالة عربية جميلة\nبسطر ثانٍ لاختبار تنسيق البطاقة");
    assert.equal(await page.locator("#cardCharCount").innerText(), "49 / 900");
    const cardCanvas = await page.locator("#cardPreview").evaluate(canvas => ({ width: canvas.width, height: canvas.height, pixel: [...canvas.getContext("2d").getImageData(540, 675, 1, 1).data].some(value => value > 0) }));
    assert.equal(cardCanvas.width, 1080);
    assert.ok(cardCanvas.height >= 1080 && cardCanvas.height <= 2700);
    assert.equal(cardCanvas.pixel, true);
    await page.locator("#cardMessageInput").fill("دعاء جميل يملأ القلب طمأنينة");
    await page.locator("#cardSmartSuggest").click();
    assert.equal(await page.locator('[data-card-style="noor"]').getAttribute("aria-pressed"), "true");
    await page.locator("#cardMessageInput").fill("رسالة عربية جميلة\\nبسطر ثانٍ لاختبار تنسيق البطاقة");
    const downloadPromise = page.waitForEvent("download");
    await page.locator("#cardDownload").click();
    const cardDownload = await downloadPromise;
    assert.equal(cardDownload.suggestedFilename(), "bein-qalbein-card-noor.png");
    await page.locator("#cardClose").click();
    await page.locator("#cardStudio").waitFor({ state: "hidden" });

    await page.locator("#favBtn").click();
    await openFavorites();
    await page.locator("#favorites .favitem").first().waitFor();
    await auditAccessibility("favorites");
    await page.reload({ waitUntil: "domcontentloaded" });
    await openFavorites();
    await page.locator("#favorites .favitem").first().waitFor();

    await page.locator("#customInput").fill("ملاحظة خاصة يجب أن تبقى محفوظة");
    page.once("dialog", dialog => dialog.accept());
    await page.locator("#saveCustom").click();
    await page.locator(".custom-item").filter({ hasText: "ملاحظة خاصة يجب أن تبقى محفوظة" }).waitFor();
    await page.locator("#privacyPin").fill("1234");
    page.once("dialog", dialog => dialog.accept());
    await page.locator("#setPrivacyPin").click();
    await page.locator('#topNav button[data-go="home"]').click();
    await openFavorites();
    assert.equal(await page.locator("#favorites").isVisible(), false, "PIN should hide the favorites list after leaving it");
    await page.locator("#privacyPin").fill("1234");
    await page.locator("#unlockFavorites").click();
    await page.locator("#favorites .favitem").first().waitFor();

    const backupPromise = page.waitForEvent("download");
    await page.locator("#exportData").click();
    const backupDownload = await backupPromise;
    assert.equal(backupDownload.suggestedFilename(), "bein-qalbein-backup.json");
    const backupPath = await backupDownload.path();
    const backup = JSON.parse(await readFile(backupPath, "utf8"));
    assert.ok(JSON.parse(backup.data.bq_custom_notes).includes("ملاحظة خاصة يجب أن تبقى محفوظة"));
    assert.ok(!Object.hasOwn(backup.data, "bq_fav_pin_hash"), "PIN verifier must not be exported");
    assert.ok(!Object.hasOwn(backup.data, "bq_ai_endpoint"), "private engine endpoint must not be exported");
    backup.data.bq_custom_notes = JSON.stringify(["رسالة استعيدت من النسخة الاحتياطية"]);
    const chooserPromise = page.waitForEvent("filechooser");
    await page.locator("#importLabel").click();
    const chooser = await chooserPromise;
    const navigationPromise = page.waitForNavigation({ waitUntil: "domcontentloaded" });
    page.once("dialog", dialog => dialog.accept());
    await chooser.setFiles({ name: "bein-qalbein-backup.json", mimeType: "application/json", buffer: Buffer.from(JSON.stringify(backup)) });
    await navigationPromise;
    await openFavorites();
    await page.locator(".custom-item").filter({ hasText: "رسالة استعيدت من النسخة الاحتياطية" }).waitFor();
    await page.locator("#privacyPin").fill("1234");
    await page.locator("#unlockFavorites").click();
    await page.locator("#favorites .favitem").first().waitFor();

    await page.locator('#topNav button[data-go="home"]').click();
    await page.locator('.home-top-shortcuts [data-home-go="guide"]').click();
    await page.locator("#husbandTips").click();
    await page.locator("#adviceModal:not(.hidden)").waitFor();
    await auditAccessibility("marriage guide dialog");
    assert.ok((await page.locator("#adviceList").innerText()).trim().length > 0);
    await page.locator("#closeAdvice").click();

    await page.locator('button[data-menu-toggle]').click();
    await page.locator("#settingsDrawer:not([hidden])").waitFor();
    await auditAccessibility("settings");
    await page.locator("#themeToggle").click();
    assert.ok(await page.locator("body").evaluate(el => el.classList.contains("dark-mode")));
    await auditAccessibility("settings dark theme");
    await page.reload({ waitUntil: "domcontentloaded" });
    assert.ok(await page.locator("body").evaluate(el => el.classList.contains("dark-mode")), "theme should persist after reload");
    await page.locator('button[data-menu-toggle]').click();
    await page.locator("#themeToggle").click();
    assert.ok(!(await page.locator("body").evaluate(el => el.classList.contains("dark-mode"))));

    for (const width of [320, 360, 390, 412, 768, 1024]) {
      await page.setViewportSize({ width, height: 800 });
      const dimensions = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }));
      assert.ok(dimensions.document <= dimensions.viewport, `layout overflow at ${width}px: ${JSON.stringify(dimensions)}`);
    }
    await page.setViewportSize({ width: 844, height: 390 });
    const landscape = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }));
    assert.ok(landscape.document <= landscape.viewport, `landscape layout overflow: ${JSON.stringify(landscape)}`);
    assert.deepEqual(pageErrors, [], "application must not throw uncaught browser exceptions");
    assert.deepEqual(consoleErrors, [], `browser console errors: ${consoleErrors.join(" | ")}`);
    const fallbackPage = await browser.newPage({ serviceWorkers: "block" });
    const openFallbackFavorites = async () => {
      await fallbackPage.locator('#topNav button[data-go="home"]').click();
      await fallbackPage.locator('[data-menu-toggle]').click();
      await fallbackPage.locator('#openSavedArchive').click();
    };
    await fallbackPage.addInitScript(() => {
      localStorage.setItem("bq_favorites", JSON.stringify(["رسالة موجودة قبل تعطل التخزين"]));
      Storage.prototype.setItem = function () { throw new DOMException("Storage unavailable", "QuotaExceededError"); };
    });
    await fallbackPage.goto(`http://127.0.0.1:${address.port}/`, { waitUntil: "domcontentloaded" });
    await fallbackPage.locator("#cats .cat").first().waitFor();
    await fallbackPage.locator("#favBtn").click();
    await openFallbackFavorites();
    await fallbackPage.locator("#favorites .favitem").filter({ hasText: "رسالة موجودة قبل تعطل التخزين" }).waitFor();
    await fallbackPage.locator('button[data-menu-toggle]').click();
    await fallbackPage.locator("#settingsDrawer:not([hidden])").waitFor();
    assert.equal(await fallbackPage.locator("#storageWarning").isVisible(), true, "non-persistent storage must be disclosed");
    assert.match(await fallbackPage.locator("#storageWarning").innerText(), /ستبقى التغييرات في الذاكرة/);
    await fallbackPage.locator("#settingsCloseBtn").click();
    await openFallbackFavorites();
    const fallbackChooserPromise = fallbackPage.waitForEvent("filechooser");
    await fallbackPage.locator("#importLabel").click();
    const fallbackChooser = await fallbackChooserPromise;
    const fallbackDialogPromise = fallbackPage.waitForEvent("dialog");
    await fallbackChooser.setFiles({
      name: "backup.json",
      mimeType: "application/json",
      buffer: Buffer.from(JSON.stringify({
        app: "bein-qalbein",
        version: 62,
        exportedAt: new Date().toISOString(),
        data: { bq_favorites: JSON.stringify(["رسالة بديلة لا يجب استيرادها"]) }
      }))
    });
    const fallbackDialog = await fallbackDialogPromise;
    assert.match(fallbackDialog.message(), /التخزين الدائم غير متاح/);
    await fallbackDialog.accept();
    await openFallbackFavorites();
    await fallbackPage.locator("#favorites .favitem").filter({ hasText: "رسالة موجودة قبل تعطل التخزين" }).waitFor();
    await fallbackPage.close();

    const pwaContext = await browser.newContext({ serviceWorkers: "allow" });
    const pwaPage = await pwaContext.newPage();
    await pwaPage.goto(`http://127.0.0.1:${address.port}/`, { waitUntil: "domcontentloaded" });
    await pwaPage.evaluate(async () => { await navigator.serviceWorker.ready; });
    await pwaPage.reload({ waitUntil: "domcontentloaded" });
    await pwaPage.waitForFunction(() => !!navigator.serviceWorker.controller);
    await pwaContext.setOffline(true);
    await pwaPage.reload({ waitUntil: "domcontentloaded" });
    await pwaPage.locator("#cats .cat").first().waitFor();
    assert.equal(await pwaPage.locator("#cats .cat").count(), 14, "PWA must render its cached app shell while offline");
    await pwaContext.close();
  } finally {
    await browser.close();
    await new Promise(resolveClose => server.close(resolveClose));
  }
});
