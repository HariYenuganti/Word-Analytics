# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Project: Word Analytics

This app provides live word and character statistics for a block of text.

### Recent refactors

- Centralized and memoized statistics computation in `Container.jsx` with `useMemo`.
- Simplified and hardened input validation in `Textarea.jsx` (regex-based, accessibility label).
- Removed unused React imports thanks to the automatic JSX runtime (smaller, cleaner files).
- Refactored `Stats.jsx` to render via a mapped list and wrapped with `memo` for stability.
- Improved `Warning.jsx` with `role="alert"` and null-safe rendering.
- Integrated Tailwind + shadcn tokens (CSS variables + dark mode) in `index.css`.
- Added shadcn UI primitives: `Button`, `Card`, `Textarea` (see `src/components/ui`).
- Replaced legacy container with Card sizing; removed `.container` CSS to avoid double wrapping.
- Added dark mode toggle (`ThemeToggle.jsx`) and modern grid layout for stats.

### How to run

```bash
npm install
npm run dev
```

Open the printed Local URL (defaults to http://localhost:5173 or fallback to 5174).

### Notes

- Styles are imported in `src/main.jsx` via `import './index.css'`.
- Character limits are defined once in `Container.jsx` for easier maintenance.
- To use a shadcn component, import from `src/components/ui`, e.g. `import { Button } from './components/ui/button'`.
- Dark mode toggles the `.dark` class on `<html>`; all tokenized colors respond.
