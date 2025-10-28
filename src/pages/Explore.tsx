import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Mountain, UtensilsCrossed, Palette, Users, ArrowRight, Sparkles } from 'lucide-react';
import LazyImage from '@/components/LazyImage';
import { useNavigate } from 'react-router-dom';
import { useScrollAnimation, animationClasses } from '@/hooks/useScrollAnimation';
import { useParallax } from '@/hooks/useParallax';
import ActivitiesSection from '@/components/ActivitiesSection';

const Explore = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  // Parallax effect for hero background
  const parallaxOffset = useParallax(-0.3);

  // Scroll animations for different sections
  const heroAnimation = useScrollAnimation({ threshold: 0.2 });
  const sectionsAnimation = useScrollAnimation({ threshold: 0.1 });

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Dữ liệu cho 4 khối nội dung chính
  const exploreBlocks = [
    {
      id: 'locations',
      title: 'Địa Điểm',
      subtitle: 'Khám phá những điểm đến tuyệt vời',
      description: 'Từ đỉnh núi hùng vĩ đến những bản làng yên bình, khám phá vẻ đẹp nguyên sơ của Tà Xùa với những địa điểm được xác thực bởi cộng đồng.',
      image: '/images/explore/DESTINATION.png',
      fallbackImage: '/hero-taxua-clouds.jpg',
      icon: <Mountain className="w-8 h-8" />,
      route: '/attractions',
      gradient: 'from-emerald-600 to-teal-700',
      highlights: ['Đỉnh Tà Xùa', 'Sống lưng khủng long', 'Bản Phình Hồ', 'Rừng thông nguyên sinh']
    },
    {
      id: 'cuisine',
      title: 'Ẩm Thực',
      subtitle: 'Trải nghiệm hương vị Tây Bắc',
      description: 'Thưởng thức những món ăn truyền thống H\'Mông, trà Shan Tuyết thơm ngon và không gian ẩm thực đặc trưng giữa núi rừng Tà Xùa.',
      image: '/images/explore/CUISINE.png',
      fallbackImage: '/images/categories/restaurant-cover.jpg',
      icon: <UtensilsCrossed className="w-8 h-8" />,
      route: '/accommodation',
      gradient: 'from-orange-600 to-red-700',
      highlights: ['Thịt trâu gác bếp', 'Trà Shan Tuyết', 'Cơm lam', 'Rượu cần H\'Mông']
    },
    {
      id: 'culture',
      title: 'Văn Hoá',
      subtitle: 'Nghệ thuật và trải nghiệm sáng tạo',
      description: 'Khám phá văn hóa bản địa qua triển lãm số, công nghệ AR/VR, âm thanh tự nhiên và những câu chuyện qua hình ảnh độc đáo.',
      image: '/images/explore/CULTURAL EXHIBITION.png',
      fallbackImage: '/images/skyquest/hero-bg.jpg',
      icon: <Palette className="w-8 h-8" />,
      route: '/digital-exhibition',
      gradient: 'from-purple-600 to-indigo-700',
      highlights: ['Triển lãm số', 'AR/VR Experience', 'Âm thanh tự nhiên', 'Câu chuyện ảnh']
    },
    {
      id: 'viemunity',
      title: 'Viemunity',
      subtitle: 'Cộng đồng chia sẻ và kết nối',
      description: 'Nơi du khách, người dân và doanh nghiệp chia sẻ trải nghiệm, câu chuyện và kết nối với nhau trong hành trình khám phá Tà Xùa.',
      image: '/images/explore/VIEMUNITY.png',
      fallbackImage: '/images/viviet/community-bg.jpg',
      icon: <Users className="w-8 h-8" />,
      route: '/hall-of-stories',
      gradient: 'from-blue-600 to-cyan-700',
      highlights: ['Chia sẻ trải nghiệm', 'Kết nối cộng đồng', 'Tin tức địa phương', 'Forum thảo luận']
    }
  ];

  return (
    <Layout>
      <MainNavigation />
      <Header />
      <main 
        className="min-h-screen overflow-x-hidden relative"
        style={{
          background: `
            linear-gradient(180deg, var(--explore-mist) 0%, #F7FAFC 50%, var(--explore-mist) 100%),
            radial-gradient(ellipse at top right, rgba(30,124,112,0.15), transparent),
            radial-gradient(ellipse at bottom left, rgba(52,211,153,0.1), transparent)
          `,
          backgroundImage: `url('/textures/noise-light.svg')`,
          backgroundBlendMode: 'overlay',
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          minHeight: '100vh',
          position: 'relative'
        }}
      >
        {/* Hero Section with Integrated Cards */}
        <section 
          className={`relative min-h-[75vh] flex flex-col items-center justify-center overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Parallax background image container */}
           <div 
             className="absolute inset-0 will-change-transform transform-gpu"
             style={{
               backgroundImage: `url('/hero-taxua-clouds.jpg')`,
               backgroundSize: 'cover',
               backgroundPosition: '50% 30%',
               transform: `translateY(${parallaxOffset}px) scale(1.1)`,
               willChange: 'transform'
             }}
           />
          
          {/* Enhanced overlay gradient for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20 z-10"></div>
          
          {/* Content container */}
          <div className="relative z-20 text-center px-4 max-w-7xl mx-auto w-full">
            {/* Hero Title */}
            <div 
              className="backdrop-blur-[2px] bg-black/20 px-8 py-6 rounded-2xl inline-block mb-8"
              style={{
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15) inset'
              }}
            >
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-white leading-tight tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
                Khám Phá Tà Xùa –
                <br />
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
                  Những Câu Chuyện Đang Chờ Bạn
                </span>
              </h1>
            </div>
            
            {/* 4 Topic Cards - Integrated into Hero */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-6 max-w-6xl mx-auto px-4">
              {exploreBlocks.map((block, index) => (
                <div
                  key={block.id}
                  className={`group relative overflow-hidden cursor-pointer transform transition-all duration-500 hover:-translate-y-1.5 ${animationClasses.fadeUp.transition} ${isVisible ? animationClasses.fadeUp.animate : animationClasses.fadeUp.initial}`}
                  style={{ 
                    animationDelay: `${index * 200 + 800}ms`,
                    width: '100%',
                    maxWidth: '280px',
                    height: '280px',
                    borderRadius: '20px',
                    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.25)',
                    margin: '0 auto'
                  }}
                  onClick={() => navigate(block.route)}
                >
                  {/* Background Image with Overlay */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:brightness-110"
                    style={{
                      backgroundImage: `url('${block.image}')`,
                      borderRadius: '20px'
                    }}
                  >
                    {/* Theme-specific Overlay Gradient with increased opacity for better contrast */}
                    <div 
                      className={`absolute inset-0 transition-opacity duration-500 group-hover:opacity-80`}
                      style={{
                        background: block.id === 'locations' 
                          ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.85) 0%, rgba(5, 150, 105, 0.95) 100%)'
                          : block.id === 'cuisine'
                          ? 'linear-gradient(135deg, rgba(220, 38, 38, 0.85) 0%, rgba(153, 27, 27, 0.95) 100%)'
                          : block.id === 'culture'
                          ? 'linear-gradient(135deg, rgba(147, 51, 234, 0.85) 0%, rgba(109, 40, 217, 0.95) 100%)'
                          : 'linear-gradient(135deg, rgba(59, 130, 246, 0.85) 0%, rgba(37, 99, 235, 0.95) 100%)',
                        borderRadius: '20px',
                        opacity: 0.9
                      }}
                    />
                    
                    {/* Additional blur overlay for better text readability */}
                    <div 
                      className="absolute inset-0 backdrop-blur-[1px]"
                      style={{
                        borderRadius: '20px',
                        background: 'rgba(0, 0, 0, 0.15)'
                      }}
                    />
                  </div>

                  {/* Content Container */}
                  <div className="relative z-10 p-4 h-full flex flex-col justify-between text-white">
                    {/* Top Content */}
                    <div>
                      {/* Title */}
                      <h3 className="text-lg font-bold mb-2 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
                        {block.title}
                      </h3>
                      
                      {/* Description */}
                      <p 
                        className="text-sm leading-relaxed mb-3 line-clamp-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
                        style={{ 
                          color: 'rgba(255, 255, 255, 0.95)',
                          lineHeight: '1.4'
                        }}
                      >
                        {block.description}
                      </p>

                      {/* Hashtags */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {block.highlights.slice(0, 3).map((highlight, idx) => (
                          <span 
                            key={idx}
                            className="px-2.5 py-1 bg-white/25 backdrop-blur-sm text-xs font-medium text-white rounded-full border border-white/20 drop-shadow-sm"
                          >
                            #{highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <button 
                      className="w-full py-2.5 bg-white/25 backdrop-blur-sm text-white border border-white/30 hover:bg-white hover:text-gray-900 transition-all duration-300 font-semibold group-hover:bg-white group-hover:text-gray-900 text-sm drop-shadow-sm"
                      style={{ borderRadius: '12px' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(block.route);
                      }}
                    >
                      Khám phá ngay
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Activities Section - New section below hero */}
        <ActivitiesSection />

        {/* Bottom CTA Section - Moved up to replace the removed section */}
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className={`text-center ${animationClasses.fadeUp.transition} ${sectionsAnimation.isVisible ? animationClasses.fadeUp.animate : animationClasses.fadeUp.initial}`} style={{ animationDelay: '200ms' }}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Không biết bắt đầu từ đâu?
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Hãy để chúng tôi gợi ý cho bạn hành trình phù hợp nhất dựa trên sở thích và thời gian của bạn.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white hover:from-emerald-700 hover:to-teal-800 rounded-xl px-8 py-3 font-semibold"
                    onClick={() => navigate('/skyquest')}
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Sky Quest - Hành trình cá nhân hóa
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-2 border-gray-300 hover:border-gray-400 rounded-xl px-8 py-3 font-semibold"
                    onClick={() => navigate('/safety')}
                  >
                    <MapPin className="w-5 h-5 mr-2" />
                    Xem bản đồ tổng quan
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </Layout>
  );
};

export default Explore;