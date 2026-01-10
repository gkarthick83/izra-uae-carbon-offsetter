import React from 'react';

import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const HeroSection = ({ currentLanguage, onNavigate }) => {
  const content = {
    en: {
      title: "Offset Your Carbon Footprint",
      subtitle: "Plant UAE Mangroves Today",
      description: "Join the UAE's leading carbon offset marketplace. Sponsor mangrove restoration projects and trade verified carbon credits with blockchain transparency.",
      plantTreesCTA: "Plant Mangrove Trees",
      marketplaceCTA: "Explore Carbon Credits",
      stats: [
      { value: "50,000+", label: "Trees Planted", icon: "TreePine" },
      { value: "2,500+", label: "Sponsors", icon: "Users" },
      { value: "15,000", label: "Tonnes CO₂ Offset", icon: "Leaf" }]

    },
    ar: {
      title: "عوّض بصمتك الكربونية",
      subtitle: "ازرع أشجار المانغروف في الإمارات اليوم",
      description: "انضم إلى سوق تعويض الكربون الرائد في الإمارات. قم برعاية مشاريع استعادة المانغروف وتداول أرصدة الكربون المعتمدة بشفافية البلوكشين.",
      plantTreesCTA: "ازرع أشجار المانغروف",
      marketplaceCTA: "استكشف أرصدة الكربون",
      stats: [
      { value: "50,000+", label: "شجرة مزروعة", icon: "TreePine" },
      { value: "2,500+", label: "راعي", icon: "Users" },
      { value: "15,000", label: "طن من ثاني أكسيد الكربون", icon: "Leaf" }]

    }
  };

  const text = content?.[currentLanguage];

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40">

          <source src="https://cdn.pixabay.com/video/2023/05/02/160693-822908088_large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-emerald-900/80" />
      </div>
      <div className="container-safe relative z-10 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30">
              <Icon name="Leaf" size={20} className="text-emerald-400" />
              <span className="text-sm md:text-base font-medium text-emerald-300">
                {currentLanguage === 'en' ? 'UAE Carbon Offset Platform' : 'منصة تعويض الكربون في الإمارات'}
              </span>
            </div>

            <div className="space-y-3 md:space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight drop-shadow-lg">
                {text?.title}
              </h1>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-emerald-400 drop-shadow-md">
                {text?.subtitle}
              </h2>
            </div>

            <p className="text-base md:text-lg lg:text-xl text-slate-200 leading-relaxed max-w-2xl drop-shadow-md">
              {text?.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="lg"
                iconName="TreePine"
                iconPosition="left"
                onClick={() => onNavigate('/plant-tree-sponsorship')}
                className="w-full sm:w-auto">

                {text?.plantTreesCTA}
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Store"
                iconPosition="left"
                onClick={() => onNavigate('/carbon-credit-marketplace')}
                className="w-full sm:w-auto border-emerald-400 text-emerald-300 hover:bg-emerald-400/10">

                {text?.marketplaceCTA}
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 md:gap-6 pt-6 md:pt-8">
              {text?.stats?.map((stat, index) =>
              <div key={index} className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                    <Icon name={stat?.icon} size={24} className="text-emerald-400" />
                  </div>
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg">
                    {stat?.value}
                  </div>
                  <div className="text-xs md:text-sm text-slate-300 mt-1">
                    {stat?.label}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-teal-500/30 rounded-3xl blur-3xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-emerald-400/20">
                <Image
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_1faf92d57-1765333913332.png"
                  alt="Lush green mangrove forest in UAE coastal waters with dense foliage and roots visible in shallow water"
                  className="w-full h-[500px] object-cover" />

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default HeroSection;