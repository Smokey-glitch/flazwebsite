import { CollectionEditor } from "@/components/studio/CollectionEditor";
import { COLLECTIONS } from "@/lib/studio-schemas";

export default function StudioFaqPage() {
  const def = COLLECTIONS.faq;
  return <CollectionEditor collectionKey={def.key} title={def.title} fields={def.fields} />;
}
