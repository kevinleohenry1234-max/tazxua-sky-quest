import React, { useState, useMemo } from 'react';
import { AttractionCard } from './AttractionCard';
import { ATTRACTIONS_DATA, Attraction } from '../data/attractionsData';
import { Filter, Search } from 'lucide-react';

interface AttractionGridProps {
  onAttractionClick?: (attraction: Attraction) => void;
}

export const AttractionGrid: React.FC<AttractionGridProps> = ({ onAttractionClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = [
    { value: 'all', label: 'Tất cả', icon: '🌟' },
    { value: 'mountain', label: 'Núi', icon: '🏔️' },
    { value: 'forest', label: 'Rừng', icon: '🌲' },
    { value: 'viewpoint', label: 'Điểm ngắm', icon: '🌄' },
    { value: 'cultural', label: 'Văn hóa', icon: '🏛️' }
  ];

  const difficulties = [
    { value: 'all', label: 'Tất cả mức độ' },
    { value: 'easy', label: 'Dễ' },
    { value: 'medium', label: 'Trung bình' },
    { value: 'hard', label: 'Khó' }
  ];

  const filteredAttractions = useMemo(() => {
    return ATTRACTIONS_DATA.filter(attraction => {
      const matchesCategory = selectedCategory === 'all' || attraction.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || attraction.difficulty === selectedDifficulty;
      const matchesSearch = searchTerm === '' || 
        attraction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attraction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attraction.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesDifficulty && matchesSearch;
    });
  }, [selectedCategory, selectedDifficulty, searchTerm]);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Khám phá các địa điểm</h2>
        <p className="text-gray-600">Tìm hiểu sâu về vùng đất Tà Xùa qua từng câu chuyện và địa điểm nổi bật</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm kiếm địa điểm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        {/* Category Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Filter className="w-4 h-4 mr-1" />
            Loại địa điểm
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center ${
                  selectedCategory === category.value
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-1">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Mức độ khó</h3>
          <div className="flex flex-wrap gap-2">
            {difficulties.map((difficulty) => (
              <button
                key={difficulty.value}
                onClick={() => setSelectedDifficulty(difficulty.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedDifficulty === difficulty.value
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {difficulty.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-gray-600 text-sm">
          Tìm thấy <span className="font-semibold">{filteredAttractions.length}</span> địa điểm
        </p>
      </div>

      {/* Attractions Grid */}
      {filteredAttractions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAttractions.map((attraction) => (
            <AttractionCard
              key={attraction.id}
              attraction={attraction}
              onClick={() => onAttractionClick?.(attraction)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy địa điểm nào</h3>
          <p className="text-gray-600">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
        </div>
      )}
    </div>
  );
};