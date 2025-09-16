import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CategoryCards from '@/components/CategoryCards';
import MapSection from '@/components/MapSection';
import TaXuaStory from '@/components/TaXuaStory';
import Footer from '@/components/Footer';
import UserDashboard from '@/components/UserDashboard';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [showDashboard, setShowDashboard] = useState(false);

  const handleLogin = () => {
    // Mock login - in real app this would integrate with Supabase
    setIsLoggedIn(true);
    setUserName('Nguyễn Minh Đức');
    console.log('Login clicked - Supabase integration needed');
  };

  const handleRegister = () => {
    // Mock register - in real app this would integrate with Supabase
    console.log('Register clicked - Supabase integration needed');
  };

  const handleProfile = () => {
    setShowDashboard(true);
  };

  const handleBackToHome = () => {
    setShowDashboard(false);
  };

  if (showDashboard) {
    return (
      <div className="min-h-screen">
        <Header 
          isLoggedIn={isLoggedIn}
          userName={userName}
          onProfileClick={handleBackToHome}
        />
        <UserDashboard userName={userName} userPoints={45} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLoginClick={handleLogin}
        onRegisterClick={handleRegister}
        onProfileClick={handleProfile}
      />
      
      <main>
        <HeroSection />
        <CategoryCards />
        <MapSection />
        <TaXuaStory />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
