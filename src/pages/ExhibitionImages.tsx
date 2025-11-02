import { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import LoginModal, { LoginData } from '@/components/LoginModal';
import RegisterModal from '@/components/RegisterModal';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Camera, 
  Search, 
  Filter, 
  Download, 
  Heart, 
  Share2,
  ArrowLeft,
  Grid3X3,
  List,
  Eye,
  Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LazyImage from '@/components/LazyImage';

// Import sample images
import terraceFieldsImage from '@/assets/dragon-spine.jpg';
import heroImage from '@/assets/hero-taxua-clouds.jpg';
import hmongCultureImage from '@/assets/hmong-culture.jpg';
import localCuisineImage from '@/assets/local-cuisine.jpg';
import shanTuyetTeaImage from '@/assets/shan-tuyet-tea.jpg';

const ExhibitionImages = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('masonry');
  const navigate = useNavigate();

  const handleLogin = async (data: LoginData) => {
    setIsLoggedIn(true);
    setUserName(data.email.split('@')[0]);
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
  };

  const imageGallery = [
    {
      id: 1,
      title: 'Ruộng Bậc Thang Tà Xùa',
      description: 'Những thửa ruộng bậc thang uốn lượn như dải lụa vàng trên sườn núi',
      image: terraceFieldsImage,
      category: 'landscape',
      photographer: 'Nguyễn Văn A',
      date: '2024-01-15',
      likes: 245,
      views: 1250,
      tags: ['ruộng bậc thang', 'phong cảnh', 'núi rừng'],
      height: 'h-80'
    },
    {
      id: 2,
      title: 'Biển Mây Tà Xùa',
      description: 'Biển mây bồng bềnh trên đỉnh núi cao, tạo nên khung cảnh thơ mộng',
      image: heroImage,
      category: 'landscape',
      photographer: 'Trần Thị B',
      date: '2024-01-20',
      likes: 189,
      views: 890,
      tags: ['biển mây', 'đỉnh núi', 'bình minh'],
      height: 'h-96'
    },
    {
      id: 3,
      title: 'Văn Hóa H\'Mông',
      description: 'Trang phục truyền thống đầy màu sắc của người H\'Mông',
      image: hmongCultureImage,
      category: 'culture',
      photographer: 'Lê Văn C',
      date: '2024-01-25',
      likes: 156,
      views: 670,
      tags: ['văn hóa', 'trang phục', 'truyền thống'],
      height: 'h-72'
    },
    {
      id: 4,
      title: 'Ẩm Thực Địa Phương',
      description: 'Những món ăn đặc sản được chế biến từ nguyên liệu tươi ngon',
      image: localCuisineImage,
      category: 'cuisine',
      photographer: 'Phạm Thị D',
      date: '2024-02-01',
      likes: 203,
      views: 1100,
      tags: ['ẩm thực', 'đặc sản', 'món ăn'],
      height: 'h-64'
    },
    {
      id: 5,
      title: 'Chè Shan Tuyết Cổ Thụ',
      description: 'Những cây chè cổ thụ hàng trăm năm tuổi trên núi cao',
      image: shanTuyetTeaImage,
      category: 'nature',
      photographer: 'Hoàng Văn E',
      date: '2024-02-05',
      likes: 178,
      views: 820,
      tags: ['chè shan tuyết', 'cổ thụ', 'thiên nhiên'],
      height: 'h-88'
    },
    // Duplicate some images for demonstration
    {
      id: 6,
      title: 'Sương Mù Buổi Sáng',
      description: 'Sương mù bao phủ thung lũng tạo nên khung cảnh huyền ảo',
      image: heroImage,
      category: 'landscape',
      photographer: 'Nguyễn Văn F',
      date: '2024-02-10',
      likes: 134,
      views: 560,
      tags: ['sương mù', 'buổi sáng', 'thung lũng'],
      height: 'h-76'
    }
  ];

  const categories = [
    { id: 'all', label: 'Tất cả', count: imageGallery.length },
    { id: 'landscape', label: 'Phong cảnh', count: imageGallery.filter(img => img.category === 'landscape').length },
    { id: 'culture', label: 'Văn hóa', count: imageGallery.filter(img => img.category === 'culture').length },
    { id: 'cuisine', label: 'Ẩm thực', count: imageGallery.filter(img => img.category === 'cuisine').length },
    { id: 'nature', label: 'Thiên nhiên', count: imageGallery.filter(img => img.category === 'nature').length }
  ];

  const filteredImages = imageGallery.filter(image => {
    const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
        onSwitchToRegister={() => {
          setIsLoginModalOpen(false);
          setIsRegisterModalOpen(true);
        }}
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSwitchToLogin={() => {
          setIsRegisterModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />

      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-30">
          <LazyImage
            src={terraceFieldsImage}
            alt="Gallery Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate('/trien-lam')}
            className="mb-6 text-white/80 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại Triển lãm
          </Button>
          
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-4">
            Thư Viện Hình Ảnh
          </h1>
          <p className="font-inter text-xl text-white/90 mb-8">
            Khám phá vẻ đẹp Tà Xùa qua những bức ảnh tuyệt đẹp
          </p>
          
          <div className="flex items-center justify-center gap-4 text-white/70">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              <span className="font-inter">{imageGallery.length} ảnh</span>
            </div>
            <div className="w-1 h-1 bg-white/50 rounded-full"></div>
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              <span className="font-inter">
                {imageGallery.reduce((total, img) => total + img.views, 0).toLocaleString()} lượt xem
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Tìm kiếm ảnh..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'masonry' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('masonry')}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className="rounded-full"
              >
                {category.label}
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Image Gallery */}
          <div className={`${
            viewMode === 'masonry' 
              ? 'columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6' 
              : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          }`}>
            {filteredImages.map((image) => (
              <Card 
                key={image.id} 
                className={`group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 ${
                  viewMode === 'masonry' ? 'break-inside-avoid mb-6' : ''
                }`}
              >
                <div className={`relative overflow-hidden ${viewMode === 'grid' ? 'h-64' : image.height}`}>
                  <LazyImage
                    src={image.image}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between mb-2">
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                          <Heart className="w-4 h-4 mr-1" />
                          {image.likes}
                        </Button>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                            <Share2 className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-playfair text-lg font-bold text-foreground mb-2 line-clamp-1">
                    {image.title}
                  </h3>
                  <p className="font-inter text-sm text-muted-foreground mb-3 line-clamp-2">
                    {image.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span className="font-inter">bởi {image.photographer}</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(image.date).toLocaleDateString('vi-VN')}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{image.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        <span>{image.likes}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {image.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-playfair text-xl font-bold text-foreground mb-2">
                Không tìm thấy ảnh nào
              </h3>
              <p className="font-inter text-muted-foreground">
                Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc danh mục
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </Layout>
  );
};

export default ExhibitionImages;