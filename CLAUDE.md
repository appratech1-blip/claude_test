# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server with HMR.
- `npm run build` — type-check via TypeScript project references (`tsc -b`) then produce a production build with Vite.
- `npm run preview` — serve the production build locally.
- `npm run lint` — lint with Oxlint (see `.oxlintrc.json`).

There is no test runner configured in this project yet.

## Architecture

This is a minimal Vite + React 19 + TypeScript single-page app, currently just the stock Vite template (`src/main.tsx` mounts `App.tsx`) with no custom routing, state management, or backend integration added yet.

- **TypeScript project references**: `tsconfig.json` has no files of its own and instead references `tsconfig.app.json` (app source, bundler module resolution) and `tsconfig.node.json` (Vite config itself). `npm run build` type-checks both via `tsc -b` before Vite bundles.
- **Linting**: uses Oxlint (`.oxlintrc.json`), not ESLint. Type-aware rules are not enabled by default — see README.md for how to opt in via `oxlint-tsgolint`.
- **Animation libraries**: both `framer-motion` and `motion` are installed as dependencies. `motion` is the successor package and a superset of `framer-motion`'s functionality — prefer importing from `motion` for new code rather than adding further `framer-motion` imports.
