// Narrative Adventure System Types for Tà Xùa Sky Quest

export interface UserArchetype {
  id: string;
  name: string;
  title: string;
  description: string;
  characteristics: string[];
  preferredActivities: string[];
  icon: string;
  color: string;
  gradient: string;
}

export interface OnboardingQuestion {
  id: string;
  question: string;
  type: 'single_choice' | 'multiple_choice' | 'scale';
  options: OnboardingOption[];
  weight: number; // Influence on archetype determination
}

export interface OnboardingOption {
  id: string;
  text: string;
  archetypeWeights: {
    [archetypeId: string]: number;
  };
  icon?: string;
}

export interface OnboardingResponse {
  questionId: string;
  selectedOptions: string[];
  timestamp: Date;
}

export interface Journey {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  storyIntro: string;
  storyOutro: string;
  archetype: string; // Archetype ID
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedDuration: number; // in hours
  chapters: JourneyChapter[];
  rewards: JourneyReward[];
  imageUrl: string;
  mapImageUrl?: string;
  soundscapeUrl?: string;
  tags: string[];
  isUnlocked: boolean;
  prerequisites?: string[]; // Journey IDs that must be completed first
}

export interface JourneyChapter {
  id: string;
  title: string;
  description: string;
  storyText: string;
  guidanceText: string;
  challengeId: string; // Reference to existing challenge
  order: number;
  isCompleted: boolean;
  completedAt?: Date;
  diaryEntry?: string; // Auto-generated diary entry after completion
}

export interface JourneyReward {
  type: 'title' | 'badge' | 'souvenir_card' | 'voucher' | 'experience';
  value: string;
  name: string;
  description: string;
  emotionalValue: string; // What this reward means emotionally
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface SouvenirCard {
  id: string;
  title: string;
  description: string;
  storyText: string;
  imageUrl: string;
  journeyId: string;
  earnedAt: Date;
  location?: string;
  weather?: string;
  companions?: string[];
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  emotionalValue?: string;
  dateCollected?: string;
}

export interface UserJourney {
  id: string;
  userId: string;
  journeyId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  currentChapter: number;
  startedAt?: Date;
  completedAt?: Date;
  completedChapters: string[];
  diaryEntries: DiaryEntry[];
  personalNotes?: string;
}

export interface DiaryEntry {
  id: string;
  chapterId: string;
  text: string;
  timestamp: Date;
  location?: string;
  weather?: string;
  mood?: string;
  photos?: string[];
}

export interface MiniQuest {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'podcast' | 'reflection' | 'quiz' | 'virtual_tour' | 'mindfulness' | 'creative' | 'action';
  content: MiniQuestContent;
  points?: number;
  estimatedTime?: number; // in minutes
  duration?: number; // in seconds
  difficulty?: 'easy' | 'medium' | 'hard';
  archetype?: string;
  location?: string;
  rewards?: {
    points: number;
    badge?: string;
    title?: string;
  };
  isCompleted?: boolean;
  completedAt?: Date;
}

export interface MiniQuestContent {
  videoUrl?: string;
  podcastUrl?: string;
  reflectionPrompt?: string;
  quizQuestions?: QuizQuestion[];
  virtualTourUrl?: string;
  steps?: string[];
  tips?: string[];
  guidance?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

import { UserProfile as BaseUserProfile } from './gamification';

export interface NarrativeUserProfile extends BaseUserProfile {
  archetype?: UserArchetype;
  completedJourneys: string[];
  currentJourney?: string;
  completedChapters?: string[];
  personalDiary: DiaryEntry[];
  souvenirCards: SouvenirCard[];
  titles: string[];
  onboardingCompleted: boolean;
  onboardingResponses?: OnboardingResponse[];
}

// Archetype definitions
export const ARCHETYPES: UserArchetype[] = [
  {
    id: 'protector',
    name: 'Người Bảo Vệ',
    title: 'Chiến Binh Xanh',
    description: 'Bạn là người có trái tim yêu thiên nhiên và luôn sẵn sàng hành động để bảo vệ môi trường.',
    characteristics: [
      'Thích các hoạt động thực tế có tác động tích cực',
      'Quan tâm đến bảo vệ môi trường',
      'Sẵn sàng tham gia công việc tình nguyện',
      'Thích làm việc nhóm vì mục tiêu chung'
    ],
    preferredActivities: ['dọn dẹp môi trường', 'trồng cây', 'bảo vệ động vật', 'giáo dục cộng đồng'],
    icon: '🛡️',
    color: 'green',
    gradient: 'from-green-500 to-emerald-600'
  },
  {
    id: 'observer',
    name: 'Người Quan Sát',
    title: 'Nhà Triết Học Núi Rừng',
    description: 'Bạn tìm thấy vẻ đẹp trong sự yên tĩnh và thích chiêm nghiệm, ghi chép những khoảnh khắc đặc biệt.',
    characteristics: [
      'Thích sự yên tĩnh và chiêm nghiệm',
      'Có khả năng quan sát tinh tế',
      'Thích ghi chép và viết lách',
      'Tìm kiếm ý nghĩa sâu sắc trong trải nghiệm'
    ],
    preferredActivities: ['thiền định', 'viết nhật ký', 'vẽ tranh', 'quan sát thiên nhiên'],
    icon: '👁️',
    color: 'blue',
    gradient: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'storyteller',
    name: 'Người Kể Chuyện',
    title: 'Người Gìn Giữ Ký Ức',
    description: 'Bạn có khả năng kết nối với mọi người và thích chia sẻ, lưu giữ những câu chuyện đẹp.',
    characteristics: [
      'Thích giao tiếp và kết nối với người khác',
      'Có khả năng kể chuyện hấp dẫn',
      'Quan tâm đến văn hóa và truyền thống',
      'Thích chia sẻ kinh nghiệm với cộng đồng'
    ],
    preferredActivities: ['phỏng vấn người dân', 'ghi âm câu chuyện', 'chia sẻ trải nghiệm', 'tổ chức sự kiện'],
    icon: '📖',
    color: 'purple',
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    id: 'creator',
    name: 'Người Sáng Tạo',
    title: 'Nghệ Sĩ Thiên Nhiên',
    description: 'Bạn nhìn thế giới qua con mắt nghệ thuật và thích tạo ra những tác phẩm đẹp từ trải nghiệm.',
    characteristics: [
      'Có con mắt nghệ thuật tinh tế',
      'Thích sáng tạo và thể hiện bản thân',
      'Quan tâm đến thẩm mỹ và hình ảnh',
      'Thích chia sẻ tác phẩm với mọi người'
    ],
    preferredActivities: ['chụp ảnh', 'quay video', 'tạo nội dung', 'thiết kế'],
    icon: '🎨',
    color: 'orange',
    gradient: 'from-orange-500 to-red-600'
  }
];