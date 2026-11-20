import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const sw = await readFile(new URL("../sw.js", import.meta.url), "utf8");
const manifest = JSON.parse(await readFile(new URL("../manifest.json", import.meta.url), "utf8"));

test("application JavaScript parses and element IDs are unique", () => {
  const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map(match => match[1]).filter(Boolean);
  assert.ok(scripts.length > 0, "expected an application script");
  for (const script of scripts) new Function(script);
  const ids = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, "duplicate HTML IDs found");
});

test("core controls and existing saved-data keys remain available", () => {
  for (const id of ["cats", "message", "favorites", "aiGenerateBtn", "aiEndpoint", "saveAiEndpoint", "aiUseBtn", "aiCopyBtn", "aiMoreBtn"]) {
    assert.match(html, new RegExp('id=["']' + id + '["']'));
  }
  assert.match(html, /bq_favorites/);
  assert.match(html, /bq_recent_messages/);
  assert.match(html, /bq_custom_notes/);
});

test("app keeps the requested visual exclusions", () => {
  assert.doesNotMatch(html, /🕊/u, "dove symbol should not appear");
  assert.match(html, /\['cardBtn','card'\]/);
  assert.doesNotMatch(html, /\['cardBtn','gift'\]/);
});

test("PWA metadata and service-worker shell are coherent", () => {
  assert.equal(manifest.name, "BEIN QALBEIN PRO");
  assert.equal(manifest.start_url, "./");
  assert.match(sw, /const CACHE='bein-qalbein-royal-v48'/);
  for (const file of ["./index.html", "./manifest.json", "./icon.svg"]) assert.ok(sw.includes(file));
});
