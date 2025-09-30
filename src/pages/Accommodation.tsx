import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageSlider from '@/components/ImageSlider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Phone, Mail, Wifi, Car, Coffee, Mountain, Users, Calendar } from 'lucide-react';
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

const getAmenityIcon = (amenity: string) => {
  if (amenity.includes('Wifi')) return <Wifi className="w-4 h-4" />;
  if (amenity.includes('xe')) return <Car className="w-4 h-4" />;
  if (amenity.includes('hàng') || amenity.includes('sáng')) return <Coffee className="w-4 h-4" />;
  if (amenity.includes('núi') || amenity.includes('View')) return <Mountain className="w-4 h-4" />;
  return <Star className="w-4 h-4" />;
};

const Accommodation: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showDashboard, setShowDashboard] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
                        <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                          Xem Chi Tiết
                        </Button>
                        <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-50">
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
    </div>
  );
};

export default Accommodation;