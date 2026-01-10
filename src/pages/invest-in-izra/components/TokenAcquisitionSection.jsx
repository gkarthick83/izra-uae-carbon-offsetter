import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const TokenAcquisitionSection = ({ currentLanguage }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const content = {
    en: {
      title: "Token Acquisition Methods",
      subtitle: "Multiple Ways to Purchase IZRA Tokens",
      methods: [
        {
          icon: "ShoppingCart",
          title: "Direct Token Sale",
          description: "Purchase IZRA tokens directly through our platform using multiple payment methods.",
          features: ["Credit/Debit Card", "Bank Transfer", "Crypto Payment (USDT, USDC)"]
        },
        {
          icon: "Lock",
          title: "Staking Pool Participation",
          description: "Join staking pools to earn IZRA tokens as rewards while supporting platform liquidity.",
          features: ["8-18% APY", "Flexible Lock Periods", "Compound Rewards"]
        },
        {
          icon: "Award",
          title: "Ecosystem Rewards",
          description: "Earn IZRA tokens through platform engagement, referrals, and environmental milestones.",
          features: ["Referral Bonuses", "Activity Rewards", "Impact Milestones"]
        }
      ],
      pricing: {
        title: "Real-Time Token Pricing",
        tokenPrice: 0.10,
        currencies: [
          { code: "USD", symbol: "$", rate: 1 },
          { code: "AED", symbol: "AED", rate: 3.67 },
          { code: "USDT", symbol: "USDT", rate: 1 },
          { code: "USDC", symbol: "USDC", rate: 1 }
        ]
      }
    },
    ar: {
      title: "طرق الحصول على الرموز",
      subtitle: "طرق متعددة لشراء رموز إزرع",
      methods: [
        {
          icon: "ShoppingCart",
          title: "بيع الرموز المباشر",
          description: "اشترِ رموز إزرع مباشرة من خلال منصتنا باستخدام طرق دفع متعددة.",
          features: ["بطاقة ائتمان/خصم", "تحويل بنكي", "دفع بالعملات المشفرة (USDT، USDC)"]
        },
        {
          icon: "Lock",
          title: "المشاركة في مجمع الستاكينغ",
          description: "انضم إلى مجمعات الستاكينغ لكسب رموز إزرع كمكافآت مع دعم سيولة المنصة.",
          features: ["8-18٪ APY", "فترات قفل مرنة", "مكافآت مركبة"]
        },
        {
          icon: "Award",
          title: "مكافآت النظام البيئي",
          description: "اكسب رموز إزرع من خلال المشاركة في المنصة والإحالات ومعالم التأثير البيئي.",
          features: ["مكافآت الإحالة", "مكافآت النشاط", "معالم التأثير"]
        }
      ],
      pricing: {
        title: "تسعير الرمز في الوقت الفعلي",
        tokenPrice: 0.10,
        currencies: [
          { code: "USD", symbol: "$", rate: 1 },
          { code: "AED", symbol: "د.إ", rate: 3.67 },
          { code: "USDT", symbol: "USDT", rate: 1 },
          { code: "USDC", symbol: "USDC", rate: 1 }
        ]
      }
    }
  };

  const text = content?.[currentLanguage];
  const selectedCurrencyData = text?.pricing?.currencies?.find(c => c?.code === selectedCurrency);
  const convertedPrice = (text?.pricing?.tokenPrice * selectedCurrencyData?.rate)?.toFixed(2);

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {text?.methods?.map((method, index) => (
            <div key={index} className="bg-background rounded-xl p-6 shadow-sm border border-border">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Icon name={method?.icon} size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {method?.title}
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {method?.description}
              </p>
              <div className="space-y-2">
                {method?.features?.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Icon name="Check" size={16} className="text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto bg-background rounded-xl p-8 shadow-sm border border-border">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            {text?.pricing?.title}
          </h3>
          <div className="flex items-center justify-center gap-4 mb-6">
            {text?.pricing?.currencies?.map((currency) => (
              <button
                key={currency?.code}
                onClick={() => setSelectedCurrency(currency?.code)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCurrency === currency?.code
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {currency?.code}
              </button>
            ))}
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-primary mb-2">
              {selectedCurrencyData?.symbol}{convertedPrice}
            </div>
            <div className="text-muted-foreground">
              {currentLanguage === 'en' ? 'per IZRA token' : 'لكل رمز إزرع'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenAcquisitionSection;