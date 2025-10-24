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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-xl border-b border-emerald-100/60 shadow-lg shadow-emerald-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand with breadcrumb - Enhanced */}
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <Mountain className="w-7 h-7 text-emerald-600 transition-all duration-300 group-hover:text-emerald-700 group-hover:scale-110" />
              <div className="absolute -inset-1 bg-emerald-100/50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xl text-gray-900 transition-colors duration-300 group-hover:text-emerald-800">Tà Xùa</span>
              {getBreadcrumb() && (
                <>
                  <span className="text-gray-400 text-lg">/</span>
                  <span className="text-emerald-600 font-semibold text-sm bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200">
                    {getBreadcrumb()}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Desktop Navigation - Enhanced */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Main navigation links */}
            {mainNavLinks.map((link) => {
              const isActive = location.pathname === link.href || 
                              (link.dropdownItems && link.dropdownItems.some(item => location.pathname === item.href));
              const Icon = link.icon;
              
              if (link.hasDropdown) {
                return (
                  <div key={link.href} className="relative group">
                    <button
                      onClick={() => handleDropdownToggle(link.label)}
                      className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 group/btn relative overflow-hidden ${
                        isActive 
                          ? 'text-white bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg shadow-emerald-200/50 border border-emerald-300' 
                          : 'text-gray-700 hover:text-emerald-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:shadow-md hover:shadow-emerald-100/50 border border-transparent hover:border-emerald-200'
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-teal-600/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                      <Icon className={`w-4 h-4 transition-all duration-300 group-hover/btn:scale-110 relative z-10 ${
                        isActive ? 'text-white' : 'text-emerald-600'
                      }`} />
                      <span className="transition-all duration-300 relative z-10">{link.label}</span>
                      <ChevronDown className={`w-3 h-3 transition-all duration-300 relative z-10 ${
                        activeDropdown === link.label ? 'rotate-180' : ''
                      } ${isActive ? 'text-white' : 'text-emerald-600'}`} />
                    </button>
                    
                    {/* Enhanced Dropdown Menu */}
                    {activeDropdown === link.label && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-white/98 backdrop-blur-xl rounded-2xl shadow-2xl border border-emerald-100/60 py-3 z-50 animate-in slide-in-from-top-2 duration-200">
                        <div className="px-3 pb-2 mb-2 border-b border-emerald-100">
                          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">{link.label}</p>
                        </div>
                        {link.dropdownItems?.map((item) => {
                          const ItemIcon = item.icon;
                          const isItemActive = location.pathname === item.href;
                          return (
                            <Link
                              key={item.href}
                              to={item.href}
                              onClick={closeDropdown}
                              className={`flex items-center space-x-3 px-4 py-3 mx-2 rounded-xl text-sm transition-all duration-300 hover:scale-[1.02] group/item ${
                                isItemActive 
                                  ? 'text-emerald-700 bg-gradient-to-r from-emerald-50 to-teal-50 shadow-sm border border-emerald-200' 
                                  : 'text-gray-700 hover:text-emerald-700 hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-teal-50/50'
                              }`}
                            >
                              <div className={`p-1.5 rounded-lg transition-all duration-300 group-hover/item:scale-110 ${
                                isItemActive 
                                  ? 'bg-emerald-100 text-emerald-700' 
                                  : 'bg-gray-100 text-gray-600 group-hover/item:bg-emerald-100 group-hover/item:text-emerald-700'
                              }`}>
                                <ItemIcon className="w-3.5 h-3.5" />
                              </div>
                              <div className="flex-1">
                                <span className="font-medium">{item.label}</span>
                              </div>
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
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 group/btn relative overflow-hidden ${
                    isActive 
                      ? 'text-white bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg shadow-emerald-200/50 border border-emerald-300' 
                      : 'text-gray-700 hover:text-emerald-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:shadow-md hover:shadow-emerald-100/50 border border-transparent hover:border-emerald-200'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-teal-600/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  <Icon className={`w-4 h-4 transition-all duration-300 group-hover/btn:scale-110 relative z-10 ${
                    isActive ? 'text-white' : 'text-emerald-600'
                  }`} />
                  <span className="transition-all duration-300 relative z-10">{link.label}</span>
                </Link>
              );
            })}

            {/* User navigation links - Enhanced */}
            {userNavLinks.map((link) => {
              const isActive = location.pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 group/btn relative overflow-hidden ${
                    isActive 
                      ? 'text-white bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg shadow-emerald-200/50 border border-emerald-300' 
                      : 'text-gray-700 hover:text-emerald-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:shadow-md hover:shadow-emerald-100/50 border border-transparent hover:border-emerald-200'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-teal-600/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  <Icon className={`w-4 h-4 transition-all duration-300 group-hover/btn:scale-110 relative z-10 ${
                    isActive ? 'text-white' : 'text-emerald-600'
                  }`} />
                  <span className="transition-all duration-300 relative z-10">{link.label}</span>
                </Link>
              );
            })}

            {/* Enhanced Login button for non-logged in users */}
            {!isLoggedIn && onLoginClick && (
              <Button
                onClick={onLoginClick}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl border-2 border-emerald-200 text-emerald-700 hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-600 hover:text-white hover:border-emerald-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-200/50 group/login"
              >
                <User className="w-4 h-4 transition-all duration-300 group-hover/login:scale-110" />
                <span className="font-medium">Đăng nhập</span>
              </Button>
            )}
          </div>

          {/* Enhanced Mobile menu button */}
          <button
            className="md:hidden p-3 rounded-xl text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-300 hover:scale-105 border border-transparent hover:border-emerald-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-emerald-100/50 bg-gradient-to-b from-white to-emerald-50/30 backdrop-blur-sm">
            <div className="flex flex-col space-y-2 px-2">
              {/* Main navigation links - Mobile Enhanced */}
              {mainNavLinks.map((link) => {
                const isActive = location.pathname === link.href ||
                                (link.dropdownItems && link.dropdownItems.some(item => location.pathname === item.href));
                const Icon = link.icon;
                
                if (link.hasDropdown) {
                  return (
                    <div key={link.href}>
                      <button
                        onClick={() => handleDropdownToggle(link.label)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-[1.02] group/mobile ${
                          isActive 
                            ? 'text-white bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg shadow-emerald-200/50 border border-emerald-300' 
                            : 'text-gray-700 hover:text-emerald-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:shadow-md hover:shadow-emerald-100/50 border border-transparent hover:border-emerald-200'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className={`w-5 h-5 transition-all duration-300 group-hover/mobile:scale-110 ${
                            isActive ? 'text-white' : 'text-emerald-600'
                          }`} />
                          <span className="font-medium">{link.label}</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 transition-all duration-300 group-hover/mobile:scale-110 ${
                          activeDropdown === link.label ? 'rotate-180' : ''
                        } ${isActive ? 'text-white' : 'text-emerald-600'}`} />
                      </button>
                      
                      {/* Enhanced Mobile Dropdown Items */}
                      {activeDropdown === link.label && (
                        <div className="ml-4 mt-2 space-y-1 pl-4 border-l-2 border-emerald-200">
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
                                className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-[1.02] group/item ${
                                  isItemActive 
                                    ? 'text-white bg-gradient-to-r from-emerald-500 to-teal-500 shadow-md shadow-emerald-200/40' 
                                    : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 hover:shadow-sm'
                                }`}
                              >
                                <ItemIcon className={`w-4 h-4 transition-all duration-300 group-hover/item:scale-110 ${
                                  isItemActive ? 'text-white' : 'text-emerald-500'
                                }`} />
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
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-[1.02] group/mobile ${
                      isActive 
                        ? 'text-white bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg shadow-emerald-200/50 border border-emerald-300' 
                        : 'text-gray-700 hover:text-emerald-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:shadow-md hover:shadow-emerald-100/50 border border-transparent hover:border-emerald-200'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className={`w-5 h-5 transition-all duration-300 group-hover/mobile:scale-110 ${
                      isActive ? 'text-white' : 'text-emerald-600'
                    }`} />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                );
              })}

              {/* Enhanced User navigation links - Mobile */}
              {userNavLinks.map((link) => {
                const isActive = location.pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-[1.02] group/mobile ${
                      isActive 
                        ? 'text-white bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg shadow-emerald-200/50 border border-emerald-300' 
                        : 'text-gray-700 hover:text-emerald-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:shadow-md hover:shadow-emerald-100/50 border border-transparent hover:border-emerald-200'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className={`w-5 h-5 transition-all duration-300 group-hover/mobile:scale-110 ${
                      isActive ? 'text-white' : 'text-emerald-600'
                    }`} />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                );
              })}

              {/* Enhanced Login button for mobile */}
              {!isLoggedIn && onLoginClick && (
                <button
                  onClick={() => {
                    onLoginClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-emerald-700 hover:text-white hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-600 hover:shadow-lg hover:shadow-emerald-200/50 border border-emerald-200 hover:border-emerald-600 transition-all duration-300 hover:scale-[1.02] group/login-mobile"
                >
                  <User className="w-5 h-5 transition-all duration-300 group-hover/login-mobile:scale-110" />
                  <span className="font-medium">Đăng nhập</span>
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