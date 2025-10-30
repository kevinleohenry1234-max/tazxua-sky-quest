import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import Header from '@/components/Header';
import MainNavigation from '@/components/MainNavigation';
import HeroSection from '@/components/HeroSection';
import BackgroundSlider from '@/components/BackgroundSlider';
import CategoryCards from '@/components/CategoryCards';
import TaXuaGreenModel from '@/components/TaXuaGreenModel';
import Footer from '@/components/Footer';
import UserDashboard from '@/components/UserDashboard';
import RegisterModal from '@/components/RegisterModal';
import LoginModal from '@/components/LoginModal';
import ImagePreloader from '@/components/ImagePreloader';
import QuickNavigation from '@/components/QuickNavigation';
import SafetyHub from '@/components/SafetyHub';
import SectionTransition from '@/components/SectionTransition';
import { supabase, getCurrentUser, signOut, getSession, onAuthStateChange, signInUser, registerUser } from '@/lib/supabase';
import { LoginData } from '@/components/LoginModal';
import { RegisterData } from '@/components/RegisterModal';
import { seoOptimizer } from '@/utils/seoOptimizer';
import heroImage1 from '@/assets/hero-taxua-clouds.jpg';
import heroImage2 from '@/assets/hmong-culture.jpg';
import heroImage3 from '@/assets/shan-tuyet-tea.jpg';

const Index = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showDashboard, setShowDashboard] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [showUserDashboard, setShowUserDashboard] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const handleVideoClick = () => {
    setShowVideoModal(true);
  };

  const handleSearchClick = () => {
    // Navigate to explore page or show search results
    navigate('/explore');
  };

  // Check for existing session on component mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await getSession();
        if (session?.user) {
          setIsLoggedIn(true);
          setUserName(session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User');
          setUserEmail(session.user.email || '');
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Set up auth state listener
    const { data: { subscription } } = onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setIsLoggedIn(true);
        setUserName(session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User');
        setUserEmail(session.user.email || '');
      } else if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false);
        setUserName('');
        setUserEmail('');
        setShowDashboard(false);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // SEO optimization for homepage
  useEffect(() => {
    seoOptimizer.updateMetaTags({
      title: 'Tà Xùa Mùa Xanh - Khám Phá Vẻ Đẹp Tây Bắc Việt Nam',
      description: 'Khám phá vẻ đẹp hùng vĩ của Tà Xùa với biển mây bồng bềnh, sống lưng khủng long và văn hóa dân tộc H\'Mông độc đáo. Trải nghiệm du lịch sinh thái bền vững tại Tây Bắc Việt Nam.',
      keywords: 'Tà Xùa, du lịch Tây Bắc, biển mây, sống lưng khủng long, H\'Mông, du lịch sinh thái, Việt Nam',
      image: heroImage1,
      type: 'website',
      locale: 'vi_VN'
    });

    // Add structured data for homepage
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "TouristDestination",
      "name": "Tà Xùa Mùa Xanh",
      "description": "Điểm đến du lịch sinh thái hàng đầu Tây Bắc Việt Nam với biển mây, sống lưng khủng long và văn hóa dân tộc",
      "image": [heroImage1, heroImage2, heroImage3],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "VN",
        "addressRegion": "Sơn La",
        "addressLocality": "Bắc Yên"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 21.3099,
        "longitude": 104.4569
      },
      "touristType": ["EcoTourist", "AdventureTourist", "CulturalTourist"],
      "availableLanguage": ["vi", "en"],
      "isAccessibleForFree": false,
      "publicAccess": true
    };

    seoOptimizer.addStructuredData(structuredData);

    // Add breadcrumb for homepage
    seoOptimizer.addBreadcrumbStructuredData([
      { name: 'Trang chủ', url: window.location.origin }
    ]);

    // Preload critical resources
    seoOptimizer.preloadCriticalResources([
      heroImage1,
      heroImage2,
      heroImage3
    ]);
  }, []);

  const handleLogin = () => {
    setShowLoginModal(true);
  };

  const handleLoginSubmit = async (loginData: LoginData) => {
    try {
      const result = await signInUser(loginData.email, loginData.password);
      
      if (result.success) {
        // State will be updated by the auth state change listener
        setShowLoginModal(false);
      }
    } catch (error) {
      throw error; // Let the modal handle the error display
    }
  };

  const handleRegister = () => {
    setShowRegisterModal(true);
  };

  const handleRegisterSubmit = async (userData: RegisterData) => {
    try {
      const result = await registerUser({
        full_name: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        password: userData.password
      });
      
      if (result.success) {
        alert(result.message);
        setShowRegisterModal(false);
        // Optionally show login modal after successful registration
        setShowLoginModal(true);
      }
    } catch (error) {
      throw error; // Let the modal handle the error display
    }
  };

  const handleProfile = () => {
    setShowDashboard(true);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      // State will be updated by the auth state change listener
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout on error
      setIsLoggedIn(false);
      setUserName('');
      setUserEmail('');
      setShowDashboard(false);
    }
  };

  const handleBackToHome = () => {
    setShowDashboard(false);
  };

  const handleSwitchToRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  // Show loading state while checking session
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Preload critical hero images */}
      <ImagePreloader 
        images={[heroImage1, heroImage2, heroImage3]} 
        priority={true} 
      />
      
      {showDashboard ? (
        <div className="min-h-screen">
          <Header 
            isLoggedIn={isLoggedIn}
            userName={userName}
            onProfileClick={handleBackToHome}
            onLogoutClick={handleLogout}
          />
          <UserDashboard userName={userName} userPoints={45} />
        </div>
      ) : (
        <>
          {/* Dynamic Background Slider with Tà Xùa Images */}
          <BackgroundSlider autoPlay={true} interval={8000} />
          
          <div className="relative z-10">
            {/* Main Navigation Bar */}
            <MainNavigation 
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setShowLoginModal(true)}
      />
            
            <Header 
              isLoggedIn={isLoggedIn}
              userName={userName}
              onLoginClick={handleLogin}
              onRegisterClick={handleRegister}
              onProfileClick={handleProfile}
              onLogoutClick={handleLogout}
            />
            
            <main className="w-full pt-14">
              {/* Full-width Hero Section */}
              <HeroSection 
                onSearchClick={handleSearchClick}
                onVideoClick={handleVideoClick}
                isLoggedIn={isLoggedIn}
                onLoginClick={() => setIsLoginModalOpen(true)}
              />
              
              {/* Seamless Transition from Hero */}
              <SectionTransition 
                variant="wave1" 
                fromColor="from-transparent" 
                toColor="to-gradient-to-b from-gray-50 to-white" 
                height="h-24"
              />
              
              {/* Clean Background Section */}
              <div className="bg-white">
                {/* Category Cards */}
                <div className="pb-20">
                  <CategoryCards />
                </div>
                
                {/* Mô hình Tà Xùa Xanh */}
                <div className="py-16 bg-white">
                  <TaXuaGreenModel />
                </div>
              </div>
              

            </main>
            
            <Footer />
          </div>
          
          {/* Quick Navigation - Fixed at bottom */}
          <QuickNavigation />
        </>
      )}
      
      {/* Authentication Modals */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLoginSubmit}
        onSwitchToRegister={handleSwitchToRegister}
      />
      
      <RegisterModal 
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onRegister={handleRegisterSubmit}
        onSwitchToLogin={handleSwitchToLogin}
      />


      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={() => setShowVideoModal(false)}>
          <div className="relative max-w-4xl w-full mx-4">
            <button 
              onClick={() => setShowVideoModal(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Tà Xùa Introduction Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Safety Hub - Floating Icon */}
      <SafetyHub />
    </div>
  );
};

export default Index;
