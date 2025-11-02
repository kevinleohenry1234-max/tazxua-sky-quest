import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface NavigationState {
  isScrolled: boolean;
  isMobileMenuOpen: boolean;
  activeRoute: string;
}

/**
 * Hook để quản lý trạng thái Navigation Bar
 * Đảm bảo tính nhất quán và ngăn chặn lỗi tái diễn
 */
export const useNavigation = () => {
  const location = useLocation();
  const [navigationState, setNavigationState] = useState<NavigationState>({
    isScrolled: false,
    isMobileMenuOpen: false,
    activeRoute: location.pathname,
  });

  // Theo dõi scroll để thay đổi style navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setNavigationState(prev => ({
        ...prev,
        isScrolled: scrolled
      }));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cập nhật active route khi location thay đổi
  useEffect(() => {
    setNavigationState(prev => ({
      ...prev,
      activeRoute: location.pathname,
      isMobileMenuOpen: false // Đóng mobile menu khi chuyển trang
    }));
  }, [location.pathname]);

  // Đóng mobile menu khi click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (navigationState.isMobileMenuOpen && !target.closest('[data-mobile-menu]')) {
        setNavigationState(prev => ({
          ...prev,
          isMobileMenuOpen: false
        }));
      }
    };

    if (navigationState.isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [navigationState.isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setNavigationState(prev => ({
      ...prev,
      isMobileMenuOpen: !prev.isMobileMenuOpen
    }));
  };

  const closeMobileMenu = () => {
    setNavigationState(prev => ({
      ...prev,
      isMobileMenuOpen: false
    }));
  };

  // Kiểm tra xem route có active không
  const isActiveRoute = (path: string): boolean => {
    if (path === '/') {
      return navigationState.activeRoute === '/';
    }
    return navigationState.activeRoute.startsWith(path);
  };

  return {
    ...navigationState,
    toggleMobileMenu,
    closeMobileMenu,
    isActiveRoute,
  };
};

export default useNavigation;