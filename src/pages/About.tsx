import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import LoginModal from '@/components/LoginModal';
import RegisterModal from '@/components/RegisterModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Globe, Lightbulb, Users, Target, Eye, TreePine, Handshake, Sparkles } from 'lucide-react';
import LazyImage from '@/components/LazyImage';

const About = () => {
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const handleLogin = async (data: { email: string; password: string }) => {
    setIsLoggedIn(true);
    setUserName(data.email.split('@')[0]);
    setIsLoginModalOpen(false);
  };

  const handleRegister = async (data: { fullName: string; email: string; phone: string; password: string; confirmPassword: string }) => {
    setIsLoggedIn(true);
    setUserName(data.fullName);
    setIsRegisterModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
  };

  // Team members data
  const teamMembers = [
    {
      name: 'Trịnh Phước (Kevin)',
      role: 'Project Lead',
      quote: 'Tà Xùa Mùa Xanh là hành trình đầu tiên để kiểm chứng niềm tin rằng công nghệ có thể đi cùng thiên nhiên.',
      image: '/Kevin.png'
    },
    {
      name: 'Khánh Linh',
      role: 'Content & Local Culture',
      quote: 'Tà Xùa Mùa Xanh là hành trình đầu tiên để kiểm chứng niềm tin rằng công nghệ có thể đi cùng thiên nhiên.',
      image: '/Khanh Linh.png'
    },
    {
      name: 'Xuân Mai',
      role: 'UI/UX Designer',
      quote: 'Tà Xùa Mùa Xanh là hành trình đầu tiên để kiểm chứng niềm tin rằng công nghệ có thể đi cùng thiên nhiên.',
      image: '/Xuan Mai.png'
    },
    {
      name: 'Tuấn Khanh',
      role: 'Developer',
      quote: 'Tà Xùa Mùa Xanh là hành trình đầu tiên để kiểm chứng niềm tin rằng công nghệ có thể đi cùng thiên nhiên.',
      image: '/Tuan Khanh.png'
    }
  ];

  // Core values data
  const coreValues = [
    {
      title: 'Trẻ trung',
      description: 'Chúng tôi là người trẻ, tin vào hành động nhỏ có thể tạo nên thay đổi lớn.',
      icon: Sparkles
    },
    {
      title: 'Trách nhiệm',
      description: 'Với môi trường, với cộng đồng, với chính lựa chọn của mình.',
      icon: Handshake
    },
    {
      title: 'Sáng tạo',
      description: 'Áp dụng công nghệ như một công cụ để kết nối và hỗ trợ, không để thay thế.',
      icon: Lightbulb
    },
    {
      title: 'Nhân văn',
      description: 'Đặt con người và thiên nhiên làm trung tâm trong mọi quyết định.',
      icon: Heart
    }
  ];

  // Animation effect for values section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

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
      
      <main className="pt-30">
        {/* Hero Section */}
        <section 
          className="relative h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-green-700 flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="relative text-center text-white z-10 max-w-4xl mx-auto px-4">
            <h1 className="font-inter text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl leading-tight tracking-wide">
              🌿 About Us – Tà Xùa Mùa Xanh
            </h1>
            <p className="font-inter text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed drop-shadow-lg font-light">
              Tà Xùa – vùng đất nằm giữa mây trời Tây Bắc – đang dần trở thành điểm đến hấp dẫn với giới trẻ. 
              Nhưng phía sau những tấm ảnh "săn mây" và khung cảnh yên bình, vẫn còn đó những câu hỏi về phát triển bền vững, 
              sinh kế cộng đồng và vai trò của công nghệ trong bảo tồn tự nhiên.
            </p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </section>

        {/* Story Formation Section */}
        <section className="py-20 container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-inter text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Lý Do Ra Đời
              </h2>
              <div className="w-24 h-1 bg-emerald-500 mx-auto"></div>
            </div>

            <div className="space-y-20">
              {/* Story 1 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <h3 className="font-inter text-2xl font-bold text-gray-900 mb-6">
                    Khởi Nguồn Từ Trăn Trở
                  </h3>
                  <p className="font-inter text-lg text-gray-700 leading-relaxed mb-6">
                    Tà Xùa Mùa Xanh được khởi xướng từ những trăn trở đó. Dù chưa từng đặt chân đến Tà Xùa, 
                    chúng tôi – ViViet Team – cảm nhận được rằng nơi này đang cần những cách tiếp cận mới mẻ, 
                    bền vững và có trách nhiệm hơn.
                  </p>
                  <p className="font-inter text-lg text-gray-700 leading-relaxed">
                    Dự án ra đời trong khuôn khổ cuộc thi Tech4Green 2025, như một mô hình thử nghiệm của thế hệ trẻ 
                    về cách du lịch có thể kết nối con người – thiên nhiên – công nghệ, mà không đánh đổi môi trường 
                    hoặc bản sắc văn hóa.
                  </p>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                      alt="Nhóm bạn trẻ làm việc ngoài trời"
                      className="w-full h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                </div>
              </div>

              {/* Story 2 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                      alt="Phỏng vấn người dân địa phương"
                      className="w-full h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                </div>
                <div>
                  <h3 className="font-inter text-2xl font-bold text-gray-900 mb-6">
                    Mục Tiêu Dự Án
                  </h3>
                  <div className="space-y-4">
                    <p className="font-inter text-lg text-gray-700 leading-relaxed">
                      – Ứng dụng chuyển đổi số để phát triển nền tảng website tích hợp dịch vụ du lịch, 
                      trải nghiệm xanh và công cụ theo dõi – quản lý môi trường.
                    </p>
                    <p className="font-inter text-lg text-gray-700 leading-relaxed">
                      – Tạo hệ sinh thái du lịch có trách nhiệm: dễ tiếp cận cho Gen Z, Gen Y; 
                      mang lại lợi ích thực tế cho người dân bản địa.
                    </p>
                    <p className="font-inter text-lg text-gray-700 leading-relaxed">
                      – Thí điểm mô hình khởi nghiệp xã hội ứng dụng công nghệ nhằm hỗ trợ phát triển sinh kế 
                      và bảo tồn giá trị địa phương.
                    </p>
                  </div>
                </div>
              </div>

              {/* Story 3 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <h3 className="font-inter text-2xl font-bold text-gray-900 mb-6">
                    Đội Ngũ ViViet
                  </h3>
                  <p className="font-inter text-lg text-gray-700 leading-relaxed mb-6">
                    ViViet Team gồm bốn thành viên: Phước Trịnh (Kevin), Xuân Mai, Khánh Linh và Tuấn Khanh – 
                    những học sinh, sinh viên mang trong mình sự quan tâm đến thiên nhiên, văn hóa và phát triển bền vững.
                  </p>
                  <p className="font-inter text-lg text-gray-700 leading-relaxed">
                    Dù đến từ những nơi khác nhau, chúng tôi gặp nhau ở cùng một điểm: niềm tin rằng du lịch có thể 
                    là một phần của giải pháp, chứ không chỉ là một ngành công nghiệp tiêu thụ. 
                    Tà Xùa Mùa Xanh là hành trình đầu tiên của chúng tôi để kiểm chứng niềm tin đó.
                  </p>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                      alt="Đội ngũ làm việc với hệ thống công nghệ"
                      className="w-full h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-inter text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Sứ Mệnh Và Tầm Nhìn
                </h2>
                <div className="w-24 h-1 bg-emerald-500 mx-auto"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0">
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
                      Chúng tôi hướng tới xây dựng một mô hình du lịch xanh – cộng đồng – công nghệ, 
                      nơi mỗi chuyến đi không chỉ là một hành trình cá nhân mà còn là cơ hội để sẻ chia giá trị, 
                      lan tỏa nhận thức và đóng góp tích cực cho vùng đất được khám phá.
                    </p>
                  </CardContent>
                </Card>

                <Card className="p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0">
                  <CardHeader className="pb-6">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                      <Eye className="w-8 h-8 text-emerald-600" />
                    </div>
                    <CardTitle className="font-inter text-2xl font-bold text-gray-900">
                      Tầm Nhìn
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-inter text-lg text-gray-700 leading-relaxed">
                      Chúng tôi mơ ước rằng một ngày, Tà Xùa sẽ trở thành biểu tượng của du lịch xanh tại Việt Nam – 
                      không phải vì nơi đây đẹp nhất, mà vì nơi đây được gìn giữ và phát triển đúng cách. 
                      Mỗi chuyến đi đến Tà Xùa sẽ là một hành động yêu thương và cống hiến – 
                      dành cho thiên nhiên, cho cộng đồng địa phương và cho chính tương lai chung.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-inter text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Đội Ngũ Của Chúng Tôi
              </h2>
              <div className="w-24 h-1 bg-emerald-500 mx-auto mb-6"></div>
              <p className="font-inter text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Những con người đam mê, tài năng và luôn hướng đến việc tạo ra những giá trị tích cực cho cộng đồng.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = `https://images.unsplash.com/photo-${index % 2 === 0 ? '1507003211169-0a1dd7228f2d' : '1494790108755-2616c5e29a5b'}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                      <p className="text-white text-sm font-medium leading-relaxed">
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
        <section className="py-20 bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-inter text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Giá Trị Cốt Lõi 🌱
                </h2>
                <div className="w-24 h-1 bg-emerald-500 mx-auto"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {coreValues.map((value, index) => {
                  const IconComponent = value.icon;
                  return (
                    <Card 
                      key={index} 
                      className="value-card p-8 text-center bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 opacity-0"
                      style={{ animationDelay: `${index * 200}ms` }}
                    >
                      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
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
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-inter text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                💬 Lời Kết
              </h2>
              <div className="space-y-4 mb-8">
                <p className="font-inter text-xl text-white/90 leading-relaxed">
                  Nếu bạn cũng tin rằng mỗi chuyến đi nên để lại điều gì đó đẹp đẽ hơn cả những bức ảnh,
                </p>
                <p className="font-inter text-xl text-white/90 leading-relaxed">
                  Nếu bạn tin rằng công nghệ có thể đồng hành cùng thiên nhiên thay vì đối lập với nó,
                </p>
                <p className="font-inter text-xl text-white/90 leading-relaxed font-semibold">
                  Chúng tôi mời bạn cùng viết tiếp câu chuyện Tà Xùa Mùa Xanh. 💚
                </p>
              </div>
              <Button 
                size="lg" 
                variant="secondary" 
                className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                onClick={() => navigate('/contact')}
              >
                Liên Hệ Hợp Tác
              </Button>
            </div>
          </div>
        </section>

        {/* CSS for animations */}
        <style>
          {`
            @keyframes fade-in {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            .animate-fade-in {
              animation: fade-in 0.8s ease-out forwards;
            }
          `}
        </style>
      </main>

      <Footer />
    </Layout>
  );
};

export default About;