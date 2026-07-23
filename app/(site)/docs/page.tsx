import Link from "next/link";
import { CopyButton } from "@/components/site/CopyButton";

const dependencies = [
  {
    name: "tailwindcss",
    description: "Utility classes used for all styling in every block.",
  },
  {
    name: "clsx",
    description: "Conditionally joins class names together.",
  },
  {
    name: "tailwind-merge",
    description: "Resolves conflicting Tailwind classes. Paired with clsx as the cn() helper.",
  },
  {
    name: "lucide-react",
    description: "Icon set used throughout the blocks and components.",
  },
];

const installCommand = "npm install clsx tailwind-merge lucide-react";
const cnHelper = `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`;

export default function Docs() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold text-slate-900">Getting started</h1>
      <p className="mt-2 text-slate-600">
        thunderblocks is a browsable gallery, not an installable package. Copy
        the source of any block or component into your project — you just
        need the following libraries already set up.
      </p>

      <h2 className="mt-10 text-lg font-semibold text-slate-900">
        Prerequisites
      </h2>
      <p className="mt-2 text-slate-600">
        A React project (Next.js recommended) with{" "}
        <a
          href="https://tailwindcss.com/docs/installation"
          className="font-medium text-slate-900 underline underline-offset-2"
        >
          Tailwind CSS
        </a>{" "}
        already configured.
      </p>

      <h2 className="mt-10 text-lg font-semibold text-slate-900">
        Install dependencies
      </h2>
      <p className="mt-2 text-slate-600">
        Every block relies on the same small set of packages:
      </p>

      <div className="mt-4 flex items-center justify-between gap-4 rounded-lg bg-zinc-900 px-4 py-3">
        <code className="overflow-x-auto text-sm text-zinc-100">
          {installCommand}
        </code>
        <CopyButton source={installCommand} />
      </div>

      <ul className="mt-6 flex flex-col gap-4">
        {dependencies.map((dep) => (
          <li
            key={dep.name}
            className="rounded-lg border border-slate-200 p-4"
          >
            <p className="font-mono text-sm font-semibold text-slate-900">
              {dep.name}
            </p>
            <p className="mt-1 text-sm text-slate-500">{dep.description}</p>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 text-lg font-semibold text-slate-900">
        Add the cn() helper
      </h2>
      <p className="mt-2 text-slate-600">
        Blocks use a small <code className="text-slate-900">cn()</code>{" "}
        utility to merge class names. Add it to your project as{" "}
        <code className="text-slate-900">lib/utils.ts</code>:
      </p>

      <pre className="mt-4 flex items-baseline justify-between gap-4 overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
        <code className="text-sm text-zinc-100">{cnHelper}</code>
        <CopyButton source={cnHelper} />
      </pre>

      <h2 className="mt-10 text-lg font-semibold text-slate-900">
        Using a block
      </h2>
      <p className="mt-2 text-slate-600">
        Open any block from the{" "}
        <Link href="/blocks" className="font-medium text-slate-900 underline underline-offset-2">
          Blocks
        </Link>{" "}
        or{" "}
        <Link href="/components" className="font-medium text-slate-900 underline underline-offset-2">
          Components
        </Link>{" "}
        gallery, switch to the Code tab, and copy the source directly into
        your project.
      </p>
    </div>
  );
}
