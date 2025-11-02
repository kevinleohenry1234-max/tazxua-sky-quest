import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  Calendar, 
  Trophy, 
  Star, 
  Clock, 
  Camera,
  Heart,
  ArrowRight,
  Play,
  BookOpen,
  Gift,
  Target,
  Users,
  TrendingUp,
  Award,
  Compass,
  Mountain
} from 'lucide-react';

interface UserStats {
  totalVisits: number;
  completedChallenges: number;
  skyQuestPoints: number;
  favoriteSpots: string[];
  lastVisit: string;
  achievements: string[];
}

interface RecentActivity {
  id: string;
  type: 'visit' | 'challenge' | 'photo' | 'review';
  title: string;
  description: string;
  date: string;
  points?: number;
}

const ReturningUserDashboard = () => {
  const navigate = useNavigate();
  const [userStats, setUserStats] = useState<UserStats>({
    totalVisits: 0,
    completedChallenges: 0,
    skyQuestPoints: 0,
    favoriteSpots: [],
    lastVisit: '',
    achievements: []
  });
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Load user data from localStorage or API
    const savedStats = localStorage.getItem('userStats');
    if (savedStats) {
      setUserStats(JSON.parse(savedStats));
    }

    const savedActivities = localStorage.getItem('recentActivities');
    if (savedActivities) {
      setRecentActivities(JSON.parse(savedActivities));
    }

    const savedUserName = localStorage.getItem('userName') || 'Bạn';
    setUserName(savedUserName);
  }, []);

  const recommendations = [
    {
      id: 'new-trail',
      title: 'Tuyến đường mới: Sống lưng khủng long',
      description: 'Khám phá tuyến trekking mới được mở với độ khó trung bình',
      image: '/images/dragon-backbone.jpg',
      type: 'trail',
      difficulty: 'Trung bình',
      duration: '4-5 giờ'
    },
    {
      id: 'seasonal-event',
      title: 'Lễ hội hoa đào tháng 3',
      description: 'Tham gia lễ hội hoa đào truyền thống của người H\'Mông',
      image: '/images/peach-blossom.jpg',
      type: 'event',
      date: '15-20/03/2024'
    },
    {
      id: 'photo-challenge',
      title: 'Thử thách nhiếp ảnh: Săn mây',
      description: 'Tham gia thử thách chụp ảnh mây để nhận điểm thưởng',
      image: '/images/cloud-hunting.jpg',
      type: 'challenge',
      reward: '500 điểm'
    }
  ];

  const quickActions = [
    {
      title: 'Lên kế hoạch chuyến đi mới',
      description: 'Cùng tạo hành trình riêng cho bạn',
      icon: Calendar,
      action: () => navigate('/plan-trip'),
      color: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Khám phá thử thách mới',
      description: 'Những nhiệm vụ Sky Quest thú vị đang chờ bạn',
      icon: Target,
      action: () => navigate('/challenges'),
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Chia sẻ khoảnh khắc đẹp',
      description: 'Kể cho mọi người nghe về trải nghiệm của bạn',
      icon: Heart,
      action: () => navigate('/share-experience'),
      color: 'from-pink-500 to-rose-600'
    },
    {
      title: 'Khám phá điểm đến mới',
      description: 'Còn nhiều nơi tuyệt vời đang chờ bạn khám phá',
      icon: Compass,
      action: () => navigate('/explore'),
      color: 'from-orange-500 to-red-600'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'visit': return MapPin;
      case 'challenge': return Target;
      case 'photo': return Camera;
      case 'review': return Star;
      default: return Clock;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Back Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Chào mừng bạn trở lại! 👋
            </h1>
            <p className="text-xl text-white/90">
              Hành trình khám phá Tà Xùa của bạn vẫn đang tiếp tục...
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Stats & Progress */}
            <div className="lg:col-span-1 space-y-6">
              {/* User Stats */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Trophy className="w-5 h-5 mr-2" />
                    Khu vườn thành tích của bạn
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Số lần ghé thăm:</span>
                    <span className="text-white font-semibold">{userStats.totalVisits}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Thử thách đã chinh phục:</span>
                    <span className="text-white font-semibold">{userStats.completedChallenges}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Điểm Sky Quest:</span>
                    <span className="text-green-400 font-bold">{userStats.skyQuestPoints}</span>
                  </div>
                  <div className="pt-2">
                    <div className="flex justify-between text-sm text-white/80 mb-2">
                      <span>Hành trình của bạn</span>
                      <span>Cấp {Math.floor(userStats.skyQuestPoints / 1000) + 1}</span>
                    </div>
                    
                    <Progress 
                      value={(userStats.skyQuestPoints % 1000) / 10} 
                      className="h-2 bg-white/20" 
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Thành tựu gần đây
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {userStats.achievements.length > 0 ? (
                    <div className="space-y-2">
                      {userStats.achievements.slice(0, 3).map((achievement, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="text-white/90 text-sm">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-white/60 text-sm">
                      Chưa có thành tựu nào. Hãy bắt đầu khám phá!
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Middle Column - Recommendations */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Actions */}
              <div className="grid md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const IconComponent = action.icon;
                  return (
                    <Card
                      key={index}
                      className="bg-white/10 backdrop-blur-md border-white/20 cursor-pointer transition-all duration-300 hover:bg-white/20 hover:scale-105"
                      onClick={action.action}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-white font-semibold mb-1">
                              {action.title}
                            </h3>
                            <p className="text-white/70 text-sm">
                              {action.description}
                            </p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-white/60" />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Recommendations */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Gợi ý dành cho bạn
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recommendations.map((rec) => (
                    <div
                      key={rec.id}
                      className="flex items-center space-x-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                        {rec.type === 'trail' && <MapPin className="w-8 h-8 text-white" />}
                        {rec.type === 'event' && <Calendar className="w-8 h-8 text-white" />}
                        {rec.type === 'challenge' && <Camera className="w-8 h-8 text-white" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-1">{rec.title}</h4>
                        <p className="text-white/80 text-sm mb-2">{rec.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-white/60">
                          {rec.difficulty && <span>Độ khó: {rec.difficulty}</span>}
                          {rec.duration && <span>Thời gian: {rec.duration}</span>}
                          {rec.date && <span>Ngày: {rec.date}</span>}
                          {rec.reward && <span>Phần thưởng: {rec.reward}</span>}
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-white/60" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Hoạt động gần đây
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {recentActivities.length > 0 ? (
                    <div className="space-y-3">
                      {recentActivities.slice(0, 5).map((activity) => {
                        const ActivityIcon = getActivityIcon(activity.type);
                        return (
                          <div key={activity.id} className="flex items-center space-x-3">
                            <ActivityIcon className="w-5 h-5 text-white/60" />
                            <div className="flex-1">
                              <p className="text-white text-sm">{activity.title}</p>
                              <p className="text-white/60 text-xs">{activity.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-white/60 text-xs">{activity.date}</p>
                              {activity.points && (
                                <p className="text-green-400 text-xs">+{activity.points} điểm</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-white/60 text-sm">
                      Chưa có hoạt động nào. Hãy bắt đầu khám phá!
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* SkyQuest Integration Section */}
          <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 text-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2 flex items-center">
                  <Mountain className="w-8 h-8 mr-3" />
                  Sky Quest - Hành trình khám phá
                </h2>
                <p className="text-green-100">Tham gia các thử thách và nhận phần thưởng hấp dẫn</p>
              </div>
              <Trophy className="w-12 h-12 text-yellow-300" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <Target className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-green-100">Thử thách hoàn thành</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">2,450</div>
                <div className="text-sm text-green-100">Điểm tích lũy</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <Award className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm text-green-100">Huy hiệu đạt được</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => navigate('/sky-quest/challenges')}
                className="flex-1 bg-white text-green-600 hover:bg-green-50 font-semibold py-3"
              >
                <Target className="w-5 h-5 mr-2" />
                Xem thử thách mới
              </Button>
              <Button 
                onClick={() => navigate('/sky-quest/rewards')}
                variant="outline" 
                className="flex-1 border-white text-white hover:bg-white/10 font-semibold py-3"
              >
                <Gift className="w-5 h-5 mr-2" />
                Đổi phần thưởng
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </Layout>
  );
};

export default ReturningUserDashboard;