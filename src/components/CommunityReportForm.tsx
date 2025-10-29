import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Send, 
  MapPin, 
  Camera, 
  X, 
  Loader2, 
  CheckCircle, 
  AlertTriangle,
  Upload,
  Locate
} from 'lucide-react';
import { reportsApi, gpsUtils } from '@/services/safetyApi';
import { useErrorHandler } from '@/utils/errorHandler';

interface CommunityReportFormProps {
  onReportSubmitted?: () => void;
}

const CommunityReportForm: React.FC<CommunityReportFormProps> = ({ onReportSubmitted }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | 'info' | null;
    message: string;
  }>({ type: null, message: '' });
  const { withErrorHandling } = useErrorHandler();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle image selection
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setStatus({
          type: 'error',
          message: 'Vui lòng chọn file hình ảnh hợp lệ (JPG, PNG, GIF, etc.)'
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setStatus({
          type: 'error',
          message: 'Kích thước file không được vượt quá 5MB'
        });
        return;
      }

      setImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      setStatus({ type: null, message: '' });
    }
  };

  // Remove selected image
  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Get current GPS location
  const getCurrentLocation = async () => {
    setGettingLocation(true);
    setStatus({ type: 'info', message: 'Đang lấy vị trí hiện tại...' });
    
    const position = await withErrorHandling(
      () => gpsUtils.getCurrentPosition(),
      'CommunityReportForm - getCurrentPosition'
    );

    if (position) {
      setCoordinates({
        lat: position.lat,
        lng: position.lng
      });
      
      setStatus({
        type: 'success',
        message: `Đã lấy vị trí: ${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}`
      });
    } else {
      setStatus({
        type: 'error',
        message: 'Không thể lấy vị trí hiện tại. Vui lòng kiểm tra quyền truy cập GPS.'
      });
    }
    
    setGettingLocation(false);
  };

  // Submit report
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!content.trim()) {
      setStatus({
        type: 'error',
        message: 'Vui lòng nhập nội dung báo cáo'
      });
      return;
    }

    if (!coordinates) {
      setStatus({
        type: 'error',
        message: 'Vui lòng lấy vị trí hiện tại trước khi gửi báo cáo'
      });
      return;
    }

    setLoading(true);
    setStatus({ type: 'info', message: 'Đang gửi báo cáo...' });

    const result = await withErrorHandling(
      () => reportsApi.submitReport({
        content: content.trim(),
        image,
        location: coordinates,
        type: 'safety'
      }),
      'CommunityReportForm - submitReport'
    );

    if (result) {
      // Success
      setStatus({
        type: 'success',
        message: 'Báo cáo đã được gửi thành công! Cảm ơn bạn đã đóng góp cho cộng đồng.'
      });

      // Reset form
      setContent('');
      setImage(null);
      setImagePreview(null);
      setCoordinates(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Notify parent component
      onReportSubmitted?.();
    } else {
      setStatus({
        type: 'error',
        message: 'Có lỗi xảy ra khi gửi báo cáo. Vui lòng thử lại sau.'
      });
    }

    setLoading(false);
  };

  return (
    <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-green-700">
          <Send className="w-5 h-5" />
          Gửi báo cáo cộng đồng
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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

          {/* Content Input */}
          <div className="space-y-2">
            <label htmlFor="report-content" className="text-sm font-medium text-gray-700">
              Nội dung báo cáo *
            </label>
            <Textarea
              id="report-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Mô tả tình huống cần báo cáo (vấn đề an toàn, sự cố, tình trạng khẩn cấp, v.v.)"
              className="min-h-[100px] resize-none"
              disabled={loading}
            />
            <div className="text-xs text-gray-500">
              {content.length}/500 ký tự
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Hình ảnh đính kèm (tùy chọn)
            </label>
            
            {!imagePreview ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                  disabled={loading}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Chọn hình ảnh
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  Hỗ trợ JPG, PNG, GIF. Tối đa 5MB.
                </p>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={removeImage}
                  disabled={loading}
                  className="absolute top-2 right-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* GPS Location */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Vị trí hiện tại *
            </label>
            
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={getCurrentLocation}
                disabled={loading || gettingLocation}
                className="flex items-center gap-2"
              >
                {gettingLocation ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Locate className="w-4 h-4" />
                )}
                {gettingLocation ? 'Đang lấy vị trí...' : 'Lấy vị trí hiện tại'}
              </Button>
              
              {coordinates && (
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <MapPin className="w-4 h-4" />
                  <span>Đã có vị trí</span>
                </div>
              )}
            </div>
            
            {coordinates && (
              <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                Tọa độ: {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading || !content.trim() || !coordinates}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Đang gửi...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Gửi báo cáo
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CommunityReportForm;