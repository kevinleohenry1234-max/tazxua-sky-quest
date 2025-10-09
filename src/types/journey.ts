// Journey and Story Types for Sky Quest

export interface EmotionalFootprint {
  emotion: 'thư giãn' | 'xúc động' | 'bất ngờ' | 'hào hứng' | 'bình yên' | 'tự hào';
  intensity: number; // 1-5
  timestamp: Date;
  challengeId?: string;
  note?: string;
}

export interface JourneyChapter {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'locked';
  completedAt?: Date;
  userNotes?: string;
  userPhotos?: string[];
  emotionalFootprints: EmotionalFootprint[];
  challengeId: string;
}

export interface Journey {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  difficulty: 'Dễ' | 'Trung bình' | 'Khó';
  progress: number; // 0-100
  status: 'completed' | 'in_progress' | 'not_started';
  startedAt?: Date;
  completedAt?: Date;
  chapters: JourneyChapter[];
  totalEmotionalFootprints: EmotionalFootprint[];
  category: 'explorer' | 'photographer' | 'community' | 'environmental' | 'cultural';
}

export interface StoryCard {
  id: string;
  title: string;
  content: string;
  image?: string;
  journeyId: string;
  journeyTitle: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: Date;
  cloudLikes: number; // "thả mây" count
  wishes: StoryWish[]; // "gửi lời chúc"
  tags: string[];
  archetype?: string;
  badge?: string; // Associated badge ID
}

export interface StoryWish {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  emoji: string;
  createdAt: Date;
}

export interface SouvenirCard {
  id: string;
  title: string;
  description: string;
  image: string;
  journeyId: string;
  journeyTitle: string;
  earnedAt: Date;
  message: string; // Personal message on the card
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface InteractiveMoment {
  id: string;
  type: 'points' | 'level_up' | 'badge' | 'challenge_complete' | 'streak' | 'achievement';
  title: string;
  description: string;
  value?: number | string;
  timestamp: Date;
  animation: 'fireworks' | 'badge_spin' | 'level_glow' | 'points_burst' | 'streak_fire';
  isReplayed?: boolean;
}