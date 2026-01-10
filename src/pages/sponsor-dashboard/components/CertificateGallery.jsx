import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CertificateGallery = ({ certificates, onDownload, onShare }) => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewCertificate = (certificate) => {
    setSelectedCertificate(certificate);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCertificate(null);
  };

  return (
    <div className="bg-card rounded-xl shadow-md overflow-hidden">
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg md:text-xl font-semibold text-foreground">Digital Certificates</h3>
          <div className="flex items-center gap-2">
            <Icon name="Award" size={20} className="text-accent" />
            <span className="text-sm text-muted-foreground">{certificates?.length} Certificates</span>
          </div>
        </div>
      </div>
      <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {certificates?.map((cert) => (
          <div key={cert?.id} className="group relative bg-muted/30 rounded-lg overflow-hidden hover:shadow-lg transition-smooth">
            <div className="aspect-[3/4] relative">
              <Image
                src={cert?.thumbnail}
                alt={cert?.thumbnailAlt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
              
              <div className="absolute top-3 right-3 flex gap-2">
                {cert?.verified && (
                  <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center shadow-md">
                    <Icon name="CheckCircle2" size={16} className="text-success-foreground" />
                  </div>
                )}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-smooth">
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    iconName="Eye"
                    onClick={() => handleViewCertificate(cert)}
                    fullWidth
                  >
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Download"
                    onClick={() => onDownload(cert?.id)}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Share2"
                    onClick={() => onShare(cert?.id)}
                  />
                </div>
              </div>
            </div>

            <div className="p-4">
              <h4 className="text-sm font-semibold text-foreground mb-1 line-clamp-1">{cert?.title}</h4>
              <p className="text-xs text-muted-foreground mb-2">{cert?.location}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{cert?.date}</span>
                <span className="text-xs font-medium text-primary">{cert?.trees} trees</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Certificate Modal */}
      {showModal && selectedCertificate && (
        <>
          <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-[200]" onClick={closeModal} />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[201] w-[95%] max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="bg-card rounded-xl shadow-2xl overflow-hidden">
              <div className="relative">
                <Image
                  src={selectedCertificate?.fullImage}
                  alt={selectedCertificate?.fullImageAlt}
                  className="w-full h-auto"
                />
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 w-10 h-10 bg-card/90 rounded-full flex items-center justify-center hover:bg-card transition-smooth"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">{selectedCertificate?.title}</h3>
                    <p className="text-sm text-muted-foreground">{selectedCertificate?.location}</p>
                  </div>
                  {selectedCertificate?.verified && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-success/10 rounded-full">
                      <Icon name="CheckCircle2" size={16} className="text-success" />
                      <span className="text-xs font-medium text-success">Verified</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <Icon name="TreePine" size={24} className="mx-auto mb-2 text-primary" />
                    <p className="text-lg font-bold text-foreground">{selectedCertificate?.trees}</p>
                    <p className="text-xs text-muted-foreground">Trees</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <Icon name="Leaf" size={24} className="mx-auto mb-2 text-success" />
                    <p className="text-lg font-bold text-foreground">{selectedCertificate?.co2Offset}</p>
                    <p className="text-xs text-muted-foreground">CO₂ Offset</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <Icon name="Calendar" size={24} className="mx-auto mb-2 text-accent" />
                    <p className="text-lg font-bold text-foreground">{selectedCertificate?.date}</p>
                    <p className="text-xs text-muted-foreground">Date</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <Icon name="Hash" size={24} className="mx-auto mb-2 text-secondary" />
                    <p className="text-xs font-bold text-foreground line-clamp-1">{selectedCertificate?.certificateId}</p>
                    <p className="text-xs text-muted-foreground">Cert ID</p>
                  </div>
                </div>

                <div className="flex items-center justify-center mb-6">
                  <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
                    <Icon name="QrCode" size={80} className="text-muted-foreground" />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="default"
                    size="lg"
                    iconName="Download"
                    iconPosition="left"
                    onClick={() => onDownload(selectedCertificate?.id)}
                    fullWidth
                  >
                    Download PDF
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    iconName="Share2"
                    iconPosition="left"
                    onClick={() => onShare(selectedCertificate?.id)}
                    fullWidth
                  >
                    Share Certificate
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CertificateGallery;