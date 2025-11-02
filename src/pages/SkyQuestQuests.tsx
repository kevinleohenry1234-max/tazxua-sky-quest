import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Filter, 
  Clock, 
  Star, 
  MapPin, 
  Users, 
  Camera, 
  Mountain, 
  Leaf, 
  Coffee, 
  Heart, 
  Target,
  Search,
  ArrowLeft,
  Trophy
} from 'lucide-react';

interface Quest {
  id: string;
  title: string;
  description: string;
  points: number;
  duration: string;
  difficulty: 'Dễ' | 'Trung bình' | 'Khó' | 'Rất khó';
  category: 'Khám phá' | 'Môi trường' | 'Văn hóa' | 'Thể thao' | 'Cộng đồng';
  mode: 'maysuong' | 'hangsay' | 'both';
  image: string;
  location: string;
  participants: number;
  icon: any;
}

const SkyQuestQuests: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMode, setSelectedMode] = useState<string>(searchParams.get('mode') || 'all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredQuests, setFilteredQuests] = useState<Quest[]>([]);

  const quests: Quest[] = [
    {
      id: '1',
      title: 'Bình minh trên đỉnh Tà Xùa',
      description: 'Chinh phục đỉnh núi để ngắm bình minh tuyệt đẹp và chụp ảnh kỷ niệm',
      points: 150,
      duration: '3 giờ',
      difficulty: 'Dễ',
      category: 'Khám phá',
      mode: 'both',
      image: '/images/skyquest/quest-sunrise.jpg',
      location: 'Đỉnh Tà Xùa',
      participants: 234,
      icon: Camera
    },
    {
      id: '2',
      title: 'Workshop trà Shan Tuyết',
      description: 'Học cách pha trà và tìm hiểu văn hóa trà của người H\'Mông',
      points: 100,
      duration: '2 giờ',
      difficulty: 'Dễ',
      category: 'Văn hóa',
      mode: 'maysuong',
      image: '/images/skyquest/quest-tea.jpg',
      location: 'Làng Tà Xùa',
      participants: 189,
      icon: Coffee
    },
    {
      id: '3',
      title: 'Dọn rác bảo vệ môi trường',
      description: 'Tham gia hoạt động dọn dẹp và bảo vệ môi trường thiên nhiên',
      points: 200,
      duration: '1 giờ',
      difficulty: 'Trung bình',
      category: 'Môi trường',
      mode: 'hangsay',
      image: '/images/skyquest/quest-cleanup.jpg',
      location: 'Khu vực rừng',
      participants: 156,
      icon: Leaf
    },
    {
      id: '4',
      title: 'Học thêu H\'Mông truyền thống',
      description: 'Khám phá nghệ thuật thêu truyền thống của dân tộc H\'Mông',
      points: 120,
      duration: '4 giờ',
      difficulty: 'Trung bình',
      category: 'Văn hóa',
      mode: 'maysuong',
      image: '/images/skyquest/quest-embroidery.jpg',
      location: 'Nhà văn hóa',
      participants: 98,
      icon: Heart
    },
    {
      id: '5',
      title: 'Trekking khám phá thác ẩn',
      description: 'Hành trình khám phá những thác nước ẩn giấu trong rừng sâu',
      points: 250,
      duration: '6 giờ',
      difficulty: 'Khó',
      category: 'Thể thao',
      mode: 'hangsay',
      image: '/images/skyquest/quest-waterfall.jpg',
      location: 'Rừng Tà Xùa',
      participants: 67,
      icon: Mountain
    },
    {
      id: '6',
      title: 'Trồng cây bản địa',
      description: 'Góp phần bảo vệ môi trường bằng việc trồng cây bản địa',
      points: 180,
      duration: '2 giờ',
      difficulty: 'Dễ',
      category: 'Môi trường',
      mode: 'both',
      image: '/images/skyquest/quest-planting.jpg',
      location: 'Khu bảo tồn',
      participants: 145,
      icon: Leaf
    },
    {
      id: '7',
      title: 'Leo núi thử thách',
      description: 'Chinh phục những đỉnh núi cao và hiểm trở nhất',
      points: 300,
      duration: '8 giờ',
      difficulty: 'Rất khó',
      category: 'Thể thao',
      mode: 'hangsay',
      image: '/images/skyquest/quest-climbing.jpg',
      location: 'Đỉnh Phu Sang',
      participants: 34,
      icon: Mountain
    },
    {
      id: '8',
      title: 'Dự án cộng đồng',
      description: 'Tham gia xây dựng cơ sở hạ tầng cho cộng đồng địa phương',
      points: 250,
      duration: '4 giờ',
      difficulty: 'Trung bình',
      category: 'Cộng đồng',
      mode: 'hangsay',
      image: '/images/skyquest/quest-community.jpg',
      location: 'Làng Tà Xùa',
      participants: 78,
      icon: Target
    },
    {
      id: '9',
      title: 'Chụp ảnh thiên nhiên',
      description: 'Ghi lại vẻ đẹp thiên nhiên qua ống kính máy ảnh',
      points: 90,
      duration: '3 giờ',
      difficulty: 'Dễ',
      category: 'Khám phá',
      mode: 'maysuong',
      image: '/images/skyquest/quest-photography.jpg',
      location: 'Các điểm cảnh',
      participants: 201,
      icon: Camera
    }
  ];

  useEffect(() => {
    let filtered = quests;

    // Filter by mode
    if (selectedMode !== 'all') {
      filtered = filtered.filter(quest => quest.mode === selectedMode || quest.mode === 'both');
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(quest => quest.difficulty === selectedDifficulty);
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(quest => quest.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(quest => 
        quest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quest.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredQuests(filtered);
  }, [selectedMode, selectedDifficulty, selectedCategory, searchTerm]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Dễ': return 'bg-green-100 text-green-700';
      case 'Trung bình': return 'bg-yellow-100 text-yellow-700';
      case 'Khó': return 'bg-orange-100 text-orange-700';
      case 'Rất khó': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Khám phá': return 'bg-blue-100 text-blue-700';
      case 'Môi trường': return 'bg-green-100 text-green-700';
      case 'Văn hóa': return 'bg-purple-100 text-purple-700';
      case 'Thể thao': return 'bg-red-100 text-red-700';
      case 'Cộng đồng': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-emerald-600 to-blue-600 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate('/skyquest')}
              className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Khám phá các Quest
              </h1>
              <p className="text-white/90 mt-2">
                {filteredQuests.length} nhiệm vụ thú vị đang chờ bạn
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm quest..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="all">Tất cả chế độ</option>
                <option value="maysuong">Mây Mây Sương Sương</option>
                <option value="hangsay">Hăng Say Săn Thưởng</option>
              </select>

              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="all">Tất cả độ khó</option>
                <option value="Dễ">Dễ</option>
                <option value="Trung bình">Trung bình</option>
                <option value="Khó">Khó</option>
                <option value="Rất khó">Rất khó</option>
              </select>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="all">Tất cả loại</option>
                <option value="Khám phá">Khám phá</option>
                <option value="Môi trường">Môi trường</option>
                <option value="Văn hóa">Văn hóa</option>
                <option value="Thể thao">Thể thao</option>
                <option value="Cộng đồng">Cộng đồng</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Quest Grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredQuests.length === 0 ? (
            <div className="text-center py-16">
              <Filter className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-600 mb-2">
                Không tìm thấy quest nào
              </h3>
              <p className="text-slate-500">
                Thử thay đổi bộ lọc để xem thêm quest khác
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredQuests.map((quest) => (
                <div key={quest.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  {/* Quest Image */}
                  <div className="h-48 bg-gradient-to-br from-emerald-400 to-blue-400 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-4 left-4">
                      <quest.icon className="w-8 h-8 text-white drop-shadow-lg" />
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quest.difficulty)}`}>
                        {quest.difficulty}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between text-white text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{quest.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{quest.participants}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quest Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(quest.category)}`}>
                        {quest.category}
                      </span>
                      {quest.mode !== 'both' && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          quest.mode === 'maysuong' ? 'bg-cyan-100 text-cyan-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {quest.mode === 'maysuong' ? 'Mây Sương' : 'Hăng Say'}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-slate-800 mb-2">{quest.title}</h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">{quest.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{quest.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Trophy className="w-4 h-4" />
                          <span>{quest.points} điểm</span>
                        </div>
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-400 hover:to-blue-400 text-white font-medium py-3 rounded-xl transition-all duration-300 hover:scale-105">
                      Tham gia Quest
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-12">
            Thống kê Sky Quest
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-3xl font-bold text-emerald-600 mb-2">50+</div>
              <div className="text-slate-600">Quest đa dạng</div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">1,200+</div>
              <div className="text-slate-600">Người tham gia</div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-slate-600">Hài lòng</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SkyQuestQuests;