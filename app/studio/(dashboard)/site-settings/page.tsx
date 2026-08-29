import { CollectionEditor } from "@/components/studio/CollectionEditor";
import { COLLECTIONS } from "@/lib/studio-schemas";

export default function StudioSiteSettingsPage() {
  const def = COLLECTIONS["site-settings"];
  return <CollectionEditor collectionKey={def.key} title={def.title} fields={def.fields} />;
}
