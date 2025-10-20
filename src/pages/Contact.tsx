import React, { useState } from 'react';
import ContactForm from '@/components/ContactForm';
import Header from '@/components/Header';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import LoginModal from '@/components/LoginModal';
import RegisterModal from '@/components/RegisterModal';
import { MapPin, Mail, Phone, Clock, Facebook, Lightbulb } from 'lucide-react';

const Contact = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleLogin = (email: string, password: string) => {
    console.log('Login attempt:', { email, password });
    setIsLoggedIn(true);
    setUserName(email.split('@')[0]);
    setIsLoginModalOpen(false);
  };

  const handleRegister = (name: string, email: string, password: string) => {
    console.log('Register attempt:', { name, email, password });
    setIsLoggedIn(true);
    setUserName(name);
    setIsRegisterModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
  };

  return (
    <Layout>
      <MainNavigation />
      <Header
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onRegisterClick={() => setIsRegisterModalOpen(true)}
        onLogoutClick={handleLogout}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
        onSwitchToRegister={() => {
          setIsLoginModalOpen(false);
          setIsRegisterModalOpen(true);
        }}
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegister={handleRegister}
        onSwitchToLogin={() => {
          setIsRegisterModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />

      {/* Enhanced Hero Section with Ta Xua Background */}
      <section className="relative pt-44 pb-32 overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: 'url(/hero-taxua-clouds.jpg)',
            willChange: 'transform'
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0E4F45]/90 via-[#0E4F45]/70 to-[#3CB89E]/80"></div>
        
        {/* Animated Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
            <h1 className="font-inter font-bold text-5xl md:text-7xl text-white mb-8 tracking-tight">
              Hãy Kết Nối Với Chúng Mình
            </h1>
            <p className="font-inter text-xl md:text-2xl text-[#E6F2EE] leading-relaxed max-w-3xl mx-auto opacity-90">
              Chúng mình luôn sẵn sàng lắng nghe và chia sẻ cùng bạn về Tà Xùa
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Content */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F8FAF9]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            
            {/* Enhanced Contact Information */}
            <div className="space-y-10">
              <div className="animate-fade-in-left">
                <h2 className="font-inter text-4xl font-bold mb-6 text-[#0E4F45]">
                  Liên Hệ Với Chúng Mình
                </h2>
                <p className="text-[#4A5568] font-inter leading-relaxed text-lg">
                  Bạn có câu hỏi gì về Tà Xùa không? Hay muốn được tư vấn cho chuyến du lịch sắp tới? 
                  Hãy liên hệ với chúng mình nhé - chúng mình rất vui được hỗ trợ bạn!
                </p>
              </div>

              {/* Enhanced Contact Cards */}
              <div className="space-y-6">
                {/* Address Card */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#E2ECE9] hover:border-[#3CB89E]/30 animate-fade-in-left">
                  <div className="flex items-start space-x-5">
                    <div className="w-16 h-16 bg-[#D8F3E7] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#3BAA86] transition-colors duration-300">
                      <MapPin className="w-7 h-7 text-[#3BAA86] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="font-inter font-semibold text-lg mb-2 text-[#0E4F45]">Chúng Mình Ở Đây</h3>
                      <p className="text-[#4A5568] text-base leading-relaxed">
                        Tà Xùa, Bắc Yên, Sơn La, Việt Nam
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email Card */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#E2ECE9] hover:border-[#3CB89E]/30 animate-fade-in-left">
                  <div className="flex items-start space-x-5">
                    <div className="w-16 h-16 bg-[#D8F3E7] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#3BAA86] transition-colors duration-300">
                      <Mail className="w-7 h-7 text-[#3BAA86] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="font-inter font-semibold text-lg mb-2 text-[#0E4F45]">Gửi Email Cho Chúng Mình</h3>
                      <a 
                        href="mailto:vivietteam@gmail.com" 
                        className="text-[#3BAA86] hover:text-[#0E4F45] transition-colors duration-300 text-base font-medium"
                      >
                        vivietteam@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#E2ECE9] hover:border-[#3CB89E]/30 animate-fade-in-left">
                  <div className="flex items-start space-x-5">
                    <div className="w-16 h-16 bg-[#D8F3E7] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#3BAA86] transition-colors duration-300">
                      <Phone className="w-7 h-7 text-[#3BAA86] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="font-inter font-semibold text-lg mb-2 text-[#0E4F45]">Gọi Điện Cho Chúng Mình</h3>
                      <a 
                        href="tel:0903946185" 
                        className="text-[#3BAA86] hover:text-[#0E4F45] transition-colors duration-300 text-base font-medium"
                      >
                        090 394 6185
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hours Card */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#E2ECE9] hover:border-[#3CB89E]/30 animate-fade-in-left">
                  <div className="flex items-start space-x-5">
                    <div className="w-16 h-16 bg-[#D8F3E7] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#3BAA86] transition-colors duration-300">
                      <Clock className="w-7 h-7 text-[#3BAA86] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="font-inter font-semibold text-lg mb-2 text-[#0E4F45]">Thời Gian Hoạt Động</h3>
                      <div className="text-[#4A5568] space-y-1 text-base">
                        <p>Thứ 2 - Thứ 6: 8:00 - 18:00</p>
                        <p>Thứ 7 - Chủ nhật: 8:00 - 20:00</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media Card */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#E2ECE9] hover:border-[#3CB89E]/30 animate-fade-in-left">
                  <div className="flex items-start space-x-5">
                    <div className="w-16 h-16 bg-[#D8F3E7] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#3BAA86] transition-colors duration-300">
                      <Facebook className="w-7 h-7 text-[#3BAA86] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-inter font-semibold text-lg mb-3 text-[#0E4F45]">Theo Dõi Chúng Mình</h3>
                      <a 
                        href="#" 
                        className="inline-flex items-center px-6 py-3 bg-[#3CB89E] hover:bg-[#0E4F45] text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                      >
                        <Facebook className="w-4 h-4 mr-2" />
                        Theo dõi
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Tips Section */}
              <div className="bg-[#EAF8F2] rounded-2xl p-8 border-l-4 border-[#3CB89E] animate-fade-in-left">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#3CB89E] rounded-full flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-inter text-xl font-semibold mb-4 text-[#0E4F45]">
                      Mẹo Liên Hệ Hiệu Quả
                    </h3>
                    <ul className="space-y-3 text-[#4A5568] font-inter italic">
                      <li className="flex items-start">
                        <span className="text-[#3CB89E] mr-3 font-bold">•</span>
                        Gọi điện trực tiếp để được tư vấn nhanh nhất
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#3CB89E] mr-3 font-bold">•</span>
                        Gửi email để nhận thông tin chi tiết về tour
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#3CB89E] mr-3 font-bold">•</span>
                        Theo dõi Facebook để cập nhật tin tức mới nhất
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#3CB89E] mr-3 font-bold">•</span>
                        Chúng mình sẽ phản hồi trong vòng 24 giờ
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Contact Form */}
            <div className="animate-fade-in-right">
              <ContactForm className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Map Section */}
      <section className="py-20 bg-gradient-to-b from-[#F8FAF9] to-[#E3F3EE]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="font-inter text-4xl font-bold mb-6 text-[#0E4F45]">
              Tà Xùa Ở Đâu Trên Bản Đồ?
            </h2>
            <p className="text-[#4A5568] font-inter max-w-3xl mx-auto text-lg leading-relaxed">
              Khám phá vị trí của Tà Xùa – vùng đất của mây, rừng và những con người thân thiện.
            </p>
            <p className="text-[#6B7280] font-inter max-w-2xl mx-auto mt-4">
              Tà Xùa nằm ở vùng núi Tây Bắc tuyệt đẹp, thuộc tỉnh Sơn La. 
              Đây chính là điểm đến lý tưởng cho những ai yêu thích thiên nhiên hoang sơ và muốn tìm hiểu văn hóa bản địa.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#E2ECE9] animate-fade-in-up">
              <div className="aspect-video bg-gradient-to-br from-[#F0F9F4] to-[#E6F7ED] flex items-center justify-center relative">
                {/* Fallback Background */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-30"
                  style={{
                    backgroundImage: 'url(/images/website background/Tà Xùa 1.png)'
                  }}
                />
                <div className="absolute inset-0 bg-white/60"></div>
                
                {/* Content */}
                <div className="text-center relative z-10">
                  <div className="w-20 h-20 bg-[#3CB89E] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <MapPin className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-[#0E4F45] font-inter font-semibold text-xl mb-2">
                    Đang tải bản đồ...
                  </p>
                  <p className="text-[#4A5568] font-inter">
                    Tà Xùa, Bắc Yên, Sơn La, Việt Nam
                  </p>
                  <div className="mt-6 flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3CB89E]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Custom Animations */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out forwards;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out forwards;
        }

        /* Parallax effect on scroll */
        @media (prefers-reduced-motion: no-preference) {
          .parallax-bg {
            transform: translateY(var(--scroll-y, 0) * 0.5px);
          }
        }
      `}</style>
    </Layout>
  );
};

export default Contact;