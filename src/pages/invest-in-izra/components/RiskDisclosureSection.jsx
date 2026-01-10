import React from 'react';
import Icon from '../../../components/AppIcon';

const RiskDisclosureSection = ({ currentLanguage }) => {
  const content = {
    en: {
      title: "Risk Disclosure",
      subtitle: "Important Information for Potential Investors",
      intro: "Investing in IZRA tokens involves risks. Please read and understand the following before making any investment decisions:",
      risks: [
        {
          icon: "AlertTriangle",
          title: "Market Volatility",
          description: "Cryptocurrency and token values can fluctuate significantly. IZRA token price may experience substantial volatility based on market conditions, platform adoption, and regulatory changes."
        },
        {
          icon: "TrendingDown",
          title: "No Guaranteed Returns",
          description: "Revenue sharing and staking rewards are estimates based on projected platform performance. Actual returns may be lower than projected and are not guaranteed."
        },
        {
          icon: "Shield",
          title: "Regulatory Risk",
          description: "Cryptocurrency regulations are evolving. Changes in UAE or international regulations may impact token value, trading, or platform operations."
        },
        {
          icon: "Lock",
          title: "Liquidity Risk",
          description: "Token liquidity depends on market demand. During certain periods, you may not be able to sell tokens immediately or at desired prices."
        },
        {
          icon: "AlertCircle",
          title: "Platform Risk",
          description: "Platform success depends on adoption, technology performance, and market acceptance. Platform failure or underperformance may negatively impact token value."
        },
        {
          icon: "FileText",
          title: "Investment Suitability",
          description: "IZRA tokens may not be suitable for all investors. Only invest amounts you can afford to lose. Consider consulting financial advisors before investing."
        }
      ],
      compliance: {
        title: "Regulatory Compliance",
        points: [
          "IZRA operates in compliance with UAE financial regulations",
          "KYC/AML verification required for all investors",
          "Accredited investor status may be required for large investments",
          "Tax implications vary by jurisdiction - consult tax professionals"
        ]
      }
    },
    ar: {
      title: "الإفصاح عن المخاطر",
      subtitle: "معلومات مهمة للمستثمرين المحتملين",
      intro: "ينطوي الاستثمار في رموز إزرع على مخاطر. يرجى قراءة وفهم ما يلي قبل اتخاذ أي قرارات استثمارية:",
      risks: [
        {
          icon: "AlertTriangle",
          title: "تقلبات السوق",
          description: "يمكن أن تتقلب قيم العملات المشفرة والرموز بشكل كبير. قد يشهد سعر رمز إزرع تقلبات كبيرة بناءً على ظروف السوق واعتماد المنصة والتغييرات التنظيمية."
        },
        {
          icon: "TrendingDown",
          title: "لا عوائد مضمونة",
          description: "مشاركة الإيرادات ومكافآت الستاكينغ هي تقديرات بناءً على الأداء المتوقع للمنصة. قد تكون العوائد الفعلية أقل من المتوقع وغير مضمونة."
        },
        {
          icon: "Shield",
          title: "المخاطر التنظيمية",
          description: "لوائح العملات المشفرة في تطور مستمر. قد تؤثر التغييرات في لوائح الإمارات أو الدولية على قيمة الرمز أو التداول أو عمليات المنصة."
        },
        {
          icon: "Lock",
          title: "مخاطر السيولة",
          description: "تعتمد سيولة الرمز على طلب السوق. خلال فترات معينة، قد لا تتمكن من بيع الرموز على الفور أو بالأسعار المرغوبة."
        },
        {
          icon: "AlertCircle",
          title: "مخاطر المنصة",
          description: "يعتمد نجاح المنصة على الاعتماد وأداء التكنولوجيا وقبول السوق. قد يؤثر فشل المنصة أو ضعف الأداء سلبًا على قيمة الرمز."
        },
        {
          icon: "FileText",
          title: "ملاءمة الاستثمار",
          description: "قد لا تكون رموز إزرع مناسبة لجميع المستثمرين. استثمر فقط المبالغ التي يمكنك تحمل خسارتها. فكر في استشارة المستشارين الماليين قبل الاستثمار."
        }
      ],
      compliance: {
        title: "الامتثال التنظيمي",
        points: [
          "تعمل إزرع بما يتوافق مع اللوائح المالية في الإمارات",
          "التحقق من KYC/AML مطلوب لجميع المستثمرين",
          "قد يكون مطلوبًا وضع المستثمر المعتمد للاستثمارات الكبيرة",
          "تختلف الآثار الضريبية حسب الولاية القضائية - استشر المتخصصين الضريبيين"
        ]
      }
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
          <p className="text-lg text-muted-foreground mb-4">
            {text?.subtitle}
          </p>
          <p className="text-base text-foreground font-medium">
            {text?.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {text?.risks?.map((risk, index) => (
            <div key={index} className="bg-background rounded-xl p-6 shadow-sm border border-border">
              <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-4">
                <Icon name={risk?.icon} size={24} className="text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {risk?.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {risk?.description}
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto bg-background rounded-xl p-8 shadow-sm border border-border">
          <h3 className="text-2xl font-bold text-foreground mb-6">
            {text?.compliance?.title}
          </h3>
          <div className="space-y-3">
            {text?.compliance?.points?.map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <Icon name="CheckCircle" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RiskDisclosureSection;