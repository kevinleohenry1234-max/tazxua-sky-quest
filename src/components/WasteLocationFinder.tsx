import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Trash2, 
  MapPin, 
  Navigation, 
  ExternalLink, 
  Loader2, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Locate
} from 'lucide-react';
import { wasteLocationApi, gpsUtils, type WasteLocation } from '@/services/safetyApi';

const WasteLocationFinder: React.FC = () => {
  const [locations, setLocations] = useState<WasteLocation[]>([]);
  const [loading, setLoading] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | 'info' | null;
    message: string;
  }>({ type: null, message: '' });

  // Get waste location type badge
  const getTypeBadge = (type: WasteLocation['type']) => {
    const typeMap = {
      recycling: { label: 'Tái chế', color: 'bg-green-100 text-green-800' },
      general: { label: 'Rác thải', color: 'bg-gray-100 text-gray-800' },
      organic: { label: 'Hữu cơ', color: 'bg-brown-100 text-brown-800' }
    };
    return typeMap[type] || { label: 'Khác', color: 'bg-gray-100 text-gray-800' };
  };

  // Get capacity badge
  const getCapacityBadge = (capacity: WasteLocation['capacity']) => {
    const capacityMap = {
      low: { label: 'Gần đầy', color: 'bg-red-100 text-red-800', icon: AlertTriangle },
      medium: { label: 'Trung bình', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      high: { label: 'Còn trống', color: 'bg-green-100 text-green-800', icon: CheckCircle }
    };
    return capacityMap[capacity] || { label: 'Không rõ', color: 'bg-gray-100 text-gray-800', icon: AlertTriangle };
  };

  // Find nearest waste locations
  const findNearestLocations = async () => {
    try {
      setGettingLocation(true);
      setStatus({ type: 'info', message: 'Đang lấy vị trí hiện tại...' });

      // Get current GPS location
      const position = await gpsUtils.getCurrentPosition();
      setUserLocation(position);

      setLoading(true);
      setStatus({ type: 'info', message: 'Đang tìm điểm bỏ rác gần nhất...' });

      // Find nearest waste locations
      const nearestLocations = await wasteLocationApi.findNearestWasteLocations(
        position.lat,
        position.lng,
        3
      );

      setLocations(nearestLocations);
      
      if (nearestLocations.length > 0) {
        setStatus({
          type: 'success',
          message: `Đã tìm thấy ${nearestLocations.length} điểm bỏ rác gần nhất`
        });
      } else {
        setStatus({
          type: 'error',
          message: 'Không tìm thấy điểm bỏ rác nào trong khu vực'
        });
      }

    } catch (error) {
      console.error('Waste location finder error:', error);
      setStatus({
        type: 'error',
        message: 'Không thể tìm điểm bỏ rác. Vui lòng kiểm tra quyền truy cập GPS và thử lại.'
      });
    } finally {
      setGettingLocation(false);
      setLoading(false);
    }
  };

  // Open Google Maps
  const openGoogleMaps = (location: WasteLocation) => {
    const mapsUrl = wasteLocationApi.generateGoogleMapsLink(location);
    window.open(mapsUrl, '_blank');
  };

  // Format distance
  const formatDistance = (distance: number) => {
    if (distance < 1000) {
      return `${Math.round(distance)}m`;
    } else {
      return `${(distance / 1000).toFixed(1)}km`;
    }
  };

  // Format last updated
  const formatLastUpdated = (lastUpdated: string) => {
    const date = new Date(lastUpdated);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) {
      return 'Vừa cập nhật';
    } else if (diffHours < 24) {
      return `${diffHours} giờ trước`;
    } else {
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays} ngày trước`;
    }
  };

  return (
    <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-green-700">
          <Trash2 className="w-5 h-5" />
          Tìm điểm bỏ rác gần nhất
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Status Alert */}
        {status.type && (
          <Alert className={
            status.type === 'success' ? 'border-green-200 bg-green-50' :
            status.type === 'error' ? 'border-red-200 bg-red-50' :
            'border-blue-200 bg-blue-50'
          }>
            {status.type === 'success' ? <CheckCircle className="w-4 h-4" /> :
             status.type === 'error' ? <AlertTriangle className="w-4 h-4" /> :
             <Loader2 className="w-4 h-4 animate-spin" />}
            <AlertDescription className={
              status.type === 'success' ? 'text-green-800' :
              status.type === 'error' ? 'text-red-800' :
              'text-blue-800'
            }>
              {status.message}
            </AlertDescription>
          </Alert>
        )}

        {/* Find Button */}
        <Button
          onClick={findNearestLocations}
          disabled={loading || gettingLocation}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          {gettingLocation || loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              {gettingLocation ? 'Đang lấy vị trí...' : 'Đang tìm kiếm...'}
            </>
          ) : (
            <>
              <Locate className="w-4 h-4 mr-2" />
              Tìm điểm bỏ rác gần nhất
            </>
          )}
        </Button>

        {/* User Location Display */}
        {userLocation && (
          <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded flex items-center gap-2">
            <MapPin className="w-3 h-3" />
            <span>
              Vị trí hiện tại: {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}
            </span>
          </div>
        )}

        {/* Waste Locations List */}
        {locations.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-green-700 flex items-center gap-2">
              <Navigation className="w-4 h-4" />
              Điểm bỏ rác gần nhất
            </h4>
            
            {locations.map((location, index) => {
              const typeBadge = getTypeBadge(location.type);
              const capacityBadge = getCapacityBadge(location.capacity);
              const CapacityIcon = capacityBadge.icon;

              return (
                <div
                  key={location.id}
                  className="bg-white/70 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-800">
                          {index + 1}. {location.name}
                        </span>
                        <Badge className={typeBadge.color}>
                          {typeBadge.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{location.address}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">
                        {formatDistance(location.distance)}
                      </div>
                    </div>
                  </div>

                  {/* Status and Info */}
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={`${capacityBadge.color} flex items-center gap-1`}>
                      <CapacityIcon className="w-3 h-3" />
                      {capacityBadge.label}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      Cập nhật: {formatLastUpdated(location.lastUpdated)}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => openGoogleMaps(location)}
                      variant="outline"
                      size="sm"
                      className="flex-1 flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Mở Google Maps
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Instructions */}
        <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded-lg">
          <p className="font-medium mb-1">💡 Hướng dẫn sử dụng:</p>
          <ul className="space-y-1">
            <li>• Nhấn "Tìm điểm bỏ rác gần nhất" để định vị GPS</li>
            <li>• Hệ thống sẽ hiển thị 3 điểm gần nhất</li>
            <li>• Nhấn "Mở Google Maps" để xem đường đi</li>
            <li>• Kiểm tra trạng thái thùng rác trước khi đến</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default WasteLocationFinder;