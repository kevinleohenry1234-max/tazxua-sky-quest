import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, Info, MapPin, BookOpen, Phone, Mountain } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const MainNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const mainNavLinks = [
    { href: '/', label: 'Trang chủ', icon: Home },
    { href: '/about', label: 'Giới thiệu', icon: Info },
    { href: '/#digital-exhibition', label: 'Triển lãm số', icon: MapPin },
    { href: '/blog', label: 'Blog', icon: BookOpen },
    { href: '/contact', label: 'Liên hệ', icon: Phone },
  ];

  // Kiểm tra xem có đang ở trong Sky Quest không
  const isInSkyQuest = location.pathname.includes('/sky-quest') || 
                       location.pathname.includes('/challenges') || 
                       location.pathname.includes('/rewards') || 
                       location.pathname.includes('/leaderboard');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <Mountain className="w-6 h-6 text-green-600" />
            <span className="font-bold text-lg text-gray-900">Tà Xùa</span>
            {isInSkyQuest && (
              <>
                <span className="text-gray-400">/</span>
                <span className="text-green-600 font-semibold">Sky Quest</span>
              </>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {mainNavLinks.map((link) => {
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
              {mainNavLinks.map((link) => {
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
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MainNavigation;