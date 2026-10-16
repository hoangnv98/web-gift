export const site = {
  name: "Rich Gift",
  tagline: "Quà Tết doanh nghiệp cao cấp",
  season: "Tết Đinh Mùi 2027",
  copyrightYear: 2026,
  description:
    "Catalogue hộp quà, giỏ quà Tết cao cấp cho doanh nghiệp. Thiết kế riêng theo thương hiệu, giao hàng toàn quốc.",
  hotline: "0909 000 000",
  hotlineHref: "tel:+84909000000",
  email: "sales@richgift.vn",
  zalo: "https://zalo.me/09999999999",
  address: "79 Mễ Trì Thượng",
  hours: "Thứ 2 – Thứ 7, 8:00 – 18:00",
  nav: [
    { label: "Trang chủ", href: "/" },
    { label: "Catalogue", href: "/catalogue" },
    { label: "Hộp quà Tết", href: "/catalogue?category=hop-qua" },
    { label: "Giỏ quà Tết", href: "/catalogue?category=gio-qua" },
    { label: "Liên hệ", href: "/lien-he" },
  ],
} as const;
