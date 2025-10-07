import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Mountain, 
  Home, 
  Coffee, 
  Camera, 
  TreePine, 
  MapPin,
  Compass,
  Users,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CategoryCards = () => {
  const navigate = useNavigate();

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
      path: '/explore'
    }
  ];

  const handleCategoryClick = (path: string) => {
    navigate(path);
  };

  return (
    <section className="w-full py-24 px-0">
      {/* Full-width container */}
      <div className="w-full max-w-none">
        {/* Cinematic Header with Dramatic Typography */}
        <div className="text-center mb-20 px-8">
          <h2 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight">
            <span 
              className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent"
              style={{
                textShadow: '0 0 40px rgba(255,255,255,0.2)',
              }}
            >
              Khám Phá Tà Xùa
            </span>
          </h2>
          <div className="max-w-4xl mx-auto px-4">
            <p className="font-inter text-xl md:text-2xl lg:text-3xl text-white/80 leading-relaxed font-light tracking-wide">
              Chọn danh mục để bắt đầu hành trình khám phá vùng đất thiêng liêng này
            </p>
          </div>
        </div>

        {/* Full-width Cards Grid */}
        <div className="w-full px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-8xl mx-auto">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card 
                  key={category.id} 
                  className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:scale-105 cursor-pointer bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl"
                  onClick={() => handleCategoryClick(category.path)}
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
                      <span className="mr-2">Khám Phá</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Cinematic Bottom Spacing */}
        <div className="h-16"></div>
      </div>
    </section>
  );
};

export default CategoryCards;