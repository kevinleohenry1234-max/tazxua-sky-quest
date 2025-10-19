import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import LoginModal, { LoginData } from '@/components/LoginModal';
import RegisterModal from '@/components/RegisterModal';
import LazyImage from '@/components/LazyImage';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Palette, 
  Camera, 
  Brush, 
  Sparkles,
  ArrowRight,
  Eye,
  Heart,
  Share2,
  Download,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX
} from 'lucide-react';

// Import exhibition images
import artworkImage1 from '@/assets/dragon-spine.jpg';
import artworkImage2 from '@/assets/hero-taxua-clouds.jpg';
import artworkImage3 from '@/assets/hmong-culture.jpg';
import artworkImage4 from '@/assets/local-cuisine.jpg';
import artworkImage5 from '@/assets/shan-tuyet-tea.jpg';

interface Artwork {
  id: number;
  title: string;
  artist: string;
  year: string;
  medium: string;
  description: string;
  image: string;
  category: 'photography' | 'painting' | 'digital' | 'traditional';
  featured: boolean;
  views: number;
  likes: number;
}

const ExhibitionGallery = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
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

  const artworks: Artwork[] = [
    {
      id: 1,
      title: "Sương Mai Tà Xùa",
      artist: "Nguyễn Văn Minh",
      year: "2024",
      medium: "Nhiếp ảnh số",
      description: "Khoảnh khắc bình minh đầu tiên chiếu rọi qua làn sương mỏng manh, tạo nên một bức tranh thiên nhiên tuyệt đẹp trên đỉnh Tà Xùa.",
      image: artworkImage1,
      category: 'photography',
      featured: true,
      views: 2847,
      likes: 156
    },
    {
      id: 2,
      title: "Biển Mây Vô Tận",
      artist: "Trần Thị Hoa",
      year: "2024",
      medium: "Acrylic trên canvas",
      description: "Tác phẩm tái hiện vẻ đẹp huyền ảo của biển mây Tà Xùa, nơi những đám mây trắng muốt trôi lững lờ giữa không gian bao la.",
      image: artworkImage2,
      category: 'painting',
      featured: true,
      views: 1923,
      likes: 89
    },
    {
      id: 3,
      title: "Văn Hóa H'Mông",
      artist: "Lý Văn Sơn",
      year: "2023",
      medium: "Nghệ thuật số",
      description: "Bức tranh số mô tả đời sống văn hóa phong phú của đồng bào H'Mông, với những trang phục truyền thống rực rỡ sắc màu.",
      image: artworkImage3,
      category: 'digital',
      featured: false,
      views: 1456,
      likes: 67
    },
    {
      id: 4,
      title: "Hương Vị Núi Rừng",
      artist: "Phạm Thị Lan",
      year: "2024",
      medium: "Tranh lụa truyền thống",
      description: "Tác phẩm tranh lụa thể hiện những món ăn đặc sản của vùng núi Tà Xùa, được vẽ bằng kỹ thuật truyền thống của nghệ nhân địa phương.",
      image: artworkImage4,
      category: 'traditional',
      featured: false,
      views: 987,
      likes: 43
    },
    {
      id: 5,
      title: "Chè Shan Tuyết Cổ Thụ",
      artist: "Hoàng Văn Đức",
      year: "2024",
      medium: "Nhiếp ảnh macro",
      description: "Những chiếc lá chè Shan Tuyết cổ thụ được chụp cận cảnh, thể hiện vẻ đẹp tinh tế và giá trị văn hóa của loại chè quý hiếm này.",
      image: artworkImage5,
      category: 'photography',
      featured: true,
      views: 3241,
      likes: 198
    }
  ];

  const featuredArtworks = artworks.filter(artwork => artwork.featured);

  // Auto-slide for featured artworks
  useEffect(() => {
    if (isPlaying && featuredArtworks.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredArtworks.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, featuredArtworks.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredArtworks.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredArtworks.length) % featuredArtworks.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <Layout>
      <Header
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onRegisterClick={() => setIsRegisterModalOpen(true)}
        onLogoutClick={handleLogout}
      />

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

      {/* Artwork Detail Modal */}
      {selectedArtwork && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="relative">
              <div className="h-80 overflow-hidden">
                <LazyImage
                  src={selectedArtwork.image}
                  alt={selectedArtwork.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedArtwork(null)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full w-10 h-10 p-0"
              >
                ✕
              </Button>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-2">
                    {selectedArtwork.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {selectedArtwork.artist} • {selectedArtwork.year} • {selectedArtwork.medium}
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {selectedArtwork.description}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{selectedArtwork.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{selectedArtwork.likes}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Heart className="w-4 h-4 mr-2" />
                      Yêu thích
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section - Minimalist Featured Slideshow */}
      <section className="relative h-screen overflow-hidden bg-gradient-to-br from-stone-50 to-amber-50">
        {featuredArtworks.length > 0 && (
          <>
            {/* Background Image */}
            <div className="absolute inset-0">
              <LazyImage
                src={featuredArtworks[currentSlide].image}
                alt={featuredArtworks[currentSlide].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex items-end">
              <div className="container mx-auto px-4 pb-20">
                <div className="max-w-2xl">
                  <h1 className="font-playfair text-5xl md:text-7xl font-light text-white mb-6 leading-tight">
                    Triển Lãm
                    <span className="block font-bold">Nghệ Thuật</span>
                    <span className="block text-3xl md:text-4xl font-light text-amber-200 mt-2">
                      Tà Xùa
                    </span>
                  </h1>
                  
                  <p className="text-xl text-white/90 mb-8 leading-relaxed">
                    {featuredArtworks[currentSlide].description}
                  </p>
                  
                  <div className="flex items-center gap-4 mb-8">
                    <div className="text-white/80">
                      <p className="font-medium">{featuredArtworks[currentSlide].artist}</p>
                      <p className="text-sm">{featuredArtworks[currentSlide].year} • {featuredArtworks[currentSlide].medium}</p>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => setSelectedArtwork(featuredArtworks[currentSlide])}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white/50 backdrop-blur-sm"
                  >
                    Xem Chi Tiết
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-8 right-8 flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevSlide}
                className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm rounded-full w-12 h-12 p-0"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={togglePlayPause}
                className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm rounded-full w-12 h-12 p-0"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={nextSlide}
                className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm rounded-full w-12 h-12 p-0"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
              {featuredArtworks.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-white w-8'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Gallery Section - Minimalist Grid */}
      <section className="py-20 bg-gradient-to-b from-stone-50 to-white">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Bộ Sưu Tập
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Khám phá những tác phẩm nghệ thuật được tuyển chọn, thể hiện vẻ đẹp và văn hóa độc đáo của Tà Xùa
            </p>
          </div>

          {/* Artwork Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {artworks.map((artwork) => (
              <Card 
                key={artwork.id}
                className="group cursor-pointer border-0 shadow-none hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden"
                onClick={() => setSelectedArtwork(artwork)}
              >
                <div className="relative overflow-hidden">
                  <LazyImage
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between text-white text-sm">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{artwork.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            <span>{artwork.likes}</span>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="font-playfair text-xl font-medium text-gray-900 mb-2">
                    {artwork.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {artwork.artist} • {artwork.year}
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">
                    {artwork.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </Layout>
  );
};

export default ExhibitionGallery;