import fs from "fs/promises";
import path from "path";

export interface SourceFile {
    label: string;
    source: string;
}

const CODE_EXTENSIONS = [".tsx", ".ts", ".jsx", ".js", ".json"];

// Matches the specifier of any `import ... from "..."` (default, named, type-only,
// or side-effect-only) statement.
const IMPORT_SPECIFIER_PATTERN = /import\s+(?:type\s+)?(?:[\s\S]*?from\s+)?["']([^"']+)["']/g;

function toLabel(absPath: string): string {
    return path.relative(process.cwd(), absPath).split(path.sep).join("/");
}

async function resolveImportPath(specifier: string, fromAbsPath: string): Promise<string | null> {
    let targetBase: string;

    if (specifier.startsWith(".")) {
        // Colocated file next to the importing module (e.g. "./SocialIcons", "./data").
        targetBase = path.resolve(path.dirname(fromAbsPath), specifier);
    } else if (specifier.startsWith("@/registry/") || specifier.startsWith("@/lib/")) {
        // Cross-registry or shared-utility dependency (e.g. "@/registry/components/button/component").
        targetBase = path.join(process.cwd(), specifier.slice(2));
    } else {
        // npm package (react, lucide-react, ...) — the consumer installs these themselves.
        return null;
    }

    const candidates = CODE_EXTENSIONS.includes(path.extname(targetBase))
        ? [targetBase]
        : CODE_EXTENSIONS.map((ext) => targetBase + ext);

    for (const candidate of candidates) {
        try {
            const stat = await fs.stat(candidate);
            if (stat.isFile()) {
                return candidate;
            }
        } catch {
            continue;
        }
    }
    // No code file matched (e.g. "./logo.png" — a binary asset, not shown as source).
    return null;
}

// Walks the import graph starting from a registry entry file, following only
// colocated files and other registry/lib dependencies, so the code viewer can
// show everything a visitor needs to copy for that block/component to actually work.
export async function resolveCodeFiles(entryRelativePath: string): Promise<SourceFile[]> {
    const entryAbsPath = path.join(process.cwd(), entryRelativePath);
    const visited = new Set<string>();
    const files: SourceFile[] = [];
    const queue: string[] = [entryAbsPath];

    while (queue.length > 0) {
        const currentAbsPath = queue.shift()!;
        if (visited.has(currentAbsPath)) continue;
        visited.add(currentAbsPath);

        let source: string;
        try {
            source = await fs.readFile(currentAbsPath, "utf-8");
        } catch {
            continue;
        }

        files.push({ label: toLabel(currentAbsPath), source });

        const specifiers = new Set<string>();
        for (const match of source.matchAll(IMPORT_SPECIFIER_PATTERN)) {
            specifiers.add(match[1]);
        }

        for (const specifier of specifiers) {
            const resolved = await resolveImportPath(specifier, currentAbsPath);
            if (resolved && !visited.has(resolved)) {
                queue.push(resolved);
            }
        }
    }

    return files;
}
