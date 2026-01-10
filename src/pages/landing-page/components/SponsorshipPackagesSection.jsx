import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SponsorshipPackagesSection = ({ currentLanguage, onNavigate }) => {
  const content = {
    en: {
      title: "Choose Your Impact",
      subtitle: "Flexible Sponsorship Packages for Every Budget",
      description: "Start your carbon offset journey with our curated mangrove tree sponsorship packages. Each tree sequesters approximately 12kg of CO₂ annually.",
      customOption: "Custom Quantity Available",
      viewAllCTA: "View All Packages",
      currency: "AED"
    },
    ar: {
      title: "اختر تأثيرك",
      subtitle: "حزم رعاية مرنة لكل ميزانية",
      description: "ابدأ رحلة تعويض الكربون الخاصة بك مع حزم رعاية أشجار المانغروف المنسقة لدينا. تعزل كل شجرة حوالي 12 كجم من ثاني أكسيد الكربون سنويًا.",
      customOption: "كمية مخصصة متاحة",
      viewAllCTA: "عرض جميع الحزم",
      currency: "درهم"
    }
  };

  const packages = [
    {
      id: 1,
      name: { en: "Starter Pack", ar: "حزمة البداية" },
      trees: 5,
      price: 50,
      co2: 60,
      icon: "Sprout",
      color: "success",
      popular: false
    },
    {
      id: 2,
      name: { en: "Growth Pack", ar: "حزمة النمو" },
      trees: 10,
      price: 95,
      co2: 120,
      icon: "TreeDeciduous",
      color: "primary",
      popular: true
    },
    {
      id: 3,
      name: { en: "Impact Pack", ar: "حزمة التأثير" },
      trees: 20,
      price: 180,
      co2: 240,
      icon: "Trees",
      color: "secondary",
      popular: false
    }
  ];

  const text = content?.[currentLanguage];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background">
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
          {packages?.map((pkg) => (
            <div
              key={pkg?.id}
              className={`relative bg-card rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-smooth hover-lift ${
                pkg?.popular ? 'ring-2 ring-primary' : ''
              }`}
            >
              {pkg?.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    {currentLanguage === 'en' ? 'Most Popular' : 'الأكثر شعبية'}
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-2xl bg-${pkg?.color}/10 flex items-center justify-center`}>
                  <Icon name={pkg?.icon} size={32} className={`text-${pkg?.color}`} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                  {pkg?.name?.[currentLanguage]}
                </h3>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-3xl md:text-4xl font-bold text-foreground">
                    {pkg?.price}
                  </span>
                  <span className="text-lg text-muted-foreground">{text?.currency}</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Icon name="TreePine" size={20} className="text-success" />
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground">
                      {currentLanguage === 'en' ? 'Mangrove Trees' : 'أشجار المانغروف'}
                    </div>
                    <div className="text-lg font-bold text-foreground">{pkg?.trees}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Icon name="Leaf" size={20} className="text-primary" />
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground">
                      {currentLanguage === 'en' ? 'Annual CO₂ Offset' : 'تعويض ثاني أكسيد الكربون السنوي'}
                    </div>
                    <div className="text-lg font-bold text-foreground">{pkg?.co2} kg</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Icon name="Award" size={20} className="text-accent" />
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground">
                      {currentLanguage === 'en' ? 'Digital Certificate' : 'شهادة رقمية'}
                    </div>
                    <div className="text-lg font-bold text-foreground">
                      {currentLanguage === 'en' ? 'Included' : 'متضمنة'}
                    </div>
                  </div>
                </div>
              </div>

              <Button
                variant={pkg?.popular ? 'default' : 'outline'}
                size="lg"
                iconName="ArrowRight"
                iconPosition="right"
                onClick={() => onNavigate('/plant-tree-sponsorship')}
                fullWidth
              >
                {currentLanguage === 'en' ? 'Sponsor Now' : 'رعاية الآن'}
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted mb-4">
            <Icon name="Info" size={20} className="text-primary" />
            <span className="text-sm md:text-base text-foreground font-medium">
              {text?.customOption}
            </span>
          </div>
          <div>
            <Button
              variant="outline"
              size="lg"
              iconName="Package"
              iconPosition="left"
              onClick={() => onNavigate('/plant-tree-sponsorship')}
            >
              {text?.viewAllCTA}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorshipPackagesSection;