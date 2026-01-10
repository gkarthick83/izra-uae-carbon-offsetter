import React from 'react';
import Icon from '../../../components/AppIcon';

const TokenUtility = ({ currentLanguage }) => {
  const content = {
    en: {
      title: "IZRA Token Utility",
      subtitle: "Multiple Use Cases Within the Ecosystem",
      utilities: [
        {
          icon: "Percent",
          title: "Platform Fee Discounts",
          description: "Hold IZRA tokens to receive up to 10% discount on all marketplace transaction fees.",
          value: "Up to 10%"
        },
        {
          icon: "TrendingUp",
          title: "Staking Rewards",
          description: "Stake IZRA tokens to earn passive income from platform revenue sharing.",
          value: "8-15% APY"
        },
        {
          icon: "Vote",
          title: "Governance Rights",
          description: "Participate in platform decisions including project approvals and fee structures.",
          value: "1 Token = 1 Vote"
        },
        {
          icon: "Star",
          title: "Exclusive Access",
          description: "Early access to premium carbon credit projects and special investment opportunities.",
          value: "VIP Benefits"
        }
      ]
    },
    ar: {
      title: "فائدة رمز إزرا",
      subtitle: "حالات استخدام متعددة داخل النظام البيئي",
      utilities: [
        {
          icon: "Percent",
          title: "خصومات رسوم المنصة",
          description: "احتفظ برموز إزرا للحصول على خصم يصل إلى 10٪ على جميع رسوم معاملات السوق.",
          value: "حتى 10٪"
        },
        {
          icon: "TrendingUp",
          title: "مكافآت الرهن",
          description: "قم برهن رموز إزرا لكسب دخل سلبي من مشاركة إيرادات المنصة.",
          value: "8-15٪ APY"
        },
        {
          icon: "Vote",
          title: "حقوق الحوكمة",
          description: "شارك في قرارات المنصة بما في ذلك الموافقات على المشاريع وهياكل الرسوم.",
          value: "1 رمز = 1 صوت"
        },
        {
          icon: "Star",
          title: "وصول حصري",
          description: "الوصول المبكر إلى مشاريع أرصدة الكربون المميزة وفرص الاستثمار الخاصة.",
          value: "مزايا VIP"
        }
      ]
    }
  };

  const text = content?.[currentLanguage];

  return (
    <section className="py-16 md:py-20 bg-card">
      <div className="container-safe">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {text?.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {text?.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {text?.utilities?.map((utility, index) => (
            <div
              key={index}
              className="p-6 bg-background rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Icon name={utility?.icon} size={32} className="text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary">
                  {utility?.value}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {utility?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {utility?.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TokenUtility;