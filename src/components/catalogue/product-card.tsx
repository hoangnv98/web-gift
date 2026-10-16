import Image from "next/image";
import Link from "next/link";
import { cn, discountPercent, formatPrice } from "@/lib/utils";
import { unsplash, img } from "@/lib/images";
import { getMaterial, type Product } from "@/data/catalogue";
import { Badge } from "@/components/ui/badge";
import { WishlistButton } from "./product-actions";

/** Card gọn dùng trên kệ sản phẩm trang chủ / liên quan. */
export function ProductCard({ product, priority = false, className }: { product: Product; priority?: boolean; className?: string }) {
  const discount = discountPercent(product.price, product.originalPrice);
  const href = `/catalogue/${product.slug}`;
  return (
    <article className={cn("group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-navy-900/5 transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-card-hover", className)}>
      <div className="relative aspect-[4/5] overflow-hidden bg-cream-100">
        <Link href={href} className="absolute inset-0">
          <Image src={unsplash(img[product.images[0]], 800, 1000)} alt={product.name} fill priority={priority} sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw" className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.06]" />
        </Link>
        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-2">
          {product.badge && <Badge kind={product.badge} />}
          {discount > 0 && <span className="inline-flex w-fit rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-ruby-700">−{discount}%</span>}
        </div>
        <WishlistButton slug={product.slug} iconOnly className="absolute right-3 top-3" />
      </div>
      <div className="flex flex-1 flex-col px-4 pb-5 pt-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-400">{getMaterial(product.material).label} · {product.code}</p>
        <h3 className="mt-1.5 text-balance text-lg font-semibold leading-snug text-navy-900">
          <Link href={href} className="hover:text-ruby-700">{product.name}</Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-ink-500">{product.items.slice(1, 4).join(" · ")}</p>
        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            {product.originalPrice && <p className="text-xs text-ink-300 line-through">{formatPrice(product.originalPrice)}</p>}
            <p className="font-display text-xl font-bold text-ruby-700">{formatPrice(product.price)}</p>
          </div>
          <Link href={href} className="text-xs font-semibold text-gold-700 transition-colors group-hover:text-navy-900">Xem chi tiết →</Link>
        </div>
      </div>
    </article>
  );
}
