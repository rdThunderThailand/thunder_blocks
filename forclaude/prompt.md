# Build Prompt: thunderblocks — Component Block Gallery

## Context

I'm building "thunderblocks," a Next.js site for browsing pre-built UI component blocks — same category of product as shadcnspace.com/blocks or Framer's block gallery. Visitors browse a grid of blocks by category, open one to see a live preview, toggle to view its source code, and copy it.

I have working, pre-built React components already. I do NOT want a shadcn-style CLI installer or npm package — this is purely a browsable gallery. I've already scaffolded most of the folder structure; your job is to implement the logic, routes, and UI that make it functional, and migrate my existing components into the conventions below.

## Tech stack

- Next.js (App Router), TypeScript
- Tailwind CSS
- `clsx` + `tailwind-merge` for the `cn()` class helper
- `lucide-react` for icons
- Syntax highlighting for the code viewer (use `shiki` or `rehype-pretty-code`)

## Architecture (already decided — follow exactly)

Two categories of file, do not mix them:

1. **`registry/`** — the actual content: each block being showcased. Self-contained, one folder per block.
2. **`components/`** — the site's own UI chrome (sidebar, cards, tabs, code panel). Not part of any block.

```
registry/
  blocks.json                     ← flat index: [{slug, name, category, description}]
  <slug>/
    component.tsx                 ← the block: layout + data mapping + markup, default export
    data.ts                       ← sample/mock data the block maps over internally
    meta.json                     ← {name, description, category, tags}

lib/
  registry.ts                     ← central map: slug -> { component: dynamic import, meta }
  utils.ts                        ← cn() helper (clsx + tailwind-merge)

components/
  Sidebar.tsx                     ← category navigation for the gallery
  BlockCard.tsx                   ← card shown in the gallery grid, links to /blocks/[slug]
  PreviewCodeTabs.tsx             ← tab switcher: live iframe preview vs. CodePanel
  CodePanel.tsx                   ← syntax-highlighted source + copy-to-clipboard button

app/
  blocks/
    page.tsx                      ← gallery grid, reads blocks.json, renders BlockCard list
    [slug]/
      page.tsx                    ← detail page: name/description + PreviewCodeTabs
  preview/
    [slug]/
      page.tsx                    ← renders ONLY the block component, no site nav/chrome —
                                      this is what PreviewCodeTabs embeds in an <iframe>
```

## Conventions — follow strictly

- **Slugs are kebab-case** and match both the folder name in `registry/` and the URL segment (e.g. `registry/card-metric/` → `/blocks/card-metric`).
- **Each block folder is fully self-contained.** A block owns its own sample data (`data.ts`) and does its own `.map()`/rendering internally. Nothing outside `registry/<slug>/` should need to pass props into it — `app/preview/[slug]/page.tsx` renders it with zero props.
- **No cross-block imports.** If two blocks would share a sub-component, duplicate it into both folders rather than creating a shared dependency between blocks.
- **`app/preview/[slug]/page.tsx` must render bare** — no `<Sidebar>`, no header/footer, nothing but the block itself, since it's loaded inside an iframe.
- **Use the existing `cn()` from `lib/utils.ts`** for all conditional classNames — don't introduce a different utility.
- Use `lib/registry.ts` as the single lookup point for both `app/blocks/[slug]/page.tsx` and `app/preview/[slug]/page.tsx` — neither should import directly from `registry/<slug>/component.tsx`.

## Tasks

1. Implement `lib/utils.ts` (`cn` helper) and `lib/registry.ts` (typed map of slug → dynamic component import + meta loader).
2. Migrate my existing pre-built components into `registry/<slug>/` folders following the convention above — one folder per block, kebab-case slug, `component.tsx` + `data.ts` + `meta.json`. Preserve their existing markup/logic exactly; only relocate and wrap with sample data where needed.
3. Populate `registry/blocks.json` with an entry for every migrated block.
4. Build `app/blocks/page.tsx`: grid of `BlockCard`s from `blocks.json`, filterable by category via `Sidebar`. Add a simple text search over block name/description.
5. Build `app/blocks/[slug]/page.tsx`: shows block name + description (from `meta.json` via `lib/registry.ts`) and renders `PreviewCodeTabs`.
6. Build `app/preview/[slug]/page.tsx`: bare render of the block via `lib/registry.ts` lookup.
7. Build `components/PreviewCodeTabs.tsx`: tab toggle between preview and code. On the preview tab, embed the iframe AND add a viewport-width toggle (desktop / tablet / mobile) that resizes the iframe container, matching the UX of shadcn's blocks page.
8. Build `components/CodePanel.tsx`: reads the raw source of `registry/<slug>/component.tsx` server-side, renders it syntax-highlighted, with a copy-to-clipboard button.
9. Build `components/BlockCard.tsx` and `components/Sidebar.tsx` for the gallery grid and category nav.
10. Handle empty/unknown slugs with `notFound()` in both `[slug]` routes.

## Acceptance criteria

- `/blocks` shows every migrated block as a card, filterable by category and searchable by name.
- Clicking a card opens `/blocks/<slug>` showing a working live preview (correct styling, no leakage from site chrome) and a code tab with accurate, copyable source.
- The preview supports switching between desktop/tablet/mobile widths.
- Adding a new block in the future requires only: a new `registry/<slug>/` folder + one `lib/registry.ts` entry + one `blocks.json` entry — no changes to any `app/` or `components/` file.

Do not add a CLI installer, npm publishing, or any shadcn-specific registry schema (`registryDependencies`, `shadcn.json`, etc.) — this is a standalone browsing site only.