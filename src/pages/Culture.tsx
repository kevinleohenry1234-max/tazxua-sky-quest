import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Book, Music, Palette, Coffee, Users } from 'lucide-react';
import hmongCultureImage from '@/assets/hmong-culture.jpg';
import shanTuyetTeaImage from '@/assets/shan-tuyet-tea.jpg';
import localCuisineImage from '@/assets/local-cuisine.jpg';

const Culture = () => {
  const featuredArticles = [
    {
      id: 1,
      title: 'Kiến Trúc Nhà Của Người H\'Mông',
      excerpt: 'Khám phá nghệ thuật xây dựng độc đáo của người H\'Mông với những ngôi nhà sàn truyền thống, thể hiện sự hòa hợp với thiên nhiên.',
      image: hmongCultureImage,
      readTime: '8 phút đọc',
      category: 'Kiến trúc',
      author: 'Lê Minh Tâm'
    },
    {
      id: 2,
      title: 'Câu Chuyện Về Cây Chè Shan Tuyết Cổ Thụ',
      excerpt: 'Hành trình từ những cây chè cổ thụ hàng trăm năm tuổi đến tách trà thơm ngon, mang đậm hồn núi rừng Tây Bắc.',
      image: shanTuyetTeaImage,
      readTime: '12 phút đọc',
      category: 'Di sản',
      author: 'Nguyễn Thị Mai'
    },
    {
      id: 3,
      title: 'Lễ Hội Gầu Tào: Nét Văn Hóa Độc Đáo',
      excerpt: 'Tìm hiểu về lễ hội truyền thống quan trọng nhất của người H\'Mông, nơi thể hiện niềm tin và tình yêu quê hương.',
      image: localCuisineImage,
      readTime: '15 phút đọc',
      category: 'Lễ hội',
      author: 'Vàng Seo Sú'
    },
    {
      id: 4,
      title: 'Nghệ Thuật Dệt Thổ Cẩm H\'Mông',
      excerpt: 'Khám phá bí mật đằng sau những tấm thổ cẩm đầy màu sắc, từ kỹ thuật dệt truyền thống đến ý nghĩa văn hóa sâu sắc.',
      image: hmongCultureImage,
      readTime: '10 phút đọc',
      category: 'Thủ công',
      author: 'Tráng Thị Pua'
    }
  ];

  const heritageItems = [
    {
      name: 'Trang Phục Truyền Thống',
      description: 'Những bộ trang phục H\'Mông với họa tiết thổ cẩm tinh xảo',
      icon: Palette,
      image: hmongCultureImage
    },
    {
      name: 'Nhạc Cụ Dân Tộc',
      description: 'Khèn môi, đàn tính - âm thanh của núi rừng',
      icon: Music,
      image: shanTuyetTeaImage
    },
    {
      name: 'Nông Cụ Truyền Thống',
      description: 'Các dụng cụ canh tác gắn liền với đời sống',
      icon: Coffee,
      image: localCuisineImage
    }
  ];

  const basicPhrases = [
    { hmong: 'Nyob zoo', vietnamese: 'Xin chào', pronunciation: 'Nyô zoo' },
    { hmong: 'Ua tsaug', vietnamese: 'Cảm ơn', pronunciation: 'Ua tsaug' },
    { hmong: 'Thov txim', vietnamese: 'Xin lỗi', pronunciation: 'Thov txim' },
    { hmong: 'Zoo siab', vietnamese: 'Vui vẻ', pronunciation: 'Zoo siab' },
    { hmong: 'Mus zoo', vietnamese: 'Đi nhé', pronunciation: 'Mus zoo' },
    { hmong: 'Noj qab nyob zoo', vietnamese: 'Chúc sức khỏe', pronunciation: 'No gab nyob zoo' }
  ];

  const culturalTips = [
    'Luôn chào hỏi lịch sự khi gặp người dân địa phương',
    'Tôn trọng tập quán và lễ hội truyền thống',
    'Xin phép trước khi chụp ảnh người dân',
    'Không chạm vào những vật phẩm thiêng liêng',
    'Ăn mặc lịch sự khi vào làng bản',
    'Tham gia các hoạt động cộng đồng một cách chân thành'
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Kiến trúc': 'bg-blue-100 text-blue-700',
      'Di sản': 'bg-green-100 text-green-700',
      'Lễ hội': 'bg-purple-100 text-purple-700',
      'Thủ công': 'bg-orange-100 text-orange-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
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
            <p className="font-inter text-xl md:text-2xl max-w-2xl mx-auto">
              Khám phá vẻ đẹp văn hóa và con người nơi đây
            </p>
          </div>
        </section>

        {/* Featured Articles */}
        <section className="py-16 container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-6">
              Bài Viết Nổi Bật
            </h2>
            <p className="font-inter text-lg text-muted-foreground">
              Những câu chuyện sâu sắc về văn hóa và con người Tà Xùa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredArticles.map((article) => (
              <Card key={article.id} className="group overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className={`${getCategoryColor(article.category)}`}>
                      {article.category}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="font-playfair text-xl text-foreground group-hover:text-primary transition-colors">
                    {article.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="font-inter text-muted-foreground leading-relaxed">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Bởi {article.author}</span>
                    <span>{article.readTime}</span>
                  </div>

                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Đọc Bài Viết
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Heritage Gallery */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-6">
                Thư Viện Di Sản
              </h2>
              <p className="font-inter text-lg text-muted-foreground">
                Bảo tồn và trưng bày những giá trị văn hóa truyền thống
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {heritageItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Card key={index} className="group hover:shadow-medium transition-shadow cursor-pointer">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="font-playfair text-lg text-foreground flex items-center">
                        <IconComponent className="w-5 h-5 mr-2 text-primary" />
                        {item.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-inter text-muted-foreground">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Communication Guide */}
        <section className="py-16 container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Basic Phrases */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="font-playfair text-2xl text-foreground flex items-center">
                  <Book className="w-6 h-6 mr-2 text-primary" />
                  Cẩm Nang Giao Tiếp
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-inter text-muted-foreground mb-6">
                  Những câu giao tiếp cơ bản bằng tiếng H'Mông
                </p>
                
                <div className="space-y-3">
                  {basicPhrases.map((phrase, index) => (
                    <div key={index} className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-semibold text-foreground">{phrase.hmong}</span>
                        <span className="text-sm text-muted-foreground italic">
                          {phrase.pronunciation}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{phrase.vietnamese}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cultural Tips */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="font-playfair text-2xl text-foreground flex items-center">
                  <Heart className="w-6 h-6 mr-2 text-primary" />
                  Lưu Ý Văn Hóa
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-inter text-muted-foreground mb-6">
                  Cách thể hiện sự tôn trọng với văn hóa địa phương
                </p>
                
                <div className="space-y-3">
                  {culturalTips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <p className="font-inter text-muted-foreground">{tip}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-foreground">Lời khuyên</span>
                  </div>
                  <p className="font-inter text-muted-foreground text-sm">
                    Hãy luôn giữ tâm thái cởi mở và tôn trọng. Người dân địa phương sẽ rất vui khi chia sẻ văn hóa của họ với những du khách chân thành.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Culture;