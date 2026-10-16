"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Maximize2 } from "lucide-react";
import { cn, formatPrice, discountPercent } from "@/lib/utils";
import type { Product } from "@/lib/cms";
import { Badge } from "@/components/ui/badge";
import { BlossomIcon } from "@/components/ui/logo";
import { Lightbox } from "./lightbox";
import { AddToCartButton, WishlistButton } from "./product-actions";

/** Ô sản phẩm dạng "trang tạp chí" trên /catalogue – mở sẵn toàn bộ thông tin. */
export function CatalogueItem({ product, priority = false }: { product: Product; priority?: boolean }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const discount = discountPercent(product.price, product.originalPrice);

  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-navy-900/5 transition-shadow duration-500 hover:shadow-card-hover">
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-cream-200 bg-cream-50 px-5 py-4">
        <h2 className="font-display text-lg font-bold uppercase leading-snug tracking-wide text-ruby-700 sm:text-xl">
          <Link href={`/catalogue/${product.slug}`} className="hover:text-navy-900">{product.name} <span className="text-gold-700">{product.code}</span></Link>
        </h2>
        {product.badge && <Badge kind={product.badge} />}
      </header>

      <div className="grid gap-5 p-5 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div>
          <div className="group relative aspect-square overflow-hidden rounded-2xl bg-cream-100 ring-1 ring-navy-900/5">
            {product.images.map((im, i) => (
              <Image key={im.card + i} src={im.card} alt={i === 0 ? product.name : `${product.name} – ảnh ${i + 1}`} fill priority={priority && i === 0} sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw" className={cn("object-cover transition-opacity duration-500", i === active ? "opacity-100" : "opacity-0")} />
            ))}
            <button type="button" onClick={() => setLightbox(active)} className="absolute inset-0" aria-label="Phóng to ảnh" />
            <span className="pointer-events-none absolute bottom-3 right-3 grid size-9 place-items-center rounded-full bg-white/90 text-navy-900 opacity-0 shadow transition-opacity group-hover:opacity-100"><Maximize2 className="size-4" /></span>
            {discount > 0 && <span className="absolute left-3 top-3 rounded-full bg-ruby-700 px-2.5 py-1 text-xs font-bold text-white">−{discount}%</span>}
            <WishlistButton slug={product.slug} iconOnly className="absolute right-3 top-3" />
          </div>
          {product.images.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {product.images.map((im, i) => (
                <button key={im.thumb + i} type="button" onClick={() => setActive(i)} onDoubleClick={() => setLightbox(i)} aria-label={`Xem ảnh ${i + 1}`} className={cn("relative aspect-square overflow-hidden rounded-xl ring-2 transition-all", i === active ? "ring-gold-500 shadow-gold" : "ring-transparent opacity-75 hover:opacity-100")}>
                  <Image src={im.thumb} alt="" fill sizes="120px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">{product.material.label}</p>
          <ul className="mt-3 space-y-2">
            {product.items.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[15px] leading-snug text-ink-800">
                <BlossomIcon className="mt-0.5 size-4 shrink-0 text-ruby-700" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-end">
            <span className="rounded-md border border-ruby-700 bg-ruby-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-ruby-700">Mã sản phẩm: {product.code}</span>
          </div>

          <div className="mt-4 flex flex-wrap items-end justify-between gap-x-4 gap-y-2 rounded-2xl bg-gold-gradient px-5 py-3 ring-1 ring-gold-700/30">
            <div className="text-navy-900/70">
              {product.originalPrice ? (
                <>
                  <p className="text-[11px] font-semibold uppercase tracking-wider">Giá gốc</p>
                  <p className="text-base font-semibold line-through">{formatPrice(product.originalPrice)}</p>
                </>
              ) : <p className="text-sm font-semibold">Giá niêm yết</p>}
            </div>
            <div className="text-right">
              <p className="font-display text-[1.75rem] font-bold leading-none text-ruby-700 whitespace-nowrap">{formatPrice(product.price)}</p>
              <p className="mt-1 whitespace-nowrap text-[11px] font-medium text-navy-900/70">Giá trên chưa bao gồm VAT</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <AddToCartButton slug={product.slug} className="flex-1" />
            <Link href={`/catalogue/${product.slug}`} className="inline-flex h-11 items-center rounded-full border border-navy-900 px-5 text-sm font-semibold text-navy-900 hover:bg-navy-900 hover:text-cream-50">Chi tiết</Link>
          </div>
        </div>
      </div>

      {lightbox !== null && <Lightbox images={product.images} index={lightbox} alt={product.name} onClose={() => setLightbox(null)} onChange={setLightbox} />}
    </article>
  );
}
