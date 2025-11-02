import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { useGamification } from '../hooks/useGamification';
import { LeaderboardEntry, Leaderboard as LeaderboardType } from '../types/gamification';
import { getUserLevel } from '../data/gamificationData';
import Footer from '../components/Footer';
import Layout from '@/components/Layout';
import { 
  Trophy, 
  Medal, 
  Award, 
  Crown, 
  Star, 
  TrendingUp,
  Calendar,
  Users,
  Share2,
  ChevronUp,
  ChevronDown,
  Zap,
  Target,
  Mountain,
  Leaf,
  Sparkles,
  Clock,
  Gift,
  ArrowUp,
  ArrowDown,
  Eye,
  Flame
} from 'lucide-react';

const Leaderboard: React.FC = () => {
  const { userProfile } = useGamification();
  const [selectedPeriod, setSelectedPeriod] = useState<'weekly' | 'monthly' | 'all_time'>('weekly');
  const [selectedRegion, setSelectedRegion] = useState<'all' | 'ta-xua' | 'nearby'>('all');
  const [leaderboard, setLeaderboard] = useState<LeaderboardType | null>(null);
  const [showRecentActivity, setShowRecentActivity] = useState(true);

  const getRegionInfo = (region: 'all' | 'ta-xua' | 'nearby') => {
    switch (region) {
      case 'all': return { name: 'Toàn quốc', icon: '🌍', description: 'Tất cả chiến binh xanh' };
      case 'ta-xua': return { name: 'Tà Xùa', icon: '🏔️', description: 'Khu vực Tà Xùa' };
      case 'nearby': return { name: 'Gần tôi', icon: '📍', description: 'Trong bán kính 50km' };
    }
  };

  const getSpecialTitle = (rank: number, period: string) => {
    if (period === 'weekly') {
      switch (rank) {
        case 1: return { title: 'Người truyền cảm hứng tuần này', icon: '✨', color: 'text-yellow-400' };
        case 2: return { title: 'Chiến binh xanh xuất sắc', icon: '🌟', color: 'text-blue-400' };
        case 3: return { title: 'Đại sứ môi trường', icon: '🌱', color: 'text-green-400' };
        default: return null;
      }
    } else if (period === 'monthly') {
      switch (rank) {
        case 1: return { title: 'Top du lịch xanh tháng này', icon: '👑', color: 'text-purple-400' };
        case 2: return { title: 'Nhà lãnh đạo bền vững', icon: '🏆', color: 'text-orange-400' };
        case 3: return { title: 'Thủ lĩnh xanh', icon: '🌿', color: 'text-emerald-400' };
        default: return null;
      }
    }
    return null;
  };

  const getMotivationalCTA = (userRank: number, totalEntries: number) => {
    if (userRank === 1) {
      return {
        message: "Bạn đang dẫn đầu! Hãy duy trì phong độ! 🔥",
        action: "Tiếp tục thử thách",
        color: "from-yellow-500 to-orange-500"
      };
    } else if (userRank <= 3) {
      return {
        message: "Bạn đang ở Top 3! Cố gắng giữ vững vị trí! 💪",
        action: "Tham gia thêm thử thách",
        color: "from-blue-500 to-purple-500"
      };
    } else if (userRank <= 10) {
      return {
        message: "Chỉ cần thêm chút nỗ lực để vào Top 3! 🚀",
        action: "Khám phá thử thách mới",
        color: "from-green-500 to-blue-500"
      };
    } else {
      return {
        message: `Hãy leo lên từ hạng ${userRank}! Mỗi bước đều quan trọng! 🌟`,
        action: "Bắt đầu thử thách",
        color: "from-purple-500 to-pink-500"
      };
    }
  };

  // Mock leaderboard data - in real app this would come from backend
  useEffect(() => {
    const generateMockLeaderboard = (): LeaderboardType => {
      const mockUsers = [
        { username: 'Nguyễn Văn An', points: 2450, avatar: '🏔️', trend: 'up', recentActivity: 'Hoàn thành thử thách "Chinh phục đỉnh Tà Xùa"' },
        { username: 'Trần Thị Bình', points: 2180, avatar: '🌿', trend: 'up', recentActivity: 'Chia sẻ 5 ảnh đẹp về Tà Xùa' },
        { username: 'Lê Hoàng Cường', points: 1950, avatar: '⛰️', trend: 'down', recentActivity: 'Check-in tại Homestay Mây Trắng' },
        { username: 'Phạm Thị Dung', points: 1820, avatar: '🌸', trend: 'up', recentActivity: 'Viết review 5 sao cho tour văn hóa' },
        { username: 'Hoàng Văn Em', points: 1650, avatar: '🦅', trend: 'same', recentActivity: 'Tham gia thử thách cộng đồng' },
        { username: 'Vũ Thị Phương', points: 1480, avatar: '🌺', trend: 'up', recentActivity: 'Giới thiệu 3 bạn mới tham gia' },
        { username: 'Đỗ Minh Giang', points: 1320, avatar: '🏞️', trend: 'down', recentActivity: 'Hoàn thành thử thách nhiếp ảnh' },
        { username: 'Bùi Thị Hoa', points: 1150, avatar: '🌄', trend: 'up', recentActivity: 'Đạt streak 7 ngày liên tiếp' },
        { username: 'Ngô Văn Inh', points: 980, avatar: '🌲', trend: 'same', recentActivity: 'Tham gia workshop bảo vệ môi trường' },
        { username: 'Lý Thị Kim', points: 850, avatar: '🦋', trend: 'up', recentActivity: 'Chia sẻ kinh nghiệm du lịch xanh' },
        { username: userProfile.username, points: userProfile.totalPoints, avatar: '🌟', trend: 'up', recentActivity: 'Đang tích cực tham gia các hoạt động' }
      ];

      const sortedUsers = mockUsers
        .sort((a, b) => b.points - a.points)
        .slice(0, 10);

      const entries: LeaderboardEntry[] = sortedUsers.map((user, index) => ({
        userId: `user-${index + 1}`,
        username: user.username,
        points: user.points,
        level: getUserLevel(user.points),
        rank: index + 1,
        badges: [],
        avatar: user.avatar,
        trend: user.trend,
        recentActivity: user.recentActivity
      }));

      return {
        period: selectedPeriod,
        entries,
        lastUpdated: new Date()
      };
    };

    setLeaderboard(generateMockLeaderboard());
  }, [selectedPeriod, userProfile]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-8 h-8 text-yellow-400 drop-shadow-lg" />;
      case 2: return <Medal className="w-7 h-7 text-gray-300 drop-shadow-lg" />;
      case 3: return <Award className="w-7 h-7 text-amber-500 drop-shadow-lg" />;
      default: return (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-inner">
          <span className="text-gray-700 font-bold text-sm">{rank}</span>
        </div>
      );
    }
  };

  const getRankBackground = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 shadow-2xl border-2 border-yellow-300';
      case 2: return 'bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 shadow-xl border-2 border-gray-200';
      case 3: return 'bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400 shadow-xl border-2 border-amber-300';
      default: return 'bg-white border border-gray-200 hover:shadow-lg';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-500" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-500" />;
      default: return <div className="w-4 h-4 rounded-full bg-gray-400" />;
    }
  };

  const getPeriodName = (period: string) => {
    switch (period) {
      case 'weekly': return 'Tuần này';
      case 'monthly': return 'Tháng này';
      case 'all_time': return 'Tất cả thời gian';
      default: return period;
    }
  };

  const handleShare = (entry: LeaderboardEntry) => {
    const text = `🏆 ${entry.username} đang xếp hạng ${entry.rank} trên bảng xếp hạng Tà Xùa Xanh với ${entry.points.toLocaleString()} điểm! Tham gia cùng chúng tôi để khám phá Tà Xùa! #TaXuaXanh #DuLichXanh`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Bảng xếp hạng Tà Xùa Xanh',
        text: text,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('Đã sao chép thông tin chia sẻ!');
    }
  };

  const userRank = leaderboard?.entries.find(entry => entry.username === userProfile.username)?.rank;

  const LeaderboardEntryComponent: React.FC<{ entry: LeaderboardEntry & { avatar?: string; trend?: string; recentActivity?: string }; isCurrentUser?: boolean }> = ({ 
    entry, 
    isCurrentUser = false 
  }) => {
    const isTopThree = entry.rank <= 3;
    
    return (
      <div className={`rounded-2xl p-6 transition-all duration-300 hover:scale-105 ${
        isCurrentUser 
          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-2xl border-2 border-blue-300 animate-pulse' 
          : getRankBackground(entry.rank) + (isTopThree ? ' text-white' : '')
      }`}>
        {/* Rank Badge for Top 3 */}
        {isTopThree && (
          <div className="absolute -top-3 -right-3 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
            {getRankIcon(entry.rank)}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Avatar & Rank */}
            <div className="relative">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${
                isTopThree ? 'bg-white/20 backdrop-blur-sm' : 'bg-gray-100'
              } shadow-lg`}>
                {entry.avatar || '👤'}
              </div>
              {!isTopThree && (
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-xs font-bold text-gray-700">{entry.rank}</span>
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className={`font-bold text-lg ${
                  isCurrentUser ? 'text-white' : isTopThree ? 'text-white' : 'text-gray-900'
                }`}>
                  {entry.username}
                </h3>
                {isCurrentUser && (
                  <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-sm">
                    Bạn
                  </span>
                )}
                {entry.trend && getTrendIcon(entry.trend)}
              </div>
              
              <div className="flex items-center space-x-2 mb-2">
                <div 
                  className="w-3 h-3 rounded-full shadow-sm"
                  style={{ backgroundColor: entry.level.color }}
                />
                <span className={`text-sm font-medium ${
                  isCurrentUser ? 'text-white/90' : isTopThree ? 'text-white/90' : 'text-gray-600'
                }`}>
                  {entry.level.name}
                </span>
              </div>

              {/* Recent Activity */}
              {entry.recentActivity && showRecentActivity && (
                <div className={`text-xs ${
                  isCurrentUser ? 'text-white/80' : isTopThree ? 'text-white/80' : 'text-gray-500'
                } flex items-center space-x-1`}>
                  <Zap className="w-3 h-3" />
                  <span className="truncate max-w-xs">{entry.recentActivity}</span>
                </div>
              )}
            </div>
          </div>

          <div className="text-right flex items-center space-x-4">
            <div>
              <div className={`text-3xl font-bold ${
                isCurrentUser ? 'text-white' : isTopThree ? 'text-white' : 'text-gray-900'
              }`}>
                {entry.points.toLocaleString()}
              </div>
              <div className={`text-sm ${
                isCurrentUser ? 'text-white/80' : isTopThree ? 'text-white/80' : 'text-gray-600'
              }`}>
                điểm
              </div>
            </div>

            <button
              onClick={() => handleShare(entry)}
              className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                isCurrentUser 
                  ? 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm' 
                  : isTopThree 
                    ? 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        {/* Add padding for mobile bottom navigation */}
        <div className="pb-20 md:pb-0">
          {/* Hero Section with Ta Xua Theme */}
          <div className="relative bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white py-20">
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 bg-[url('/images/website background/mountain-pattern.svg')] opacity-10" />
            
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="flex items-center justify-center mb-6">
                <Trophy className="w-12 h-12 mr-4 animate-bounce" />
                <h1 className="text-5xl font-bold">Bảng Xếp Hạng Tà Xùa</h1>
                <Crown className="w-12 h-12 ml-4 animate-bounce" />
              </div>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Những chiến binh xanh dẫn đầu trong hành trình khám phá và bảo vệ thiên nhiên Tà Xùa
            </p>
            
            {/* Competition Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{leaderboard?.entries.length || 0}</div>
                <div className="text-white/80">Chiến binh xanh</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">
                  {leaderboard?.entries[0]?.points.toLocaleString() || '0'}
                </div>
                <div className="text-white/80">Điểm cao nhất</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">
                  {Math.round((leaderboard?.entries.reduce((sum, entry) => sum + entry.points, 0) || 0) / (leaderboard?.entries.length || 1)).toLocaleString()}
                </div>
                <div className="text-white/80">Điểm trung bình</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">7</div>
                <div className="text-white/80">Ngày còn lại</div>
              </div>
            </div>
          </div>
        </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* User's Current Position with Enhanced CTA */}
        {userRank && (
          <div className="mb-8">
            {(() => {
              const cta = getMotivationalCTA(userRank, leaderboard?.entries.length || 0);
              return (
                <div className={`bg-gradient-to-r ${cta.color} rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden`}>
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-6">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <TrendingUp className="w-10 h-10" />
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold mb-2">Hạng #{userRank}</h2>
                          <p className="text-white/90 text-lg">Vị trí hiện tại của bạn</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Flame className="w-4 h-4" />
                            <span className="text-sm">Streak: {userProfile.streak} ngày</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-bold mb-2">{userProfile.totalPoints.toLocaleString()}</div>
                        <div className="text-white/90 text-lg">điểm</div>
                      </div>
                    </div>
                    
                    {/* Motivational Message */}
                    <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold mb-2">{cta.message}</div>
                        <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                          {cta.action}
                        </button>
                      </div>
                    </div>
                    
                    {userRank > 1 && leaderboard && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-white/90">Để lên hạng #{userRank - 1}:</span>
                            <span className="font-bold text-xl">
                              +{(leaderboard.entries[userRank - 2].points - userProfile.totalPoints).toLocaleString()} điểm
                            </span>
                          </div>
                          <div className="mt-2 text-sm text-white/70">
                            Hoàn thành 1-2 thử thách nữa là đạt được!
                          </div>
                        </div>
                        
                        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-white/90">Để vào Top 3:</span>
                            <span className="font-bold text-xl">
                              +{Math.max(0, (leaderboard.entries[2]?.points || 0) - userProfile.totalPoints).toLocaleString()} điểm
                            </span>
                          </div>
                          <div className="mt-2 text-sm text-white/70">
                            Bạn có thể làm được! 💪
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Enhanced Period & Region Filter */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Users className="w-6 h-6 mr-2 text-green-600" />
              Bảng xếp hạng
            </h2>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowRecentActivity(!showRecentActivity)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  showRecentActivity 
                    ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Eye className="w-4 h-4 inline mr-1" />
                Hoạt động gần đây
              </button>
            </div>
          </div>
          
          {/* Time Period Filter */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <Clock className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-700">Thời gian:</span>
            </div>
            <div className="flex space-x-2">
               {[
                 { key: 'weekly', label: 'Tuần này', icon: '📅' },
                 { key: 'monthly', label: 'Tháng này', icon: '🗓️' },
                 { key: 'all_time', label: 'Tất cả', icon: '⏰' }
               ].map(period => (
                 <button
                   key={period.key}
                   onClick={() => setSelectedPeriod(period.key as any)}
                   className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                     selectedPeriod === period.key
                       ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg transform scale-105'
                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                   }`}
                 >
                   <span>{period.icon}</span>
                   <span>{period.label}</span>
                 </button>
               ))}
             </div>
          </div>

          {/* Region Filter */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Mountain className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-700">Khu vực:</span>
            </div>
            <div className="flex space-x-2">
              {(['all', 'ta-xua', 'nearby'] as const).map(region => {
                const regionInfo = getRegionInfo(region);
                return (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                      selectedRegion === region
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                    }`}
                  >
                    <span>{regionInfo.icon}</span>
                    <span>{regionInfo.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        {leaderboard && (
          <div className="space-y-6">
            {/* Top 3 Podium with Special Titles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {leaderboard.entries.slice(0, 3).map((entry, index) => {
                const specialTitle = getSpecialTitle(entry.rank, selectedPeriod);
                return (
                  <div key={entry.userId} className={`relative ${index === 0 ? 'md:order-2' : index === 1 ? 'md:order-1' : 'md:order-3'}`}>
                    <div className={`relative rounded-2xl p-6 text-center ${getRankBackground(entry.rank)} text-white overflow-hidden`}>
                      {/* Special Title Badge */}
                      {specialTitle && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white text-gray-900 px-4 py-2 rounded-full text-xs font-bold shadow-lg z-20">
                          <span className={specialTitle.color}>{specialTitle.icon}</span> {specialTitle.title}
                        </div>
                      )}
                      
                      {/* Decorative Elements */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
                      <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8" />
                      
                      <div className="relative z-10 pt-4">
                        <div className="w-20 h-20 mx-auto mb-4 text-4xl bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                          {(entry as any).avatar || '👤'}
                        </div>
                        
                        <div className="mb-4">
                          {getRankIcon(entry.rank)}
                        </div>
                        
                        <h3 className="font-bold text-lg mb-2">{entry.username}</h3>
                        <div className="text-2xl font-bold mb-1">{entry.points.toLocaleString()}</div>
                        <div className="text-sm opacity-90">điểm</div>
                        
                        <div className="mt-4 flex items-center justify-center space-x-1">
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: entry.level.color }}
                          />
                          <span className="text-xs opacity-80">{entry.level.name}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Rest of Leaderboard */}
            <div className="space-y-4">
              {leaderboard.entries.slice(3).map((entry) => (
                <LeaderboardEntryComponent 
                  key={entry.userId} 
                  entry={entry} 
                  isCurrentUser={entry.username === userProfile.username}
                />
              ))}
            </div>
          </div>
        )}

        {/* Recent Activity Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Sparkles className="w-6 h-6 mr-2 text-purple-600" />
            Đang nổi bật
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leaderboard?.entries.slice(0, 6).map((entry, index) => (
              <div key={entry.userId} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-lg">
                    {(entry as any).avatar || '👤'}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{entry.username}</div>
                    <div className="text-sm text-gray-600">#{entry.rank}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-700 flex items-center space-x-1">
                  <Zap className="w-3 h-3 text-yellow-500" />
                  <span>{(entry as any).recentActivity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Motivation & CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-2xl p-8 text-white text-center relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 -translate-x-16" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 translate-x-12" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-6">
              <Mountain className="w-8 h-8 mr-3" />
              <h3 className="text-3xl font-bold">Hãy tiếp tục chinh phục!</h3>
              <Leaf className="w-8 h-8 ml-3" />
            </div>
            
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Mỗi bước chân, mỗi hành động đều góp phần xây dựng cộng đồng du lịch xanh Tà Xùa. 
              Hãy cùng nhau bảo vệ và khám phá vẻ đẹp thiên nhiên!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <Target className="w-8 h-8 mx-auto mb-2" />
                <div className="font-semibold mb-1">Thử thách</div>
                <div className="text-sm text-white/80">Hoàn thành để tích điểm</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <Star className="w-8 h-8 mx-auto mb-2" />
                <div className="font-semibold mb-1">Tích điểm</div>
                <div className="text-sm text-white/80">Mỗi hoạt động đều có giá trị</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <Trophy className="w-8 h-8 mx-auto mb-2" />
                <div className="font-semibold mb-1">Leo hạng</div>
                <div className="text-sm text-white/80">Trở thành chiến binh xanh</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <Gift className="w-8 h-8 mx-auto mb-2" />
                <div className="font-semibold mb-1">Nhận thưởng</div>
                <div className="text-sm text-white/80">Voucher và quà tặng hấp dẫn</div>
              </div>
            </div>

            {/* Weekly Challenge CTA */}
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm max-w-2xl mx-auto">
              <h4 className="text-xl font-bold mb-3">🎯 Thử thách tuần này</h4>
              <p className="text-white/90 mb-4">
                "Khám phá 3 điểm du lịch xanh tại Tà Xùa" - Còn lại 4 ngày!
              </p>
              <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Tham gia ngay
              </button>
            </div>
          </div>
        </div>
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;