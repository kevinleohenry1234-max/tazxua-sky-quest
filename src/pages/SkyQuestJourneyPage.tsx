import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import NarrativeAdventureSystem from '../components/SkyQuest/NarrativeAdventureSystem';
import { NarrativeUserProfile, Journey, UserArchetype } from '../types/narrativeAdventure';
import { SAMPLE_JOURNEYS } from '../data/narrativeAdventureData';
import { 
  Mountain, 
  Leaf, 
  Play, 
  BookOpen, 
  Trophy, 
  Star,
  MapPin,
  Clock,
  Users,
  Sparkles,
  ChevronRight,
  Target
} from 'lucide-react';

const SkyQuestJourneyPage: React.FC = () => {
  const [showNarrativeSystem, setShowNarrativeSystem] = useState(false);
  const [userProfile, setUserProfile] = useState<Partial<NarrativeUserProfile> | null>(null);
  const [availableJourneys, setAvailableJourneys] = useState<Journey[]>([]);

  // Load user profile on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('narrativeUserProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setUserProfile(profile);
      
      // Filter journeys based on user's archetype
      if (profile.archetype) {
        const filteredJourneys = SAMPLE_JOURNEYS.filter(
          journey => journey.archetype === profile.archetype.id
        );
        setAvailableJourneys(filteredJourneys);
      }
    } else {
      // Show all journeys if no profile exists
      setAvailableJourneys(SAMPLE_JOURNEYS);
    }
  }, []);

  const handleStartNarrativeSystem = () => {
    setShowNarrativeSystem(true);
  };

  const handleCloseNarrativeSystem = () => {
    setShowNarrativeSystem(false);
    // Reload profile after closing
    const savedProfile = localStorage.getItem('narrativeUserProfile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
  };

  if (showNarrativeSystem) {
    return <NarrativeAdventureSystem onClose={handleCloseNarrativeSystem} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Main Website Navigation */}
      <Header />
      
      {/* Add padding for mobile bottom navigation */}
      <div className="pb-20 md:pb-0">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white py-20">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-[url('/images/website background/mountain-pattern.svg')] opacity-10" />
          
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <Mountain className="w-12 h-12 mr-4" />
              <h1 className="text-5xl font-bold">Hành Trình Tà Xùa</h1>
              <Leaf className="w-12 h-12 ml-4" />
            </div>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Khám phá Tà Xùa qua những hành trình kể chuyện đầy cảm xúc. 
              Mỗi bước chân của bạn sẽ viết nên câu chuyện riêng về núi rừng Tây Bắc.
            </p>
            
            {/* User Profile Summary */}
            {userProfile?.onboardingCompleted && userProfile.archetype && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto mb-8">
                <div className="flex items-center justify-center mb-4">
                  <span className="text-4xl mr-3">{userProfile.archetype.icon}</span>
                  <div className="text-left">
                    <h3 className="text-xl font-bold">{userProfile.archetype.title}</h3>
                    <p className="text-white/80">{userProfile.archetype.name}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">{userProfile.completedJourneys?.length || 0}</div>
                    <div className="text-sm text-white/80">Hành trình</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{userProfile.personalDiary?.length || 0}</div>
                    <div className="text-sm text-white/80">Nhật ký</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{userProfile.titles?.length || 0}</div>
                    <div className="text-sm text-white/80">Danh hiệu</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {!userProfile?.onboardingCompleted ? (
            // Onboarding CTA
            <div className="text-center mb-12">
              <div className="bg-white rounded-3xl shadow-xl p-12 max-w-3xl mx-auto">
                <div className="text-6xl mb-6">🌟</div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Chào mừng đến với Hành Trình Tà Xùa!
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Hãy bắt đầu với một cuộc trò chuyện ngắn để chúng tôi hiểu bạn hơn 
                  và gợi ý những hành trình phù hợp nhất với tính cách của bạn.
                </p>
                <button
                  onClick={handleStartNarrativeSystem}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-2xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                >
                  <Play className="w-6 h-6 mr-3" />
                  Bắt đầu hành trình
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          ) : (
            // Journey Dashboard
            <div className="space-y-8">
              {/* Current Journey */}
              {userProfile.currentJourney && (
                <div className="bg-white rounded-3xl shadow-xl p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                      <Target className="w-7 h-7 mr-3 text-green-600" />
                      Hành trình hiện tại
                    </h2>
                    <button
                      onClick={handleStartNarrativeSystem}
                      className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-200 hover:scale-105"
                    >
                      Tiếp tục
                    </button>
                  </div>
                  
                  {(() => {
                    const currentJourney = SAMPLE_JOURNEYS.find(j => j.id === userProfile.currentJourney);
                    if (!currentJourney) return null;
                    
                    const completedChapters = (userProfile.completedChapters as string[])?.length || 0;
                    const totalChapters = currentJourney.chapters.length;
                    const progress = (completedChapters / totalChapters) * 100;
                    
                    return (
                      <div className="flex items-center space-x-6">
                        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl">
                          🗺️
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-800 mb-2">{currentJourney.title}</h3>
                          <p className="text-gray-600 mb-3">{currentJourney.description}</p>
                          <div className="flex items-center space-x-4">
                            <div className="flex-1 bg-gray-200 rounded-full h-3">
                              <div 
                                className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                            <span className="text-sm font-semibold text-gray-600">
                              {completedChapters}/{totalChapters}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Available Journeys */}
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <BookOpen className="w-7 h-7 mr-3 text-blue-600" />
                  {userProfile.currentJourney ? 'Hành trình khác' : 'Hành trình dành cho bạn'}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableJourneys
                    .filter(journey => journey.id !== userProfile.currentJourney)
                    .map((journey) => {
                      const isCompleted = userProfile.completedJourneys?.includes(journey.id);
                      
                      return (
                        <div
                          key={journey.id}
                          className={`relative p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 cursor-pointer ${
                            isCompleted
                              ? 'bg-gradient-to-br from-green-50 to-blue-50 border-green-200'
                              : 'bg-gradient-to-br from-gray-50 to-white border-gray-200 hover:border-blue-300 hover:shadow-lg'
                          }`}
                          onClick={() => !userProfile.currentJourney && handleStartNarrativeSystem()}
                        >
                          {isCompleted && (
                            <div className="absolute top-4 right-4">
                              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                <Trophy className="w-5 h-5 text-white" />
                              </div>
                            </div>
                          )}
                          
                          <div className="text-center mb-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-3">
                              🌟
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">{journey.title}</h3>
                            <p className="text-sm text-gray-600 mb-4">{journey.description}</p>
                          </div>
                          
                          <div className="space-y-2 text-xs text-gray-500">
                            <div className="flex items-center justify-between">
                              <span className="flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                {journey.chapters.length} chặng
                              </span>
                              <span className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {journey.estimatedDuration}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="flex items-center">
                                <Star className="w-3 h-3 mr-1" />
                                {journey.difficulty}
                              </span>
                              <span className="flex items-center">
                                <Users className="w-3 h-3 mr-1" />
                                Cá nhân/Nhóm
                              </span>
                            </div>
                          </div>
                          
                          {!isCompleted && !userProfile.currentJourney && (
                            <div className="mt-4 text-center">
                              <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                                <Sparkles className="w-3 h-3 mr-1" />
                                Sẵn sàng khám phá
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
                
                {!userProfile.currentJourney && (
                  <div className="text-center mt-8">
                    <button
                      onClick={handleStartNarrativeSystem}
                      className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-2xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                    >
                      <Play className="w-6 h-6 mr-3" />
                      Chọn hành trình mới
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Background Decoration */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-40 left-1/3 w-40 h-40 bg-purple-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default SkyQuestJourneyPage;