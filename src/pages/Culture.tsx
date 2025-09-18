import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Users, 
  Music, 
  Palette, 
  Home,
  Coffee,
  Shirt,
  Camera,
  Calendar,
  Clock,
  Eye,
  Heart,
  Share2,
  Search,
  Filter,
  Play,
  Download,
  Star
} from 'lucide-react';
import { useState } from 'react';

const Culture = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const culturalArticles = [
    {
      id: 1,
      title: 'Lịch Sử Hình Thành Vùng Đất Tà Xùa',
      excerpt: 'Khám phá câu chuyện về sự hình thành và phát triển của vùng đất Tà Xùa qua các thời kỳ lịch sử...',
      content: 'Tà Xùa, với tên gọi trong tiếng H\'Mông có nghĩa là "nơi có nhiều đá", đã trải qua hàng nghìn năm lịch sử...',
      category: 'history',
      author: 'TS. Nguyễn Văn Minh',
      publishDate: '15/01/2024',
      readTime: '8 phút đọc',
      views: 2341,
      likes: 156,
      image: 'bg-gradient-to-r from-amber-400 via-orange-500 to-red-600',
      tags: ['Lịch sử', 'Tà Xùa', 'Dân tộc H\'Mông']
    },
    {
      id: 2,
      title: 'Trang Phục Truyền Thống Của Người H\'Mông Tà Xùa',
      excerpt: 'Tìm hiểu về nghệ thuật dệt vải và trang phục đặc trưng của người H\'Mông tại Tà Xùa...',
      content: 'Trang phục truyền thống của người H\'Mông Tà Xùa không chỉ là quần áo mà còn là biểu tượng văn hóa...',
      category: 'fashion',
      author: 'Vàng Thị Mai',
      publishDate: '12/01/2024',
      readTime: '6 phút đọc',
      views: 1876,
      likes: 234,
      image: 'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500',
      tags: ['Trang phục', 'Thủ công', 'Văn hóa']
    },
    {
      id: 3,
      title: 'Âm Nhạc Dân Gian: Tiếng Khèn Trên Núi Cao',
      excerpt: 'Khám phá nghệ thuật âm nhạc dân gian độc đáo của người H\'Mông với nhạc cụ khèn...',
      content: 'Tiếng khèn vang vọng trên những đỉnh núi Tà Xùa không chỉ là âm thanh mà còn là linh hồn...',
      category: 'music',
      author: 'Lý Seo Sủ',
      publishDate: '10/01/2024',
      readTime: '5 phút đọc',
      views: 1543,
      likes: 189,
      image: 'bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600',
      tags: ['Âm nhạc', 'Khèn', 'Dân gian']
    },
    {
      id: 4,
      title: 'Kiến Trúc Nhà Sàn Truyền Thống',
      excerpt: 'Tìm hiểu về nghệ thuật xây dựng nhà sàn độc đáo của người H\'Mông Tà Xùa...',
      content: 'Nhà sàn của người H\'Mông Tà Xùa được xây dựng hoàn toàn bằng gỗ và tre nứa...',
      category: 'architecture',
      author: 'Kiến trúc sư Trần Minh Đức',
      publishDate: '08/01/2024',
      readTime: '7 phút đọc',
      views: 2156,
      likes: 178,
      image: 'bg-gradient-to-r from-green-400 via-teal-500 to-blue-600',
      tags: ['Kiến trúc', 'Nhà sàn', 'Truyền thống']
    },
    {
      id: 5,
      title: 'Lễ Hội Gầu Tào: Tết Cổ Truyền Của Người H\'Mông',
      excerpt: 'Khám phá lễ hội truyền thống quan trọng nhất trong năm của người H\'Mông...',
      content: 'Gầu Tào là lễ hội tết cổ truyền của người H\'Mông, diễn ra vào tháng 12 âm lịch...',
      category: 'festival',
      author: 'Dân tộc học Vũ Thị Lan',
      publishDate: '05/01/2024',
      readTime: '9 phút đọc',
      views: 3421,
      likes: 267,
      image: 'bg-gradient-to-r from-rose-400 via-pink-500 to-purple-600',
      tags: ['Lễ hội', 'Gầu Tào', 'Tết cổ truyền']
    },
    {
      id: 6,
      title: 'Nghệ Thuật Thêu Tay Tinh Xảo',
      excerpt: 'Tìm hiểu về nghệ thuật thêu tay truyền thống và ý nghĩa của các họa tiết...',
      content: 'Nghệ thuật thêu tay của người H\'Mông Tà Xùa là một trong những di sản văn hóa quý giá...',
      category: 'craft',
      author: 'Thầy thêu Sùng A Phò',
      publishDate: '03/01/2024',
      readTime: '6 phút đọc',
      views: 1987,
      likes: 145,
      image: 'bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600',
      tags: ['Thêu tay', 'Nghệ thuật', 'Họa tiết']
    }
  ];

  const heritageItems = [
    {
      id: 1,
      name: 'Khèn H\'Mông Cổ',
      description: 'Nhạc cụ truyền thống được làm từ tre và đồng, có tuổi đời hơn 200 năm',
      category: 'music',
      era: 'Thế kỷ 19',
      location: 'Bản Púng, Tà Xùa',
      image: 'bg-gradient-to-r from-amber-400 to-orange-500',
      status: 'Được bảo tồn tốt',
      significance: 'Cấp quốc gia'
    },
    {
      id: 2,
      name: 'Trang Phục Cưới Truyền Thống',
      description: 'Bộ trang phục cưới hoàn chỉnh với kỹ thuật thêu tay tinh xảo',
      category: 'fashion',
      era: 'Thế kỷ 20',
      location: 'Bản Tà Xùa',
      image: 'bg-gradient-to-r from-purple-400 to-pink-500',
      status: 'Tình trạng tốt',
      significance: 'Cấp tỉnh'
    },
    {
      id: 3,
      name: 'Khung Cửi Dệt Vải',
      description: 'Khung cửi gỗ truyền thống dùng để dệt vải lanh và cotton',
      category: 'craft',
      era: 'Thế kỷ 19',
      location: 'Làng nghề Tà Xùa',
      image: 'bg-gradient-to-r from-green-400 to-teal-500',
      status: 'Cần bảo tồn',
      significance: 'Cấp huyện'
    },
    {
      id: 4,
      name: 'Mô Hình Nhà Sàn Cổ',
      description: 'Mô hình thu nhỏ của ngôi nhà sàn truyền thống người H\'Mông',
      category: 'architecture',
      era: 'Thế kỷ 18',
      location: 'Bản Cổ Tà Xùa',
      image: 'bg-gradient-to-r from-blue-400 to-indigo-500',
      status: 'Được phục chế',
      significance: 'Cấp quốc gia'
    },
    {
      id: 5,
      name: 'Bộ Trang Sức Bạc Cổ',
      description: 'Bộ trang sức bạc thủ công với các họa tiết rồng phượng',
      category: 'jewelry',
      era: 'Thế kỷ 19',
      location: 'Gia đình Vàng Seo Sủ',
      image: 'bg-gradient-to-r from-gray-400 to-slate-500',
      status: 'Được bảo tồn tốt',
      significance: 'Cấp tỉnh'
    },
    {
      id: 6,
      name: 'Tranh Vẽ Trên Vải Lanh',
      description: 'Bức tranh mô tả cuộc sống hàng ngày của người H\'Mông',
      category: 'art',
      era: 'Thế kỷ 20',
      location: 'Nhà văn hóa Tà Xùa',
      image: 'bg-gradient-to-r from-rose-400 to-red-500',
      status: 'Tình trạng tốt',
      significance: 'Cấp huyện'
    }
  ];

  const categories = [
    { id: 'all', name: 'Tất Cả', icon: BookOpen },
    { id: 'history', name: 'Lịch Sử', icon: Clock },
    { id: 'music', name: 'Âm Nhạc', icon: Music },
    { id: 'fashion', name: 'Trang Phục', icon: Shirt },
    { id: 'architecture', name: 'Kiến Trúc', icon: Home },
    { id: 'festival', name: 'Lễ Hội', icon: Calendar },
    { id: 'craft', name: 'Thủ Công', icon: Palette }
  ];

  const heritageCategories = [
    { id: 'all', name: 'Tất Cả', icon: BookOpen },
    { id: 'music', name: 'Âm Nhạc', icon: Music },
    { id: 'fashion', name: 'Trang Phục', icon: Shirt },
    { id: 'craft', name: 'Thủ Công', icon: Palette },
    { id: 'architecture', name: 'Kiến Trúc', icon: Home },
    { id: 'jewelry', name: 'Trang Sức', icon: Star },
    { id: 'art', name: 'Nghệ Thuật', icon: Camera }
  ];

  const filteredArticles = culturalArticles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const filteredHeritage = heritageItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getSignificanceColor = (significance: string) => {
    switch (significance) {
      case 'Cấp quốc gia': return 'bg-red-100 text-red-800';
      case 'Cấp tỉnh': return 'bg-blue-100 text-blue-800';
      case 'Cấp huyện': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Được bảo tồn tốt': return 'bg-green-100 text-green-800';
      case 'Tình trạng tốt': return 'bg-blue-100 text-blue-800';
      case 'Cần bảo tồn': return 'bg-yellow-100 text-yellow-800';
      case 'Được phục chế': return 'bg-purple-100 text-purple-800';
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
              Văn Hóa Tà Xùa
            </h1>
            <p className="font-inter text-xl md:text-2xl max-w-3xl mx-auto">
              Khám phá kho tàng văn hóa phong phú và di sản truyền thống của người H'Mông Tà Xùa
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 container mx-auto px-4">
          <Tabs defaultValue="articles" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="articles" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Bài Viết Chuyên Sâu
              </TabsTrigger>
              <TabsTrigger value="heritage" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Thư Viện Di Sản
              </TabsTrigger>
            </TabsList>

            {/* Articles Tab */}
            <TabsContent value="articles" className="space-y-8">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? 'default' : 'outline'}
                      onClick={() => setSelectedCategory(category.id)}
                      className="flex items-center gap-2"
                      size="sm"
                    >
                      <IconComponent className="w-4 h-4" />
                      {category.name}
                    </Button>
                  );
                })}
              </div>

              {/* Search */}
              <div className="max-w-md mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Tìm kiếm bài viết..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Featured Article */}
              {filteredArticles.length > 0 && (
                <Card className="overflow-hidden mb-8">
                  <div className="md:flex">
                    <div className={`md:w-1/2 h-64 md:h-auto ${filteredArticles[0].image} flex items-center justify-center`}>
                      <div className="text-white text-center p-6">
                        <Badge className="bg-white/20 text-white mb-4">Bài Viết Nổi Bật</Badge>
                        <h2 className="font-playfair text-2xl md:text-3xl font-bold">
                          {filteredArticles[0].title}
                        </h2>
                      </div>
                    </div>
                    <div className="md:w-1/2 p-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span>Bởi {filteredArticles[0].author}</span>
                        <span>•</span>
                        <span>{filteredArticles[0].publishDate}</span>
                        <span>•</span>
                        <span>{filteredArticles[0].readTime}</span>
                      </div>
                      
                      <p className="font-inter text-muted-foreground mb-6 leading-relaxed">
                        {filteredArticles[0].excerpt}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {filteredArticles[0].tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {filteredArticles[0].views}
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {filteredArticles[0].likes}
                          </div>
                        </div>
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                          Đọc Tiếp
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.slice(1).map((article) => (
                  <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className={`h-48 ${article.image} flex items-center justify-center`}>
                      <div className="text-white text-center p-4">
                        <h3 className="font-playfair text-lg font-bold line-clamp-2">
                          {article.title}
                        </h3>
                      </div>
                    </div>
                    
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{article.author}</span>
                        <span>•</span>
                        <span>{article.publishDate}</span>
                      </div>

                      <p className="font-inter text-sm text-muted-foreground line-clamp-3">
                        {article.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-1">
                        {article.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {article.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{article.tags.length - 2}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {article.views}
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {article.likes}
                          </div>
                          <span>{article.readTime}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Heritage Tab */}
            <TabsContent value="heritage" className="space-y-8">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2 mb-6">
                {heritageCategories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? 'default' : 'outline'}
                      onClick={() => setSelectedCategory(category.id)}
                      className="flex items-center gap-2"
                      size="sm"
                    >
                      <IconComponent className="w-4 h-4" />
                      {category.name}
                    </Button>
                  );
                })}
              </div>

              {/* Search */}
              <div className="max-w-md mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Tìm kiếm di sản..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Heritage Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHeritage.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className={`h-48 ${item.image} flex items-center justify-center`}>
                      <div className="text-white text-center p-4">
                        <h3 className="font-playfair text-xl font-bold">
                          {item.name}
                        </h3>
                      </div>
                    </div>
                    
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge className={getSignificanceColor(item.significance)}>
                          {item.significance}
                        </Badge>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </div>

                      <p className="font-inter text-sm text-muted-foreground">
                        {item.description}
                      </p>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Thời kỳ:</span>
                          <span className="font-semibold">{item.era}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Vị trí:</span>
                          <span className="font-semibold text-right flex-1 ml-2">{item.location}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2 border-t border-border">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Camera className="w-4 h-4 mr-2" />
                          Xem 3D
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Download className="w-4 h-4 mr-2" />
                          Tải về
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-6">
              Góp Phần Bảo Tồn Văn Hóa
            </h2>
            <p className="font-inter text-muted-foreground max-w-2xl mx-auto mb-8">
              Hãy cùng chúng tôi bảo tồn và phát huy những giá trị văn hóa quý báu của người H'Mông Tà Xùa
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Users className="w-4 h-4 mr-2" />
                Tham Gia Dự Án
              </Button>
              <Button variant="outline">
                <Heart className="w-4 h-4 mr-2" />
                Ủng Hộ Bảo Tồn
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Culture;