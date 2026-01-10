import React from 'react';


const TokenDistributionSection = ({ currentLanguage }) => {
  const content = {
    en: {
      title: "Token Distribution",
      subtitle: "Fair Allocation Across Stakeholders",
      totalSupply: "Total Supply: 1,000,000,000 IZRA",
      distribution: [
        { category: "Public Sale", percentage: 30, amount: "300,000,000", color: "bg-blue-500", description: "Available for public purchase" },
        { category: "Ecosystem Fund", percentage: 25, amount: "250,000,000", color: "bg-green-500", description: "Platform development & rewards" },
        { category: "Team & Advisors", percentage: 15, amount: "150,000,000", color: "bg-purple-500", description: "4-year vesting schedule" },
        { category: "Strategic Partners", percentage: 15, amount: "150,000,000", color: "bg-amber-500", description: "Partnerships & integrations" },
        { category: "Liquidity Pool", percentage: 10, amount: "100,000,000", color: "bg-teal-500", description: "DEX liquidity provision" },
        { category: "Reserve", percentage: 5, amount: "50,000,000", color: "bg-red-500", description: "Emergency fund" }
      ]
    },
    ar: {
      title: "توزيع الرموز",
      subtitle: "توزيع عادل عبر أصحاب المصلحة",
      totalSupply: "إجمالي العرض: 1,000,000,000 إزرع",
      distribution: [
        { category: "البيع العام", percentage: 30, amount: "300,000,000", color: "bg-blue-500", description: "متاح للشراء العام" },
        { category: "صندوق النظام البيئي", percentage: 25, amount: "250,000,000", color: "bg-green-500", description: "تطوير المنصة والمكافآت" },
        { category: "الفريق والمستشارون", percentage: 15, amount: "150,000,000", color: "bg-purple-500", description: "جدول استحقاق 4 سنوات" },
        { category: "الشركاء الاستراتيجيون", percentage: 15, amount: "150,000,000", color: "bg-amber-500", description: "الشراكات والتكاملات" },
        { category: "مجمع السيولة", percentage: 10, amount: "100,000,000", color: "bg-teal-500", description: "توفير سيولة DEX" },
        { category: "الاحتياطي", percentage: 5, amount: "50,000,000", color: "bg-red-500", description: "صندوق الطوارئ" }
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
          <p className="text-lg text-muted-foreground mb-2">
            {text?.subtitle}
          </p>
          <p className="text-xl font-semibold text-primary">
            {text?.totalSupply}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {text?.distribution?.map((item, index) => (
              <div key={index} className="bg-background rounded-xl p-6 shadow-sm border border-border">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg ${item?.color} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white font-bold text-lg">{item?.percentage}%</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {item?.category}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {item?.description}
                    </p>
                    <p className="text-sm font-medium text-primary">
                      {item?.amount} IZRA
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-muted/50 rounded-xl p-6">
            <div className="flex flex-col gap-2">
              {text?.distribution?.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded ${item?.color}`} />
                  <span className="text-sm text-foreground flex-1">{item?.category}</span>
                  <span className="text-sm font-semibold text-foreground">{item?.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenDistributionSection;