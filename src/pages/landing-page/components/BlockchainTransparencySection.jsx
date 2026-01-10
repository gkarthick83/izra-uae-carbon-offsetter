import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';


const BlockchainTransparencySection = ({ currentLanguage }) => {
  const content = {
    en: {
      title: "Blockchain-Powered Transparency",
      subtitle: "Every Transaction Verified, Every Impact Tracked",
      description: "Our ESG blockchain layer ensures complete transparency in carbon credit trading and tree sponsorship. Each transaction is immutably recorded and publicly verifiable.",
      learnMoreCTA: "Learn About Our Technology"
    },
    ar: {
      title: "الشفافية المدعومة بالبلوكشين",
      subtitle: "كل معاملة موثقة، كل تأثير متتبع",
      description: "تضمن طبقة البلوكشين ESG الخاصة بنا الشفافية الكاملة في تداول أرصدة الكربون ورعاية الأشجار. يتم تسجيل كل معاملة بشكل غير قابل للتغيير ويمكن التحقق منها علنًا.",
      learnMoreCTA: "تعرف على تقنيتنا"
    }
  };

  const features = [
  {
    icon: "Shield",
    title: { en: "Immutable Records", ar: "سجلات غير قابلة للتغيير" },
    description: {
      en: "All transactions permanently recorded on blockchain",
      ar: "جميع المعاملات مسجلة بشكل دائم على البلوكشين"
    }
  },
  {
    icon: "Eye",
    title: { en: "Public Verification", ar: "التحقق العام" },
    description: {
      en: "Anyone can verify carbon credit authenticity",
      ar: "يمكن لأي شخص التحقق من صحة أرصدة الكربون"
    }
  },
  {
    icon: "Lock",
    title: { en: "NFT Ownership", ar: "ملكية NFT" },
    description: {
      en: "Carbon credits converted to unique NFT tokens",
      ar: "تحويل أرصدة الكربون إلى رموز NFT فريدة"
    }
  },
  {
    icon: "TrendingUp",
    title: { en: "Real-Time Tracking", ar: "التتبع في الوقت الفعلي" },
    description: {
      en: "Monitor your environmental impact instantly",
      ar: "راقب تأثيرك البيئي على الفور"
    }
  }];


  const text = content?.[currentLanguage];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container-safe">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
              <Image
                src="https://img.rocket.new/generatedImages/rocket_gen_img_1a1a8f07a-1764655228210.png"
                alt="Modern blockchain technology visualization with digital network connections and secure data nodes representing transparent carbon credit verification"
                className="relative rounded-3xl shadow-2xl w-full h-[400px] md:h-[500px] object-cover" />

              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent rounded-3xl" />
              
              <div className="absolute bottom-6 left-6 right-6 bg-card/95 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                    <Icon name="CheckCircle2" size={24} className="text-success" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      {currentLanguage === 'en' ? 'Verified Transactions' : 'المعاملات الموثقة'}
                    </div>
                    <div className="text-2xl font-bold text-foreground">12,847</div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {currentLanguage === 'en' ? 'Last updated: 22 Dec 2025, 10:33 AM' : 'آخر تحديث: 22 ديسمبر 2025، 10:33 صباحًا'}
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-6 md:space-y-8">
            <div>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {features?.map((feature, index) =>
              <div
                key={index}
                className="bg-card rounded-xl p-4 md:p-6 shadow-md hover:shadow-lg transition-smooth hover-lift">

                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name={feature?.icon} size={24} className="text-primary" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-foreground mb-2">
                    {feature?.title?.[currentLanguage]}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {feature?.description?.[currentLanguage]}
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                variant="default"
                size="lg"
                iconName="Blocks"
                iconPosition="left"
                className="w-full sm:w-auto">

                {text?.learnMoreCTA}
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="ExternalLink"
                iconPosition="right"
                className="w-full sm:w-auto">

                {currentLanguage === 'en' ? 'View Blockchain Explorer' : 'عرض مستكشف البلوكشين'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default BlockchainTransparencySection;