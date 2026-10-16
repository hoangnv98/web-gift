import { img, type ImageKey } from "@/lib/images";

/* ----------------------------- Taxonomy ---------------------------------- */

export type Occasion = "tet" | "trung-thu" | "su-kien";
export type Kind = "hop" | "gio" | "giftset";
export type MaterialId =
  | "giay-ep-kim"
  | "hop-da"
  | "hop-go"
  | "son-mai"
  | "gio-da"
  | "gio-go"
  | "giftset";
export type Tag = "ruou-vang" | "yen-sao" | "tra" | "ca-phe" | "banh-trung-thu";

/** Tầng 1 – Dịp tặng / nhóm chính */
export interface Group {
  id: string;
  label: string;
  match: (p: Product) => boolean;
}

export const groups: Group[] = [
  { id: "tat-ca", label: "Tất cả", match: () => true },
  { id: "qua-tet", label: "Quà Tết", match: (p) => p.occasion === "tet" },
  { id: "hop-qua-tet", label: "Hộp Quà Tết", match: (p) => p.occasion === "tet" && p.kind === "hop" },
  { id: "gio-qua-tet", label: "Giỏ Quà Tết", match: (p) => p.occasion === "tet" && p.kind === "gio" },
  { id: "trung-thu", label: "Quà Trung Thu", match: (p) => p.occasion === "trung-thu" },
  { id: "su-kien", label: "Quà Dịp Lễ & Sự Kiện", match: (p) => p.occasion === "su-kien" },
];

/** Tầng 2 – Chất liệu & kiểu dáng */
export const materials: { id: MaterialId; label: string }[] = [
  { id: "giay-ep-kim", label: "Hộp giấy cứng ép kim" },
  { id: "hop-da", label: "Hộp da" },
  { id: "hop-go", label: "Hộp gỗ" },
  { id: "son-mai", label: "Hộp gỗ sơn mài" },
  { id: "gio-da", label: "Giỏ da" },
  { id: "gio-go", label: "Giỏ gỗ" },
  { id: "giftset", label: "Bộ Giftset văn phòng" },
];

/** Tầng 3 – Khoảng giá */
export interface PriceTier {
  id: string;
  label: string;
  min: number;
  max: number | null;
}

export const priceTiers: PriceTier[] = [
  { id: "duoi-500", label: "Dưới 500.000đ", min: 0, max: 500_000 },
  { id: "500-1000", label: "500.000đ – 1.000.000đ", min: 500_000, max: 1_000_000 },
  { id: "1000-1500", label: "1.000.000đ – 1.500.000đ", min: 1_000_000, max: 1_500_000 },
  { id: "1500-2000", label: "1.500.000đ – 2.000.000đ", min: 1_500_000, max: 2_000_000 },
  { id: "2000-3000", label: "2.000.000đ – 3.000.000đ", min: 2_000_000, max: 3_000_000 },
  { id: "tren-3000", label: "Trên 3.000.000đ", min: 3_000_000, max: null },
];

/** Tầng 4 – Sắp xếp */
export type SortId = "mac-dinh" | "gia-tang" | "gia-giam";
export const sortOptions: { id: SortId; label: string }[] = [
  { id: "mac-dinh", label: "Mặc định" },
  { id: "gia-tang", label: "Sắp Xếp Giá Tăng Dần" },
  { id: "gia-giam", label: "Sắp Xếp Giá Giảm Dần" },
];

export const tags: { id: Tag; label: string; ageGate?: boolean }[] = [
  { id: "ruou-vang", label: "Rượu vang nhập khẩu", ageGate: true },
  { id: "yen-sao", label: "Yến sào" },
  { id: "tra", label: "Trà thượng hạng" },
  { id: "ca-phe", label: "Cà phê đặc sản" },
  { id: "banh-trung-thu", label: "Bánh Trung thu" },
];

/* ------------------------------ Products --------------------------------- */

export type Badge = "Bán chạy" | "Cao cấp" | "Giới hạn" | "Mới";

export interface Product {
  slug: string;
  /** Mã sản phẩm hiển thị, VD: TQG01 */
  code: string;
  name: string;
  occasion: Occasion;
  kind: Kind;
  material: MaterialId;
  tags: Tag[];
  price: number;
  originalPrice?: number;
  badge?: Badge;
  featured?: boolean;
  /** Admin ẩn sản phẩm hết hàng -> không hiện trên /catalogue */
  hidden?: boolean;
  tagline: string;
  description: string;
  /** Dòng đầu tiên là bộ hộp/phụ kiện, các dòng sau là thành phần. */
  items: string[];
  /** 4 ảnh: [ảnh chính, góc nghiêng, đóng nắp, túi xách/phụ kiện] */
  images: ImageKey[];
}

export const products: Product[] = [
  {
    slug: "hop-qua-tet-thinh-vuong-phu-quy",
    code: "TQG01",
    name: "Hộp Quà Tết T&Q GIFT Thịnh Vượng Phú Quý",
    occasion: "tet", kind: "hop", material: "giay-ep-kim", tags: ["ruou-vang"],
    price: 1_100_000, originalPrice: 1_350_000, badge: "Bán chạy", featured: true,
    tagline: "Lựa chọn cân bằng giữa giá trị và sự sang trọng.",
    description: "Hộp giấy mỹ thuật ép kim hoạ tiết hoa mai, lót xốp định hình, kèm túi xách đồng bộ. Bộ quà kết hợp rượu vang, hạt dinh dưỡng và bánh — món quà chuẩn mực gửi đến đối tác dịp đầu năm.",
    items: [
      "Bộ hộp quà giấy mỹ thuật ép kim, phụ kiện trang trí, túi xách",
      "01 Chai Vang Ý Primitivo 750ml",
      "01 Hũ Hạt Macca Úc 200g",
      "01 Hũ Hạnh Nhân Rang Bơ 150g",
      "01 Hộp Bánh Quy Bơ Đan Mạch 200g",
      "Tặng thiệp chúc Tết của T&Q Gift",
    ],
    images: ["redGifts", "chocolateBox", "winePour", "handingGift"],
  },
  {
    slug: "hop-qua-tet-song-ma-thinh-vuong",
    code: "TQG02",
    name: "Hộp Quà Tết T&Q GIFT Song Mã Thịnh Vượng",
    occasion: "tet", kind: "hop", material: "hop-go", tags: ["ruou-vang", "yen-sao", "tra"],
    price: 2_950_000, originalPrice: 3_100_000, badge: "Cao cấp", featured: true,
    tagline: "Hộp gỗ nắp trượt, khắc laser hoạ tiết song mã.",
    description: "Hộp gỗ thông tự nhiên, nắp trượt khắc laser, bên trong lót nhung đỏ. Rượu vang Pháp và các đặc sản tuyển chọn thể hiện sự trân trọng dành cho khách hàng quan trọng.",
    items: [
      "Bộ hộp gỗ thông nắp trượt khắc laser, lót nhung, túi xách",
      "01 Chai Vang Pháp Bordeaux AOC 750ml",
      "01 Hộp Yến Sào Tinh Chế Khánh Hoà 50g",
      "01 Hộp Trà Shan Tuyết Cổ Thụ 100g",
      "01 Hũ Hạt Macca Lâm Đồng 300g",
      "01 Hộp Mứt Sen Huế 200g",
      "Tặng thiệp chúc Tết của T&Q Gift",
    ],
    images: ["darkLuxuryGifts", "winePour", "mixedNuts", "teaPot"],
  },
  {
    slug: "hop-qua-tet-bao-phuc-truong-xuan",
    code: "TQG03",
    name: "Hộp Quà Tết T&Q GIFT Bảo Phúc Trường Xuân",
    occasion: "tet", kind: "hop", material: "hop-da", tags: ["ruou-vang", "tra"],
    price: 4_100_000, originalPrice: 4_500_000, badge: "Giới hạn", featured: true,
    tagline: "Hộp da cao cấp, dập nổi logo thương hiệu.",
    description: "Hộp da PU cao cấp màu đỏ rượu, khoá kim loại mạ vàng, có thể dập nổi logo doanh nghiệp. Bộ quà cho vị trí lãnh đạo và đối tác chiến lược.",
    items: [
      "Bộ hộp da cao cấp khoá kim loại, dập nổi logo, túi xách",
      "01 Chai Vang Ý Amarone della Valpolicella 750ml",
      "01 Hộp Nhân Sâm Hàn Quốc 6 Năm Tuổi 150g",
      "01 Hộp Socola Bỉ 12 Viên",
      "01 Hộp Trà Đông Phương Mỹ Nhân 80g",
      "01 Hũ Hạnh Nhân Mỹ 300g",
      "Tặng thiệp chúc Tết của T&Q Gift",
    ],
    images: ["handingGift", "wineVineyard", "chocolateStack", "goldBows"],
  },
  {
    slug: "hop-qua-tet-sac-xuan",
    code: "TQG04",
    name: "Hộp Quà Tết T&Q GIFT Sắc Xuân",
    occasion: "tet", kind: "hop", material: "giay-ep-kim", tags: ["tra"],
    price: 890_000, originalPrice: 1_100_000,
    tagline: "Tươi tắn, gọn gàng — quà cho nhân viên và khách hàng thân thiết.",
    description: "Hộp giấy cứng in hoa đào, ép kim viền, nơ lụa vàng. Trà, bánh và trái cây sấy chọn lọc tạo nên bộ quà tươi mới cho mùa xuân.",
    items: [
      "Bộ hộp giấy cứng ép kim, nơ lụa, túi xách",
      "01 Hộp Trà Hoa Cúc Mật Ong 100g",
      "01 Hộp Bánh Quy Bơ Đan Mạch 454g",
      "01 Hũ Trái Cây Sấy Hỗn Hợp 250g",
      "01 Hũ Hạt Sen Sấy 200g",
      "Tặng thiệp chúc Tết của T&Q Gift",
    ],
    images: ["kraftPinkRibbon", "teaCup", "berries", "blossom"],
  },
  {
    slug: "hop-qua-tet-loc-phat-khai-nien",
    code: "TQG05",
    name: "Hộp Quà Tết T&Q GIFT Lộc Phát Khai Niên",
    occasion: "tet", kind: "hop", material: "giay-ep-kim", tags: ["ca-phe"],
    price: 360_000, originalPrice: 520_000,
    tagline: "Quà tặng số lượng lớn, chi phí tối ưu.",
    description: "Hộp giấy kraft ép kim, dây đay tự nhiên. Phù hợp tặng toàn thể nhân viên hoặc khách hàng số lượng lớn mà vẫn giữ được sự chỉn chu.",
    items: [
      "Bộ hộp giấy kraft ép kim, dây đay, túi xách",
      "01 Gói Cà Phê Rang Xay Đà Lạt 250g",
      "01 Hộp Bánh Quy Hạnh Nhân 200g",
      "01 Hũ Hạt Điều Rang Muối 150g",
      "Tặng thiệp chúc Tết của T&Q Gift",
    ],
    images: ["handmadeWrap", "coffeeCookies", "nutJars", "coffeeBag"],
  },
  {
    slug: "hop-qua-tet-kim-ngoc-man-duong",
    code: "TQG06",
    name: "Hộp Quà Tết T&Q GIFT Kim Ngọc Mãn Đường",
    occasion: "tet", kind: "hop", material: "son-mai", tags: ["ruou-vang", "yen-sao", "tra"],
    price: 5_900_000, originalPrice: 6_500_000, badge: "Giới hạn", featured: true,
    tagline: "Hộp sơn mài thủ công Hạ Thái — tác phẩm giữ lại sau mùa Tết.",
    description: "Hộp gỗ sơn mài vẽ tay bởi nghệ nhân làng Hạ Thái, hoạ tiết hoa mai dát vàng. Sản xuất giới hạn 200 hộp, mỗi hộp đánh số riêng.",
    items: [
      "Bộ hộp gỗ sơn mài vẽ tay dát vàng, đánh số giới hạn, túi xách",
      "01 Chai Vang Pháp Saint-Émilion Grand Cru 750ml",
      "01 Hộp Yến Sào Khánh Hoà 100g",
      "01 Hộp Trà Phổ Nhĩ 10 Năm 200g",
      "01 Hộp Socola Bỉ 24 Viên",
      "01 Hũ Hạt Dinh Dưỡng Mix 500g",
      "01 Hộp Mứt Gừng Mật Ong 200g",
      "Tặng thiệp chúc Tết viết tay của T&Q Gift",
    ],
    images: ["goldBows", "wineGrapes", "chocolateBar", "darkLuxuryGifts"],
  },
  {
    slug: "hop-qua-tet-nhu-y-cat-tuong",
    code: "TQG07",
    name: "Hộp Quà Tết T&Q GIFT Như Ý Cát Tường",
    occasion: "tet", kind: "hop", material: "hop-go", tags: ["ca-phe", "tra"],
    price: 1_750_000, originalPrice: 1_950_000, badge: "Mới",
    tagline: "Hộp gỗ nắp kính, trưng bày đẹp trong văn phòng.",
    description: "Hộp gỗ sồi nắp kính cường lực, trang trí cành thông và quả mọng đỏ. Bộ quà kết hợp trà và cà phê đặc sản Việt Nam.",
    items: [
      "Bộ hộp gỗ sồi nắp kính, trang trí cành thông, túi xách",
      "01 Gói Cà Phê Arabica Cầu Đất 500g",
      "01 Hộp Trà Ô Long Tứ Quý 150g",
      "01 Hộp Bánh Quy Hạt Óc Chó 300g",
      "01 Hũ Hạt Macca 250g",
      "Tặng thiệp chúc Tết của T&Q Gift",
    ],
    images: ["pineBerries", "teaPot", "coffeeBag", "coffeeGround"],
  },
  {
    slug: "gio-qua-tet-van-su-nhu-y",
    code: "TQG08",
    name: "Giỏ Quà Tết T&Q GIFT Vạn Sự Như Ý",
    occasion: "tet", kind: "gio", material: "gio-go", tags: ["ruou-vang", "tra"],
    price: 1_250_000, originalPrice: 1_450_000, badge: "Bán chạy", featured: true,
    tagline: "Giỏ gỗ quai mây, đầy đặn và ấm áp.",
    description: "Giỏ gỗ quai mây đan tay, phủ giấy kính và nơ đỏ truyền thống. Mật ong, quýt vàng và rượu vang mang trọn ý nghĩa sung túc đầu năm.",
    items: [
      "Giỏ gỗ quai mây đan tay, giấy kính, nơ lụa đỏ",
      "01 Chai Vang Chile Cabernet Sauvignon 750ml",
      "01 Chai Mật Ong Rừng U Minh 500ml",
      "01 Hộp Trà Sen Tây Hồ 100g",
      "01 Hộp Mứt Quất 200g",
      "01 Hũ Hạt Dẻ Cười 250g",
      "01 Hộp Bánh Quy Bơ 300g",
      "Tặng thiệp chúc Tết của T&Q Gift",
    ],
    images: ["honeyMandarin", "fruits", "wineToast", "ornaments"],
  },
  {
    slug: "gio-qua-tet-tai-loc-day-nha",
    code: "TQG09",
    name: "Giỏ Quà Tết T&Q GIFT Tài Lộc Đầy Nhà",
    occasion: "tet", kind: "gio", material: "gio-go", tags: ["ca-phe"],
    price: 650_000, originalPrice: 790_000,
    tagline: "Giỏ gỗ nhỏ xinh, trang trí châu báu.",
    description: "Giỏ gỗ nhỏ sơn đỏ, quai nhung. Cà phê, hạt và bánh được sắp xếp hài hoà, trang trí trái châu vàng đỏ.",
    items: [
      "Giỏ gỗ sơn đỏ quai nhung, trang trí trái châu",
      "01 Gói Cà Phê Rang Xay 250g",
      "01 Hũ Hạt Hỗn Hợp Dinh Dưỡng 300g",
      "01 Hộp Bánh Quy Socola 200g",
      "01 Hộp Trà Túi Lọc Hoa Nhài 20 Gói",
      "Tặng thiệp chúc Tết của T&Q Gift",
    ],
    images: ["ornaments", "coffeeSack", "mixedNuts", "coffeeLatte"],
  },
  {
    slug: "gio-qua-tet-phu-quy-vinh-hoa",
    code: "TQG10",
    name: "Giỏ Quà Tết T&Q GIFT Phú Quý Vinh Hoa",
    occasion: "tet", kind: "gio", material: "gio-da", tags: ["ruou-vang", "tra"],
    price: 2_450_000, originalPrice: 2_700_000, badge: "Cao cấp",
    tagline: "Giỏ da quai gỗ, dùng lại được sau Tết.",
    description: "Giỏ da nâu quai gỗ sồi, thiết kế tối giản, dùng lại được như giỏ picnic. Rượu vang, hạt và socola cao cấp cho khách hàng VIP.",
    items: [
      "Giỏ da quai gỗ sồi, lót vải lanh",
      "01 Chai Vang Úc Shiraz 750ml",
      "01 Hộp Socola Bỉ 16 Viên",
      "03 Hũ Hạt Macca, Hạnh Nhân, Óc Chó 150g",
      "01 Hộp Trà Ô Long Sữa 100g",
      "01 Hộp Mứt Dừa Non 200g",
      "Tặng thiệp chúc Tết của T&Q Gift",
    ],
    images: ["winePour", "nutJars", "chocolateStack", "handmadeWrap"],
  },
  {
    slug: "gio-qua-tet-an-khang-thinh-vuong",
    code: "TQG11",
    name: "Giỏ Quà Tết T&Q GIFT An Khang Thịnh Vượng",
    occasion: "tet", kind: "gio", material: "gio-go", tags: ["ruou-vang", "yen-sao", "tra"],
    price: 3_300_000, originalPrice: 3_600_000, featured: true,
    tagline: "Giỏ gỗ sồi đóng tay, cho mùa Tết trọn vẹn.",
    description: "Giỏ gỗ sồi tự nhiên, quai da thật, khắc laser logo doanh nghiệp. Bộ quà đầy đủ rượu, trà, socola và đặc sản ba miền.",
    items: [
      "Giỏ gỗ sồi quai da thật, khắc laser logo",
      "01 Chai Vang Pháp Médoc 750ml",
      "01 Hộp Socola Bỉ 200g",
      "01 Hộp Trà Shan Tuyết 100g",
      "01 Hộp Yến Sào Tinh Chế 30g",
      "01 Hũ Hạt Điều Bình Phước 300g",
      "02 Hộp Mứt Sen, Mứt Gừng 150g",
      "Tặng thiệp chúc Tết của T&Q Gift",
    ],
    images: ["wineVineyard", "chocolateBox", "teaCup", "redGifts"],
  },
  {
    slug: "gio-qua-tet-xuan-sum-vay",
    code: "TQG12",
    name: "Giỏ Quà Tết T&Q GIFT Xuân Sum Vầy",
    occasion: "tet", kind: "gio", material: "gio-go", tags: ["tra", "ca-phe"],
    price: 480_000, originalPrice: 560_000,
    tagline: "Giỏ gỗ nhỏ, tặng gia đình nhân viên.",
    description: "Giỏ gỗ tròn nhỏ gọn, phủ giấy kính vàng. Trái cây sấy, trà và cà phê — ấm áp mà tiết kiệm.",
    items: [
      "Giỏ gỗ tròn, giấy kính vàng, nơ đỏ",
      "01 Hũ Trái Cây Sấy Hỗn Hợp 250g",
      "01 Hộp Trà Túi Lọc Atiso 25 Gói",
      "01 Hộp Cà Phê Phin Giấy 10 Gói",
      "01 Hộp Bánh Quy Bơ 150g",
      "Tặng thiệp chúc Tết của T&Q Gift",
    ],
    images: ["fruits", "teaGlass", "coffeeGround", "tulips"],
  },
  {
    slug: "hop-qua-tet-dai-cat-dai-loi",
    code: "TQG13",
    name: "Hộp Quà Tết T&Q GIFT Đại Cát Đại Lợi",
    occasion: "tet", kind: "hop", material: "hop-da", tags: ["ca-phe"],
    price: 2_150_000, originalPrice: 2_400_000,
    tagline: "Bộ quà cà phê đặc sản cho người sành vị.",
    description: "Hộp da đen khoá vàng, bên trong là bộ sưu tập cà phê đặc sản Việt Nam cùng phin pha và ly sứ in logo. Món quà có câu chuyện để kể.",
    items: [
      "Bộ hộp da đen khoá vàng, lót nhung, túi xách",
      "01 Gói Cà Phê Arabica Cầu Đất 250g",
      "01 Gói Cà Phê Robusta Honey Buôn Ma Thuột 250g",
      "01 Phin Inox Cao Cấp",
      "01 Ly Sứ Minh Long In Logo",
      "01 Hũ Hạt Macca 250g",
      "Tặng thiệp chúc Tết của T&Q Gift",
    ],
    images: ["espresso", "coffeeBag", "mixedNuts", "coffeeFlatlay"],
  },
  {
    slug: "gio-qua-tet-hung-thinh",
    code: "TQG14",
    name: "Giỏ Quà Tết T&Q GIFT Hưng Thịnh",
    occasion: "tet", kind: "gio", material: "gio-da", tags: ["tra"],
    price: 950_000, originalPrice: 1_090_000, badge: "Mới",
    tagline: "Giỏ da đỏ hiện đại, nắp mica trong.",
    description: "Giỏ da đỏ, nắp mica trong giúp nhìn thấy toàn bộ sản phẩm bên trong. Mật ong, hạt và trà đặc sản vùng cao.",
    items: [
      "Giỏ da đỏ nắp mica trong, quai kim loại",
      "01 Chai Mật Ong Hoa Cà Phê 350ml",
      "01 Hộp Trà Ô Long 100g",
      "01 Hũ Hạt Hạnh Nhân 250g",
      "01 Hũ Trái Cây Sấy 200g",
      "01 Hộp Bánh Quy 200g",
      "Tặng thiệp chúc Tết của T&Q Gift",
    ],
    images: ["berries", "honeyMandarin", "coffeeCookies", "kraftPinkRibbon"],
  },
  /* ----------------------------- Trung thu ------------------------------ */
  {
    slug: "hop-qua-trung-thu-nguyet-vien",
    code: "TQG15",
    name: "Hộp Quà Trung Thu T&Q GIFT Nguyệt Viên",
    occasion: "trung-thu", kind: "hop", material: "giay-ep-kim", tags: ["banh-trung-thu", "tra"],
    price: 690_000, originalPrice: 790_000, badge: "Bán chạy", featured: true,
    tagline: "Bốn vị bánh truyền thống, hộp ép kim ánh trăng.",
    description: "Hộp giấy cứng ép kim hoạ tiết trăng rằm và cành quế. Bốn bánh nướng thủ công cùng trà ô long — trọn vị đoàn viên.",
    items: [
      "Bộ hộp giấy cứng ép kim hoạ tiết trăng rằm, túi xách",
      "04 Bánh Nướng Thủ Công 150g (Thập cẩm, Đậu xanh, Hạt sen, Trà xanh)",
      "01 Hộp Trà Ô Long 50g",
      "Tặng thiệp chúc Trung thu của T&Q Gift",
    ],
    images: ["goldBows", "teaCup", "chocolateBar", "handmadeWrap"],
  },
  {
    slug: "hop-qua-trung-thu-doan-vien-cao-cap",
    code: "TQG16",
    name: "Hộp Quà Trung Thu T&Q GIFT Đoàn Viên Cao Cấp",
    occasion: "trung-thu", kind: "hop", material: "hop-go", tags: ["banh-trung-thu", "tra", "ruou-vang"],
    price: 1_850_000, originalPrice: 2_050_000, badge: "Cao cấp",
    tagline: "Hộp gỗ hai tầng, bánh và vang cho đối tác.",
    description: "Hộp gỗ hai tầng nắp nam châm, khắc laser logo. Tầng trên bánh nướng cao cấp, tầng dưới rượu vang và trà.",
    items: [
      "Bộ hộp gỗ hai tầng nắp nam châm, khắc laser logo, túi xách",
      "06 Bánh Nướng Cao Cấp 120g (Vi cá, Bào ngư, Gà quay, Sen trắng, Trà xanh, Đậu đỏ)",
      "01 Chai Vang Ý Chianti 750ml",
      "01 Hộp Trà Sen 50g",
      "Tặng thiệp chúc Trung thu của T&Q Gift",
    ],
    images: ["darkLuxuryGifts", "wineGrapes", "teaPot", "chocolateStack"],
  },
  /* ----------------------------- Sự kiện -------------------------------- */
  {
    slug: "giftset-van-phong-thinh-vuong",
    code: "TQG17",
    name: "Bộ Giftset Văn Phòng T&Q GIFT Thịnh Vượng",
    occasion: "su-kien", kind: "giftset", material: "giftset", tags: ["ca-phe"],
    price: 420_000, originalPrice: 490_000, badge: "Mới", featured: true,
    tagline: "Quà sinh nhật công ty, 8/3, 20/10 số lượng lớn.",
    description: "Bộ giftset văn phòng gồm bình giữ nhiệt, sổ tay bìa da và bút kim loại, tất cả khắc logo doanh nghiệp. Hộp giấy cứng nam châm.",
    items: [
      "Hộp giấy cứng nắp nam châm, lót xốp định hình",
      "01 Bình Giữ Nhiệt Inox 500ml Khắc Logo",
      "01 Sổ Tay Bìa Da A5 Dập Logo",
      "01 Bút Ký Kim Loại Khắc Tên",
      "01 Gói Cà Phê Drip 5 Gói",
      "Tặng thiệp chúc mừng của T&Q Gift",
    ],
    images: ["handmadeWrap", "coffeeBag", "kraftPinkRibbon", "coffeeLatte"],
  },
  {
    slug: "hop-qua-8-3-sac-hoa",
    code: "TQG18",
    name: "Hộp Quà 8/3 T&Q GIFT Sắc Hoa",
    occasion: "su-kien", kind: "hop", material: "giay-ep-kim", tags: ["tra"],
    price: 550_000, originalPrice: 620_000,
    tagline: "Quà tặng nữ nhân viên, khách hàng dịp 8/3 và 20/10.",
    description: "Hộp giấy ép kim pastel, hoa tươi bảo quản và trà hoa. Món quà tinh tế gửi đến phái đẹp trong công ty và đối tác.",
    items: [
      "Hộp giấy ép kim pastel, nơ lụa, túi xách",
      "01 Hộp Hoa Hồng Bảo Quản",
      "01 Hộp Trà Hoa Hồng Mật Ong 80g",
      "01 Hộp Socola Bỉ 8 Viên",
      "01 Hũ Trái Cây Sấy 150g",
      "Tặng thiệp chúc mừng của T&Q Gift",
    ],
    images: ["tulips", "teaGlass", "chocolateBox", "blossom"],
  },
];

/* ------------------------------ Helpers ---------------------------------- */

/** Sản phẩm đang bán (không bị admin ẩn) */
export const visibleProducts = products.filter((p) => !p.hidden);

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
export function getMaterial(id: MaterialId) {
  return materials.find((m) => m.id === id)!;
}
export function getGroup(id: string) {
  return groups.find((g) => g.id === id);
}
export function occasionLabel(o: Occasion) {
  return { tet: "Quà Tết", "trung-thu": "Quà Trung Thu", "su-kien": "Quà dịp lễ & sự kiện" }[o];
}
export function kindLabel(k: Kind) {
  return { hop: "Hộp quà", gio: "Giỏ quà", giftset: "Giftset" }[k];
}
export function getFeatured(limit = 6) {
  return visibleProducts.filter((p) => p.featured).slice(0, limit);
}
export function getRelated(product: Product, limit = 4) {
  return visibleProducts
    .filter((p) => p.slug !== product.slug && p.occasion === product.occasion)
    .slice(0, limit);
}
export function byGroup(groupId: string, limit?: number) {
  const g = getGroup(groupId);
  const list = g ? visibleProducts.filter(g.match) : [];
  return limit ? list.slice(0, limit) : list;
}
export function byTag(tag: Tag, limit?: number) {
  const list = visibleProducts.filter((p) => p.tags.includes(tag));
  return limit ? list.slice(0, limit) : list;
}
export function productImageSrc(p: Product, index = 0) {
  return img[p.images[index] ?? p.images[0]];
}
export function searchProducts(q: string, limit = 6) {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  return visibleProducts
    .filter((p) => p.name.toLowerCase().includes(s) || p.code.toLowerCase().includes(s) || p.items.some((i) => i.toLowerCase().includes(s)))
    .slice(0, limit);
}
