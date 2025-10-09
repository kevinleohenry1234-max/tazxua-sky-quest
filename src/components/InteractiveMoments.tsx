import React, { useState } from 'react';
import { Play, Sparkles, Award, TrendingUp, Star, Calendar, RotateCcw } from 'lucide-react';
import { InteractiveMoment } from '../types/journey';

interface InteractiveMomentsProps {
  moments: InteractiveMoment[];
  onReplayMoment: (momentId: string) => void;
}

const InteractiveMoments: React.FC<InteractiveMomentsProps> = ({ moments, onReplayMoment }) => {
  const [selectedMoment, setSelectedMoment] = useState<InteractiveMoment | null>(null);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'level_up': return TrendingUp;
      case 'badge': return Award;
      case 'points': return Star;
      case 'challenge_complete': return Sparkles;
      default: return Star;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'level_up': return 'from-green-400 to-emerald-500';
      case 'badge': return 'from-yellow-400 to-orange-500';
      case 'points': return 'from-blue-400 to-indigo-500';
      case 'challenge_complete': return 'from-purple-400 to-pink-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getEventTitle = (type: string) => {
    switch (type) {
      case 'level_up': return 'Lên cấp độ';
      case 'badge': return 'Nhận huy hiệu';
      case 'points': return 'Nhận điểm';
      case 'challenge_complete': return 'Hoàn thành thử thách';
      default: return 'Sự kiện';
    }
  };

  const sortedMoments = [...moments].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Khoảnh khắc tương tác</h3>
            <p className="text-gray-600 text-sm">Những phản hồi đáng nhớ từ hành trình của bạn</p>
          </div>
        </div>
        <div className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
          {moments.length} khoảnh khắc
        </div>
      </div>

      {/* Moments List */}
      <div className="space-y-4">
        {sortedMoments.map((moment) => {
        const Icon = getEventIcon(moment.type);
        return (
          <div
            key={moment.id}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer group"
            onClick={() => setSelectedMoment(moment)}
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${getEventColor(moment.type)} shadow-lg group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-gray-900">{getEventTitle(moment.type)}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{moment.timestamp.toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-3">{moment.description}</p>
                
                {moment.value && (
                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <div className="text-sm text-gray-600">
                      {moment.type === 'level_up' && (
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span>Cấp độ mới: {moment.value}</span>
                        </div>
                      )}
                      {moment.type === 'badge' && (
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-yellow-500" />
                          <span>Huy hiệu: {moment.value}</span>
                        </div>
                      )}
                      {moment.type === 'points' && (
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-blue-500" />
                          <span>+{moment.value} điểm</span>
                        </div>
                      )}
                      {moment.type === 'challenge_complete' && (
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-purple-500" />
                          <span>Thử thách: {moment.value}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {moment.animation && (
                      <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                        {moment.animation === 'fireworks' ? '🎆 Pháo hoa' :
                         moment.animation === 'badge_spin' ? '🏆 Xoay huy hiệu' :
                         moment.animation === 'level_glow' ? '✨ Phát sáng' :
                         moment.animation === 'points_burst' ? '💥 Nổ điểm' :
                         moment.animation === 'streak_fire' ? '🔥 Lửa streak' : 'Hiệu ứng'}
                      </span>
                    )}
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onReplayMoment(moment.id);
                    }}
                    className="flex items-center gap-2 px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium"
                  >
                    <Play className="w-4 h-4" />
                    Phát lại
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      </div>

      {/* Empty State */}
      {moments.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-500 mb-2">Chưa có khoảnh khắc nào</h3>
          <p className="text-gray-400">Tham gia các hoạt động để tạo ra những khoảnh khắc đáng nhớ!</p>
        </div>
      )}

      {/* Moment Detail Modal */}
      {selectedMoment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <div className="text-center">
              <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-gradient-to-br ${getEventColor(selectedMoment.type)} shadow-lg`}>
                {React.createElement(getEventIcon(selectedMoment.type), { className: "w-10 h-10 text-white" })}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedMoment.title}
              </h3>
              
              <p className="text-gray-600 mb-4 leading-relaxed">{selectedMoment.description}</p>
              
              {selectedMoment.value && (
                <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
                  <h4 className="font-medium text-gray-900 mb-2">Chi tiết:</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>Giá trị: {selectedMoment.value}</div>
                    <div>Thời gian: {selectedMoment.timestamp.toLocaleString('vi-VN')}</div>
                    <div>Hiệu ứng: {selectedMoment.animation}</div>
                  </div>
                </div>
              )}
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    onReplayMoment(selectedMoment.id);
                    setSelectedMoment(null);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors font-medium"
                >
                  <RotateCcw className="w-5 h-5" />
                  Phát lại hiệu ứng
                </button>
                <button
                  onClick={() => setSelectedMoment(null)}
                  className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors font-medium"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveMoments;