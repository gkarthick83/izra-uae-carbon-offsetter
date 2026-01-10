import React from 'react';
import Icon from '../../../components/AppIcon';

const PlatformBenefits = ({ currentLanguage }) => {
  const content = {
    en: {
      title: "Platform Benefits",
      subtitle: "Multi-Stakeholder Ecosystem",
      stakeholders: [
        {
          icon: "Users",
          title: "For Sponsors",
          benefits: [
            "Direct environmental impact through tree sponsorship",
            "Blockchain-verified certificates",
            "Real-time tracking of sponsored trees",
            "Corporate sustainability reporting"
          ]
        },
        {
          icon: "TrendingUp",
          title: "For Investors",
          benefits: [
            "Revenue sharing from platform fees",
            "IZRA token staking rewards",
            "Governance voting rights",
            "Portfolio diversification with environmental assets"
          ]
        },
        {
          icon: "Store",
          title: "For Sellers",
          benefits: [
            "Access to verified carbon credit marketplace",
            "Automated smart contract settlements",
            "Global buyer network",
            "Verra registry integration"
          ]
        },
        {
          icon: "ShoppingCart",
          title: "For Buyers",
          benefits: [
            "Verified UAE-based carbon credits",
            "NFT ownership certificates",
            "Transparent pricing and impact metrics",
            "Corporate ESG compliance support"
          ]
        }
      ]
    },
    ar: {
      title: "فوائد المنصة",
      subtitle: "نظام بيئي متعدد أصحاب المصلحة",
      stakeholders: [
        {
          icon: "Users",
          title: "للرعاة",
          benefits: [
            "تأثير بيئي مباشر من خلال رعاية الأشجار",
            "شهادات معتمدة على البلوكشين",
            "تتبع في الوقت الفعلي للأشجار المرعاة",
            "تقارير الاستدامة المؤسسية"
          ]
        },
        {
          icon: "TrendingUp",
          title: "للمستثمرين",
          benefits: [
            "مشاركة الإيرادات من رسوم المنصة",
            "مكافآت رهن رمز IZRA",
            "حقوق التصويت على الحوكمة",
            "تنويع المحفظة بالأصول البيئية"
          ]
        },
        {
          icon: "Store",
          title: "للبائعين",
          benefits: [
            "الوصول إلى سوق أرصدة الكربون المعتمدة",
            "تسويات العقود الذكية الآلية",
            "شبكة المشترين العالمية",
            "تكامل سجل فيرا"
          ]
        },
        {
          icon: "ShoppingCart",
          title: "للمشترين",
          benefits: [
            "أرصدة كربون معتمدة من الإمارات",
            "شهادات ملكية NFT",
            "تسعير شفاف ومقاييس التأثير",
            "دعم الامتثال لمعايير ESG المؤسسية"
          ]
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {text?.stakeholders?.map((stakeholder, index) => (
            <div
              key={index}
              className="p-6 bg-background rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon name={stakeholder?.icon} size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {stakeholder?.title}
                </h3>
              </div>
              <ul className="space-y-3">
                {stakeholder?.benefits?.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformBenefits;