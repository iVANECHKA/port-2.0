# Mobile implementation verification — 15 November 2026

Scope: restore a responsive mobile version on all four pages, remove the mobile company sidebar, move all mobile header controls into a burger menu, and replace the portfolio logo on every viewport. Desktop's only visible change is the supplied logo.

## Evidence

Owner's existing desktop prototype is the visual baseline. Logo source: `/Users/dashixa/Desktop/site/logo.png`, copied unchanged to `public/assets/logo.png` (228 × 112 PNG with transparency). No media was recompressed.

Screenshots and observations are under `qa/mobile-2026-11-15/`: desktop-before/after, mobile home/menu, the three complete case pages, narrow-checks.json, boundary-checks.json. Screenshots use one image pixel per CSS pixel.

## Verification

- At 1117 × 887, header, logo slot, hero, greeting, five-card row, case section, company navigation, about section and footer retain exactly the same bounding rectangles before and after implementation. Existing desktop links, copy, colors, spacing, animation rules and case behavior are retained. New mobile controls and mobile line-break spaces are hidden on desktop.
- All four routes fit a 320 px viewport: document scrollWidth equals innerWidth. Also checked 390, 430 and 767 px; at 768 px desktop/tablet header and company sidebar return.
- On mobile the company sidebar is absent from layout and accessibility navigation. Logo stays on the left; only the burger is visible on the right. All four controls (About, Cases, Resume, Contacts) are inside the menu.
- Menu opens/closes, closes after following an anchor or clicking outside, and closes with Escape while returning focus to the toggle. Resize to desktop closes it. Closed navigation is inert and hidden from assistive technology.
- Mobile case text and images use the available width. Capital result metrics use three readable columns; Gedocorp metrics use two columns without overflow on 320 px screens. Desktop line breaks are retained; mobile replaces them with spaces so words do not merge. Existing horizontal screen galleries remain scrollable.
- Mobile Domclick and Sber preview playback starts when visible without requiring hover. Verified Domclick videoWidth=2692 and Sber videoWidth=2560, playing with the pointer outside previews. Desktop still starts them on hover/focus, and the existing latched looping and Gedo one-shot rules remain intact.
- The former Desktop-only message has been removed. Footer Moscow time, contact links, NDA feedback, sounds, delayed greeting and pending-PDF behavior are retained.
- GitHub Pages base paths and direct case routes remain supported.

Validation: GitHub Pages production build and existing Sites packaging tests. Browser menu/resize/navigation/overflow checks passed. Publishing is handled by the existing GitHub Pages workflow after source synchronization.

final result: passed (scoped mobile and desktop-preservation checks)
