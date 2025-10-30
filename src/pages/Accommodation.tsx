import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import ImageSlider from '@/components/ImageSlider';
import HotelGrid from '@/components/HotelGrid';
import BookingModal from '@/components/BookingModal';
import HeroCarousel from '@/components/HeroCarousel';
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
import ImagePreloader from '@/components/ImagePreloader';

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
    route: '/accommodation/restaurant',
    bgImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url('/images/service/Restaurant.png')`,
    bgColor: 'from-red-500 to-red-600'
  },
  {
    id: 'tour',
    title: 'Tour Du Lịch',
    description: 'Khám phá hành trình xanh cùng hướng dẫn viên địa phương.',
    icon: <MapIcon className="w-8 h-8" />,
    route: '/accommodation/tour',
    bgImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url('/images/service/Tour.png')`,
    bgColor: 'from-blue-500 to-blue-600'
  },
  {
    id: 'transport',
    title: 'Di chuyển',
    description: 'Tự do khám phá Tà Xùa và kết nối liên tuyến',
    icon: <CarFront className="w-8 h-8" />,
    route: '/accommodation/transport',
    bgImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url('/images/service/transportation.png')`,
    bgColor: 'from-purple-500 to-purple-600'
  }
];

const homestayData: Homestay[] = homestayRealData;

// Hero carousel images
const heroImages = [
  '/images/service/HERO 1.png',
  '/images/service/HERO 2.png',
  '/images/service/HERO 3.png',
  '/images/service/HERO 4.png'
];

const Accommodation: React.FC = () => {
  const navigate = useNavigate();
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
      // Navigate to other routes
      navigate(route);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Preload critical images */}
      <ImagePreloader 
        images={['/images/service/HERO.png']} 
        priority={true} 
      />
      
      <Header
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLoginClick={() => setShowLoginModal(true)}
        onRegisterClick={() => setShowRegisterModal(true)}
        onProfileClick={() => setShowDashboard(true)}
        onLogoutClick={handleLogout}
      />
      
      <div className="pt-16">
        {/* Hero Section with Carousel */}
        <HeroCarousel 
          images={heroImages}
          autoplayInterval={6000} // 6 seconds
        >
          {/* Content Container with improved responsive design */}
          <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            {/* Main Title with updated styling per requirements */}
            <h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 
                            text-white transform transition-all duration-500 ease-in-out hover:scale-105
                            leading-tight tracking-wide"
              style={{
                color: '#FFFFFF',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              Dịch Vụ Tại Tà Xùa
            </h1>
            
            {/* Subtitle with responsive text */}
            <p 
              className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-blue-100 
                            max-w-2xl mx-auto leading-relaxed transform transition-all duration-300 
                            hover:text-white"
              style={{
                textShadow: '0 2px 8px rgba(0,0,0,0.7)'
              }}
            >
              Khám phá những dịch vụ tuyệt vời tại vùng đất thiên đường Tà Xùa
            </p>
            
            {/* Enhanced Search Bar with hover effects */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 max-w-2xl mx-auto 
                          transform transition-all duration-300 hover:scale-105">
              <input
                type="text"
                placeholder="Tìm kiếm dịch vụ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 sm:px-6 py-3 sm:py-4 text-gray-800 rounded-l-full sm:rounded-r-none 
                           rounded-r-full sm:rounded-l-full border-none outline-none text-sm sm:text-base
                           bg-white/95 backdrop-blur-sm shadow-lg transition-all duration-300
                           hover:bg-white hover:shadow-2xl focus:bg-white focus:shadow-2xl
                           focus:ring-4 focus:ring-blue-300/50"
              />
              <button 
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 
                         text-white rounded-r-full sm:rounded-l-none rounded-l-full sm:rounded-r-full 
                         font-semibold text-sm sm:text-base shadow-lg transition-all duration-300 
                         hover:from-blue-700 hover:to-blue-800 hover:shadow-2xl hover:scale-105
                         active:scale-95 focus:ring-4 focus:ring-blue-300/50"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
                Tìm kiếm
              </button>
            </div>
          </div>
        </HeroCarousel>

        {/* Service Categories Grid - Seamless transition */}
        <div style={{ backgroundColor: '#F9FAF9' }} className="py-16 -mt-1">
          <div className="container mx-auto px-4">
            {/* Service Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {serviceCategories.map((category, index) => (
                <div
                  key={category.id}
                  className="group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fade-up"
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animationFillMode: 'both'
                  }}
                  onClick={() => handleCategoryClick(category.id, category.route)}
                >
                  <div 
                    className="relative h-80 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 bg-cover bg-center group-hover:ring-4 group-hover:ring-white/50"
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

                    {/* Hover Effect Overlay - Dimmed background + Glowing border */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              ))}
            </div>

            {/* New Service Categories - Horizontal Scrollable Cards */}
            <section className="service-categories py-16 bg-gray-50">
              <div className="container mx-auto px-4">
                
                {/* Category 1: Top Accommodations */}
                <div className="mb-16">
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                      Chỗ nghỉ ngơi hàng đầu
                    </h2>
                    <p className="text-gray-600">
                      Cho những giấc ngủ êm ái xuyên suốt kì nghỉ
                    </p>
                  </div>
                  
                  <div className="overflow-x-auto pb-4">
                    <div className="flex gap-6 min-w-max">
                      {homestayData.slice(0, 5).map((homestay) => (
                        <div key={homestay.id} className="flex-shrink-0 w-80 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                          <div className="relative overflow-hidden">
                            <img 
                              src={homestay.images[0] || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"} 
                              alt={homestay.name}
                              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200">
                              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                          <div className="p-5">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                              {homestay.name}
                            </h3>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`w-4 h-4 ${i < homestay.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600">({homestay.rating})</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                              {homestay.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-bold text-emerald-600">
                                {homestay.price}
                              </span>
                              <Button 
                                size="sm"
                                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2"
                                onClick={() => handleViewDetails(homestay)}
                              >
                                Xem chi tiết
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Category 2: Delicious Cuisine */}
                <div className="mb-16">
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                      Ẩm thực mỹ vị
                    </h2>
                    <p className="text-gray-600">
                      Thổi bừng xúc cảm bằng hương vị bản địa
                    </p>
                  </div>
                  
                  <div className="overflow-x-auto pb-4">
                    <div className="flex gap-6 min-w-max">
                      {[
                        {
                          id: 'restaurant-1',
                          name: 'Nhà hàng H\'Mông Tà Xùa',
                          description: 'Thưởng thức ẩm thực H\'Mông truyền thống giữa núi rừng Tà Xùa',
                          rating: 4.8,
                          price: '150.000đ - 300.000đ',
                          image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
                        },
                        {
                          id: 'restaurant-2', 
                          name: 'Quán Shan Tuyết',
                          description: 'Trà Shan Tuyết nguyên chất và các món ăn từ rau rừng tươi ngon',
                          rating: 4.7,
                          price: '80.000đ - 200.000đ',
                          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
                        },
                        {
                          id: 'restaurant-3',
                          name: 'Bếp Núi Rừng',
                          description: 'Thịt nướng trên than hoa và các đặc sản núi rừng Tây Bắc',
                          rating: 4.6,
                          price: '120.000đ - 250.000đ',
                          image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
                        },
                        {
                          id: 'restaurant-4',
                          name: 'Cơm Lam Tà Xùa',
                          description: 'Cơm lam nướng trong ống tre và canh chua cá suối',
                          rating: 4.5,
                          price: '100.000đ - 180.000đ',
                          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
                        }
                      ].map((restaurant) => (
                        <div key={restaurant.id} className="flex-shrink-0 w-80 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                          <div className="relative overflow-hidden">
                            <img 
                              src={restaurant.image} 
                              alt={restaurant.name}
                              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200">
                              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                          <div className="p-5">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                              {restaurant.name}
                            </h3>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`w-4 h-4 ${i < restaurant.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600">({restaurant.rating})</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                              {restaurant.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-bold text-red-600">
                                {restaurant.price}
                              </span>
                              <Button 
                                size="sm"
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2"
                              >
                                Xem chi tiết
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Category 3: Complete Tours */}
                <div className="mb-16">
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                      Du lịch trọn gói
                    </h2>
                    <p className="text-gray-600">
                      Du lịch gọn gàng – tận hưởng trọn thời gian
                    </p>
                  </div>
                  
                  <div className="overflow-x-auto pb-4">
                    <div className="flex gap-6 min-w-max">
                      {[
                        {
                          id: 'tour-1',
                          name: 'Tour Săn Mây 2N1Đ',
                          description: 'Trải nghiệm săn mây hoàng hôn và bình minh trên đỉnh Tà Xùa',
                          rating: 4.9,
                          price: '1.200.000đ/người',
                          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
                        },
                        {
                          id: 'tour-2',
                          name: 'Tour Khám Phá Văn Hóa H\'Mông',
                          description: 'Tìm hiểu văn hóa, ẩm thực và nghề thủ công truyền thống',
                          rating: 4.7,
                          price: '800.000đ/người',
                          image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
                        },
                        {
                          id: 'tour-3',
                          name: 'Tour Trekking Đỉnh Phu Sang',
                          description: 'Chinh phục đỉnh cao thứ 2 Việt Nam với hướng dẫn viên chuyên nghiệp',
                          rating: 4.8,
                          price: '1.500.000đ/người',
                          image: 'https://images.unsplash.com/photo-1464822759844-d150baec0494?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
                        },
                        {
                          id: 'tour-4',
                          name: 'Tour Ẩm Thực & Trà Shan Tuyết',
                          description: 'Khám phá hương vị đặc trưng và quy trình làm trà truyền thống',
                          rating: 4.6,
                          price: '600.000đ/người',
                          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
                        }
                      ].map((tour) => (
                        <div key={tour.id} className="flex-shrink-0 w-80 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                          <div className="relative overflow-hidden">
                            <img 
                              src={tour.image} 
                              alt={tour.name}
                              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200">
                              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                          <div className="p-5">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                              {tour.name}
                            </h3>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`w-4 h-4 ${i < tour.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600">({tour.rating})</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                              {tour.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-bold text-blue-600">
                                {tour.price}
                              </span>
                              <Button 
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
                              >
                                Đặt ngay
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </section>




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