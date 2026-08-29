"use client";

import { useState, type FormEvent } from "react";
import type { FieldSchema, ObjectListField, PrimitiveListField } from "@/lib/studio-schemas";
import { SortableList } from "./SortableList";
import { ImageUploadField } from "./ImageUploadField";

type Data = Record<string, unknown>;

const inputStyle = { borderColor: "rgba(44,44,44,0.15)" };

export function SchemaForm({
  fields,
  initialData,
  onSubmit,
  submitLabel = "Save",
}: {
  fields: FieldSchema[];
  initialData: Data;
  onSubmit: (data: Data) => Promise<void>;
  submitLabel?: string;
}) {
  const [data, setData] = useState<Data>(initialData);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function setField(name: string, value: unknown) {
    setData((d) => ({ ...d, [name]: value }));
    setSaved(false);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await onSubmit(data);
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" style={{ maxWidth: "640px" }}>
      {fields.map((field) => (
        <FieldRenderer
          key={field.name}
          field={field}
          value={data[field.name]}
          onChange={(v) => setField(field.name, v)}
        />
      ))}

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="text-[13px] font-medium px-6 py-2.5 rounded-sm text-white transition-colors disabled:opacity-60"
          style={{ backgroundColor: "var(--flaz-teal)" }}
        >
          {saving ? "Saving…" : submitLabel}
        </button>
        {saved && <span className="text-[12px] text-green-700">Saved</span>}
        {error && <span className="text-[12px] text-red-600">{error}</span>}
      </div>
    </form>
  );
}

export function FieldRenderer({
  field,
  value,
  onChange,
}: {
  field: FieldSchema;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  if (field.type === "list") {
    if (field.itemKind === "object") {
      return (
        <ObjectListEditor
          field={field}
          items={(value as Data[]) ?? []}
          onChange={onChange as (v: Data[]) => void}
        />
      );
    }
    return (
      <PrimitiveListEditor
        field={field}
        items={(value as string[]) ?? []}
        onChange={onChange as (v: string[]) => void}
      />
    );
  }

  if (field.type === "string") {
    return (
      <label className="flex flex-col gap-1.5">
        <span className="text-[12px] font-medium text-[var(--flaz-dark)]">{field.label}</span>
        <input
          type="text"
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="border rounded-sm px-3 py-2 text-[14px]"
          style={inputStyle}
        />
      </label>
    );
  }

  if (field.type === "textarea") {
    return (
      <label className="flex flex-col gap-1.5">
        <span className="text-[12px] font-medium text-[var(--flaz-dark)]">{field.label}</span>
        <textarea
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="border rounded-sm px-3 py-2 text-[14px]"
          style={inputStyle}
        />
      </label>
    );
  }

  if (field.type === "image") {
    return (
      <ImageUploadField label={field.label} value={(value as string) ?? ""} onChange={onChange} />
    );
  }

  return null;
}

function ObjectListEditor({
  field,
  items,
  onChange,
}: {
  field: ObjectListField;
  items: Data[];
  onChange: (v: Data[]) => void;
}) {
  function updateItem(index: number, patch: Data) {
    onChange(items.map((it, i) => (i === index ? { ...it, ...patch } : it)));
  }
  function removeItem(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }
  function addItem() {
    const blank = Object.fromEntries(field.fields.map((f) => [f.name, ""]));
    onChange([...items, blank]);
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-[12px] font-medium text-[var(--flaz-dark)]">{field.label}</span>
      <SortableList
        items={items}
        getId={(_, i) => String(i)}
        onReorder={onChange}
        renderItem={(item, index, dragHandle) => (
          <div className="border rounded-sm p-4" style={{ borderColor: "rgba(44,44,44,0.12)" }}>
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                {...dragHandle.attributes}
                {...dragHandle.listeners}
                className="cursor-grab text-[13px] font-medium text-gray-500 flex items-center gap-2"
                aria-label="Drag to reorder"
              >
                <span aria-hidden="true">⠿</span>
                {String(item[field.previewField] ?? "") || `Item ${index + 1}`}
              </button>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="text-[11px] font-medium text-red-600"
              >
                Remove
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {field.fields.map((sub) => (
                <FieldRenderer
                  key={sub.name}
                  field={sub}
                  value={item[sub.name]}
                  onChange={(v) => updateItem(index, { [sub.name]: v })}
                />
              ))}
            </div>
          </div>
        )}
      />
      <button
        type="button"
        onClick={addItem}
        className="self-start text-[12px] font-medium"
        style={{ color: "var(--flaz-teal)" }}
      >
        + Add
      </button>
    </div>
  );
}

function PrimitiveListEditor({
  field,
  items,
  onChange,
}: {
  field: PrimitiveListField;
  items: string[];
  onChange: (v: string[]) => void;
}) {
  function updateItem(index: number, v: string) {
    onChange(items.map((it, i) => (i === index ? v : it)));
  }
  function removeItem(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }
  function addItem() {
    onChange([...items, ""]);
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-[12px] font-medium text-[var(--flaz-dark)]">{field.label}</span>
      <SortableList
        items={items}
        getId={(_, i) => String(i)}
        onReorder={onChange}
        renderItem={(item, index, dragHandle) => (
          <div className="flex items-center gap-2">
            <span
              {...dragHandle.attributes}
              {...dragHandle.listeners}
              className="cursor-grab text-gray-400"
              aria-label="Drag to reorder"
            >
              ⠿
            </span>
            {field.itemKind === "image" ? (
              <div className="flex-1">
                <ImageUploadField label="" value={item} onChange={(v) => updateItem(index, v)} />
              </div>
            ) : (
              <input
                type="text"
                value={item}
                onChange={(e) => updateItem(index, e.target.value)}
                className="flex-1 border rounded-sm px-3 py-2 text-[14px]"
                style={inputStyle}
              />
            )}
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="text-[11px] font-medium text-red-600"
            >
              Remove
            </button>
          </div>
        )}
      />
      <button
        type="button"
        onClick={addItem}
        className="self-start text-[12px] font-medium"
        style={{ color: "var(--flaz-teal)" }}
      >
        + Add
      </button>
    </div>
  );
}
