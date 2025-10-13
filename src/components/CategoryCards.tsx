import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Compass,
  Home,
  Camera,
  ArrowRight,
  MapPin,
  Star,
  Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CategoryCards = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const categories = [
    {
      id: 'explore',
      title: 'Khám Phá',
      shortDescription: 'Khám phá những địa điểm tuyệt đẹp',
      detailedDescription: 'Tìm hiểu sâu về vùng đất Tà Xùa qua từng câu chuyện và địa điểm nổi bật. Từ đỉnh núi cao nhất đến những thung lũng mây trắng, mỗi bước chân đều là một khám phá mới.',
      icon: Compass,
      path: '/explore',
      backgroundImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      ctaText: 'Bắt đầu khám phá',
      highlights: ['Đỉnh Tà Xùa', 'Cây cô đơn', 'Biển mây']
    },
    {
      id: 'accommodation',
      title: 'Lưu Trú',
      shortDescription: 'Nghỉ dưỡng giữa lòng thiên nhiên',
      detailedDescription: 'Homestay và khách sạn chất lượng cao giữa lòng thiên nhiên. Trải nghiệm cuộc sống bản địa, thưởng thức ẩm thực truyền thống và tận hưởng không gian yên bình.',
      icon: Home,
      path: '/accommodation',
      backgroundImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2058&q=80',
      ctaText: 'Đặt phòng ngay',
      highlights: ['Homestay truyền thống', 'View núi đồi', 'Ẩm thực địa phương']
    },
    {
      id: 'experience',
      title: 'Triển Lãm Số',
      shortDescription: 'Nghệ thuật và văn hóa số',
      detailedDescription: 'Khu vực trưng bày các nội dung kỹ thuật số như video, nhạc nền, trải nghiệm tương tác và hình ảnh số hóa của Tà Xùa. Khám phá văn hóa H\'Mông qua công nghệ hiện đại.',
      icon: Camera,
      path: '/experience',
      backgroundImage: '/images/digital-exhibition-hero.png',
      fallbackImage: '/images/digital-exhibition-fallback.png',
      externalFallback: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ctaText: 'Khám phá ngay',
      highlights: ['Thổ cẩm H\'Mông', 'Video 4K', 'Trải nghiệm AR']
    }
  ];

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  return (
    <section id="category-cards-section" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Khám Phá Tà Xùa
          </h2>
          <p className="font-inter text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ba trải nghiệm độc đáo đang chờ đón bạn trong hành trình khám phá vùng đất huyền thoại này
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {categories.map((category) => {
            const Icon = category.icon;
            const isHovered = hoveredCard === category.id;
            
            return (
              <Card
                key={category.id}
                data-category={category.id}
                className="group relative overflow-hidden rounded-2xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer h-[500px]"
                onMouseEnter={() => setHoveredCard(category.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleCardClick(category.path)}
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                  <img
                    src={category.backgroundImage}
                    alt={category.title}
                    className={`w-full h-full object-cover transition-transform duration-400 ease-out ${
                      isHovered ? 'scale-105' : 'scale-100'
                    }`}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (category.fallbackImage && target.src !== category.fallbackImage) {
                        target.src = category.fallbackImage;
                      } else if (category.externalFallback && target.src !== category.externalFallback) {
                        target.src = category.externalFallback;
                      }
                    }}
                    loading="lazy"
                  />
                  <div 
                    className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 transition-all duration-400 ${
                      isHovered ? 'from-black/80 via-black/50 to-black/30' : ''
                    }`}
                  />
                </div>

                {/* Content */}
                <CardContent className="relative z-10 p-8 h-full flex flex-col justify-between">
                  {/* Top Section */}
                  <div className="flex items-start justify-between">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 flex flex-col justify-end">
                    <div className="mb-6">
                      <h3 className="font-playfair text-3xl font-bold text-white mb-3">
                        {category.title}
                      </h3>
                      <p className="font-inter text-white/90 text-lg leading-relaxed">
                        {category.shortDescription}
                      </p>
                    </div>

                    {/* Detailed Description - Slides up on hover */}
                    <div 
                      className={`transform transition-all duration-400 ease-out ${
                        isHovered 
                          ? 'translate-y-0 opacity-100' 
                          : 'translate-y-8 opacity-0'
                      }`}
                    >
                      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6">
                        <p className="font-inter text-white/95 text-sm leading-relaxed mb-4">
                          {category.detailedDescription}
                        </p>
                        
                        {/* Highlights */}
                        <div className="flex flex-wrap gap-2">
                          {category.highlights.map((highlight, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-white/20 rounded-full text-white/90 text-xs font-medium"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button - Appears with delay */}
                      <div 
                        className={`transform transition-all duration-300 delay-100 ${
                          isHovered 
                            ? 'translate-y-0 opacity-100' 
                            : 'translate-y-4 opacity-0'
                        }`}
                      >
                        <Button 
                          className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/50 backdrop-blur-sm rounded-xl py-3 font-semibold transition-all duration-300 group/btn"
                        >
                          <span className="mr-2">{category.ctaText}</span>
                          <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-16">
          <p className="font-inter text-gray-600 mb-6">
            Không biết bắt đầu từ đâu? Hãy để chúng tôi gợi ý cho bạn
          </p>
          <Button 
            onClick={() => navigate('/explore')}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Compass className="w-5 h-5 mr-2" />
            Khám phá tất cả
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;