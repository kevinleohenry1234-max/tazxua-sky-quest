import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import LoginModal, { LoginData } from '@/components/LoginModal';
import RegisterModal from '@/components/RegisterModal';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Camera, 
  Video, 
  Music, 
  ChefHat, 
  Sparkles,
  ArrowRight,
  Play,
  Volume2,
  Utensils,
  Palette,
  ChevronDown
} from 'lucide-react';
import LazyImage from '@/components/LazyImage';

// Import images for each category
import terraceFieldsImage from '@/assets/dragon-spine.jpg';
import flycamVideoImage from '@/assets/hero-taxua-clouds.jpg';
import traditionalInstrumentImage from '@/assets/hmong-culture.jpg';
import localCuisineImage from '@/assets/local-cuisine.jpg';
import aiCreationImage from '@/assets/shan-tuyet-tea.jpg';

const DigitalExhibition = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (data: LoginData) => {
    setIsLoggedIn(true);
    setUserName(data.email.split('@')[0]);
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
  };

  const exhibitionCategories = [
    {
      id: 'images',
      title: 'Hình Ảnh',
      subtitle: 'Ruộng Bậc Thang Hùng Vĩ',
      description: 'Khám phá vẻ đẹp tuyệt vời của những thửa ruộng bậc thang uốn lượn như những dải lụa vàng trên sườn núi.',
      image: terraceFieldsImage,
      icon: Camera,
      route: '/trien-lam/hinh-anh',
      color: 'from-emerald-600 to-teal-700',
      size: 'large' // Takes 2 columns
    },
    {
      id: 'videos',
      title: 'Video',
      subtitle: 'Góc Nhìn Từ Trên Cao',
      description: 'Trải nghiệm Tà Xùa qua những thước phim flycam tuyệt đẹp, mang đến góc nhìn toàn cảnh về vùng đất thiêng.',
      image: flycamVideoImage,
      icon: Video,
      route: '/trien-lam/video',
      color: 'from-blue-600 to-indigo-700',
      size: 'medium'
    },
    {
      id: 'music',
      title: 'Âm Nhạc',
      subtitle: 'Tiếng Khèn Núi Rừng',
      description: 'Lắng nghe những giai điệu dân tộc H\'Mông với tiếng khèn, tiếng đàn bầu vang vọng giữa núi rừng.',
      image: traditionalInstrumentImage,
      icon: Music,
      route: '/trien-lam/am-nhac',
      color: 'from-purple-600 to-pink-700',
      size: 'medium'
    },
    {
      id: 'cuisine',
      title: 'Ẩm Thực',
      subtitle: 'Hương Vị Núi Rừng',
      description: 'Thưởng thức những món ăn truyền thống được chế biến từ nguyên liệu tươi ngon của núi rừng Tà Xùa.',
      image: localCuisineImage,
      icon: ChefHat,
      route: '/trien-lam/am-thuc',
      color: 'from-orange-600 to-red-700',
      size: 'medium'
    },
    {
      id: 'ai-creation',
      title: 'Sáng Tạo AI',
      subtitle: 'Nghệ Thuật Số Hiện Đại',
      description: 'Khám phá những tác phẩm nghệ thuật được tạo ra bởi AI, kết hợp giữa công nghệ và văn hóa truyền thống.',
      image: aiCreationImage,
      icon: Sparkles,
      route: '/trien-lam/sang-tao-ai',
      color: 'from-violet-600 to-purple-700',
      size: 'large' // Takes 2 columns
    }
  ];

  const handleCategoryClick = (route: string) => {
    navigate(route);
  };

  return (
    <Layout>
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
        onSwitchToLogin={() => {
          setIsRegisterModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Background with parallax effect */}
        <div className="absolute inset-0 opacity-20">
          <LazyImage
            src={terraceFieldsImage}
            alt="Tà Xùa Digital Exhibition"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <h1 className="font-playfair text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-8 leading-tight">
            Nơi Văn Hóa
            <span className="block bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Tà Xùa
            </span>
            <span className="block text-5xl md:text-6xl lg:text-7xl mt-4">
              Được Kể Lại
            </span>
          </h1>
          
          <p className="font-inter text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Khám phá kho tàng văn hóa phong phú của Tà Xùa qua những trải nghiệm số tương tác, 
            nơi truyền thống và công nghệ hòa quyện tạo nên những câu chuyện đầy cảm hứng.
          </p>

          {/* Scroll indicator */}
          <div className="animate-bounce">
            <ChevronDown className="w-8 h-8 text-white/70 mx-auto" />
          </div>
        </div>
      </section>

      {/* Exhibition Categories Grid */}
      <section className="py-32 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-6">
              Khám Phá Triển Lãm
            </h2>
            <p className="font-inter text-xl text-muted-foreground max-w-2xl mx-auto">
              Chọn một danh mục để bắt đầu hành trình khám phá văn hóa Tà Xùa
            </p>
          </div>

          {/* Asymmetrical Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {exhibitionCategories.map((category, index) => {
              const IconComponent = category.icon;
              const isLarge = category.size === 'large';
              
              return (
                <Card
                  key={category.id}
                  className={`group cursor-pointer overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-105 ${
                    isLarge ? 'md:col-span-2' : 'md:col-span-1'
                  } ${index === 0 ? 'md:row-span-2' : ''} ${index === 4 ? 'md:row-span-2' : ''}`}
                  onClick={() => handleCategoryClick(category.route)}
                >
                  <div className="relative h-80 md:h-96 overflow-hidden">
                    {/* Background Image */}
                    <LazyImage
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80 group-hover:opacity-70 transition-opacity duration-500`}></div>
                    
                    {/* Content */}
                    <CardContent className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                      {/* Icon */}
                      <div className="mb-6">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      
                      {/* Text Content */}
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-playfair text-3xl md:text-4xl font-bold mb-2">
                            {category.title}
                          </h3>
                          <p className="font-inter text-lg text-white/90 font-medium">
                            {category.subtitle}
                          </p>
                        </div>
                        
                        <p className="font-inter text-white/80 leading-relaxed">
                          {category.description}
                        </p>
                        
                        {/* CTA Button */}
                        <Button
                          variant="ghost"
                          className="w-fit bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white/50 backdrop-blur-sm transition-all duration-300 group-hover:translate-x-2"
                        >
                          Khám Phá Ngay
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </Layout>
  );
};

export default DigitalExhibition;