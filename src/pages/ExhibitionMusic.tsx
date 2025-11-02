import { useState, useRef, useEffect } from 'react';
import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import LoginModal, { LoginData } from '@/components/LoginModal';
import RegisterModal from '@/components/RegisterModal';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Music, 
  Search, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward,
  Volume2,
  VolumeX,
  Heart,
  Download,
  ArrowLeft,
  Clock,
  User,
  Headphones
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LazyImage from '@/components/LazyImage';

// Import sample images
import heroImage from '@/assets/hero-taxua-clouds.jpg';
import hmongCultureImage from '@/assets/hmong-culture.jpg';
import terraceFieldsImage from '@/assets/dragon-spine.jpg';
import shanTuyetTeaImage from '@/assets/shan-tuyet-tea.jpg';

const ExhibitionMusic = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
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

  const musicCollection = [
    {
      id: 1,
      title: 'Tiếng Khèn Núi Cao',
      artist: 'Nghệ nhân Vàng Seo Sủ',
      album: 'Âm Nhạc Truyền Thống H\'Mông',
      duration: '4:32',
      category: 'traditional',
      image: hmongCultureImage,
      audioUrl: '#', // Placeholder for audio file
      description: 'Tiếng khèn vang vọng trên những đỉnh núi cao, mang theo hồn cốt của dân tộc H\'Mông.',
      instrument: 'Khèn',
      region: 'Tà Xùa, Sơn La',
      year: '2023',
      likes: 1250,
      downloads: 890
    },
    {
      id: 2,
      title: 'Ru Con Trên Núi',
      artist: 'Bà Vàng Thị Mây',
      album: 'Dân Ca Núi Rừng',
      duration: '3:45',
      category: 'folk',
      image: terraceFieldsImage,
      audioUrl: '#',
      description: 'Bài ru êm dịu của người mẹ H\'Mông, hát ru con trong những đêm trăng sáng.',
      instrument: 'Giọng hát',
      region: 'Bản Ít, Tà Xùa',
      year: '2023',
      likes: 980,
      downloads: 654
    },
    {
      id: 3,
      title: 'Điệu Múa Mùa Gặt',
      artist: 'Đoàn Nghệ Thuật Tà Xùa',
      album: 'Lễ Hội Mùa Màng',
      duration: '5:18',
      category: 'ceremonial',
      image: shanTuyetTeaImage,
      audioUrl: '#',
      description: 'Giai điệu sôi động trong lễ hội mùa gặt, thể hiện niềm vui của người dân sau mùa màng bội thu.',
      instrument: 'Khèn, Trống',
      region: 'Tà Xùa, Sơn La',
      year: '2023',
      likes: 1450,
      downloads: 1120
    },
    {
      id: 4,
      title: 'Tiếng Sáo Tre Buổi Chiều',
      artist: 'Lò Văn Minh',
      album: 'Âm Thanh Thiên Nhiên',
      duration: '6:12',
      category: 'nature',
      image: heroImage,
      audioUrl: '#',
      description: 'Tiếng sáo tre du dương vang lên trong buổi chiều tà, hòa quyện với tiếng chim núi rừng.',
      instrument: 'Sáo tre',
      region: 'Đỉnh Phu Sang',
      year: '2023',
      likes: 876,
      downloads: 543
    },
    {
      id: 5,
      title: 'Hát Giao Duyên',
      artist: 'Nhóm Thanh Niên Bản Ít',
      album: 'Tình Ca Núi Rừng',
      duration: '4:56',
      category: 'love',
      image: hmongCultureImage,
      audioUrl: '#',
      description: 'Những câu hát giao duyên ngọt ngào của các cặp đôi trẻ trong các lễ hội truyền thống.',
      instrument: 'Đàn môi, Giọng hát',
      region: 'Bản Ít, Tà Xùa',
      year: '2023',
      likes: 1680,
      downloads: 1340
    },
    {
      id: 6,
      title: 'Tiếng Cồng Chiêng Mừng Xuân',
      artist: 'Đội Cồng Chiêng Tà Xùa',
      album: 'Tết Cổ Truyền',
      duration: '7:23',
      category: 'ceremonial',
      image: terraceFieldsImage,
      audioUrl: '#',
      description: 'Âm thanh hùng tráng của cồng chiêng trong dịp Tết Nguyên Đán của đồng bào H\'Mông.',
      instrument: 'Cồng chiêng',
      region: 'Tà Xùa, Sơn La',
      year: '2023',
      likes: 2100,
      downloads: 1890
    }
  ];

  const categories = [
    { id: 'all', label: 'Tất cả', count: musicCollection.length },
    { id: 'traditional', label: 'Truyền thống', count: musicCollection.filter(track => track.category === 'traditional').length },
    { id: 'folk', label: 'Dân ca', count: musicCollection.filter(track => track.category === 'folk').length },
    { id: 'ceremonial', label: 'Lễ hội', count: musicCollection.filter(track => track.category === 'ceremonial').length },
    { id: 'nature', label: 'Thiên nhiên', count: musicCollection.filter(track => track.category === 'nature').length },
    { id: 'love', label: 'Tình ca', count: musicCollection.filter(track => track.category === 'love').length }
  ];

  const filteredTracks = musicCollection.filter(track => {
    const matchesCategory = selectedCategory === 'all' || track.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.album.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const currentTrackData = currentTrack ? musicCollection.find(t => t.id === currentTrack) : null;

  const handlePlayPause = (trackId: number) => {
    if (currentTrack === trackId) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      setCurrentTrack(trackId);
      setIsPlaying(true);
      // In a real app, you would load and play the audio file here
    }
  };

  const handlePrevious = () => {
    if (currentTrack) {
      const currentIndex = musicCollection.findIndex(t => t.id === currentTrack);
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : musicCollection.length - 1;
      setCurrentTrack(musicCollection[prevIndex].id);
    }
  };

  const handleNext = () => {
    if (currentTrack) {
      const currentIndex = musicCollection.findIndex(t => t.id === currentTrack);
      const nextIndex = currentIndex < musicCollection.length - 1 ? currentIndex + 1 : 0;
      setCurrentTrack(musicCollection[nextIndex].id);
    }
  };

  const handleVolumeToggle = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime);
      const updateDuration = () => setDuration(audio.duration);
      
      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('loadedmetadata', updateDuration);
      
      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('loadedmetadata', updateDuration);
      };
    }
  }, [currentTrack]);

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

      {/* Audio Element */}
      <audio ref={audioRef} />

      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 to-indigo-800">
        <div className="absolute inset-0 opacity-30">
          <LazyImage
            src={hmongCultureImage}
            alt="Music Background"
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
            Âm Nhạc Tà Xùa
          </h1>
          <p className="font-inter text-xl text-white/90 mb-8">
            Khám phá kho tàng âm nhạc truyền thống của vùng núi cao
          </p>
          
          <div className="flex items-center justify-center gap-4 text-white/70">
            <div className="flex items-center gap-2">
              <Music className="w-5 h-5" />
              <span className="font-inter">{musicCollection.length} bài hát</span>
            </div>
            <div className="w-1 h-1 bg-white/50 rounded-full"></div>
            <div className="flex items-center gap-2">
              <Headphones className="w-5 h-5" />
              <span className="font-inter">
                {musicCollection.reduce((total, track) => total + track.likes, 0).toLocaleString()} lượt nghe
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Music Player */}
      {currentTrackData && (
        <div className="sticky top-0 z-40 bg-white border-b shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <LazyImage
                  src={currentTrackData.image}
                  alt={currentTrackData.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-playfair text-lg font-bold text-foreground truncate">
                  {currentTrackData.title}
                </h3>
                <p className="font-inter text-sm text-muted-foreground truncate">
                  {currentTrackData.artist}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" onClick={handlePrevious}>
                  <SkipBack className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => handlePlayPause(currentTrackData.id)}
                  className="w-10 h-10 rounded-full"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button size="sm" variant="ghost" onClick={handleNext}>
                  <SkipForward className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="hidden md:flex items-center gap-2 min-w-0 flex-1 max-w-xs">
                <span className="text-xs text-muted-foreground">
                  {formatTime(currentTime)}
                </span>
                <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                  ></div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {currentTrackData.duration}
                </span>
              </div>
              
              <Button size="sm" variant="ghost" onClick={handleVolumeToggle}>
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {/* Filters and Search */}
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Tìm kiếm bài hát, nghệ sĩ..."
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

          {/* Music List */}
          <div className="space-y-4">
            {filteredTracks.map((track, index) => (
              <Card 
                key={track.id} 
                className={`group hover:shadow-lg transition-all duration-300 ${
                  currentTrack === track.id ? 'ring-2 ring-primary bg-primary/5' : ''
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <LazyImage
                          src={track.image}
                          alt={track.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button
                            size="sm"
                            onClick={() => handlePlayPause(track.id)}
                            className="w-8 h-8 rounded-full p-0"
                          >
                            {currentTrack === track.id && isPlaying ? 
                              <Pause className="w-3 h-3" /> : 
                              <Play className="w-3 h-3" />
                            }
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-playfair text-lg font-bold text-foreground mb-1 truncate">
                          {track.title}
                        </h3>
                        <p className="font-inter text-sm text-muted-foreground mb-2 truncate">
                          {track.artist} • {track.album}
                        </p>
                        <p className="font-inter text-xs text-muted-foreground line-clamp-2">
                          {track.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="hidden md:block text-center">
                      <div className="text-sm font-inter text-muted-foreground mb-1">
                        {track.instrument}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {track.region}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span className="font-inter">{track.duration}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Heart className="w-4 h-4" />
                        <span>{track.likes}</span>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTracks.length === 0 && (
            <div className="text-center py-12">
              <Music className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-playfair text-xl font-bold text-foreground mb-2">
                Không tìm thấy bài hát nào
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

export default ExhibitionMusic;