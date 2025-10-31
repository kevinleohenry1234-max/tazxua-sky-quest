import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { Search, Filter, MapPin, Star, Clock, Users, ArrowLeft, ChevronLeft, ChevronRight, Grid, List, SlidersHorizontal, Loader2, Grid3X3, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import MainNavigation from '@/components/MainNavigation';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';
import LazyImage from '@/components/LazyImage';

interface SearchResult {
  id: string;
  title: string;
  type: string;
  description: string;
  price?: number;
  rating?: number;
  distance?: number;
  image?: string;
  location?: string;
  features?: string[];
}

interface SearchData {
  query: string;
  category: string;
  checkIn?: Date;
  checkOut?: Date;
  guests: number;
  advancedFilters?: {
    priceRange?: [number, number];
    rating?: number;
    distance?: number;
    features?: string[];
  };
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const SearchResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State from navigation or URL params
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searchData, setSearchData] = useState<SearchData | null>(null);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 10, total: 0, totalPages: 0 });
  const [executionTime, setExecutionTime] = useState<number>(0);
  
  // UI State
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter state
  const [filterType, setFilterType] = useState('all');
  const [filterRating, setFilterRating] = useState(0);
  const [filterPriceRange, setFilterPriceRange] = useState<[number, number]>([0, 5000000]);

  useEffect(() => {
    // Get data from navigation state or URL params
    if (location.state) {
      const { searchData: navSearchData, results: navResults, pagination: navPagination, executionTime: navTime } = location.state;
      setSearchData(navSearchData);
      setResults(navResults || []);
      setPagination(navPagination || { page: 1, limit: 10, total: 0, totalPages: 0 });
      setExecutionTime(navTime || 0);
    } else {
      // Parse URL params and perform search
      const query = searchParams.get('q') || '';
      const type = searchParams.get('type') || 'all';
      const page = parseInt(searchParams.get('page') || '1');
      
      if (query || type !== 'all') {
        performSearch({ query, category: type, guests: 1 }, page);
      }
    }
  }, [location.state, searchParams]);

  const performSearch = async (searchData: SearchData, page: number = 1) => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      
      if (searchData.query) params.append('q', searchData.query);
      if (searchData.category && searchData.category !== 'all') params.append('type', searchData.category);
      if (searchData.guests > 1) params.append('guests', searchData.guests.toString());
      
      // Apply current filters
      if (filterType !== 'all') params.append('type', filterType);
      if (filterRating > 0) params.append('minRating', filterRating.toString());
      if (filterPriceRange[0] > 0 || filterPriceRange[1] < 5000000) {
        params.append('minPrice', filterPriceRange[0].toString());
        params.append('maxPrice', filterPriceRange[1].toString());
      }
      
      params.append('limit', '10');
      params.append('page', page.toString());
      params.append('sort', sortBy);

      const response = await fetch(`http://localhost:3001/api/search?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
      }
      
      const data = await response.json();
      setResults(data.results || []);
      setPagination(data.pagination || { page: 1, limit: 10, total: 0, totalPages: 0 });
      setExecutionTime(data.executionTime || 0);
      setSearchData(searchData);
      
      // Update URL
      const newParams = new URLSearchParams();
      if (searchData.query) newParams.set('q', searchData.query);
      if (searchData.category !== 'all') newParams.set('type', searchData.category);
      if (page > 1) newParams.set('page', page.toString());
      setSearchParams(newParams);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tìm kiếm');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (searchData) {
      performSearch(searchData, newPage);
    }
  };

  const handleFilterChange = () => {
    if (searchData) {
      performSearch(searchData, 1);
    }
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    if (searchData) {
      performSearch(searchData, 1);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getTypeLabel = (type: string) => {
    const typeMap: { [key: string]: string } = {
      accommodation: 'Chỗ ở',
      restaurant: 'Ẩm thực',
      tour: 'Tour',
      transport: 'Di chuyển',
      attraction: 'Trải nghiệm'
    };
    return typeMap[type] || type;
  };

  const getTypeColor = (type: string) => {
    const colorMap: { [key: string]: string } = {
      accommodation: 'bg-blue-100 text-blue-800',
      restaurant: 'bg-orange-100 text-orange-800',
      tour: 'bg-green-100 text-green-800',
      transport: 'bg-purple-100 text-purple-800',
      attraction: 'bg-pink-100 text-pink-800'
    };
    return colorMap[type] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading && results.length === 0) {
    return (
      <Layout>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-gray-600">Đang tìm kiếm...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Header />
      
      <main className="min-h-screen bg-gray-50 pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Quay lại
              </Button>
              
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900">
                  Kết quả tìm kiếm
                  {searchData?.query && (
                    <span className="text-primary"> cho "{searchData.query}"</span>
                  )}
                </h1>
                <p className="text-gray-600 mt-1">
                  Tìm thấy {pagination.total} kết quả trong {executionTime}ms
                </p>
              </div>
            </div>

            {/* Search Summary */}
            {searchData && (
              <div className="flex flex-wrap gap-2 mb-4">
                {searchData.query && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Search className="w-3 h-3" />
                    {searchData.query}
                  </Badge>
                )}
                {searchData.category !== 'all' && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Filter className="w-3 h-3" />
                    {getTypeLabel(searchData.category)}
                  </Badge>
                )}
                {searchData.guests > 1 && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {searchData.guests} người
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex items-center gap-4 flex-1">
              {/* View Mode Toggle */}
              <div className="flex items-center border rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="px-3"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="px-3"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              {/* Sort */}
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sắp xếp theo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Liên quan nhất</SelectItem>
                  <SelectItem value="price_asc">Giá thấp đến cao</SelectItem>
                  <SelectItem value="price_desc">Giá cao đến thấp</SelectItem>
                  <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
                  <SelectItem value="distance">Khoảng cách gần nhất</SelectItem>
                </SelectContent>
              </Select>

              {/* Filters Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Bộ lọc
              </Button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Loại dịch vụ</label>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="accommodation">Chỗ ở</SelectItem>
                      <SelectItem value="restaurant">Ẩm thực</SelectItem>
                      <SelectItem value="tour">Tour</SelectItem>
                      <SelectItem value="transport">Di chuyển</SelectItem>
                      <SelectItem value="attraction">Trải nghiệm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Đánh giá tối thiểu</label>
                  <Select value={filterRating.toString()} onValueChange={(value) => setFilterRating(Number(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Tất cả</SelectItem>
                      <SelectItem value="3">3+ sao</SelectItem>
                      <SelectItem value="4">4+ sao</SelectItem>
                      <SelectItem value="4.5">4.5+ sao</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Button onClick={handleFilterChange} className="mt-6 w-full">
                    Áp dụng bộ lọc
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Results */}
          {results.length === 0 && !isLoading ? (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy kết quả</h3>
              <p className="text-gray-600 mb-6">Hãy thử tìm kiếm với từ khóa khác hoặc điều chỉnh bộ lọc</p>
              <Button onClick={() => navigate('/')} variant="outline">
                Quay về trang chủ
              </Button>
            </div>
          ) : (
            <>
              {/* Results Grid/List */}
              <div className={`${
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                  : 'space-y-4'
              } mb-8`}>
                {results.map((result) => (
                  <div
                    key={result.id}
                    className={`bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer ${
                      viewMode === 'list' ? 'flex gap-4 p-4' : 'overflow-hidden'
                    }`}
                    onClick={() => navigate(`/${result.type}/${result.id}`)}
                  >
                    {/* Image */}
                    <div className={viewMode === 'list' ? 'w-48 h-32 flex-shrink-0' : 'h-48'}>
                      <LazyImage
                        src={result.image || '/placeholder-image.jpg'}
                        alt={result.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Content */}
                    <div className={viewMode === 'list' ? 'flex-1' : 'p-4'}>
                      <div className="flex items-start justify-between mb-2">
                        <Badge className={`text-xs ${getTypeColor(result.type)}`}>
                          {getTypeLabel(result.type)}
                        </Badge>
                        {result.rating && (
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            {result.rating}
                          </div>
                        )}
                      </div>

                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {result.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {result.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          {result.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {result.location}
                            </div>
                          )}
                          {result.distance && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {result.distance}km
                            </div>
                          )}
                        </div>

                        {result.price && (
                          <div className="font-semibold text-primary">
                            {formatPrice(result.price)}
                          </div>
                        )}
                      </div>

                      {/* Features */}
                      {result.features && result.features.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {result.features.slice(0, 3).map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {result.features.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{result.features.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page <= 1 || isLoading}
                  >
                    Trước
                  </Button>
                  
                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <Button
                        key={page}
                        variant={page === pagination.page ? 'default' : 'outline'}
                        onClick={() => handlePageChange(page)}
                        disabled={isLoading}
                        className="w-10"
                      >
                        {page}
                      </Button>
                    );
                  })}
                  
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page >= pagination.totalPages || isLoading}
                  >
                    Sau
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default SearchResults;