import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import LazyImage from '@/components/LazyImage';
import homestayImage from '@/assets/homestay-taxua.jpg';
import dragonSpineImage from '@/assets/dragon-spine.jpg';
import localCuisineImage from '@/assets/local-cuisine.jpg';
import taxuaMountainBg from '@/assets/taxua-mountain-bg.svg';

const CategoryCards = () => {
  const categories = [
    {
      id: 'accommodation',
      title: 'Địa Điểm Lưu Trú',
      description: 'Khám phá những homestay và resort tuyệt đẹp giữa lòng núi rừng Tà Xùa',
      image: homestayImage,
      link: '/accommodation',
      color: 'from-blue-600/80 to-purple-600/80',
    },
    {
      id: 'attractions',
      title: 'Địa Điểm Nổi Bật',
      description: 'Tham quan các danh lam thắng cảnh nổi tiếng như Sống Lưng Khủng Long',
      image: dragonSpineImage,
      link: '/attractions',
      color: 'from-purple-600/80 to-slate-700/80',
    },
    {
      id: 'culture',
      title: 'Thông Tin Chung',
      description: 'Tìm hiểu về văn hóa, lịch sử và ẩm thực đặc sắc của vùng đất Tà Xùa',
      image: localCuisineImage,
      link: '/about',
      color: 'from-slate-700/80 to-blue-600/80',
    },
  ];

  const handleCategoryClick = (link: string) => {
    window.location.href = link;
  };

  return (
    <section 
      id="discover" 
      className="py-20 relative overflow-hidden"
      style={{
        backgroundImage: `url(${taxuaMountainBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Khám Phá Tà Xùa
          </h2>
          <p className="font-inter text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
            Hãy cùng chúng tôi khám phá những điều kỳ diệu mà Tà Xùa mang lại
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Card
              key={category.id}
              className="group cursor-pointer overflow-hidden border-0 shadow-soft hover:shadow-medium transition-all duration-500 hover:-translate-y-2"
              onClick={() => handleCategoryClick(category.link)}
            >
              <div className="relative h-64 overflow-hidden">
                <LazyImage
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-40 transition-opacity duration-300`} />
                
                {/* Overlay Content */}
                <div className="absolute inset-0 flex items-end p-6">
                  <div className="text-white">
                    <h3 className="font-playfair text-xl md:text-2xl font-bold mb-2">
                      {category.title}
                    </h3>
                    <div className="flex items-center text-white/90 group-hover:text-white transition-colors duration-300">
                      <span className="font-inter text-sm">Khám phá thêm</span>
                      <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <p className="font-inter text-muted-foreground leading-relaxed">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;