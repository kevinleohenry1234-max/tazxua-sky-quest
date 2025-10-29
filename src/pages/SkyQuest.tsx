import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Camera, CheckCircle, Users, Shield, Clock } from 'lucide-react';
import EmeraldDiamond3D from '../components/SkyQuest/EmeraldDiamond3D';
import InteractiveTabs from '../components/SkyQuest/InteractiveTabs';
import CompactDashboard from '../components/SkyQuest/CompactDashboard';
import ProgressTracker from '../components/SkyQuest/ProgressTracker';
import { FadeInOnScroll, ScaleInOnScroll } from '../components/SkyQuest/ScrollAnimations';

const SkyQuest: React.FC = () => {
  const navigate = useNavigate();
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setParallaxY(window.scrollY * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStartJourney = () => {
    navigate('/skyquest/quests');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Compacted to 65-75% height */}
      <section className="relative h-[65vh] md:h-[70vh] lg:h-[75vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/hero/taxua-sunrise.jpg')",
            transform: `translateY(${parallaxY * 0.3}px)`,
            filter: 'brightness(0.7) contrast(1.1)'
          }}
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-transparent to-emerald-900/30" />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40" />
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-2 h-2 bg-white/30 rounded-full animate-pulse" />
          <div className="absolute top-40 right-20 w-1 h-1 bg-emerald-300/40 rounded-full animate-pulse animation-delay-1000" />
          <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-blue-300/20 rounded-full animate-pulse animation-delay-2000" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          {/* 3D Emerald Diamond */}
          <div className="mb-4 md:mb-6 flex justify-center animate-fadeInUp">
            <div className="relative">
              <EmeraldDiamond3D 
                className="drop-shadow-2xl"
              />
            </div>
          </div>
          
          {/* Updated Headlines */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 leading-tight animate-fadeInUp animation-delay-200">
            <span className="bg-gradient-to-r from-white via-emerald-100 to-blue-100 bg-clip-text text-transparent drop-shadow-2xl">
              Sky Quest – Hành trình du lịch bền vững có thưởng đầu tiên tại Việt Nam
            </span>
          </h1>
          
          {/* Updated Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed font-light animate-fadeInUp animation-delay-400">
            Khám phá – Tạo tác động – Nhận phần thưởng thực sự
          </p>

          {/* Updated CTA Button */}
          <div className="animate-fadeInUp animation-delay-600">
            <button 
              onClick={handleStartJourney}
              className="group relative px-6 sm:px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold rounded-full text-lg md:text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:from-emerald-500 hover:to-blue-500"
            >
              <span className="flex items-center gap-2 md:gap-3">
                Bắt đầu Sky Quest
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Tabs Section - Replaces multiple introduction sections */}
      <FadeInOnScroll>
        <InteractiveTabs />
      </FadeInOnScroll>

      {/* Compact Dashboard Section */}
      <FadeInOnScroll delay={200}>
        <CompactDashboard />
      </FadeInOnScroll>

      {/* Progress Tracker Section - Replaces rewards system */}
      <FadeInOnScroll delay={400}>
        <ProgressTracker />
      </FadeInOnScroll>

      {/* Simplified Verification System Section */}
      <FadeInOnScroll delay={600}>
        <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4 md:mb-6">
                Hệ Thống Xác Minh
              </h2>
            </div>

            {/* 4-Grid Layout */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
              <ScaleInOnScroll delay={100}>
                <div className="text-center p-4 md:p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Ảnh định vị</h3>
                  <p className="text-sm text-slate-600">Auto geotag xác minh vị trí thực</p>
                </div>
              </ScaleInOnScroll>

              <ScaleInOnScroll delay={200}>
                <div className="text-center p-4 md:p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Mã đối tác</h3>
                  <p className="text-sm text-slate-600">Check-in code từ homestay & tour</p>
                </div>
              </ScaleInOnScroll>

              <ScaleInOnScroll delay={300}>
                <div className="text-center p-4 md:p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Peer verification</h3>
                  <p className="text-sm text-slate-600">Xác nhận từ cộng đồng</p>
                </div>
              </ScaleInOnScroll>

              <ScaleInOnScroll delay={400}>
                <div className="text-center p-4 md:p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Admin review</h3>
                  <p className="text-sm text-slate-600">Nhiệm vụ từ 200+ điểm</p>
                </div>
              </ScaleInOnScroll>
            </div>

            {/* Processing Time Info */}
            <FadeInOnScroll delay={500}>
              <div className="text-center">
                <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-emerald-50 rounded-full border border-emerald-200">
                  <Clock className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
                  <span className="text-sm md:text-base text-emerald-800 font-medium">
                    90% nhiệm vụ được duyệt trong 24h, tối đa 72h
                  </span>
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </section>
      </FadeInOnScroll>

      {/* Updated Final CTA Section */}
      <FadeInOnScroll delay={800}>
        <section className="relative py-16 md:py-20 lg:py-24 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900" />
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
            style={{
              backgroundImage: "url('/images/hero/taxua-sunset.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />

          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8 leading-tight">
              Tà Xùa đang chờ bạn để tạo nên thay đổi tích cực
            </h2>
            
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
              Khám phá thiên nhiên – Góp phần bảo tồn – Tích điểm nhận quà
            </p>

            <div>
              <button 
                onClick={handleStartJourney}
                className="group relative px-8 md:px-12 py-4 md:py-6 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-bold rounded-full text-lg md:text-xl lg:text-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:from-emerald-500 hover:to-blue-500"
              >
                <span className="flex items-center gap-3 md:gap-4">
                  Bắt đầu Sky Quest hôm nay
                  <ArrowRight className="w-6 h-6 md:w-7 md:h-7 group-hover:translate-x-2 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        </section>
      </FadeInOnScroll>
    </div>
  );
};

export default SkyQuest;