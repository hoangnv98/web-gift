"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowUpDown, Check, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category, Material, Product, Tag } from "@/lib/cms";
import { ALL_GROUP, inCategory, priceTiers, sortOptions, type SortId } from "@/lib/catalogue";
import { CatalogueItem } from "./catalogue-item";
import { AgeGate } from "@/components/layout/age-gate";
import { Button } from "@/components/ui/button";

export interface CatalogueViewProps { products: Product[]; categories: Category[]; materials: Material[]; tags: Tag[]; brand?: string }

interface Option { value: string; label: string }
interface FilterGroup { key: "nhom" | "chat-lieu" | "gia"; label: string; options: Option[]; value: string | null; allValue?: string; tone: "gold" | "grey" }

/** Tham số URL: nhom, chat-lieu, gia, sap-xep, tag, q */
export function CatalogueView({ products, categories, materials, tags, brand }: CatalogueViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const groups = useMemo(() => [ALL_GROUP, ...categories], [categories]);

  const f = {
    nhom: sp.get("nhom") || ALL_GROUP.slug,
    chatLieu: sp.get("chat-lieu"),
    gia: sp.get("gia"),
    sapXep: (sp.get("sap-xep") as SortId) || "mac-dinh",
    tag: sp.get("tag"),
    q: sp.get("q") || "",
  };

  const update = useCallback(
    (patch: Record<string, string | null>) => {
      const next = new URLSearchParams(sp.toString());
      for (const [k, v] of Object.entries(patch)) {
        if (!v || v === ALL_GROUP.slug || v === "mac-dinh") next.delete(k);
        else next.set(k, v);
      }
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname, sp],
  );

  // Sheet bộ lọc (mobile) mở/đóng theo URL ?bo-loc=1: nút Back của điện thoại sẽ đóng sheet
  const sheetOpen = sp.get("bo-loc") === "1";
  const setSheetOpen = (open: boolean) => update({ "bo-loc": open ? "1" : null });

  const results = useMemo(() => {
    const group = groups.find((g) => g.slug === f.nhom) ?? ALL_GROUP;
    const tier = priceTiers.find((t) => t.id === f.gia);
    const q = f.q.trim().toLowerCase();
    let list = products.filter((p) => {
      if (!inCategory(p, group)) return false;
      if (f.chatLieu && p.material.slug !== f.chatLieu) return false;
      if (f.tag && !p.tags.includes(f.tag)) return false;
      if (tier && (p.price < tier.min || (tier.max !== null && p.price >= tier.max))) return false;
      if (q && !(p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q) || p.items.some((i) => i.toLowerCase().includes(q)))) return false;
      return true;
    });
    if (f.sapXep === "gia-tang") list = [...list].sort((a, b) => a.price - b.price);
    if (f.sapXep === "gia-giam") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [products, groups, f.nhom, f.chatLieu, f.gia, f.sapXep, f.tag, f.q]);

  const activeCount = [f.nhom !== ALL_GROUP.slug, f.chatLieu, f.gia, f.tag, f.q].filter(Boolean).length;
  const tagInfo = tags.find((t) => t.slug === f.tag);
  const clear = () => update({ nhom: null, "chat-lieu": null, gia: null, tag: null, q: null });

  /** Ba nhóm lọc dùng chung cho desktop (hàng pill) và mobile (bottom sheet). */
  const filterGroups: FilterGroup[] = [
    { key: "nhom", label: "Dịp tặng", tone: "gold", value: f.nhom === ALL_GROUP.slug ? null : f.nhom, allValue: ALL_GROUP.slug, options: groups.filter((g) => g.slug !== ALL_GROUP.slug).map((g) => ({ value: g.slug, label: g.label })) },
    { key: "chat-lieu", label: "Chất liệu & kiểu dáng", tone: "grey", value: f.chatLieu, options: materials.map((m) => ({ value: m.slug, label: m.label })) },
    { key: "gia", label: "Khoảng giá", tone: "grey", value: f.gia, options: priceTiers.map((t) => ({ value: t.id, label: t.label })) },
  ];
  const toggle = (g: FilterGroup, value: string | null) => update({ [g.key]: value === g.value ? null : value });

  /** Chip đang chọn (mobile) */
  const activeChips: { label: string; onRemove: () => void }[] = [
    ...filterGroups.flatMap((g) => {
      const opt = g.options.find((o) => o.value === g.value);
      return opt ? [{ label: opt.label, onRemove: () => update({ [g.key]: null }) }] : [];
    }),
    ...(tagInfo ? [{ label: tagInfo.label, onRemove: () => update({ tag: null }) }] : []),
    ...(f.q ? [{ label: `“${f.q}”`, onRemove: () => update({ q: null }) }] : []),
  ];

  return (
    <div>
      <AgeGate active={!!tagInfo?.ageGate} brand={brand} />

      {/* ===== Mobile: nút Bộ lọc + Sắp xếp, chip đang chọn, bottom sheet ===== */}
      <div className="sm:hidden">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-ink-900 text-sm font-bold text-cream-50 shadow-sm active:scale-[0.98]"
            aria-haspopup="dialog"
            aria-expanded={sheetOpen}
          >
            <SlidersHorizontal className="size-4" /> Bộ lọc
            {activeCount > 0 && <span className="grid min-w-5 place-items-center rounded-full bg-sun-500 px-1.5 text-[11px] leading-5 text-white">{activeCount}</span>}
          </button>
          <label className="relative flex h-12 flex-1 items-center rounded-full bg-white ring-1 ring-tet-200">
            <ArrowUpDown className="pointer-events-none absolute left-4 size-4 text-ink-500" />
            <select
              value={f.sapXep}
              onChange={(e) => update({ "sap-xep": e.target.value })}
              aria-label="Sắp xếp"
              className="h-full w-full appearance-none bg-transparent pl-10 pr-9 text-sm font-bold text-ink-900 focus:outline-none"
            >
              {sortOptions.map((s) => <option key={s.id} value={s.id}>{{ "mac-dinh": "Mặc định", "gia-tang": "Giá tăng dần", "gia-giam": "Giá giảm dần" }[s.id]}</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 size-4 text-ink-500" />
          </label>
        </div>

        {activeChips.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {activeChips.map((c) => (
              <button key={c.label} type="button" onClick={c.onRemove} className="inline-flex h-8 items-center gap-1.5 rounded-full bg-tet-100 pl-3 pr-2 text-xs font-bold text-tet-red ring-1 ring-tet-200">
                {c.label} <X className="size-3.5" />
              </button>
            ))}
            <button type="button" onClick={clear} className="h-8 px-2 text-xs font-bold text-ink-500 underline-offset-2 hover:underline">Xoá tất cả</button>
          </div>
        )}

        <FilterSheet open={sheetOpen} onClose={() => setSheetOpen(false)} groups={filterGroups} onToggle={toggle} onClear={clear} count={results.length} activeCount={activeCount} />
      </div>

      {/* ===== Desktop / tablet: hàng pill như cũ ===== */}
      <div className="hidden sm:block">
        {filterGroups.map((g) => (
          <PillRow key={g.key} label={g.label}>
            <Pill tone={g.tone} active={!g.value} onClick={() => update({ [g.key]: null })}>Tất cả</Pill>
            {g.options.map((o) => (
              <Pill key={o.value} tone={g.tone} active={g.value === o.value} onClick={() => toggle(g, o.value)}>{o.label}</Pill>
            ))}
          </PillRow>
        ))}
        <PillRow label="Sắp xếp">
          {sortOptions.map((s) => (
            <Pill key={s.id} tone="navy" active={f.sapXep === s.id} onClick={() => update({ "sap-xep": s.id })}>{s.label}</Pill>
          ))}
        </PillRow>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-tet-200 pt-4 sm:mt-6">
        <p className="text-sm font-medium text-ink-500">
          <span className="font-bold text-tet-red">{results.length}</span> set quà
          {f.q && <> cho từ khoá “<span className="font-bold text-ink-900">{f.q}</span>”</>}
          {tagInfo && <> · <span className="font-bold text-tet-red">{tagInfo.label}</span></>}
        </p>
        {activeCount > 0 && (
          <button type="button" onClick={clear} className="hidden items-center gap-1.5 text-sm font-bold text-tet-red hover:underline sm:inline-flex">
            <X className="size-4" /> Xoá bộ lọc ({activeCount})
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
          {results.map((p, i) => <CatalogueItem key={p.slug} product={p} priority={i < 2} brand={brand} />)}
        </div>
      ) : (
        <div className="mt-6 rounded-3xl border border-dashed border-tet-200 bg-white p-12 text-center">
          <p className="font-cat-serif text-2xl uppercase tracking-wide text-tet-red">Chưa có set quà phù hợp</p>
          <p className="mt-2 text-sm text-ink-500">Thử nới khoảng giá, chọn chất liệu khác hoặc liên hệ để được thiết kế riêng.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="outline" size="sm" onClick={clear}>Xoá bộ lọc</Button>
            <Button variant="gold" size="sm" href="/lien-he">Nhận tư vấn</Button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------- Mobile bottom sheet --------------------------- */

function FilterSheet({ open, onClose, groups, onToggle, onClear, count, activeCount }: { open: boolean; onClose: () => void; groups: FilterGroup[]; onToggle: (g: FilterGroup, v: string | null) => void; onClear: () => void; count: number; activeCount: number }) {
  // Khoá cuộn nền + đóng bằng phím Esc khi sheet mở
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open, onClose]);

  return (
    <div className={cn("fixed inset-0 z-[60] sm:hidden", open ? "pointer-events-auto" : "pointer-events-none")} aria-hidden={!open}>
      <div onClick={onClose} className={cn("absolute inset-0 bg-ink-950/50 backdrop-blur-[2px] transition-opacity duration-300", open ? "opacity-100" : "opacity-0")} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Bộ lọc sản phẩm"
        className={cn("absolute inset-x-0 bottom-0 flex max-h-[88dvh] flex-col rounded-t-[1.75rem] bg-white shadow-[0_-20px_60px_-20px_rgb(0_0_0/0.4)] transition-transform duration-400 ease-out-expo", open ? "translate-y-0" : "translate-y-full")}
      >
        <div className="mx-auto mt-2.5 h-1.5 w-10 shrink-0 rounded-full bg-tet-200" />
        <div className="flex shrink-0 items-center justify-between px-5 pb-3 pt-3">
          <p className="font-cat-serif text-xl uppercase tracking-wide text-tet-red">Bộ lọc</p>
          <button type="button" onClick={onClose} className="grid size-9 place-items-center rounded-full bg-tet-50 text-ink-700 hover:bg-tet-100" aria-label="Đóng"><X className="size-4" /></button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5">
          {groups.map((g, i) => <FilterSection key={g.key} group={g} defaultOpen={i === 0 || !!g.value} onToggle={onToggle} />)}
        </div>

        <div className="flex shrink-0 gap-3 border-t border-tet-200 bg-white px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4">
          <button type="button" onClick={onClear} disabled={activeCount === 0} className="h-12 rounded-full px-5 text-sm font-bold text-ink-700 ring-1 ring-tet-200 disabled:opacity-40">Xoá tất cả</button>
          <button type="button" onClick={onClose} className="h-12 flex-1 rounded-full bg-tet-red text-sm font-bold text-white shadow-sm active:scale-[0.98]">Xem {count} set quà</button>
        </div>
      </div>
    </div>
  );
}

/** Mục xổ xuống (accordion) trong sheet: tiêu đề + giá trị đang chọn, mở ra là danh sách pill xuống dòng. */
function FilterSection({ group, defaultOpen, onToggle }: { group: FilterGroup; defaultOpen: boolean; onToggle: (g: FilterGroup, v: string | null) => void }) {
  const [open, setOpen] = useState(defaultOpen);
  const current = group.options.find((o) => o.value === group.value);
  return (
    <div className="border-b border-tet-200 last:border-b-0">
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="flex w-full items-center justify-between gap-3 py-4 text-left">
        <span>
          <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-ink-400">{group.label}</span>
          <span className={cn("mt-0.5 block text-sm font-bold", current ? "text-tet-red" : "text-ink-900")}>{current?.label ?? "Tất cả"}</span>
        </span>
        <ChevronDown className={cn("size-5 shrink-0 text-ink-500 transition-transform duration-300", open && "rotate-180")} />
      </button>
      <div className={cn("grid transition-[grid-template-rows] duration-300 ease-out-expo", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
        <div className="min-h-0 overflow-hidden">
          <div className="flex flex-wrap gap-2 pb-4">
            <SheetPill active={!group.value} onClick={() => onToggle(group, null)}>Tất cả</SheetPill>
            {group.options.map((o) => (
              <SheetPill key={o.value} active={group.value === o.value} onClick={() => onToggle(group, o.value)}>{o.label}</SheetPill>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SheetPill({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={active} className={cn("inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-[13px] font-bold transition-colors", active ? "bg-tet-red text-white" : "bg-white text-ink-700 ring-1 ring-tet-200 active:bg-tet-100")}>
      {active && <Check className="size-3.5" />}{children}
    </button>
  );
}

/* --------------------------- Desktop pill rows --------------------------- */

function PillRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-start">
      <p className="w-36 shrink-0 pt-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-ink-400">{label}</p>
      <div className="flex flex-wrap gap-2 pb-1">{children}</div>
    </div>
  );
}

function Pill({ children, active, onClick, tone = "grey" }: { children: React.ReactNode; active: boolean; onClick: () => void; tone?: "gold" | "grey" | "navy" }) {
  const styles = {
    gold: active ? "bg-sun-500 text-white shadow-sm" : "bg-white text-ink-700 ring-1 ring-tet-200 hover:bg-tet-100",
    grey: active ? "bg-ink-900 text-cream-50" : "bg-white text-ink-700 ring-1 ring-tet-200 hover:bg-tet-100",
    navy: active ? "bg-tet-red text-white" : "bg-white text-ink-700 ring-1 ring-tet-200 hover:bg-tet-100",
  }[tone];
  return (
    <button type="button" onClick={onClick} aria-pressed={active} className={cn("h-10 shrink-0 rounded-full px-4 text-[13px] font-bold transition-all duration-300", styles)}>
      {children}
    </button>
  );
}
