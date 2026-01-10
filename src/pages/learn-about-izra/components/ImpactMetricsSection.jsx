import React from 'react';
import Icon from '../../../components/AppIcon';

const ImpactMetricsSection = ({ currentLanguage }) => {
  const content = {
    en: {
      title: "Our Environmental Impact",
      subtitle: "Real-Time Metrics Driving Change",
      metrics: [
        { icon: "TreePine", value: "50,000+", label: "Mangrove Trees Planted", color: "text-green-600" },
        { icon: "Leaf", value: "15,000", label: "Tonnes CO₂ Offset", color: "text-emerald-600" },
        { icon: "Users", value: "2,500+", label: "Active Sponsors", color: "text-blue-600" },
        { icon: "MapPin", value: "7", label: "Emirates Covered", color: "text-purple-600" },
        { icon: "Award", value: "3,200+", label: "NFT Certificates Issued", color: "text-amber-600" },
        { icon: "DollarSign", value: "$2.5M", label: "Carbon Credits Traded", color: "text-teal-600" }
      ]
    },
    ar: {
      title: "تأثيرنا البيئي",
      subtitle: "مقاييس في الوقت الفعلي تدفع التغيير",
      metrics: [
        { icon: "TreePine", value: "50,000+", label: "شجرة مانغروف مزروعة", color: "text-green-600" },
        { icon: "Leaf", value: "15,000", label: "طن من ثاني أكسيد الكربون", color: "text-emerald-600" },
        { icon: "Users", value: "2,500+", label: "راعي نشط", color: "text-blue-600" },
        { icon: "MapPin", value: "7", label: "إمارة مغطاة", color: "text-purple-600" },
        { icon: "Award", value: "3,200+", label: "شهادة NFT صادرة", color: "text-amber-600" },
        { icon: "DollarSign", value: "$2.5M", label: "أرصدة كربون متداولة", color: "text-teal-600" }
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {text?.metrics?.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Icon name={metric?.icon} size={28} className={metric?.color} />
              </div>
              <div className={`text-3xl font-bold ${metric?.color} mb-2`}>
                {metric?.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {metric?.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactMetricsSection;