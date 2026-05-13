# 🚩 BẢN LĨNH CÔNG NHÂN - Mini Game Trắc Nghiệm Lý Luận

Một ứng dụng mini-game trắc nghiệm tương tác về chủ đề **Sứ mệnh lịch sử của Giai cấp công nhân** và **Chủ nghĩa Xã hội Khoa học**, được xây dựng bằng React + Vite.

## 🌟 Tổng quan
Dự án này là một ứng dụng học tập tương tác được thiết kế để hỗ trợ sinh viên ôn tập kiến thức môn học **Chủ nghĩa Xã hội Khoa học** (đặc biệt là nội dung về Giai cấp công nhân). Thay vì các bài trắc nghiệm truyền thống khô khan, ứng dụng sử dụng cơ chế lật thẻ bài (Card Flip) giúp tăng tính hấp dẫn và khả năng ghi nhớ.

## 🚀 Tính năng nổi bật
- **Giao diện Premium**: Thiết kế chuyên nghiệp với tông màu đỏ cách mạng, hiệu ứng Glassmorphism và các hiệu ứng chuyển cảnh mượt mà.
- **Cơ chế Lật thẻ (Card Flip)**: Hệ thống 10 thẻ câu hỏi ẩn dưới các biểu tượng (icons) sinh động, tạo sự tò mò cho người học.
- **Hệ thống Giải thích Chi tiết**: Sau mỗi câu hỏi đúng, hệ thống cung cấp phần giải thích chuyên sâu giúp củng cố kiến thức ngay lập tức.
- **Đánh giá Năng lực**: Tổng kết điểm số cuối game kèm theo những nhận xét khích lệ dựa trên kết quả đạt được.
- **Thiết kế Responsive**: Hoạt động hoàn hảo trên mọi thiết bị: Desktop, Tablet và Mobile.

## 🎯 Luật chơi
1. **Khởi đầu**: Nhấn nút **"BẮT ĐẦU NHIỆM VỤ"** tại màn hình chính.
2. **Thử thách**: Chọn một trong 10 thẻ bài trên màn hình để mở câu hỏi trắc nghiệm tương ứng.
3. **Chinh phục**:
   - Chọn đáp án mà đồng chí cho là đúng.
   - Nếu chọn sai: Có thể thử lại cho đến khi tìm ra đáp án đúng (tính kiên trì cách mạng).
   - Nếu chọn đúng: Hệ thống sẽ hiển thị bảng giải thích chi tiết.
4. **Về đích**: Hoàn thành toàn bộ 10 thẻ bài để xem bảng điểm tổng kết và xếp hạng năng lực lý luận.

## 🛠️ Công nghệ sử dụng
- **React 18**: Thư viện UI mạnh mẽ.
- **Vite**: Công cụ build cực nhanh cho dự án web hiện đại.
- **Vanilla CSS**: Hệ thống style tùy chỉnh hoàn toàn (Socialist Design System).
- **LocalStorage**: (Tùy chọn) Hỗ trợ lưu trữ trạng thái người chơi.

## 💻 Cài đặt và Chạy thử

### Yêu cầu
- Node.js phiên bản 16 trở lên.

### Các bước thực hiện
1. Clone repository hoặc tải mã nguồn về máy.
2. Mở terminal tại thư mục dự án và cài đặt dependencies:
   ```bash
   npm install
   ```
3. Khởi chạy môi trường phát triển:
   ```bash
   npm run dev
   ```
4. Truy cập trình duyệt tại địa chỉ: `http://localhost:5173`

## 📂 Cấu trúc dự án
```text
src/
├── components/
│   ├── CardFlipGame.jsx      # Logic chính của trò chơi
│   ├── CardFlipGame.css      # Giao diện và hiệu ứng
│   └── ...                   # Các component phụ khác
├── data/
│   └── gameData.js           # Bộ câu hỏi và cấu hình game
├── App.jsx                   # Entry point của ứng dụng
└── main.jsx                  # Khởi tạo React
```

## 📝 Tùy chỉnh bộ câu hỏi
Để thay đổi nội dung câu hỏi hoặc đáp án, hãy truy cập file `src/data/gameData.js` và chỉnh sửa mảng `SAMPLE_QUESTIONS`:

```javascript
export const SAMPLE_QUESTIONS = [
  {
    id: 1,
    question: "Nội dung câu hỏi của bạn?",
    options: [
      "Đáp án A",
      "Đáp án B",
      "Đáp án C",
      "Đáp án D"
    ],
    correctAnswer: "Đáp án A",
    explanation: "Phần giải thích chi tiết cho câu hỏi này..."
  },
  // ... tiếp tục cho các câu hỏi khác
];
```

## 🚀 Triển khai (Deployment)
Dự án được tối ưu hóa để triển khai nhanh chóng trên **Vercel**:
1. Đẩy mã nguồn lên GitHub/GitLab.
2. Kết nối kho lưu trữ với Vercel Dashboard.
3. Vercel sẽ tự động nhận diện cấu hình Vite và triển khai chỉ trong vài giây.

---
**Phát triển bởi ❤️ dành cho cộng đồng sinh viên yêu thích lý luận.**
