import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  MapPin, 
  Clock, 
  Users, 
  Mountain, 
  Camera, 
  Heart,
  ArrowRight,
  Play,
  BookOpen,
  Compass
} from 'lucide-react';

const FirstTimeVisitor = () => {
  const navigate = useNavigate();
  const [selectedInterest, setSelectedInterest] = useState<string>('');

  const interests = [
    {
      id: 'nature',
      title: 'Thiên nhiên & Phong cảnh',
      description: 'Khám phá vẻ đẹp hoang sơ của núi rừng Tà Xùa',
      icon: Mountain,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'culture',
      title: 'Văn hóa & Con người',
      description: 'Tìm hiểu về đời sống và truyền thống H\'Mông',
      icon: Users,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'adventure',
      title: 'Phiêu lưu & Thể thao',
      description: 'Trekking, leo núi và các hoạt động mạo hiểm',
      icon: Compass,
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 'photography',
      title: 'Nhiếp ảnh & Sáng tạo',
      description: 'Săn mây, chụp ảnh và sáng tạo nội dung',
      icon: Camera,
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const handleInterestSelect = (interestId: string) => {
    setSelectedInterest(interestId);
  };

  const handleContinue = () => {
    if (selectedInterest) {
      // Lưu sở thích vào localStorage hoặc context
      localStorage.setItem('userInterest', selectedInterest);
      navigate('/learning-path');
    }
  };

  const handleWatchVideo = () => {
    navigate('/?video=intro');
  };

  return (
    <Layout>
      <div className="min-h-screen pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Chào mừng đến với Tà Xùa! 🌄
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Hãy để chúng tôi giúp bạn khám phá vùng đất kỳ diệu này theo cách phù hợp nhất với sở thích của bạn.
            </p>
            
            {/* Video Introduction */}
            <Button
              onClick={handleWatchVideo}
              className="mb-12 bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
              size="lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Xem video giới thiệu (2 phút)
            </Button>
          </div>

          {/* Interest Selection */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white text-center mb-8">
              Bạn quan tâm đến điều gì nhất?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {interests.map((interest) => {
                const IconComponent = interest.icon;
                const isSelected = selectedInterest === interest.id;
                
                return (
                  <Card
                    key={interest.id}
                    className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      isSelected 
                        ? 'ring-4 ring-white/50 bg-white/20 backdrop-blur-md' 
                        : 'bg-white/10 backdrop-blur-md hover:bg-white/20'
                    }`}
                    onClick={() => handleInterestSelect(interest.id)}
                  >
                    <CardHeader className="text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${interest.color} flex items-center justify-center`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-white text-lg">
                        {interest.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white/80 text-center">
                        {interest.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Continue Button */}
          <div className="text-center">
            <Button
              onClick={handleContinue}
              disabled={!selectedInterest}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 text-lg"
              size="lg"
            >
              Tiếp tục hành trình
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <p className="text-white/70 mt-4 text-sm">
              Bạn có thể thay đổi sở thích bất cứ lúc nào trong hành trình
            </p>
          </div>

          {/* Quick Actions */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6 text-center">
                <BookOpen className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Tìm hiểu thêm</h3>
                <p className="text-white/80 text-sm mb-4">
                  Đọc về lịch sử và văn hóa Tà Xùa
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-white/30 text-white hover:bg-white/20"
                  onClick={() => navigate('/about')}
                >
                  Khám phá
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6 text-center">
                <MapPin className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Xem bản đồ</h3>
                <p className="text-white/80 text-sm mb-4">
                  Khám phá các địa điểm nổi bật
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-white/30 text-white hover:bg-white/20"
                  onClick={() => navigate('/explore')}
                >
                  Xem ngay
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6 text-center">
                <Heart className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Sky Quest</h3>
                <p className="text-white/80 text-sm mb-4">
                  Trải nghiệm gamification độc đáo
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-white/30 text-white hover:bg-white/20"
                  onClick={() => navigate('/sky-quest/journey')}
                >
                  Tham gia
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </Layout>
  );
};

export default FirstTimeVisitor;