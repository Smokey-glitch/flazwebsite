import { CollectionEditor } from "@/components/studio/CollectionEditor";
import { COLLECTIONS } from "@/lib/studio-schemas";

export default function StudioWhyUsPage() {
  const def = COLLECTIONS["why-us"];
  return <CollectionEditor collectionKey={def.key} title={def.title} fields={def.fields} />;
}
