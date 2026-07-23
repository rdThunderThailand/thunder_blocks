import { cn } from "@/lib/utils";

interface SidebarProps {
  categories: string[];
  active: string;
  onSelect: (category: string) => void;
  allLabel?: string;
}

export function Sidebar({ categories, active, onSelect, allLabel = "All blocks" }: SidebarProps) {
  return (
    <nav className="flex flex-col gap-1 w-full sm:w-48 shrink-0">
      <button
        onClick={() => onSelect("all")}
        className={cn(
          "text-left px-3 py-2 rounded-lg text-sm font-medium capitalize transition-colors",
          active === "all"
            ? "bg-slate-900 text-white"
            : "text-slate-600 hover:bg-slate-100"
        )}
      >
        {allLabel}
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={cn(
            "text-left px-3 py-2 rounded-lg text-sm font-medium capitalize transition-colors",
            active === category
              ? "bg-slate-900 text-white"
              : "text-slate-600 hover:bg-slate-100"
          )}
        >
          {category}
        </button>
      ))}
    </nav>
  );
}
