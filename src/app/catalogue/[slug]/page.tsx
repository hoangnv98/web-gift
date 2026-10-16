import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ChevronRight, Phone, MessageCircle, Printer, Truck, FileCheck2 } from "lucide-react";
import { formatPrice, discountPercent } from "@/lib/utils";
import { getProduct, getProducts, getSettings, siteUrl } from "@/lib/cms";
import { getRelated, occasionLabel } from "@/lib/catalogue";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlossomIcon } from "@/components/ui/logo";
import { ProductGallery } from "@/components/catalogue/product-gallery";
import { ProductCard } from "@/components/catalogue/product-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { AddToCartButton, WishlistButton } from "@/components/catalogue/product-actions";
import { AgeGate } from "@/components/layout/age-gate";

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/catalogue/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};
  return {
    title: product.seo?.title || `${product.name} ${product.code}`,
    description: product.seo?.description || product.tagline,
    alternates: { canonical: `/catalogue/${slug}` },
    openGraph: { images: [{ url: (product.seo?.image ?? product.images[0])?.src ?? "" }] },
  };
}

const availabilitySchema = { "con-hang": "https://schema.org/InStock", "dat-truoc": "https://schema.org/PreOrder", "het-hang": "https://schema.org/OutOfStock" } as const;
const availabilityLabel = { "con-hang": "Còn hàng", "dat-truoc": "Đặt trước", "het-hang": "Hết hàng" } as const;

/** Đọc params bên trong <Suspense> để app shell vẫn prerender được (Next 16 cache components). */
export default function ProductPage(props: PageProps<"/catalogue/[slug]">) {
  return (
    <Suspense fallback={<Container className="py-12"><div className="h-[70vh] animate-pulse rounded-3xl bg-cream-200" /></Container>}>
      <ProductDetail params={props.params} />
    </Suspense>
  );
}

async function ProductDetail({ params }: Pick<PageProps<"/catalogue/[slug]">, "params">) {
  const { slug } = await params;
  const [product, products, site] = await Promise.all([getProduct(slug), getProducts(), getSettings()]);
  if (!product) notFound();

  const discount = discountPercent(product.price, product.originalPrice);
  const related = getRelated(products, product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.code,
    description: product.description,
    image: product.images.map((i) => i.src),
    brand: { "@type": "Brand", name: site.name },
    offers: { "@type": "Offer", priceCurrency: "VND", price: product.price, availability: availabilitySchema[product.availability], url: `${siteUrl}/catalogue/${product.slug}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AgeGate active={product.ageGate} brand={site.name} />
      <Container className="py-8 lg:py-12">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-ink-400">
          <Link href="/" className="hover:text-ruby-700">Trang chủ</Link><ChevronRight className="size-3.5" />
          <Link href="/catalogue" className="hover:text-ruby-700">Catalogue</Link><ChevronRight className="size-3.5" />
          <span className="text-ink-700">{occasionLabel(product.occasion)}</span><ChevronRight className="size-3.5" />
          <span className="text-ink-700">{product.code}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7"><ProductGallery images={product.images} alt={product.name} /></div>
          <div className="lg:col-span-5">
            <div className="flex flex-wrap items-center gap-2">
              {product.badge && <Badge kind={product.badge} />}
              <span className="rounded-md border border-ruby-700 bg-ruby-50 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-ruby-700">Mã: {product.code}</span>
              {product.availability !== "con-hang" && <span className="rounded-md bg-cream-200 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-ink-600">{availabilityLabel[product.availability]}</span>}
            </div>
            <h1 className="mt-4 text-balance text-3xl font-bold uppercase leading-tight text-ruby-700 sm:text-4xl">{product.name}</h1>
            <p className="mt-3 text-lg text-ink-500">{product.tagline}</p>

            <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl bg-gold-gradient px-5 py-4 ring-1 ring-gold-700/30">
              <div className="text-navy-900/70">
                {product.originalPrice && <><p className="text-[11px] font-semibold uppercase tracking-wider">Giá gốc</p><p className="text-base font-semibold line-through">{formatPrice(product.originalPrice)}</p></>}
                {discount > 0 && <p className="mt-1 text-xs font-bold text-ruby-700">Tiết kiệm {discount}%</p>}
              </div>
              <div className="text-right">
                <p className="font-display text-4xl font-bold leading-none text-ruby-700">{formatPrice(product.price)}</p>
                <p className="mt-1 text-[11px] font-medium text-navy-900/70">Giá trên chưa bao gồm VAT</p>
              </div>
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-2xl bg-cream-100 p-4"><dt className="text-xs font-semibold uppercase tracking-wider text-ink-400">Dịp tặng</dt><dd className="mt-1 font-semibold text-navy-900">{occasionLabel(product.occasion)}</dd></div>
              <div className="rounded-2xl bg-cream-100 p-4"><dt className="text-xs font-semibold uppercase tracking-wider text-ink-400">Chất liệu</dt><dd className="mt-1 font-semibold text-navy-900">{product.material.label}</dd></div>
            </dl>

            <div className="mt-8">
              <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold-700">Thành phần bộ quà</h2>
              <ul className="mt-4 space-y-2.5">
                {product.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] text-ink-800"><BlossomIcon className="mt-0.5 size-4 shrink-0 text-ruby-700" />{item}</li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <AddToCartButton slug={product.slug} size="lg" className="flex-1" />
              <WishlistButton slug={product.slug} />
            </div>
            <div className="mt-3 flex flex-wrap gap-3">
              <Button href="/qua-doanh-nghiep#bao-gia" variant="gold" className="flex-1">Nhận báo giá sỉ</Button>
              <Button href={site.hotlineHref} variant="outline"><Phone className="size-4" /> {site.hotline}</Button>
              {site.zalo && <Button href={site.zalo} variant="ghost" className="px-4" aria-label="Zalo"><MessageCircle className="size-5" /></Button>}
            </div>

            <ul className="mt-8 grid gap-3 text-sm text-ink-600">
              <li className="flex items-center gap-3"><Printer className="size-4 text-gold-700" /> Miễn phí in logo, thiệp chúc theo thương hiệu</li>
              <li className="flex items-center gap-3"><Truck className="size-4 text-gold-700" /> Giao hàng toàn quốc, đóng gói chống sốc</li>
              <li className="flex items-center gap-3"><FileCheck2 className="size-4 text-gold-700" /> Hoá đơn VAT & hồ sơ công bố đầy đủ</li>
            </ul>
          </div>
        </div>

        {product.description && (
          <div className="mt-16 max-w-3xl">
            <h2 className="text-2xl font-semibold text-navy-900">Mô tả sản phẩm</h2>
            <p className="mt-4 whitespace-pre-line text-pretty leading-relaxed text-ink-600">{product.description}</p>
          </div>
        )}
      </Container>

      {related.length > 0 && (
        <section className="bg-cream-100 py-20">
          <Container>
            <SectionHeading align="left" eyebrow="Có thể bạn quan tâm" title={`${occasionLabel(product.occasion)} khác`} />
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
