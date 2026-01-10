import React from 'react';
import Icon from '../../../components/AppIcon';

const EconomicModel = ({ currentLanguage }) => {
  const content = {
    en: {
      title: "Economic Model",
      subtitle: "Token Distribution & Allocation",
      distribution: [
        { label: "Public Sale", value: 30, color: "#10b981" },
        { label: "Staking Rewards", value: 25, color: "#3b82f6" },
        { label: "Team & Advisors", value: 15, color: "#8b5cf6" },
        { label: "Treasury", value: 20, color: "#f59e0b" },
        { label: "Ecosystem Development", value: 10, color: "#ec4899" }
      ],
      totalSupply: "1,000,000,000 IZRA",
      vestingTitle: "Vesting Schedule",
      vesting: [
        { category: "Public Sale", schedule: "No lock-up, immediate liquidity" },
        { category: "Team & Advisors", schedule: "2-year vesting with 6-month cliff" },
        { category: "Treasury", schedule: "Released quarterly based on governance" },
        { category: "Staking Rewards", schedule: "Distributed monthly over 5 years" }
      ],
      burnMechanism: "Token Burn Mechanism",
      burnDesc: "2% of all platform fees are used to buy back and burn IZRA tokens, creating deflationary pressure and increasing token value over time."
    },
    ar: {
      title: "النموذج الاقتصادي",
      subtitle: "توزيع وتخصيص الرموز",
      distribution: [
        { label: "البيع العام", value: 30, color: "#10b981" },
        { label: "مكافآت الرهن", value: 25, color: "#3b82f6" },
        { label: "الفريق والمستشارون", value: 15, color: "#8b5cf6" },
        { label: "الخزينة", value: 20, color: "#f59e0b" },
        { label: "تطوير النظام البيئي", value: 10, color: "#ec4899" }
      ],
      totalSupply: "1,000,000,000 إزرا",
      vestingTitle: "جدول الاستحقاق",
      vesting: [
        { category: "البيع العام", schedule: "بدون قفل، سيولة فورية" },
        { category: "الفريق والمستشارون", schedule: "استحقاق لمدة عامين مع فترة انتظار 6 أشهر" },
        { category: "الخزينة", schedule: "يتم الإصدار ربع سنوي بناءً على الحوكمة" },
        { category: "مكافآت الرهن", schedule: "يتم التوزيع شهريًا على مدى 5 سنوات" }
      ],
      burnMechanism: "آلية حرق الرموز",
      burnDesc: "يتم استخدام 2٪ من جميع رسوم المنصة لإعادة شراء وحرق رموز إزرا، مما يخلق ضغطًا انكماشيًا ويزيد من قيمة الرمز بمرور الوقت."
    }
  };

  const text = content?.[currentLanguage];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container-safe">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {text?.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {text?.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="p-8 bg-card rounded-2xl border border-border">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
              {currentLanguage === 'en' ? 'Token Distribution' : 'توزيع الرموز'}
            </h3>
            <div className="space-y-4">
              {text?.distribution?.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{item?.label}</span>
                    <span className="text-sm font-bold text-foreground">{item?.value}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${item?.value}%`, backgroundColor: item?.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-border text-center">
              <p className="text-sm text-muted-foreground mb-2">
                {currentLanguage === 'en' ? 'Total Supply' : 'الإمداد الكلي'}
              </p>
              <p className="text-3xl font-bold text-primary">{text?.totalSupply}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-card rounded-2xl border border-border">
              <h3 className="text-xl font-bold text-foreground mb-4">
                {text?.vestingTitle}
              </h3>
              <div className="space-y-4">
                {text?.vesting?.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Icon name="Clock" size={20} className="text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">{item?.category}</p>
                      <p className="text-xs text-muted-foreground">{item?.schedule}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl border border-primary/20">
              <div className="flex items-center gap-3 mb-3">
                <Icon name="Flame" size={24} className="text-primary" />
                <h3 className="text-xl font-bold text-foreground">
                  {text?.burnMechanism}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {text?.burnDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EconomicModel;