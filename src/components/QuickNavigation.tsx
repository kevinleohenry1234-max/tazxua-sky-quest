import React, { useState, useEffect } from 'react';
import { Home, Compass, Target, Phone } from 'lucide-react';

const QuickNavigation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navigationItems = [
    { id: 'home', icon: Home, label: 'Trang chủ', target: 'home' },
    { id: 'explore', icon: Compass, label: 'Khám phá', target: 'category-cards-section' },
    { id: 'skyquest', icon: Target, label: 'Sky Quest', target: 'skyquest-section' },
    { id: 'contact', icon: Phone, label: 'Liên hệ', target: 'contact-section' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Hiển thị thanh navigation khi cuộn xuống 300px
      setIsVisible(window.scrollY > 300);

      // Xác định section hiện tại
      const sections = navigationItems.map(item => item.target);
      let currentSection = '';

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSection = sectionId;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      // Thêm animation feedback khi click
      const button = document.querySelector(`[title="${navigationItems.find(item => item.target === targetId)?.label}"]`);
      if (button) {
        button.classList.add('animate-pulse');
        setTimeout(() => {
          button.classList.remove('animate-pulse');
        }, 300);
      }
      
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gray-200/50 px-2 py-2">
        <div className="flex items-center gap-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.target;
            
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.target)}
                className={`
                  relative flex flex-col items-center justify-center p-3 rounded-full transition-all duration-300 group
                  hover:scale-105 active:scale-95 transform-gpu
                  ${isActive 
                    ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg scale-110' 
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50 hover:shadow-md'
                  }
                `}
                title={item.label}
              >
                <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                
                {/* Tooltip */}
                <div className={`
                  absolute -top-12 left-1/2 transform -translate-x-1/2 
                  bg-gray-900 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap
                  opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none
                `}>
                  {item.label}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
                </div>

                {/* Active indicator */}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuickNavigation;