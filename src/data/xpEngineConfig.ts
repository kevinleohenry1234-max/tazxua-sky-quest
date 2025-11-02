import { XPConfig, ActionType, Level, VoucherExchangeRate, AntiSpamSettings } from '../types/xpEngine';

// Level System Configuration - 5 cấp độ như yêu cầu
export const LEVELS: Level[] = [
  {
    level: 1,
    name: 'Lữ khách mới',
    minXP: 0,
    maxXP: 499,
    benefits: [
      'Chào mừng đến với Sky Quest',
      'Truy cập các quest cơ bản',
      'Hỗ trợ 24/7'
    ],
    voucherReward: {
      discountPercentage: 5,
      expiryDays: 30,
      partner: 'Tà Xùa Homestay'
    },
    badgeIcon: '🌱',
    color: '#10B981'
  },
  {
    level: 2,
    name: 'Nhà khám phá',
    minXP: 500,
    maxXP: 1499,
    benefits: [
      'Mở khóa quest nâng cao',
      'Voucher giảm giá 7%',
      'Ưu tiên hỗ trợ',
      'Badge Nhà khám phá'
    ],
    voucherReward: {
      discountPercentage: 7,
      expiryDays: 45,
      partner: 'Tà Xùa Adventure'
    },
    badgeIcon: '🗺️',
    color: '#3B82F6'
  },
  {
    level: 3,
    name: 'Sứ giả xanh',
    minXP: 1500,
    maxXP: 2999,
    benefits: [
      'Truy cập quest độc quyền',
      'Voucher giảm giá 10%',
      'Tham gia sự kiện VIP',
      'Badge Sứ giả xanh',
      'Báo cáo tác động môi trường'
    ],
    voucherReward: {
      discountPercentage: 10,
      expiryDays: 60,
      partner: 'Green Tourism Network'
    },
    badgeIcon: '🌿',
    color: '#059669'
  },
  {
    level: 4,
    name: 'Người dẫn đường',
    minXP: 3000,
    maxXP: 4999,
    benefits: [
      'Tạo quest cho cộng đồng',
      'Voucher giảm giá 12%',
      'Quyền moderator',
      'Badge Người dẫn đường',
      'Tư vấn hành trình cá nhân',
      'Quà tặng độc quyền'
    ],
    voucherReward: {
      discountPercentage: 12,
      expiryDays: 90,
      partner: 'Premium Partners'
    },
    badgeIcon: '🧭',
    color: '#7C3AED'
  },
  {
    level: 5,
    name: 'Đại sứ Tà Xùa',
    minXP: 5000,
    maxXP: null,
    benefits: [
      'Quyền admin cộng đồng',
      'Voucher giảm giá 15%',
      'Tham gia hội đồng cố vấn',
      'Badge Đại sứ Tà Xùa',
      'Chuyến du lịch miễn phí hàng năm',
      'Hoa hồng từ giới thiệu',
      'Tên trên bảng danh dự'
    ],
    voucherReward: {
      discountPercentage: 15,
      expiryDays: 365,
      partner: 'All Partners'
    },
    badgeIcon: '👑',
    color: '#DC2626'
  }
];

// XP Rewards for different actions
export const ACTION_REWARDS: Record<ActionType, number> = {
  // Exploration Actions (Khám phá)
  [ActionType.CHECKIN_LOCATION]: 100,
  [ActionType.AR_VR_EXPERIENCE]: 150,
  [ActionType.GREEN_TOUR_PARTICIPATION]: 200,
  [ActionType.PHOTO_UPLOAD]: 50,
  
  // Community Actions (Cộng đồng)
  [ActionType.SHARE_POST]: 30,
  [ActionType.RECEIVE_LIKE]: 5,
  [ActionType.RECEIVE_COMMENT]: 10,
  [ActionType.HELP_OTHER_USER]: 75,
  
  // Conservation Actions (Bảo tồn)
  [ActionType.PLANT_TREE]: 300,
  [ActionType.CLEAN_ENVIRONMENT]: 250,
  [ActionType.DONATE]: 500,
  [ActionType.REPORT_ISSUE]: 100,
  
  // Learning Actions (Học hỏi)
  [ActionType.COMPLETE_QUIZ]: 80,
  [ActionType.PLAY_MINIGAME]: 60,
  [ActionType.READ_ARTICLE]: 40,
  [ActionType.WATCH_VIDEO]: 30,
  
  // System Actions
  [ActionType.LEVEL_UP]: 0,
  [ActionType.VOUCHER_EXCHANGE]: 0,
  [ActionType.ADMIN_ADJUSTMENT]: 0,
  
  // Penalty Actions (Trừ điểm)
  [ActionType.SPAM_CONTENT]: -50,
  [ActionType.VIOLATE_RULES]: -200,
  [ActionType.SERIOUS_VIOLATION]: -999999 // Reset về 0
};

// Voucher Exchange Rates (Quy đổi XP → Voucher)
export const VOUCHER_EXCHANGE_RATES: VoucherExchangeRate[] = [
  {
    xpCost: 500,
    discountPercentage: 5,
    expiryDays: 30,
    partner: 'Tà Xùa Homestay'
  },
  {
    xpCost: 1000,
    discountPercentage: 10,
    expiryDays: 45,
    partner: 'Local Restaurants'
  },
  {
    xpCost: 2000,
    discountPercentage: 15,
    expiryDays: 60,
    partner: 'Adventure Tours'
  }
];

// Anti-Spam Settings
export const ANTI_SPAM_SETTINGS: AntiSpamSettings = {
  maxQuestsPerDay: 20,
  maxSameActionPerHour: 5,
  gpsAccuracyThreshold: 100, // meters
  ipCooldownMinutes: 5
};

// Complete XP Engine Configuration
export const XP_ENGINE_CONFIG: XPConfig = {
  actionRewards: ACTION_REWARDS,
  penalties: ACTION_REWARDS, // Same object, negative values for penalties
  levels: LEVELS,
  voucherExchangeRates: VOUCHER_EXCHANGE_RATES,
  antiSpamSettings: ANTI_SPAM_SETTINGS
};

// Helper Functions
export const getLevelByXP = (xp: number): Level => {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    const level = LEVELS[i];
    if (xp >= level.minXP) {
      return level;
    }
  }
  return LEVELS[0];
};

export const getNextLevel = (currentLevel: number): Level | null => {
  return LEVELS.find(level => level.level === currentLevel + 1) || null;
};

export const getProgressToNextLevel = (xp: number, currentLevel: Level, nextLevel: Level | null): number => {
  if (!nextLevel) return 100;
  
  const progressInCurrentLevel = xp - currentLevel.minXP;
  const totalXPNeededForNextLevel = nextLevel.minXP - currentLevel.minXP;
  
  return Math.min((progressInCurrentLevel / totalXPNeededForNextLevel) * 100, 100);
};

export const generateVoucherCode = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'VIVIET-SQ-';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Quest Templates
export const QUEST_TEMPLATES = {
  exploration: [
    {
      title: 'Check-in tại Đỉnh Tà Xùa',
      description: 'Đến và check-in tại đỉnh Tà Xùa để nhận 100 XP',
      actionType: ActionType.CHECKIN_LOCATION,
      xpReward: 100,
      requirements: [
        {
          type: 'location' as const,
          value: { lat: 21.3099, lng: 104.4569, radius: 100 },
          description: 'Phải ở trong bán kính 100m từ đỉnh Tà Xùa'
        }
      ]
    },
    {
      title: 'Trải nghiệm AR Rừng mây',
      description: 'Sử dụng tính năng AR để khám phá rừng mây Tà Xùa',
      actionType: ActionType.AR_VR_EXPERIENCE,
      xpReward: 150,
      requirements: [
        {
          type: 'location' as const,
          value: { lat: 21.3099, lng: 104.4569, radius: 500 },
          description: 'Phải ở khu vực Tà Xùa'
        }
      ]
    }
  ],
  community: [
    {
      title: 'Chia sẻ ảnh Tà Xùa',
      description: 'Chia sẻ một bức ảnh đẹp về Tà Xùa lên mạng xã hội',
      actionType: ActionType.SHARE_POST,
      xpReward: 30,
      requirements: []
    }
  ],
  conservation: [
    {
      title: 'Trồng cây tại Tà Xùa',
      description: 'Tham gia chương trình trồng cây bảo vệ môi trường',
      actionType: ActionType.PLANT_TREE,
      xpReward: 300,
      requirements: [
        {
          type: 'location' as const,
          value: { lat: 21.3099, lng: 104.4569, radius: 1000 },
          description: 'Phải ở khu vực Tà Xùa'
        }
      ]
    }
  ],
  learning: [
    {
      title: 'Quiz về văn hóa H\'Mông',
      description: 'Hoàn thành quiz về văn hóa dân tộc H\'Mông',
      actionType: ActionType.COMPLETE_QUIZ,
      xpReward: 80,
      requirements: []
    }
  ]
};