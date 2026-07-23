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
