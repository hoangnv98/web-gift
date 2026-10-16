import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, MapPin, Phone, Clock, MessageCircle, Building2 } from "lucide-react";
import { getB2B, getSettings } from "@/lib/cms";
import { Container } from "@/components/ui/container";
import { QuoteForm } from "@/components/b2b/quote-form";
import { PageHero } from "@/components/ui/page-hero";

export const metadata: Metadata = { title: "Liên hệ & báo giá", description: "Liên hệ T&Q GIFT để nhận báo giá quà tặng doanh nghiệp. Phản hồi trong 24 giờ.", alternates: { canonical: "/lien-he" } };

export default async function ContactPage() {
  const [site, b2b] = await Promise.all([getSettings(), getB2B()]);
  return (
    <>
      <PageHero eyebrow="Liên hệ" title="Nhận tư vấn &" highlight="báo giá doanh nghiệp" text="Để lại thông tin, đội ngũ tư vấn sẽ phản hồi trong 24 giờ làm việc." image="handingGift" />
      <Container className="grid gap-12 py-14 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-5">
          <ul className="space-y-5 text-sm">
            <Info icon={Building2} label="Đơn vị" value={site.company.legalName} />
            <Info icon={Phone} label="Hotline" value={site.hotline} href={site.hotlineHref} />
            {site.zalo && <Info icon={MessageCircle} label="Zalo" value="Chat với tư vấn viên" href={site.zalo} />}
            {site.email && <Info icon={Mail} label="Email" value={site.email} href={`mailto:${site.email}`} />}
            <Info icon={MapPin} label="Địa chỉ" value={site.company.address} />
            {site.hours && <Info icon={Clock} label="Giờ làm việc" value={site.hours} />}
          </ul>
        </div>
        <div className="lg:col-span-7"><Suspense><QuoteForm note={b2b.quoteNote} /></Suspense></div>
      </Container>
    </>
  );
}

function Info({ icon: Icon, label, value, href }: { icon: React.ElementType; label: string; value: string; href?: string }) {
  const content = (
    <>
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-navy-900 text-gold-300"><Icon className="size-5" /></span>
      <span><span className="block text-xs font-semibold uppercase tracking-wider text-ink-400">{label}</span><span className="mt-0.5 block font-medium text-navy-900">{value}</span></span>
    </>
  );
  return <li>{href ? <a href={href} className="flex items-center gap-4 hover:text-ruby-700">{content}</a> : <div className="flex items-center gap-4">{content}</div>}</li>;
}
