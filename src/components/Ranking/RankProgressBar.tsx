import React from 'react';
import { cn } from '@/lib/utils';
import { RankProgressBarProps } from '@/types/ranking';
import { RANK_THEMES } from '@/data/rankingData';

const RankProgressBar: React.FC<RankProgressBarProps> = ({
  userProgress,
  showDetails = true,
  animated = true,
  className
}) => {
  const { currentRank, nextRank, progressToNext } = userProgress;
  const currentTheme = RANK_THEMES[currentRank.level];
  const nextTheme = nextRank ? RANK_THEMES[nextRank.level] : currentTheme;

  const pointsToNext = nextRank ? nextRank.minPoints - userProgress.totalPoints : 0;

  return (
    <div className={cn('w-full space-y-2', className)}>
      {/* Progress Labels */}
      {showDetails && (
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center space-x-2">
            <span 
              className="font-semibold"
              style={{ color: currentTheme.textColor }}
            >
              {currentRank.name}
            </span>
            <span className="text-gray-500">
              {userProgress.totalPoints.toLocaleString()} điểm
            </span>
          </div>
          
          {nextRank && (
            <div className="flex items-center space-x-2 text-right">
              <span className="text-gray-500">
                Còn {pointsToNext.toLocaleString()} điểm
              </span>
              <span 
                className="font-semibold"
                style={{ color: nextTheme.textColor }}
              >
                {nextRank.name}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Progress Bar Container */}
      <div className="relative">
        {/* Background Track */}
        <div 
          className="w-full h-3 rounded-full overflow-hidden"
          style={{ backgroundColor: `${currentTheme.primaryColor}20` }}
        >
          {/* Progress Fill */}
          <div
            className={cn(
              'h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden',
              animated && 'animate-pulse'
            )}
            style={{
              width: `${Math.min(progressToNext, 100)}%`,
              background: nextRank 
                ? `linear-gradient(90deg, ${currentTheme.primaryColor} 0%, ${nextTheme.primaryColor} 100%)`
                : currentTheme.primaryColor
            }}
          >
            {/* Shimmer Effect */}
            {animated && progressToNext > 0 && (
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"
                style={{
                  animation: 'shimmer 2s infinite'
                }}
              />
            )}
          </div>
        </div>

        {/* Progress Percentage Indicator */}
        {progressToNext > 10 && (
          <div 
            className="absolute top-1/2 transform -translate-y-1/2 text-xs font-bold text-white px-2"
            style={{ left: `${Math.min(progressToNext - 5, 90)}%` }}
          >
            {Math.round(progressToNext)}%
          </div>
        )}
      </div>

      {/* Milestone Markers */}
      {nextRank && (
        <div className="flex justify-between text-xs text-gray-400">
          <span>{currentRank.minPoints.toLocaleString()}</span>
          <span>{nextRank.minPoints.toLocaleString()}</span>
        </div>
      )}

      {/* Max Level Indicator */}
      {!nextRank && (
        <div className="text-center">
          <span 
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold"
            style={{ 
              backgroundColor: `${currentTheme.primaryColor}20`,
              color: currentTheme.textColor 
            }}
          >
            🏆 Cấp độ tối đa
          </span>
        </div>
      )}
    </div>
  );
};

// CSS for shimmer animation (add to global styles)
const shimmerKeyframes = `
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
`;

export default RankProgressBar;