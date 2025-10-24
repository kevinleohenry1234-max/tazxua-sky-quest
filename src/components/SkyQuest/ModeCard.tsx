import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Trophy, Cloud, Zap } from 'lucide-react';

interface ModeCardProps {
  mode: 'calm' | 'energetic';
  isSelected: boolean;
  onSelect: (mode: 'calm' | 'energetic') => void;
  isLoading?: boolean;
}

const ModeCard: React.FC<ModeCardProps> = ({ mode, isSelected, onSelect, isLoading = false }) => {
  const modeConfig = {
    calm: {
      title: 'Mây Mây Sương Sương',
      description: 'Hành trình cảm xúc – nơi du khách kết nối lại với thiên nhiên bằng sự tĩnh lặng và thả mình trong làn sương.',
      icon: Cloud,
      buttonText: 'Bắt đầu hành trình bình yên',
      buttonIcon: ArrowRight,
      backgroundImage: '/images/website background/Tà Xùa 10.png',
      backgroundAlt: 'Sương núi Tà Xùa buổi sớm',
      // Cinematic colors for calm mode - mist and cool tones
      gradientOverlay: 'from-slate-900/30 via-blue-900/20 to-emerald-900/25',
      cinematicLight: 'from-blue-200/20 via-slate-100/10 to-transparent',
      iconGradient: 'from-blue-400 to-emerald-500',
      borderGlow: 'shadow-blue-500/25',
      buttonGradient: 'from-blue-500/80 via-emerald-500/80 to-blue-500/80',
      buttonHover: 'from-blue-400/90 via-emerald-400/90 to-blue-400/90',
      modeLight: 'bg-gradient-to-br from-blue-100/30 via-white/20 to-emerald-100/30'
    },
    energetic: {
      title: 'Hăng Say Săn Thưởng',
      description: 'Hành trình chinh phục – nơi người tham gia vừa khám phá vừa hành động vì môi trường, ghi dấu những đóng góp thật.',
      icon: Zap,
      buttonText: 'Bắt đầu hành trình năng động',
      buttonIcon: Trophy,
      backgroundImage: '/images/website background/Tà Xùa 6.png',
      backgroundAlt: 'Trekking rừng Tà Xùa, nắng xuyên qua tán lá',
      // Cinematic colors for energetic mode - warm sunrise tones
      gradientOverlay: 'from-amber-900/30 via-orange-800/20 to-emerald-900/25',
      cinematicLight: 'from-amber-200/25 via-yellow-100/15 to-transparent',
      iconGradient: 'from-amber-400 to-orange-500',
      borderGlow: 'shadow-amber-500/25',
      buttonGradient: 'from-amber-500/80 via-orange-500/80 to-emerald-500/80',
      buttonHover: 'from-amber-400/90 via-orange-400/90 to-emerald-400/90',
      modeLight: 'bg-gradient-to-br from-amber-100/30 via-yellow-100/20 to-orange-100/30'
    }
  };

  const config = modeConfig[mode];
  const IconComponent = config.icon;
  const ButtonIcon = config.buttonIcon;

  return (
    <div 
      className={`group relative overflow-hidden rounded-2xl transition-all duration-700 cursor-pointer transform hover:-translate-y-2 hover:scale-[1.01] ${
        isSelected ? `ring-2 ring-white/40 ${config.borderGlow} shadow-2xl` : 'shadow-xl hover:shadow-2xl'
      }`}
      style={{ height: '520px' }}
      onClick={() => onSelect(mode)}
    >
      {/* Cinematic Background with enhanced depth */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={config.backgroundImage} 
          alt={config.backgroundAlt} 
          className="w-full h-full object-cover scale-110 group-hover:scale-105 transition-transform duration-1000" 
          style={{ 
            filter: 'brightness(0.8) contrast(1.1) saturate(1.3)',
          }}
        />
        
        {/* Cinematic gradient overlays */}
        <div className={`absolute inset-0 bg-gradient-to-b ${config.gradientOverlay}`} />
        
        {/* Cinematic lighting effect */}
        <div className={`absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br ${config.cinematicLight} opacity-60`} />
        
        {/* Mode-specific atmospheric lighting */}
        <div className={`absolute inset-0 ${config.modeLight} opacity-40 group-hover:opacity-60 transition-opacity duration-500`} />
      </div>
      
      {/* Floating light particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-70">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/60 rounded-full animate-float-particle-1" />
        <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-white/40 rounded-full animate-float-particle-2" />
        <div className="absolute bottom-1/2 left-1/2 w-1.5 h-1.5 bg-white/50 rounded-full animate-float-particle-3" />
      </div>
      
      {/* Vertical Layout Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Image Section - 70% height */}
        <div className="flex-1 flex items-center justify-center p-8" style={{ height: '70%' }}>
          {/* Floating Icon with cinematic glow */}
          <div className="relative">
            {/* Icon glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${config.iconGradient} rounded-full blur-xl opacity-50 scale-150 group-hover:opacity-70 group-hover:scale-175 transition-all duration-500`} />
            
            {/* Main icon */}
            <div className={`relative w-20 h-20 bg-gradient-to-br ${config.iconGradient} rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-2xl border border-white/30 backdrop-blur-sm`}>
              <IconComponent className="w-10 h-10 text-white drop-shadow-lg" />
            </div>
            
            {/* Shimmer effect on icon */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-shimmer" />
          </div>
        </div>

        {/* Content Section - 30% height */}
        <div className="bg-white/10 backdrop-blur-md border-t border-white/20 p-6" style={{ height: '30%' }}>
          {/* Title */}
          <h3 className="font-['Manrope'] text-2xl font-bold text-white mb-3 text-center tracking-tight drop-shadow-lg">
            {config.title}
          </h3>

          {/* Description */}
          <p className="font-['Inter'] text-white/90 text-center mb-4 leading-relaxed text-sm drop-shadow-md line-clamp-2">
            {config.description}
          </p>

          {/* CTA Button with cinematic styling */}
          <Button 
            className={`group/btn relative w-full bg-gradient-to-r ${config.buttonGradient} hover:${config.buttonHover} text-white font-semibold py-3 rounded-full text-sm transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl border border-white/20 backdrop-blur-sm overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={isLoading}
          >
            {/* Button glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${config.iconGradient} opacity-0 group-hover/btn:opacity-30 transition-opacity duration-500 blur-sm`} />
            
            <span className="relative flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  Đang khởi tạo...
                </>
              ) : (
                <>
                  {config.buttonText}
                  <ButtonIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </span>
            
            {/* Button shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-shimmer-fast" />
          </Button>
        </div>
      </div>

      {/* Cinematic border glow */}
      <div className={`absolute inset-0 rounded-2xl border border-white/30 group-hover:border-white/50 transition-colors duration-500 pointer-events-none`} />
      
      {/* Hover state enhancement */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
    </div>
  );
};

export default ModeCard;