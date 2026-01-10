import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticatedHeader from '../../components/ui/AuthenticatedHeader';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import Button from '../../components/ui/Button';
import TokenDistributionSection from './components/TokenDistributionSection';
import UtilitySection from './components/UtilitySection';
import RevenueModelSection from './components/RevenueModelSection';
import StakingSection from './components/StakingSection';
import RoadmapSection from './components/RoadmapSection';
import FooterSection from '../landing-page/components/FooterSection';

const Tokenomics = () => {
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
        badge: "IZRA Token Economics",
        title: "Powering Sustainable Growth",
        subtitle: "Transparent Token Model Aligned with Environmental Impact",
        description: "IZRA token serves as the economic engine of our carbon offset ecosystem, enabling governance, revenue sharing, and incentivizing environmental action across the UAE.",
        cta: "Invest in IZRA"
      },
      stats: [
      { label: "Total Supply", value: "1,000,000,000", suffix: "IZRA" },
      { label: "Initial Price", value: "$0.10", suffix: "USD" },
      { label: "Platform Fee", value: "2%", suffix: "" },
      { label: "Investor Share", value: "40%", suffix: "" }]

    },
    ar: {
      hero: {
        badge: "اقتصاديات رمز إزرع",
        title: "تعزيز النمو المستدام",
        subtitle: "نموذج رمز شفاف يتماشى مع التأثير البيئي",
        description: "يعمل رمز إزرع كمحرك اقتصادي لنظام تعويض الكربون الخاص بنا، مما يتيح الحوكمة ومشاركة الإيرادات وتحفيز العمل البيئي في جميع أنحاء الإمارات.",
        cta: "استثمر في إزرع"
      },
      stats: [
      { label: "إجمالي العرض", value: "1,000,000,000", suffix: "إزرع" },
      { label: "السعر الأولي", value: "$0.10", suffix: "دولار" },
      { label: "رسوم المنصة", value: "2%", suffix: "" },
      { label: "حصة المستثمر", value: "40%", suffix: "" }]

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
              src="https://img.rocket.new/generatedImages/rocket_gen_img_140eb1e41-1766402113127.png"
              alt="Digital cryptocurrency tokens representing IZRA tokenomics"
              className="w-full h-full object-cover" />

            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
          </div>

          <div className="container-safe relative z-10 py-16 md:py-20">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Icon name="DollarSign" size={20} className="text-primary" />
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
                {text?.stats?.map((stat, index) =>
                <div key={index} className="bg-background/80 backdrop-blur-sm rounded-lg p-4 border border-border">
                    <div className="text-2xl font-bold text-primary mb-1">
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
                iconName="TrendingUp"
                iconPosition="right"
                onClick={() => navigate('/invest-in-izra')}>

                {text?.hero?.cta}
              </Button>
            </div>
          </div>
        </section>

        <TokenDistributionSection currentLanguage={currentLanguage} />
        <UtilitySection currentLanguage={currentLanguage} />
        <RevenueModelSection currentLanguage={currentLanguage} />
        <StakingSection currentLanguage={currentLanguage} />
        <RoadmapSection currentLanguage={currentLanguage} />
        <FooterSection currentLanguage={currentLanguage} />
      </main>
    </div>);

};

export default Tokenomics;