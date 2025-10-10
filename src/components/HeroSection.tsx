import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ArrowRight, Mountain, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LazyImage from '@/components/LazyImage';
import SearchBar from '@/components/SearchBar';
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollToDiscover = () => {
    const element = document.getElementById('category-cards-section');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Highlight the "Khám Phá" category after scrolling
      setTimeout(() => {
        const exploreCard = document.querySelector('[data-category="explore"]') as HTMLElement;
        if (exploreCard) {
          exploreCard.classList.add('ring-4', 'ring-orange-400/70', 'ring-pulse');
          exploreCard.click(); // Auto-expand the explore section
          
          // Remove highlight after 3 seconds
          setTimeout(() => {
            exploreCard.classList.remove('ring-4', 'ring-orange-400/70', 'ring-pulse');
          }, 3000);
        }
      }, 800); // Wait for scroll to complete
    }
  };

  const handleExploreClick = () => {
    scrollToDiscover();
  };

  const handleVideoClick = () => {
    // Open video modal or navigate to video page
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
  };

  const handleSearch = (query: string, category: string) => {
    // Navigate to explore page with search parameters
    navigate(`/explore?q=${encodeURIComponent(query)}&category=${category}`);
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Fixed Background Images with Enhanced Overlay */}
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
            className="w-full h-full object-cover"
            priority={index === 0}
          />
          {/* Enhanced overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
        </div>
      ))}

      {/* Animated Clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-0 w-96 h-32 bg-white/5 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute top-40 right-0 w-80 h-24 bg-white/3 rounded-full blur-3xl animate-float-slower"></div>
        <div className="absolute bottom-40 left-1/4 w-64 h-20 bg-white/4 rounded-full blur-3xl animate-float-medium"></div>
      </div>

      {/* Cinematic Light Rays with Gentle Movement */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-white/30 via-white/10 to-transparent transform rotate-12 animate-gentle-sway"></div>
        <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-white/20 via-white/5 to-transparent transform -rotate-12 animate-gentle-sway-reverse"></div>
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
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 mb-8 animate-fade-in shadow-2xl">
            <Mountain className="w-5 h-5 text-amber-400" />
            <span className="text-base font-medium tracking-wide">{slides[currentSlide].highlight}</span>
          </div>

          {/* Dramatic Main Title - Playfair Display */}
          <h1 className="text-display mb-6 animate-fade-in leading-[0.9] tracking-tight">
            <span 
              className="bg-gradient-to-r from-white via-blue-50 to-purple-100 bg-clip-text text-transparent drop-shadow-2xl"
              style={{
                textShadow: '0 0 40px rgba(255,255,255,0.3), 0 0 80px rgba(255,255,255,0.1)',
              }}
            >
              {slides[currentSlide].title}
            </span>
          </h1>

          {/* Cinematic Subtitle */}
          <div className="mb-12 px-4">
            <p className="text-body-large text-white/90 max-w-4xl mx-auto animate-fade-in leading-relaxed tracking-wide font-light">
              {slides[currentSlide].subtitle}
            </p>
          </div>

          {/* Redesigned Action Buttons - Enhanced Video Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={handleExploreClick}
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300 group border-0"
            >
              Khám phá hành trình Sky Quest
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="ghost" 
              onClick={handleVideoClick}
              className="border border-white/40 text-white/90 hover:text-white hover:bg-white/10 hover:border-white/60 px-6 py-3 rounded-full backdrop-blur-sm transition-all duration-300 group font-medium"
            >
              <Play className="w-4 h-4 mr-2" />
              Xem Tà Xùa qua video 4K
            </Button>
          </div>

          {/* Central Search Bar */}
          <div className="mb-16 animate-fade-in">
            <SearchBar 
              onSearch={handleSearch}
              onExploreClick={handleExploreClick}
            />
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