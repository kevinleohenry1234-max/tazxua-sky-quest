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

const Explore = () => {
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [treesPlanted, setTreesPlanted] = useState(0);
  const [wasteCollected, setWasteCollected] = useState(0);
  const [villageVisitors, setVillageVisitors] = useState(0);
  const [teaTreesPreserved, setTeaTreesPreserved] = useState(0);
  const navigate = useNavigate();

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
      image: '/images/dragon-spine.jpg',
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
      image: '/images/pine-forest.jpg',
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
      image: '/images/hmong-village.jpg',
      rating: 4.7,
      reviews: 156,
      greenBadge: 'Minh bạch 100%',
      greenInfo: 'Đã trồng 28 cây, dùng năng lượng mặt trời 60%, thuê 15 người bản địa',
      difficulty: 'Dễ',
      duration: '3-4 giờ',
      highlights: ['Văn hóa đích thực', 'Người dân thân thiện', 'Thủ công truyền thống']
    }
  ];

  // Hoạt động xanh gợi ý với animation count-up
  const greenActivities = [
    {
      id: 1,
      name: 'Trồng cây bản địa',
      description: 'Tham gia trồng cây thông và cây quế bản địa, góp phần xanh hóa Tà Xùa',
      icon: TreePine,
      impact: 'Mỗi cây trồng hấp thụ ~22kg CO2/năm',
      count: treesPlanted,
      unit: 'cây đã trồng',
      color: 'emerald'
    },
    {
      id: 2,
      name: 'Thu gom rác thải',
      description: 'Làm sạch đường mòn và khu vực cắm trại, bảo vệ môi trường thiên nhiên',
      icon: Leaf,
      impact: 'Giữ gìn vẻ đẹp nguyên sơ của Tà Xùa',
      count: wasteCollected,
      unit: 'kg rác đã thu gom',
      color: 'green'
    },
    {
      id: 3,
      name: 'Tham quan bản làng',
      description: 'Học hỏi văn hóa và hỗ trợ kinh tế bản địa, tạo sinh kế bền vững',
      icon: Users,
      impact: 'Tạo thu nhập cho 45 gia đình bản địa',
      count: villageVisitors,
      unit: 'người đã tham gia',
      color: 'teal'
    },
    {
      id: 4,
      name: 'Thưởng thức trà Shan Tuyết',
      description: 'Trải nghiệm trà cổ thụ từ người H\'Mông, bảo tồn di sản văn hóa',
      icon: Mountain,
      impact: 'Bảo tồn cây trà cổ thụ trên 100 tuổi',
      count: teaTreesPreserved,
      unit: 'cây trà được bảo tồn',
      color: 'cyan'
    }
  ];

  // Gợi ý điểm đến
  const suggestedDestinations = [
    { name: 'Đỉnh Phu Sang', image: '/images/phu-sang.jpg', type: 'Đỉnh núi' },
    { name: 'Thác Bạc', image: '/images/bac-waterfall.jpg', type: 'Thác nước' },
    { name: 'Cầu Mây', image: '/images/cloud-bridge.jpg', type: 'Cầu treo' },
    { name: 'Bản Tà Xùa', image: '/images/ta-xua-village.jpg', type: 'Bản làng' },
    { name: 'Rừng Tre', image: '/images/bamboo-forest.jpg', type: 'Rừng tre' }
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
      <main className="min-h-screen">
        {/* Hero Section - Redesigned với background hùng vĩ */}
        <section 
          className={`relative h-screen flex items-center justify-center overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{
          backgroundImage: `
            linear-gradient(135deg, 
              rgba(15, 23, 42, 0.4) 0%, 
              rgba(30, 41, 59, 0.3) 25%, 
              rgba(51, 65, 85, 0.2) 50%, 
              rgba(71, 85, 105, 0.3) 75%, 
              rgba(15, 23, 42, 0.5) 100%
            ),
            linear-gradient(135deg, #E0F2FE 0%, #F0F9FF 50%, #ECFDF5 100%)
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
        >
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-transparent to-slate-900/40" />
          
          {/* Floating particles for magical effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-300/60 rounded-full animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-teal-400/50 rounded-full animate-bounce delay-300"></div>
            <div className="absolute bottom-1/3 left-1/5 w-4 h-4 bg-cyan-300/40 rounded-full animate-pulse delay-700"></div>
            <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-emerald-400/70 rounded-full animate-bounce delay-1000"></div>
          </div>
          
          <div className={`relative z-10 text-center px-4 max-w-6xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl">
              {/* Main title with professional typography */}
              <h1 className="font-inter text-6xl md:text-7xl font-bold mb-8 text-white leading-tight tracking-tight">
                Những Câu Chuyện
                <br />
                <span className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                  Đang Chờ Bạn
                </span>
              </h1>
              
              {/* Subtitle with fade-in effect */}
              <p className={`text-lg md:text-2xl lg:text-3xl mb-8 md:mb-12 text-white/90 leading-relaxed font-light transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                Mỗi con đường, mỗi ngọn núi đều có những điều kỳ diệu để kể
              </p>
              
              {/* Feature badges */}
              <div className={`flex flex-wrap justify-center gap-3 md:gap-6 text-sm md:text-lg text-white/80 transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                <div className="flex items-center space-x-2 md:space-x-3 bg-white/20 backdrop-blur-sm rounded-full px-4 md:px-6 py-2 md:py-3 border border-white/30">
                  <Leaf className="w-4 h-4 md:w-6 md:h-6 text-emerald-300" />
                  <span className="font-medium">Hình ảnh chân thật</span>
                </div>
                <div className="flex items-center space-x-2 md:space-x-3 bg-white/20 backdrop-blur-sm rounded-full px-4 md:px-6 py-2 md:py-3 border border-white/30">
                  <Users className="w-4 h-4 md:w-6 md:h-6 text-teal-300" />
                  <span className="font-medium">Câu chuyện từ người dân</span>
                </div>
                <div className="flex items-center space-x-2 md:space-x-3 bg-white/20 backdrop-blur-sm rounded-full px-4 md:px-6 py-2 md:py-3 border border-white/30">
                  <Mountain className="w-4 h-4 md:w-6 md:h-6 text-cyan-300" />
                  <span className="font-medium">Trải nghiệm thật</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Khu 1: Những Nơi Đáng Tin Cậy - với nền xanh ngọc nhẹ */}
        <section 
          ref={destinationsAnimation.elementRef}
          className="py-16 md:py-24 bg-gradient-to-b from-emerald-50/80 via-teal-50/60 to-cyan-50/40 relative overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-200 to-teal-200"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className={`text-center mb-12 md:mb-20 ${animationClasses.fadeUp.transition} ${destinationsAnimation.isVisible ? animationClasses.fadeUp.animate : animationClasses.fadeUp.initial}`}>
              <h2 className="font-inter text-3xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-6 md:mb-8 tracking-tight">
                Những Nơi Đáng Tin Cậy
              </h2>
              <p className="text-lg md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
                Được xác thực bởi cộng đồng du khách và người dân địa phương
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 md:gap-10">
              {featuredDestinations.map((destination, index) => (
                <Card 
                  key={destination.id} 
                  className={`overflow-hidden hover:shadow-2xl transition-all duration-700 group bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:-translate-y-2 ${index % 2 === 0 ? 'lg:mt-8' : ''} ${animationClasses.fadeUp.transition} ${destinationsAnimation.isVisible ? animationClasses.fadeUp.animate : animationClasses.fadeUp.initial}`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="relative h-56 md:h-72 overflow-hidden">
                    <LazyImage
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Modern badge */}
                    <div className="absolute top-4 md:top-6 left-4 md:left-6">
                      <Badge className="bg-emerald-500/95 text-white hover:bg-emerald-600 backdrop-blur-sm border-0 shadow-lg px-3 md:px-4 py-1 md:py-2 text-xs md:text-sm font-medium">
                        <Award className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                        {destination.greenBadge}
                      </Badge>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6 md:pb-8">
                      <Button className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 transition-all duration-300 text-sm md:text-base">
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                        Khám phá ngay
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 md:p-8">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight">{destination.name}</h3>
                      <div className="flex items-center space-x-2 bg-amber-50 rounded-full px-2 md:px-3 py-1">
                        <Star className="w-4 h-4 md:w-5 md:h-5 text-amber-500 fill-current" />
                        <span className="text-sm md:text-lg font-semibold text-amber-700">{destination.rating}</span>
                        <span className="text-xs md:text-sm text-amber-600">({destination.reviews})</span>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 mb-6 leading-relaxed text-base md:text-lg">{destination.description}</p>
                    
                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {destination.highlights.map((highlight, idx) => (
                        <Badge key={idx} variant="outline" className="border-emerald-200 text-emerald-700 bg-emerald-50/50 px-2 md:px-3 py-1 text-xs md:text-sm">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex space-x-3">
                        <Badge variant="outline" className="border-teal-200 text-teal-700 bg-teal-50 px-2 md:px-3 py-1 text-xs md:text-sm">{destination.difficulty}</Badge>
                        <Badge variant="outline" className="border-cyan-200 text-cyan-700 bg-cyan-50 px-2 md:px-3 py-1 text-xs md:text-sm">{destination.duration}</Badge>
                      </div>
                    </div>

                    {/* Transparency info */}
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-4 md:p-5 mb-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-6 h-6 md:w-8 md:h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                          <Info className="w-3 h-3 md:w-4 md:h-4 text-white" />
                        </div>
                        <span className="text-base md:text-lg font-semibold text-emerald-800">Minh bạch 100%</span>
                      </div>
                      <p className="text-emerald-700 leading-relaxed text-sm md:text-base">{destination.greenInfo}</p>
                    </div>

                    <Button 
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 py-3 md:py-4 text-base md:text-lg font-medium rounded-xl"
                      onClick={() => handleAttractionClick(destination as any)}
                    >
                      Khám phá câu chuyện
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 md:ml-3" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Khu 2: Hành Động Có Ý Nghĩa - với gradient xanh lá */}
        <section 
          ref={activitiesAnimation.elementRef}
          className="py-16 md:py-24 bg-gradient-to-br from-green-50/80 via-emerald-50/60 to-teal-50/40 relative overflow-hidden"
        >
          {/* Background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-32 h-32 md:w-64 md:h-64 bg-green-200/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-40 h-40 md:w-80 md:h-80 bg-emerald-200/20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className={`text-center mb-12 md:mb-20 ${animationClasses.fadeUp.transition} ${activitiesAnimation.isVisible ? animationClasses.fadeUp.animate : animationClasses.fadeUp.initial}`}>
              <h2 className="font-inter text-3xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-6 md:mb-8 tracking-tight">
                Hành Động Có Ý Nghĩa
              </h2>
              <p className="text-lg md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
                Mỗi trải nghiệm đều góp phần làm Tà Xùa xanh hơn. Cùng nhau tạo nên những thay đổi tích cực.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {greenActivities.map((activity, index) => {
                const IconComponent = activity.icon;
                const colorClasses = {
                  emerald: 'from-emerald-100 to-emerald-200 text-emerald-600 border-emerald-200',
                  green: 'from-green-100 to-green-200 text-green-600 border-green-200',
                  teal: 'from-teal-100 to-teal-200 text-teal-600 border-teal-200',
                  cyan: 'from-cyan-100 to-cyan-200 text-cyan-600 border-cyan-200'
                };
                
                return (
                  <Card 
                    key={activity.id} 
                    className={`text-center hover:shadow-2xl transition-all duration-700 group bg-white/95 backdrop-blur-sm border-0 shadow-xl hover:-translate-y-3 ${index % 2 === 0 ? 'md:mt-6' : ''} ${animationClasses.fadeUp.transition} ${activitiesAnimation.isVisible ? animationClasses.fadeUp.animate : animationClasses.fadeUp.initial}`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <CardContent className="p-6 md:p-8">
                      {/* 3D Icon with soft shadow */}
                      <div className={`w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 md:mb-8 bg-gradient-to-br ${colorClasses[activity.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[activity.color as keyof typeof colorClasses].split(' ')[1]} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                        <IconComponent className={`w-10 h-10 md:w-12 md:h-12 ${colorClasses[activity.color as keyof typeof colorClasses].split(' ')[2]}`} />
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 leading-tight">{activity.name}</h3>
                      <p className="text-slate-600 mb-6 md:mb-8 leading-relaxed text-base md:text-lg">{activity.description}</p>
                      
                      {/* Animated counter */}
                      <div className={`bg-gradient-to-r from-${activity.color}-50 to-${activity.color}-100 border ${colorClasses[activity.color as keyof typeof colorClasses].split(' ')[3]} rounded-2xl p-4 md:p-6 mb-6`}>
                        <div className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                          {activity.count.toLocaleString()}+
                        </div>
                        <p className="text-xs md:text-sm font-medium text-slate-600 mb-3">{activity.unit}</p>
                        <p className={`text-xs md:text-sm ${colorClasses[activity.color as keyof typeof colorClasses].split(' ')[2]} font-medium`}>{activity.impact}</p>
                      </div>
                      
                      <Button 
                        className={`w-full border-2 ${colorClasses[activity.color as keyof typeof colorClasses].split(' ')[3]} ${colorClasses[activity.color as keyof typeof colorClasses].split(' ')[2]} bg-white hover:bg-${activity.color}-50 transition-all duration-300 py-2 md:py-3 text-base md:text-lg font-medium rounded-xl`}
                      >
                        <Target className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                        Tham gia ngay
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Khu 3: Sky Quest Gợi Mở - với background overlay */}
        <section 
          ref={skyQuestAnimation.elementRef}
          className="py-16 md:py-24 relative overflow-hidden"
          style={{
            backgroundImage: `
              linear-gradient(135deg, 
                rgba(15, 23, 42, 0.8) 0%, 
                rgba(30, 58, 138, 0.7) 50%, 
                rgba(15, 23, 42, 0.9) 100%
              ),
              linear-gradient(135deg, #065F46 0%, #047857 50%, #059669 100%)
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-blue-900/20 to-slate-900/50"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className={`text-center mb-12 md:mb-16 ${animationClasses.fadeUp.transition} ${skyQuestAnimation.isVisible ? animationClasses.fadeUp.animate : animationClasses.fadeUp.initial}`}>
              <h2 className="font-inter text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8 tracking-tight">
                Sky Quest Gợi Mở
              </h2>
              <p className="text-lg md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light">
                Sẵn sàng cho hành trình lớn hơn? Mỗi thử thách đều mang lại giá trị thật cho Tà Xùa
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className={`bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl ${animationClasses.scaleIn.transition} ${skyQuestAnimation.isVisible ? animationClasses.scaleIn.animate : animationClasses.scaleIn.initial}`}>
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                  <div>
                    <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6 leading-tight">
                      Hành trình của bạn bắt đầu từ đây
                    </h3>
                    <p className="text-base md:text-xl text-white/80 mb-6 md:mb-8 leading-relaxed">
                      Tham gia Sky Quest - nơi mỗi bước chân đều có ý nghĩa, mỗi hành động đều tạo nên thay đổi tích cực cho Tà Xùa và cộng đồng.
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-4 mb-6 md:mb-8">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                          <Heart className="w-5 h-5 md:w-6 md:h-6 text-emerald-300" />
                        </div>
                        <span className="text-white/90 text-base md:text-lg">Trải nghiệm có ý nghĩa</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-teal-500/20 rounded-full flex items-center justify-center">
                          <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-teal-300" />
                        </div>
                        <span className="text-white/90 text-base md:text-lg">Thử thách thú vị</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-cyan-500/20 rounded-full flex items-center justify-center">
                          <Award className="w-5 h-5 md:w-6 md:h-6 text-cyan-300" />
                        </div>
                        <span className="text-white/90 text-base md:text-lg">Phần thưởng xứng đáng</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
                      <div className="text-4xl md:text-6xl font-bold text-white mb-4">278+</div>
                      <p className="text-white/80 text-base md:text-lg mb-4 md:mb-6">Người đã tham gia Sky Quest</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6 md:mb-8">
                        <div className="text-center">
                          <div className="text-xl md:text-2xl font-bold text-emerald-300">45</div>
                          <p className="text-white/70 text-xs md:text-sm">Thử thách</p>
                        </div>
                        <div className="text-center">
                          <div className="text-xl md:text-2xl font-bold text-teal-300">12</div>
                          <p className="text-white/70 text-xs md:text-sm">Địa điểm</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* CTA Buttons with gradient effects */}
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mt-8 md:mt-12">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 md:px-12 py-3 md:py-4 text-lg md:text-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl border-0 group w-full sm:w-auto"
                    onClick={() => navigate('/sky-quest/journey')}
                  >
                    <Target className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 group-hover:rotate-12 transition-transform duration-300" />
                    Hành động vì Tà Xùa
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 ml-2 md:ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2 border-white/30 text-white hover:bg-white/10 px-6 md:px-10 py-3 md:py-4 text-lg md:text-xl font-medium backdrop-blur-sm rounded-xl transition-all duration-300 w-full sm:w-auto"
                    onClick={() => navigate('/about')}
                  >
                    Tìm hiểu thêm về Tà Xùa
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Khu 4: Bản Đồ Các Địa Điểm - cải thiện với filter chip và gợi ý */}
        <section 
          ref={mapAnimation.elementRef}
          className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white"
        >
          <div className="container mx-auto px-4">
            <div className={`text-center mb-12 md:mb-16 ${animationClasses.fadeUp.transition} ${mapAnimation.isVisible ? animationClasses.fadeUp.animate : animationClasses.fadeUp.initial}`}>
              <h2 className="font-inter text-3xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-6 md:mb-8 tracking-tight">
                Bản Đồ Các Địa Điểm
              </h2>
              <p className="text-lg md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
                Xem vị trí chính xác của các địa điểm du lịch trên bản đồ để lên kế hoạch hành trình của bạn
              </p>
            </div>

            <div className="grid lg:grid-cols-4 gap-6 md:gap-8">
              {/* Map Section */}
              <div className="lg:col-span-3">
                {/* Modern Filter Chips */}
                <div className={`flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8 ${animationClasses.slideInLeft.transition} ${mapAnimation.isVisible ? animationClasses.slideInLeft.animate : animationClasses.slideInLeft.initial}`}>
                  {mapFilters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedFilter(filter.id)}
                      className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all duration-300 border-2 ${
                        selectedFilter === filter.id
                          ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-600'
                      }`}
                    >
                      {filter.label}
                      <span className={`ml-1 md:ml-2 px-1 md:px-2 py-1 rounded-full text-xs ${
                        selectedFilter === filter.id
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        {filter.count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Map Container with modern styling */}
                <div className={`bg-white rounded-2xl md:rounded-3xl shadow-xl border border-slate-200 overflow-hidden ${animationClasses.scaleIn.transition} ${mapAnimation.isVisible ? animationClasses.scaleIn.animate : animationClasses.scaleIn.initial}`}>
                  <GoogleMapSection />
                </div>
              </div>

              {/* Suggested Destinations */}
              <div className="lg:col-span-1">
                <div className={`bg-white rounded-2xl md:rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8 ${animationClasses.slideInRight.transition} ${mapAnimation.isVisible ? animationClasses.slideInRight.animate : animationClasses.slideInRight.initial}`}>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 md:mb-6 flex items-center">
                    <Sparkles className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 text-emerald-500" />
                    Gợi ý điểm đến
                  </h3>
                  
                  <div className="space-y-3 md:space-y-4">
                    {suggestedDestinations.map((destination, index) => (
                      <div key={index} className="group cursor-pointer">
                        <div className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 rounded-xl md:rounded-2xl hover:bg-slate-50 transition-all duration-300">
                          <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl overflow-hidden flex-shrink-0">
                            <LazyImage
                              src={destination.image}
                              alt={destination.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-slate-800 truncate text-sm md:text-base">{destination.name}</h4>
                            <p className="text-xs md:text-sm text-slate-500">{destination.type}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full mt-4 md:mt-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 py-2 md:py-3 text-base md:text-lg font-medium rounded-xl">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-2" />
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