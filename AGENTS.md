# Prototype Instructions

## Portfolio decisions — 13 November 2026

- Match Figma file `jlLCVpkwQlLd2weGtKtvUU` precisely. Preserve all unaffected structure, styles, content and interactions when applying a visual correction.
- Four routes: home, Domclick, Capital.com, Gedocorp. Russian copy and dates in Figma are final.
- Prioritize desktop polish; preserve the existing tablet layout. Below 768 CSS px, show only a white screen with “Портфолио работает только на Desktop версии”; do not mount the portfolio or load its case media there. Header does not stick. Company sidebar sticks only within the case preview section; its links are anchors on the homepage, never case routes.
- Five hero previews are decorative and static on hover; no enlargement, movement, links or gallery controls.
- Case covers open case routes and show a cursor-following “Открыть” badge. Sber stays on home and highlights “Кейс под NDA”.
- Main case previews Domclick and Sber start on hover/focus and keep looping after leaving the viewport. Gedo starts once on first visibility and stops on its final frame without restarting. Other videos retain viewport-based playback. Respect reduced motion. Preserve original media directories.
- Header text links hover at 60% opacity, without blue or underline. Both footer contact links retain their original text color and use 60% opacity on hover and press, with the same 0.2-second opacity transition as the header. Footer email has no underline.
- Company navigation and other-case links never move; hover/press/selection styling is instant. The sidebar has no dividers. Clicking a company immediately selects its blue background, preserving that selection throughout the anchor scroll. Other-case links on internal pages use gray on hover and blue on press and navigate to their case routes. No focus/press outline on sidebar items, main case previews, or other-case links.
- Hide the Gedocorp gallery scrollbar while preserving horizontal scrolling. Fade the hero greeting in after a 1-second delay. The decorative five-card row is moved 40 CSS px upward without moving other sections. All four homepage previews show a cursor “Открыть” badge: 107×50 CSS px, 14 px medium text, blue #277EF1 background and white text. This badge styling is scoped to the homepage; Sber's existing NDA click behavior is retained.
- Main Domclick, Sber and Gedo previews and the two internal Domclick videos (income card and payment animation) use the owner's original MP4 files, copied byte-for-byte, with lossless posters from those originals. Do not recompress them. Other video files remain unchanged; preserve all playback rules.
- Footer clock uses Europe/Moscow. Resume PDF is pending from the owner; do not fabricate a document or broken download.
- No sound toggle or hover sound. Owner requested the click sound from morphin.dev: use its Cuelume `tap` cue with the `mech` theme, quietly (volume 0.35). The live site's bundle confirmed the cue/theme and the matching recipe; Cuelume is MIT and its license is included locally. Do not add unrelated sound effects or UI.
- Latest owner instruction authorizes creating a new GitHub repository under Dashixa, uploading this project, and deploying to GitHub Pages. Target repository: Dashixa/port-2.0. The owner explicitly approved uploading source code to the public repository Dashixa/port-2.0. The website itself is public as requested by choosing Pages.
- GitHub Pages uses `.github/workflows/pages.yml` and `npm run build:pages`. The build uses GITHUB_PAGES_BASE=/port-2.0/ in CI and preserves root paths locally and emits real case directories so direct visits and refreshes work. Do not change the approved UI during deployment work. The owner created the empty public repository, completed browser authentication, and approved the public source upload.

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
