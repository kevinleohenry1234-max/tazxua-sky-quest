import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ArrowRight, Mountain, Play, Search, User, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LazyImage from '@/components/LazyImage';
import SearchBar from '@/components/SearchBar';
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
      title: 'Khám Phá Vẻ Đẹp Huyền Bí Tà Xùa',
      subtitle: 'Nơi mây và núi hòa quyện, tạo nên bức tranh thiên nhiên hùng vĩ',
      video: true
    },
    {
      image: heroImage2,
      title: 'Trải Nghiệm Văn Hóa Độc Đáo',
      subtitle: 'Khám phá nét đẹp văn hóa dân tộc Mông giữa núi rừng Tà Xùa',
      video: false
    },
    {
      image: heroImage3,
      title: 'Hương Vị Trà Shan Tuyết Cổ Thụ',
      subtitle: 'Thưởng thức hương vị trà đặc biệt từ những cây chè cổ thụ trăm tuổi',
      video: false
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
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <LazyImage
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        {/* Main Hero Content */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {slides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            {slides[currentSlide].subtitle}
          </p>

          {/* Video Play Button for first slide */}
          {slides[currentSlide].video && (
            <Button
              onClick={handleVideoClick}
              variant="outline"
              size="lg"
              className="mb-8 bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
            >
              <Play className="w-5 h-5 mr-2" />
              Xem Video Giới Thiệu
            </Button>
          )}
        </div>

        {/* Smart Search Bar */}
        <div className="mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Tìm kiếm thông minh</h3>
            <SearchBar 
              onSearch={(query, category) => {
                console.log('Search:', query, category);
                handleDirectSearch();
              }}
              onExploreClick={handleDirectSearch}
            />
          </div>
        </div>

        {/* Three Main User Flow Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* First Time User - Learn */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer group"
               onClick={handleFirstTimeUser}>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Mountain className="w-8 h-8 text-blue-300" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Lần đầu đến Tà Xùa?</h3>
              <p className="text-sm opacity-90 mb-4">Tìm hiểu về vẻ đẹp và giá trị của Tà Xùa Xanh</p>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                Khám phá ngay
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Direct Search - Known User */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer group"
               onClick={handleDirectSearch}>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Search className="w-8 h-8 text-green-300" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Đã biết Tà Xùa?</h3>
              <p className="text-sm opacity-90 mb-4">Tìm kiếm và đặt dịch vụ ngay lập tức</p>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                Đặt ngay
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Returning User - Dashboard */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer group"
               onClick={handleReturningUser}>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <User className="w-8 h-8 text-purple-300" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Đã từng đến?</h3>
              <p className="text-sm opacity-90 mb-4">Xem dashboard và tiếp tục hành trình</p>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                {isLoggedIn ? 'Vào Dashboard' : 'Đăng nhập'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
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