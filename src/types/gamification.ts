// Gamification System Types for Tà Xùa Xanh

export interface UserLevel {
  id: number;
  name: string;
  title: string;
  minPoints: number;
  maxPoints: number;
  benefits: string[];
  color: string;
  icon: string;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  totalPoints: number;
  currentLevel: UserLevel;
  nextLevel?: UserLevel;
  badges: Badge[];
  vouchers: Voucher[];
  joinDate: Date;
  lastActivity: Date;
  streak: number;
  referralCode: string;
  referredBy?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  type: 'individual' | 'community' | 'event';
  category: 'personal' | 'community' | 'event';
  source: 'management' | 'brand' | 'local'; // Tà Xùa Hub, Brand Partners, Local Community
  variant: 'solo' | 'community'; // Solo or Community variant
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  pointReward: number;
  requirements: ChallengeRequirement[];
  timeLimit?: number; // in hours
  startDate?: Date;
  endDate?: Date;
  participants: number;
  currentParticipants: number;
  completions: number;
  isActive: boolean;
  createdBy: 'system' | 'partner';
  partnerId?: string;
  partnerName?: string;
  imageUrl?: string;
  badge?: string; // Badge ID that can be earned
  rewards?: ChallengeReward[];
  location?: ChallengeLocation;
  tags?: string[];
  featured?: boolean;
  trending?: boolean;
  nearMe?: boolean;
}

export type ChallengeType = 'individual' | 'community' | 'event';
export type ChallengeSource = 'management' | 'brand' | 'local';
export type ChallengeVariant = 'solo' | 'community';

export interface ChallengeReward {
  type: 'points' | 'badge' | 'voucher' | 'experience';
  value: number | string;
  description: string;
  icon?: string;
}

export interface ChallengeLocation {
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  radius?: number; // in meters
  address?: string;
}

export interface ChallengeRequirement {
  type: 'gps' | 'photo' | 'qr' | 'review' | 'checkin' | 'social_share';
  description: string;
  data?: any; // GPS coordinates, QR code, etc.
}

export interface UserChallenge {
  id: string;
  userId: string;
  challengeId: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'failed';
  progress: {
    current: number;
    target: number;
    completedRequirements: string[];
  };
  joinedAt?: Date;
  startedAt?: Date;
  completedAt?: Date;
  evidence?: ChallengeEvidence[];
}

export interface ChallengeProgress {
  requirementId: string;
  completed: boolean;
  completedAt?: Date;
  data?: any;
}

export interface ChallengeEvidence {
  type: 'photo' | 'gps' | 'qr' | 'text';
  data: string;
  timestamp: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: 'explorer' | 'photographer' | 'community' | 'environmental' | 'cultural';
  earnedAt?: Date;
}

export interface Voucher {
  id: string;
  title: string;
  description: string;
  type: 'homestay' | 'food' | 'activity' | 'tour';
  value: number;
  discountPercent?: number;
  pointsCost: number;
  partnerId?: string;
  partnerName?: string;
  code: string;
  isUsed: boolean;
  usedAt?: Date;
  expiresAt: Date;
  earnedAt: Date;
}

export interface PointTransaction {
  id: string;
  userId: string;
  type: 'earn' | 'spend';
  points: number;
  source: 'checkin' | 'review' | 'challenge' | 'referral' | 'social_share' | 'voucher_purchase' | 'photo_share' | 'challenge_complete' | 'event_participation' | 'streak_bonus' | 'community_contribution';
  sourceId?: string;
  description: string;
  timestamp: Date;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatar?: string;
  points: number;
  level: UserLevel;
  rank: number;
  badges: Badge[];
}

export interface Leaderboard {
  period: 'weekly' | 'monthly' | 'all_time';
  entries: LeaderboardEntry[];
  lastUpdated: Date;
}

// Action types for point earning
export type PointAction = 
  | 'checkin'
  | 'review'
  | 'photo_share'
  | 'challenge_complete'
  | 'referral'
  | 'social_share'
  | 'event_participation'
  | 'streak_bonus'
  | 'community_contribution';

export interface PointRule {
  action: PointAction;
  basePoints: number;
  multiplier?: number;
  maxDaily?: number;
  description: string;
}