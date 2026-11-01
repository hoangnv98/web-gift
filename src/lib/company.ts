/**
 * Thông tin pháp nhân bắt buộc hiển thị ở chân trang (ghi chuẩn từng chữ).
 * Đây là nguồn chuẩn: footer/liên hệ luôn dùng các giá trị này, CMS chỉ bổ sung
 * các trường còn lại (email, giờ làm việc, người đại diện…).
 */
export const COMPANY = {
  legalName: "CÔNG TY TNHH T&Q GIFT VIỆT NAM",
  taxCode: "2301429910",
  address: "Đường Lý Thái Tổ, Khu phố Doi Sóc, Phường Từ Sơn, Thành phố Bắc Ninh",
  hotline: "0962.303.859",
  hotlineTel: "+84962303859",
  zalo: "https://zalo.me/0962303859",
  bank: { account: "102688999", name: "MB Bank" },
  /** Google Maps embed (Chia sẻ → Nhúng bản đồ) – điểm "T&Q Gift Viet Nam". */
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3722.5407815077324!2d105.9667463!3d21.090995799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313507e9b7d5f0af%3A0xd5c07bccc8494baf!2sT%26Q%20Gift%20Viet%20Nam!5e0!3m2!1sen!2s!4v1793298469084!5m2!1sen!2s",
  /**
   * Link đánh giá Google Maps. Mặc định mở trang địa điểm theo CID (khách bấm "Viết bài đánh giá").
   * Nếu có link "Nhận thêm bài đánh giá" từ Google Business Profile (dạng https://g.page/r/XXXX/review)
   * thì thay vào đây để mở thẳng khung viết đánh giá.
   */
  reviewUrl: "https://www.google.com/maps?cid=15402446845070887855",
} as const;

/** 4 trang chính sách bắt buộc có link ở footer (slug trùng với CMS). */
export const REQUIRED_POLICIES = [
  { slug: "chinh-sach-bao-mat", title: "Chính sách bảo mật" },
  { slug: "chinh-sach-kiem-hang-doi-tra", title: "Chính sách đổi trả / kiểm hàng" },
  { slug: "chinh-sach-van-chuyen", title: "Chính sách giao vận" },
  { slug: "chinh-sach-thanh-toan", title: "Phương thức thanh toán" },
] as const;
