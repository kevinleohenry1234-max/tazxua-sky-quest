import React from 'react';
import { cn } from '@/lib/utils';
import { UserRankProgress } from '@/types/ranking';
import { RANK_THEMES, getRankByLevel } from '@/data/rankingData';
import RankBadge from './RankBadge';
import RankProgressBar from './RankProgressBar';

interface RankDashboardProps {
  userProgress: UserRankProgress;
  className?: string;
  compact?: boolean;
}

const RankDashboard: React.FC<RankDashboardProps> = ({
  userProgress,
  className,
  compact = false
}) => {
  const { currentRank, nextRank } = userProgress;
  const currentRankData = getRankByLevel(currentRank.level);
  const nextRankData = nextRank ? getRankByLevel(nextRank.level) : null;
  const theme = RANK_THEMES[currentRank.level];

  return (
    <div 
      className={cn(
        'rounded-xl border shadow-sm overflow-hidden',
        'bg-gradient-to-br from-white to-gray-50',
        compact ? 'p-4' : 'p-6',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <RankBadge 
            rank={currentRankData}
            size={compact ? 'md' : 'lg'}
            showAnimation={true}
            showTooltip={false}
          />
          <div>
            <h3 className="font-semibold text-gray-900">
              Cấp độ của bạn
            </h3>
            <p 
              className="text-sm font-medium"
              style={{ color: theme.textColor }}
            >
              {currentRankData.name}
            </p>
          </div>
        </div>

        {/* Points Display */}
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            {userProgress.currentPoints.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">
            SkyPoints
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="space-y-4">
        <RankProgressBar 
          userProgress={userProgress}
          showDetails={!compact}
          animated={true}
        />

        {/* Benefits Preview */}
        {!compact && currentRankData.benefits.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-700">
              Quyền lợi hiện tại:
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {currentRankData.benefits.slice(0, 3).map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-2 text-sm text-gray-600"
                >
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: theme.primary }}
                  />
                  <span>{benefit}</span>
                </div>
              ))}
              {currentRankData.benefits.length > 3 && (
                <div className="text-xs text-gray-500 ml-4">
                  +{currentRankData.benefits.length - 3} quyền lợi khác
                </div>
              )}
            </div>
          </div>
        )}

        {/* Next Rank Preview */}
        {nextRankData && !compact && (
          <div 
            className="rounded-lg p-3 border-2 border-dashed"
            style={{ borderColor: `${RANK_THEMES[nextRank!.level].primary}40` }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <RankBadge 
                  rank={nextRankData}
                  size="sm"
                  showAnimation={false}
                  showTooltip={false}
                />
                <span 
                  className="font-medium text-sm"
                  style={{ color: RANK_THEMES[nextRank!.level].textColor }}
                >
                  {nextRankData.name}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                Cấp tiếp theo
              </span>
            </div>
            
            {nextRankData.benefits.length > 0 && (
              <div className="space-y-1">
                <div className="text-xs font-medium text-gray-600">
                  Quyền lợi mới:
                </div>
                {nextRankData.benefits.slice(0, 2).map((benefit, index) => (
                  <div 
                    key={index}
                    className="flex items-center space-x-2 text-xs text-gray-500"
                  >
                    <div 
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: RANK_THEMES[nextRank!.level].primary }}
                    />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Max Level Achievement */}
        {!nextRank && !compact && (
          <div 
            className="text-center py-4 rounded-lg"
            style={{ 
              backgroundColor: `${theme.primary}10`,
              border: `1px solid ${theme.primary}30`
            }}
          >
            <div className="text-2xl mb-2">🏆</div>
            <div 
              className="font-semibold text-sm"
              style={{ color: theme.textColor }}
            >
              Bạn đã đạt cấp độ tối đa!
            </div>
            <div className="text-xs text-gray-600 mt-1">
              Tiếp tục tích điểm để duy trì vị trí trong bảng xếp hạng
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RankDashboard;