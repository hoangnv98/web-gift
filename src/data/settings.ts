/**
 * Cấu hình hiển thị trang chủ.
 * Đây là "Admin tạm thời": các công tắc và nội dung sau này sẽ do CMS quản lý
 * (xem README – Lộ trình mở rộng). Khi nối CMS chỉ cần thay file này bằng hàm fetch.
 */
export interface PartnerLogo {
  name: string;
  /** URL ảnh logo (PNG/SVG nền trong). Bỏ trống -> hiển thị ô placeholder tên. */
  src?: string;
  href?: string;
}

export interface LogoBlock {
  enabled: boolean;
  title: string;
  subtitle: string;
  logos: PartnerLogo[];
}

export const homeSettings = {
  /** Khối 5.1 – slider logo khách hàng / đối tác */
  partners: {
    enabled: true,
    title: "Đối tác & khách hàng doanh nghiệp đồng hành",
    subtitle: "Hơn 1.200 doanh nghiệp đã tin chọn T&Q GIFT cho mùa quà tặng của mình.",
    logos: [
      { name: "Logo đối tác 1" },
      { name: "Logo đối tác 2" },
      { name: "Logo đối tác 3" },
      { name: "Logo đối tác 4" },
      { name: "Logo đối tác 5" },
      { name: "Logo đối tác 6" },
      { name: "Logo đối tác 7" },
      { name: "Logo đối tác 8" },
    ],
  } satisfies LogoBlock,

  /** Khối 5.2 – thương hiệu cung ứng / báo chí */
  press: {
    enabled: true,
    title: "Thương hiệu cung ứng / Báo chí nói về T&Q GIFT",
    subtitle: "Nguồn hàng chính hãng từ các nhà cung ứng uy tín trong và ngoài nước.",
    logos: [
      { name: "Nhà cung ứng 1" },
      { name: "Nhà cung ứng 2" },
      { name: "Nhà cung ứng 3" },
      { name: "Nhà cung ứng 4" },
      { name: "Báo chí 1" },
      { name: "Báo chí 2" },
    ],
  } satisfies LogoBlock,

  /** Bảng chiết khấu B2B (mẫu – chỉnh theo chính sách thực tế) */
  b2bDiscounts: [
    { from: 10, to: 29, discount: "5%", perk: "Miễn phí thiệp chúc in tên doanh nghiệp" },
    { from: 30, to: 49, discount: "8%", perk: "Miễn phí in logo lên hộp" },
    { from: 50, to: 99, discount: "12%", perk: "Miễn phí ép kim / khắc laser logo + giao hàng nội tỉnh" },
    { from: 100, to: null, discount: "15%+", perk: "Thiết kế hộp riêng theo nhận diện, giao tận từng người nhận" },
  ],
};
