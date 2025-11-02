import React from 'react';
import { Trophy, Star, Gift, TrendingUp, Award, Zap } from 'lucide-react';
import { DashboardData } from '../../types/xpEngine';
import { LEVELS } from '../../data/xpEngineConfig';

interface XPDashboardProps {
  dashboardData: DashboardData;
  loading?: boolean;
}

const XPDashboard: React.FC<XPDashboardProps> = ({ dashboardData, loading }) => {
  if (loading) {
    return (
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 animate-pulse">
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded-lg w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded-lg w-full"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const { user, currentLevel, nextLevel, progressPercentage, stats } = dashboardData;

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 shadow-lg border border-emerald-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Chào mừng trở lại, {user.username}!
          </h2>
          <p className="text-gray-600">
            Hành trình khám phá Tà Xùa của bạn
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md">
          <Award className="w-5 h-5 text-emerald-600" />
          <span className="font-semibold text-emerald-700">
            {currentLevel.name}
          </span>
        </div>
      </div>

      {/* XP Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span className="font-semibold text-gray-700">
              {user.totalXP.toLocaleString()} XP
            </span>
          </div>
          {nextLevel && (
            <span className="text-sm text-gray-500">
              {nextLevel.minXP - user.totalXP} XP để đạt {nextLevel.name}
            </span>
          )}
        </div>
        
        <div className="relative">
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000 ease-out relative"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
          
          {/* Level indicators */}
          <div className="flex justify-between mt-2">
            {LEVELS.map((level, index) => (
              <div 
                key={level.level}
                className={`flex flex-col items-center ${
                  user.currentLevel >= level.level 
                    ? 'text-emerald-600' 
                    : 'text-gray-400'
                }`}
              >
                <div className={`w-3 h-3 rounded-full border-2 ${
                  user.currentLevel >= level.level
                    ? 'bg-emerald-500 border-emerald-500'
                    : 'bg-gray-200 border-gray-300'
                }`}></div>
                <span className="text-xs mt-1 font-medium">
                  Lv.{level.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Tổng XP</p>
              <p className="text-2xl font-bold text-emerald-600">
                {stats.totalXP.toLocaleString()}
              </p>
            </div>
            <div className="bg-emerald-100 rounded-full p-3">
              <Star className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Nhiệm vụ hoàn thành</p>
              <p className="text-2xl font-bold text-blue-600">
                {stats.questsCompleted}
              </p>
            </div>
            <div className="bg-blue-100 rounded-full p-3">
              <Trophy className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Voucher nhận được</p>
              <p className="text-2xl font-bold text-purple-600">
                {stats.vouchersEarned}
              </p>
            </div>
            <div className="bg-purple-100 rounded-full p-3">
              <Gift className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Chuỗi ngày liên tiếp</p>
              <p className="text-2xl font-bold text-orange-600">
                {stats.currentStreak}
              </p>
            </div>
            <div className="bg-orange-100 rounded-full p-3">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Current Level Benefits */}
      <div className="mt-6 bg-white rounded-xl p-4 shadow-md border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
          <Award className="w-5 h-5 text-emerald-600 mr-2" />
          Đặc quyền cấp độ hiện tại
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {currentLevel.benefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="text-sm text-gray-700">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Next Level Preview */}
      {nextLevel && (
        <div className="mt-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-4 text-white">
          <h3 className="font-semibold mb-2 flex items-center">
            <Star className="w-5 h-5 mr-2" />
            Cấp độ tiếp theo: {nextLevel.name}
          </h3>
          <p className="text-sm opacity-90 mb-3">
            Còn {nextLevel.minXP - user.totalXP} XP nữa để mở khóa:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {nextLevel.benefits.slice(0, 4).map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default XPDashboard;