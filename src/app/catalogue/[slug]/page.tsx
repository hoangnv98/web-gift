import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronRight, Phone, MessageCircle, PenLine, Truck, ShieldCheck } from "lucide-react";
import { formatPrice, discountPercent } from "@/lib/utils";
import { getCategory, getMaterial, getProduct, getRelated, products } from "@/data/catalogue";
import { site } from "@/data/site";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductGallery } from "@/components/catalogue/product-gallery";
import { ProductCard } from "@/components/catalogue/product-card";
import { SectionHeading } from "@/components/ui/section-heading";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/catalogue/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return { title: product.name, description: product.tagline };
}

export default async function ProductPage({ params }: PageProps<"/catalogue/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const material = getMaterial(product.material);
  const discount = discountPercent(product.price, product.originalPrice);
  const related = getRelated(product);

  return (
    <>
      <Container className="py-8 lg:py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-ink-400">
          <Link href="/" className="hover:text-crimson-700">Trang chủ</Link>
          <ChevronRight className="size-3.5" />
          <Link href="/catalogue" className="hover:text-crimson-700">Catalogue</Link>
          <ChevronRight className="size-3.5" />
          <Link href={`/catalogue?category=${category.id}`} className="hover:text-crimson-700">{category.name}</Link>
          <ChevronRight className="size-3.5" />
          <span className="text-ink-700">{product.code}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} alt={product.name} />
          </div>

          <div className="lg:col-span-5">
            <div className="flex flex-wrap items-center gap-2">
              {product.badge && <Badge kind={product.badge} />}
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">Mã {product.code}</span>
            </div>
            <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight text-ink-900 sm:text-5xl">{product.name}</h1>
            <p className="mt-3 text-lg text-ink-500">{product.tagline}</p>

            <div className="mt-6 flex items-end gap-3 border-y border-cream-300 py-5">
              <p className="font-display text-4xl font-semibold text-crimson-700">{formatPrice(product.price)}</p>
              {product.originalPrice && (
                <>
                  <p className="pb-1 text-base text-ink-300 line-through">{formatPrice(product.originalPrice)}</p>
                  <span className="mb-1 rounded-full bg-crimson-50 px-2.5 py-1 text-xs font-bold text-crimson-700">−{discount}%</span>
                </>
              )}
            </div>
            <p className="mt-2 text-xs text-ink-400">Giá chưa bao gồm VAT · Ưu đãi theo số lượng cho đơn doanh nghiệp</p>

            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-2xl bg-cream-100 p-4">
                <dt className="text-xs font-semibold uppercase tracking-wider text-ink-400">Dòng quà</dt>
                <dd className="mt-1 font-semibold text-ink-900">{category.name}</dd>
              </div>
              <div className="rounded-2xl bg-cream-100 p-4">
                <dt className="text-xs font-semibold uppercase tracking-wider text-ink-400">Chất liệu</dt>
                <dd className="mt-1 font-semibold text-ink-900">{material.name}</dd>
              </div>
            </dl>

            <div className="mt-8">
              <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">Thành phần bộ quà</h2>
              <ul className="mt-4 space-y-2.5">
                {product.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-ink-800">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-crimson-700 text-cream-50">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/lien-he" size="lg" className="flex-1">Nhận báo giá</Button>
              <Button href={site.hotlineHref} variant="outline" size="lg">
                <Phone className="size-4" /> Gọi tư vấn
              </Button>
              <Button href={site.zalo} variant="ghost" size="lg" className="sm:px-4">
                <MessageCircle className="size-5" />
              </Button>
            </div>

            <ul className="mt-8 grid gap-3 text-sm text-ink-600">
              <li className="flex items-center gap-3"><PenLine className="size-4 text-gold-600" /> In logo, thiệp chúc Tết theo thương hiệu</li>
              <li className="flex items-center gap-3"><Truck className="size-4 text-gold-600" /> Giao hàng toàn quốc, đóng gói chống sốc</li>
              <li className="flex items-center gap-3"><ShieldCheck className="size-4 text-gold-600" /> Xuất hoá đơn VAT, hợp đồng rõ ràng</li>
            </ul>
          </div>
        </div>

        {/* Description */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold text-ink-900">Mô tả sản phẩm</h2>
          <p className="mt-4 text-pretty leading-relaxed text-ink-600">{product.description}</p>
        </div>
      </Container>

      {related.length > 0 && (
        <section className="bg-cream-100 py-20">
          <Container>
            <SectionHeading align="left" eyebrow="Có thể bạn quan tâm" title={`${category.name} khác`} />
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
