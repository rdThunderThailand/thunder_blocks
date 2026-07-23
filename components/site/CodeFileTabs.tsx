"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronRight, File, Folder, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { CopyButton } from "./CopyButton";

export interface HighlightedFile {
  label: string;
  source: string;
  highlighted: string;
}

interface CodeFileTabsProps {
  files: HighlightedFile[];
}

type TreeFolder = { type: "folder"; name: string; path: string; children: TreeNode[] };
type TreeFile = { type: "file"; name: string; path: string; index: number };
type TreeNode = TreeFolder | TreeFile;

function buildFileTree(files: HighlightedFile[]): TreeNode[] {
  const root: TreeFolder = { type: "folder", name: "", path: "", children: [] };

  files.forEach((file, index) => {
    const parts = file.label.split("/");
    let current = root;

    parts.forEach((part, i) => {
      const path = parts.slice(0, i + 1).join("/");

      if (i === parts.length - 1) {
        current.children.push({ type: "file", name: part, path, index });
        return;
      }

      let next = current.children.find(
        (child): child is TreeFolder => child.type === "folder" && child.name === part
      );
      if (!next) {
        next = { type: "folder", name: part, path, children: [] };
        current.children.push(next);
      }
      current = next;
    });
  });

  return root.children;
}

function FileTreeRow({
  node,
  depth,
  activeIndex,
  onSelect,
}: {
  node: TreeNode;
  depth: number;
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const paddingLeft = 10 + depth * 14;

  if (node.type === "file") {
    const active = node.index === activeIndex;
    return (
      <button
        onClick={() => onSelect(node.index)}
        style={{ paddingLeft }}
        className={cn(
          "flex w-full items-center gap-1.5 rounded-md py-1.5 pr-2 text-left font-mono text-xs transition-colors",
          active
            ? "bg-slate-900 text-white"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        )}
      >
        <File className="h-3.5 w-3.5 shrink-0" />
        <span className="truncate">{node.name}</span>
      </button>
    );
  }

  const FolderIcon = isOpen ? FolderOpen : Folder;

  return (
    <div>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        style={{ paddingLeft }}
        className="flex w-full items-center gap-1 rounded-md py-1.5 pr-2 text-left font-mono text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100"
      >
        {isOpen ? (
          <ChevronDown className="h-3.5 w-3.5 shrink-0 text-slate-400" />
        ) : (
          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-400" />
        )}
        <FolderIcon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
        <span className="truncate">{node.name}</span>
      </button>

      {isOpen &&
        node.children.map((child) => (
          <FileTreeRow
            key={child.path}
            node={child}
            depth={depth + 1}
            activeIndex={activeIndex}
            onSelect={onSelect}
          />
        ))}
    </div>
  );
}

export function CodeFileTabs({ files }: CodeFileTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tree = useMemo(() => buildFileTree(files), [files]);
  const active = files[activeIndex];

  if (!active) return null;

  if (files.length === 1) {
    return (
      <div className="relative overflow-hidden rounded-lg border border-zinc-100">
        <div className="absolute right-3 top-3 z-10">
          <CopyButton source={active.source} />
        </div>
        <div
          className="max-h-[600px] overflow-auto text-sm [&_pre]:p-4"
          dangerouslySetInnerHTML={{ __html: active.highlighted }}
        />
      </div>
    );
  }

  return (
    <div className="flex overflow-hidden rounded-lg border border-zinc-100">
      <div className="w-56 shrink-0 overflow-auto border-r border-slate-200 bg-slate-50 p-2">
        {tree.map((node) => (
          <FileTreeRow
            key={node.path}
            node={node}
            depth={0}
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
          />
        ))}
      </div>

      <div className="relative min-w-0 flex-1">
        <div className="absolute right-3 top-3 z-10">
          <CopyButton source={active.source} />
        </div>
        <div
          className="max-h-[600px] overflow-auto text-sm [&_pre]:p-4"
          dangerouslySetInnerHTML={{ __html: active.highlighted }}
        />
      </div>
    </div>
  );
}
