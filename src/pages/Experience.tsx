import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Cloud, Mountain, Utensils, Home, Camera, Clock, Users } from 'lucide-react';
import heroTaxuaImage from '@/assets/hero-taxua-clouds.jpg';
import dragonSpineImage from '@/assets/dragon-spine.jpg';
import localCuisineImage from '@/assets/local-cuisine.jpg';
import hmongCultureImage from '@/assets/hmong-culture.jpg';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      title: 'Chinh Phục Biển Mây',
      description: 'Săn mây tại những điểm đẹp nhất Tà Xùa, trải nghiệm cảm giác đứng giữa biển mây bồng bềnh.',
      image: heroTaxuaImage,
      icon: Cloud,
      activities: ['Săn mây lúc bình minh', 'Chụp ảnh đẹp', 'Cắm trại qua đêm'],
      duration: '2-3 ngày',
      difficulty: 'Trung bình'
    },
    {
      id: 2,
      title: 'Hành Trình Khám Phá',
      description: 'Trekking, hiking trên những cung đường đẹp nhất, khám phá thiên nhiên hoang sơ.',
      image: dragonSpineImage,
      icon: Mountain,
      activities: ['Trekking sống lưng khủng long', 'Leo đỉnh Phu Sang', 'Khám phá thác Dải Yếm'],
      duration: '1-4 ngày',
      difficulty: 'Khó'
    },
    {
      id: 3,
      title: 'Thưởng Thức Bản Sắc',
      description: 'Khám phá ẩm thực độc đáo của vùng núi, thưởng thức các đặc sản địa phương.',
      image: localCuisineImage,
      icon: Utensils,
      activities: ['Thưởng thức trà Shan Tuyết', 'Ẩm thực H\'Mông', 'Nướng thịt trên núi'],
      duration: 'Linh hoạt',
      difficulty: 'Dễ'
    },
    {
      id: 4,
      title: 'Sống Chậm Cùng Bản Làng',
      description: 'Trải nghiệm cuộc sống bình yên của người dân địa phương, học hỏi văn hóa truyền thống.',
      image: hmongCultureImage,
      icon: Home,
      activities: ['Ở homestay', 'Học nghề thủ công', 'Tham gia phiên chợ'],
      duration: '2-5 ngày',
      difficulty: 'Dễ'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Dễ': return 'bg-green-100 text-green-700';
      case 'Trung bình': return 'bg-yellow-100 text-yellow-700';
      case 'Khó': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section with Video Loop Placeholder */}
        <section className="relative h-96 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroTaxuaImage})` }}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative h-full flex items-center justify-center text-center text-white z-10">
            <div className="max-w-4xl mx-auto px-4">
              <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
                Sống Trọn Từng Khoảnh Khắc Tại Tà Xùa
              </h1>
              <p className="font-inter text-xl md:text-2xl mb-8">
                Khám phá những trải nghiệm độc đáo và khó quên
              </p>
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Bắt Đầu Khám Phá
              </Button>
            </div>
          </div>
        </section>

        {/* Experience Categories */}
        <section className="py-20 container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-6">
              Phân Loại Trải Nghiệm
            </h2>
            <p className="font-inter text-lg text-muted-foreground max-w-3xl mx-auto">
              Mỗi trải nghiệm mang đến một góc nhìn khác về vẻ đẹp Tà Xùa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experiences.map((experience) => {
              const IconComponent = experience.icon;
              return (
                <Card key={experience.id} className="group overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-2">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={experience.image}
                      alt={experience.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(experience.difficulty)}`}>
                        {experience.difficulty}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <IconComponent className="w-4 h-4 text-gray-700" />
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="font-playfair text-xl text-foreground flex items-center">
                      <IconComponent className="w-5 h-5 mr-2 text-primary" />
                      {experience.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="font-inter text-muted-foreground leading-relaxed">
                      {experience.description}
                    </p>

                    {/* Duration and Difficulty */}
                    <div className="flex items-center space-x-4 py-3 border-t border-border">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="font-inter text-sm font-semibold">{experience.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="font-inter text-sm">Phù hợp nhóm</span>
                      </div>
                    </div>

                    {/* Activities */}
                    <div className="space-y-2">
                      <h4 className="font-inter font-semibold text-foreground">Hoạt động chính:</h4>
                      <div className="space-y-1">
                        {experience.activities.map((activity, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            <span className="font-inter text-sm text-muted-foreground">{activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Tìm Hiểu Thêm
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* User Stories Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-6">
                Câu Chuyện Từ Du Khách
              </h2>
              <p className="font-inter text-lg text-muted-foreground">
                Những trải nghiệm thật từ cộng đồng #LovableTaXua
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <Camera className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">@du_lich_tre_{i}</h4>
                      <p className="text-sm text-muted-foreground">#LovableTaXua</p>
                    </div>
                  </div>
                  <p className="font-inter text-muted-foreground">
                    "Tà Xùa thật sự là thiên đường mây! Cảm giác đứng trên đỉnh núi nhìn xuống biển mây không thể tả được bằng lời..."
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Experience;