import { useState, useCallback } from 'react';

export interface ToastState {
  message: string;
  isVisible: boolean;
  type: 'error' | 'warning' | 'info';
}

export const useErrorToast = () => {
  const [toast, setToast] = useState<ToastState>({
    message: '',
    isVisible: false,
    type: 'error'
  });

  const showError = useCallback((message: string) => {
    setToast({
      message,
      isVisible: true,
      type: 'error'
    });
  }, []);

  const showWarning = useCallback((message: string) => {
    setToast({
      message,
      isVisible: true,
      type: 'warning'
    });
  }, []);

  const showInfo = useCallback((message: string) => {
    setToast({
      message,
      isVisible: true,
      type: 'info'
    });
  }, []);

  const hideToast = useCallback(() => {
    setToast(prev => ({
      ...prev,
      isVisible: false
    }));
  }, []);

  // Helper function for common error scenarios
  const showNetworkError = useCallback(() => {
    showError('Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối internet và thử lại.');
  }, [showError]);

  const showLoadError = useCallback((resource?: string) => {
    const message = resource 
      ? `Không thể tải ${resource}. Vui lòng thử lại sau.`
      : 'Không thể tải dữ liệu. Vui lòng thử lại sau.';
    showError(message);
  }, [showError]);

  const showSaveError = useCallback(() => {
    showError('Không thể lưu thông tin. Vui lòng thử lại sau.');
  }, [showError]);

  return {
    toast,
    showError,
    showWarning,
    showInfo,
    hideToast,
    // Common error helpers
    showNetworkError,
    showLoadError,
    showSaveError
  };
};

export default useErrorToast;