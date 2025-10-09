// Storytelling Engine for Narrative Adventure System
// Provides dynamic story elements, chapter guidance, and automatic diary generation

import React, { useState, useEffect } from 'react';
import { Journey, JourneyChapter, DiaryEntry, UserArchetype } from '../../types/narrativeAdventure';
import { STORYTELLING_ENHANCEMENTS, DIARY_ENTRY_TEMPLATES } from '../../data/narrativeAdventureData';

interface StorytellingEngineProps {
  journey: Journey;
  currentChapter: JourneyChapter;
  userArchetype: UserArchetype;
  onDiaryEntryGenerated: (entry: DiaryEntry) => void;
  onStoryProgression: (nextChapter: number) => void;
}

interface StoryState {
  currentNarrative: string;
  guidanceText: string;
  emotionalTone: 'inspiring' | 'contemplative' | 'adventurous' | 'peaceful';
  showTransition: boolean;
}

export const StorytellingEngine: React.FC<StorytellingEngineProps> = ({
  journey,
  currentChapter,
  userArchetype,
  onDiaryEntryGenerated,
  onStoryProgression
}) => {
  const [storyState, setStoryState] = useState<StoryState>({
    currentNarrative: '',
    guidanceText: '',
    emotionalTone: 'inspiring',
    showTransition: false
  });

  const [isNarrativeVisible, setIsNarrativeVisible] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  // Generate chapter introduction based on archetype and chapter content
  useEffect(() => {
    const enhancement = STORYTELLING_ENHANCEMENTS[journey.archetype];
    if (enhancement && enhancement.chapterIntros[currentChapter.id]) {
      const narrative = enhancement.chapterIntros[currentChapter.id];
      const guidance = generateGuidanceText(currentChapter, userArchetype);
      
      setStoryState({
        currentNarrative: narrative,
        guidanceText: guidance,
        emotionalTone: getEmotionalTone(userArchetype),
        showTransition: true
      });
    }
  }, [currentChapter, userArchetype, journey.archetype]);

  // Typewriter effect for narrative text
  useEffect(() => {
    if (storyState.currentNarrative && isNarrativeVisible) {
      const timer = setTimeout(() => {
        if (currentTextIndex < storyState.currentNarrative.length) {
          setCurrentTextIndex(prev => prev + 1);
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [currentTextIndex, storyState.currentNarrative, isNarrativeVisible]);

  const generateGuidanceText = (chapter: JourneyChapter, archetype: UserArchetype): string => {
    const guidanceTemplates = {
      protector: [
        "Hãy quan sát kỹ môi trường xung quanh và tìm cách bảo vệ nó.",
        "Suy nghĩ về những hành động nhỏ có thể tạo ra tác động lớn.",
        "Kết nối với cộng đồng địa phương để hiểu thêm về thách thức môi trường."
      ],
      observer: [
        "Dành thời gian để thực sự quan sát và cảm nhận không gian này.",
        "Ghi chép lại những chi tiết nhỏ mà người khác có thể bỏ qua.",
        "Tìm kiếm ý nghĩa sâu sắc trong những trải nghiệm đơn giản."
      ],
      storyteller: [
        "Lắng nghe câu chuyện của người dân địa phương.",
        "Tìm hiểu lịch sử và truyền thống của nơi này.",
        "Suy nghĩ về cách chia sẻ trải nghiệm này với người khác."
      ],
      creator: [
        "Tìm góc nhìn độc đáo để ghi lại khoảnh khắc này.",
        "Sáng tạo cách thể hiện vẻ đẹp của nơi này.",
        "Nghĩ về cách biến trải nghiệm thành tác phẩm nghệ thuật."
      ]
    };

    const templates = guidanceTemplates[archetype.id as keyof typeof guidanceTemplates] || guidanceTemplates.observer;
    return templates[Math.floor(Math.random() * templates.length)];
  };

  const getEmotionalTone = (archetype: UserArchetype): StoryState['emotionalTone'] => {
    const toneMap = {
      protector: 'inspiring' as const,
      observer: 'contemplative' as const,
      storyteller: 'adventurous' as const,
      creator: 'peaceful' as const
    };
    return toneMap[archetype.id as keyof typeof toneMap] || 'inspiring';
  };

  const generateAutomaticDiaryEntry = (chapter: JourneyChapter, emotion: string): DiaryEntry => {
    const templates = DIARY_ENTRY_TEMPLATES[emotion] || DIARY_ENTRY_TEMPLATES.accomplished;
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    return {
      id: `auto_diary_${chapter.id}_${Date.now()}`,
      chapterId: chapter.id,
      text: template.replace('{chapter}', chapter.title).replace('{location}', 'Tà Xùa'),
      timestamp: new Date(),
      mood: emotion,
      location: 'Tà Xùa',
      weather: getCurrentWeather()
    };
  };

  const getCurrentWeather = (): string => {
    const weathers = ['Nắng ấm', 'Mây mù', 'Gió mát', 'Sương sớm', 'Trời trong'];
    return weathers[Math.floor(Math.random() * weathers.length)];
  };

  const handleChapterComplete = () => {
    // Generate automatic diary entry
    const diaryEntry = generateAutomaticDiaryEntry(currentChapter, 'accomplished');
    onDiaryEntryGenerated(diaryEntry);

    // Show transition effect
    setStoryState(prev => ({ ...prev, showTransition: true }));
    
    // Progress to next chapter after transition
    setTimeout(() => {
      onStoryProgression(currentChapter.order + 1);
      setStoryState(prev => ({ ...prev, showTransition: false }));
    }, 2000);
  };

  const startNarrative = () => {
    setIsNarrativeVisible(true);
    setCurrentTextIndex(0);
  };

  return (
    <div className="storytelling-engine">
      {/* Chapter Introduction */}
      <div className={`narrative-container ${storyState.emotionalTone} ${storyState.showTransition ? 'transition-active' : ''}`}>
        <div className="narrative-header">
          <h2 className="chapter-title">{currentChapter.title}</h2>
          <div className="archetype-indicator">
            <span className="archetype-icon">{userArchetype.icon}</span>
            <span className="archetype-name">{userArchetype.name}</span>
          </div>
        </div>

        {/* Story Narrative */}
        <div className="story-narrative">
          {!isNarrativeVisible ? (
            <button 
              onClick={startNarrative}
              className="start-story-btn"
            >
              <span>📖</span>
              Bắt đầu câu chuyện
            </button>
          ) : (
            <div className="narrative-text">
              <p className="typewriter-text">
                {storyState.currentNarrative.substring(0, currentTextIndex)}
                {currentTextIndex < storyState.currentNarrative.length && (
                  <span className="cursor">|</span>
                )}
              </p>
            </div>
          )}
        </div>

        {/* Guidance Section */}
        {isNarrativeVisible && currentTextIndex >= storyState.currentNarrative.length && (
          <div className="guidance-section">
            <div className="guidance-header">
              <span className="guidance-icon">🧭</span>
              <h3>Hướng dẫn cho {userArchetype.name}</h3>
            </div>
            <p className="guidance-text">{storyState.guidanceText}</p>
            
            <div className="chapter-actions">
              <button 
                onClick={handleChapterComplete}
                className="complete-chapter-btn"
              >
                Hoàn thành chặng này
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Transition Effects */}
      {storyState.showTransition && (
        <div className="chapter-transition">
          <div className="transition-content">
            <div className="transition-icon">✨</div>
            <p>Chuyển sang chặng tiếp theo...</p>
          </div>
        </div>
      )}

      <style>{`
        .storytelling-engine {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }

        .narrative-container {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-radius: 16px;
          padding: 30px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .narrative-container.inspiring {
          background: linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%);
        }

        .narrative-container.contemplative {
          background: linear-gradient(135deg, #dbeafe 0%, #3b82f6 100%);
        }

        .narrative-container.adventurous {
          background: linear-gradient(135deg, #fce7f3 0%, #ec4899 100%);
        }

        .narrative-container.peaceful {
          background: linear-gradient(135deg, #d1fae5 0%, #10b981 100%);
        }

        .narrative-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
        }

        .chapter-title {
          font-size: 2rem;
          font-weight: bold;
          color: #1f2937;
          margin: 0;
        }

        .archetype-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.9);
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 500;
        }

        .archetype-icon {
          font-size: 1.2rem;
        }

        .story-narrative {
          margin-bottom: 25px;
        }

        .start-story-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #4f46e5;
          color: white;
          border: none;
          padding: 15px 25px;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .start-story-btn:hover {
          background: #4338ca;
          transform: translateY(-2px);
        }

        .narrative-text {
          background: rgba(255, 255, 255, 0.9);
          padding: 25px;
          border-radius: 12px;
          border-left: 4px solid #4f46e5;
        }

        .typewriter-text {
          font-size: 1.1rem;
          line-height: 1.7;
          color: #374151;
          margin: 0;
        }

        .cursor {
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .guidance-section {
          background: rgba(255, 255, 255, 0.95);
          padding: 25px;
          border-radius: 12px;
          border: 2px dashed #d1d5db;
        }

        .guidance-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
        }

        .guidance-header h3 {
          margin: 0;
          color: #1f2937;
          font-size: 1.2rem;
        }

        .guidance-icon {
          font-size: 1.3rem;
        }

        .guidance-text {
          color: #6b7280;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .chapter-actions {
          display: flex;
          justify-content: center;
        }

        .complete-chapter-btn {
          background: #10b981;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .complete-chapter-btn:hover {
          background: #059669;
          transform: translateY(-1px);
        }

        .chapter-transition {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .transition-content {
          text-align: center;
          color: white;
        }

        .transition-icon {
          font-size: 4rem;
          margin-bottom: 20px;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .transition-active {
          transform: scale(0.95);
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
};

export default StorytellingEngine;