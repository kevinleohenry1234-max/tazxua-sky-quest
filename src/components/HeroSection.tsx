import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, MapPin, Mountain, Camera, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LazyImage from '@/components/LazyImage';
import heroImage1 from '@/assets/hero-taxua-clouds.jpg';
import heroImage2 from '@/assets/hmong-culture.jpg';
import heroImage3 from '@/assets/shan-tuyet-tea.jpg';
import { useTranslation } from '@/lib/i18n';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const slides = [
    {
      image: heroImage1,
      title: 'Tà Xùa Sky Quest',
      subtitle: 'Chinh phục đỉnh cao Tây Bắc - Khám phá thiên đường mây trắng',
      highlight: 'Sống lưng khủng long huyền thoại',
    },
    {
      image: heroImage2,
      title: 'Văn Hóa Người H\'Mông',
      subtitle: 'Trải nghiệm nét đẹp văn hóa đặc sắc của đồng bào dân tộc',
      highlight: 'Homestay truyền thống',
    },
    {
      image: heroImage3,
      title: 'Chè Shan Tuyết Cổ Thụ',
      subtitle: 'Thưởng thức hương vị trà cổ thụ hàng trăm năm tuổi',
      highlight: 'Trải nghiệm ẩm thực độc đáo',
    },
  ];

  const stats = [
    { icon: Mountain, value: '2865m', label: 'Độ cao đỉnh Tà Xùa' },
    { icon: MapPin, value: '15+', label: 'Điểm check-in' },
    { icon: Camera, value: '1000+', label: 'Ảnh đẹp mỗi ngày' },
    { icon: Star, value: '4.9/5', label: 'Đánh giá từ du khách' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollToDiscover = () => {
    const discoverSection = document.getElementById('discover');
    discoverSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreClick = () => {
    scrollToDiscover();
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background Images with Parallax Effect */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1500 ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          <LazyImage
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover transform transition-transform duration-[6000ms] ease-out"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/80" />
        </div>
      ))}

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="absolute inset-0 flex items-center justify-center text-center text-white z-10">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6 animate-fade-in">
            <Mountain className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium">{slides[currentSlide].highlight}</span>
          </div>

          {/* Main Title */}
          <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in text-white drop-shadow-2xl leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              {slides[currentSlide].title}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-inter text-xl md:text-2xl lg:text-3xl mb-8 text-white/95 max-w-3xl mx-auto animate-fade-in drop-shadow-lg leading-relaxed">
            {slides[currentSlide].subtitle}
          </p>

          {/* CTA Button */}
          <div className="flex justify-center items-center mb-12 animate-fade-in">
            <Button
              size="lg"
              onClick={handleExploreClick}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-2xl border-0 rounded-full group"
            >
              Khám Phá Ngay
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fade-in">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center hover:bg-white/15 transition-all duration-300 hover:scale-105"
                >
                  <IconComponent className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Enhanced Slide Indicators */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`relative transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 h-3 bg-white rounded-full shadow-lg'
                  : 'w-3 h-3 bg-white/50 rounded-full hover:bg-white/75'
              }`}
            >
              {index === currentSlide && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <button
          onClick={scrollToDiscover}
          className="text-white/90 hover:text-white transition-all duration-300 bg-white/10 backdrop-blur-md rounded-full p-3 border border-white/20 hover:bg-white/20 hover:scale-110"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>

      {/* Gradient Overlay at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent z-5"></div>
    </section>
  );
};

export default HeroSection;