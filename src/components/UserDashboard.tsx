import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Camera, 
  Coffee, 
  Mountain, 
  Star, 
  Gift, 
  Trophy, 
  CheckCircle,
  Award,
  Crown,
  Shield,
  Compass,
  Heart,
  Users
} from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: any;
  completed: boolean;
  difficulty: 'Dễ' | 'Trung bình' | 'Khó';
}

interface UserBadge {
  id: string;
  name: string;
  description: string;
  icon: any;
  earned: boolean;
  requirement: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface UserDashboardProps {
  userName?: string;
  userPoints?: number;
}

const UserDashboard = ({ userName = "Nguyễn Văn A", userPoints = 45 }: UserDashboardProps) => {
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'Check-in tại Sống Lưng Khủng Long',
      description: 'Chụp ảnh tại điểm check-in nổi tiếng nhất Tà Xùa',
      points: 15,
      icon: Mountain,
      completed: true,
      difficulty: 'Trung bình'
    },
    {
      id: '2', 
      title: 'Thưởng thức trà Shan Tuyết',
      description: 'Thử trà tại một tiệm trà bản địa và chụp ảnh',
      points: 10,
      icon: Coffee,
      completed: true,
      difficulty: 'Dễ'
    },
    {
      id: '3',
      title: 'Chụp ảnh với người H\'Mông',
      description: 'Chụp ảnh cùng một em bé hoặc người dân H\'Mông địa phương',
      points: 20,
      icon: Camera,
      completed: true,
      difficulty: 'Dễ'
    },
    {
      id: '4',
      title: 'Săn mây lúc bình minh',
      description: 'Thức dậy sớm và chụp ảnh biển mây lúc bình minh',
      points: 25,
      icon: MapPin,
      completed: false,
      difficulty: 'Khó'
    },
    {
      id: '5',
      title: 'Tham gia lễ hội bản làng',
      description: 'Tham gia một buổi sinh hoạt văn hóa của người H\'Mông',
      points: 30,
      icon: Users,
      completed: false,
      difficulty: 'Khó'
    }
  ]);

  // Badge system
  const [badges, setBadges] = useState<UserBadge[]>([
    {
      id: 'newcomer',
      name: 'Người Mới Đến',
      description: 'Hoàn thành thử thách đầu tiên',
      icon: Star,
      earned: true,
      requirement: 'Hoàn thành 1 thử thách',
      rarity: 'common'
    },
    {
      id: 'explorer',
      name: 'Nhà Thám Hiểm',
      description: 'Hoàn thành 3 thử thách',
      icon: Compass,
      earned: true,
      requirement: 'Hoàn thành 3 thử thách',
      rarity: 'rare'
    },
    {
      id: 'photographer',
      name: 'Nhiếp Ảnh Gia',
      description: 'Chụp ảnh tại 5 địa điểm khác nhau',
      icon: Camera,
      earned: false,
      requirement: 'Chụp ảnh tại 5 địa điểm',
      rarity: 'epic'
    },
    {
      id: 'ambassador',
      name: 'Đại Sứ Tà Xùa',
      description: 'Hoàn thành tất cả thử thách',
      icon: Crown,
      earned: false,
      requirement: 'Hoàn thành tất cả thử thách',
      rarity: 'legendary'
    },
    {
      id: 'culture-lover',
      name: 'Người Yêu Văn Hóa',
      description: 'Tham gia hoạt động văn hóa địa phương',
      icon: Heart,
      earned: false,
      requirement: 'Tham gia lễ hội bản làng',
      rarity: 'rare'
    }
  ]);

  const completedChallenges = challenges.filter(c => c.completed);
  const totalPossiblePoints = challenges.reduce((sum, c) => sum + c.points, 0);
  const progressPercentage = (userPoints / totalPossiblePoints) * 100;

  const handleCompleteChallenge = (challengeId: string) => {
    setChallenges(prev => 
      prev.map(c => 
        c.id === challengeId ? { ...c, completed: true } : c
      )
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Dễ': return 'bg-green-500';
      case 'Trung bình': return 'bg-yellow-500';
      case 'Khó': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getBadgeRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-orange-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getBadgeRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300';
      case 'rare': return 'border-blue-300';
      case 'epic': return 'border-purple-300';
      case 'legendary': return 'border-yellow-300';
      default: return 'border-gray-300';
    }
  };

  const earnedBadges = badges.filter(b => b.earned);

  const rewards = [
    {
      points: 20,
      title: 'Voucher giảm giá 10%',
      description: 'Tại các homestay đối tác'
    },
    {
      points: 50,
      title: 'Voucher giảm giá 20%', 
      description: 'Tại các nhà hàng đối tác'
    },
    {
      points: 80,
      title: 'Tour miễn phí',
      description: 'Trải nghiệm văn hóa H\'Mông'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-background pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-2">
            Chào mừng trở lại, {userName}!
          </h1>
          <p className="font-inter text-muted-foreground text-lg">
            Hãy tiếp tục hành trình khám phá Tà Xùa của bạn
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Points & Progress */}
          <div className="lg:col-span-1">
            <Card className="mb-6 shadow-soft border-0">
              <CardHeader className="text-center">
                <CardTitle className="font-playfair text-2xl">Điểm Thưởng</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="relative">
                  <div className="w-32 h-32 mx-auto mb-4 relative">
                    <div className="w-full h-full rounded-full border-8 border-muted flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
                      <span className="text-3xl font-bold text-white">{userPoints}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    / {totalPossiblePoints} điểm tối đa
                  </p>
                  <Progress value={progressPercentage} className="mb-4" />
                  <div className="text-sm text-muted-foreground">
                    Đã hoàn thành: {completedChallenges.length}/{challenges.length} thử thách
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Badge System */}
            <Card className="mb-6 shadow-soft border-0">
              <CardHeader>
                <CardTitle className="font-playfair flex items-center">
                  <Award className="w-5 h-5 mr-2 text-accent" />
                  Huy Hiệu ({earnedBadges.length}/{badges.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {badges.map((badge) => {
                    const Icon = badge.icon;
                    return (
                      <div
                        key={badge.id}
                        className={`relative p-3 rounded-lg border-2 transition-all duration-300 ${
                          badge.earned
                            ? `${getBadgeRarityBorder(badge.rarity)} bg-gradient-to-br ${getBadgeRarityColor(badge.rarity)} text-white shadow-lg`
                            : 'border-gray-200 bg-gray-50 text-gray-400'
                        } ${badge.earned ? 'card-hover' : ''}`}
                        title={badge.description}
                      >
                        <div className="text-center">
                          <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${
                            badge.earned ? 'bg-white/20' : 'bg-gray-200'
                          }`}>
                            <Icon className={`w-4 h-4 ${badge.earned ? 'text-white' : 'text-gray-400'}`} />
                          </div>
                          <h4 className="text-xs font-medium mb-1">{badge.name}</h4>
                          <p className="text-xs opacity-80">{badge.requirement}</p>
                        </div>
                        {badge.earned && (
                          <div className="absolute -top-1 -right-1">
                            <CheckCircle className="w-4 h-4 text-green-500 bg-white rounded-full" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 text-xs text-center text-muted-foreground">
                  Hoàn thành thử thách để mở khóa huy hiệu mới!
                </div>
              </CardContent>
            </Card>

            {/* Rewards Section */}
            <Card className="shadow-soft border-0">
              <CardHeader>
                <CardTitle className="font-playfair flex items-center">
                  <Gift className="w-5 h-5 mr-2 text-accent" />
                  Đổi Thưởng
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {rewards.map((reward, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border transition-all duration-300 card-hover ${
                      userPoints >= reward.points
                        ? 'bg-primary/5 border-primary cursor-pointer hover:bg-primary/10'
                        : 'bg-muted/30 border-muted cursor-not-allowed'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-inter font-medium text-sm">{reward.title}</h4>
                      <Badge variant={userPoints >= reward.points ? "default" : "secondary"} className="text-xs">
                        {reward.points} điểm
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{reward.description}</p>
                    {userPoints >= reward.points && (
                      <Button size="sm" className="mt-2 w-full btn-primary focus-ring">
                        Đổi Ngay
                      </Button>
                    )}
                  </div>
                ))}
                <div className="text-xs text-muted-foreground text-center pt-2 border-t">
                  Bạn đang có {userPoints} điểm. Hoàn thành thêm thử thách để tích lũy điểm!
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Challenges Section */}
          <div className="lg:col-span-2">
            <Card className="shadow-soft border-0">
              <CardHeader>
                <CardTitle className="font-playfair text-2xl flex items-center">
                  <Trophy className="w-6 h-6 mr-2 text-accent" />
                  Thử Thách Tà Xùa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {challenges.map((challenge) => {
                    const Icon = challenge.icon;
                    return (
                      <div
                        key={challenge.id}
                        className={`p-6 rounded-lg border transition-all duration-300 card-hover ${
                          challenge.completed
                            ? 'bg-green-50 border-green-200'
                            : 'bg-card border-border hover:shadow-medium'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 flex-1">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              challenge.completed ? 'bg-green-500' : 'bg-primary'
                            }`}>
                              {challenge.completed ? (
                                <CheckCircle className="w-6 h-6 text-white" />
                              ) : (
                                <Icon className="w-6 h-6 text-white" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="font-inter font-semibold text-foreground">
                                  {challenge.title}
                                </h3>
                                <Badge 
                                  className={`${getDifficultyColor(challenge.difficulty)} text-white text-xs`}
                                >
                                  {challenge.difficulty}
                                </Badge>
                              </div>
                              <p className="text-muted-foreground text-sm mb-3">
                                {challenge.description}
                              </p>
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                  <Star className="w-4 h-4 text-accent" />
                                  <span className="text-sm font-medium text-accent">
                                    {challenge.points} điểm
                                  </span>
                                </div>
                                {challenge.completed && (
                                  <div className="flex items-center space-x-1 text-green-600">
                                    <CheckCircle className="w-4 h-4" />
                                    <span className="text-sm font-medium">Đã hoàn thành</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          {!challenge.completed && (
                            <Button
                              onClick={() => handleCompleteChallenge(challenge.id)}
                              size="sm"
                              className="ml-4 btn-primary focus-ring"
                            >
                              Hoàn Thành
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;