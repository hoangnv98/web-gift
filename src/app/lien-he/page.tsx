import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, MapPin, Phone, Clock, MessageCircle, Globe, Truck, Headset, FileText, Landmark, ExternalLink } from "lucide-react";
import { getB2B, getSettings, siteUrl } from "@/lib/cms";
import { COMPANY } from "@/lib/company";
import { Container } from "@/components/ui/container";
import { QuoteForm } from "@/components/b2b/quote-form";

export const metadata: Metadata = { title: "Liên hệ & báo giá", description: "Liên hệ T&Q GIFT – showroom tại Từ Sơn, Bắc Ninh. Hotline, Zalo, email và bản đồ chỉ đường. Nhận báo giá quà tặng doanh nghiệp trong 24 giờ.", alternates: { canonical: "/lien-he" } };

/** Trang liên hệ: bản đồ lớn → cửa hàng / văn phòng → thông tin liên hệ nhanh → form báo giá. */
export default async function ContactPage() {
  const [site, b2b] = await Promise.all([getSettings(), getB2B()]);
  const { company } = site;
  const website = siteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <>
      {/* Tiêu đề chỉ dành cho SEO / trình đọc màn hình; bản đồ nằm ngay trên đầu trang như trang tham khảo */}
      <h1 className="sr-only">Liên hệ {site.name}</h1>

      {/* Bản đồ chỉ đường – full width */}
      <div className="w-full bg-cream-200">
        <iframe
          src={COMPANY.mapEmbedUrl}
          title={`Bản đồ đường đến ${company.legalName}`}
          className="block h-[360px] w-full border-0 sm:h-[440px] lg:h-[500px]"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>

      <Container className="grid gap-12 py-14 lg:grid-cols-12 lg:gap-16 lg:py-20">
        <div className="lg:col-span-7">
          {/* Cửa hàng / văn phòng */}
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-ink-400">Thương hiệu thuộc {company.legalName}</p>
          <SectionTitle>Cửa hàng quà tặng {site.name}</SectionTitle>

          <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-navy-900/5">
            <div className="flex items-center gap-3 border-b border-cream-300 bg-cream-50 px-5 py-4">
              <span className="grid size-9 place-items-center rounded-lg bg-navy-900 text-gold-300"><MapPin className="size-4" /></span>
              <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-navy-900">{site.name} – Từ Sơn, Bắc Ninh</h3>
            </div>
            <dl className="divide-y divide-cream-200 px-5 text-sm">
              <Row icon={MapPin} label="Địa chỉ">{company.address}</Row>
              <Row icon={Phone} label="Phone"><a href={site.hotlineHref} className="font-semibold text-ruby-700 hover:underline">{site.hotline}</a></Row>
              <Row icon={MessageCircle} label="Zalo"><a href={site.zalo} target="_blank" rel="noopener noreferrer" className="font-semibold text-ruby-700 hover:underline">Chat Zalo với tư vấn viên</a></Row>
              {site.email && <Row icon={Mail} label="Email"><a href={`mailto:${site.email}`} className="hover:text-ruby-700">{site.email}</a></Row>}
              <Row icon={Globe} label="Website"><a href={siteUrl} className="hover:text-ruby-700">{website}</a></Row>
              {site.hours && <Row icon={Clock} label="Giờ làm việc">{site.hours}</Row>}
              <Row icon={FileText} label="Mã số thuế">{company.taxCode}</Row>
              <Row icon={Landmark} label="Tài khoản">{company.bank.account} – {company.bank.name}</Row>
            </dl>
          </div>

          {/* Thông tin liên hệ nhanh */}
          <SectionTitle className="mt-14">Thông tin liên hệ</SectionTitle>
          <ul className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <Tile icon={Mail} title="Liên hệ">
              <a href={site.hotlineHref} className="block hover:text-ruby-700">Tel: {site.hotline}</a>
              {site.email && <a href={`mailto:${site.email}`} className="block hover:text-ruby-700">E-mail: {site.email}</a>}
            </Tile>
            <Tile icon={Headset} title="Hỗ trợ khách hàng">{site.hours || "Thứ 2 – Thứ 7, 8:00 – 18:00"}</Tile>
            <Tile icon={MapPin} title="Địa chỉ">{company.address}</Tile>
            <Tile icon={Truck} title="Giao hàng toàn quốc">Đóng gói kỹ, giao đúng hẹn tới doanh nghiệp và cá nhân.</Tile>
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={site.zalo} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full bg-[#0068ff] px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-110"><MessageCircle className="size-4" /> Chat Zalo</a>
            <a href={site.hotlineHref} className="inline-flex h-11 items-center gap-2 rounded-full bg-ruby-700 px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-ruby-600"><Phone className="size-4" /> Gọi {site.hotline}</a>
            {site.social.map((s) => (
              <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full bg-navy-900 px-5 text-sm font-semibold text-cream-50 transition hover:-translate-y-0.5 hover:bg-ruby-700">
                <ExternalLink className="size-4" /> {socialLabel[s.platform] ?? s.platform}
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5"><Suspense><QuoteForm note={b2b.quoteNote} /></Suspense></div>
      </Container>
    </>
  );
}

const socialLabel: Record<string, string> = { facebook: "Facebook", instagram: "Instagram", linkedin: "LinkedIn", youtube: "YouTube", tiktok: "TikTok", shopee: "Shopee", zalo: "Zalo" };

function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`mt-2 flex items-center gap-4 text-2xl font-semibold text-navy-900 after:h-px after:flex-1 after:bg-cream-300 ${className}`}>
      {children}
    </h2>
  );
}

function Row({ icon: Icon, label, children }: { icon: React.ElementType; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 py-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-ruby-700" aria-hidden />
      <dt className="w-24 shrink-0 font-medium text-ink-500">{label}:</dt>
      <dd className="min-w-0 text-navy-900">{children}</dd>
    </div>
  );
}

function Tile({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-4">
      <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-navy-900 text-gold-300"><Icon className="size-5" /></span>
      <div className="text-sm">
        <p className="font-semibold text-navy-900">{title}</p>
        <div className="mt-1 leading-relaxed text-ink-500">{children}</div>
      </div>
    </li>
  );
}
