import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import SafetyCenter from '@/components/SafetyCenter';
import { Cloud, Navigation, Phone } from 'lucide-react';

const Safety = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // Trigger fade-in animation
    const timer = setTimeout(() => setIsVisible(true), 300);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <Layout>
      <Header />
      
      <main className="pt-16">
        {/* Enhanced Hero Section with Parallax */}
        <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
          {/* Background Image with Parallax */}
          <div 
            className="absolute inset-0 scale-110"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          >
            <img
              src="/images/taxua-mist-mountain.jpg"
              alt="Tà Xùa morning clouds and mountains"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
              }}
            />
            {/* Enhanced gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/30 via-transparent to-slate-900/30"></div>
          </div>
          
          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 3) * 20}%`,
                  animationDelay: `${i * 0.8}s`,
                  animationDuration: `${3 + i * 0.5}s`,
                }}
              />
            ))}
          </div>
          
          {/* Content */}
          <div className={`relative text-center text-white z-10 px-4 max-w-5xl mx-auto transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-2xl text-white leading-tight">
              Trung tâm An toàn
            </h1>
            <div className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <p className="font-inter text-lg md:text-xl lg:text-2xl leading-relaxed drop-shadow-lg mb-8 text-slate-100">
                Cập nhật thời tiết, hướng dẫn an toàn và thông tin cứu hộ – tất cả trong một nơi, để bạn an tâm trải nghiệm Tà Xùa.
              </p>
              
              {/* Feature icons with fade-in animation and click handlers */}
              <div className={`flex justify-center items-center space-x-8 md:space-x-12 transition-all duration-1000 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <button 
                  onClick={() => {
                    // Scroll to weather section in SafetyCenter
                    const weatherSection = document.querySelector('#weather-alerts-section');
                    if (weatherSection) {
                      weatherSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="flex flex-col items-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 rounded-lg p-2"
                  aria-label="Xem thông tin thời tiết"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-2 group-hover:bg-blue-500/30 group-active:bg-blue-600/40 transition-all duration-300 group-hover:scale-110 group-active:scale-105 shadow-lg group-hover:shadow-xl">
                    <Cloud className="w-6 h-6 md:w-8 md:h-8 text-blue-300 group-hover:text-blue-200 transition-colors duration-300" />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-slate-200 group-hover:text-white transition-colors duration-300">🌦️ Thời tiết</span>
                </button>
                
                <button 
                  onClick={() => {
                    // Scroll to safety checklist section
                    const checklistSection = document.querySelector('#safety-checklist-section');
                    if (checklistSection) {
                      checklistSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="flex flex-col items-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 rounded-lg p-2"
                  aria-label="Xem hướng dẫn an toàn"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-2 group-hover:bg-green-500/30 group-active:bg-green-600/40 transition-all duration-300 group-hover:scale-110 group-active:scale-105 shadow-lg group-hover:shadow-xl">
                    <Navigation className="w-6 h-6 md:w-8 md:h-8 text-green-300 group-hover:text-green-200 transition-colors duration-300" />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-slate-200 group-hover:text-white transition-colors duration-300">🧭 Hướng dẫn</span>
                </button>
                
                <button 
                  onClick={() => {
                    // Scroll to emergency contacts section
                    const emergencySection = document.querySelector('#emergency-contacts-section');
                    if (emergencySection) {
                      emergencySection.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      // Fallback: call emergency number directly
                      window.open('tel:115', '_self');
                    }
                  }}
                  className="flex flex-col items-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 rounded-lg p-2"
                  aria-label="Liên hệ cứu hộ khẩn cấp"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-2 group-hover:bg-red-500/30 group-active:bg-red-600/40 transition-all duration-300 group-hover:scale-110 group-active:scale-105 shadow-lg group-hover:shadow-xl">
                    <Phone className="w-6 h-6 md:w-8 md:h-8 text-red-300 group-hover:text-red-200 transition-colors duration-300" />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-slate-200 group-hover:text-white transition-colors duration-300">🚑 Cứu hộ</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Safety Center Content */}
        <section className="py-16 container mx-auto px-4">
          <SafetyCenter />
        </section>
      </main>
      
      <Footer />
    </Layout>
  );
};

export default Safety;