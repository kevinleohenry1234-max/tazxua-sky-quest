import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Star, Trophy, Target, Zap, TreePine, Users, BookOpen, Heart, Compass, Award, TrendingUp } from 'lucide-react';
import QuestCard from '@/components/QuestCard';
import { hangsayQuests } from '@/data/questsData';

const SkyQuestHangSay = () => {
  const navigate = useNavigate();
  const [completedQuests, setCompletedQuests] = useState<string[]>([]);

  const handleStartQuest = (questId: string) => {
    // Placeholder for quest start logic
    console.log(`Starting quest: ${questId}`);
    // In the future, this will open a modal or navigate to quest details
  };

  const impactAreas = [
    {
      icon: <TreePine className="w-6 h-6" />,
      title: "Bảo vệ môi trường",
      description: "Trồng cây, dọn rác, bảo tồn thiên nhiên",
      color: "text-green-600 bg-green-50"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Phát triển cộng đồng",
      description: "Hỗ trợ giáo dục, xây dựng cơ sở hạ tầng",
      color: "text-blue-600 bg-blue-50"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Chia sẻ kiến thức",
      description: "Workshop, hướng dẫn, truyền đạt kinh nghiệm",
      color: "text-purple-600 bg-purple-50"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Bảo tồn văn hóa",
      description: "Gìn giữ truyền thống, hỗ trợ nghệ nhân",
      color: "text-red-600 bg-red-50"
    }
  ];

  const journeySteps = [
    {
      step: 1,
      title: "Đăng ký thử thách",
      description: "Chọn thử thách phù hợp với khả năng và sở thích của bạn",
      time: "5 phút",
      image: "/images/skyquest/hangsay-step1.jpg" // Placeholder
    },
    {
      step: 2,
      title: "Thực hiện nhiệm vụ",
      description: "Hoàn thành thử thách với sự hỗ trợ từ cộng đồng địa phương",
      time: "1-5 giờ",
      image: "/images/skyquest/hangsay-step2.jpg" // Placeholder
    },
    {
      step: 3,
      title: "Xác nhận hoàn thành",
      description: "Upload ảnh, video hoặc xác nhận GPS để chứng minh hoàn thành",
      time: "10 phút",
      image: "/images/skyquest/hangsay-step3.jpg" // Placeholder
    },
    {
      step: 4,
      title: "Nhận điểm thưởng",
      description: "Tích lũy điểm và leo rank để mở khóa phần thưởng hấp dẫn",
      time: "Ngay lập tức",
      image: "/images/skyquest/hangsay-step4.jpg" // Placeholder
    }
  ];



  const leaderboard = [
    { rank: 1, name: "Nguyễn Văn A", points: 2500, level: "Đại sứ Sky Quest", avatar: "🏆" },
    { rank: 2, name: "Trần Thị B", points: 1800, level: "Nhà thám hiểm", avatar: "🥈" },
    { rank: 3, name: "Lê Văn C", points: 1200, level: "Nhà thám hiểm", avatar: "🥉" },
    { rank: 4, name: "Phạm Thị D", points: 950, level: "Người cống hiến", avatar: "⭐" },
    { rank: 5, name: "Hoàng Văn E", points: 720, level: "Người cống hiến", avatar: "⭐" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] bg-gradient-to-r from-orange-600 to-red-700 overflow-hidden">
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 bg-black/20">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          {/* Placeholder for background image */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/30 to-red-600/30" />
        </div>
        
        {/* Dynamic Particles */}
        <div className="absolute top-16 left-16 w-4 h-4 bg-yellow-400 rounded-full animate-ping" />
        <div className="absolute top-32 right-24 w-6 h-6 bg-orange-400 rounded-full animate-bounce" />
        <div className="absolute bottom-40 left-1/3 w-3 h-3 bg-red-400 rounded-full animate-pulse" />
        <div className="absolute top-24 left-1/2 w-5 h-5 bg-yellow-300 rounded-full animate-ping" style={{ animationDelay: '1s' }} />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <Button
              variant="ghost"
              onClick={() => navigate('/skyquest')}
              className="text-white hover:bg-white/20 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại Sky Quest
            </Button>
            
            <h1 className="text-5xl font-bold mb-4 leading-tight">
              Hăng Say Săn Thưởng
            </h1>
            <p className="text-xl mb-6 text-orange-100">
              Chinh phục thử thách, tạo tác động tích cực, đổi phần thưởng hấp dẫn
            </p>
            <Button 
              size="lg"
              className="bg-white text-orange-600 hover:bg-orange-50 font-semibold px-8 py-3"
              onClick={() => document.getElementById('journey-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Zap className="w-4 h-4 mr-2" />
              Bắt đầu thử thách
            </Button>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Dành cho những người muốn tạo tác động
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Chế độ "Hăng Say Săn Thưởng" được thiết kế cho những du khách năng động, 
            muốn đóng góp tích cực cho cộng đồng địa phương và môi trường. Mỗi thử thách 
            bạn hoàn thành không chỉ mang lại điểm thưởng mà còn tạo ra giá trị thực tế cho Tà Xùa.
          </p>

          {/* Impact Areas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {impactAreas.map((area, index) => (
              <div key={index} className="text-center">
                <div className={`${area.color} mb-3 flex justify-center w-16 h-16 rounded-full items-center mx-auto`}>
                  {area.icon}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{area.title}</h3>
                <p className="text-xs text-gray-600">{area.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Journey Process */}
        <div id="journey-section" className="max-w-5xl mx-auto mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Quy trình tham gia
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {journeySteps.map((step, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 bg-gradient-to-br from-orange-100 to-red-100">
                  {/* Placeholder for step image */}
                  <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
                    {step.step === 1 && '📝'}
                    {step.step === 2 && '💪'}
                    {step.step === 3 && '📸'}
                    {step.step === 4 && '🎁'}
                  </div>
                  <div className="absolute top-4 left-4 bg-white/90 rounded-full w-8 h-8 flex items-center justify-center">
                    <span className="text-orange-600 font-bold text-sm">{step.step}</span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{step.time}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quest List */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Danh sách thử thách
            </h3>
            <p className="text-lg text-gray-600">
              Chọn thử thách phù hợp và bắt đầu tạo tác động tích cực
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hangsayQuests.map((quest) => (
              <QuestCard
                key={quest.id}
                quest={quest}
                onStart={handleStartQuest}
                isCompleted={completedQuests.includes(quest.id)}
              />
            ))}
          </div>
        </div>

        {/* Leaderboard Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Bảng xếp hạng
          </h3>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">
                <div className="flex items-center justify-center space-x-2">
                  <Trophy className="w-6 h-6" />
                  <h4 className="text-xl font-bold">Top Contributors</h4>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {leaderboard.map((user, index) => (
                  <div key={index} className="p-4 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{user.avatar}</div>
                      <div>
                        <div className="font-semibold text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-600">{user.level}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-orange-600">{user.points} điểm</div>
                      <div className="text-sm text-gray-500">#{user.rank}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {hangsayQuests.length}
                </div>
                <div className="text-gray-600">Thử thách</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {hangsayQuests.reduce((sum, quest) => sum + quest.point, 0)}
                </div>
                <div className="text-gray-600">Tổng điểm</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {completedQuests.length}
                </div>
                <div className="text-gray-600">Đã hoàn thành</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {leaderboard.length}
                </div>
                <div className="text-gray-600">Người tham gia</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Footer */}
        <div className="text-center bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Sẵn sàng tạo tác động?
          </h3>
          <p className="text-gray-600 mb-6">
            Tham gia ngay để chinh phục thử thách và nhận phần thưởng xứng đáng
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate('/skyquest')}
              variant="outline"
              className="border-orange-600 text-orange-600 hover:bg-orange-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại Sky Quest
            </Button>
            <Button 
              size="lg"
              onClick={() => navigate('/skyquest/rewards')}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <Award className="w-4 h-4 mr-2" />
              Xem phần thưởng
            </Button>
          </div>
        </div>
      </div>


    </div>
  );
};

export default SkyQuestHangSay;