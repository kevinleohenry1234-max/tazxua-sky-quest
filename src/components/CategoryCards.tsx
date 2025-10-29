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
      shortDescription: 'Từ đỉnh Tà Xùa đến rừng nguyên sinh, mỗi hành trình là một câu chuyện thiên nhiên kỳ diệu.',
      detailedDescription: 'Từ đỉnh Tà Xùa đến rừng nguyên sinh, mỗi hành trình là một câu chuyện thiên nhiên kỳ diệu.',
      icon: Compass,
      path: '/explore',
      backgroundImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      ctaText: 'Bắt đầu khám phá',
      highlights: ['Đỉnh Tà Xùa', 'Cây cổ thụ', 'Biển mây'],
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
      shortDescription: 'Khám phá không gian lưu trú độc đáo, ẩm thực bản địa và sự hiếu khách của người dân Tà Xùa.',
      detailedDescription: 'Khám phá không gian lưu trú độc đáo, ẩm thực bản địa và sự hiếu khách của người dân Tà Xùa.',
      icon: Home,
      path: '/accommodation',
      backgroundImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2058&q=80',
      ctaText: 'Tìm nơi nghỉ ngơi',
      highlights: ['Homestay truyền thống', 'View núi', 'Ẩm thực địa phương']
    },
    {
      id: 'skyquest',
      title: 'Sky Quest',
      subtitle: 'Hành trình du lịch xanh tại Tà Xùa',
      shortDescription: 'Hành trình du lịch xanh tại Tà Xùa – nơi mỗi trải nghiệm đóng góp cho một tương lai bền vững.',
      detailedDescription: 'Hành trình du lịch xanh tại Tà Xùa – nơi mỗi trải nghiệm đóng góp cho một tương lai bền vững.',
      icon: Mountain,
      path: '/skyquest',
      backgroundImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      ctaText: 'Bắt đầu hành trình',
      highlights: ['Thử thách xanh', 'Ký ức đặc sắc', 'Câu chuyện cảm xúc'],
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
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isHovered = hoveredCard === category.id;
            
            return (
              <Card
                key={category.id}
                data-category={category.id}
                className={`group relative overflow-hidden rounded-3xl border-0 shadow-lg transition-all duration-500 cursor-pointer 
                  h-[520px] md:h-[520px] sm:h-[480px]
                  ${!prefersReducedMotion && isHovered ? 'md:scale-[1.02] scale-100 shadow-2xl' : 'scale-100 hover:shadow-xl'}
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
                {/* Background Image */}
                <div className="absolute inset-0">
                  <LazyImage
                    src={category.backgroundImage}
                    alt={`${category.title} - Khám phá ${category.shortDescription} tại Tà Xùa`}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      !prefersReducedMotion && isHovered ? 'md:scale-105 md:brightness-[1.05] scale-100' : 'scale-100'
                    }`}
                  />
                  {/* Subtle overlay - không che phủ toàn bộ ảnh */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>

                <CardContent className="relative h-full p-0 flex flex-col text-white z-10">
                  {/* Top Section - Icon và Rating */}
                  <div className="p-6 sm:p-4 flex items-center justify-between">
                    <div className="w-14 h-14 sm:w-12 sm:h-12 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                      <Icon className="w-7 h-7 sm:w-6 sm:h-6 text-white drop-shadow-lg" />
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 sm:w-3 sm:h-3 text-yellow-400 fill-current drop-shadow-sm" />
                      ))}
                    </div>
                  </div>

                  {/* Content Area - Positioned at bottom with proper spacing */}
                  <div className="flex-1 flex flex-col justify-end">
                    {/* Content container with enhanced overlay for text readability */}
                    <div className="bg-gradient-to-t from-black/60 via-black/40 to-transparent p-6 sm:p-4 space-y-4">
                      
                      {/* Title Section - Increased font size and weight */}
                      <div className="space-y-2">
                        <h3 className="font-inter text-3xl md:text-2xl sm:text-xl font-bold text-white leading-tight drop-shadow-lg" 
                            style={{ textShadow: '0 3px 8px rgba(0,0,0,0.8)' }}>
                          {category.title}
                        </h3>
                        
                        {category.subtitle && (
                          <p className="font-inter text-lg md:text-base sm:text-sm font-semibold text-white/95 drop-shadow-md"
                             style={{ textShadow: '0 2px 6px rgba(0,0,0,0.6)' }}>
                            {category.subtitle}
                          </p>
                        )}
                      </div>
                      
                      {/* Description Section - Clean and concise, max 2 lines */}
                      <div className="space-y-4 mt-4">
                        <p className="font-inter text-white/90 text-base md:text-sm leading-relaxed drop-shadow-md line-clamp-2"
                           style={{ 
                             textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                             display: '-webkit-box',
                             WebkitLineClamp: 2,
                             WebkitBoxOrient: 'vertical',
                             overflow: 'hidden'
                           }}>
                          {category.detailedDescription}
                        </p>
                      </div>

                      {/* Tags Section - Separated with clear spacing */}
                      <div className="flex flex-wrap gap-2 mt-6">
                        {category.highlights.map((highlight, index) => (
                          <span 
                            key={index}
                            className="inline-flex items-center px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-white/30 drop-shadow-sm transition-all duration-300 hover:bg-white/30"
                            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>

                      {/* Exhibition Section for Explore Card - Moved below tags */}
                      {category.hasExhibition && (
                        <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 mt-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-inter text-sm font-semibold text-white flex items-center drop-shadow-sm"
                                style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                              <Camera className="w-4 h-4 mr-2" />
                              Triển lãm văn hóa số
                            </h4>
                          </div>
                          <div className="flex gap-2 mb-3">
                            {category.exhibitionImages?.slice(0, 3).map((img, idx) => (
                              <div key={idx} className="w-12 h-8 sm:w-10 sm:h-6 rounded-lg overflow-hidden border border-white/20">
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
                            className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/50 text-xs py-2 h-8 rounded-xl drop-shadow-sm transition-all duration-300"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            Xem triển lãm
                          </Button>
                        </div>
                      )}

                      {/* CTA Button - Clear separation with proper spacing */}
                      <div className="pt-6 mt-6">
                        <Button 
                          className={`w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 rounded-2xl py-3 sm:py-2.5 font-semibold transition-all duration-300 group/btn drop-shadow-lg shadow-lg hover:shadow-xl ${
                            !prefersReducedMotion && isHovered 
                              ? 'transform hover:scale-[1.02]' 
                              : ''
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
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-4 sm:px-6 sm:py-3 rounded-full text-base sm:text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Compass className="w-5 h-5 sm:w-4 sm:h-4 mr-2" />
            Khám phá tất cả
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;