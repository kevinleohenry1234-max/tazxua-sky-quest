import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import MainNavigation from '@/components/MainNavigation';
import HeroSection from '@/components/HeroSection';
import CategoryCards from '@/components/CategoryCards';
import ExploreSection from '@/components/ExploreSection';
import Footer from '@/components/Footer';
import UserDashboard from '@/components/UserDashboard';
import RegisterModal, { RegisterData } from '@/components/RegisterModal';
import LoginModal, { LoginData } from '@/components/LoginModal';
import ImagePreloader from '@/components/ImagePreloader';
import BackgroundSlider from '@/components/BackgroundSlider';
import TaXuaGreenModel from '@/components/TaXuaGreenModel';
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

  // Check for existing session on component mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await getSession();
        if (session?.user) {
          setIsLoggedIn(true);
          setUserName(session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Người dùng');
          setUserEmail(session.user.email || '');
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Listen for auth state changes
    const { data: { subscription } } = onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setIsLoggedIn(true);
        setUserName(session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Người dùng');
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
    </div>
  );
};

export default Index;
