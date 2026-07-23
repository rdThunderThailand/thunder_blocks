import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { registry, isComponentSlug } from "@/lib/registry";
import { BlockPreviewFrame } from "@/components/site/BlockPreviewFrame";
import { CodePanel } from "@/components/site/CodePanel";
import { PreviewCodeTabs } from "@/components/site/PreviewCodeTabs";
import { LocalizedMeta } from "@/components/site/LocalizedMeta";

export default async function ComponentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!isComponentSlug(slug)) {
    notFound();
  }

  const meta = await registry[slug].meta();

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 p-8">
      <Link
        href="/components"
        className="flex w-fit items-center gap-1 text-sm text-slate-500 hover:text-slate-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to gallery
      </Link>

      <LocalizedMeta meta={meta} />

      <PreviewCodeTabs
        preview={<BlockPreviewFrame slug={slug} />}
        code={<CodePanel slug={slug} />}
      />
    </div>
  );
}
