# Architecture & Engineering Notes

## 1. Runtime boundaries

The application is intentionally deployable as static files. GitHub Pages serves the frontend; Cloudflare Workers AI is an optional remote capability, not a requirement for browsing the local message library.

| File | Responsibility | Boundary |
| --- | --- | --- |
| `index.html` | Semantic page structure and controls | No application logic should be added inline |
| `app.css` | Tokens, responsive layout, dark themes, focus and motion preferences | Keep visual rules out of JavaScript |
| `content-data.js` | Static message catalogue, translations, advice, challenge and icon data | Data-only module loaded before the app |
| `app.js` | Local state, navigation, category rendering, favorites, history, backup, guide and local tools | Current legacy core; split gradually behind regression tests |
| `ai-studio.js` | AI form, endpoint validation, request lifecycle, status and result handoff | Loaded after `app.js`; currently consumes shared global lexical bindings |
| `sw.js` | Versioned shell cache, network-first navigation, cache-first static assets | Increment cache version whenever a precached asset changes |
| `ai-worker/src/index.js` | Input validation, CORS, rate guard, prompt construction, model call and output checks | Never put provider secrets in frontend files |
| `tests/` | Static, browser, accessibility and Worker regression coverage | A green suite proves only the tested scenarios |

## 2. Script ordering and the next refactor

The frontend currently uses deferred classic scripts in this order:

The Arabic catalogue combines category-specific and common closing groups. English and French use ten localized base messages plus fifteen localized closings for each category; all three expose 150 generated variants per category, not 150 separately authored messages.

1. `content-data.js`
2. `app.js`
3. `ai-studio.js`

The AI module is separated into its own file, reducing the main bundle and giving the AI workflow a clear file boundary. It still reads shared bindings such as `lang`, `role`, `bqStorage`, and `copyText` from the main script. This is a transitional modularization, not full dependency isolation.

**Next architectural step:** expose a small explicit application interface (for example `window.BQApp`) containing only the required operations and state accessors, then migrate feature files to ES modules. Do this in small slices; do not rewrite the whole app in one commit.

## 3. State and persistence

- Existing local keys are compatibility contracts: `bq_language`, `bq_favorites`, `bq_theme`, `bq_last_notification`, `bq_notifications`, `bq_last_page`, `bq_recent_messages`, `bq_custom_notes`, `bq_favorite_folders`, `bq_font_scale`, `bq_palette`, `bq_ai_language`, `bq_ai_language_manual`, `bq_fav_pin_hash`, and `bq_ai_endpoint`.
- The storage adapter prefers localStorage and maintains a memory shadow if writes fail. Its `persistent` state is exposed to the settings UI; memory-only changes are not durable after page closure.
- Backup import validates supported keys and values before applying them. New keys must be added deliberately to the allow-list.
- PIN is a local presentation lock, not encryption. It must never be described as device security.

## 4. PWA lifecycle

- The service worker precaches the app shell and small static assets; the large couple header is not part of first-install precache.
- Navigation is network-first with cached shell fallback.
- Versioned static assets are cache-first.
- Offline use is expected only after a successful online install/update has populated the cache.
- Update `CACHE` in `sw.js` when any precached frontend file changes.

## 5. AI request lifecycle and threat model

The browser validates a Worker URL and sends only the selected mood, recipient, length, language and optional context. The Worker:
1. Requires the exact application Origin for generation routes.
2. bounds request bytes before parsing JSON;
3. validates each enumerated choice and context length;
4. treats context as untrusted data in the prompt;
5. limits requests best-effort per isolate/IP;
6. calls Workers AI and extracts supported response shapes;
7. rejects empty output, a small set of unsafe phrases and apparent religious attributions.

Important limitations:
- CORS is a browser policy, not authentication.
- The in-memory rate guard is per isolate and may not be globally consistent.
- Output phrase filters are incomplete and can produce false positives/negatives.
- The health route checks the AI binding; it does not prove model inference. The UI's live test makes a real generation request.
- User context is sent to Cloudflare; do not send sensitive personal details.
- No secrets belong in the static frontend.

For broader public exposure, configure Cloudflare-side rate limiting and spending controls in the account dashboard. Do not silently enable paid services.

## 6. Quality gates

The GitHub Actions quality workflow installs a pinned Playwright runtime, a stable Chrome browser and axe-core. Tests currently cover:
- syntax, duplicate IDs, expected assets and storage compatibility;
- critical user journeys in a real browser;
- Arabic/English/French UI switching;
- category rendering, search, favorites and persistence;
- AI Studio request/response handoff using a mocked Worker;
- image-card download and daily challenge stability;
- storage-denied fallback disclosure;
- WCAG A/AA automated checks on the initial screen;
- PWA offline shell after service-worker installation;
- Worker CORS, request validation, size limits, prompt handling, output rejection and rate guard.

A passing automated suite does not replace manual testing on representative Android devices, screen readers, low-memory devices, slow networks, or live Cloudflare model inference.

## 7. Non-negotiable change discipline

1. Fetch the current file SHA before every GitHub update.
2. Keep each commit focused and reversible.
3. Never remove or rename legacy `bq_*` keys without a tested migration.
4. Add a regression test for every confirmed defect.
5. Run browser tests before declaring a user-facing workflow repaired.
6. Confirm both quality workflow and Pages deployment for the same commit SHA.
7. Treat Worker deployment and live inference as separate checks from Pages deployment.
