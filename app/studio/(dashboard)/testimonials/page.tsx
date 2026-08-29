import { CollectionEditor } from "@/components/studio/CollectionEditor";
import { COLLECTIONS } from "@/lib/studio-schemas";

export default function StudioTestimonialsPage() {
  const def = COLLECTIONS.testimonials;
  return <CollectionEditor collectionKey={def.key} title={def.title} fields={def.fields} />;
}
