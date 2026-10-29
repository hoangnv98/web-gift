"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/cms";
import { badgeLabel, catalogueColumns, catalogueLabel, formatVnd, shortProductName } from "@/lib/catalogue";
import { Lightbox } from "./lightbox";
import { AddToCartButton, WishlistButton } from "./product-actions";

/**
 * Ô sản phẩm trên /catalogue theo mẫu catalogue in: ảnh lớn + 3 ảnh phụ, bên dưới là dải
 * thông tin gồm nhãn vàng · tên set (Bodoni đỏ) · giá kèm ô VND/SET · bảng thành phần 2 cột.
 * Dùng container query: ô rộng ≥ 48rem thì dải thông tin xếp 3 cột ngang như bản in,
 * hẹp hơn thì khối giá nằm trên, bảng thành phần ở dưới. Tên set giữ chỗ cố định 2 dòng (min-h-[4rem])
 * để khối giá của các ô cùng hàng luôn thẳng nhau dù tên dài hay ngắn.
 */
export function CatalogueItem({ product, priority = false, brand }: { product: Product; priority?: boolean; brand?: string }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const images = product.images;
  const main = images[active] ?? images[0];
  const thumbs = images.map((im, i) => ({ im, i })).filter(({ i }) => i !== active).slice(0, 3);
  const [left, right] = catalogueColumns(product.items);
  const name = shortProductName(product.name, brand);

  return (
    <article className="@container flex h-full flex-col rounded-3xl bg-tet-50 p-4 font-cat-sans text-ink-900 ring-1 ring-tet-200 transition-shadow duration-500 hover:shadow-card-hover sm:p-5">
      {/* Ảnh: chính + 3 phụ */}
      <div className="grid gap-3 @lg:grid-cols-[minmax(0,1fr)_minmax(0,27%)]">
        <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-tet-100 @lg:aspect-auto @lg:h-full @lg:min-h-[18rem]">
          {main && (
            <Image src={main.src} alt={main.alt || product.name} fill priority={priority} sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
          )}
          <button type="button" onClick={() => setLightbox(active)} className="absolute inset-0" aria-label="Phóng to ảnh" />
          <span className="pointer-events-none absolute bottom-3 right-3 grid size-9 place-items-center rounded-full bg-white/90 text-ink-900 opacity-0 shadow transition-opacity group-hover:opacity-100"><Maximize2 className="size-4" /></span>
          <span className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-ink-700">Mã SP · {product.code}</span>
          {product.badge && <span className="absolute bottom-3 left-3 rounded-full bg-tet-red px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-white">{badgeLabel[product.badge]}</span>}
          <WishlistButton slug={product.slug} iconOnly className="absolute right-3 top-3" />
        </div>
        {thumbs.length > 0 && (
          <div className="grid grid-cols-3 gap-3 @lg:grid-cols-1 @lg:grid-rows-3">
            {thumbs.map(({ im, i }) => (
              <button key={im.thumb + i} type="button" onClick={() => setActive(i)} onDoubleClick={() => setLightbox(i)} aria-label={`Xem ảnh ${i + 1}`} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-tet-100 ring-2 ring-transparent transition-all hover:ring-sun-500 @lg:aspect-auto">
                <Image src={im.thumb} alt="" fill sizes="(min-width: 1024px) 12vw, 33vw" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Dải thông tin theo mẫu in */}
      <div className="mt-5 grid gap-x-8 gap-y-5 @3xl:grid-cols-[17rem_minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <span className="inline-block rounded-sm bg-sun-500 px-3 py-1.5 text-[11px] font-bold uppercase leading-none tracking-[0.08em] text-white">{catalogueLabel(product)}</span>
          <h2 className={cn(name.length > 18 ? "text-[1.6rem]" : "text-[1.9rem]", "mt-3 min-h-[4rem] font-cat-serif font-[450] uppercase leading-[1.05] tracking-[0.05em] text-tet-red")} style={{ fontVariationSettings: '"opsz" 96' }}>
            <Link href={`/catalogue/${product.slug}`} className="hover:text-tet-red-dark">{name}</Link>
          </h2>
          <div className="mt-3 flex items-end justify-between gap-3 border-t border-tet-200 pt-3">
            <div className="min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink-400">
                Giá bán{product.originalPrice ? <s className="ml-1.5 normal-case tracking-normal">{formatVnd(product.originalPrice)}</s> : null}
              </p>
              <p className="mt-0.5 whitespace-nowrap text-[2rem] font-bold leading-none text-tet-red">{formatVnd(product.price)}</p>
            </div>
            <div className="flex shrink-0 flex-col gap-1 text-center text-[13px] font-bold leading-none tracking-[0.04em] text-white">
              <span className="rounded-sm bg-tet-red px-3 py-1.5">VND</span>
              <span className="rounded-sm bg-tet-red-dark px-3 py-1.5">SET</span>
            </div>
          </div>
          <p className="mt-2.5 border-t border-tet-200 pt-2.5 text-[11px] font-medium text-ink-500">*Giá bán trên chưa bao gồm VAT</p>
        </div>

        <div className="grid gap-x-8 @md:grid-cols-2 @3xl:col-span-2">
          <Rows rows={left} />
          <Rows rows={right} />
        </div>
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
        <p className="min-w-0 text-xs font-medium text-ink-500">{product.material.label}{product.tagline ? ` · ${product.tagline}` : ""}</p>
        <div className="flex gap-2">
          <AddToCartButton slug={product.slug} size="sm" />
          <Link href={`/catalogue/${product.slug}`} className="inline-flex h-10 items-center rounded-full border border-ink-900 px-4 text-[13px] font-bold text-ink-900 transition-colors hover:bg-ink-900 hover:text-cream-50">Chi tiết</Link>
        </div>
      </div>

      {lightbox !== null && <Lightbox images={images} index={lightbox} alt={product.name} onClose={() => setLightbox(null)} onChange={setLightbox} />}
    </article>
  );
}

function Rows({ rows }: { rows: { name: string; value: string }[] }) {
  if (rows.length === 0) return null;
  return (
    <div>
      {rows.map((r, i) => (
        <div key={`${r.name}-${i}`} className="flex items-baseline justify-between gap-4 border-b border-tet-200 py-2.5 text-[14px] leading-snug">
          <span className="font-bold text-ink-900">{r.name}</span>
          <span className="shrink-0 whitespace-nowrap font-semibold text-ink-500">{r.value}</span>
        </div>
      ))}
    </div>
  );
}
