export const site = {
  name: "T&Q GIFT",
  shortName: "T&Q",
  domain: "tqgift.vn",
  url: "https://tqgift.vn",
  slogan: "Gửi trọn Tri ân, Khởi nguồn Thịnh vượng",
  tagline: "Quà tặng doanh nghiệp cao cấp",
  season: "Tết Đinh Mùi 2027",
  copyrightYear: 2026,
  description:
    "T&Q GIFT – thương hiệu quà Tết, quà Trung thu và quà tặng doanh nghiệp cao cấp. Miễn phí in logo, chiết khấu B2B, đầy đủ hoá đơn VAT, giao hàng toàn quốc.",
  hotline: "0962.303.859",
  hotlineHref: "tel:+84962303859",
  zalo: "https://zalo.me/0962303859",
  email: "info@tqgift.vn",
  hours: "Thứ 2 – Thứ 7, 8:00 – 18:00",
  company: {
    legalName: "CÔNG TY TNHH T&Q GIFT VIỆT NAM",
    address: "Đường Lý Thái Tổ (Đường 179), Khu phố Doi Sóc, Phường Từ Sơn, Tỉnh Bắc Ninh",
    representative: "Nguyễn Văn Tiến",
    phone: "0962.303.859",
    taxCode: "Đang cập nhật",
  },
  nav: [
    { label: "Trang chủ", href: "/" },
    { label: "Quà Tết", href: "/qua-tet" },
    { label: "Quà doanh nghiệp", href: "/qua-doanh-nghiep" },
    { label: "Quà Trung Thu", href: "/qua-trung-thu" },
    { label: "Giới thiệu", href: "/gioi-thieu" },
    { label: "Blog", href: "/blog" },
    { label: "Liên hệ", href: "/lien-he" },
  ],
  /** Dropdown "DANH MỤC SẢN PHẨM" */
  megaMenu: [
    {
      title: "Quà Tết",
      items: [
        { label: "Tất cả quà Tết", href: "/catalogue?nhom=qua-tet" },
        { label: "Hộp quà Tết", href: "/catalogue?nhom=hop-qua-tet" },
        { label: "Giỏ quà Tết", href: "/catalogue?nhom=gio-qua-tet" },
        { label: "Rượu vang nhập khẩu (18+)", href: "/catalogue?tag=ruou-vang", ageGate: true },
      ],
    },
    {
      title: "Quà Trung Thu",
      items: [
        { label: "Hộp bánh Trung thu cao cấp", href: "/catalogue?nhom=trung-thu" },
        { label: "Giftset trà & bánh", href: "/catalogue?nhom=trung-thu&chat-lieu=giftset" },
      ],
    },
    {
      title: "Quà dịp lễ & sự kiện",
      items: [
        { label: "Quà 8/3 & 20/10", href: "/catalogue?nhom=su-kien" },
        { label: "Sinh nhật công ty", href: "/catalogue?nhom=su-kien&chat-lieu=giftset" },
        { label: "Bộ Giftset văn phòng", href: "/catalogue?chat-lieu=giftset" },
      ],
    },
  ],
  policies: [
    { slug: "chinh-sach-bao-mat", label: "Chính sách bảo mật" },
    { slug: "chinh-sach-thanh-toan", label: "Chính sách thanh toán" },
    { slug: "chinh-sach-van-chuyen", label: "Chính sách vận chuyển" },
    { slug: "chinh-sach-kiem-hang-doi-tra", label: "Chính sách kiểm hàng & đổi trả" },
    { slug: "dieu-khoan-giao-dich-chung", label: "Điều khoản giao dịch chung" },
  ],
} as const;
