import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const MarketplacePreviewSection = ({ currentLanguage, onNavigate }) => {
  const content = {
    en: {
      title: "Carbon Credit Marketplace",
      subtitle: "Trade Verified Carbon Credits with Confidence",
      description: "Access a diverse portfolio of verified carbon offset projects. Buy credits from UAE mangrove restoration, solar energy, and international afforestation initiatives.",
      exploreCTA: "Explore Marketplace",
      sellCTA: "Become a Seller"
    },
    ar: {
      title: "سوق أرصدة الكربون",
      subtitle: "تداول أرصدة الكربون الموثقة بثقة",
      description: "الوصول إلى محفظة متنوعة من مشاريع تعويض الكربون الموثقة. شراء الأرصدة من استعادة المانغروف في الإمارات والطاقة الشمسية ومبادرات التشجير الدولية.",
      exploreCTA: "استكشف السوق",
      sellCTA: "كن بائعًا"
    }
  };

  const projects = [
  {
    id: 1,
    name: { en: "Abu Dhabi Mangrove Restoration", ar: "استعادة المانغروف في أبوظبي" },
    type: { en: "Mangrove", ar: "المانغروف" },
    location: { en: "Abu Dhabi, UAE", ar: "أبوظبي، الإمارات" },
    available: 500,
    price: 45,
    verified: "Verra",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1faf92d57-1765333913332.png",
    imageAlt: "Abu Dhabi mangrove restoration project showing healthy green mangrove trees with extensive root systems in coastal waters",
    tag: "UAE"
  },
  {
    id: 2,
    name: { en: "Dubai Solar Farm Initiative", ar: "مبادرة مزرعة دبي الشمسية" },
    type: { en: "Solar Energy", ar: "الطاقة الشمسية" },
    location: { en: "Dubai, UAE", ar: "دبي، الإمارات" },
    available: 1200,
    price: 38,
    verified: "Gold Standard",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_18363b4a5-1766183617080.png",
    imageAlt: "Large-scale solar panel farm in Dubai desert with rows of photovoltaic panels under bright sunlight generating clean energy",
    tag: "UAE"
  },
  {
    id: 3,
    name: { en: "Amazon Rainforest Conservation", ar: "حفظ غابات الأمازون المطيرة" },
    type: { en: "Afforestation", ar: "التشجير" },
    location: { en: "Brazil", ar: "البرازيل" },
    available: 800,
    price: 52,
    verified: "Verra",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_18bdaa31b-1765233010316.png",
    imageAlt: "Dense Amazon rainforest canopy with towering trees and lush green vegetation protecting biodiversity and sequestering carbon",
    tag: "International"
  }];


  const text = content?.[currentLanguage];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-muted/30">
      <div className="container-safe">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">
            {text?.title}
          </h2>
          <p className="text-lg md:text-xl text-primary font-semibold mb-4">
            {text?.subtitle}
          </p>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            {text?.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
          {projects?.map((project) =>
          <div
            key={project?.id}
            className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-smooth hover-lift">

              <div className="relative h-48 md:h-56 overflow-hidden">
                <Image
                src={project?.image}
                alt={project?.imageAlt}
                className="w-full h-full object-cover group-hover:scale-110 transition-smooth" />

                <div className="absolute top-4 left-4 flex gap-2">
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                project?.tag === 'UAE' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`
                }>
                    {project?.tag}
                  </div>
                  <div className="px-3 py-1 rounded-full bg-success text-success-foreground text-xs font-semibold flex items-center gap-1">
                    <Icon name="CheckCircle2" size={14} />
                    {project?.verified}
                  </div>
                </div>
              </div>

              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 line-clamp-2">
                  {project?.name?.[currentLanguage]}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Tag" size={16} className="text-primary" />
                    <span>{project?.type?.[currentLanguage]}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="MapPin" size={16} className="text-primary" />
                    <span>{project?.location?.[currentLanguage]}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">
                      {currentLanguage === 'en' ? 'Available' : 'متاح'}
                    </div>
                    <div className="text-lg font-bold text-foreground">
                      {project?.available} {currentLanguage === 'en' ? 'tonnes' : 'طن'}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground mb-1">
                      {currentLanguage === 'en' ? 'Price/tonne' : 'السعر/طن'}
                    </div>
                    <div className="text-lg font-bold text-primary">
                      {project?.price} {currentLanguage === 'en' ? 'AED' : 'درهم'}
                    </div>
                  </div>
                </div>

                <Button
                variant="outline"
                size="default"
                iconName="ShoppingCart"
                iconPosition="left"
                onClick={() => onNavigate('/carbon-credit-marketplace')}
                fullWidth
                className="mt-4">

                  {currentLanguage === 'en' ? 'View Details' : 'عرض التفاصيل'}
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="default"
            size="lg"
            iconName="Store"
            iconPosition="left"
            onClick={() => onNavigate('/carbon-credit-marketplace')}>

            {text?.exploreCTA}
          </Button>
          <Button
            variant="outline"
            size="lg"
            iconName="Briefcase"
            iconPosition="left"
            onClick={() => onNavigate('/seller-portal')}>

            {text?.sellCTA}
          </Button>
        </div>
      </div>
    </section>);

};

export default MarketplacePreviewSection;