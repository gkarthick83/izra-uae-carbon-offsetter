import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticatedHeader from '../../components/ui/AuthenticatedHeader';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import Button from '../../components/ui/Button';
import InvestmentOverviewSection from './components/InvestmentOverviewSection';
import TokenAcquisitionSection from './components/TokenAcquisitionSection';
import InvestmentCalculatorSection from './components/InvestmentCalculatorSection';
import RiskDisclosureSection from './components/RiskDisclosureSection';
import InvestorBenefitsSection from './components/InvestorBenefitsSection';
import KYCRequirementsSection from './components/KYCRequirementsSection';
import FooterSection from '../landing-page/components/FooterSection';

const InvestInIzra = () => {
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
        badge: "Investment Opportunity",
        title: "Invest in UAE\'s Carbon Offset Future",
        subtitle: "IZRA Token - Sustainable Returns with Environmental Impact",
        description: "Join the UAE's first blockchain-powered carbon offset platform as an investor. Earn revenue share from platform fees, participate in governance, and contribute to achieving Net Zero 2050 goals.",
        cta: "Start Investing"
      },
      quickStats: [
      { label: "Token Price", value: "$0.10", icon: "DollarSign" },
      { label: "Min Investment", value: "$1,000", icon: "Wallet" },
      { label: "Revenue Share", value: "40%", icon: "TrendingUp" },
      { label: "Expected APY", value: "12-18%", icon: "BarChart" }]

    },
    ar: {
      hero: {
        badge: "فرصة استثمارية",
        title: "استثمر في مستقبل تعويض الكربون في الإمارات",
        subtitle: "رمز إزرع - عوائد مستدامة مع تأثير بيئي",
        description: "انضم إلى أول منصة لتعويض الكربون تعمل بتقنية البلوكشين في الإمارات كمستثمر. اكسب حصة من إيرادات رسوم المنصة، وشارك في الحوكمة، وساهم في تحقيق أهداف الحياد الصفري 2050.",
        cta: "ابدأ الاستثمار"
      },
      quickStats: [
      { label: "سعر الرمز", value: "$0.10", icon: "DollarSign" },
      { label: "الحد الأدنى للاستثمار", value: "$1,000", icon: "Wallet" },
      { label: "حصة الإيرادات", value: "40%", icon: "TrendingUp" },
      { label: "APY المتوقع", value: "12-18%", icon: "BarChart" }]

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
              src="https://img.rocket.new/generatedImages/rocket_gen_img_15884c7da-1766402114794.png"
              alt="Investment growth chart representing IZRA token opportunities"
              className="w-full h-full object-cover" />

            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
          </div>

          <div className="container-safe relative z-10 py-16 md:py-20">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Icon name="TrendingUp" size={20} className="text-primary" />
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

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
                {text?.quickStats?.map((stat, index) =>
                <div key={index} className="bg-background/80 backdrop-blur-sm rounded-lg p-4 border border-border">
                    <Icon name={stat?.icon} size={20} className="text-primary mb-2" />
                    <div className="text-xl font-bold text-foreground mb-1">
                      {stat?.value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {stat?.label}
                    </div>
                  </div>
                )}
              </div>

              <Button
                variant="default"
                size="lg"
                iconName="ArrowRight"
                iconPosition="right"
                onClick={() => navigate('/login')}>

                {text?.hero?.cta}
              </Button>
            </div>
          </div>
        </section>

        <InvestmentOverviewSection currentLanguage={currentLanguage} />
        <TokenAcquisitionSection currentLanguage={currentLanguage} />
        <InvestmentCalculatorSection currentLanguage={currentLanguage} />
        <RiskDisclosureSection currentLanguage={currentLanguage} />
        <InvestorBenefitsSection currentLanguage={currentLanguage} />
        <KYCRequirementsSection currentLanguage={currentLanguage} />
        <FooterSection currentLanguage={currentLanguage} />
      </main>
    </div>);

};

export default InvestInIzra;