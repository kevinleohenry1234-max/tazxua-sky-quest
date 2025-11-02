import { 
  User, 
  Quest, 
  UserQuest, 
  Voucher, 
  Transaction, 
  ActionType, 
  QuestStatus, 
  VoucherType, 
  VoucherSourceType,
  QuestCompletionResponse,
  UserStatsResponse,
  DashboardData
} from '../types/xpEngine';
import { 
  XP_ENGINE_CONFIG, 
  getLevelByXP, 
  getNextLevel, 
  getProgressToNextLevel, 
  generateVoucherCode,
  LEVELS 
} from '../data/xpEngineConfig';

class XPEngineService {
  private users: Map<string, User> = new Map();
  private quests: Map<string, Quest> = new Map();
  private userQuests: Map<string, UserQuest[]> = new Map();
  private vouchers: Map<string, Voucher[]> = new Map();
  private transactions: Map<string, Transaction[]> = new Map();

  constructor() {
    this.initializeMockData();
  }

  // Initialize with mock data for development
  private initializeMockData() {
    // Mock user
    const mockUser: User = {
      id: 'user-1',
      username: 'demo_user',
      email: 'demo@viviet.com',
      totalXP: 1250,
      currentLevel: 2,
      levelProgress: 75,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date(),
      isActive: true,
      lastActivity: new Date()
    };
    this.users.set(mockUser.id, mockUser);

    // Mock quests
    const mockQuests: Quest[] = [
      {
        id: 'quest-1',
        title: 'Check-in tại Đỉnh Tà Xùa',
        description: 'Đến và check-in tại đỉnh Tà Xùa để nhận 100 XP',
        category: 'exploration' as any,
        actionType: ActionType.CHECKIN_LOCATION,
        xpReward: 100,
        requirements: [],
        isActive: true,
        isRepeatable: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'quest-2',
        title: 'Chia sẻ ảnh Tà Xùa',
        description: 'Chia sẻ một bức ảnh đẹp về Tà Xùa lên mạng xã hội',
        category: 'community' as any,
        actionType: ActionType.SHARE_POST,
        xpReward: 30,
        requirements: [],
        isActive: true,
        isRepeatable: true,
        maxCompletionsPerDay: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'quest-3',
        title: 'Trồng cây tại Tà Xùa',
        description: 'Tham gia chương trình trồng cây bảo vệ môi trường',
        category: 'conservation' as any,
        actionType: ActionType.PLANT_TREE,
        xpReward: 300,
        requirements: [],
        isActive: true,
        isRepeatable: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    mockQuests.forEach(quest => this.quests.set(quest.id, quest));

    // Initialize empty arrays for user data
    this.userQuests.set(mockUser.id, []);
    this.vouchers.set(mockUser.id, []);
    this.transactions.set(mockUser.id, []);
  }

  // Complete a quest and award XP
  async completeQuest(userId: string, questId: string, metadata: Record<string, any> = {}): Promise<QuestCompletionResponse> {
    try {
      const user = this.users.get(userId);
      const quest = this.quests.get(questId);

      if (!user) {
        return { success: false, message: 'User not found', error: 'USER_NOT_FOUND' };
      }

      if (!quest) {
        return { success: false, message: 'Quest not found', error: 'QUEST_NOT_FOUND' };
      }

      if (!quest.isActive) {
        return { success: false, message: 'Quest is not active', error: 'QUEST_INACTIVE' };
      }

      // Check if user can complete this quest
      const canComplete = await this.canCompleteQuest(userId, questId);
      if (!canComplete.allowed) {
        return { success: false, message: canComplete.reason, error: 'QUEST_NOT_ALLOWED' };
      }

      // Award XP
      const xpEarned = quest.xpReward;
      const oldLevel = user.currentLevel;
      user.totalXP += xpEarned;
      user.lastActivity = new Date();
      user.updatedAt = new Date();

      // Check for level up
      const newLevel = getLevelByXP(user.totalXP);
      const leveledUp = newLevel.level > oldLevel;
      let voucherEarned: Voucher | undefined;

      if (leveledUp) {
        user.currentLevel = newLevel.level;
        
        // Award level up voucher
        if (newLevel.voucherReward) {
          voucherEarned = await this.createVoucher(userId, {
            discountPercentage: newLevel.voucherReward.discountPercentage,
            expiryDays: newLevel.voucherReward.expiryDays,
            partner: newLevel.voucherReward.partner,
            type: VoucherType.LEVEL_UP,
            sourceType: VoucherSourceType.LEVEL_UP
          });
        }

        // Log level up transaction
        await this.logTransaction(userId, {
          actionType: ActionType.LEVEL_UP,
          xpChange: 0,
          description: `Level up to ${newLevel.name}`,
          metadata: { oldLevel, newLevel: newLevel.level }
        });
      }

      // Update quest progress
      const userQuestList = this.userQuests.get(userId) || [];
      let userQuest = userQuestList.find(uq => uq.questId === questId);

      if (!userQuest) {
        userQuest = {
          id: `user-quest-${Date.now()}`,
          userId,
          questId,
          status: QuestStatus.COMPLETED,
          completedAt: new Date(),
          xpEarned,
          completionCount: 1,
          lastCompletedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        };
        userQuestList.push(userQuest);
      } else {
        userQuest.status = QuestStatus.COMPLETED;
        userQuest.completedAt = new Date();
        userQuest.xpEarned += xpEarned;
        userQuest.completionCount += 1;
        userQuest.lastCompletedAt = new Date();
        userQuest.updatedAt = new Date();
      }

      this.userQuests.set(userId, userQuestList);

      // Log quest completion transaction
      await this.logTransaction(userId, {
        actionType: quest.actionType,
        xpChange: xpEarned,
        questId,
        description: `Completed quest: ${quest.title}`,
        metadata
      });

      return {
        success: true,
        message: 'Quest completed successfully',
        data: {
          xpEarned,
          newLevel: leveledUp ? newLevel.level : undefined,
          leveledUp,
          voucherEarned,
          totalXP: user.totalXP
        }
      };

    } catch (error) {
      console.error('Error completing quest:', error);
      return { success: false, message: 'Internal server error', error: 'INTERNAL_ERROR' };
    }
  }

  // Check if user can complete a quest
  private async canCompleteQuest(userId: string, questId: string): Promise<{ allowed: boolean; reason?: string }> {
    const quest = this.quests.get(questId);
    const userQuestList = this.userQuests.get(userId) || [];
    const userQuest = userQuestList.find(uq => uq.questId === questId);

    if (!quest) {
      return { allowed: false, reason: 'Quest not found' };
    }

    // Check if quest is repeatable
    if (!quest.isRepeatable && userQuest && userQuest.status === QuestStatus.COMPLETED) {
      return { allowed: false, reason: 'Quest already completed and not repeatable' };
    }

    // Check daily completion limit
    if (quest.maxCompletionsPerDay && userQuest) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const completionsToday = userQuestList.filter(uq => 
        uq.questId === questId && 
        uq.lastCompletedAt && 
        uq.lastCompletedAt >= today
      ).length;

      if (completionsToday >= quest.maxCompletionsPerDay) {
        return { allowed: false, reason: 'Daily completion limit reached' };
      }
    }

    // Check cooldown
    if (quest.cooldownHours && userQuest && userQuest.lastCompletedAt) {
      const cooldownEnd = new Date(userQuest.lastCompletedAt);
      cooldownEnd.setHours(cooldownEnd.getHours() + quest.cooldownHours);
      
      if (new Date() < cooldownEnd) {
        return { allowed: false, reason: 'Quest is on cooldown' };
      }
    }

    return { allowed: true };
  }

  // Exchange XP for voucher
  async exchangeXPForVoucher(userId: string, xpAmount: number, exchangeRateIndex: number): Promise<QuestCompletionResponse> {
    try {
      const user = this.users.get(userId);
      if (!user) {
        return { success: false, message: 'User not found', error: 'USER_NOT_FOUND' };
      }

      const exchangeRate = XP_ENGINE_CONFIG.voucherExchangeRates[exchangeRateIndex];
      if (!exchangeRate) {
        return { success: false, message: 'Invalid exchange rate', error: 'INVALID_EXCHANGE_RATE' };
      }

      if (user.totalXP < exchangeRate.xpCost) {
        return { success: false, message: 'Insufficient XP', error: 'INSUFFICIENT_XP' };
      }

      // Deduct XP
      user.totalXP -= exchangeRate.xpCost;
      user.updatedAt = new Date();

      // Create voucher
      const voucher = await this.createVoucher(userId, {
        discountPercentage: exchangeRate.discountPercentage,
        expiryDays: exchangeRate.expiryDays,
        partner: exchangeRate.partner,
        type: VoucherType.XP_EXCHANGE,
        sourceType: VoucherSourceType.XP_EXCHANGE
      });

      // Log transaction
      await this.logTransaction(userId, {
        actionType: ActionType.VOUCHER_EXCHANGE,
        xpChange: -exchangeRate.xpCost,
        voucherId: voucher.id,
        description: `Exchanged ${exchangeRate.xpCost} XP for ${exchangeRate.discountPercentage}% voucher`,
        metadata: { exchangeRateIndex }
      });

      return {
        success: true,
        message: 'Voucher created successfully',
        data: {
          xpEarned: -exchangeRate.xpCost,
          leveledUp: false,
          voucherEarned: voucher,
          totalXP: user.totalXP
        }
      };

    } catch (error) {
      console.error('Error exchanging XP for voucher:', error);
      return { success: false, message: 'Internal server error', error: 'INTERNAL_ERROR' };
    }
  }

  // Create a voucher
  private async createVoucher(userId: string, options: {
    discountPercentage: number;
    expiryDays: number;
    partner: string;
    type: VoucherType;
    sourceType: VoucherSourceType;
    sourceId?: string;
  }): Promise<Voucher> {
    const voucher: Voucher = {
      id: `voucher-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      code: generateVoucherCode(),
      userId,
      discountPercentage: options.discountPercentage,
      expiryDate: new Date(Date.now() + options.expiryDays * 24 * 60 * 60 * 1000),
      isUsed: false,
      linkedPartner: options.partner,
      voucherType: options.type,
      sourceType: options.sourceType,
      sourceId: options.sourceId,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const userVouchers = this.vouchers.get(userId) || [];
    userVouchers.push(voucher);
    this.vouchers.set(userId, userVouchers);

    return voucher;
  }

  // Log transaction
  private async logTransaction(userId: string, options: {
    actionType: ActionType;
    xpChange: number;
    questId?: string;
    voucherId?: string;
    description: string;
    metadata?: Record<string, any>;
  }): Promise<Transaction> {
    const transaction: Transaction = {
      id: `transaction-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId,
      actionType: options.actionType,
      xpChange: options.xpChange,
      questId: options.questId,
      voucherId: options.voucherId,
      description: options.description,
      metadata: options.metadata || {},
      ipAddress: '127.0.0.1', // Would be real IP in production
      userAgent: 'Mock User Agent',
      timestamp: new Date()
    };

    const userTransactions = this.transactions.get(userId) || [];
    userTransactions.push(transaction);
    this.transactions.set(userId, userTransactions);

    return transaction;
  }

  // Get user stats
  async getUserStats(userId: string): Promise<UserStatsResponse> {
    try {
      const user = this.users.get(userId);
      if (!user) {
        return { success: false, message: 'User not found', error: 'USER_NOT_FOUND' };
      }

      const currentLevel = getLevelByXP(user.totalXP);
      const nextLevel = getNextLevel(currentLevel.level);
      const progressToNext = getProgressToNextLevel(user.totalXP, currentLevel, nextLevel);

      const userQuestList = this.userQuests.get(userId) || [];
      const userVouchers = this.vouchers.get(userId) || [];
      const userTransactions = this.transactions.get(userId) || [];

      const totalQuests = this.quests.size;
      const completedQuests = userQuestList.filter(uq => uq.status === QuestStatus.COMPLETED).length;
      const availableVouchers = userVouchers.filter(v => !v.isUsed && v.expiryDate > new Date()).length;
      const usedVouchers = userVouchers.filter(v => v.isUsed).length;

      return {
        success: true,
        message: 'User stats retrieved successfully',
        data: {
          user,
          currentLevel,
          nextLevel,
          progressToNext,
          totalQuests,
          completedQuests,
          availableVouchers,
          usedVouchers,
          recentTransactions: userTransactions.slice(-10)
        }
      };

    } catch (error) {
      console.error('Error getting user stats:', error);
      return { success: false, message: 'Internal server error', error: 'INTERNAL_ERROR' };
    }
  }

  // Get dashboard data
  async getDashboardData(userId: string): Promise<DashboardData | null> {
    try {
      const user = this.users.get(userId);
      if (!user) return null;

      const currentLevel = getLevelByXP(user.totalXP);
      const nextLevel = getNextLevel(currentLevel.level);
      const progressPercentage = getProgressToNextLevel(user.totalXP, currentLevel, nextLevel);

      const userQuestList = this.userQuests.get(userId) || [];
      const userVouchers = this.vouchers.get(userId) || [];
      const userTransactions = this.transactions.get(userId) || [];

      // Get available quests (not completed or repeatable)
      const availableQuests = Array.from(this.quests.values()).filter(quest => {
        if (!quest.isActive) return false;
        
        const userQuest = userQuestList.find(uq => uq.questId === quest.id);
        if (!userQuest) return true;
        
        return quest.isRepeatable || userQuest.status !== QuestStatus.COMPLETED;
      });

      const completedQuests = userQuestList.filter(uq => uq.status === QuestStatus.COMPLETED);
      const availableVouchers = userVouchers.filter(v => !v.isUsed && v.expiryDate > new Date());

      // Calculate current streak (consecutive days with activity)
      const currentStreak = this.calculateCurrentStreak(userTransactions);

      return {
        user,
        currentLevel,
        nextLevel,
        progressPercentage,
        availableQuests,
        completedQuests,
        availableVouchers,
        recentActivity: userTransactions.slice(-5),
        stats: {
          totalXP: user.totalXP,
          questsCompleted: completedQuests.length,
          vouchersEarned: userVouchers.length,
          currentStreak
        }
      };

    } catch (error) {
      console.error('Error getting dashboard data:', error);
      return null;
    }
  }

  // Calculate current streak
  private calculateCurrentStreak(transactions: Transaction[]): number {
    if (transactions.length === 0) return 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let streak = 0;
    let currentDate = new Date(today);

    while (true) {
      const dayStart = new Date(currentDate);
      const dayEnd = new Date(currentDate);
      dayEnd.setHours(23, 59, 59, 999);

      const hasActivityOnDay = transactions.some(t => 
        t.timestamp >= dayStart && t.timestamp <= dayEnd && t.xpChange > 0
      );

      if (hasActivityOnDay) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  }

  // Get all quests
  getAllQuests(): Quest[] {
    return Array.from(this.quests.values());
  }

  // Get user vouchers
  getUserVouchers(userId: string): Voucher[] {
    return this.vouchers.get(userId) || [];
  }

  // Use voucher
  async useVoucher(userId: string, voucherId: string): Promise<{ success: boolean; message: string }> {
    const userVouchers = this.vouchers.get(userId) || [];
    const voucher = userVouchers.find(v => v.id === voucherId);

    if (!voucher) {
      return { success: false, message: 'Voucher not found' };
    }

    if (voucher.isUsed) {
      return { success: false, message: 'Voucher already used' };
    }

    if (voucher.expiryDate < new Date()) {
      return { success: false, message: 'Voucher expired' };
    }

    voucher.isUsed = true;
    voucher.usedAt = new Date();
    voucher.updatedAt = new Date();

    return { success: true, message: 'Voucher used successfully' };
  }
}

// Export singleton instance
export const xpEngineService = new XPEngineService();
export default xpEngineService;