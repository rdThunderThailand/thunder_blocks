import Link from "next/link";

interface BlockCardProps {
  slug: string;
  name: string;
  category: string;
  description: string;
  basePath?: string;
}

export function BlockCard({ slug, name, category, description, basePath = "/blocks" }: BlockCardProps) {
  return (
    <Link
      href={`${basePath}/${slug}`}
      className="group flex flex-col gap-2 rounded-xl border border-slate-200 p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-medium text-slate-800 group-hover:underline">
          {name}
        </span>
        <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium capitalize text-slate-500">
          {category}
        </span>
      </div>
      <p className="text-sm text-slate-500">{description}</p>
    </Link>
  );
}
