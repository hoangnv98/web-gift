import type { ImageKey } from "@/lib/images";

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  cover: ImageKey;
  category: string;
  body: string[]; // paragraphs
}

export const posts: Post[] = [
  {
    slug: "y-nghia-qua-tet-doanh-nghiep",
    title: "Ý nghĩa của quà Tết doanh nghiệp và cách chọn quà đúng tầm",
    excerpt: "Quà Tết không chỉ là món quà vật chất mà là lời tri ân được gói ghém. Bài viết gợi ý cách chọn quà theo đối tượng và ngân sách.",
    date: "2026-10-01",
    cover: "redGifts",
    category: "Cẩm nang quà tặng",
    body: [
      "Trong văn hoá kinh doanh Việt Nam, món quà Tết gửi đến đối tác và nhân viên là cách doanh nghiệp nói lời cảm ơn cho một năm đồng hành. Giá trị món quà không nằm ở con số mà ở sự phù hợp: đúng người, đúng dịp, đúng thông điệp.",
      "Với đối tác chiến lược, hãy ưu tiên hộp gỗ, hộp da hoặc sơn mài có thể giữ lại sau Tết, kết hợp rượu vang nhập khẩu và đặc sản có nguồn gốc rõ ràng. Với tập thể nhân viên, hộp giấy ép kim với trà, hạt và bánh là lựa chọn cân bằng giữa chi phí và sự chỉn chu.",
      "Đừng quên cá nhân hoá: thiệp in tên doanh nghiệp, tem logo trên hộp hay dòng chúc viết tay là những chi tiết nhỏ khiến người nhận cảm nhận được sự trân trọng.",
    ],
  },
  {
    slug: "quy-trinh-dat-qua-tet-so-luong-lon",
    title: "Quy trình đặt quà Tết số lượng lớn: 5 bước để không bị trễ hẹn",
    excerpt: "Mùa cao điểm quà Tết thường bắt đầu từ tháng 11. Đây là lịch trình chuẩn để doanh nghiệp nhận hàng đúng hẹn.",
    date: "2026-09-18",
    cover: "darkLuxuryGifts",
    category: "Doanh nghiệp",
    body: [
      "Bước 1 – Xác định ngân sách và số lượng: chia nhóm người nhận (đối tác VIP, khách hàng, nhân viên) và mức giá tương ứng cho từng nhóm.",
      "Bước 2 – Chọn mẫu và duyệt mock-up: T&Q GIFT gửi 3–5 mẫu phù hợp kèm mock-up thiệp, tem logo trong 24 giờ.",
      "Bước 3 – Ký hợp đồng, đặt cọc: khoá lịch sản xuất, đặc biệt quan trọng với hộp in riêng và hộp sơn mài.",
      "Bước 4 – Sản xuất, kiểm tra: mỗi phần quà được kiểm tra trước khi niêm phong, có ảnh báo cáo gửi khách.",
      "Bước 5 – Giao hàng và xuất hoá đơn: giao tận văn phòng hoặc từng địa chỉ người nhận, hoá đơn GTGT đầy đủ.",
    ],
  },
  {
    slug: "xu-huong-qua-trung-thu-2026",
    title: "Xu hướng quà Trung thu doanh nghiệp: tối giản, bền vững và có câu chuyện",
    excerpt: "Hộp bánh Trung thu năm nay chuộng chất liệu gỗ, giấy tái chế và thành phần có xuất xứ rõ ràng.",
    date: "2026-08-05",
    cover: "goldBows",
    category: "Xu hướng",
    body: [
      "Thay vì những hộp bánh in màu rực rỡ, doanh nghiệp đang chuyển sang hộp gỗ nắp nam châm, hộp giấy kraft ép kim với thiết kế tối giản. Những chiếc hộp này có thể tái sử dụng, phù hợp với thông điệp bền vững mà nhiều thương hiệu theo đuổi.",
      "Thành phần bên trong cũng thay đổi: bánh nướng nhân truyền thống kết hợp trà ô long, hoặc bánh ít ngọt hơn cho văn phòng. Một số doanh nghiệp còn thêm rượu vang hoặc cà phê đặc sản để hộp quà dùng được lâu hơn mùa trăng.",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
