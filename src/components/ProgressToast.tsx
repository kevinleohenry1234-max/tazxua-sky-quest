import React, { useState, useEffect } from 'react';
import { CheckCircle, Star, TrendingUp, Target, Zap, X } from 'lucide-react';

interface ProgressToastProps {
  type: 'success' | 'progress' | 'milestone' | 'streak';
  message: string;
  points?: number;
  progress?: number;
  maxProgress?: number;
  onClose: () => void;
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

const ProgressToast: React.FC<ProgressToastProps> = ({
  type,
  message,
  points,
  progress,
  maxProgress,
  onClose,
  duration = 3000,
  position = 'top-right'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Hiển thị animation
    setTimeout(() => setIsVisible(true), 100);

    // Tự động đóng
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300);
  };

  const getTypeConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: CheckCircle,
          gradient: 'from-green-500 to-emerald-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-800',
          iconColor: 'text-green-600'
        };
      case 'progress':
        return {
          icon: TrendingUp,
          gradient: 'from-blue-500 to-indigo-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-800',
          iconColor: 'text-blue-600'
        };
      case 'milestone':
        return {
          icon: Target,
          gradient: 'from-purple-500 to-pink-600',
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-200',
          textColor: 'text-purple-800',
          iconColor: 'text-purple-600'
        };
      case 'streak':
        return {
          icon: Zap,
          gradient: 'from-orange-500 to-red-600',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          textColor: 'text-orange-800',
          iconColor: 'text-orange-600'
        };
      default:
        return {
          icon: Star,
          gradient: 'from-blue-500 to-purple-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-800',
          iconColor: 'text-blue-600'
        };
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      default:
        return 'top-4 right-4';
    }
  };

  const getAnimationClasses = () => {
    const baseClasses = 'transform transition-all duration-300 ease-out';
    
    if (isClosing) {
      return `${baseClasses} translate-x-full opacity-0 scale-95`;
    }
    
    if (isVisible) {
      return `${baseClasses} translate-x-0 opacity-100 scale-100`;
    }
    
    return `${baseClasses} translate-x-full opacity-0 scale-95`;
  };

  const config = getTypeConfig();
  const IconComponent = config.icon;

  if (!isVisible && !isClosing) return null;

  return (
    <div className={`fixed ${getPositionClasses()} z-50 max-w-sm w-full`}>
      <div className={`${config.bgColor} ${config.borderColor} border rounded-xl shadow-lg p-4 ${getAnimationClasses()}`}>
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className={`flex-shrink-0 w-8 h-8 bg-gradient-to-r ${config.gradient} rounded-full flex items-center justify-center`}>
            <IconComponent className="w-4 h-4 text-white" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className={`${config.textColor} text-sm font-medium leading-relaxed`}>
              {message}
            </p>

            {/* Points */}
            {points && (
              <div className="flex items-center gap-1 mt-1">
                <Star className={`w-3 h-3 ${config.iconColor}`} />
                <span className={`text-xs font-semibold ${config.textColor}`}>
                  +{points} điểm
                </span>
              </div>
            )}

            {/* Progress Bar */}
            {progress !== undefined && maxProgress && (
              <div className="mt-2">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className={config.textColor}>Tiến độ</span>
                  <span className={config.textColor}>
                    {progress}/{maxProgress}
                  </span>
                </div>
                <div className="w-full bg-white rounded-full h-1.5">
                  <div 
                    className={`bg-gradient-to-r ${config.gradient} h-1.5 rounded-full transition-all duration-500`}
                    style={{ width: `${Math.min((progress / maxProgress) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className={`flex-shrink-0 w-6 h-6 ${config.iconColor} hover:bg-white/50 rounded-full flex items-center justify-center transition-colors`}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgressToast;