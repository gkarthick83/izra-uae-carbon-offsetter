import React from 'react';
import Icon from '../../../components/AppIcon';

const InvestorBenefitsSection = ({ currentLanguage }) => {
  const content = {
    en: {
      title: "Investor Benefits",
      subtitle: "Exclusive Advantages for IZRA Token Holders",
      benefits: [
        {
          icon: "Vote",
          title: "Governance Voting Rights",
          description: "Participate in platform decisions including fee structures, project approvals, and ecosystem development.",
          features: ["Proposal Submission", "Voting Power Based on Holdings", "Quarterly Governance Meetings"]
        },
        {
          icon: "Zap",
          title: "Exclusive Platform Access",
          description: "Priority access to new carbon credit projects, early investment opportunities, and premium marketplace features.",
          features: ["Early Project Access", "Premium Analytics", "Priority Support"]
        },
        {
          icon: "Target",
          title: "Early Project Opportunities",
          description: "First access to high-quality carbon offset projects before public listing, maximizing investment potential.",
          features: ["Pre-Launch Access", "Discounted Pricing", "Exclusive Projects"]
        },
        {
          icon: "Award",
          title: "Community Recognition",
          description: "Recognition as environmental leader, exclusive events, networking opportunities with sustainability professionals.",
          features: ["Investor Badge", "Exclusive Events", "Networking Forums"]
        },
        {
          icon: "BarChart",
          title: "Advanced Analytics",
          description: "Access to premium platform analytics, market insights, and investment performance tracking tools.",
          features: ["Real-Time Dashboards", "Market Reports", "Performance Metrics"]
        },
        {
          icon: "Gift",
          title: "Loyalty Rewards",
          description: "Additional token rewards for long-term holding, platform engagement, and referral programs.",
          features: ["Holding Bonuses", "Referral Rewards", "Activity Incentives"]
        }
      ]
    },
    ar: {
      title: "فوائد المستثمر",
      subtitle: "مزايا حصرية لحاملي رموز إزرع",
      benefits: [
        {
          icon: "Vote",
          title: "حقوق التصويت على الحوكمة",
          description: "شارك في قرارات المنصة بما في ذلك هياكل الرسوم وموافقات المشاريع وتطوير النظام البيئي.",
          features: ["تقديم المقترحات", "قوة التصويت بناءً على الحيازات", "اجتماعات الحوكمة الفصلية"]
        },
        {
          icon: "Zap",
          title: "الوصول الحصري للمنصة",
          description: "الوصول ذو الأولوية إلى مشاريع أرصدة الكربون الجديدة وفرص الاستثمار المبكرة وميزات السوق المميزة.",
          features: ["الوصول المبكر للمشروع", "تحليلات متميزة", "دعم ذو أولوية"]
        },
        {
          icon: "Target",
          title: "فرص المشاريع المبكرة",
          description: "الوصول الأول إلى مشاريع تعويض الكربون عالية الجودة قبل الإدراج العام، مما يزيد من إمكانات الاستثمار.",
          features: ["الوصول قبل الإطلاق", "تسعير مخفض", "مشاريع حصرية"]
        },
        {
          icon: "Award",
          title: "التقدير المجتمعي",
          description: "الاعتراف كقائد بيئي، وفعاليات حصرية، وفرص التواصل مع محترفي الاستدامة.",
          features: ["شارة المستثمر", "فعاليات حصرية", "منتديات التواصل"]
        },
        {
          icon: "BarChart",
          title: "تحليلات متقدمة",
          description: "الوصول إلى تحليلات المنصة المميزة ورؤى السوق وأدوات تتبع أداء الاستثمار.",
          features: ["لوحات معلومات في الوقت الفعلي", "تقارير السوق", "مقاييس الأداء"]
        },
        {
          icon: "Gift",
          title: "مكافآت الولاء",
          description: "مكافآت رمزية إضافية للحيازة طويلة الأجل والمشاركة في المنصة وبرامج الإحالة.",
          features: ["مكافآت الحيازة", "مكافآت الإحالة", "حوافز النشاط"]
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {text?.benefits?.map((benefit, index) => (
            <div key={index} className="bg-background rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Icon name={benefit?.icon} size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {benefit?.title}
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {benefit?.description}
              </p>
              <div className="space-y-2">
                {benefit?.features?.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Icon name="Check" size={16} className="text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
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

export default InvestorBenefitsSection;