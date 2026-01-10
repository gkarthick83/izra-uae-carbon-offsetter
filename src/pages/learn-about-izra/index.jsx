import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticatedHeader from '../../components/ui/AuthenticatedHeader';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import Button from '../../components/ui/Button';
import MissionSection from './components/MissionSection';
import HowItWorksSection from './components/HowItWorksSection';
import StakeholdersSection from './components/StakeholdersSection';
import ImpactMetricsSection from './components/ImpactMetricsSection';
import TechnologySection from './components/TechnologySection';
import FooterSection from '../landing-page/components/FooterSection';

const LearnAboutIzra = () => {
  const navigate = useNavigate();
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

  const content = {
    en: {
      hero: {
        badge: "About IZRA Platform",
        title: "Empowering UAE\'s Carbon Neutrality Vision",
        subtitle: "The First Blockchain-Powered Carbon Offset Marketplace in the UAE",
        description: "IZRA connects environmental sponsors, carbon credit sellers, and conscious buyers in a transparent ecosystem dedicated to achieving UAE's Net Zero 2050 goals through mangrove restoration and verified carbon offsetting.",
        cta: "Get Started"
      }
    },
    ar: {
      hero: {
        badge: "حول منصة إزرع",
        title: "تمكين رؤية الحياد الكربوني في الإمارات",
        subtitle: "أول سوق لتعويض الكربون يعمل بتقنية البلوكشين في الإمارات",
        description: "تربط إزرع رعاة البيئة وبائعي أرصدة الكربون والمشترين الواعين في نظام بيئي شفاف مخصص لتحقيق أهداف الإمارات للحياد الصفري 2050 من خلال استعادة المانغروف وتعويض الكربون المعتمد.",
        cta: "ابدأ الآن"
      }
    }
  };

  const text = content?.[currentLanguage];

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader
        isAuthenticated={false}
        userRole={null}
        onLogout={() => {}} />


      <main className="main-content">
        <section className="relative min-h-[500px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://img.rocket.new/generatedImages/rocket_gen_img_18c73a028-1766402111306.png"
              alt="Lush mangrove forest representing IZRA carbon offset ecosystem"
              className="w-full h-full object-cover" />

            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
          </div>

          <div className="container-safe relative z-10 py-16 md:py-20">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Icon name="Info" size={20} className="text-primary" />
                <span className="text-sm md:text-base font-medium text-primary">
                  {text?.hero?.badge}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                {text?.hero?.title}
              </h1>

              <h2 className="text-xl md:text-2xl font-semibold text-primary">
                {text?.hero?.subtitle}
              </h2>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {text?.hero?.description}
              </p>

              <Button
                variant="default"
                size="lg"
                iconName="ArrowRight"
                iconPosition="right"
                onClick={() => navigate('/plant-tree-sponsorship')}>

                {text?.hero?.cta}
              </Button>
            </div>
          </div>
        </section>

        <MissionSection currentLanguage={currentLanguage} />
        <HowItWorksSection currentLanguage={currentLanguage} />
        <StakeholdersSection currentLanguage={currentLanguage} />
        <ImpactMetricsSection currentLanguage={currentLanguage} />
        <TechnologySection currentLanguage={currentLanguage} />
        <FooterSection currentLanguage={currentLanguage} />
      </main>
    </div>);

};

export default LearnAboutIzra;