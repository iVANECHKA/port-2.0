# Scoped annotation verification — final local revision, 13 November 2026

Scope: the owner's latest seven annotations and the narrow-screen message. Preserve everything else; no publication or GitHub operations. Previous report and pre-edit source snapshots are under `qa/revision-3/`.

## Source and visual evidence

The owner's seven annotated screenshots are the visual source for these scoped changes. Browser checks used 1117 × 887 CSS pixels for desktop, 768 × 1024 for tablet, 767 × 887 for the cutoff, and 390 × 844 for phone. Screenshots are at one image pixel per CSS pixel.

Evidence: `qa/revision-3/badge-hover.png`, `footer-hover.png`, `income-original.png`, `payment-original.png`, `tablet-768.png`, and `mobile-message.png`. Pre-edit internal-page capture: `domclick-before.png`. Compared the requested targets with the annotations; no surrounding layout changes were introduced.

## Results

1–2. Both shared footer contact links keep their existing text color and now have opacity 0.6 on hover and press, with the header's existing 0.2-second opacity transition. The former blue hover color and 0.65 press opacity are removed. Verified live hover, computed original color, and shared hover/active CSS rule.

3. All four homepage case previews show the cursor badge with width 107 px, height 50 px, Onest Medium (500) at 14 px, background #277EF1 and white text. Computed values match for all four. Styling is explicitly scoped to `.home-page`; no internal-page badge styling is added. Sber keeps its NDA action. Real pointer hover captured; all preview transforms remain none.

4–7. Copied only the four requested videos byte-for-byte from the owner's original folders. Full SHA-256 comparisons are recorded in `qa/revision-3/media-verification.json`. Browser metadata confirms:

| Requested target | Original resolution |
| --- | --- |
| Domclick income card | 2614 × 1720 |
| Homepage Sber preview | 2560 × 1440 |
| Homepage Gedo preview | 2692 × 1520 |
| Domclick payment animation | 3098 × 2040 |

Lossless posters were regenerated from these originals. The preparation script now preserves these originals and the previously restored homepage Domclick MP4, without transcoding them. Other video assets were not replaced. Internal video slots retain their previous 759.227 × 500.320 px geometry at the desktop test viewport. Sber continues playing offscreen; Gedo remains one-shot and reaches ended=true, paused=true, time=2.033333, loop=false. Internal videos still follow viewport playback.

Additional request: below 768 CSS px the portfolio is unmounted and the only visible content is a pure white screen with the exact text “Портфолио работает только на Desktop версии”. At 390 × 844 its main element fills the viewport, uses 18 px text, and has no horizontal overflow or mounted videos. Direct navigation to /domclick also shows only the message. Live resize back to 768 px restores the existing tablet page, with no message or horizontal overflow.

## Preservation and validation

- Only contact states, the homepage badge, and the narrow-screen message selectors changed. No typography, spacing, copy, dates, route, sound, or interaction change outside those requests. Internal page source files and responsive layout rules remain untouched.
- Four original video files and their posters replaced; input folders untouched. Playback logic unchanged.
- `npm run build` passed. Media preparation script syntax check passed.
- Browser console warning/error check: none.
- No remaining actionable issue within this request. Wider portfolio work and eventual GitHub upload remain separate.

final result: passed (scoped verification)
