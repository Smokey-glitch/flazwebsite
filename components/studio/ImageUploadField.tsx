"use client";

import { useRef, useState } from "react";
import Image from "next/image";

async function compressImage(file: File, maxDim = 1600, quality = 0.8): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Compression failed"))),
      "image/webp",
      quality
    );
  });
}

export function ImageUploadField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (path: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    setPreviewUrl(URL.createObjectURL(file));
    try {
      const blob = await compressImage(file);
      const form = new FormData();
      form.append("file", blob, file.name.replace(/\.[^.]+$/, ".webp"));
      const res = await fetch("/api/studio/upload", { method: "POST", body: form });
      if (!res.ok) throw new Error("Upload failed");
      const { path } = await res.json();
      onChange(path);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {label && <span className="text-[12px] font-medium text-[var(--flaz-dark)]">{label}</span>}
      <div className="flex items-center gap-3">
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- freshly uploaded blob, not yet a real deployed asset next/image can optimize
          <img
            src={previewUrl}
            alt=""
            className="w-20 h-20 rounded-sm object-cover border"
            style={{ borderColor: "rgba(44,44,44,0.15)" }}
          />
        ) : value ? (
          <div
            className="relative w-20 h-20 rounded-sm overflow-hidden border"
            style={{ borderColor: "rgba(44,44,44,0.15)" }}
          >
            <Image src={value} alt="" fill className="object-cover" />
          </div>
        ) : (
          <div
            className="w-20 h-20 rounded-sm border border-dashed flex items-center justify-center text-[11px] text-gray-400"
            style={{ borderColor: "rgba(44,44,44,0.2)" }}
          >
            No photo
          </div>
        )}
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="text-[12px] font-medium px-3 py-1.5 rounded-sm border transition-colors"
            style={{ borderColor: "var(--flaz-teal)", color: "var(--flaz-teal)" }}
          >
            {uploading ? "Uploading…" : value || previewUrl ? "Replace" : "Upload"}
          </button>
          {error && <p className="text-[11px] text-red-600">{error}</p>}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
