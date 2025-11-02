import { ReactNode, useState, useEffect } from 'react';
import Navbar from '@/components/common/Navbar';
import LoginModal, { LoginData } from '@/components/LoginModal';
import RegisterModal, { RegisterData } from '@/components/RegisterModal';

interface LayoutProps {
  children: ReactNode;
  className?: string;
  isLoggedIn?: boolean;
}

const Layout = ({ children, className = '', isLoggedIn = false }: LayoutProps) => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  
  // Danh sách hình nền từ thư mục public/images/website background
  const backgroundImages = [
    '/images/website background/Tà Xùa 1.png',
    '/images/website background/Tà Xùa 3.png',
    '/images/website background/Tà Xùa 4.png',
    '/images/website background/Tà Xùa 5.png',
    '/images/website background/Tà Xùa 6.png',
    '/images/website background/Tà Xùa 7.png',
    '/images/website background/Tà Xùa 8.png',
    '/images/website background/Tà Xùa 9.png',
    '/images/website background/Tà Xùa 10.png'
  ];

  // Tự động thay đổi hình nền mỗi 10 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 10000); // 10 giây

    return () => clearInterval(interval);
  }, []); // Loại bỏ backgroundImages.length khỏi dependency array

  const currentImage = backgroundImages[currentBgIndex];

  // Handle login and register functions
  const handleLogin = async (data: LoginData): Promise<void> => {
    console.log('Login data:', data);
    setShowLoginModal(false);
    // Add your login logic here
  };

  const handleRegister = async (data: RegisterData): Promise<void> => {
    console.log('Register data:', data);
    setShowRegisterModal(false);
    // Add your register logic here
  };

  return (
    <>
      {/* Global Navigation */}
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogin={() => setShowLoginModal(true)}
        onRegister={() => setShowRegisterModal(true)}
      />

      {/* Main Content */}
      <div 
        className={`min-h-full bg-cover bg-center bg-fixed bg-no-repeat transition-all duration-1000 ease-in-out ${className}`}
        style={{
          backgroundImage: `
            linear-gradient(to bottom, rgba(15, 23, 42, 0.75), rgba(30, 41, 59, 0.85)),
            linear-gradient(135deg, rgba(127, 29, 29, 0.15), rgba(146, 64, 14, 0.12), rgba(30, 58, 138, 0.15)),
            url('/images/hmong-textile-pattern.svg'),
            linear-gradient(to bottom, rgba(51, 65, 85, 0.3) 0%, rgba(71, 85, 105, 0.2) 50%, rgba(51, 65, 85, 0.4) 100%),
            url(${currentImage})
          `,
          backgroundSize: '100% 100%, 100% 100%, clamp(200px, 25vw, 300px) clamp(200px, 25vw, 300px), 100% 100%, cover',
          backgroundPosition: 'center, center, center, center, center',
          backgroundRepeat: 'no-repeat, no-repeat, repeat, no-repeat, no-repeat',
          backgroundBlendMode: 'normal, soft-light, overlay, multiply, normal'
        }}
      >
        {children}
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />

      {/* Register Modal */}
      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onRegister={handleRegister}
      />
    </>
  );
};

export default Layout;