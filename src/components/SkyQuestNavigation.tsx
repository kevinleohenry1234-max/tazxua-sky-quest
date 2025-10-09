import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  User, 
  Target, 
  Trophy, 
  Gift, 
  Mountain, 
  ChevronRight,
  Home,
  Menu,
  X
} from 'lucide-react';

interface SkyQuestNavigationProps {
  currentSection?: string;
  onSectionChange?: (section: string) => void;
}

const SkyQuestNavigation: React.FC<SkyQuestNavigationProps> = ({ 
  currentSection, 
  onSectionChange 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('profile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [breadcrumb, setBreadcrumb] = useState<string[]>(['Sky Quest']);

  const sections = [
    {
      id: 'profile',
      name: 'Cá nhân',
      icon: User,
      path: '/sky-quest/profile',
      color: 'from-blue-500 to-indigo-600',
      description: 'Archetype, hành trình hoàn thành và nhật ký cá nhân'
    },
    {
      id: 'journey',
      name: 'Hành trình của bạn',
      icon: Target,
      path: '/sky-quest/journey',
      color: 'from-green-500 to-emerald-600',
      description: 'Hành trình hiện tại và các hành trình đã mở khóa'
    },
    {
      id: 'hall-of-stories',
      name: 'Hall of Stories',
      icon: Trophy,
      path: '/sky-quest/hall-of-stories',
      color: 'from-yellow-500 to-orange-600',
      description: 'Bảng xếp hạng và những câu chuyện ấn tượng'
    },
    {
      id: 'souvenirs',
      name: 'Kỷ vật hành trình',
      icon: Gift,
      path: '/sky-quest/souvenirs',
      color: 'from-purple-500 to-pink-600',
      description: 'Huy hiệu, thẻ truyện và voucher đã sưu tập'
    }
  ];

  useEffect(() => {
    // Determine active section from current path
    const currentPath = location.pathname;
    const section = sections.find(s => currentPath.includes(s.id));
    if (section) {
      setActiveSection(section.id);
      setBreadcrumb(['Sky Quest', section.name]);
    }
  }, [location.pathname]);

  const handleSectionChange = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (section) {
      setActiveSection(sectionId);
      setBreadcrumb(['Sky Quest', section.name]);
      navigate(section.path);
      if (onSectionChange) {
        onSectionChange(sectionId);
      }
      setIsMobileMenuOpen(false);
    }
  };

  const currentSectionData = sections.find(s => s.id === activeSection);

  return (
    <>
      {/* Desktop Navigation - Sticky Top Bar */}
      <div className="hidden md:block sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center py-3 text-sm text-gray-600">
            <Home className="w-4 h-4 mr-2" />
            {breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />}
                <span className={index === breadcrumb.length - 1 ? 'text-green-600 font-semibold' : 'hover:text-gray-900 cursor-pointer'}>
                  {item}
                </span>
              </React.Fragment>
            ))}
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center space-x-1 py-4">
            <div className="flex items-center mr-6">
              <Mountain className="w-6 h-6 text-green-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">Sky Quest</span>
            </div>
            
            <div className="flex-1 flex items-center space-x-2">
              {sections.map((section) => {
                const isActive = activeSection === section.id;
                const Icon = section.icon;
                
                return (
                  <button
                    key={section.id}
                    onClick={() => handleSectionChange(section.id)}
                    className={`relative flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 group ${
                      isActive
                        ? `bg-gradient-to-r ${section.color} text-white shadow-lg transform scale-105`
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                    <span>{section.name}</span>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-pulse" />
                    )}
                    
                    {/* Hover tooltip */}
                    {!isActive && (
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
                        {section.description}
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Fixed Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
        <div className="grid grid-cols-4 gap-1 p-2">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            const Icon = section.icon;
            
            return (
              <button
                key={section.id}
                onClick={() => handleSectionChange(section.id)}
                className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? `bg-gradient-to-t ${section.color} text-white shadow-lg`
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className={`w-5 h-5 mb-1 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} />
                <span className="text-xs font-semibold">{section.name}</span>
                
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-b-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <Mountain className="w-6 h-6 text-green-600 mr-2" />
            <div>
              <h1 className="text-lg font-bold text-gray-900">Sky Quest</h1>
              {currentSectionData && (
                <p className="text-sm text-gray-600">{currentSectionData.name}</p>
              )}
            </div>
          </div>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <div className="p-4 space-y-2">
              {sections.map((section) => {
                const isActive = activeSection === section.id;
                const Icon = section.icon;
                
                return (
                  <button
                    key={section.id}
                    onClick={() => handleSectionChange(section.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      isActive
                        ? `bg-gradient-to-r ${section.color} text-white shadow-lg`
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <div className="flex-1 text-left">
                      <div>{section.name}</div>
                      <div className={`text-sm ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                        {section.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>


    </>
  );
};

export default SkyQuestNavigation;