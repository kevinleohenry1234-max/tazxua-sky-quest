import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import MainNavigation from '@/components/MainNavigation';
import HeroSection from '@/components/HeroSection';
import CategoryCards from '@/components/CategoryCards';
import Footer from '@/components/Footer';
import UserDashboard from '@/components/UserDashboard';
import RegisterModal, { RegisterData } from '@/components/RegisterModal';
import LoginModal, { LoginData } from '@/components/LoginModal';
import ImagePreloader from '@/components/ImagePreloader';
import BackgroundSlider from '@/components/BackgroundSlider';
import TaXuaGreenModel from '@/components/TaXuaGreenModel';
import QuickNavigation from '@/components/QuickNavigation';
import { registerUser, signInUser, signOut, getSession, onAuthStateChange } from '@/lib/supabase';
import heroImage1 from '@/assets/hero-taxua-clouds.jpg';
import heroImage2 from '@/assets/hmong-culture.jpg';
import heroImage3 from '@/assets/shan-tuyet-tea.jpg';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showDashboard, setShowDashboard] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showEngagementPopup, setShowEngagementPopup] = useState(false);
  const [hasShownEngagementPopup, setHasShownEngagementPopup] = useState(false);

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

  // 60-second engagement feature
  useEffect(() => {
    if (isLoading || showDashboard || hasShownEngagementPopup) return;

    const timer = setTimeout(() => {
      setShowEngagementPopup(true);
      setHasShownEngagementPopup(true);
    }, 60000); // 60 seconds

    return () => clearTimeout(timer);
  }, [isLoading, showDashboard, hasShownEngagementPopup]);

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

  const handleEngagementClick = () => {
    setShowEngagementPopup(false);
    // Scroll to hero section or trigger Sky Quest exploration
    const heroSection = document.querySelector('#hero-section');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCloseEngagement = () => {
    setShowEngagementPopup(false);
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
            <MainNavigation />
            
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
              <HeroSection />
              
              {/* Cinematic Spacing Section with Consistent Background */}
              <div className="py-32 bg-gradient-to-b from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-sm">
                {/* Category Cards with Full-width Layout - Moved to top */}
                <div className="mb-32">
                  <CategoryCards />
                </div>
                
                {/* Mô hình Tà Xùa Xanh with Enhanced Spacing */}
                <div className="mb-16">
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

      {/* 60-second Engagement Popup */}
      {showEngagementPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="fixed bottom-8 right-8 max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 animate-fade-in-up">
            <button
              onClick={handleCloseEngagement}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-green-500 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Bạn đã sẵn sàng bắt đầu hành trình Sky Quest của mình chưa?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Khám phá Tà Xùa qua những trải nghiệm xanh và bền vững
              </p>
            </div>
            
            <button
              onClick={handleEngagementClick}
              className="w-full bg-gradient-to-r from-orange-500 to-green-500 text-white py-3 px-4 rounded-lg font-medium hover:from-orange-600 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Khám phá ngay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
