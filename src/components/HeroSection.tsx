import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ArrowRight, Mountain, Play, Search, User, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LazyImage from '@/components/LazyImage';
import SearchDashboard from '@/components/SearchDashboard';
import heroImage1 from '@/assets/hero-taxua-clouds.jpg';
import heroImage2 from '@/assets/hmong-culture.jpg';
import heroImage3 from '@/assets/shan-tuyet-tea.jpg';
import { useTranslation } from '@/lib/i18n';

interface HeroSectionProps {
  onSearchClick?: () => void;
  onVideoClick?: () => void;
  isLoggedIn?: boolean;
  onLoginClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  onSearchClick, 
  onVideoClick, 
  isLoggedIn = false,
  onLoginClick 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const slides = [
    {
      image: heroImage1,
      title: 'Du lịch có ý nghĩa tại Tà Xùa',
      subtitle: 'Khám phá, hành động và để lại dấu ấn xanh của bạn',
      video: true,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Replace with real Tà Xùa video
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollToNextSection = () => {
    const nextSection = document.querySelector('#story-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleVideoClick = () => {
    if (onVideoClick) {
      onVideoClick();
    }
  };

  const handleSearchClick = () => {
    if (onSearchClick) {
      onSearchClick();
    }
  };

  // Three main user flows from Web Flow
  const handleFirstTimeUser = () => {
    navigate('/first-time-visitor');
  };

  const handleDirectSearch = () => {
    if (onSearchClick) {
      onSearchClick();
    } else {
      navigate('/explore');
    }
  };

  const handleReturningUser = () => {
    if (isLoggedIn) {
      navigate('/returning-dashboard');
    } else {
      onLoginClick();
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center">
      {/* Background Slider with Soft Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-2000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <LazyImage
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Soft Emotional Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-800/20 to-slate-900/40"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-teal-900/20"></div>
          </div>
        ))}
      </div>

      {/* Gentle Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-teal-300/40 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-blue-200/30 rounded-full animate-pulse delay-2000"></div>
      </div>

      {/* Main Content with Emotional Typography */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="mb-8 space-y-6">
          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-wide mb-6">
            <span className="block text-white font-bold" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}>
              ViViet: Tà Xùa Mùa Xanh
            </span>
          </h1>
          
          {/* Refined Subtitle */}
          <p className="text-xl md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto" 
             style={{ 
               color: '#FFFFFF', 
               textShadow: '0 1px 4px rgba(0,0,0,0.3)',
               fontSize: '22px',
               fontWeight: '500',
               lineHeight: '1.6',
               marginTop: '1.5rem'
             }}>
            Nơi mây trời và núi rừng ôm lấy nhau, 
            <br className="hidden md:block" />
            mỗi khoảnh khắc đều đáng trân trọng
          </p>
        </div>

        {/* Modern Search Dashboard */}
         <div className="mb-12 max-w-6xl mx-auto">
             <SearchDashboard
               onSearch={(searchData) => {

                 handleDirectSearch();
               }}
             />
         </div>

        {/* Three Gentle Journey Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Khám phá - Soft Curiosity */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 cursor-pointer group border border-white/10"
               onClick={() => navigate('/explore')}>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-300">
                <Mountain className="w-8 h-8 text-blue-200" />
              </div>
              <h3 className="text-lg font-light mb-2 text-white/90">Khám phá cùng nhau</h3>
              <p className="text-sm text-white/70 mb-4 font-light leading-relaxed">
                Những câu chuyện và trải nghiệm tuyệt vời đang chờ đón bạn
              </p>
              <div className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm font-light">
                Bắt đầu thôi nào
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Sky Quest - Gentle Adventure */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 cursor-pointer group border border-white/10"
               onClick={() => navigate('/sky-quest/journey')}>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-300">
                <Search className="w-8 h-8 text-green-200" />
              </div>
              <h3 className="text-lg font-light mb-2 text-white/90">Hành động vì môi trường</h3>
              <p className="text-sm text-white/70 mb-4 font-light leading-relaxed">
                Cùng tham gia Sky Quest và tạo nên những thay đổi tích cực
              </p>
              <div className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm font-light">
                Tham gia ngay
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Triển lãm số */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 cursor-pointer group border border-white/10"
               onClick={() => navigate('/digital-exhibition')}>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-300">
                <User className="w-8 h-8 text-purple-200" />
              </div>
              <h3 className="text-lg font-light mb-2 text-white/90">Triển lãm số</h3>
              <p className="text-sm text-white/70 mb-4 font-light leading-relaxed">
                Khám phá không gian số 3D với âm thanh và hình ảnh Tà Xùa
              </p>
              <div className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm font-light">
                Khám phá ngay
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <Button
          onClick={scrollToNextSection}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/10 animate-bounce"
        >
          <ChevronDown className="w-6 h-6" />
        </Button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;