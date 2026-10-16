"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/cms";
import { store, useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./product-card";

export function CartView({ products }: { products: Product[] }) {
  const { cart } = useStore();
  const lines = Object.entries(cart).flatMap(([slug, qty]) => {
    const product = products.find((p) => p.slug === slug);
    return product ? [{ product, qty }] : [];
  });
  const total = lines.reduce((s, l) => s + l.product.price * l.qty, 0);

  if (lines.length === 0) {
    return (
      <div className="mt-10 rounded-3xl border border-dashed border-cream-400 bg-cream-50 p-12 text-center">
        <p className="font-display text-2xl text-navy-900">Giỏ hàng đang trống</p>
        <Button href="/catalogue" variant="gold" className="mt-6">Xem catalogue</Button>
      </div>
    );
  }

  const codes = lines.map((l) => `${l.product.code} x${l.qty}`).join(", ");

  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-12">
      <ul className="divide-y divide-cream-200 rounded-3xl bg-white shadow-card ring-1 ring-navy-900/5 lg:col-span-8">
        {lines.map(({ product, qty }) => (
          <li key={product.slug} className="flex gap-4 p-4 sm:p-5">
            <Link href={`/catalogue/${product.slug}`} className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-cream-100">
              {product.images[0] && <Image src={product.images[0].thumb} alt="" fill sizes="96px" className="object-cover" />}
            </Link>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-ruby-700">{product.code}</p>
              <Link href={`/catalogue/${product.slug}`} className="block truncate font-semibold text-navy-900 hover:text-ruby-700">{product.name}</Link>
              <p className="mt-1 text-sm text-ink-500">{formatPrice(product.price)} / phần</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="inline-flex h-9 items-center rounded-full border border-cream-300">
                  <button type="button" onClick={() => store.setQty(product.slug, qty - 1)} className="grid size-9 place-items-center hover:text-ruby-700" aria-label="Giảm"><Minus className="size-4" /></button>
                  <input type="number" min={1} value={qty} onChange={(e) => store.setQty(product.slug, Math.max(1, Number(e.target.value) || 1))} className="w-12 bg-transparent text-center text-sm font-semibold focus:outline-none" aria-label="Số lượng" />
                  <button type="button" onClick={() => store.setQty(product.slug, qty + 1)} className="grid size-9 place-items-center hover:text-ruby-700" aria-label="Tăng"><Plus className="size-4" /></button>
                </div>
                <button type="button" onClick={() => store.removeFromCart(product.slug)} className="inline-flex items-center gap-1 text-xs font-semibold text-ink-400 hover:text-ruby-700"><Trash2 className="size-4" /> Xoá</button>
              </div>
            </div>
            <p className="font-display text-lg font-bold text-ruby-700">{formatPrice(product.price * qty)}</p>
          </li>
        ))}
      </ul>
      <aside className="h-fit rounded-3xl bg-navy-900 p-6 text-cream-50 lg:col-span-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">Tạm tính</p>
        <p className="mt-2 font-display text-4xl font-bold text-gold-300">{formatPrice(total)}</p>
        <p className="mt-1 text-xs text-cream-200/70">Chưa gồm VAT và chiết khấu số lượng.</p>
        <Button href={`/qua-doanh-nghiep?san-pham=${encodeURIComponent(codes)}#bao-gia`} variant="gold" size="lg" className="mt-6 w-full">Gửi yêu cầu báo giá</Button>
        <button type="button" onClick={() => store.clearCart()} className="mt-3 w-full text-center text-xs text-cream-200/60 hover:text-cream-50">Xoá toàn bộ giỏ</button>
      </aside>
    </div>
  );
}

export function WishlistView({ products }: { products: Product[] }) {
  const { wishlist } = useStore();
  const items = wishlist.flatMap((s) => products.filter((p) => p.slug === s));
  if (items.length === 0) {
    return (
      <div className="mt-10 rounded-3xl border border-dashed border-cream-400 bg-cream-50 p-12 text-center">
        <p className="font-display text-2xl text-navy-900">Chưa có sản phẩm yêu thích</p>
        <p className="mt-2 text-sm text-ink-500">Bấm biểu tượng trái tim trên sản phẩm để lưu lại.</p>
        <Button href="/catalogue" variant="gold" className="mt-6">Xem catalogue</Button>
      </div>
    );
  }
  return (
    <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((p) => <ProductCard key={p.slug} product={p} />)}
    </div>
  );
}
