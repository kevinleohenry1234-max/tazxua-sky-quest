import React, { useState } from 'react';
import { Clock, MapPin, Heart, Camera, BookOpen, ChevronRight, Star } from 'lucide-react';
import { Journey, EmotionalFootprint } from '../types/journey';

interface JourneyTimelineProps {
  journeys: Journey[];
  onJourneyClick: (journey: Journey) => void;
}

const JourneyTimeline: React.FC<JourneyTimelineProps> = ({ journeys, onJourneyClick }) => {
  const [selectedJourney, setSelectedJourney] = useState<Journey | null>(null);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Dễ': return 'text-green-600 bg-green-100';
      case 'Trung bình': return 'text-yellow-600 bg-yellow-100';
      case 'Khó': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'not_started': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Hoàn thành';
      case 'in_progress': return 'Đang thực hiện';
      case 'not_started': return 'Chưa bắt đầu';
      default: return 'Không xác định';
    }
  };

  const getEmotionEmoji = (emotion: string) => {
    switch (emotion) {
      case 'thư giãn': return '😌';
      case 'xúc động': return '🥺';
      case 'bất ngờ': return '😲';
      case 'hào hứng': return '🤩';
      case 'bình yên': return '😇';
      case 'tự hào': return '😊';
      default: return '😊';
    }
  };

  const renderEmotionalFootprint = (footprints: EmotionalFootprint[]) => {
    if (footprints.length === 0) return null;

    const emotionCounts = footprints.reduce((acc, fp) => {
      acc[fp.emotion] = (acc[fp.emotion] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topEmotions = Object.entries(emotionCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3);

    return (
      <div className="flex items-center gap-2 mt-2">
        <Heart className="w-4 h-4 text-pink-500" />
        <span className="text-sm text-gray-600">Dấu ấn cảm xúc:</span>
        <div className="flex gap-1">
          {topEmotions.map(([emotion, count]) => (
            <span key={emotion} className="text-sm bg-pink-50 text-pink-700 px-2 py-1 rounded-full">
              {getEmotionEmoji(emotion)} {emotion} ({count})
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Hành trình của bạn</h2>
        <p className="text-gray-600">Timeline kể chuyện về những trải nghiệm đáng nhớ tại Tà Xùa</p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-green-200 to-purple-200"></div>

        {journeys.map((journey, index) => (
          <div key={journey.id} className="relative flex items-start mb-8">
            {/* Timeline dot */}
            <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 border-white shadow-lg ${
              journey.status === 'completed' ? 'bg-green-500' :
              journey.status === 'in_progress' ? 'bg-blue-500' : 'bg-gray-400'
            }`}>
              {journey.status === 'completed' ? (
                <Star className="w-6 h-6 text-white" />
              ) : journey.status === 'in_progress' ? (
                <Clock className="w-6 h-6 text-white" />
              ) : (
                <MapPin className="w-6 h-6 text-white" />
              )}
            </div>

            {/* Journey card */}
            <div className="ml-6 flex-1">
              <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                   onClick={() => onJourneyClick(journey)}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{journey.title}</h3>
                    <p className="text-gray-600 mb-3">{journey.description}</p>
                    
                    <div className="flex items-center gap-4 mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(journey.difficulty)}`}>
                        {journey.difficulty}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(journey.status)}`}>
                        {getStatusText(journey.status)}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Tiến trình</span>
                        <span className="text-sm font-medium text-gray-900">{journey.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${journey.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Emotional footprint */}
                    {renderEmotionalFootprint(journey.totalEmotionalFootprints)}

                    {/* Timestamps */}
                    <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                      {journey.startedAt && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>Bắt đầu: {journey.startedAt.toLocaleDateString('vi-VN')}</span>
                        </div>
                      )}
                      {journey.completedAt && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          <span>Hoàn thành: {journey.completedAt.toLocaleDateString('vi-VN')}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="ml-4 flex flex-col items-center">
                    <img 
                      src={journey.coverImage} 
                      alt={journey.title}
                      className="w-24 h-24 object-cover rounded-xl mb-3"
                    />
                    <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      journey.status === 'completed' ? 'bg-green-100 text-green-700 hover:bg-green-200' :
                      journey.status === 'in_progress' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' :
                      'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}>
                      {journey.status === 'completed' ? 'Xem lại' :
                       journey.status === 'in_progress' ? 'Tiếp tục' : 'Bắt đầu'}
                      <ChevronRight className="w-4 h-4 inline ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {journeys.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-500 mb-2">Chưa có hành trình nào</h3>
          <p className="text-gray-400">Hãy bắt đầu hành trình khám phá Tà Xùa đầu tiên của bạn!</p>
        </div>
      )}
    </div>
  );
};

export default JourneyTimeline;