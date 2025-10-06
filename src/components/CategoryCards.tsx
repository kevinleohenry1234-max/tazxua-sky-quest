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
  Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CategoryCards = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'attractions',
      title: 'Điểm Tham Quan',
      description: 'Khám phá những cảnh đẹp nổi tiếng của Tà Xùa',
      icon: Mountain,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      path: '/attractions'
    },
    {
      id: 'accommodation',
      title: 'Lưu Trú',
      description: 'Homestay và khách sạn chất lượng cao',
      icon: Home,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      path: '/accommodation'
    },
    {
      id: 'experience',
      title: 'Trải Nghiệm',
      description: 'Hoạt động và văn hóa địa phương',
      icon: Camera,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      path: '/experience'
    },
    {
      id: 'explore',
      title: 'Khám Phá',
      description: 'Tìm hiểu sâu về vùng đất Tà Xùa',
      icon: Compass,
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      path: '/explore'
    }
  ];

  const handleCategoryClick = (path: string) => {
    navigate(path);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
            Khám Phá Tà Xùa
          </h2>
          <p className="font-inter text-lg text-gray-300 max-w-2xl mx-auto">
            Chọn danh mục để bắt đầu hành trình khám phá vùng đất thiêng liêng này
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={category.id} 
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-white/10 backdrop-blur-sm border-white/20"
                onClick={() => handleCategoryClick(category.path)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="font-playfair text-xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">
                    {category.title}
                  </h3>
                  
                  <p className="font-inter text-gray-300 text-sm mb-4 group-hover:text-gray-200 transition-colors">
                    {category.description}
                  </p>
                  
                  <Button 
                    variant="outline" 
                    className="w-full bg-white/20 border-white/30 text-white hover:bg-white/30 hover:border-white/50 transition-all duration-300"
                  >
                    Khám Phá
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;