export interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  proofPolicy: 'none' | 'optional' | 'required';
  proofType?: 'photo' | 'gps' | 'social' | 'text';
  completed: boolean;
  progress: number;
}

export interface QuestMode {
  id: 'calm' | 'energetic';
  name: string;
  description: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
  };
  challenges: Challenge[];
}

export interface CompletedChallenge {
  challengeId: string;
  modeId: string;
  completedAt: Date;
  score: number;
}

export interface UserProgress {
  userId: string;
  totalExp: number;
  level: number;
  completedChallenges: CompletedChallenge[];
  rewards: Reward[];
  achievements: string[];
  lastActivity: Date;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  type: 'badge' | 'voucher' | 'achievement' | 'access';
  icon?: string;
  pointsCost?: number;
  unlockLevel?: number;
  requirement?: string;
  unlocked?: boolean;
  claimed?: boolean;
}