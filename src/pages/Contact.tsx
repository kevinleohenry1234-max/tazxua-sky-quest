import React, { useState } from 'react';
import ContactForm from '@/components/ContactForm';
import Header from '@/components/Header';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import LoginModal from '@/components/LoginModal';
import RegisterModal from '@/components/RegisterModal';
import { MapPin, Mail, Phone, Clock, Facebook } from 'lucide-react';

const Contact = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const handleLogin = async (data: { email: string; password: string }) => {
    // Simulate login logic
    setIsLoggedIn(true);
    setUserName(data.email.split('@')[0]);
    setIsLoginModalOpen(false);
  };

  const handleRegister = async (data: { fullName: string; email: string; phone: string; password: string; confirmPassword: string }) => {
    // Simulate registration logic
    setIsLoggedIn(true);
    setUserName(data.fullName);
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
      {/* Hero Section */}
      <section className="relative pt-44 pb-20 bg-gradient-to-br from-primary via-primary/90 to-secondary text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
              Liên Hệ Với Chúng Tôi
            </h1>
            <p className="font-inter text-xl md:text-2xl text-white/90 leading-relaxed">
              Chúng tôi luôn sẵn sàng hỗ trợ và lắng nghe ý kiến của bạn về Tà Xùa
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                <div>
                  <h2 className="font-playfair text-3xl font-bold mb-6">
                    Thông Tin Liên Hệ
                  </h2>
                  <p className="text-muted-foreground font-inter leading-relaxed">
                    Hãy liên hệ với chúng tôi để được tư vấn và hỗ trợ tốt nhất cho chuyến du lịch Tà Xùa của bạn.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-inter font-semibold mb-2">Địa chỉ</h3>
                      <p className="text-muted-foreground">
                        Tà Xùa, Bắc Yên, Sơn La, Việt Nam
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-inter font-semibold mb-2">Email</h3>
                      <a 
                        href="mailto:vivietteam@gmail.com" 
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        vivietteam@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-inter font-semibold mb-2">Điện thoại</h3>
                      <a 
                        href="tel:0903946185" 
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        090 394 6185
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-inter font-semibold mb-2">Giờ làm việc</h3>
                      <div className="text-muted-foreground space-y-1">
                        <p>Thứ 2 - Thứ 6: 8:00 - 18:00</p>
                        <p>Thứ 7 - Chủ nhật: 8:00 - 20:00</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Facebook className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-inter font-semibold mb-2">Mạng xã hội</h3>
                      <a 
                        href="#" 
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        VIVIET Tà Xùa
                      </a>
                    </div>
                  </div>
                </div>

                {/* Quick Tips */}
                <div className="bg-muted/50 rounded-lg p-6">
                  <h3 className="font-playfair text-xl font-semibold mb-4">
                    Mẹo Liên Hệ Nhanh
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Gọi điện trực tiếp để được tư vấn nhanh nhất</li>
                    <li>• Gửi email để nhận thông tin chi tiết</li>
                    <li>• Theo dõi Facebook để cập nhật tin tức mới</li>
                    <li>• Thời gian phản hồi: trong vòng 24 giờ</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold mb-4">
              Vị Trí Của Chúng Tôi
            </h2>
            <p className="text-muted-foreground font-inter max-w-2xl mx-auto">
              Tà Xùa nằm ở vùng núi phía Tây Bắc Việt Nam, thuộc tỉnh Sơn La, 
              là điểm đến lý tưởng cho những ai yêu thích thiên nhiên hoang sơ.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-soft overflow-hidden">
            <div className="aspect-video bg-muted flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground font-inter">
                  Bản đồ vị trí sẽ được tích hợp ở đây
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Tà Xùa, Bắc Yên, Sơn La, Việt Nam
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </Layout>
  );
};

export default Contact;