import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import ImageSlider from '@/components/ImageSlider';
import HotelGrid from '@/components/HotelGrid';
import BookingModal from '@/components/BookingModal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Star, 
  Phone, 
  Mail, 
  Wifi, 
  Car, 
  Coffee, 
  Mountain, 
  Users, 
  Calendar, 
  X, 
  Eye, 
  MessageCircle,
  Search,
  Filter,
  Home,
  UtensilsCrossed,
  MapIcon,
  CarFront,
  Sparkles,
  Music,
  Ticket
} from 'lucide-react';
import { getSession, onAuthStateChange, signOut } from '@/lib/supabase';
import { homestayRealData } from '@/data/homestayRealData';
import heroImage from '@/assets/hero-taxua-clouds.jpg';

interface Homestay {
  id: string;
  name: string;
  description: string;
  location: string;
  rating: number;
  price: string;
  images: string[];
  amenities: string[];
  contact: {
    phone?: string;
    email?: string;
  };
  features: string[];
}

interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  bgImage: string;
  bgColor: string;
}

const serviceCategories: ServiceCategory[] = [
  {
    id: 'accommodation',
    title: 'Khách sạn & Homestay',
    description: 'Nghỉ dưỡng giữa mây trời Tây Bắc.',
    icon: <Home className="w-8 h-8" />,
    route: '/accommodation',
    bgImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url('/images/service/Homestay.png')`,
    bgColor: 'from-emerald-500 to-emerald-600'
  },
  {
    id: 'restaurant',
    title: 'Nhà hàng & Ẩm thực địa phương',
    description: 'Thưởng thức hương vị H\'Mông và Shan Tuyết.',
    icon: <UtensilsCrossed className="w-8 h-8" />,
    route: '/restaurant',
    bgImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url('/images/service/Restaurant.png')`,
    bgColor: 'from-red-500 to-red-600'
  },
  {
    id: 'tour',
    title: 'Tour Du Lịch',
    description: 'Khám phá hành trình xanh cùng hướng dẫn viên địa phương.',
    icon: <MapIcon className="w-8 h-8" />,
    route: '/tour',
    bgImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url('/images/service/Tour.png')`,
    bgColor: 'from-blue-500 to-blue-600'
  },
  {
    id: 'transport',
    title: 'Di chuyển',
    description: 'Tự do khám phá Tà Xùa và kết nối liên tuyến',
    icon: <CarFront className="w-8 h-8" />,
    route: '/transport',
    bgImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url('/images/service/transportation.png')`,
    bgColor: 'from-purple-500 to-purple-600'
  },
  {
    id: 'wellness',
    title: 'Chăm Sóc & Nghỉ Dưỡng',
    description: 'Thư giãn giữa núi rừng với spa và trị liệu thảo mộc.',
    icon: <Sparkles className="w-8 h-8" />,
    route: '/wellness',
    bgImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url('/images/service/relax.png')`,
    bgColor: 'from-pink-500 to-pink-600'
  },
  {
    id: 'entertainment',
    title: 'Giải Trí & Hoạt Động',
    description: 'Âm nhạc, cà phê, không gian nghệ thuật và triển lãm số.',
    icon: <Music className="w-8 h-8" />,
    route: '/entertainment',
    bgImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url('/images/service/activity.png')`,
    bgColor: 'from-orange-500 to-orange-600'
  }
];

const homestayData: Homestay[] = homestayRealData;

const Accommodation: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showDashboard, setShowDashboard] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedHomestay, setSelectedHomestay] = useState<Homestay | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [homestayDetails, setHomestayDetails] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Check for existing session on component mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await getSession();
        if (session?.user) {
          setIsLoggedIn(true);
          setUserName(session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Người dùng');
          setUserEmail(session.user.email || '');
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Listen for auth state changes
    const { data: { subscription } } = onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setIsLoggedIn(true);
        setUserName(session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Người dùng');
        setUserEmail(session.user.email || '');
      } else if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false);
        setUserName('');
        setUserEmail('');
        setShowDashboard(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Parallax and scroll effects for Hero section
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const heroElement = document.querySelector('.hero-parallax') as HTMLElement;
      const scrollOverlay = document.getElementById('scroll-overlay') as HTMLElement;
      
      if (heroElement) {
        // Parallax effect - move background slower than scroll
        heroElement.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
      
      if (scrollOverlay) {
        // Fade out hero as user scrolls
        const fadeStart = 100;
        const fadeEnd = 400;
        const opacity = Math.min(Math.max((scrolled - fadeStart) / (fadeEnd - fadeStart), 0), 1);
        scrollOverlay.style.opacity = opacity.toString();
      }
    };

    // Only add scroll listener if not in accommodation detail view
    if (!selectedCategory) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [selectedCategory]);

  const handleLogout = async () => {
    try {
      await signOut();
      setIsLoggedIn(false);
      setUserName('');
      setUserEmail('');
      setShowDashboard(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleCategoryClick = (categoryId: string, route: string) => {
    if (categoryId === 'accommodation') {
      setSelectedCategory(categoryId);
    } else {
      // Navigate to other routes (placeholder for now)
      console.log(`Navigating to ${route}`);
      // In a real app, you would use router.push(route) here
    }
  };

  const handleBackToServices = () => {
    setSelectedCategory(null);
  };

  // Hàm để lấy thông tin chi tiết từ file markdown
  const fetchHomestayDetails = async (homestayName: string) => {
    try {
      // Tìm thư mục tương ứng với homestay
      const homestayFolders = [
        '1._1941M_Homestay_Tà_Xùa',
        '2._Bình_Minh_Homestay',
        '3._Cầu_Mây_Homestay',
        '4._Đỉnh_Mây_Homestay',
        '5._Hạnh_Phúc_Homestay',
        '6._Hoa_Ban_Homestay',
        '7._Mây_Trắng_Homestay',
        '8._Núi_Xanh_Homestay',
        '9._Phong_Cảnh_Homestay',
        '10._Sao_Mai_Homestay',
        '11._Tà_Xùa_Cloud_Homestay',
        '12._Tà_Xùa_Mây_Trắng_Homestay',
        '13._Tà_Xùa_View_Homestay',
        '14._Thiên_Đường_Homestay',
        '15._Trên_Mây_Homestay'
      ];

      // Tìm thư mục phù hợp dựa trên tên homestay
      const matchingFolder = homestayFolders.find(folder => {
        const folderName = folder.split('._')[1]?.replace(/_/g, ' ');
        return folderName && homestayName.toLowerCase().includes(folderName.toLowerCase());
      });

      if (matchingFolder) {
        const response = await fetch(`/homestay-details/${matchingFolder}/details.md`);
        if (response.ok) {
          const content = await response.text();
          setHomestayDetails(content);
        }
      }
    } catch (error) {
      console.error('Error fetching homestay details:', error);
    }
  };

  const handleViewDetails = (homestay: Homestay) => {
    setSelectedHomestay(homestay);
    setShowDetailModal(true);
    fetchHomestayDetails(homestay.name);
  };

  const handleBookNow = (homestay: Homestay) => {
    setSelectedHomestay(homestay);
    setShowBookingModal(true);
  };

  const closeModals = () => {
    setShowDetailModal(false);
    setShowBookingModal(false);
    setSelectedHomestay(null);
    setHomestayDetails('');
  };

  const getAmenityIcon = (amenity: string) => {
    if (amenity.includes('Wifi')) return <Wifi className="w-4 h-4" />;
    if (amenity.includes('xe')) return <Car className="w-4 h-4" />;
    if (amenity.includes('hàng') || amenity.includes('sáng') || amenity.includes('Café')) return <Coffee className="w-4 h-4" />;
    if (amenity.includes('núi') || amenity.includes('View') || amenity.includes('view')) return <Mountain className="w-4 h-4" />;
    if (amenity.includes('gia đình') || amenity.includes('phòng')) return <Users className="w-4 h-4" />;
    return <Star className="w-4 h-4" />;
  };

  if (selectedCategory === 'accommodation') {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#F9FAF9' }}>
        <MainNavigation />
        <Header
          isLoggedIn={isLoggedIn}
          userName={userName}
          onLoginClick={() => setShowLoginModal(true)}
          onRegisterClick={() => setShowRegisterModal(true)}
          onProfileClick={() => setShowDashboard(true)}
          onLogoutClick={handleLogout}
        />
        
        <div className="pt-16">
          {/* Back Button */}
          <div className="container mx-auto px-4 py-6">
            <Button 
              onClick={handleBackToServices}
              variant="outline"
              className="mb-4 text-gray-600 border-gray-300 hover:bg-gray-50"
            >
              ← Quay lại Dịch vụ
            </Button>
          </div>

          {/* Search Bar */}
          <div className="container mx-auto px-4 pb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm dịch vụ, homestay hoặc tour bạn quan tâm…"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  variant="outline"
                  className="px-4 py-3 border-gray-200 hover:bg-gray-50 rounded-full"
                >
                  <Filter className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Hotel Grid */}
          <div className="container mx-auto px-4 pb-16">
            <HotelGrid hotels={homestayRealData} />
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLoginClick={() => setShowLoginModal(true)}
        onRegisterClick={() => setShowRegisterModal(true)}
        onProfileClick={() => setShowDashboard(true)}
        onLogoutClick={handleLogout}
      />
      
      <div className="pt-16">
        {/* Hero Section with Parallax */}
        <div 
          className="relative h-[70vh] bg-cover bg-center bg-fixed overflow-hidden hero-parallax"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.5)), url('/images/hero/taxua-homestay-hero.jpg')`
          }}
        >
          {/* Parallax content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-4xl mx-auto animate-fade-in-up">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 drop-shadow-2xl tracking-tight">
                  Dịch Vụ Tại Tà Xùa
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-12 drop-shadow-lg font-medium leading-relaxed tracking-wide max-w-3xl mx-auto">
                  Khám phá trọn vẹn Tà Xùa — từ nghỉ dưỡng, ẩm thực đến hành trình xanh đầy cảm hứng.
                </p>
                
                {/* Search Bar in Hero */}
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 max-w-3xl mx-auto">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Tìm homestay, nhà hàng, tour, di chuyển…"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700 placeholder-gray-500 text-base"
                      />
                    </div>
                    <Button
                      onClick={() => setShowFilters(!showFilters)}
                      className="px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all duration-200"
                    >
                      <Filter className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll fade overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F9FAF9] opacity-0 transition-opacity duration-500" id="scroll-overlay"></div>
        </div>

        {/* Service Categories Grid - Seamless transition */}
        <div style={{ backgroundColor: '#F9FAF9' }} className="py-16 -mt-1">
          <div className="container mx-auto px-4">
            {/* Service Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {serviceCategories.map((category, index) => (
                <div
                  key={category.id}
                  className="group cursor-pointer transform transition-all duration-500 hover:scale-105 animate-fade-up"
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animationFillMode: 'both'
                  }}
                  onClick={() => handleCategoryClick(category.id, category.route)}
                >
                  <div 
                    className="relative h-80 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 bg-cover bg-center"
                    style={{
                      backgroundImage: category.bgImage.startsWith('/') 
                        ? `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url('${category.bgImage}')`
                        : category.bgImage
                    }}
                  >
                    {/* Icon at top-left */}
                    <div className="absolute top-6 left-6 text-white drop-shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      {category.icon}
                    </div>
                    
                    {/* Content at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors duration-300 leading-tight">
                        {category.title}
                      </h3>
                      <p className="text-white/90 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                        {category.description}
                      </p>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              ))}
            </div>

            {/* Featured Experiences Section */}
            <div className="mt-24 py-20 bg-gradient-to-b from-emerald-50 to-white relative overflow-hidden">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                    Trải Nghiệm Nổi Bật Tại Tà Xùa
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Khám phá những trải nghiệm độc đáo và đáng nhớ nhất tại vùng đất Tà Xùa huyền diệu
                  </p>
                </div>

                <div className="space-y-12 max-w-6xl mx-auto">
                  {/* Experience 1: Homestay giữa biển mây */}
                  <div className="group relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-700 hover:scale-105">
                    <div 
                      className="h-96 bg-cover bg-center relative"
                      style={{
                        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')`
                      }}
                    >
                      <div className="absolute inset-0 flex items-center">
                        <div className="container mx-auto px-8">
                          <div className="max-w-2xl">
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
                              Homestay giữa biển mây
                            </h3>
                            <p className="text-lg text-white/90 mb-6 leading-relaxed drop-shadow-md">
                              Thức dậy trong làn sương mờ ảo, ngắm nhìn biển mây bao phủ khắp thung lũng. 
                              Trải nghiệm nghỉ dưỡng độc đáo chỉ có tại Tà Xùa.
                            </p>
                            <Button 
                              className="bg-white text-emerald-700 hover:bg-emerald-50 font-semibold px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                              onClick={() => handleCategoryClick('accommodation', '/accommodation')}
                            >
                              Khám phá ngay
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Experience 2: Ẩm thực H'Mông */}
                  <div className="group relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-700 hover:scale-105">
                    <div 
                      className="h-96 bg-cover bg-center relative"
                      style={{
                        backgroundImage: `linear-gradient(to left, rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')`
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-end">
                        <div className="container mx-auto px-8">
                          <div className="max-w-2xl text-right">
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
                              Ẩm thực H'Mông đậm đà bản sắc
                            </h3>
                            <p className="text-lg text-white/90 mb-6 leading-relaxed drop-shadow-md">
                              Thưởng thức hương vị truyền thống của người H'Mông với thịt nướng, rau rừng 
                              và ly trà Shan Tuyết thơm ngát giữa không gian núi rừng.
                            </p>
                            <Button 
                              className="bg-white text-red-700 hover:bg-red-50 font-semibold px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                              onClick={() => handleCategoryClick('restaurant', '/restaurant')}
                            >
                              Khám phá ngay
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Experience 3: Tour xanh */}
                  <div className="group relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-700 hover:scale-105">
                    <div 
                      className="h-96 bg-cover bg-center relative"
                      style={{
                        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url('https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')`
                      }}
                    >
                      <div className="absolute inset-0 flex items-center">
                        <div className="container mx-auto px-8">
                          <div className="max-w-2xl">
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
                              Tour xanh – hành trình trồng cây & chill an lành
                            </h3>
                            <p className="text-lg text-white/90 mb-6 leading-relaxed drop-shadow-md">
                              Tham gia hành trình du lịch có trách nhiệm, trồng cây gây rừng và khám phá 
                              thiên nhiên hoang sơ cùng cộng đồng địa phương.
                            </p>
                            <Button 
                              className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                              onClick={() => handleCategoryClick('tour', '/tour')}
                            >
                              Khám phá ngay
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action - Redesigned Support Section */}
            <div className="mt-20 mb-16 max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-3xl p-12 text-center text-white shadow-2xl transform hover:scale-105 transition-all duration-500">
                <div className="max-w-2xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg">
                    Cần hỗ trợ đặt dịch vụ?
                  </h2>
                  <p className="text-lg text-white/90 mb-8 leading-relaxed">
                    Đội ngũ ViViet luôn sẵn sàng hỗ trợ bạn lên kế hoạch nghỉ dưỡng và khám phá Tà Xùa trọn vẹn.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button 
                      className="bg-white text-emerald-700 hover:bg-emerald-50 font-semibold px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-3 min-w-[200px]"
                      onClick={() => window.open('tel:1900-xxxx', '_self')}
                    >
                      <Phone className="w-5 h-5" />
                      Gọi Ngay 1900-xxxx
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="border-2 border-white text-white hover:bg-white hover:text-emerald-700 font-semibold px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-3 min-w-[200px] bg-transparent"
                      onClick={() => window.open('https://m.me/viviet', '_blank')}
                    >
                      <MessageCircle className="w-5 h-5" />
                      Chat với chúng tôi
                    </Button>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
      
      <Footer />

      {/* Detail Modal */}
      {showDetailModal && selectedHomestay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">{selectedHomestay.name}</h2>
              <Button variant="ghost" size="sm" onClick={closeModals}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="p-6">
              {/* Image Gallery */}
               <div className="mb-6">
                 <ImageSlider images={selectedHomestay.images} alt={selectedHomestay.name} />
               </div>
              
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">Thông tin cơ bản</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-700">{selectedHomestay.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-gray-700">{selectedHomestay.rating}/5</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-green-600">{selectedHomestay.price}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">Liên hệ</h3>
                  <div className="space-y-2">
                    {selectedHomestay.contact.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">{selectedHomestay.contact.phone}</span>
                      </div>
                    )}
                    {selectedHomestay.contact.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-700">{selectedHomestay.contact.email}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Mô tả</h3>
                <p className="text-gray-700 leading-relaxed">{selectedHomestay.description}</p>
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Tiện nghi</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {selectedHomestay.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-700">
                      {getAmenityIcon(amenity)}
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              {selectedHomestay.features && selectedHomestay.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">Đặc điểm nổi bật</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedHomestay.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Detailed Content from Markdown */}
              {homestayDetails && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">Chi tiết</h3>
                  <div className="prose prose-sm max-w-none text-gray-700">
                    <pre className="whitespace-pre-wrap font-sans">{homestayDetails}</pre>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                <Button 
                  onClick={() => handleBookNow(selectedHomestay)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Đặt Phòng Ngay
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3"
                  onClick={closeModals}
                >
                  Đóng
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
       {showBookingModal && selectedHomestay && (
         <BookingModal
           isOpen={showBookingModal}
           onClose={closeModals}
           itemName={selectedHomestay.name}
           itemLocation={selectedHomestay.location}
           itemPrice={selectedHomestay.price}
           itemType="homestay"
         />
       )}

       <style>{`
         @keyframes fade-up {
           from {
             opacity: 0;
             transform: translateY(10px);
           }
           to {
             opacity: 1;
             transform: translateY(0);
           }
         }
         
         .animate-fade-up {
           animation: fade-up 0.4s ease-out;
         }
       `}</style>
    </div>
  );
};

export default Accommodation;