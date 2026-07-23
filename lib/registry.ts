import dynamic from "next/dynamic";

export interface BlockMeta {
    name: Record<"en" | "th", string>;
    description: Record<"en" | "th", string>;
    category: string;
    tags: string[];
}

export const registry = {
    header: {
        sourcePath: "blocks/header",
        component: dynamic(() => import("@/registry/blocks/header/component")),
        meta: () =>
            import("@/registry/blocks/header/meta.json").then(
                (m) => m.default as BlockMeta
            ),
    },
    "login-card": {
        sourcePath: "blocks/login-card",
        component: dynamic(() => import("@/registry/blocks/login-card/component")),
        meta: () =>
            import("@/registry/blocks/login-card/meta.json").then(
                (m) => m.default as BlockMeta
            ),
    },
    "register-card": {
        sourcePath: "blocks/register-card",
        component: dynamic(() => import("@/registry/blocks/register-card/component")),
        meta: () =>
            import("@/registry/blocks/register-card/meta.json").then(
                (m) => m.default as BlockMeta
            ),
    },
    "card-metric": {
        sourcePath: "components/card-metric",
        component: dynamic(() => import("@/registry/components/card-metric/component")),
        meta: () =>
            import("@/registry/components/card-metric/meta.json").then(
                (m) => m.default as BlockMeta
            ),
    },
    "card-data": {
        sourcePath: "components/card-data",
        component: dynamic(() => import("@/registry/components/card-data/component")),
        meta: () =>
            import("@/registry/components/card-data/meta.json").then(
                (m) => m.default as BlockMeta
            ),
    },
    "card-data-horizontal": {
        sourcePath: "components/card-data-horizontal",
        component: dynamic(() => import("@/registry/components/card-data-horizontal/component")),
        meta: () =>
            import("@/registry/components/card-data-horizontal/meta.json").then(
                (m) => m.default as BlockMeta
            ),
    },
    "card-data-media": {
        sourcePath: "components/card-data-media",
        component: dynamic(() => import("@/registry/components/card-data-media/component")),
        meta: () =>
            import("@/registry/components/card-data-media/meta.json").then(
                (m) => m.default as BlockMeta
            ),
    },
    "card-greeting": {
        sourcePath: "components/card-greeting",
        component: dynamic(() => import("@/registry/components/card-greeting/component")),
        meta: () =>
            import("@/registry/components/card-greeting/meta.json").then(
                (m) => m.default as BlockMeta
            ),
    },
    "card-score-guage": {
        sourcePath: "components/card-score-guage",
        component: dynamic(() => import("@/registry/components/card-score-guage/component")),
        meta: () =>
            import("@/registry/components/card-score-guage/meta.json").then(
                (m) => m.default as BlockMeta
            ),
    },
    "card-metric-w-line": {
        sourcePath: "components/card-metric-w-line",
        component: dynamic(() => import("@/registry/components/card-metric-w-line/component")),
        meta: () =>
            import("@/registry/components/card-metric-w-line/meta.json").then(
                (m) => m.default as BlockMeta
            ),
    },
    button: {
        sourcePath: "components/button",
        component: dynamic(() => import("@/registry/components/button/component")),
        meta: () =>
            import("@/registry/components/button/meta.json").then(
                (m) => m.default as BlockMeta
            ),
    },
    "weather-card": {
        sourcePath: "components/weather-card",
        component: dynamic(() => import("@/registry/components/weather-card/component")),
        meta: () =>
            import("@/registry/components/weather-card/meta.json").then(
                (m) => m.default as BlockMeta
            ),
    },
    input: {
        sourcePath: "components/input",
        component: dynamic(() => import("@/registry/components/input/component")),
        meta: () =>
            import("@/registry/components/input/meta.json").then(
                (m) => m.default as BlockMeta
            ),
    },
    "search-input": {
        sourcePath: "components/search-input",
        component: dynamic(() => import("@/registry/components/search-input/component")),
        meta: () =>
            import("@/registry/components/search-input/meta.json").then(
                (m) => m.default as BlockMeta
            ),
    },
    "tabs": {
        sourcePath: "components/tabs",
        component: dynamic(() => import("@/registry/components/tabs/component")),
        meta: () =>
            import("@/registry/components/tabs/meta.json").then(
                (m) => m.default as BlockMeta
            ),
    },
    "dropdown": {
        sourcePath: "components/dropdown",
        component: dynamic(() => import("@/registry/components/dropdown/component")),
        meta: () =>
            import("@/registry/components/dropdown/meta.json").then(
                (m) => m.default as BlockMeta
            ),
    },
    "dropdown-image": {
        sourcePath: "components/dropdown-image",
        component: dynamic(() => import("@/registry/components/dropdown-image/component")),
        meta: () =>
            import("@/registry/components/dropdown-image/meta.json").then(
                (m) => m.default as BlockMeta
            ),
    },
    "modal": {
        sourcePath: "components/modal",
        component: dynamic(() => import("@/registry/components/modal/component")),
        meta: () =>
            import("@/registry/components/modal/meta.json").then(
                (m) => m.default as BlockMeta
            ),
    },
    "table": {
        sourcePath: "components/table",
        component: dynamic(() => import("@/registry/components/table/component")),
        meta: () =>
            import("@/registry/components/table/meta.json").then(
                (m) => m.default as BlockMeta
            ),
    },
    "chart-pie": {
        sourcePath: "components/chart-pie",
        component: dynamic(() => import("@/registry/components/chart-pie/component")),
        meta: () =>
            import("@/registry/components/chart-pie/meta.json").then(
                (m) => m.default as BlockMeta
            ),
    },
    "chart-line": {
        sourcePath: "components/chart-line",
        component: dynamic(() => import("@/registry/components/chart-line/component")),
        meta: () =>
            import("@/registry/components/chart-line/meta.json").then(
                (m) => m.default as BlockMeta
            ),
    },
    "chart-bar": {
        sourcePath: "components/chart-bar",
        component: dynamic(() => import("@/registry/components/chart-bar/component")),
        meta: () =>
            import("@/registry/components/chart-bar/meta.json").then(
                (m) => m.default as BlockMeta
            ),
    },
} as const;

export type RegistrySlug = keyof typeof registry;

// Which slugs show up on /blocks vs /components.
export const blockSlugs = ["header", "login-card", "register-card"] as const satisfies readonly RegistrySlug[];
export const componentSlugs = [
    "card-metric",
    "card-data",
    "card-data-horizontal",
    "card-data-media",
    "card-greeting",
    "card-score-guage",
    "card-metric-w-line",
    "button",
    "weather-card",
    "input",
    "search-input",
    "tabs",
    "dropdown",
    "dropdown-image",
    "modal",
    "table",
    "chart-pie",
    "chart-line",
    "chart-bar",
] as const satisfies readonly RegistrySlug[];

export type BlockSlug = (typeof blockSlugs)[number];
export type ComponentSlug = (typeof componentSlugs)[number];

export function isBlockSlug(slug: string): slug is BlockSlug {
    return (blockSlugs as readonly string[]).includes(slug);
}

export function isComponentSlug(slug: string): slug is ComponentSlug {
    return (componentSlugs as readonly string[]).includes(slug);
}

// Used by /preview/[slug], which serves both blocks and components.
export function isRegistrySlug(slug: string): slug is RegistrySlug {
    return slug in registry;
}
