import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import SearchDashboard from '@/components/shared/SearchDashboard';
import ServiceCard from '@/components/shared/ServiceCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, UtensilsCrossed, DollarSign, Star } from 'lucide-react';
import { restaurantData, Restaurant } from '@/data/restaurantData';

const RestaurantPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'price'>('rating');

  // Filter options
  const cuisineTypes = [
    { value: 'all', label: 'Tất cả' },
    { value: 'Món H\'Mông truyền thống', label: 'Món H\'Mông' },
    { value: 'Cà phê & Đồ uống', label: 'Cà phê & Đồ uống' },
    { value: 'Lẩu nướng & Hải sản', label: 'Lẩu nướng' },
    { value: 'Món dân dã', label: 'Món dân dã' },
    { value: 'Ẩm thực cao cấp', label: 'Cao cấp' }
  ];

  const priceRanges = [
    { value: 'all', label: 'Tất cả mức giá' },
    { value: 'budget', label: 'Bình dân' },
    { value: 'mid', label: 'Trung bình' },
    { value: 'luxury', label: 'Cao cấp' }
  ];

  const amenityOptions = [
    'Chỗ đậu xe',
    'Wifi miễn phí',
    'Phù hợp gia đình',
    'View núi',
    'Phòng riêng',
    'Điều hòa'
  ];

  // Filter and sort restaurants
  const filteredRestaurants = useMemo(() => {
    let filtered = restaurantData.filter(restaurant => {
      // Search filter
      const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           restaurant.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           restaurant.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());

      // Cuisine filter
      const matchesCuisine = selectedCuisine === 'all' || restaurant.cuisine === selectedCuisine;

      // Price range filter
      const matchesPriceRange = selectedPriceRange === 'all' || restaurant.priceRange === selectedPriceRange;

      // Amenities filter
      const matchesAmenities = selectedAmenities.length === 0 || 
        selectedAmenities.every(amenity => restaurant.amenities.includes(amenity));

      return matchesSearch && matchesCuisine && matchesPriceRange && matchesAmenities;
    });

    // Sort restaurants
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name, 'vi');
        default:
          return b.rating - a.rating;
      }
    });

    return filtered;
  }, [searchTerm, selectedCuisine, selectedPriceRange, selectedAmenities, sortBy]);

  const handleBackToServices = () => {
    navigate('/accommodation');
  };

  const handleViewDetails = (id: string) => {
    // Navigate to restaurant detail page
    console.log('View restaurant details:', id);
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const clearFilters = () => {
    setSelectedCuisine('all');
    setSelectedPriceRange('all');
    setSelectedAmenities([]);
    setSortBy('rating');
  };

  const getPriceRangeLabel = (priceRange: string) => {
    switch (priceRange) {
      case 'budget': return 'Bình dân';
      case 'mid': return 'Trung bình';
      case 'luxury': return 'Cao cấp';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9FAF9' }}>
      <MainNavigation />
      <Header
        isLoggedIn={false}
        userName=""
        onLoginClick={() => {}}
        onRegisterClick={() => {}}
        onProfileClick={() => {}}
        onLogoutClick={() => {}}
      />
      
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
              <UtensilsCrossed className="w-8 h-8 mr-3 text-red-600" />
              Nhà hàng & Ẩm thực địa phương
            </h1>
            <p className="text-gray-600">Thưởng thức hương vị H'Mông và Shan Tuyết tại Tà Xùa</p>
          </div>
        </div>

        {/* Search Dashboard */}
        <SearchDashboard
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
          placeholder="Tìm kiếm nhà hàng, món ăn, địa điểm..."
        >
          {/* Custom Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Cuisine Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Loại hình</label>
              <select
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                {cuisineTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mức giá</label>
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sắp xếp theo</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'rating')}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="rating">Đánh giá cao nhất</option>
                <option value="name">Tên A-Z</option>
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <Button
                onClick={clearFilters}
                variant="outline"
                className="w-full"
              >
                Xóa bộ lọc
              </Button>
            </div>
          </div>

          {/* Amenities Filter */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Tiện ích</label>
            <div className="flex flex-wrap gap-2">
              {amenityOptions.map(amenity => (
                <Button
                  key={amenity}
                  onClick={() => toggleAmenity(amenity)}
                  variant={selectedAmenities.includes(amenity) ? "default" : "outline"}
                  size="sm"
                  className={selectedAmenities.includes(amenity) ? "bg-red-600 hover:bg-red-700" : ""}
                >
                  {amenity}
                </Button>
              ))}
            </div>
          </div>
        </SearchDashboard>

        {/* Results Count */}
        <div className="container mx-auto px-4 mb-6">
          <p className="text-gray-600">
            Tìm thấy <span className="font-semibold">{filteredRestaurants.length}</span> nhà hàng
          </p>
        </div>

        {/* Restaurant Grid */}
        <div className="container mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map(restaurant => (
              <ServiceCard
                key={restaurant.id}
                id={restaurant.id}
                name={restaurant.name}
                description={restaurant.description}
                location={restaurant.location}
                rating={restaurant.rating}
                images={restaurant.images}
                amenities={restaurant.amenities}
                features={restaurant.features}
                isPartner={restaurant.isPartner}
                onViewDetails={handleViewDetails}
                customBadges={
                  <div className="flex flex-wrap gap-1 mb-2">
                    <Badge variant="outline" className="text-xs border-red-200 text-red-700">
                      {restaurant.cuisine}
                    </Badge>
                    <Badge variant="outline" className="text-xs border-green-200 text-green-700">
                      {getPriceRangeLabel(restaurant.priceRange)}
                    </Badge>
                  </div>
                }
              >
                {/* Restaurant-specific content */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{restaurant.openHours}</span>
                  </div>
                  {restaurant.contact.phone && (
                    <div className="flex items-center text-gray-600">
                      <span className="w-4 h-4 mr-2">📞</span>
                      <span>{restaurant.contact.phone}</span>
                    </div>
                  )}
                </div>
              </ServiceCard>
            ))}
          </div>

          {/* No Results */}
          {filteredRestaurants.length === 0 && (
            <div className="text-center py-12">
              <UtensilsCrossed className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Không tìm thấy nhà hàng nào
              </h3>
              <p className="text-gray-500">
                Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
              </p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RestaurantPage;