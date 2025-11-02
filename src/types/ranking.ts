// Hệ thống cấp bậc thành viên Sky Quest
export type RankLevel = 'Explorer' | 'Inspiration' | 'Guardian';

export interface MemberRank {
  id: string;
  level: RankLevel;
  name: string;
  nameEn: string;
  description: string;
  minPoints: number;
  maxPoints: number | null; // null cho cấp cao nhất
  badge: {
    icon: string;
    color: string;
    gradient?: string;
    animation?: string;
  };
  benefits: string[];
  rewards: RankReward[];
  multiplier: number; // Hệ số nhân điểm
}

export interface RankReward {
  id: string;
  name: string;
  type: 'voucher' | 'badge' | 'access' | 'privilege';
  value: string | number;
  description: string;
  icon: string;
  autoUnlock: boolean;
}

export interface UserRankProgress {
  userId: string;
  currentRank: RankLevel;
  currentPoints: number;
  nextRank: RankLevel | null;
  pointsToNext: number;
  progressPercentage: number;
  rankAchievedAt: Date;
  totalPointsEarned: number;
  rankHistory: RankHistoryEntry[];
}

export interface RankHistoryEntry {
  id: string;
  userId: string;
  fromRank: RankLevel | null;
  toRank: RankLevel;
  achievedAt: Date;
  pointsAtTime: number;
  celebrationShown: boolean;
}

export interface PointActivity {
  id: string;
  userId: string;
  activityType: 'explore' | 'challenge' | 'share' | 'thanks' | 'event';
  points: number;
  description: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  questId?: string;
  sessionId?: string;
}

export interface RankCelebration {
  id: string;
  userId: string;
  newRank: RankLevel;
  previousRank: RankLevel | null;
  pointsEarned: number;
  unlockedRewards: RankReward[];
  celebrationData: {
    animation: string;
    message: string;
    duration: number;
  };
  shown: boolean;
  createdAt: Date;
}

// Cấu hình điểm cho các hoạt động
export interface PointsConfig {
  explore: number; // Khám phá địa điểm: +100 điểm
  challenge: number; // Hoàn thành thử thách: +200 điểm
  share: number; // Chia sẻ hành trình: +300 điểm
  thanks: number; // Nhận lượt cảm ơn: +20 điểm
  event: number; // Tham gia sự kiện: +500 điểm
}

// Database schema interfaces
export interface SkyQuestMember {
  user_id: string;
  sky_points: number;
  rank: RankLevel;
  rank_achieved_at: Date;
  last_updated: Date;
  total_points_earned: number;
  created_at: Date;
}

export interface SkyQuestRewardClaim {
  id: string;
  user_id: string;
  reward_id: string;
  rank: RankLevel;
  voucher_code?: string;
  is_redeemed: boolean;
  claimed_at: Date;
  expires_at?: Date;
}

// UI Component Props
export interface RankBadgeProps {
  rank: MemberRank;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showAnimation?: boolean;
  showTooltip?: boolean;
  className?: string;
}

export interface RankProgressBarProps {
  userProgress: UserRankProgress;
  showDetails?: boolean;
  animated?: boolean;
  className?: string;
}

export interface RankCelebrationModalProps {
  celebration: RankCelebration;
  isOpen: boolean;
  onClose: () => void;
  onExploreRewards: () => void;
}

// API Response types
export interface RankingApiResponse {
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
}

export interface UserRankingData {
  userProgress: UserRankProgress;
  availableRanks: MemberRank[];
  recentActivities: PointActivity[];
  pendingCelebrations: RankCelebration[];
}