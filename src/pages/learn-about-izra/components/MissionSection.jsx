import React from 'react';
import Icon from '../../../components/AppIcon';

const MissionSection = ({ currentLanguage }) => {
  const content = {
    en: {
      title: "Our Mission",
      subtitle: "Driving Environmental Impact Through Innovation",
      missions: [
        {
          icon: "Target",
          title: "Carbon Neutrality",
          description: "Support UAE\'s Net Zero 2050 strategy by facilitating accessible carbon offsetting for individuals and businesses."
        },
        {
          icon: "TreePine",
          title: "Ecosystem Restoration",
          description: "Restore and expand UAE's mangrove forests, protecting coastal biodiversity and enhancing carbon sequestration."
        },
        {
          icon: "Shield",
          title: "Blockchain Transparency",
          description: "Ensure complete traceability and verification of carbon credits through immutable blockchain technology."
        },
        {
          icon: "Users",
          title: "Community Engagement",
          description: "Empower citizens, businesses, and investors to actively participate in environmental sustainability initiatives."
        }
      ]
    },
    ar: {
      title: "مهمتنا",
      subtitle: "دفع التأثير البيئي من خلال الابتكار",
      missions: [
        {
          icon: "Target",
          title: "الحياد الكربوني",
          description: "دعم استراتيجية الإمارات للحياد الصفري 2050 من خلال تسهيل تعويض الكربون للأفراد والشركات."
        },
        {
          icon: "TreePine",
          title: "استعادة النظام البيئي",
          description: "استعادة وتوسيع غابات المانغروف في الإمارات، وحماية التنوع البيولوجي الساحلي وتعزيز عزل الكربون."
        },
        {
          icon: "Shield",
          title: "شفافية البلوكشين",
          description: "ضمان التتبع الكامل والتحقق من أرصدة الكربون من خلال تقنية البلوكشين الثابتة."
        },
        {
          icon: "Users",
          title: "مشاركة المجتمع",
          description: "تمكين المواطنين والشركات والمستثمرين من المشاركة الفعالة في مبادرات الاستدامة البيئية."
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {text?.missions?.map((mission, index) => (
            <div key={index} className="bg-background rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Icon name={mission?.icon} size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {mission?.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {mission?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;