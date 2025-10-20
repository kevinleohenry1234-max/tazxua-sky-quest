import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { offlineManager } from '@/utils/offlineManager';

interface OfflineNotificationProps {
  className?: string;
}

const OfflineNotification: React.FC<OfflineNotificationProps> = ({ className = '' }) => {
  const [isOnline, setIsOnline] = useState(offlineManager.getConnectionStatus());
  const [showOnlineMessage, setShowOnlineMessage] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState<string>('');

  useEffect(() => {
    const handleConnectionChange = (online: boolean) => {
      const wasOffline = !isOnline;
      setIsOnline(online);

      if (online && wasOffline) {
        // Chuyển từ offline sang online
        setShowOnlineMessage(true);
        setIsSyncing(true);
      }
    };

    offlineManager.addConnectionListener(handleConnectionChange);

    // Lắng nghe message từ Service Worker
    const handleSWMessage = (event: MessageEvent) => {
      const data = event.data;
      if (data && data.type === 'SAFETY_DATA_REFRESHED') {
        // Đã cập nhật dữ liệu mới từ mạng
        setIsSyncing(false);
        try {
          const date = new Date(data.timestamp || Date.now());
          const hhmm = date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
          setLastRefreshTime(hhmm);
        } catch {
          setLastRefreshTime('vừa xong');
        }
        // Tự ẩn banner sau 3s
        setTimeout(() => setShowOnlineMessage(false), 3000);
      }
    };

    navigator.serviceWorker?.addEventListener('message', handleSWMessage);

    return () => {
      offlineManager.removeConnectionListener(handleConnectionChange);
      navigator.serviceWorker?.removeEventListener('message', handleSWMessage);
    };
  }, [isOnline]);

  // Không hiển thị gì nếu online và không có message
  if (isOnline && !showOnlineMessage) {
    return null;
  }

  return (
    <div className={`fixed top-16 left-0 right-0 z-40 ${className}`}>
      {!isOnline ? (
        // Offline notification bar
        <Alert className="mx-4 mb-0 rounded-none border-0 bg-[#0E4F45] text-white shadow-lg">
          <AlertTriangle className="h-4 w-4 text-white" />
          <AlertDescription className="flex items-center justify-between">
            <span className="flex-1">
              ⚠️ Kết nối Internet bị gián đoạn. Bạn đang xem dữ liệu lưu gần nhất.
            </span>
          </AlertDescription>
        </Alert>
      ) : showOnlineMessage ? (
        // Online restoration banner
        <Alert className="mx-4 mb-0 rounded-none border-0 bg-[#D8F3E7] text-[#064E3B] shadow-lg">
          <CheckCircle className="h-4 w-4 text-[#064E3B]" />
          <AlertDescription className="flex items-center">
            <span className="flex-1">
              {isSyncing
                ? '✅ Kết nối đã khôi phục. Đang cập nhật dữ liệu mới…'
                : `Dữ liệu đã cập nhật lúc ${lastRefreshTime}.`}
            </span>
          </AlertDescription>
        </Alert>
      ) : null}
    </div>
  );
};

export default OfflineNotification;