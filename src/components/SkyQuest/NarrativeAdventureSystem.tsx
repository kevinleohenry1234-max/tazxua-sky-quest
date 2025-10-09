import React, { useState, useEffect } from 'react';
import OnboardingQuestionnaire from './OnboardingQuestionnaire';
import JourneySuggestion from './JourneySuggestion';
import JourneyExperience from './JourneyExperience';
import { UserArchetype, Journey, NarrativeUserProfile, DiaryEntry } from '../../types/narrativeAdventure';
import { SAMPLE_JOURNEYS } from '../../data/narrativeAdventureData';

interface NarrativeAdventureSystemProps {
  onClose: () => void;
}

type SystemState = 'onboarding' | 'journey_selection' | 'journey_experience' | 'journey_complete';

const NarrativeAdventureSystem: React.FC<NarrativeAdventureSystemProps> = ({ onClose }) => {
  const [currentState, setCurrentState] = useState<SystemState>('onboarding');
  const [userProfile, setUserProfile] = useState<Partial<NarrativeUserProfile>>({
    completedJourneys: [],
    personalDiary: [],
    souvenirCards: [],
    titles: [],
    onboardingCompleted: false
  });
  const [selectedArchetype, setSelectedArchetype] = useState<UserArchetype | null>(null);
  const [currentJourney, setCurrentJourney] = useState<Journey | null>(null);
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('narrativeUserProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setUserProfile(profile);
      
      if (profile.onboardingCompleted && profile.archetype) {
        setSelectedArchetype(profile.archetype);
        if (profile.currentJourney) {
          const journey = SAMPLE_JOURNEYS.find(j => j.id === profile.currentJourney);
          if (journey) {
            setCurrentJourney(journey);
            setCompletedChapters(profile.completedChapters || []);
            setCurrentState('journey_experience');
          } else {
            setCurrentState('journey_selection');
          }
        } else {
          setCurrentState('journey_selection');
        }
      }
    }
  }, []);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (userProfile.onboardingCompleted) {
      localStorage.setItem('narrativeUserProfile', JSON.stringify(userProfile));
    }
  }, [userProfile]);

  const handleOnboardingComplete = (archetype: UserArchetype, answers: Record<string, string>) => {
    const updatedProfile = {
      ...userProfile,
      archetype,
      onboardingCompleted: true,
      onboardingResponses: Object.entries(answers).map(([questionId, selectedOption]) => ({
        questionId,
        selectedOptions: [selectedOption],
        timestamp: new Date()
      }))
    };
    
    setUserProfile(updatedProfile);
    setSelectedArchetype(archetype);
    setCurrentState('journey_selection');
  };

  const handleOnboardingSkip = () => {
    // Use a default archetype if user skips
    const defaultArchetype = {
      id: 'observer',
      name: 'Người Quan Sát',
      title: 'Nhà Triết Học Núi Rừng',
      description: 'Bạn tìm thấy vẻ đẹp trong sự yên tĩnh và thích chiêm nghiệm.',
      characteristics: ['Thích sự yên tĩnh', 'Quan sát tinh tế'],
      preferredActivities: ['thiền định', 'viết nhật ký'],
      icon: '👁️',
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-600'
    };
    
    handleOnboardingComplete(defaultArchetype, {});
  };

  const handleJourneySelect = (journey: Journey) => {
    const updatedProfile = {
      ...userProfile,
      currentJourney: journey.id
    };
    
    setUserProfile(updatedProfile);
    setCurrentJourney(journey);
    setCompletedChapters([]);
    setCurrentState('journey_experience');
  };

  const handleChapterComplete = (chapterId: string, diaryEntry?: string) => {
    const newCompletedChapters = [...completedChapters, chapterId];
    setCompletedChapters(newCompletedChapters);

    // Add diary entry if provided
    if (diaryEntry && currentJourney) {
      const newDiaryEntry: DiaryEntry = {
        id: `diary_${Date.now()}`,
        chapterId,
        text: diaryEntry,
        timestamp: new Date(),
        location: 'Tà Xùa',
        weather: 'Sunny', // Could be dynamic
        mood: 'Fulfilled'
      };

      const updatedProfile = {
        ...userProfile,
        personalDiary: [...(userProfile.personalDiary || []), newDiaryEntry],
        completedChapters: newCompletedChapters
      };
      
      setUserProfile(updatedProfile);
    }

    // Check if journey is complete
    if (currentJourney && newCompletedChapters.length === currentJourney.chapters.length) {
      setTimeout(() => handleJourneyComplete(), 1000);
    }
  };

  const handleJourneyComplete = () => {
    if (!currentJourney) return;

    const updatedProfile = {
      ...userProfile,
      completedJourneys: [...(userProfile.completedJourneys || []), currentJourney.id],
      currentJourney: undefined,
      completedChapters: []
    };

    // Add journey rewards
    const newTitles = currentJourney.rewards
      .filter(reward => reward.type === 'title')
      .map(reward => reward.value);
    
    if (newTitles.length > 0) {
      updatedProfile.titles = [...(userProfile.titles || []), ...newTitles];
    }

    setUserProfile(updatedProfile);
    setCurrentState('journey_complete');
  };

  const handleBackToJourneySelection = () => {
    setCurrentJourney(null);
    setCompletedChapters([]);
    setCurrentState('journey_selection');
  };

  const handleBackToOnboarding = () => {
    setCurrentState('onboarding');
  };

  const handleStartNewJourney = () => {
    setCurrentState('journey_selection');
  };

  const renderCurrentState = () => {
    switch (currentState) {
      case 'onboarding':
        return (
          <OnboardingQuestionnaire
            onComplete={handleOnboardingComplete}
            onSkip={handleOnboardingSkip}
          />
        );

      case 'journey_selection':
        return selectedArchetype ? (
          <JourneySuggestion
            archetype={selectedArchetype}
            onSelectJourney={handleJourneySelect}
            onGoBack={handleBackToOnboarding}
          />
        ) : null;

      case 'journey_experience':
        return currentJourney ? (
          <JourneyExperience
            journey={currentJourney}
            onChapterComplete={handleChapterComplete}
            onJourneyComplete={handleJourneyComplete}
            onGoBack={handleBackToJourneySelection}
            completedChapters={completedChapters}
          />
        ) : null;

      case 'journey_complete':
        return (
          <JourneyCompleteScreen
            journey={currentJourney}
            onStartNewJourney={handleStartNewJourney}
            onClose={onClose}
            userProfile={userProfile}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-50 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
      >
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {renderCurrentState()}
    </div>
  );
};

// Journey Complete Screen Component
interface JourneyCompleteScreenProps {
  journey: Journey | null;
  onStartNewJourney: () => void;
  onClose: () => void;
  userProfile: Partial<NarrativeUserProfile>;
}

const JourneyCompleteScreen: React.FC<JourneyCompleteScreenProps> = ({
  journey,
  onStartNewJourney,
  onClose,
  userProfile
}) => {
  if (!journey) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Celebration Animation */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce">🎉</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Chúc mừng!
          </h1>
          <p className="text-xl text-gray-600">
            Bạn đã hoàn thành "{journey.title}"
          </p>
        </div>

        {/* Journey Summary */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4">
              ✓
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{journey.title}</h2>
            <p className="text-gray-600 italic">"{journey.storyOutro}"</p>
          </div>

          {/* Rewards */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-4 text-center">Phần thưởng của bạn</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {journey.rewards.map((reward, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                  <span className="text-3xl">{reward.icon}</span>
                  <div>
                    <h4 className="font-medium text-gray-800">{reward.name}</h4>
                    <p className="text-sm text-gray-600">{reward.emotionalValue}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center py-4 border-t border-gray-200">
            <div>
              <div className="text-2xl font-bold text-green-600">{journey.chapters.length}</div>
              <div className="text-sm text-gray-600">Chặng hoàn thành</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{userProfile.personalDiary?.length || 0}</div>
              <div className="text-sm text-gray-600">Nhật ký</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{userProfile.completedJourneys?.length || 0}</div>
              <div className="text-sm text-gray-600">Hành trình</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onStartNewJourney}
            className="flex-1 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Bắt đầu hành trình mới
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-4 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
          >
            Quay về Sky Quest
          </button>
        </div>

        {/* Background Decoration */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-20 right-20 w-24 h-24 bg-green-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-blue-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default NarrativeAdventureSystem;