import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import GoogleMapSection from '@/components/GoogleMapSection';
import { AttractionGrid } from '@/components/AttractionGrid';
import SafetyHub from '@/components/SafetyHub';
import { Attraction } from '@/data/attractionsData';
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Star, TreePine, Mountain, Users, Leaf, ArrowRight, Info, Award, Target, Heart, Sparkles, Filter, ChevronDown } from 'lucide-react';
import LazyImage from '@/components/LazyImage';
import { useNavigate } from 'react-router-dom';
import { useScrollAnimation, animationClasses } from '@/hooks/useScrollAnimation';
import { useParallax } from '@/hooks/useParallax';

const Explore = () => {
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [treesPlanted, setTreesPlanted] = useState(0);
  const [wasteCollected, setWasteCollected] = useState(0);
  const [villageVisitors, setVillageVisitors] = useState(0);
  const [teaTreesPreserved, setTeaTreesPreserved] = useState(0);
  const navigate = useNavigate();

  // Parallax effect for hero background
  const parallaxOffset = useParallax(-0.3);

  // Scroll animations for different sections
  const heroAnimation = useScrollAnimation({ threshold: 0.2 });
  const destinationsAnimation = useScrollAnimation({ threshold: 0.1 });
  const activitiesAnimation = useScrollAnimation({ threshold: 0.1 });
  const skyQuestAnimation = useScrollAnimation({ threshold: 0.1 });
  const mapAnimation = useScrollAnimation({ threshold: 0.1 });

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
    
    // Count-up animations
    const animateCount = (setter: (value: number) => void, target: number, duration: number = 2000) => {
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(start));
        }
      }, 16);
    };

    setTimeout(() => {
      animateCount(setTreesPlanted, 278);
      animateCount(setWasteCollected, 1200);
      animateCount(setVillageVisitors, 312);
      animateCount(setTeaTreesPreserved, 120);
    }, 1000);
  }, []);

  const handleAttractionClick = (attraction: Attraction) => {
    setSelectedAttraction(attraction);
    console.log('Selected attraction:', attraction);
  };

  // Điểm đến nổi bật với dữ liệu thật
  const featuredDestinations = [
    {
      id: 1,
      name: 'Sống Lưng Khủng Long',
      description: 'Đỉnh núi hùng vĩ với tầm nhìn 360° tuyệt đẹp, nơi mây bay qua từng ngọn thông',
      image: '/images/explore/places/dragon-spine.jpg',
      rating: 4.9,
      reviews: 127,
      greenBadge: 'Minh bạch 100%',
      greenInfo: 'Đã trồng 45 cây, dùng năng lượng mặt trời 80%, thuê 12 người bản địa',
      difficulty: 'Khó',
      duration: '4-5 giờ',
      highlights: ['Tầm nhìn 360°', 'Bình minh tuyệt đẹp', 'Rừng thông nguyên sinh']
    },
    {
      id: 2,
      name: 'Rừng Thông Tà Xùa',
      description: 'Rừng thông nguyên sinh với không khí trong lành, âm thanh thiên nhiên êm dịu',
      image: '/images/explore/places/pine-forest.jpg',
      rating: 4.8,
      reviews: 89,
      greenBadge: 'Minh bạch 100%',
      greenInfo: 'Đã trồng 32 cây, dùng năng lượng mặt trời 75%, thuê 8 người bản địa',
      difficulty: 'Trung bình',
      duration: '2-3 giờ',
      highlights: ['Không khí trong lành', 'Âm thanh thiên nhiên', 'Đường mòn an toàn']
    },
    {
      id: 3,
      name: 'Bản H\'Mông Tà Xùa',
      description: 'Trải nghiệm văn hóa bản địa đích thực, học hỏi từ người dân địa phương',
      image: '/images/explore/places/hmong-village.jpg',
      rating: 4.7,
      reviews: 156,
      greenBadge: 'Minh bạch 100%',
      greenInfo: 'Đã trồng 28 cây, dùng năng lượng mặt trời 70%, thuê 15 người bản địa',
      difficulty: 'Dễ',
      duration: '3-4 giờ',
      highlights: ['Văn hóa bản địa', 'Thủ công truyền thống', 'Ẩm thực địa phương']
    }
  ];

  // Hoạt động xanh
  const greenActivities = [
    {
      id: 1,
      title: 'Cây Được Trồng',
      count: treesPlanted,
      icon: TreePine,
      color: 'emerald',
      description: 'Góp phần phục hồi rừng',
      action: 'Tham gia trồng cây'
    },
    {
      id: 2,
      title: 'Kg Rác Được Thu',
      count: wasteCollected,
      icon: Leaf,
      color: 'green',
      description: 'Làm sạch môi trường',
      action: 'Tham gia dọn dẹp'
    },
    {
      id: 3,
      title: 'Lượt Thăm Bản',
      count: villageVisitors,
      icon: Users,
      color: 'teal',
      description: 'Hỗ trợ kinh tế địa phương',
      action: 'Thăm bản làng'
    },
    {
      id: 4,
      title: 'Cây Chè Được Bảo Tồn',
      count: teaTreesPreserved,
      icon: Mountain,
      color: 'cyan',
      description: 'Bảo vệ di sản nông nghiệp',
      action: 'Tìm hiểu thêm'
    }
  ];

  // Gợi ý điểm đến
  const suggestedDestinations = [
    { name: 'Đỉnh Tà Xùa', type: 'Đỉnh núi', image: '/images/explore/thumbs/thumb1.jpg' },
    { name: 'Thác Bạc', type: 'Thác nước', image: '/images/explore/thumbs/thumb2.jpg' },
    { name: 'Rừng Tre', type: 'Rừng nguyên sinh', image: '/images/explore/thumbs/thumb3.jpg' },
    { name: 'Bản Phình Hồ', type: 'Làng bản', image: '/images/explore/thumbs/thumb1.jpg' },
    { name: 'Cầu Mây', type: 'Điểm check-in', image: '/images/explore/thumbs/thumb2.jpg' }
  ];

  // Map filters
  const mapFilters = [
    { id: 'all', label: 'Tất cả', count: 15 },
    { id: 'peaks', label: 'Đỉnh núi', count: 5 },
    { id: 'villages', label: 'Bản làng', count: 4 },
    { id: 'forests', label: 'Rừng thông', count: 3 },
    { id: 'waterfalls', label: 'Thác nước', count: 3 }
  ];

  return (
    <Layout>
      <Header />
      <main 
        className="min-h-screen overflow-x-hidden relative"
        style={{
          // Layer 1: Main gradient background
          background: `
            linear-gradient(180deg, #E8F2FA 0%, #F7FAFC 50%, #E8F2FA 100%),
            radial-gradient(ellipse at top right, rgba(100,181,246,0.15), transparent),
            radial-gradient(ellipse at bottom left, rgba(52,211,153,0.1), transparent)
          `,
          // Layer 2: Noise texture overlay
          backgroundImage: `url('/textures/noise-light.svg')`,
          backgroundBlendMode: 'overlay',
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          minHeight: '100vh',
          position: 'relative'
        }}
      >
        {/* Hero Section - Enhanced với improved readability */}
        <section 
          className={`relative min-h-[90vh] flex items-center justify-center overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Parallax background image container */}
           <div 
             className="absolute inset-0 will-change-transform transform-gpu"
             style={{
               backgroundImage: `url('/hero-taxua-clouds.jpg')`,
               backgroundSize: 'cover',
               backgroundPosition: '50% 30%',
               transform: `translateY(${parallaxOffset}px) scale(1.1)`,
               willChange: 'transform'
             }}
           />
          
          {/* Enhanced overlay gradient for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent z-10"></div>
          
          {/* Content container with localized backdrop blur */}
          <div className="relative z-20 text-center px-4 max-w-[720px] mx-auto">
            <div 
              className="backdrop-blur-[2px] bg-black/20 px-8 py-6 rounded-2xl inline-block mb-8"
              style={{
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15) inset'
              }}
            >
              {/* Main title with enhanced contrast */}
              <h1 className="text-6xl font-extrabold text-white leading-tight tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
                Những Câu Chuyện
                <br />
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
                  Đang Chờ Bạn
                </span>
              </h1>
            </div>
            
            {/* Subtitle with improved readability */}
            <p className={`text-lg text-gray-100 max-w-[720px] mx-auto mb-12 leading-relaxed font-normal transition-all duration-1000 delay-700 drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
              Mỗi con đường, mỗi ngọn núi đều có những điều kỳ diệu để kể
            </p>
            
            {/* Enhanced CTA Buttons */}
            <div className={`flex flex-col md:flex-row justify-center gap-3 md:gap-4 transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
              <Button 
                className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-full px-8 py-3 hover:brightness-110 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                onClick={() => navigate('/explore/exhibition')}
              >
                <Leaf className="w-5 h-5 mr-2" />
                Khám phá ngay
              </Button>
              <Button 
                className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-full px-8 py-3 hover:brightness-110 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                onClick={() => navigate('/sky-quest')}
              >
                <Mountain className="w-5 h-5 mr-2" />
                Sky Quest
              </Button>
              <Button 
                className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-full px-8 py-3 hover:brightness-110 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                onClick={() => navigate('/safety-hub')}
              >
                <Users className="w-5 h-5 mr-2" />
                An toàn
              </Button>
            </div>
          </div>
        </section>

        {/* Khu 1: Những Nơi Đáng Tin Cậy - transparent background with fade-out transition */}
        <section 
          ref={destinationsAnimation.elementRef}
          className="py-24 bg-transparent relative overflow-hidden"
          style={{
            marginTop: '-60px',
            zIndex: 30,
            paddingTop: '120px'
          }}
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className={`text-center mb-20 ${animationClasses.fadeUp.transition} ${destinationsAnimation.isVisible ? animationClasses.fadeUp.animate : animationClasses.fadeUp.initial}`}>
              <h2 className="font-inter text-6xl font-extrabold text-gray-900 mb-8 tracking-tight">
                Những Nơi Đáng Tin Cậy
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
                Được xác thực bởi cộng đồng du khách và người dân địa phương
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredDestinations.map((destination, index) => (
                <Card 
                  key={destination.id}
                  className={`group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${animationClasses.fadeUp.transition} ${destinationsAnimation.isVisible ? animationClasses.fadeUp.animate : animationClasses.fadeUp.initial}`}
                  style={{
                    background: 'rgba(255, 255, 255, 0.65)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '20px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-[20px]">
                      <LazyImage
                         src={destination.image}
                         alt={destination.name}
                         className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
                       />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-[#F1F5F9] text-[#0F172A] text-sm font-medium px-3 py-1 rounded-full">
                          {destination.greenBadge}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-semibold">{destination.rating}</span>
                          <span className="text-xs text-gray-600">({destination.reviews})</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="font-semibold text-xl text-gray-900 mb-2">{destination.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{destination.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {destination.highlights.map((highlight, idx) => (
                          <Badge key={idx} className="bg-[#F1F5F9] text-[#0F172A] text-sm font-medium px-3 py-1 rounded-full">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Target className="w-4 h-4" />
                            {destination.difficulty}
                          </span>
                          <span className="flex items-center gap-1">
                            <Info className="w-4 h-4" />
                            {destination.duration}
                          </span>
                        </div>
                      </div>
                      
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-full px-6 py-2 hover:brightness-110 transition-all duration-300">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Khám phá ngay
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Khu 2: Hành Động Có Ý Nghĩa - transparent background */}
        <section 
          ref={activitiesAnimation.elementRef}
          className="py-24 bg-transparent relative overflow-hidden"
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className={`text-center mb-20 ${animationClasses.fadeUp.transition} ${activitiesAnimation.isVisible ? animationClasses.fadeUp.animate : animationClasses.fadeUp.initial}`}>
              <h2 className="font-inter text-6xl font-extrabold text-gray-900 mb-8 tracking-tight">
                Hành Động Có Ý Nghĩa
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
                Mỗi chuyến đi của bạn đều góp phần tạo ra tác động tích cực
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {greenActivities.map((activity, index) => (
                <Card 
                  key={activity.id}
                  className={`text-center group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${animationClasses.fadeUp.transition} ${activitiesAnimation.isVisible ? animationClasses.fadeUp.animate : animationClasses.fadeUp.initial}`}
                  style={{
                    background: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '20px',
                    boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
                    backdropFilter: 'blur(8px)',
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <CardContent className="p-8">
                    <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                      <activity.icon className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">{activity.count}+</div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">{activity.title}</h3>
                    <p className="text-gray-600 text-sm mb-6">{activity.description}</p>
                    <Button className="bg-gradient-to-r from-green-600 to-blue-500 text-white font-semibold px-6 py-2 rounded-full hover:brightness-110 transition-all duration-300">
                      {activity.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Sky Quest Gợi Mở */}
        <section 
          ref={skyQuestAnimation.elementRef}
          className="py-24 bg-transparent relative overflow-hidden"
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className={`text-center mb-16 ${animationClasses.fadeUp.transition} ${skyQuestAnimation.isVisible ? animationClasses.fadeUp.animate : animationClasses.fadeUp.initial}`}>
              <h2 className="font-inter text-6xl font-extrabold text-gray-900 mb-8 tracking-tight">
                Sky Quest Gợi Mở
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Khám phá bản thân qua hành trình tâm linh giữa núi rừng Tà Xùa
              </p>
              
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-full px-8 py-3 hover:brightness-110 shadow-lg transition-all duration-300"
                  onClick={() => navigate('/sky-quest')}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Bắt đầu hành trình
                </Button>
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-full px-8 py-3 hover:brightness-110 shadow-lg transition-all duration-300"
                  onClick={() => navigate('/sky-quest/calm')}
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Tìm bình yên
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Bản Đồ Các Địa Điểm */}
        <section 
          ref={mapAnimation.elementRef}
          className="py-24 bg-transparent relative overflow-hidden"
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className={`text-center mb-16 ${animationClasses.fadeUp.transition} ${mapAnimation.isVisible ? animationClasses.fadeUp.animate : animationClasses.fadeUp.initial}`}>
              <h2 className="font-inter text-6xl font-extrabold text-gray-900 mb-8 tracking-tight">
                Bản Đồ Các Địa Điểm
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
                Tìm hiểu và lên kế hoạch cho chuyến đi của bạn
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
              {/* Map Section - 70% */}
              <div className="lg:col-span-7">
                <div 
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: 'rgba(255, 255, 255, 0.75)',
                    boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
                    backdropFilter: 'blur(8px)'
                  }}
                >
                  {/* Filter chips */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-wrap gap-3">
                      {mapFilters.map((filter) => (
                        <button
                          key={filter.id}
                          onClick={() => setSelectedFilter(filter.id)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                            selectedFilter === filter.id
                              ? 'bg-blue-600 text-white shadow-lg'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {filter.label}
                          <span className={`ml-1 md:ml-2 px-1 md:px-2 py-1 rounded-full text-xs ${
                            selectedFilter === filter.id ? 'bg-white/20' : 'bg-gray-300'
                          }`}>
                            {filter.count}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Map container */}
                   <div className="h-[500px] relative">
                     <GoogleMapSection />
                   </div>
                </div>
              </div>

              {/* Suggested Destinations - 30% */}
              <div className="lg:col-span-3">
                <div 
                  className="rounded-2xl p-6"
                  style={{
                    background: 'rgba(255, 255, 255, 0.75)',
                    boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
                    backdropFilter: 'blur(8px)'
                  }}
                >
                  <h3 className="font-semibold text-xl text-gray-900 mb-6">Điểm đến gợi ý</h3>
                  
                  <div className="space-y-4">
                    {suggestedDestinations.map((destination, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <LazyImage
                          src={destination.image}
                          alt={destination.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{destination.name}</h4>
                          <p className="text-sm text-gray-600">{destination.type}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-full px-6 py-3 hover:brightness-110 shadow-lg transition-all duration-300">
                    <MapPin className="w-5 h-5 mr-2" />
                    Xem tất cả trên bản đồ
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Safety Hub */}
      <SafetyHub />
      
      <Footer />
    </Layout>
  );
};

export default Explore;