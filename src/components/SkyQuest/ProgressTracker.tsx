import React, { useState } from 'react';
import { Award, Info } from 'lucide-react';

interface TierInfo {
  name: string;
  minPoints: number;
  maxPoints: number | null;
  color: string;
  bgColor: string;
  benefits: string[];
}

const ProgressTracker: React.FC = () => {
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);
  const [isLoggedIn] = useState(true); // This would come from auth context
  const [userPoints] = useState(2450); // This would come from user data

  const tiers: TierInfo[] = [
    {
      name: 'Bronze',
      minPoints: 0,
      maxPoints: 500,
      color: 'from-amber-500 to-orange-500',
      bgColor: 'from-amber-50 to-orange-100',
      benefits: [
        'Giảm giá booking 5%',
        'Huy hiệu Bronze',
        'Báo cáo tác động cơ bản'
      ]
    },
    {
      name: 'Silver',
      minPoints: 500,
      maxPoints: 1500,
      color: 'from-slate-400 to-gray-500',
      bgColor: 'from-slate-50 to-gray-100',
      benefits: [
        'Giảm giá booking 10%',
        'Ưu tiên đặt tour',
        'Huy hiệu Silver',
        'Báo cáo tác động chi tiết'
      ]
    },
    {
      name: 'Gold',
      minPoints: 1500,
      maxPoints: 3000,
      color: 'from-yellow-500 to-amber-500',
      bgColor: 'from-yellow-50 to-amber-100',
      benefits: [
        'Giảm giá booking 20%',
        'Ưu tiên đặt tour cao',
        'Huy hiệu Gold',
        'Quà tặng độc quyền',
        'Báo cáo tác động premium'
      ]
    },
    {
      name: 'Platinum',
      minPoints: 3000,
      maxPoints: null,
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'from-purple-50 to-indigo-100',
      benefits: [
        'Giảm giá booking 25%',
        'Ưu tiên tuyệt đối',
        'Huy hiệu Platinum',
        'Quà tặng VIP',
        'Tư vấn hành trình riêng',
        'Báo cáo tác động đầy đủ'
      ]
    }
  ];

  const getCurrentTier = () => {
    return tiers.find(tier => 
      userPoints >= tier.minPoints && 
      (tier.maxPoints === null || userPoints < tier.maxPoints)
    ) || tiers[0];
  };

  const getNextTier = () => {
    const currentTier = getCurrentTier();
    const currentIndex = tiers.findIndex(tier => tier.name === currentTier.name);
    return currentIndex < tiers.length - 1 ? tiers[currentIndex + 1] : null;
  };

  const getProgressPercentage = () => {
    const currentTier = getCurrentTier();
    const nextTier = getNextTier();
    
    if (!nextTier) return 100; // Already at max tier
    
    const tierRange = nextTier.minPoints - currentTier.minPoints;
    const userProgress = userPoints - currentTier.minPoints;
    return Math.min((userProgress / tierRange) * 100, 100);
  };

  const currentTier = getCurrentTier();
  const nextTier = getNextTier();
  const progressPercentage = getProgressPercentage();

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4 md:mb-6 animate-fadeInUp">
            Hệ Thống Cấp Độ
          </h2>
          <p className="text-lg md:text-xl text-slate-600 animate-fadeInUp animation-delay-200">
            Tiến bộ qua từng cấp độ và mở khóa những quyền lợi đặc biệt
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Progress Bar Container */}
          <div className="relative mb-8 md:mb-12">
            {/* Background Track */}
            <div className="h-4 md:h-6 bg-slate-200 rounded-full overflow-hidden">
              {/* Progress Fill */}
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 transition-all duration-1000 ease-out"
                style={{ width: `${(userPoints / 3000) * 100}%` }}
              />
            </div>

            {/* Tier Markers */}
            <div className="absolute -top-2 md:-top-3 left-0 right-0 flex justify-between">
              {tiers.map((tier, index) => {
                const position = tier.minPoints === 0 ? 0 : (tier.minPoints / 3000) * 100;
                const isActive = userPoints >= tier.minPoints;
                const isCurrent = tier.name === currentTier.name;
                
                return (
                  <div
                    key={tier.name}
                    className="relative"
                    style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
                    onMouseEnter={() => setHoveredTier(tier.name)}
                    onMouseLeave={() => setHoveredTier(null)}
                  >
                    {/* Tier Icon */}
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                      isActive 
                        ? `bg-gradient-to-r ${tier.color} shadow-lg scale-110` 
                        : 'bg-slate-300'
                    } ${isCurrent ? 'ring-4 ring-white ring-opacity-50' : ''}`}>
                      <Award className={`w-4 h-4 md:w-5 md:h-5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    </div>

                    {/* Tier Label */}
                    <div className="absolute top-12 md:top-14 left-1/2 transform -translate-x-1/2 text-center">
                      <div className={`text-xs md:text-sm font-bold ${isActive ? 'text-slate-800' : 'text-slate-500'}`}>
                        {tier.name}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {tier.minPoints}{tier.maxPoints ? `–${tier.maxPoints}` : '+'} điểm
                      </div>
                    </div>

                    {/* Tooltip */}
                    {hoveredTier === tier.name && (
                      <div className="absolute bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2 z-10">
                        <div className="bg-white rounded-xl shadow-2xl p-4 md:p-6 border border-slate-200 min-w-64">
                          <div className="flex items-center gap-2 mb-3">
                            <div className={`w-6 h-6 bg-gradient-to-r ${tier.color} rounded-full flex items-center justify-center`}>
                              <Award className="w-3 h-3 text-white" />
                            </div>
                            <h4 className="font-bold text-slate-800">{tier.name} Benefits</h4>
                          </div>
                          <ul className="space-y-1 text-sm text-slate-600">
                            {tier.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                        {/* Arrow */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Current Status */}
          {isLoggedIn && (
            <div className="text-center bg-white rounded-2xl md:rounded-3xl shadow-lg p-6 md:p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className={`w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r ${currentTier.color} rounded-full flex items-center justify-center`}>
                  <Award className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-800">
                  Bạn đang ở cấp {currentTier.name}
                </h3>
              </div>
              
              <p className="text-lg md:text-xl text-slate-600 mb-4">
                {userPoints.toLocaleString()} điểm
              </p>

              {nextTier && (
                <div className="bg-slate-50 rounded-xl p-4 md:p-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Info className="w-4 h-4 text-slate-500" />
                    <span className="text-sm md:text-base text-slate-600">
                      Còn <span className="font-bold text-emerald-600">
                        {(nextTier.minPoints - userPoints).toLocaleString()} điểm
                      </span> để lên cấp {nextTier.name}
                    </span>
                  </div>
                  
                  {/* Mini Progress Bar */}
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-3">
                    <div 
                      className="h-2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full transition-all duration-1000"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
              )}

              {!nextTier && (
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 md:p-6">
                  <p className="text-purple-800 font-semibold">
                    🎉 Chúc mừng! Bạn đã đạt cấp độ cao nhất!
                  </p>
                </div>
              )}
            </div>
          )}

          {!isLoggedIn && (
            <div className="text-center bg-white rounded-2xl md:rounded-3xl shadow-lg p-6 md:p-8">
              <p className="text-lg md:text-xl text-slate-600 mb-4">
                Đăng nhập để theo dõi tiến trình cấp độ của bạn
              </p>
              <button className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold rounded-xl md:rounded-2xl hover:from-emerald-500 hover:to-blue-500 transition-all duration-300 hover:scale-105">
                Đăng nhập ngay
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProgressTracker;