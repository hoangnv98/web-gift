"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ImageRef } from "@/lib/cms";

export function Lightbox({ images, index, alt, onClose, onChange }: { images: ImageRef[]; index: number; alt: string; onClose: () => void; onChange: (i: number) => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange((index + 1) % images.length);
      if (e.key === "ArrowLeft") onChange((index - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [index, images.length, onClose, onChange]);

  const current = images[index];
  return (
    <div role="dialog" aria-modal="true" aria-label={alt} className="fixed inset-0 z-[80] flex items-center justify-center bg-navy-950/95 p-4" onClick={onClose}>
      <button type="button" onClick={onClose} className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Đóng"><X className="size-5" /></button>
      <button type="button" onClick={(e) => { e.stopPropagation(); onChange((index - 1 + images.length) % images.length); }} className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6" aria-label="Ảnh trước"><ChevronLeft className="size-6" /></button>
      <button type="button" onClick={(e) => { e.stopPropagation(); onChange((index + 1) % images.length); }} className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6" aria-label="Ảnh sau"><ChevronRight className="size-6" /></button>
      <div className="relative h-[85vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        {current && <Image src={current.src} alt={`${alt} – ảnh ${index + 1}`} fill sizes="100vw" className="object-contain" priority />}
      </div>
      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs text-white">{index + 1} / {images.length}</p>
    </div>
  );
}
