import { notFound } from "next/navigation";
import { registry, isRegistrySlug } from "@/lib/registry";

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!isRegistrySlug(slug)) {
    notFound();
  }

  const Block = registry[slug].component;

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Block />
    </div>
  );
}
