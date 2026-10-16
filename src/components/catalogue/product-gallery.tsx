"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { unsplash, img, type ImageKey } from "@/lib/images";
import { Lightbox } from "./lightbox";

export function ProductGallery({ images, alt }: { images: ImageKey[]; alt: string }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  return (
    <div className="flex flex-col gap-3 sm:flex-row-reverse">
      <div className="group relative aspect-[4/5] flex-1 overflow-hidden rounded-3xl bg-cream-100 ring-1 ring-navy-900/5">
        {images.map((key, i) => (
          <Image key={key + i} src={unsplash(img[key], 1200, 1500)} alt={i === 0 ? alt : `${alt} – ảnh ${i + 1}`} fill priority={i === 0} sizes="(min-width: 1024px) 50vw, 100vw" className={cn("object-cover transition-opacity duration-500", i === active ? "opacity-100" : "opacity-0")} />
        ))}
        <button type="button" onClick={() => setLightbox(active)} className="absolute inset-0" aria-label="Phóng to ảnh" />
        <span className="pointer-events-none absolute bottom-4 right-4 grid size-10 place-items-center rounded-full bg-white/90 text-navy-900 opacity-0 shadow transition-opacity group-hover:opacity-100"><Maximize2 className="size-4" /></span>
      </div>
      <div className="flex gap-3 sm:flex-col">
        {images.map((key, i) => (
          <button key={key + i} type="button" onClick={() => setActive(i)} aria-label={`Xem ảnh ${i + 1}`} className={cn("relative size-20 shrink-0 overflow-hidden rounded-2xl ring-2 transition-all duration-300", i === active ? "ring-gold-500 shadow-gold" : "ring-transparent opacity-70 hover:opacity-100")}>
            <Image src={unsplash(img[key], 240, 240)} alt="" fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>
      {lightbox !== null && <Lightbox images={images} index={lightbox} alt={alt} onClose={() => setLightbox(null)} onChange={setLightbox} />}
    </div>
  );
}
