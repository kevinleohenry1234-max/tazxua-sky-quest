import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Home, Eye, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import LoginModal from '@/components/LoginModal';
import RegisterModal from '@/components/RegisterModal';
import LazyImage from '@/components/LazyImage';

const ExploreExhibition = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const exhibitionItems = [
    {
      id: 1,
      title: 'Thổ cẩm H\'Mông - Nghệ thuật dệt truyền thống',
      description: 'Khám phá vẻ đẹp của nghệ thuật dệt thổ cẩm H\'Mông với những họa tiết độc đáo và ý nghĩa văn hóa sâu sắc.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800&auto=format&fit=crop',
      category: 'Văn hóa',
      featured: true
    },
    {
      id: 2,
      title: 'Kiến trúc nhà sàn truyền thống',
      description: 'Tìm hiểu về kiến trúc độc đáo của những ngôi nhà sàn H\'Mông, phản ánh sự hòa hợp với thiên nhiên.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop',
      category: 'Kiến trúc',
      featured: true
    },
    {
      id: 3,
      title: 'Lễ hội và tín ngưỡng',
      description: 'Khám phá những lễ hội truyền thống và tín ngưỡng của người H\'Mông tại vùng núi Tà Xùa.',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
      category: 'Tín ngưỡng',
      featured: false
    },
    {
      id: 4,
      title: 'Ẩm thực núi rừng',
      description: 'Trải nghiệm hương vị đặc trưng của ẩm thực H\'Mông với những món ăn từ thiên nhiên.',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop',
      category: 'Ẩm thực',
      featured: false
    },
    {
      id: 5,
      title: 'Nhạc cụ dân tộc',
      description: 'Tìm hiểu về những nhạc cụ truyền thống và âm nhạc dân gian của người H\'Mông.',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=800&auto=format&fit=crop',
      category: 'Âm nhạc',
      featured: false
    },
    {
      id: 6,
      title: 'Trang phục truyền thống',
      description: 'Khám phá vẻ đẹp của trang phục truyền thống H\'Mông với những chi tiết tinh xảo.',
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?q=80&w=800&auto=format&fit=crop',
      category: 'Trang phục',
      featured: false
    }
  ];

  const featuredItems = exhibitionItems.filter(item => item.featured);
  const regularItems = exhibitionItems.filter(item => !item.featured);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải triển lãm...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-gray-500 hover:text-green-600 transition-colors"
            >
              <Home className="w-4 h-4 mr-1" />
              Trang chủ
            </button>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <button
              onClick={() => navigate('/explore')}
              className="text-gray-500 hover:text-green-600 transition-colors"
            >
              Khám Phá
            </button>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-green-600 font-medium">Triển lãm số</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 via-emerald-600 to-yellow-400 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
              Triển lãm văn hóa số
            </h1>
            <p className="font-inter text-xl text-white/90 leading-relaxed mb-8">
              Khám phá vẻ đẹp văn hóa H'Mông qua những trải nghiệm số tương tác, 
              nơi truyền thống gặp gỡ công nghệ hiện đại
            </p>
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center text-white/80">
                <Eye className="w-5 h-5 mr-2" />
                <span>6 bộ sưu tập</span>
              </div>
              <div className="w-1 h-1 bg-white/60 rounded-full"></div>
              <div className="text-white/80">
                Trải nghiệm tương tác
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Exhibitions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl font-bold text-center text-gray-800 mb-12">
            Triển lãm nổi bật
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {featuredItems.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                onClick={() => navigate(`/digital-exhibition/${item.id}`)}
              >
                <div className="aspect-[4/3] relative">
                  <LazyImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                      {item.category}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-inter text-xl font-bold mb-2 group-hover:text-yellow-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>
                    <Button
                      size="sm"
                      className="bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/50 backdrop-blur-sm"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Khám phá ngay
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Exhibitions Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl font-bold text-center text-gray-800 mb-12">
            Tất cả triển lãm
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {regularItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
                onClick={() => navigate(`/digital-exhibition/${item.id}`)}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <LazyImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                      {item.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-inter text-lg font-semibold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    {item.description}
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full border-green-200 text-green-700 hover:bg-green-50"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Xem chi tiết
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Explore */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <Button
            onClick={() => navigate('/explore')}
            variant="outline"
            className="border-green-200 text-green-700 hover:bg-green-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại Khám Phá
          </Button>
        </div>
      </section>

      <Footer />
    </Layout>
  );
};

export default ExploreExhibition;