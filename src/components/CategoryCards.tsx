import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Mountain, 
  Home, 
  Coffee, 
  Camera, 
  TreePine, 
  MapPin,
  Compass,
  Users,
  ArrowRight,
  Star,
  Navigation,
  Clock,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AttractionImageSlider from '@/components/AttractionImageSlider';

const CategoryCards = () => {
  const navigate = useNavigate();
  const [isExploreExpanded, setIsExploreExpanded] = useState(false);

  const categories = [
    {
      id: 'attractions',
      title: 'Điểm Tham Quan',
      description: 'Khám phá những cảnh đẹp nổi tiếng của Tà Xùa với những góc nhìn tuyệt vời',
      icon: Mountain,
      color: 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700',
      path: '/attractions'
    },
    {
      id: 'accommodation',
      title: 'Lưu Trú',
      description: 'Homestay và khách sạn chất lượng cao giữa lòng thiên nhiên',
      icon: Home,
      color: 'bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700',
      path: '/accommodation'
    },
    {
      id: 'experience',
      title: 'Trải Nghiệm',
      description: 'Hoạt động và văn hóa địa phương đậm chất bản sắc dân tộc',
      icon: Camera,
      color: 'bg-gradient-to-br from-purple-500 via-violet-600 to-purple-700',
      path: '/experience'
    },
    {
      id: 'explore',
      title: 'Khám Phá',
      description: 'Tìm hiểu sâu về vùng đất Tà Xùa qua từng câu chuyện',
      icon: Compass,
      color: 'bg-gradient-to-br from-amber-500 via-orange-600 to-red-600',
      path: '/explore',
      expandable: true
    }
  ];

  // Dữ liệu địa điểm từ ExploreSection
  const locations = [
    {
      id: 1,
      name: 'Cây Cô Đơn',
      category: 'mountain',
      description: 'Cây cô đơn Tà Xùa là một cây thông cổ thụ mọc lẻ loi trên đỉnh núi, trở thành biểu tượng nổi tiếng của vùng đất này.',
      images: [
        '/Attractions/Cay_Co_Don/images/cay-co-don-ta-xua-1.png',
        '/Attractions/Cay_Co_Don/images/cay-co-don-ta-xua-3.png',
        '/Attractions/Cay_Co_Don/images/cay-co-don-ta-xua-4.png'
      ],
      difficulty: 'Trung bình',
      duration: '3-4 giờ',
      rating: 4.8,
      coordinates: '21.3167°N, 103.7667°E',
      highlights: ['Biểu tượng Tà Xùa', 'Điểm check-in nổi tiếng', 'Cảnh hoàng hôn tuyệt đẹp'],
      bestTime: 'Sáng sớm và chiều tà'
    },
    {
      id: 2,
      name: 'Đỉnh Gió Tà Xùa',
      category: 'mountain',
      description: 'Đỉnh Gió là một trong những điểm ngắm mây đẹp nhất Tà Xùa, nơi có thể chiêm ngưỡng toàn cảnh dãy núi hùng vĩ.',
      images: [
        '/Attractions/Dinh_Gio_Ta_Xua/images/Dinh-gio-Ta-Xua-1.png',
        '/Attractions/Dinh_Gio_Ta_Xua/images/Dinh-gio-Ta-Xua-2.png',
        '/Attractions/Dinh_Gio_Ta_Xua/images/065127cce66edb405cbeaff03a3a23cb.png'
      ],
      difficulty: 'Dễ',
      duration: '2-3 giờ',
      rating: 4.7,
      coordinates: '21.3200°N, 103.7700°E',
      highlights: ['Điểm ngắm mây tuyệt đẹp', 'Gần các điểm tham quan khác', 'Thích hợp chụp ảnh'],
      bestTime: 'Sáng sớm'
    },
    {
      id: 3,
      name: 'Mỏm Cá Heo',
      category: 'mountain',
      description: 'Mỏm đá có hình dáng giống như một chú cá heo khổng lồ nhô ra từ sườn núi, tạo nên cảnh quan độc đáo và hùng vĩ.',
      images: [
        '/Attractions/Mom_Ca_Heo/images/Screenshot 2025-09-29 155507.png',
        '/Attractions/Mom_Ca_Heo/images/Screenshot 2025-09-29 155532.png',
        '/Attractions/Mom_Ca_Heo/images/Screenshot 2025-09-29 155618.png'
      ],
      difficulty: 'Khó',
      duration: '4-5 giờ',
      rating: 4.6,
      coordinates: '21.3150°N, 103.7650°E',
      highlights: ['Hình dáng độc đáo', 'Thử thách leo núi', 'Cảnh quan hùng vĩ'],
      bestTime: 'Sáng sớm đến trưa'
    }
  ];

  const handleCategoryClick = (category: any) => {
    if (category.expandable) {
      setIsExploreExpanded(!isExploreExpanded);
    } else {
      navigate(category.path);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Dễ': return 'bg-green-100 text-green-800';
      case 'Trung bình': return 'bg-yellow-100 text-yellow-800';
      case 'Khó': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="category-cards-section" className="py-24 bg-gradient-to-b from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        {/* Dramatic Title Section */}
        <div className="text-center mb-20">
          <div className="relative inline-block">
            <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-pink-600 bg-clip-text text-transparent mb-6 tracking-tight">
              Khám Phá Tà Xùa
            </h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full"></div>
          </div>
          <p className="text-xl text-slate-300 mt-8 max-w-3xl mx-auto leading-relaxed">
            Chọn danh mục để bắt đầu hành trình khám phá vùng đất thiêng liêng này
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            const isExploreCategory = category.id === 'explore';
            
            return (
              <Card 
                key={category.id} 
                data-category={category.id}
                className={`group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:scale-105 cursor-pointer bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl ${
                  isExploreCategory && isExploreExpanded ? 'ring-2 ring-orange-400/50' : ''
                }`}
                onClick={() => handleCategoryClick(category)}
                style={{
                  boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                }}
              >
                <CardContent className="p-8 text-center h-full flex flex-col justify-between">
                  {/* Enhanced Icon with Cinematic Glow */}
                  <div className="mb-8">
                    <div 
                      className={`w-20 h-20 ${category.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-125 transition-all duration-500 shadow-2xl`}
                      style={{
                        boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)',
                      }}
                    >
                      <IconComponent className="w-10 h-10 text-white drop-shadow-lg" />
                    </div>
                    
                    {/* Dramatic Title */}
                    <h3 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-blue-200 transition-colors duration-300 leading-tight">
                      {category.title}
                    </h3>
                    
                    {/* Enhanced Description with More Whitespace */}
                    <p className="font-inter text-white/70 text-base leading-relaxed mb-8 group-hover:text-white/90 transition-colors duration-300 px-2">
                      {category.description}
                    </p>
                  </div>
                  
                  {/* Cinematic CTA Button */}
                  <Button 
                    variant="outline" 
                    className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/40 transition-all duration-500 py-4 text-lg font-semibold rounded-full group-hover:scale-105 backdrop-blur-sm"
                    style={{
                      boxShadow: '0 5px 20px rgba(255,255,255,0.1)',
                    }}
                  >
                    <span className="mr-2">
                      {isExploreCategory ? (isExploreExpanded ? 'Thu Gọn' : 'Khám Phá') : 'Khám Phá'}
                    </span>
                    {isExploreCategory ? (
                      isExploreExpanded ? (
                        <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
                      ) : (
                        <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
                      )
                    ) : (
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Expanded Explore Content */}
        {isExploreExpanded && (
          <div className="w-full px-8 mt-16 animate-in slide-in-from-top-4 duration-700">
            <div className="max-w-8xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12">
                <h3 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
                  Địa Điểm Nổi Bật Tại Tà Xùa
                </h3>
                <p className="font-inter text-lg text-white/80 max-w-2xl mx-auto">
                  Khám phá những điểm đến tuyệt vời nhất của vùng đất thiêng liêng này
                </p>
              </div>

              {/* Locations Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {locations.map((location) => (
                  <Card 
                    key={location.id} 
                    className="overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl group"
                  >
                    <AttractionImageSlider
                      images={location.images}
                      attractionName={location.name}
                      autoPlay={true}
                      autoPlayInterval={5000}
                      className="h-48"
                    />
                    
                    <CardContent className="p-6 space-y-4">
                      <h4 className="font-playfair text-xl font-bold text-white group-hover:text-orange-200 transition-colors duration-300">
                        {location.name}
                      </h4>
                      
                      <p className="font-inter text-white/70 text-sm leading-relaxed">
                        {location.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-white/80">
                          <Clock className="w-4 h-4" />
                          <span className="font-inter">{location.duration}</span>
                        </div>
                        <Badge className={getDifficultyColor(location.difficulty)}>
                          {location.difficulty}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <MapPin className="w-4 h-4" />
                        <span className="font-inter">{location.bestTime}</span>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-inter text-sm font-semibold text-white">{location.rating}</span>
                        <span className="font-inter text-xs text-white/60">({location.coordinates})</span>
                      </div>

                      {/* Highlights */}
                      <div className="space-y-2">
                        <h5 className="font-inter font-semibold text-white text-sm">Điểm nổi bật:</h5>
                        <div className="flex flex-wrap gap-1">
                          {location.highlights.slice(0, 2).map((highlight, index) => (
                            <Badge key={index} variant="outline" className="text-xs bg-white/10 border-white/20 text-white/80">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button className="flex-1 bg-orange-600 text-white hover:bg-orange-700 transition-colors duration-300">
                          <Navigation className="w-4 h-4 mr-2" />
                          Chỉ Đường
                        </Button>
                        <Button variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
                          Khám phá chi tiết
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* View More Button */}
              <div className="text-center mt-12">
                <Button 
                  onClick={() => navigate('/explore')}
                  size="lg" 
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-500 hover:scale-105 shadow-xl"
                >
                  <Compass className="w-5 h-5 mr-2" />
                  Xem Tất Cả Địa Điểm
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Cinematic Bottom Spacing */}
        <div className="h-16"></div>
      </div>
    </section>
  );
};

export default CategoryCards;