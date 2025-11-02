import React, { useState } from 'react';
import { Menu, X, Home, Compass, Briefcase, Mountain, Shield, Info, Phone, Settings, ChevronDown, User, LogIn, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigation } from '@/hooks/useNavigation';

interface NavbarProps {
  isLoggedIn?: boolean;
  userAvatar?: string;
  userName?: string;
  onLogin?: () => void;
  onRegister?: () => void;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isLoggedIn = false,
  userAvatar,
  userName,
  onLogin,
  onRegister,
  onLogout
}) => {
  const { isScrolled, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu, isActiveRoute } = useNavigation();
  const [isInfoDropdownOpen, setIsInfoDropdownOpen] = useState(false);

  // Main navigation menu items - theo đúng cấu trúc yêu cầu
  const mainNavLinks = [
    { href: '/', label: 'Trang chủ', icon: Home },
    { href: '/explore', label: 'Khám phá', icon: Compass },
    { href: '/service', label: 'Dịch vụ', icon: Briefcase },
    { href: '/skyquest', label: 'Sky Quest', icon: Mountain },
    { href: '/safety', label: 'An toàn', icon: Shield },
  ];

  // Dropdown "Thông tin" items
  const infoDropdownItems = [
    { href: '/about', label: 'Về ViViet', icon: Info },
    { href: '/contact', label: 'Liên hệ', icon: Phone },
  ];

  const isInfoSectionActive = () => {
    return infoDropdownItems.some(item => isActiveRoute(item.href));
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.05)]' 
          : 'bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.05)]'
      }`}
    >
      {/* Container với max-width: 1440px, margin: 0 auto, padding: 0 32px */}
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex justify-between items-center h-[72px]">
          
          {/* Logo Zone - Left (căn trái hoàn toàn, luôn cố định) */}
          <div className="flex items-center flex-shrink-0">
            <Link 
              to="/" 
              className="flex items-center group transition-opacity duration-300 hover:opacity-80"
            >
              <img 
                src="/assets/logo/official-logo.png" 
                alt="ViViet Logo" 
                className="h-10 w-auto mr-3"
                onError={(e) => {
                  // Fallback to a placeholder if logo doesn't exist
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0iIzAwN0I1NSIvPgo8dGV4dCB4PSIyMCIgeT0iMjYiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5WVjwvdGV4dD4KPC9zdmc+';
                }}
              />
              <span 
                className="text-lg font-medium text-[#212121] group-hover:text-[#1E9D6E] transition-colors duration-300"
                style={{ 
                  fontFamily: 'Inter, Poppins, sans-serif',
                  fontSize: '18px', 
                  fontWeight: '500' 
                }}
              >
                ViViet – Tà Xùa Mùa Xanh
              </span>
            </Link>
          </div>

          {/* Main Menu - Center (căn giữa theo chiều ngang, khoảng cách đều nhau 16px) */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center gap-4">
              {mainNavLinks.map((link) => {
                
                const isActive = isActiveRoute(link.href);
                
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      isActive 
                        ? 'text-[#1E9D6E] font-semibold' 
                        : 'text-[#212121] hover:text-[#1E9D6E]'
                    }`}
                    style={{ 
                      fontFamily: 'Inter, Poppins, sans-serif',
                      fontWeight: isActive ? '600' : '500',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
              
              {/* Dropdown "Thông tin" */}
              <div className="relative">
                <button
                  onClick={() => setIsInfoDropdownOpen(!isInfoDropdownOpen)}
                  className={`flex items-center px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    isInfoSectionActive() 
                      ? 'text-[#1E9D6E] font-semibold' 
                      : 'text-[#212121] hover:text-[#1E9D6E]'
                  }`}
                  style={{ 
                    fontFamily: 'Inter, Poppins, sans-serif',
                    fontWeight: isInfoSectionActive() ? '600' : '500',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Thông tin
                  <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                    isInfoDropdownOpen ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {/* Dropdown Menu */}
                {isInfoDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {infoDropdownItems.map((item) => {
                      
                      const isActive = isActiveRoute(item.href);
                      
                      return (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setIsInfoDropdownOpen(false)}
                          className={`flex items-center px-4 py-2 text-sm font-medium transition-all duration-300 ${
                            isActive 
                              ? 'text-[#1E9D6E] bg-[#1E9D6E]/5 font-semibold' 
                              : 'text-[#212121] hover:text-[#1E9D6E] hover:bg-gray-50'
                          }`}
                          style={{ 
                            fontFamily: 'Inter, Poppins, sans-serif',
                            fontWeight: isActive ? '600' : '500'
                          }}
                        >
                          <item.icon className="w-4 h-4 mr-3" />
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
              
              {/* Cài đặt */}
              <Link
                to="/settings"
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  isActiveRoute('/settings') 
                    ? 'text-[#1E9D6E] font-semibold' 
                    : 'text-[#212121] hover:text-[#1E9D6E]'
                }`}
                style={{ 
                  fontFamily: 'Inter, Poppins, sans-serif',
                  fontWeight: isActiveRoute('/settings') ? '600' : '500',
                  whiteSpace: 'nowrap'
                }}
              >
                Cài đặt
              </Link>
            </div>
          </div>

          {/* User Zone - Right (căn phải) */}
          <div className="hidden lg:flex items-center gap-6 flex-shrink-0">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={onLogin}
                  className="px-6 py-3 text-sm font-medium text-[#1E9D6E] border border-[#1E9D6E] rounded-lg hover:bg-[#1E9D6E]/5 transition-all duration-300"
                  style={{ 
                    fontFamily: 'Inter, Poppins, sans-serif',
                    fontWeight: '500' 
                  }}
                >
                  Đăng nhập
                </button>
                <button
                  onClick={onRegister}
                  className="px-6 py-3 text-sm font-medium text-white bg-[#1E9D6E] rounded-lg hover:bg-[#1E9D6E]/90 transition-all duration-300"
                  style={{ 
                    fontFamily: 'Inter, Poppins, sans-serif',
                    fontWeight: '500' 
                  }}
                >
                  Đăng ký
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1E9D6E] flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">U</span>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-[#212121] hover:text-[#1E9D6E] transition-colors duration-300"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[72px] bg-black bg-opacity-50 z-40">
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto">
            <div className="p-6 space-y-4">
              {/* Mobile Navigation Links */}
              {mainNavLinks.map((link) => {
                const LinkIcon = link.icon;
                
                const isActive = isActiveRoute(link.href);
                
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={closeMobileMenu}
                    className={`flex items-center p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive 
                        ? 'text-[#1E9D6E] bg-[#1E9D6E]/5 font-semibold' 
                        : 'text-[#212121] hover:text-[#1E9D6E] hover:bg-gray-50'
                    }`}
                    style={{ fontFamily: 'Inter, Poppins, sans-serif' }}
                  >
                    <LinkIcon className="w-5 h-5 mr-3" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
              
              {/* Mobile Info Section */}
              <div className="border-t border-gray-200 pt-4">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Thông tin
                </div>
                {infoDropdownItems.map((item) => {
                  const ItemIcon = item.icon;
                  
                  const isActive = isActiveRoute(item.href);
                    
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={closeMobileMenu}
                        className={`flex items-center p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                          isActive 
                            ? 'text-[#1E9D6E] bg-[#1E9D6E]/5 font-semibold' 
                            : 'text-[#212121] hover:text-[#1E9D6E] hover:bg-gray-50'
                        }`}
                        style={{ fontFamily: 'Inter, Poppins, sans-serif' }}
                      >
                        <ItemIcon className="w-5 h-5 mr-3" />
                        <span>{item.label}</span>
                      </Link>
                    );
                })}
                
                {/* Cài đặt */}
                <Link
                  to="/settings"
                  onClick={closeMobileMenu}
                  className={`flex items-center p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActiveRoute('/settings') 
                      ? 'text-[#1E9D6E] bg-[#1E9D6E]/5 font-semibold' 
                      : 'text-[#212121] hover:text-[#1E9D6E] hover:bg-gray-50'
                  }`}
                  style={{ fontFamily: 'Inter, Poppins, sans-serif' }}
                >
                  <Settings className="w-5 h-5 mr-3" />
                  <span>Cài đặt</span>
                </Link>
              </div>
              
              {/* Mobile User Actions */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                {!isLoggedIn ? (
                  <>
                    <button
                      onClick={() => {
                        closeMobileMenu();
                        onLogin?.();
                      }}
                      className="w-full px-4 py-3 text-sm font-medium text-[#1E9D6E] border border-[#1E9D6E] rounded-lg hover:bg-[#1E9D6E]/5 transition-all duration-300"
                      style={{ fontFamily: 'Inter, Poppins, sans-serif' }}
                    >
                      Đăng nhập
                    </button>
                    <button
                      onClick={() => {
                        closeMobileMenu();
                        onRegister?.();
                      }}
                      className="w-full px-4 py-3 text-sm font-medium text-white bg-[#1E9D6E] rounded-lg hover:bg-[#1E9D6E]/90 transition-all duration-300"
                      style={{ fontFamily: 'Inter, Poppins, sans-serif' }}
                    >
                      Đăng ký
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-[#1E9D6E] flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">U</span>
                    </div>
                    <span className="text-[#212121] font-medium">Người dùng</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Click outside to close dropdown */}
      {isInfoDropdownOpen && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setIsInfoDropdownOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;