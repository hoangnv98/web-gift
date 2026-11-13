import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Download, FileCheck2, Landmark, MessageCircle, Phone, ReceiptText } from "lucide-react";
import { COMPANY } from "@/lib/company";
import { getB2B, getCategories, getHomePage, getMaterials, getProducts, getSettings, siteUrl } from "@/lib/cms";
import { commitments } from "@/components/home/sections";
import { Container } from "@/components/ui/container";
import { Eyebrow, H2, Emph, GhostLink } from "@/components/ui/editorial";
import { CopyCompanyInfo } from "@/components/profile/copy-info";
import { unsplash, img } from "@/lib/images";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSettings();
  return {
    title: `Hồ sơ năng lực ${site.name} – Company Profile`,
    description: `Hồ sơ năng lực ${site.company.legalName}: thông tin pháp lý, năng lực cung ứng quà tặng doanh nghiệp, chính sách chiết khấu, quy trình và chứng từ cho bộ phận Mua hàng, HR, Công đoàn và doanh nghiệp FDI.`,
    alternates: { canonical: "/ho-so-nang-luc" },
  };
}

/*
 * Hồ sơ năng lực (Company Profile) cho khách doanh nghiệp / FDI: đủ thông tin để bộ phận Purchasing
 * đăng ký nhà cung cấp mà không cần hỏi lại. Chỉ dùng dữ liệu thật (company.ts + CMS); phần nào chưa có
 * tư liệu (PDF, logo khách hàng) thì tự ẩn hoặc chuyển sang nút nhận qua Zalo.
 */
export default async function CapabilityProfilePage() {
  const [site, b2b, products, categories, materials, home] = await Promise.all([getSettings(), getB2B(), getProducts(), getCategories(), getMaterials(), getHomePage()]);
  const { company } = site;
  const pdf = COMPANY.capabilityProfilePdf;
  const clientLogos = home.partners.logos.filter((l) => l.src); // chỉ logo thật đã upload
  const liveProducts = products.filter((p) => p.availability !== "het-hang");
  const topDiscount = b2b.discounts.at(-1);

  const info: { vi: string; en: string; value: string; href?: string }[] = [
    { vi: "Tên doanh nghiệp", en: "Company name", value: company.legalName },
    { vi: "Thương hiệu", en: "Brand", value: site.name },
    { vi: "Mã số thuế", en: "Tax code", value: company.taxCode },
    { vi: "Địa chỉ trụ sở", en: "Registered address", value: company.address },
    ...(company.representative ? [{ vi: "Người đại diện", en: "Legal representative", value: company.representative }] : []),
    { vi: "Hotline / Zalo", en: "Phone", value: site.hotline, href: site.hotlineHref },
    ...(site.email ? [{ vi: "Email", en: "Email", value: site.email, href: `mailto:${site.email}` }] : []),
    { vi: "Tài khoản ngân hàng", en: "Bank account", value: `${company.bank.account} – ${company.bank.name}` },
    ...(site.hours ? [{ vi: "Giờ làm việc", en: "Working hours", value: site.hours }] : []),
    { vi: "Website", en: "Website", value: siteUrl.replace(/^https?:\/\//, ""), href: siteUrl },
  ];
  const copyText = info.map((r) => `${r.vi} (${r.en}): ${r.value}`).join("\n");

  const facts = [
    { value: String(liveProducts.length), label: "set quà trong catalogue" },
    { value: String(materials.length), label: "chất liệu hộp quà" },
    ...(topDiscount ? [{ value: topDiscount.discount, label: `chiết khấu từ ${topDiscount.from} phần quà` }] : []),
    { value: "VAT", label: "hoá đơn GTGT điện tử" },
  ];

  const documents = [
    { icon: Landmark, title: "Giấy chứng nhận đăng ký doanh nghiệp", text: `MST ${company.taxCode} – ${company.legalName}.` },
    { icon: ReceiptText, title: "Hoá đơn GTGT điện tử", text: "Xuất cho từng đơn hàng, gửi qua email sau khi giao hàng." },
    { icon: FileCheck2, title: "Hồ sơ công bố sản phẩm", text: "Cung cấp kèm đơn hàng thực phẩm, đồ uống theo yêu cầu kiểm duyệt nội bộ." },
    { icon: BadgeCheck, title: "Chứng nhận xuất xứ", text: "Chứng từ nguồn gốc cho hàng nhập khẩu (rượu vang, bánh kẹo…)." },
  ];

  const PrimaryCta = pdf ? (
    <a href={pdf} download className="inline-flex items-center justify-center gap-2 bg-white px-8 py-3.5 text-[13px] font-medium uppercase tracking-[0.1em] text-navy-900 transition-colors hover:bg-gold-300">
      <Download className="size-4" /> Tải hồ sơ năng lực (PDF)
    </a>
  ) : (
    <a href={site.zalo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-white px-8 py-3.5 text-[13px] font-medium uppercase tracking-[0.1em] text-navy-900 transition-colors hover:bg-gold-300">
      <MessageCircle className="size-4" /> Nhận hồ sơ (PDF) qua Zalo
    </a>
  );

  return (
    <>
      {/* Banner */}
      <section className="relative isolate overflow-hidden bg-navy-900 py-20 text-white lg:py-28">
        <Image src={unsplash(img.darkLuxuryGifts, 1920, 1080)} alt="" fill preload sizes="100vw" className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-900/85 to-navy-900/95" />
        <Container>
          <Eyebrow className="mb-6 border-b border-white/40 pb-2 text-white/85">Hồ sơ năng lực · Company Profile</Eyebrow>
          <h1 className="max-w-4xl text-balance text-[2.25rem] font-light leading-[1.1] tracking-[-0.02em] sm:text-5xl lg:text-[3.45rem]">
            Hồ sơ năng lực <Emph dark>{site.name}</Emph>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg font-light leading-relaxed text-white/80">
            Thông tin pháp lý, năng lực cung ứng, chính sách và quy trình làm việc dành cho bộ phận Mua hàng (Purchasing), Nhân sự (HR), Công đoàn và doanh nghiệp FDI.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            {PrimaryCta}
            <Link href="/qua-doanh-nghiep#bao-gia" className="inline-flex items-center justify-center border border-white/40 px-8 py-3.5 text-[13px] font-medium uppercase tracking-[0.1em] text-white transition-colors hover:border-white hover:bg-white hover:text-navy-900">Yêu cầu báo giá</Link>
          </div>
          <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden border border-white/15 bg-white/15 lg:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} className="bg-navy-900/80 px-5 py-6">
                <dt className="sr-only">{f.label}</dt>
                <dd className="text-3xl font-light text-gold-300">{f.value}</dd>
                <dd className="mt-1 text-xs uppercase tracking-[0.15em] text-white/60">{f.label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* 01 – Thông tin doanh nghiệp */}
      <section className="bg-white py-24 md:py-28">
        <Container className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
          <div>
            <SectionNo n="01" label="Company information" />
            <H2 className="mt-4">Thông tin <Emph>doanh nghiệp</Emph></H2>
            <p className="mt-6 text-[1.0625rem] leading-[1.7] text-ink-700">
              Đầy đủ thông tin để đăng ký nhà cung cấp (vendor registration). Bấm sao chép để dán nhanh vào biểu mẫu nội bộ của doanh nghiệp bạn.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CopyCompanyInfo text={copyText} />
            </div>
          </div>
          <dl className="divide-y divide-ink-200 border-y border-ink-200">
            {info.map((r) => (
              <div key={r.vi} className="grid gap-1 py-4 sm:grid-cols-[220px_1fr] sm:gap-6">
                <dt>
                  <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-ink-500">{r.vi}</span>
                  <span className="block text-xs italic text-ink-400">{r.en}</span>
                </dt>
                <dd className="text-[1.0625rem] text-navy-900">{r.href ? <a href={r.href} className="hover:text-gold-700">{r.value}</a> : r.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* 02 – Năng lực cung ứng */}
      <section className="bg-navy-50/60 py-24 md:py-28">
        <Container>
          <div className="mb-14 max-w-3xl">
            <SectionNo n="02" label="Capabilities" />
            <H2 className="mt-4">Năng lực <Emph>cung ứng</Emph></H2>
            <p className="mt-6 text-[1.0625rem] leading-[1.7] text-ink-700">
              Danh mục {categories.length} nhóm quà (Tết, Trung Thu, dịp lễ & sự kiện), {liveProducts.length} set quà có sẵn trong catalogue online, cập nhật giá và thành phần theo thời gian thực.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {commitments.map((c) => (
              <article key={c.title} className="relative border border-ink-200 bg-white px-7 py-10">
                <span className="absolute left-7 top-0 h-px w-8 bg-navy-900" />
                <span className="mb-6 grid size-[52px] place-items-center rounded-full border border-navy-900 text-navy-900"><c.icon className="size-5" strokeWidth={1.5} /></span>
                <h3 className="text-xl font-normal leading-snug text-navy-900">{c.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-[1.7] text-ink-700">{c.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* 03 – Cá nhân hoá thương hiệu */}
      {b2b.services.length > 0 && (
        <section className="bg-white py-24 md:py-28">
          <Container>
            <div className="mb-14 max-w-3xl">
              <SectionNo n="03" label="Branding services" />
              <H2 className="mt-4">Cá nhân hoá <Emph>thương hiệu</Emph></H2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {b2b.services.map((s) => (
                <article key={s.title} className="border-t border-navy-900">
                  <div className="relative mt-6 aspect-[4/3] overflow-hidden bg-cream-200">
                    {s.image && <Image src={s.image.card} alt={s.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />}
                  </div>
                  <h3 className="mt-6 text-xl font-normal text-navy-900">{s.title}</h3>
                  {s.description && <p className="mt-3 text-[0.9375rem] leading-[1.7] text-ink-700">{s.description}</p>}
                </article>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 04 – Chính sách chiết khấu */}
      {b2b.discounts.length > 0 && (
        <section className="bg-navy-50/60 py-24 md:py-28">
          <Container className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
            <div>
              <SectionNo n="04" label="Volume pricing" />
              <H2 className="mt-4">Chính sách <Emph>chiết khấu</Emph></H2>
              <p className="mt-6 text-[1.0625rem] leading-[1.7] text-ink-700">Áp dụng trên giá niêm yết chưa VAT. Mức chiết khấu chính thức theo báo giá từng đơn hàng.</p>
              <GhostLink href="/qua-doanh-nghiep#chiet-khau" className="mt-6">Chi tiết chính sách B2B</GhostLink>
            </div>
            <div className="overflow-x-auto border border-ink-200 bg-white">
              <table className="w-full min-w-[480px] text-left text-[0.9375rem]">
                <thead className="whitespace-nowrap border-b border-ink-200 text-[11px] uppercase tracking-[0.2em] text-ink-500">
                  <tr><th className="px-5 py-4 font-medium">Số lượng</th><th className="px-5 py-4 font-medium">Chiết khấu</th><th className="px-5 py-4 font-medium">Ưu đãi kèm theo</th></tr>
                </thead>
                <tbody className="divide-y divide-ink-200">
                  {b2b.discounts.map((d) => (
                    <tr key={d.from}>
                      <td className="whitespace-nowrap px-5 py-4 text-navy-900">{d.to ? `${d.from} – ${d.to}` : `${d.from}+`} phần quà</td>
                      <td className="px-5 py-4 text-xl font-light text-gold-700">{d.discount}</td>
                      <td className="px-5 py-4 text-ink-700">{d.perk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        </section>
      )}

      {/* 05 – Quy trình & chứng từ */}
      <section className="bg-white py-24 md:py-28">
        <Container>
          <div className="mb-14 max-w-3xl">
            <SectionNo n="05" label="Process & documents" />
            <H2 className="mt-4">Quy trình &amp; <Emph>chứng từ</Emph></H2>
          </div>
          {b2b.steps.length > 0 && (
            <ol className="grid gap-px overflow-hidden border border-ink-200 bg-ink-200 md:grid-cols-2 lg:grid-cols-5">
              {b2b.steps.map((s, i) => (
                <li key={s.title} className="bg-white p-6">
                  <p className="text-xs tracking-[0.25em] text-gold-700">— {String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 text-lg font-normal leading-snug text-navy-900">{s.title}</h3>
                  {s.description && <p className="mt-2 text-sm leading-[1.7] text-ink-700">{s.description}</p>}
                </li>
              ))}
            </ol>
          )}
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {documents.map((d) => (
              <div key={d.title} className="flex gap-4 border-b border-ink-200 pb-6">
                <d.icon className="mt-1 size-5 shrink-0 text-gold-700" strokeWidth={1.5} />
                <div>
                  <p className="text-lg text-navy-900">{d.title}</p>
                  <p className="mt-1 text-[0.9375rem] leading-[1.7] text-ink-700">{d.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Khách hàng tiêu biểu – chỉ hiện khi đã upload logo thật trong Admin → Trang chủ → Logo đối tác */}
      {clientLogos.length > 0 && (
        <section className="bg-navy-50/60 py-24 md:py-28">
          <Container>
            <div className="mb-14 text-center">
              <Eyebrow className="mb-3 block">Khách hàng tiêu biểu</Eyebrow>
              <H2>Đồng hành cùng <Emph>doanh nghiệp</Emph></H2>
            </div>
            <ul className="grid grid-cols-2 gap-px overflow-hidden border border-ink-200 bg-ink-200 sm:grid-cols-3 lg:grid-cols-5">
              {clientLogos.map((l) => (
                <li key={l.name} className="grid h-28 place-items-center bg-white px-6">
                  <Image src={l.src!} alt={l.name} width={160} height={64} className="max-h-12 w-auto object-contain" />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="bg-navy-900 py-24 text-white md:py-28">
        <Container>
          <div className="mx-auto max-w-[720px] text-center">
            <Eyebrow className="mb-4 block text-white/70">Hồ sơ đầy đủ</Eyebrow>
            <H2 className="mb-6 text-white">Cần hồ sơ để<br /><Emph dark>đăng ký nhà cung cấp?</Emph></H2>
            <p className="mb-12 text-[1.0625rem] text-gold-300">
              Gửi yêu cầu, {site.name} gửi lại hồ sơ năng lực bản PDF kèm báo giá theo số lượng và mẫu thiết kế logo trên hộp quà.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {PrimaryCta}
              <a href={site.hotlineHref} className="inline-flex items-center justify-center gap-2 border border-white/40 px-8 py-3.5 text-[13px] font-medium uppercase tracking-[0.1em] text-white transition-colors hover:border-white hover:bg-white hover:text-navy-900">
                <Phone className="size-4" /> Gọi {site.hotline}
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function SectionNo({ n, label }: { n: string; label: string }) {
  return (
    <p className="flex items-baseline gap-3">
      <span className="text-4xl font-light leading-none text-gold-700">{n}</span>
      <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-ink-500">{label}</span>
    </p>
  );
}
