import React, { useState, useMemo } from 'react';
import { HomestayReal } from '../data/homestayRealData';
import HotelCard from './HotelCard';
import { Search, Filter, Star, MapPin, DollarSign, SlidersHorizontal } from 'lucide-react';

interface HotelGridProps {
  hotels: HomestayReal[];
}

const HotelGrid: React.FC<HotelGridProps> = ({ hotels }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'price'>('name');
  const [filterByRating, setFilterByRating] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<'all' | 'budget' | 'mid' | 'luxury'>('all');

  // Extract price number from price string for comparison
  const extractPrice = (priceStr: string): number => {
    if (!priceStr) return 0;
    const numStr = priceStr.replace(/[^\d]/g, '');
    return parseInt(numStr) || 0;
  };

  // Filter and sort hotels
  const filteredAndSortedHotels = useMemo(() => {
    let filtered = hotels.filter(hotel => {
      // Search filter
      const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           hotel.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           hotel.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Rating filter
      const matchesRating = filterByRating === 0 || hotel.rating >= filterByRating;

      // Price range filter
      let matchesPrice = true;
      if (priceRange !== 'all' && hotel.price) {
        const price = extractPrice(hotel.price);
        switch (priceRange) {
          case 'budget':
            matchesPrice = price < 800000;
            break;
          case 'mid':
            matchesPrice = price >= 800000 && price < 1500000;
            break;
          case 'luxury':
            matchesPrice = price >= 1500000;
            break;
        }
      }

      return matchesSearch && matchesRating && matchesPrice;
    });

    // Sort hotels
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          const priceA = extractPrice(a.price);
          const priceB = extractPrice(b.price);
          if (priceA === 0 && priceB === 0) return 0;
          if (priceA === 0) return 1;
          if (priceB === 0) return -1;
          return priceA - priceB;
        case 'name':
        default:
          return a.name.localeCompare(b.name, 'vi');
      }
    });

    return filtered;
  }, [hotels, searchTerm, sortBy, filterByRating, priceRange]);

  const clearFilters = () => {
    setSearchTerm('');
    setSortBy('name');
    setFilterByRating(0);
    setPriceRange('all');
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm homestay theo tên, địa điểm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span>Bộ lọc</span>
          </button>
        </div>

        {/* Expandable Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sắp xếp theo:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'rating' | 'price')}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="name">Tên A-Z</option>
                  <option value="rating">Đánh giá cao nhất</option>
                  <option value="price">Giá thấp nhất</option>
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Đánh giá tối thiểu:
                </label>
                <select
                  value={filterByRating}
                  onChange={(e) => setFilterByRating(Number(e.target.value))}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value={0}>Tất cả</option>
                  <option value={7}>7+ sao</option>
                  <option value={8}>8+ sao</option>
                  <option value={9}>9+ sao</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Khoảng giá:
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value as 'all' | 'budget' | 'mid' | 'luxury')}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Tất cả</option>
                  <option value="budget">Dưới 800k</option>
                  <option value="mid">800k - 1.5M</option>
                  <option value="luxury">Trên 1.5M</option>
                </select>
              </div>
            </div>

            {/* Clear Filters */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 underline"
              >
                Xóa tất cả bộ lọc
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="text-gray-600">
          Hiển thị <span className="font-semibold text-gray-800">{filteredAndSortedHotels.length}</span> trong tổng số{' '}
          <span className="font-semibold text-gray-800">{hotels.length}</span> homestay
        </div>
        
        {/* Active Filters */}
        <div className="flex items-center space-x-2">
          {searchTerm && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Tìm kiếm: "{searchTerm}"
              <button
                onClick={() => setSearchTerm('')}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          )}
          {filterByRating > 0 && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              <Star className="w-3 h-3 mr-1" />
              {filterByRating}+ sao
              <button
                onClick={() => setFilterByRating(0)}
                className="ml-2 text-yellow-600 hover:text-yellow-800"
              >
                ×
              </button>
            </span>
          )}
          {priceRange !== 'all' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <DollarSign className="w-3 h-3 mr-1" />
              {priceRange === 'budget' && 'Dưới 800k'}
              {priceRange === 'mid' && '800k-1.5M'}
              {priceRange === 'luxury' && 'Trên 1.5M'}
              <button
                onClick={() => setPriceRange('all')}
                className="ml-2 text-green-600 hover:text-green-800"
              >
                ×
              </button>
            </span>
          )}
        </div>
      </div>

      {/* Hotels Grid */}
      {filteredAndSortedHotels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Không tìm thấy homestay nào
          </h3>
          <p className="text-gray-500 mb-4">
            Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc để xem thêm kết quả.
          </p>
          <button
            onClick={clearFilters}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Filter className="w-4 h-4 mr-2" />
            Xóa tất cả bộ lọc
          </button>
        </div>
      )}
    </div>
  );
};

export default HotelGrid;