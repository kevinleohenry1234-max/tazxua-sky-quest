import { useState, useEffect, useCallback } from 'react';
import { 
  UserRankProgress, 
  PointActivity, 
  RankCelebration, 
  MemberRank,
  RankLevel,
  PointsConfig
} from '@/types/ranking';
import { 
  MEMBER_RANKS, 
  POINTS_CONFIG, 
  getRankByPoints, 
  getNextRank, 
  calculateProgressToNext,
  RANK_UP_MESSAGES 
} from '@/data/rankingData';

interface UseRankingReturn {
  userProgress: UserRankProgress | null;
  isLoading: boolean;
  error: string | null;
  addPoints: (activityType: keyof PointsConfig, metadata?: Record<string, any>) => Promise<void>;
  checkForRankUp: () => Promise<RankCelebration | null>;
  getActivityHistory: () => PointActivity[];
  refreshProgress: () => Promise<void>;
  dismissCelebration: (celebrationId: string) => Promise<void>;
}

export const useRanking = (userId?: string): UseRankingReturn => {
  const [userProgress, setUserProgress] = useState<UserRankProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activityHistory, setActivityHistory] = useState<PointActivity[]>([]);

  // Khởi tạo dữ liệu người dùng
  const initializeUserProgress = useCallback(async (userId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Trong thực tế, sẽ gọi API để lấy dữ liệu từ database
      // Hiện tại sử dụng localStorage để demo
      const savedProgress = localStorage.getItem(`skyquest_ranking_${userId}`);
      
      if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        setUserProgress(progress);
      } else {
        // Tạo progress mới cho user lần đầu
        const initialProgress: UserRankProgress = {
          userId,
          currentRank: 'Explorer',
          currentPoints: 0,
          nextRank: 'Inspiration',
          pointsToNext: 1000,
          progressPercentage: 0,
          rankAchievedAt: new Date(),
          totalPointsEarned: 0,
          rankHistory: [{
            id: `history_${Date.now()}`,
            userId,
            fromRank: null,
            toRank: 'Explorer',
            achievedAt: new Date(),
            pointsAtTime: 0,
            celebrationShown: true
          }]
        };
        
        setUserProgress(initialProgress);
        localStorage.setItem(`skyquest_ranking_${userId}`, JSON.stringify(initialProgress));
      }

      // Load activity history
      const savedHistory = localStorage.getItem(`skyquest_activities_${userId}`);
      if (savedHistory) {
        setActivityHistory(JSON.parse(savedHistory));
      }

    } catch (err) {
      setError('Không thể tải thông tin cấp bậc');
      console.error('Error initializing user progress:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Thêm điểm cho hoạt động
  const addPoints = useCallback(async (
    activityType: keyof PointsConfig, 
    metadata?: Record<string, any>
  ) => {
    if (!userProgress || !userId) return;

    try {
      const basePoints = POINTS_CONFIG[activityType];
      const currentRank = getRankByPoints(userProgress.currentPoints);
      const multipliedPoints = Math.floor(basePoints * currentRank.multiplier);

      // Tạo activity record
      const newActivity: PointActivity = {
        id: `activity_${Date.now()}`,
        userId,
        activityType,
        points: multipliedPoints,
        description: getActivityDescription(activityType, multipliedPoints),
        metadata,
        createdAt: new Date()
      };

      // Cập nhật điểm
      const newTotalPoints = userProgress.currentPoints + multipliedPoints;
      const newRank = getRankByPoints(newTotalPoints);
      const progressData = calculateProgressToNext(newTotalPoints);

      const updatedProgress: UserRankProgress = {
        ...userProgress,
        currentPoints: newTotalPoints,
        currentRank: newRank.level,
        nextRank: progressData.next?.level || null,
        pointsToNext: progressData.pointsToNext,
        progressPercentage: progressData.progressPercentage,
        totalPointsEarned: userProgress.totalPointsEarned + multipliedPoints
      };

      // Kiểm tra thăng hạng
      if (newRank.level !== userProgress.currentRank) {
        const rankUpEntry = {
          id: `history_${Date.now()}`,
          userId,
          fromRank: userProgress.currentRank,
          toRank: newRank.level,
          achievedAt: new Date(),
          pointsAtTime: newTotalPoints,
          celebrationShown: false
        };

        updatedProgress.rankHistory = [...userProgress.rankHistory, rankUpEntry];
        updatedProgress.rankAchievedAt = new Date();
      }

      // Lưu vào localStorage
      localStorage.setItem(`skyquest_ranking_${userId}`, JSON.stringify(updatedProgress));
      
      const updatedHistory = [...activityHistory, newActivity];
      localStorage.setItem(`skyquest_activities_${userId}`, JSON.stringify(updatedHistory));

      setUserProgress(updatedProgress);
      setActivityHistory(updatedHistory);

    } catch (err) {
      setError('Không thể cập nhật điểm');
      console.error('Error adding points:', err);
    }
  }, [userProgress, userId, activityHistory]);

  // Kiểm tra và tạo celebration cho thăng hạng
  const checkForRankUp = useCallback(async (): Promise<RankCelebration | null> => {
    if (!userProgress) return null;

    const unshownRankUp = userProgress.rankHistory.find(
      entry => !entry.celebrationShown && entry.fromRank !== null
    );

    if (unshownRankUp) {
      const newRank = getRankByPoints(userProgress.currentPoints);
      const celebration: RankCelebration = {
        id: `celebration_${Date.now()}`,
        userId: userProgress.userId,
        newRank: unshownRankUp.toRank,
        previousRank: unshownRankUp.fromRank,
        pointsEarned: userProgress.currentPoints,
        unlockedRewards: newRank.rewards,
        celebrationData: {
          animation: newRank.badge.animation || 'bounce',
          message: RANK_UP_MESSAGES[unshownRankUp.toRank].message,
          duration: 5000
        },
        shown: false,
        createdAt: new Date()
      };

      return celebration;
    }

    return null;
  }, [userProgress]);

  // Đánh dấu celebration đã được hiển thị
  const dismissCelebration = useCallback(async (celebrationId: string) => {
    if (!userProgress || !userId) return;

    const updatedHistory = userProgress.rankHistory.map(entry => ({
      ...entry,
      celebrationShown: true
    }));

    const updatedProgress = {
      ...userProgress,
      rankHistory: updatedHistory
    };

    localStorage.setItem(`skyquest_ranking_${userId}`, JSON.stringify(updatedProgress));
    setUserProgress(updatedProgress);
  }, [userProgress, userId]);

  // Refresh dữ liệu
  const refreshProgress = useCallback(async () => {
    if (userId) {
      await initializeUserProgress(userId);
    }
  }, [userId, initializeUserProgress]);

  // Lấy lịch sử hoạt động
  const getActivityHistory = useCallback(() => {
    return activityHistory.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [activityHistory]);

  // Helper function để tạo mô tả hoạt động
  const getActivityDescription = (activityType: keyof PointsConfig, points: number): string => {
    const descriptions = {
      explore: `Khám phá địa điểm mới (+${points} điểm)`,
      challenge: `Hoàn thành thử thách môi trường (+${points} điểm)`,
      share: `Chia sẻ hành trình được xác thực (+${points} điểm)`,
      thanks: `Nhận lượt cảm ơn từ cộng đồng (+${points} điểm)`,
      event: `Tham gia sự kiện đặc biệt (+${points} điểm)`
    };
    return descriptions[activityType];
  };

  // Initialize khi có userId
  useEffect(() => {
    if (userId) {
      initializeUserProgress(userId);
    }
  }, [userId, initializeUserProgress]);

  return {
    userProgress,
    isLoading,
    error,
    addPoints,
    checkForRankUp,
    getActivityHistory,
    refreshProgress,
    dismissCelebration
  };
};

// Hook để lấy thông tin cấp bậc tổng quát
export const useRankInfo = () => {
  const getAllRanks = useCallback(() => MEMBER_RANKS, []);
  
  const getRankByLevel = useCallback((level: RankLevel) => {
    return MEMBER_RANKS.find(rank => rank.level === level);
  }, []);

  const getPointsConfig = useCallback(() => POINTS_CONFIG, []);

  return {
    getAllRanks,
    getRankByLevel,
    getPointsConfig
  };
};