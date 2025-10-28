import React, { useState, useRef } from 'react';
import { Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollAnimation, animationClasses } from '@/hooks/useScrollAnimation';

interface Activity {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  category: string;
  image: string;
  isFavorite?: boolean;
}

interface ActivitiesSectionProps {
  title?: string;
  subtitle?: string;
  activities?: Activity[];
  className?: string;
}

const defaultActivities: Activity[] = [
  {
    id: 'cloud-hunting',
    name: 'Trải nghiệm săn mây tại đỉnh Tà Xùa',
    rating: 4.9,
    reviewCount: 1234,
    category: 'Tour ngắm cảnh, Trekking sáng sớm',
    image: '/images/explore/cloud-hunting-taxua.jpg',
    isFavorite: false
  },
  {
    id: 'dragon-spine-motorbike',
    name: 'Lái xe máy xuyên rừng đến Sống lưng khủng long',
    rating: 5.0,
    reviewCount: 874,
    category: 'Trải nghiệm phiêu lưu, Tự lái',
    image: '/images/explore/dragon-spine-motorbike.jpg',
    isFavorite: false
  },
  {
    id: 'local-market',
    name: 'Khám phá chợ phiên địa phương',
    rating: 4.7,
    reviewCount: 652,
    category: 'Văn hóa bản địa, Chợ dân tộc',
    image: '/images/explore/local-market-hmong.jpg',
    isFavorite: false
  },
  {
    id: 'shan-tuyet-tea',
    name: 'Thưởng trà Shan Tuyết cùng người bản địa',
    rating: 5.0,
    reviewCount: 412,
    category: 'Ẩm thực & Giao lưu văn hoá',
    image: '/images/explore/shan-tuyet-tea-experience.jpg',
    isFavorite: false
  }
];

const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({
  title = "Những hoạt động nên thử tại Tà Xùa",
  subtitle = "Tận hưởng những trải nghiệm hấp dẫn giữa thiên nhiên Tây Bắc",
  activities = defaultActivities,
  className = ""
}) => {
  const [favoriteActivities, setFavoriteActivities] = useState<Set<string>>(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionAnimation = useScrollAnimation();

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

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.scrollWidth / activities.length;
      container.scrollTo({
        left: cardWidth * index,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const scrollLeft = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    scrollToIndex(newIndex);
  };

  const scrollRight = () => {
    const maxIndex = activities.length - 4; // Show 4 cards on desktop
    const newIndex = Math.min(maxIndex, currentIndex + 1);
    scrollToIndex(newIndex);
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
    <section 
      ref={sectionAnimation.elementRef}
      className={`py-16 bg-gradient-to-b from-gray-50/50 to-white relative overflow-hidden ${className}`}
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-12 ${animationClasses.fadeUp.transition} ${sectionAnimation.isVisible ? animationClasses.fadeUp.animate : animationClasses.fadeUp.initial}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Activities Carousel Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Arrows - Desktop & Tablet Only */}
          <button
            onClick={scrollLeft}
            disabled={currentIndex === 0}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 w-12 h-12 bg-white shadow-lg rounded-full items-center justify-center hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-100"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={scrollRight}
            disabled={currentIndex >= activities.length - 4}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20 w-12 h-12 bg-white shadow-lg rounded-full items-center justify-center hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-100"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Scrollable Activities Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
            style={{
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className={`flex-none w-full md:w-1/2 xl:w-1/4 ${animationClasses.fadeUp.transition} ${sectionAnimation.isVisible ? animationClasses.fadeUp.animate : animationClasses.fadeUp.initial}`}
                style={{ 
                  animationDelay: `${index * 150}ms`,
                  scrollSnapAlign: 'start'
                }}
              >
                <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
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
                    
                    {/* Favorite Heart Button */}
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
                  <div className="p-5">
                    {/* Activity Name */}
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
                      {activity.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
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
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {activity.category}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Scroll Indicator Dots */}
        <div className="flex md:hidden justify-center mt-6 gap-2">
          {Array.from({ length: activities.length }, (_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-emerald-600 w-6'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>


    </section>
  );
};

export default ActivitiesSection;