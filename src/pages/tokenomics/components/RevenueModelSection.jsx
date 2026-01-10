import React from 'react';


const RevenueModelSection = ({ currentLanguage }) => {
  const content = {
    en: {
      title: "Revenue Model",
      subtitle: "Sustainable Economics Benefiting All Stakeholders",
      model: {
        platformFee: "2%",
        description: "IZRA charges a 2% transaction fee on all carbon credit marketplace trades. This fee is distributed as follows:",
        distribution: [
          { percentage: "40%", recipient: "IZRA Token Holders", amount: "0.8% of trade", description: "Distributed proportionally based on token holdings" },
          { percentage: "30%", recipient: "Platform Operations", amount: "0.6% of trade", description: "Infrastructure, development, and maintenance" },
          { percentage: "20%", recipient: "Environmental Projects", amount: "0.4% of trade", description: "Direct funding for UAE conservation initiatives" },
          { percentage: "10%", recipient: "Reserve Fund", amount: "0.2% of trade", description: "Emergency reserves and future development" }
        ]
      },
      example: {
        title: "Revenue Example",
        scenario: "If $1,000,000 in carbon credits are traded monthly:",
        calculations: [
          { label: "Total Platform Fee (2%)", value: "$20,000" },
          { label: "Token Holder Distribution (40%)", value: "$8,000" },
          { label: "Annual Token Holder Revenue", value: "$96,000" }
        ]
      }
    },
    ar: {
      title: "نموذج الإيرادات",
      subtitle: "اقتصاديات مستدامة تعود بالنفع على جميع أصحاب المصلحة",
      model: {
        platformFee: "2%",
        description: "تفرض إزرع رسوم معاملة بنسبة 2٪ على جميع صفقات سوق أرصدة الكربون. يتم توزيع هذه الرسوم على النحو التالي:",
        distribution: [
          { percentage: "40%", recipient: "حاملو رموز إزرع", amount: "0.8٪ من الصفقة", description: "يتم التوزيع بشكل متناسب بناءً على حيازات الرموز" },
          { percentage: "30%", recipient: "عمليات المنصة", amount: "0.6٪ من الصفقة", description: "البنية التحتية والتطوير والصيانة" },
          { percentage: "20%", recipient: "المشاريع البيئية", amount: "0.4٪ من الصفقة", description: "التمويل المباشر لمبادرات الحفاظ على البيئة في الإمارات" },
          { percentage: "10%", recipient: "صندوق الاحتياطي", amount: "0.2٪ من الصفقة", description: "احتياطيات الطوارئ والتطوير المستقبلي" }
        ]
      },
      example: {
        title: "مثال على الإيرادات",
        scenario: "إذا تم تداول أرصدة كربون بقيمة 1,000,000 دولار شهريًا:",
        calculations: [
          { label: "إجمالي رسوم المنصة (2٪)", value: "$20,000" },
          { label: "توزيع حامل الرمز (40٪)", value: "$8,000" },
          { label: "إيرادات حامل الرمز السنوية", value: "$96,000" }
        ]
      }
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

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-primary/5 rounded-xl p-8 border border-primary/20">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-primary mb-2">
                {text?.model?.platformFee}
              </div>
              <p className="text-muted-foreground">
                {text?.model?.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {text?.model?.distribution?.map((item, index) => (
                <div key={index} className="bg-background rounded-lg p-4 border border-border">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold text-primary">{item?.percentage}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">{item?.recipient}</h4>
                      <p className="text-sm text-primary font-medium mb-1">{item?.amount}</p>
                      <p className="text-xs text-muted-foreground">{item?.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-muted/30 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {text?.example?.title}
            </h3>
            <p className="text-muted-foreground mb-6">
              {text?.example?.scenario}
            </p>
            <div className="space-y-3">
              {text?.example?.calculations?.map((calc, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                  <span className="text-foreground font-medium">{calc?.label}</span>
                  <span className="text-2xl font-bold text-primary">{calc?.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevenueModelSection;