import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { unsplash, img, type ImageKey } from "@/lib/images";
import { Container } from "./container";
import { Button } from "./button";

export function PageHero({ eyebrow, title, highlight, text, cta, image }: { eyebrow: string; title: string; highlight?: string; text: string; cta?: { label: string; href: string }; image: ImageKey }) {
  return (
    <section className="relative overflow-hidden bg-navy-silk text-cream-50">
      <Container className="grid items-center gap-10 py-14 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-7">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-300">{eyebrow}</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">
            {title}{highlight && <> <span className="text-gold-foil italic">{highlight}</span></>}
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-lg text-cream-200/85">{text}</p>
          {cta && <Button href={cta.href} variant="gold" size="lg" className="mt-8">{cta.label} <ArrowRight className="size-4" /></Button>}
        </div>
        <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] ring-1 ring-gold-500/40 lg:col-span-5">
          <Image src={unsplash(img[image], 1000, 800)} alt="" fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
        </div>
      </Container>
    </section>
  );
}
