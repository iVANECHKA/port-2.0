# Prototype Instructions

## Portfolio decisions — 13 November 2026

- Match Figma file `jlLCVpkwQlLd2weGtKtvUU` precisely. Preserve all unaffected structure, styles, content and interactions when applying a visual correction.
- Four routes: home, Domclick, Capital.com, Gedocorp. Russian copy and dates in Figma are final.
- Latest mobile direction (15 November 2026): provide responsive versions of all four pages below 768 CSS px; remove the former Desktop-only message. Hide the homepage company sidebar entirely on mobile. Mobile header contains the logo on the left and a burger on the right; navigation controls are inside the burger menu, with the contacts placed at its bottom after the latest annotation corrections. Preserve tablet and desktop layout, content and behavior. On desktop, the only visible change is the owner-supplied logo. Header does not stick. The desktop company sidebar sticks only within the case preview section; its links are anchors on the homepage, never case routes.
- Use the supplied logo.png unchanged on all four pages and all viewport sizes, retaining the existing desktop logo slot and hover behavior. The source is /Users/dashixa/Desktop/site/logo.png; the served asset is public/assets/logo.png.
- Five hero previews are decorative and static on hover; no enlargement, movement, links or gallery controls.
- Case covers open case routes and show a cursor-following “Открыть” badge. Sber stays on home and highlights “Кейс под NDA”.
- On desktop, main case previews Domclick and Sber start on hover/focus and keep looping after leaving the viewport. On mobile they start on first visibility because touch screens have no hover, then retain the same loop behavior. Gedo starts once on first visibility and stops on its final frame without restarting. Other videos retain viewport-based playback. Respect reduced motion. Preserve original media directories.
- Header text links hover at 60% opacity, without blue or underline. Both footer contact links retain their original text color and use 60% opacity on hover and press, with the same 0.2-second opacity transition as the header. Footer email has no underline.
- Company navigation and other-case links never move; hover/press/selection styling is instant. The sidebar has no dividers. Clicking a company immediately selects its blue background, preserving that selection throughout the anchor scroll. Other-case links on internal pages use gray on hover and blue on press and navigate to their case routes. No focus/press outline on sidebar items, main case previews, or other-case links.
- Hide the Gedocorp gallery scrollbar while preserving horizontal scrolling. Fade the hero greeting in after a 1-second delay. The decorative five-card row is moved 40 CSS px upward without moving other sections. All four homepage previews show a cursor “Открыть” badge: 107×50 CSS px, 14 px medium text, blue #277EF1 background and white text. This badge styling is scoped to the homepage; Sber's existing NDA click behavior is retained.
- Main Domclick, Sber and Gedo previews and the two internal Domclick videos (income card and payment animation) use the owner's original MP4 files, copied byte-for-byte, with lossless posters from those originals. Do not recompress them. Other video files remain unchanged; preserve all playback rules.
- Footer clock uses Europe/Moscow. Resume PDF is pending from the owner; do not fabricate a document or broken download.
- No sound toggle or hover sound. Owner requested the click sound from morphin.dev: use its Cuelume `tap` cue with the `mech` theme, quietly (volume 0.245, reduced by 30% on 15 November). The live site's bundle confirmed the cue/theme and the matching recipe; Cuelume is MIT and its license is included locally. Do not add unrelated sound effects or UI.
- Latest owner instruction authorizes creating a new GitHub repository under Dashixa, uploading this project, and deploying to GitHub Pages. Target repository: Dashixa/port-2.0. The owner explicitly approved uploading source code to the public repository Dashixa/port-2.0. The website itself is public as requested by choosing Pages.
- GitHub Pages uses `.github/workflows/pages.yml` and `npm run build:pages`. The build uses GITHUB_PAGES_BASE=/port-2.0/ in CI and preserves root paths locally and emits real case directories so direct visits and refreshes work. Do not change the approved UI during deployment work. The owner created the empty public repository, completed browser authentication, and approved the public source upload.

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Mobile annotation corrections — 15 November 2026

- Work locally only; do not upload to GitHub or deploy until the owner explicitly asks again.
- Mobile only: hide the five decorative Dock cards; center the rounded greeting and about portrait, label and text; halve the gap below the former Dock row. Keep the original height/aspect ratio of all home case previews, without extra bands above their media (latest correction). Align the footer clock icon with the contacts below on every page.
- Mobile only: enlarge the annotated Domclick payment pair, renter payment and SberSound blocks; the four Capital media blocks; and the full-width Gedo POC tablet block. Scale the content proportionally. Domclick and Capital phone galleries show 2.5 screens with horizontal scrolling (latest mobile correction).
- Mobile burger navigation covers the full screen, with TG and email contacts at its bottom and no Contacts navigation button. Preserve desktop navigation.
- Shared logo defaults to 100% opacity and uses 60% on hover. Click sound is 30% quieter on every viewport. All other desktop UI remains unchanged.

- Latest scoped correction: on mobile, move the hero portrait up by 24px to expose more clothing, and move the centered greeting down by 20px (top:362px). Do not change desktop or other page elements.

- Publication authorized: after approving the latest three mobile corrections, the owner explicitly asked to upload the reviewed current version to GitHub. Publish this version to Dashixa/port-2.0 and verify the existing Pages workflow.

- Publication was subsequently stopped by the owner. Do not continue GitHub upload or deployment without a new instruction. Latest local text corrections: greeting uses «Я Дарья Кормилицына – Team Lead» on one line at all breakpoints; keep «продукта “Мой» together in the Sber sidebar description, and «а также» together in the about paragraph so the annotated leading words wrap to the next line.

- Latest mobile gallery correction: Domclick and Capital galleries show 2.5 proportional phone screens. The scroll area extends to the viewport edges, with 16px horizontal and 24px vertical breathing room for complete shadows. Preserve desktop gallery geometry and behavior.

- Publication resumed by explicit owner request after approving the 2.5-screen mobile galleries. Upload the current reviewed local project to Dashixa/port-2.0 and verify its existing GitHub Pages deployment.

## Updates — 25 November 2026

- Contact email in the footer and mobile burger menu is `kormilitsyna.daria01@yandex.com`.
- Resume PDF supplied by the owner is served at `public/assets/resume.pdf`. The "Резюме" link in both desktop header navigation and the mobile burger menu opens it in a new tab; the former "PDF-резюме скоро появится" placeholder notice is removed.
