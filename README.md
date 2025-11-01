
# Code Challenge — Workspace Overview

This repository contains three separate problems and a small React + TypeScript demo app (problem2). The README below gives a quick orientation and a short quick-start for the interactive demo in `problem2`.

## Structure

- `problem1/` — small JS challenge(s). See `problem1/index.js`.
- `problem2/` — React + TypeScript + Vite app demonstrating a currency swap form and UI primitives.
- `problem3/` — notes and static code review / refactor problems.

## Quick start (problem2)

1. Open the `problem2` folder:

```powershell
cd "problem2"
```

2. Install dependencies:

```powershell
pnpm install
```

3. Start the dev server (Vite):

```powershell
pnpm run run
```

4. Build for production:

```powershell
pnpm run build
```

Notes:
- The `problem2/package.json` scripts were simplified to expose `run` (dev) and `build` only. If you prefer the `dev` name keep or add an alias in `package.json`.
- If you see missing Tailwind utilities (classes like `bg-white`, `w-screen` not applying), ensure PostCSS is configured to use `@tailwindcss/postcss` in `problem2/postcss.config.cjs` and that dependencies are installed.

## Important files (problem2)

- `problem2/index.html` — app entry HTML
- `problem2/src/main.tsx` — React entry that imports `src/index.css`
- `problem2/src/index.css` — includes Tailwind directives (`@tailwind base`, `@tailwind components`, `@tailwind utilities`)
- `problem2/postcss.config.cjs` — PostCSS config (must reference `@tailwindcss/postcss` for Tailwind v4+)
- `problem2/vite.config.ts` — Vite configuration (alias mapping is configured for `@` → `src`)
- `problem2/tsconfig.app.json` & `problem2/tsconfig.node.json` — TypeScript configuration with path mappings
- `problem2/src/hooks/use-prices.ts` — data hook used in the demo

## Per-problem notes

- Problem 1: see `problem1/index.js` for a small JavaScript coding challenge.
- Problem 2: interactive React demo. Useful entry points: `src/App.tsx`, `src/components/currency-swap-form.tsx`, `src/types/currency.type.ts`.
- Problem 3: review/refactor notes in `problem3/README.md`.

## Troubleshooting

- Dev server fails to start: run `pnpm install` inside the `problem2` folder and retry `pnpm run run`. If errors remain, paste the Vite output here and I'll help diagnose.
- Tailwind/PostCSS errors: confirm `postcss.config.cjs` uses `@tailwindcss/postcss` and that `tailwindcss` and `@tailwindcss/postcss` are present in `devDependencies`.
- Path alias issues (`@/...` imports): confirm `tsconfig.app.json` contains `paths` mapping `"@"` -> `"./src"` and that `vite.config.ts` has a corresponding `resolve.alias` entry.

## Contributing

Edit files inside the relevant `problemX/` folder. If you change scripts or dependency versions, update the corresponding `README.md` inside that folder.

If you'd like, I can expand any problem-specific README with more detailed developer notes, usage examples, or tests.

