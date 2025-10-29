import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  MessageSquare, 
  Clock, 
  User, 
  MapPin, 
  RefreshCw, 
  Loader2, 
  AlertTriangle,
  CheckCircle,
  Eye,
  Calendar
} from 'lucide-react';
import { reportsApi, type CommunityReport } from '@/services/safetyApi';
import { useErrorHandler } from '@/utils/errorHandler';

interface CommunityReportsListProps {
  refreshTrigger?: number;
}

const CommunityReportsList: React.FC<CommunityReportsListProps> = ({ refreshTrigger }) => {
  const [reports, setReports] = useState<CommunityReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const { withErrorHandling } = useErrorHandler();

  // Fetch reports from API
  const fetchReports = async () => {
    setLoading(true);
    setError(null);
    
    const result = await withErrorHandling(
      () => reportsApi.getReports(20),
      'CommunityReportsList - fetchReports'
    );

    if (result) {
      setReports(result);
      setLastUpdated(new Date());
    } else {
      setError('Không thể tải danh sách báo cáo. Vui lòng thử lại sau.');
    }
    
    setLoading(false);
  };

  // Initial load and refresh trigger
  useEffect(() => {
    fetchReports();
  }, [refreshTrigger]);

  // Get status badge variant
  const getStatusBadge = (status: CommunityReport['status']) => {
    switch (status) {
      case 'đã xử lý':
        return { variant: 'default' as const, icon: CheckCircle, color: 'text-green-600' };
      case 'đang xử lý':
        return { variant: 'secondary' as const, icon: Clock, color: 'text-orange-600' };
      default:
        return { variant: 'outline' as const, icon: AlertTriangle, color: 'text-gray-600' };
    }
  };

  // Get report type badge
  const getTypeBadge = (type: CommunityReport['type']) => {
    const typeMap = {
      safety: { label: 'An toàn', color: 'bg-red-100 text-red-800' },
      infrastructure: { label: 'Cơ sở hạ tầng', color: 'bg-blue-100 text-blue-800' },
      environment: { label: 'Môi trường', color: 'bg-green-100 text-green-800' },
      emergency: { label: 'Khẩn cấp', color: 'bg-orange-100 text-orange-800' }
    };
    return typeMap[type] || { label: 'Khác', color: 'bg-gray-100 text-gray-800' };
  };

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return `${diffMinutes} phút trước`;
    } else if (diffHours < 24) {
      return `${diffHours} giờ trước`;
    } else if (diffDays < 7) {
      return `${diffDays} ngày trước`;
    } else {
      return date.toLocaleDateString('vi-VN');
    }
  };

  // Loading state
  if (loading) {
    return (
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <MessageSquare className="w-5 h-5" />
            Báo cáo cộng đồng
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <div className="flex items-center gap-2 text-blue-600">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Đang tải báo cáo...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-blue-700">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Báo cáo cộng đồng
          </div>
          <div className="flex items-center gap-2">
            {lastUpdated && (
              <span className="text-xs text-blue-500 font-normal">
                Cập nhật: {lastUpdated.toLocaleTimeString('vi-VN')}
              </span>
            )}
            <button
              onClick={fetchReports}
              disabled={loading}
              className="p-1 text-blue-600 hover:text-blue-800 disabled:opacity-50"
              title="Làm mới"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Error Alert */}
        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="w-4 h-4" />
            <AlertDescription className="text-red-800">
              {error}
              <button 
                onClick={fetchReports}
                className="ml-2 text-red-600 underline hover:text-red-800"
              >
                Thử lại
              </button>
            </AlertDescription>
          </Alert>
        )}

        {/* Reports List */}
        {reports.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Chưa có báo cáo nào</p>
            <p className="text-sm">Hãy gửi báo cáo đầu tiên để đóng góp cho cộng đồng!</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {reports.map((report) => {
              const statusBadge = getStatusBadge(report.status);
              const typeBadge = getTypeBadge(report.type);
              const StatusIcon = statusBadge.icon;

              return (
                <div
                  key={report.id}
                  className="bg-white/70 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">
                        {report.author}
                      </span>
                      <Badge className={typeBadge.color}>
                        {typeBadge.label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={statusBadge.variant} className="flex items-center gap-1">
                        <StatusIcon className="w-3 h-3" />
                        {report.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-3">
                    <p className="text-gray-800 text-sm leading-relaxed">
                      {report.content}
                    </p>
                  </div>

                  {/* Image */}
                  {report.image && (
                    <div className="mb-3">
                      <img
                        src={report.image}
                        alt="Báo cáo"
                        className="w-full max-w-xs h-32 object-cover rounded border"
                      />
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatTimestamp(report.timestamp)}</span>
                      </div>
                      {report.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>
                            {report.location.address || 
                             `${report.location.lat.toFixed(4)}, ${report.location.lng.toFixed(4)}`}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="text-gray-400">
                      #{report.id.slice(-6)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Summary */}
        {reports.length > 0 && (
          <div className="pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Tổng cộng: {reports.length} báo cáo</span>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  {reports.filter(r => r.status === 'đã xử lý').length} đã xử lý
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-orange-600" />
                  {reports.filter(r => r.status === 'đang xử lý').length} đang xử lý
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CommunityReportsList;