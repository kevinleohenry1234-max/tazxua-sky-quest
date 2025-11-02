import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import Footer from '@/components/Footer';
import SkyQuestHero from '../components/SkyQuest/SkyQuestHero';
import SkyQuestIntro from '../components/SkyQuest/SkyQuestIntro';
import ModeSelector from '../components/SkyQuest/ModeSelector';
import XPDashboard from '../components/SkyQuest/XPDashboard';
import QuestList from '../components/SkyQuest/QuestList';
import VoucherWallet from '../components/SkyQuest/VoucherWallet';
import RankDashboard from '../components/Ranking/RankDashboard';
import RankCelebrationModal from '../components/Ranking/RankCelebrationModal';
import { useXPEngine } from '../hooks/useXPEngine';
import { useRanking } from '../hooks/useRanking';
import { Trophy, Target, Gift, Activity, Star, Crown } from 'lucide-react';

const SkyQuest: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<'dashboard' | 'quests' | 'vouchers' | 'activity' | 'ranking'>('dashboard');
  
  // Mock user ID - in real app this would come from auth context
  const userId = 'user-1';
  
  const {
    user,
    userLoading,
    userError,
    quests,
    questsLoading,
    completingQuest,
    completeQuest,
    vouchers,
    availableVouchers,
    usedVouchers,
    expiredVouchers,
    vouchersLoading,
    usingVoucher,
    useVoucher,
    exchangeXPForVoucher,
    dashboardData,
    dashboardLoading,
    dashboardError,
    notifications,
    removeNotification
  } = useXPEngine(userId);

  const {
    userProgress,
    isLoading: rankingLoading,
    error: rankingError,
    addPoints,
    checkForRankUp,
    dismissCelebration,
    refreshProgress,
    getActivityHistory
  } = useRanking(userId);

  // State for managing rank celebrations
  const [activeCelebration, setActiveCelebration] = useState<any>(null);

  const handleExplore = () => {
    setActiveSection('quests');
  };

  const handleLearnMore = () => {
    navigate('/about');
  };

  const handleCompleteQuest = async (questId: string, metadata: Record<string, any> = {}) => {
    const response = await completeQuest(questId, metadata);
    if (!response.success) {
      // Handle error - could show toast notification
      console.error('Quest completion failed:', response.message);
      return;
    }

    // Add ranking points for completing quest
    try {
      await addPoints('challenge', { questId, ...metadata });
      
      // Check for rank up after adding points
      const celebration = await checkForRankUp();
      if (celebration) {
        setActiveCelebration(celebration);
      }
    } catch (error) {
      console.error('Failed to add ranking points:', error);
    }
  };

  const handleUseVoucher = async (voucherId: string) => {
    return await useVoucher(voucherId);
  };

  const handleExchangeXP = async (xpAmount: number, exchangeRateIndex: number) => {
    return await exchangeXPForVoucher(xpAmount, exchangeRateIndex);
  };

  // Navigation items
  const navigationItems = [
    { key: 'dashboard' as const, label: 'Tổng quan', icon: Trophy },
    { key: 'ranking' as const, label: 'Thăng hạng', icon: Crown },
    { key: 'quests' as const, label: 'Nhiệm vụ', icon: Target },
    { key: 'vouchers' as const, label: 'Voucher', icon: Gift },
    { key: 'activity' as const, label: 'Hoạt động', icon: Activity }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <SkyQuestHero onExploreClick={handleExplore} />
      
      {/* Introduction */}
      <SkyQuestIntro onLearnMoreClick={handleLearnMore} />
      
      {/* Mode Selector */}
      <ModeSelector />

      {/* XP Engine Interface */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {navigationItems.map(item => {
            const Icon = item.icon;
            const isActive = activeSection === item.key;
            
            return (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-500 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:shadow-md'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Notifications */}
        {notifications.length > 0 && (
          <div className="fixed top-20 right-4 z-50 space-y-2">
            {notifications.map(notification => (
              <div
                key={notification.id}
                className={`bg-white rounded-lg shadow-lg border-l-4 p-4 max-w-sm ${
                  notification.type === 'xp_gained' ? 'border-blue-500' :
                  notification.type === 'level_up' ? 'border-yellow-500' :
                  'border-purple-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {notification.type === 'xp_gained' && <Star className="w-5 h-5 text-blue-500" />}
                    {notification.type === 'level_up' && <Trophy className="w-5 h-5 text-yellow-500" />}
                    {notification.type === 'voucher_earned' && <Gift className="w-5 h-5 text-purple-500" />}
                    <span className="font-medium text-gray-800">{notification.message}</span>
                  </div>
                  <button
                    onClick={() => removeNotification(notification.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Section Content */}
        <div className="space-y-8">
          {activeSection === 'dashboard' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Tổng quan Sky Quest</h2>
              {dashboardData ? (
                <XPDashboard dashboardData={dashboardData} loading={dashboardLoading} />
              ) : (
                <div className="bg-white rounded-xl p-8 text-center">
                  <p className="text-gray-600">Đang tải dữ liệu...</p>
                </div>
              )}
            </div>
          )}

          {activeSection === 'ranking' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Hệ thống thăng hạng</h2>
              {userProgress ? (
                <RankDashboard userProgress={userProgress} />
              ) : (
                <div className="bg-white rounded-xl p-8 text-center">
                  <Crown className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    Hệ thống thăng hạng
                  </h3>
                  <p className="text-gray-500">
                    {rankingLoading ? 'Đang tải dữ liệu thăng hạng...' : 'Không thể tải dữ liệu thăng hạng'}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeSection === 'quests' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Nhiệm vụ khám phá</h2>
              <QuestList
                quests={quests}
                completedQuests={dashboardData?.completedQuests.map(cq => cq.questId) || []}
                onCompleteQuest={handleCompleteQuest}
                completingQuest={completingQuest}
                loading={questsLoading}
              />
            </div>
          )}

          {activeSection === 'vouchers' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Ví voucher</h2>
              <VoucherWallet
                vouchers={vouchers}
                availableVouchers={availableVouchers}
                usedVouchers={usedVouchers}
                expiredVouchers={expiredVouchers}
                onUseVoucher={handleUseVoucher}
                onExchangeXP={handleExchangeXP}
                usingVoucher={usingVoucher}
                userXP={user?.totalXP || 0}
                loading={vouchersLoading}
              />
            </div>
          )}

          {activeSection === 'activity' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Lịch sử hoạt động</h2>
              <div className="bg-white rounded-xl p-8 text-center">
                <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  Lịch sử hoạt động
                </h3>
                <p className="text-gray-500">
                  Tính năng này sẽ được phát triển trong phiên bản tiếp theo
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Call to Action for Quests */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Bắt đầu hành trình khám phá Tà Xùa
          </h2>
          <p className="text-lg md:text-xl text-emerald-100 mb-8 leading-relaxed">
            Tham gia Sky Quest để tích lũy XP, nhận voucher và khám phá vẻ đẹp thiên nhiên
          </p>
          <button
            onClick={() => setActiveSection('quests')}
            className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors shadow-lg"
          >
            Khám phá ngay
          </button>
        </div>
      </section>

      {/* Rank Celebration Modal */}
      {activeCelebration && (
        <RankCelebrationModal
          celebration={activeCelebration}
          isOpen={!!activeCelebration}
          onClose={() => setActiveCelebration(null)}
          onExploreRewards={() => {
            setActiveCelebration(null);
            setActiveSection('vouchers');
          }}
        />
      )}
      </div>
      
      <Footer />
    </Layout>
  );
};

export default SkyQuest;