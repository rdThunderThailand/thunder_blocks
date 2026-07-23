# thunderblocks


A browsable, copy-paste UI gallery — not an installable package or CLI. Visitors browse **Blocks**
(page-level sections) and **Components** (smaller reusable UI) by category, preview them live at
desktop/tablet/mobile widths, switch to a Code tab, and copy the source straight into their own project.
The site is bilingual (en/th) via a client-side language toggle.

## Getting started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to browse the gallery.

## Adding a new block or component

1. Copy `registry/blocks/(slug)/` or `registry/components/(slug)/` to a new kebab-case folder matching
   your slug. Fill in `component.tsx` (default export, self-contained rendering/data mapping), `meta.json`
   (localized `name`/`description`, `category`), and `data.ts` if it needs sample data.
2. Add one entry to `lib/registry.ts`: the map entry (`sourcePath`, `component`, `meta`) and the slug in
   `blockSlugs` or `componentSlugs`.
3. Add one entry to `registry/blocks.json` or `registry/components.json` (`slug`, `name`, `category`,
   `description` — plain English).
4. If it depends on another registry entry or a shared asset, import it directly
   (`@/registry/components/<slug>/component`, `@/icons/SocialIcons`) — the code viewer picks up
   cross-registry imports automatically. No page/route files need to change.

See [thunderblocks-outline.md](thunderblocks-outline.md) for the full architecture reference, a
file-by-file breakdown, and worked examples — read it before making structural changes.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — lint the codebase

## Stack

Next.js 16, React 19, Tailwind CSS 4, and Shiki for syntax highlighting in the code viewer.



<br>
<br>

<sub><sup> Made by Pichayapa Thaisedhawatkul </sup></sub>