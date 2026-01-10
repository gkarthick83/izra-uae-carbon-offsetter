import React, { useState, useEffect } from 'react';
import AuthenticatedHeader from '../../components/ui/AuthenticatedHeader';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import EmirateSelector from './components/EmirateSelector';
import ZoneSelector from './components/ZoneSelector';
import PackageSelector from './components/PackageSelector';
import CheckoutForm from './components/CheckoutForm';
import CertificateDisplay from './components/CertificateDisplay';

const PlantTreeSponsorship = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedEmirate, setSelectedEmirate] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [certificateData, setCertificateData] = useState(null);

  const steps = [
    {
      id: 'emirate',
      label: 'Select Emirate',
      description: 'Choose your preferred planting location'
    },
    {
      id: 'zone',
      label: 'Select Zone',
      description: 'Pick a specific coastal area'
    },
    {
      id: 'package',
      label: 'Choose Package',
      description: 'Select number of trees to sponsor'
    },
    {
      id: 'checkout',
      label: 'Checkout',
      description: 'Complete payment and details'
    },
    {
      id: 'certificate',
      label: 'Certificate',
      description: 'Receive your sponsorship certificate'
    }
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleEmirateSelect = (emirate) => {
    setSelectedEmirate(emirate);
    setCurrentStep(1);
  };

  const handleZoneSelect = (zone) => {
    setSelectedZone(zone);
    setCurrentStep(2);
  };

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setCurrentStep(3);
  };

  const handleCheckoutComplete = (data) => {
    setCertificateData(data);
    setCurrentStep(4);
  };

  const handleBackToEmirate = () => {
    setSelectedEmirate(null);
    setSelectedZone(null);
    setSelectedPackage(null);
    setCurrentStep(0);
  };

  const handleBackToZone = () => {
    setSelectedZone(null);
    setSelectedPackage(null);
    setCurrentStep(1);
  };

  const handleBackToPackage = () => {
    setSelectedPackage(null);
    setCurrentStep(2);
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader isAuthenticated={false} onLogout={() => {}} />

      <main className="main-content">
        <div className="container-safe py-8 md:py-12">
          <NavigationBreadcrumb steps={steps} currentStep={currentStep} />

          <div className="mt-8 md:mt-12">
            {currentStep === 0 && (
              <EmirateSelector
                selectedEmirate={selectedEmirate}
                onEmirateSelect={handleEmirateSelect}
              />
            )}

            {currentStep === 1 && selectedEmirate && (
              <ZoneSelector
                emirate={selectedEmirate}
                selectedZone={selectedZone}
                onZoneSelect={handleZoneSelect}
                onBack={handleBackToEmirate}
              />
            )}

            {currentStep === 2 && selectedEmirate && selectedZone && (
              <PackageSelector
                emirate={selectedEmirate}
                zone={selectedZone}
                onPackageSelect={handlePackageSelect}
                onBack={handleBackToZone}
              />
            )}

            {currentStep === 3 && selectedEmirate && selectedZone && selectedPackage && (
              <CheckoutForm
                emirate={selectedEmirate}
                zone={selectedZone}
                packageData={selectedPackage}
                onComplete={handleCheckoutComplete}
                onBack={handleBackToPackage}
              />
            )}

            {currentStep === 4 && certificateData && (
              <CertificateDisplay certificateData={certificateData} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlantTreeSponsorship;