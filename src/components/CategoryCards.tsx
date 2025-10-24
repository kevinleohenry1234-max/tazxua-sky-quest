import React, { useState, useEffect } from 'react';
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
  Sparkles,
  Play,
  Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LazyImage from './LazyImage';

const CategoryCards = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const categories = [
    {
      id: 'explore',
      title: 'Khám Phá',
      shortDescription: 'Những câu chuyện đang chờ bạn khám phá',
      detailedDescription: 'Mỗi con đường, mỗi ngọn núi đều có câu chuyện riêng. Hãy để Tà Xùa kể cho bạn nghe về những điều kỳ diệu mà thiên nhiên đã ban tặng.',
      icon: Compass,
      path: '/explore',
      backgroundImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      ctaText: 'Bắt đầu khám phá',
      highlights: ['Đỉnh Tà Xùa', 'Cây cô đơn', 'Biển mây'],
      hasExhibition: true,
      exhibitionImages: [
        '/images/digital-exhibition-hero.png',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=400&auto=format&fit=crop'
      ]
    },
    {
      id: 'services',
      title: 'Dịch Vụ',
      shortDescription: 'Nơi bạn có thể gọi là nhà',
      detailedDescription: 'Chị Hường và những người bạn địa phương đang chờ đón bạn với tách trà Shan ấm và những câu chuyện về cuộc sống nơi đây.',
      icon: Home,
      path: '/accommodation',
      backgroundImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2058&q=80',
      ctaText: 'Tìm nơi nghỉ ngơi',
      highlights: ['Homestay truyền thống', 'View núi đồi', 'Ẩm thực địa phương']
    },
    {
      id: 'skyquest',
      title: 'Sky Quest',
      subtitle: 'Hành trình du lịch xanh tại Tà Xùa',
      shortDescription: 'Hành trình để trở thành phiên bản tốt hơn của chính bạn.',
      detailedDescription: 'Mỗi hành động nhỏ của bạn đều góp phần làm Tà Xùa xanh hơn. Cùng nhau viết nên câu chuyện bảo vệ thiên nhiên qua những trải nghiệm đầy ý nghĩa.',
      icon: Mountain,
      path: '/skyquest',
      backgroundImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      ctaText: 'Bắt đầu hành trình',
      highlights: ['Thử thách xanh', 'Kỷ vật độc đáo', 'Câu chuyện cảm xúc'],
      isSpecial: true,
      specialBadge: 'Du lịch Bền vững',
      gradient: 'from-emerald-400 via-teal-500 to-purple-400'
    }
  ];

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  const handleExhibitionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/explore/exhibition');
  };

  return (
    <section id="category-cards-section" className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Tà Xùa Đang Chờ Bạn
          </h2>
          <p className="font-inter text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Mỗi hành trình đều là một câu chuyện, mỗi trải nghiệm đều để lại dấu ấn trong lòng bạn
          </p>
        </div>

        {/* Main Cards Grid - 3 Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5 max-w-7xl mx-auto">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isHovered = hoveredCard === category.id;
            
            return (
              <Card
                key={category.id}
                data-category={category.id}
                className={`group relative overflow-hidden rounded-2xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer 
                  h-[460px] md:h-[460px] sm:h-[380px]
                  ${!prefersReducedMotion && isHovered ? 'md:scale-[1.03] scale-100' : 'scale-100'}
                  ${category.id === 'skyquest' ? 'md:col-span-2 lg:col-span-1' : ''}
                  animate-fade-up
                `}
                style={{
                  animationDelay: `${index * 0.2}s`,
                  animationFillMode: 'both'
                }}
                onMouseEnter={() => setHoveredCard(category.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleCardClick(category.path)}
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                  <LazyImage
                    src={category.backgroundImage}
                    alt={`${category.title} - Khám phá ${category.shortDescription} tại Tà Xùa`}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      !prefersReducedMotion && isHovered ? 'md:scale-105 md:brightness-[1.05] scale-100' : 'scale-100'
                    }`}
                  />
                  {/* Enhanced gradient overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                  {/* Additional bottom overlay for text area */}
                  <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/50 via-black/25 to-transparent" />
                </div>

                <CardContent className="relative h-full p-6 sm:p-4 flex flex-col text-white z-10">
                  {/* Top Section */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <Icon className="w-7 h-7 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 sm:w-3 sm:h-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>

                  {/* Main Content - Always visible at bottom */}
                  <div className="flex-1 flex flex-col justify-end">
                    {/* Text content area with enhanced readability */}
                    <div className="bg-gradient-to-t from-black/40 via-black/20 to-transparent p-4 rounded-2xl backdrop-blur-sm">
                      {/* Title with enhanced styling */}
                      <h3 className="font-inter text-2xl sm:text-xl font-bold text-white mb-2 leading-tight drop-shadow-lg" 
                          style={{ textShadow: '0 3px 8px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.8)' }}>
                        {category.title}
                      </h3>
                      
                      {category.subtitle && (
                        <p className="font-inter text-lg sm:text-base font-medium text-white/95 mb-3 drop-shadow-md"
                           style={{ textShadow: '0 2px 6px rgba(0,0,0,0.5)' }}>
                          {category.subtitle}
                        </p>
                      )}
                      
                      {/* Short description - always visible */}
                      <p className="font-inter text-white/92 text-base sm:text-sm leading-relaxed mb-3 drop-shadow-md"
                         style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        {category.shortDescription}
                      </p>

                      {/* Detailed Description - always visible but with subtle opacity */}
                      <div className={`transition-all duration-500 ease-out ${
                        isHovered ? 'opacity-100' : 'opacity-85'
                      }`}>
                        <p className="font-inter text-white/88 text-sm leading-relaxed mb-4 drop-shadow-sm"
                           style={{ textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}>
                          {category.detailedDescription}
                        </p>
                        
                        {/* Highlights */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {category.highlights.map((highlight, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1.5 bg-white/25 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-white/20 drop-shadow-sm"
                              style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>

                        {/* Exhibition Section for Explore Card */}
                        {category.hasExhibition && (
                          <div className="mb-4 p-3 bg-white/15 backdrop-blur-sm rounded-xl border border-white/25">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-inter text-sm font-semibold text-white flex items-center drop-shadow-sm"
                                  style={{ textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}>
                                <Camera className="w-4 h-4 mr-2" />
                                Triển lãm văn hóa số
                              </h4>
                            </div>
                            <div className="flex gap-2 mb-2">
                              {category.exhibitionImages?.slice(0, 3).map((img, idx) => (
                                <div key={idx} className="w-12 h-8 sm:w-10 sm:h-6 rounded overflow-hidden border border-white/20">
                                  <LazyImage
                                    src={img}
                                    alt={`Triển lãm ${idx + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                            <Button
                              onClick={handleExhibitionClick}
                              size="sm"
                              className="w-full bg-white/25 hover:bg-white/35 text-white border border-white/30 text-xs py-1 h-7 drop-shadow-sm transition-all duration-300"
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              Xem triển lãm
                            </Button>
                          </div>
                        )}

                        {/* CTA Button with enhanced styling */}
                        <Button 
                          className={`w-full bg-white/25 text-white border border-white/40 backdrop-blur-sm rounded-xl py-3 sm:py-2 font-semibold transition-all duration-300 group/btn drop-shadow-lg ${
                            !prefersReducedMotion && isHovered 
                              ? 'hover:bg-white/35 hover:border-white/60 hover:shadow-lg transform hover:scale-[1.02]' 
                              : 'hover:bg-white/30 hover:border-white/50'
                          }`}
                          style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}
                        >
                          <span className="mr-2">{category.ctaText}</span>
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="font-inter text-gray-600 mb-6 text-sm sm:text-xs">
            Không biết bắt đầu từ đâu? Hãy để chúng tôi gợi ý cho bạn
          </p>
          <Button 
            onClick={() => navigate('/explore')}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-6 py-3 sm:px-4 sm:py-2 rounded-full text-base sm:text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Compass className="w-4 h-4 sm:w-3 sm:h-3 mr-2" />
            Khám phá tất cả
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;