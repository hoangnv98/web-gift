import { site } from "./site";

export interface Policy {
  slug: string;
  title: string;
  updated: string;
  sections: { heading: string; paragraphs: string[] }[];
}

const c = site.company;

export const policies: Policy[] = [
  {
    slug: "chinh-sach-bao-mat",
    title: "Chính sách bảo mật thông tin",
    updated: "2026-10-01",
    sections: [
      { heading: "1. Mục đích thu thập thông tin", paragraphs: ["Website tqgift.vn thu thập họ tên, số điện thoại, email, địa chỉ giao hàng và tên doanh nghiệp của khách hàng nhằm xác nhận đơn hàng, giao hàng, xuất hoá đơn và chăm sóc sau bán hàng."] },
      { heading: "2. Phạm vi sử dụng thông tin", paragraphs: ["Thông tin chỉ được sử dụng nội bộ bởi " + c.legalName + " và đơn vị vận chuyển để hoàn tất đơn hàng. Chúng tôi không bán, trao đổi thông tin khách hàng cho bên thứ ba vì mục đích thương mại."] },
      { heading: "3. Thời gian lưu trữ", paragraphs: ["Thông tin được lưu trữ trong suốt quá trình giao dịch và tối đa 24 tháng sau đó để phục vụ bảo hành, đổi trả và nghĩa vụ kế toán, trừ khi khách hàng yêu cầu xoá sớm hơn."] },
      { heading: "4. Quyền của khách hàng", paragraphs: ["Khách hàng có quyền yêu cầu kiểm tra, cập nhật hoặc xoá thông tin cá nhân bằng cách liên hệ hotline " + site.hotline + " hoặc email " + site.email + "."] },
      { heading: "5. Cam kết bảo mật", paragraphs: ["Dữ liệu được lưu trên máy chủ có mã hoá SSL. Chỉ nhân sự được uỷ quyền mới truy cập được thông tin khách hàng. Khi phát hiện rò rỉ, chúng tôi sẽ thông báo cho khách hàng và cơ quan chức năng trong vòng 72 giờ."] },
    ],
  },
  {
    slug: "chinh-sach-thanh-toan",
    title: "Chính sách thanh toán",
    updated: "2026-10-01",
    sections: [
      { heading: "1. Hình thức thanh toán", paragraphs: ["Chuyển khoản ngân hàng theo thông tin trên hợp đồng hoặc báo giá; thanh toán tiền mặt khi nhận hàng (COD) với đơn lẻ dưới 5.000.000đ; thanh toán qua cổng trực tuyến (sẽ cập nhật)."] },
      { heading: "2. Đơn hàng doanh nghiệp", paragraphs: ["Đơn từ 10 phần quà trở lên: đặt cọc 50% khi ký hợp đồng, thanh toán phần còn lại trước khi giao hàng hoặc theo thoả thuận trong hợp đồng. Hoá đơn GTGT xuất theo thông tin doanh nghiệp cung cấp."] },
      { heading: "3. Xác nhận thanh toán", paragraphs: ["Sau khi nhận được thanh toán, T&Q GIFT xác nhận qua email hoặc Zalo trong vòng 24 giờ làm việc và tiến hành sản xuất, giao hàng theo lịch đã thống nhất."] },
    ],
  },
  {
    slug: "chinh-sach-van-chuyen",
    title: "Chính sách vận chuyển",
    updated: "2026-10-01",
    sections: [
      { heading: "1. Phạm vi giao hàng", paragraphs: ["Giao hàng toàn quốc 63 tỉnh thành. Nội thành Hà Nội, Bắc Ninh và TP. Hồ Chí Minh giao trong 1–2 ngày làm việc; các tỉnh khác 2–5 ngày làm việc kể từ khi hàng xuất kho."] },
      { heading: "2. Phí vận chuyển", paragraphs: ["Miễn phí giao hàng nội tỉnh Bắc Ninh và nội thành Hà Nội với đơn từ 30 phần. Các khu vực khác tính theo biểu phí đơn vị vận chuyển, được báo rõ trong báo giá."] },
      { heading: "3. Đóng gói", paragraphs: ["Mỗi phần quà được bọc chống sốc, dán tem niêm phong. Sản phẩm thuỷ tinh (rượu, mật ong) được chèn xốp định hình riêng. Đơn giao tới nhiều địa chỉ người nhận được dán nhãn tên từng người."] },
      { heading: "4. Kiểm tra khi nhận", paragraphs: ["Khách hàng vui lòng kiểm tra tình trạng bên ngoài kiện hàng trước khi ký nhận. Nếu kiện hàng móp méo, ướt, vui lòng chụp ảnh và báo ngay hotline để được xử lý."] },
    ],
  },
  {
    slug: "chinh-sach-kiem-hang-doi-tra",
    title: "Chính sách kiểm hàng & đổi trả",
    updated: "2026-10-01",
    sections: [
      { heading: "1. Kiểm hàng", paragraphs: ["Khách hàng được kiểm tra số lượng và tình trạng bên ngoài hộp quà khi nhận. Với đơn doanh nghiệp, T&Q GIFT gửi ảnh kiểm tra từng lô trước khi xuất kho."] },
      { heading: "2. Điều kiện đổi trả", paragraphs: ["Đổi mới 1:1 trong vòng 3 ngày kể từ khi nhận hàng nếu sản phẩm bị vỡ, hỏng do vận chuyển, sai mẫu hoặc sai số lượng so với đơn hàng. Sản phẩm thực phẩm cận hoặc hết hạn sử dụng tại thời điểm giao được đổi ngay."] },
      { heading: "3. Trường hợp không áp dụng", paragraphs: ["Không đổi trả với sản phẩm đã in/khắc logo riêng theo yêu cầu (trừ lỗi từ T&Q GIFT), sản phẩm đã mở niêm phong sử dụng hoặc hư hỏng do bảo quản sai cách."] },
      { heading: "4. Cách thức", paragraphs: ["Liên hệ hotline " + site.hotline + " hoặc Zalo kèm ảnh/video sản phẩm. Chúng tôi phản hồi trong 24 giờ làm việc và thu hồi, đổi hàng miễn phí vận chuyển."] },
    ],
  },
  {
    slug: "dieu-khoan-giao-dich-chung",
    title: "Điều khoản giao dịch chung",
    updated: "2026-10-01",
    sections: [
      { heading: "1. Chủ sở hữu website", paragraphs: [c.legalName + ". Địa chỉ: " + c.address + ". Người đại diện: " + c.representative + ". Điện thoại: " + c.phone + "."] },
      { heading: "2. Giá và thuế", paragraphs: ["Giá niêm yết trên website chưa bao gồm VAT. Giá có thể thay đổi theo mùa và số lượng đặt; giá chính thức là giá ghi trong báo giá hoặc hợp đồng đã ký."] },
      { heading: "3. Rượu và đồ uống có cồn", paragraphs: ["T&Q GIFT không bán rượu cho người dưới 18 tuổi và phụ nữ đang mang thai. Khách hàng xác nhận đủ 18 tuổi khi xem và đặt các sản phẩm có rượu."] },
      { heading: "4. Nghĩa vụ các bên", paragraphs: ["Khách hàng cung cấp thông tin chính xác để giao hàng và xuất hoá đơn. T&Q GIFT giao đúng mẫu, đúng số lượng, đúng hẹn như hợp đồng; nếu chậm trễ do lỗi của T&Q GIFT, khách hàng được giảm 5% giá trị phần giao chậm."] },
      { heading: "5. Giải quyết tranh chấp", paragraphs: ["Mọi tranh chấp được ưu tiên giải quyết bằng thương lượng. Nếu không đạt thoả thuận, tranh chấp được đưa ra Toà án có thẩm quyền tại tỉnh Bắc Ninh."] },
    ],
  },
];

export function getPolicy(slug: string) {
  return policies.find((p) => p.slug === slug);
}
