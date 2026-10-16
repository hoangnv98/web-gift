import type { Metadata } from "next";
import Image from "next/image";
import { FileText, PenTool, Stamp, Zap, ClipboardCheck, PackageCheck, Truck, Receipt } from "lucide-react";
import { unsplash, img } from "@/lib/images";
import { homeSettings } from "@/data/settings";
import { getFeatured } from "@/data/catalogue";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/ui/page-hero";
import { QuoteForm } from "@/components/b2b/quote-form";
import { ProductCard } from "@/components/catalogue/product-card";
import { GoldenCommitments } from "@/components/home/sections";

export const metadata: Metadata = { title: "Quà tặng doanh nghiệp B2B", description: "Chiết khấu theo số lượng, in/ép kim/khắc laser logo, quy trình 5 bước, xuất hoá đơn GTGT.", alternates: { canonical: "/qua-doanh-nghiep" } };

const services = [
  { icon: PenTool, title: "In logo & thiệp chúc", text: "In offset / in UV logo và lời chúc lên thiệp, tem dán hộp. Miễn phí với mọi đơn B2B.", image: "kraftPinkRibbon" as const },
  { icon: Stamp, title: "Ép kim logo lên hộp", text: "Ép kim nóng vàng / bạc / đồng lên hộp giấy mỹ thuật, hộp da. Sắc nét, sang trọng.", image: "goldBows" as const },
  { icon: Zap, title: "Khắc laser hộp gỗ", text: "Khắc laser logo, tên doanh nghiệp lên nắp hộp gỗ, giỏ gỗ, bình giữ nhiệt, bút ký.", image: "darkLuxuryGifts" as const },
];

const steps = [
  { icon: FileText, title: "Gửi yêu cầu", text: "Điền form hoặc gọi hotline. Cho chúng tôi biết số lượng, ngân sách và dịp tặng." },
  { icon: ClipboardCheck, title: "Nhận đề xuất & mock-up", text: "Trong 24 giờ: 3–5 mẫu phù hợp, bảng giá chiết khấu, mock-up thiệp & tem logo." },
  { icon: PenTool, title: "Ký hợp đồng, đặt cọc", text: "Chốt mẫu, số lượng, lịch giao. Đặt cọc 50% để khoá lịch sản xuất." },
  { icon: PackageCheck, title: "Sản xuất & kiểm tra", text: "Đóng gói theo tiêu chuẩn, chụp ảnh báo cáo từng lô trước khi niêm phong." },
  { icon: Truck, title: "Giao hàng & xuất hoá đơn", text: "Giao tận văn phòng hoặc từng người nhận. Xuất hoá đơn GTGT theo thông tin doanh nghiệp." },
];

export default function B2BPage() {
  return (
    <>
      <PageHero eyebrow="Giải pháp quà tặng B2B" title="Quà tặng doanh nghiệp" highlight="chiết khấu theo số lượng" text="Một đầu mối cho toàn bộ mùa quà của doanh nghiệp: tư vấn, thiết kế thương hiệu, sản xuất, giao hàng và hoá đơn." cta={{ label: "Đăng ký báo giá sỉ", href: "#bao-gia" }} image="handingGift" />
      <GoldenCommitments />

      {/* Discount table */}
      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Chính sách chiết khấu" title="Càng nhiều, càng ưu đãi" description="Áp dụng trên giá niêm yết chưa VAT. Mức chiết khấu mẫu, chính thức theo báo giá từng đơn." />
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
                {homeSettings.b2bDiscounts.map((d) => (
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

      {/* Branding services */}
      <section className="bg-cream-100 py-20">
        <Container>
          <SectionHeading eyebrow="Cá nhân hoá thương hiệu" title="In · Ép kim · Khắc laser logo doanh nghiệp" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.map((s) => (
              <article key={s.title} className="overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-navy-900/5">
                <div className="relative aspect-[4/3]">
                  <Image src={unsplash(img[s.image], 800, 600)} alt={s.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                  <span className="absolute left-4 top-4 grid size-11 place-items-center rounded-xl bg-navy-900 text-gold-300"><s.icon className="size-5" /></span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{s.text}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* 5 steps */}
      <section className="bg-navy-silk py-20 text-cream-50">
        <Container>
          <SectionHeading tone="dark" eyebrow="Quy trình" title="5 bước đặt hàng B2B & xuất hoá đơn GTGT" />
          <ol className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-5">
            {steps.map((s, i) => (
              <li key={s.title} className="relative">
                <span className="grid size-14 place-items-center rounded-full bg-gold-gradient text-navy-900 shadow-gold"><s.icon className="size-6" /></span>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">Bước {i + 1}</p>
                <h3 className="mt-1 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream-200/80">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 flex items-center gap-2 text-sm text-cream-200/80"><Receipt className="size-4 text-gold-400" /> Hoá đơn GTGT điện tử được gửi qua email trong 3 ngày làm việc sau khi giao hàng.</p>
        </Container>
      </section>

      {/* Featured + Form */}
      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading align="left" eyebrow="Báo giá sỉ" title="Gửi yêu cầu, nhận đề xuất trong 24 giờ" description="Đội ngũ tư vấn nhận thông báo ngay qua Zalo / Email và liên hệ lại với bạn." />
            <div className="mt-8 grid grid-cols-2 gap-4">
              {getFeatured(2).map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          </div>
          <div className="lg:col-span-7"><QuoteForm /></div>
        </Container>
      </section>
    </>
  );
}
