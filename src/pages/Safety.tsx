import React, { useEffect, useState } from 'react';
import { getOptimizedImageUrl, preloadImage } from '@/utils/imageOptimizer';
import Layout from '@/components/Layout';
import Footer from '@/components/Footer';
import SmartSafetyHub from '@/components/SmartSafetyHub';
import WeatherWidget from '@/components/WeatherWidget';
import CommunityReportForm from '@/components/CommunityReportForm';
import CommunityReportsList from '@/components/CommunityReportsList';
import WasteLocationFinder from '@/components/WasteLocationFinder';
import { Cloud, Navigation, Phone } from 'lucide-react';

const Safety = () => {
  const [scrollY, setScrollY] = useState(0);
  const [heroImageUrl, setHeroImageUrl] = useState<string>('/images/safety/Hero Section Safety.png');
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Smooth scroll function with navbar offset
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = -80; // offset for navbar height
      const y = element.getBoundingClientRect().top + window.pageYOffset + offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Optimize and preload hero image, and set responsive attachment behavior
  useEffect(() => {
    const initHeroImage = async () => {
      try {
        // Determine target width based on device pixel ratio and viewport
        const targetWidth = Math.min(1920, Math.ceil(window.innerWidth * window.devicePixelRatio));

        const optimizedUrl = await getOptimizedImageUrl('/images/safety/Hero Section Safety.png', {
          quality: 0.82,
          maxWidth: targetWidth,
        });

        setHeroImageUrl(optimizedUrl);
        await preloadImage(optimizedUrl);
      } catch (e) {
        // Fallback to original URL
        setHeroImageUrl('/images/safety/Hero Section Safety.png');
      }
    };

    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    updateIsMobile();
    initHeroImage();

    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  // Handle report submission to refresh the reports list
  const handleReportSubmitted = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-safety-mist to-safety-mist-light">
        {/* Hero Section - Redesigned with Hero Section Safety.png */}
        <section className="relative min-h-[500px] md:min-h-[520px] sm:min-h-[420px] flex flex-col items-center justify-center overflow-hidden px-5 md:px-8">
          {/* Background Image with Parallax - Optimized for performance */}
          <div 
            className="absolute inset-0 bg-cover bg-no-repeat hero-parallax will-change-transform"
            style={{
              backgroundImage: `url(${heroImageUrl})`,
              transform: `translateY(${scrollY * 0.25}px) scale(1.03)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 30%',
              // Avoid fixed attachment on mobile to improve performance
              backgroundAttachment: isMobile ? 'scroll' : 'fixed',
              zIndex: 1
            }}
          />
          
          {/* Enhanced Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40 z-10" />
          
          {/* Volumetric Light Effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
            {/* Floating mist particles */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white/20 rounded-full animate-float"
                style={{
                  width: `${2 + Math.random() * 4}px`,
                  height: `${2 + Math.random() * 4}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${Math.random() * 8}s`,
                  animationDuration: `${6 + Math.random() * 4}s`,
                }}
              />
            ))}
            
            {/* Light rays */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-amber-200/30 via-transparent to-transparent" />
            <div className="absolute top-0 right-1/4 w-1/4 h-2/3 bg-gradient-to-bl from-yellow-100/20 via-transparent to-transparent" />
          </div>
          
          {/* Hero Content - Improved Layout with Better Spacing */}
          <div className="relative z-30 text-center px-5 md:px-8 max-w-5xl mx-auto animate-fade-up py-12 md:py-16">
            {/* Main Title - Optimized Font Sizes and Spacing */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-center">
              <span className="bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
                Trung tâm An Toàn Tà Xùa
              </span>
            </h1>
            
            {/* Subtitle - Improved Styling and Positioning */}
            <div className="mb-8 max-w-3xl mx-auto">
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed font-medium drop-shadow-lg">
                Cập nhật tình hình thời tiết, cảnh báo khẩn cấp, bản đồ an toàn và báo cáo cộng đồng
              </p>
            </div>
            
            {/* Action Buttons - Improved Spacing and Layout */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-8 max-w-4xl mx-auto">
              <button 
                onClick={() => scrollToSection('weather-section')}
                className="flex flex-col items-center group cursor-pointer focus:outline-none focus:ring-4 focus:ring-amber-400/50 rounded-2xl p-4 md:p-6 bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-md hover:from-amber-400/30 hover:to-orange-400/30 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl border border-amber-200/30 min-w-[160px] md:min-w-[180px]"
                aria-label="Xem cảnh báo và dự báo thời tiết"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-3 group-hover:from-amber-300 group-hover:to-orange-400 transition-all duration-300 ease-in-out shadow-xl group-hover:shadow-amber-500/50">
                  <Cloud className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg" />
                </div>
                <span className="text-base md:text-lg font-bold text-white group-hover:text-amber-100 transition-colors duration-300 ease-in-out text-center leading-tight">
                  Cảnh báo thời tiết
                </span>
              </button>
              
              <button 
                onClick={() => scrollToSection('map-section')}
                className="flex flex-col items-center group cursor-pointer focus:outline-none focus:ring-4 focus:ring-emerald-400/50 rounded-2xl p-4 md:p-6 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-md hover:from-emerald-400/30 hover:to-teal-400/30 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl border border-emerald-200/30 min-w-[160px] md:min-w-[180px]"
                aria-label="Xem bản đồ an toàn"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-3 group-hover:from-emerald-400 group-hover:to-teal-500 transition-all duration-300 ease-in-out shadow-xl group-hover:shadow-emerald-500/50">
                  <Navigation className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg" />
                </div>
                <span className="text-base md:text-lg font-bold text-white group-hover:text-emerald-100 transition-colors duration-300 ease-in-out text-center leading-tight">
                  Bản đồ an toàn
                </span>
              </button>
              
              <button 
                onClick={() => scrollToSection('sos-section')}
                className="flex flex-col items-center group cursor-pointer focus:outline-none focus:ring-4 focus:ring-red-400/50 rounded-2xl p-4 md:p-6 bg-gradient-to-br from-red-500/20 to-rose-500/20 backdrop-blur-md hover:from-red-400/30 hover:to-rose-400/30 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl border border-red-200/30 min-w-[160px] md:min-w-[180px]"
                aria-label="Báo cáo và SOS khẩn cấp"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center mb-3 group-hover:from-red-400 group-hover:to-rose-500 transition-all duration-300 ease-in-out shadow-xl group-hover:shadow-red-500/50">
                  <Phone className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg" />
                </div>
                <span className="text-base md:text-lg font-bold text-white group-hover:text-red-100 transition-colors duration-300 ease-in-out text-center leading-tight">
                  Báo cáo / SOS
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Safety Center Content */}
        <section className="py-16 container mx-auto px-4">
          {/* Main Content Grid - Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
            {/* Weather Widget */}
            <div id="weather-section" className="lg:col-span-1">
              <WeatherWidget />
            </div>
            
            {/* Community Report Form */}
            <div id="sos-section" className="lg:col-span-1">
              <CommunityReportForm onReportSubmitted={handleReportSubmitted} />
            </div>
            
            {/* Waste Location Finder */}
            <div className="lg:col-span-1 xl:col-span-1">
              <WasteLocationFinder />
            </div>
          </div>

          {/* Community Reports List - Full Width */}
          <div className="mb-12">
            <CommunityReportsList refreshTrigger={refreshTrigger} />
          </div>

          {/* Original Smart Safety Hub */}
          <div id="map-section">
            <SmartSafetyHub />
          </div>
        </section>
        
        <Footer />
      </div>
    </Layout>
  );
};

export default Safety;