// XP Engine Types and Interfaces
export interface User {
  id: string;
  username: string;
  email: string;
  totalXP: number;
  currentLevel: number;
  levelProgress: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  lastActivity: Date;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  category: QuestCategory;
  actionType: ActionType;
  xpReward: number;
  requirements: QuestRequirement[];
  isActive: boolean;
  isRepeatable: boolean;
  cooldownHours?: number;
  maxCompletionsPerDay?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserQuest {
  id: string;
  userId: string;
  questId: string;
  status: QuestStatus;
  completedAt?: Date;
  xpEarned: number;
  completionCount: number;
  lastCompletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Voucher {
  id: string;
  code: string;
  userId: string;
  discountPercentage: number;
  expiryDate: Date;
  isUsed: boolean;
  usedAt?: Date;
  linkedPartner: string;
  voucherType: VoucherType;
  sourceType: VoucherSourceType;
  sourceId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  userId: string;
  actionType: ActionType;
  xpChange: number;
  questId?: string;
  voucherId?: string;
  description: string;
  metadata: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
}

export interface Level {
  level: number;
  name: string;
  minXP: number;
  maxXP: number | null;
  benefits: string[];
  voucherReward?: VoucherReward;
  badgeIcon: string;
  color: string;
}

export interface VoucherReward {
  discountPercentage: number;
  expiryDays: number;
  partner: string;
}

// Enums
export enum QuestCategory {
  EXPLORATION = 'exploration',
  COMMUNITY = 'community',
  CONSERVATION = 'conservation',
  LEARNING = 'learning'
}

export enum ActionType {
  // Exploration Actions
  CHECKIN_LOCATION = 'checkin_location',
  AR_VR_EXPERIENCE = 'ar_vr_experience',
  GREEN_TOUR_PARTICIPATION = 'green_tour_participation',
  PHOTO_UPLOAD = 'photo_upload',
  
  // Community Actions
  SHARE_POST = 'share_post',
  RECEIVE_LIKE = 'receive_like',
  RECEIVE_COMMENT = 'receive_comment',
  HELP_OTHER_USER = 'help_other_user',
  
  // Conservation Actions
  PLANT_TREE = 'plant_tree',
  CLEAN_ENVIRONMENT = 'clean_environment',
  DONATE = 'donate',
  REPORT_ISSUE = 'report_issue',
  
  // Learning Actions
  COMPLETE_QUIZ = 'complete_quiz',
  PLAY_MINIGAME = 'play_minigame',
  READ_ARTICLE = 'read_article',
  WATCH_VIDEO = 'watch_video',
  
  // Penalty Actions
  SPAM_CONTENT = 'spam_content',
  VIOLATE_RULES = 'violate_rules',
  SERIOUS_VIOLATION = 'serious_violation',
  
  // System Actions
  LEVEL_UP = 'level_up',
  VOUCHER_EXCHANGE = 'voucher_exchange',
  ADMIN_ADJUSTMENT = 'admin_adjustment'
}

export enum QuestStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
  EXPIRED = 'expired'
}

export enum VoucherType {
  LEVEL_UP = 'level_up',
  XP_EXCHANGE = 'xp_exchange',
  SPECIAL_EVENT = 'special_event',
  ADMIN_GRANTED = 'admin_granted'
}

export enum VoucherSourceType {
  LEVEL_UP = 'level_up',
  XP_EXCHANGE = 'xp_exchange',
  QUEST_COMPLETION = 'quest_completion',
  SPECIAL_EVENT = 'special_event',
  ADMIN_GRANT = 'admin_grant'
}

export interface QuestRequirement {
  type: 'location' | 'time' | 'item' | 'level' | 'previous_quest';
  value: any;
  description: string;
}

// XP Engine Configuration
export interface XPConfig {
  actionRewards: Record<ActionType, number>;
  penalties: Record<ActionType, number>;
  levels: Level[];
  voucherExchangeRates: VoucherExchangeRate[];
  antiSpamSettings: AntiSpamSettings;
}

export interface VoucherExchangeRate {
  xpCost: number;
  discountPercentage: number;
  expiryDays: number;
  partner: string;
}

export interface AntiSpamSettings {
  maxQuestsPerDay: number;
  maxSameActionPerHour: number;
  gpsAccuracyThreshold: number;
  ipCooldownMinutes: number;
}

// API Response Types
export interface XPEngineResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

export interface QuestCompletionResponse extends XPEngineResponse {
  data?: {
    xpEarned: number;
    newLevel?: number;
    leveledUp: boolean;
    voucherEarned?: Voucher;
    totalXP: number;
  };
}

export interface UserStatsResponse extends XPEngineResponse {
  data?: {
    user: User;
    currentLevel: Level;
    nextLevel?: Level;
    progressToNext: number;
    totalQuests: number;
    completedQuests: number;
    availableVouchers: number;
    usedVouchers: number;
    recentTransactions: Transaction[];
  };
}

// Dashboard Data Types
export interface DashboardData {
  user: User;
  currentLevel: Level;
  nextLevel?: Level;
  progressPercentage: number;
  availableQuests: Quest[];
  completedQuests: UserQuest[];
  availableVouchers: Voucher[];
  recentActivity: Transaction[];
  stats: {
    totalXP: number;
    questsCompleted: number;
    vouchersEarned: number;
    currentStreak: number;
  };
}