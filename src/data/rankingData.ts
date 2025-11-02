import { MemberRank, PointsConfig, RankLevel } from '@/types/ranking';

// Cấu hình điểm cho các hoạt động
export const POINTS_CONFIG: PointsConfig = {
  explore: 100,    // Khám phá địa điểm hoặc hoạt động thực tế
  challenge: 200,  // Hoàn thành thử thách môi trường
  share: 300,      // Chia sẻ hành trình có nội dung được xác thực
  thanks: 20,      // Nhận được lượt cảm ơn từ người dùng khác
  event: 500       // Tham gia sự kiện đặc biệt
};

// Định nghĩa 3 cấp bậc thành viên
export const MEMBER_RANKS: MemberRank[] = [
  {
    id: 'explorer',
    level: 'Explorer',
    name: 'Khám Phá Viên',
    nameEn: 'Explorer',
    description: 'Cấp độ mặc định khi đăng ký tham gia Sky Quest',
    minPoints: 0,
    maxPoints: 999,
    badge: {
      icon: '🧭', // La bàn
      color: '#007AFF', // Xanh lam
      gradient: 'from-blue-400 to-blue-600',
      animation: 'pulse'
    },
    benefits: [
      'Tham gia thử thách cơ bản',
      'Tích điểm qua hoạt động khám phá',
      'Chia sẻ hành trình trên nền tảng'
    ],
    rewards: [
      {
        id: 'explorer-voucher',
        name: 'Voucher du lịch 5%',
        type: 'voucher',
        value: 5,
        description: 'Giảm giá 5% cho các dịch vụ du lịch',
        icon: '🎫',
        autoUnlock: true
      },
      {
        id: 'explorer-badge',
        name: 'Huy hiệu Khám Phá Viên',
        type: 'badge',
        value: 'explorer_badge',
        description: 'Hiển thị trên hồ sơ cá nhân',
        icon: '🏅',
        autoUnlock: true
      }
    ],
    multiplier: 1.0
  },
  {
    id: 'inspiration',
    level: 'Inspiration',
    name: 'Truyền Cảm Hứng',
    nameEn: 'Inspiration',
    description: 'Dành cho những người có đóng góp tích cực và truyền cảm hứng',
    minPoints: 1000,
    maxPoints: 4999,
    badge: {
      icon: '🍃', // Lá cây với tia sáng
      color: '#00A47A', // Xanh ngọc
      gradient: 'from-emerald-400 to-teal-600',
      animation: 'bounce'
    },
    benefits: [
      'Truy cập các thử thách đặc biệt trong Sky Quest',
      'Tăng 1.2x điểm khi hoàn thành nhiệm vụ',
      'Hiển thị trong bảng vinh danh cộng đồng',
      'Quyền tạo nội dung chia sẻ đặc biệt'
    ],
    rewards: [
      {
        id: 'inspiration-voucher',
        name: 'Voucher xanh 10%',
        type: 'voucher',
        value: 10,
        description: 'Giảm giá 10% cho các sản phẩm thân thiện môi trường',
        icon: '🌱',
        autoUnlock: true
      },
      {
        id: 'inspiration-event-access',
        name: 'Quyền tham gia sự kiện online cộng đồng',
        type: 'access',
        value: 'community_events',
        description: 'Tham gia các sự kiện trực tuyến độc quyền',
        icon: '🎭',
        autoUnlock: true
      },
      {
        id: 'inspiration-badge',
        name: 'Huy hiệu Truyền Cảm Hứng',
        type: 'badge',
        value: 'inspiration_badge',
        description: 'Huy hiệu đặc biệt với hiệu ứng ánh sáng',
        icon: '✨',
        autoUnlock: true
      }
    ],
    multiplier: 1.2
  },
  {
    id: 'guardian',
    level: 'Guardian',
    name: 'Bảo Vệ Xanh',
    nameEn: 'Guardian',
    description: 'Cấp độ cao nhất dành cho những người bảo vệ môi trường xuất sắc',
    minPoints: 5000,
    maxPoints: null, // Không giới hạn
    badge: {
      icon: '🌍', // Trái Đất với vòng sáng
      color: '#A7C957', // Vàng xanh
      gradient: 'from-lime-400 via-green-500 to-emerald-600',
      animation: 'spin'
    },
    benefits: [
      'Quyền tạo thử thách Sky Quest riêng',
      'Nhận phần thưởng hiện vật độc quyền',
      'Xuất hiện trong mục "Người Truyền Cảm Hứng"',
      'Quyền quản lý cộng đồng địa phương',
      'Tư vấn trực tiếp cho người dùng mới'
    ],
    rewards: [
      {
        id: 'guardian-voucher',
        name: 'Voucher cao cấp 20%',
        type: 'voucher',
        value: 20,
        description: 'Giảm giá 20% cho tất cả dịch vụ cao cấp',
        icon: '💎',
        autoUnlock: true
      },
      {
        id: 'guardian-donation-access',
        name: 'Quyền quyên góp trực tiếp',
        type: 'privilege',
        value: 'direct_donation',
        description: 'Quyền quyên góp trực tiếp vào quỹ môi trường đối tác',
        icon: '💚',
        autoUnlock: true
      },
      {
        id: 'guardian-physical-reward',
        name: 'Phần thưởng hiện vật',
        type: 'privilege',
        value: 'physical_rewards',
        description: 'Nhận các phần thưởng hiện vật độc quyền',
        icon: '🎁',
        autoUnlock: true
      },
      {
        id: 'guardian-badge',
        name: 'Huy hiệu Bảo Vệ Xanh',
        type: 'badge',
        value: 'guardian_badge',
        description: 'Huy hiệu vàng xanh với hiệu ứng đặc biệt',
        icon: '👑',
        autoUnlock: true
      }
    ],
    multiplier: 1.5
  }
];

// Helper functions
export const getRankByLevel = (level: RankLevel): MemberRank | undefined => {
  return MEMBER_RANKS.find(rank => rank.level === level);
};

export const getRankByPoints = (points: number): MemberRank => {
  // Tìm cấp bậc phù hợp với số điểm
  for (let i = MEMBER_RANKS.length - 1; i >= 0; i--) {
    const rank = MEMBER_RANKS[i];
    if (points >= rank.minPoints) {
      return rank;
    }
  }
  return MEMBER_RANKS[0]; // Mặc định là Explorer
};

export const getNextRank = (currentPoints: number): MemberRank | null => {
  const currentRank = getRankByPoints(currentPoints);
  const currentIndex = MEMBER_RANKS.findIndex(rank => rank.level === currentRank.level);
  
  if (currentIndex < MEMBER_RANKS.length - 1) {
    return MEMBER_RANKS[currentIndex + 1];
  }
  
  return null; // Đã đạt cấp cao nhất
};

export const calculateProgressToNext = (currentPoints: number): {
  current: MemberRank;
  next: MemberRank | null;
  pointsToNext: number;
  progressPercentage: number;
} => {
  const current = getRankByPoints(currentPoints);
  const next = getNextRank(currentPoints);
  
  if (!next) {
    return {
      current,
      next: null,
      pointsToNext: 0,
      progressPercentage: 100
    };
  }
  
  const pointsInCurrentRange = currentPoints - current.minPoints;
  const totalPointsInRange = next.minPoints - current.minPoints;
  const progressPercentage = Math.min(100, (pointsInCurrentRange / totalPointsInRange) * 100);
  const pointsToNext = next.minPoints - currentPoints;
  
  return {
    current,
    next,
    pointsToNext,
    progressPercentage
  };
};

// Thông điệp chúc mừng khi thăng hạng
export const RANK_UP_MESSAGES = {
  Explorer: {
    title: 'Chào mừng bạn đến với Sky Quest! 🎉',
    message: 'Bạn đã trở thành Khám Phá Viên! Hãy bắt đầu hành trình khám phá Tà Xùa cùng chúng tôi.',
    cta: 'Khám phá ngay'
  },
  Inspiration: {
    title: 'Chúc mừng! Bạn đã thăng cấp! ✨',
    message: 'Bạn đã trở thành Truyền Cảm Hứng! Giờ đây bạn có thể truy cập các thử thách đặc biệt và nhận điểm thưởng x1.2.',
    cta: 'Khám phá quyền lợi mới'
  },
  Guardian: {
    title: 'Xuất sắc! Bạn đã đạt cấp cao nhất! 👑',
    message: 'Bạn đã trở thành Bảo Vệ Xanh! Bạn là một trong những người bảo vệ môi trường xuất sắc nhất của Sky Quest.',
    cta: 'Xem đặc quyền'
  }
};

// Màu sắc theme cho từng cấp bậc
export const RANK_THEMES = {
  Explorer: {
    primary: '#007AFF',
    secondary: '#E6F3FF',
    gradient: 'from-blue-400 to-blue-600',
    textColor: '#1E40AF'
  },
  Inspiration: {
    primary: '#00A47A',
    secondary: '#E6F7F0',
    gradient: 'from-emerald-400 to-teal-600',
    textColor: '#047857'
  },
  Guardian: {
    primary: '#A7C957',
    secondary: '#F0F9E6',
    gradient: 'from-lime-400 via-green-500 to-emerald-600',
    textColor: '#365314'
  }
};