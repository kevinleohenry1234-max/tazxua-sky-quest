import { useState, useEffect, useCallback } from 'react';
import { 
  UserProfile, 
  Challenge, 
  UserChallenge, 
  Badge, 
  Voucher, 
  PointTransaction,
  PointAction 
} from '../types/gamification';
import { 
  getUserLevel, 
  getNextLevel, 
  calculateProgressToNextLevel,
  POINT_RULES,
  SAMPLE_CHALLENGES,
  SAMPLE_BADGES,
  SAMPLE_VOUCHERS
} from '../data/gamificationData';

// Micro-interactions callback type
type MicroInteractionCallback = (
  type: 'points' | 'level_up' | 'badge' | 'challenge_complete' | 'streak' | 'achievement',
  options?: {
    value?: number | string;
    title?: string;
    description?: string;
  }
) => void;

// Mock user data - in real app this would come from backend
const MOCK_USER_PROFILE: UserProfile = {
  id: 'user-1',
  username: 'Người khám phá Tà Xùa',
  email: 'user@example.com',
  totalPoints: 750,
  currentLevel: getUserLevel(750),
  nextLevel: getNextLevel(getUserLevel(750)),
  badges: [],
  vouchers: [],
  joinDate: new Date('2024-01-01'),
  lastActivity: new Date(),
  streak: 5,
  referralCode: 'TAXUA750',
  referredBy: undefined
};

export const useGamification = (onMicroInteraction?: MicroInteractionCallback) => {
  const [userProfile, setUserProfile] = useState<UserProfile>(MOCK_USER_PROFILE);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [userChallenges, setUserChallenges] = useState<UserChallenge[]>([]);
  const [pointHistory, setPointHistory] = useState<PointTransaction[]>([]);

  // Initialize data
  useEffect(() => {
    setChallenges(SAMPLE_CHALLENGES);
    
    // Mock some point history
    const mockHistory: PointTransaction[] = [
      {
        id: 'tx-1',
        userId: 'user-1',
        type: 'earn',
        points: 100,
        source: 'checkin',
        description: 'Check-in tại điểm du lịch',
        timestamp: new Date('2024-01-15')
      },
      {
        id: 'tx-2',
        userId: 'user-1',
        type: 'earn',
        points: 50,
        source: 'review',
        description: 'Viết đánh giá homestay',
        timestamp: new Date('2024-01-14')
      }
    ];
    setPointHistory(mockHistory);
  }, []);

  // Award points to user
  const awardPoints = useCallback((action: PointAction, customPoints?: number) => {
    const pointRule = POINT_RULES.find(rule => rule.action === action);
    if (!pointRule) return;

    const points = customPoints || pointRule.basePoints;
    const previousLevel = getUserLevel(userProfile.totalPoints);
    
    setUserProfile(prev => {
      const newTotalPoints = prev.totalPoints + points;
      const newLevel = getUserLevel(newTotalPoints);
      
      // Trigger micro-interaction for points
      onMicroInteraction?.('points', { value: points });
      
      // Check for level up
      if (newLevel.id > previousLevel.id) {
        onMicroInteraction?.('level_up', { 
          value: newLevel.name,
          title: `Lên cấp ${newLevel.name}!`,
          description: `Chúc mừng bạn đã đạt cấp độ ${newLevel.name}!`
        });
      }
      
      return {
        ...prev,
        totalPoints: newTotalPoints,
        currentLevel: newLevel,
        nextLevel: getNextLevel(newLevel),
        lastActivity: new Date()
      };
    });

    // Add to point history
    const transaction: PointTransaction = {
      id: `tx-${Date.now()}`,
      userId: userProfile.id,
      type: 'earn',
      points,
      source: action,
      description: pointRule.description,
      timestamp: new Date()
    };
    
    setPointHistory(prev => [transaction, ...prev]);
    
    return transaction;
  }, [userProfile.totalPoints, userProfile.id, onMicroInteraction]);

  // Spend points (for vouchers)
  const spendPoints = useCallback((points: number, description: string) => {
    if (userProfile.totalPoints < points) {
      throw new Error('Không đủ điểm để thực hiện giao dịch này');
    }

    const transaction: PointTransaction = {
      id: `tx-${Date.now()}`,
      userId: userProfile.id,
      type: 'spend',
      points: -points,
      source: 'voucher_purchase',
      description,
      timestamp: new Date()
    };
    
    setPointHistory(prev => [transaction, ...prev]);
    
    setUserProfile(prev => ({
      ...prev,
      totalPoints: prev.totalPoints - points,
      lastActivity: new Date()
    }));

    return transaction;
  }, [userProfile]);

  // Award badge to user
  const awardBadge = useCallback((badge: Badge) => {
    setUserProfile(prev => {
      if (prev.badges.some(b => b.id === badge.id)) {
        return prev; // Badge already exists
      }
      
      // Trigger micro-interaction for badge
      onMicroInteraction?.('badge', { 
        title: `Huy hiệu mới: ${badge.name}!`,
        description: badge.description
      });
      
      return {
        ...prev,
        badges: [...prev.badges, badge],
        lastActivity: new Date()
      };
    });
  }, [onMicroInteraction]);

  // Add voucher to user
  const addVoucher = useCallback((voucher: Voucher) => {
    setUserProfile(prev => ({
      ...prev,
      vouchers: [...prev.vouchers, voucher],
      lastActivity: new Date()
    }));
  }, []);

  // Use voucher
  const useVoucher = useCallback((voucherId: string) => {
    setUserProfile(prev => ({
      ...prev,
      vouchers: prev.vouchers.filter(v => v.id !== voucherId),
      lastActivity: new Date()
    }));
  }, []);

  // Join challenge
  const joinChallenge = useCallback((challengeId: string) => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (!challenge) return;

    const userChallenge: UserChallenge = {
      id: `uc-${Date.now()}`,
      userId: userProfile.id,
      challengeId,
      status: 'in_progress',
      joinedAt: new Date(),
      progress: {
        current: 0,
        target: challenge.requirements.length,
        completedRequirements: []
      }
    };

    setUserChallenges(prev => [...prev, userChallenge]);
    
    // Update challenge participant count
    setChallenges(prev => prev.map(c => 
      c.id === challengeId 
        ? { ...c, currentParticipants: c.currentParticipants + 1 }
        : c
    ));
  }, [challenges, userProfile.id]);

  // Complete challenge
  const completeChallenge = useCallback((challengeId: string) => {
    const challenge = challenges.find(c => c.id === challengeId);
    const userChallenge = userChallenges.find(uc => uc.challengeId === challengeId);
    
    if (!challenge || !userChallenge) return;

    // Update user challenge status
    setUserChallenges(prev => prev.map(uc => 
      uc.challengeId === challengeId 
        ? { ...uc, status: 'completed', completedAt: new Date() }
        : uc
    ));

    // Award points
    awardPoints('challenge_complete', challenge.pointReward);
    
    // Trigger micro-interaction for challenge completion
    onMicroInteraction?.('challenge_complete', {
      title: `Hoàn thành: ${challenge.title}!`,
      description: `Bạn nhận được ${challenge.pointReward} điểm`
    });

    // Award badge if applicable
    if (challenge.badge) {
      const badge = SAMPLE_BADGES.find(b => b.id === challenge.badge);
      if (badge) {
        awardBadge(badge);
      }
    }
  }, [challenges, userChallenges, awardPoints, awardBadge, onMicroInteraction]);

  // Calculate progress to next level
  const getProgressToNextLevel = useCallback(() => {
    return calculateProgressToNextLevel(userProfile.totalPoints);
  }, [userProfile.totalPoints]);

  // Get available challenges (not joined yet)
  const getAvailableChallenges = useCallback(() => {
    const joinedChallengeIds = userChallenges.map(uc => uc.challengeId);
    return challenges.filter(c => !joinedChallengeIds.includes(c.id));
  }, [challenges, userChallenges]);

  // Get user's active challenges
  const getActiveChallenges = useCallback(() => {
    return userChallenges.filter(uc => uc.status === 'in_progress');
  }, [userChallenges]);

  // Get user's completed challenges
  const getCompletedChallenges = useCallback(() => {
    return userChallenges.filter(uc => uc.status === 'completed');
  }, [userChallenges]);

  return {
    // State
    userProfile,
    challenges,
    userChallenges,
    pointHistory,
    
    // Actions
    awardPoints,
    spendPoints,
    awardBadge,
    addVoucher,
    useVoucher,
    joinChallenge,
    completeChallenge,
    
    // Computed values
    getProgressToNextLevel,
    getAvailableChallenges,
    getActiveChallenges,
    getCompletedChallenges
  };
};