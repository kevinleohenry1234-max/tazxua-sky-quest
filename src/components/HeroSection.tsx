import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ArrowRight, Mountain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LazyImage from '@/components/LazyImage';
import heroImage1 from '@/assets/hero-taxua-clouds.jpg';
import heroImage2 from '@/assets/hmong-culture.jpg';
import heroImage3 from '@/assets/shan-tuyet-tea.jpg';
import { useTranslation } from '@/lib/i18n';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
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



  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToDiscover = () => {
    const discoverSection = document.getElementById('category-cards-section');
    if (discoverSection) {
      discoverSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Highlight the "Khám Phá" category after scrolling
      setTimeout(() => {
        const exploreCard = document.querySelector('[data-category="explore"]');
        if (exploreCard) {
          exploreCard.classList.add('ring-4', 'ring-orange-400', 'ring-opacity-75');
          setTimeout(() => {
            exploreCard.classList.remove('ring-4', 'ring-orange-400', 'ring-opacity-75');
          }, 3000);
        }
      }, 1000);
    }
  };

  const handleExploreClick = () => {
    scrollToDiscover();
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background Images with Enhanced Parallax Effect */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1500 ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <LazyImage
            src={slide.image}
            alt={slide.title}
            className="w-full h-[120%] object-cover transform transition-transform duration-[8000ms] ease-out"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70" />
        </div>
      ))}

      {/* Cinematic Light Rays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-white/30 via-white/10 to-transparent transform rotate-12 animate-pulse"></div>
        <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-white/20 via-white/5 to-transparent transform -rotate-12 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content with Cinematic Typography */}
      <div className="absolute inset-0 flex items-center justify-center text-center text-white z-10">
        <div className="w-full px-8 max-w-7xl mx-auto">
          {/* Cinematic Badge */}
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 mb-12 animate-fade-in shadow-2xl">
            <Mountain className="w-5 h-5 text-amber-400" />
            <span className="text-base font-medium tracking-wide">{slides[currentSlide].highlight}</span>
          </div>

          {/* Dramatic Main Title - Playfair Display */}
          <h1 className="font-playfair text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold mb-8 animate-fade-in leading-[0.9] tracking-tight">
            <span 
              className="bg-gradient-to-r from-white via-blue-50 to-purple-100 bg-clip-text text-transparent drop-shadow-2xl"
              style={{
                textShadow: '0 0 40px rgba(255,255,255,0.3), 0 0 80px rgba(255,255,255,0.1)',
              }}
            >
              {slides[currentSlide].title}
            </span>
          </h1>

          {/* Cinematic Subtitle with Increased Whitespace */}
          <div className="mb-16 px-4">
            <p className="font-inter text-xl md:text-3xl lg:text-4xl text-white/90 max-w-5xl mx-auto animate-fade-in leading-relaxed tracking-wide font-light">
              {slides[currentSlide].subtitle}
            </p>
          </div>

          {/* Enhanced CTA Button */}
          <div className="flex justify-center items-center mb-20 animate-fade-in">
            <Button
              size="lg"
              onClick={scrollToDiscover}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-12 py-6 text-xl font-semibold transition-all duration-500 hover:scale-110 shadow-2xl border-0 rounded-full group backdrop-blur-sm"
              style={{
                boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 60px rgba(249, 115, 22, 0.3)',
              }}
            >
              Khám Phá Ngay
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Slide Indicators */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`relative transition-all duration-500 ${
                index === currentSlide
                  ? 'w-12 h-4 bg-white/80 rounded-full shadow-xl'
                  : 'w-4 h-4 bg-white/30 rounded-full hover:bg-white/50'
              }`}
            >
              {index === currentSlide && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Enhanced Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent z-5"></div>
    </section>
  );
};

export default HeroSection;