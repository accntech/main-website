# CLAUDE.md

Static single-page landing site for Accountech, a Philippines-based accounting + technology firm.

## Stack

- SvelteKit (`adapter-node`, prerendered) + Svelte 5 runes
- Tailwind CSS v4 via `@tailwindcss/vite`, imported in `src/app.css`
- TypeScript (strict), Bun, Zod (contact form), mode-watcher (dark default)

## Commands

```bash
bun run dev      # dev server
bun run build    # static build to ./build
bun run preview  # preview build
bun run check    # svelte-check
```

## Architecture

- `src/routes/+page.svelte` composes all sections; `+layout.ts` sets `prerender = true`
- `src/lib/components/` — section components (lowercase filenames, e.g. `hero.svelte`)
- `src/lib/assets/` — static assets
- `docs/plans/` — design specs

## Styling

- Color tokens: CSS custom properties in `src/app.css` for `:root` + `.dark`, mapped to Tailwind via `@theme inline`. Brand colors (navy, teal) in a separate `@theme` block.
- Fonts: IBM Plex Sans (body), Rajdhani (headings) — loaded from Google Fonts in `src/app.html`.

## Conventions

- Lowercase component filenames; `<script lang="ts">` with runes
- Import from `$lib/`

## Landing Page Goals

Page must answer: what you do, who it's for, why it matters, why trust you, services, proof, next step.
