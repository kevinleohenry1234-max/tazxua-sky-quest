import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, Info, MapPin, BookOpen, Phone, Mountain, Search, User, Compass, ChevronDown, Shield, Users, Target, Trophy, Sparkles, Camera, Activity, Map } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface MainNavigationProps {
  isLoggedIn?: boolean;
  onLoginClick?: () => void;
}

const MainNavigation: React.FC<MainNavigationProps> = ({ isLoggedIn, onLoginClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  // Main navigation links based on new requirements
  const mainNavLinks = [
    { href: '/', label: 'Trang chủ', icon: Home },
    { 
      href: '/explore', 
      label: 'Khám Phá', 
      icon: Compass,
      hasDropdown: true,
      dropdownItems: [
        { href: '/explore/destinations', label: 'Địa điểm', icon: MapPin },
        { href: '/explore/activities', label: 'Hoạt động xanh', icon: Activity },
        { href: '/explore/exhibition', label: 'Triển lãm số', icon: Camera },
        { href: '/explore/blog', label: 'Blog & Câu chuyện', icon: BookOpen },
      ]
    },
    { 
      href: '/skyquest', 
      label: 'Sky Quest', 
      icon: Mountain,
      hasDropdown: true,
      dropdownItems: [
        { href: '/skyquest/energetic', label: 'Hăng Say Săn Thưởng', icon: Target },
        { href: '/skyquest/calm', label: 'Mây Mây Sương Sương', icon: Sparkles },
        { href: '/skyquest/map', label: 'Bản đồ hành trình', icon: Map },
        { href: '/skyquest/challenges', label: 'Thử thách nổi bật', icon: Trophy },
      ]
    },
    { href: '/accommodation', label: 'Dịch vụ', icon: Home },
    { href: '/community', label: 'Cộng đồng', icon: Users },
    { href: '/safety', label: 'Trung tâm An toàn', icon: Shield },
  ];

  // User-specific links when logged in
  const userNavLinks = isLoggedIn ? [
    { href: '/returning-dashboard', label: 'Khu vườn của tôi', icon: User },
    { href: '/profile', label: 'Hồ sơ cá nhân', icon: User },
  ] : [];

  // Kiểm tra xem có đang ở trong user flows không
  const isInUserFlow = location.pathname.includes('/first-time-visitor') ||
                       location.pathname.includes('/learning-path') ||
                       location.pathname.includes('/returning-dashboard');

  const getBreadcrumb = () => {
    if (location.pathname === '/first-time-visitor') return 'Hướng dẫn người mới';
    if (location.pathname === '/learning-path') return 'Lộ trình học tập';
    if (location.pathname === '/returning-dashboard') return 'Dashboard';
    return null;
  };

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo/Brand with breadcrumb */}
          <div className="flex items-center space-x-2">
            <Mountain className="w-6 h-6 text-green-600" />
            <span className="font-bold text-lg text-gray-900">Tà Xùa</span>
            {getBreadcrumb() && (
              <>
                <span className="text-gray-400">/</span>
                <span className="text-green-600 font-semibold">{getBreadcrumb()}</span>
              </>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {/* Main navigation links */}
            {mainNavLinks.map((link) => {
              const isActive = location.pathname === link.href || 
                              (link.dropdownItems && link.dropdownItems.some(item => location.pathname === item.href));
              const Icon = link.icon;
              
              if (link.hasDropdown) {
                return (
                  <div key={link.href} className="relative">
                    <button
                      onClick={() => handleDropdownToggle(link.label)}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 group ${
                        isActive 
                          ? 'text-primary bg-primary/10 shadow-sm border border-primary/20' 
                          : 'text-muted-foreground hover:text-primary hover:bg-primary/5 hover:shadow-sm'
                      }`}
                    >
                      <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                      <span className="transition-all duration-300">{link.label}</span>
                      <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${
                        activeDropdown === link.label ? 'rotate-180' : ''
                      }`} />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {activeDropdown === link.label && (
                      <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                        {link.dropdownItems?.map((item) => {
                          const ItemIcon = item.icon;
                          const isItemActive = location.pathname === item.href;
                          return (
                            <Link
                              key={item.href}
                              to={item.href}
                              onClick={closeDropdown}
                              className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors hover:bg-gray-50 ${
                                isItemActive ? 'text-green-600 bg-green-50' : 'text-gray-700'
                              }`}
                            >
                              <ItemIcon className="w-4 h-4" />
                              <span>{item.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }
              
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 group ${
                    isActive 
                      ? 'text-primary bg-primary/10 shadow-sm border border-primary/20' 
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/5 hover:shadow-sm'
                  }`}
                >
                  <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                  <span className="transition-all duration-300">{link.label}</span>
                </Link>
              );
            })}

            {/* User navigation links */}
            {userNavLinks.map((link) => {
              const isActive = location.pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 group ${
                    isActive 
                      ? 'text-primary bg-primary/10 shadow-sm border border-primary/20' 
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/5 hover:shadow-sm'
                  }`}
                >
                  <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                  <span className="transition-all duration-300">{link.label}</span>
                </Link>
              );
            })}

            {/* Login button for non-logged in users */}
            {!isLoggedIn && onLoginClick && (
              <Button
                onClick={onLoginClick}
                variant="outline"
                size="sm"
                className="flex items-center space-x-1"
              >
                <User className="w-4 h-4" />
                <span>Đăng nhập</span>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-green-600 hover:bg-gray-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-200/50">
            <div className="flex flex-col space-y-1">
              {/* Main navigation links */}
              {mainNavLinks.map((link) => {
                const isActive = location.pathname === link.href ||
                                (link.dropdownItems && link.dropdownItems.some(item => location.pathname === item.href));
                const Icon = link.icon;
                
                if (link.hasDropdown) {
                  return (
                    <div key={link.href}>
                      <button
                        onClick={() => handleDropdownToggle(link.label)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                          isActive 
                            ? 'text-primary bg-primary/10 shadow-sm border border-primary/20' 
                            : 'text-muted-foreground hover:text-primary hover:bg-primary/5 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <Icon className="w-4 h-4" />
                          <span>{link.label}</span>
                        </div>
                        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${
                          activeDropdown === link.label ? 'rotate-180' : ''
                        }`} />
                      </button>
                      
                      {/* Mobile Dropdown Items */}
                      {activeDropdown === link.label && (
                        <div className="ml-6 mt-1 space-y-1">
                          {link.dropdownItems?.map((item) => {
                            const ItemIcon = item.icon;
                            const isItemActive = location.pathname === item.href;
                            return (
                              <Link
                                key={item.href}
                                to={item.href}
                                onClick={() => {
                                  setIsMobileMenuOpen(false);
                                  closeDropdown();
                                }}
                                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                                  isItemActive 
                                    ? 'text-primary bg-primary/10 shadow-sm border border-primary/20' 
                                    : 'text-muted-foreground hover:text-primary hover:bg-primary/5 hover:shadow-sm'
                                }`}
                              >
                                <ItemIcon className="w-4 h-4" />
                                <span>{item.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }
                
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 group ${
                      isActive 
                        ? 'text-primary bg-primary/10 shadow-sm border border-primary/20' 
                        : 'text-muted-foreground hover:text-primary hover:bg-primary/5 hover:shadow-sm'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                    <span className="transition-all duration-300">{link.label}</span>
                  </Link>
                );
              })}

              {/* User navigation links */}
              {userNavLinks.map((link) => {
                const isActive = location.pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 group ${
                      isActive 
                        ? 'text-primary bg-primary/10 shadow-sm border border-primary/20' 
                        : 'text-muted-foreground hover:text-primary hover:bg-primary/5 hover:shadow-sm'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                    <span className="transition-all duration-300">{link.label}</span>
                  </Link>
                );
              })}

              {/* Login button for mobile */}
              {!isLoggedIn && onLoginClick && (
                <button
                  onClick={() => {
                    onLoginClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 hover:shadow-sm transition-all duration-300"
                >
                  <User className="w-4 h-4" />
                  <span>Đăng nhập</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Overlay to close dropdown when clicking outside */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={closeDropdown}
        />
      )}
    </nav>
  );
};

export default MainNavigation;