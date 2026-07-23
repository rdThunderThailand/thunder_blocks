# thunderblocks — Architecture Reference

How a block or component goes from source file to something a visitor can browse, preview, and copy.

thunderblocks is a browsable, copy-paste UI gallery — not an installable package or CLI. It has two parallel
galleries, **Blocks** (page-level sections) and **Components** (smaller reusable UI), both unified through one
registry map, and the whole site is bilingual (en/th).

## 1. Quick reference

| Path | Type | Purpose |
|---|---|---|
| `registry/blocks/<slug>/component.tsx` | Block source | A page-level section: layout, data mapping, markup. Default export. May import from `registry/components/*` or `icons/`. |
| `registry/components/<slug>/component.tsx` | Component source | A smaller reusable piece (button, input, card, dropdown...). Same shape as a block. |
| `registry/{blocks,components}/<slug>/data.ts` | Sample data | Mock data the entry maps over to render internally (e.g. `wasteData`). Optional. |
| `registry/{blocks,components}/<slug>/meta.json` | Metadata | Localized `name`/`description` (`{en, th}`), `category`, `tags` (tags currently unread by the UI). |
| `registry/{blocks,components}/(slug)/` | Scaffold | Empty template folder (`component.tsx` + `meta.json`, 0 bytes). Copy this to start a new entry. Not a real slug — never registered. |
| `registry/blocks.json` | Index | Flat list of every block (`slug`, `name`, `category`, `description`) — plain English, used for the gallery grid and header search. |
| `registry/components.json` | Index | Same shape as `blocks.json`, for the Components gallery. |
| `lib/registry.ts` | Central map | Maps each slug (from both registries) to `{ sourcePath, component (dynamic import), meta() }`. Also exports `blockSlugs`/`componentSlugs` and the `isBlockSlug`/`isComponentSlug`/`isRegistrySlug` guards. Every route resolves through this — never import `registry/**/component.tsx` directly from `app/`. |
| `lib/registry-source.ts` | Source resolver | `resolveCodeFiles()` walks the import graph from an entry's `component.tsx` — colocated relative imports plus other `@/registry/*`/`@/lib/*` files (not npm packages) — so the code viewer shows every file a copier needs, including cross-registry dependencies. |
| `lib/language.tsx` | Localization | `LanguageProvider`/`useLanguage()` — client context persisted to `localStorage`, wraps the `(site)` route group. |
| `lib/utils.ts` | Shared utility | `cn()` helper (clsx + tailwind-merge). |
| `icons/SocialIcons.tsx` | Shared asset | Icon set shared across registry entries (e.g. `login-card`, `register-card`). |
| `app/(site)/layout.tsx` | Layout | Wraps `LanguageProvider` + `Header` around every site page. |
| `app/(site)/page.tsx` | Route (home) | Landing page with block/component counts. |
| `app/(site)/blocks/page.tsx`, `app/(site)/components/page.tsx` | Route (gallery) | Read the matching index JSON, render `BlocksGallery` (search + category filter via `Sidebar`). `components/page.tsx` passes `basePath="/components"`. |
| `app/(site)/blocks/[slug]/page.tsx`, `app/(site)/components/[slug]/page.tsx` | Route (detail) | Look up one entry via `lib/registry.ts`, gated by `isBlockSlug`/`isComponentSlug` (a component slug 404s under `/blocks` and vice versa). Render `LocalizedMeta` + `PreviewCodeTabs`. |
| `app/(site)/docs/page.tsx` | Route (docs) | Static "getting started" page: install deps, add `cn()`, copy a block. |
| `app/preview/[slug]/page.tsx` | Route (bare render) | Outside `(site)` deliberately — no `Header`/chrome. Looks up via `isRegistrySlug` (accepts both blocks and components). This is what the iframe loads. |
| `components/Header.tsx` | Site UI | Top nav, language toggle, and search across both index JSONs. |
| `components/Sidebar.tsx` | Site UI | Category filter list, used inside `BlocksGallery`. |
| `components/site/BlocksGallery.tsx` | Site UI | Client component: text search + category filter over an index, renders a `BlockCard` grid. Shared by both galleries. |
| `components/site/BlockCard.tsx` | Site UI | Card in the gallery grid; links to `${basePath}/${slug}`. |
| `components/site/BlockPreviewFrame.tsx` | Site UI | The live-preview iframe (`src="/preview/<slug>"`), with a desktop/tablet/mobile viewport switcher and auto-height measurement. |
| `components/site/PreviewCodeTabs.tsx` | Site UI | Tab shell switching between a `preview` node and a `code` node (both passed in as props). |
| `components/site/CodePanel.tsx` | Site UI | Server component: calls `resolveCodeFiles`, shiki-highlights every resolved file, passes them to `CodeFileTabs`. |
| `components/site/CodeFileTabs.tsx` | Site UI | File-tree + syntax-highlighted viewer for multi-file source, with a `CopyButton` per file. |
| `components/site/CopyButton.tsx` | Site UI | Copy-to-clipboard button. |
| `components/site/LocalizedMeta.tsx` | Site UI | Renders `meta.name[language]` / `meta.description[language]` on detail pages, reading `useLanguage()`. |

Rule of thumb: anything under `registry/` is *content* (blocks and components themselves, which **may**
import from each other and from `icons/`). Anything under `components/` is *site infrastructure* (the
gallery chrome around the content — it never renders inside a block's own preview). `app/` routes just
connect the two via `lib/registry.ts` — they don't own any block/component code.

## 2. Full cycle

**Adding a new block or component (what you do):**

1. Copy `registry/blocks/(slug)/` (or `registry/components/(slug)/`) to a new kebab-case folder matching
   your slug. Fill in `component.tsx` (default export), `meta.json` (localized `name`/`description` +
   `category`), and `data.ts` if it needs sample data.
2. Add one entry to `lib/registry.ts`: the map entry (`sourcePath`, `component`, `meta`) and the slug in
   `blockSlugs` or `componentSlugs`.
3. Add one entry to `registry/blocks.json` or `registry/components.json` (`slug`, `name`, `category`,
   `description` — plain English, no localization needed here).
4. If it depends on another registry entry or a shared asset, just import it directly
   (`@/registry/components/<slug>/component`, `@/icons/SocialIcons`) — `resolveCodeFiles` follows the
   import graph automatically, so the code viewer will show it too.

No page/route files need to be created or edited — the dynamic `[slug]` routes pick up the new entry
automatically.

**A visitor browsing (what happens live):**

```
app/(site)/blocks/page.tsx
  → reads registry/blocks.json
  → renders BlocksGallery (components/site/BlocksGallery.tsx)
      → filterable via components/Sidebar.tsx, searchable by name/description
      → grid of BlockCard (components/site/BlockCard.tsx)

  ↓ user clicks "Login Card"

app/(site)/blocks/login-card/page.tsx   (app/(site)/blocks/[slug]/page.tsx)
  → isBlockSlug("login-card") guard, else notFound()
  → registry["login-card"].meta() → { name: {en, th}, description: {en, th}, ... }
  → renders LocalizedMeta (localized via useLanguage())
  → renders PreviewCodeTabs { preview, code }

  ↓ Preview tab (default)                    ↓ Code tab
  BlockPreviewFrame                            CodePanel (server component)
    <iframe src="/preview/login-card">           → resolveCodeFiles("registry/blocks/login-card/component.tsx")
    + desktop/tablet/mobile toggle                 → follows imports into registry/components/input,
                                                      registry/components/button, icons/SocialIcons.tsx
                                                    → shiki-highlights each file
                                                    → CodeFileTabs renders a file tree + viewer

  ↓ iframe src loads

app/preview/login-card/page.tsx  (app/preview/[slug]/page.tsx)
  → isRegistrySlug("login-card") guard
  → registry["login-card"].component (dynamic import)
  → renders it alone, no Header/Sidebar — just the working block
```

`/components` follows the identical path through `registry/components.json`, `isComponentSlug`, and
`app/(site)/components/[slug]/page.tsx`, sharing every component in the list above.

## 3. Example files

### `registry/blocks/header/meta.json`

```json
{
  "name": { "en": "Dashboard Header", "th": "ส่วนหัวแดชบอร์ด" },
  "description": {
    "en": "App header with a live clock, current weather, and a profile dropdown menu.",
    "th": "ส่วนหัวแอปพร้อมนาฬิกาแบบเรียลไทม์ สภาพอากาศปัจจุบัน และเมนูโปรไฟล์แบบดรอปดาวน์"
  },
  "category": "dashboard",
  "tags": ["header", "navigation", "profile", "dropdown"]
}
```

### `registry/blocks.json`

```json
[
  {
    "slug": "header",
    "name": "Dashboard Header",
    "category": "dashboard",
    "description": "App header with a live clock, current weather, and a profile dropdown menu."
  },
  {
    "slug": "login-card",
    "name": "Login Card",
    "category": "auth",
    "description": "A sign-in card with email/password fields, password visibility toggle, remember-me, and social sign-in buttons."
  }
]
```

### `registry/components/card-metric/component.tsx` (cross-registry-safe, self-contained)

```tsx
import type { ComponentType, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp, ChevronRight, Leaf } from "lucide-react";
import { wasteData } from "./data";

export interface CardMetricProps {
  title?: string;
  value: number | string;
  unit?: string;
  icon?: ComponentType<{ className?: string }>;
  // ...trend/status/action props
  className?: string;
}

export const CardMetric = ({ title, value, unit, icon: Icon = Leaf, className, ...props }: CardMetricProps) => {
  return (
    <div className={cn("relative flex flex-row items-center gap-3 p-3 border border-slate-100 rounded-xl", className)} {...props}>
      <Icon className="w-4.5 h-4.5" />
      <div className="flex flex-col gap-1 min-w-0">
        <span className="text-xs font-medium text-slate-500 truncate">{title}</span>
        <span className="text-xl font-bold text-slate-800">{value}</span>
        {unit && <span className="text-[11px] text-slate-500">{unit}</span>}
      </div>
    </div>
  );
};

export default function CardMetricGrid() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {wasteData.map((item, index) => (
        <CardMetric key={index} {...item} className="bg-white hover:shadow-md transition-shadow duration-200" />
      ))}
    </div>
  );
}
```

### `registry/blocks/login-card/component.tsx` (a block depending on components + shared icons)

```tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/registry/components/input/component";
import { Button } from "@/registry/components/button/component";
import { GoogleIcon, MicrosoftIcon, EyeIcon, EyeOffIcon } from "../../../icons/SocialIcons";
import logo from "./logo.png";

export interface LoginCardProps {
  onSubmit?: (values: { email: string; password: string; rememberMe: boolean }) => void | Promise<void>;
  onGoogleSignIn?: () => void;
  onMicrosoftSignIn?: () => void;
}

export const LoginCard = ({ onSubmit, onGoogleSignIn, onMicrosoftSignIn }: LoginCardProps) => {
  // ...form state + markup using Input/Button/icons above
};

export default LoginCard;
```

### `lib/registry.ts` (excerpt)

```ts
import dynamic from "next/dynamic";

export interface BlockMeta {
  name: Record<"en" | "th", string>;
  description: Record<"en" | "th", string>;
  category: string;
  tags: string[];
}

export const registry = {
  "login-card": {
    sourcePath: "blocks/login-card",
    component: dynamic(() => import("@/registry/blocks/login-card/component")),
    meta: () => import("@/registry/blocks/login-card/meta.json").then((m) => m.default as BlockMeta),
  },
  "card-metric": {
    sourcePath: "components/card-metric",
    component: dynamic(() => import("@/registry/components/card-metric/component")),
    meta: () => import("@/registry/components/card-metric/meta.json").then((m) => m.default as BlockMeta),
  },
} as const;

export type RegistrySlug = keyof typeof registry;

export const blockSlugs = ["login-card"] as const satisfies readonly RegistrySlug[];
export const componentSlugs = ["card-metric"] as const satisfies readonly RegistrySlug[];

export type BlockSlug = (typeof blockSlugs)[number];
export type ComponentSlug = (typeof componentSlugs)[number];

export function isBlockSlug(slug: string): slug is BlockSlug {
  return (blockSlugs as readonly string[]).includes(slug);
}
export function isComponentSlug(slug: string): slug is ComponentSlug {
  return (componentSlugs as readonly string[]).includes(slug);
}
export function isRegistrySlug(slug: string): slug is RegistrySlug {
  return slug in registry;
}
```

### `lib/registry-source.ts` (the piece that makes cross-registry imports copyable)

```ts
// Walks the import graph starting from a registry entry file, following only
// colocated files and other registry/lib dependencies, so the code viewer can
// show everything a visitor needs to copy for that block/component to actually work.
export async function resolveCodeFiles(entryRelativePath: string): Promise<SourceFile[]> {
  // BFS over `import ... from "..."` specifiers:
  //  - "./foo"                    → colocated file, resolved relative to the importer
  //  - "@/registry/..." / "@/lib/..." → another registry entry or shared lib file
  //  - anything else (react, lucide-react, ...) → npm package, not included
  // Returns [{ label: "registry/blocks/login-card/component.tsx", source }, ...]
}
```

### `lib/utils.ts`

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### `app/(site)/blocks/page.tsx`

```tsx
import blocks from "@/registry/blocks.json";
import { BlocksGallery } from "@/components/site/BlocksGallery";

export default function BlocksPage() {
  const categories = Array.from(new Set(blocks.map((block) => block.category))).sort();
  return <BlocksGallery blocks={blocks} categories={categories} />;
}
```

### `app/(site)/blocks/[slug]/page.tsx`

```tsx
import { notFound } from "next/navigation";
import { registry, isBlockSlug } from "@/lib/registry";
import { BlockPreviewFrame } from "@/components/site/BlockPreviewFrame";
import { CodePanel } from "@/components/site/CodePanel";
import { PreviewCodeTabs } from "@/components/site/PreviewCodeTabs";
import { LocalizedMeta } from "@/components/site/LocalizedMeta";

export default async function BlockDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isBlockSlug(slug)) notFound();

  const meta = await registry[slug].meta();

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 p-8">
      <LocalizedMeta meta={meta} />
      <PreviewCodeTabs preview={<BlockPreviewFrame slug={slug} />} code={<CodePanel slug={slug} />} />
    </div>
  );
}
```

### `app/preview/[slug]/page.tsx`

```tsx
import { notFound } from "next/navigation";
import { registry, isRegistrySlug } from "@/lib/registry";

export default async function PreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isRegistrySlug(slug)) notFound();

  const Block = registry[slug].component;
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Block />
    </div>
  );
}
```

### `components/site/LocalizedMeta.tsx`

```tsx
"use client";

import { useLanguage } from "@/lib/language";
import type { BlockMeta } from "@/lib/registry";

export function LocalizedMeta({ meta }: { meta: BlockMeta }) {
  const { language } = useLanguage();
  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">{meta.name[language]}</h1>
      <p className="mt-1 text-slate-500">{meta.description[language]}</p>
    </div>
  );
}
```

## 4. Not part of the live app

- `registry/{blocks,components}/(slug)/` — empty scaffold folders, copy-source only.
- `forclaude/prompt.md` — the original build spec this project was implemented from. Superseded by this
  document; kept for history only.
- `toggle/` — an earlier, unwired draft of `PreviewCodeTabs`/`CodePanel`. Not imported anywhere. Confirm
  with the project owner before deleting.
