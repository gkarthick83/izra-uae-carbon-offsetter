import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const EmirateSelector = ({ selectedEmirate, onEmirateSelect }) => {
  const emirates = [
  {
    id: 'abu-dhabi',
    name: 'Abu Dhabi',
    nameAr: 'أبو ظبي',
    coastalZones: 5,
    mangroveArea: '75 km²',
    image: "https://images.unsplash.com/photo-1582882198551-c0d7f863c5dd",
    imageAlt: 'Aerial view of Abu Dhabi coastline with modern skyscrapers along turquoise waters and mangrove forests',
    co2Potential: '12,500 tonnes/year',
    description: 'Largest mangrove coverage in UAE with extensive coastal restoration projects'
  },
  {
    id: 'dubai',
    name: 'Dubai',
    nameAr: 'دبي',
    coastalZones: 3,
    mangroveArea: '28 km²',
    image: "https://images.unsplash.com/photo-1686048075764-996b3c825d7b",
    imageAlt: 'Dubai Marina skyline with luxury yachts in harbor and palm trees along waterfront promenade',
    co2Potential: '4,800 tonnes/year',
    description: 'Urban mangrove sanctuaries integrated with city development'
  },
  {
    id: 'sharjah',
    name: 'Sharjah',
    nameAr: 'الشارقة',
    coastalZones: 2,
    mangroveArea: '18 km²',
    image: "https://images.unsplash.com/photo-1643636179029-cda2926ceb24",
    imageAlt: 'Sharjah waterfront with traditional architecture and fishing boats moored along peaceful coastal waters',
    co2Potential: '3,200 tonnes/year',
    description: 'Protected coastal ecosystems with heritage conservation focus'
  },
  {
    id: 'ajman',
    name: 'Ajman',
    nameAr: 'عجمان',
    coastalZones: 1,
    mangroveArea: '8 km²',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dc4f4def-1765278881788.png",
    imageAlt: 'Ajman beach with golden sand and clear blue waters with modern buildings in background',
    co2Potential: '1,400 tonnes/year',
    description: 'Compact coastal zone with emerging restoration initiatives'
  },
  {
    id: 'umm-al-quwain',
    name: 'Umm Al Quwain',
    nameAr: 'أم القيوين',
    coastalZones: 2,
    mangroveArea: '22 km²',
    image: "https://images.unsplash.com/photo-1610034879928-5ff1dd69ced1",
    imageAlt: 'Umm Al Quwain natural lagoon with pristine mangrove forests and traditional wooden boats',
    co2Potential: '3,800 tonnes/year',
    description: 'Natural lagoons with thriving mangrove biodiversity'
  },
  {
    id: 'ras-al-khaimah',
    name: 'Ras Al Khaimah',
    nameAr: 'رأس الخيمة',
    coastalZones: 3,
    mangroveArea: '32 km²',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_19c5e35eb-1765270103802.png",
    imageAlt: 'Ras Al Khaimah mountains meeting the sea with lush green mangrove forests along rocky coastline',
    co2Potential: '5,600 tonnes/year',
    description: 'Mountain-coastal ecosystem with diverse mangrove habitats'
  },
  {
    id: 'fujairah',
    name: 'Fujairah',
    nameAr: 'الفجيرة',
    coastalZones: 2,
    mangroveArea: '15 km²',
    image: "https://images.unsplash.com/photo-1447609737393-08ed03d42ea0",
    imageAlt: 'Fujairah eastern coast with dramatic mountain backdrop and coral reefs visible in crystal clear waters',
    co2Potential: '2,600 tonnes/year',
    description: 'Eastern coast with unique Gulf of Oman mangrove species'
  }];


  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-3">
          Select Your Emirate
        </h2>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
          Choose the Emirate where you'd like to sponsor mangrove tree planting. Each region contributes uniquely to UAE's coastal ecosystem restoration.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {emirates?.map((emirate) =>
        <button
          key={emirate?.id}
          onClick={() => onEmirateSelect(emirate)}
          className={`group relative overflow-hidden rounded-xl transition-smooth hover-lift ${
          selectedEmirate?.id === emirate?.id ?
          'ring-4 ring-primary shadow-xl' :
          'ring-1 ring-border hover:ring-2 hover:ring-primary/50'}`
          }>

            <div className="relative h-48 md:h-56 overflow-hidden">
              <Image
              src={emirate?.image}
              alt={emirate?.imageAlt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              {selectedEmirate?.id === emirate?.id &&
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground rounded-full p-2 shadow-lg">
                  <Icon name="Check" size={20} />
                </div>
            }
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-1">
                {emirate?.name}
              </h3>
              <p className="text-sm text-white/90 mb-3">
                {emirate?.nameAr}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-white/20 backdrop-blur-sm rounded-md text-xs text-white">
                  <Icon name="MapPin" size={14} />
                  {emirate?.coastalZones} Zones
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-white/20 backdrop-blur-sm rounded-md text-xs text-white">
                  <Icon name="TreePine" size={14} />
                  {emirate?.mangroveArea}
                </span>
              </div>

              <div className="flex items-center gap-1 text-xs text-white/80">
                <Icon name="Leaf" size={14} />
                <span>{emirate?.co2Potential} CO₂ absorption</span>
              </div>
            </div>
          </button>
        )}
      </div>
      <div className="bg-muted/50 rounded-xl p-4 md:p-6">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <Icon name="Info" size={20} className="text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">
              Why Emirate Selection Matters
            </h4>
            <p className="text-sm text-muted-foreground">
              Each Emirate has unique coastal ecosystems and restoration needs. Your selection helps direct resources to specific regional conservation efforts while supporting local environmental initiatives and community engagement programs.
            </p>
          </div>
        </div>
      </div>
    </div>);

};

export default EmirateSelector;