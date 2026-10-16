"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { unsplash, img, type ImageKey } from "@/lib/images";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

interface Slide { eyebrow: string; title: string; highlight: string; text: string; cta: { label: string; href: string }; cta2?: { label: string; href: string }; image: ImageKey }

const slides: Slide[] = [
  { eyebrow: "Bộ sưu tập Tết Đinh Mùi 2027", title: "Gửi trọn Tri ân,", highlight: "Khởi nguồn Thịnh vượng", text: "Hộp quà, giỏ quà Tết cao cấp cho doanh nghiệp. Miễn phí in logo, chiết khấu B2B, hoá đơn VAT đầy đủ.", cta: { label: "Xem Catalogue online", href: "/catalogue" }, cta2: { label: "Nhận báo giá sỉ", href: "/qua-doanh-nghiep#bao-gia" }, image: "redGifts" },
  { eyebrow: "Quà tặng đối tác VIP", title: "Hộp gỗ, hộp da, sơn mài", highlight: "xứng tầm Quý nhân", text: "Rượu vang nhập khẩu, yến sào, trà thượng hạng trong những chiếc hộp có thể giữ lại sau mùa Tết.", cta: { label: "Hộp quà cao cấp", href: "/catalogue?chat-lieu=hop-go" }, image: "darkLuxuryGifts" },
  { eyebrow: "Giỏ quà rượu vang", title: "Đầy đặn, ấm áp,", highlight: "sum vầy ngày Xuân", text: "Giỏ gỗ, giỏ da đan tay với mật ong, trái cây, hạt dinh dưỡng và vang tuyển chọn.", cta: { label: "Giỏ quà Tết", href: "/catalogue?nhom=gio-qua-tet" }, image: "honeyMandarin" },
];

export function HeroSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % slides.length), 6000);
    return () => window.clearInterval(t);
  }, [paused]);

  const go = (n: number) => setI((n + slides.length) % slides.length);

  return (
    <section className="relative overflow-hidden bg-navy-silk text-cream-50" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} aria-roledescription="carousel">
      <Container className="relative grid min-h-[560px] items-center gap-10 py-14 lg:grid-cols-12 lg:py-20">
        <div className="relative lg:col-span-6">
          {slides.map((s, idx) => (
            <div key={s.title} className={cn("transition-all duration-700 ease-out-expo", idx === i ? "relative translate-y-0 opacity-100" : "pointer-events-none absolute inset-0 translate-y-4 opacity-0")} aria-hidden={idx !== i}>
              <p className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">{s.eyebrow}</p>
              <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">
                {s.title}<br /><span className="text-gold-foil italic">{s.highlight}</span>
              </h1>
              <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-cream-200/85">{s.text}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href={s.cta.href} variant="gold" size="lg">{s.cta.label} <ArrowRight className="size-4" /></Button>
                {s.cta2 && <Button href={s.cta2.href} variant="outline-light" size="lg">{s.cta2.label}</Button>}
              </div>
            </div>
          ))}
        </div>

        <div className="relative lg:col-span-6">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] ring-1 ring-gold-500/40 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.8)]">
            {slides.map((s, idx) => (
              <Image key={s.image} src={unsplash(img[s.image], 1400, 1120)} alt={`${s.title} ${s.highlight}`} fill priority={idx === 0} sizes="(min-width: 1024px) 50vw, 100vw" className={cn("object-cover transition-all duration-1000 ease-out-expo", idx === i ? "scale-100 opacity-100" : "scale-105 opacity-0")} />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
          </div>
          <div className="pointer-events-none absolute -left-6 -top-6 hidden size-28 rounded-full border border-gold-500/40 lg:block" />
          <div className="pointer-events-none absolute -bottom-8 -right-8 hidden size-40 rounded-full border border-gold-500/20 lg:block" />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 lg:col-span-12">
          <div className="flex gap-2">
            {slides.map((s, idx) => (
              <button key={s.title} type="button" onClick={() => go(idx)} aria-label={`Slide ${idx + 1}`} className={cn("h-1.5 rounded-full transition-all duration-500", idx === i ? "w-10 bg-gold-400" : "w-4 bg-white/30 hover:bg-white/60")} />
            ))}
          </div>
          <div className="ml-auto flex gap-2">
            <button type="button" onClick={() => go(i - 1)} className="grid size-10 place-items-center rounded-full border border-white/20 hover:border-gold-400 hover:text-gold-300" aria-label="Slide trước"><ChevronLeft className="size-5" /></button>
            <button type="button" onClick={() => go(i + 1)} className="grid size-10 place-items-center rounded-full border border-white/20 hover:border-gold-400 hover:text-gold-300" aria-label="Slide sau"><ChevronRight className="size-5" /></button>
          </div>
        </div>
      </Container>
    </section>
  );
}
