import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Cloud, 
  Mountain, 
  Utensils, 
  Camera, 
  Users, 
  Coffee,
  Tent,
  Bike,
  Heart,
  Star,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Share2,
  Filter,
  Search
} from 'lucide-react';
import { useState } from 'react';

const Experience = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const experienceCategories = [
    {
      id: 'cloud-hunting',
      title: 'Săn Mây',
      icon: Cloud,
      description: 'Trải nghiệm săn mây tuyệt vời tại Tà Xùa',
      color: 'from-blue-400 to-cyan-500',
      activities: [
        {
          id: 1,
          name: 'Săn Mây Bình Minh',
          description: 'Thức dậy từ 4:30 AM để chứng kiến cảnh tượng biển mây tuyệt đẹp lúc bình minh',
          duration: '3-4 giờ',
          difficulty: 'Trung bình',
          price: '200,000đ',
          rating: 4.8,
          image: 'bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600',
          highlights: ['Bình minh trên mây', 'Nhiếp ảnh', 'Hướng dẫn viên chuyên nghiệp']
        },
        {
          id: 2,
          name: 'Săn Mây Hoàng Hôn',
          description: 'Ngắm nhìn biển mây thay đổi màu sắc khi mặt trời lặn',
          duration: '2-3 giờ',
          difficulty: 'Dễ',
          price: '150,000đ',
          rating: 4.6,
          image: 'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500',
          highlights: ['Hoàng hôn tuyệt đẹp', 'Thư giãn', 'Chụp ảnh']
        }
      ]
    },
    {
      id: 'trekking',
      title: 'Trekking',
      icon: Mountain,
      description: 'Chinh phục những đỉnh núi hùng vĩ',
      color: 'from-green-400 to-emerald-500',
      activities: [
        {
          id: 3,
          name: 'Trekking Sống Lưng Khủng Long',
          description: 'Chinh phục con đường trekking nổi tiếng nhất Tà Xùa',
          duration: '6-8 giờ',
          difficulty: 'Khó',
          price: '350,000đ',
          rating: 4.9,
          image: 'bg-gradient-to-r from-green-400 via-blue-500 to-indigo-600',
          highlights: ['Đỉnh cao nhất', 'Thử thách bản thân', 'Cảnh quan tuyệt vời']
        },
        {
          id: 4,
          name: 'Trekking Đỉnh Phu Sang',
          description: 'Khám phá đỉnh núi thứ hai cao nhất khu vực',
          duration: '4-5 giờ',
          difficulty: 'Trung bình',
          price: '250,000đ',
          rating: 4.7,
          image: 'bg-gradient-to-r from-teal-400 via-green-500 to-blue-600',
          highlights: ['Cảnh quan đa dạng', 'Phù hợp mọi lứa tuổi', 'An toàn']
        }
      ]
    },
    {
      id: 'cuisine',
      title: 'Ẩm Thực',
      icon: Utensils,
      description: 'Khám phá hương vị đặc trưng của vùng núi',
      color: 'from-orange-400 to-red-500',
      activities: [
        {
          id: 5,
          name: 'Tour Ẩm Thực Bản Địa',
          description: 'Thưởng thức các món ăn truyền thống của người H\'Mông',
          duration: '3-4 giờ',
          difficulty: 'Dễ',
          price: '180,000đ',
          rating: 4.5,
          image: 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600',
          highlights: ['Món ăn truyền thống', 'Văn hóa ẩm thực', 'Trải nghiệm nấu ăn']
        },
        {
          id: 6,
          name: 'Thưởng Thức Trà Shan Tuyết',
          description: 'Tìm hiểu và thưởng thức trà Shan Tuyết cổ thụ',
          duration: '2 giờ',
          difficulty: 'Dễ',
          price: '120,000đ',
          rating: 4.8,
          image: 'bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-600',
          highlights: ['Trà cổ thụ', 'Quy trình pha trà', 'Thư giãn']
        }
      ]
    },
    {
      id: 'culture',
      title: 'Văn Hóa',
      icon: Users,
      description: 'Trải nghiệm văn hóa bản địa độc đáo',
      color: 'from-purple-400 to-pink-500',
      activities: [
        {
          id: 7,
          name: 'Đêm Văn Hóa Bản Làng',
          description: 'Tham gia các hoạt động văn hóa truyền thống của người H\'Mông',
          duration: '3-4 giờ',
          difficulty: 'Dễ',
          price: '200,000đ',
          rating: 4.7,
          image: 'bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-600',
          highlights: ['Múa dân gian', 'Âm nhạc truyền thống', 'Trang phục dân tộc']
        },
        {
          id: 8,
          name: 'Làng Nghề Thủ Công',
          description: 'Tìm hiểu và thực hành các nghề thủ công truyền thống',
          duration: '2-3 giờ',
          difficulty: 'Dễ',
          price: '150,000đ',
          rating: 4.4,
          image: 'bg-gradient-to-r from-rose-400 via-pink-500 to-purple-600',
          highlights: ['Thủ công mỹ nghệ', 'Học hỏi kỹ năng', 'Quà lưu niệm']
        }
      ]
    },
    {
      id: 'camping',
      title: 'Cắm Trại',
      icon: Tent,
      description: 'Trải nghiệm cắm trại giữa thiên nhiên',
      color: 'from-teal-400 to-blue-500',
      activities: [
        {
          id: 9,
          name: 'Cắm Trại Qua Đêm',
          description: 'Trải nghiệm cắm trại một đêm trên núi với view tuyệt đẹp',
          duration: '1 đêm 2 ngày',
          difficulty: 'Trung bình',
          price: '400,000đ',
          rating: 4.6,
          image: 'bg-gradient-to-r from-slate-400 via-gray-500 to-zinc-600',
          highlights: ['Đêm trên núi', 'Lửa trại', 'Ngắm sao']
        }
      ]
    }
  ];

  const socialMediaPosts = [
    {
      id: 1,
      platform: 'instagram',
      username: '@traveler_vn',
      content: 'Biển mây Tà Xùa thật sự là thiên đường! 🌤️ #TaXua #CloudHunting',
      image: 'bg-gradient-to-r from-blue-400 to-cyan-500',
      likes: 1234,
      comments: 89,
      time: '2 giờ trước'
    },
    {
      id: 2,
      platform: 'facebook',
      username: 'Nguyễn Minh Anh',
      content: 'Trà Shan Tuyết ở đây ngon tuyệt vời! Ai đến Tà Xùa nhất định phải thử 🍵',
      image: 'bg-gradient-to-r from-emerald-400 to-teal-500',
      likes: 567,
      comments: 34,
      time: '5 giờ trước'
    },
    {
      id: 3,
      platform: 'instagram',
      username: '@mountain_lover',
      content: 'Sống Lưng Khủng Long - thử thách nhưng xứng đáng! 🏔️ #Trekking #Adventure',
      image: 'bg-gradient-to-r from-green-400 to-blue-500',
      likes: 2341,
      comments: 156,
      time: '1 ngày trước'
    },
    {
      id: 4,
      platform: 'facebook',
      username: 'Lê Thị Hoa',
      content: 'Đêm văn hóa bản làng thật ý nghĩa. Được học về văn hóa H\'Mông rất thú vị! 🎭',
      image: 'bg-gradient-to-r from-purple-400 to-pink-500',
      likes: 890,
      comments: 67,
      time: '2 ngày trước'
    },
    {
      id: 5,
      platform: 'instagram',
      username: '@foodie_explorer',
      content: 'Ẩm thực bản địa ở Tà Xùa quá đặc biệt! Thịt nướng và rau rừng tuyệt vời 🍖🥬',
      image: 'bg-gradient-to-r from-orange-400 to-red-500',
      likes: 1567,
      comments: 98,
      time: '3 ngày trước'
    },
    {
      id: 6,
      platform: 'facebook',
      username: 'Trần Văn Nam',
      content: 'Cắm trại qua đêm trên núi, ngắm sao đêm thật lãng mạn! ⭐',
      image: 'bg-gradient-to-r from-slate-400 to-gray-500',
      likes: 445,
      comments: 23,
      time: '4 ngày trước'
    }
  ];

  const getAllActivities = () => {
    return experienceCategories.flatMap(category => 
      category.activities.map(activity => ({
        ...activity,
        category: category.id,
        categoryTitle: category.title
      }))
    );
  };

  const filteredActivities = getAllActivities().filter(activity => {
    const matchesCategory = selectedCategory === 'all' || activity.category === selectedCategory;
    const matchesSearch = activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Dễ': return 'bg-green-100 text-green-800';
      case 'Trung bình': return 'bg-yellow-100 text-yellow-800';
      case 'Khó': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-96 bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative text-center text-white z-10">
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-4">
              Trải Nghiệm Tà Xùa
            </h1>
            <p className="font-inter text-xl md:text-2xl max-w-3xl mx-auto">
              Khám phá những hoạt động độc đáo và trải nghiệm khó quên giữa lòng núi rừng Tà Xùa
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 container mx-auto px-4">
          <Tabs defaultValue="activities" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="activities" className="flex items-center gap-2">
                <Mountain className="w-4 h-4" />
                Hoạt Động
              </TabsTrigger>
              <TabsTrigger value="social" className="flex items-center gap-2">
                <Camera className="w-4 h-4" />
                Chia Sẻ Từ Du Khách
              </TabsTrigger>
            </TabsList>

            {/* Activities Tab */}
            <TabsContent value="activities" className="space-y-8">
              {/* Category Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('all')}
                  className="h-auto p-4 flex flex-col items-center gap-2"
                >
                  <Filter className="w-6 h-6" />
                  <span className="text-sm">Tất Cả</span>
                </Button>
                {experienceCategories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? 'default' : 'outline'}
                      onClick={() => setSelectedCategory(category.id)}
                      className="h-auto p-4 flex flex-col items-center gap-2"
                    >
                      <IconComponent className="w-6 h-6" />
                      <span className="text-sm">{category.title}</span>
                    </Button>
                  );
                })}
              </div>

              {/* Search */}
              <div className="max-w-md mx-auto mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Tìm kiếm hoạt động..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Activities Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredActivities.map((activity) => (
                  <Card key={activity.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className={`h-48 ${activity.image} flex items-center justify-center`}>
                      <div className="text-white text-center">
                        <h3 className="font-playfair text-xl font-bold mb-2">{activity.name}</h3>
                        <Badge variant="secondary" className="bg-white/20 text-white">
                          {activity.categoryTitle}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-inter text-sm font-semibold">{activity.rating}</span>
                        </div>
                        <Badge className={getDifficultyColor(activity.difficulty)}>
                          {activity.difficulty}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="font-inter text-muted-foreground text-sm">
                        {activity.description}
                      </p>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {activity.duration}
                        </div>
                        <div className="font-inter font-bold text-primary">
                          {activity.price}
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="space-y-2">
                        <h4 className="font-inter font-semibold text-foreground text-sm">Điểm nổi bật:</h4>
                        <div className="flex flex-wrap gap-1">
                          {activity.highlights.map((highlight, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                        Đặt Ngay
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Social Media Tab */}
            <TabsContent value="social" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="font-playfair text-3xl font-bold text-foreground mb-4">
                  Chia Sẻ Từ Du Khách
                </h2>
                <p className="font-inter text-muted-foreground max-w-2xl mx-auto">
                  Khám phá những trải nghiệm thực tế từ các du khách đã đến Tà Xùa qua các bài đăng trên mạng xã hội
                </p>
              </div>

              {/* Social Media Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {socialMediaPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className={`h-48 ${post.image} flex items-center justify-center relative`}>
                      <div className="absolute top-4 left-4">
                        {post.platform === 'instagram' ? (
                          <Instagram className="w-6 h-6 text-white" />
                        ) : (
                          <Facebook className="w-6 h-6 text-white" />
                        )}
                      </div>
                    </div>
                    
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-inter font-semibold text-foreground">
                          {post.username}
                        </span>
                        <span className="font-inter text-xs text-muted-foreground">
                          {post.time}
                        </span>
                      </div>

                      <p className="font-inter text-sm text-foreground">
                        {post.content}
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {post.likes}
                          </div>
                          <div className="flex items-center gap-1">
                            <span>💬</span>
                            {post.comments}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Call to Action */}
              <div className="text-center mt-12">
                <Card className="max-w-2xl mx-auto">
                  <CardContent className="p-8">
                    <Camera className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-playfair text-2xl font-bold text-foreground mb-4">
                      Chia Sẻ Trải Nghiệm Của Bạn
                    </h3>
                    <p className="font-inter text-muted-foreground mb-6">
                      Hãy chia sẻ những khoảnh khắc đẹp của bạn tại Tà Xùa với hashtag #TaXuaSkyQuest
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        <Instagram className="w-4 h-4 mr-2" />
                        Đăng lên Instagram
                      </Button>
                      <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
                        <Facebook className="w-4 h-4 mr-2" />
                        Chia sẻ Facebook
                      </Button>
                    </div>
                  </CardContent>
                </Card>
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