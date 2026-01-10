import React from 'react';
import Icon from '../../../components/AppIcon';

const UtilitySection = ({ currentLanguage }) => {
  const content = {
    en: {
      title: "Token Utility",
      subtitle: "Multiple Use Cases Within the Ecosystem",
      utilities: [
        {
          icon: "Vote",
          title: "Governance Rights",
          description: "Token holders vote on platform decisions, project approvals, fee structures, and ecosystem development priorities."
        },
        {
          icon: "DollarSign",
          title: "Revenue Sharing",
          description: "40% of platform transaction fees (2% of all trades) are distributed proportionally to IZRA token holders."
        },
        {
          icon: "Lock",
          title: "Staking Rewards",
          description: "Stake IZRA tokens to earn additional rewards, access premium features, and increase governance voting power."
        },
        {
          icon: "ShoppingCart",
          title: "Marketplace Access",
          description: "Use IZRA tokens for discounted carbon credit purchases and priority access to new project listings."
        },
        {
          icon: "Award",
          title: "Exclusive Benefits",
          description: "Token holders receive early access to new features, premium analytics, and exclusive environmental initiatives."
        },
        {
          icon: "Users",
          title: "Community Rewards",
          description: "Earn IZRA tokens through platform engagement, referrals, environmental impact milestones, and community contributions."
        }
      ]
    },
    ar: {
      title: "فائدة الرمز",
      subtitle: "حالات استخدام متعددة داخل النظام البيئي",
      utilities: [
        {
          icon: "Vote",
          title: "حقوق الحوكمة",
          description: "يصوت حاملو الرموز على قرارات المنصة، وموافقات المشاريع، وهياكل الرسوم، وأولويات تطوير النظام البيئي."
        },
        {
          icon: "DollarSign",
          title: "مشاركة الإيرادات",
          description: "يتم توزيع 40٪ من رسوم معاملات المنصة (2٪ من جميع الصفقات) بشكل متناسب على حاملي رموز إزرع."
        },
        {
          icon: "Lock",
          title: "مكافآت الستاكينغ",
          description: "قم بتخزين رموز إزرع لكسب مكافآت إضافية، والوصول إلى الميزات المميزة، وزيادة قوة التصويت على الحوكمة."
        },
        {
          icon: "ShoppingCart",
          title: "الوصول إلى السوق",
          description: "استخدم رموز إزرع لشراء أرصدة الكربون بأسعار مخفضة والوصول الأولي إلى قوائم المشاريع الجديدة."
        },
        {
          icon: "Award",
          title: "فوائد حصرية",
          description: "يحصل حاملو الرموز على وصول مبكر إلى الميزات الجديدة والتحليلات المميزة والمبادرات البيئية الحصرية."
        },
        {
          icon: "Users",
          title: "مكافآت المجتمع",
          description: "اكسب رموز إزرع من خلال المشاركة في المنصة والإحالات ومعالم التأثير البيئي ومساهمات المجتمع."
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {text?.utilities?.map((utility, index) => (
            <div key={index} className="bg-background rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Icon name={utility?.icon} size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {utility?.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {utility?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UtilitySection;