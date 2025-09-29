import { ReactNode } from 'react';
import heroImage from '@/assets/hero-taxua-clouds.jpg';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const Layout = ({ children, className = '' }: LayoutProps) => {
  return (
    <div 
      className={`min-h-screen bg-cover bg-center bg-fixed bg-no-repeat ${className}`}
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url(${heroImage})`
      }}
    >
      {children}
    </div>
  );
};

export default Layout;