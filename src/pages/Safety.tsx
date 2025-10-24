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
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <Header />
        
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image with Parallax */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat hero-parallax"
            style={{
              backgroundImage: 'url(/images/safety-hero-family.svg)',
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          />
          
          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/35" />
          
          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${4 + Math.random() * 3}s`,
                }}
              />
            ))}
          </div>
          
          {/* Hero Content */}
          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto animate-fade-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              Trung tâm An Toàn Tà Xùa
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-slate-100 mb-12 max-w-4xl mx-auto leading-relaxed drop-shadow-md">
              Cập nhật thời tiết, cảnh báo và hỗ trợ khẩn cấp — để bạn an tâm khám phá Tà Xùa xanh.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
              <button 
                onClick={() => {
                  // Scroll to weather alerts section
                  const alertsSection = document.querySelector('#weather-alerts-section');
                  if (alertsSection) {
                    alertsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="flex flex-col items-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 rounded-xl p-3 md:p-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                aria-label="Xem cảnh báo và dự báo thời tiết"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-2 group-hover:from-yellow-300 group-hover:to-orange-400 transition-all duration-300 shadow-lg">
                  <Cloud className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <span className="text-sm md:text-base font-semibold text-white group-hover:text-yellow-100 transition-colors duration-300">Cảnh báo & Dự báo thời tiết</span>
              </button>
              
              <button 
                onClick={() => {
                  // Scroll to safety map section
                  const mapSection = document.querySelector('#safety-map-section');
                  if (mapSection) {
                    mapSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="flex flex-col items-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 rounded-xl p-3 md:p-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                aria-label="Xem bản đồ an toàn"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-2 group-hover:from-green-400 group-hover:to-emerald-500 transition-all duration-300 shadow-lg">
                  <Navigation className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <span className="text-sm md:text-base font-semibold text-white group-hover:text-green-100 transition-colors duration-300">Bản đồ An toàn</span>
              </button>
              
              <button 
                onClick={() => {
                  // Scroll to SOS section
                  const sosSection = document.querySelector('#sos-section');
                  if (sosSection) {
                    sosSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="flex flex-col items-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 rounded-xl p-3 md:p-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                aria-label="Báo cáo và SOS khẩn cấp"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mb-2 group-hover:from-red-400 group-hover:to-red-500 transition-all duration-300 shadow-lg">
                  <Phone className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <span className="text-sm md:text-base font-semibold text-white group-hover:text-red-100 transition-colors duration-300">Báo cáo / SOS</span>
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