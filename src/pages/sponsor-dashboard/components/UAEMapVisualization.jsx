import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const UAEMapVisualization = ({ locations }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedLocation(null);
  };

  const getStatusIcon = (status) => {
    const icons = {
      'Growing': 'Sprout',
      'Planted': 'TreePine',
      'Verified': 'CheckCircle2',
      'Scheduled': 'Clock'
    };
    return icons?.[status] || 'MapPin';
  };

  return (
    <div className="bg-card rounded-xl shadow-md overflow-hidden">
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg md:text-xl font-semibold text-foreground">Sponsored Locations</h3>
          <div className="flex items-center gap-2">
            <Icon name="Map" size={20} className="text-primary" />
            <span className="text-sm text-muted-foreground">Interactive Map</span>
          </div>
        </div>
      </div>
      <div className="relative bg-muted/30 aspect-[16/9] md:aspect-[21/9]">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="UAE Mangrove Locations"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=24.4539,54.3773&z=8&output=embed"
          className="w-full h-full"
        />

        {/* Location Markers Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {locations?.map((location, index) => (
            <button
              key={location?.id}
              onClick={() => handleLocationClick(location)}
              className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-smooth"
              style={{
                left: `${20 + (index * 15)}%`,
                top: `${30 + (index % 3) * 20}%`
              }}
            >
              <div className="relative">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary shadow-lg flex items-center justify-center">
                  <Icon name={getStatusIcon(location?.status)} size={20} className="text-primary-foreground" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-accent-foreground">
                  {location?.trees}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Location Cards - Mobile/Tablet */}
      <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {locations?.map((location) => (
          <button
            key={location?.id}
            onClick={() => handleLocationClick(location)}
            className="bg-muted/50 rounded-lg p-4 text-left hover:bg-muted transition-smooth"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Icon name="MapPin" size={16} className="text-primary" />
                <span className="text-sm font-semibold text-foreground">{location?.emirate}</span>
              </div>
              <span className="text-xs font-medium text-accent">{location?.trees} trees</span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">{location?.zone}</p>
            <div className="flex items-center gap-2">
              <Icon name={getStatusIcon(location?.status)} size={14} className="text-success" />
              <span className="text-xs text-success">{location?.status}</span>
            </div>
          </button>
        ))}
      </div>
      {/* Location Details Modal */}
      {showModal && selectedLocation && (
        <>
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[200]" onClick={closeModal} />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[201] w-[90%] max-w-lg">
            <div className="bg-card rounded-xl shadow-xl overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-primary to-secondary">
                <Image
                  src={selectedLocation?.image}
                  alt={selectedLocation?.imageAlt}
                  className="w-full h-full object-cover opacity-40"
                />
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 w-10 h-10 bg-card/90 rounded-full flex items-center justify-center hover:bg-card transition-smooth"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-semibold text-foreground mb-1">{selectedLocation?.emirate}</h4>
                    <p className="text-sm text-muted-foreground">{selectedLocation?.zone}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{selectedLocation?.trees}</p>
                    <p className="text-xs text-muted-foreground">Trees</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Planting Date</span>
                    <span className="text-sm font-medium text-foreground">{selectedLocation?.plantingDate}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <span className="text-sm font-medium text-success flex items-center gap-1">
                      <Icon name={getStatusIcon(selectedLocation?.status)} size={14} />
                      {selectedLocation?.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">CO₂ Offset</span>
                    <span className="text-sm font-medium text-foreground">{selectedLocation?.co2Offset} kg</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">Growth Progress</span>
                    <span className="text-sm font-medium text-foreground">{selectedLocation?.growthProgress}%</span>
                  </div>
                </div>

                <div className="w-full bg-muted rounded-full h-2 mb-4">
                  <div
                    className="bg-success h-2 rounded-full transition-smooth"
                    style={{ width: `${selectedLocation?.growthProgress}%` }}
                  />
                </div>

                <p className="text-sm text-muted-foreground">{selectedLocation?.monitoringNote}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UAEMapVisualization;