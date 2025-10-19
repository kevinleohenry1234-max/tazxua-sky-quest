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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-emerald-50 to-sky-50">
      {/* Main Website Navigation */}
      <Header />
      
      {/* Add padding for mobile bottom navigation */}
      <div className="pb-20 md:pb-0">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 text-white py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-black/10" />
          
          {/* Floating Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300/20 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} />
          <div className="absolute top-20 right-20 w-16 h-16 bg-pink-300/20 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }} />
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-purple-300/20 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }} />
          <div className="absolute bottom-10 right-1/3 w-24 h-24 bg-orange-300/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }} />
          
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mr-4 animate-pulse">
                <Mountain className="w-12 h-12 text-yellow-200" />
              </div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-200 via-white to-emerald-200 bg-clip-text text-transparent">
                Sky Quest
              </h1>
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 ml-4 animate-pulse" style={{ animationDelay: '1s' }}>
                <Sparkles className="w-12 h-12 text-pink-200" />
              </div>
            </div>
            
            <p className="text-2xl text-white/95 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
              Hành trình kỳ diệu nơi mỗi bước chân đều tạo nên điều kỳ diệu. 
              Khám phá Tà Xùa qua những thử thách đầy màu sắc và ý nghĩa.
            </p>
            
            {/* User Profile Summary */}
            {userProfile?.onboardingCompleted && userProfile.archetype && (
              <div className="bg-gradient-to-r from-white/15 to-white/10 backdrop-blur-md rounded-3xl p-8 max-w-3xl mx-auto mb-12 border border-white/20 shadow-2xl">
                <div className="flex items-center justify-center mb-6">
                  <div className="text-6xl mr-4 animate-bounce">{userProfile.archetype.icon}</div>
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-yellow-100">{userProfile.archetype.title}</h3>
                    <p className="text-white/90 text-lg">{userProfile.archetype.name}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                    <div className="text-3xl font-bold text-yellow-200">{userProfile.completedJourneys?.length || 0}</div>
                    <div className="text-sm text-white/80">Hành trình hoàn thành</div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                    <div className="text-3xl font-bold text-pink-200">{userProfile.personalDiary?.length || 0}</div>
                    <div className="text-sm text-white/80">Nhật ký kỷ niệm</div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                    <div className="text-3xl font-bold text-cyan-200">{userProfile.titles?.length || 0}</div>
                    <div className="text-sm text-white/80">Danh hiệu đạt được</div>
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
              <div className="bg-gradient-to-br from-white via-yellow-50 to-pink-50 rounded-3xl shadow-2xl p-12 max-w-4xl mx-auto border border-yellow-200/50">
                <div className="text-8xl mb-8 animate-bounce">🌟</div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-6">
                  Chào mừng đến với Sky Quest!
                </h2>
                <p className="text-xl text-slate-700 mb-10 leading-relaxed max-w-2xl mx-auto">
                  Hành trình kỳ diệu đang chờ bạn! Hãy cùng chúng tôi khám phá tính cách của bạn 
                  để tìm ra những thử thách phù hợp nhất.
                </p>
                <button
                  onClick={handleStartNarrativeSystem}
                  className="inline-flex items-center px-12 py-5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-bold rounded-3xl hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl text-lg"
                >
                  <Sparkles className="w-7 h-7 mr-3 animate-pulse" />
                  Bắt đầu cuộc phiêu lưu
                  <ChevronRight className="w-6 h-6 ml-3" />
                </button>
              </div>
            </div>
          ) : (
            // Journey Dashboard
            <div className="space-y-8">
              {/* Current Journey */}
              {userProfile.currentJourney && (
                <div className="bg-gradient-to-br from-white via-emerald-50 to-teal-50 rounded-3xl shadow-2xl p-8 border border-emerald-200">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent flex items-center">
                      <Target className="w-8 h-8 mr-4 text-emerald-500 animate-pulse" />
                      Hành trình hiện tại
                    </h2>
                    <button
                      onClick={handleStartNarrativeSystem}
                      className="px-8 py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-bold text-lg rounded-2xl hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 transition-all duration-300 hover:scale-110 hover:rotate-1 shadow-lg hover:shadow-emerald-300/50 group"
                    >
                      <span className="group-hover:animate-bounce">Tiếp tục</span>
                    </button>
                  </div>
                  
                  {(() => {
                    const currentJourney = SAMPLE_JOURNEYS.find(j => j.id === userProfile.currentJourney);
                    if (!currentJourney) return null;
                    
                    const completedChapters = (userProfile.completedChapters as string[])?.length || 0;
                    const totalChapters = currentJourney.chapters.length;
                    const progress = (completedChapters / totalChapters) * 100;
                    
                    return (
                      <div className="flex items-center space-x-8 bg-white/60 rounded-3xl p-6 backdrop-blur-sm">
                        <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 rounded-3xl flex items-center justify-center text-white text-3xl shadow-lg animate-pulse">
                          🗺️
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent mb-3">{currentJourney.title}</h3>
                          <p className="text-gray-700 mb-4 text-lg leading-relaxed">{currentJourney.description}</p>
                          <div className="flex items-center space-x-6">
                            <div className="flex-1 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full h-4 shadow-inner">
                              <div 
                                className="bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 h-4 rounded-full transition-all duration-700 shadow-lg animate-pulse"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                            <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
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
              <div className="bg-gradient-to-br from-white via-pink-50 to-purple-50 rounded-3xl shadow-2xl p-8 border border-pink-100">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-8 flex items-center">
                  <BookOpen className="w-8 h-8 mr-4 text-purple-500 animate-pulse" />
                  {userProfile.currentJourney ? 'Hành trình khác đang chờ bạn' : 'Hành trình dành riêng cho bạn'}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {availableJourneys
                    .filter(journey => journey.id !== userProfile.currentJourney)
                    .map((journey) => {
                      const isCompleted = userProfile.completedJourneys?.includes(journey.id);
                      
                      return (
                        <div
                          key={journey.id}
                          className={`relative p-8 rounded-3xl border-2 transition-all duration-500 hover:scale-110 hover:rotate-1 cursor-pointer group ${
                            isCompleted
                              ? 'bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100 border-emerald-300 shadow-emerald-200/50'
                              : 'bg-gradient-to-br from-white via-yellow-50 to-pink-50 border-pink-200 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-200/50'
                          } shadow-xl`}
                          onClick={() => !userProfile.currentJourney && handleStartNarrativeSystem()}
                        >
                          {isCompleted && (
                            <div className="absolute -top-2 -right-2 animate-bounce">
                              <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                                <Trophy className="w-6 h-6 text-white animate-pulse" />
                              </div>
                            </div>
                          )}
                          
                          <div className="text-center mb-6">
                            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 rounded-3xl flex items-center justify-center text-white text-3xl mx-auto mb-4 shadow-lg group-hover:animate-spin transition-all duration-500">
                              🌟
                            </div>
                            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 group-hover:scale-105 transition-transform">{journey.title}</h3>
                            <p className="text-sm text-gray-600 mb-6 leading-relaxed">{journey.description}</p>
                          </div>
                          
                          <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between bg-white/60 rounded-2xl p-3 backdrop-blur-sm">
                              <span className="flex items-center text-purple-700 font-medium">
                                <MapPin className="w-4 h-4 mr-2 text-pink-500" />
                                {journey.chapters.length} chặng
                              </span>
                              <span className="flex items-center text-purple-700 font-medium">
                                <Clock className="w-4 h-4 mr-2 text-orange-500" />
                                {journey.estimatedDuration}
                              </span>
                            </div>
                            <div className="flex items-center justify-between bg-white/60 rounded-2xl p-3 backdrop-blur-sm">
                              <span className="flex items-center text-purple-700 font-medium">
                                <Star className="w-4 h-4 mr-2 text-yellow-500" />
                                {journey.difficulty}
                              </span>
                              <span className="flex items-center text-purple-700 font-medium">
                                <Users className="w-4 h-4 mr-2 text-cyan-500" />
                                Cá nhân/Nhóm
                              </span>
                            </div>
                          </div>
                          
                          {!isCompleted && !userProfile.currentJourney && (
                            <div className="mt-6 text-center">
                              <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-500 text-white text-sm font-bold rounded-full shadow-lg animate-pulse">
                                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                                Sẵn sàng khám phá
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
                
                {!userProfile.currentJourney && (
                  <div className="text-center mt-12">
                    <button
                      onClick={handleStartNarrativeSystem}
                      className="inline-flex items-center px-12 py-6 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-bold text-lg rounded-3xl hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all duration-500 hover:scale-110 hover:rotate-1 active:scale-95 shadow-2xl hover:shadow-purple-300/50 group"
                    >
                      <Play className="w-7 h-7 mr-4 group-hover:animate-bounce" />
                      Chọn hành trình mới
                      <ChevronRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
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