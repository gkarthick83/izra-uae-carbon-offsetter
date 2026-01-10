import React from 'react';
import Icon from '../../../components/AppIcon';


const UAEPartnerships = ({ currentLanguage }) => {
  const content = {
    en: {
      title: "UAE Partnerships",
      subtitle: "Collaborating with Government & Environmental Authorities",
      partners: [
        {
          name: "Ministry of Climate Change",
          role: "Policy Alignment",
          description: "Working with UAE government to align carbon offset initiatives with national climate goals."
        },
        {
          name: "Environment Agency - Abu Dhabi",
          role: "Project Verification",
          description: "Official verification of mangrove restoration projects and environmental impact assessments."
        },
        {
          name: "Dubai Municipality",
          role: "Urban Integration",
          description: "Integrating carbon offset programs with Dubai\'s urban sustainability initiatives."
        }
      ],
      testimonialTitle: "Community Impact",
      testimonial: "IZRA has enabled our organization to contribute meaningfully to UAE's environmental goals while maintaining complete transparency in our carbon offset investments.",
      testimonialAuthor: "Environmental Director, UAE Corporation"
    },
    ar: {
      title: "شراكات الإمارات",
      subtitle: "التعاون مع الحكومة والسلطات البيئية",
      partners: [
        {
          name: "وزارة التغير المناخي",
          role: "توافق السياسات",
          description: "العمل مع حكومة الإمارات لمواءمة مبادرات تعويض الكربون مع الأهداف المناخية الوطنية."
        },
        {
          name: "هيئة البيئة - أبوظبي",
          role: "التحقق من المشروع",
          description: "التحقق الرسمي من مشاريع استعادة المانغروف وتقييمات التأثير البيئي."
        },
        {
          name: "بلدية دبي",
          role: "التكامل الحضري",
          description: "دمج برامج تعويض الكربون مع مبادرات الاستدامة الحضرية في دبي."
        }
      ],
      testimonialTitle: "تأثير المجتمع",
      testimonial: "مكنت إزرا منظمتنا من المساهمة بشكل هادف في الأهداف البيئية للإمارات مع الحفاظ على الشفافية الكاملة في استثماراتنا في تعويض الكربون.",
      testimonialAuthor: "مدير البيئة، شركة إماراتية"
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {text?.partners?.map((partner, index) => (
            <div
              key={index}
              className="p-6 bg-card rounded-2xl border border-border hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon name="Building" size={24} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground text-sm">
                    {partner?.name}
                  </h3>
                  <p className="text-xs text-primary font-medium">
                    {partner?.role}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {partner?.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 md:p-12 border border-primary/20">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Icon name="Quote" size={32} className="text-primary" />
              <h3 className="text-2xl font-bold text-foreground">
                {text?.testimonialTitle}
              </h3>
            </div>
            <p className="text-lg text-muted-foreground italic mb-4 leading-relaxed">
              "{text?.testimonial}"
            </p>
            <p className="text-sm font-semibold text-foreground">
              — {text?.testimonialAuthor}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UAEPartnerships;