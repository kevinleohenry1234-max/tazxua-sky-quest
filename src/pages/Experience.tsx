import Header from '@/components/Header';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Lightbox from '@/components/Lightbox';
import LazyImage from '@/components/LazyImage';
import MusicPlayer from '@/components/MusicPlayer';
import AIMusicGenerator from '@/components/AIMusicGenerator';
import { 
  Camera, 
  Video, 
  Music, 
  Utensils,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Download,
  Share2,
  Heart,
  Eye,
  Clock,
  MapPin,
  Star,
  Sparkles
} from 'lucide-react';
import { useState } from 'react';

const Experience = () => {
  const [currentAudio, setCurrentAudio] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [currentGallery, setCurrentGallery] = useState<'photo' | 'video' | 'cuisine'>('photo');

  const photoGallery = [
    {
      id: 1,
      title: 'Biển Mây Bình Minh',
      description: 'Khoảnh khắc bình minh tuyệt đẹp trên đỉnh Tà Xùa',
      image: '/images/taxua-sunrise.svg',
      photographer: 'Nguyễn Văn A',
      views: 1250,
      likes: 89
    },
    {
      id: 2,
      title: 'Sống Lưng Khủng Long',
      description: 'Dãy núi hùng vĩ với hình dáng độc đáo',
      image: '/images/taxua-dragon-spine.svg',
      photographer: 'Trần Thị B',
      views: 980,
      likes: 67
    },
    {
      id: 3,
      title: 'Homestay Giữa Mây',
      description: 'Không gian nghỉ dưỡng thơ mộng',
      image: '/images/taxua-homestay.svg',
      photographer: 'Lê Văn C',
      views: 756,
      likes: 45
    }
  ];

  const videoCollection = [
    {
      id: 1,
      title: 'Tà Xùa - Thiên Đường Săn Mây',
      description: 'Khám phá vẻ đẹp huyền ảo của Tà Xùa qua góc nhìn điện ảnh',
      thumbnail: '/Địa điểm lưu trú/Xoè Homestay /Photo /1.webp',
      duration: '5:32',
      category: 'Cảnh quan',
      embedUrl: 'https://www.youtube.com/embed/elHm4l5T80M?si=p3IYgGTiWRs49wdI'
    },
    {
      id: 2,
      title: 'Văn Hóa H\'Mông Tà Xùa',
      description: 'Tìm hiểu về đời sống và văn hóa của người H\'Mông',
      thumbnail: '/Địa điểm lưu trú/1941M Homestay Tà Xùa/PHOTO/Phòng/1.webp',
      duration: '8:15',
      category: 'Văn hóa',
      embedUrl: 'https://www.youtube.com/embed/ylDs4FdT2hk?si=hKquPG2D2rRAUXUi'
    },
    {
      id: 3,
      title: 'Hành Trình Trekking Đỉnh Phu Sang',
      description: 'Chinh phục đỉnh cao nhất Tà Xùa',
      thumbnail: '/Địa điểm lưu trú/Tà Xùa Ecolodge /Photo/Phòng/1.jpg',
      duration: '12:45',
      category: 'Phiêu lưu',
      embedUrl: 'https://www.youtube.com/embed/Ru5fFw2ZU6I?si=0Oqn6w7lKXXuLNNl'
    }
  ];

  const audioPlaylist = [
    {
      id: 1,
      title: 'Tiếng Sáo H\'Mông',
      artist: 'Nghệ nhân Vàng Seo Sủ',
      duration: '4:23',
      category: 'Nhạc dân tộc',
      description: 'Giai điệu truyền thống của người H\'Mông vang vọng giữa núi rừng Tà Xùa, mang đến cảm giác bình yên và gần gũi với thiên nhiên.',
      backgroundImage: '/Địa điểm lưu trú/1941M Homestay Tà Xùa/PHOTO/Xung quanh/1.webp',
      audioUrl: '/music/Ng%C6%B0%E1%BB%9Di%20M%C3%B4ng%20C%E1%BB%95%20(%20%E8%92%99%E5%8F%A4%E4%BA%BA%20)%20-%20Ti%E1%BA%BFng%20S%C3%A1o%20Ng%C6%B0%E1%BB%9Di%20H\'m%C3%B4ng%20-%20Trung%20s%C3%A1o%20-%20beat%20c%E1%BA%A3m%20%C3%A2m%20-%20S%C3%A1o%20Tr%C3%BAc%20T%C3%A2y%20B%E1%BA%AFc.mp3'
    },
    {
      id: 3,
      title: 'Hát Ru H\'Mông',
      artist: 'Bà Vàng Thị May',
      duration: '3:45',
      category: 'Dân ca',
      description: 'Bài hát ru truyền thống được truyền từ đời này sang đời khác, chứa đựng tình yêu thương và sự bảo vệ của người mẹ.',
      backgroundImage: '/Địa điểm lưu trú/Tà Xùa Ecolodge /Photo/Xung quanh/1.jpg',
      audioUrl: '/music/Tiếng hát ru con - Thu Phương (ĐTNVN).mp3'
    }
  ];

  const cuisineGallery = [
    {
      id: 1,
      title: 'Thịt Lợn Cắp Nách',
      description: 'Món ăn đặc sản được nướng trên than hồng',
      image: '/images/thit-lon-cap-nach.svg',
      ingredients: ['Thịt lợn', 'Gia vị địa phương', 'Lá chuối'],
      cookingTime: '2-3 giờ'
    },
    {
      id: 2,
      title: 'Chè Shan Tuyết Cổ Thụ',
      description: 'Loại chè quý hiếm với hương vị đặc biệt',
      image: '/images/che-shan-tuyet.svg',
      ingredients: ['Lá chè cổ thụ', 'Nước suối núi'],
      cookingTime: '5-7 phút'
    },
    {
      id: 3,
      title: 'Cơm Lam',
      description: 'Cơm nướng trong ống tre thơm ngon',
      image: '/images/com-lam.svg',
      ingredients: ['Gạo tẻ', 'Ống tre', 'Lá chuối'],
      cookingTime: '45 phút'
    }
  ];

  const openLightbox = (gallery: 'photo' | 'video' | 'cuisine', index: number) => {
    setCurrentGallery(gallery);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const getCurrentGalleryData = () => {
    switch (currentGallery) {
      case 'photo':
        return photoGallery;
      case 'video':
        return videoCollection;
      case 'cuisine':
        return cuisineGallery;
      default:
        return photoGallery;
    }
  };

  return (
    <Layout>
      <MainNavigation />
      <Header />
      
      <main className="pt-30">
        {/* Hero Section */}
        <section className="relative h-96 bg-gradient-to-b from-black/30 to-black/60 flex items-center justify-center">
          <div className="relative text-center text-white z-10">
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-4 drop-shadow-2xl">
              Trải Nghiệm Tà Xùa
            </h1>
            <p className="font-inter text-xl md:text-2xl max-w-3xl mx-auto drop-shadow-lg">
              Khám phá những trải nghiệm độc đáo qua ảnh, video và âm thanh
            </p>
          </div>
        </section>

        {/* Exhibition Tabs */}
        <section className="py-16 container mx-auto px-4">
          <Tabs defaultValue="gallery" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="gallery" className="flex items-center gap-2">
                <Camera className="w-4 h-4" />
                Thư Viện Ảnh
              </TabsTrigger>
              <TabsTrigger value="cinema" className="flex items-center gap-2">
                <Video className="w-4 h-4" />
                Phòng Chiếu Phim
              </TabsTrigger>
              <TabsTrigger value="music" className="flex items-center gap-2">
                <Music className="w-4 h-4" />
                Góc Âm Nhạc
              </TabsTrigger>
              <TabsTrigger value="ai-music" className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Tạo Nhạc AI
              </TabsTrigger>
              <TabsTrigger value="cuisine" className="flex items-center gap-2">
                <Utensils className="w-4 h-4" />
                Không Gian Ẩm Thực
              </TabsTrigger>
            </TabsList>

            {/* Photo Gallery */}
            <TabsContent value="gallery" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="font-playfair text-3xl font-bold mb-4">Thư Viện Ảnh Nghệ Thuật</h2>
                <p className="text-muted-foreground">Những bức ảnh đẹp nhất về Tà Xùa được chụp bởi các nhiếp ảnh gia tài năng</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {photoGallery.map((photo, index) => (
                  <Card key={photo.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer card-hover">
                    <div className="relative group">
                      <LazyImage
                        src={photo.image}
                        alt={photo.title}
                        className="w-full h-64 transition-transform duration-700 group-hover:scale-105"
                        onClick={() => openLightbox('photo', index)}
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                        <div className="text-white text-center">
                          <Camera className="w-8 h-8 mx-auto mb-2 pulse-on-hover" />
                          <p className="text-sm font-medium">Xem chi tiết</p>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 flex gap-2">
                        <Button size="sm" variant="secondary" className="bg-white/80 hover:bg-white/90 btn-primary focus-ring">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="secondary" className="bg-white/80 hover:bg-white/90 btn-primary focus-ring">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{photo.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{photo.description}</p>
                      <div className="flex justify-between items-center text-sm text-muted-foreground">
                        <span>Bởi {photo.photographer}</span>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {photo.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {photo.likes}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Video Cinema */}
            <TabsContent value="cinema" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="font-playfair text-3xl font-bold mb-4">Phòng Chiếu Phim</h2>
                <p className="text-muted-foreground">Thưởng thức những thước phim cinematic về cảnh quan và con người Tà Xùa</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videoCollection.map((video, index) => (
                  <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="relative">
                      {video.embedUrl ? (
                        <iframe
                          width="100%"
                          height="192"
                          src={video.embedUrl}
                          title={video.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                          className="w-full h-48"
                        />
                      ) : (
                        <>
                          <LazyImage
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-48"
                            onClick={() => openLightbox('video', index)}
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Button size="lg" className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                              <Play className="w-8 h-8 text-white" />
                            </Button>
                          </div>
                        </>
                      )}
                      <Badge className="absolute top-4 left-4 bg-black/60 text-white">{video.category}</Badge>
                      <div className="absolute bottom-4 right-4 bg-black/60 text-white px-2 py-1 rounded text-sm">
                        {video.duration}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{video.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Music Corner */}
            <TabsContent value="music" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="font-playfair text-3xl font-bold mb-4">Góc Âm Nhạc</h2>
                <p className="text-muted-foreground">Lắng nghe âm thanh đặc trưng của núi rừng và nhạc dân tộc H'Mông</p>
              </div>
              <MusicPlayer 
                tracks={audioPlaylist}
                currentTrackId={currentAudio}
                onTrackChange={setCurrentAudio}
                isPlaying={isPlaying}
                onPlayPause={() => setIsPlaying(!isPlaying)}
              />
            </TabsContent>

            {/* AI Music Generator */}
            <TabsContent value="ai-music" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="font-playfair text-3xl font-bold mb-4">Tạo Nhạc Cùng Nhạc Cụ Dân Tộc Bằng AI</h2>
                <p className="text-muted-foreground">Sử dụng trí tuệ nhân tạo để sáng tác nhạc với âm thanh nhạc cụ dân tộc H'Mông</p>
              </div>
              <AIMusicGenerator />
            </TabsContent>

            {/* Cuisine Space */}
            <TabsContent value="cuisine" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="font-playfair text-3xl font-bold mb-4">Không Gian Ẩm Thực</h2>
                <p className="text-muted-foreground">Khám phá hương vị đặc sản và quy trình chế biến món ăn truyền thống</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cuisineGallery.map((dish, index) => (
                  <Card key={dish.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                    <div className="relative">
                      <LazyImage
                        src={dish.image}
                        alt={dish.title}
                        className="w-full h-48"
                        onClick={() => openLightbox('cuisine', index)}
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{dish.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{dish.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>Thời gian: {dish.cookingTime}</span>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Nguyên liệu: </span>
                          <span className="text-muted-foreground">{dish.ingredients.join(', ')}</span>
                        </div>
                      </div>
                      <Button className="w-full mt-4" variant="outline">
                        Xem Công Thức
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>

      {/* Lightbox Component */}
      {lightboxOpen && (
        <Lightbox
          images={getCurrentGalleryData()}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onNext={() => {
            const data = getCurrentGalleryData();
            setLightboxIndex((prev) => (prev + 1) % data.length);
          }}
          onPrev={() => {
            const data = getCurrentGalleryData();
            setLightboxIndex((prev) => (prev - 1 + data.length) % data.length);
          }}
        />
      )}

      <Footer />
    </Layout>
  );
};

export default Experience;