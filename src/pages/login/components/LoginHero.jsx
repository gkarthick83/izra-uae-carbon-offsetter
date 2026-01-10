import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const LoginHero = ({ currentLanguage }) => {
  const content = {
    en: {
      badge: 'UAE Carbon Offset Platform',
      title: 'Offset Your Carbon Footprint',
      subtitle: 'Join the movement to restore UAE mangroves and trade verified carbon credits',
      features: [
      {
        icon: 'TreePine',
        title: 'Plant Mangrove Trees',
        description: 'Sponsor native UAE mangrove restoration across all Emirates'
      },
      {
        icon: 'ShieldCheck',
        title: 'Verified Carbon Credits',
        description: 'Trade blockchain-verified credits from certified projects'
      },
      {
        icon: 'Coins',
        title: 'IZRA Token Benefits',
        description: 'Earn rewards and discounts with native platform tokens'
      }],

      stats: [
      { value: '50,000+', label: 'Trees Planted' },
      { value: '12,500', label: 'Tonnes CO₂ Offset' },
      { value: '2,800+', label: 'Active Users' }]

    },
    ar: {
      badge: 'منصة تعويض الكربون الإماراتية',
      title: 'عوّض بصمتك الكربونية',
      subtitle: 'انضم إلى الحركة لاستعادة أشجار المانغروف الإماراتية وتداول أرصدة الكربون المعتمدة',
      features: [
      {
        icon: 'TreePine',
        title: 'زراعة أشجار المانغروف',
        description: 'رعاية استعادة أشجار المانغروف المحلية في جميع الإمارات'
      },
      {
        icon: 'ShieldCheck',
        title: 'أرصدة كربون معتمدة',
        description: 'تداول أرصدة معتمدة بتقنية البلوكشين من مشاريع معتمدة'
      },
      {
        icon: 'Coins',
        title: 'مزايا رمز IZRA',
        description: 'احصل على مكافآت وخصومات برموز المنصة الأصلية'
      }],

      stats: [
      { value: '50,000+', label: 'شجرة مزروعة' },
      { value: '12,500', label: 'طن CO₂ معوّض' },
      { value: '2,800+', label: 'مستخدم نشط' }]

    }
  };

  const t = content?.[currentLanguage];

  return (
    <div className="relative h-full flex flex-col justify-center p-6 md:p-8 lg:p-12">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1554917581-d6e28ef0ef67"
          alt="Lush green mangrove forest with dense foliage and intricate root systems in coastal wetland environment showcasing natural carbon sequestration"
          className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-secondary/90" />
      </div>
      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6 md:mb-8">
          <Icon name="Leaf" size={16} color="#FFFFFF" />
          <span className="text-xs md:text-sm font-medium text-white">
            {t?.badge}
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 md:mb-6">
          {t?.title}
        </h2>
        
        <p className="text-base md:text-lg text-white/90 mb-8 md:mb-12 leading-relaxed">
          {t?.subtitle}
        </p>

        <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
          {t?.features?.map((feature, index) =>
          <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Icon name={feature?.icon} size={20} color="#FFFFFF" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-semibold text-white mb-1">
                  {feature?.title}
                </h3>
                <p className="text-sm md:text-base text-white/80">
                  {feature?.description}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 md:gap-6 pt-6 md:pt-8 border-t border-white/20">
          {t?.stats?.map((stat, index) =>
          <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-1 md:mb-2">
                {stat?.value}
              </div>
              <div className="text-xs md:text-sm text-white/80">
                {stat?.label}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-6 md:bottom-8 right-6 md:right-8 z-10">
        <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
          <Icon name="Shield" size={16} color="#FFFFFF" />
          <span className="text-xs md:text-sm text-white font-medium">
            {currentLanguage === 'en' ? 'Blockchain Verified' : 'معتمد بالبلوكشين'}
          </span>
        </div>
      </div>
    </div>);

};

export default LoginHero;