import { UserLevel, PointRule, Challenge, Badge, Voucher } from '../types/gamification';

// User Levels System
export const USER_LEVELS: UserLevel[] = [
  {
    id: 1,
    name: 'Du khách mới',
    title: 'Người khám phá Tà Xùa',
    minPoints: 0,
    maxPoints: 999,
    benefits: [
      'Voucher giảm giá 5% cho lần đầu đặt phòng',
      'Hướng dẫn chi tiết cho người mới',
      'Thử thách cơ bản'
    ],
    color: 'from-green-400 to-green-600',
    icon: '🌱'
  },
  {
    id: 2,
    name: 'Lữ khách xanh',
    title: 'Bạn của núi rừng',
    minPoints: 1000,
    maxPoints: 2999,
    benefits: [
      'Voucher giảm giá 10%',
      'Ưu tiên hỗ trợ khách hàng',
      'Mở khóa thử thách cấp trung bình',
      'Tham gia nhóm cộng đồng'
    ],
    color: 'from-blue-400 to-blue-600',
    icon: '🏔️'
  },
  {
    id: 3,
    name: 'Đại sứ xanh',
    title: 'Người bảo vệ Tà Xùa',
    minPoints: 3000,
    maxPoints: 6999,
    benefits: [
      'Voucher giảm giá 15%',
      'Tham gia beta test tính năng mới',
      'Mở khóa thử thách cấp cao',
      'Tạo thử thách cộng đồng',
      'Huy hiệu đặc biệt'
    ],
    color: 'from-purple-400 to-purple-600',
    icon: '🛡️'
  },
  {
    id: 4,
    name: 'Huyền thoại Tà Xùa',
    title: 'Linh hồn của Tà Xùa',
    minPoints: 7000,
    maxPoints: 999999,
    benefits: [
      'Voucher giảm giá 20%',
      'Tour VIP miễn phí hàng năm',
      'Quyền moderator cộng đồng',
      'Tất cả tính năng cao cấp',
      'Danh hiệu vĩnh viễn'
    ],
    color: 'from-yellow-400 to-orange-500',
    icon: '👑'
  }
];

// Sample Badges System
export const SAMPLE_BADGES: Badge[] = [
  {
    id: 'badge-peak-conqueror',
    name: 'Chinh phục đỉnh',
    description: 'Đã leo lên đỉnh Tà Xùa và chụp ảnh panorama 360 độ',
    icon: '🏔️',
    rarity: 'epic',
    category: 'explorer'
  },
  {
    id: 'peak-conqueror',
    name: 'Chinh phục đỉnh',
    description: 'Đã leo lên đỉnh Tà Xùa và chụp ảnh panorama 360 độ',
    icon: '🏔️',
    rarity: 'epic',
    category: 'explorer'
  },
  {
    id: 'sunrise-master',
    name: 'Bậc thầy bình minh',
    description: 'Chụp ảnh bình minh chuyên nghiệp với kỹ thuật cao',
    icon: '🌅',
    rarity: 'rare',
    category: 'photographer'
  },
  {
    id: 'eco-warrior',
    name: 'Chiến binh xanh',
    description: 'Tham gia hoạt động dọn dẹp môi trường',
    icon: '🌿',
    rarity: 'common',
    category: 'environmental'
  },
  {
    id: 'forest-guardian',
    name: 'Người bảo vệ rừng',
    description: 'Tham gia chương trình trồng rừng với công nghệ',
    icon: '🌲',
    rarity: 'rare',
    category: 'environmental'
  },
  {
    id: 'cultural-explorer',
    name: 'Nhà khám phá văn hóa',
    description: 'Khám phá và tương tác với văn hóa bản địa',
    icon: '🏮',
    rarity: 'rare',
    category: 'cultural'
  },
  {
    id: 'community-helper',
    name: 'Người hỗ trợ cộng đồng',
    description: 'Tích cực tham gia các hoạt động cộng đồng',
    icon: '🤝',
    rarity: 'common',
    category: 'community'
  },
  {
    id: 'photo-master',
    name: 'Bậc thầy nhiếp ảnh',
    description: 'Chụp và chia sẻ nhiều ảnh đẹp về Tà Xùa',
    icon: '📸',
    rarity: 'rare',
    category: 'photographer'
  },
  {
    id: 'streak-champion',
    name: 'Nhà vô địch chuỗi',
    description: 'Duy trì hoạt động liên tục trong 30 ngày',
    icon: '🔥',
    rarity: 'epic',
    category: 'explorer'
  },
  {
    id: 'first-timer',
    name: 'Lần đầu tiên',
    description: 'Hoàn thành thử thách đầu tiên',
    icon: '🌟',
    rarity: 'common',
    category: 'explorer'
  }
];

// Sample Vouchers System
export const SAMPLE_VOUCHERS: Voucher[] = [
  {
    id: 'homestay-discount-10',
    title: 'Giảm giá Homestay 10%',
    description: 'Voucher giảm 10% cho tất cả homestay đối tác',
    type: 'homestay',
    value: 0,
    discountPercent: 10,
    pointsCost: 500,
    code: 'TAXUA10',
    isUsed: false,
    expiresAt: new Date('2024-12-31'),
    earnedAt: new Date()
  },
  {
    id: 'food-discount-15',
    title: 'Giảm giá Ẩm thực 15%',
    description: 'Voucher giảm 15% cho các nhà hàng địa phương',
    type: 'food',
    value: 0,
    discountPercent: 15,
    pointsCost: 750,
    code: 'FOOD15',
    isUsed: false,
    expiresAt: new Date('2024-12-31'),
    earnedAt: new Date()
  },
  {
    id: 'tour-free',
    title: 'Tour miễn phí',
    description: 'Tour khám phá Tà Xùa miễn phí cho 1 người',
    type: 'tour',
    value: 500000,
    pointsCost: 2000,
    code: 'FREETOUR',
    isUsed: false,
    expiresAt: new Date('2024-12-31'),
    earnedAt: new Date()
  }
];

// Point Rules System
export const POINT_RULES: PointRule[] = [
  {
    action: 'checkin',
    basePoints: 50,
    maxDaily: 200,
    description: 'Check-in tại địa điểm du lịch'
  },
  {
    action: 'photo_share',
    basePoints: 30,
    maxDaily: 150,
    description: 'Chia sẻ ảnh với hashtag #TaXuaXanh'
  },
  {
    action: 'review',
    basePoints: 100,
    maxDaily: 300,
    description: 'Viết review homestay/nhà hàng'
  },
  {
    action: 'challenge_complete',
    basePoints: 75,
    description: 'Hoàn thành thử thách'
  },
  {
    action: 'referral',
    basePoints: 200,
    description: 'Giới thiệu bạn bè tham gia'
  },
  {
    action: 'social_share',
    basePoints: 25,
    maxDaily: 100,
    description: 'Chia sẻ lên mạng xã hội'
  },
  {
    action: 'event_participation',
    basePoints: 500,
    description: 'Tham gia sự kiện offline'
  },
  {
    action: 'streak_bonus',
    basePoints: 50,
    multiplier: 1.5,
    description: 'Bonus hoạt động liên tiếp'
  }
];

// Expanded Challenges with Diversified Sources
export const EXPANDED_CHALLENGES: Challenge[] = [
  // ===== NHÓM ĐẠI SỨ XANH (Green Ambassadors - System Operators) =====
  // Thử thách cá nhân từ Đại sứ Xanh
  {
    id: 'green-ambassador-solo-1',
    title: 'Chinh phục đỉnh Tà Xùa',
    description: 'Leo lên đỉnh cao nhất Tà Xùa và chụp ảnh panorama 360 độ. Thử thách này được thiết kế bởi đội ngũ Đại sứ Xanh để khuyến khích du khách khám phá vẻ đẹp tự nhiên một cách có trách nhiệm.',
    shortDescription: 'Leo đỉnh và chụp ảnh toàn cảnh',
    type: 'individual',
    category: 'personal',
    source: 'management',
    variant: 'solo',
    difficulty: 'hard',
    points: 500,
    pointReward: 500,
    requirements: [
      { type: 'gps', description: 'Check-in tại đỉnh Tà Xùa (1865m)' },
      { type: 'photo', description: 'Chụp ảnh panorama 360 độ với hashtag #ĐạiSứXanh' },
      { type: 'social_share', description: 'Chia sẻ kinh nghiệm leo núi an toàn' }
    ],
    timeLimit: 48,
    participants: 234,
    currentParticipants: 234,
    completions: 89,
    isActive: true,
    createdBy: 'system',
    imageUrl: 'https://images.unsplash.com/photo-1464822759844-d150baec0494?w=500',
    badge: 'badge-peak-conqueror',
    rewards: [
      { type: 'points', value: 500, description: '500 điểm thưởng', icon: '⭐' },
      { type: 'badge', value: 'peak-conqueror', description: 'Huy hiệu Chinh phục đỉnh', icon: '🏔️' },
      { type: 'voucher', value: 'mountain-guide', description: 'Voucher hướng dẫn viên miễn phí', icon: '🎫' }
    ],
    location: {
      name: 'Đỉnh Tà Xùa',
      coordinates: { lat: 21.3167, lng: 104.4167 },
      radius: 100,
      address: 'Tà Xùa, Bắc Yên, Sơn La'
    },
    tags: ['leo núi', 'nhiếp ảnh', 'đại sứ xanh', 'thử thách cá nhân'],
    featured: true,
    trending: true
  },
  {
    id: 'green-ambassador-solo-2',
    title: 'Nhiếp ảnh bình minh chuyên nghiệp',
    description: 'Chụp ảnh bình minh với kỹ thuật chuyên nghiệp và chia sẻ tips. Đại sứ Xanh hướng dẫn cách chụp ảnh không làm tổn hại môi trường và tôn trọng thiên nhiên.',
    shortDescription: 'Nhiếp ảnh bình minh chuyên nghiệp',
    type: 'individual',
    category: 'personal',
    source: 'management',
    variant: 'solo',
    difficulty: 'hard',
    points: 600,
    pointReward: 600,
    requirements: [
      { type: 'gps', description: 'Check-in trước 5:30 AM tại điểm chụp' },
      { type: 'photo', description: 'Chụp ảnh bình minh chất lượng cao' },
      { type: 'social_share', description: 'Chia sẻ kèm tips nhiếp ảnh bền vững' }
    ],
    timeLimit: 12,
    participants: 45,
    currentParticipants: 45,
    completions: 12,
    isActive: true,
    createdBy: 'system',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500',
    rewards: [
      { type: 'points', value: 600, description: '600 điểm thưởng', icon: '⭐' },
      { type: 'badge', value: 'sunrise-master', description: 'Huy hiệu Bậc thầy bình minh', icon: '🌅' }
    ],
    tags: ['nhiếp ảnh', 'bình minh', 'đại sứ xanh', 'chuyên nghiệp'],
    trending: true
  },

  // Thử thách cộng đồng từ Đại sứ Xanh
  {
    id: 'green-ambassador-community-1',
    title: 'Dọn dẹp đường mòn cộng đồng',
    description: 'Cùng nhau làm sạch các tuyến đường mòn trekking phổ biến. Đại sứ Xanh tổ chức hoạt động này để bảo vệ môi trường và giáo dục ý thức du lịch bền vững.',
    shortDescription: 'Hoạt động dọn dẹp môi trường',
    type: 'community',
    category: 'community',
    source: 'management',
    variant: 'community',
    difficulty: 'easy',
    points: 300,
    pointReward: 300,
    requirements: [
      { type: 'gps', description: 'Tham gia tại điểm tập trung' },
      { type: 'photo', description: 'Chụp ảnh hoạt động dọn dẹp' },
      { type: 'checkin', description: 'Check-in hoàn thành nhiệm vụ' }
    ],
    timeLimit: 6,
    startDate: new Date('2024-03-15'),
    endDate: new Date('2024-03-15'),
    participants: 150,
    currentParticipants: 150,
    completions: 142,
    isActive: true,
    createdBy: 'system',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
    rewards: [
      { type: 'points', value: 300, description: '300 điểm thưởng', icon: '⭐' },
      { type: 'badge', value: 'eco-warrior', description: 'Huy hiệu Chiến binh xanh', icon: '🌿' }
    ],
    tags: ['môi trường', 'cộng đồng', 'đại sứ xanh', 'tình nguyện'],
    featured: true
  },
  {
    id: 'green-ambassador-community-2',
    title: 'Workshop Du lịch Bền vững',
    description: 'Tham gia workshop học cách du lịch có trách nhiệm với môi trường. Đại sứ Xanh chia sẻ kiến thức về bảo vệ thiên nhiên và văn hóa địa phương.',
    shortDescription: 'Học du lịch bền vững',
    type: 'community',
    category: 'community',
    source: 'management',
    variant: 'community',
    difficulty: 'easy',
    points: 250,
    pointReward: 250,
    requirements: [
      { type: 'checkin', description: 'Tham gia đầy đủ workshop 2 tiếng' },
      { type: 'qr', description: 'Quét mã QR nhận chứng chỉ' },
      { type: 'social_share', description: 'Chia sẻ 3 tips du lịch bền vững' }
    ],
    timeLimit: 3,
    participants: 80,
    currentParticipants: 80,
    completions: 65,
    isActive: true,
    createdBy: 'system',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500',
    rewards: [
      { type: 'points', value: 250, description: '250 điểm thưởng', icon: '⭐' },
      { type: 'experience', value: 'sustainability-certificate', description: 'Chứng chỉ Du lịch Bền vững', icon: '📜' }
    ],
    tags: ['giáo dục', 'bền vững', 'đại sứ xanh', 'workshop'],
    featured: true
  },

  // ===== NHÓM DOANH NGHIỆP TÀI TRỢ/ĐẦU TƯ (Corporate Sponsors) =====
  // Thử thách cá nhân từ doanh nghiệp tài trợ
  {
    id: 'sponsor-solo-1',
    title: 'Trải nghiệm Homestay Cao Cấp VinEco',
    description: 'Lưu trú tại homestay đối tác VinEco và viết review chi tiết về trải nghiệm du lịch sinh thái. Thử thách được tài trợ bởi VinEco nhằm quảng bá du lịch xanh.',
    shortDescription: 'Trải nghiệm homestay sinh thái',
    type: 'individual',
    category: 'personal',
    source: 'brand',
    variant: 'solo',
    difficulty: 'medium',
    points: 400,
    pointReward: 400,
    requirements: [
      { type: 'checkin', description: 'Check-in tại homestay VinEco đối tác' },
      { type: 'review', description: 'Viết review chi tiết (tối thiểu 300 từ)' },
      { type: 'photo', description: 'Chụp ảnh không gian xanh của homestay' }
    ],
    timeLimit: 72,
    participants: 89,
    currentParticipants: 89,
    completions: 34,
    isActive: true,
    createdBy: 'partner',
    partnerId: 'vineco-1',
    partnerName: 'VinEco Sustainable Tourism',
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500',
    rewards: [
      { type: 'points', value: 400, description: '400 điểm thưởng', icon: '⭐' },
      { type: 'voucher', value: 'vineco-discount', description: 'Voucher VinEco giảm 25%', icon: '🎫' }
    ],
    tags: ['homestay', 'sinh thái', 'doanh nghiệp tài trợ', 'vineco'],
    trending: true
  },
  {
    id: 'sponsor-solo-2',
    title: 'Thử thách Trà Shan Tuyết Phúc Long',
    description: 'Khám phá và thưởng thức trà Shan Tuyết cổ thụ tại các điểm đối tác Phúc Long. Tìm hiểu về văn hóa trà truyền thống và quy trình sản xuất bền vững.',
    shortDescription: 'Trải nghiệm văn hóa trà',
    type: 'individual',
    category: 'personal',
    source: 'brand',
    variant: 'solo',
    difficulty: 'easy',
    points: 200,
    pointReward: 200,
    requirements: [
      { type: 'checkin', description: 'Check-in tại vườn trà Phúc Long' },
      { type: 'photo', description: 'Chụp ảnh với cây trà cổ thụ' },
      { type: 'review', description: 'Đánh giá hương vị và trải nghiệm' }
    ],
    timeLimit: 24,
    participants: 78,
    currentParticipants: 78,
    completions: 56,
    isActive: true,
    createdBy: 'partner',
    partnerId: 'phuclong-1',
    partnerName: 'Phúc Long Heritage Tea',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
    rewards: [
      { type: 'points', value: 200, description: '200 điểm thưởng', icon: '⭐' },
      { type: 'voucher', value: 'tea-discount', description: 'Voucher mua trà Phúc Long giảm 20%', icon: '🍃' }
    ],
    tags: ['trà', 'văn hóa', 'doanh nghiệp tài trợ', 'phúc long'],
    nearMe: true
  },

  // Thử thách cộng đồng từ doanh nghiệp tài trợ
  {
    id: 'sponsor-community-1',
    title: 'Lớp học nấu ăn H\'Mông - Tài trợ Vinamilk',
    description: 'Tham gia lớp học nấu các món ăn truyền thống H\'Mông với nguyên liệu sữa Vinamilk. Học cách kết hợp ẩm thực truyền thống với dinh dưỡng hiện đại.',
    shortDescription: 'Học nấu ăn truyền thống',
    type: 'community',
    category: 'community',
    source: 'brand',
    variant: 'community',
    difficulty: 'easy',
    points: 250,
    pointReward: 250,
    requirements: [
      { type: 'checkin', description: 'Tham gia lớp học tại nhà hàng đối tác' },
      { type: 'photo', description: 'Chụp ảnh món ăn đã nấu' },
      { type: 'social_share', description: 'Chia sẻ công thức với hashtag #VinamilkTaXua' }
    ],
    timeLimit: 4,
    participants: 45,
    currentParticipants: 45,
    completions: 38,
    isActive: true,
    createdBy: 'partner',
    partnerId: 'vinamilk-1',
    partnerName: 'Vinamilk Community Kitchen',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500',
    rewards: [
      { type: 'points', value: 250, description: '250 điểm thưởng', icon: '⭐' },
      { type: 'experience', value: 'cooking-certificate', description: 'Chứng nhận đầu bếp H\'Mông', icon: '📜' }
    ],
    tags: ['ẩm thực', 'văn hóa', 'doanh nghiệp tài trợ', 'vinamilk'],
    featured: true
  },
  {
    id: 'sponsor-community-2',
    title: 'Chương trình Trồng rừng Cùng Viettel',
    description: 'Tham gia chương trình trồng cây phục hồi rừng do Viettel tài trợ. Mỗi cây trồng được sẽ được theo dõi qua ứng dụng công nghệ của Viettel.',
    shortDescription: 'Trồng rừng với công nghệ',
    type: 'community',
    category: 'community',
    source: 'brand',
    variant: 'community',
    difficulty: 'medium',
    points: 400,
    pointReward: 400,
    requirements: [
      { type: 'gps', description: 'Check-in tại khu vực trồng rừng' },
      { type: 'photo', description: 'Chụp ảnh cây vừa trồng với mã QR' },
      { type: 'qr', description: 'Quét mã QR đăng ký theo dõi cây' }
    ],
    timeLimit: 8,
    participants: 200,
    currentParticipants: 200,
    completions: 156,
    isActive: true,
    createdBy: 'partner',
    partnerId: 'viettel-1',
    partnerName: 'Viettel Green Technology',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500',
    rewards: [
      { type: 'points', value: 400, description: '400 điểm thưởng', icon: '⭐' },
      { type: 'badge', value: 'forest-guardian', description: 'Huy hiệu Người bảo vệ rừng', icon: '🌲' },
      { type: 'experience', value: 'tree-tracking', description: 'Ứng dụng theo dõi cây trồng', icon: '📱' }
    ],
    tags: ['môi trường', 'công nghệ', 'doanh nghiệp tài trợ', 'viettel'],
    featured: true
  },

  // ===== NHÓM DOANH NGHIỆP ĐỊA PHƯƠNG TÀ XÙA (Local Businesses) =====
  // Thử thách cá nhân từ doanh nghiệp địa phương
  {
    id: 'local-business-solo-1',
    title: 'Khám phá làng bản với Homestay Mây Trắng',
    description: 'Tự khám phá và tương tác với người dân bản địa cùng hướng dẫn từ Homestay Mây Trắng. Tìm hiểu cuộc sống, văn hóa và nghề truyền thống của người H\'Mông.',
    shortDescription: 'Khám phá văn hóa bản địa',
    type: 'individual',
    category: 'personal',
    source: 'local',
    variant: 'solo',
    difficulty: 'medium',
    points: 350,
    pointReward: 350,
    requirements: [
      { type: 'gps', description: 'Ghé thăm 3 làng bản khác nhau' },
      { type: 'photo', description: 'Chụp ảnh với người dân địa phương' },
      { type: 'checkin', description: 'Mua sản phẩm thủ công tại homestay' }
    ],
    timeLimit: 24,
    participants: 67,
    currentParticipants: 67,
    completions: 23,
    isActive: true,
    createdBy: 'partner',
    partnerId: 'maytrang-homestay',
    partnerName: 'Homestay Mây Trắng',
    imageUrl: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=500',
    rewards: [
      { type: 'points', value: 350, description: '350 điểm thưởng', icon: '⭐' },
      { type: 'badge', value: 'cultural-explorer', description: 'Huy hiệu Nhà khám phá văn hóa', icon: '🏮' }
    ],
    location: {
      name: 'Các làng bản Tà Xùa',
      coordinates: { lat: 21.3000, lng: 104.4000 },
      radius: 5000
    },
    tags: ['văn hóa', 'homestay địa phương', 'thủ công', 'mây trắng'],
    nearMe: true
  },
  {
    id: 'local-business-solo-2',
    title: 'Thu hoạch nông sản với Nông trại Tà Xùa Xanh',
    description: 'Tham gia thu hoạch nông sản cùng nông dân địa phương tại Nông trại Tà Xùa Xanh. Trải nghiệm cuộc sống nông thôn và học cách canh tác bền vững.',
    shortDescription: 'Trải nghiệm thu hoạch nông sản',
    type: 'individual',
    category: 'personal',
    source: 'local',
    variant: 'solo',
    difficulty: 'medium',
    points: 300,
    pointReward: 300,
    requirements: [
      { type: 'gps', description: 'Check-in tại nông trại Tà Xùa Xanh' },
      { type: 'photo', description: 'Chụp ảnh quá trình thu hoạch' },
      { type: 'checkin', description: 'Hoàn thành 3 giờ lao động' }
    ],
    timeLimit: 8,
    participants: 34,
    currentParticipants: 34,
    completions: 28,
    isActive: true,
    createdBy: 'partner',
    partnerId: 'taxuaxanh-farm',
    partnerName: 'Nông trại Tà Xùa Xanh',
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500',
    rewards: [
      { type: 'points', value: 300, description: '300 điểm thưởng', icon: '⭐' },
      { type: 'experience', value: 'fresh-produce', description: 'Nông sản tươi mang về', icon: '🌾' }
    ],
    tags: ['nông nghiệp', 'trải nghiệm', 'nông trại địa phương', 'tà xùa xanh'],
    nearMe: true
  },

  // Thử thách cộng đồng từ doanh nghiệp địa phương
  {
    id: 'local-business-community-1',
    title: 'Lễ hội Hoa Ban - Tổ chức bởi Cộng đồng Tà Xùa',
    description: 'Tham gia tổ chức và hỗ trợ Lễ hội Hoa Ban do cộng đồng địa phương tổ chức. Giúp đỡ trong việc chuẩn bị, trang trí và phục vụ du khách.',
    shortDescription: 'Hỗ trợ tổ chức lễ hội',
    type: 'community',
    category: 'event',
    source: 'local',
    variant: 'community',
    difficulty: 'easy',
    points: 200,
    pointReward: 200,
    requirements: [
      { type: 'checkin', description: 'Tham gia buổi chuẩn bị lễ hội' },
      { type: 'photo', description: 'Chụp ảnh hoạt động chuẩn bị' },
      { type: 'qr', description: 'Quét mã QR xác nhận tham gia' }
    ],
    timeLimit: 8,
    startDate: new Date('2024-03-20'),
    endDate: new Date('2024-03-22'),
    participants: 200,
    currentParticipants: 200,
    completions: 156,
    isActive: true,
    createdBy: 'partner',
    partnerId: 'taxua-community',
    partnerName: 'Cộng đồng Du lịch Tà Xùa',
    imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500',
    rewards: [
      { type: 'points', value: 200, description: '200 điểm thưởng', icon: '⭐' },
      { type: 'experience', value: 'festival-helper', description: 'Giấy chứng nhận tình nguyện viên', icon: '🏆' }
    ],
    tags: ['lễ hội', 'tình nguyện', 'cộng đồng địa phương', 'hoa ban'],
    featured: true
  },
  {
    id: 'local-business-community-2',
    title: 'Chợ phiên Tà Xùa - Hỗ trợ bán hàng',
    description: 'Giúp đỡ người dân địa phương trong ngày chợ phiên, hỗ trợ bán hàng và giới thiệu sản phẩm với du khách. Tìm hiểu về kinh tế địa phương.',
    shortDescription: 'Hỗ trợ chợ phiên địa phương',
    type: 'community',
    category: 'community',
    source: 'local',
    variant: 'community',
    difficulty: 'easy',
    points: 180,
    pointReward: 180,
    requirements: [
      { type: 'checkin', description: 'Check-in tại chợ phiên Tà Xùa' },
      { type: 'photo', description: 'Chụp ảnh hỗ trợ bán hàng' },
      { type: 'social_share', description: 'Giới thiệu sản phẩm địa phương' }
    ],
    timeLimit: 6,
    participants: 120,
    currentParticipants: 120,
    completions: 95,
    isActive: true,
    createdBy: 'partner',
    partnerId: 'taxua-market',
    partnerName: 'Ban Quản lý Chợ phiên Tà Xùa',
    imageUrl: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=500',
    rewards: [
      { type: 'points', value: 180, description: '180 điểm thưởng', icon: '⭐' },
      { type: 'voucher', value: 'market-discount', description: 'Voucher mua sắm chợ phiên 10%', icon: '🛒' }
    ],
    tags: ['chợ phiên', 'kinh tế địa phương', 'hỗ trợ cộng đồng', 'bán hàng'],
    nearMe: true
  }
];

// Utility functions for level management
export const getUserLevel = (points: number) => {
  return USER_LEVELS.find(level => points >= level.minPoints && points <= level.maxPoints) || USER_LEVELS[0];
};

export const getNextLevel = (currentLevel: any) => {
  const currentIndex = USER_LEVELS.findIndex(level => level.id === currentLevel.id);
  return currentIndex < USER_LEVELS.length - 1 ? USER_LEVELS[currentIndex + 1] : null;
};

export const calculateProgressToNextLevel = (points: number) => {
  const currentLevel = getUserLevel(points);
  const nextLevel = getNextLevel(currentLevel);
  
  if (!nextLevel) {
    return { progress: 100, pointsToNext: 0, currentLevelPoints: points - currentLevel.minPoints };
  }
  
  const currentLevelPoints = points - currentLevel.minPoints;
  const totalLevelPoints = currentLevel.maxPoints - currentLevel.minPoints + 1;
  const progress = Math.round((currentLevelPoints / totalLevelPoints) * 100);
  const pointsToNext = nextLevel.minPoints - points;
  
  return { progress, pointsToNext, currentLevelPoints };
};

// Export challenges for use in components
export const SAMPLE_CHALLENGES = EXPANDED_CHALLENGES;