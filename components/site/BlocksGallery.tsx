"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Sidebar } from "../Sidebar";
import { BlockCard } from "./BlockCard";

interface Block {
  slug: string;
  name: string;
  category: string;
  description: string;
}

interface BlocksGalleryProps {
  blocks: Block[];
  categories: string[];
  allLabel?: string;
  basePath?: string;
}

export function BlocksGallery({ blocks, categories, allLabel, basePath }: BlocksGalleryProps) {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blocks.filter((block) => {
      const matchesCategory = category === "all" || block.category === category;
      const matchesQuery =
        q.length === 0 ||
        block.name.toLowerCase().includes(q) ||
        block.description.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [blocks, category, query]);

  return (
    <div className="flex flex-col gap-8 p-8 sm:flex-row">
      <Sidebar
        categories={categories}
        active={category}
        onSelect={setCategory}
        allLabel={allLabel}
      />

      <div className="flex flex-1 flex-col gap-6">
        <div className="relative max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search blocks..."
            className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-slate-400"
          />
        </div>

        {filtered.length === 0 ? (
          <p className="text-sm text-slate-500">
            No blocks match your search.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((block) => (
              <BlockCard key={block.slug} {...block} basePath={basePath} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
