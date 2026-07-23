import { codeToHtml } from "shiki";
import { registry, type RegistrySlug } from "@/lib/registry";
import { resolveCodeFiles } from "@/lib/registry-source";
import { CodeFileTabs } from "./CodeFileTabs";

interface CodePanelProps {
  slug: RegistrySlug;
}

function languageForLabel(label: string): "json" | "css" | "ts" | "tsx" {
  if (label.endsWith(".json")) return "json";
  if (label.endsWith(".css")) return "css";
  if (label.endsWith(".ts")) return "ts";
  return "tsx";
}

export async function CodePanel({ slug }: CodePanelProps) {
  const entryRelativePath = `registry/${registry[slug].sourcePath}/component.tsx`;
  const files = await resolveCodeFiles(entryRelativePath);

  const highlightedFiles = await Promise.all(
    files.map(async (file) => ({
      label: file.label,
      source: file.source,
      highlighted: await codeToHtml(file.source, {
        lang: languageForLabel(file.label),
        theme: "ayu-light",
      }),
    }))
  );

  return <CodeFileTabs files={highlightedFiles} />;
}
