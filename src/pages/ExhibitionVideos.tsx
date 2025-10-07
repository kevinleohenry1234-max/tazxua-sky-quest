import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import LoginModal, { LoginData } from '@/components/LoginModal';
import RegisterModal from '@/components/RegisterModal';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Video, 
  Search, 
  Play, 
  Clock, 
  Eye, 
  Heart, 
  Share2,
  ArrowLeft,
  Calendar,
  User,
  Volume2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LazyImage from '@/components/LazyImage';

// Import sample images for video thumbnails
import heroImage from '@/assets/hero-taxua-clouds.jpg';
import terraceFieldsImage from '@/assets/dragon-spine.jpg';
import hmongCultureImage from '@/assets/hmong-culture.jpg';
import shanTuyetTeaImage from '@/assets/shan-tuyet-tea.jpg';

const ExhibitionVideos = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
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

  const videoGallery = [
    {
      id: 1,
      title: 'Tà Xùa - Thiên Đường Trên Mây',
      description: 'Khám phá vẻ đẹp hùng vĩ của Tà Xùa từ góc nhìn flycam, nơi biển mây bồng bềnh tạo nên khung cảnh thơ mộng.',
      thumbnail: heroImage,
      duration: '8:45',
      category: 'landscape',
      creator: 'Tà Xùa Media',
      uploadDate: '2024-01-15',
      views: 15420,
      likes: 892,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Sample YouTube embed
      tags: ['flycam', 'biển mây', 'phong cảnh', 'thiên nhiên']
    },
    {
      id: 2,
      title: 'Ruộng Bậc Thang Mùa Nước Đổ',
      description: 'Cảnh đẹp ruộng bậc thang Tà Xùa trong mùa nước đổ, khi những thửa ruộng như gương phản chiếu bầu trời.',
      thumbnail: terraceFieldsImage,
      duration: '6:32',
      category: 'landscape',
      creator: 'Vietnam Discovery',
      uploadDate: '2024-01-20',
      views: 12350,
      likes: 654,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      tags: ['ruộng bậc thang', 'nước đổ', 'nông nghiệp']
    },
    {
      id: 3,
      title: 'Văn Hóa H\'Mông Tà Xùa',
      description: 'Tìm hiểu về văn hóa truyền thống của người H\'Mông qua các lễ hội, trang phục và phong tục tập quán.',
      thumbnail: hmongCultureImage,
      duration: '12:18',
      category: 'culture',
      creator: 'Cultural Heritage',
      uploadDate: '2024-01-25',
      views: 8760,
      likes: 423,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      tags: ['văn hóa', 'H\'Mông', 'truyền thống', 'lễ hội']
    },
    {
      id: 4,
      title: 'Hành Trình Chè Shan Tuyết',
      description: 'Từ những cây chè cổ thụ hàng trăm năm tuổi đến tách chè thơm ngon, khám phá hành trình của chè Shan Tuyết.',
      thumbnail: shanTuyetTeaImage,
      duration: '9:27',
      category: 'culture',
      creator: 'Tea Journey',
      uploadDate: '2024-02-01',
      views: 6890,
      likes: 312,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      tags: ['chè shan tuyết', 'trà', 'nông nghiệp', 'đặc sản']
    },
    {
      id: 5,
      title: 'Bình Minh Trên Đỉnh Phu Sang',
      description: 'Trải nghiệm cảm giác chinh phục đỉnh Phu Sang cao 2,865m và ngắm bình minh tuyệt đẹp.',
      thumbnail: heroImage,
      duration: '15:43',
      category: 'adventure',
      creator: 'Mountain Explorer',
      uploadDate: '2024-02-05',
      views: 18920,
      likes: 1205,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      tags: ['leo núi', 'bình minh', 'phiêu lưu', 'đỉnh núi']
    },
    {
      id: 6,
      title: 'Ẩm Thực Núi Rừng Tà Xùa',
      description: 'Khám phá những món ăn đặc sản của vùng núi cao, từ thịt trâu gác bếp đến rau rừng tươi ngon.',
      thumbnail: terraceFieldsImage,
      duration: '7:56',
      category: 'cuisine',
      creator: 'Food Explorer',
      uploadDate: '2024-02-10',
      views: 9430,
      likes: 567,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      tags: ['ẩm thực', 'đặc sản', 'món ăn', 'núi rừng']
    }
  ];

  const categories = [
    { id: 'all', label: 'Tất cả', count: videoGallery.length },
    { id: 'landscape', label: 'Phong cảnh', count: videoGallery.filter(video => video.category === 'landscape').length },
    { id: 'culture', label: 'Văn hóa', count: videoGallery.filter(video => video.category === 'culture').length },
    { id: 'adventure', label: 'Phiêu lưu', count: videoGallery.filter(video => video.category === 'adventure').length },
    { id: 'cuisine', label: 'Ẩm thực', count: videoGallery.filter(video => video.category === 'cuisine').length }
  ];

  const filteredVideos = videoGallery.filter(video => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleVideoSelect = (videoId: number) => {
    setSelectedVideo(videoId);
  };

  const selectedVideoData = selectedVideo ? videoGallery.find(v => v.id === selectedVideo) : null;

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

      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-30">
          <LazyImage
            src={heroImage}
            alt="Video Gallery Background"
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
            Thư Viện Video
          </h1>
          <p className="font-inter text-xl text-white/90 mb-8">
            Trải nghiệm Tà Xùa qua những thước phim tuyệt đẹp
          </p>
          
          <div className="flex items-center justify-center gap-4 text-white/70">
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5" />
              <span className="font-inter">{videoGallery.length} video</span>
            </div>
            <div className="w-1 h-1 bg-white/50 rounded-full"></div>
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              <span className="font-inter">
                {videoGallery.reduce((total, video) => total + video.views, 0).toLocaleString()} lượt xem
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {/* Video Player Section */}
          {selectedVideoData && (
            <div className="mb-12">
              <Card className="overflow-hidden shadow-2xl">
                <div className="aspect-video">
                  <iframe
                    src={selectedVideoData.videoUrl}
                    title={selectedVideoData.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                      <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground mb-3">
                        {selectedVideoData.title}
                      </h2>
                      <p className="font-inter text-muted-foreground mb-4 leading-relaxed">
                        {selectedVideoData.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {selectedVideoData.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="lg:w-80">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{selectedVideoData.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            <span>{selectedVideoData.likes}</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Share2 className="w-4 h-4 mr-2" />
                          Chia sẻ
                        </Button>
                      </div>
                      
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{selectedVideoData.creator}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(selectedVideoData.uploadDate).toLocaleDateString('vi-VN')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{selectedVideoData.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Filters and Search */}
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Tìm kiếm video..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
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

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <Card 
                key={video.id} 
                className={`group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 ${
                  selectedVideo === video.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleVideoSelect(video.id)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <LazyImage
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-primary ml-1" />
                    </div>
                  </div>
                  
                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm font-inter">
                    {video.duration}
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-playfair text-lg font-bold text-foreground mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="font-inter text-sm text-muted-foreground mb-3 line-clamp-2">
                    {video.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span className="font-inter">{video.creator}</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(video.uploadDate).toLocaleDateString('vi-VN')}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{video.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        <span>{video.likes}</span>
                      </div>
                    </div>
                    
                    <Badge variant="outline" className="text-xs">
                      {categories.find(cat => cat.id === video.category)?.label}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-12">
              <Video className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-playfair text-xl font-bold text-foreground mb-2">
                Không tìm thấy video nào
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

export default ExhibitionVideos;