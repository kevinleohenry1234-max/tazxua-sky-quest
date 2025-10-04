import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageSlider from '@/components/ImageSlider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Phone, Mail, Wifi, Car, Coffee, Mountain, Users, Calendar, X, Eye, MessageCircle } from 'lucide-react';
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

  // Hàm để lấy thông tin chi tiết từ file markdown
  const fetchHomestayDetails = async (homestayName: string) => {
    try {
      // Tìm thư mục tương ứng với homestay
      const homestayFolders = [
        '1._1941M_Homestay_Tà_Xùa',
        '2._Mayhome_Tà_Xùa',
        '3._Tà_Xùa_Ecolodge',
        '4._Xoè_Homestay',
        '5._Tà_Xùa_Cloud_Homestay',
        '6._Mùa_Homestay_Tà_Xùa',
        '7._Mando_Homestay_Tà_Xùa',
        '8._Tà_Xùa_Mây_Homestay',
        '9._Mây_Mơ_Màng_Homestay_Tà_Xùa',
        '10._Tà_Xùa_HillsHomestay',
        '11._Táo_Homestay',
        '12._Ngỗng_Tà_Xùa_Homestay',
        '13._Tú_Mỉ',
        '14._Homestay_Coffee_Đỉnh_Núi_Tà_Xùa',
        '15._Anh_Tài_Mây_Homestay'
      ];

      // Tìm folder phù hợp dựa trên tên homestay
      const matchingFolder = homestayFolders.find(folder => 
        folder.toLowerCase().includes(homestayName.toLowerCase().replace(/\s+/g, '_')) ||
        homestayName.toLowerCase().includes(folder.toLowerCase().split('_')[1] || '')
      );

      if (matchingFolder) {
        const response = await fetch(`/cơ sở lưu trú/${matchingFolder}/Thông tin chi tiết/`);
        if (response.ok) {
          const text = await response.text();
          return text;
        }
      }
      
      return 'Thông tin chi tiết đang được cập nhật...';
    } catch (error) {
      console.error('Error fetching homestay details:', error);
      return 'Không thể tải thông tin chi tiết. Vui lòng thử lại sau.';
    }
  };

  const handleViewDetails = async (homestay: Homestay) => {
    setSelectedHomestay(homestay);
    setShowDetailModal(true);
    
    // Fetch chi tiết từ file markdown
    const details = await fetchHomestayDetails(homestay.name);
    setHomestayDetails(details);
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
                Địa Điểm Lưu Trú Tà Xùa
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-md">
                Khám phá những homestay tuyệt vời giữa núi rừng Tà Xùa
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-white/80">
                <div className="flex items-center gap-2">
                  <Mountain className="w-5 h-5" />
                  <span>15+ Homestay</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  <span>Đánh giá cao</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>Phù hợp mọi gia đình</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Chọn Nơi Nghỉ Ngơi Lý Tưởng
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Từ những homestay ấm cúng đến các khu nghỉ dưỡng cao cấp, 
                Tà Xùa có nhiều lựa chọn phù hợp với mọi nhu cầu và ngân sách.
                Mỗi nơi đều mang một câu chuyện riêng và trải nghiệm độc đáo.
              </p>
            </div>

            {/* Homestay Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {homestayRealData.map((homestay) => (
                <Card key={homestay.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-0">
                  <div className="relative h-64">
                    <ImageSlider
                      images={homestay.images}
                      alt={homestay.name}
                      className="w-full h-full"
                      autoPlay={true}
                      autoPlayInterval={4000}
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-gray-800 flex items-center gap-1 shadow-lg">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {homestay.rating}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <Badge variant="secondary" className="bg-black/70 text-white border-0">
                        {homestay.images.length} ảnh
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl font-bold text-gray-800 line-clamp-1">
                      {homestay.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1 text-gray-600">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      {homestay.location}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-gray-700 text-sm line-clamp-3 leading-relaxed">
                      {homestay.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {homestay.amenities.slice(0, 4).map((amenity, index) => (
                        <Badge key={index} variant="outline" className="flex items-center gap-1 text-xs border-blue-200 text-blue-700">
                          {getAmenityIcon(amenity)}
                          <span>{amenity}</span>
                        </Badge>
                      ))}
                      {homestay.amenities.length > 4 && (
                        <Badge variant="outline" className="text-xs text-gray-500">
                          +{homestay.amenities.length - 4} khác
                        </Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {homestay.features.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-green-100 text-green-700 border-green-200">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <div className="border-t pt-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg text-blue-600">
                          {homestay.price}
                        </span>
                        <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                          <Calendar className="w-3 h-3 mr-1" />
                          /đêm
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        {homestay.contact.phone && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="w-4 h-4 text-green-600" />
                            <a 
                              href={`tel:${homestay.contact.phone}`} 
                              className="hover:text-blue-600 transition-colors"
                            >
                              {homestay.contact.phone}
                            </a>
                          </div>
                        )}
                        {homestay.contact.email && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="w-4 h-4 text-blue-600" />
                            <a 
                              href={`mailto:${homestay.contact.email}`} 
                              className="hover:text-blue-600 transition-colors"
                            >
                              {homestay.contact.email}
                            </a>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" 
                      size="sm"
                      onClick={() => handleViewDetails(homestay)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Xem Chi Tiết
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-blue-600 text-blue-600 hover:bg-blue-50"
                      onClick={() => handleBookNow(homestay)}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Đặt Ngay
                    </Button>
                  </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Statistics Section */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                <div className="text-gray-600">Homestay & Resort</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">4.6</div>
                <div className="text-gray-600">Đánh giá trung bình</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                <div className="text-3xl font-bold text-orange-600 mb-2">1000+</div>
                <div className="text-gray-600">Khách hài lòng</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                <div className="text-gray-600">Hỗ trợ khách hàng</div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white shadow-2xl">
              <h3 className="text-3xl font-bold mb-4">
                Cần Hỗ Trợ Đặt Phòng?
              </h3>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Liên hệ với chúng tôi để được tư vấn và hỗ trợ đặt phòng tại các homestay tốt nhất Tà Xùa. 
                Đội ngũ chuyên viên sẽ giúp bạn tìm được nơi lưu trú phù hợp nhất.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 flex items-center gap-2 font-semibold">
                  <Phone className="w-5 h-5" />
                  Gọi Ngay: 1900-xxxx
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 transition-colors flex items-center gap-2 font-semibold">
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
                      <Calendar className="w-4 h-4 text-green-600" />
                      <span className="text-lg font-bold text-blue-600">{selectedHomestay.price}/đêm</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">Liên hệ</h3>
                  <div className="space-y-2">
                    {selectedHomestay.contact.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-green-600" />
                        <a href={`tel:${selectedHomestay.contact.phone}`} className="text-blue-600 hover:underline">
                          {selectedHomestay.contact.phone}
                        </a>
                      </div>
                    )}
                    {selectedHomestay.contact.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-blue-600" />
                        <a href={`mailto:${selectedHomestay.contact.email}`} className="text-blue-600 hover:underline">
                          {selectedHomestay.contact.email}
                        </a>
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
                <div className="flex flex-wrap gap-2">
                  {selectedHomestay.amenities.map((amenity, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1 border-blue-200 text-blue-700">
                      {getAmenityIcon(amenity)}
                      <span>{amenity}</span>
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Đặc điểm nổi bật</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedHomestay.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Detailed Information */}
              {homestayDetails && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">Thông tin chi tiết</h3>
                  <div className="prose max-w-none text-gray-700 bg-gray-50 p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap font-sans">{homestayDetails}</pre>
                  </div>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Button 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => {
                    closeModals();
                    handleBookNow(selectedHomestay);
                  }}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Đặt Ngay
                </Button>
                <Button variant="outline" onClick={closeModals}>
                  Đóng
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && selectedHomestay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Đặt phòng</h2>
              <Button variant="ghost" size="sm" onClick={closeModals}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">{selectedHomestay.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{selectedHomestay.location}</p>
                <p className="text-lg font-bold text-blue-600">{selectedHomestay.price}/đêm</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="checkin-date" className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày nhận phòng
                  </label>
                  <input 
                    id="checkin-date"
                    type="date" 
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="checkout-date" className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày trả phòng
                  </label>
                  <input 
                    id="checkout-date"
                    type="date" 
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="guest-count" className="block text-sm font-medium text-gray-700 mb-1">
                    Số khách
                  </label>
                  <select id="guest-count" className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="1">1 khách</option>
                    <option value="2">2 khách</option>
                    <option value="3">3 khách</option>
                    <option value="4">4 khách</option>
                    <option value="5">5+ khách</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ghi chú
                  </label>
                  <textarea 
                    rows={3}
                    placeholder="Yêu cầu đặc biệt hoặc ghi chú..."
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-blue-800 mb-2">Thông tin liên hệ</h4>
                <div className="space-y-1 text-sm">
                  {selectedHomestay.contact.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-blue-600" />
                      <a href={`tel:${selectedHomestay.contact.phone}`} className="text-blue-600 hover:underline">
                        {selectedHomestay.contact.phone}
                      </a>
                    </div>
                  )}
                  {selectedHomestay.contact.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <a href={`mailto:${selectedHomestay.contact.email}`} className="text-blue-600 hover:underline">
                        {selectedHomestay.contact.email}
                      </a>
                    </div>
                  )}
                </div>
                <p className="text-xs text-blue-600 mt-2">
                  Vui lòng liên hệ trực tiếp để xác nhận đặt phòng và thanh toán.
                </p>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => {
                    if (selectedHomestay.contact.phone) {
                      window.open(`tel:${selectedHomestay.contact.phone}`, '_self');
                    }
                  }}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Gọi ngay
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => {
                    if (selectedHomestay.contact.email) {
                      window.open(`mailto:${selectedHomestay.contact.email}?subject=Đặt phòng ${selectedHomestay.name}`, '_blank');
                    }
                  }}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accommodation;