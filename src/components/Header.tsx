import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
  const { t } = useTranslation();
  const location = useLocation();

  const navLinks = [
    { href: '/', label: t('header.home') },
    { href: '/experience', label: 'Triển lãm Số' },
    { href: '/safety', label: 'Trung tâm An toàn' },
    { href: '/contact', label: 'Liên Hệ' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="/public/Logo/IVIET.png"
              alt="VIVIET Logo"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="font-playfair font-bold text-xl text-foreground">
              Tà Xùa
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`font-inter transition-colors duration-300 relative group ${
                    isActive 
                      ? 'text-primary font-semibold' 
                      : 'text-foreground/80 hover:text-primary'
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              );
            })}
          </nav>

          {/* Auth Section & Language Switcher */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 text-foreground hover:text-primary"
                  >
                    <User className="w-4 h-4" />
                    <span>{t('header.welcome')} {userName}!</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={onProfileClick}>
                    <User className="w-4 h-4 mr-2" />
                    {t('header.profile')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onLogoutClick}>
                    <LogOut className="w-4 h-4 mr-2" />
                    {t('header.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  onClick={onLoginClick}
                  className="text-foreground hover:text-primary"
                >
                  {t('header.login')}
                </Button>
                <Button
                  onClick={onRegisterClick}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {t('header.register')}
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`font-inter transition-colors duration-300 ${
                      isActive 
                        ? 'text-primary font-semibold' 
                        : 'text-foreground/80 hover:text-primary'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-border/30">
                <div className="mb-4">
                  <LanguageSwitcher />
                </div>
                {isLoggedIn ? (
                  <div className="flex flex-col space-y-2">
                    <Button
                      variant="ghost"
                      onClick={onProfileClick}
                      className="w-full justify-start text-foreground hover:text-primary"
                    >
                      <User className="w-4 h-4 mr-2" />
                      {t('header.profile')}
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={onLogoutClick}
                      className="w-full justify-start text-foreground hover:text-primary"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      {t('header.logout')}
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Button
                      variant="ghost"
                      onClick={onLoginClick}
                      className="w-full justify-start text-foreground hover:text-primary"
                    >
                      {t('header.login')}
                    </Button>
                    <Button
                      onClick={onRegisterClick}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
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