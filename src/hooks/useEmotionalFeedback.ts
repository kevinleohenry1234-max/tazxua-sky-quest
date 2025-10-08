import { useState, useCallback } from 'react';

export interface EmotionalFeedbackData {
  id: string;
  type: 'achievement' | 'progress' | 'encouragement' | 'celebration';
  title: string;
  message: string;
  points?: number;
  level?: number;
  badge?: string;
  autoClose?: boolean;
  duration?: number;
}

export interface ProgressToastData {
  id: string;
  type: 'success' | 'progress' | 'milestone' | 'streak';
  message: string;
  points?: number;
  progress?: number;
  maxProgress?: number;
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export const useEmotionalFeedback = () => {
  const [feedbacks, setFeedbacks] = useState<EmotionalFeedbackData[]>([]);
  const [toasts, setToasts] = useState<ProgressToastData[]>([]);

  // Thêm feedback lớn (popup)
  const showFeedback = useCallback((data: Omit<EmotionalFeedbackData, 'id'>) => {
    const id = Date.now().toString();
    const feedback: EmotionalFeedbackData = {
      id,
      autoClose: true,
      duration: 4000,
      ...data
    };
    
    setFeedbacks(prev => [...prev, feedback]);
    return id;
  }, []);

  // Thêm toast nhỏ
  const showToast = useCallback((data: Omit<ProgressToastData, 'id'>) => {
    const id = Date.now().toString();
    const toast: ProgressToastData = {
      id,
      duration: 3000,
      position: 'top-right',
      ...data
    };
    
    setToasts(prev => [...prev, toast]);
    return id;
  }, []);

  // Đóng feedback
  const closeFeedback = useCallback((id: string) => {
    setFeedbacks(prev => prev.filter(f => f.id !== id));
  }, []);

  // Đóng toast
  const closeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Đóng tất cả
  const closeAll = useCallback(() => {
    setFeedbacks([]);
    setToasts([]);
  }, []);

  // Các helper functions cho các tình huống phổ biến
  const showAchievement = useCallback((title: string, message: string, points?: number, badge?: string) => {
    return showFeedback({
      type: 'achievement',
      title,
      message,
      points,
      badge
    });
  }, [showFeedback]);

  const showLevelUp = useCallback((level: number, message?: string) => {
    return showFeedback({
      type: 'celebration',
      title: `Chúc mừng! Bạn đã lên cấp ${level}!`,
      message: message || `Bạn đã đạt được cấp độ ${level}. Tiếp tục phát huy nhé!`,
      level
    });
  }, [showFeedback]);

  const showProgress = useCallback((message: string, points?: number, progress?: number, maxProgress?: number) => {
    return showToast({
      type: 'progress',
      message,
      points,
      progress,
      maxProgress
    });
  }, [showToast]);

  const showSuccess = useCallback((message: string, points?: number) => {
    return showToast({
      type: 'success',
      message,
      points
    });
  }, [showToast]);

  const showStreak = useCallback((days: number, points?: number) => {
    return showToast({
      type: 'streak',
      message: `Streak ${days} ngày! Bạn đang làm rất tốt!`,
      points
    });
  }, [showToast]);

  const showMilestone = useCallback((message: string, points?: number) => {
    return showFeedback({
      type: 'achievement',
      title: 'Cột mốc quan trọng!',
      message,
      points
    });
  }, [showFeedback]);

  const showEncouragement = useCallback((message?: string) => {
    const encouragementMessages = [
      'Đừng bỏ cuộc! Bạn đang làm rất tốt!',
      'Mỗi bước nhỏ đều có ý nghĩa. Tiếp tục nhé!',
      'Bạn có thể làm được! Hãy thử thêm một lần nữa!',
      'Thành công đang chờ đợi bạn phía trước!',
      'Kiên trì là chìa khóa của thành công!'
    ];
    
    return showFeedback({
      type: 'encouragement',
      title: 'Động viên',
      message: message || encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)]
    });
  }, [showFeedback]);

  return {
    feedbacks,
    toasts,
    showFeedback,
    showToast,
    closeFeedback,
    closeToast,
    closeAll,
    // Helper functions
    showAchievement,
    showLevelUp,
    showProgress,
    showSuccess,
    showStreak,
    showMilestone,
    showEncouragement
  };
};

export default useEmotionalFeedback;