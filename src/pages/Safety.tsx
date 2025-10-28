import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import SmartSafetyHub from '@/components/SmartSafetyHub';
import WeatherWidget from '@/components/WeatherWidget';
import CommunityReportForm from '@/components/CommunityReportForm';
import CommunityReportsList from '@/components/CommunityReportsList';
import WasteLocationFinder from '@/components/WasteLocationFinder';
import { Cloud, Navigation, Phone } from 'lucide-react';

const Safety = () => {
  const [scrollY, setScrollY] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle report submission to refresh the reports list
  const handleReportSubmitted = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-safety-mist to-safety-mist-light">
        <MainNavigation />
        <Header />
        
        {/* Hero Section - Redesigned with Hero Section Safety.png */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image with Parallax - Optimized for performance */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat hero-parallax will-change-transform"
            style={{
              backgroundImage: 'url(/images/safety/Hero Section Safety.png)',
              transform: `translateY(${scrollY * 0.3}px) scale(1.05)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundAttachment: 'fixed'
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
                Cập nhật tình hình thời tiết, cảnh báo khẩn cấp, bản đồ an toàn và báo cáo cộng đồng
              </p>
            </div>
            
            {/* Action Buttons - Enhanced Responsive Design */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 max-w-5xl mx-auto">
              <button 
                onClick={() => navigate('/safety/weather')}
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
                onClick={() => navigate('/safety/map')}
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
                onClick={() => navigate('/safety/report')}
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
          {/* Main Content Grid - Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
            {/* Weather Widget */}
            <div className="lg:col-span-1">
              <WeatherWidget />
            </div>
            
            {/* Community Report Form */}
            <div className="lg:col-span-1">
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
          <SmartSafetyHub />
        </section>
        
        <Footer />
      </div>
    </Layout>
  );
};

export default Safety;