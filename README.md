<div align="center">

# Word Analytics

Real‑time counts, platform limits, and easy copy — built with React + Vite + Tailwind.

[![CI](https://github.com/HariYenuganti/Word-Analytics/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/HariYenuganti/Word-Analytics/actions/workflows/ci.yml)
[![CodeQL](https://github.com/HariYenuganti/Word-Analytics/actions/workflows/codeql.yml/badge.svg?branch=main)](https://github.com/HariYenuganti/Word-Analytics/actions/workflows/codeql.yml)
[![release](https://img.shields.io/github/v/release/HariYenuganti/Word-Analytics?display_name=tag&sort=semver)](https://github.com/HariYenuganti/Word-Analytics/releases)
[![semantic-release](https://img.shields.io/badge/semantic--release-enabled-brightgreen.svg?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?logo=conventionalcommits)](https://www.conventionalcommits.org)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?logo=prettier)](https://prettier.io/)
[![License](https://img.shields.io/github/license/HariYenuganti/Word-Analytics)](LICENSE)

</div>

---

## Table of Contents

- Overview
- Highlights
- Quick Start
- Usage
- Developer Tooling
- Project Structure
- Accessibility
- CI
- Commits and Releases
- Security Scanning (CodeQL)
- Branch Protection (recommended)
- Code Owners

---

## Overview

Word Analytics helps you write platform‑ready posts faster, with accurate character counts and smart Twitter/X threading.

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

## Quick Start

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

## Developer Tooling

```bash
# type checking, linting, formatting
npm run typecheck
npm run lint
npm run format:check
npm run format  # fixes formatting

# tests with coverage
npm run test:coverage
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

## CI

- Workflow: `.github/workflows/ci.yml` runs as separate jobs: `lint`, `typecheck`, `format`, `test` (with coverage), and `build`.
- Artifacts: coverage and `dist/` are uploaded on every run.
- Concurrency is enabled to cancel superseded runs on the same ref.

## Commits and Releases

- Conventional Commits are enforced via Husky + Commitlint.
  - Examples: `feat: add export button`, `fix(stats): correct emoji count)`, `chore(ci): adjust workflow`.
- Semantic Release automates versioning and GitHub Releases on pushes to `main`.
  - Determines version bump from commit history, updates `CHANGELOG.md`, creates a tag and GitHub Release.
  - Release assets: a zipped production build `dist-<tag>.zip` and its `SHA256` checksum are attached.
- A manual fallback workflow `Release` is available via Actions → "Run workflow" if needed.

## Security Scanning (CodeQL)

- CodeQL workflow lives at `.github/workflows/codeql.yml`.
- If you use this advanced workflow, disable Code Scanning "Default setup" in repository Settings to avoid SARIF upload conflicts.
- Public repositories can enable Code Scanning for free (Settings → Code security and analysis).

## Branch Protection (recommended)

Protect `main` to accept changes only via reviewed PRs and to block force pushes:

- Require a pull request before merging; approvals: 1.
- Require review from Code Owners (see below).
- Require status checks to pass: `CI / lint`, `CI / typecheck`, `CI / format`, `CI / test`, `CI / build`.
- Require branches to be up to date before merging.
- Do not allow force pushes; do not allow deletions; enforce for administrators.

## Code Owners

- `./.github/CODEOWNERS` lists the repository owner as the code owner for all files, so your review is required when "Require review from Code Owners" is enabled in branch protection.

---

Contributions and suggestions are welcome — open an issue or PR.
