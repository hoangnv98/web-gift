import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gift, PenLine, ShieldCheck, Truck, Phone, MessageCircle } from "lucide-react";
import { unsplash, img } from "@/lib/images";
import { categories, getFeatured, products } from "@/data/catalogue";
import { site } from "@/data/site";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/catalogue/product-card";

/* ------------------------------ Categories ------------------------------- */
export function CategoryShowcase() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow="Danh mục" title="Chọn dáng quà phù hợp với người nhận" description="Hai dòng sản phẩm chủ đạo, đa dạng chất liệu từ carton ép kim đến sơn mài thủ công." />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {categories.map((c) => {
            const count = products.filter((p) => p.category === c.id).length;
            return (
              <Link
                key={c.id}
                href={`/catalogue?category=${c.id}`}
                className="group relative block aspect-[4/3] overflow-hidden rounded-3xl shadow-card ring-1 ring-ink-900/5 md:aspect-[16/11]"
              >
                <Image src={unsplash(img[c.image], 1200, 900)} alt={c.name} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 text-cream-50 sm:p-9">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">{count} mẫu</p>
                  <h3 className="mt-2 text-3xl font-semibold">{c.name}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-cream-200/85">{c.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold-300 transition-all group-hover:gap-3">
                    Khám phá <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------- Featured -------------------------------- */
export function FeaturedProducts() {
  const items = getFeatured(6);
  return (
    <section className="bg-cream-100 py-20 lg:py-28">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading align="left" eyebrow="Nổi bật" title="Những bộ quà được chọn nhiều nhất" description="Tuyển chọn từ catalogue, phù hợp cho đối tác, khách hàng VIP và tập thể nhân viên." />
          <Button href="/catalogue" variant="outline" className="shrink-0">
            Xem tất cả <ArrowRight className="size-4" />
          </Button>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------- Why us --------------------------------- */
const reasons = [
  { icon: Gift, title: "Sản phẩm tuyển chọn", text: "Rượu vang nhập khẩu chính ngạch, đặc sản Việt Nam có chứng nhận, hạn dùng mới nhất." },
  { icon: PenLine, title: "Cá nhân hoá thương hiệu", text: "In logo, thiệp chúc Tết, dập nổi hoặc khắc laser trên hộp theo bộ nhận diện của bạn." },
  { icon: Truck, title: "Giao hàng toàn quốc", text: "Đóng gói chống sốc, giao tận văn phòng hoặc từng địa chỉ người nhận trên 63 tỉnh thành." },
  { icon: ShieldCheck, title: "Hoá đơn & hợp đồng", text: "Xuất hoá đơn VAT đầy đủ, hợp đồng rõ ràng, đổi trả nếu sản phẩm lỗi do vận chuyển." },
];

export function WhyUs() {
  return (
    <section className="py-20 lg:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-12">
        <div className="relative lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-card ring-1 ring-ink-900/5">
            <Image src={unsplash(img.handingGift, 900, 1125)} alt="Trao tặng quà Tết" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden aspect-square w-44 overflow-hidden rounded-3xl shadow-card-hover ring-4 ring-cream-50 sm:block">
            <Image src={unsplash(img.goldBows, 400, 400)} alt="" fill sizes="176px" className="object-cover" />
          </div>
        </div>
        <div className="lg:col-span-7">
          <SectionHeading align="left" eyebrow="Vì sao chọn chúng tôi" title="Quà Tết doanh nghiệp, làm chỉn chu từ khâu nhỏ nhất" />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {reasons.map((r) => (
              <li key={r.title} className="group rounded-2xl bg-white p-6 shadow-card ring-1 ring-ink-900/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover">
                <span className="grid size-11 place-items-center rounded-xl bg-crimson-50 text-crimson-700 transition-colors group-hover:bg-crimson-700 group-hover:text-gold-200">
                  <r.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-sans text-base font-semibold text-ink-900">{r.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------- Process --------------------------------- */
const steps = [
  { n: "01", title: "Tư vấn & chọn mẫu", text: "Gửi ngân sách và số lượng, chúng tôi đề xuất 3–5 mẫu phù hợp trong 24 giờ." },
  { n: "02", title: "Thiết kế thương hiệu", text: "Duyệt mock-up thiệp, tem logo, hộp in riêng trước khi sản xuất." },
  { n: "03", title: "Sản xuất & đóng gói", text: "Đóng gói theo tiêu chuẩn, kiểm tra từng phần quà trước khi niêm phong." },
  { n: "04", title: "Giao hàng đúng hẹn", text: "Giao tận văn phòng hoặc tới từng người nhận, cập nhật tiến độ theo thời gian thực." },
];

export function Process() {
  return (
    <section className="bg-crimson-silk py-20 text-cream-50 lg:py-28">
      <Container>
        <SectionHeading tone="dark" eyebrow="Quy trình" title="Bốn bước để có bộ quà Tết mang dấu ấn riêng" />
        <ol className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.n} className="relative">
              {i < steps.length - 1 && <span className="absolute left-14 top-7 hidden h-px w-[calc(100%-3.5rem)] bg-gold-400/30 lg:block" />}
              <span className="relative grid size-14 place-items-center rounded-full bg-cream-50 font-display text-xl font-semibold text-crimson-700 ring-4 ring-gold-500/40">
                {s.n}
              </span>
              <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream-200/80">{s.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/* ---------------------------------- CTA ---------------------------------- */
export function ContactCTA() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-ink-900 px-6 py-14 text-center text-cream-50 ring-1 ring-gold-500/30 sm:px-12 lg:py-20">
          <div className="pointer-events-none absolute inset-0 opacity-25">
            <Image src={unsplash(img.darkLuxuryGifts, 1600, 800)} alt="" fill sizes="100vw" className="object-cover" />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/70 to-ink-900" />
          <div className="relative mx-auto max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-300">Đặt sớm – ưu đãi tốt</p>
            <h2 className="mt-4 text-balance text-4xl font-semibold leading-tight sm:text-5xl">
              Nhận báo giá trong <span className="text-gold-foil italic">24 giờ</span>
            </h2>
            <p className="mt-4 text-pretty text-cream-200/80">
              Đơn hàng từ 50 phần được thiết kế thiệp và tem logo miễn phí. Liên hệ ngay để giữ lịch sản xuất trước cao điểm.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href={site.hotlineHref} variant="gold" size="lg">
                <Phone className="size-4" /> {site.hotline}
              </Button>
              <Button href={site.zalo} variant="white" size="lg">
                <MessageCircle className="size-4" /> Chat Zalo
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
