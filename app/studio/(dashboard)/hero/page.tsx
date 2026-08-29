import { CollectionEditor } from "@/components/studio/CollectionEditor";
import { COLLECTIONS } from "@/lib/studio-schemas";

export default function StudioHeroPage() {
  const def = COLLECTIONS.hero;
  return <CollectionEditor collectionKey={def.key} title={def.title} fields={def.fields} />;
}
