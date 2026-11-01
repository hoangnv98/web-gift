/**
 * Lời đánh giá gợi ý cho trang /danh-gia – khách sao chép rồi dán lên Google Maps.
 * Viết tự nhiên, đa dạng độ dài và góc nhìn để các đánh giá không trùng nhau.
 */
export interface ReviewGroup { id: string; label: string; items: string[] }

export const reviewGroups: ReviewGroup[] = [
  {
    id: "chat-luong",
    label: "Chất lượng & mẫu mã",
    items: [
      "Hộp quà Tết của T&Q GIFT rất sang, hộp cứng ép kim chắc chắn, bên trong đầy đủ như mô tả. Đối tác nhận quà ai cũng khen.",
      "Mẫu mã đẹp, màu sắc chuẩn Tết, thành phần toàn hàng nhập khẩu có tem nhãn rõ ràng. Rất đáng tiền.",
      "Đặt 50 hộp quà cho khách hàng VIP, hộp nào cũng đồng đều, không móp méo. Mình sẽ quay lại mùa Trung thu.",
      "Giỏ quà Tết trình bày tinh tế, rượu vang và bánh kẹo đều là hàng chính hãng. Rất hài lòng với T&Q GIFT.",
      "Set quà Trung thu đóng gói kỹ, bánh ngon, hộp gỗ khắc laser logo công ty rất đẹp.",
    ],
  },
  {
    id: "dich-vu",
    label: "Tư vấn & dịch vụ",
    items: [
      "Tư vấn viên nhiệt tình, gợi ý đúng ngân sách công ty, gửi catalogue và báo giá chỉ sau 30 phút.",
      "Bên T&Q GIFT hỗ trợ in logo miễn phí, duyệt maquette nhanh, xuất hoá đơn VAT đầy đủ. Làm việc rất chuyên nghiệp.",
      "Mình cần gấp 100 phần quà trong 5 ngày, shop vẫn kịp tiến độ và chất lượng không đổi. Cảm ơn T&Q GIFT!",
      "Hỏi gì cũng được giải đáp rõ ràng, có thể đổi thành phần trong hộp theo ý mình. Dịch vụ 5 sao.",
      "Giao dịch rõ ràng, hợp đồng và chứng từ đầy đủ, rất phù hợp cho doanh nghiệp đặt quà số lượng lớn.",
    ],
  },
  {
    id: "giao-hang",
    label: "Giao hàng & đóng gói",
    items: [
      "Giao hàng đúng hẹn, đóng thùng cẩn thận, hộp quà nguyên vẹn dù chuyển từ Bắc Ninh vào TP.HCM.",
      "Ship toàn quốc nhanh, có thể giao tận nơi cho từng khách hàng của công ty mình. Rất tiện.",
      "Nhận hàng kiểm tra đủ số lượng, thiệp chúc Tết in tên khách rất chỉn chu. Sẽ ủng hộ lâu dài.",
      "Đóng gói kỹ từng hộp, có túi xách đi kèm, mang đi biếu rất lịch sự.",
    ],
  },
  {
    id: "tong-quan",
    label: "Nhận xét chung",
    items: [
      "Địa chỉ quà Tết doanh nghiệp uy tín ở Bắc Ninh. Giá hợp lý, chất lượng tốt, chiết khấu tốt khi đặt số lượng.",
      "Đã đặt quà Tết ở T&Q GIFT hai năm liền, năm nào cũng hài lòng. Recommend cho các công ty cần quà biếu đối tác.",
      "Showroom ở Từ Sơn dễ tìm, có sẵn mẫu để xem trực tiếp, nhân viên thân thiện.",
      "Quà tặng đẹp, dịch vụ tốt, giá cả minh bạch. 5 sao cho T&Q GIFT.",
    ],
  },
];

export const allReviews = reviewGroups.flatMap((g) => g.items);
