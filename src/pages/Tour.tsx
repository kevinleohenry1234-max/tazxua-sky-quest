import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import Footer from '@/components/Footer';
import SearchDashboard from '@/components/shared/SearchDashboard';
import ServiceCard from '@/components/shared/ServiceCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, MapIcon, Users, Mountain, Calendar } from 'lucide-react';
import { tourData, Tour } from '@/data/tourData';

const TourPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTourType, setSelectedTourType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedDuration, setSelectedDuration] = useState<string>('all');
  const [selectedIncludes, setSelectedIncludes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'difficulty'>('rating');

  // Filter options
  const tourTypes = [
    { value: 'all', label: 'Tất cả' },
    { value: 'trekking', label: 'Trekking' },
    { value: 'cultural', label: 'Văn hóa' },
    { value: 'eco', label: 'Sinh thái' },
    { value: 'camping', label: 'Camping' },
    { value: 'sunrise', label: 'Ngắm bình minh' },
    { value: 'village', label: 'Thăm bản làng' }
  ];

  const difficulties = [
    { value: 'all', label: 'Tất cả độ khó' },
    { value: 'easy', label: 'Dễ' },
    { value: 'medium', label: 'Trung bình' },
    { value: 'challenging', label: 'Thử thách' }
  ];

  const durations = [
    { value: 'all', label: 'Tất cả thời lượng' },
    { value: 'half-day', label: 'Nửa ngày' },
    { value: 'full-day', label: '1 ngày' },
    { value: 'overnight', label: '1 đêm' },
    { value: 'multi-day', label: 'Nhiều ngày' }
  ];

  const includeOptions = [
    'Ăn sáng',
    'Ăn trưa', 
    'Ăn tối',
    'Lều cắm trại',
    'Hướng dẫn viên',
    'Xe đưa đón'
  ];

  // Filter and sort tours
  const filteredTours = useMemo(() => {
    let filtered = tourData.filter(tour => {
      // Search filter
      const matchesSearch = tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tour.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tour.startPoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tour.mainDestination.toLowerCase().includes(searchTerm.toLowerCase());

      // Tour type filter
      const matchesTourType = selectedTourType === 'all' || tour.tourType === selectedTourType;

      // Difficulty filter
      const matchesDifficulty = selectedDifficulty === 'all' || tour.difficulty === selectedDifficulty;

      // Duration filter
      let matchesDuration = true;
      if (selectedDuration !== 'all') {
        switch (selectedDuration) {
          case 'half-day':
            matchesDuration = tour.duration.includes('nửa ngày');
            break;
          case 'full-day':
            matchesDuration = tour.duration.includes('1 ngày') && !tour.duration.includes('đêm');
            break;
          case 'overnight':
            matchesDuration = tour.duration.includes('1 đêm');
            break;
          case 'multi-day':
            matchesDuration = tour.duration.includes('2 ngày') || tour.duration.includes('3 ngày');
            break;
        }
      }

      // Includes filter
      const matchesIncludes = selectedIncludes.length === 0 || 
        selectedIncludes.every(include => tour.includes.some(item => item.includes(include)));

      return matchesSearch && matchesTourType && matchesDifficulty && matchesDuration && matchesIncludes;
    });

    // Sort tours
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name, 'vi');
        case 'difficulty':
          const difficultyOrder = { 'easy': 1, 'medium': 2, 'challenging': 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        default:
          return b.rating - a.rating;
      }
    });

    return filtered;
  }, [searchTerm, selectedTourType, selectedDifficulty, selectedDuration, selectedIncludes, sortBy]);

  const handleBackToServices = () => {
    navigate('/accommodation');
  };

  const handleViewDetails = (id: string) => {
    // Navigate to tour detail page
    console.log('View tour details:', id);
  };

  const toggleInclude = (include: string) => {
    setSelectedIncludes(prev => 
      prev.includes(include) 
        ? prev.filter(i => i !== include)
        : [...prev, include]
    );
  };

  const clearFilters = () => {
    setSelectedTourType('all');
    setSelectedDifficulty('all');
    setSelectedDuration('all');
    setSelectedIncludes([]);
    setSortBy('rating');
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Dễ';
      case 'medium': return 'Trung bình';
      case 'challenging': return 'Thử thách';
      default: return '';
    }
  };

  const getTourTypeLabel = (tourType: string) => {
    switch (tourType) {
      case 'trekking': return 'Trekking';
      case 'cultural': return 'Văn hóa';
      case 'eco': return 'Sinh thái';
      case 'camping': return 'Camping';
      case 'sunrise': return 'Bình minh';
      case 'village': return 'Bản làng';
      default: return tourType;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'border-green-200 text-green-700';
      case 'medium': return 'border-yellow-200 text-yellow-700';
      case 'challenging': return 'border-red-200 text-red-700';
      default: return 'border-gray-200 text-gray-700';
    }
  };

  return (
    <Layout isLoggedIn={false}>
      <div className="min-h-screen" style={{ backgroundColor: '#F9FAF9' }}>
        <div className="pt-16">
          {/* Back Button */}
          <div className="container mx-auto px-4 py-6">
            <Button 
              onClick={handleBackToServices}
              variant="outline"
              className="mb-4 text-gray-600 border-gray-300 hover:bg-gray-50"
            >
            ← Quay lại Dịch vụ
          </Button>
          
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
              <MapIcon className="w-8 h-8 mr-3 text-blue-600" />
              Tour Du Lịch
            </h1>
            <p className="text-gray-600">Khám phá hành trình xanh cùng hướng dẫn viên địa phương</p>
          </div>
        </div>

        {/* Search Dashboard */}
        <SearchDashboard
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
          placeholder="Tìm kiếm tour, điểm đến, hoạt động..."
        >
          {/* Custom Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Tour Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Loại tour</label>
              <select
                value={selectedTourType}
                onChange={(e) => setSelectedTourType(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {tourTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Độ khó</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty.value} value={difficulty.value}>{difficulty.label}</option>
                ))}
              </select>
            </div>

            {/* Duration Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Thời lượng</label>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {durations.map(duration => (
                  <option key={duration.value} value={duration.value}>{duration.label}</option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sắp xếp theo</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'rating' | 'difficulty')}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="rating">Đánh giá cao nhất</option>
                <option value="name">Tên A-Z</option>
                <option value="difficulty">Độ khó</option>
              </select>
            </div>
          </div>

          {/* Includes Filter */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Bao gồm</label>
            <div className="flex flex-wrap gap-2">
              {includeOptions.map(include => (
                <Button
                  key={include}
                  onClick={() => toggleInclude(include)}
                  variant={selectedIncludes.includes(include) ? "default" : "outline"}
                  size="sm"
                  className={selectedIncludes.includes(include) ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  {include}
                </Button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <div className="mt-4">
            <Button
              onClick={clearFilters}
              variant="outline"
            >
              Xóa bộ lọc
            </Button>
          </div>
        </SearchDashboard>

        {/* Results Count */}
        <div className="container mx-auto px-4 mb-6">
          <p className="text-gray-600">
            Tìm thấy <span className="font-semibold">{filteredTours.length}</span> tour
          </p>
        </div>

        {/* Tour Grid */}
        <div className="container mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTours.map(tour => (
              <ServiceCard
                key={tour.id}
                id={tour.id}
                name={tour.name}
                description={tour.description}
                location={`${tour.startPoint} → ${tour.mainDestination}`}
                rating={tour.rating}
                images={tour.images}
                price={tour.price}
                amenities={tour.amenities}
                features={tour.features}
                isPartner={tour.isPartner}
                onViewDetails={handleViewDetails}
                customBadges={
                  <div className="flex flex-wrap gap-1 mb-2">
                    <Badge variant="outline" className="text-xs border-blue-200 text-blue-700">
                      {getTourTypeLabel(tour.tourType)}
                    </Badge>
                    <Badge variant="outline" className={`text-xs ${getDifficultyColor(tour.difficulty)}`}>
                      {getDifficultyLabel(tour.difficulty)}
                    </Badge>
                  </div>
                }
              >
                {/* Tour-specific content */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{tour.duration}</span>
                  </div>
                  {tour.guide.included && (
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span>Có hướng dẫn viên</span>
                    </div>
                  )}
                  <div className="flex items-center text-gray-600">
                    <Mountain className="w-4 h-4 mr-2" />
                    <span>{tour.mainDestination}</span>
                  </div>
                </div>
              </ServiceCard>
            ))}
          </div>

          {/* No Results */}
          {filteredTours.length === 0 && (
            <div className="text-center py-12">
              <MapIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Không tìm thấy tour nào
              </h3>
              <p className="text-gray-500">
                Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
              </p>
            </div>
          )}
        </div>
        </div>
      </div>
      
      <Footer />
    </Layout>
  );
};

export default TourPage;