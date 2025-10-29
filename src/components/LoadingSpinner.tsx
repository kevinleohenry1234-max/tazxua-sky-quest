import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-blue-400 rounded-full animate-pulse mx-auto"></div>
        </div>
        <p className="mt-4 text-lg font-medium text-gray-700">Đang tải...</p>
        <p className="text-sm text-gray-500">Vui lòng chờ trong giây lát</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;