import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TokenAcquisition = ({ currentLanguage }) => {
  const content = {
    en: {
      title: "Token Acquisition",
      subtitle: "Multiple Ways to Acquire IZRA Tokens",
      methods: [
        {
          icon: "ShoppingCart",
          title: "Direct Purchase",
          description: "Buy IZRA tokens directly through the platform using credit card or cryptocurrency.",
          features: [
            "Instant delivery to wallet",
            "Multiple payment options",
            "Competitive pricing"
          ],
          cta: "Buy IZRA"
        },
        {
          icon: "Layers",
          title: "Staking Pools",
          description: "Join liquidity pools and earn IZRA tokens as rewards for providing liquidity.",
          features: [
            "Earn passive income",
            "Flexible lock periods",
            "Compound rewards"
          ],
          cta: "Start Staking"
        },
        {
          icon: "Award",
          title: "Ecosystem Rewards",
          description: "Earn IZRA tokens by participating in platform activities and referrals.",
          features: [
            "Referral bonuses",
            "Activity rewards",
            "Community incentives"
          ],
          cta: "Learn More"
        }
      ]
    },
    ar: {
      title: "الحصول على الرموز",
      subtitle: "طرق متعددة للحصول على رموز إزرا",
      methods: [
        {
          icon: "ShoppingCart",
          title: "الشراء المباشر",
          description: "اشترِ رموز إزرا مباشرة من خلال المنصة باستخدام بطاقة الائتمان أو العملة المشفرة.",
          features: [
            "التسليم الفوري إلى المحفظة",
            "خيارات دفع متعددة",
            "أسعار تنافسية"
          ],
          cta: "شراء إزرا"
        },
        {
          icon: "Layers",
          title: "مجمعات الرهن",
          description: "انضم إلى مجمعات السيولة واكسب رموز إزرا كمكافآت لتوفير السيولة.",
          features: [
            "اكسب دخلاً سلبيًا",
            "فترات قفل مرنة",
            "مكافآت مركبة"
          ],
          cta: "ابدأ الرهن"
        },
        {
          icon: "Award",
          title: "مكافآت النظام البيئي",
          description: "اكسب رموز إزرا من خلال المشاركة في أنشطة المنصة والإحالات.",
          features: [
            "مكافآت الإحالة",
            "مكافآت النشاط",
            "حوافز المجتمع"
          ],
          cta: "تعرف على المزيد"
        }
      ]
    }
  };

  const text = content?.[currentLanguage];

  return (
    <section className="py-16 md:py-20 bg-card">
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
          {text?.methods?.map((method, index) => (
            <div
              key={index}
              className="p-6 bg-background rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 flex flex-col">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Icon name={method?.icon} size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {method?.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {method?.description}
              </p>
              <ul className="space-y-2 mb-6 flex-grow">
                {method?.features?.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant="outline"
                size="sm"
                iconName="ArrowRight"
                iconPosition="right"
                className="w-full">
                {method?.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TokenAcquisition;