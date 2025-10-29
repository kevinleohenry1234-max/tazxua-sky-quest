import { useState, useEffect } from 'react';
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
  Sparkles, 
  Search, 
  Eye, 
  Heart,
  Download,
  Share2,
  ArrowLeft,
  Palette,
  Cpu,
  Zap,
  Image as ImageIcon,
  Wand2,
  Brain,
  Stars,
  Lightbulb
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LazyImage from '@/components/LazyImage';
import { seoOptimizer } from '@/utils/seoOptimizer';

// Import sample images
import heroImage from '@/assets/hero-taxua-clouds.jpg';
import hmongCultureImage from '@/assets/hmong-culture.jpg';
import terraceFieldsImage from '@/assets/dragon-spine.jpg';
import shanTuyetTeaImage from '@/assets/shan-tuyet-tea.jpg';

const ExhibitionAI = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArtwork, setSelectedArtwork] = useState<number | null>(null);
  const navigate = useNavigate();

  // SEO optimization for AI exhibition page
  useEffect(() => {
    seoOptimizer.updateMetaTags({
      title: 'Triển Lãm AI Tà Xùa - Nghệ Thuật Số Và Công Nghệ Hiện Đại',
      description: 'Khám phá bộ sưu tập nghệ thuật số độc đáo về Tà Xùa được tạo ra bởi AI. Trải nghiệm sự kết hợp giữa vẻ đẹp thiên nhiên và công nghệ trí tuệ nhân tạo tiên tiến.',
      keywords: 'triển lãm AI, nghệ thuật số Tà Xùa, AI art, DALL-E, Midjourney, công nghệ AI, nghệ thuật hiện đại',
      image: heroImage,
      type: 'article',
      locale: 'vi_VN'
    });

    // Add structured data for AI exhibition
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ExhibitionEvent",
      "name": "Triển Lãm AI Tà Xùa",
      "description": "Triển lãm nghệ thuật số về Tà Xùa được tạo ra bởi trí tuệ nhân tạo",
      "image": [heroImage, hmongCultureImage, terraceFieldsImage, shanTuyetTeaImage],
      "startDate": "2024-01-01",
      "endDate": "2024-12-31",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
      "location": {
        "@type": "VirtualLocation",
        "url": window.location.href
      },
      "organizer": {
        "@type": "Organization",
        "name": "Tà Xùa Mùa Xanh",
        "url": window.location.origin
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "VND",
        "availability": "https://schema.org/InStock"
      }
    };

    seoOptimizer.addStructuredData(structuredData);

    // Add breadcrumb
    seoOptimizer.addBreadcrumbStructuredData([
      { name: 'Trang chủ', url: window.location.origin },
      { name: 'Triển lãm AI', url: window.location.href }
    ]);
  }, []);

  const handleLogin = async (data: LoginData) => {
    setIsLoggedIn(true);
    setUserName(data.email.split('@')[0]);
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
  };

  const aiArtCollection = [
    {
      id: 1,
      title: 'Tà Xùa Trong Mắt AI',
      description: 'Tác phẩm nghệ thuật số được tạo ra bởi AI, thể hiện vẻ đẹp hùng vĩ của Tà Xùa qua góc nhìn công nghệ hiện đại.',
      image: heroImage,
      category: 'landscape',
      aiModel: 'DALL-E 3',
      style: 'Hyperrealistic',
      prompt: 'Majestic Ta Xua mountain peaks emerging from sea of clouds at sunrise, cinematic lighting, hyperrealistic style',
      resolution: '1024x1024',
      createdDate: '2024-02-15',
      views: 5420,
      likes: 892,
      downloads: 234,
      artist: 'AI Artist Collective',
      tags: ['núi non', 'biển mây', 'bình minh', 'siêu thực']
    },
    {
      id: 2,
      title: 'Ruộng Bậc Thang Tương Lai',
      description: 'Hình ảnh ruộng bậc thang Tà Xùa được AI tái hiện với phong cách futuristic, kết hợp giữa truyền thống và hiện đại.',
      image: terraceFieldsImage,
      category: 'futuristic',
      aiModel: 'Midjourney V6',
      style: 'Futuristic',
      prompt: 'Ta Xua terraced rice fields with holographic elements, neon lights, cyberpunk aesthetic, traditional meets future',
      resolution: '1792x1024',
      createdDate: '2024-02-10',
      views: 3890,
      likes: 654,
      downloads: 189,
      artist: 'Digital Dreams Studio',
      tags: ['ruộng bậc thang', 'tương lai', 'cyberpunk', 'hologram']
    },
    {
      id: 3,
      title: 'Văn Hóa H\'Mông Số Hóa',
      description: 'Tác phẩm AI thể hiện văn hóa truyền thống H\'Mông qua lăng kính nghệ thuật số, với các yếu tố pattern và màu sắc đặc trưng.',
      image: hmongCultureImage,
      category: 'culture',
      aiModel: 'Stable Diffusion XL',
      style: 'Digital Art',
      prompt: 'Hmong traditional patterns and costumes reimagined as digital art, vibrant colors, geometric patterns, cultural fusion',
      resolution: '1024x1024',
      createdDate: '2024-02-05',
      views: 4560,
      likes: 723,
      downloads: 156,
      artist: 'Cultural AI Lab',
      tags: ['H\'Mông', 'văn hóa', 'pattern', 'truyền thống']
    },
    {
      id: 4,
      title: 'Chè Shan Tuyết Huyền Ảo',
      description: 'AI tạo ra hình ảnh nghệ thuật về chè Shan Tuyết với hiệu ứng ánh sáng ma thuật, thể hiện sự quý hiếm của loại chè này.',
      image: shanTuyetTeaImage,
      category: 'abstract',
      aiModel: 'Leonardo AI',
      style: 'Magical Realism',
      prompt: 'Ancient Shan Tuyet tea trees glowing with magical light, mystical atmosphere, ethereal beauty, fantasy art style',
      resolution: '1024x1536',
      createdDate: '2024-01-30',
      views: 2890,
      likes: 445,
      downloads: 98,
      artist: 'Mystic AI Creations',
      tags: ['chè shan tuyết', 'ma thuật', 'huyền ảo', 'ánh sáng']
    },
    {
      id: 5,
      title: 'Tà Xùa Metaverse',
      description: 'Tầm nhìn về Tà Xùa trong thế giới ảo metaverse, nơi du khách có thể khám phá vẻ đẹp thiên nhiên qua thực tế ảo.',
      image: heroImage,
      category: 'metaverse',
      aiModel: 'DALL-E 3',
      style: '3D Render',
      prompt: 'Ta Xua landscape in metaverse, virtual reality environment, 3D rendered, floating islands, digital avatars exploring',
      resolution: '1792x1024',
      createdDate: '2024-01-25',
      views: 6780,
      likes: 1234,
      downloads: 345,
      artist: 'VR Vision Studio',
      tags: ['metaverse', 'thực tế ảo', '3D', 'tương lai']
    },
    {
      id: 6,
      title: 'Sinh Thái AI Tà Xùa',
      description: 'Mô phỏng hệ sinh thái Tà Xùa qua AI, thể hiện sự đa dạng sinh học và tương tác giữa các loài trong môi trường tự nhiên.',
      image: terraceFieldsImage,
      category: 'ecosystem',
      aiModel: 'Midjourney V6',
      style: 'Scientific Visualization',
      prompt: 'Ta Xua ecosystem visualization, biodiversity network, interconnected species, scientific art, data visualization style',
      resolution: '1024x1024',
      createdDate: '2024-01-20',
      views: 3450,
      likes: 567,
      downloads: 123,
      artist: 'EcoAI Research',
      tags: ['sinh thái', 'đa dạng sinh học', 'khoa học', 'mạng lưới']
    },
    {
      id: 7,
      title: 'Âm Nhạc Tà Xùa Trực Quan',
      description: 'AI chuyển đổi âm nhạc truyền thống Tà Xùa thành hình ảnh nghệ thuật, tạo ra những pattern độc đáo từ sóng âm thanh.',
      image: hmongCultureImage,
      category: 'music-visual',
      aiModel: 'Custom Neural Network',
      style: 'Audio Visualization',
      prompt: 'Traditional Ta Xua music converted to visual art, sound waves as colorful patterns, synesthesia art style',
      resolution: '1536x1024',
      createdDate: '2024-01-15',
      views: 2340,
      likes: 389,
      downloads: 87,
      artist: 'SoundVision AI',
      tags: ['âm nhạc', 'trực quan hóa', 'sóng âm', 'pattern']
    },
    {
      id: 8,
      title: 'Tà Xùa Trong Giấc Mơ',
      description: 'Tác phẩm surreal thể hiện Tà Xùa như trong giấc mơ, với những yếu tố siêu thực và màu sắc mộng mơ.',
      image: shanTuyetTeaImage,
      category: 'surreal',
      aiModel: 'Stable Diffusion XL',
      style: 'Surrealism',
      prompt: 'Ta Xua in a dream state, surreal landscape, floating elements, dreamlike colors, Salvador Dali inspired',
      resolution: '1024x1024',
      createdDate: '2024-01-10',
      views: 4120,
      likes: 678,
      downloads: 156,
      artist: 'Dream AI Collective',
      tags: ['siêu thực', 'giấc mơ', 'màu sắc', 'bay bổng']
    }
  ];

  const categories = [
    { id: 'all', label: 'Tất cả', count: aiArtCollection.length },
    { id: 'landscape', label: 'Phong cảnh', count: aiArtCollection.filter(art => art.category === 'landscape').length },
    { id: 'culture', label: 'Văn hóa', count: aiArtCollection.filter(art => art.category === 'culture').length },
    { id: 'futuristic', label: 'Tương lai', count: aiArtCollection.filter(art => art.category === 'futuristic').length },
    { id: 'abstract', label: 'Trừu tượng', count: aiArtCollection.filter(art => art.category === 'abstract').length },
    { id: 'metaverse', label: 'Metaverse', count: aiArtCollection.filter(art => art.category === 'metaverse').length },
    { id: 'surreal', label: 'Siêu thực', count: aiArtCollection.filter(art => art.category === 'surreal').length }
  ];

  const aiModels = [
    { id: 'DALL-E 3', icon: Brain, color: 'text-blue-500' },
    { id: 'Midjourney V6', icon: Palette, color: 'text-purple-500' },
    { id: 'Stable Diffusion XL', icon: Cpu, color: 'text-green-500' },
    { id: 'Leonardo AI', icon: Wand2, color: 'text-orange-500' },
    { id: 'Custom Neural Network', icon: Zap, color: 'text-red-500' }
  ];

  const filteredArtworks = aiArtCollection.filter(artwork => {
    const matchesCategory = selectedCategory === 'all' || artwork.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artwork.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artwork.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const selectedArtworkData = selectedArtwork ? aiArtCollection.find(a => a.id === selectedArtwork) : null;

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
      {selectedArtworkData && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <div className="h-96 overflow-hidden rounded-t-2xl">
                <LazyImage
                  src={selectedArtworkData.image}
                  alt={selectedArtworkData.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedArtwork(null)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white"
              >
                ✕
              </Button>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h2 className="font-playfair text-3xl font-bold text-foreground mb-2">
                    {selectedArtworkData.title}
                  </h2>
                  <p className="font-inter text-muted-foreground mb-4 leading-relaxed">
                    {selectedArtworkData.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedArtworkData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{selectedArtworkData.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{selectedArtworkData.likes}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Tải xuống
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-5 h-5 text-blue-600" />
                    <span className="font-inter text-sm font-medium">AI Model</span>
                  </div>
                  <div className="font-inter text-sm text-blue-800">{selectedArtworkData.aiModel}</div>
                </div>
                
                <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Palette className="w-5 h-5 text-purple-600" />
                    <span className="font-inter text-sm font-medium">Phong cách</span>
                  </div>
                  <div className="font-inter text-sm text-purple-800">{selectedArtworkData.style}</div>
                </div>
                
                <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <ImageIcon className="w-5 h-5 text-green-600" />
                    <span className="font-inter text-sm font-medium">Độ phân giải</span>
                  </div>
                  <div className="font-inter text-sm text-green-800">{selectedArtworkData.resolution}</div>
                </div>
                
                <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-orange-600" />
                    <span className="font-inter text-sm font-medium">Nghệ sĩ</span>
                  </div>
                  <div className="font-inter text-sm text-orange-800">{selectedArtworkData.artist}</div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-playfair text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                  <Wand2 className="w-5 h-5" />
                  AI Prompt
                </h4>
                <p className="font-mono text-sm text-muted-foreground bg-white p-3 rounded border">
                  {selectedArtworkData.prompt}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
        <div className="absolute inset-0 opacity-20">
          <LazyImage
            src={heroImage}
            alt="AI Art Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate('/trien-lam')}
            className="mb-6 text-white/80 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại Triển lãm
          </Button>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white">
              Sáng Tạo AI
            </h1>
            <Stars className="w-8 h-8 text-blue-400 animate-pulse" />
          </div>
          
          <p className="font-inter text-xl text-white/90 mb-8">
            Khám phá Tà Xùa qua lăng kính trí tuệ nhân tạo
          </p>
          
          <div className="flex items-center justify-center gap-4 text-white/70">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              <span className="font-inter">{aiArtCollection.length} tác phẩm AI</span>
            </div>
            <div className="w-1 h-1 bg-white/50 rounded-full"></div>
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              <span className="font-inter">
                {aiArtCollection.reduce((total, art) => total + art.views, 0).toLocaleString()} lượt xem
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* AI Models Showcase */}
      <section className="py-8 bg-gradient-to-r from-slate-50 to-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-2xl font-bold text-center text-foreground mb-6">
            Được tạo bởi các AI Model hàng đầu
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {aiModels.map((model) => {
              const IconComponent = model.icon;
              return (
                <div key={model.id} className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
                  <IconComponent className={`w-5 h-5 ${model.color}`} />
                  <span className="font-inter text-sm font-medium">{model.id}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {/* Filters and Search */}
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Tìm kiếm tác phẩm AI..."
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

          {/* AI Art Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredArtworks.map((artwork) => {
              const modelInfo = aiModels.find(m => m.id === artwork.aiModel);
              const ModelIcon = modelInfo?.icon || Brain;
              
              return (
                <Card 
                  key={artwork.id} 
                  className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
                  onClick={() => setSelectedArtwork(artwork.id)}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <LazyImage
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* AI Model Badge */}
                    <div className="absolute top-3 left-3">
                      <div className={`flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full ${modelInfo?.color || 'text-gray-600'}`}>
                        <ModelIcon className="w-3 h-3" />
                        <span className="font-inter text-xs font-medium">{artwork.aiModel}</span>
                      </div>
                    </div>
                    
                    {/* Style Badge */}
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="text-xs">
                        {artwork.style}
                      </Badge>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between text-white text-sm mb-2">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              <span>{artwork.views.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              <span>{artwork.likes}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Download className="w-3 h-3" />
                            <span>{artwork.downloads}</span>
                          </div>
                        </div>
                        <Button size="sm" className="w-full">
                          <Sparkles className="w-3 h-3 mr-2" />
                          Xem chi tiết
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-playfair text-lg font-bold text-foreground mb-2 line-clamp-1">
                      {artwork.title}
                    </h3>
                    <p className="font-inter text-sm text-muted-foreground mb-3 line-clamp-2">
                      {artwork.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <span className="font-inter">{artwork.artist}</span>
                      <span className="font-inter">{artwork.resolution}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {artwork.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {artwork.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{artwork.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Heart className="w-4 h-4" />
                        <span>{artwork.likes}</span>
                      </div>
                      
                      <Badge variant="outline" className="text-xs">
                        {categories.find(cat => cat.id === artwork.category)?.label}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredArtworks.length === 0 && (
            <div className="text-center py-12">
              <Sparkles className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-playfair text-xl font-bold text-foreground mb-2">
                Không tìm thấy tác phẩm nào
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

export default ExhibitionAI;