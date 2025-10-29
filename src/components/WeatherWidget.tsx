import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Cloud, 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge,
  Sun,
  CloudRain,
  CloudSnow,
  Zap,
  AlertTriangle,
  Loader2,
  WifiOff
} from 'lucide-react';
import { weatherApi, type WeatherData, type WeatherAlert } from '@/services/safetyApi';
import { useErrorHandler } from '@/utils/errorHandler';

// Weather icon mapping
const getWeatherIcon = (description: string) => {
  const desc = description.toLowerCase();
  if (desc.includes('mưa') || desc.includes('rain')) return CloudRain;
  if (desc.includes('tuyết') || desc.includes('snow')) return CloudSnow;
  if (desc.includes('sương') || desc.includes('mist') || desc.includes('fog')) return Cloud;
  if (desc.includes('bão') || desc.includes('storm')) return Zap;
  if (desc.includes('nắng') || desc.includes('sunny') || desc.includes('clear')) return Sun;
  return Cloud;
};

// Alert severity colors
const getAlertColor = (severity: WeatherAlert['severity']) => {
  switch (severity) {
    case 'extreme': return 'bg-red-100 border-red-500 text-red-800';
    case 'high': return 'bg-orange-100 border-orange-500 text-orange-800';
    case 'medium': return 'bg-yellow-100 border-yellow-500 text-yellow-800';
    case 'low': return 'bg-blue-100 border-blue-500 text-blue-800';
    default: return 'bg-gray-100 border-gray-500 text-gray-800';
  }
};

const WeatherWidget: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const { withErrorHandling } = useErrorHandler();

  // Fetch weather data
  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    
    const result = await withErrorHandling(
      () => weatherApi.getCurrentWeather(),
      'WeatherWidget - fetchWeatherData'
    );

    if (result) {
      setWeatherData(result);
      setLastUpdated(new Date());
    } else {
      setError('Không thể tải dữ liệu thời tiết. Đang hiển thị dữ liệu dự phòng.');
    }
    
    setLoading(false);
  };

  // Initial load and periodic refresh
  useEffect(() => {
    fetchWeatherData();
    
    // Refresh every 10 minutes
    const interval = setInterval(fetchWeatherData, 10 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Loading state
  if (loading) {
    return (
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Cloud className="w-5 h-5" />
            Thời tiết Tà Xùa
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <div className="flex items-center gap-2 text-blue-600">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Đang tải dữ liệu thời tiết...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (error && !weatherData) {
    return (
      <Card className="border-red-200 bg-gradient-to-br from-red-50 to-white">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-red-700">
            <WifiOff className="w-5 h-5" />
            Thời tiết Tà Xùa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="border-red-200">
            <AlertTriangle className="w-4 h-4" />
            <AlertDescription>
              {error}
              <button 
                onClick={fetchWeatherData}
                className="ml-2 text-red-600 underline hover:text-red-800"
              >
                Thử lại
              </button>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (!weatherData) return null;

  const WeatherIcon = getWeatherIcon(weatherData.description);

  return (
    <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-blue-700">
          <div className="flex items-center gap-2">
            <Cloud className="w-5 h-5" />
            Thời tiết Tà Xùa
          </div>
          {lastUpdated && (
            <span className="text-xs text-blue-500 font-normal">
              Cập nhật: {lastUpdated.toLocaleTimeString('vi-VN')}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Error notification if using fallback data */}
        {error && (
          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertTriangle className="w-4 h-4" />
            <AlertDescription className="text-yellow-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Weather Alerts */}
        {weatherData.alerts && weatherData.alerts.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-red-700 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Cảnh báo thời tiết
            </h4>
            {weatherData.alerts.map((alert) => (
              <Alert key={alert.id} className={getAlertColor(alert.severity)}>
                <AlertDescription>
                  <div className="font-semibold">{alert.title}</div>
                  <div className="text-sm mt-1">{alert.description}</div>
                  <div className="text-xs mt-2 opacity-75">
                    {new Date(alert.startTime).toLocaleString('vi-VN')} - {new Date(alert.endTime).toLocaleString('vi-VN')}
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        {/* Main Weather Display */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
              <WeatherIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-900">
                {weatherData.temperature}°C
              </div>
              <div className="text-blue-600 font-medium">
                {weatherData.description}
              </div>
            </div>
          </div>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex items-center gap-2 p-3 bg-white/50 rounded-lg">
            <Droplets className="w-4 h-4 text-blue-500" />
            <div>
              <div className="text-xs text-gray-600">Độ ẩm</div>
              <div className="font-semibold text-blue-900">{weatherData.humidity}%</div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-white/50 rounded-lg">
            <Wind className="w-4 h-4 text-blue-500" />
            <div>
              <div className="text-xs text-gray-600">Gió</div>
              <div className="font-semibold text-blue-900">{weatherData.windSpeed} km/h</div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-white/50 rounded-lg">
            <Eye className="w-4 h-4 text-blue-500" />
            <div>
              <div className="text-xs text-gray-600">Tầm nhìn</div>
              <div className="font-semibold text-blue-900">{(weatherData.visibility / 1000).toFixed(1)} km</div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-white/50 rounded-lg">
            <Gauge className="w-4 h-4 text-blue-500" />
            <div>
              <div className="text-xs text-gray-600">Áp suất</div>
              <div className="font-semibold text-blue-900">{weatherData.pressure} hPa</div>
            </div>
          </div>
        </div>

        {/* UV Index */}
        <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-orange-500" />
            <span className="text-sm text-gray-600">Chỉ số UV</span>
          </div>
          <Badge 
            variant={weatherData.uvIndex > 7 ? "destructive" : weatherData.uvIndex > 5 ? "default" : "secondary"}
          >
            {weatherData.uvIndex}
          </Badge>
        </div>

        {/* Refresh Button */}
        <button
          onClick={fetchWeatherData}
          disabled={loading}
          className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Đang cập nhật...
            </>
          ) : (
            <>
              <Cloud className="w-4 h-4" />
              Cập nhật thời tiết
            </>
          )}
        </button>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;