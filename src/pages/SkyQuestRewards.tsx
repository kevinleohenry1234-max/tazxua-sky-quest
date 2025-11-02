import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Gift, 
  Star, 
  Trophy, 
  Crown, 
  Coffee, 
  Home, 
  BookOpen, 
  ShoppingBag, 
  Award,
  Sparkles,
  Target,
  TrendingUp,
  Users
} from 'lucide-react';
import { rewards, levels } from '@/data/questsData';

const SkyQuestRewards = () => {
  const navigate = useNavigate();
  
  // Mock user data - in real app, this would come from user context/API
  const [userPoints, setUserPoints] = useState(850);
  const [userLevel, setUserLevel] = useState("F2");
  const [redeemedRewards, setRedeemedRewards] = useState<string[]>([]);

  const handleRedeemReward = (rewardId: string, requiredPoints: number) => {
    if (userPoints >= requiredPoints && !redeemedRewards.includes(rewardId)) {
      setUserPoints(prev => prev - requiredPoints);
      setRedeemedRewards(prev => [...prev, rewardId]);
      // In real app, this would make an API call
      console.log(`Redeemed reward: ${rewardId}`);
    }
  };

  const getCurrentLevel = () => {
    return levels.find(level => level.id === userLevel) || levels[0];
  };

  const getNextLevel = () => {
    const currentLevelIndex = levels.findIndex(level => level.id === userLevel);
    return currentLevelIndex < levels.length - 1 ? levels[currentLevelIndex + 1] : null;
  };

  const getRewardIcon = (rewardName: string) => {
    if (rewardName.includes('trà')) return <Coffee className="w-6 h-6" />;
    if (rewardName.includes('homestay')) return <Home className="w-6 h-6" />;
    if (rewardName.includes('workshop')) return <BookOpen className="w-6 h-6" />;
    if (rewardName.includes('túi') || rewardName.includes('quà')) return <ShoppingBag className="w-6 h-6" />;
    if (rewardName.includes('huy hiệu') || rewardName.includes('Đại Sứ')) return <Crown className="w-6 h-6" />;
    return <Gift className="w-6 h-6" />;
  };

  const getRewardColor = (points: number) => {
    if (points <= 300) return 'from-green-400 to-emerald-500';
    if (points <= 600) return 'from-blue-400 to-cyan-500';
    if (points <= 1000) return 'from-purple-400 to-violet-500';
    if (points <= 1500) return 'from-orange-400 to-red-500';
    return 'from-yellow-400 to-amber-500';
  };

  const currentLevel = getCurrentLevel();
  const nextLevel = getNextLevel();
  const progressToNext = nextLevel ? ((userPoints - currentLevel.points) / (nextLevel.points - currentLevel.points)) * 100 : 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/skyquest')}
            className="text-white hover:bg-white/20 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại Sky Quest
          </Button>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Cửa hàng phần thưởng</h1>
              <p className="text-purple-100 text-lg">
                Đổi điểm lấy những phần thưởng hấp dẫn
              </p>
            </div>
            
            {/* User Stats */}
            <div className="mt-6 md:mt-0 bg-white/10 backdrop-blur-sm rounded-2xl p-6 min-w-[280px]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-300" />
                  <span className="font-semibold">{currentLevel.title}</span>
                </div>
                <div className="text-2xl font-bold">{userPoints}</div>
              </div>
              
              {nextLevel && (
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Tiến độ đến {nextLevel.title}</span>
                    <span>{nextLevel.points - userPoints} điểm nữa</span>
                  </div>
                  <Progress value={progressToNext} className="h-2" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Level Progress Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Hệ thống cấp độ
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {levels.map((level, index) => {
              const isCurrentLevel = level.id === userLevel;
              const isUnlocked = userPoints >= level.points;
              
              return (
                <Card key={level.id} className={`text-center transition-all ${
                  isCurrentLevel ? 'ring-2 ring-purple-500 bg-purple-50' : 
                  isUnlocked ? 'bg-green-50' : 'bg-gray-50'
                }`}>
                  <CardContent className="p-4">
                    <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${
                      isCurrentLevel ? 'bg-purple-500 text-white' :
                      isUnlocked ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                    }`}>
                      {isCurrentLevel ? <Crown className="w-6 h-6" /> : 
                       isUnlocked ? <Star className="w-6 h-6" /> : <Target className="w-6 h-6" />}
                    </div>
                    <div className="text-sm font-semibold text-gray-900 mb-1">
                      {level.title}
                    </div>
                    <div className="text-xs text-gray-600">
                      {level.points} điểm
                    </div>
                    {isCurrentLevel && (
                      <Badge className="mt-2 bg-purple-500">Hiện tại</Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Rewards Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Phần thưởng có sẵn
            </h2>
            <p className="text-lg text-gray-600">
              Sử dụng điểm tích lũy để đổi lấy những phần thưởng hấp dẫn
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map((reward) => {
              const canRedeem = userPoints >= reward.points;
              const isRedeemed = redeemedRewards.includes(reward.id);
              
              return (
                <Card key={reward.id} className={`overflow-hidden transition-all hover:shadow-lg ${
                  isRedeemed ? 'opacity-60' : canRedeem ? 'ring-1 ring-green-200' : ''
                }`}>
                  <div className={`h-32 bg-gradient-to-br ${getRewardColor(reward.points)} relative`}>
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                      {getRewardIcon(reward.name)}
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/20 text-white border-white/30">
                        {reward.points} điểm
                      </Badge>
                    </div>
                    {isRedeemed && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Đã đổi
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">
                      {reward.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {reward.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Sparkles className="w-4 h-4 text-yellow-500" />
                        <span className="font-semibold text-purple-600">
                          {reward.points} điểm
                        </span>
                      </div>
                      
                      <Button
                        onClick={() => handleRedeemReward(reward.id, reward.points)}
                        disabled={!canRedeem || isRedeemed}
                        className={`${
                          isRedeemed ? 'bg-gray-400' :
                          canRedeem ? 'bg-purple-600 hover:bg-purple-700' : 
                          'bg-gray-300 text-gray-500'
                        }`}
                      >
                        {isRedeemed ? 'Đã đổi' : canRedeem ? 'Đổi ngay' : 'Chưa đủ điểm'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Thống kê của bạn
            </h3>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {userPoints}
                </div>
                <div className="text-gray-600">Điểm hiện tại</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {redeemedRewards.length}
                </div>
                <div className="text-gray-600">Phần thưởng đã đổi</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {currentLevel.title}
                </div>
                <div className="text-gray-600">Cấp độ hiện tại</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {rewards.filter(r => userPoints >= r.points).length}
                </div>
                <div className="text-gray-600">Phần thưởng có thể đổi</div>
              </div>
            </div>
          </div>
        </div>

        {/* How to Earn Points */}
        <div className="max-w-4xl mx-auto mt-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-6 h-6 text-purple-600" />
                <span>Cách tích điểm</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Chế độ Mây Mây Sương Sương</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Thưởng trà với người bản địa: 100 điểm</li>
                    <li>• Trekking nhẹ nhàng: 80 điểm</li>
                    <li>• Chụp ảnh hoàng hôn: 60 điểm</li>
                    <li>• Thiền trong rừng: 90 điểm</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Chế độ Hăng Say Săn Thưởng</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Leo núi sống lưng khủng long: 300 điểm</li>
                    <li>• Trồng cây bảo vệ môi trường: 200 điểm</li>
                    <li>• Dọn dẹp rác thải: 150 điểm</li>
                    <li>• Workshop chia sẻ kiến thức: 250 điểm</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Bắt đầu tích điểm ngay hôm nay!
          </h3>
          <p className="text-gray-600 mb-6">
            Tham gia các thử thách để tích lũy điểm và đổi lấy những phần thưởng hấp dẫn
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate('/skyquest/maysuong')}
              className="bg-green-600 hover:bg-green-700"
            >
              <Users className="w-4 h-4 mr-2" />
              Mây Mây Sương Sương
            </Button>
            <Button 
              size="lg"
              onClick={() => navigate('/skyquest/hangsay')}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <Award className="w-4 h-4 mr-2" />
              Hăng Say Săn Thưởng
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkyQuestRewards;