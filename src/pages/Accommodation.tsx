import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
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
    bgImage: 'linear-gradient(135deg, rgba(16, 185, 129, 0.8), rgba(5, 150, 105, 0.9))',
    bgColor: 'from-emerald-500 to-emerald-600'
  },
  {
    id: 'restaurant',
    title: 'Nhà hàng & Ẩm thực địa phương',
    description: 'Thưởng thức hương vị H\'Mông và Shan Tuyết.',
    icon: <UtensilsCrossed className="w-8 h-8" />,
    route: '/restaurant',
    bgImage: 'linear-gradient(135deg, rgba(245, 101, 101, 0.8), rgba(220, 38, 38, 0.9))',
    bgColor: 'from-red-500 to-red-600'
  },
  {
    id: 'tour',
    title: 'Tour Du Lịch',
    description: 'Khám phá hành trình xanh cùng hướng dẫn viên địa phương.',
    icon: <MapIcon className="w-8 h-8" />,
    route: '/tour',
    bgImage: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(37, 99, 235, 0.9))',
    bgColor: 'from-blue-500 to-blue-600'
  },
  {
    id: 'rental',
    title: 'Thuê Xe & Di Chuyển',
    description: 'Tự do khám phá Tà Xùa theo cách của bạn.',
    icon: <CarFront className="w-8 h-8" />,
    route: '/rental',
    bgImage: 'linear-gradient(135deg, rgba(168, 85, 247, 0.8), rgba(147, 51, 234, 0.9))',
    bgColor: 'from-purple-500 to-purple-600'
  },
  {
    id: 'wellness',
    title: 'Chăm Sóc & Nghỉ Dưỡng',
    description: 'Thư giãn giữa núi rừng với spa và trị liệu thảo mộc.',
    icon: <Sparkles className="w-8 h-8" />,
    route: '/wellness',
    bgImage: 'linear-gradient(135deg, rgba(236, 72, 153, 0.8), rgba(219, 39, 119, 0.9))',
    bgColor: 'from-pink-500 to-pink-600'
  },
  {
    id: 'entertainment',
    title: 'Giải Trí & Hoạt Động',
    description: 'Âm nhạc, cà phê, không gian nghệ thuật và triển lãm số.',
    icon: <Music className="w-8 h-8" />,
    route: '/entertainment',
    bgImage: 'linear-gradient(135deg, rgba(251, 146, 60, 0.8), rgba(249, 115, 22, 0.9))',
    bgColor: 'from-orange-500 to-orange-600'
  },
  {
    id: 'ticket',
    title: 'Đặt Vé Xe Liên Tuyến',
    description: 'Dễ dàng đặt vé xe Hà Nội – Tà Xùa chỉ trong vài bước.',
    icon: <Ticket className="w-8 h-8" />,
    route: '/ticket',
    bgImage: 'linear-gradient(135deg, rgba(14, 165, 233, 0.8), rgba(2, 132, 199, 0.9))',
    bgColor: 'from-sky-500 to-sky-600'
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
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url(${heroImage})`
      }}
    >
      <Header
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLoginClick={() => setShowLoginModal(true)}
        onRegisterClick={() => setShowRegisterModal(true)}
        onProfileClick={() => setShowDashboard(true)}
        onLogoutClick={handleLogout}
      />
      
      <div className="pt-16">
        {/* Hero Section */}
        <div className="relative py-24 text-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                Dịch Vụ Tại Tà Xùa
              </h1>
              <p className="text-xl md:text-2xl text-white/80 mb-8 drop-shadow-md font-medium">
                Trải nghiệm đầy đủ từ lưu trú, ẩm thực đến hành trình khám phá và thư giãn
              </p>
            </div>
          </div>
        </div>

        {/* Service Categories Grid */}
        <div style={{ backgroundColor: '#F9FAF9' }} className="py-16">
          <div className="container mx-auto px-4">
            {/* Search Bar */}
            <div className="mb-12">
              <div className="bg-white rounded-lg shadow-sm p-6 max-w-4xl mx-auto">
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
                    style={{ color: '#0A7B61' }}
                  >
                    <Filter className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Service Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {serviceCategories.map((category, index) => (
                <div
                  key={category.id}
                  className="group cursor-pointer transform transition-all duration-400 hover:scale-105 animate-fade-up"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: 'both'
                  }}
                  onClick={() => handleCategoryClick(category.id, category.route)}
                >
                  <div 
                    className="relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                      background: category.bgImage
                    }}
                  >
                    {/* Content Overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
                    
                    {/* Content */}
                    <div className="relative h-full flex flex-col justify-end p-6 text-white">
                      <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                        {category.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors duration-300">
                        {category.title}
                      </h3>
                      <p className="text-white/90 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                        {category.description}
                      </p>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-20 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-8 text-center text-white shadow-2xl max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold mb-4">
                Cần Hỗ Trợ Đặt Dịch Vụ?
              </h3>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Liên hệ với chúng tôi để được tư vấn và hỗ trợ đặt dịch vụ tại Tà Xùa. 
                Đội ngũ chuyên viên sẽ giúp bạn có trải nghiệm tuyệt vời nhất.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 flex items-center gap-2 font-semibold">
                  <Phone className="w-5 h-5" />
                  Gọi Ngay: 1900-xxxx
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-600 transition-colors flex items-center gap-2 font-semibold">
                  <Mail className="w-5 h-5" />
                  Email: info@taxua.com
                </Button>
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