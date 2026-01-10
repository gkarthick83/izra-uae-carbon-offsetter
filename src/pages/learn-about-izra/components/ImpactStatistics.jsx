import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ImpactStatistics = ({ currentLanguage }) => {
  const [selectedStat, setSelectedStat] = useState(null);

  const content = {
    en: {
      title: "Environmental Impact",
      subtitle: "Real-Time Statistics Across UAE",
      stats: [
        {
          icon: "TreePine",
          value: "52,847",
          label: "Trees Planted",
          detail: "Across all seven Emirates with focus on Abu Dhabi, Dubai, and Sharjah coastal zones",
          color: "primary"
        },
        {
          icon: "Leaf",
          value: "15,234",
          label: "Tonnes CO₂ Offset",
          detail: "Equivalent to removing 3,300 cars from UAE roads annually",
          color: "secondary"
        },
        {
          icon: "Waves",
          value: "127",
          label: "Hectares Restored",
          detail: "Coastal mangrove areas protected and restored along UAE coastline",
          color: "primary"
        },
        {
          icon: "Fish",
          value: "89",
          label: "Species Protected",
          detail: "Marine and coastal species benefiting from restored mangrove ecosystems",
          color: "secondary"
        }
      ]
    },
    ar: {
      title: "التأثير البيئي",
      subtitle: "إحصائيات في الوقت الفعلي عبر الإمارات",
      stats: [
        {
          icon: "TreePine",
          value: "52,847",
          label: "شجرة مزروعة",
          detail: "عبر جميع الإمارات السبع مع التركيز على المناطق الساحلية في أبوظبي ودبي والشارقة",
          color: "primary"
        },
        {
          icon: "Leaf",
          value: "15,234",
          label: "طن من ثاني أكسيد الكربون",
          detail: "يعادل إزالة 3,300 سيارة من طرق الإمارات سنويًا",
          color: "secondary"
        },
        {
          icon: "Waves",
          value: "127",
          label: "هكتار تمت استعادته",
          detail: "مناطق المانغروف الساحلية المحمية والمستعادة على طول ساحل الإمارات",
          color: "primary"
        },
        {
          icon: "Fish",
          value: "89",
          label: "نوع محمي",
          detail: "الأنواع البحرية والساحلية المستفيدة من النظم البيئية المستعادة للمانغروف",
          color: "secondary"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {text?.stats?.map((stat, index) => (
            <div
              key={index}
              onClick={() => setSelectedStat(selectedStat === index ? null : index)}
              className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                selectedStat === index
                  ? `border-${stat?.color} bg-${stat?.color}/5 shadow-lg scale-105`
                  : 'border-border bg-card hover:border-primary/30 hover:shadow-md'
              }`}>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className={`w-16 h-16 rounded-2xl bg-${stat?.color}/10 flex items-center justify-center`}>
                  <Icon name={stat?.icon} size={32} className={`text-${stat?.color}`} />
                </div>
                <div>
                  <div className="text-4xl font-bold text-foreground mb-2">
                    {stat?.value}
                  </div>
                  <div className="text-sm font-semibold text-muted-foreground">
                    {stat?.label}
                  </div>
                </div>
                {selectedStat === index && (
                  <p className="text-sm text-muted-foreground leading-relaxed pt-2 border-t border-border">
                    {stat?.detail}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStatistics;