export interface Quest {
  id: string;
  title: string;
  difficulty: 'Dễ' | 'Trung bình' | 'Khó';
  time: string;
  point: number;
  icon: string;
  description: string;
  category: string;
}

export interface Level {
  id: string;
  level: string;
  points: number;
  title: string;
  description: string;
}

export interface Reward {
  id: string;
  name: string;
  points: number;
  description: string;
  icon: string;
  category: 'voucher' | 'experience' | 'merchandise' | 'accommodation';
}

// Dữ liệu thử thách cho chế độ "Mây Mây Sương Sương"
export const maysuongQuests: Quest[] = [
  {
    id: "ms1",
    title: "Thưởng trà Shan Tuyết với người bản địa",
    difficulty: "Dễ",
    time: "1.5h",
    point: 100,
    icon: "🍵",
    description: "Trải nghiệm văn hóa trà truyền thống của người H'Mông",
    category: "Văn hóa"
  },
  {
    id: "ms2", 
    title: "Trekking nhẹ nhàng qua rừng sương mù",
    difficulty: "Dễ",
    time: "2h",
    point: 120,
    icon: "🌲",
    description: "Đi bộ thư giãn khám phá thiên nhiên trong sương sớm",
    category: "Thiên nhiên"
  },
  {
    id: "ms3",
    title: "Chụp ảnh sunrise tại đỉnh núi",
    difficulty: "Trung bình", 
    time: "3h",
    point: 150,
    icon: "📸",
    description: "Săn bình minh tuyệt đẹp từ điểm cao nhất",
    category: "Nhiếp ảnh"
  },
  {
    id: "ms4",
    title: "Học làm bánh dày từ người địa phương",
    difficulty: "Dễ",
    time: "2.5h", 
    point: 130,
    icon: "🥮",
    description: "Trải nghiệm làm món ăn truyền thống H'Mông",
    category: "Ẩm thực"
  },
  {
    id: "ms5",
    title: "Thiền định giữa biển mây",
    difficulty: "Dễ",
    time: "1h",
    point: 80,
    icon: "🧘",
    description: "Thư giãn tâm hồn trong không gian thiên nhiên",
    category: "Thư giãn"
  },
  {
    id: "ms6",
    title: "Khám phá làng bản truyền thống",
    difficulty: "Trung bình",
    time: "3.5h",
    point: 180,
    icon: "🏘️",
    description: "Tìm hiểu đời sống văn hóa người H'Mông",
    category: "Văn hóa"
  }
];

// Dữ liệu thử thách cho chế độ "Hăng Say Săn Thưởng"
export const hangsayQuests: Quest[] = [
  {
    id: "hs1",
    title: "Leo núi sống lưng khủng long",
    difficulty: "Khó",
    time: "4h",
    point: 300,
    icon: "🧗",
    description: "Chinh phục đỉnh núi cao nhất Tà Xùa",
    category: "Thể thao"
  },
  {
    id: "hs2",
    title: "Trồng 10 cây xanh bảo vệ môi trường",
    difficulty: "Trung bình",
    time: "2h", 
    point: 200,
    icon: "🌱",
    description: "Góp phần bảo vệ rừng núi Tà Xùa",
    category: "Môi trường"
  },
  {
    id: "hs3",
    title: "Tham gia dọn dẹp rác thải du lịch",
    difficulty: "Dễ",
    time: "1.5h",
    point: 150,
    icon: "♻️",
    description: "Bảo vệ môi trường du lịch bền vững",
    category: "Môi trường"
  },
  {
    id: "hs4",
    title: "Hoàn thành trail chạy bộ 5km",
    difficulty: "Trung bình",
    time: "1h",
    point: 180,
    icon: "🏃",
    description: "Thử thách thể lực trên địa hình núi",
    category: "Thể thao"
  },
  {
    id: "hs5",
    title: "Tổ chức workshop chia sẻ kiến thức",
    difficulty: "Khó",
    time: "3h",
    point: 250,
    icon: "🎓",
    description: "Chia sẻ kiến thức với cộng đồng địa phương",
    category: "Giáo dục"
  },
  {
    id: "hs6",
    title: "Xây dựng nhà sách mini cho trẻ em",
    difficulty: "Khó",
    time: "5h",
    point: 350,
    icon: "📚",
    description: "Đóng góp cho giáo dục trẻ em vùng cao",
    category: "Cộng đồng"
  },
  {
    id: "hs7",
    title: "Tham gia cứu hộ động vật hoang dã",
    difficulty: "Trung bình",
    time: "2.5h",
    point: 220,
    icon: "🦌",
    description: "Bảo vệ động vật quý hiếm của Tà Xùa",
    category: "Bảo tồn"
  },
  {
    id: "hs8",
    title: "Dẫn đường cho du khách mới",
    difficulty: "Trung bình", 
    time: "3h",
    point: 200,
    icon: "🗺️",
    description: "Hỗ trợ du khách khám phá Tà Xùa an toàn",
    category: "Hướng dẫn"
  }
];

// Hệ thống cấp độ
export const levels: Level[] = [
  {
    id: "F0",
    level: "F0",
    points: 0,
    title: "Người mới",
    description: "Chào mừng bạn đến với Sky Quest!"
  },
  {
    id: "F1",
    level: "F1", 
    points: 300,
    title: "Người khám phá",
    description: "Bạn đã bắt đầu hành trình khám phá Tà Xùa"
  },
  {
    id: "F2",
    level: "F2",
    points: 700, 
    title: "Người cống hiến",
    description: "Bạn đã có những đóng góp tích cực"
  },
  {
    id: "F3",
    level: "F3",
    points: 1200,
    title: "Nhà thám hiểm", 
    description: "Bạn là một nhà thám hiểm thực thụ"
  },
  {
    id: "F4",
    level: "F4",
    points: 2000,
    title: "Đại sứ Sky Quest",
    description: "Bạn là đại sứ xuất sắc của Sky Quest"
  }
];

// Hệ thống phần thưởng
export const rewards: Reward[] = [
  {
    id: "r1",
    name: "Voucher trà Shan Tuyết",
    points: 200,
    description: "Thưởng thức trà đặc sản núi cao Tà Xùa",
    icon: "🍵",
    category: "voucher"
  },
  {
    id: "r2", 
    name: "Giảm 15% homestay đối tác",
    points: 400,
    description: "Ưu đãi lưu trú tại các homestay chất lượng",
    icon: "🏠",
    category: "accommodation"
  },
  {
    id: "r3",
    name: "Vé workshop miễn phí", 
    points: 600,
    description: "Tham gia workshop văn hóa và kỹ năng",
    icon: "🎫",
    category: "experience"
  },
  {
    id: "r4",
    name: "Túi thổ cẩm (quà lưu niệm)",
    points: 1000,
    description: "Sản phẩm thủ công truyền thống H'Mông",
    icon: "👜",
    category: "merchandise"
  },
  {
    id: "r5",
    name: "1 đêm homestay miễn phí",
    points: 1500, 
    description: "Trải nghiệm lưu trú hoàn toàn miễn phí",
    icon: "🌙",
    category: "accommodation"
  },
  {
    id: "r6",
    name: "Huy hiệu Đại Sứ Sky Quest",
    points: 2000,
    description: "Danh hiệu cao quý dành cho những đóng góp xuất sắc",
    icon: "🏆",
    category: "merchandise"
  }
];

// Utility functions
export const getQuestsByMode = (mode: 'maysuong' | 'hangsay'): Quest[] => {
  return mode === 'maysuong' ? maysuongQuests : hangsayQuests;
};

export const getLevelByPoints = (points: number): Level => {
  const sortedLevels = levels.sort((a, b) => b.points - a.points);
  return sortedLevels.find(level => points >= level.points) || levels[0];
};

export const getNextLevel = (currentPoints: number): Level | null => {
  const sortedLevels = levels.sort((a, b) => a.points - b.points);
  return sortedLevels.find(level => level.points > currentPoints) || null;
};

export const getRewardsByCategory = (category?: string): Reward[] => {
  return category ? rewards.filter(reward => reward.category === category) : rewards;
};