# React + TypeScript + Vite

## Run & Build

This package uses Vite for development and building. The `package.json` scripts have been simplified to provide two commands:

- `run` — start the dev server (runs Vite)
- `build` — run TypeScript build and Vite production build

PowerShell examples (run from the `problem2` folder):

```powershell
cd ".\problem2\"
pnpm install
pnpm run run
pnpm run build
```

Notes:

- If you prefer the conventional `dev` script name, rename `run` to `dev` in `package.json`.
- If you run into PostCSS/Tailwind errors, ensure `postcss.config.cjs` references `@tailwindcss/postcss` and that dependencies are installed.

