import { Button } from "@/components/ui/button";

/**
 * Form báo giá sỉ – hiện là UI tĩnh.
 * Giai đoạn 2: chuyển thành Server Action gửi thông báo Zalo OA / Email (Resend) / Telegram Bot cho Admin.
 */
export function QuoteForm({ compact = false }: { compact?: boolean }) {
  return (
    <form id="bao-gia" action="#" className="scroll-mt-32 rounded-3xl bg-white p-6 shadow-card ring-1 ring-navy-900/5 sm:p-8">
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
        <textarea id="message" name="message" rows={4} placeholder="Mã set quà quan tâm (VD: TQG01), ngày cần giao, địa chỉ nhận hàng..." className="rounded-xl border border-cream-300 bg-cream-50 px-4 py-3 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-gold-400" />
      </div>
      <Button type="submit" variant="gold" size="lg" className="mt-6 w-full sm:w-auto">Gửi yêu cầu báo giá</Button>
      <p className="mt-3 text-xs text-ink-400">Thông tin của bạn được bảo mật theo Chính sách bảo mật. Giai đoạn hiện tại form chưa nối hệ thống gửi thông báo.</p>
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
