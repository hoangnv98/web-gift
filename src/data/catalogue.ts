import { img, type ImageKey } from "@/lib/images";

/* ----------------------------- Taxonomy ---------------------------------- */

export type CategoryId = "hop-qua" | "gio-qua";
export type MaterialId = "carton" | "da" | "go" | "may" | "son-mai";

export interface Category {
  id: CategoryId;
  name: string;
  shortName: string;
  description: string;
  image: ImageKey;
}

export const categories: Category[] = [
  {
    id: "hop-qua",
    name: "Hộp Quà Tết",
    shortName: "Hộp quà",
    description:
      "Hộp cứng, hộp da, hộp gỗ sơn mài — tinh tế, sang trọng, phù hợp tặng đối tác và khách hàng VIP.",
    image: "darkLuxuryGifts",
  },
  {
    id: "gio-qua",
    name: "Giỏ Quà Tết",
    shortName: "Giỏ quà",
    description:
      "Giỏ mây, giỏ gỗ, giỏ da đầy đặn, trang trí đậm sắc xuân — món quà sum vầy cho nhân viên và gia đình.",
    image: "honeyMandarin",
  },
];

export interface Material {
  id: MaterialId;
  name: string;
}

export const materials: Material[] = [
  { id: "carton", name: "Carton cao cấp" },
  { id: "da", name: "Da" },
  { id: "go", name: "Gỗ" },
  { id: "may", name: "Mây đan" },
  { id: "son-mai", name: "Gỗ sơn mài" },
];

export interface PriceTier {
  id: string;
  label: string;
  min: number;
  max: number | null;
}

export const priceTiers: PriceTier[] = [
  { id: "duoi-500", label: "Dưới 500.000đ", min: 0, max: 500_000 },
  { id: "500-1000", label: "500.000 – 1.000.000đ", min: 500_000, max: 1_000_000 },
  { id: "1000-1500", label: "1.000.000 – 1.500.000đ", min: 1_000_000, max: 1_500_000 },
  { id: "1500-2000", label: "1.500.000 – 2.000.000đ", min: 1_500_000, max: 2_000_000 },
  { id: "2000-3000", label: "2.000.000 – 3.000.000đ", min: 2_000_000, max: 3_000_000 },
  { id: "3000-5000", label: "3.000.000 – 5.000.000đ", min: 3_000_000, max: 5_000_000 },
  { id: "tren-5000", label: "Trên 5.000.000đ", min: 5_000_000, max: null },
];

export type SortId = "featured" | "price-asc" | "price-desc";

export const sortOptions: { id: SortId; label: string }[] = [
  { id: "featured", label: "Nổi bật" },
  { id: "price-asc", label: "Giá tăng dần" },
  { id: "price-desc", label: "Giá giảm dần" },
];

/* ------------------------------ Products --------------------------------- */

export type Badge = "Bán chạy" | "Cao cấp" | "Giới hạn" | "Mới";

export interface Product {
  slug: string;
  code: string;
  name: string;
  category: CategoryId;
  material: MaterialId;
  price: number;
  originalPrice?: number;
  badge?: Badge;
  featured?: boolean;
  tagline: string;
  description: string;
  items: string[];
  images: ImageKey[];
}

export const products: Product[] = [
  {
    slug: "hop-qua-tet-phuc-loc-an-khang",
    code: "LX-H501",
    name: "Hộp Quà Tết Phúc Lộc An Khang",
    category: "hop-qua",
    material: "carton",
    price: 1_100_000,
    originalPrice: 1_350_000,
    badge: "Bán chạy",
    featured: true,
    tagline: "Lựa chọn cân bằng giữa giá trị và sự sang trọng.",
    description:
      "Hộp cứng bọc giấy mỹ thuật đỏ thẫm, ép kim hoạ tiết hoa mai. Bộ quà kết hợp rượu vang, trà và hạt dinh dưỡng — món quà chuẩn mực gửi đến đối tác dịp đầu năm.",
    items: [
      "Rượu vang đỏ Chile Reserva 750ml",
      "Trà ô long thượng hạng 100g",
      "Hạt điều rang muối Bình Phước 250g",
      "Socola Bỉ nhân hạt phỉ 120g",
      "Thiệp chúc Tết in tên doanh nghiệp",
    ],
    images: ["redGifts", "chocolateBox", "teaGlass"],
  },
  {
    slug: "hop-qua-tet-song-ma-thinh-vuong",
    code: "LX-H502",
    name: "Hộp Quà Tết Song Mã Thịnh Vượng",
    category: "hop-qua",
    material: "go",
    price: 2_950_000,
    originalPrice: 3_100_000,
    badge: "Cao cấp",
    featured: true,
    tagline: "Hộp gỗ nắp trượt, khắc laser hoạ tiết song mã.",
    description:
      "Hộp gỗ thông tự nhiên, nắp trượt khắc laser, bên trong lót nhung đỏ. Rượu vang Pháp và các đặc sản tuyển chọn thể hiện sự trân trọng dành cho khách hàng quan trọng.",
    items: [
      "Rượu vang đỏ Bordeaux AOC 750ml",
      "Yến sào tinh chế 50g",
      "Trà Shan tuyết cổ thụ 100g",
      "Hạt macca Lâm Đồng 300g",
      "Mứt sen Huế 200g",
      "Thiệp chúc Tết in tên doanh nghiệp",
    ],
    images: ["darkLuxuryGifts", "winePour", "mixedNuts"],
  },
  {
    slug: "hop-qua-tet-bao-phuc-truong-xuan",
    code: "LX-H503",
    name: "Hộp Quà Tết Bảo Phúc Trường Xuân",
    category: "hop-qua",
    material: "da",
    price: 4_100_000,
    originalPrice: 4_500_000,
    badge: "Giới hạn",
    featured: true,
    tagline: "Hộp da cao cấp, dập nổi logo thương hiệu.",
    description:
      "Hộp da PU cao cấp màu đỏ rượu, khoá kim loại mạ vàng, có thể dập nổi logo doanh nghiệp. Bộ quà cho vị trí lãnh đạo và đối tác chiến lược.",
    items: [
      "Rượu vang đỏ Ý Amarone 750ml",
      "Nhân sâm Hàn Quốc 6 năm tuổi 150g",
      "Socola Bỉ Godiva hộp 12 viên",
      "Trà Đông Phương Mỹ Nhân 80g",
      "Hạt hạnh nhân Mỹ 300g",
      "Thiệp chúc Tết in tên doanh nghiệp",
    ],
    images: ["handingGift", "wineVineyard", "chocolateStack"],
  },
  {
    slug: "hop-qua-tet-sac-xuan",
    code: "LX-H504",
    name: "Hộp Quà Tết Sắc Xuân",
    category: "hop-qua",
    material: "carton",
    price: 890_000,
    originalPrice: 1_100_000,
    tagline: "Tươi tắn, gọn gàng — quà cho nhân viên và khách hàng thân thiết.",
    description:
      "Hộp carton cao cấp in offset hoa đào rực rỡ, nơ lụa vàng. Trà, bánh và trái cây sấy chọn lọc tạo nên bộ quà tươi mới cho mùa xuân.",
    items: [
      "Trà hoa cúc mật ong 100g",
      "Bánh quy bơ Đan Mạch 454g",
      "Trái cây sấy hỗn hợp 250g",
      "Hạt sen sấy 200g",
      "Thiệp chúc Tết",
    ],
    images: ["kraftPinkRibbon", "teaCup", "berries"],
  },
  {
    slug: "hop-qua-tet-loc-phat-khai-nien",
    code: "LX-H505",
    name: "Hộp Quà Tết Lộc Phát Khai Niên",
    category: "hop-qua",
    material: "carton",
    price: 360_000,
    originalPrice: 520_000,
    tagline: "Quà tặng số lượng lớn, chi phí tối ưu.",
    description:
      "Hộp giấy kraft ép kim, dây đay tự nhiên. Phù hợp tặng toàn thể nhân viên hoặc khách hàng số lượng lớn mà vẫn giữ được sự chỉn chu.",
    items: [
      "Cà phê rang xay Đà Lạt 250g",
      "Bánh quy hạnh nhân 200g",
      "Hạt điều rang muối 150g",
      "Thiệp chúc Tết",
    ],
    images: ["handmadeWrap", "coffeeCookies", "nutJars"],
  },
  {
    slug: "hop-qua-tet-kim-ngoc-man-duong",
    code: "LX-H506",
    name: "Hộp Quà Tết Kim Ngọc Mãn Đường",
    category: "hop-qua",
    material: "son-mai",
    price: 5_900_000,
    originalPrice: 6_500_000,
    badge: "Giới hạn",
    featured: true,
    tagline: "Hộp sơn mài thủ công Hạ Thái — tác phẩm giữ lại sau mùa Tết.",
    description:
      "Hộp gỗ sơn mài vẽ tay bởi nghệ nhân làng Hạ Thái, hoạ tiết hoa mai dát vàng. Sản xuất giới hạn 200 hộp, mỗi hộp đánh số riêng.",
    items: [
      "Rượu vang đỏ Pháp Grand Cru 750ml",
      "Yến sào Khánh Hoà 100g",
      "Trà Phổ Nhĩ 10 năm 200g",
      "Socola Bỉ hộp 24 viên",
      "Hạt dinh dưỡng mix 500g",
      "Mứt gừng mật ong 200g",
      "Thiệp chúc Tết viết tay",
    ],
    images: ["goldBows", "wineGrapes", "chocolateBar"],
  },
  {
    slug: "hop-qua-tet-nhu-y-cat-tuong",
    code: "LX-H507",
    name: "Hộp Quà Tết Như Ý Cát Tường",
    category: "hop-qua",
    material: "go",
    price: 1_750_000,
    originalPrice: 1_950_000,
    badge: "Mới",
    tagline: "Hộp gỗ nắp kính, trưng bày đẹp trong văn phòng.",
    description:
      "Hộp gỗ sồi nắp kính cường lực, trang trí cành thông và quả mọng đỏ. Bộ quà kết hợp trà và cà phê đặc sản Việt Nam.",
    items: [
      "Cà phê Arabica Cầu Đất 500g",
      "Trà ô long Tứ Quý 150g",
      "Bánh quy hạt óc chó 300g",
      "Hạt macca 250g",
      "Thiệp chúc Tết in tên doanh nghiệp",
    ],
    images: ["pineBerries", "teaPot", "coffeeBag"],
  },
  {
    slug: "gio-qua-tet-van-su-nhu-y",
    code: "LX-G508",
    name: "Giỏ Quà Tết Vạn Sự Như Ý",
    category: "gio-qua",
    material: "may",
    price: 1_250_000,
    originalPrice: 1_450_000,
    badge: "Bán chạy",
    featured: true,
    tagline: "Giỏ mây đan tay, đầy đặn và ấm áp.",
    description:
      "Giỏ mây tre đan thủ công, phủ giấy kính và nơ đỏ truyền thống. Mật ong, quýt vàng và rượu vang mang trọn ý nghĩa sung túc đầu năm.",
    items: [
      "Rượu vang đỏ Chile 750ml",
      "Mật ong rừng U Minh 500ml",
      "Trà sen Tây Hồ 100g",
      "Mứt quất 200g",
      "Hạt dẻ cười 250g",
      "Bánh quy bơ 300g",
      "Thiệp chúc Tết",
    ],
    images: ["honeyMandarin", "fruits", "wineToast"],
  },
  {
    slug: "gio-qua-tet-tai-loc-day-nha",
    code: "LX-G509",
    name: "Giỏ Quà Tết Tài Lộc Đầy Nhà",
    category: "gio-qua",
    material: "carton",
    price: 650_000,
    originalPrice: 790_000,
    tagline: "Giỏ carton đỏ ép kim, trang trí châu báu.",
    description:
      "Giỏ carton cứng in đỏ ép kim, quai nhung. Cà phê, hạt và bánh được sắp xếp hài hoà, trang trí trái châu vàng đỏ.",
    items: [
      "Cà phê rang xay 250g",
      "Hạt hỗn hợp dinh dưỡng 300g",
      "Bánh quy socola 200g",
      "Trà túi lọc hoa nhài 20 gói",
      "Thiệp chúc Tết",
    ],
    images: ["ornaments", "coffeeSack", "mixedNuts"],
  },
  {
    slug: "gio-qua-tet-phu-quy-vinh-hoa",
    code: "LX-G510",
    name: "Giỏ Quà Tết Phú Quý Vinh Hoa",
    category: "gio-qua",
    material: "da",
    price: 2_450_000,
    originalPrice: 2_700_000,
    badge: "Cao cấp",
    tagline: "Giỏ da quai gỗ, dùng lại được sau Tết.",
    description:
      "Giỏ da nâu quai gỗ sồi, thiết kế tối giản, dùng lại được như giỏ picnic. Rượu vang, hạt và socola cao cấp cho khách hàng VIP.",
    items: [
      "Rượu vang đỏ Úc Shiraz 750ml",
      "Socola Bỉ hộp 16 viên",
      "Hạt macca, hạnh nhân, óc chó mỗi loại 150g",
      "Trà ô long sữa 100g",
      "Mứt dừa non 200g",
      "Thiệp chúc Tết in tên doanh nghiệp",
    ],
    images: ["winePour", "nutJars", "chocolateStack"],
  },
  {
    slug: "gio-qua-tet-an-khang-thinh-vuong",
    code: "LX-G511",
    name: "Giỏ Quà Tết An Khang Thịnh Vượng",
    category: "gio-qua",
    material: "go",
    price: 3_300_000,
    originalPrice: 3_600_000,
    featured: true,
    tagline: "Giỏ gỗ sồi đóng tay, cho mùa Tết trọn vẹn.",
    description:
      "Giỏ gỗ sồi tự nhiên, quai da thật, khắc laser logo doanh nghiệp. Bộ quà đầy đủ rượu, trà, socola và đặc sản ba miền.",
    items: [
      "Rượu vang đỏ Pháp Médoc 750ml",
      "Socola Bỉ 200g",
      "Trà Shan tuyết 100g",
      "Yến sào tinh chế 30g",
      "Hạt điều Bình Phước 300g",
      "Mứt sen, mứt gừng mỗi loại 150g",
      "Thiệp chúc Tết in tên doanh nghiệp",
    ],
    images: ["wineVineyard", "chocolateBox", "teaCup"],
  },
  {
    slug: "gio-qua-tet-xuan-sum-vay",
    code: "LX-G512",
    name: "Giỏ Quà Tết Xuân Sum Vầy",
    category: "gio-qua",
    material: "may",
    price: 480_000,
    originalPrice: 560_000,
    tagline: "Giỏ mây nhỏ xinh, tặng gia đình nhân viên.",
    description:
      "Giỏ mây tròn nhỏ gọn, phủ giấy kính vàng. Trái cây sấy, trà và cà phê — ấm áp mà tiết kiệm.",
    items: [
      "Trái cây sấy hỗn hợp 250g",
      "Trà túi lọc Atiso 25 gói",
      "Cà phê phin giấy 10 gói",
      "Bánh quy bơ 150g",
      "Thiệp chúc Tết",
    ],
    images: ["fruits", "teaGlass", "coffeeGround"],
  },
  {
    slug: "hop-qua-tet-dai-cat-dai-loi",
    code: "LX-H513",
    name: "Hộp Quà Tết Đại Cát Đại Lợi",
    category: "hop-qua",
    material: "da",
    price: 2_150_000,
    originalPrice: 2_400_000,
    tagline: "Bộ quà cà phê đặc sản cho người sành vị.",
    description:
      "Hộp da đen khoá vàng, bên trong là bộ sưu tập cà phê đặc sản Việt Nam cùng phin pha và ly sứ in logo. Món quà có câu chuyện để kể.",
    items: [
      "Cà phê Arabica Cầu Đất 250g",
      "Cà phê Robusta Honey Buôn Ma Thuột 250g",
      "Phin inox cao cấp",
      "Ly sứ Minh Long in logo",
      "Hạt macca 250g",
      "Thiệp chúc Tết in tên doanh nghiệp",
    ],
    images: ["espresso", "coffeeBag", "mixedNuts"],
  },
  {
    slug: "gio-qua-tet-hung-thinh",
    code: "LX-G514",
    name: "Giỏ Quà Tết Hưng Thịnh",
    category: "gio-qua",
    material: "carton",
    price: 950_000,
    originalPrice: 1_090_000,
    badge: "Mới",
    tagline: "Giỏ carton đỏ hiện đại, nắp mica trong.",
    description:
      "Giỏ carton phủ nhung đỏ, nắp mica trong giúp nhìn thấy toàn bộ sản phẩm bên trong. Mật ong, hạt và trà đặc sản vùng cao.",
    items: [
      "Mật ong hoa cà phê 350ml",
      "Trà ô long 100g",
      "Hạt hạnh nhân 250g",
      "Trái cây sấy 200g",
      "Bánh quy 200g",
      "Thiệp chúc Tết",
    ],
    images: ["berries", "honeyMandarin", "coffeeCookies"],
  },
];

/* ------------------------------ Helpers ---------------------------------- */

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCategory(id: CategoryId) {
  return categories.find((c) => c.id === id)!;
}

export function getMaterial(id: MaterialId) {
  return materials.find((m) => m.id === id)!;
}

export function getFeatured(limit = 6) {
  return products.filter((p) => p.featured).slice(0, limit);
}

export function getRelated(product: Product, limit = 4) {
  return products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, limit);
}

export function productImageSrc(p: Product, index = 0) {
  return img[p.images[index] ?? p.images[0]];
}
