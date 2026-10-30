"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Clock, Search, TrendingUp, X } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import type { ProductLite } from "@/lib/catalogue";
import type { Navigation } from "@/lib/cms";

const RECENT_KEY = "tqgift-recent-search-v1";
const RECENT_MAX = 6;
const EMPTY: string[] = [];
let recentCache: string[] | null = null;
const recentListeners = new Set<() => void>();

function readRecent(): string[] {
  if (recentCache) return recentCache;
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    const list = raw ? (JSON.parse(raw) as unknown) : [];
    recentCache = Array.isArray(list) ? list.filter((s): s is string => typeof s === "string").slice(0, RECENT_MAX) : EMPTY;
  } catch {
    recentCache = EMPTY;
  }
  return recentCache;
}

function writeRecent(list: string[]) {
  recentCache = list.slice(0, RECENT_MAX);
  try {
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(recentCache));
  } catch {
    /* ignore */
  }
  recentListeners.forEach((l) => l());
}

function useRecentSearches() {
  return useSyncExternalStore(
    (l) => { recentListeners.add(l); return () => { recentListeners.delete(l); }; },
    readRecent,
    () => EMPTY,
  );
}

function match(products: ProductLite[], q: string, limit = 8) {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  return products.filter((p) => p.name.toLowerCase().includes(s) || p.code.toLowerCase().includes(s)).slice(0, limit);
}

/** Tô đậm phần khớp từ khoá trong tên sản phẩm. */
function Highlight({ text, q }: { text: string; q: string }) {
  const s = q.trim();
  const i = s ? text.toLowerCase().indexOf(s.toLowerCase()) : -1;
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded bg-gold-100 px-0.5 text-navy-900">{text.slice(i, i + s.length)}</mark>
      {text.slice(i + s.length)}
    </>
  );
}

interface HistoryMark { tqSearch?: boolean }

/**
 * Màn hình tìm kiếm toàn trang cho mobile.
 * Mở bằng pushState để nút Back của điện thoại đóng overlay thay vì rời trang.
 */
export function SearchOverlay({ open, onClose, products, navigation }: { open: boolean; onClose: () => void; products: ProductLite[]; navigation: Navigation }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const pendingHref = useRef<string | null>(null);
  const [q, setQ] = useState("");
  const recent = useRecentSearches();
  const results = match(products, q);
  const hasQuery = q.trim().length > 0;

  const close = (href?: string) => {
    if ((window.history.state as HistoryMark | null)?.tqSearch) {
      pendingHref.current = href ?? null;
      window.history.back();
    } else {
      setQ("");
      onClose();
      if (href) router.push(href);
    }
  };

  // Lịch sử & focus & khoá cuộn khi mở.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => inputRef.current?.focus(), 60);
    if (!(window.history.state as HistoryMark | null)?.tqSearch) {
      window.history.pushState({ ...(window.history.state as object | null), tqSearch: true }, "", window.location.href);
    }
    return () => { document.body.style.overflow = prev; window.clearTimeout(t); };
  }, [open]);

  // Giữ callback mới nhất trong ref: listener chỉ đăng ký một lần cho mỗi lần mở.
  // (Next xử lý popstate đồng bộ -> render lại ngay trong lúc sự kiện phát, nếu
  // listener bị gỡ/đăng ký lại ở đó thì trình duyệt sẽ bỏ qua nó.)
  const latest = useRef({ onClose, router, close });
  useEffect(() => { latest.current = { onClose, router, close }; });

  // Back của trình duyệt -> đóng; nếu đang chờ điều hướng thì đi tiếp.
  useEffect(() => {
    if (!open) return;
    const onPop = () => {
      setQ("");
      latest.current.onClose();
      const href = pendingHref.current;
      pendingHref.current = null;
      if (href) latest.current.router.push(href);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") latest.current.close(); };
    window.addEventListener("popstate", onPop);
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("popstate", onPop); window.removeEventListener("keydown", onKey); };
  }, [open]);

  const remember = (term: string) => {
    const s = term.trim();
    if (!s) return;
    writeRecent([s, ...recent.filter((r) => r.toLowerCase() !== s.toLowerCase())]);
  };

  const submit = (term = q) => {
    const s = term.trim();
    if (s) remember(s);
    close(s ? `/catalogue?q=${encodeURIComponent(s)}` : "/catalogue");
  };

  const openProduct = (p: ProductLite) => {
    if (hasQuery) remember(q);
    close(`/catalogue/${p.slug}`);
  };

  const removeRecent = (term: string) => {
    writeRecent(recent.filter((r) => r !== term));
  };

  const quickLinks = navigation.megaMenu
    .flatMap((c) => c.items)
    .sort((a, b) => Number(Boolean(b.hot)) - Number(Boolean(a.hot)))
    .slice(0, 8);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Tìm kiếm"
      inert={!open}
      className={cn("fixed inset-0 z-[70] flex flex-col bg-cream-50 text-ink-900 transition-all duration-300 ease-out-expo md:hidden", open ? "visible translate-y-0 opacity-100" : "invisible translate-y-3 opacity-0")}
    >
      {/* Thanh nhập */}
      <form
        role="search"
        onSubmit={(e) => { e.preventDefault(); submit(); }}
        className="flex items-center gap-2 border-b border-cream-200 bg-white px-2 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] shadow-[0_8px_24px_-20px_rgb(11_25_44/0.6)]"
      >
        <button type="button" onClick={() => close()} className="grid size-11 shrink-0 place-items-center rounded-full text-navy-900 hover:bg-cream-100" aria-label="Đóng tìm kiếm">
          <ArrowLeft className="size-5" />
        </button>
        <label className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-full bg-cream-100 pl-4 pr-1 ring-1 ring-transparent transition focus-within:bg-white focus-within:ring-2 focus-within:ring-gold-400">
          <Search className="size-4 shrink-0 text-ink-400" />
          <input
            ref={inputRef}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm sản phẩm, mã quà (VD: TQG01)"
            autoComplete="off"
            enterKeyHint="search"
            className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-ink-900 placeholder:text-ink-400 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
            aria-label="Tìm kiếm sản phẩm"
          />
          {q && (
            <button type="button" onClick={() => { setQ(""); inputRef.current?.focus(); }} className="grid size-9 shrink-0 place-items-center rounded-full text-ink-400 hover:bg-cream-200 hover:text-ink-900" aria-label="Xoá từ khoá">
              <X className="size-4" />
            </button>
          )}
        </label>
        <button type="submit" className="shrink-0 rounded-full px-3 py-2 text-sm font-semibold text-gold-700 hover:bg-cream-100">Tìm</button>
      </form>

      {/* Nội dung */}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        {hasQuery ? (
          results.length === 0 ? (
            <div className="px-6 py-14 text-center">
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-cream-100 text-ink-400"><Search className="size-6" /></span>
              <p className="mt-4 font-semibold text-navy-900">Không tìm thấy “{q.trim()}”</p>
              <p className="mt-1 text-sm text-ink-500">Thử từ khoá khác hoặc xem toàn bộ catalogue.</p>
              <button type="button" onClick={() => close("/catalogue")} className="mt-5 rounded-full bg-gold-gradient px-5 py-2.5 text-sm font-bold text-navy-900">Xem catalogue</button>
            </div>
          ) : (
            <ul className="px-2 pt-2">
              {results.map((p) => (
                <li key={p.slug}>
                  <button type="button" onClick={() => openProduct(p)} className="flex w-full items-center gap-3 rounded-2xl px-2 py-2 text-left active:bg-cream-100">
                    <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-cream-100">
                      {p.thumb && <Image src={p.thumb} alt="" fill sizes="56px" className="object-cover" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="line-clamp-2 text-sm font-semibold leading-snug text-navy-900"><Highlight text={p.name} q={q} /></span>
                      <span className="mt-0.5 block text-xs text-ink-400">Mã <Highlight text={p.code} q={q} /></span>
                    </span>
                    <span className="shrink-0 text-sm font-bold text-ruby-700">{formatPrice(p.price)}</span>
                  </button>
                </li>
              ))}
              <li className="mt-1 border-t border-cream-200 px-2 pt-2">
                <button type="button" onClick={() => submit()} className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-gold-700 active:bg-cream-100">
                  Xem tất cả kết quả cho “{q.trim()}” <ArrowUpRight className="size-4" />
                </button>
              </li>
            </ul>
          )
        ) : (
          <div className="space-y-7 px-4 pt-5">
            {recent.length > 0 && (
              <section>
                <div className="flex items-center justify-between">
                  <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink-500"><Clock className="size-3.5" /> Tìm kiếm gần đây</h2>
                  <button type="button" onClick={() => writeRecent([])} className="text-xs font-semibold text-ink-400 hover:text-ruby-700">Xoá</button>
                </div>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {recent.map((r) => (
                    <li key={r} className="flex items-center overflow-hidden rounded-full bg-white ring-1 ring-cream-200">
                      <button type="button" onClick={() => submit(r)} className="py-2 pl-3.5 pr-2 text-sm text-ink-700">{r}</button>
                      <button type="button" onClick={() => removeRecent(r)} className="grid size-8 place-items-center text-ink-400 hover:text-ruby-700" aria-label={`Bỏ “${r}”`}><X className="size-3.5" /></button>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {quickLinks.length > 0 && (
              <section>
                <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink-500"><TrendingUp className="size-3.5" /> Danh mục nổi bật</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {quickLinks.map((it) => (
                    <li key={it.href}>
                      <button type="button" onClick={() => close(it.href)} className={cn("rounded-full px-3.5 py-2 text-sm font-medium ring-1 transition", it.hot ? "bg-ruby-700 text-white ring-ruby-700" : "bg-white text-ink-700 ring-cream-200 active:bg-cream-100")}>
                        {it.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {products.length > 0 && (
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">Có thể bạn quan tâm</h2>
                <ul className="mt-3 -mx-2">
                  {products.slice(0, 4).map((p) => (
                    <li key={p.slug}>
                      <button type="button" onClick={() => openProduct(p)} className="flex w-full items-center gap-3 rounded-2xl px-2 py-2 text-left active:bg-cream-100">
                        <span className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-cream-100">
                          {p.thumb && <Image src={p.thumb} alt="" fill sizes="48px" className="object-cover" />}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="line-clamp-1 text-sm font-semibold text-navy-900">{p.name}</span>
                          <span className="block text-xs text-ink-400">Mã {p.code}</span>
                        </span>
                        <span className="shrink-0 text-sm font-bold text-ruby-700">{formatPrice(p.price)}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
