import React from 'react';
import Icon from '../../../components/AppIcon';

const RoadmapSection = ({ currentLanguage }) => {
  const content = {
    en: {
      title: "Token Roadmap",
      subtitle: "Strategic Development Timeline",
      phases: [
        {
          quarter: "Q1 2025",
          title: "Token Launch",
          status: "upcoming",
          milestones: [
            "Public token sale (30% of supply)",
            "DEX listing and liquidity provision",
            "Initial staking program launch",
            "Governance framework activation"
          ]
        },
        {
          quarter: "Q2 2025",
          title: "Ecosystem Expansion",
          status: "upcoming",
          milestones: [
            "CEX listings on major exchanges",
            "Enhanced staking tiers introduction",
            "First revenue distribution to holders",
            "Partnership token integrations"
          ]
        },
        {
          quarter: "Q3 2025",
          title: "Utility Enhancement",
          status: "upcoming",
          milestones: [
            "Marketplace discount program launch",
            "Advanced governance voting features",
            "Cross-chain bridge implementation",
            "Token burn mechanism activation"
          ]
        },
        {
          quarter: "Q4 2025",
          title: "Global Scaling",
          status: "upcoming",
          milestones: [
            "International market expansion",
            "Institutional investor onboarding",
            "Enhanced tokenomics v2.0",
            "Annual holder rewards distribution"
          ]
        }
      ]
    },
    ar: {
      title: "خارطة طريق الرمز",
      subtitle: "الجدول الزمني للتطوير الاستراتيجي",
      phases: [
        {
          quarter: "الربع الأول 2025",
          title: "إطلاق الرمز",
          status: "upcoming",
          milestones: [
            "بيع الرمز العام (30٪ من العرض)",
            "إدراج DEX وتوفير السيولة",
            "إطلاق برنامج الستاكينغ الأولي",
            "تفعيل إطار الحوكمة"
          ]
        },
        {
          quarter: "الربع الثاني 2025",
          title: "توسيع النظام البيئي",
          status: "upcoming",
          milestones: [
            "إدراجات CEX في البورصات الرئيسية",
            "تقديم مستويات الستاكينغ المحسّنة",
            "أول توزيع إيرادات للحاملين",
            "تكاملات رمز الشراكة"
          ]
        },
        {
          quarter: "الربع الثالث 2025",
          title: "تعزيز الفائدة",
          status: "upcoming",
          milestones: [
            "إطلاق برنامج خصم السوق",
            "ميزات التصويت المتقدمة على الحوكمة",
            "تنفيذ جسر عبر السلاسل",
            "تفعيل آلية حرق الرمز"
          ]
        },
        {
          quarter: "الربع الرابع 2025",
          title: "التوسع العالمي",
          status: "upcoming",
          milestones: [
            "التوسع في الأسواق الدولية",
            "تأهيل المستثمرين المؤسسيين",
            "اقتصاديات الرمز المحسّنة v2.0",
            "توزيع مكافآت الحاملين السنوية"
          ]
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

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
            
            <div className="space-y-8">
              {text?.phases?.map((phase, index) => (
                <div key={index} className="relative">
                  <div className="flex items-start gap-6">
                    <div className="hidden md:flex w-16 h-16 rounded-full bg-primary flex items-center justify-center flex-shrink-0 relative z-10">
                      <Icon name="Calendar" size={24} className="text-primary-foreground" />
                    </div>
                    <div className="flex-1 bg-background rounded-xl p-6 shadow-sm border border-border">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-sm font-semibold text-primary px-3 py-1 rounded-full bg-primary/10">
                          {phase?.quarter}
                        </span>
                        <h3 className="text-xl font-bold text-foreground">
                          {phase?.title}
                        </h3>
                      </div>
                      <ul className="space-y-2">
                        {phase?.milestones?.map((milestone, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Icon name="CheckCircle" size={16} className="text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{milestone}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;