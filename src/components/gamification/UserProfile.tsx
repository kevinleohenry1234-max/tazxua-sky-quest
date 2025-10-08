import React from 'react';
import { useGamification } from '../../hooks/useGamification';
import { Trophy, Star, Gift, Award, TrendingUp, Calendar } from 'lucide-react';

const UserProfile: React.FC = () => {
  const { userProfile, getProgressToNextLevel, pointHistory } = useGamification();
  const progressToNext = getProgressToNextLevel();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl">
              {userProfile.currentLevel.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{userProfile.username}</h1>
              <p className="text-xl opacity-90">{userProfile.currentLevel.title}</p>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-lg font-semibold">{userProfile.currentLevel.name}</span>
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: userProfile.currentLevel.color }}
                />
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{userProfile.totalPoints.toLocaleString()}</div>
            <div className="text-lg opacity-90">Điểm tích lũy</div>
          </div>
        </div>

        {/* Progress Bar */}
        {userProfile.nextLevel && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm opacity-90">Tiến độ lên cấp tiếp theo</span>
              <span className="text-sm font-semibold">
                {progressToNext.pointsNeeded} điểm nữa để lên {userProfile.nextLevel.name}
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div 
                className="bg-white rounded-full h-3 transition-all duration-500"
                style={{ width: `${progressToNext.percentage}%` }}
              />
            </div>
            <div className="text-xs opacity-75 mt-1">
              {progressToNext.currentLevelPoints} / {progressToNext.nextLevelPoints} điểm
            </div>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Huy hiệu</p>
              <p className="text-2xl font-bold text-gray-900">{userProfile.badges.length}</p>
            </div>
            <Award className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Voucher</p>
              <p className="text-2xl font-bold text-gray-900">
                {userProfile.vouchers.filter(v => !v.isUsed).length}
              </p>
            </div>
            <Gift className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Chuỗi ngày</p>
              <p className="text-2xl font-bold text-gray-900">{userProfile.streak}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Tham gia từ</p>
              <p className="text-sm font-bold text-gray-900">
                {userProfile.joinDate.toLocaleDateString('vi-VN')}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Level Benefits */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Star className="w-6 h-6 text-yellow-500 mr-2" />
          Quyền lợi cấp độ hiện tại
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userProfile.currentLevel.benefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-gray-700">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Badge Collection */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
          Bộ sưu tập huy hiệu ({userProfile.badges.length})
        </h3>
        {userProfile.badges.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {userProfile.badges.map((badge, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="text-4xl mb-2">{badge.icon}</div>
                <h4 className="font-semibold text-gray-900 text-sm">{badge.name}</h4>
                <p className="text-xs text-gray-600 mt-1">{badge.description}</p>
                {badge.earnedAt && (
                  <p className="text-xs text-green-600 mt-2">
                    {badge.earnedAt.toLocaleDateString('vi-VN')}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Trophy className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p>Chưa có huy hiệu nào. Hãy tham gia các thử thách để nhận huy hiệu đầu tiên!</p>
          </div>
        )}
      </div>

      {/* Voucher Wallet */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Gift className="w-6 h-6 text-green-500 mr-2" />
          Ví voucher ({userProfile.vouchers.filter(v => !v.isUsed).length} chưa sử dụng)
        </h3>
        {userProfile.vouchers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userProfile.vouchers.map((voucher, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg border-2 ${
                  voucher.isUsed 
                    ? 'border-gray-200 bg-gray-50 opacity-60' 
                    : 'border-green-200 bg-green-50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">{voucher.title}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    voucher.isUsed 
                      ? 'bg-gray-200 text-gray-600' 
                      : 'bg-green-200 text-green-800'
                  }`}>
                    {voucher.isUsed ? 'Đã sử dụng' : 'Có thể sử dụng'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{voucher.description}</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Mã: {voucher.code}</span>
                  <span>HSD: {voucher.expiresAt.toLocaleDateString('vi-VN')}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Gift className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p>Chưa có voucher nào. Hãy tích điểm để đổi voucher hấp dẫn!</p>
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Hoạt động gần đây</h3>
        {pointHistory.length > 0 ? (
          <div className="space-y-3">
            {pointHistory.slice(0, 5).map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    transaction.type === 'earn' ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <div>
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-xs text-gray-500">
                      {transaction.timestamp.toLocaleDateString('vi-VN')} {transaction.timestamp.toLocaleTimeString('vi-VN')}
                    </p>
                  </div>
                </div>
                <span className={`font-bold ${
                  transaction.type === 'earn' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'earn' ? '+' : '-'}{transaction.points} điểm
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">Chưa có hoạt động nào</p>
        )}
      </div>

      {/* Referral Code */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Mã giới thiệu của bạn</h3>
        <p className="mb-4 opacity-90">Chia sẻ mã này với bạn bè để cùng nhận điểm thưởng!</p>
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 rounded-lg px-4 py-2 font-mono text-xl font-bold">
            {userProfile.referralCode}
          </div>
          <button 
            className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            onClick={() => {
              navigator.clipboard.writeText(userProfile.referralCode);
              alert('Đã sao chép mã giới thiệu!');
            }}
          >
            Sao chép
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;