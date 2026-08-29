"use client";

import { useEffect, useState } from "react";
import { SchemaForm } from "./SchemaForm";
import type { FieldSchema } from "@/lib/studio-schemas";

type Data = Record<string, unknown>;

export function CollectionEditor({
  collectionKey,
  title,
  fields,
}: {
  collectionKey: string;
  title: string;
  fields: FieldSchema[];
}) {
  const [state, setState] = useState<{ data: Data; sha: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/studio/content/${collectionKey}`)
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error ?? "Failed to load");
        }
        return res.json();
      })
      .then((body) => setState({ data: body.data, sha: body.sha }))
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load"));
  }, [collectionKey]);

  async function handleSubmit(data: Data) {
    if (!state) return;
    const res = await fetch(`/api/studio/content/${collectionKey}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data, sha: state.sha }),
    });
    const body = await res.json();
    if (!res.ok) throw new Error(body.error ?? "Failed to save");
    setState({ data, sha: body.sha });
  }

  return (
    <div>
      <h1 className="text-[24px] font-medium text-[var(--flaz-dark)] mb-8">{title}</h1>
      {error && <p className="text-[13px] text-red-600 mb-4">{error}</p>}
      {!state && !error && <p className="text-[13px] text-gray-400">Loading…</p>}
      {state && <SchemaForm fields={fields} initialData={state.data} onSubmit={handleSubmit} />}
    </div>
  );
}
