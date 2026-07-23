import components from "@/registry/components.json";
import { BlocksGallery } from "@/components/site/BlocksGallery";

export default function ComponentsPage() {
  const categories = Array.from(new Set(components.map((c) => c.category))).sort();

  return (
    <BlocksGallery
      blocks={components}
      categories={categories}
      allLabel="All components"
      basePath="/components"
    />
  );
}
