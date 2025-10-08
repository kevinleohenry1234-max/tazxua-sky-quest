import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Trophy, 
  Gift, 
  Sparkles, 
  Heart, 
  Zap,
  Award,
  Crown,
  Flame,
  Target
} from 'lucide-react';

interface MicroInteractionProps {
  type: 'points' | 'level_up' | 'badge' | 'challenge_complete' | 'streak' | 'achievement';
  value?: number | string;
  title?: string;
  description?: string;
  onComplete?: () => void;
  trigger?: boolean;
}

interface FloatingElement {
  id: string;
  icon: React.ReactNode;
  text: string;
  color: string;
  x: number;
  y: number;
  delay: number;
}

const MicroInteractions: React.FC<MicroInteractionProps> = ({
  type,
  value,
  title,
  description,
  onComplete,
  trigger = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (trigger) {
      setIsVisible(true);
      generateFloatingElements();
      
      if (type === 'level_up' || type === 'achievement') {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }

      const timer = setTimeout(() => {
        setIsVisible(false);
        setFloatingElements([]);
        onComplete?.();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [trigger, type, onComplete]);

  const generateFloatingElements = () => {
    const elements: FloatingElement[] = [];
    const count = type === 'points' ? 5 : type === 'level_up' ? 12 : 8;
    
    for (let i = 0; i < count; i++) {
      elements.push({
        id: `element-${i}`,
        icon: getRandomIcon(),
        text: getRandomText(),
        color: getRandomColor(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 1000
      });
    }
    
    setFloatingElements(elements);
  };

  const getRandomIcon = () => {
    const icons = [<Star />, <Sparkles />, <Heart />, <Zap />, <Trophy />];
    return icons[Math.floor(Math.random() * icons.length)];
  };

  const getRandomText = () => {
    const texts = ['+', '✨', '🎉', '⭐', '💫', '🌟'];
    return texts[Math.floor(Math.random() * texts.length)];
  };

  const getRandomColor = () => {
    const colors = ['text-yellow-400', 'text-blue-400', 'text-green-400', 'text-purple-400', 'text-pink-400'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getMainIcon = () => {
    switch (type) {
      case 'points': return <Star className="w-16 h-16 text-yellow-400" />;
      case 'level_up': return <Crown className="w-16 h-16 text-purple-400" />;
      case 'badge': return <Award className="w-16 h-16 text-blue-400" />;
      case 'challenge_complete': return <Target className="w-16 h-16 text-green-400" />;
      case 'streak': return <Flame className="w-16 h-16 text-orange-400" />;
      case 'achievement': return <Trophy className="w-16 h-16 text-gold-400" />;
      default: return <Gift className="w-16 h-16 text-pink-400" />;
    }
  };

  const getMainColor = () => {
    switch (type) {
      case 'points': return 'from-yellow-400 to-orange-500';
      case 'level_up': return 'from-purple-400 to-pink-500';
      case 'badge': return 'from-blue-400 to-cyan-500';
      case 'challenge_complete': return 'from-green-400 to-emerald-500';
      case 'streak': return 'from-orange-400 to-red-500';
      case 'achievement': return 'from-yellow-400 to-yellow-600';
      default: return 'from-pink-400 to-purple-500';
    }
  };

  const getTitle = () => {
    if (title) return title;
    
    switch (type) {
      case 'points': return `+${value} điểm!`;
      case 'level_up': return `Lên cấp ${value}!`;
      case 'badge': return 'Huy hiệu mới!';
      case 'challenge_complete': return 'Hoàn thành thử thách!';
      case 'streak': return `Chuỗi ${value} ngày!`;
      case 'achievement': return 'Thành tựu mới!';
      default: return 'Chúc mừng!';
    }
  };

  const getDescription = () => {
    if (description) return description;
    
    switch (type) {
      case 'points': return 'Bạn vừa kiếm được điểm thưởng!';
      case 'level_up': return 'Chúc mừng bạn đã lên cấp độ mới!';
      case 'badge': return 'Bạn đã mở khóa huy hiệu mới!';
      case 'challenge_complete': return 'Xuất sắc! Bạn đã hoàn thành thử thách!';
      case 'streak': return 'Tuyệt vời! Bạn đang duy trì chuỗi hoạt động!';
      case 'achievement': return 'Bạn đã đạt được thành tựu đặc biệt!';
      default: return 'Tiếp tục phát huy!';
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Floating Elements */}
      {floatingElements.map((element) => (
        <div
          key={element.id}
          className={`absolute animate-ping ${element.color}`}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            animationDelay: `${element.delay}ms`,
            animationDuration: '2s'
          }}
        >
          <div className="w-6 h-6">
            {element.icon}
          </div>
        </div>
      ))}

      {/* Main Notification */}
      <div className="relative pointer-events-auto">
        <div className={`
          bg-gradient-to-r ${getMainColor()} 
          rounded-2xl p-8 text-white shadow-2xl 
          transform animate-bounce
          max-w-md mx-4 text-center
        `}>
          {/* Glow Effect */}
          <div className={`
            absolute inset-0 bg-gradient-to-r ${getMainColor()} 
            rounded-2xl blur-xl opacity-50 animate-pulse
          `} />
          
          <div className="relative z-10">
            {/* Main Icon */}
            <div className="flex justify-center mb-4 animate-spin-slow">
              {getMainIcon()}
            </div>
            
            {/* Title */}
            <h2 className="text-2xl font-bold mb-2 animate-pulse">
              {getTitle()}
            </h2>
            
            {/* Description */}
            <p className="text-white/90 mb-4">
              {getDescription()}
            </p>
            
            {/* Progress Bar Animation (for level up) */}
            {type === 'level_up' && (
              <div className="w-full bg-white/20 rounded-full h-2 mb-4 overflow-hidden">
                <div className="h-full bg-white rounded-full animate-progress-fill" />
              </div>
            )}
            
            {/* Sparkle Effects */}
            <div className="flex justify-center space-x-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Sparkles 
                  key={i}
                  className="w-4 h-4 animate-ping"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Ripple Effect */}
        <div className="absolute inset-0 rounded-2xl border-4 border-white/30 animate-ping" />
        <div className="absolute inset-0 rounded-2xl border-4 border-white/20 animate-ping animation-delay-200" />
      </div>

      {/* Success Message for specific types */}
      {(type === 'level_up' || type === 'achievement') && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
          <div className="bg-white rounded-lg px-6 py-3 shadow-lg animate-bounce">
            <p className="text-gray-800 font-medium flex items-center">
              <Heart className="w-5 h-5 text-red-500 mr-2" />
              Tiếp tục khám phá Tà Xùa nhé!
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes progress-fill {
          from { width: 0%; }
          to { width: 100%; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-progress-fill {
          animation: progress-fill 2s ease-out;
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
};

// Hook for triggering micro-interactions
export const useMicroInteractions = () => {
  const [activeInteraction, setActiveInteraction] = useState<{
    type: MicroInteractionProps['type'];
    value?: number | string;
    title?: string;
    description?: string;
  } | null>(null);

  const triggerInteraction = (
    type: MicroInteractionProps['type'],
    options?: {
      value?: number | string;
      title?: string;
      description?: string;
    }
  ) => {
    setActiveInteraction({
      type,
      ...options
    });
  };

  const clearInteraction = () => {
    setActiveInteraction(null);
  };

  return {
    activeInteraction,
    triggerInteraction,
    clearInteraction,
    MicroInteractionComponent: activeInteraction ? (
      <MicroInteractions
        type={activeInteraction.type}
        value={activeInteraction.value}
        title={activeInteraction.title}
        description={activeInteraction.description}
        trigger={true}
        onComplete={clearInteraction}
      />
    ) : null
  };
};

export default MicroInteractions;