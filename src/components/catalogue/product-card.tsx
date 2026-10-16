import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn, discountPercent, formatPrice } from "@/lib/utils";
import { unsplash, img } from "@/lib/images";
import { getMaterial, type Product } from "@/data/catalogue";
import { Badge } from "@/components/ui/badge";

export function ProductCard({ product, priority = false, className }: { product: Product; priority?: boolean; className?: string }) {
  const discount = discountPercent(product.price, product.originalPrice);
  const href = `/catalogue/${product.slug}`;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-ink-900/5 transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-card-hover",
        className,
      )}
    >
      {/* Main image */}
      <Link href={href} className="relative block aspect-[4/5] overflow-hidden bg-cream-100">
        <Image
          src={unsplash(img[product.images[0]], 800, 1000)}
          alt={product.name}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {product.badge && <Badge kind={product.badge} />}
          {discount > 0 && (
            <span className="inline-flex w-fit items-center rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-crimson-700 backdrop-blur">
              −{discount}%
            </span>
          )}
        </div>

        <span className="absolute bottom-3 right-3 grid size-10 translate-y-3 place-items-center rounded-full bg-cream-50 text-crimson-700 opacity-0 shadow-lg transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-5" />
        </span>
      </Link>

      {/* Thumbnails */}
      <div className="flex gap-1.5 px-4 pt-4">
        {product.images.slice(1, 3).map((key, i) => (
          <div key={key + i} className="relative size-12 overflow-hidden rounded-lg ring-1 ring-ink-900/10">
            <Image src={unsplash(img[key], 160, 160)} alt="" fill sizes="48px" className="object-cover" />
          </div>
        ))}
        <div className="ml-auto self-end text-right">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-400">{getMaterial(product.material).name}</p>
          <p className="text-[11px] font-medium text-ink-300">Mã {product.code}</p>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-4 pb-5 pt-3">
        <h3 className="text-balance text-lg font-semibold leading-snug text-ink-900">
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-ink-500">{product.items.slice(0, 3).join(" · ")}</p>

        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            {product.originalPrice && (
              <p className="text-xs text-ink-300 line-through">{formatPrice(product.originalPrice)}</p>
            )}
            <p className="font-display text-xl font-semibold text-crimson-700">{formatPrice(product.price)}</p>
          </div>
          <span className="text-xs font-semibold text-gold-600 transition-colors group-hover:text-crimson-700">
            Xem chi tiết →
          </span>
        </div>
      </div>
    </article>
  );
}
