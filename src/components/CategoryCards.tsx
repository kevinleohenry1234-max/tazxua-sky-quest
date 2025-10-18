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
  Users,
  Mountain,
  Trophy,
  Target,
  Sparkles
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
      title: 'Dịch Vụ',
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
    },
    {
      id: 'skyquest',
      title: 'Sky Quest: Du lịch Xanh - Chill An Lành',
      shortDescription: 'Hành trình gamification bền vững',
      detailedDescription: 'Tham gia hành trình du lịch xanh với hệ thống thử thách, phần thưởng và kỷ vật độc đáo. Khám phá Tà Xùa qua những câu chuyện kể, mini-quest và trải nghiệm tương tác đầy cảm xúc.',
      icon: Mountain,
      path: '/sky-quest/journey',
      backgroundImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      ctaText: 'Bắt đầu hành trình',
      highlights: ['Thử thách xanh', 'Kỷ vật độc đáo', 'Câu chuyện cảm xúc'],
      isSpecial: true,
      specialBadge: 'Du lịch Bền vững'
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
            Bốn trải nghiệm độc đáo đang chờ đón bạn trong hành trình khám phá vùng đất huyền thoại này
          </p>
        </div>

        {/* Feature Cards Grid - First 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-8">
          {categories.slice(0, 3).map((category) => {
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
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
                    isHovered ? 'opacity-0' : 'opacity-100'
                  }`} />
                </div>

                <CardContent className="relative h-full p-8 flex flex-col text-white z-10">
                  {/* Top Section */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
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
                      className={`transition-all duration-500 ease-out ${
                        isHovered 
                          ? 'transform translate-y-0 opacity-100' 
                          : 'transform translate-y-8 opacity-0'
                      }`}
                    >
                      <div className="mb-6">
                        <p className="font-inter text-white/80 text-sm leading-relaxed mb-4">
                          {category.detailedDescription}
                        </p>
                        
                        {/* Highlights */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {category.highlights.map((highlight, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div 
                        className={`transition-all duration-300 ${
                          isHovered ? 'opacity-100' : 'opacity-0'
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

        {/* Sky Quest Card - Full Width Rectangle */}
        {(() => {
          const skyQuestCard = categories.find(cat => cat.id === 'skyquest');
          if (!skyQuestCard) return null;
          
          const Icon = skyQuestCard.icon;
          const isHovered = hoveredCard === skyQuestCard.id;
          
          return (
            <div className="max-w-7xl mx-auto">
              <Card
                data-category={skyQuestCard.id}
                className="group relative overflow-hidden rounded-2xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer h-[300px]"
                onMouseEnter={() => setHoveredCard(skyQuestCard.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleCardClick(skyQuestCard.path)}
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                  <img
                    src={skyQuestCard.backgroundImage}
                    alt={skyQuestCard.title}
                    className={`w-full h-full object-cover transition-transform duration-400 ease-out ${
                      isHovered ? 'scale-105' : 'scale-100'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600/90 via-blue-600/80 to-purple-600/90" />
                  <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
                    isHovered ? 'opacity-0' : 'opacity-100'
                  }`} />
                </div>

                <CardContent className="relative h-full p-8 flex items-center text-white z-10">
                  <div className="flex items-center justify-between w-full">
                    {/* Left Content */}
                    <div className="flex-1 pr-8">
                      <div className="flex items-center mb-4">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-6">
                          <Icon className="w-10 h-10 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center mb-2">
                            <h3 className="font-playfair text-3xl font-bold text-white mr-4">
                              {skyQuestCard.title}
                            </h3>
                            {skyQuestCard.specialBadge && (
                              <span className="px-3 py-1 bg-yellow-400/20 backdrop-blur-sm rounded-full text-sm font-semibold text-yellow-200 flex items-center">
                                <Sparkles className="w-4 h-4 mr-1" />
                                {skyQuestCard.specialBadge}
                              </span>
                            )}
                          </div>
                          <p className="font-inter text-white/90 text-lg leading-relaxed">
                            {skyQuestCard.shortDescription}
                          </p>
                        </div>
                      </div>

                      {/* Detailed Description */}
                      <div className={`transition-all duration-500 ease-out ${
                        isHovered 
                          ? 'transform translate-y-0 opacity-100' 
                          : 'transform translate-y-4 opacity-80'
                      }`}>
                        <p className="font-inter text-white/80 text-sm leading-relaxed mb-4">
                          {skyQuestCard.detailedDescription}
                        </p>
                        
                        {/* Highlights */}
                        <div className="flex flex-wrap gap-2">
                          {skyQuestCard.highlights.map((highlight, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white flex items-center"
                            >
                              {index === 0 && <Target className="w-3 h-3 mr-1" />}
                              {index === 1 && <Trophy className="w-3 h-3 mr-1" />}
                              {index === 2 && <Sparkles className="w-3 h-3 mr-1" />}
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right CTA */}
                    <div className="flex-shrink-0">
                      <Button 
                        className={`bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/50 backdrop-blur-sm rounded-xl px-8 py-4 font-semibold transition-all duration-300 group/btn ${
                          isHovered ? 'scale-105 shadow-lg' : ''
                        }`}
                      >
                        <span className="mr-2">{skyQuestCard.ctaText}</span>
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })()}

        {/* Call to Action */}
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