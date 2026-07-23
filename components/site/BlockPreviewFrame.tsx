"use client";

import { useRef, useState } from "react";
import { Monitor, Tablet, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

const VIEWPORTS = {
  desktop: { label: "Desktop", icon: Monitor, width: "100%" },
  tablet: { label: "Tablet", icon: Tablet, width: "768px" },
  mobile: { label: "Mobile", icon: Smartphone, width: "375px" },
} as const;

type Viewport = keyof typeof VIEWPORTS;

interface BlockPreviewFrameProps {
  slug: string;
}

export function BlockPreviewFrame({ slug }: BlockPreviewFrameProps) {
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [height, setHeight] = useState(300);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleLoad = () => {
    const doc = iframeRef.current?.contentDocument;
    if (!doc) return;

    const measure = () => setHeight(doc.documentElement.scrollHeight);

    if (doc.fonts?.ready) {
      doc.fonts.ready.then(measure);
    } else {
      measure();
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1 self-center rounded-lg border border-slate-200 p-1">
        {(Object.keys(VIEWPORTS) as Viewport[]).map((key) => {
          const { label, icon: Icon } = VIEWPORTS[key];
          return (
            <button
              key={key}
              onClick={() => setViewport(key)}
              aria-label={label}
              title={label}
              className={cn(
                "flex items-center justify-center rounded-md p-1.5 transition-colors",
                viewport === key
                  ? "bg-slate-900 text-white"
                  : "text-slate-500 hover:bg-slate-100"
              )}
            >
              <Icon className="h-4 w-4" />
            </button>
          );
        })}
      </div>

      <div className="flex justify-center overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-4">
        <iframe
          ref={iframeRef}
          src={`/preview/${slug}`}
          onLoad={handleLoad}
          style={{ width: VIEWPORTS[viewport].width, height }}
          className="max-w-full rounded-md border border-slate-200 bg-white transition-[width] duration-200"
          title={`Preview of ${slug}`}
        />
      </div>
    </div>
  );
}
