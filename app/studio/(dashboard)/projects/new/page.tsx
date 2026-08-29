"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SchemaForm } from "@/components/studio/SchemaForm";
import { PROJECT_FIELDS } from "@/lib/studio-schemas";

export default function NewProjectPage() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(data: Record<string, unknown>) {
    if (!id.trim()) {
      setError("Project ID is required");
      throw new Error("Project ID is required");
    }
    const res = await fetch("/api/studio/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, id, order: Date.now() }),
    });
    const body = await res.json();
    if (!res.ok) throw new Error(body.error ?? "Failed to create project");
    router.push(`/studio/projects/${body.id}`);
  }

  return (
    <div>
      <button
        onClick={() => router.push("/studio/projects")}
        className="text-[12px] mb-6"
        style={{ color: "var(--flaz-teal)" }}
      >
        ← All projects
      </button>
      <h1 className="text-[24px] font-medium text-[var(--flaz-dark)] mb-8">New project</h1>
      {error && <p className="text-[13px] text-red-600 mb-4">{error}</p>}

      <label className="flex flex-col gap-1.5 mb-6" style={{ maxWidth: "640px" }}>
        <span className="text-[12px] font-medium text-[var(--flaz-dark)]">
          Project ID (used in the URL, e.g. &quot;villa-lakes&quot;)
        </span>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="border rounded-sm px-3 py-2 text-[14px]"
          style={{ borderColor: "rgba(44,44,44,0.15)" }}
        />
      </label>

      <SchemaForm
        fields={PROJECT_FIELDS}
        initialData={{}}
        onSubmit={handleSubmit}
        submitLabel="Create project"
      />
    </div>
  );
}
