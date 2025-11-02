import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mountain, Users, Heart, Award, Globe, Camera, Leaf, Star, MapPin, Clock, Mail, Phone, Facebook, Instagram, Youtube, Twitter, Lightbulb, Target, Eye, TreePine, Handshake, Sparkles, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import LoginModal from '@/components/LoginModal';
import RegisterModal from '@/components/RegisterModal';
import LazyImage from '@/components/LazyImage';

const About = () => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [user, setUser] = useState(null);

  // Team members data
  const teamMembers = [
    {
      name: "Kevin Trịnh",
      role: "Project Leader - Web Developer",
      image: "/about us/Kevin.png",
      quote: "Công nghệ và thiên nhiên có thể đồng hành cùng nhau để tạo ra những trải nghiệm du lịch bền vững"
    },
    {
      name: "Tuấn Khanh",
      role: "Vice Leader - Researcher - Media Editor",
      image: "/about us/Tuan Khanh.png",
      quote: "Mỗi nghiên cứu và sản phẩm truyền thông đều hướng đến việc bảo vệ và phát triển du lịch xanh"
    },
    {
      name: "Xuân Mai",
      role: "Marketer - Business Analyst",
      image: "/about us/Xuan Mai.png",
      quote: "Phân tích thị trường để tạo ra những chiến lược marketing bền vững và có ý nghĩa"
    },
    {
      name: "Khánh Linh",
      role: "Content Creator - General Assistant",
      image: "/about us/Khanh Linh.png",
      quote: "Tạo ra nội dung chất lượng để kết nối cộng đồng yêu thiên nhiên và du lịch có trách nhiệm"
    }
  ];

  // Core values data
  const coreValues = [
    {
      title: "Trẻ trung",
      description: "Luôn đổi mới, sáng tạo và năng động trong mọi hoạt động",
      icon: Sparkles
    },
    {
      title: "Trách nhiệm",
      description: "Cam kết bảo vệ môi trường và phát triển bền vững",
      icon: Heart
    },
    {
      title: "Sáng tạo",
      description: "Ứng dụng công nghệ để tạo ra những trải nghiệm độc đáo",
      icon: Lightbulb
    },
    {
      title: "Nhân văn",
      description: "Đặt con người và cộng đồng làm trung tâm của mọi quyết định",
      icon: Users
    }
  ];

  // Animation on scroll
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-up');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up-element');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <Layout>
      {/* Login/Register Modals */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />
      <RegisterModal 
        isOpen={showRegisterModal} 
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <LazyImage
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              alt="Tà Xùa Mùa Xanh - Thiên nhiên hùng vĩ"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/40 via-emerald-800/30 to-emerald-700/40"></div>
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="font-inter text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Về ViViet – Tà Xùa Mùa Xanh
            </h1>
            <p className="font-inter text-xl md:text-2xl text-white/80 mb-8 leading-relaxed max-w-3xl mx-auto">
              Hành trình kết nối công nghệ và thiên nhiên, tạo ra những trải nghiệm du lịch bền vững và ý nghĩa
            </p>
            <Button 
              size="lg" 
              className="bg-white text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              onClick={() => navigate('/skyquest')}
            >
              Khám phá hành trình
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </section>

        {/* Story & Mission Section */}
        <section className="py-20 bg-white fade-up-element">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Image */}
              <div className="order-2 lg:order-1">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <LazyImage
                    src="/about us/4 Members.png"
                    alt="Đội ngũ ViViet - 4 thành viên cốt lõi"
                    className="w-full h-96 object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
              
              {/* Content */}
              <div className="order-1 lg:order-2">
                <h2 className="font-inter text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Khởi nguồn từ trăn trở
                </h2>
                <div className="w-24 h-1 bg-emerald-500 mb-8"></div>
                <div className="space-y-6">
                  <p className="font-inter text-lg text-gray-700 leading-relaxed">
                    ViViet ra đời từ một câu hỏi đơn giản: "Làm thế nào để mỗi chuyến đi không chỉ mang lại niềm vui cho bản thân mà còn để lại điều gì đó tích cực cho nơi chúng ta đến?"
                  </p>
                  <p className="font-inter text-lg text-gray-700 leading-relaxed">
                    Chúng tôi tin rằng du lịch không chỉ là việc tiêu thụ trải nghiệm, mà còn là cơ hội để sẻ chia, học hỏi và đóng góp. Công nghệ không phải để thay thế thiên nhiên, mà để giúp chúng ta hiểu và yêu thương nó hơn.
                  </p>
                  <p className="font-inter text-lg text-gray-700 leading-relaxed font-semibold text-emerald-600">
                    Tà Xùa Mùa Xanh là hành trình đầu tiên của chúng tôi để kiểm chứng niềm tin đó.
                  </p>
                </div>
              </div>
            </div>

            {/* Mission & Vision Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
              <Card className="p-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 hover:-translate-y-2">
                <CardHeader className="pb-6">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                    <Target className="w-8 h-8 text-emerald-600" />
                  </div>
                  <CardTitle className="font-inter text-2xl font-bold text-gray-900">
                    Sứ Mệnh
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-inter text-lg text-gray-700 leading-relaxed">
                    Xây dựng mô hình du lịch xanh – cộng đồng – công nghệ, nơi mỗi chuyến đi là cơ hội sẻ chia giá trị, lan tỏa nhận thức và đóng góp tích cực cho vùng đất được khám phá.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-teal-50 to-green-50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 hover:-translate-y-2">
                <CardHeader className="pb-6">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                    <Eye className="w-8 h-8 text-teal-600" />
                  </div>
                  <CardTitle className="font-inter text-2xl font-bold text-gray-900">
                    Tầm Nhìn
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-inter text-lg text-gray-700 leading-relaxed">
                    Tà Xùa trở thành biểu tượng du lịch xanh Việt Nam – nơi được gìn giữ và phát triển đúng cách. Mỗi chuyến đi là hành động yêu thương dành cho thiên nhiên, cộng đồng và tương lai chung.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-gray-50 fade-up-element">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="font-inter text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Những người đứng sau dự án
              </h2>
              <div className="w-24 h-1 bg-emerald-500 mx-auto mb-6"></div>
              <p className="font-inter text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Đội ngũ đam mê, tài năng và luôn hướng đến việc tạo ra những giá trị tích cực cho cộng đồng
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="group overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <LazyImage
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-6 left-6 right-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                      <p className="text-white text-sm font-medium leading-relaxed italic">
                        "{member.quote}"
                      </p>
                    </div>
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="font-inter text-xl font-bold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="font-inter text-emerald-600 font-medium">
                      {member.role}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 fade-up-element">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="font-inter text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Giá trị cốt lõi
              </h2>
              <div className="w-24 h-1 bg-emerald-500 mx-auto mb-6"></div>
              <p className="font-inter text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Những nguyên tắc định hướng mọi hoạt động của chúng tôi
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <Card 
                    key={index} 
                    className="p-8 text-center bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h3 className="font-inter text-2xl font-bold text-gray-900 mb-4">
                      {value.title}
                    </h3>
                    <p className="font-inter text-gray-700 leading-relaxed">
                      {value.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Partnership & Connection Section */}
        <section className="py-20 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 relative overflow-hidden fade-up-element">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <div className="text-center">
              <h2 className="font-inter text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Cùng ViViet viết tiếp hành trình xanh
              </h2>
              <div className="w-24 h-1 bg-white/50 mx-auto mb-8"></div>
              <div className="space-y-4 mb-12 max-w-4xl mx-auto">
                <p className="font-inter text-xl text-white/90 leading-relaxed">
                  Nếu bạn cũng tin rằng mỗi chuyến đi nên để lại điều gì đó đẹp đẽ hơn cả những bức ảnh,
                </p>
                <p className="font-inter text-xl text-white/90 leading-relaxed">
                  Nếu bạn tin rằng công nghệ có thể đồng hành cùng thiên nhiên thay vì đối lập với nó,
                </p>
                <p className="font-inter text-2xl text-white font-semibold leading-relaxed">
                  Chúng tôi mời bạn cùng viết tiếp câu chuyện Tà Xùa Mùa Xanh 💚
                </p>
              </div>
              <Button 
                size="lg" 
                className="bg-white text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                onClick={() => navigate('/contact')}
              >
                Liên hệ hợp tác
                <Handshake className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* CSS for animations */}
        <style>
          {`
            @keyframes fade-up {
              from {
                opacity: 0;
                transform: translateY(50px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            .animate-fade-up {
              animation: fade-up 0.8s ease-out forwards;
            }
            
            .fade-up-element {
              opacity: 0;
              transform: translateY(50px);
              transition: all 0.8s ease-out;
            }
            
            .fade-up-element.animate-fade-up {
              opacity: 1;
              transform: translateY(0);
            }
          `}
        </style>
      </main>

      <Footer />
    </Layout>
  );
};

export default About;