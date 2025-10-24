import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import SmartSafetyHub from '@/components/SmartSafetyHub';
import { Cloud, Navigation, Phone } from 'lucide-react';

const Safety = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-safety-mist to-safety-mist-light">
        <Header />
        
        {/* Hero Section - Redesigned with 3D Ta Xua Valley */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* 3D Background Image with Parallax */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat hero-parallax"
            style={{
              backgroundImage: 'url(/images/safety-hero-3d-taxua-valley.svg)',
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          />
          
          {/* Subtle Gradient Overlay for warmth and readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/10 via-transparent to-amber-900/20" />
          
          {/* Volumetric Light Effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
          
          {/* Hero Content - Enhanced Responsive Design */}
          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-up">
            {/* Main Title with enhanced responsive styling */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 leading-tight">
              <span className="bg-gradient-to-r from-emerald-100 via-white to-amber-100 bg-clip-text text-transparent drop-shadow-2xl">
                Trung tâm An Toàn
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-200 via-emerald-200 to-white bg-clip-text text-transparent drop-shadow-2xl">
                Tà Xùa
              </span>
            </h1>
            
            {/* Subtitle with improved responsive readability */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-8 sm:mb-12 border border-white/20 max-w-4xl mx-auto">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white leading-relaxed font-medium">
                Hệ thống giám sát và hỗ trợ an toàn toàn diện
              </p>
              <p className="text-base sm:text-lg md:text-xl text-emerald-100 mt-2 sm:mt-3 leading-relaxed">
                Cập nhật thời tiết, cảnh báo và hỗ trợ khẩn cấp — để bạn an tâm khám phá Tà Xùa xanh
              </p>
            </div>
            
            {/* Action Buttons - Enhanced Responsive Design */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 max-w-5xl mx-auto">
              <button 
                onClick={() => {
                  // Scroll to weather alerts section
                  const alertsSection = document.querySelector('#weather-alerts-section');
                  if (alertsSection) {
                    alertsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="flex flex-col items-center group cursor-pointer focus:outline-none focus:ring-4 focus:ring-amber-400/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-md hover:from-amber-400/30 hover:to-orange-400/30 transition-all duration-500 transform hover:scale-105 sm:hover:scale-110 hover:shadow-2xl border border-amber-200/30 min-w-[140px] sm:min-w-[160px] md:min-w-[180px]"
                aria-label="Xem cảnh báo và dự báo thời tiết"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-2 sm:mb-3 group-hover:from-amber-300 group-hover:to-orange-400 transition-all duration-500 shadow-xl group-hover:shadow-amber-500/50">
                  <Cloud className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white drop-shadow-lg" />
                </div>
                <span className="text-sm sm:text-base md:text-lg font-bold text-white group-hover:text-amber-100 transition-colors duration-300 text-center leading-tight">
                  Cảnh báo & Dự báo<br />thời tiết
                </span>
              </button>
              
              <button 
                onClick={() => {
                  // Scroll to safety map section
                  const mapSection = document.querySelector('#safety-map-section');
                  if (mapSection) {
                    mapSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="flex flex-col items-center group cursor-pointer focus:outline-none focus:ring-4 focus:ring-emerald-400/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-md hover:from-emerald-400/30 hover:to-teal-400/30 transition-all duration-500 transform hover:scale-105 sm:hover:scale-110 hover:shadow-2xl border border-emerald-200/30 min-w-[140px] sm:min-w-[160px] md:min-w-[180px]"
                aria-label="Xem bản đồ an toàn"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-2 sm:mb-3 group-hover:from-emerald-400 group-hover:to-teal-500 transition-all duration-500 shadow-xl group-hover:shadow-emerald-500/50">
                  <Navigation className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white drop-shadow-lg" />
                </div>
                <span className="text-sm sm:text-base md:text-lg font-bold text-white group-hover:text-emerald-100 transition-colors duration-300 text-center leading-tight">
                  Bản đồ<br />An toàn
                </span>
              </button>
              
              <button 
                onClick={() => {
                  // Scroll to SOS section
                  const sosSection = document.querySelector('#sos-section');
                  if (sosSection) {
                    sosSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="flex flex-col items-center group cursor-pointer focus:outline-none focus:ring-4 focus:ring-red-400/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 bg-gradient-to-br from-red-500/20 to-rose-500/20 backdrop-blur-md hover:from-red-400/30 hover:to-rose-400/30 transition-all duration-500 transform hover:scale-105 sm:hover:scale-110 hover:shadow-2xl border border-red-200/30 min-w-[140px] sm:min-w-[160px] md:min-w-[180px]"
                aria-label="Báo cáo và SOS khẩn cấp"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center mb-2 sm:mb-3 group-hover:from-red-400 group-hover:to-rose-500 transition-all duration-500 shadow-xl group-hover:shadow-red-500/50">
                  <Phone className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white drop-shadow-lg" />
                </div>
                <span className="text-sm sm:text-base md:text-lg font-bold text-white group-hover:text-red-100 transition-colors duration-300 text-center leading-tight">
                  Báo cáo /<br />SOS
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Safety Center Content */}
        <section className="py-16 container mx-auto px-4">
          <SmartSafetyHub />
        </section>
        
        <Footer />
      </div>
    </Layout>
  );
};

export default Safety;