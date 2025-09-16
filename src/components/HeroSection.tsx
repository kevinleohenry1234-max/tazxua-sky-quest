import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import heroImage1 from '@/assets/hero-taxua-clouds.jpg';
import heroImage2 from '@/assets/hmong-culture.jpg';
import heroImage3 from '@/assets/shan-tuyet-tea.jpg';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: heroImage1,
      title: 'Tà Xùa: Chạm Vào Biển Mây',
      subtitle: 'Khám phá vẻ đẹp hùng vĩ của núi rừng Tây Bắc',
    },
    {
      image: heroImage2,
      title: 'Văn Hóa Người H\'Mông',
      subtitle: 'Trải nghiệm nét đẹp văn hóa đặc sắc của đồng bào dân tộc',
    },
    {
      image: heroImage3,
      title: 'Chè Shan Tuyết Cổ Thụ',
      subtitle: 'Thưởng thức hương vị trà cổ thụ hàng trăm năm tuổi',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollToDiscover = () => {
    const discoverSection = document.getElementById('discover');
    discoverSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60" />
        </div>
      ))}

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center text-center text-white z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
              {slides[currentSlide].title}
            </h1>
            <p className="font-inter text-lg md:text-xl lg:text-2xl mb-8 text-white/90 max-w-2xl mx-auto animate-fade-in">
              {slides[currentSlide].subtitle}
            </p>
            <Button
              size="lg"
              onClick={scrollToDiscover}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg font-medium transition-all duration-300 hover:scale-105 animate-fade-in"
            >
              Khám Phá Ngay
            </Button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white scale-110'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <button
          onClick={scrollToDiscover}
          className="text-white/80 hover:text-white transition-colors duration-300"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;