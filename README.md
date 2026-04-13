# 🎮 Team Quiz Game

Một ứng dụng quiz tương tác cho 7 đội chơi, xây dựng bằng React + Vite.

## 📋 Tính năng

✅ **7 đội chơi** - Quản lý điểm số tự động cho mỗi đội
✅ **14 câu hỏi** - 10 câu MCQ thường + 4 câu đặc biệt
✅ **Chọn đội bất kỳ** - Không bắt buộc theo thứ tự  
✅ **Hiệu ứng đặc biệt** - 2 câu +1 điểm, 2 câu -1 điểm  
✅ **Lưu dữ liệu** - localStorage giữ điểm khi reload  
✅ **UI đẹp & responsive** - Hoạt động trên desktop & mobile

## 🎯 Luật chơi

1. Click **"BẮT ĐẦU CHƠI"** để khởi động game
2. Chọn một trong 7 đội chơi (click card điểm bảng)
3. Click vào câu hỏi bất kỳ (1-14) để mở
4. **Trả lời đúng**: +1 điểm (hoặc +2 nếu dùng ⭐)
5. **Trả lời sai**: -1 điểm, câu hỏi vẫn mở cho đội khác chọn lại
6. **4 câu Special** (11-14 theo vị trí ngẫu nhiên):
   - 2 câu thưởng: +1 điểm tự động
   - 2 câu phạt: -1 điểm tự động
7. **Sao Power-Up** ⭐: Mỗi đội 1 sao, dùng 1 lần
   - Đúng + sao: +2 thay vì +1
   - Sai + sao: vẫn -1 (sao bị lãng phí)
8. Điểm được lưu tự động, reload không mất dữ liệu

## 🚀 Cài đặt & Chạy

### Yêu cầu
- Node.js >= 16

### Bước 1: Cài dependencies
```bash
npm install
```

### Bước 2: Chạy dev server
```bash
npm run dev
```
Truy cập: `http://localhost:5173`

### Bước 3: Build cho production
```bash
npm run build
```

## 📝 Thay đổi câu hỏi

### Thay MCQ questions (Câu 1-10)

Mở file `src/data/gameData.js` và cập nhật mảng `SAMPLE_QUESTIONS`:

```javascript
export const SAMPLE_QUESTIONS = [
  {
    id: 1,
    question: "Câu hỏi của bạn?",
    options: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
    correctAnswer: "Đáp án A"
  },
  // ... thêm 9 câu nữa
];
```

### Tùy chỉnh Special Questions (Câu 11-14)

```javascript
export const SPECIAL_QUESTIONS = [
  {
    id: 11,
    question: "Thêm 1 điểm",
    specialEffect: "plus",
    points: 1
  },
  {
    id: 12,
    question: "Thêm 1 điểm",
    specialEffect: "plus",
    points: 1
  },
  {
    id: 13,
    question: "Trừ 1 điểm",
    specialEffect: "minus",
    points: -1
  },
  {
    id: 14,
    question: "Trừ 1 điểm",
    specialEffect: "minus",
    points: -1
  }
];
```

## 🎨 Tùy chỉnh giao diện

### Đổi tên/màu đội

Mở `src/data/gameData.js`, sửa mảng `TEAMS`:

```javascript
export const TEAMS = [
  { id: 1, name: "Tên đội 1", color: "#FF6B6B" },
  { id: 2, name: "Tên đội 2", color: "#4ECDC4" },
  // ...
];
```

### Đổi icon câu hỏi

```javascript
export const QUESTION_ICONS = [
  "🎯", "🎪", "🎨", // ... thêm emoji khác
];
```

## 📦 Deploy lên Vercel

### Cách 1: GitHub Push
```bash
git init
git add .
git commit -m "Initial commit"
git push -u origin main
```
Sau đó connect repo từ Vercel dashboard

### Cách 2: Vercel CLI
```bash
npm install -g vercel
vercel
```

## 🗂️ Cấu trúc thư mục

```
src/
├── components/
│   ├── TeamQuizGame.jsx      # Main component
│   ├── TeamScoreboard.jsx    # Bảng điểm
│   ├── QuestionBoard.jsx     # Bảng câu hỏi
│   ├── QuestionModal.jsx     # Modal câu hỏi
│   └── *.css                 # Styles
├── data/
│   └── gameData.js           # Câu hỏi & cấu hình
├── App.jsx
├── index.css
└── main.jsx
```

## 💾 localStorage

Game tự động lưu:
- **Điểm của mỗi đội** → `quizGameScores`
- **Câu đã mở** → `quizGameOpenedQuestions`

Click **"Reset"** để xóa tất cả dữ liệu.

## ✅ Lưu ý khi sử dụng

- ✓ localStorage chỉ lưu trong cùng trình duyệt (private/incognito sẽ reset)
- ✓ Mỗi tab mở mới dùng chung dữ liệu
- ✓ Có thể export/backup JSON nếu cần lưu dài hạn

## 📱 Responsive Design

- ✅ Desktop (1400px+)
- ✅ Tablet (768px - 1399px)
- ✅ Mobile (dưới 768px)

## 🤔 FAQ

**Q: Làm sao khôi phục điểm nếu reload nhầm?**
A: localStorage giữ dữ liệu tự động, chỉ cần refresh lại trang

**Q: Làm sao reset game?**
A: Click nút **"↺ Reset"** hoặc xóa localStorage:
```javascript
localStorage.removeItem('quizGameScores');
localStorage.removeItem('quizGameOpenedQuestions');
```

**Q: Deploy lên Vercel mất lâu không?**
A: Vite static build rất nhanh, thường < 1 phút

## 📄 License

MIT

---

**Made with ❤️ for Team Quiz Game**
