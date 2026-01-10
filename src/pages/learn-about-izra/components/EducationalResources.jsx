import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EducationalResources = ({ currentLanguage }) => {
  const content = {
    en: {
      title: "Educational Resources",
      subtitle: "Learn More About Carbon Offsetting",
      resources: [
        {
          icon: "FileText",
          title: "Platform Whitepaper",
          description: "Comprehensive technical documentation covering blockchain architecture, tokenomics, and environmental impact methodology.",
          cta: "Download PDF"
        },
        {
          icon: "Video",
          title: "Video Testimonials",
          description: "Hear from UAE environmental leaders, project managers, and sponsors about their experience with IZRA platform.",
          cta: "Watch Videos"
        },
        {
          icon: "BarChart",
          title: "Carbon Credit Lifecycle",
          description: "Interactive infographic explaining the journey from tree planting to carbon credit issuance and trading.",
          cta: "View Infographic"
        }
      ]
    },
    ar: {
      title: "الموارد التعليمية",
      subtitle: "تعرف على المزيد حول تعويض الكربون",
      resources: [
        {
          icon: "FileText",
          title: "الورقة البيضاء للمنصة",
          description: "وثائق تقنية شاملة تغطي بنية البلوكشين والاقتصاد الرمزي ومنهجية التأثير البيئي.",
          cta: "تحميل PDF"
        },
        {
          icon: "Video",
          title: "شهادات الفيديو",
          description: "استمع إلى قادة البيئة في الإمارات ومديري المشاريع والرعاة حول تجربتهم مع منصة إزرا.",
          cta: "شاهد الفيديوهات"
        },
        {
          icon: "BarChart",
          title: "دورة حياة رصيد الكربون",
          description: "رسم بياني تفاعلي يشرح الرحلة من زراعة الأشجار إلى إصدار وتداول أرصدة الكربون.",
          cta: "عرض الرسم البياني"
        }
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {text?.resources?.map((resource, index) => (
            <div
              key={index}
              className="p-6 bg-card rounded-2xl border border-border hover:shadow-lg transition-all duration-300 flex flex-col">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Icon name={resource?.icon} size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {resource?.title}
              </h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                {resource?.description}
              </p>
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="right"
                className="w-full">
                {resource?.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationalResources;