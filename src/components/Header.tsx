import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, User } from 'lucide-react';

interface HeaderProps {
  isLoggedIn?: boolean;
  userName?: string;
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
  onProfileClick?: () => void;
}

const Header = ({ 
  isLoggedIn = false, 
  userName,
  onLoginClick,
  onRegisterClick,
  onProfileClick 
}: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#home', label: 'Trang Chủ' },
    { href: '#discover', label: 'Khám Phá' },
    { href: '#experience', label: 'Trải Nghiệm' },
    { href: '#culture', label: 'Văn Hóa' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="/src/assets/viviet-logo.png"
              alt="VIVIET Logo"
              className="w-10 h-10 rounded-full"
            />
            <div className="font-playfair font-bold text-xl text-foreground">
              Tà Xùa
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-inter text-foreground/80 hover:text-primary transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <Button
                variant="ghost"
                onClick={onProfileClick}
                className="flex items-center space-x-2 text-foreground hover:text-primary"
              >
                <User className="w-4 h-4" />
                <span>Chào {userName}!</span>
              </Button>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  onClick={onLoginClick}
                  className="text-foreground hover:text-primary"
                >
                  Đăng Nhập
                </Button>
                <Button
                  onClick={onRegisterClick}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Đăng Ký
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
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-inter text-foreground/80 hover:text-primary transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-border/30">
                {isLoggedIn ? (
                  <Button
                    variant="ghost"
                    onClick={onProfileClick}
                    className="w-full justify-start text-foreground hover:text-primary"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Chào {userName}!
                  </Button>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Button
                      variant="ghost"
                      onClick={onLoginClick}
                      className="w-full justify-start text-foreground hover:text-primary"
                    >
                      Đăng Nhập
                    </Button>
                    <Button
                      onClick={onRegisterClick}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Đăng Ký
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