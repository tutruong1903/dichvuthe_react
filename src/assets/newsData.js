export const newsItems = [
  {
    id: "1",
    slug: "uu-dai-the-tin-dung-11-2024",
    title: "Tổng hợp ưu đãi thẻ tín dụng tháng 11/2024",
    author: "Nguyễn Minh Anh",
    date: "2024-11-05",
    coverImage: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?q=80&w=1600&auto=format&fit=crop",
    excerpt: "Danh sách ưu đãi hoàn tiền, tích điểm, trả góp 0% và miễn phí thường niên nổi bật trong tháng 11/2024 cho chủ thẻ các ngân hàng lớn.",
    content: `Trong tháng 11/2024, hàng loạt ngân hàng triển khai chương trình ưu đãi mạnh nhằm kích thích chi tiêu qua thẻ tín dụng. Nổi bật có hoàn tiền lên tới 20% cho chi tiêu siêu thị và thương mại điện tử, nhân 3–5 lần điểm thưởng cho giao dịch du lịch, cũng như ưu đãi trả góp 0% lãi suất cho các ngành hàng điện máy, sức khỏe và giáo dục.

Ngoài quyền lợi chung, mỗi ngân hàng có điều kiện áp dụng riêng: giới hạn số tiền hoàn tối đa, danh mục MCC hợp lệ, hoặc yêu cầu đăng ký trước trên app. Chủ thẻ nên kiểm tra kỹ thể lệ từng chương trình, chú ý thời gian ghi nhận giao dịch và hạn mức ưu đãi theo tuần/tháng để tối ưu quyền lợi. Một mẹo nhỏ là chia đơn thanh toán thành nhiều giao dịch nhỏ đúng ngưỡng yêu cầu để tận dụng tối đa mức hoàn.

Cuối cùng, đừng quên theo dõi thông báo từ ngân hàng và giữ hóa đơn để đối chiếu khi có sai sót phát sinh. Việc quản lý chi tiêu bằng công cụ theo dõi hạng mục sẽ giúp bạn kiểm soát tốt hơn và tránh phí phát sinh không đáng có.`
  },
  {
    id: "2",
    slug: "huong-dan-tang-han-muc-an-toan",
    title: "Hướng dẫn tăng hạn mức thẻ an toàn",
    author: "Trần Hoàng Long",
    date: "2024-10-18",
    coverImage: "https://images.unsplash.com/photo-1556745753-b2904692b3cd?q=80&w=1600&auto=format&fit=crop",
    excerpt: "Các bước chuẩn bị hồ sơ, thời điểm nộp yêu cầu, và lưu ý quan trọng để tăng hạn mức thẻ tín dụng nhanh chóng mà vẫn giữ điểm tín dụng khỏe mạnh.",
    content: `Trước khi đề nghị tăng hạn mức, bạn cần xây dựng lịch sử tín dụng tốt: thanh toán đúng hạn tối thiểu 6 tháng, không để dư nợ vượt 70% hạn mức hiện tại và hạn chế rút tiền mặt. Chuẩn bị sao kê thu nhập mới nhất, hợp đồng lao động/nguồn thu ổn định và ghi chú các khoản nợ hiện có.

Thời điểm nộp yêu cầu phù hợp là ngay sau khi bạn nhận lương/thu nhập tăng hoặc khi ngân hàng mời nâng hạn. Trong quá trình xét duyệt, ngân hàng có thể yêu cầu thêm chứng từ hoặc gọi điện xác minh. Hãy trả lời trung thực, nhất quán và nhấn mạnh mục đích sử dụng hợp lý (mua sắm thiết yếu, du lịch, công tác...).

Sau khi được tăng hạn, hãy tiếp tục duy trì tỷ lệ sử dụng hạn mức ở mức lành mạnh (dưới 30–40%), thiết lập nhắc nhở thanh toán tự động và kiểm tra sao kê để phòng các giao dịch bất thường.`
  },
  {
    id: "3",
    slug: "so-sanh-uu-diem-the-dong-hang",
    title: "So sánh nhanh ưu điểm các dòng thẻ phổ biến",
    author: "Phạm Thu Hà",
    date: "2024-09-02",
    coverImage: "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=1600&auto=format&fit=crop",
    excerpt: "Nên chọn thẻ hoàn tiền, tích điểm hay du lịch? Bảng so sánh thực tế giúp bạn đưa ra quyết định dựa trên thói quen chi tiêu của chính mình.",
    content: `Mỗi dòng thẻ có thế mạnh riêng. Thẻ hoàn tiền phù hợp với người chi tiêu hàng ngày tại siêu thị, dịch vụ số với khuyến mãi đơn giản, minh bạch. Thẻ tích điểm đem lại khả năng quy đổi quà đa dạng, phù hợp người thích săn ưu đãi hệ sinh thái. Thẻ du lịch tối ưu cho người bay thường xuyên nhờ dặm bay, nâng hạng hội viên và quyền vào phòng chờ sân bay.

Khi chọn thẻ, hãy cân nhắc: mức phí thường niên, yêu cầu chi tiêu tối thiểu để được hoàn/miễn phí, mạng lưới ưu đãi đối tác, bảo hiểm đi kèm và công cụ quản lý chi tiêu. Nếu khó chọn, bắt đầu bằng thẻ hoàn tiền cơ bản rồi mở rộng thêm thẻ chuyên dụng khi nhu cầu rõ ràng hơn.`
  }
]

export function getNewsBySlug(slug) {
  return newsItems.find((n) => n.slug === slug)
} 