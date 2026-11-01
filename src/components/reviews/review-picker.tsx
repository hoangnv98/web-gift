"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink, Shuffle, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReviewGroup } from "@/lib/reviews";

/**
 * Danh sách lời đánh giá gợi ý: bấm "Sao chép" → clipboard, sau đó nút "Mở Google Maps" để dán.
 * Thanh CTA dính đáy màn hình để khách luôn thấy bước tiếp theo.
 */
export function ReviewPicker({ groups, reviewUrl }: { groups: ReviewGroup[]; reviewUrl: string }) {
  const [copied, setCopied] = useState<string | null>(null);
  const [custom, setCustom] = useState("");
  const all = groups.flatMap((g) => g.items);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback cho trình duyệt cũ / WebView không cấp quyền clipboard
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(text);
    window.setTimeout(() => setCopied((c) => (c === text ? null : c)), 2500);
  };

  const random = () => {
    const pick = all[Math.floor(Math.random() * all.length)];
    setCustom(pick);
    void copy(pick);
    document.getElementById("tu-viet")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="pb-28 sm:pb-24">
      {groups.map((g) => (
        <section key={g.id} className="mt-10 first:mt-0">
          <h2 className="flex items-center gap-3 text-xl font-semibold text-navy-900 after:h-px after:flex-1 after:bg-cream-300">{g.label}</h2>
          <ul className="mt-5 grid gap-4 md:grid-cols-2">
            {g.items.map((text) => {
              const on = copied === text;
              return (
                <li key={text} className={cn("flex flex-col justify-between gap-4 rounded-2xl bg-white p-5 shadow-card ring-1 transition-all", on ? "ring-gold-500" : "ring-navy-900/5 hover:ring-gold-400/60")}>
                  <div>
                    <p className="flex gap-0.5 text-gold-500" aria-label="5 sao">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-current" />)}</p>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink-800">{text}</p>
                  </div>
                  <button type="button" onClick={() => copy(text)} className={cn("inline-flex h-10 w-fit items-center gap-2 rounded-full px-4 text-sm font-semibold transition-all", on ? "bg-gold-gradient text-navy-900" : "bg-navy-900 text-cream-50 hover:bg-ruby-700")}>
                    {on ? <><Check className="size-4" /> Đã sao chép</> : <><Copy className="size-4" /> Sao chép</>}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      <section id="tu-viet" className="mt-12 scroll-mt-32 rounded-3xl bg-navy-900 p-6 text-cream-50 sm:p-8">
        <h2 className="text-xl font-semibold">Hoặc tự viết theo ý bạn</h2>
        <p className="mt-2 text-sm text-cream-200/80">Một lời đánh giá thật của bạn là món quà quý nhất với chúng tôi. Có thể bấm “Gợi ý ngẫu nhiên” rồi sửa lại cho đúng trải nghiệm của mình.</p>
        <textarea value={custom} onChange={(e) => setCustom(e.target.value)} rows={4} placeholder="VD: Mình đặt 30 hộp quà Tết cho đối tác, hộp đẹp, giao đúng hẹn…" className="mt-4 w-full rounded-2xl border border-white/15 bg-white/10 p-4 text-sm text-cream-50 placeholder:text-cream-200/50 focus:border-gold-400 focus:outline-none" />
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={random} className="inline-flex h-11 items-center gap-2 rounded-full border border-gold-400/70 px-5 text-sm font-semibold text-gold-200 hover:bg-gold-500 hover:text-navy-900"><Shuffle className="size-4" /> Gợi ý ngẫu nhiên</button>
          <button type="button" disabled={!custom.trim()} onClick={() => copy(custom.trim())} className="inline-flex h-11 items-center gap-2 rounded-full bg-gold-gradient px-5 text-sm font-semibold text-navy-900 disabled:opacity-50">
            {copied && copied === custom.trim() ? <><Check className="size-4" /> Đã sao chép</> : <><Copy className="size-4" /> Sao chép nội dung</>}
          </button>
        </div>
      </section>

      {/* Thanh CTA dính đáy */}
      {/* z-50 + chừa lề phải để không bị 3 nút nổi (Zalo / hotline / catalogue) che */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gold-500/30 bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 py-3 pl-4 pr-20 sm:pl-6 sm:pr-24 lg:px-8 lg:pr-24">
          <p className="hidden text-sm text-ink-500 sm:block">
            {copied ? <span className="font-semibold text-navy-900">Đã sao chép! Bước tiếp theo: mở Google Maps, chọn 5 sao và dán.</span> : "Chọn một lời đánh giá, bấm Sao chép rồi mở Google Maps."}
          </p>
          <a href={reviewUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ruby-700 px-6 text-sm font-bold text-white shadow-[0_8px_24px_-10px_rgb(155_27_30/0.7)] transition hover:-translate-y-0.5 hover:bg-ruby-600 sm:w-auto">
            <Star className="size-4 fill-current" /> Đánh giá trên Google Maps <ExternalLink className="size-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
