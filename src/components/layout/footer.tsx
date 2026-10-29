import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, Clock, ShieldCheck, BadgeCheck, Landmark, MessageCircle, FileText } from "lucide-react";
import { getNavigation, getPolicies, getSettings } from "@/lib/cms";
import { COMPANY, REQUIRED_POLICIES } from "@/lib/company";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";

export async function Footer() {
  const [site, policies, navigation] = await Promise.all([getSettings(), getPolicies(), getNavigation()]);
  const { company } = site;

  // Luôn có đủ 4 chính sách bắt buộc; các chính sách khác trong CMS (bật "hiện ở footer") xếp sau.
  const cmsPolicies = policies.filter((p) => p.showInFooter);
  const footerPolicies = [
    ...REQUIRED_POLICIES.map((r) => ({ slug: r.slug, title: cmsPolicies.find((p) => p.slug === r.slug)?.title ?? r.title })),
    ...cmsPolicies.filter((p) => !REQUIRED_POLICIES.some((r) => r.slug === p.slug)),
  ];

  return (
    <footer className="mt-24 bg-navy-900 text-cream-200">
      <div className="h-1 w-full bg-gold-gradient" />
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo tone="dark" name={site.name} tagline={site.tagline} />
          <p className="mt-5 text-sm font-semibold text-gold-300">{company.legalName}</p>
          <dl className="mt-4 space-y-3 text-sm text-cream-200/80">
            <InfoRow icon={FileText} label="Mã số thuế">{company.taxCode}</InfoRow>
            <InfoRow icon={MapPin} label="Địa chỉ" top>{company.address}</InfoRow>
            <InfoRow icon={Landmark} label="Tài khoản ngân hàng">{company.bank.account} – {company.bank.name}</InfoRow>
            <InfoRow icon={Phone} label="Hotline"><a href={site.hotlineHref} className="hover:text-gold-300">{site.hotline}</a></InfoRow>
            {site.email && <InfoRow icon={Mail} label="Email"><a href={`mailto:${site.email}`} className="hover:text-gold-300">{site.email}</a></InfoRow>}
            {site.hours && <InfoRow icon={Clock} label="Giờ làm việc">{site.hours}</InfoRow>}
          </dl>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href={site.hotlineHref} className="inline-flex h-11 items-center gap-2 rounded-full bg-ruby-700 px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-ruby-600" aria-label={`Gọi hotline ${site.hotline}`}>
              <Phone className="size-4" /> Gọi {site.hotline}
            </a>
            <a href={site.zalo} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full bg-[#0068ff] px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-110" aria-label="Chat Zalo với tư vấn viên">
              <MessageCircle className="size-4" /> Chat Zalo
            </a>
          </div>
        </div>

        <FooterColumn title="Sản phẩm" className="lg:col-span-2">
          <FooterLink href="/catalogue">Catalogue online</FooterLink>
          <FooterLink href="/catalogue?nhom=hop-qua-tet">Hộp quà Tết</FooterLink>
          <FooterLink href="/catalogue?nhom=gio-qua-tet">Giỏ quà Tết</FooterLink>
          <FooterLink href="/catalogue?nhom=trung-thu">Quà Trung Thu</FooterLink>
          <FooterLink href="/catalogue?nhom=su-kien">Quà sự kiện</FooterLink>
          <FooterLink href="/qua-doanh-nghiep">Quà doanh nghiệp</FooterLink>
          {navigation.footerLinks.map((l) => <FooterLink key={l.href} href={l.href}>{l.label}</FooterLink>)}
        </FooterColumn>

        <FooterColumn title="Chính sách" className="lg:col-span-3">
          {footerPolicies.map((p) => (
            <FooterLink key={p.slug} href={`/chinh-sach/${p.slug}`}>{p.title}</FooterLink>
          ))}
        </FooterColumn>

        <div className="lg:col-span-3">
          <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">Bản đồ</h3>
          <div className="mt-5 overflow-hidden rounded-xl border border-gold-500/30 bg-white/5">
            <iframe
              src={COMPANY.mapEmbedUrl}
              title={`Bản đồ đường đến ${company.legalName}`}
              className="block aspect-[4/3] w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>

          <h3 className="mt-8 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">Chứng nhận</h3>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={site.bctUrl || "http://online.gov.vn"} target="_blank" rel="noopener noreferrer" className="flex h-14 w-40 items-center gap-2 rounded-lg border border-dashed border-gold-500/50 bg-white/5 px-3 text-left text-[11px] leading-tight text-cream-200/80 hover:bg-white/10">
              {site.bctBadge ? <Image src={site.bctBadge.card} alt={site.bctBadge.alt} width={140} height={48} className="h-10 w-auto object-contain" /> : <><ShieldCheck className="size-6 shrink-0 text-gold-400" />Đã thông báo Bộ Công Thương</>}
            </a>
            {site.dmcaUrl ? (
              <a href={site.dmcaUrl} target="_blank" rel="noopener noreferrer" className="flex h-14 w-40 items-center gap-2 rounded-lg border border-dashed border-gold-500/50 bg-white/5 px-3 text-[11px] leading-tight text-cream-200/80 hover:bg-white/10"><BadgeCheck className="size-6 shrink-0 text-gold-400" />DMCA Protected</a>
            ) : (
              <div className="flex h-14 w-40 items-center gap-2 rounded-lg border border-dashed border-gold-500/50 bg-white/5 px-3 text-[11px] leading-tight text-cream-200/80"><BadgeCheck className="size-6 shrink-0 text-gold-400" />DMCA Protected</div>
            )}
          </div>
          <p className="mt-5 text-xs leading-relaxed text-cream-200/60">{site.name} không bán rượu cho người dưới 18 tuổi và phụ nữ đang mang thai.</p>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream-200/60 sm:flex-row">
          <p>© {site.copyrightYear} {company.legalName}. Giá chưa bao gồm VAT.</p>
          <p className="font-display italic text-gold-300/80">{site.slogan}</p>
        </Container>
      </div>
    </footer>
  );
}

function InfoRow({ icon: Icon, label, top = false, children }: { icon: React.ElementType; label: string; top?: boolean; children: React.ReactNode }) {
  return (
    <div className={`flex gap-3 ${top ? "items-start" : "items-center"}`}>
      <Icon className={`size-4 shrink-0 text-gold-400 ${top ? "mt-0.5" : ""}`} aria-hidden />
      <dt className="sr-only">{label}</dt>
      <dd><span className="text-cream-200/60">{label}: </span><span className="text-cream-100">{children}</span></dd>
    </div>
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
