"use client";

import { useActionState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitQuote, type QuoteState } from "@/app/actions/quote";

/** Form báo giá sỉ – gửi qua Server Action sang tqgift-admin (quote-requests), admin nhận email/Telegram. */
export function QuoteForm({ compact = false, note }: { compact?: boolean; note?: string }) {
  const [state, action, pending] = useActionState<QuoteState | null, FormData>(submitQuote, null);
  const pathname = usePathname();
  const sp = useSearchParams();
  const preset = sp.get("san-pham");

  if (state?.ok) {
    return (
      <div id="bao-gia" className="scroll-mt-32 rounded-3xl bg-white p-8 text-center shadow-card ring-1 ring-navy-900/5">
        <CheckCircle2 className="mx-auto size-12 text-gold-600" />
        <h3 className="mt-4 text-2xl font-semibold text-navy-900">Đã nhận yêu cầu báo giá</h3>
        <p className="mt-2 text-sm text-ink-500">{state.message}</p>
      </div>
    );
  }

  return (
    <form id="bao-gia" action={action} className="scroll-mt-32 rounded-3xl bg-white p-6 shadow-card ring-1 ring-navy-900/5 sm:p-8">
      {!compact && (
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-700">Đăng ký nhận báo giá sỉ</p>
          <h3 className="mt-2 text-2xl font-semibold text-navy-900">Phản hồi trong 24 giờ làm việc</h3>
        </div>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Họ và tên" name="name" placeholder="Nguyễn Văn A" required />
        <Field label="Số điện thoại / Zalo" name="phone" type="tel" placeholder="09xx xxx xxx" required />
        <Field label="Tên doanh nghiệp" name="company" placeholder="Công ty TNHH ..." />
        <Field label="Email nhận báo giá" name="email" type="email" placeholder="ban@congty.vn" />
        <Field label="Số lượng dự kiến (phần)" name="quantity" type="number" placeholder="50" />
        <Select label="Ngân sách / phần" name="budget" options={["Dưới 500.000đ", "500.000đ – 1.000.000đ", "1.000.000đ – 1.500.000đ", "1.500.000đ – 2.000.000đ", "2.000.000đ – 3.000.000đ", "Trên 3.000.000đ"]} />
        <Select label="Dịp tặng" name="occasion" options={["Quà Tết", "Quà Trung Thu", "Quà 8/3 – 20/10", "Sinh nhật công ty / sự kiện", "Khác"]} />
        <Select label="Nhu cầu in logo" name="branding" options={["In thiệp chúc", "In / ép kim logo lên hộp", "Khắc laser logo", "Thiết kế hộp riêng", "Chưa rõ, cần tư vấn"]} />
      </div>
      <div className="mt-5 flex flex-col gap-1.5">
        <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-ink-500">Yêu cầu thêm</label>
        <textarea id="message" name="message" rows={4} defaultValue={preset ? `Set quà quan tâm: ${preset}` : undefined} placeholder="Mã set quà quan tâm (VD: TQG01), ngày cần giao, địa chỉ nhận hàng..." className="rounded-xl border border-cream-300 bg-cream-50 px-4 py-3 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-gold-400" />
      </div>
      {/* Honeypot chống bot – người thật không thấy */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="pageUrl" value={pathname} />
      {state && !state.ok && (
        <p className="mt-4 flex items-center gap-2 rounded-xl bg-ruby-50 px-4 py-3 text-sm font-medium text-ruby-700"><AlertCircle className="size-4" /> {state.message}</p>
      )}
      <Button type="submit" variant="gold" size="lg" className="mt-6 w-full sm:w-auto" disabled={pending}>
        {pending ? <><Loader2 className="size-4 animate-spin" /> Đang gửi...</> : "Gửi yêu cầu báo giá"}
      </Button>
      <p className="mt-3 text-xs text-ink-400">{note || "Thông tin của bạn được bảo mật theo Chính sách bảo mật và chỉ dùng để tư vấn báo giá."}</p>
    </form>
  );
}

const inputCls = "h-12 rounded-xl border border-cream-300 bg-cream-50 px-4 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-gold-400";

function Field({ label, name, type = "text", placeholder, required }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-xs font-semibold uppercase tracking-wider text-ink-500">{label}{required && <span className="text-ruby-700"> *</span>}</label>
      <input id={name} name={name} type={type} placeholder={placeholder} required={required} className={inputCls} />
    </div>
  );
}

function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-xs font-semibold uppercase tracking-wider text-ink-500">{label}</label>
      <select id={name} name={name} className={inputCls}>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
