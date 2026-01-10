import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AuthenticatedHeader from '../../components/ui/AuthenticatedHeader';
import PublicHeader from '../../components/ui/PublicHeader';
import HeroSection from './components/HeroSection';
import EmiratesCoverageSection from './components/EmiratesCoverageSection';
import SponsorshipPackagesSection from './components/SponsorshipPackagesSection';
import BlockchainTransparencySection from './components/BlockchainTransparencySection';
import MarketplacePreviewSection from './components/MarketplacePreviewSection';
import InvestorCallToActionSection from './components/InvestorCallToActionSection';
import PartnerShowcaseSection from './components/PartnerShowcaseSection';
import FooterSection from './components/FooterSection';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = () => {
      const newLanguage = localStorage.getItem('language') || 'en';
      setCurrentLanguage(newLanguage);
    };

    window.addEventListener('storage', handleLanguageChange);
    const interval = setInterval(handleLanguageChange, 100);

    return () => {
      window.removeEventListener('storage', handleLanguageChange);
      clearInterval(interval);
    };
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-white">
      {user ? (
        <AuthenticatedHeader 
          isAuthenticated={true}
          userRole={user.role}
          onLogout={() => {}}
        />
      ) : (
        <PublicHeader 
          isAuthenticated={false}
          userRole={null}
          onLogout={() => {}}
        />
      )}

      <main className="main-content">
        <HeroSection 
          currentLanguage={currentLanguage}
          onNavigate={handleNavigation}
        />

        <EmiratesCoverageSection 
          currentLanguage={currentLanguage}
        />

        <SponsorshipPackagesSection 
          currentLanguage={currentLanguage}
          onNavigate={handleNavigation}
        />

        <BlockchainTransparencySection 
          currentLanguage={currentLanguage}
        />

        <MarketplacePreviewSection 
          currentLanguage={currentLanguage}
          onNavigate={handleNavigation}
        />

        <InvestorCallToActionSection 
          currentLanguage={currentLanguage}
        />

        <PartnerShowcaseSection 
          currentLanguage={currentLanguage}
        />

        <FooterSection 
          currentLanguage={currentLanguage}
        />
      </main>
    </div>
  );
};

export default LandingPage;