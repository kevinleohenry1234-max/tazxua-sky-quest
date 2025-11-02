import { useState } from 'react';
import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import LoginModal, { LoginData } from '@/components/LoginModal';
import RegisterModal from '@/components/RegisterModal';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ChefHat, 
  Search, 
  Clock, 
  Users, 
  Flame,
  Star,
  Heart,
  Share2,
  ArrowLeft,
  MapPin,
  Utensils,
  Leaf
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LazyImage from '@/components/LazyImage';

// Import sample images
import heroImage from '@/assets/hero-taxua-clouds.jpg';
import hmongCultureImage from '@/assets/hmong-culture.jpg';
import terraceFieldsImage from '@/assets/dragon-spine.jpg';
import shanTuyetTeaImage from '@/assets/shan-tuyet-tea.jpg';

const ExhibitionCuisine = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDish, setSelectedDish] = useState<number | null>(null);
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

  const cuisineCollection = [
    {
      id: 1,
      name: 'Thịt Trâu Gác Bếp',
      description: 'Đặc sản nổi tiếng của người H\'Mông, thịt trâu được hun khói trên bếp lửa trong nhiều tháng, tạo nên hương vị đậm đà, thơm ngon khó quên.',
      image: hmongCultureImage,
      category: 'main',
      difficulty: 'hard',
      cookingTime: '6-12 tháng',
      servings: '8-10 người',
      rating: 4.9,
      likes: 2340,
      region: 'Tà Xùa, Sơn La',
      season: 'Quanh năm',
      ingredients: [
        'Thịt trâu tươi (5-10kg)',
        'Muối hạt',
        'Lá chuối rừng',
        'Gia vị truyền thống H\'Mông'
      ],
      instructions: [
        'Chọn thịt trâu tươi, cắt thành từng miếng vừa ăn',
        'Ướp muối và gia vị theo tỷ lệ truyền thống',
        'Gói thịt bằng lá chuối rừng',
        'Treo lên gác bếp, hun khói liên tục 6-12 tháng',
        'Thịt chín khi có màu nâu đỏ, thơm đặc trưng'
      ],
      nutritionalValue: 'Giàu protein, vitamin B12, sắt và kẽm',
      culturalSignificance: 'Món ăn truyền thống trong các dịp lễ tết, cưới hỏi của người H\'Mông'
    },
    {
      id: 2,
      name: 'Cơm Lam Tà Xùa',
      description: 'Cơm nếp được nấu trong ống tre tươi, tạo nên hương vị thơm ngon đặc biệt, kết hợp hoàn hảo giữa vị ngọt của nếp và hương tre rừng.',
      image: terraceFieldsImage,
      category: 'staple',
      difficulty: 'medium',
      cookingTime: '2-3 giờ',
      servings: '4-6 người',
      rating: 4.7,
      likes: 1890,
      region: 'Vùng núi Tà Xùa',
      season: 'Mùa thu, đông',
      ingredients: [
        'Nếp tẻ (500g)',
        'Ống tre tươi (6-8 ống)',
        'Lá chuối non',
        'Nước suối sạch',
        'Muối'
      ],
      instructions: [
        'Vo sạch nếp, ngâm 4-6 tiếng',
        'Chọn ống tre tươi, cắt thành đoạn 25-30cm',
        'Cho nếp vào ống tre, thêm nước vừa đủ',
        'Bịt miệng ống bằng lá chuối',
        'Nướng trên than hồng 2-3 tiếng, xoay đều'
      ],
      nutritionalValue: 'Cung cấp carbohydrate, chất xơ và vitamin B',
      culturalSignificance: 'Món ăn không thể thiếu trong các chuyến du lịch, dã ngoại'
    },
    {
      id: 3,
      name: 'Chè Shan Tuyết Cổ Thụ',
      description: 'Loại chè quý hiếm được hái từ những cây chè cổ thụ hàng trăm năm tuổi trên đỉnh Tà Xùa, có hương vị thanh mát, ngọt dịu tự nhiên.',
      image: shanTuyetTeaImage,
      category: 'beverage',
      difficulty: 'easy',
      cookingTime: '10-15 phút',
      servings: '2-3 người',
      rating: 4.8,
      likes: 3210,
      region: 'Đỉnh Tà Xùa',
      season: 'Mùa xuân (tháng 2-4)',
      ingredients: [
        'Lá chè Shan Tuyết tươi (20g)',
        'Nước suối Tà Xùa',
        'Ấm pha chè đất nung'
      ],
      instructions: [
        'Đun nước suối đến 80-85°C',
        'Rửa ấm và chén bằng nước nóng',
        'Cho lá chè vào ấm, rót nước nóng',
        'Ủ 3-5 phút cho lần đầu',
        'Rót ra chén, thưởng thức từ từ'
      ],
      nutritionalValue: 'Chứa catechin, caffeine tự nhiên, vitamin C và chất chống oxy hóa',
      culturalSignificance: 'Biểu tượng của sự hiếu khách, thường dùng để tiếp đãi khách quý'
    },
    {
      id: 4,
      name: 'Canh Chua Măng Rừng',
      description: 'Món canh thanh mát từ măng rừng tươi, nấu cùng cá suối và rau rừng, mang hương vị chua ngọt đặc trưng của núi rừng Tà Xùa.',
      image: heroImage,
      category: 'soup',
      difficulty: 'medium',
      cookingTime: '45 phút',
      servings: '4-5 người',
      rating: 4.6,
      likes: 1560,
      region: 'Bản Ít, Tà Xùa',
      season: 'Mùa mưa (tháng 5-9)',
      ingredients: [
        'Măng rừng tươi (300g)',
        'Cá suối (500g)',
        'Me chua',
        'Cà chua rừng',
        'Rau răm, ngò gai',
        'Ớt, tỏi, hành'
      ],
      instructions: [
        'Măng rừng thái lát mỏng, luộc sơ',
        'Cá suối làm sạch, cắt khúc',
        'Nấu nước dùng từ xương cá',
        'Cho măng, cà chua vào nấu',
        'Thêm cá, nêm nếm vừa ăn',
        'Rắc rau thơm lên trên'
      ],
      nutritionalValue: 'Giàu chất xơ, protein, vitamin A và C',
      culturalSignificance: 'Món ăn hàng ngày của người dân vùng núi, thể hiện sự gần gũi với thiên nhiên'
    },
    {
      id: 5,
      name: 'Bánh Khảu Nhỏ',
      description: 'Món bánh truyền thống của người H\'Mông, làm từ bột nếp, có nhân đậu xanh hoặc thịt, gói trong lá dong, hấp chín có vị thơm ngon đặc biệt.',
      image: hmongCultureImage,
      category: 'dessert',
      difficulty: 'hard',
      cookingTime: '4-5 giờ',
      servings: '10-12 cái',
      rating: 4.5,
      likes: 1230,
      region: 'Các bản H\'Mông Tà Xùa',
      season: 'Tết Nguyên Đán',
      ingredients: [
        'Bột nếp (500g)',
        'Đậu xanh (200g)',
        'Thịt ba chỉ (300g)',
        'Lá dong tươi',
        'Hành khô, tiêu',
        'Nước cốt dừa'
      ],
      instructions: [
        'Ngâm bột nếp qua đêm',
        'Nấu nhân đậu xanh và thịt',
        'Trộn bột nếp với nước cốt dừa',
        'Gói bánh bằng lá dong',
        'Hấp trong 3-4 tiếng',
        'Để nguội trước khi ăn'
      ],
      nutritionalValue: 'Cung cấp năng lượng, protein và chất béo tốt',
      culturalSignificance: 'Món bánh thiêng liêng trong các dịp lễ tết, cúng tổ tiên'
    },
    {
      id: 6,
      name: 'Rượu Ngô Tà Xùa',
      description: 'Loại rượu truyền thống được chưng cất từ ngô núi, có độ cồn cao, vị trong, ngọt, thường dùng trong các dịp lễ hội và tiếp khách.',
      image: terraceFieldsImage,
      category: 'beverage',
      difficulty: 'hard',
      cookingTime: '1-2 tháng',
      servings: '20-30 ly',
      rating: 4.4,
      likes: 980,
      region: 'Tà Xùa, Sơn La',
      season: 'Sau mùa thu hoạch ngô',
      ingredients: [
        'Ngô núi (5kg)',
        'Men rượu truyền thống',
        'Nước suối sạch',
        'Bình chưng cất đất nung'
      ],
      instructions: [
        'Nấu ngô chín, để nguội',
        'Trộn với men rượu, ủ 15-20 ngày',
        'Chưng cất bằng bình đất nung',
        'Lọc và ủ thêm 1 tháng',
        'Bảo quản trong chum sành'
      ],
      nutritionalValue: 'Chứa alcohol, nên uống có chừng mức',
      culturalSignificance: 'Biểu tượng của lòng hiếu khách, dùng trong các nghi lễ truyền thống'
    }
  ];

  const categories = [
    { id: 'all', label: 'Tất cả', count: cuisineCollection.length },
    { id: 'main', label: 'Món chính', count: cuisineCollection.filter(dish => dish.category === 'main').length },
    { id: 'staple', label: 'Món chủ yếu', count: cuisineCollection.filter(dish => dish.category === 'staple').length },
    { id: 'soup', label: 'Canh/Súp', count: cuisineCollection.filter(dish => dish.category === 'soup').length },
    { id: 'dessert', label: 'Tráng miệng', count: cuisineCollection.filter(dish => dish.category === 'dessert').length },
    { id: 'beverage', label: 'Đồ uống', count: cuisineCollection.filter(dish => dish.category === 'beverage').length }
  ];

  const difficultyLabels = {
    easy: { label: 'Dễ', color: 'bg-green-100 text-green-800' },
    medium: { label: 'Trung bình', color: 'bg-yellow-100 text-yellow-800' },
    hard: { label: 'Khó', color: 'bg-red-100 text-red-800' }
  };

  const filteredDishes = cuisineCollection.filter(dish => {
    const matchesCategory = selectedCategory === 'all' || dish.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const selectedDishData = selectedDish ? cuisineCollection.find(d => d.id === selectedDish) : null;

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

      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-900 to-red-800">
        <div className="absolute inset-0 opacity-30">
          <LazyImage
            src={hmongCultureImage}
            alt="Cuisine Background"
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
            Ẩm Thực Tà Xùa
          </h1>
          <p className="font-inter text-xl text-white/90 mb-8">
            Khám phá hương vị đặc sản núi rừng Tây Bắc
          </p>
          
          <div className="flex items-center justify-center gap-4 text-white/70">
            <div className="flex items-center gap-2">
              <ChefHat className="w-5 h-5" />
              <span className="font-inter">{cuisineCollection.length} món ăn</span>
            </div>
            <div className="w-1 h-1 bg-white/50 rounded-full"></div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              <span className="font-inter">
                {cuisineCollection.reduce((total, dish) => total + dish.likes, 0).toLocaleString()} lượt yêu thích
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Recipe Detail Modal */}
      {selectedDishData && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <div className="h-64 overflow-hidden rounded-t-2xl">
                <LazyImage
                  src={selectedDishData.image}
                  alt={selectedDishData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedDish(null)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white"
              >
                ✕
              </Button>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-playfair text-3xl font-bold text-foreground mb-2">
                    {selectedDishData.name}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedDishData.region}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Leaf className="w-4 h-4" />
                      <span>{selectedDishData.season}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-inter text-sm">{selectedDishData.rating}</span>
                  </div>
                  <Button size="sm" variant="outline">
                    <Heart className="w-4 h-4 mr-1" />
                    {selectedDishData.likes}
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <p className="font-inter text-muted-foreground mb-6 leading-relaxed">
                {selectedDishData.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-inter text-sm font-medium">Thời gian</div>
                    <div className="font-inter text-sm text-muted-foreground">{selectedDishData.cookingTime}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-inter text-sm font-medium">Khẩu phần</div>
                    <div className="font-inter text-sm text-muted-foreground">{selectedDishData.servings}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <Flame className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-inter text-sm font-medium">Độ khó</div>
                    <Badge className={difficultyLabels[selectedDishData.difficulty as keyof typeof difficultyLabels].color}>
                      {difficultyLabels[selectedDishData.difficulty as keyof typeof difficultyLabels].label}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-playfair text-xl font-bold text-foreground mb-4">Nguyên liệu</h3>
                  <ul className="space-y-2">
                    {selectedDishData.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center gap-2 font-inter text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-playfair text-xl font-bold text-foreground mb-4">Cách làm</h3>
                  <ol className="space-y-3">
                    {selectedDishData.instructions.map((step, index) => (
                      <li key={index} className="flex gap-3 font-inter text-sm">
                        <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-playfair text-lg font-bold text-foreground mb-2">Giá trị dinh dưỡng</h4>
                <p className="font-inter text-sm text-muted-foreground mb-3">{selectedDishData.nutritionalValue}</p>
                
                <h4 className="font-playfair text-lg font-bold text-foreground mb-2">Ý nghĩa văn hóa</h4>
                <p className="font-inter text-sm text-muted-foreground">{selectedDishData.culturalSignificance}</p>
              </div>
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
                placeholder="Tìm kiếm món ăn, nguyên liệu..."
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

          {/* Cuisine Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map((dish) => (
              <Card 
                key={dish.id} 
                className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
                onClick={() => setSelectedDish(dish.id)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <LazyImage
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  <div className="absolute top-4 left-4">
                    <Badge className={difficultyLabels[dish.difficulty as keyof typeof difficultyLabels].color}>
                      {difficultyLabels[dish.difficulty as keyof typeof difficultyLabels].label}
                    </Badge>
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="font-inter text-xs font-medium">{dish.rating}</span>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <Button size="sm" className="w-full">
                        <Utensils className="w-4 h-4 mr-2" />
                        Xem công thức
                      </Button>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-foreground mb-2 line-clamp-1">
                    {dish.name}
                  </h3>
                  <p className="font-inter text-sm text-muted-foreground mb-4 line-clamp-2">
                    {dish.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{dish.cookingTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{dish.servings}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{dish.region.split(',')[0]}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Heart className="w-4 h-4" />
                      <span>{dish.likes}</span>
                    </div>
                    
                    <Badge variant="outline" className="text-xs">
                      {categories.find(cat => cat.id === dish.category)?.label}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDishes.length === 0 && (
            <div className="text-center py-12">
              <ChefHat className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-playfair text-xl font-bold text-foreground mb-2">
                Không tìm thấy món ăn nào
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

export default ExhibitionCuisine;