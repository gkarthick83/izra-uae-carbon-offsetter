import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const InvestorCallToActionSection = ({ currentLanguage, onNavigate }) => {
  const content = {
    en: {
      title: "Invest in IZRA Tokens",
      subtitle: "Join the Future of Environmental Finance",
      description: "IZRA tokens power our ecosystem with exclusive benefits including payment discounts, staking rewards, and revenue sharing. Be part of the UAE's carbon offset revolution.",
      learnMoreCTA: "Learn About IZRA",
      benefits: [
      { icon: "Percent", text: "Up to 10% payment discount" },
      { icon: "TrendingUp", text: "Staking rewards & revenue sharing" },
      { icon: "Shield", text: "Blockchain-secured ownership" },
      { icon: "Users", text: "Exclusive investor community" }]

    },
    ar: {
      title: "استثمر في رموز IZRA",
      subtitle: "انضم إلى مستقبل التمويل البيئي",
      description: "تدعم رموز IZRA نظامنا البيئي بمزايا حصرية بما في ذلك خصومات الدفع ومكافآت التخزين ومشاركة الإيرادات. كن جزءًا من ثورة تعويض الكربون في الإمارات.",
      learnMoreCTA: "تعرف على IZRA",
      benefits: [
      { icon: "Percent", text: "خصم دفع يصل إلى 10٪" },
      { icon: "TrendingUp", text: "مكافآت التخزين ومشاركة الإيرادات" },
      { icon: "Shield", text: "ملكية محمية بالبلوكشين" },
      { icon: "Users", text: "مجتمع المستثمرين الحصري" }]

    }
  };

  const text = content?.[currentLanguage];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="container-safe">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 md:space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
                <Icon name="Coins" size={20} className="text-accent" />
                <span className="text-sm md:text-base font-medium text-accent">
                  {currentLanguage === 'en' ? 'IZRA Token' : 'رمز IZRA'}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">
                {text?.title}
              </h2>
              <p className="text-lg md:text-xl text-primary font-semibold mb-4">
                {text?.subtitle}
              </p>
              <p className="text-base md:text-lg text-muted-foreground">
                {text?.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {text?.benefits?.map((benefit, index) =>
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-card rounded-xl shadow-md">

                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={benefit?.icon} size={20} className="text-primary" />
                  </div>
                  <p className="text-sm md:text-base text-foreground font-medium pt-2">
                    {benefit?.text}
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                variant="default"
                size="lg"
                iconName="Coins"
                iconPosition="left"
                onClick={() => onNavigate?.('/learn-about-izra')}
                className="w-full sm:w-auto">

                {text?.learnMoreCTA}
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="LineChart"
                iconPosition="left"
                onClick={() => onNavigate?.('/tokenomics')}
                className="w-full sm:w-auto">

                {currentLanguage === 'en' ? 'View Tokenomics' : 'عرض اقتصاديات الرمز'}
              </Button>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-border">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-foreground">1,250+</div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  {currentLanguage === 'en' ? 'Token Holders' : 'حاملي الرموز'}
                </div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-foreground">AED 2.5M</div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  {currentLanguage === 'en' ? 'Market Cap' : 'القيمة السوقية'}
                </div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-success">+18%</div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  {currentLanguage === 'en' ? 'APY Staking' : 'عائد التخزين السنوي'}
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl blur-3xl" />
            <div className="relative bg-card rounded-3xl p-6 md:p-8 shadow-2xl">
              <Image
                src="https://img.rocket.new/generatedImages/rocket_gen_img_15b9cfc75-1764651774193.png"
                alt="Digital cryptocurrency tokens and blockchain network visualization representing IZRA token ecosystem with glowing nodes and financial data"
                className="w-full h-[300px] md:h-[400px] object-cover rounded-2xl mb-6" />

              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <Icon name="Coins" size={24} className="text-accent" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {currentLanguage === 'en' ? 'Token Price' : 'سعر الرمز'}
                      </div>
                      <div className="text-xl font-bold text-foreground">2.00 AED</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-success">
                    <Icon name="TrendingUp" size={20} />
                    <span className="text-lg font-bold">+12.5%</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-xl">
                    <div className="text-xs text-muted-foreground mb-1">
                      {currentLanguage === 'en' ? 'Total Supply' : 'الإمداد الكلي'}
                    </div>
                    <div className="text-lg font-bold text-foreground">10M</div>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-xl">
                    <div className="text-xs text-muted-foreground mb-1">
                      {currentLanguage === 'en' ? 'Circulating' : 'المتداول'}
                    </div>
                    <div className="text-lg font-bold text-foreground">3.2M</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default InvestorCallToActionSection;