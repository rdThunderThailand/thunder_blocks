"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language";
import blocksData from "@/registry/blocks.json";
import componentsData from "@/registry/components.json";

const translations = {
  en: {
    docs: "Docs",
    blocks: "Blocks",
    components: "Components",
    searchPlaceholder: "Search blocks & components...",
    noResults: "No results found.",
    block: "Block",
    component: "Component",
    switchLanguage: "Switch to Thai",
  },
  th: {
    docs: "เอกสาร",
    blocks: "บล็อก",
    components: "คอมโพเนนต์",
    searchPlaceholder: "ค้นหาบล็อกและคอมโพเนนต์...",
    noResults: "ไม่พบผลลัพธ์",
    block: "บล็อก",
    component: "คอมโพเนนต์",
    switchLanguage: "เปลี่ยนเป็นภาษาอังกฤษ",
  },
} as const;

interface SearchItem {
  slug: string;
  name: string;
  category: string;
  description: string;
  kind: "block" | "component";
  href: string;
}

const searchIndex: SearchItem[] = [
  ...blocksData.map((b) => ({ ...b, kind: "block" as const, href: `/blocks/${b.slug}` })),
  ...componentsData.map((c) => ({
    ...c,
    kind: "component" as const,
    href: `/components/${c.slug}`,
  })),
];

export function Header() {
  const pathname = usePathname();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: t.docs, href: "/docs" },
    { label: t.blocks, href: "/blocks" },
    { label: t.components, href: "/components" },
  ];

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return searchIndex
      .filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function closeSearch() {
    setQuery("");
    setIsSearchOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-14 items-center justify-between gap-4 px-4 sm:px-8">
        <Link
          href="/"
          className="shrink-0 text-sm font-semibold tracking-tight text-slate-900"
        >
          thunderblocks
        </Link>

        <div ref={searchRef} className="relative min-w-0 flex-1 max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Escape") closeSearch();
            }}
            placeholder={t.searchPlaceholder}
            className="w-full rounded-lg border border-slate-200 py-1.5 pl-9 pr-8 text-sm outline-none focus:border-slate-400"
          />
          {query.length > 0 && (
            <button
              onClick={closeSearch}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {isSearchOpen && query.trim().length > 0 && (
            <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg">
              {results.length === 0 ? (
                <p className="px-3 py-2 text-sm text-slate-500 ">
                  {t.noResults}
                </p>
              ) : (
                results.map((item) => (
                  <Link
                    key={`${item.kind}-${item.slug}`}
                    href={item.href}
                    onClick={closeSearch}
                    className="flex items-center justify-between gap-2 rounded-md px-3 py-2 text-sm hover:bg-slate-100"
                  >
                    <span className="flex min-w-0 flex-col">
                      <span className="truncate font-medium text-slate-800">
                        {item.name}
                      </span>
                      <span className="truncate text-xs text-slate-500">
                        {item.description}
                      </span>
                    </span>
                    <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium uppercase text-slate-500">
                      {item.kind === "block" ? t.block : t.component}
                    </span>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-yellow-500 hover:bg-gray-100 font-black"
                    : "text-slate-600 hover:bg-gray-100 hover:text-slate-900"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={toggleLanguage}
          title={t.switchLanguage}
          className="flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-gray-100 hover:text-slate-900"
        >
          <Languages className="h-4 w-4" />
          {language === "en" ? "EN" : "TH"}
        </button>
      </div>
    </header>
  );
}
