import React from 'react';
import Icon from '../../../components/AppIcon';

const HowItWorksSection = ({ currentLanguage }) => {
  const content = {
    en: {
      title: "How IZRA Works",
      subtitle: "A Seamless Carbon Offset Ecosystem",
      steps: [
        {
          number: "01",
          icon: "UserPlus",
          title: "Register & Verify",
          description: "Create your account and complete KYC verification based on your role: Sponsor, Seller, Buyer, or Investor."
        },
        {
          number: "02",
          icon: "TreePine",
          title: "Sponsor or Sell",
          description: "Sponsors plant mangrove trees across UAE emirates. Sellers register verified carbon offset projects and mint credits."
        },
        {
          number: "03",
          icon: "ShoppingCart",
          title: "Trade Credits",
          description: "Browse the marketplace to purchase verified carbon credits. Each transaction is recorded on blockchain for transparency."
        },
        {
          number: "04",
          icon: "Award",
          title: "Track Impact",
          description: "Monitor your environmental impact through personalized dashboards showing CO₂ offset, trees planted, and NFT certificates."
        }
      ]
    },
    ar: {
      title: "كيف تعمل إزرع",
      subtitle: "نظام بيئي سلس لتعويض الكربون",
      steps: [
        {
          number: "01",
          icon: "UserPlus",
          title: "التسجيل والتحقق",
          description: "أنشئ حسابك وأكمل التحقق من الهوية بناءً على دورك: راعي أو بائع أو مشتري أو مستثمر."
        },
        {
          number: "02",
          icon: "TreePine",
          title: "الرعاية أو البيع",
          description: "يزرع الرعاة أشجار المانغروف في جميع أنحاء إمارات الدولة. يسجل البائعون مشاريع تعويض الكربون المعتمدة."
        },
        {
          number: "03",
          icon: "ShoppingCart",
          title: "تداول الأرصدة",
          description: "تصفح السوق لشراء أرصدة الكربون المعتمدة. يتم تسجيل كل معاملة على البلوكشين للشفافية."
        },
        {
          number: "04",
          icon: "Award",
          title: "تتبع التأثير",
          description: "راقب تأثيرك البيئي من خلال لوحات معلومات مخصصة تعرض تعويض ثاني أكسيد الكربون والأشجار المزروعة وشهادات NFT."
        }
      ]
    }
  };

  const text = content?.[currentLanguage];

  return (
    <section className="py-16 md:py-20">
      <div className="container-safe">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {text?.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {text?.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {text?.steps?.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="text-6xl font-bold text-primary/10 absolute -top-4 left-1/2 transform -translate-x-1/2">
                    {step?.number}
                  </div>
                  <div className="relative w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                    <Icon name={step?.icon} size={28} className="text-primary-foreground" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step?.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step?.description}
                </p>
              </div>
              {index < 3 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;