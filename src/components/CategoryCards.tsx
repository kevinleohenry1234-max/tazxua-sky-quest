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
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const categories = [
    {
      id: 'explore',
      title: 'Khám Phá',
      description: 'Tìm hiểu sâu về vùng đất Tà Xùa qua từng câu chuyện và địa điểm nổi bật',
      icon: Compass,
      color: 'bg-gradient-to-br from-amber-500 via-orange-600 to-red-600',
      path: '/explore',
      expandable: true
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
    }
  ];

  // Dữ liệu địa điểm được mở rộng từ ExploreSection
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
    },
    {
      id: 4,
      name: 'Rừng Nguyên Sinh Tà Xùa',
      category: 'forest',
      description: 'Hệ sinh thái rừng nguyên sinh đa dạng với thực vật phong phú và khí hậu mát mẻ quanh năm.',
      images: [
        '/Attractions/Rung_Nguyen_Sinh/images/rung-ta-xua.png',
        '/Attractions/Rung_Nguyen_Sinh/images/rung-ta-xua-1.png',
        '/Attractions/Rung_Nguyen_Sinh/images/rung-ta-xua-2.png'
      ],
      difficulty: 'Trung bình',
      duration: '4-6 giờ',
      rating: 4.5,
      coordinates: '21.3100°N, 103.7600°E',
      highlights: ['Hệ sinh thái đa dạng', 'Trekking và cắm trại', 'Vương quốc rêu'],
      bestTime: 'Cả ngày'
    },
    {
      id: 5,
      name: 'Sống Lưng Khủng Long',
      category: 'mountain',
      description: 'Dãy núi hùng vĩ với hình dáng giống như sống lưng khủng long khổng lồ, điểm đến không thể bỏ qua khi đến Tà Xùa.',
      images: [
        '/Attractions/Song_lung_khung_long/images/song-lung-khung-long-mu-cang-chai-dep-me-man-giua-dat-troi-yen-bai-02-1662440259.png',
        '/Attractions/Song_lung_khung_long/images/song-lung-khung-long-mu-cang-chai-dep-me-man-giua-dat-troi-yen-bai-03-1662440259.png',
        '/Attractions/Song_lung_khung_long/images/song-lung-khung-long-mu-cang-chai-dep-me-man-giua-dat-troi-yen-bai-04-1662440259.png'
      ],
      difficulty: 'Khó',
      duration: '6-8 giờ',
      rating: 4.9,
      coordinates: '21.3167°N, 103.7667°E',
      highlights: ['Hình dáng độc đáo', 'Cảnh quan hùng vĩ', 'Điểm check-in nổi tiếng'],
      bestTime: 'Sáng sớm đến chiều'
    }
  ];

  const handleCategoryClick = (category: any) => {
    if (category.expandable) {
      setExpandedCategory(expandedCategory === category.id ? null : category.id);
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mb-12">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            const isExploreCategory = category.id === 'explore';
            
            return (
              <Card 
                key={category.id} 
                data-category={category.id}
                className={`group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:scale-[1.02] cursor-pointer bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl ${
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
                    
                    {/* Title */}
                    <h3 className="font-playfair text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {category.title}
                    </h3>

                    {/* Description */}
                    <p className="font-inter text-muted-foreground leading-relaxed mb-6">
                      {category.description}
                    </p>
                  </div>
                  
                  {/* Action Button */}
                  <Button 
                    className="w-full bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary border border-primary/20 hover:border-primary transition-all duration-300 hover:shadow-lg rounded-xl font-inter font-semibold"
                  >
                    {isExploreCategory ? (isExploreExpanded ? 'Thu gọn' : 'Khám phá ngay') : 'Xem chi tiết'}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Expanded Explore Content */}
        {isExploreExpanded && (
          <div className="w-full px-8 mt-16 animate-in slide-in-from-top-4 duration-700">
            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12">
                <h3 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Địa Điểm Nổi Bật Tại Tà Xùa
                </h3>
                <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
                  Khám phá những điểm đến tuyệt vời nhất của vùng đất thiêng liêng này
                </p>
              </div>

              {/* Locations Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {locations.map((location) => (
                  <Card 
                    key={location.id} 
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card border border-border rounded-xl group"
                  >
                    <AttractionImageSlider
                      images={location.images}
                      attractionName={location.name}
                      autoPlay={true}
                      autoPlayInterval={5000}
                      className="h-48"
                    />
                    
                    <CardContent className="p-6 space-y-4">
                      <h4 className="font-playfair text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {location.name}
                      </h4>
                      
                      <p className="font-inter text-muted-foreground text-sm leading-relaxed">
                        {location.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span className="font-inter">{location.duration}</span>
                        </div>
                        <Badge className={getDifficultyColor(location.difficulty)}>
                          {location.difficulty}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span className="font-inter">{location.bestTime}</span>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-inter text-sm font-semibold text-foreground">{location.rating}</span>
                        <span className="font-inter text-xs text-muted-foreground">({location.coordinates})</span>
                      </div>

                      {/* Highlights */}
                      <div className="space-y-2">
                        <h5 className="font-inter font-semibold text-foreground text-sm">Điểm nổi bật:</h5>
                        <div className="flex flex-wrap gap-1">
                          {location.highlights.slice(0, 2).map((highlight, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button className="btn-primary flex-1">
                          <Navigation className="w-4 h-4 mr-2" />
                          Chỉ Đường
                        </Button>
                        <Button className="btn-outline flex-1">
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
                  className="btn-primary"
                >
                  <Compass className="w-5 h-5 mr-2" />
                  Xem Tất Cả Địa Điểm
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Phần mở rộng cho danh mục Khám Phá */}
        {expandedCategory === 'explore' && (
          <div className="mt-16 animate-fade-in">
            <div className="text-center mb-12">
              <h3 className="text-heading-2 text-white mb-4">
                Địa Điểm Nổi Bật Tại Tà Xùa
              </h3>
              <p className="text-body-large text-gray-300 max-w-3xl mx-auto">
                Khám phá những điểm đến tuyệt vời nhất của Tà Xùa với cảnh quan hùng vĩ và trải nghiệm độc đáo
              </p>
            </div>
            
            {/* Grid 3 cột cho các địa điểm */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="group bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 hover:border-orange-500/50 transition-all duration-500 hover:scale-105 hover:shadow-orange-500/20"
                >
                  {/* Hình ảnh với slider */}
                  <div className="relative h-64 overflow-hidden">
                    <AttractionImageSlider 
                      images={location.images} 
                      attractionName={location.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Badge độ khó */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        location.difficulty === 'Dễ' ? 'bg-green-500/80 text-white' :
                        location.difficulty === 'Trung bình' ? 'bg-yellow-500/80 text-white' :
                        'bg-red-500/80 text-white'
                      }`}>
                        {location.difficulty}
                      </span>
                    </div>
                    
                    {/* Rating */}
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-white text-sm font-semibold">{location.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Nội dung */}
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">
                      {location.name}
                    </h4>
                    
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {location.description}
                    </p>
                    
                    {/* Thông tin chi tiết */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Thời gian:</span>
                        <span className="text-white">{location.duration}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Thời điểm tốt nhất:</span>
                        <span className="text-white">{location.bestTime}</span>
                      </div>
                    </div>
                    
                    {/* Highlights */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {location.highlights.slice(0, 2).map((highlight, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full border border-orange-500/30"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Nút khám phá chi tiết */}
                    <Button
                      onClick={() => navigate(`/attractions/${location.id}`)}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-2 rounded-xl transition-all duration-300 group-hover:shadow-lg group-hover:shadow-orange-500/25"
                    >
                      Khám phá chi tiết
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Nút xem tất cả */}
            <div className="text-center">
              <Button
                onClick={() => navigate('/explore')}
                variant="outline"
                className="bg-transparent border-2 border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
              >
                Xem Tất Cả Địa Điểm
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
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