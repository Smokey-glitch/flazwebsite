import { CollectionEditor } from "@/components/studio/CollectionEditor";
import { COLLECTIONS } from "@/lib/studio-schemas";

export default function StudioServicesPage() {
  const def = COLLECTIONS.services;
  return <CollectionEditor collectionKey={def.key} title={def.title} fields={def.fields} />;
}
