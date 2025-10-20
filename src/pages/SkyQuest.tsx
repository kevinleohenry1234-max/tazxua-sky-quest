import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { 
  Mountain, 
  Leaf, 
  Heart, 
  Trophy, 
  Gift, 
  Users, 
  ArrowRight, 
  Play, 
  Sparkles, 
  Target, 
  ChevronRight, 
  Cloud, 
  Zap,
  Star,
  Award,
  Camera,
  MapPin,
  Smile,
  TreePine,
  Compass,
  Quote
} from 'lucide-react';
import { questModes } from '@/data/skyquest-challenges';

const SkyQuest: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Load saved mode preference
  useEffect(() => {
    const savedMode = localStorage.getItem('skyquest_preferred_mode');
    if (savedMode) {
      setSelectedMode(savedMode);
    }
  }, []);

  const handleModeSelect = (modeId: string) => {
    setSelectedMode(modeId);
    localStorage.setItem('skyquest_preferred_mode', modeId);
    setShowPreview(true);
    
    // Navigate after animation
    setTimeout(() => {
      navigate(`/sky-quest/${modeId}`);
    }, 1500);
  };

  const testimonials = [
    {
      text: "Tôi chưa bao giờ nghĩ việc đi du lịch có thể khiến mình thấy gần thiên nhiên đến vậy",
      author: "Minh Anh",
      mode: "Mây Mây Sương Sương"
    },
    {
      text: "Mỗi thử thách đều giúp tôi đóng góp thật sự cho môi trường Tà Xùa",
      author: "Tuấn Khang", 
      mode: "Hăng Say Săn Thưởng"
    },
    {
      text: "Sky Quest đã biến chuyến đi thành một hành trình ý nghĩa và đáng nhớ",
      author: "Linh Chi",
      mode: "Mây Mây Sương Sương"
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const journeySteps = [
    { icon: <Camera className="w-4 h-4" />, label: "Bước 1" },
    { icon: <MapPin className="w-4 h-4" />, label: "Bước 2" },
    { icon: <Smile className="w-4 h-4" />, label: "Bước 3" },
    { icon: <TreePine className="w-4 h-4" />, label: "Bước 4" },
    { icon: <Trophy className="w-4 h-4" />, label: "Bước 5" }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 relative overflow-hidden">
        
        {/* 3D Background with Natural Gradient */}
        <div className="absolute inset-0">
          {/* Base 3D gradient mimicking Tà Xùa landscape */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-white/60 to-green-100/40" />
          
          {/* Overlay with blue-ivory tint */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-white/20 to-transparent" />
          
          {/* Light transition effect from top */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent" />
          
          {/* Subtle texture overlay */}
          <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1),transparent_70%)]" />
        </div>
        
        {/* Hero Section - Redesigned với nền panorama */}
        <section 
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: `
              linear-gradient(
                135deg, 
                rgba(249, 250, 251, 0.1) 0%, 
                rgba(255, 255, 255, 0.05) 40%, 
                rgba(224, 242, 254, 0.1) 60%, 
                rgba(59, 130, 246, 0.15) 100%
              ),
              url('/images/skyquest/hero-taxua-panorama.svg')
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
          }}
        >
          {/* Floating particles with natural animations */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 3) * 20}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${3 + i * 0.5}s`,
                }}
              />
            ))}
            
            {/* Light shimmer effects */}
            <div 
              className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full animate-light-shimmer"
              style={{ animationDelay: '1s' }}
            />
            <div 
              className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-tr from-skyquest-blue/20 to-transparent rounded-full animate-light-shimmer"
              style={{ animationDelay: '2.5s' }}
            />
          </div>

          {/* Main content with enhanced animations */}
          <div className="relative z-10 text-center px-4 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-inter tracking-tight">
              <span className="bg-gradient-to-r from-white via-skyquest-ivory to-white bg-clip-text text-transparent">
                Sky Quest
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-4 font-inter font-medium">
              Hành trình du lịch xanh tại Tà Xùa
            </p>
            <p className="text-lg text-skyquest-gray-blue mb-12 font-inter font-light max-w-2xl mx-auto">
              Mỗi chuyến đi – Một câu chuyện xanh của riêng bạn
            </p>
            
            <button 
              className="bg-gradient-to-r from-skyquest-green to-skyquest-green-light text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-scale-in font-inter"
              style={{ animationDelay: '0.5s' }}
            >
              Khám phá ngay
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Mode Selection - Enhanced */}
        <section id="mode-selection" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto px-4">
            {/* Section header */}
            <div className="text-center mb-16 animate-fade-in-up">
              <div 
                className="inline-block bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-lg border border-white/50 max-w-3xl mx-auto"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,249,255,0.8) 100%)'
                }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'Inter, Poppins, sans-serif' }}>
                  Chọn phong cách trải nghiệm của bạn
                </h2>
                <p className="text-lg text-slate-600 font-light leading-relaxed">
                  Cả hai mode đều chia sẻ hệ thống điểm thưởng và tiến trình, nhưng mang đến cảm xúc và trải nghiệm khác nhau.
                </p>
              </div>
            </div>

            {/* Mode Cards with enhanced styling */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* Mây Mây Sương Sương Card */}
              <div 
                className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 group cursor-pointer animate-fade-in-up"
                style={{ 
                  backgroundImage: `url('/images/skyquest/calm-mist-mountains.svg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  minHeight: '400px',
                  animationDelay: '0.2s'
                }}
                onClick={() => setSelectedMode('calm')}
              >
                {/* Enhanced gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-skyquest-blue/20 to-transparent group-hover:from-skyquest-blue/30 group-hover:via-skyquest-blue/40 transition-all duration-500" />
                
                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-16 h-16 bg-skyquest-blue/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-skyquest-blue/30 transition-all duration-300">
                      <Cloud className="w-8 h-8 text-skyquest-blue" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 font-inter">Mây Mây Sương Sương</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed font-inter">
                      Trải nghiệm thư giãn giữa biển mây bồng bềnh, cảm nhận sự yên bình của núi rừng Tà Xùa trong không gian tĩnh lặng.
                    </p>
                  </div>
                  
                  <button className="bg-gradient-to-r from-skyquest-blue to-skyquest-blue-light text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 font-inter">
                    Khám phá mode này
                  </button>
                </div>
              </div>

              {/* Hăng Say Săn Thưởng Card */}
              <div 
                className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 group cursor-pointer animate-fade-in-up"
                style={{ 
                  backgroundImage: `url('/images/skyquest/energetic-forest-trail.svg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  minHeight: '400px',
                  animationDelay: '0.4s'
                }}
                onClick={() => setSelectedMode('energetic')}
              >
                {/* Enhanced gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-skyquest-green/20 to-transparent group-hover:from-skyquest-green/30 group-hover:via-skyquest-green/40 group-hover:brightness-110 transition-all duration-500" />
                
                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-16 h-16 bg-skyquest-green/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-skyquest-green/30 group-hover:shadow-lg transition-all duration-300">
                      <Zap className="w-8 h-8 text-skyquest-green" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 font-inter">Hăng Say Săn Thưởng</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed font-inter">
                      Thử thách bản thân với những hoạt động phiêu lưu, khám phá vẻ đẹp hoang sơ và chinh phục đỉnh cao Tà Xùa.
                    </p>
                  </div>
                  
                  <button className="bg-gradient-to-r from-skyquest-green to-skyquest-green-light text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 group-hover:shadow-skyquest-green/30 font-inter">
                    Khám phá mode này
                  </button>
                </div>
              </div>
            </div>

            {/* Journey Structure - Enhanced */}
            <div className="text-center mb-20 animate-slideInUp">
              <h3 className="font-['Inter'] text-3xl font-bold text-slate-800 mb-12 tracking-tight">Cấu Trúc Hành Trình</h3>
              
              {/* Journey Path */}
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between relative">
                  {/* Enhanced Curved Path SVG */}
                  <svg className="absolute inset-0 w-full h-20" viewBox="0 0 500 80" fill="none">
                    <path 
                      d="M25 40 Q125 20 250 40 T475 40" 
                      stroke="url(#enhancedGradient)" 
                      strokeWidth="4" 
                      fill="none"
                      className="animate-draw-path"
                    />
                    <defs>
                      <linearGradient id="enhancedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#16A34A" />
                        <stop offset="25%" stopColor="#3B82F6" />
                        <stop offset="50%" stopColor="#8B5CF6" />
                        <stop offset="75%" stopColor="#F59E0B" />
                        <stop offset="100%" stopColor="#EF4444" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Journey Steps */}
                  {journeySteps.map((step, index) => (
                    <div key={index} className="relative z-10 flex flex-col items-center group">
                      <div className="w-16 h-16 bg-white border-4 border-green-400 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300 group-hover:border-blue-500 group-hover:shadow-2xl">
                        {step.icon}
                      </div>
                      <span className="font-['Inter'] text-sm text-slate-600 mt-3 font-medium group-hover:text-slate-800 transition-colors">{step.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <p className="font-['Inter'] text-slate-600 mt-8 max-w-2xl mx-auto leading-relaxed">
                Mỗi bước trong hành trình đều mang ý nghĩa riêng, dẫn dắt bạn khám phá vẻ đẹp Tà Xùa theo cách của riêng mình.
              </p>
            </div>
          </div>
        </section>

        {/* Sky Quest System Section with enhanced styling */}
        <section className="py-24 px-4 relative">
          {/* Light Blue Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-indigo-50/60 to-blue-100/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/30" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="bg-gradient-to-br from-skyquest-ivory to-skyquest-blue-light/10 rounded-3xl p-8 md:p-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-inter">
                  Hệ thống Sky Quest
                </h2>
                <p className="text-lg text-skyquest-gray-blue max-w-3xl mx-auto font-inter">
                  Trải nghiệm du lịch thông minh với công nghệ tiên tiến, mang đến những khoảnh khắc đáng nhớ tại Tà Xùa
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: MapPin,
                    title: "Định vị thông minh",
                    description: "Hệ thống GPS tích hợp giúp bạn khám phá mọi ngóc ngách của Tà Xùa một cách an toàn và hiệu quả.",
                    color: "skyquest-blue"
                  },
                  {
                    icon: Camera,
                    title: "Ghi lại khoảnh khắc",
                    description: "Công nghệ AR/VR giúp lưu giữ và chia sẻ những trải nghiệm tuyệt vời của bạn tại thiên đường mây.",
                    color: "skyquest-green"
                  },
                  {
                    icon: Users,
                    title: "Kết nối cộng đồng",
                    description: "Tham gia cộng đồng du lịch xanh, chia sẻ kinh nghiệm và kết nối với những người cùng đam mê.",
                    color: "skyquest-blue"
                  }
                ].map((feature, index) => (
                  <div 
                    key={index} 
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-scale-in"
                    style={{ animationDelay: `${0.8 + index * 0.2}s` }}
                  >
                    <div className={`w-12 h-12 bg-${feature.color}/10 rounded-xl flex items-center justify-center mb-4`}>
                      <feature.icon className={`w-6 h-6 text-${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 font-inter">{feature.title}</h3>
                    <p className="text-skyquest-gray-blue leading-relaxed font-inter">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Inspiration Corner - Enhanced */}
        <section className="py-24 px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-slideInUp">
              <h2 className="font-['Inter'] text-4xl md:text-5xl font-bold text-slate-800 mb-8 tracking-tight">
                Góc Cảm Hứng Sky Quest
              </h2>
              <p className="font-['Inter'] text-xl text-slate-600 leading-relaxed">
                Những chia sẻ chân thật từ cộng đồng Sky Quest
              </p>
            </div>

            {/* Enhanced Testimonial Slider */}
            <div className="relative animate-slideInUp">
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-12 md:p-16 shadow-2xl border border-white/50">
                <div className="text-center">
                  <Quote className="w-16 h-16 text-green-400 mx-auto mb-8" />
                  
                  <blockquote className="font-['Inter'] text-2xl md:text-3xl text-slate-700 font-medium leading-relaxed mb-10 tracking-wide">
                    "{testimonials[currentTestimonial].text}"
                  </blockquote>
                  
                  <div className="flex items-center justify-center space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-['Inter'] font-bold text-slate-800 text-lg">
                        {testimonials[currentTestimonial].author}
                      </p>
                      <p className="font-['Inter'] text-slate-500 text-base">
                        {testimonials[currentTestimonial].mode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Testimonial Indicators */}
              <div className="flex justify-center mt-8 space-x-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      index === currentTestimonial 
                        ? 'bg-gradient-to-r from-green-500 to-blue-500 scale-125' 
                        : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Transition Animation Overlay */}
        {showPreview && (
          <div className="fixed inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-lg z-50 flex items-center justify-center">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-12 shadow-2xl text-center animate-fadeInScale border border-white/50">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-spin-gentle shadow-xl">
                <Play className="w-12 h-12 text-white" />
              </div>
              <h3 className="font-['Inter'] text-3xl font-bold text-slate-800 mb-4 tracking-tight">
                Đang khởi động hành trình...
              </h3>
              <p className="font-['Inter'] text-slate-600 text-lg">
                Chuẩn bị cho trải nghiệm {selectedMode === 'calm' ? 'Mây Mây Sương Sương' : 'Hăng Say Săn Thưởng'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced CSS Animations with ViViet Style */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(2deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(-2deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(1deg); }
        }
        
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes draw-path {
          from {
            stroke-dasharray: 1200;
            stroke-dashoffset: 1200;
          }
          to {
            stroke-dasharray: 1200;
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes pulse-gentle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.02); }
        }
        
        @keyframes spin-gentle {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 8s ease-in-out infinite;
        }
        
        .animate-float-fast {
          animation: float-fast 6s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out both;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 1.2s ease-out;
        }
        
        .animate-slideInUp {
          animation: slideInUp 1s ease-out;
        }
        
        .animate-fadeInScale {
          animation: fadeInScale 0.6s ease-out;
        }
        
        .animate-draw-path {
          animation: draw-path 4s ease-in-out infinite;
        }
        
        .animate-pulse-gentle {
          animation: pulse-gentle 3s ease-in-out infinite;
        }
        
        .animate-spin-gentle {
          animation: spin-gentle 4s linear infinite;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
        
        /* Scroll-triggered animations */
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }
        
        .animate-on-scroll.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Enhanced hover effects */
        .hover-lift {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </Layout>
  );
};

export default SkyQuest;