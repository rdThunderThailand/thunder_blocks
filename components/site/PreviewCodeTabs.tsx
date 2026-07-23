"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PreviewCodeTabsProps {
  preview: ReactNode;
  code: ReactNode;
}

export function PreviewCodeTabs({ preview, code }: PreviewCodeTabsProps) {
  const [tab, setTab] = useState<"preview" | "code">("preview");

  return (
    <div className="flex flex-col gap-4 w-[70vw]">
      <div className="flex gap-1 border-b border-slate-200">
        {(["preview", "code"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "border-b-2 px-4 py-2 text-sm font-medium capitalize transition-colors",
              tab === t
                ? "border-slate-900 text-slate-900"
                : "border-transparent text-slate-500 hover:text-slate-700"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className={tab === "preview" ? "block" : "hidden"}>{preview}</div>
      <div className={tab === "code" ? "block" : "hidden"}>{code}</div>
    </div>
  );
}
