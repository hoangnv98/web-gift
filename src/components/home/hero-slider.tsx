"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Slide } from "@/lib/cms";
import { Container } from "@/components/ui/container";

/**
 * Hero slideshow full width theo kiểu mincygroup.com: ảnh phủ kín bề ngang, chuyển cảnh mờ dần (crossfade),
 * thanh chấm dạng vạch ở giữa đáy, vuốt/kéo để đổi slide. Nội dung slide lấy từ Admin → Trang chủ → Hero slider.
 */
export function HeroSlider({ slides, autoplaySeconds = 6 }: { slides: Slide[]; autoplaySeconds?: number }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const dragX = useRef<number | null>(null);
  const n = slides.length;

  // `i` nằm trong deps để mỗi lần bấm chấm / vuốt thì đếm lại thời gian tự chuyển.
  useEffect(() => {
    if (paused || n < 2 || autoplaySeconds <= 0) return;
    const t = window.setTimeout(() => setI((v) => (v + 1) % n), autoplaySeconds * 1000);
    return () => window.clearTimeout(t);
  }, [i, paused, n, autoplaySeconds]);

  if (n === 0) return null;
  const go = (k: number) => setI((k + n) % n);

  return (
    <section
      className="relative isolate flex h-[78svh] min-h-[520px] cursor-grab touch-pan-y select-none items-center overflow-hidden bg-navy-950 text-white active:cursor-grabbing lg:h-[88vh] lg:max-h-[980px]"
      aria-roledescription="carousel"
      aria-label="Bộ sưu tập nổi bật"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={(e) => { dragX.current = e.clientX; }}
      onPointerUp={(e) => {
        if (dragX.current === null) return;
        const dx = e.clientX - dragX.current;
        dragX.current = null;
        if (Math.abs(dx) > 50) go(dx < 0 ? i + 1 : i - 1);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(i + 1);
        if (e.key === "ArrowLeft") go(i - 1);
      }}
    >
      {/* Ảnh nền */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {slides.map((s, idx) => (
          <Image
            key={idx}
            src={s.image.src}
            alt=""
            fill
            preload={idx === 0}
            draggable={false}
            sizes="100vw"
            className={cn("object-cover transition-opacity duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none", idx === i ? "opacity-100" : "opacity-0")}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-950/45 to-navy-950/5" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-950/60 to-transparent" />
      </div>

      {/* Nội dung: các slide xếp chồng cùng một ô lưới, chỉ slide đang hiện nhận focus/click */}
      <Container className="grid">
        {slides.map((s, idx) => {
          const active = idx === i;
          const Title = idx === 0 ? "h1" : "h2";
          return (
            <div
              key={idx}
              inert={!active}
              aria-hidden={!active}
              className={cn("max-w-2xl transition-[opacity,translate] duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)] [grid-area:1/1] motion-reduce:transition-none", active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0")}
            >
              {s.eyebrow && <p className="inline-block border-b border-white/40 pb-2 text-[13px] font-medium uppercase tracking-[0.3em] text-white/85">— {s.eyebrow}</p>}
              <Title className="mt-6 text-balance text-[2.6rem] font-light leading-[1.05] tracking-[-0.02em] text-white sm:text-6xl lg:text-[4.5rem]">
                {s.title}
                {s.highlight && <span className="block text-gold-300">{s.highlight}</span>}
              </Title>
              {s.text && <p className="mt-6 max-w-xl text-pretty text-base font-light leading-relaxed text-white/80 sm:text-lg">{s.text}</p>}
              {(s.cta || s.cta2) && (
                <div className="mt-10 flex flex-wrap gap-3">
                  {s.cta && <Link href={s.cta.href} draggable={false} className="inline-flex items-center justify-center bg-white px-8 py-3.5 text-[13px] font-medium uppercase tracking-[0.1em] text-navy-900 shadow-[0_4px_18px_rgb(0_0_0/0.22)] transition-colors hover:bg-gold-300">{s.cta.label}</Link>}
                  {s.cta2 && <Link href={s.cta2.href} draggable={false} className="inline-flex items-center justify-center border border-white/40 px-8 py-3.5 text-[13px] font-medium uppercase tracking-[0.1em] text-white transition-colors hover:border-white hover:bg-white hover:text-navy-900">{s.cta2.label}</Link>}
                </div>
              )}
            </div>
          );
        })}
      </Container>

      {/* Chấm điều hướng dạng vạch */}
      {n > 1 && (
        <div className="absolute inset-x-0 bottom-12 z-10 flex justify-center gap-1.5 px-3" role="group" aria-label="Điều khiển slide">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => go(idx)}
              aria-label={`Slide ${idx + 1}`}
              aria-current={idx === i}
              className="group grid h-7 w-12 cursor-pointer place-items-center focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white/60"
            >
              <span className={cn("block h-0.5 transition-all duration-300 motion-reduce:transition-none", idx === i ? "w-12 bg-white/95" : "w-8 bg-white/35 group-hover:bg-white/65")} />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
