import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProgress, Reward, CompletedChallenge } from '../types/skyquest';

interface SkyQuestContextType {
  userProgress: UserProgress;
  updateProgress: (modeId: string, challengeId: string, completed: boolean, score?: number) => void;
  addReward: (reward: Reward) => void;
  getTotalExp: () => number;
  getTotalScore: () => number;
  getLevel: () => number;
  getAvailableRewards: () => Reward[];
  claimReward: (rewardId: string) => void;
  resetProgress: () => void;
}

const SkyQuestContext = createContext<SkyQuestContextType | undefined>(undefined);

interface SkyQuestProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = 'skyquest_progress';

const initialProgress: UserProgress = {
  userId: 'user_001',
  totalExp: 0,
  level: 1,
  completedChallenges: [],
  rewards: [],
  achievements: [],
  lastActivity: new Date()
};

export const SkyQuestProvider: React.FC<SkyQuestProviderProps> = ({ children }) => {
  const [userProgress, setUserProgress] = useState<UserProgress>(initialProgress);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        // Convert date strings back to Date objects
        parsed.lastActivity = new Date(parsed.lastActivity);
        parsed.completedChallenges = parsed.completedChallenges.map((challenge: any) => ({
          ...challenge,
          completedAt: new Date(challenge.completedAt)
        }));
        setUserProgress(parsed);
      } catch (error) {
        console.error('Error loading Sky Quest progress:', error);
      }
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userProgress));
  }, [userProgress]);

  const updateProgress = (modeId: string, challengeId: string, completed: boolean, score: number = 0) => {
    setUserProgress(prev => {
      const existingChallengeIndex = prev.completedChallenges.findIndex(
        c => c.challengeId === challengeId && c.modeId === modeId
      );

      let newCompletedChallenges = [...prev.completedChallenges];
      let expGain = 0;

      if (completed) {
        const challengeData = {
          challengeId,
          modeId,
          completedAt: new Date(),
          score
        };

        if (existingChallengeIndex >= 0) {
          // Update existing challenge
          newCompletedChallenges[existingChallengeIndex] = challengeData;
        } else {
          // Add new completed challenge
          newCompletedChallenges.push(challengeData);
          // Calculate EXP gain based on mode
          expGain = modeId === 'calm' ? 30 : 50; // Different EXP for different modes
        }
      } else {
        // Remove challenge if uncompleted
        if (existingChallengeIndex >= 0) {
          newCompletedChallenges.splice(existingChallengeIndex, 1);
        }
      }

      const newTotalExp = prev.totalExp + expGain;
      const newLevel = Math.floor(newTotalExp / 100) + 1; // Level up every 100 EXP

      return {
        ...prev,
        completedChallenges: newCompletedChallenges,
        totalExp: newTotalExp,
        level: newLevel,
        lastActivity: new Date()
      };
    });
  };

  const addReward = (reward: Reward) => {
    setUserProgress(prev => ({
      ...prev,
      rewards: [...prev.rewards, reward],
      lastActivity: new Date()
    }));
  };

  const getTotalExp = () => userProgress.totalExp;

  const getTotalScore = () => {
    return userProgress.completedChallenges.reduce((total, challenge) => total + challenge.score, 0);
  };

  const getLevel = () => userProgress.level;

  const getAvailableRewards = (): Reward[] => {
    const level = getLevel();
    const totalScore = getTotalScore();
    
    const rewards: Reward[] = [
      {
        id: 'badge_peace',
        name: 'Huy hiệu Bình An',
        description: 'Hoàn thành mode Mây Mây Sương Sương',
        type: 'badge',
        requirement: 'Complete calm mode',
        unlocked: userProgress.completedChallenges.filter(c => c.modeId === 'calm').length >= 5,
        claimed: userProgress.rewards.some(r => r.id === 'badge_peace')
      },
      {
        id: 'badge_warrior',
        name: 'Huy hiệu Chiến Binh Xanh',
        description: 'Hoàn thành mode Hăng Say Săn Thưởng',
        type: 'badge',
        requirement: 'Complete energetic mode',
        unlocked: userProgress.completedChallenges.filter(c => c.modeId === 'energetic').length >= 5,
        claimed: userProgress.rewards.some(r => r.id === 'badge_warrior')
      },
      {
        id: 'voucher_10',
        name: 'Voucher giảm giá 10%',
        description: 'Giảm giá cho tour du lịch',
        type: 'voucher',
        requirement: 'Reach level 2',
        unlocked: level >= 2,
        claimed: userProgress.rewards.some(r => r.id === 'voucher_10')
      },
      {
        id: 'voucher_25',
        name: 'Voucher giảm giá 25%',
        description: 'Giảm giá đặc biệt cho tour premium',
        type: 'voucher',
        requirement: 'Reach level 5',
        unlocked: level >= 5,
        claimed: userProgress.rewards.some(r => r.id === 'voucher_25')
      },
      {
        id: 'vip_access',
        name: 'Quyền truy cập VIP',
        description: 'Truy cập sớm các tour mới',
        type: 'access',
        requirement: 'Total score 800+',
        unlocked: totalScore >= 800,
        claimed: userProgress.rewards.some(r => r.id === 'vip_access')
      }
    ];

    return rewards.filter(reward => reward.unlocked && !reward.claimed);
  };

  const claimReward = (rewardId: string) => {
    const availableRewards = getAvailableRewards();
    const reward = availableRewards.find(r => r.id === rewardId);
    
    if (reward) {
      addReward(reward);
    }
  };

  const resetProgress = () => {
    setUserProgress(initialProgress);
    localStorage.removeItem(STORAGE_KEY);
  };

  const contextValue: SkyQuestContextType = {
    userProgress,
    updateProgress,
    addReward,
    getTotalExp,
    getTotalScore,
    getLevel,
    getAvailableRewards,
    claimReward,
    resetProgress
  };

  return (
    <SkyQuestContext.Provider value={contextValue}>
      {children}
    </SkyQuestContext.Provider>
  );
};

export const useSkyQuest = (): SkyQuestContextType => {
  const context = useContext(SkyQuestContext);
  if (!context) {
    throw new Error('useSkyQuest must be used within a SkyQuestProvider');
  }
  return context;
};

export default SkyQuestContext;