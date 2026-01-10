import React from 'react';
import Icon from '../../../components/AppIcon';

const StakingSection = ({ currentLanguage }) => {
  const content = {
    en: {
      title: "Staking Program",
      subtitle: "Lock Tokens, Earn Rewards, Increase Influence",
      tiers: [
        {
          name: "Bronze",
          minStake: "10,000 IZRA",
          apy: "8%",
          lockPeriod: "3 months",
          benefits: ["8% APY", "Basic governance voting", "Standard marketplace access"],
          color: "border-amber-700",
          bgColor: "bg-amber-50"
        },
        {
          name: "Silver",
          minStake: "50,000 IZRA",
          apy: "12%",
          lockPeriod: "6 months",
          benefits: ["12% APY", "Enhanced voting power (2x)", "5% marketplace discount", "Priority support"],
          color: "border-gray-400",
          bgColor: "bg-gray-50"
        },
        {
          name: "Gold",
          minStake: "100,000 IZRA",
          apy: "18%",
          lockPeriod: "12 months",
          benefits: ["18% APY", "Maximum voting power (3x)", "10% marketplace discount", "Exclusive project access", "Premium analytics"],
          color: "border-yellow-500",
          bgColor: "bg-yellow-50",
          featured: true
        }
      ]
    },
    ar: {
      title: "برنامج الستاكينغ",
      subtitle: "قفل الرموز، اكسب المكافآت، زيادة التأثير",
      tiers: [
        {
          name: "البرونزية",
          minStake: "10,000 إزرع",
          apy: "8%",
          lockPeriod: "3 أشهر",
          benefits: ["8٪ APY", "التصويت الأساسي على الحوكمة", "الوصول القياسي إلى السوق"],
          color: "border-amber-700",
          bgColor: "bg-amber-50"
        },
        {
          name: "الفضية",
          minStake: "50,000 إزرع",
          apy: "12%",
          lockPeriod: "6 أشهر",
          benefits: ["12٪ APY", "قوة تصويت محسّنة (2x)", "خصم 5٪ في السوق", "دعم ذو أولوية"],
          color: "border-gray-400",
          bgColor: "bg-gray-50"
        },
        {
          name: "الذهبية",
          minStake: "100,000 إزرع",
          apy: "18%",
          lockPeriod: "12 شهرًا",
          benefits: ["18٪ APY", "أقصى قوة تصويت (3x)", "خصم 10٪ في السوق", "وصول حصري للمشروع", "تحليلات متميزة"],
          color: "border-yellow-500",
          bgColor: "bg-yellow-50",
          featured: true
        }
      ]
    }
  };

  const text = content?.[currentLanguage];

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container-safe">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {text?.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {text?.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {text?.tiers?.map((tier, index) => (
            <div 
              key={index} 
              className={`bg-background rounded-xl p-6 border-2 ${tier?.color} ${tier?.featured ? 'shadow-lg scale-105' : 'shadow-sm'} transition-transform hover:scale-105`}
            >
              {tier?.featured && (
                <div className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                  {currentLanguage === 'en' ? 'MOST POPULAR' : 'الأكثر شعبية'}
                </div>
              )}
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {tier?.name}
              </h3>
              <div className="text-3xl font-bold text-primary mb-4">
                {tier?.apy}
                <span className="text-sm text-muted-foreground ml-1">APY</span>
              </div>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Lock" size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">{tier?.minStake}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Clock" size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">{tier?.lockPeriod}</span>
                </div>
              </div>
              <div className="space-y-2">
                {tier?.benefits?.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StakingSection;