import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff } from 'lucide-react';
import { offlineManager } from '@/utils/offlineManager';

interface ConnectionStatusChipProps {
  className?: string;
}

const ConnectionStatusChip: React.FC<ConnectionStatusChipProps> = ({ className = '' }) => {
  const [isOnline, setIsOnline] = useState(offlineManager.getConnectionStatus());

  useEffect(() => {
    const handleConnectionChange = (online: boolean) => {
      setIsOnline(online);
    };

    offlineManager.addConnectionListener(handleConnectionChange);

    return () => {
      offlineManager.removeConnectionListener(handleConnectionChange);
    };
  }, []);

  return (
    <Badge
      variant="secondary"
      className={`
        flex items-center gap-2 px-3 py-1.5 text-sm font-medium
        ${isOnline 
          ? 'bg-[#16A34A]/90 text-white hover:bg-[#16A34A] border-[#16A34A]/20' 
          : 'bg-[#9CA3AF]/90 text-white hover:bg-[#9CA3AF] border-[#9CA3AF]/20'
        }
        backdrop-blur-sm shadow-lg transition-all duration-300
        ${className}
      `}
    >
      {isOnline ? (
        <>
          <Wifi className="w-4 h-4" />
          Trực tuyến
        </>
      ) : (
        <>
          <WifiOff className="w-4 h-4" />
          Ngoại tuyến
        </>
      )}
    </Badge>
  );
};

export default ConnectionStatusChip;