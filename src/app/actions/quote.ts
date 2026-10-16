"use server";

/** Gửi yêu cầu báo giá sang tqgift-admin (collection quote-requests). */
const CMS_URL = (process.env.CMS_URL || "http://localhost:3000").replace(/\/$/, "");

export interface QuoteState { ok: boolean; message: string }

const budgetMap: Record<string, string> = {
  "Dưới 500.000đ": "duoi-500",
  "500.000đ – 1.000.000đ": "500-1000",
  "1.000.000đ – 1.500.000đ": "1000-1500",
  "1.500.000đ – 2.000.000đ": "1500-2000",
  "2.000.000đ – 3.000.000đ": "2000-3000",
  "Trên 3.000.000đ": "tren-3000",
};
const occasionMap: Record<string, string> = { "Quà Tết": "tet", "Quà Trung Thu": "trung-thu", "Quà 8/3 – 20/10": "su-kien", "Sinh nhật công ty / sự kiện": "su-kien" };

export async function submitQuote(_prev: QuoteState | null, form: FormData): Promise<QuoteState> {
  const str = (k: string) => String(form.get(k) ?? "").trim();
  const contactName = str("name");
  const phone = str("phone");
  if (!contactName || !phone) return { ok: false, message: "Vui lòng nhập họ tên và số điện thoại." };
  if (!/^[\d\s.+()-]{8,20}$/.test(phone)) return { ok: false, message: "Số điện thoại chưa đúng định dạng." };

  const branding = str("branding");
  const message = [str("message"), branding ? `Nhu cầu in logo: ${branding}` : ""].filter(Boolean).join("\n");
  const payload = {
    contactName,
    phone,
    company: str("company") || undefined,
    email: str("email") || undefined,
    quantity: Number(str("quantity")) || undefined,
    budget: budgetMap[str("budget")],
    occasion: occasionMap[str("occasion")],
    message: message || undefined,
    source: "website",
    pageUrl: str("pageUrl") || undefined,
    website: str("website"), // honeypot
  };

  try {
    const res = await fetch(`${CMS_URL}/api/quote-requests`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`CMS ${res.status}`);
    return { ok: true, message: "Đã nhận yêu cầu. Tư vấn viên sẽ liên hệ trong 24 giờ làm việc." };
  } catch (err) {
    console.error("submitQuote", err);
    return { ok: false, message: "Không gửi được lúc này. Vui lòng gọi hotline hoặc nhắn Zalo." };
  }
}
