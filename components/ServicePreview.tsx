"use client";

import { ImageIcon, RotateCw, X } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useId, useRef, useState } from "react";
import { CategoryIcon } from "@/components/CategoryIcon";
import { CheckIcon } from "@/components/blocks";
import type { CatalogueIcon, ServiceImage } from "@/lib/service-catalogue";

/** Everything the preview needs for one service — serialisable, so it can be passed from server components. */
export type PreviewItem = {
  id: string;
  name: string;
  description: string;
  image: ServiceImage | null;
  categoryName: string;
  categoryIcon: CatalogueIcon;
};

type OpenFn = (item: PreviewItem, opener: HTMLElement) => void;
const PreviewContext = createContext<OpenFn | null>(null);

/**
 * Wraps a group of service lists and renders ONE shared preview modal for them.
 * Built on the native <dialog> element: showModal() gives focus containment, Escape, an inert page behind it and the
 * accessibility-tree isolation of the rest of the document; closed content is display:none, so it is not focusable.
 */
export function ServicePreviewProvider({ children }: { children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const pointerStartedOnBackdrop = useRef(false);
  const [item, setItem] = useState<PreviewItem | null>(null);
  const titleId = useId();
  const descId = useId();

  const open = useCallback<OpenFn>((next, opener) => {
    openerRef.current = opener;
    setItem(next);
  }, []);

  // Open the dialog, lock the page behind it and undo both when it closes.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !item) return;
    const html = document.documentElement;
    const scrollY = window.scrollY;
    // scrollbar-gutter keeps the page width unchanged when the scrollbar disappears (no layout jump).
    html.style.overflow = "hidden";
    html.style.scrollbarGutter = "stable";
    document.body.dataset.modalOpen = ""; // hides the fixed mobile contact bar (see globals.css)
    if (!dialog.open) dialog.showModal();
    return () => {
      // State is the single source of truth: clearing `item` closes the dialog here, so a late native "close" event
      // can never wipe content that a quick re-open has already put in place.
      if (dialog.open) dialog.close();
      html.style.overflow = "";
      html.style.scrollbarGutter = "";
      delete document.body.dataset.modalOpen;
      window.scrollTo({ top: scrollY, behavior: "instant" as ScrollBehavior });
      const opener = openerRef.current;
      openerRef.current = null;
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, [item]);

  const close = () => setItem(null);

  return (
    <PreviewContext.Provider value={open}>
      {children}
      <dialog
        ref={dialogRef}
        className="flaz-preview"
        aria-labelledby={item ? titleId : undefined}
        aria-describedby={item ? descId : undefined}
        // Escape (and the Android back gesture) arrive as "cancel": handle it through state instead of letting the
        // browser close the dialog behind React's back.
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onPointerDown={(e) => {
          pointerStartedOnBackdrop.current = e.target === e.currentTarget;
        }}
        onClick={(e) => {
          // Only a press that started AND ended on the backdrop closes; clicks inside the panel never do.
          if (e.target === e.currentTarget && pointerStartedOnBackdrop.current) close();
        }}
      >
        {item && (
          <div className="flaz-preview-panel relative flex w-full flex-col rounded-sm bg-white shadow-2xl">
            <button
              type="button"
              onClick={close}
              aria-label="Close preview"
              className="absolute right-2 top-2 z-10 inline-flex h-12 w-12 items-center justify-center rounded-sm bg-white/95 text-[var(--flaz-dark)] shadow-md ring-1 ring-black/10 transition-colors hover:bg-white"
            >
              <X size={22} strokeWidth={2} aria-hidden="true" />
            </button>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              <div className="landscape-short:grid landscape-short:grid-cols-[minmax(0,58%)_minmax(0,1fr)]">
                {/* key: a new service always mounts a fresh image, so a previous image can never sit under a new title */}
                <PreviewImage key={item.id} item={item} />
                <div className="p-5 md:p-7 landscape-short:pt-14">
                  <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: "var(--flaz-teal-text)" }}>
                    {item.categoryName}
                  </p>
                  <h2 id={titleId} className="text-[20px] font-medium leading-snug text-[var(--flaz-dark)] md:text-[24px]">
                    {item.name}
                  </h2>
                  <p id={descId} className="mt-3 text-[15px] font-light leading-relaxed text-gray-700">
                    {item.description}
                  </p>
                  <p className="mt-5 text-[12px] font-light text-gray-600">
                    {item.image ? "AI-generated service illustration" : "Temporary placeholder — illustration to follow"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </PreviewContext.Provider>
  );
}

type ImageState = "loading" | "loaded" | "error";

function PreviewImage({ item }: { item: PreviewItem }) {
  const img = item.image;
  const [state, setState] = useState<ImageState>("loading");
  const [attempt, setAttempt] = useState(0);

  if (!img) {
    return (
      <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 bg-[#E3E0DA] px-6 text-center text-gray-700">
        <span
          className="inline-flex h-16 w-16 items-center justify-center rounded-sm"
          style={{ backgroundColor: "rgba(77,200,200,0.18)", color: "var(--flaz-teal-text)" }}
        >
          <CategoryIcon icon={item.categoryIcon} size={32} />
        </span>
        <p className="text-[14px] font-medium">Illustration coming soon</p>
      </div>
    );
  }

  return (
    // The box is sized from the image's own dimensions, so nothing shifts when it loads and nothing is cropped.
    <div className="relative w-full bg-[#E3E0DA]" style={{ aspectRatio: `${img.width} / ${img.height}` }}>
      {state !== "error" && (
        // Plain <img>: the assets are pre-optimised WebP at two widths, so srcSet below does the responsive work.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={attempt}
          src={img.src}
          srcSet={img.srcSet}
          sizes="(min-width: 768px) 680px, calc(100vw - 24px)"
          width={img.width}
          height={img.height}
          alt={img.alt}
          decoding="async"
          onLoad={() => setState("loaded")}
          onError={() => setState("error")}
          className={`absolute inset-0 h-full w-full object-contain motion-safe:transition-opacity ${state === "loaded" ? "opacity-100" : "opacity-0"}`}
        />
      )}
      {state === "loading" && (
        <div role="status" className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[13px] text-gray-700">
          <span aria-hidden="true" className="h-6 w-6 rounded-full border-2 border-gray-400 border-t-[var(--flaz-teal-text)] motion-safe:animate-spin" />
          Loading illustration…
        </div>
      )}
      {state === "error" && (
        <div role="alert" className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center text-[14px] text-gray-800">
          The illustration could not be loaded.
          <button
            type="button"
            onClick={() => {
              setState("loading");
              setAttempt((n) => n + 1);
            }}
            className="inline-flex min-h-[48px] items-center gap-2 rounded-sm bg-white px-5 font-medium text-[var(--flaz-dark)] ring-1 ring-black/15 hover:bg-gray-50"
          >
            <RotateCw size={16} aria-hidden="true" />
            Try again
          </button>
        </div>
      )}
    </div>
  );
}

/** One service in a list: a real button (never nested inside a link) that opens the shared preview. */
export function ServiceItemButton({ item }: { item: PreviewItem }) {
  const open = useContext(PreviewContext);
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={(e) => open?.(item, e.currentTarget)}
      className="group flex min-h-[48px] w-full items-center gap-3 rounded-sm py-3 text-left text-[14px] font-light leading-snug text-gray-700 transition-colors hover:bg-[rgba(77,200,200,0.08)] md:text-[15px]"
    >
      <CheckIcon />
      <span className="flex-1">
        {item.name}
        <span className="sr-only">, opens preview</span>
      </span>
      <ImageIcon size={16} strokeWidth={1.6} aria-hidden="true" className="shrink-0 text-gray-500 transition-colors group-hover:text-[var(--flaz-teal-text)]" />
    </button>
  );
}
