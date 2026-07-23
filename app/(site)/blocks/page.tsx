import blocks from "@/registry/blocks.json";
import { BlocksGallery } from "@/components/site/BlocksGallery";

export default function BlocksPage() {
  const categories = Array.from(new Set(blocks.map((block) => block.category))).sort();

  return <BlocksGallery blocks={blocks} categories={categories} />;
}
