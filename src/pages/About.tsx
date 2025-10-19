import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import LoginModal from '@/components/LoginModal';
import RegisterModal from '@/components/RegisterModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Mountain, Leaf, Clock, Camera } from 'lucide-react';
import LazyImage from '@/components/LazyImage';
import hmongCultureImage from '@/assets/hmong-culture.jpg';
import shanTuyetTeaImage from '@/assets/shan-tuyet-tea.jpg';
import localCuisineImage from '@/assets/local-cuisine.jpg';
import taxuaMountainBg from '@/assets/taxua-mountain-bg.svg';

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
  const culturalHighlights = [
    {
      title: 'Văn Hóa H\'Mông',
      description: 'Hãy cùng chúng mình khám phá những nét văn hóa đặc sắc của người H\'Mông - từ trang phục truyền thống rực rỡ sắc màu đến những lễ hội đầy ý nghĩa.',
      image: hmongCultureImage,
      icon: Users
    },
    {
      title: 'Chè Shan Tuyết',
      description: 'Thưởng thức từng ngụm chè cổ thụ với hương vị thanh mát, ngọt dịu - món quà thiên nhiên mà núi rừng Tà Xùa dành tặng.',
      image: shanTuyetTeaImage,
      icon: Leaf
    },
    {
      title: 'Ẩm Thực Địa Phương',
      description: 'Cùng nếm thử những món ăn được chế biến từ tình yêu và nguyên liệu tươi ngon nhất của núi rừng Tây Bắc.',
      image: localCuisineImage,
      icon: Camera
    }
  ];

  const statistics = [
    { number: '2,865m', label: 'Độ cao đỉnh Phu Sang' },
    { number: '300+', label: 'Năm tuổi chè cổ thụ' },
    { number: '-5°C', label: 'Nhiệt độ thấp nhất' },
    { number: '12', label: 'Tháng khí hậu mát mẻ' }
  ];

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
        <section className="relative h-96 bg-gradient-to-b from-black/30 to-black/60 flex items-center justify-center">
          <div className="relative text-center text-white z-10">
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-4 drop-shadow-2xl">
              Câu Chuyện Tà Xùa
            </h1>
            <p className="font-inter text-xl md:text-2xl max-w-2xl mx-auto">
              Nơi mỗi ngọn núi đều có một câu chuyện, mỗi đám mây đều mang một ký ức
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Tà Xùa - Nơi Mây Và Núi Yêu Nhau
                </h2>
                <p className="font-inter text-lg text-muted-foreground leading-relaxed mb-6">
                  Bạn có biết không? Tà Xùa được mệnh danh là "Nóc nhà của Tây Bắc" với đỉnh Phu Sang cao 2.865m. 
                  Nhưng điều đặc biệt nhất ở đây không chỉ là độ cao, mà là cách thiên nhiên đã vẽ nên một bức tranh 
                  tuyệt đẹp với biển mây bạt ngàn và những đồi chè Shan Tuyết cổ thụ hàng trăm năm tuổi.
                </p>
                <p className="font-inter text-lg text-muted-foreground leading-relaxed">
                  Và còn hơn thế nữa - Tà Xùa là nơi lưu giữ những câu chuyện, truyền thuyết của người H'Mông. 
                  Mỗi lễ hội, mỗi phong tục đều mang trong mình tình yêu sâu sắc với mảnh đất này.
                </p>
              </div>
              <div className="relative">
                <LazyImage
                  src={hmongCultureImage}
                  alt="Văn hóa Tà Xùa"
                  className="w-full h-96 object-cover rounded-lg shadow-soft"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section 
          className="py-16 relative overflow-hidden"
          style={{
            backgroundImage: `url(${taxuaMountainBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-black/25"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-12 text-center drop-shadow-lg">
              Tà Xùa Qua Những Con Số Thú Vị
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {statistics.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="font-inter text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cultural Highlights */}
        <section className="py-16 container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Những Điều Đặc Biệt Bạn Sẽ Yêu Thích
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {culturalHighlights.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Card key={index} className="group overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-2">
                  <div className="relative h-48 overflow-hidden">
                    <LazyImage
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-playfair text-xl font-bold text-white">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="font-inter text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Geography & Climate */}
        <section 
          className="py-16 relative overflow-hidden"
          style={{
            backgroundImage: `url(${taxuaMountainBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-black/25"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
                <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-12 text-center drop-shadow-lg">
                  Tà Xùa Ở Đâu Và Thời Tiết Như Thế Nào?
                </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="p-6">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center font-playfair text-xl">
                      <MapPin className="w-5 h-5 mr-2 text-primary" />
                      Tà Xùa Nằm Ở Đâu?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 font-inter text-muted-foreground">
                    <p>• Thuộc huyện Bắc Yên, tỉnh Sơn La</p>
                    <p>• Cách Hà Nội khoảng 240km (khoảng 5-6 tiếng lái xe)</p>
                    <p>• Nằm trên dãy Hoàng Liên Sơn hùng vĩ</p>
                    <p>• Giáp ranh với Lào Cai và Yên Bái</p>
                    <p>• Độ cao từ 1.200m đến 2.865m</p>
                  </CardContent>
                </Card>

                <Card className="p-6">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center font-playfair text-xl">
                      <Mountain className="w-5 h-5 mr-2 text-primary" />
                      Thời Tiết Như Thế Nào?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 font-inter text-muted-foreground">
                    <p>• Khí hậu mát mẻ quanh năm</p>
                    <p>• Mùa khô: tháng 10 - 4 (năm sau)</p>
                    <p>• Mùa mưa: tháng 5 - 9</p>
                    <p>• Nhiệt độ trung bình: 15-20°C</p>
                    <p>• Thời điểm đẹp nhất: tháng 10-12 và 3-5</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* History */}
        <section className="py-16 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              Những Câu Chuyện Thú Vị Về Tà Xùa
            </h2>
            <div className="space-y-8">
              <Card className="p-8">
                <h3 className="font-playfair text-2xl font-bold text-foreground mb-4 flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-primary" />
                  Tại Sao Lại Gọi Là "Tà Xùa"?
                </h3>
                <p className="font-inter text-lg text-muted-foreground leading-relaxed mb-4">
                  Bạn có tò mò tại sao nơi này lại có cái tên đặc biệt như vậy không? "Tà Xùa" trong tiếng H'Mông 
                  có nghĩa là "nơi có nhiều sương mù". Thật tuyệt vời phải không? Cái tên đã nói lên tất cả về 
                  vẻ đẹp mơ màng, thơ mộng của vùng núi cao này.
                </p>
                <p className="font-inter text-lg text-muted-foreground leading-relaxed">
                  Người H'Mông tin rằng Tà Xùa là nơi các vị thần cư ngụ, bảo vệ những đồi chè cổ thụ và 
                  mang lại may mắn cho mọi người. Nghe thật lãng mạn và đầy ý nghĩa, phải không?
                </p>
              </Card>

              <Card className="p-8">
                <h3 className="font-playfair text-2xl font-bold text-foreground mb-4 flex items-center">
                  <Leaf className="w-6 h-6 mr-3 text-primary" />
                  Câu Chuyện Về Chè Shan Tuyết Cổ Thụ
                </h3>
                <p className="font-inter text-lg text-muted-foreground leading-relaxed mb-4">
                  Bạn có thể tưởng tượng đường không? Những cây chè Shan Tuyết ở đây đã sống từ 300-500 năm rồi đấy! 
                  Chúng như những nhân chứng lịch sử, được trồng bởi tổ tiên của người H'Mông từ những thế kỷ trước.
                </p>
                <p className="font-inter text-lg text-muted-foreground leading-relaxed">
                  Mỗi ngụm chè Shan Tuyết không chỉ có hương vị đặc biệt mà còn chứa đựng cả tâm hồn, tình yêu 
                  của người dân nơi đây. Họ gọi nó là "cam lộ của núi rừng" - thật đúng như vậy!
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-primary to-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-6">
              Bạn Đã Sẵn Sàng Cho Cuộc Phiêu Lưu Chưa?
            </h2>
            <p className="font-inter text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Hãy để chúng mình đồng hành cùng bạn khám phá những điều kỳ diệu mà Tà Xùa đang chờ đợi
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                variant="secondary" 
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => navigate('/explore')}
              >
                Khám Phá Ngay
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => navigate('/sky-quest/journey')}
              >
                Tham Gia Sky Quest
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </Layout>
  );
};

export default About;