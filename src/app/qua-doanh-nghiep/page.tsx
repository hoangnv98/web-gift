import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { FileText, PenTool, Stamp, Zap, ClipboardCheck, PackageCheck, Truck, Receipt, Sparkles } from "lucide-react";
import { getB2B, getProducts } from "@/lib/cms";
import { getFeatured } from "@/lib/catalogue";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/ui/page-hero";
import { QuoteForm } from "@/components/b2b/quote-form";
import { ProductCard } from "@/components/catalogue/product-card";
import { GoldenCommitments } from "@/components/home/sections";

export const metadata: Metadata = { title: "Quà tặng doanh nghiệp B2B", description: "Chiết khấu theo số lượng, in/ép kim/khắc laser logo, quy trình 5 bước, xuất hoá đơn GTGT.", alternates: { canonical: "/qua-doanh-nghiep" } };

const serviceIcons = [PenTool, Stamp, Zap, Sparkles];
const stepIcons = [FileText, ClipboardCheck, PenTool, PackageCheck, Truck];

export default async function B2BPage() {
  const [b2b, products] = await Promise.all([getB2B(), getProducts()]);
  return (
    <>
      <PageHero eyebrow="Giải pháp quà tặng B2B" title="Quà tặng doanh nghiệp" highlight="chiết khấu theo số lượng" text="Một đầu mối cho toàn bộ mùa quà của doanh nghiệp: tư vấn, thiết kế thương hiệu, sản xuất, giao hàng và hoá đơn." cta={{ label: "Đăng ký báo giá sỉ", href: "#bao-gia" }} image="handingGift" />
      <GoldenCommitments />

      {b2b.discounts.length > 0 && (
        <section className="py-20">
          <Container>
            <SectionHeading eyebrow="Chính sách chiết khấu" title="Càng nhiều, càng ưu đãi" description="Áp dụng trên giá niêm yết chưa VAT. Mức chiết khấu chính thức theo báo giá từng đơn." />
            <div className="mt-10 overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-navy-900/5">
              <table className="w-full text-left text-sm">
                <thead className="bg-navy-900 text-cream-50">
                  <tr>
                    <th className="px-5 py-4 font-semibold uppercase tracking-wider">Số lượng</th>
                    <th className="px-5 py-4 font-semibold uppercase tracking-wider">Chiết khấu</th>
                    <th className="px-5 py-4 font-semibold uppercase tracking-wider">Ưu đãi kèm theo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream-200">
                  {b2b.discounts.map((d) => (
                    <tr key={d.from} className="hover:bg-cream-50">
                      <td className="px-5 py-4 font-display text-lg font-semibold text-navy-900">{d.to ? `${d.from} – ${d.to} hộp` : `${d.from}+ hộp`}</td>
                      <td className="px-5 py-4"><span className="rounded-full bg-gold-gradient px-3 py-1 font-bold text-navy-900">{d.discount}</span></td>
                      <td className="px-5 py-4 text-ink-600">{d.perk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        </section>
      )}

      {b2b.services.length > 0 && (
        <section className="bg-cream-100 py-20">
          <Container>
            <SectionHeading eyebrow="Cá nhân hoá thương hiệu" title="In · Ép kim · Khắc laser logo doanh nghiệp" />
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {b2b.services.map((s, i) => {
                const Icon = serviceIcons[i % serviceIcons.length];
                return (
                  <article key={s.title} className="overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-navy-900/5">
                    <div className="relative aspect-[4/3] bg-cream-200">
                      {s.image && <Image src={s.image.card} alt={s.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />}
                      <span className="absolute left-4 top-4 grid size-11 place-items-center rounded-xl bg-navy-900 text-gold-300"><Icon className="size-5" /></span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-navy-900">{s.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-500">{s.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {b2b.steps.length > 0 && (
        <section className="bg-navy-silk py-20 text-cream-50">
          <Container>
            <SectionHeading tone="dark" eyebrow="Quy trình" title={`${b2b.steps.length} bước đặt hàng B2B & xuất hoá đơn GTGT`} />
            <ol className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-5">
              {b2b.steps.map((s, i) => {
                const Icon = stepIcons[i % stepIcons.length];
                return (
                  <li key={s.title} className="relative">
                    <span className="grid size-14 place-items-center rounded-full bg-gold-gradient text-navy-900 shadow-gold"><Icon className="size-6" /></span>
                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">Bước {i + 1}</p>
                    <h3 className="mt-1 text-xl font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-cream-200/80">{s.description}</p>
                  </li>
                );
              })}
            </ol>
            <p className="mt-10 flex items-center gap-2 text-sm text-cream-200/80"><Receipt className="size-4 text-gold-400" /> Hoá đơn GTGT điện tử được gửi qua email trong 3 ngày làm việc sau khi giao hàng.</p>
          </Container>
        </section>
      )}

      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading align="left" eyebrow="Báo giá sỉ" title="Gửi yêu cầu, nhận đề xuất trong 24 giờ" description="Đội ngũ tư vấn nhận thông báo ngay qua Zalo / Email và liên hệ lại với bạn." />
            <div className="mt-8 grid grid-cols-2 gap-4">
              {getFeatured(products, 2).map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          </div>
          <div className="lg:col-span-7"><Suspense><QuoteForm note={b2b.quoteNote} /></Suspense></div>
        </Container>
      </section>
    </>
  );
}
