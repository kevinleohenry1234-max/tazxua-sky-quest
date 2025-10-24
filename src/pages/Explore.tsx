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
import { MapPin, Star, TreePine, Mountain, Users, Leaf, ArrowRight, Info, Award, Target, Heart, Sparkles, Filter, ChevronDown, Compass, Camera, Shield, Recycle, Home, Brain, Clock, AlertTriangle, Phone } from 'lucide-react';
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
      category: 'mountain',
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
      category: 'forest',
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
      category: 'village',
      greenBadge: 'Minh bạch 100%',
      greenInfo: 'Đã trồng 28 cây, dùng năng lượng mặt trời 70%, thuê 15 người bản địa',
      difficulty: 'Dễ',
      duration: '3-4 giờ',
      highlights: ['Văn hóa bản địa', 'Thủ công truyền thống', 'Ẩm thực địa phương']
    },
    {
      id: 4,
      name: 'Ẩm Thực Tà Xùa',
      description: 'Khám phá hương vị đặc trưng của vùng núi cao với các món ăn truyền thống',
      image: '/images/explore/places/local-food.jpg',
      rating: 4.6,
      reviews: 98,
      category: 'food',
      greenBadge: 'Minh bạch 100%',
      greenInfo: 'Sử dụng nguyên liệu địa phương 100%, hỗ trợ nông dân bản địa',
      difficulty: 'Dễ',
      duration: '2-3 giờ',
      highlights: ['Món ăn truyền thống', 'Nguyên liệu sạch', 'Văn hóa ẩm thực']
    },
    {
      id: 5,
      name: 'Homestay Eco Tà Xùa',
      description: 'Nghỉ dưỡng thân thiện với môi trường, hòa mình vào thiên nhiên',
      image: '/images/explore/places/eco-homestay.jpg',
      rating: 4.8,
      reviews: 142,
      category: 'resort',
      greenBadge: 'Minh bạch 100%',
      greenInfo: 'Năng lượng tái tạo 90%, xử lý nước thải sinh học',
      difficulty: 'Dễ',
      duration: '1-2 ngày',
      highlights: ['Thân thiện môi trường', 'Tầm nhìn đẹp', 'Dịch vụ chất lượng']
    },
    {
      id: 6,
      name: 'Triển Lãm Số Tà Xùa',
      description: 'Trải nghiệm công nghệ AR/VR để khám phá lịch sử và văn hóa Tà Xùa',
      image: '/images/explore/places/digital-exhibition.jpg',
      rating: 4.5,
      reviews: 76,
      category: 'exhibition',
      greenBadge: 'Minh bạch 100%',
      greenInfo: 'Sử dụng công nghệ tiết kiệm năng lượng, nội dung giáo dục bền vững',
      difficulty: 'Dễ',
      duration: '1-2 giờ',
      highlights: ['Công nghệ AR/VR', 'Tương tác thú vị', 'Giáo dục bền vững']
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
          // Layer 1: Main gradient background with explore colors
          background: `
            linear-gradient(180deg, var(--explore-mist) 0%, #F7FAFC 50%, var(--explore-mist) 100%),
            radial-gradient(ellipse at top right, rgba(30,124,112,0.15), transparent),
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
                Khám Phá Tà Xùa –
                <br />
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]" style={{ color: 'var(--explore-emerald-light)' }}>
                  Những Câu Chuyện Đang Chờ Bạn
                </span>
              </h1>
            </div>
            
            {/* Subtitle with improved readability */}
            <p className={`text-lg text-gray-100 max-w-[720px] mx-auto mb-12 leading-relaxed font-normal transition-all duration-1000 delay-700 drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
              Mỗi con đường, mỗi bản làng, mỗi đỉnh mây đều ẩn chứa điều kỳ diệu để kể.
            </p>
            
            {/* Enhanced CTA Buttons */}
            <div className={`flex flex-col md:flex-row justify-center gap-3 md:gap-4 transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
              <Button 
                className="text-white rounded-full px-8 py-3 hover:brightness-110 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                style={{ background: `linear-gradient(to right, var(--explore-emerald), var(--explore-emerald-dark))` }}
                onClick={() => {
                  const element = document.getElementById('trusted-places-section');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Compass className="w-5 h-5 mr-2" />
                Khám phá hành trình
              </Button>
              <Button 
                className="text-white rounded-full px-8 py-3 hover:brightness-110 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                style={{ background: `linear-gradient(to right, var(--explore-sunrise), var(--explore-sunrise-dark))` }}
                onClick={() => {
                  const element = document.getElementById('digital-exhibition-section');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Camera className="w-5 h-5 mr-2" />
                Triển lãm số
              </Button>
              <Button 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full px-8 py-3 hover:brightness-110 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                onClick={() => navigate('/safety')}
              >
                <Shield className="w-5 h-5 mr-2" />
                An toàn & Bản đồ
              </Button>
            </div>
          </div>
        </section>

        {/* Khu 1: Những Nơi Đáng Tin Cậy - transparent background with fade-out transition */}
        <section 
          id="trusted-places-section"
          ref={destinationsAnimation.elementRef}
          className="py-24 bg-transparent relative overflow-hidden"
          style={{
            marginTop: '-60px',
            zIndex: 30,
            paddingTop: '120px'
          }}
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className={`text-center mb-12 ${animationClasses.fadeUp.transition} ${destinationsAnimation.isVisible ? animationClasses.fadeUp.animate : animationClasses.fadeUp.initial}`}>
              <h2 className="font-inter text-6xl font-extrabold text-gray-900 mb-8 tracking-tight">
                Những Nơi Đáng Tin Cậy
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
                Được xác thực bởi cộng đồng du khách và người dân địa phương
              </p>
            </div>

            {/* Bộ lọc thông minh theo chủ đề */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {[
                { id: 'all', label: 'Tất cả', icon: Sparkles },
                { id: 'mountain', label: 'Đỉnh núi', icon: Mountain },
                { id: 'village', label: 'Bản làng', icon: Users },
                { id: 'forest', label: 'Rừng thông', icon: TreePine },
                { id: 'food', label: 'Ẩm thực', icon: Heart },
                { id: 'resort', label: 'Nghỉ dưỡng', icon: Star },
                { id: 'exhibition', label: 'Triển lãm số', icon: Camera }
              ].map((filter) => {
                const IconComponent = filter.icon;
                return (
                  <Button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`rounded-full px-6 py-2 transition-all duration-300 ${
                      selectedFilter === filter.id
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                        : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white/90 border border-gray-200'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {filter.label}
                  </Button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredDestinations
                .filter(destination => selectedFilter === 'all' || destination.category === selectedFilter)
                .map((destination, index) => (
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
                        <Badge className="bg-emerald-100 text-emerald-800 text-sm font-medium px-3 py-1 rounded-full">
                          Xanh & An toàn
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-semibold">{destination.rating}</span>
                          <span className="text-xs text-gray-600">({destination.reviews})</span>
                        </div>
                      </div>
                      
                      {/* Hover overlay với thông tin nhanh */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-center text-white p-4">
                          <div className="mb-2">
                            <MapPin className="w-5 h-5 mx-auto mb-1" />
                            <p className="text-sm">Bản đồ thu nhỏ</p>
                          </div>
                          <div className="text-xs bg-white/20 rounded-full px-3 py-1">
                            Thời tiết: ☀️ 22°C
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="font-semibold text-xl text-gray-900 mb-2">{destination.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{destination.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {destination.highlights.map((highlight, idx) => (
                          <Badge key={idx} className="bg-amber-100 text-amber-800 text-sm font-medium px-3 py-1 rounded-full">
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
                      
                      <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full px-6 py-2 hover:brightness-110 transition-all duration-300">
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

        {/* Module Triển lãm số */}
        <section 
          id="digital-exhibition-section"
          className="py-24 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden"
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="font-inter text-6xl font-extrabold text-gray-900 mb-8 tracking-tight">
                Trải nghiệm Tà Xùa dưới góc nhìn số
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
                Cảm nhận văn hoá, thiên nhiên và con người qua triển lãm trực quan và nghệ thuật số
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Triển lãm 3D / AR */}
              <Card className="group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl bg-white/80 backdrop-blur-sm border-0 rounded-2xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-64 bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                        <Camera className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Triển lãm 3D / AR</h3>
                      <p className="text-sm opacity-90">Mô hình 3D tương tác</p>
                    </div>
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button className="bg-white text-purple-600 rounded-full px-6 py-2 font-semibold">
                        Khám phá ngay
                      </Button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Mountain className="w-4 h-4" />
                        <span>Sống lưng khủng long 3D</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>Bản làng H'Mông ảo</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <TreePine className="w-4 h-4" />
                        <span>Rừng chè cổ thụ AR</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Câu chuyện hình ảnh */}
              <Card className="group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl bg-white/80 backdrop-blur-sm border-0 rounded-2xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-64 bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                        <Heart className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Câu chuyện hình ảnh</h3>
                      <p className="text-sm opacity-90">Photo Story tương tác</p>
                    </div>
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button className="bg-white text-amber-600 rounded-full px-6 py-2 font-semibold">
                        Xem câu chuyện
                      </Button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Camera className="w-4 h-4" />
                        <span>Ảnh nghệ thuật Tà Xùa</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>Lời kể từ người dân</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Heart className="w-4 h-4" />
                        <span>Trải nghiệm du khách</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Âm thanh Tà Xùa */}
              <Card className="group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl bg-white/80 backdrop-blur-sm border-0 rounded-2xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-64 bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                        <Sparkles className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Âm thanh Tà Xùa</h3>
                      <p className="text-sm opacity-90">Soundscape thiên nhiên</p>
                    </div>
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button className="bg-white text-emerald-600 rounded-full px-6 py-2 font-semibold">
                        Nghe âm thanh
                      </Button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <TreePine className="w-4 h-4" />
                        <span>Âm thanh rừng thông</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Mountain className="w-4 h-4" />
                        <span>Tiếng gió trên đỉnh núi</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>Tiếng bản địa H'Mông</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Nút khám phá toàn màn hình */}
            <div className="text-center mt-12">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full px-12 py-4 text-lg font-semibold hover:brightness-110 transition-all duration-300 shadow-lg">
                <Camera className="w-6 h-6 mr-3" />
                Khám phá trong Triển lãm số
              </Button>
            </div>
          </div>
        </section>

        {/* Hành Động Có Ý Nghĩa */}
        <section 
          ref={activitiesAnimation.elementRef}
          className="py-24 bg-gradient-to-br from-green-50 to-emerald-50 relative overflow-hidden"
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className={`text-center mb-20 ${animationClasses.fadeUp.transition} ${activitiesAnimation.isVisible ? animationClasses.fadeUp.animate : animationClasses.fadeUp.initial}`}>
              <h2 className="font-inter text-6xl font-extrabold text-gray-900 mb-8 tracking-tight">
                Hành Động Có Ý Nghĩa
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
                Tham gia các hoạt động bảo vệ môi trường và hỗ trợ cộng đồng địa phương
              </p>
            </div>

            {/* Bảng số động */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
                <div className="text-5xl font-bold text-green-600 mb-2">{treesPlanted.toLocaleString()}</div>
                <div className="text-lg font-semibold text-gray-800 mb-1">Cây được trồng</div>
                <div className="text-sm text-gray-600">Cùng người dân địa phương</div>
              </div>
              <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
                <div className="text-5xl font-bold text-blue-600 mb-2">{wasteCollected.toLocaleString()}</div>
                <div className="text-lg font-semibold text-gray-800 mb-1">Kg rác thu gom</div>
                <div className="text-sm text-gray-600">Bảo vệ môi trường núi</div>
              </div>
              <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
                <div className="text-5xl font-bold text-purple-600 mb-2">{villageVisitors.toLocaleString()}</div>
                <div className="text-lg font-semibold text-gray-800 mb-1">Lượt ghé thăm</div>
                <div className="text-sm text-gray-600">Bản làng H'Mông</div>
              </div>
              <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
                <div className="text-5xl font-bold text-amber-600 mb-2">{teaTreesPreserved.toLocaleString()}</div>
                <div className="text-lg font-semibold text-gray-800 mb-1">Cây chè bảo tồn</div>
                <div className="text-sm text-gray-600">Rừng chè cổ thụ</div>
              </div>
            </div>

            {/* Nút hành động thực tế */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl bg-white/90 backdrop-blur-sm border-0 rounded-2xl overflow-hidden">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                    <TreePine className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Trồng cây cùng người dân</h3>
                  <p className="text-gray-600 mb-6">Tham gia chương trình trồng rừng bền vững tại các bản làng</p>
                  <Button className="bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-full px-8 py-3 font-semibold hover:brightness-110 transition-all duration-300 shadow-lg">
                    <TreePine className="w-5 h-5 mr-2" />
                    Đăng ký tham gia
                  </Button>
                </CardContent>
              </Card>

              <Card className="group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl bg-white/90 backdrop-blur-sm border-0 rounded-2xl overflow-hidden">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <Recycle className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Thu gom rác cùng cộng đồng</h3>
                  <p className="text-gray-600 mb-6">Hoạt động dọn dẹp môi trường tại các điểm du lịch</p>
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full px-8 py-3 font-semibold hover:brightness-110 transition-all duration-300 shadow-lg">
                    <Recycle className="w-5 h-5 mr-2" />
                    Tìm hoạt động gần
                  </Button>
                </CardContent>
              </Card>

              <Card className="group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl bg-white/90 backdrop-blur-sm border-0 rounded-2xl overflow-hidden">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <Home className="w-10 h-10 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Ghé thăm bản xanh</h3>
                  <p className="text-gray-600 mb-6">Lưu trú tại homestay thân thiện với môi trường</p>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full px-8 py-3 font-semibold hover:brightness-110 transition-all duration-300 shadow-lg">
                    <Home className="w-5 h-5 mr-2" />
                    Xem homestay
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Sky Quest Gợi Mở */}
        <section 
          ref={skyQuestAnimation.elementRef}
          className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden"
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className={`text-center mb-16 ${animationClasses.fadeUp.transition} ${skyQuestAnimation.isVisible ? animationClasses.fadeUp.animate : animationClasses.fadeUp.initial}`}>
              <h2 className="font-inter text-6xl font-extrabold text-gray-900 mb-8 tracking-tight">
                Sky Quest Gợi Mở
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Khám phá bản thân qua hành trình tìm sự cân bằng giữa mây và núi
              </p>
              
              <div className="flex flex-col md:flex-row justify-center gap-6">
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full px-10 py-4 text-lg font-semibold hover:brightness-110 shadow-lg transition-all duration-300"
                  onClick={() => navigate('/sky-quest')}
                >
                  <Sparkles className="w-6 h-6 mr-3" />
                  Bắt đầu Hành trình Cá nhân
                </Button>
                <Button 
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full px-10 py-4 text-lg font-semibold hover:brightness-110 shadow-lg transition-all duration-300"
                  onClick={() => navigate('/journey-log')}
                >
                  <Heart className="w-6 h-6 mr-3" />
                  Tạo nhật ký hành trình xanh
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Bản Đồ Tà Xùa */}
        <section 
          ref={mapAnimation.elementRef}
          className="py-24 bg-gradient-to-br from-slate-50 to-gray-50 relative overflow-hidden"
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className={`text-center mb-16 ${animationClasses.fadeUp.transition} ${mapAnimation.isVisible ? animationClasses.fadeUp.animate : animationClasses.fadeUp.initial}`}>
              <h2 className="font-inter text-6xl font-extrabold text-gray-900 mb-8 tracking-tight">
                Bản Đồ Tà Xùa
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
                Khám phá và định vị các địa điểm tuyệt vời tại Tà Xùa
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
              {/* Bản đồ tương tác - Bên trái 70% */}
              <div className="lg:col-span-7">
                <div 
                  className="rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(12px)'
                  }}
                >
                  {/* Bộ lọc nâng cao */}
                  <div className="p-6 border-b border-gray-200 bg-white/50">
                    <h3 className="font-semibold text-lg text-gray-900 mb-4">Bộ lọc nâng cao</h3>
                    <div className="flex flex-wrap gap-3">
                      <button className="px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-all duration-200">
                        <Shield className="w-4 h-4 mr-2 inline" />
                        Điểm an toàn
                        <span className="ml-2 px-2 py-1 rounded-full text-xs bg-red-200">12</span>
                      </button>
                      <button className="px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-700 hover:bg-purple-200 transition-all duration-200">
                        <Camera className="w-4 h-4 mr-2 inline" />
                        Triển lãm số gần đây
                        <span className="ml-2 px-2 py-1 rounded-full text-xs bg-purple-200">8</span>
                      </button>
                      <button className="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition-all duration-200">
                        <Heart className="w-4 h-4 mr-2 inline" />
                        Nơi check-in nổi bật
                        <span className="ml-2 px-2 py-1 rounded-full text-xs bg-blue-200">25</span>
                      </button>
                      <button className="px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-700 hover:bg-green-200 transition-all duration-200">
                        <TreePine className="w-4 h-4 mr-2 inline" />
                        Điểm sinh thái
                        <span className="ml-2 px-2 py-1 rounded-full text-xs bg-green-200">18</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Container bản đồ */}
                   <div className="h-[600px] relative">
                     <GoogleMapSection />
                     {/* Overlay thông tin */}
                     <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                       <div className="text-sm text-gray-600">
                         <div className="flex items-center gap-2 mb-1">
                           <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                           <span>Điểm an toàn</span>
                         </div>
                         <div className="flex items-center gap-2 mb-1">
                           <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                           <span>Triển lãm số</span>
                         </div>
                         <div className="flex items-center gap-2">
                           <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                           <span>Điểm sinh thái</span>
                         </div>
                       </div>
                     </div>
                   </div>
                </div>
              </div>

              {/* Danh sách gợi ý + chỉ đường - Bên phải 30% */}
              <div className="lg:col-span-3">
                <div 
                  className="rounded-2xl p-6 shadow-2xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(12px)'
                  }}
                >
                  <h3 className="font-semibold text-xl text-gray-900 mb-6">Gợi ý địa điểm</h3>
                  
                  <div className="space-y-4 max-h-[500px] overflow-y-auto">
                    {suggestedDestinations.map((destination, index) => (
                      <Card key={index} className="group cursor-pointer transition-all duration-300 hover:shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <LazyImage
                              src={destination.image}
                              alt={destination.name}
                              className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 mb-1 truncate">{destination.name}</h4>
                              <p className="text-sm text-gray-600 mb-2">{destination.type}</p>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                  <span className="text-xs text-gray-600">4.8</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3 text-gray-400" />
                                  <span className="text-xs text-gray-600">2.5km</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <Button className="w-full mt-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white text-sm rounded-full py-2 hover:brightness-110 transition-all duration-300">
                            <Compass className="w-4 h-4 mr-2" />
                            Chỉ đường
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <Button className="w-full mt-6 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-full px-6 py-3 font-semibold hover:brightness-110 shadow-lg transition-all duration-300">
                    <MapPin className="w-5 h-5 mr-2" />
                    Xem tất cả trên bản đồ
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Smart Features Section - Gợi ý cá nhân hóa và kết nối Safety Center */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--explore-emerald)' }}>
                Trải Nghiệm Thông Minh
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Khám phá Tà Xùa với công nghệ AI và kết nối an toàn thông minh
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Gợi ý cá nhân hóa */}
              <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mr-4" style={{ background: `linear-gradient(135deg, var(--explore-emerald), var(--explore-emerald-light))` }}>
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Gợi Ý Cá Nhân</h3>
                      <p className="text-gray-600">AI phân tích sở thích của bạn</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center p-3 bg-emerald-50 rounded-lg">
                      <Mountain className="w-5 h-5 text-emerald-600 mr-3" />
                      <span className="text-sm text-gray-700">Dựa trên lịch sử: Bạn thích leo núi và chụp ảnh</span>
                    </div>
                    <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <Camera className="w-5 h-5 text-blue-600 mr-3" />
                      <span className="text-sm text-gray-700">Gợi ý: Triển lãm số và điểm check-in đẹp</span>
                    </div>
                    <div className="flex items-center p-3 bg-amber-50 rounded-lg">
                      <Clock className="w-5 h-5 text-amber-600 mr-3" />
                      <span className="text-sm text-gray-700">Thời gian tốt nhất: 6:00 AM - 8:00 AM</span>
                    </div>
                  </div>

                  <Button className="w-full text-white rounded-full py-3 font-semibold hover:brightness-110 transition-all duration-300" style={{ background: `linear-gradient(to right, var(--explore-emerald), var(--explore-emerald-dark))` }}>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Tạo hành trình cá nhân
                  </Button>
                </CardContent>
              </Card>

              {/* Kết nối Safety Center */}
              <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mr-4" style={{ background: `linear-gradient(135deg, var(--explore-sunrise), var(--explore-sunrise-dark))` }}>
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">An Toàn Thông Minh</h3>
                      <p className="text-gray-600">Kết nối trực tiếp Safety Center</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center p-3 bg-green-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-sm text-gray-700">Theo dõi vị trí real-time khi khám phá</span>
                    </div>
                    <div className="flex items-center p-3 bg-red-50 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-red-600 mr-3" />
                      <span className="text-sm text-gray-700">Cảnh báo thời tiết và điều kiện địa hình</span>
                    </div>
                    <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <Phone className="w-5 h-5 text-blue-600 mr-3" />
                      <span className="text-sm text-gray-700">SOS khẩn cấp một chạm</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full text-white rounded-full py-3 font-semibold hover:brightness-110 transition-all duration-300" 
                    style={{ background: `linear-gradient(to right, var(--explore-sunrise), var(--explore-sunrise-dark))` }}
                    onClick={() => navigate('/safety')}
                  >
                    <Shield className="w-5 h-5 mr-2" />
                    Kết nối Safety Center
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions Bar */}
            <div className="mt-12 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  variant="outline" 
                  className="rounded-full px-6 py-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 transition-all duration-300"
                  onClick={() => {
                    const element = document.getElementById('trusted-places-section');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Compass className="w-4 h-4 mr-2" />
                  Khám phá địa điểm
                </Button>
                <Button 
                  variant="outline" 
                  className="rounded-full px-6 py-2 border-amber-200 text-amber-700 hover:bg-amber-50 transition-all duration-300"
                  onClick={() => {
                    const element = document.getElementById('digital-exhibition-section');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Triển lãm số
                </Button>
                <Button 
                  variant="outline" 
                  className="rounded-full px-6 py-2 border-blue-200 text-blue-700 hover:bg-blue-50 transition-all duration-300"
                  onClick={() => navigate('/safety')}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Safety Center
                </Button>
                <Button 
                  variant="outline" 
                  className="rounded-full px-6 py-2 border-purple-200 text-purple-700 hover:bg-purple-50 transition-all duration-300"
                  onClick={() => navigate('/sky-quest')}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Sky Quest
                </Button>
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