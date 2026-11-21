import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { chromium } from "playwright";

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
  page.on("pageerror", error => pageErrors.push(error.message));

  try {
    await page.goto(`http://127.0.0.1:${address.port}/`, { waitUntil: "domcontentloaded" });
    await page.locator("#cats .cat").first().waitFor();
    assert.equal(await page.locator("#cats .cat").count(), 14, "all 14 categories should render");

    await page.locator("#cats .cat").first().click();
    await page.waitForFunction(() => {
      const panel = document.querySelector("#inlineMessagePanel");
      return panel && panel.closest(".category-item") && document.querySelector("#message")?.textContent.trim();
    });
    assert.notEqual(await page.locator("#message").innerText(), "اختر تصنيفاً لتظهر لك رسالة جميلة هنا.");

    await page.locator("#lang").selectOption("en");
    assert.equal(await page.locator("html").getAttribute("lang"), "en");
    assert.equal(await page.locator("#cats .cat").count(), 14);
    await page.locator("#lang").selectOption("fr");
    assert.equal(await page.locator("html").getAttribute("lang"), "fr");
    await page.locator("#lang").selectOption("ar");
    assert.equal(await page.locator("html").getAttribute("lang"), "ar");

    await page.locator("#favBtn").click();
    await page.locator('#bottomNav button[data-go="favorites"]').click();
    await page.locator("#favorites .favitem").first().waitFor();

    await page.locator('#bottomNav button[data-go="guide"]').click();
    await page.locator("#husbandTips").click();
    await page.locator("#adviceModal:not(.hidden)").waitFor();
    assert.ok((await page.locator("#adviceList").innerText()).trim().length > 0);
    await page.locator("#closeAdvice").click();

    await page.locator('#bottomNav button[data-go="settings"]').click();
    await page.locator("#themeToggle").click();
    assert.ok(await page.locator("body").evaluate(el => el.classList.contains("dark-mode")));
    await page.locator("#themeToggle").click();
    assert.ok(!(await page.locator("body").evaluate(el => el.classList.contains("dark-mode"))));

    assert.deepEqual(pageErrors, [], "application must not throw uncaught browser exceptions");
  } finally {
    await browser.close();
    await new Promise(resolveClose => server.close(resolveClose));
  }
});
