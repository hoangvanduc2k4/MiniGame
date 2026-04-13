// Sample questions data - 10 random MCQ questions with answers
// You can replace these with your actual questions later
export const SAMPLE_QUESTIONS = [
  {
    id: 1,
    question: "Theo Hồ Chí Minh, văn hóa có mối quan hệ như thế nào với kinh tế và chính trị?",
    options: [
      "Văn hóa đứng ngoài kinh tế và chính trị",
      "Văn hóa là một phần của đời sống xã hội, nằm trong kinh tế và chính trị",
      "Văn hóa chỉ phục vụ kinh tế",
      "Văn hóa quan trọng hơn kinh tế"
    ],
    correctAnswer: "Văn hóa là một phần của đời sống xã hội, nằm trong kinh tế và chính trị"
  },
  {
    id: 2,
    question: "Hồ Chí Minh khẳng định \"Văn hóa soi đường cho quốc dân đi\". Câu nói này nhấn mạnh vai trò gì của văn hóa?",
    options: [
      "Chỉ giải trí",
      "Dẫn dắt và định hướng cho sự phát triển của dân tộc",
      "Chỉ trang trí xã hội",
      "Chỉ thuộc về nghệ sĩ"
    ],
    correctAnswer: "Dẫn dắt và định hướng cho sự phát triển của dân tộc"
  },
  {
    id: 3,
    question: "Nền văn hóa mới theo tư tưởng Hồ Chí Minh có ba tính chất chính. Tính \"dân tộc\" được hiểu là gì?",
    options: [
      "Giữ nguyên tất cả phong tục cũ",
      "Giữ gìn bản sắc dân tộc đồng thời tiếp thu tinh hoa văn hóa nhân loại",
      "Học theo hoàn toàn văn hóa nước ngoài",
      "Chỉ tập trung vào văn hóa cổ"
    ],
    correctAnswer: "Giữ gìn bản sắc dân tộc đồng thời tiếp thu tinh hoa văn hóa nhân loại"
  },
  {
    id: 4,
    question: "\"Đạo đức là gốc\" theo Hồ Chí Minh là nguyên tắc quan trọng trong việc xây dựng cái gì?",
    options: [
      "Kinh tế thị trường",
      "Con người mới và nền văn hóa mới",
      "Chỉ chính trị",
      "Chỉ quân sự"
    ],
    correctAnswer: "Con người mới và nền văn hóa mới"
  },
  {
    id: 5,
    question: "Hiện tượng nào sau đây là biểu hiện \"lệch văn hóa\" rõ nét trên mạng xã hội?",
    options: [
      "Chia sẻ kiến thức học tập",
      "Livestream chửi bới, xúc phạm danh dự người khác bằng ngôn ngữ thô tục",
      "Đăng ảnh du lịch",
      "Chia sẻ công thức nấu ăn"
    ],
    correctAnswer: "Livestream chửi bới, xúc phạm danh dự người khác bằng ngôn ngữ thô tục"
  },
  {
    id: 6,
    question: "Lối sống khoe mẽ giàu sang, ăn chơi xa xỉ và coi thường lao động trên mạng xã hội đi ngược với nguyên tắc nào của Hồ Chí Minh?",
    options: [
      "Tính khoa học",
      "Đức tính Cần kiệm và lối sống giản dị",
      "Tính đại chúng",
      "Tính dân tộc"
    ],
    correctAnswer: "Đức tính Cần kiệm và lối sống giản dị"
  },
  {
    id: 7,
    question: "Việc lan truyền tin giả và mê tín dị đoan trên mạng xã hội vi phạm tính chất nào của nền văn hóa mới?",
    options: [
      "Tính dân tộc",
      "Tính khoa học",
      "Tính đại chúng",
      "Tính giải trí"
    ],
    correctAnswer: "Tính khoa học"
  },
  {
    id: 8,
    question: "Theo tư tưởng Hồ Chí Minh, giải pháp căn bản để khắc phục lệch văn hóa trên mạng xã hội là gì?",
    options: [
      "Cấm hoàn toàn mạng xã hội",
      "Vừa xây dựng giá trị tốt đẹp vừa kiên quyết đấu tranh với cái xấu",
      "Để mọi người tự do hoàn toàn",
      "Chỉ tập trung vào phát triển kinh tế"
    ],
    correctAnswer: "Vừa xây dựng giá trị tốt đẹp vừa kiên quyết đấu tranh với cái xấu"
  },
  {
    id: 9,
    question: "\"Mỗi công dân mạng là một chiến sĩ văn hóa\" có nghĩa là gì?",
    options: [
      "Phải trở thành KOL nổi tiếng",
      "Biết tự sàng lọc thông tin, dám lên tiếng với cái xấu và lan tỏa giá trị tốt",
      "Chỉ đăng ảnh đẹp",
      "Chỉ xem video giải trí"
    ],
    correctAnswer: "Biết tự sàng lọc thông tin, dám lên tiếng với cái xấu và lan tỏa giá trị tốt"
  },
  {
    id: 10,
    question: "Hội nhập văn hóa theo Hồ Chí Minh trong bối cảnh mạng xã hội phải thực hiện như thế nào?",
    options: [
      "Học theo hết tất cả trào lưu nước ngoài",
      "Tiếp thu tinh hoa thế giới một cách có chọn lọc, giữ vững bản sắc dân tộc",
      "Không tiếp thu gì từ nước ngoài",
      "Chỉ giữ nguyên văn hóa truyền thống"
    ],
    correctAnswer: "Tiếp thu tinh hoa thế giới một cách có chọn lọc, giữ vững bản sắc dân tộc"
  }
];

// 2 REWARD QUESTIONS - Auto cộng 1 điểm (không cần trả lời)
export const REWARD_QUESTIONS = [
  {
    id: 11,
    question: "🎁 Thưởng: Cộng 1 điểm!",
    isReward: true,
    points: 1
  },
  {
    id: 12,
    question: "🎁 Thưởng: Cộng 1 điểm!",
    isReward: true,
    points: 1
  }
]

// 2 PENALTY QUESTIONS - Auto trừ 1 điểm (không cần trả lời)
export const PENALTY_QUESTIONS = [
  {
    id: 13,
    question: "⚡ Phạt: Trừ 1 điểm!",
    isPenalty: true,
    points: -1
  },
  {
    id: 14,
    question: "⚡ Phạt: Trừ 1 điểm!",
    isPenalty: true,
    points: -1
  }
]

// Combine all special questions
export const SPECIAL_QUESTIONS = [...REWARD_QUESTIONS, ...PENALTY_QUESTIONS];

// Team definitions
export const TEAMS = [
  { id: 1, name: "Team 1", color: "#FF6B6B" },
  { id: 2, name: "Team 2", color: "#4ECDC4" },
  { id: 3, name: "Team 3", color: "#45B7D1" },
  { id: 4, name: "Team 4", color: "#FFA07A" },
  { id: 5, name: "Team 6", color: "#98D8C8" },
  { id: 6, name: "Team 7", color: "#F7DC6F" },
  { id: 7, name: "Team 8", color: "#BB8FCE" }
];

// Icons/Emojis for question cards
export const QUESTION_ICONS = [
  "🎯", "🎪", "🎨", "🎭", "🎬", "🎮", "🎲", "🎰",
  "🎸", "🎹", "📚", "🔥", "⭐", "💎"
];
