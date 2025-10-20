import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogOut } from 'lucide-react';
import LazyImage from '@/components/LazyImage';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '@/lib/i18n';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  isLoggedIn?: boolean;
  userName?: string;
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
  onProfileClick?: () => void;
  onLogoutClick?: () => void;
}

const Header = ({ 
  isLoggedIn = false, 
  userName,
  onLoginClick,
  onRegisterClick,
  onProfileClick,
  onLogoutClick 
}: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();

  // Scroll effect for navigation bar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t('header.home') },
    { href: '/skyquest', label: 'Sky Quest' },
    { href: '/explore', label: 'Khám Phá' },
    { href: '/safety', label: 'Trung tâm An toàn' },
    { href: '/contact', label: 'Liên Hệ' },
    { href: '/about', label: 'Về chúng tôi' },
  ];

  // Check if we're on Sky Quest page for special styling
  const isSkyQuestPage = location.pathname === '/skyquest';

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled || !isSkyQuestPage
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm' 
          : 'bg-white/10 backdrop-blur-sm border-b border-white/20'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Enhanced for Sky Quest */}
          <div className="flex items-center space-x-3">
            <LazyImage
              src="/Logo/IVIET.png"
              alt="VIVIET Logo"
              className={`w-10 h-10 rounded-full object-cover transition-all duration-300 ${
                isSkyQuestPage && !isScrolled ? 'brightness-110 contrast-110' : ''
              }`}
            />
            <div 
              className={`font-playfair font-bold text-xl transition-colors duration-300 ${
                isSkyQuestPage && !isScrolled 
                  ? 'text-white' 
                  : 'text-foreground'
              }`}
              style={{ 
                color: isSkyQuestPage && !isScrolled ? '#16A34A' : undefined,
                textShadow: isSkyQuestPage && !isScrolled ? '0 2px 10px rgba(0,0,0,0.3)' : 'none'
              }}
            >
              Tà Xùa
            </div>
          </div>

          {/* Desktop Navigation - Enhanced */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`font-inter transition-all duration-300 relative group font-medium ${
                    isSkyQuestPage && !isScrolled
                      ? isActive 
                        ? 'text-white font-semibold' 
                        : 'text-white/90 hover:text-white'
                      : isActive 
                        ? 'text-primary font-semibold' 
                        : 'text-foreground/80 hover:text-primary'
                  }`}
                  style={{
                    textShadow: isSkyQuestPage && !isScrolled ? '0 1px 5px rgba(0,0,0,0.2)' : 'none'
                  }}
                >
                  {link.label}
                  {/* Enhanced underline effect */}
                  <span 
                    className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                      isSkyQuestPage && !isScrolled
                        ? isActive 
                          ? 'w-full bg-gradient-to-r from-green-400 to-blue-400' 
                          : 'w-0 group-hover:w-full bg-gradient-to-r from-blue-300 to-cyan-300'
                        : isActive 
                          ? 'w-full bg-primary' 
                          : 'w-0 group-hover:w-full bg-gradient-to-r from-blue-400 to-blue-600'
                    }`} 
                  />
                  
                  {/* Glow effect on hover for Sky Quest page */}
                  {isSkyQuestPage && !isScrolled && (
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-sm -z-10" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Auth Section & Language Switcher - Enhanced */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  onClick={onProfileClick}
                  className={`flex items-center space-x-2 transition-all duration-300 ${
                    isSkyQuestPage && !isScrolled
                      ? 'text-white/90 hover:text-white hover:bg-white/10' 
                      : 'text-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>{t('header.welcome')} {userName}!</span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={onLogoutClick}
                  className={`transition-all duration-300 ${
                    isSkyQuestPage && !isScrolled
                      ? 'text-white/90 hover:text-white hover:bg-white/10' 
                      : 'text-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  onClick={onLoginClick}
                  className={`transition-all duration-300 ${
                    isSkyQuestPage && !isScrolled
                      ? 'text-white/90 hover:text-white hover:bg-white/10' 
                      : 'text-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {t('header.login')}
                </Button>
                <Button
                  onClick={onRegisterClick}
                  className={`transition-all duration-300 ${
                    isSkyQuestPage && !isScrolled
                      ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-white/20' 
                      : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                  }`}
                >
                  {t('header.register')}
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button - Enhanced */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`transition-all duration-300 ${
                isSkyQuestPage && !isScrolled
                  ? 'text-white/90 hover:text-white hover:bg-white/10' 
                  : 'text-foreground hover:text-primary hover:bg-primary/5'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation - Enhanced */}
        {isMobileMenuOpen && (
          <div 
            className={`md:hidden py-4 border-t transition-all duration-300 ${
              isSkyQuestPage && !isScrolled
                ? 'border-white/20 bg-white/5 backdrop-blur-md' 
                : 'border-border/50 bg-background/95'
            }`}
          >
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`font-inter transition-all duration-300 ${
                      isSkyQuestPage && !isScrolled
                        ? isActive 
                          ? 'text-white font-semibold' 
                          : 'text-white/80 hover:text-white'
                        : isActive 
                          ? 'text-primary font-semibold' 
                          : 'text-foreground/80 hover:text-primary'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              
              <div 
                className={`pt-4 border-t ${
                  isSkyQuestPage && !isScrolled ? 'border-white/20' : 'border-border/30'
                }`}
              >
                <div className="mb-4">
                  <LanguageSwitcher />
                </div>
                {isLoggedIn ? (
                  <div className="flex flex-col space-y-2">
                    <Button
                      variant="ghost"
                      onClick={onProfileClick}
                      className={`w-full justify-start transition-all duration-300 ${
                        isSkyQuestPage && !isScrolled
                          ? 'text-white/90 hover:text-white hover:bg-white/10' 
                          : 'text-foreground hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      <User className="w-4 h-4 mr-2" />
                      {t('header.profile')}
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={onLogoutClick}
                      className={`w-full justify-start transition-all duration-300 ${
                        isSkyQuestPage && !isScrolled
                          ? 'text-white/90 hover:text-white hover:bg-white/10' 
                          : 'text-foreground hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      {t('header.logout')}
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        onLoginClick?.();
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full justify-start transition-all duration-300 ${
                        isSkyQuestPage && !isScrolled
                          ? 'text-white/90 hover:text-white hover:bg-white/10' 
                          : 'text-foreground hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      {t('header.login')}
                    </Button>
                    <Button
                      onClick={() => {
                        onRegisterClick?.();
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full transition-all duration-300 ${
                        isSkyQuestPage && !isScrolled
                          ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white' 
                          : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                      }`}
                    >
                      {t('header.register')}
                    </Button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;