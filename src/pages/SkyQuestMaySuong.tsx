import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Star, MapPin, Camera, Coffee, Mountain, Leaf, Users, CheckCircle } from 'lucide-react';
import QuestCard from '@/components/QuestCard';
import { maysuongQuests } from '@/data/questsData';

const SkyQuestMaySuong = () => {
  const navigate = useNavigate();
  const [completedQuests, setCompletedQuests] = useState<string[]>([]);

  const handleStartQuest = (questId: string) => {
    // Placeholder for quest start logic
    console.log(`Starting quest: ${questId}`);
    // In the future, this will open a modal or navigate to quest details
  };

  const suggestedActivities = [
    {
      icon: Coffee,
      title: 'Workshop trà Shan Tuyết',
      description: 'Tìm hiểu quy trình làm trà từ người H\'Mông',
      duration: '2 giờ',
      points: 100,
      difficulty: 'Dễ'
    },
    {
      icon: Camera,
      title: 'Chụp ảnh bình minh',
      description: 'Ngắm và ghi lại khoảnh khắc bình minh trên đỉnh núi',
      duration: '3 giờ',
      points: 150,
      difficulty: 'Dễ'
    },
    {
      icon: Heart,
      title: 'Thư giãn tại homestay',
      description: 'Tận hưởng không gian yên tĩnh và ẩm thực địa phương',
      duration: '4 giờ',
      points: 80,
      difficulty: 'Dễ'
    },
    {
      icon: Leaf,
      title: 'Đi bộ nhẹ ngắm cảnh',
      description: 'Khám phá những con đường mòn xinh đẹp',
      duration: '2 giờ',
      points: 120,
      difficulty: 'Dễ'
    }
  ];

  const itinerary = [
    {
      time: '05:30',
      activity: 'Khởi hành ngắm bình minh',
      description: 'Đi bộ nhẹ nhàng lên đỉnh để đón bình minh'
    },
    {
      time: '07:00',
      activity: 'Ăn sáng tại homestay',
      description: 'Thưởng thức món ăn truyền thống H\'Mông'
    },
    {
      time: '09:00',
      activity: 'Workshop trà Shan Tuyết',
      description: 'Học cách pha và thưởng thức trà đặc sản'
    },
    {
      time: '11:30',
      activity: 'Thư giãn và chụp ảnh',
      description: 'Tự do khám phá và ghi lại kỷ niệm'
    },
    {
      time: '14:00',
      activity: 'Ăn trưa và nghỉ ngơi',
      description: 'Thưởng thức ẩm thực địa phương'
    },
    {
      time: '16:00',
      activity: 'Đi bộ nhẹ ngắm cảnh',
      description: 'Khám phá những con đường mòn xinh đẹp'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/skyquest/maysuong-hero.jpg')",
            filter: 'brightness(0.8) contrast(1.1)'
          }}
        />
        
        {/* Gentle overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-400/30 via-cyan-300/20 to-blue-500/40" />
        
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-3 h-3 bg-white/30 rounded-full animate-pulse" />
          <div className="absolute top-40 right-20 w-2 h-2 bg-cyan-200/40 rounded-full animate-pulse animation-delay-1000" />
          <div className="absolute bottom-40 left-1/4 w-4 h-4 bg-blue-200/30 rounded-full animate-pulse animation-delay-2000" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="mb-8">
            <Coffee className="w-20 h-20 text-white mx-auto mb-6 drop-shadow-lg" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent drop-shadow-2xl">
              Mây Mây Sương Sương
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed font-light mb-8">
            Hành trình thư giãn, tận hưởng từng khoảnh khắc yên bình tại Tà Xùa
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/skyquest/quests?mode=maysuong')}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Bắt đầu hành trình
            </button>
            <button
              onClick={() => navigate('/skyquest')}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-medium py-4 px-8 rounded-2xl text-lg transition-all duration-300 border border-white/30"
            >
              Quay lại
            </button>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              Dành cho những ai yêu thích sự yên bình
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Chế độ "Mây Mây Sương Sương" được thiết kế cho những du khách muốn tận hưởng vẻ đẹp thiên nhiên 
              một cách nhẹ nhàng, thư giãn. Bạn sẽ khám phá Tà Xùa qua những hoạt động dễ chịu, 
              không vội vã, tập trung vào việc thưởng ngoạn và trải nghiệm văn hóa địa phương.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Thư giãn</h3>
              <p className="text-slate-600">Không vội vã, tận hưởng từng khoảnh khắc</p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Khám phá</h3>
              <p className="text-slate-600">Những địa điểm đẹp và dễ tiếp cận</p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Coffee className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Trải nghiệm</h3>
              <p className="text-slate-600">Văn hóa và ẩm thực địa phương</p>
            </div>
          </div>
        </div>
      </section>

      {/* Suggested Activities */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-cyan-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              Hoạt động gợi ý cho bạn
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Những trải nghiệm nhẹ nhàng, phù hợp với nhịp sống thư thái
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {suggestedActivities.map((activity, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-xl flex items-center justify-center flex-shrink-0">
                    <activity.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{activity.title}</h3>
                    <p className="text-slate-600 mb-4">{activity.description}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{activity.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        <span>{activity.points} điểm</span>
                      </div>
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                        {activity.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Itinerary */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-cyan-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              Lịch trình gợi ý một ngày
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Một ngày thư giãn và trọn vẹn tại Tà Xùa
            </p>
          </div>

          <div className="space-y-6">
            {itinerary.map((item, index) => (
              <div key={index} className="flex items-start gap-6 bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">{item.time}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{item.activity}</h3>
                  <p className="text-slate-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-cyan-500 to-blue-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Sẵn sàng cho hành trình thư giãn?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Hãy để Tà Xùa chữa lành tâm hồn bạn với những trải nghiệm nhẹ nhàng và ý nghĩa
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/skyquest/quests?mode=maysuong')}
              className="bg-white hover:bg-gray-100 text-cyan-600 font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Bắt đầu hành trình
              <ArrowRight className="w-5 h-5 inline-block ml-2" />
            </button>
            <button
              onClick={() => navigate('/skyquest/hangsay')}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-medium py-4 px-8 rounded-2xl text-lg transition-all duration-300 border border-white/30"
            >
              Thử chế độ Hăng Say
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SkyQuestMaySuong;