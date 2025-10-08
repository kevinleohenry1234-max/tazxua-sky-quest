import React, { useState, useEffect } from 'react';
import { 
  User, Star, Trophy, Target, Award, TrendingUp, Zap, 
  Settings, Edit3, Eye, EyeOff, Palette, Save, X,
  Gift, Users, Calendar, MapPin, Camera, Share2
} from 'lucide-react';
import { useGamification } from '../hooks/useGamification';
import useEmotionalFeedback from '../hooks/useEmotionalFeedback';
import EmotionalFeedback from '../components/EmotionalFeedback';
import ProgressToast from '../components/ProgressToast';
import MicroInteractions from '../components/gamification/MicroInteractions';
import SkyQuestNavigation from '../components/SkyQuestNavigation';

const UserProfilePage: React.FC = () => {
  const { 
    feedbacks, 
    toasts, 
    closeFeedback, 
    closeToast,
    showAchievement,
    showLevelUp,
    showProgress,
    showSuccess,
    showStreak,
    showEncouragement
  } = useEmotionalFeedback();

  const [microInteraction, setMicroInteraction] = useState<{
    type: 'points' | 'level_up' | 'badge' | 'challenge_complete' | 'streak' | 'achievement';
    options?: {
      value?: number | string;
      title?: string;
      description?: string;
    };
  } | null>(null);

  // Personalization states
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileSettings, setProfileSettings] = useState({
    displayName: 'Nguyễn Văn A',
    nickname: 'Thám hiểm gia Tà Xùa',
    avatar: '🏔️',
    isPublicProfile: true,
    showStats: true,
    showBadges: true,
    showActivity: true,
    theme: 'green' as 'green' | 'blue' | 'purple' | 'orange'
  });

  const avatarOptions = ['🏔️', '🌿', '🦋', '🌸', '🍃', '⭐', '🌙', '🔥', '💎', '🎯', '🏆', '🎨'];
  const themeOptions = [
    { name: 'green', label: 'Xanh Tà Xùa', gradient: 'from-green-400 to-emerald-600' },
    { name: 'blue', label: 'Xanh Biển', gradient: 'from-blue-400 to-cyan-600' },
    { name: 'purple', label: 'Tím Huyền Bí', gradient: 'from-purple-400 to-pink-600' },
    { name: 'orange', label: 'Cam Hoàng Hôn', gradient: 'from-orange-400 to-red-600' }
  ];

  const {
    userProfile,
    pointHistory,
    challenges,
    getProgressToNextLevel,
    getActiveChallenges,
    getCompletedChallenges,
    awardPoints
  } = useGamification((type, options) => {
    setMicroInteraction({ type, options });
    setTimeout(() => setMicroInteraction(null), 3000);
  });

  const progress = getProgressToNextLevel();
  const activeChallenges = getActiveChallenges();
  const completedChallenges = getCompletedChallenges();
  const recentActivity = pointHistory.slice(0, 5);

  const handleTestMicroInteraction = (type: 'points' | 'level_up' | 'badge') => {
    if (type === 'points') {
      awardPoints('checkin');
      showSuccess('Điểm danh thành công!', 10);
    } else if (type === 'level_up') {
      showLevelUp(userProfile.currentLevel.id + 1, 'Bạn đã lên cấp! Chúc mừng bạn!');
    } else if (type === 'badge') {
      showAchievement('Huy hiệu mới!', 'Bạn đã nhận được huy hiệu "Thám hiểm gia"!', 50, 'Thám hiểm gia');
    }
  };

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
    showSuccess('Hồ sơ đã được cập nhật!');
  };

  const currentTheme = themeOptions.find(t => t.name === profileSettings.theme) || themeOptions[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Sky Quest Navigation */}
      <SkyQuestNavigation currentSection="profile" />
      
      {/* Add padding for mobile bottom navigation */}
      <div className="pb-20 md:pb-0 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Avatar and Basic Info */}
              <div className="flex flex-col items-center text-center lg:text-left">
                {/* Avatar with customization */}
                <div className={`w-32 h-32 bg-gradient-to-br ${currentTheme.gradient} rounded-full flex items-center justify-center text-4xl text-white font-bold mb-4 relative`}>
                  {isEditingProfile ? (
                    <div className="grid grid-cols-3 gap-1 p-2">
                      {avatarOptions.slice(0, 9).map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => setProfileSettings(prev => ({ ...prev, avatar: emoji }))}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-lg hover:bg-white/20 transition-colors ${
                            profileSettings.avatar === emoji ? 'bg-white/30' : ''
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <span className="text-5xl">{profileSettings.avatar}</span>
                  )}
                  
                  {!isEditingProfile && (
                    <button
                      onClick={() => setIsEditingProfile(true)}
                      className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Name and Nickname */}
                {isEditingProfile ? (
                  <div className="space-y-3 w-full max-w-xs">
                    <input
                      type="text"
                      value={profileSettings.displayName}
                      onChange={(e) => setProfileSettings(prev => ({ ...prev, displayName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tên hiển thị"
                    />
                    <input
                      type="text"
                      value={profileSettings.nickname}
                      onChange={(e) => setProfileSettings(prev => ({ ...prev, nickname: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Biệt danh"
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {profileSettings.displayName}
                    </h1>
                    <p className="text-lg text-gray-600 mb-4 italic">"{profileSettings.nickname}"</p>
                  </>
                )}

                <div className="flex items-center gap-2 text-lg text-gray-600 mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${userProfile.currentLevel.color} text-white`}>
                    {userProfile.currentLevel.icon} {userProfile.currentLevel.name}
                  </span>
                </div>
                <p className="text-gray-500 italic">{userProfile.currentLevel.title}</p>

                {/* Privacy Settings */}
                {isEditingProfile && (
                  <div className="mt-4 space-y-3 w-full max-w-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Hồ sơ công khai</span>
                      <button
                        onClick={() => setProfileSettings(prev => ({ ...prev, isPublicProfile: !prev.isPublicProfile }))}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          profileSettings.isPublicProfile ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          profileSettings.isPublicProfile ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Hiển thị thống kê</span>
                      <button
                        onClick={() => setProfileSettings(prev => ({ ...prev, showStats: !prev.showStats }))}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          profileSettings.showStats ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          profileSettings.showStats ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Hiển thị huy hiệu</span>
                      <button
                        onClick={() => setProfileSettings(prev => ({ ...prev, showBadges: !prev.showBadges }))}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          profileSettings.showBadges ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          profileSettings.showBadges ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Hiển thị hoạt động</span>
                      <button
                        onClick={() => setProfileSettings(prev => ({ ...prev, showActivity: !prev.showActivity }))}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          profileSettings.showActivity ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          profileSettings.showActivity ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Theme Selection */}
                {isEditingProfile && (
                  <div className="mt-4 w-full max-w-xs">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Chủ đề giao diện</label>
                    <div className="grid grid-cols-2 gap-2">
                      {themeOptions.map((theme) => (
                        <button
                          key={theme.name}
                          onClick={() => setProfileSettings(prev => ({ ...prev, theme: theme.name as any }))}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            profileSettings.theme === theme.name 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className={`w-full h-4 rounded bg-gradient-to-r ${theme.gradient} mb-1`} />
                          <span className="text-xs text-gray-600">{theme.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Save/Cancel Buttons */}
                {isEditingProfile && (
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={handleSaveProfile}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Lưu
                    </button>
                    <button
                      onClick={() => setIsEditingProfile(false)}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Hủy
                    </button>
                  </div>
                )}
              </div>

              {/* Stats Grid */}
              <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-6">
                {profileSettings.showStats && (
                  <>
                    <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
                      <div className="text-3xl font-bold text-orange-600 mb-1">
                        {userProfile.totalPoints.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                        <Star className="w-4 h-4" />
                        Điểm tích lũy
                      </div>
                    </div>

                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                      <div className="text-3xl font-bold text-blue-600 mb-1">
                        {userProfile.currentLevel.id}
                      </div>
                      <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                        <Trophy className="w-4 h-4" />
                        Cấp độ
                      </div>
                    </div>

                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                      <div className="text-3xl font-bold text-green-600 mb-1">
                        {completedChallenges.length}
                      </div>
                      <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                        <Target className="w-4 h-4" />
                        Thử thách
                      </div>
                    </div>

                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                      <div className="text-3xl font-bold text-purple-600 mb-1">
                        {userProfile.badges?.length || 0}
                      </div>
                      <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                        <Award className="w-4 h-4" />
                        Huy hiệu
                      </div>
                    </div>
                  </>
                )}
                
                {!profileSettings.showStats && (
                  <div className="col-span-2 lg:col-span-4 text-center p-8 bg-gray-50 rounded-xl">
                    <EyeOff className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Thống kê đã được ẩn</p>
                  </div>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">
                  Tiến độ lên cấp {userProfile.nextLevel?.name || 'Cấp tối đa'}
                </span>
                <span className="text-sm text-gray-500">
                  {progress.currentLevelPoints}/{userProfile.nextLevel?.minPoints || 0} điểm
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`bg-gradient-to-r ${currentTheme.gradient} h-3 rounded-full transition-all duration-500`}
                  style={{ width: `${progress.progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Còn {progress.pointsToNext} điểm nữa để lên cấp
              </p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Activity & Challenges */}
            <div className="lg:col-span-2 space-y-8">
              {/* Recent Activity */}
              {profileSettings.showActivity && (
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-blue-500" />
                    Hoạt động gần đây
                  </h2>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className={`w-10 h-10 bg-gradient-to-br ${currentTheme.gradient} rounded-full flex items-center justify-center`}>
                          <Star className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{activity.description}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(activity.timestamp).toLocaleDateString('vi-VN')}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold text-green-600">+{activity.points}</span>
                          <p className="text-xs text-gray-500">điểm</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!profileSettings.showActivity && (
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="text-center py-8">
                    <EyeOff className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-500 mb-2">Hoạt động đã được ẩn</h3>
                    <p className="text-gray-400">Bạn có thể bật lại trong cài đặt hồ sơ</p>
                  </div>
                </div>
              )}

              {/* Active Challenges */}
               <div className="bg-white rounded-2xl shadow-xl p-6">
                 <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                   <Target className="w-6 h-6 text-green-500" />
                   Thử thách đang tham gia
                 </h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {activeChallenges.slice(0, 4).map((userChallenge) => {
                     const challenge = challenges.find(c => c.id === userChallenge.challengeId);
                     if (!challenge) return null;
                     
                     return (
                       <div key={userChallenge.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                         <h3 className="font-semibold text-gray-900 mb-2">{challenge.title}</h3>
                         <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                         <div className="flex items-center justify-between">
                           <span className="text-xs text-gray-500">
                             {challenge.endDate ? new Date(challenge.endDate).toLocaleDateString('vi-VN') : 'Không giới hạn'}
                           </span>
                           <span className="text-sm font-medium text-blue-600">
                             {challenge.pointReward} điểm
                           </span>
                         </div>
                       </div>
                     );
                   })}
                 </div>
               </div>
            </div>

            {/* Right Column - Stats & Badges */}
            <div className="space-y-8">
              {/* Quick Stats */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  Thống kê nhanh
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Điểm tuần này</span>
                    <span className="font-bold text-blue-600">+245</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Streak hiện tại</span>
                    <span className="font-bold text-green-600">7 ngày</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Thứ hạng</span>
                    <span className="font-bold text-purple-600">#12</span>
                  </div>
                </div>
              </div>

              {/* Badges Collection */}
              {profileSettings.showBadges && (
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    Bộ sưu tập huy hiệu
                  </h2>
                  <div className="grid grid-cols-3 gap-3">
                    {userProfile.badges?.slice(0, 9).map((badge, index) => (
                      <div key={index} className="aspect-square bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">{badge.icon}</span>
                      </div>
                    ))}
                    {Array.from({ length: Math.max(0, 9 - (userProfile.badges?.length || 0)) }).map((_, index) => (
                      <div key={`empty-${index}`} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400">?</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!profileSettings.showBadges && (
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="text-center py-8">
                    <EyeOff className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-500 mb-2">Huy hiệu đã được ẩn</h3>
                    <p className="text-gray-400">Bạn có thể bật lại trong cài đặt hồ sơ</p>
                  </div>
                </div>
              )}

              {/* Test Micro-interactions */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Test Animations</h2>
                <div className="space-y-3">
                  <button
                    onClick={() => handleTestMicroInteraction('points')}
                    className={`w-full px-4 py-2 bg-gradient-to-r ${currentTheme.gradient} text-white rounded-lg hover:opacity-90 transition-opacity`}
                  >
                    Test Points
                  </button>
                  <button
                    onClick={() => handleTestMicroInteraction('level_up')}
                    className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Test Level Up
                  </button>
                  <button
                    onClick={() => handleTestMicroInteraction('badge')}
                    className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    Test Badge
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Micro-interactions */}
        {microInteraction && (
          <MicroInteractions 
            type={microInteraction.type}
            value={microInteraction.options?.value}
            title={microInteraction.options?.title}
            description={microInteraction.options?.description}
          />
        )}

        {/* Emotional Feedback */}
        {feedbacks.map((feedback) => (
          <EmotionalFeedback
            key={feedback.id}
            type={feedback.type}
            title={feedback.title}
            message={feedback.message}
            points={feedback.points}
            level={feedback.level}
            badge={feedback.badge}
            onClose={() => closeFeedback(feedback.id)}
            autoClose={feedback.autoClose}
            duration={feedback.duration}
          />
        ))}

        {/* Progress Toasts */}
        {toasts.map((toast) => (
          <ProgressToast
            key={toast.id}
            type={toast.type}
            message={toast.message}
            points={toast.points}
            progress={toast.progress}
            maxProgress={toast.maxProgress}
            onClose={() => closeToast(toast.id)}
            duration={toast.duration}
            position={toast.position}
          />
        ))}
      </div>
    </div>
  );
};

export default UserProfilePage;