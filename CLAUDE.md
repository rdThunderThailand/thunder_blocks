@AGENTS.md

# thunderblocks — framework

A browsable, copy-paste UI gallery (not an installable package). Visitors browse **Blocks** (page-level
sections) and **Components** (smaller reusable UI) by category, preview them live at desktop/tablet/mobile
widths, switch to a Code tab, and copy the source. Bilingual (en/th) via a client-side language toggle.

Full architecture, file-by-file reference, request-cycle diagram, and worked examples live in
`thunderblocks-outline.md` — read it before making structural changes. `forclaude/prompt.md` is the original
build spec (now superseded — the registry split, bilingual meta, and cross-registry imports below postdate
it) and `toggle/` is an unwired draft; neither reflects current behavior.

## Load-bearing rules

- Never import `registry/**/component.tsx` directly from `app/` — always resolve through `lib/registry.ts`
  (`registry`, `blockSlugs`/`componentSlugs`, `isBlockSlug`/`isComponentSlug`/`isRegistrySlug`).
- Cross-registry imports are allowed and expected (a block can import a component, both can import
  `icons/SocialIcons.tsx`) — `lib/registry-source.ts` walks the import graph so the code viewer still shows
  every file a copier needs.
- `meta.json` (`name`/`description`) is localized `{en, th}`; `registry/blocks.json` and
  `registry/components.json` are plain-English indexes for cards/search only — don't conflate the two.
- `app/preview/[slug]/page.tsx` lives outside the `(site)` route group and must stay chrome-free — it's what
  the preview iframe loads.

## Adding a new block or component

1. Copy `registry/blocks/(slug)/` or `registry/components/(slug)/` to a new kebab-case folder matching your
   slug. Fill in `component.tsx` (default export, self-contained rendering/data mapping), `meta.json`
   (localized `name`/`description`, `category`), and `data.ts` if it needs sample data.
2. Add one entry to `lib/registry.ts`: the map entry (`sourcePath`, `component`, `meta`) and the slug in
   `blockSlugs` or `componentSlugs`.
3. Add one entry to `registry/blocks.json` or `registry/components.json` (`slug`, `name`, `category`,
   `description` — plain English).
4. If it depends on another registry entry or a shared asset, import it directly
   (`@/registry/components/<slug>/component`, `@/icons/SocialIcons`) — `resolveCodeFiles` will pick it up
   for the code viewer automatically. No page/route files need to change.
