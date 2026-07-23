import Link from "next/link";
import blocksData from "@/registry/blocks.json";
import componentsData from "@/registry/components.json";

export default function Home() {
  const blockCount = blocksData.length;
  const componentCount = componentsData.length;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-start justify-center gap-8 px-25">
      <div className="flex flex-col items-start">
        <p className="text-3xl text-gray-500/70 -mb-3">Welcome to</p>
        <h1 className="text-7xl font-black">thunderblocks.</h1>
        <p className="text-lg text-gray-600">
          knowledge base for thunder ui framework
        </p>
      </div>

      <Link
        href="/docs"
        className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800"
      >
        Get started
      </Link>

      <dl className="flex gap-10">
        <div className="flex flex-col items-center">
          <dt className="text-2xl font-bold text-slate-900">{blockCount}</dt>
          <dd className="text-xs text-slate-500">Blocks</dd>
        </div>
        <div className="flex flex-col items-center">
          <dt className="text-2xl font-bold text-slate-900">{componentCount}</dt>
          <dd className="text-xs text-slate-500">Components</dd>
        </div>
      </dl>
    </div>
  );
}
