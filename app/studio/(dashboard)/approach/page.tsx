import { CollectionEditor } from "@/components/studio/CollectionEditor";
import { COLLECTIONS } from "@/lib/studio-schemas";

export default function StudioApproachPage() {
  const def = COLLECTIONS.approach;
  return <CollectionEditor collectionKey={def.key} title={def.title} fields={def.fields} />;
}
