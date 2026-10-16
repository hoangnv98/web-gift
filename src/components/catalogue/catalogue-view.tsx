"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Check, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  categories,
  materials,
  priceTiers,
  products,
  sortOptions,
  type CategoryId,
  type MaterialId,
  type SortId,
} from "@/data/catalogue";
import { ProductCard } from "./product-card";
import { Button } from "@/components/ui/button";

type Filters = {
  category: CategoryId | null;
  material: MaterialId | null;
  price: string | null;
  sort: SortId;
};

export function CatalogueView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [drawer, setDrawer] = useState(false);

  const filters: Filters = {
    category: (searchParams.get("category") as CategoryId) || null,
    material: (searchParams.get("material") as MaterialId) || null,
    price: searchParams.get("price"),
    sort: (searchParams.get("sort") as SortId) || "featured",
  };

  const update = useCallback(
    (patch: Partial<Record<keyof Filters, string | null>>) => {
      const next = new URLSearchParams(searchParams.toString());
      for (const [k, v] of Object.entries(patch)) {
        if (v === null || v === "" || (k === "sort" && v === "featured")) next.delete(k);
        else next.set(k, v);
      }
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  const results = useMemo(() => {
    const tier = priceTiers.find((t) => t.id === filters.price);
    let list = products.filter((p) => {
      if (filters.category && p.category !== filters.category) return false;
      if (filters.material && p.material !== filters.material) return false;
      if (tier) {
        if (p.price < tier.min) return false;
        if (tier.max !== null && p.price >= tier.max) return false;
      }
      return true;
    });
    if (filters.sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (filters.sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (filters.sort === "featured") list = [...list].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    return list;
  }, [filters.category, filters.material, filters.price, filters.sort]);

  const activeCount = [filters.category, filters.material, filters.price].filter(Boolean).length;
  const clearAll = () => update({ category: null, material: null, price: null });

  const sidebar = (
    <div className="space-y-8">
      <FilterGroup title="Chất liệu">
        <Option label="Tất cả" active={!filters.material} onClick={() => update({ material: null })} />
        {materials.map((m) => (
          <Option key={m.id} label={m.name} active={filters.material === m.id} onClick={() => update({ material: filters.material === m.id ? null : m.id })} />
        ))}
      </FilterGroup>
      <FilterGroup title="Khoảng giá">
        <Option label="Tất cả" active={!filters.price} onClick={() => update({ price: null })} />
        {priceTiers.map((t) => (
          <Option key={t.id} label={t.label} active={filters.price === t.id} onClick={() => update({ price: filters.price === t.id ? null : t.id })} />
        ))}
      </FilterGroup>
      {activeCount > 0 && (
        <button type="button" onClick={clearAll} className="inline-flex items-center gap-1.5 text-sm font-semibold text-crimson-700 hover:underline">
          <X className="size-4" /> Xoá bộ lọc ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <div>
      {/* Category tabs */}
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
        <Tab label="Tất cả" active={!filters.category} onClick={() => update({ category: null })} />
        {categories.map((c) => (
          <Tab key={c.id} label={c.name} active={filters.category === c.id} onClick={() => update({ category: c.id })} />
        ))}
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-32">{sidebar}</div>
        </aside>

        <div>
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-3 border-b border-cream-300 pb-4">
            <p className="text-sm text-ink-500">
              <span className="font-semibold text-ink-900">{results.length}</span> sản phẩm
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setDrawer(true)}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-cream-300 bg-white px-4 text-sm font-medium text-ink-800 lg:hidden"
              >
                <SlidersHorizontal className="size-4" /> Bộ lọc
                {activeCount > 0 && <span className="grid size-5 place-items-center rounded-full bg-crimson-700 text-[11px] font-bold text-white">{activeCount}</span>}
              </button>
              <label className="relative">
                <span className="sr-only">Sắp xếp</span>
                <select
                  value={filters.sort}
                  onChange={(e) => update({ sort: e.target.value })}
                  className="h-10 appearance-none rounded-full border border-cream-300 bg-white pl-4 pr-9 text-sm font-medium text-ink-800 focus:outline-none focus:ring-2 focus:ring-gold-400"
                >
                  {sortOptions.map((o) => (
                    <option key={o.id} value={o.id}>{o.label}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-ink-400" />
              </label>
            </div>
          </div>

          {/* Grid */}
          {results.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((p, i) => (
                <ProductCard key={p.slug} product={p} priority={i < 3} />
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-3xl border border-dashed border-cream-400 bg-cream-100 p-12 text-center">
              <p className="font-display text-2xl text-ink-900">Chưa có sản phẩm phù hợp</p>
              <p className="mt-2 text-sm text-ink-500">Thử nới khoảng giá hoặc chọn chất liệu khác.</p>
              <Button variant="outline" size="sm" className="mt-6" onClick={clearAll}>Xoá bộ lọc</Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={cn("fixed inset-0 z-[60] lg:hidden", drawer ? "pointer-events-auto" : "pointer-events-none")} aria-hidden={!drawer}>
        <div onClick={() => setDrawer(false)} className={cn("absolute inset-0 bg-ink-900/50 transition-opacity duration-300", drawer ? "opacity-100" : "opacity-0")} />
        <div className={cn("absolute inset-y-0 right-0 w-[85%] max-w-sm overflow-y-auto bg-cream-50 p-6 shadow-2xl transition-transform duration-400 ease-out-expo", drawer ? "translate-x-0" : "translate-x-full")}>
          <div className="mb-6 flex items-center justify-between">
            <p className="font-display text-xl font-semibold">Bộ lọc</p>
            <button type="button" onClick={() => setDrawer(false)} className="grid size-9 place-items-center rounded-full hover:bg-cream-200" aria-label="Đóng">
              <X className="size-5" />
            </button>
          </div>
          {sidebar}
          <Button className="mt-8 w-full" onClick={() => setDrawer(false)}>Xem {results.length} sản phẩm</Button>
        </div>
      </div>
    </div>
  );
}

function Tab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-11 shrink-0 rounded-full px-6 text-sm font-semibold transition-all duration-300",
        active ? "bg-crimson-700 text-cream-50 shadow-[0_8px_20px_-10px_rgb(136_25_23/0.7)]" : "bg-white text-ink-700 ring-1 ring-cream-300 hover:ring-gold-400",
      )}
    >
      {label}
    </button>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">{title}</h3>
      <ul className="mt-3 space-y-1">{children}</ul>
    </div>
  );
}

function Option({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors",
          active ? "bg-crimson-50 font-semibold text-crimson-700" : "text-ink-700 hover:bg-cream-200",
        )}
      >
        <span className={cn("grid size-4 place-items-center rounded-[5px] border transition-colors", active ? "border-crimson-700 bg-crimson-700 text-white" : "border-ink-200 bg-white")}>
          {active && <Check className="size-3" strokeWidth={3} />}
        </span>
        {label}
      </button>
    </li>
  );
}
