# Word Analytics

Real‑time counts, platform limits, and easy copy with a modern React + Vite + Tailwind UI.

## Highlights

- Accurate counting
  - Grapheme‑safe character count (emoji, ZWJ clusters) via `Intl.Segmenter` with code point fallback.
  - Twitter effective length: URLs compressed to 23 chars to mirror `t.co` rules.
  - Per‑platform effective length and remaining characters.
- Polished UI/UX
  - Platform tabs with brand tints and a label chip.
  - Threshold‑aware progress bar (comfortable → high usage → approaching limit → exceeded).
  - Sticky tab bars, inline copy feedback (checkmark), keyboard hints (⌘C copy • ⌘K clear).
  - Hashtag highlighting overlay inside the textarea.
  - Templates dropdown (Promo, Announcement, How‑to, Event).
  - Twitter thread preview (splits by effective 280 and adds 1/n suffixes).
  - Read time estimate and conciseness badge.
  - Skeleton shimmer while stats recompute.
- Accessibility
  - Live region announces remaining characters and threshold changes.
  - Focus-visible styles, color-blind friendly badges and states.
- Dark mode and theming
  - CSS variables for surfaces and brand accents; higher-contrast tints in dark mode.

## Quick start

```bash
npm install
npm run dev
```

Open the printed local URL (typically http://localhost:5173).

Build for production:

```bash
npm run build
npm run preview
```

Run tests:

```bash
npm test
```

## Usage

- Choose a platform from the tabs. The progress bar and limits adapt per platform.
- Type or paste your content. Hashtags are highlighted inline.
- Use the Templates dropdown to start from a preset.
- Twitter: A thread preview appears automatically when content exceeds one tweet.
- Copy options:
  - Desktop: Copy button shows a brief checkmark.
  - Mobile: Floating FAB — tap to copy, long‑press to clear.
- Keyboard shortcuts: ⌘/Ctrl+C copy, ⌘/Ctrl+K clear.
- Sanitization: “Auto‑sanitize” toggle removes `<script>…</script>` and strips angle brackets (on by default).

## Features in code

- Effective length and stats: `src/lib/stats.ts`
  - `graphemeCount`, `effectiveLengthForPlatform`, and `computeStats` (read time + conciseness).
- Twitter threading: `src/lib/twitterThread.ts`
- Platform config: `src/config/platforms.ts`
  - Limits, ring/progress classes, tips, hashtag guidance, and dark‑mode label contrast.
- Centralized limits: `src/constants.ts`
  - Single source of truth for platform character limits.
- Text editor: `src/Textarea.tsx`
  - Overlay hashtag highlighting, templates dropdown, sanitization toggle, copy feedback, thresholds, live announcer.
- Stats panel: `src/Stats.tsx`
  - Brand‑tinted tiles, remaining/over badges, read time/conciseness chips, skeleton shimmer.
- Layout and debounce: `src/Container.tsx` (computing state for shimmer).
- Styles and tokens: `src/index.css`
  - CSS variables, background canvas, shimmer animation, highlight token classes.

## Configuration

Platform settings live in `src/config/platforms.ts`:

- `limit`: max characters for the platform.
- `ringClass`, `progressBg`, `tint`: visual theming hooks used by `Stats` and the progress bar.
- `tips` and `hashtag` (`guide`, `range`): used in `Textarea`/legend.

Add a new platform by extending the `PLATFORMS` map and passing `LIMITS` (re-exported from `src/constants.ts`) into the app (already wired in `Container.tsx`).

## Project structure (selected)

```
src/
  components/ui/          # shadcn-like UI primitives
  components/ThreadPreview.tsx
  config/platforms.ts     # platform limits + theming + guidance
  constants.ts            # centralized platform character limits
  lib/stats.ts            # grapheme-safe stats and effective lengths
  lib/twitterThread.ts    # thread segmentation by effective length
  Textarea.tsx            # editor, overlay, templates, sanitization
  Stats.tsx               # stats grid, badges, shimmer, read time
  Container.tsx           # layout and debounce
  index.css               # CSS vars, canvas background, shimmer
```

## Accessibility

- Live announcements (remaining/threshold changes), focus-visible styles, and clear color contrasts in dark mode.

## Notes

- Tailwind utilities are composed with CSS variables in `index.css`. Some global styles replace `@apply` for compatibility.
- Dark mode toggles the `.dark` class on `<html>`; all tokenized colors respond.

---

Contributions and suggestions are welcome — open an issue or PR.
