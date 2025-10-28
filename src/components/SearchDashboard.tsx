import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  MapPin, 
  Activity, 
  Home,
  ChevronDown,
  ArrowRight,
  Calendar,
  Users,
  Car,
  UtensilsCrossed,
  Compass,
  Filter,
  X
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface SearchDashboardProps {
  onSearch: (searchData: SearchData) => void;
  className?: string;
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

const SearchDashboard: React.FC<SearchDashboardProps> = ({ onSearch, className = '' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [guests, setGuests] = useState(1);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  const [minRating, setMinRating] = useState(0);
  const [maxDistance, setMaxDistance] = useState(50);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const categories = [
    { 
      id: 'all', 
      label: 'Tất cả', 
      icon: Search,
      placeholder: 'Bạn muốn khám phá điều gì?'
    },
    { 
      id: 'accommodation', 
      label: 'Chỗ ở', 
      icon: Home,
      placeholder: 'Tìm homestay, khách sạn tại Tà Xùa…'
    },
    { 
      id: 'food', 
      label: 'Ẩm thực', 
      icon: UtensilsCrossed,
      placeholder: 'Tìm món ăn, quán ăn, đặc sản địa phương…'
    },
    { 
      id: 'tour', 
      label: 'Tour', 
      icon: Compass,
      placeholder: 'Tìm tour khám phá Tà Xùa hoặc hướng dẫn viên…'
    },
    { 
      id: 'transport', 
      label: 'Di chuyển', 
      icon: Car,
      placeholder: 'Tìm chuyến xe đến Tà Xùa…'
    },
    { 
      id: 'experience', 
      label: 'Trải nghiệm', 
      icon: Activity,
      placeholder: 'Tìm trải nghiệm âm nhạc, triển lãm, hoạt động…'
    },
  ];

  const features = [
    'View núi', 'Gần trung tâm', 'Có bãi đậu xe', 'WiFi miễn phí', 
    'Phù hợp gia đình', 'Cho phép thú cưng', 'Có bể bơi', 'Có spa'
  ];

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory) || categories[0];
  const CategoryIcon = selectedCategoryData.icon;
  const showDatePicker = selectedCategory === 'accommodation' || selectedCategory === 'tour';

  const handleSearch = () => {
    const searchData: SearchData = {
      query: searchQuery,
      category: selectedCategory,
      guests,
      ...(checkInDate && { checkIn: checkInDate }),
      ...(checkOutDate && { checkOut: checkOutDate }),
      ...(showAdvancedFilters && {
        advancedFilters: {
          priceRange,
          rating: minRating,
          distance: maxDistance,
          features: selectedFeatures
        }
      })
    };
    onSearch(searchData);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  return (
    <div className={`w-full max-w-6xl mx-auto ${className}`}>
      {/* Main Search Dashboard */}
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-white/20 p-4 shadow-2xl">
        {/* Primary Search Row */}
        <div className="flex flex-col lg:flex-row gap-3 mb-4">
          {/* Category Selector */}
          <div className="lg:w-48">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full flex items-center gap-3 px-4 py-3 h-12 rounded-xl hover:bg-primary/5 transition-all duration-300 justify-start border border-gray-200"
                >
                  <CategoryIcon className="w-5 h-5 text-primary" />
                  <span className="font-medium text-foreground text-sm">
                    {selectedCategoryData.label}
                  </span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground ml-auto" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 bg-white/95 backdrop-blur-xl border border-white/20">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <DropdownMenuItem
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-primary/5 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-primary" />
                      <span className="font-medium">{category.label}</span>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Search Input */}
          <div className="flex-1 relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder={selectedCategoryData.placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-12 pr-4 py-3 h-12 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-sm"
              />
            </div>
          </div>

          {/* Date Picker (Conditional) */}
          {showDatePicker && (
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-40 justify-start text-left font-normal h-12 rounded-xl border-gray-200"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {checkInDate ? format(checkInDate, 'dd/MM', { locale: vi }) : 'Ngày bắt đầu'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={checkInDate}
                    onSelect={setCheckInDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-40 justify-start text-left font-normal h-12 rounded-xl border-gray-200"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {checkOutDate ? format(checkOutDate, 'dd/MM', { locale: vi }) : 'Ngày kết thúc'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={checkOutDate}
                    onSelect={setCheckOutDate}
                    disabled={(date) => date < (checkInDate || new Date())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}

          {/* Guest Selector */}
          <div className="w-32">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full flex items-center gap-2 px-4 py-3 h-12 rounded-xl border-gray-200 justify-start"
                >
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{guests} người</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white/95 backdrop-blur-xl border border-white/20">
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Số người</span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="w-8 h-8 p-0"
                      >
                        -
                      </Button>
                      <span className="w-8 text-center text-sm">{guests}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setGuests(guests + 1)}
                        className="w-8 h-8 p-0"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Search Button */}
          <Button 
            onClick={handleSearch}
            className="px-8 py-3 h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            <span>Khám phá ngay</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Advanced Filters Toggle */}
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="text-sm text-gray-600 hover:text-primary flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Bộ lọc nâng cao
            <ChevronDown className={`w-4 h-4 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
          </Button>
        </div>

        {/* Advanced Filters Panel */}
        {showAdvancedFilters && (
          <div className="mt-4 p-4 bg-gray-50/50 rounded-xl border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Giá (VNĐ)</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Từ"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="text-xs"
                  />
                  <span className="text-gray-400">-</span>
                  <Input
                    type="number"
                    placeholder="Đến"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="text-xs"
                  />
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Đánh giá tối thiểu</label>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                >
                  <option value={0}>Tất cả</option>
                  <option value={3}>3+ sao</option>
                  <option value={4}>4+ sao</option>
                  <option value={4.5}>4.5+ sao</option>
                </select>
              </div>

              {/* Distance */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Khoảng cách (km)</label>
                <Input
                  type="number"
                  placeholder="Tối đa"
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(Number(e.target.value))}
                  className="text-sm"
                />
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Đặc điểm</label>
                <div className="flex flex-wrap gap-1">
                  {features.slice(0, 4).map((feature) => (
                    <button
                      key={feature}
                      onClick={() => toggleFeature(feature)}
                      className={`px-2 py-1 text-xs rounded-full border transition-colors ${
                        selectedFeatures.includes(feature)
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-primary'
                      }`}
                    >
                      {feature}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDashboard;