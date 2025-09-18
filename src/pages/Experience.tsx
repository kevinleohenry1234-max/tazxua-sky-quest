import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Star
} from 'lucide-react';
import { useState } from 'react';

const Experience = () => {
  const [currentAudio, setCurrentAudio] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const photoGallery = [
    {
      id: 1,
      title: 'Biển Mây Bình Minh',
      description: 'Khoảnh khắc bình minh tuyệt đẹp trên đỉnh Tà Xùa',
      image: '/public/Địa điểm lưu trú/1941M Homestay Tà Xùa/PHOTO/Xung quanh/1.webp',
      photographer: 'Nguyễn Văn A',
      views: 1250,
      likes: 89
    },
    {
      id: 2,
      title: 'Sống Lưng Khủng Long',
      description: 'Dãy núi hùng vĩ với hình dáng độc đáo',
      image: '/public/Địa điểm lưu trú/May Home Tà Xùa /Photo/Xung quanh/1.jpg',
      photographer: 'Trần Thị B',
      views: 980,
      likes: 67
    },
    {
      id: 3,
      title: 'Homestay Giữa Mây',
      description: 'Không gian nghỉ dưỡng thơ mộng',
      image: '/public/Địa điểm lưu trú/Tà Xùa Ecolodge /Photo/Xung quanh/1.jpg',
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
      thumbnail: '/public/Địa điểm lưu trú/Xoè Homestay /Photo /1.webp',
      duration: '5:32',
      views: 15420,
      category: 'Cảnh quan'
    },
    {
      id: 2,
      title: 'Văn Hóa H\'Mông Tà Xùa',
      description: 'Tìm hiểu về đời sống và văn hóa của người H\'Mông',
      thumbnail: '/public/Địa điểm lưu trú/1941M Homestay Tà Xùa/PHOTO/Phòng/1.webp',
      duration: '8:15',
      views: 8930,
      category: 'Văn hóa'
    },
    {
      id: 3,
      title: 'Hành Trình Trekking Đỉnh Phu Sang',
      description: 'Chinh phục đỉnh cao nhất Tà Xùa',
      thumbnail: '/public/Địa điểm lưu trú/Tà Xùa Ecolodge /Photo/Phòng/1.jpg',
      duration: '12:45',
      views: 12680,
      category: 'Phiêu lưu'
    }
  ];

  const audioPlaylist = [
    {
      id: 1,
      title: 'Tiếng Sáo H\'Mông',
      artist: 'Nghệ nhân Vàng Seo Sủ',
      duration: '4:23',
      category: 'Nhạc dân tộc',
      description: 'Giai điệu truyền thống của người H\'Mông'
    },
    {
      id: 2,
      title: 'Âm Thanh Núi Rừng',
      artist: 'Tự nhiên Tà Xùa',
      duration: '15:00',
      category: 'Thiên nhiên',
      description: 'Tiếng chim hót, gió thổi qua rừng thông'
    },
    {
      id: 3,
      title: 'Hát Ru H\'Mông',
      artist: 'Bà Vàng Thị May',
      duration: '3:45',
      category: 'Dân ca',
      description: 'Bài hát ru truyền thống của người H\'Mông'
    }
  ];

  const cuisineGallery = [
    {
      id: 1,
      title: 'Thịt Lợn Cắp Nách',
      description: 'Món ăn đặc sản được nướng trên than hồng',
      image: '/public/Địa điểm lưu trú/May Home Tà Xùa /Photo/Phòng/1.jpg',
      ingredients: ['Thịt lợn', 'Gia vị địa phương', 'Lá chuối'],
      cookingTime: '2-3 giờ'
    },
    {
      id: 2,
      title: 'Chè Shan Tuyết Cổ Thụ',
      description: 'Loại chè quý hiếm với hương vị đặc biệt',
      image: '/public/Địa điểm lưu trú/Tà Xùa Ecolodge /Photo/Ngoại thất/1.jpg',
      ingredients: ['Lá chè cổ thụ', 'Nước suối núi'],
      cookingTime: '5-7 phút'
    },
    {
      id: 3,
      title: 'Cơm Lam',
      description: 'Cơm nướng trong ống tre thơm ngon',
      image: '/public/Địa điểm lưu trú/Xoè Homestay /Photo /2.webp',
      ingredients: ['Gạo tẻ', 'Ống tre', 'Lá chuối'],
      cookingTime: '45 phút'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-96 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative text-center text-white z-10">
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-4">
              Triển Lãm Số: Hồn Tà Xùa
            </h1>
            <p className="font-inter text-xl md:text-2xl max-w-4xl mx-auto">
              Khám phá vẻ đẹp Tà Xùa qua nghệ thuật số - Nơi hội tụ của hình ảnh, âm thanh và văn hóa
            </p>
          </div>
        </section>

        {/* Exhibition Tabs */}
        <section className="py-16 container mx-auto px-4">
          <Tabs defaultValue="gallery" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
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
                {photoGallery.map((photo) => (
                  <Card key={photo.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={photo.image}
                        alt={photo.title}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute top-4 right-4 flex gap-2">
                        <Button size="sm" variant="secondary" className="bg-white/80">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="secondary" className="bg-white/80">
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
                {videoCollection.map((video) => (
                  <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Button size="lg" className="rounded-full bg-white/20 hover:bg-white/30">
                          <Play className="w-8 h-8 text-white" />
                        </Button>
                      </div>
                      <Badge className="absolute top-4 left-4">{video.category}</Badge>
                      <div className="absolute bottom-4 right-4 bg-black/60 text-white px-2 py-1 rounded text-sm">
                        {video.duration}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{video.description}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Eye className="w-4 h-4" />
                        <span>{video.views.toLocaleString()} lượt xem</span>
                      </div>
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
              <div className="max-w-2xl mx-auto space-y-4">
                {audioPlaylist.map((track) => (
                  <Card key={track.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Button
                          size="sm"
                          variant={currentAudio === track.id && isPlaying ? "default" : "outline"}
                          className="rounded-full"
                          onClick={() => {
                            if (currentAudio === track.id) {
                              setIsPlaying(!isPlaying);
                            } else {
                              setCurrentAudio(track.id);
                              setIsPlaying(true);
                            }
                          }}
                        >
                          {currentAudio === track.id && isPlaying ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </Button>
                        <div>
                          <h3 className="font-semibold">{track.title}</h3>
                          <p className="text-sm text-muted-foreground">{track.artist}</p>
                          <p className="text-xs text-muted-foreground">{track.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="mb-2">{track.category}</Badge>
                        <div className="text-sm text-muted-foreground">{track.duration}</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Cuisine Space */}
            <TabsContent value="cuisine" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="font-playfair text-3xl font-bold mb-4">Không Gian Ẩm Thực</h2>
                <p className="text-muted-foreground">Khám phá hương vị đặc sản và quy trình chế biến món ăn truyền thống</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cuisineGallery.map((dish) => (
                  <Card key={dish.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={dish.image}
                        alt={dish.title}
                        className="w-full h-48 object-cover"
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

      <Footer />
    </div>
  );
};

export default Experience;