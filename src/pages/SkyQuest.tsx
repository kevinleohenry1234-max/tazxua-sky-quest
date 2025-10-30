import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Camera, CheckCircle, Users, Shield, Clock, Coffee, Mountain, Sparkles, Heart } from 'lucide-react';
import EmeraldDiamond3D from '../components/SkyQuest/EmeraldDiamond3D';

const SkyQuest: React.FC = () => {
  const navigate = useNavigate();
  const [parallaxY, setParallaxY] = useState(0);
  const [activeTab, setActiveTab] = useState('what-is');
  const [liveCounter, setLiveCounter] = useState(247);

  useEffect(() => {
    const handleScroll = () => {
      setParallaxY(window.scrollY * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulate live counter updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCounter(prev => prev + Math.floor(Math.random() * 3));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleStartJourney = (track: 'calm' | 'energetic') => {
    navigate(`/skyquest/${track}`);
  };

  const tabs = [
    { id: 'what-is', title: 'Sky Quest là gì?' },
    { id: 'journey-types', title: 'Lựa chọn hành trình' },
    { id: 'points', title: 'Cách tích điểm' },
    { id: 'rewards', title: 'Phần thưởng' },
    { id: 'levels', title: 'Cấp độ' },
    { id: 'verification', title: 'Xác minh' }
  ];

  const tabContent = {
    'what-is': {
      title: 'Sky Quest - Hành trình du lịch bền vững có thưởng',
      content: 'Sky Quest là hệ thống gamification độc đáo giúp bạn khám phá Tà Xùa một cách có ý nghĩa. Thông qua các nhiệm vụ thú vị, bạn không chỉ trải nghiệm vẻ đẹp thiên nhiên mà còn góp phần bảo vệ môi trường và hỗ trợ cộng đồng địa phương.',
      features: [
        'Khám phá những địa điểm ẩn giấu',
        'Tham gia các hoạt động bảo vệ môi trường',
        'Học hỏi văn hóa H\'Mông địa phương',
        'Nhận phần thưởng thực sự từ đối tác'
      ]
    },
    'journey-types': {
      title: 'Hai phong cách trải nghiệm',
      content: 'Sky Quest cung cấp hai track phù hợp với mọi tính cách du lịch, mỗi track đều mang lại trải nghiệm độc đáo và ý nghĩa.',
      features: [
        'Mây Mây Sương Sương: Thư giãn, tận hưởng',
        'Hăng Say Săn Thưởng: Thử thách, tạo tác động',
        'Linh hoạt chuyển đổi giữa các track',
        'Phần thưởng phù hợp với từng phong cách'
      ]
    },
    'points': {
      title: 'Hệ thống tích điểm thông minh',
      content: 'Mỗi hành động tích cực của bạn đều được ghi nhận và thưởng điểm. Hệ thống AI sẽ xác minh tự động các hoạt động thông qua ảnh và vị trí.',
      features: [
        'Check-in tại điểm đến: 10-50 điểm',
        'Hoạt động bảo vệ môi trường: 100-300 điểm',
        'Tương tác văn hóa: 50-150 điểm',
        'Chia sẻ trải nghiệm: 20-80 điểm'
      ]
    },
    'rewards': {
      title: 'Phần thưởng thực sự từ đối tác',
      content: 'Điểm số của bạn có thể đổi lấy những phần thưởng có giá trị thực từ các đối tác địa phương và thương hiệu uy tín.',
      features: [
        'Voucher homestay và nhà hàng địa phương',
        'Sản phẩm thủ công H\'Mông authentic',
        'Tour trải nghiệm độc quyền',
        'Ưu đãi từ các thương hiệu bền vững'
      ]
    },
    'levels': {
      title: 'Hệ thống cấp độ tiến bộ',
      content: 'Từ Khám Phá Viên mới đến Đại Sứ Tà Xùa, mỗi cấp độ mở ra những đặc quyền và cơ hội mới.',
      features: [
        'Khám Phá Viên (0-500 điểm)',
        'Bảo Vệ Viên (501-1500 điểm)',
        'Truyền Cảm Hứng (1501-3000 điểm)',
        'Đại Sứ Tà Xùa (3000+ điểm)'
      ]
    },
    'verification': {
      title: 'Xác minh tự động bằng AI',
      content: 'Hệ thống AI tiên tiến giúp xác minh các hoạt động của bạn một cách nhanh chóng và chính xác thông qua ảnh và dữ liệu vị trí.',
      features: [
        'Nhận diện địa điểm qua ảnh',
        'Xác minh hoạt động môi trường',
        'Kiểm tra tương tác văn hóa',
        'Bảo mật thông tin cá nhân'
      ]
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Compact 65vh */}
      <section 
        className="relative h-[65vh] flex items-center justify-center overflow-hidden"
        role="banner"
        aria-label="Sky Quest - Hành trình du lịch bền vững có thưởng"
      >
        {/* Background with enhanced glow effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/skyquest/herosection.png')",
            transform: `translateY(${parallaxY * 0.3}px) scale(1.05)`,
            filter: 'brightness(0.7) contrast(1.2) saturate(1.2)',
            transition: 'transform 0.1s ease-out'
          }}
        />
        
        {/* Enhanced gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 via-emerald-800/40 to-blue-900/60" />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/60" />
        
        {/* Sparkle effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-2 h-2 bg-white/40 rounded-full animate-pulse" />
          <div className="absolute top-40 right-20 w-1 h-1 bg-emerald-300/50 rounded-full animate-pulse animation-delay-1000" />
          <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-blue-300/30 rounded-full animate-pulse animation-delay-2000" />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/60 rounded-full animate-pulse animation-delay-3000" />
        </div>

        {/* Hero Content - Perfectly centered */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          {/* Enhanced 3D Emerald Diamond with glow */}
          <div className="mb-8 flex justify-center animate-fadeInUp">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-400/30 rounded-full blur-3xl scale-150 animate-pulse" />
              <EmeraldDiamond3D 
                size={320} // Increased by 40% from base 230
                className="relative drop-shadow-2xl"
              />
            </div>
          </div>
          
          {/* Updated Headlines */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight animate-fadeInUp animation-delay-200">
            <span className="bg-gradient-to-r from-white via-emerald-100 to-blue-100 bg-clip-text text-transparent drop-shadow-2xl">
              Sky Quest – Hành trình du lịch bền vững có thưởng
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl sm:text-2xl md:text-3xl text-white/95 max-w-4xl mx-auto leading-relaxed font-light animate-fadeInUp animation-delay-400">
            Khám phá – Tạo tác động – Nhận phần thưởng thực sự
          </p>
        </div>
      </section>

      {/* Unified Information Tabs Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Live Counter */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              {liveCounter} người đang tham gia Sky Quest hôm nay
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-12 bg-white rounded-2xl p-2 shadow-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 text-sm md:text-base ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
                {tabContent[activeTab as keyof typeof tabContent].title}
              </h2>
              <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                {tabContent[activeTab as keyof typeof tabContent].content}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tabContent[activeTab as keyof typeof tabContent].features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                  <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-slate-700 leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Track Selection Section - Provocative Quiz */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
              Bạn muốn trải nghiệm du lịch bền vững theo cách nào?
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Chọn phong cách phù hợp với bạn để bắt đầu hành trình Sky Quest
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Mây Mây Sương Sương Track */}
            <div className="group bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-slate-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Coffee className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
                  Mây Mây Sương Sương
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  "Tôi thích những hoạt động nhẹ nhàng, tận hưởng từng khoảnh khắc"
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-blue-500" />
                  <span className="text-slate-700">Workshop trà Shan Tuyết</span>
                </div>
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-blue-500" />
                  <span className="text-slate-700">Đi bộ nhẹ ngắm cảnh</span>
                </div>
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-blue-500" />
                  <span className="text-slate-700">Thư giãn tại homestay</span>
                </div>
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-blue-500" />
                  <span className="text-slate-700">Học văn hóa H'Mông</span>
                </div>
              </div>

              <button 
                onClick={() => handleStartJourney('calm')}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-2xl text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group-hover:from-blue-400 group-hover:to-cyan-400"
              >
                Khám phá hành trình
              </button>
            </div>

            {/* Hăng Say Săn Thưởng Track */}
            <div className="group bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-slate-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Mountain className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
                  Hăng Say Săn Thưởng
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  "Tôi muốn thử thách bản thân và tạo tác động mạnh mẽ"
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-emerald-500" />
                  <span className="text-slate-700">Leo núi thử thách</span>
                </div>
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-emerald-500" />
                  <span className="text-slate-700">Hoạt động tình nguyện</span>
                </div>
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-emerald-500" />
                  <span className="text-slate-700">Trekking khám phá</span>
                </div>
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-emerald-500" />
                  <span className="text-slate-700">Dự án cộng đồng</span>
                </div>
              </div>

              <button 
                onClick={() => handleStartJourney('energetic')}
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold rounded-2xl text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group-hover:from-emerald-400 group-hover:to-green-400"
              >
                Khám phá hành trình
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quest Catalog Preview */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
              Khám phá các Quest đang chờ bạn
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Một số nhiệm vụ thú vị để bạn bắt đầu hành trình Sky Quest
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: 'Bình minh trên đỉnh Tà Xùa',
                points: 150,
                duration: '3 giờ',
                image: '/images/skyquest/quest-sunrise.jpg',
                difficulty: 'Dễ'
              },
              {
                title: 'Workshop trà Shan Tuyết',
                points: 100,
                duration: '2 giờ',
                image: '/images/skyquest/quest-tea.jpg',
                difficulty: 'Dễ'
              },
              {
                title: 'Dọn rác bảo vệ môi trường',
                points: 200,
                duration: '1 giờ',
                image: '/images/skyquest/quest-cleanup.jpg',
                difficulty: 'Trung bình'
              },
              {
                title: 'Học thêu H\'Mông truyền thống',
                points: 120,
                duration: '4 giờ',
                image: '/images/skyquest/quest-embroidery.jpg',
                difficulty: 'Trung bình'
              },
              {
                title: 'Trekking khám phá thác ẩn',
                points: 250,
                duration: '6 giờ',
                image: '/images/skyquest/quest-waterfall.jpg',
                difficulty: 'Khó'
              },
              {
                title: 'Trồng cây bản địa',
                points: 180,
                duration: '2 giờ',
                image: '/images/skyquest/quest-planting.jpg',
                difficulty: 'Dễ'
              }
            ].map((quest, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="h-48 bg-gradient-to-br from-emerald-400 to-blue-400 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between text-white text-sm">
                      <span className="bg-white/20 px-2 py-1 rounded-full">{quest.difficulty}</span>
                      <span className="bg-white/20 px-2 py-1 rounded-full">{quest.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{quest.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-600 font-bold">{quest.points} điểm</span>
                    <Clock className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-slate-600 mb-6">Còn 23 nhiệm vụ khác đang chờ bạn khám phá</p>
            <button className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-bold rounded-2xl hover:scale-105 transition-all duration-300">
              Xem tất cả Quest
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SkyQuest;