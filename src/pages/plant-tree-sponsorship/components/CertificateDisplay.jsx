import React from 'react';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';

const CertificateDisplay = ({ certificateData }) => {
  const handleDownload = () => {
    console.log('Downloading certificate:', certificateData?.certificateId);
  };

  const handleViewDashboard = () => {
    window.location.href = '/sponsor-dashboard';
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-success/10 rounded-full mb-4">
          <Icon name="CheckCircle2" size={48} className="text-success" />
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-3">
          Sponsorship Complete!
        </h2>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
          Thank you for contributing to UAE's mangrove restoration. Your digital certificate is ready.
        </p>
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-8 md:p-12 ring-2 ring-primary/20 shadow-xl">
          <div className="bg-card rounded-xl p-8 md:p-10">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl">
                  <Icon name="Leaf" size={32} color="#FFFFFF" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">IZRA</h3>
                  <p className="text-sm text-muted-foreground">UAE Carbon Offsetter</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground mb-1">Certificate ID</p>
                <p className="text-sm font-mono font-semibold text-foreground">
                  {certificateData?.certificateId}
                </p>
              </div>
            </div>

            <div className="text-center mb-8">
              <h4 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Certificate of Sponsorship
              </h4>
              <p className="text-lg text-muted-foreground">
                This certifies that
              </p>
              <p className="text-2xl md:text-3xl font-bold text-primary my-4">
                {certificateData?.fullName}
              </p>
              <p className="text-lg text-muted-foreground">
                has sponsored the planting of
              </p>
              <div className="inline-flex items-center gap-3 my-4 px-6 py-3 bg-primary/10 rounded-xl">
                <Icon name="TreePine" size={32} className="text-primary" />
                <span className="text-4xl font-bold text-primary">
                  {certificateData?.packageData?.trees}
                </span>
                <span className="text-xl text-foreground">Mangrove Trees</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="MapPin" size={18} className="text-primary" />
                  <span className="text-sm font-semibold text-foreground">Location</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {certificateData?.zone?.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {certificateData?.emirate?.name}, UAE
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Calendar" size={18} className="text-primary" />
                  <span className="text-sm font-semibold text-foreground">Planting Date</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {formatDate(certificateData?.plantingDate)}
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Leaf" size={18} className="text-primary" />
                  <span className="text-sm font-semibold text-foreground">CO₂ Impact</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Annual: {certificateData?.packageData?.co2Annual}
                </p>
                <p className="text-sm text-muted-foreground">
                  Lifetime: {certificateData?.packageData?.co2Lifetime}
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Navigation" size={18} className="text-primary" />
                  <span className="text-sm font-semibold text-foreground">GPS Coordinates</span>
                </div>
                <p className="text-xs font-mono text-muted-foreground">
                  {certificateData?.coordinates?.lat?.toFixed(6)}°N
                </p>
                <p className="text-xs font-mono text-muted-foreground">
                  {certificateData?.coordinates?.lng?.toFixed(6)}°E
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-lg p-6 mb-6">
              <div className="flex items-start gap-3">
                <Icon name="Award" size={24} className="text-primary flex-shrink-0 mt-1" />
                <div>
                  <h5 className="font-semibold text-foreground mb-2">
                    Environmental Impact Statement
                  </h5>
                  <p className="text-sm text-muted-foreground">
                    Your sponsored mangrove trees will sequester approximately {certificateData?.packageData?.co2Annual} of CO₂ annually, contributing to UAE's coastal ecosystem restoration and climate change mitigation efforts. These trees will provide critical habitat for marine life, protect shorelines from erosion, and support local biodiversity for generations to come.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-border">
              <div className="flex items-center gap-2">
                <Icon name="Shield" size={18} className="text-primary" />
                <span className="text-xs text-muted-foreground">
                  Verified by IZRA Blockchain
                </span>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">
                  Issued: {formatDate(certificateData?.plantingDate)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <Button
            variant="outline"
            size="lg"
            onClick={handleDownload}
            iconName="Download"
            iconPosition="left"
            fullWidth
          >
            Download Certificate
          </Button>

          <Button
            variant="default"
            size="lg"
            onClick={handleViewDashboard}
            iconName="LayoutDashboard"
            iconPosition="left"
            fullWidth
          >
            View Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-card rounded-xl p-6 ring-1 ring-border text-center">
            <Icon name="Share2" size={32} className="mx-auto mb-3 text-primary" />
            <h5 className="font-semibold text-foreground mb-2">Share Impact</h5>
            <p className="text-xs text-muted-foreground">
              Share your contribution on social media
            </p>
          </div>

          <div className="bg-card rounded-xl p-6 ring-1 ring-border text-center">
            <Icon name="Bell" size={32} className="mx-auto mb-3 text-primary" />
            <h5 className="font-semibold text-foreground mb-2">Get Updates</h5>
            <p className="text-xs text-muted-foreground">
              Receive planting progress notifications
            </p>
          </div>

          <div className="bg-card rounded-xl p-6 ring-1 ring-border text-center">
            <Icon name="Gift" size={32} className="mx-auto mb-3 text-primary" />
            <h5 className="font-semibold text-foreground mb-2">Gift Trees</h5>
            <p className="text-xs text-muted-foreground">
              Send certificates as eco-friendly gifts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateDisplay;