import Link from "next/link";
import { Mail, MapPin, Phone, Clock, ShieldCheck, BadgeCheck } from "lucide-react";
import { site } from "@/data/site";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer className="mt-24 bg-navy-900 text-cream-200">
      <div className="h-1 w-full bg-gold-gradient" />
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo tone="dark" />
          <p className="mt-5 text-sm font-semibold text-gold-300">{site.company.legalName}</p>
          <div className="mt-4 space-y-3 text-sm text-cream-200/80">
            <p className="flex items-start gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-gold-400" />{site.company.address}</p>
            <p className="flex items-center gap-3"><BadgeCheck className="size-4 text-gold-400" />Người đại diện: {site.company.representative}</p>
            <a href={site.hotlineHref} className="flex items-center gap-3 hover:text-gold-300"><Phone className="size-4 text-gold-400" />Điện thoại: {site.company.phone}</a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-gold-300"><Mail className="size-4 text-gold-400" />{site.email}</a>
            <p className="flex items-center gap-3"><Clock className="size-4 text-gold-400" />{site.hours}</p>
          </div>
        </div>

        <FooterColumn title="Sản phẩm" className="lg:col-span-2">
          <FooterLink href="/catalogue">Catalogue online</FooterLink>
          <FooterLink href="/catalogue?nhom=hop-qua-tet">Hộp quà Tết</FooterLink>
          <FooterLink href="/catalogue?nhom=gio-qua-tet">Giỏ quà Tết</FooterLink>
          <FooterLink href="/catalogue?nhom=trung-thu">Quà Trung Thu</FooterLink>
          <FooterLink href="/catalogue?nhom=su-kien">Quà sự kiện</FooterLink>
          <FooterLink href="/qua-doanh-nghiep">Quà doanh nghiệp</FooterLink>
        </FooterColumn>

        <FooterColumn title="Chính sách" className="lg:col-span-3">
          {site.policies.map((p) => (
            <FooterLink key={p.slug} href={`/chinh-sach/${p.slug}`}>{p.label}</FooterLink>
          ))}
        </FooterColumn>

        <div className="lg:col-span-3">
          <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">Chứng nhận</h3>
          <div className="mt-5 flex flex-wrap gap-3">
            {/* Thay 2 ô này bằng logo chính thức sau khi hoàn tất thông báo với Bộ Công Thương và đăng ký DMCA */}
            <a href="http://online.gov.vn" target="_blank" rel="noopener noreferrer" className="flex h-14 w-40 items-center gap-2 rounded-lg border border-dashed border-gold-500/50 bg-white/5 px-3 text-left text-[11px] leading-tight text-cream-200/80 hover:bg-white/10">
              <ShieldCheck className="size-6 shrink-0 text-gold-400" />Đã thông báo Bộ Công Thương
            </a>
            <div className="flex h-14 w-40 items-center gap-2 rounded-lg border border-dashed border-gold-500/50 bg-white/5 px-3 text-[11px] leading-tight text-cream-200/80">
              <BadgeCheck className="size-6 shrink-0 text-gold-400" />DMCA Protected
            </div>
          </div>
          <p className="mt-5 text-xs leading-relaxed text-cream-200/60">
            {site.name} không bán rượu cho người dưới 18 tuổi và phụ nữ đang mang thai.
          </p>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream-200/60 sm:flex-row">
          <p>© {site.copyrightYear} {site.company.legalName}. Giá chưa bao gồm VAT.</p>
          <p className="font-display italic text-gold-300/80">{site.slogan}</p>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">{title}</h3>
      <ul className="mt-5 space-y-3 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-cream-200/75 transition-colors hover:text-gold-300">{children}</Link>
    </li>
  );
}
