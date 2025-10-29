import React, { useState } from 'react';
import { User, TrendingUp, CheckCircle, Globe, Users, X, LogIn } from 'lucide-react';

interface UserStats {
  totalPoints: number;
  completedQuests: number;
  co2Saved: number;
  communityRank: number;
  currentTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
}

const CompactDashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would come from auth context

  // Mock user data - would come from API/context
  const userStats: UserStats = {
    totalPoints: 2450,
    completedQuests: 47,
    co2Saved: 127,
    communityRank: 23,
    currentTier: 'Gold'
  };

  const handleProgressClick = () => {
    if (isLoggedIn) {
      setIsModalOpen(true);
    } else {
      // Redirect to login or show login modal
      console.log('Redirect to login');
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Bronze': return 'from-amber-500 to-orange-500';
      case 'Silver': return 'from-slate-400 to-gray-500';
      case 'Gold': return 'from-yellow-500 to-amber-500';
      case 'Platinum': return 'from-purple-500 to-indigo-500';
      default: return 'from-slate-400 to-gray-500';
    }
  };

  return (
    <>
      {/* Compact Progress Block */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex justify-center">
          <button
            onClick={handleProgressClick}
            className="group flex items-center gap-3 md:gap-4 px-6 md:px-8 py-4 md:py-5 bg-white rounded-2xl md:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-slate-200"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div className="text-left">
              <h3 className="text-lg md:text-xl font-bold text-slate-800">
                {isLoggedIn ? 'Xem tiến trình của bạn' : 'Đăng nhập để theo dõi tiến trình'}
              </h3>
              {isLoggedIn && (
                <p className="text-sm md:text-base text-slate-600">
                  {userStats.totalPoints} điểm • {userStats.currentTier} Member
                </p>
              )}
            </div>
            {!isLoggedIn && (
              <LogIn className="w-5 h-5 md:w-6 md:h-6 text-slate-400 group-hover:text-emerald-500 transition-colors" />
            )}
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && isLoggedIn && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 md:p-8 border-b border-slate-200">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Dashboard Cá Nhân</h2>
                <p className="text-slate-600 mt-1">Hành trình Sky Quest của bạn</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8">
              {/* Current Tier Badge */}
              <div className="flex justify-center mb-6 md:mb-8">
                <div className={`px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r ${getTierColor(userStats.currentTier)} text-white rounded-full text-sm md:text-base font-bold`}>
                  {userStats.currentTier} Member
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <div className="text-center p-4 md:p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl md:rounded-2xl">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">
                    {userStats.totalPoints.toLocaleString()}
                  </div>
                  <div className="text-sm md:text-base text-slate-600">Tổng điểm</div>
                </div>

                <div className="text-center p-4 md:p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl md:rounded-2xl">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-emerald-600 mb-1">
                    {userStats.completedQuests}
                  </div>
                  <div className="text-sm md:text-base text-slate-600">Nhiệm vụ hoàn thành</div>
                </div>

                <div className="text-center p-4 md:p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl md:rounded-2xl">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Globe className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1">
                    {userStats.co2Saved}kg
                  </div>
                  <div className="text-sm md:text-base text-slate-600">CO2 tiết kiệm</div>
                </div>

                <div className="text-center p-4 md:p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl md:rounded-2xl">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Users className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-1">
                    #{userStats.communityRank}
                  </div>
                  <div className="text-sm md:text-base text-slate-600">Xếp hạng cộng đồng</div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 md:mt-8 text-center">
                <button className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold rounded-xl md:rounded-2xl hover:from-emerald-500 hover:to-blue-500 transition-all duration-300 hover:scale-105">
                  Xem chi tiết hành trình
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CompactDashboard;