import React, { useState } from 'react';
import ContactForm from '@/components/ContactForm';
import Header from '@/components/Header';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import LoginModal, { LoginData } from '@/components/LoginModal';
import RegisterModal, { RegisterData } from '@/components/RegisterModal';
import { MapPin, Mail, Phone, Clock, Facebook, Lightbulb, MessageCircle, PhoneCall } from 'lucide-react';

const Contact = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLogin = (data: LoginData) => {
    console.log('Login data:', data);
    setShowLoginModal(false);
  };

  const handleRegister = (data: RegisterData) => {
    console.log('Register data:', data);
    setShowRegisterModal(false);
  };

  return (
    <Layout>
      <Header 
        onLoginClick={() => setShowLoginModal(true)}
        onRegisterClick={() => setShowRegisterModal(true)}
      />
      <MainNavigation />

      {/* Enhanced Hero Section - Reduced Height */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat parallax-bg"
          style={{
            backgroundImage: 'url(/images/website background/Tà Xùa 1.png)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0E4F45]/80 via-[#0E4F45]/70 to-[#3CB89E]/60"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="font-inter text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Hãy Kết Nối Với Chúng Mình
            </h1>
            
            {/* Subtitle */}
            <p className="font-inter text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
              Tư vấn hành trình, hỗ trợ thông tin và sẵn sàng lắng nghe bạn – chỉ một tin nhắn là đủ.
            </p>
            
            {/* Friendly Icons */}
            <div className="flex justify-center items-center space-x-6 mb-8">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <PhoneCall className="w-6 h-6 text-white" />
              </div>
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Enhanced Contact Content */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-white to-[#F8FAF9]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 max-w-7xl mx-auto">
            
            {/* Enhanced Contact Information */}
            <div className="space-y-6 md:space-y-10">
              <div className="animate-fade-in-left">
                <h2 className="font-inter text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-[#0E4F45]">
                  Liên Hệ Với Chúng Mình
                </h2>
                <p className="text-[#4A5568] font-inter leading-relaxed text-base md:text-lg">
                  Bạn có câu hỏi gì về Tà Xùa không? Hay muốn được tư vấn cho chuyến du lịch sắp tới? 
                  Hãy liên hệ với chúng mình nhé - chúng mình rất vui được hỗ trợ bạn!
                </p>
              </div>

              {/* Consultant Avatar */}
              <div className="bg-gradient-to-br from-[#3CB89E]/10 to-[#0E4F45]/10 rounded-3xl p-8 border border-[#3CB89E]/20 animate-fade-in-left">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#3CB89E] to-[#0E4F45] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    H
                  </div>
                  <div>
                    <h3 className="font-inter text-xl font-bold text-[#0E4F45] mb-2">
                      Chị Hằng – Tư vấn viên địa phương
                    </h3>
                    <p className="text-[#4A5568] font-inter">
                      Người bạn đồng hành tin cậy cho chuyến khám phá Tà Xùa của bạn
                    </p>
                  </div>
                </div>
              </div>

              {/* Enhanced Contact Cards */}
              <div className="space-y-6">
                {/* Address Card */}
                <div className="group bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#E2ECE9] hover:border-[#3CB89E]/30 animate-fade-in-left">
                  <div className="flex items-start space-x-4 md:space-x-6">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#3CB89E]/20 to-[#0E4F45]/20 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:from-[#3CB89E] group-hover:to-[#0E4F45] transition-all duration-300">
                      <MapPin className="w-5 h-5 md:w-7 md:h-7 text-[#3BAA86] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-inter font-semibold text-xs md:text-sm text-[#3CB89E] mb-1 uppercase tracking-wide">Địa chỉ liên hệ</h4>
                      <h3 className="font-inter font-bold text-lg md:text-xl mb-2 md:mb-3 text-[#0E4F45]">Chúng Mình Ở Đây</h3>
                      <p className="text-[#4A5568] text-sm md:text-base leading-relaxed">
                        Tà Xùa, Bắc Yên, Sơn La, Việt Nam
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email Card */}
                <div className="group bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#E2ECE9] hover:border-[#3CB89E]/30 animate-fade-in-left">
                  <div className="flex items-start space-x-4 md:space-x-6">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#3CB89E]/20 to-[#0E4F45]/20 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:from-[#3CB89E] group-hover:to-[#0E4F45] transition-all duration-300">
                      <Mail className="w-5 h-5 md:w-7 md:h-7 text-[#3BAA86] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-inter font-semibold text-xs md:text-sm text-[#3CB89E] mb-1 uppercase tracking-wide">Email liên hệ</h4>
                      <h3 className="font-inter font-bold text-lg md:text-xl mb-2 md:mb-3 text-[#0E4F45]">Gửi Email Cho Chúng Mình</h3>
                      <a 
                        href="mailto:vivietteam@gmail.com" 
                        className="text-[#3BAA86] hover:text-[#0E4F45] transition-colors duration-300 text-base md:text-lg font-semibold hover:underline break-all"
                      >
                        vivietteam@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="group bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#E2ECE9] hover:border-[#3CB89E]/30 animate-fade-in-left">
                  <div className="flex items-start space-x-4 md:space-x-6">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#3CB89E]/20 to-[#0E4F45]/20 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:from-[#3CB89E] group-hover:to-[#0E4F45] transition-all duration-300">
                      <Phone className="w-5 h-5 md:w-7 md:h-7 text-[#3BAA86] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-inter font-semibold text-xs md:text-sm text-[#3CB89E] mb-1 uppercase tracking-wide">Số điện thoại</h4>
                      <h3 className="font-inter font-bold text-lg md:text-xl mb-2 md:mb-3 text-[#0E4F45]">Gọi Điện Cho Chúng Mình</h3>
                      <a 
                        href="tel:0903946185" 
                        className="text-[#3BAA86] hover:text-[#0E4F45] transition-colors duration-300 text-base md:text-lg font-semibold hover:underline"
                      >
                        090 394 6185
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hours Card */}
                <div className="group bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#E2ECE9] hover:border-[#3CB89E]/30 animate-fade-in-left">
                  <div className="flex items-start space-x-4 md:space-x-6">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#3CB89E]/20 to-[#0E4F45]/20 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:from-[#3CB89E] group-hover:to-[#0E4F45] transition-all duration-300">
                      <Clock className="w-5 h-5 md:w-7 md:h-7 text-[#3BAA86] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-inter font-semibold text-xs md:text-sm text-[#3CB89E] mb-1 uppercase tracking-wide">Giờ làm việc</h4>
                      <h3 className="font-inter font-bold text-lg md:text-xl mb-2 md:mb-3 text-[#0E4F45]">Thời Gian Hoạt Động</h3>
                      <div className="text-[#4A5568] space-y-2 text-sm md:text-base">
                        <p className="flex justify-between">
                          <span>Thứ 2 - Thứ 6:</span>
                          <span className="font-semibold">8:00 - 18:00</span>
                        </p>
                        <p className="flex justify-between">
                          <span>Thứ 7 - Chủ nhật:</span>
                          <span className="font-semibold">8:00 - 20:00</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media Card */}
                <div className="group bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#E2ECE9] hover:border-[#3CB89E]/30 animate-fade-in-left">
                  <div className="flex items-start space-x-4 md:space-x-6">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-[#D8F3E7] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#3BAA86] transition-colors duration-300">
                      <Facebook className="w-5 h-5 md:w-7 md:h-7 text-[#3BAA86] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-inter font-semibold text-base md:text-lg mb-3 text-[#0E4F45]">Theo Dõi Chúng Mình</h3>
                      <a 
                        href="#" 
                        className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 bg-[#3CB89E] hover:bg-[#0E4F45] text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 text-sm md:text-base"
                      >
                        <Facebook className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                        Theo dõi
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Tips Section */}
              <div className="bg-gradient-to-br from-[#EAF8F2] to-[#F0FDF4] rounded-2xl md:rounded-3xl p-6 md:p-8 border border-[#D1FAE5] shadow-lg animate-fade-in-left">
                <div className="flex items-start space-x-4 md:space-x-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#3CB89E] to-[#10B981] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Lightbulb className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-inter text-xl md:text-2xl font-bold mb-4 md:mb-6 text-[#0E4F45]">
                      💡 Tips khi liên hệ
                    </h3>
                    <p className="text-[#6B7280] font-inter mb-3 md:mb-4 text-xs md:text-sm">
                      Để được phản hồi nhanh chóng:
                    </p>
                    <ul className="space-y-4 text-[#4A5568] font-inter">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-[#3CB89E] rounded-full mt-2 mr-4 flex-shrink-0"></div>
                        <span>Gọi điện trực tiếp để được tư vấn nhanh nhất</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-[#3CB89E] rounded-full mt-2 mr-4 flex-shrink-0"></div>
                        <span>Gửi email để nhận thông tin chi tiết về tour</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-[#3CB89E] rounded-full mt-2 mr-4 flex-shrink-0"></div>
                        <span>Theo dõi Facebook để cập nhật tin tức mới nhất</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-[#3CB89E] rounded-full mt-2 mr-4 flex-shrink-0"></div>
                        <span>Chúng mình sẽ phản hồi trong vòng 24 giờ</span>
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
      <section className="py-12 md:py-20 bg-gradient-to-b from-[#F8FAF9] to-[#E3F3EE]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16 animate-fade-in-up">
            <h2 className="font-inter text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-[#0E4F45]">
              Tìm Tà Xùa Trên Bản Đồ
            </h2>
            <p className="text-[#4A5568] font-inter max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
              Khám phá vị trí của Tà Xùa – vùng đất của mây và rừng nguyên sinh.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border border-[#E2ECE9] animate-fade-in-up">
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
                <div className="text-center relative z-10 px-4">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-[#3CB89E] rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg">
                    <MapPin className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <p className="text-[#0E4F45] font-inter font-semibold text-lg md:text-xl mb-2">
                    Bản đồ tạm thời không khả dụng
                  </p>
                  <p className="text-[#4A5568] font-inter text-sm md:text-base">
                    Tà Xùa, Bắc Yên, Sơn La, Việt Nam
                  </p>
                  <div className="mt-4 md:mt-6">
                    <p className="text-xs md:text-sm text-[#6B7280] font-inter">
                      Chúng tôi đang cập nhật bản đồ tương tác. Vui lòng quay lại sau!
                    </p>
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