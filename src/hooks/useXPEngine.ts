import { useState, useEffect, useCallback } from 'react';
import { 
  User, 
  Quest, 
  Voucher, 
  Transaction, 
  DashboardData,
  QuestCompletionResponse,
  UserStatsResponse 
} from '../types/xpEngine';
import { xpEngineService } from '../services/xpEngine';

// Hook for managing user XP and level data
export const useUserXP = (userId: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserStats = useCallback(async () => {
    try {
      setLoading(true);
      const response = await xpEngineService.getUserStats(userId);
      if (response.success && response.data) {
        setUser(response.data.user);
        setError(null);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Failed to fetch user stats');
      console.error('Error fetching user stats:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchUserStats();
    }
  }, [userId, fetchUserStats]);

  return {
    user,
    loading,
    error,
    refetch: fetchUserStats
  };
};

// Hook for managing quests
export const useQuests = (userId: string) => {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [completingQuest, setCompletingQuest] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchQuests = useCallback(() => {
    try {
      setLoading(true);
      const allQuests = xpEngineService.getAllQuests();
      setQuests(allQuests);
    } catch (error) {
      console.error('Error fetching quests:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const completeQuest = useCallback(async (
    questId: string, 
    metadata: Record<string, any> = {}
  ): Promise<QuestCompletionResponse> => {
    try {
      setCompletingQuest(questId);
      const response = await xpEngineService.completeQuest(userId, questId, metadata);
      
      if (response.success) {
        // Refresh quests after completion
        fetchQuests();
      }
      
      return response;
    } catch (error) {
      console.error('Error completing quest:', error);
      return {
        success: false,
        message: 'Failed to complete quest',
        error: 'NETWORK_ERROR'
      };
    } finally {
      setCompletingQuest(null);
    }
  }, [userId, fetchQuests]);

  useEffect(() => {
    fetchQuests();
  }, [fetchQuests]);

  return {
    quests,
    loading,
    completingQuest,
    completeQuest,
    refetch: fetchQuests
  };
};

// Hook for managing vouchers
export const useVouchers = (userId: string) => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingVoucher, setUsingVoucher] = useState<string | null>(null);

  const fetchVouchers = useCallback(() => {
    try {
      setLoading(true);
      const userVouchers = xpEngineService.getUserVouchers(userId);
      setVouchers(userVouchers);
    } catch (error) {
      console.error('Error fetching vouchers:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const useVoucher = useCallback(async (voucherId: string) => {
    try {
      setUsingVoucher(voucherId);
      const response = await xpEngineService.useVoucher(userId, voucherId);
      
      if (response.success) {
        // Refresh vouchers after use
        fetchVouchers();
      }
      
      return response;
    } catch (error) {
      console.error('Error using voucher:', error);
      return {
        success: false,
        message: 'Failed to use voucher'
      };
    } finally {
      setUsingVoucher(null);
    }
  }, [userId, fetchVouchers]);

  const exchangeXPForVoucher = useCallback(async (
    xpAmount: number, 
    exchangeRateIndex: number
  ): Promise<QuestCompletionResponse> => {
    try {
      const response = await xpEngineService.exchangeXPForVoucher(userId, xpAmount, exchangeRateIndex);
      
      if (response.success) {
        // Refresh vouchers after exchange
        fetchVouchers();
      }
      
      return response;
    } catch (error) {
      console.error('Error exchanging XP for voucher:', error);
      return {
        success: false,
        message: 'Failed to exchange XP for voucher',
        error: 'NETWORK_ERROR'
      };
    }
  }, [userId, fetchVouchers]);

  useEffect(() => {
    if (userId) {
      fetchVouchers();
    }
  }, [userId, fetchVouchers]);

  // Computed values
  const availableVouchers = vouchers.filter(v => !v.isUsed && v.expiryDate > new Date());
  const usedVouchers = vouchers.filter(v => v.isUsed);
  const expiredVouchers = vouchers.filter(v => !v.isUsed && v.expiryDate <= new Date());

  return {
    vouchers,
    availableVouchers,
    usedVouchers,
    expiredVouchers,
    loading,
    usingVoucher,
    useVoucher,
    exchangeXPForVoucher,
    refetch: fetchVouchers
  };
};

// Hook for dashboard data
export const useDashboard = (userId: string) => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await xpEngineService.getDashboardData(userId);
      if (data) {
        setDashboardData(data);
        setError(null);
      } else {
        setError('Failed to fetch dashboard data');
      }
    } catch (err) {
      setError('Failed to fetch dashboard data');
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchDashboardData();
    }
  }, [userId, fetchDashboardData]);

  return {
    dashboardData,
    loading,
    error,
    refetch: fetchDashboardData
  };
};

// Hook for XP notifications and animations
export const useXPNotifications = () => {
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    type: 'xp_gained' | 'level_up' | 'voucher_earned';
    message: string;
    data?: any;
    timestamp: Date;
  }>>([]);

  const addNotification = useCallback((
    type: 'xp_gained' | 'level_up' | 'voucher_earned',
    message: string,
    data?: any
  ) => {
    const notification = {
      id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      message,
      data,
      timestamp: new Date()
    };

    setNotifications(prev => [...prev, notification]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications
  };
};

// Hook for XP Engine context (combines all functionality)
export const useXPEngine = (userId: string) => {
  const userXP = useUserXP(userId);
  const quests = useQuests(userId);
  const vouchers = useVouchers(userId);
  const dashboard = useDashboard(userId);
  const notifications = useXPNotifications();

  // Combined quest completion with notifications
  const completeQuestWithNotification = useCallback(async (
    questId: string,
    metadata: Record<string, any> = {}
  ) => {
    const response = await quests.completeQuest(questId, metadata);
    
    if (response.success && response.data) {
      // Add XP gained notification
      notifications.addNotification(
        'xp_gained',
        `+${response.data.xpEarned} XP earned!`,
        { xpEarned: response.data.xpEarned }
      );

      // Add level up notification if applicable
      if (response.data.leveledUp && response.data.newLevel) {
        notifications.addNotification(
          'level_up',
          `Level up! You are now level ${response.data.newLevel}`,
          { newLevel: response.data.newLevel }
        );
      }

      // Add voucher notification if applicable
      if (response.data.voucherEarned) {
        notifications.addNotification(
          'voucher_earned',
          `New voucher earned: ${response.data.voucherEarned.discountPercentage}% off!`,
          { voucher: response.data.voucherEarned }
        );
      }

      // Refresh all data
      userXP.refetch();
      vouchers.refetch();
      dashboard.refetch();
    }

    return response;
  }, [quests.completeQuest, notifications.addNotification, userXP.refetch, vouchers.refetch, dashboard.refetch]);

  return {
    // User data
    user: userXP.user,
    userLoading: userXP.loading,
    userError: userXP.error,
    
    // Quests
    quests: quests.quests,
    questsLoading: quests.loading,
    completingQuest: quests.completingQuest,
    completeQuest: completeQuestWithNotification,
    
    // Vouchers
    vouchers: vouchers.vouchers,
    availableVouchers: vouchers.availableVouchers,
    usedVouchers: vouchers.usedVouchers,
    expiredVouchers: vouchers.expiredVouchers,
    vouchersLoading: vouchers.loading,
    usingVoucher: vouchers.usingVoucher,
    useVoucher: vouchers.useVoucher,
    exchangeXPForVoucher: vouchers.exchangeXPForVoucher,
    
    // Dashboard
    dashboardData: dashboard.dashboardData,
    dashboardLoading: dashboard.loading,
    dashboardError: dashboard.error,
    
    // Notifications
    notifications: notifications.notifications,
    addNotification: notifications.addNotification,
    removeNotification: notifications.removeNotification,
    clearAllNotifications: notifications.clearAllNotifications,
    
    // Refresh functions
    refreshAll: () => {
      userXP.refetch();
      quests.refetch();
      vouchers.refetch();
      dashboard.refetch();
    }
  };
};