import Link from "next/link";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { site } from "@/data/site";
import { categories, materials } from "@/data/catalogue";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer className="mt-24 bg-ink-900 text-cream-200">
      <div className="h-1 w-full bg-[linear-gradient(90deg,#866819,#c9a227,#f0dfa0,#c9a227,#866819)]" />
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo tone="dark" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream-300/70">
            {site.description}
          </p>
          <div className="mt-6 space-y-3 text-sm">
            <a href={site.hotlineHref} className="flex items-center gap-3 hover:text-gold-300">
              <Phone className="size-4 text-gold-400" /> {site.hotline}
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-gold-300">
              <Mail className="size-4 text-gold-400" /> {site.email}
            </a>
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold-400" /> {site.address}
            </p>
            <p className="flex items-center gap-3">
              <Clock className="size-4 text-gold-400" /> {site.hours}
            </p>
          </div>
        </div>

        <FooterColumn title="Danh mục" className="lg:col-span-2">
          {categories.map((c) => (
            <FooterLink key={c.id} href={`/catalogue?category=${c.id}`}>
              {c.name}
            </FooterLink>
          ))}
          <FooterLink href="/catalogue">Tất cả sản phẩm</FooterLink>
        </FooterColumn>

        <FooterColumn title="Chất liệu" className="lg:col-span-3">
          {materials.map((m) => (
            <FooterLink key={m.id} href={`/catalogue?material=${m.id}`}>
              {m.name}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Hỗ trợ" className="lg:col-span-3">
          <FooterLink href="/lien-he">Nhận báo giá doanh nghiệp</FooterLink>
          <FooterLink href="/lien-he">Thiết kế quà theo yêu cầu</FooterLink>
          <FooterLink href="/lien-he">Chính sách giao hàng</FooterLink>
          <FooterLink href="/lien-he">Chính sách đổi trả</FooterLink>
        </FooterColumn>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream-300/60 sm:flex-row">
          <p>© {site.copyrightYear} {site.name}. Giá chưa bao gồm VAT.</p>
          <p className="font-display italic text-gold-300/80">Chúc mừng năm mới · An khang thịnh vượng</p>
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
      <Link href={href} className="text-cream-300/75 transition-colors hover:text-cream-50">
        {children}
      </Link>
    </li>
  );
}
