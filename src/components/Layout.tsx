import { ReactNode, useState, useEffect } from 'react';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const Layout = ({ children, className = '' }: LayoutProps) => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  
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

  return (
    <div 
      className={`min-h-screen bg-cover bg-center bg-fixed bg-no-repeat transition-all duration-1000 ease-in-out ${className}`}
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url(${currentImage})`
      }}
    >
      {children}
    </div>
  );
};

export default Layout;