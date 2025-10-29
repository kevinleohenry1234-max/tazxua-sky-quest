// Error handling utilities for consistent error management across the app

export interface AppError {
  code: string;
  message: string;
  details?: unknown;
  timestamp: string;
  userMessage: string;
}

export class ErrorHandler {
  private static errorLog: AppError[] = [];

  // Log error for debugging and monitoring
  static logError(error: unknown, context: string, userMessage?: string): AppError {
    const appError: AppError = {
      code: this.getErrorCode(error),
      message: this.getErrorMessage(error),
      details: error,
      timestamp: new Date().toISOString(),
      userMessage: userMessage || this.getDefaultUserMessage(error)
    };

    // Add to in-memory log (in production, this would go to a logging service)
    this.errorLog.push(appError);
    
    // Keep only last 100 errors to prevent memory issues
    if (this.errorLog.length > 100) {
      this.errorLog = this.errorLog.slice(-100);
    }

    console.error(`[${context}] Error:`, appError);
    return appError;
  }

  // Get error code for categorization
  private static getErrorCode(error: unknown): string {
    if (error instanceof Error) {
      if (error.message.includes('fetch')) return 'NETWORK_ERROR';
      if (error.message.includes('auth')) return 'AUTH_ERROR';
      if (error.message.includes('permission')) return 'PERMISSION_ERROR';
      if (error.message.includes('timeout')) return 'TIMEOUT_ERROR';
      if (error.message.includes('not found')) return 'NOT_FOUND_ERROR';
      return 'GENERIC_ERROR';
    }
    return 'UNKNOWN_ERROR';
  }

  // Extract error message safely
  private static getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === 'string') {
      return error;
    }
    return 'Unknown error occurred';
  }

  // Get user-friendly error message
  private static getDefaultUserMessage(error: unknown): string {
    const code = this.getErrorCode(error);
    
    switch (code) {
      case 'NETWORK_ERROR':
        return 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối internet.';
      case 'AUTH_ERROR':
        return 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.';
      case 'PERMISSION_ERROR':
        return 'Bạn không có quyền thực hiện thao tác này.';
      case 'TIMEOUT_ERROR':
        return 'Yêu cầu mất quá nhiều thời gian. Vui lòng thử lại.';
      case 'NOT_FOUND_ERROR':
        return 'Không tìm thấy dữ liệu yêu cầu.';
      default:
        return 'Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau.';
    }
  }

  // Get recent errors for debugging
  static getRecentErrors(limit: number = 10): AppError[] {
    return this.errorLog.slice(-limit);
  }

  // Clear error log
  static clearErrorLog(): void {
    this.errorLog = [];
  }

  // Retry mechanism with exponential backoff
  static async withRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000,
    context: string = 'Unknown'
  ): Promise<T> {
    let lastError: unknown;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        
        if (attempt === maxRetries) {
          this.logError(error, `${context} - Final attempt failed`);
          throw error;
        }

        // Don't retry on certain error types
        const errorCode = this.getErrorCode(error);
        if (['AUTH_ERROR', 'PERMISSION_ERROR', 'NOT_FOUND_ERROR'].includes(errorCode)) {
          this.logError(error, `${context} - Non-retryable error`);
          throw error;
        }

        const delay = baseDelay * Math.pow(2, attempt - 1);
        console.warn(`[${context}] Attempt ${attempt}/${maxRetries} failed, retrying in ${delay}ms:`, error);
        
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw lastError;
  }

  // Safe async operation wrapper
  static async safeAsync<T>(
    operation: () => Promise<T>,
    fallback: T,
    context: string = 'Unknown'
  ): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      this.logError(error, `${context} - Using fallback`);
      return fallback;
    }
  }

  // Network status checker
  static isNetworkError(error: unknown): boolean {
    if (error instanceof Error) {
      return error.message.includes('fetch') || 
             error.message.includes('network') ||
             error.message.includes('offline') ||
             error.name === 'NetworkError';
    }
    return false;
  }

  // Format error for user display
  static formatErrorForUser(error: AppError): string {
    return `${error.userMessage} (Mã lỗi: ${error.code})`;
  }
}

// Hook for React components to handle errors consistently
export const useErrorHandler = () => {
  const handleError = (error: unknown, context: string, userMessage?: string) => {
    const appError = ErrorHandler.logError(error, context, userMessage);
    
    // In a real app, you might want to show a toast notification here
    // toast.error(ErrorHandler.formatErrorForUser(appError));
    
    return appError;
  };

  const withErrorHandling = async <T>(
    operation: () => Promise<T>,
    context: string,
    fallback?: T
  ): Promise<T | undefined> => {
    try {
      return await operation();
    } catch (error) {
      handleError(error, context);
      return fallback;
    }
  };

  return {
    handleError,
    withErrorHandling,
    logError: ErrorHandler.logError,
    withRetry: ErrorHandler.withRetry,
    safeAsync: ErrorHandler.safeAsync
  };
};