import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { RankCelebrationModalProps } from '@/types/ranking';
import { RANK_THEMES, getRankByLevel } from '@/data/rankingData';
import RankBadge from './RankBadge';

const RankCelebrationModal: React.FC<RankCelebrationModalProps> = ({
  celebration,
  isOpen,
  onClose,
  onExploreRewards
}) => {
  const [showContent, setShowContent] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const newRankData = getRankByLevel(celebration.newRank);
  const theme = RANK_THEMES[celebration.newRank];

  useEffect(() => {
    if (isOpen) {
      // Delay content animation
      const contentTimer = setTimeout(() => setShowContent(true), 300);
      // Start confetti animation
      const confettiTimer = setTimeout(() => setShowConfetti(true), 500);
      
      return () => {
        clearTimeout(contentTimer);
        clearTimeout(confettiTimer);
      };
    } else {
      setShowContent(false);
      setShowConfetti(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div 
        className={cn(
          'relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden',
          'transform transition-all duration-500',
          showContent ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        )}
      >
        {/* Background Gradient */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`
          }}
        />

        {/* Confetti Animation */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full animate-bounce"
                style={{
                  backgroundColor: i % 2 === 0 ? theme.primary : '#FFD700',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Content */}
        <div className="relative p-8 text-center space-y-6">
          {/* Celebration Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <RankBadge 
                rank={newRankData}
                size="xl"
                showAnimation={true}
                showTooltip={false}
              />
              
              {/* Glow Ring */}
              <div 
                className="absolute inset-0 rounded-full animate-ping"
                style={{
                  background: `radial-gradient(circle, ${theme.primary}40 0%, transparent 70%)`,
                  transform: 'scale(1.5)'
                }}
              />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">
              🎉 Chúc mừng!
            </h2>
            <p className="text-lg font-semibold" style={{ color: theme.textColor }}>
              Bạn đã thăng hạng lên {newRankData.name}!
            </p>
          </div>

          {/* Message */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700 leading-relaxed">
              {celebration.celebrationData.message}
            </p>
          </div>

          {/* Rewards Preview */}
          {celebration.unlockedRewards.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">
                🎁 Phần thưởng mới được mở khóa:
              </h3>
              <div className="space-y-2">
                {celebration.unlockedRewards.slice(0, 3).map((reward, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between bg-white rounded-lg p-3 border"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{reward.icon}</span>
                      <span className="font-medium text-gray-900">
                        {reward.name}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {reward.description}
                    </span>
                  </div>
                ))}
                
                {celebration.unlockedRewards.length > 3 && (
                  <p className="text-sm text-gray-500">
                    +{celebration.unlockedRewards.length - 3} phần thưởng khác
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Đóng
            </button>
            <button
              onClick={() => {
                onExploreRewards();
                onClose();
              }}
              className="flex-1 px-4 py-2 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg"
              style={{
                backgroundColor: theme.primary,
            boxShadow: `0 4px 12px ${theme.primary}40`
              }}
            >
              Khám phá quyền lợi
            </button>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-colors"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default RankCelebrationModal;