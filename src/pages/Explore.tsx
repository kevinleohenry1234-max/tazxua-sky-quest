import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  MapPin, 
  Mountain, 
  UtensilsCrossed, 
  Palette, 
  Users, 
  ArrowRight, 
  Sparkles, 
  Search,
  Calendar as CalendarIcon,
  Star,
  Heart,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import LazyImage from '@/components/LazyImage';
import { useNavigate } from 'react-router-dom';
import { useScrollAnimation, animationClasses } from '@/hooks/useScrollAnimation';
import { useParallax } from '@/hooks/useParallax';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const Explore = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [favoriteActivities, setFavoriteActivities] = useState<Set<string>>(new Set());
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Parallax effect for hero background
  const parallaxOffset = useParallax(-0.2);

  // Scroll animations for different sections
  const heroAnimation = useScrollAnimation({ threshold: 0.2 });
  const sectionsAnimation = useScrollAnimation({ threshold: 0.1 });

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Dữ liệu cho 4 khối khám phá chính
  const exploreCategories = [
    {
      id: 'locations',
      title: 'Địa Điểm',
      description: 'Từ đỉnh núi, bản làng đến rừng nguyên sinh.',
      hashtags: ['#Đỉnh Tà Xùa', '#Bản Phình Hồ', '#Sống lưng khủng long'],
      image: '/images/explore/DESTINATION.png',
      icon: <Mountain className="w-8 h-8" />,
      route: '/attractions',
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      id: 'cuisine',
      title: 'Ẩm Thực',
      description: 'Thưởng thức món truyền thống H\'Mông, trà Shan Tuyết.',
      hashtags: ['#Thịt trâu gác bếp', '#Trà Shan Tuyết', '#Cơm lam'],
      image: '/images/explore/CUISINE.png',
      icon: <UtensilsCrossed className="w-8 h-8" />,
      route: '/accommodation',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      id: 'culture',
      title: 'Triển Lãm Số "Hồn Tà Xùa',
      description: 'Triển lãm số, công nghệ AR/VR, âm thanh tự nhiên.',
      hashtags: ['#Triển lãm số', '#Câu chuyện ảnh', '#AR/VR'],
      image: '/images/explore/CULTURAL EXHIBITION.png',
      icon: <Palette className="w-8 h-8" />,
      route: '/digital-exhibition',
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      id: 'viemunity',
      title: 'Viemunity',
      description: 'Cộng đồng chia sẻ trải nghiệm, kết nối du khách.',
      hashtags: ['#Chia sẻ trải nghiệm', '#Kết nối cộng đồng', '#Forum'],
      image: '/images/explore/VIEMUNITY.png',
      icon: <Users className="w-8 h-8" />,
      route: '/hall-of-stories',
      gradient: 'from-blue-500 to-cyan-600'
    }
  ];

  // Dữ liệu hoạt động nên thử - Updated to use PNG images from 'các hoạt động' folder
  const activities = [
    {
      id: 'cloud-hunting-summit',
      name: 'Trải nghiệm săn mây tại đỉnh Tà Xùa',
      description: 'Đứng trên đỉnh núi cao nhất, ngắm biển mây trắng và bình minh tuyệt đẹp',
      rating: 4.9,
      reviewCount: 1234,
      image: '/images/explore/các hoạt động/1.png',
      category: 'Tour ngắm cảnh'
    },
    {
      id: 'motorbike-dragon-spine',
      name: 'Lái xe máy xuyên rừng đến Sống lưng khủng long',
      description: 'Phiêu lưu trên cung đường rừng xanh đến điểm check-in nổi tiếng',
      rating: 4.8,
      reviewCount: 987,
      image: '/images/explore/các hoạt động/2.png',
      category: 'Phiêu lưu'
    },
    {
      id: 'local-market',
      name: 'Khám phá chợ phiên địa phương',
      description: 'Trải nghiệm văn hóa chợ phiên, mua sắm đặc sản và thổ cẩm H\'Mông',
      rating: 4.6,
      reviewCount: 756,
      image: '/images/explore/các hoạt động/3.png',
      category: 'Văn hóa'
    },
    {
      id: 'shan-tuyet-tea',
      name: 'Thưởng trà Shan Tuyết cùng người bản địa',
      description: 'Ngồi bên bếp củi, thưởng thức trà Shan Tuyết thơm ngon trong không gian ấm cúng',
      rating: 4.9,
      reviewCount: 643,
      image: '/images/explore/các hoạt động/4.png',
      category: 'Ẩm thực'
    },
    {
      id: 'photography-tour',
      name: 'Chụp ảnh săn mây tại Sống lưng khủng long',
      description: 'Tour chụp ảnh chuyên nghiệp tại những điểm ngắm cảnh đẹp nhất',
      rating: 4.7,
      reviewCount: 521,
      image: '/images/explore/các hoạt động/5.png',
      category: 'Tour ngắm cảnh'
    },
    {
      id: 'hmong-cooking-workshop',
      name: 'Workshop Ẩm thực H\'Mông',
      description: 'Học nấu các món ăn truyền thống cùng đầu bếp bản địa',
      rating: 5.0,
      reviewCount: 432,
      image: '/images/explore/các hoạt động/6.png',
      category: 'Ẩm thực'
    },
    {
      id: 'forest-trekking',
      name: 'Trekking xuyên rừng nguyên sinh',
      description: 'Khám phá rừng nguyên sinh với hệ sinh thái đa dạng và phong cảnh hoang sơ',
      rating: 4.8,
      reviewCount: 389,
      image: '/images/explore/các hoạt động/7.png',
      category: 'Phiêu lưu'
    }
  ];

  const toggleFavorite = (activityId: string) => {
    setFavoriteActivities(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(activityId)) {
        newFavorites.delete(activityId);
      } else {
        newFavorites.add(activityId);
      }
      return newFavorites;
    });
  };

  // Carousel navigation functions
  const getItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1280) return 4; // xl: 4 items
      if (window.innerWidth >= 768) return 3;  // md: 3 items  
      if (window.innerWidth >= 640) return 2;  // sm: 2 items
      return 1; // mobile: 1 item
    }
    return 4;
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
      setCurrentSlide(0); // Reset slide when screen size changes
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxSlide = Math.max(0, activities.length - itemsPerView);

  const nextSlide = () => {
    setCurrentSlide(prev => Math.min(prev + 1, maxSlide));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : index < rating
            ? 'fill-yellow-200 text-yellow-400'
            : 'fill-gray-200 text-gray-200'
        }`}
      />
    ));
  };

  return (
    <Layout>
      <MainNavigation />
      <Header />
      <main className="min-h-screen overflow-x-hidden relative bg-gray-50">
        {/* Hero Section - Reduced Height */}
        <section 
          className={`relative h-[60vh] flex flex-col items-center justify-center overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Parallax background image */}
          <div 
            className="absolute inset-0 will-change-transform transform-gpu"
            style={{
              backgroundImage: `url('/hero-taxua-clouds.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              transform: `translateY(${parallaxOffset}px) scale(1.05)`,
              willChange: 'transform'
            }}
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/40 z-10"></div>
          
          {/* Content container */}
          <div className="relative z-20 text-center px-4 max-w-4xl mx-auto w-full">
            {/* Hero Title */}
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-white leading-tight tracking-tight mb-4 drop-shadow-lg">
              Khám Phá Tà Xùa –
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Những Câu Chuyện Đang Chờ Bạn
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-white/90 mb-8 drop-shadow-md">
              Tìm hành trình phù hợp với sở thích của bạn
            </p>
            
            {/* Booking.com Style Search Bar */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Bạn muốn khám phá điều gì?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-14 text-lg border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
                
                {/* Date Picker */}
                <div className="w-full md:w-auto">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-14 px-6 justify-start text-left font-normal border-gray-200 hover:border-emerald-500 w-full md:w-[200px]"
                      >
                        <CalendarIcon className="mr-3 h-5 w-5 text-gray-400" />
                        {selectedDate ? (
                          format(selectedDate, "dd/MM/yyyy", { locale: vi })
                        ) : (
                          <span className="text-gray-500">Chọn ngày</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                        locale={vi}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                {/* Search Button */}
                <Button 
                  className="h-14 px-8 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-semibold text-lg w-full md:w-auto"
                  onClick={() => {
                    // Handle search logic here

                  }}
                >
                  Khám phá ngay
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Section: "Bạn muốn khám phá điều gì?" */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Bạn muốn khám phá điều gì?
              </h2>
            </div>
            
            {/* 4 Category Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {exploreCategories.map((category, index) => (
                <Card
                  key={category.id}
                  className={`group relative overflow-hidden cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${animationClasses.fadeUp.transition} ${isVisible ? animationClasses.fadeUp.animate : animationClasses.fadeUp.initial}`}
                  style={{ 
                    animationDelay: `${index * 150}ms`,
                    height: '320px'
                  }}
                  onClick={() => navigate(category.route)}
                >
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: `url('${category.image}')`,
                    }}
                  >
                    {/* Gradient Overlay */}
                    <div 
                      className={`absolute inset-0 bg-gradient-to-b ${category.gradient} opacity-80 group-hover:opacity-70 transition-opacity duration-300`}
                    />
                  </div>

                  {/* Content */}
                  <CardContent className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
                    <div>
                      {/* Icon */}
                      <div className="mb-4">
                        {category.icon}
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-bold mb-3 drop-shadow-md">
                        {category.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-sm leading-relaxed mb-4 text-white/90 drop-shadow-sm">
                        {category.description}
                      </p>

                      {/* Hashtags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {category.hashtags.map((hashtag, idx) => (
                          <span 
                            key={idx}
                            className="px-2 py-1 bg-white/20 backdrop-blur-sm text-xs font-medium rounded-full border border-white/30"
                          >
                            {hashtag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Button 
                      className="w-full bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white hover:text-gray-900 transition-all duration-300 font-semibold group-hover:bg-white group-hover:text-gray-900"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(category.route);
                      }}
                    >
                      Khám phá ngay
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Section: "Những hoạt động nên thử tại Tà Xùa" */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Những hoạt động nên thử tại Tà Xùa
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Tận hưởng những trải nghiệm hấp dẫn giữa thiên nhiên Tây Bắc
              </p>
            </div>

            {/* Activities Carousel */}
            <div className="relative max-w-7xl mx-auto">
              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center transition-all duration-300 ${
                  currentSlide === 0 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-gray-50 hover:shadow-xl'
                } -translate-x-6`}
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>

              <button
                onClick={nextSlide}
                disabled={currentSlide >= maxSlide}
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center transition-all duration-300 ${
                  currentSlide >= maxSlide 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-gray-50 hover:shadow-xl'
                } translate-x-6`}
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>

              {/* Carousel Container */}
              <div className="overflow-hidden mx-12">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentSlide * (100 / itemsPerView)}%)`,
                    width: `${(activities.length / itemsPerView) * 100}%`
                  }}
                >
                  {activities.map((activity, index) => (
                    <div
                      key={activity.id}
                      className="flex-shrink-0 px-3"
                      style={{ width: `${100 / itemsPerView}%` }}
                    >
                      <Card
                        className={`group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer h-full ${animationClasses.fadeUp.transition} ${isVisible ? animationClasses.fadeUp.animate : animationClasses.fadeUp.initial}`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {/* Activity Image */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={activity.image}
                            alt={activity.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/placeholder.svg';
                            }}
                          />
                          
                          {/* Favorite Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(activity.id);
                            }}
                            className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-md"
                          >
                            <Heart
                              className={`w-5 h-5 transition-colors duration-300 ${
                                favoriteActivities.has(activity.id)
                                  ? 'fill-red-500 text-red-500'
                                  : 'text-gray-600 hover:text-red-500'
                              }`}
                            />
                          </button>
                        </div>

                        {/* Activity Content */}
                        <CardContent className="p-5">
                          {/* Activity Name */}
                          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                            {activity.name}
                          </h3>

                          {/* Description */}
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {activity.description}
                          </p>

                          {/* Rating */}
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1">
                              {renderStars(activity.rating)}
                            </div>
                            <span className="text-sm font-semibold text-gray-900">
                              {activity.rating.toFixed(1)}
                            </span>
                            <span className="text-sm text-gray-500">
                              ({activity.reviewCount.toLocaleString()})
                            </span>
                          </div>

                          {/* Category */}
                          <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                            {activity.category}
                          </span>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>

              {/* Slide Indicators */}
              <div className="flex justify-center mt-6 gap-2">
                {Array.from({ length: maxSlide + 1 }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentSlide === index 
                        ? 'bg-emerald-600 w-6' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="bg-white rounded-2xl p-8 shadow-xl max-w-4xl mx-auto border border-gray-100">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Không biết bắt đầu từ đâu?
                </h3>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
                  Hãy để chúng tôi gợi ý cho bạn hành trình phù hợp nhất dựa trên sở thích và thời gian của bạn.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white hover:from-emerald-700 hover:to-teal-800 rounded-xl px-8 py-4 font-semibold text-lg"
                    onClick={() => navigate('/skyquest')}
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Sky Quest - Hành trình cá nhân hóa
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-2 border-gray-300 hover:border-gray-400 rounded-xl px-8 py-4 font-semibold text-lg"
                    onClick={() => navigate('/safety')}
                  >
                    <MapPin className="w-5 h-5 mr-2" />
                    Xem bản đồ tổng quan
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </Layout>
  );
};

export default Explore;