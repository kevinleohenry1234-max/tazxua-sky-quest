import React, { useState, useEffect } from 'react';
import { UserArchetype, Journey } from '../../types/narrativeAdventure';
import { SAMPLE_JOURNEYS } from '../../data/narrativeAdventureData';

interface JourneySuggestionProps {
  archetype: UserArchetype;
  onSelectJourney: (journey: Journey) => void;
  onGoBack: () => void;
}

const JourneySuggestion: React.FC<JourneySuggestionProps> = ({ 
  archetype, 
  onSelectJourney, 
  onGoBack 
}) => {
  const [selectedJourney, setSelectedJourney] = useState<Journey | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Filter journeys based on archetype
  const suggestedJourneys = SAMPLE_JOURNEYS.filter(
    journey => journey.archetype === archetype.id
  );

  // Add some general journeys that work for all archetypes
  const generalJourneys = SAMPLE_JOURNEYS.filter(
    journey => journey.difficulty === 'easy' && journey.archetype !== archetype.id
  ).slice(0, 2);

  const allSuggestedJourneys = [...suggestedJourneys, ...generalJourneys];

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleJourneySelect = (journey: Journey) => {
    setSelectedJourney(journey);
    setTimeout(() => {
      onSelectJourney(journey);
    }, 300);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Dễ dàng';
      case 'medium': return 'Trung bình';
      case 'hard': return 'Thử thách';
      default: return 'Không xác định';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-8 transition-all duration-500 ${
          isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
        }`}>
          <button
            onClick={onGoBack}
            className="absolute left-4 top-4 p-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="mb-6">
            <div className={`inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r ${archetype.gradient} text-white mb-4`}>
              <span className="text-2xl mr-3">{archetype.icon}</span>
              <div className="text-left">
                <h2 className="font-bold text-lg">{archetype.name}</h2>
                <p className="text-sm opacity-90">{archetype.title}</p>
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Hành trình dành cho bạn
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dựa trên tính cách của bạn, chúng tôi đã chọn ra những hành trình phù hợp nhất. 
            Hãy chọn một hành trình để bắt đầu cuộc phiêu lưu tại Tà Xùa!
          </p>
        </div>

        {/* Journey Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {allSuggestedJourneys.map((journey, index) => (
            <div
              key={journey.id}
              className={`transition-all duration-500 ${
                isAnimating 
                  ? 'opacity-0 transform translate-y-8' 
                  : 'opacity-100 transform translate-y-0'
              } ${selectedJourney?.id === journey.id ? 'scale-105' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                   onClick={() => handleJourneySelect(journey)}>
                
                {/* Journey Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={journey.imageUrl} 
                    alt={journey.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Difficulty Badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(journey.difficulty)}`}>
                    {getDifficultyText(journey.difficulty)}
                  </div>

                  {/* Recommended Badge for archetype matches */}
                  {journey.archetype === archetype.id && (
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-yellow-400 text-yellow-900 text-xs font-medium">
                      ⭐ Được đề xuất
                    </div>
                  )}
                </div>

                {/* Journey Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors duration-200">
                    {journey.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {journey.subtitle}
                  </p>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                    {journey.description}
                  </p>

                  {/* Journey Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {journey.estimatedDuration}h
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {journey.chapters.length} chặng
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {journey.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-medium rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-200 group-hover:scale-105 active:scale-95">
                    Bắt đầu hành trình
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Journey Map Preview */}
        {selectedJourney && (
          <div className={`fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 transition-opacity duration-300`}>
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">{selectedJourney.title}</h3>
                  <button
                    onClick={() => setSelectedJourney(null)}
                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Story Intro */}
                <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                  <p className="text-gray-700 italic leading-relaxed">
                    "{selectedJourney.storyIntro}"
                  </p>
                </div>

                {/* Journey Chapters Preview */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Các chặng hành trình:</h4>
                  <div className="space-y-3">
                    {selectedJourney.chapters.map((chapter, index) => (
                      <div key={chapter.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-800">{chapter.title}</h5>
                          <p className="text-sm text-gray-600">{chapter.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rewards Preview */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Phần thưởng:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedJourney.rewards.map((reward, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                        <span className="text-2xl">{reward.icon}</span>
                        <div>
                          <h6 className="font-medium text-gray-800">{reward.name}</h6>
                          <p className="text-xs text-gray-600">{reward.emotionalValue}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Final CTA */}
                <button
                  onClick={() => handleJourneySelect(selectedJourney)}
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold text-lg rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  Bắt đầu "{selectedJourney.title}"
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-4">
            Bạn có thể thay đổi hành trình bất cứ lúc nào trong quá trình trải nghiệm
          </p>
          <button
            onClick={onGoBack}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            ← Làm lại bài khảo sát
          </button>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-20 right-20 w-64 h-64 bg-green-200 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-200 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200 rounded-full opacity-5 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
    </div>
  );
};

export default JourneySuggestion;