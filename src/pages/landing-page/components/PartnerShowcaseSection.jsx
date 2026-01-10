import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PartnerShowcaseSection = ({ currentLanguage }) => {
  const content = {
    en: {
      title: "Our Trusted Partners",
      subtitle: "Collaborating with Leading Environmental Organizations",
      description: "We work with world-class verification agencies, environmental monitoring partners, and technology providers to ensure the highest standards of carbon offset integrity."
    },
    ar: {
      title: "شركاؤنا الموثوقون",
      subtitle: "التعاون مع المنظمات البيئية الرائدة",
      description: "نعمل مع وكالات التحقق من الطراز العالمي وشركاء المراقبة البيئية ومقدمي التكنولوجيا لضمان أعلى معايير نزاهة تعويض الكربون."
    }
  };

  const partners = [
  {
    name: "Verra Registry",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_18e8480a7-1764760992838.png",
    logoAlt: "Verra carbon standard verification registry logo with green leaf symbol representing verified carbon credits",
    category: { en: "Verification", ar: "التحقق" }
  },
  {
    name: "Gold Standard",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1c29a565c-1764760994000.png",
    logoAlt: "Gold Standard certification logo with golden badge representing premium carbon offset verification",
    category: { en: "Certification", ar: "الشهادة" }
  },
  {
    name: "UAE Ministry of Climate Change",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1e20564bf-1765031734759.png",
    logoAlt: "UAE Ministry of Climate Change and Environment official emblem with national colors and environmental symbols",
    category: { en: "Government", ar: "الحكومة" }
  },
  {
    name: "Satellite Monitoring Systems",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_18f77f544-1766400233926.png",
    logoAlt: "Satellite earth observation technology logo showing orbital satellite monitoring environmental changes",
    category: { en: "Technology", ar: "التكنولوجيا" }
  },
  {
    name: "Environmental IoT Solutions",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1f35d719e-1766400237409.png",
    logoAlt: "IoT environmental sensor network logo with connected devices monitoring air quality and climate data",
    category: { en: "Monitoring", ar: "المراقبة" }
  },
  {
    name: "Blockchain Verification Network",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_16e5e842f-1766400237458.png",
    logoAlt: "Blockchain distributed ledger technology logo with interconnected nodes representing transparent verification",
    category: { en: "Technology", ar: "التكنولوجيا" }
  }];


  const text = content?.[currentLanguage];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="container-safe">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">
            {text?.title}
          </h2>
          <p className="text-lg md:text-xl text-primary font-semibold mb-4">
            {text?.subtitle}
          </p>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            {text?.description}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {partners?.map((partner, index) =>
          <div
            key={index}
            className="group bg-card rounded-xl p-4 md:p-6 shadow-md hover:shadow-xl transition-smooth hover-lift flex flex-col items-center text-center">

              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mb-3 md:mb-4 ring-2 ring-border group-hover:ring-primary transition-smooth">
                <Image
                src={partner?.logo}
                alt={partner?.logoAlt}
                className="w-full h-full object-cover" />

              </div>
              <h3 className="text-xs md:text-sm font-bold text-foreground mb-2 line-clamp-2">
                {partner?.name}
              </h3>
              <div className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                {partner?.category?.[currentLanguage]}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 md:mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted">
            <Icon name="CheckCircle2" size={20} className="text-success" />
            <span className="text-sm md:text-base text-foreground font-medium">
              {currentLanguage === 'en' ? 'All partners verified and certified for environmental standards' : 'جميع الشركاء موثقون ومعتمدون للمعايير البيئية'}
            </span>
          </div>
        </div>
      </div>
    </section>);

};

export default PartnerShowcaseSection;