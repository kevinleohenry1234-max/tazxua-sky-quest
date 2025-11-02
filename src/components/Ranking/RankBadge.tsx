import React from 'react';
import { cn } from '@/lib/utils';
import { RankBadgeProps } from '@/types/ranking';
import { getRankByLevel, RANK_THEMES } from '@/data/rankingData';

const RankBadge: React.FC<RankBadgeProps> = ({
  rank,
  size = 'md',
  showAnimation = true,
  showTooltip = true,
  className
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-24 h-24 text-xl'
  };

  const iconSizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-4xl'
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    bounce: 'animate-bounce',
    spin: 'animate-spin'
  };

  const theme = RANK_THEMES[rank.level];

  return (
    <div className="relative group">
      {/* Badge Container */}
      <div
        className={cn(
          'relative flex items-center justify-center rounded-full border-2 shadow-lg transition-all duration-300',
          `bg-gradient-to-br ${rank.badge.gradient}`,
          'border-white/20 hover:border-white/40',
          sizeClasses[size],
          showAnimation && rank.badge.animation && animationClasses[rank.badge.animation as keyof typeof animationClasses],
          'hover:scale-110 hover:shadow-xl',
          className
        )}
        style={{
          boxShadow: `0 4px 20px ${rank.badge.color}40`
        }}
      >
        {/* Badge Icon */}
        <span 
          className={cn(
            'select-none',
            iconSizes[size]
          )}
          role="img"
          aria-label={rank.name}
        >
          {rank.badge.icon}
        </span>

        {/* Glow Effect */}
        {showAnimation && (
          <div 
            className="absolute inset-0 rounded-full opacity-30 animate-ping"
            style={{
              background: `radial-gradient(circle, ${rank.badge.color}40 0%, transparent 70%)`
            }}
          />
        )}
      </div>

      {/* Rank Level Indicator */}
      {size !== 'sm' && (
        <div 
          className="absolute -bottom-1 -right-1 px-1.5 py-0.5 bg-white rounded-full text-xs font-bold shadow-md border"
          style={{ 
            color: theme.textColor,
            borderColor: rank.badge.color 
          }}
        >
          {rank.level.charAt(0)}
        </div>
      )}

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
          <div className="font-semibold">{rank.name}</div>
          <div className="text-xs text-gray-300">{rank.description}</div>
          
          {/* Tooltip Arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
        </div>
      )}
    </div>
  );
};

export default RankBadge;