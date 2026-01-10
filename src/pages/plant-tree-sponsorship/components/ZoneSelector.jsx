import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ZoneSelector = ({ emirate, selectedZone, onZoneSelect, onBack }) => {
  const getZonesForEmirate = (emirateId) => {
    const zoneData = {
      'abu-dhabi': [
      {
        id: 'saadiyat',
        name: 'Saadiyat Island',
        nameAr: 'جزيرة السعديات',
        area: '18 km²',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a581a212-1765339898175.png",
        imageAlt: 'Saadiyat Island pristine beach with white sand and turquoise waters surrounded by protected mangrove forests',
        status: 'Active Restoration',
        trees: '12,500 planted',
        biodiversity: 'High'
      },
      {
        id: 'al-wathba',
        name: 'Al Wathba Wetland',
        nameAr: 'محمية الوثبة',
        area: '22 km²',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_11c7028e1-1766400237705.png",
        imageAlt: 'Al Wathba wetland reserve with flamingos wading in shallow waters among dense mangrove vegetation',
        status: 'Protected Reserve',
        trees: '18,200 planted',
        biodiversity: 'Very High'
      },
      {
        id: 'jubail',
        name: 'Jubail Island',
        nameAr: 'جزيرة جبيل',
        area: '15 km²',
        image: "https://images.unsplash.com/photo-1634662049969-6274553e2994",
        imageAlt: 'Jubail Island mangrove boardwalk with wooden pathway through lush green mangrove forest canopy',
        status: 'Eco-Tourism Zone',
        trees: '9,800 planted',
        biodiversity: 'High'
      },
      {
        id: 'yas-island',
        name: 'Yas Island Coast',
        nameAr: 'ساحل جزيرة ياس',
        area: '12 km²',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d129808d-1766400237465.png",
        imageAlt: 'Yas Island coastal area with modern development integrated with preserved mangrove ecosystems',
        status: 'Urban Integration',
        trees: '7,500 planted',
        biodiversity: 'Medium'
      },
      {
        id: 'al-dhafra',
        name: 'Al Dhafra Region',
        nameAr: 'منطقة الظفرة',
        area: '28 km²',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1bcabcc50-1766400237697.png",
        imageAlt: 'Al Dhafra coastal region with vast mangrove forests extending along pristine shoreline',
        status: 'Expansion Project',
        trees: '15,600 planted',
        biodiversity: 'High'
      }],

      'dubai': [
      {
        id: 'ras-al-khor',
        name: 'Ras Al Khor Wildlife Sanctuary',
        nameAr: 'محمية رأس الخور',
        area: '12 km²',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1273d609d-1766400237659.png",
        imageAlt: 'Ras Al Khor sanctuary with flamingos and herons among mangrove trees with Dubai skyline background',
        status: 'Protected Sanctuary',
        trees: '8,400 planted',
        biodiversity: 'Very High'
      },
      {
        id: 'jebel-ali',
        name: 'Jebel Ali Wetland',
        nameAr: 'أراضي جبل علي الرطبة',
        area: '10 km²',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_16e8a4449-1766400237711.png",
        imageAlt: 'Jebel Ali wetland area with industrial port visible in distance and thriving mangrove restoration zone',
        status: 'Industrial Buffer',
        trees: '6,200 planted',
        biodiversity: 'Medium'
      },
      {
        id: 'dubai-creek',
        name: 'Dubai Creek Mangroves',
        nameAr: 'أشجار القرم في خور دبي',
        area: '6 km²',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e4584873-1766325728732.png",
        imageAlt: 'Dubai Creek historic waterway with traditional dhow boats passing through mangrove-lined channels',
        status: 'Heritage Conservation',
        trees: '4,800 planted',
        biodiversity: 'Medium'
      }],

      'sharjah': [
      {
        id: 'al-khan',
        name: 'Al Khan Lagoon',
        nameAr: 'بحيرة الخان',
        area: '9 km²',
        image: "https://images.unsplash.com/photo-1621046937491-d8c2defa51ac",
        imageAlt: 'Al Khan lagoon with calm waters surrounded by healthy mangrove forests and residential areas',
        status: 'Urban Sanctuary',
        trees: '5,600 planted',
        biodiversity: 'High'
      },
      {
        id: 'khor-kalba',
        name: 'Khor Kalba',
        nameAr: 'خور كلباء',
        area: '9 km²',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1fb1dfac0-1766400237659.png",
        imageAlt: 'Khor Kalba oldest mangrove forest in Arabia with ancient trees and rare bird species habitat',
        status: 'Ancient Forest',
        trees: '7,200 planted',
        biodiversity: 'Very High'
      }],

      'ajman': [
      {
        id: 'ajman-coast',
        name: 'Ajman Coastal Zone',
        nameAr: 'المنطقة الساحلية لعجمان',
        area: '8 km²',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_145dc0179-1765270106196.png",
        imageAlt: 'Ajman coastal restoration area with newly planted mangrove saplings along sandy beach',
        status: 'New Development',
        trees: '3,200 planted',
        biodiversity: 'Growing'
      }],

      'umm-al-quwain': [
      {
        id: 'uaq-lagoon',
        name: 'UAQ Marine Research Station',
        nameAr: 'محطة الأبحاث البحرية',
        area: '12 km²',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_11f265c1d-1766400237634.png",
        imageAlt: 'Umm Al Quwain research station with scientists studying mangrove ecosystems in natural lagoon',
        status: 'Research Hub',
        trees: '6,800 planted',
        biodiversity: 'High'
      },
      {
        id: 'al-sinniyah',
        name: 'Al Sinniyah Island',
        nameAr: 'جزيرة السينية',
        area: '10 km²',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_16c5b394c-1766400236588.png",
        imageAlt: 'Al Sinniyah Island untouched natural mangrove forests with archaeological sites nearby',
        status: 'Heritage Site',
        trees: '5,400 planted',
        biodiversity: 'Very High'
      }],

      'ras-al-khaimah': [
      {
        id: 'rak-creek',
        name: 'RAK Creek Mangroves',
        nameAr: 'أشجار القرم في خور رأس الخيمة',
        area: '14 km²',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_162f8e7cd-1766400237692.png",
        imageAlt: 'Ras Al Khaimah creek with traditional fishing boats and extensive mangrove forests along waterway',
        status: 'Traditional Fishing',
        trees: '8,900 planted',
        biodiversity: 'High'
      },
      {
        id: 'al-rams',
        name: 'Al Rams Coastal Area',
        nameAr: 'المنطقة الساحلية للرمس',
        area: '11 km²',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c6368117-1766400237602.png",
        imageAlt: 'Al Rams coastal village with traditional architecture and mangrove restoration projects',
        status: 'Community Project',
        trees: '6,700 planted',
        biodiversity: 'Medium'
      },
      {
        id: 'khor-khwair',
        name: 'Khor Khwair',
        nameAr: 'خور خوير',
        area: '7 km²',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_14681201d-1766400236595.png",
        imageAlt: 'Khor Khwair natural inlet with pristine mangrove ecosystem and mountain views',
        status: 'Protected Area',
        trees: '4,500 planted',
        biodiversity: 'High'
      }],

      'fujairah': [
      {
        id: 'dibba',
        name: 'Dibba Mangroves',
        nameAr: 'أشجار القرم في دبا',
        area: '8 km²',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dfc9ca5a-1766400237580.png",
        imageAlt: 'Dibba coastal area with mangroves growing along rocky shoreline with Hajar mountains backdrop',
        status: 'Mountain Coast',
        trees: '4,200 planted',
        biodiversity: 'Medium'
      },
      {
        id: 'khor-fakkan',
        name: 'Khor Fakkan Bay',
        nameAr: 'خليج خورفكان',
        area: '7 km²',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dda61da5-1766400237610.png",
        imageAlt: 'Khor Fakkan bay with amphitheater and mangrove conservation area along scenic waterfront',
        status: 'Tourism Integration',
        trees: '3,800 planted',
        biodiversity: 'Medium'
      }]

    };

    return zoneData?.[emirateId] || [];
  };

  const zones = getZonesForEmirate(emirate?.id);

  const getStatusColor = (status) => {
    const colors = {
      'Active Restoration': 'bg-success/10 text-success',
      'Protected Reserve': 'bg-primary/10 text-primary',
      'Eco-Tourism Zone': 'bg-accent/10 text-accent',
      'Urban Integration': 'bg-secondary/10 text-secondary',
      'Expansion Project': 'bg-warning/10 text-warning',
      'Protected Sanctuary': 'bg-primary/10 text-primary',
      'Industrial Buffer': 'bg-muted text-muted-foreground',
      'Heritage Conservation': 'bg-accent/10 text-accent',
      'Urban Sanctuary': 'bg-secondary/10 text-secondary',
      'Ancient Forest': 'bg-success/10 text-success',
      'New Development': 'bg-warning/10 text-warning',
      'Research Hub': 'bg-primary/10 text-primary',
      'Heritage Site': 'bg-accent/10 text-accent',
      'Traditional Fishing': 'bg-secondary/10 text-secondary',
      'Community Project': 'bg-success/10 text-success',
      'Protected Area': 'bg-primary/10 text-primary',
      'Mountain Coast': 'bg-secondary/10 text-secondary',
      'Tourism Integration': 'bg-accent/10 text-accent',
      'Growing': 'bg-warning/10 text-warning'
    };
    return colors?.[status] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-smooth">

          <Icon name="ArrowLeft" size={20} />
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-3">
          Select Coastal Zone in {emirate?.name}
        </h2>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
          Choose the specific coastal zone where your sponsored trees will be planted. Each zone has unique environmental characteristics and restoration priorities.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {zones?.map((zone) =>
        <button
          key={zone?.id}
          onClick={() => onZoneSelect(zone)}
          className={`group relative overflow-hidden rounded-xl transition-smooth hover-lift text-left ${
          selectedZone?.id === zone?.id ?
          'ring-4 ring-primary shadow-xl' :
          'ring-1 ring-border hover:ring-2 hover:ring-primary/50'}`
          }>

            <div className="relative h-56 md:h-64 overflow-hidden">
              <Image
              src={zone?.image}
              alt={zone?.imageAlt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              
              {selectedZone?.id === zone?.id &&
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground rounded-full p-2 shadow-lg">
                  <Icon name="Check" size={20} />
                </div>
            }

              <div className="absolute top-4 left-4">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(zone?.status)}`}>
                  <Icon name="Activity" size={14} />
                  {zone?.status}
                </span>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-1">
                {zone?.name}
              </h3>
              <p className="text-sm text-white/90 mb-4">
                {zone?.nameAr}
              </p>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center gap-1 text-white/80 mb-1">
                    <Icon name="Maximize2" size={14} />
                    <span className="text-xs">Area</span>
                  </div>
                  <p className="text-sm font-semibold text-white">{zone?.area}</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center gap-1 text-white/80 mb-1">
                    <Icon name="TreePine" size={14} />
                    <span className="text-xs">Trees</span>
                  </div>
                  <p className="text-sm font-semibold text-white">{zone?.trees}</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center gap-1 text-white/80 mb-1">
                    <Icon name="Leaf" size={14} />
                    <span className="text-xs">Bio</span>
                  </div>
                  <p className="text-sm font-semibold text-white">{zone?.biodiversity}</p>
                </div>
              </div>
            </div>
          </button>
        )}
      </div>
    </div>);

};

export default ZoneSelector;