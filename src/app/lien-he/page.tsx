import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { site } from "@/data/site";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Liên hệ & báo giá",
  description: "Gửi yêu cầu báo giá quà Tết doanh nghiệp. Phản hồi trong 24 giờ.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-tet-lattice">
        <Container className="py-14 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-600">Liên hệ</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold leading-tight text-ink-900 sm:text-5xl lg:text-6xl">
            Nhận báo giá <span className="text-gold-foil italic">doanh nghiệp</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-500">Để lại thông tin, đội ngũ tư vấn sẽ phản hồi trong 24 giờ làm việc.</p>
        </Container>
      </section>

      <Container className="grid gap-12 py-14 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-5">
          <ul className="space-y-5 text-sm">
            <Info icon={Phone} label="Hotline" value={site.hotline} href={site.hotlineHref} />
            <Info icon={MessageCircle} label="Zalo" value="Chat với tư vấn viên" href={site.zalo} />
            <Info icon={Mail} label="Email" value={site.email} href={`mailto:${site.email}`} />
            <Info icon={MapPin} label="Showroom" value={site.address} />
            <Info icon={Clock} label="Giờ làm việc" value={site.hours} />
          </ul>
        </div>

        <form className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-ink-900/5 sm:p-8 lg:col-span-7" action="#">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Họ và tên" name="name" placeholder="Nguyễn Văn A" required />
            <Field label="Số điện thoại" name="phone" type="tel" placeholder="09xx xxx xxx" required />
            <Field label="Công ty" name="company" placeholder="Tên doanh nghiệp" />
            <Field label="Email" name="email" type="email" placeholder="ban@congty.vn" />
            <Field label="Số lượng dự kiến" name="quantity" type="number" placeholder="50" />
            <div className="flex flex-col gap-1.5">
              <label htmlFor="budget" className="text-xs font-semibold uppercase tracking-wider text-ink-500">Ngân sách / phần</label>
              <select id="budget" name="budget" className="h-12 rounded-xl border border-cream-300 bg-cream-50 px-4 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-gold-400">
                <option>Dưới 500.000đ</option>
                <option>500.000 – 1.000.000đ</option>
                <option>1.000.000 – 2.000.000đ</option>
                <option>2.000.000 – 5.000.000đ</option>
                <option>Trên 5.000.000đ</option>
              </select>
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-1.5">
            <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-ink-500">Yêu cầu thêm</label>
            <textarea id="message" name="message" rows={4} placeholder="Mẫu quan tâm, in logo, thời gian giao hàng..." className="rounded-xl border border-cream-300 bg-cream-50 px-4 py-3 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-gold-400" />
          </div>
          <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto">Gửi yêu cầu báo giá</Button>
          <p className="mt-3 text-xs text-ink-400">Form hiện chỉ là giao diện. Kết nối API / CRM sẽ được bổ sung ở giai đoạn sau.</p>
        </form>
      </Container>
    </>
  );
}

function Info({ icon: Icon, label, value, href }: { icon: React.ElementType; label: string; value: string; href?: string }) {
  const content = (
    <>
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-crimson-50 text-crimson-700"><Icon className="size-5" /></span>
      <span>
        <span className="block text-xs font-semibold uppercase tracking-wider text-ink-400">{label}</span>
        <span className="mt-0.5 block font-medium text-ink-900">{value}</span>
      </span>
    </>
  );
  return (
    <li>
      {href ? <a href={href} className="flex items-center gap-4 hover:text-crimson-700">{content}</a> : <div className="flex items-center gap-4">{content}</div>}
    </li>
  );
}

function Field({ label, name, type = "text", placeholder, required }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-xs font-semibold uppercase tracking-wider text-ink-500">{label}{required && <span className="text-crimson-700"> *</span>}</label>
      <input id={name} name={name} type={type} placeholder={placeholder} required={required} className="h-12 rounded-xl border border-cream-300 bg-cream-50 px-4 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-gold-400" />
    </div>
  );
}
