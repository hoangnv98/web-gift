"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { unsplash, img } from "@/lib/images";
import { searchProducts } from "@/data/catalogue";

export function SearchBox({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const id = useId();
  const blurTimer = useRef<number | null>(null);
  const results = searchProducts(q, 6);

  const go = () => {
    const s = q.trim();
    setOpen(false);
    onNavigate?.();
    router.push(s ? `/catalogue?q=${encodeURIComponent(s)}` : "/catalogue");
  };

  return (
    <div className={cn("relative", className)}>
      <form
        role="search"
        onSubmit={(e) => { e.preventDefault(); go(); }}
        className="flex h-11 items-center overflow-hidden rounded-full bg-white ring-1 ring-white/20 focus-within:ring-2 focus-within:ring-gold-400"
      >
        <input
          id={id}
          type="search"
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onBlur={() => { blurTimer.current = window.setTimeout(() => setOpen(false), 150); }}
          placeholder="Tìm kiếm sản phẩm, mã quà (VD: TQG01)..."
          autoComplete="off"
          className="h-full flex-1 bg-transparent px-5 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          aria-label="Tìm kiếm sản phẩm"
          aria-controls={`${id}-list`}
        />
        {q && (
          <button type="button" onClick={() => setQ("")} className="grid size-8 place-items-center text-ink-400 hover:text-ink-900" aria-label="Xoá">
            <X className="size-4" />
          </button>
        )}
        <button type="submit" className="grid h-full w-12 place-items-center bg-gold-gradient text-navy-900 transition hover:brightness-105" aria-label="Tìm">
          <Search className="size-4" strokeWidth={2.5} />
        </button>
      </form>

      {open && q.trim() && (
        <div id={`${id}-list`} className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-2xl bg-white p-2 shadow-card-hover ring-1 ring-navy-900/10" onMouseDown={(e) => e.preventDefault()}>
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-ink-500">Không tìm thấy sản phẩm phù hợp.</p>
          ) : (
            <ul>
              {results.map((p) => (
                <li key={p.slug}>
                  <Link href={`/catalogue/${p.slug}`} onClick={() => { setOpen(false); onNavigate?.(); }} className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-cream-100">
                    <span className="relative size-12 shrink-0 overflow-hidden rounded-lg">
                      <Image src={unsplash(img[p.images[0]], 120, 120)} alt="" fill sizes="48px" className="object-cover" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-navy-900">{p.name}</span>
                      <span className="block text-xs text-ink-400">Mã {p.code}</span>
                    </span>
                    <span className="text-sm font-bold text-ruby-700">{formatPrice(p.price)}</span>
                  </Link>
                </li>
              ))}
              <li className="border-t border-cream-200 mt-1 pt-1">
                <button type="button" onClick={go} className="w-full rounded-xl px-4 py-2 text-left text-sm font-semibold text-gold-700 hover:bg-cream-100">
                  Xem tất cả kết quả cho “{q.trim()}” →
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
