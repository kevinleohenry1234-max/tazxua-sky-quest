import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import Footer from '@/components/Footer';
import SearchDashboard from '@/components/shared/SearchDashboard';
import ServiceCard from '@/components/shared/ServiceCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CarFront, Phone, CreditCard, MapPin, Clock, Globe } from 'lucide-react';
import { transportData, Transport } from '@/data/transportData';

const TransportPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState<string>('all');
  const [selectedRoute, setSelectedRoute] = useState<string>('all');
  const [selectedPayment, setSelectedPayment] = useState<string>('all');
  const [supportsForeigner, setSupportsForeigner] = useState<boolean | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'price'>('rating');

  // Filter options
  const serviceTypes = [
    { value: 'all', label: 'Tất cả' },
    { value: 'bus', label: 'Xe khách' },
    { value: 'motorbike_rental', label: 'Thuê xe máy' },
    { value: 'shuttle', label: 'Shuttle' },
    { value: 'private_driver', label: 'Tài xế riêng' },
    { value: 'taxi', label: 'Taxi' }
  ];

  const routes = [
    { value: 'all', label: 'Tất cả tuyến đường' },
    { value: 'hanoi', label: 'Từ Hà Nội' },
    { value: 'sapa', label: 'Từ Sapa' },
    { value: 'airport', label: 'Từ sân bay' },
    { value: 'local', label: 'Trong khu vực' }
  ];

  const paymentMethods = [
    { value: 'all', label: 'Tất cả hình thức' },
    { value: 'cash', label: 'Tiền mặt' },
    { value: 'transfer', label: 'Chuyển khoản' },
    { value: 'card', label: 'Thẻ tín dụng' },
    { value: 'paypal', label: 'PayPal' }
  ];

  // Filter and sort transports
  const filteredTransports = useMemo(() => {
    let filtered = transportData.filter(transport => {
      // Search filter
      const matchesSearch = transport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transport.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transport.route.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transport.route.to.toLowerCase().includes(searchTerm.toLowerCase());

      // Service type filter
      const matchesServiceType = selectedServiceType === 'all' || transport.serviceType === selectedServiceType;

      // Route filter
      let matchesRoute = true;
      if (selectedRoute !== 'all') {
        switch (selectedRoute) {
          case 'hanoi':
            matchesRoute = transport.route.from.toLowerCase().includes('hà nội');
            break;
          case 'sapa':
            matchesRoute = transport.route.from.toLowerCase().includes('sapa');
            break;
          case 'airport':
            matchesRoute = transport.route.from.toLowerCase().includes('sân bay');
            break;
          case 'local':
            matchesRoute = transport.route.from.toLowerCase().includes('tà xùa') || 
                          transport.route.to.toLowerCase().includes('tà xùa');
            break;
        }
      }

      // Payment method filter
      let matchesPayment = true;
      if (selectedPayment !== 'all') {
        switch (selectedPayment) {
          case 'cash':
            matchesPayment = transport.paymentMethods.some(method => method.toLowerCase().includes('tiền mặt'));
            break;
          case 'transfer':
            matchesPayment = transport.paymentMethods.some(method => method.toLowerCase().includes('chuyển khoản'));
            break;
          case 'card':
            matchesPayment = transport.paymentMethods.some(method => method.toLowerCase().includes('thẻ'));
            break;
          case 'paypal':
            matchesPayment = transport.paymentMethods.some(method => method.toLowerCase().includes('paypal'));
            break;
        }
      }

      // Foreigner support filter
      const matchesForeigner = supportsForeigner === null || transport.supportsForeigner === supportsForeigner;

      return matchesSearch && matchesServiceType && matchesRoute && matchesPayment && matchesForeigner;
    });

    // Sort transports
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name, 'vi');
        case 'price':
          // Simple price comparison (extract numbers)
          const priceA = a.price ? parseInt(a.price.replace(/[^\d]/g, '')) : 0;
          const priceB = b.price ? parseInt(b.price.replace(/[^\d]/g, '')) : 0;
          return priceA - priceB;
        default:
          return b.rating - a.rating;
      }
    });

    return filtered;
  }, [searchTerm, selectedServiceType, selectedRoute, selectedPayment, supportsForeigner, sortBy]);

  const handleBackToServices = () => {
    navigate('/accommodation');
  };

  const handleViewDetails = (id: string) => {
    // Navigate to transport detail page
    console.log('View transport details:', id);
  };

  const clearFilters = () => {
    setSelectedServiceType('all');
    setSelectedRoute('all');
    setSelectedPayment('all');
    setSupportsForeigner(null);
    setSortBy('rating');
  };

  const getServiceTypeLabel = (serviceType: string) => {
    switch (serviceType) {
      case 'bus': return 'Xe khách';
      case 'motorbike_rental': return 'Thuê xe máy';
      case 'shuttle': return 'Shuttle';
      case 'private_driver': return 'Tài xế riêng';
      case 'taxi': return 'Taxi';
      default: return serviceType;
    }
  };

  const getServiceTypeColor = (serviceType: string) => {
    switch (serviceType) {
      case 'bus': return 'border-blue-200 text-blue-700';
      case 'motorbike_rental': return 'border-green-200 text-green-700';
      case 'shuttle': return 'border-purple-200 text-purple-700';
      case 'private_driver': return 'border-yellow-200 text-yellow-700';
      case 'taxi': return 'border-red-200 text-red-700';
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
              <CarFront className="w-8 h-8 mr-3 text-purple-600" />
              Di chuyển
            </h1>
            <p className="text-gray-600">Tự do khám phá Tà Xùa và kết nối liên tuyến</p>
          </div>
        </div>

        {/* Search Dashboard */}
        <SearchDashboard
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
          placeholder="Tìm kiếm phương tiện, tuyến đường..."
        >
          {/* Custom Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Service Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Loại hình</label>
              <select
                value={selectedServiceType}
                onChange={(e) => setSelectedServiceType(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {serviceTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Route Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tuyến đường</label>
              <select
                value={selectedRoute}
                onChange={(e) => setSelectedRoute(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {routes.map(route => (
                  <option key={route.value} value={route.value}>{route.label}</option>
                ))}
              </select>
            </div>

            {/* Payment Method Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Thanh toán</label>
              <select
                value={selectedPayment}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {paymentMethods.map(method => (
                  <option key={method.value} value={method.value}>{method.label}</option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sắp xếp theo</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'rating' | 'price')}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="rating">Đánh giá cao nhất</option>
                <option value="name">Tên A-Z</option>
                <option value="price">Giá thấp nhất</option>
              </select>
            </div>
          </div>

          {/* Foreigner Support Filter */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Hỗ trợ khách nước ngoài</label>
            <div className="flex gap-2">
              <Button
                onClick={() => setSupportsForeigner(null)}
                variant={supportsForeigner === null ? "default" : "outline"}
                size="sm"
                className={supportsForeigner === null ? "bg-purple-600 hover:bg-purple-700" : ""}
              >
                Tất cả
              </Button>
              <Button
                onClick={() => setSupportsForeigner(true)}
                variant={supportsForeigner === true ? "default" : "outline"}
                size="sm"
                className={supportsForeigner === true ? "bg-purple-600 hover:bg-purple-700" : ""}
              >
                Có hỗ trợ
              </Button>
              <Button
                onClick={() => setSupportsForeigner(false)}
                variant={supportsForeigner === false ? "default" : "outline"}
                size="sm"
                className={supportsForeigner === false ? "bg-purple-600 hover:bg-purple-700" : ""}
              >
                Không hỗ trợ
              </Button>
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
            Tìm thấy <span className="font-semibold">{filteredTransports.length}</span> dịch vụ di chuyển
          </p>
        </div>

        {/* Transport Grid */}
        <div className="container mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTransports.map(transport => (
              <ServiceCard
                key={transport.id}
                id={transport.id}
                name={transport.name}
                description={transport.description}
                location={`${transport.route.from} → ${transport.route.to}`}
                rating={transport.rating}
                images={transport.images}
                price={transport.price}
                amenities={transport.amenities}
                features={transport.features}
                isPartner={transport.isPartner}
                onViewDetails={handleViewDetails}
                customBadges={
                  <div className="flex flex-wrap gap-1 mb-2">
                    <Badge variant="outline" className={`text-xs ${getServiceTypeColor(transport.serviceType)}`}>
                      {getServiceTypeLabel(transport.serviceType)}
                    </Badge>
                    {transport.supportsForeigner && (
                      <Badge variant="outline" className="text-xs border-green-200 text-green-700">
                        <Globe className="w-3 h-3 mr-1" />
                        Hỗ trợ nước ngoài
                      </Badge>
                    )}
                  </div>
                }
              >
                {/* Transport-specific content */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{transport.route.from} → {transport.route.to}</span>
                  </div>
                  {transport.schedule && (
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{transport.schedule}</span>
                    </div>
                  )}
                  {transport.contact.phone && (
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>{transport.contact.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center text-gray-600">
                    <CreditCard className="w-4 h-4 mr-2" />
                    <span>{transport.paymentMethods.slice(0, 2).join(', ')}</span>
                    {transport.paymentMethods.length > 2 && (
                      <span className="text-xs text-gray-500 ml-1">
                        +{transport.paymentMethods.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </ServiceCard>
            ))}
          </div>

          {/* No Results */}
          {filteredTransports.length === 0 && (
            <div className="text-center py-12">
              <CarFront className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Không tìm thấy dịch vụ di chuyển nào
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

export default TransportPage;