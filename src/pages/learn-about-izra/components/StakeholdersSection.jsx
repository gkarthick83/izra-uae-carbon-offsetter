import React from 'react';
import Icon from '../../../components/AppIcon';

const StakeholdersSection = ({ currentLanguage }) => {
  const content = {
    en: {
      title: "Platform Stakeholders",
      subtitle: "Diverse Roles, Unified Environmental Goal",
      stakeholders: [
        {
          icon: "Heart",
          title: "Sponsors",
          description: "Individuals and organizations planting mangrove trees across UAE emirates, receiving blockchain certificates and impact tracking.",
          benefits: ["Digital NFT Certificates", "Real-time Impact Dashboard", "Tax Deduction Eligibility"]
        },
        {
          icon: "Briefcase",
          title: "Carbon Credit Sellers",
          description: "Project developers registering verified carbon offset initiatives, minting tradeable credits after rigorous validation.",
          benefits: ["Project Registration", "Credit Tokenization", "Revenue from Sales"]
        },
        {
          icon: "ShoppingBag",
          title: "Carbon Credit Buyers",
          description: "Businesses and individuals purchasing verified credits to offset their carbon footprint and meet sustainability goals.",
          benefits: ["Verified Carbon Credits", "Blockchain Transparency", "Compliance Reporting"]
        },
        {
          icon: "TrendingUp",
          title: "IZRA Token Investors",
          description: "Stakeholders investing in IZRA tokens, earning platform revenue share and governance rights in the ecosystem.",
          benefits: ["Revenue Sharing", "Governance Voting", "Staking Rewards"]
        }
      ]
    },
    ar: {
      title: "أصحاب المصلحة في المنصة",
      subtitle: "أدوار متنوعة، هدف بيئي موحد",
      stakeholders: [
        {
          icon: "Heart",
          title: "الرعاة",
          description: "الأفراد والمنظمات التي تزرع أشجار المانغروف في جميع أنحاء إمارات الدولة، وتتلقى شهادات البلوكشين وتتبع التأثير.",
          benefits: ["شهادات NFT الرقمية", "لوحة تحكم التأثير الفوري", "أهلية الخصم الضريبي"]
        },
        {
          icon: "Briefcase",
          title: "بائعو أرصدة الكربون",
          description: "مطورو المشاريع الذين يسجلون مبادرات تعويض الكربون المعتمدة، وينتجون أرصدة قابلة للتداول بعد التحقق الصارم.",
          benefits: ["تسجيل المشروع", "ترميز الأرصدة", "الإيرادات من المبيعات"]
        },
        {
          icon: "ShoppingBag",
          title: "مشترو أرصدة الكربون",
          description: "الشركات والأفراد الذين يشترون أرصدة معتمدة لتعويض بصمتهم الكربونية وتحقيق أهداف الاستدامة.",
          benefits: ["أرصدة كربون معتمدة", "شفافية البلوكشين", "تقارير الامتثال"]
        },
        {
          icon: "TrendingUp",
          title: "مستثمرو رمز إزرع",
          description: "أصحاب المصلحة الذين يستثمرون في رموز إزرع، ويكسبون حصة من إيرادات المنصة وحقوق الحوكمة في النظام البيئي.",
          benefits: ["مشاركة الإيرادات", "التصويت على الحوكمة", "مكافآت الستاكينغ"]
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {text?.stakeholders?.map((stakeholder, index) => (
            <div key={index} className="bg-background rounded-xl p-6 shadow-sm border border-border">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name={stakeholder?.icon} size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {stakeholder?.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {stakeholder?.description}
                  </p>
                </div>
              </div>
              <div className="space-y-2 mt-4">
                {stakeholder?.benefits?.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Icon name="Check" size={16} className="text-primary flex-shrink-0" />
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

export default StakeholdersSection;