# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Accountech is a landing page for a professional services firm (accounting + technology) based in the Philippines. It is a fully static, single-page site.

## Tech Stack

- **SvelteKit** with `adapter-static` (prerendered, no SSR)
- **Svelte 5** using runes (`$state`, `$props`, etc.)
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (imported as `@import "tailwindcss"` in `src/app.css`)
- **mode-watcher** for dark/light mode (defaults to dark)
- **Zod** for contact form validation
- **TypeScript** with strict mode
- **Bun** as the package manager (see `bun.lock`)

## Commands

```bash
bun run dev          # Start dev server
bun run build        # Build static site to ./build
bun run preview      # Preview production build
bun run check        # Type-check with svelte-check
```

## Architecture

Single-page app: `src/routes/+page.svelte` composes all section components. `+layout.ts` exports `prerender = true` for full static generation.

### Key Directories

- `src/lib/components/` — Section components (nav, hero, services, about, contact, footer), all lowercase filenames
- `src/lib/assets/` — Static assets like favicon
- `docs/plans/` — Design specs and planning documents

### Styling

Custom color tokens are defined as CSS custom properties in `src/app.css` with light (`:root`) and dark (`.dark`) variants, then mapped to Tailwind via `@theme inline`. Brand colors (navy, teal) are defined in a separate `@theme` block.

Fonts: IBM Plex Sans (body) and Rajdhani (headings), loaded from Google Fonts in `src/app.html`.

### Conventions

- Component filenames are lowercase (e.g., `hero.svelte`, not `Hero.svelte`)
- Components use `<script lang="ts">` with Svelte 5 runes
- Use `$lib/` alias for imports from `src/lib/`

## Landing Page Questions

The landing page should answer these questions for visitors:

1. **What do you do?**
2. **Who is it for?**
3. **Why does it matter?**
4. **Why should I trust you?**
5. **What are your services?**
6. **Show me proof.**
7. **Tell me what to do next.**

## Git Policy

- **Do not commit changes** — never run `git commit` unless the user explicitly asks
- **Do not add co-author lines** — never include `Co-Authored-By` in commit messages
