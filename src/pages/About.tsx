import { useState } from 'react';
import Header from '@/components/Header';
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
      description: 'Khám phá nét văn hóa độc đáo của người H\'Mông với trang phục truyền thống, lễ hội và phong tục tập quán.',
      image: hmongCultureImage,
      icon: Users
    },
    {
      title: 'Chè Shan Tuyết',
      description: 'Thưởng thức loại chè cổ thụ nổi tiếng với hương vị đặc biệt và giá trị dinh dưỡng cao.',
      image: shanTuyetTeaImage,
      icon: Leaf
    },
    {
      title: 'Ẩm Thực Địa Phương',
      description: 'Khám phá những món ăn truyền thống được chế biến từ nguyên liệu tươi ngon của núi rừng.',
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
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-96 bg-gradient-to-b from-black/30 to-black/60 flex items-center justify-center">
          <div className="relative text-center text-white z-10">
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-4 drop-shadow-2xl">
              Về Tà Xùa
            </h1>
            <p className="font-inter text-xl md:text-2xl max-w-2xl mx-auto">
              Khám phá vẻ đẹp, văn hóa và lịch sử của vùng núi Tây Bắc
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Tà Xùa - Nơi Gặp Gỡ Của Mây Và Núi
                </h2>
                <p className="font-inter text-lg text-muted-foreground leading-relaxed mb-6">
                  Tà Xùa là một trong những địa danh du lịch nổi tiếng của tỉnh Sơn La, được mệnh danh là 
                  "Nóc nhà của Tây Bắc" với đỉnh Phu Sang cao 2.865m. Nơi đây nổi tiếng với cảnh quan hùng vĩ, 
                  biển mây bạt ngàn và những đồi chè Shan Tuyết cổ thụ hàng trăm năm tuổi.
                </p>
                <p className="font-inter text-lg text-muted-foreground leading-relaxed">
                  Không chỉ sở hữu vẻ đẹp thiên nhiên kỳ vĩ, Tà Xùa còn là nơi lưu giữ những nét văn hóa 
                  độc đáo của các dân tộc thiểu số, đặc biệt là người H'Mông với những phong tục tập quán, 
                  lễ hội truyền thống và nghề thủ công đặc sắc.
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
              Tà Xùa Trong Những Con Số
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
            Điểm Nổi Bật Văn Hóa
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
                  Địa Lý & Khí Hậu
                </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="p-6">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center font-playfair text-xl">
                      <MapPin className="w-5 h-5 mr-2 text-primary" />
                      Vị Trí Địa Lý
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 font-inter text-muted-foreground">
                    <p>• Thuộc huyện Bắc Yên, tỉnh Sơn La</p>
                    <p>• Cách Hà Nội khoảng 240km</p>
                    <p>• Nằm trên dãy Hoàng Liên Sơn</p>
                    <p>• Ranh giới với Lào Cai và Yên Bái</p>
                    <p>• Độ cao từ 1.200m đến 2.865m</p>
                  </CardContent>
                </Card>

                <Card className="p-6">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center font-playfair text-xl">
                      <Mountain className="w-5 h-5 mr-2 text-primary" />
                      Khí Hậu
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 font-inter text-muted-foreground">
                    <p>• Khí hậu ôn đới cao nguyên</p>
                    <p>• Mùa khô: 10 - 4 (năm sau)</p>
                    <p>• Mùa mưa: 5 - 9</p>
                    <p>• Nhiệt độ trung bình: 15-20°C</p>
                    <p>• Tốt nhất: 10-12 và 3-5</p>
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
              Lịch Sử & Truyền Thuyết
            </h2>
            <div className="space-y-8">
              <Card className="p-8">
                <h3 className="font-playfair text-2xl font-bold text-foreground mb-4 flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-primary" />
                  Nguồn Gốc Tên Gọi
                </h3>
                <p className="font-inter text-lg text-muted-foreground leading-relaxed mb-4">
                  "Tà Xùa" trong tiếng H'Mông có nghĩa là "nơi có nhiều sương mù". Tên gọi này phản ánh đúng 
                  đặc điểm khí hậu của vùng núi cao này, nơi thường xuyên có sương mù và biển mây bao phủ.
                </p>
                <p className="font-inter text-lg text-muted-foreground leading-relaxed">
                  Theo truyền thuyết của người H'Mông, Tà Xùa là nơi các vị thần cư ngụ, bảo vệ cho những 
                  đồi chè cổ thụ và mang lại may mắn cho người dân địa phương.
                </p>
              </Card>

              <Card className="p-8">
                <h3 className="font-playfair text-2xl font-bold text-foreground mb-4 flex items-center">
                  <Leaf className="w-6 h-6 mr-3 text-primary" />
                  Di Sản Chè Shan Tuyết
                </h3>
                <p className="font-inter text-lg text-muted-foreground leading-relaxed mb-4">
                  Những cây chè Shan Tuyết ở Tà Xùa có tuổi đời từ 300-500 năm, được coi là di sản quý báu 
                  của vùng đất này. Chúng được trồng bởi tổ tiên của người H'Mông từ những thế kỷ trước.
                </p>
                <p className="font-inter text-lg text-muted-foreground leading-relaxed">
                  Loại chè này có hương vị đặc biệt, được ví như "cam lộ của núi rừng", không chỉ có giá trị 
                  kinh tế mà còn mang ý nghĩa văn hóa sâu sắc trong đời sống tinh thần của người dân.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-primary to-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-6">
              Sẵn Sàng Khám Phá Tà Xùa?
            </h2>
            <p className="font-inter text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Hãy để chúng tôi đồng hành cùng bạn trong hành trình khám phá vẻ đẹp kỳ vĩ của Tà Xùa
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              Lên Kế Hoạch Du Lịch
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </Layout>
  );
};

export default About;