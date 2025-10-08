import React, { useState, useEffect } from 'react';
import { Heart, Star, Trophy, Zap, Target, Award, Sparkles, PartyPopper } from 'lucide-react';

interface EmotionalFeedbackProps {
  type: 'achievement' | 'progress' | 'encouragement' | 'celebration';
  title: string;
  message: string;
  points?: number;
  level?: number;
  badge?: string;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

const EmotionalFeedback: React.FC<EmotionalFeedbackProps> = ({
  type,
  title,
  message,
  points,
  level,
  badge,
  onClose,
  autoClose = true,
  duration = 4000
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Hiển thị animation
    setTimeout(() => setIsVisible(true), 100);

    // Tự động đóng
    if (autoClose) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300);
  };

  const getTypeConfig = () => {
    switch (type) {
      case 'achievement':
        return {
          icon: Trophy,
          gradient: 'from-yellow-400 via-orange-500 to-red-500',
          bgColor: 'from-yellow-50 to-orange-50',
          textColor: 'text-orange-800',
          particles: '🎉✨🏆⭐',
          animation: 'animate-bounce'
        };
      case 'progress':
        return {
          icon: Target,
          gradient: 'from-blue-400 via-purple-500 to-pink-500',
          bgColor: 'from-blue-50 to-purple-50',
          textColor: 'text-purple-800',
          particles: '🚀💫⚡🎯',
          animation: 'animate-pulse'
        };
      case 'encouragement':
        return {
          icon: Heart,
          gradient: 'from-pink-400 via-red-500 to-rose-500',
          bgColor: 'from-pink-50 to-rose-50',
          textColor: 'text-rose-800',
          particles: '💪❤️🌟💖',
          animation: 'animate-pulse'
        };
      case 'celebration':
        return {
          icon: PartyPopper,
          gradient: 'from-green-400 via-blue-500 to-purple-500',
          bgColor: 'from-green-50 to-blue-50',
          textColor: 'text-green-800',
          particles: '🎊🎉🥳🌈',
          animation: 'animate-bounce'
        };
      default:
        return {
          icon: Star,
          gradient: 'from-blue-400 to-purple-500',
          bgColor: 'from-blue-50 to-purple-50',
          textColor: 'text-blue-800',
          particles: '⭐✨🌟💫',
          animation: 'animate-pulse'
        };
    }
  };

  const config = getTypeConfig();
  const IconComponent = config.icon;

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isClosing ? 'opacity-0' : 'opacity-30'
        }`}
        onClick={handleClose}
      />

      {/* Main Content */}
      <div 
        className={`relative bg-white rounded-3xl shadow-2xl max-w-md w-full transform transition-all duration-300 ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
          {config.particles.split('').map((particle, index) => (
            <div
              key={index}
              className={`absolute text-2xl animate-float-${index % 4}`}
              style={{
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 80 + 10}%`,
                animationDelay: `${index * 0.2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              {particle}
            </div>
          ))}
        </div>

        {/* Header */}
        <div className={`bg-gradient-to-r ${config.gradient} p-6 rounded-t-3xl text-center relative overflow-hidden`}>
          <div className={`inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 ${config.animation}`}>
            <IconComponent className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
          
          {/* Points Display */}
          {points && (
            <div className="flex items-center justify-center gap-2 text-white/90">
              <Star className="w-5 h-5" />
              <span className="text-lg font-semibold">+{points} điểm</span>
            </div>
          )}

          {/* Level Display */}
          {level && (
            <div className="flex items-center justify-center gap-2 text-white/90 mt-2">
              <Trophy className="w-5 h-5" />
              <span className="text-lg font-semibold">Cấp {level}</span>
            </div>
          )}

          {/* Badge Display */}
          {badge && (
            <div className="flex items-center justify-center gap-2 text-white/90 mt-2">
              <Award className="w-5 h-5" />
              <span className="text-lg font-semibold">{badge}</span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className={`bg-gradient-to-br ${config.bgColor} p-6 rounded-b-3xl`}>
          <p className={`text-center ${config.textColor} text-lg leading-relaxed mb-6`}>
            {message}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="flex-1 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Đóng
            </button>
            <button
              onClick={handleClose}
              className={`flex-1 px-6 py-3 bg-gradient-to-r ${config.gradient} text-white rounded-xl font-medium hover:opacity-90 transition-opacity`}
            >
              Tuyệt vời!
            </button>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  );
};

// Floating animation keyframes (cần thêm vào CSS)
const floatingStyles = `
  @keyframes float-0 {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
  @keyframes float-1 {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(-180deg); }
  }
  @keyframes float-2 {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-25px) rotate(90deg); }
  }
  @keyframes float-3 {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-18px) rotate(-90deg); }
  }
  .animate-float-0 { animation: float-0 2s ease-in-out infinite; }
  .animate-float-1 { animation: float-1 2.5s ease-in-out infinite; }
  .animate-float-2 { animation: float-2 3s ease-in-out infinite; }
  .animate-float-3 { animation: float-3 2.2s ease-in-out infinite; }
`;

export default EmotionalFeedback;
export { floatingStyles };