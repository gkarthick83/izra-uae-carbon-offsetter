import React from 'react';
import Icon from '../../../components/AppIcon';

const RevenueSharing = ({ currentLanguage }) => {
  const content = {
    en: {
      title: "Revenue Sharing Model",
      subtitle: "How Platform Fees Generate Investor Returns",
      feeStructure: [
        {
          type: "Standard Transaction Fee",
          rate: "2%",
          description: "Applied to all carbon credit marketplace transactions"
        },
        {
          type: "Premium Listing Fee",
          rate: "0.5%",
          description: "For featured carbon credit projects"
        },
        {
          type: "Sponsorship Fee",
          rate: "1%",
          description: "Applied to tree sponsorship transactions"
        }
      ],
      distributionTitle: "Fee Distribution",
      distribution: [
        { label: "Staking Rewards Pool", percentage: 50, color: "#10b981" },
        { label: "Platform Operations", percentage: 25, color: "#3b82f6" },
        { label: "Token Buyback & Burn", percentage: 15, color: "#f59e0b" },
        { label: "Development Fund", percentage: 10, color: "#8b5cf6" }
      ],
      benefitsTitle: "IZRA Holder Benefits",
      benefits: [
        "Proportional share of 50% of all platform fees",
        "Monthly distribution to staked token holders",
        "Compound growth through auto-reinvestment option",
        "Increased token value through buyback mechanism"
      ]
    },
    ar: {
      title: "نموذج مشاركة الإيرادات",
      subtitle: "كيف تولد رسوم المنصة عوائد المستثمرين",
      feeStructure: [
        {
          type: "رسوم المعاملات القياسية",
          rate: "2٪",
          description: "تطبق على جميع معاملات سوق أرصدة الكربون"
        },
        {
          type: "رسوم القائمة المميزة",
          rate: "0.5٪",
          description: "لمشاريع أرصدة الكربون المميزة"
        },
        {
          type: "رسوم الرعاية",
          rate: "1٪",
          description: "تطبق على معاملات رعاية الأشجار"
        }
      ],
      distributionTitle: "توزيع الرسوم",
      distribution: [
        { label: "مجمع مكافآت الرهن", percentage: 50, color: "#10b981" },
        { label: "عمليات المنصة", percentage: 25, color: "#3b82f6" },
        { label: "إعادة شراء وحرق الرموز", percentage: 15, color: "#f59e0b" },
        { label: "صندوق التطوير", percentage: 10, color: "#8b5cf6" }
      ],
      benefitsTitle: "فوائد حامل إزرا",
      benefits: [
        "حصة متناسبة من 50٪ من جميع رسوم المنصة",
        "التوزيع الشهري لحاملي الرموز المرهونة",
        "النمو المركب من خلال خيار إعادة الاستثمار التلقائي",
        "زيادة قيمة الرمز من خلال آلية إعادة الشراء"
      ]
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
          <div className="space-y-6">
            <div className="p-6 bg-card rounded-2xl border border-border">
              <h3 className="text-xl font-bold text-foreground mb-6">
                {currentLanguage === 'en' ? 'Platform Fee Structure' : 'هيكل رسوم المنصة'}
              </h3>
              <div className="space-y-4">
                {text?.feeStructure?.map((fee, index) => (
                  <div key={index} className="p-4 bg-background rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-foreground text-sm">{fee?.type}</span>
                      <span className="text-2xl font-bold text-primary">{fee?.rate}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{fee?.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl border border-primary/20">
              <h3 className="text-xl font-bold text-foreground mb-4">
                {text?.benefitsTitle}
              </h3>
              <ul className="space-y-3">
                {text?.benefits?.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Icon name="CheckCircle" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-8 bg-card rounded-2xl border border-border">
            <h3 className="text-xl font-bold text-foreground mb-6">
              {text?.distributionTitle}
            </h3>
            <div className="space-y-6">
              {text?.distribution?.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{item?.label}</span>
                    <span className="text-sm font-bold text-foreground">{item?.percentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${item?.percentage}%`, backgroundColor: item?.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg">
                <Icon name="DollarSign" size={32} className="text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">
                    {currentLanguage === 'en' ? 'Monthly Revenue to Stakers' : 'الإيرادات الشهرية للمراهنين'}
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {currentLanguage === 'en' ? '~$50,000+' : '~50,000 دولار+'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevenueSharing;