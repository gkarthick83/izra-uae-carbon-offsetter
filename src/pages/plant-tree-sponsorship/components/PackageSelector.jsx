import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PackageSelector = ({ emirate, zone, onPackageSelect, onBack }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [customQuantity, setCustomQuantity] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);

  const predefinedPackages = [
    {
      id: 'starter',
      trees: 5,
      priceAED: 50,
      priceUSD: 13.61,
      co2Annual: '125 kg',
      co2Lifetime: '3.75 tonnes',
      popular: false,
      savings: 0
    },
    {
      id: 'standard',
      trees: 10,
      priceAED: 95,
      priceUSD: 25.86,
      co2Annual: '250 kg',
      co2Lifetime: '7.5 tonnes',
      popular: true,
      savings: 5
    },
    {
      id: 'premium',
      trees: 20,
      priceAED: 180,
      priceUSD: 49.01,
      co2Annual: '500 kg',
      co2Lifetime: '15 tonnes',
      popular: false,
      savings: 20
    }
  ];

  const calculateCustomPrice = (quantity) => {
    const basePrice = 10;
    const bulkDiscount = quantity >= 50 ? 0.15 : quantity >= 20 ? 0.10 : 0;
    return Math.round(quantity * basePrice * (1 - bulkDiscount));
  };

  const calculateCO2Impact = (trees) => {
    const annualPerTree = 25;
    const lifetimePerTree = 750;
    return {
      annual: `${(trees * annualPerTree)?.toLocaleString()} kg`,
      lifetime: `${((trees * lifetimePerTree) / 1000)?.toFixed(1)} tonnes`
    };
  };

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setIsCustomMode(false);
    setCustomQuantity('');
  };

  const handleCustomSelect = () => {
    if (customQuantity && parseInt(customQuantity) > 0) {
      const quantity = parseInt(customQuantity);
      const priceAED = calculateCustomPrice(quantity);
      const co2 = calculateCO2Impact(quantity);
      
      const customPackage = {
        id: 'custom',
        trees: quantity,
        priceAED,
        priceUSD: (priceAED / 3.67)?.toFixed(2),
        co2Annual: co2?.annual,
        co2Lifetime: co2?.lifetime,
        popular: false,
        savings: quantity >= 50 ? 15 : quantity >= 20 ? 10 : 0
      };
      
      setSelectedPackage(customPackage);
      setIsCustomMode(true);
    }
  };

  const handleContinue = () => {
    if (selectedPackage) {
      onPackageSelect(selectedPackage);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-smooth"
        >
          <Icon name="ArrowLeft" size={20} />
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-3">
          Choose Your Sponsorship Package
        </h2>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto mb-2">
          Select a predefined package or customize your tree quantity
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
          <Icon name="MapPin" size={16} className="text-primary" />
          <span className="text-sm font-medium text-primary">
            {zone?.name}, {emirate?.name}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {predefinedPackages?.map((pkg) => (
          <button
            key={pkg?.id}
            onClick={() => handlePackageSelect(pkg)}
            className={`relative overflow-hidden rounded-xl p-6 text-left transition-smooth hover-lift ${
              selectedPackage?.id === pkg?.id && !isCustomMode
                ? 'ring-4 ring-primary shadow-xl bg-primary/5'
                : 'ring-1 ring-border hover:ring-2 hover:ring-primary/50 bg-card'
            }`}
          >
            {pkg?.popular && (
              <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-3 py-1 rounded-bl-lg text-xs font-semibold">
                Most Popular
              </div>
            )}

            {pkg?.savings > 0 && (
              <div className="absolute top-0 left-0 bg-success text-success-foreground px-3 py-1 rounded-br-lg text-xs font-semibold">
                Save {pkg?.savings}%
              </div>
            )}

            <div className="mt-6 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="TreePine" size={24} className="text-primary" />
                <span className="text-3xl md:text-4xl font-bold text-foreground">
                  {pkg?.trees}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Mangrove Trees</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl md:text-3xl font-bold text-foreground">
                  AED {pkg?.priceAED}
                </span>
                <span className="text-sm text-muted-foreground">
                  (${pkg?.priceUSD})
                </span>
              </div>

              <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Annual CO₂:</span>
                  <span className="font-semibold text-foreground">{pkg?.co2Annual}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Lifetime CO₂:</span>
                  <span className="font-semibold text-foreground">{pkg?.co2Lifetime}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon name="Check" size={14} className="text-success" />
                <span>Digital certificate</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon name="Check" size={14} className="text-success" />
                <span>GPS coordinates</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon name="Check" size={14} className="text-success" />
                <span>Impact tracking</span>
              </div>
            </div>

            {selectedPackage?.id === pkg?.id && !isCustomMode && (
              <div className="absolute bottom-4 right-4">
                <div className="bg-primary text-primary-foreground rounded-full p-2">
                  <Icon name="Check" size={20} />
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
      <div className="bg-card rounded-xl p-6 ring-1 ring-border">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Settings" size={20} className="text-primary" />
          Custom Quantity
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              type="number"
              label="Number of Trees"
              placeholder="Enter quantity"
              value={customQuantity}
              onChange={(e) => setCustomQuantity(e?.target?.value)}
              min="1"
              className="mb-4"
            />

            <Button
              variant="outline"
              onClick={handleCustomSelect}
              disabled={!customQuantity || parseInt(customQuantity) <= 0}
              iconName="Calculator"
              iconPosition="left"
              fullWidth
            >
              Calculate Price
            </Button>
          </div>

          {isCustomMode && selectedPackage && (
            <div className="bg-primary/5 rounded-lg p-4 ring-2 ring-primary">
              <div className="space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-foreground">
                    AED {selectedPackage?.priceAED}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    (${selectedPackage?.priceUSD})
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Trees:</span>
                    <span className="font-semibold text-foreground">{selectedPackage?.trees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Annual CO₂:</span>
                    <span className="font-semibold text-foreground">{selectedPackage?.co2Annual}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lifetime CO₂:</span>
                    <span className="font-semibold text-foreground">{selectedPackage?.co2Lifetime}</span>
                  </div>
                  {selectedPackage?.savings > 0 && (
                    <div className="flex justify-between text-success">
                      <span>Bulk Discount:</span>
                      <span className="font-semibold">{selectedPackage?.savings}%</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 bg-muted/50 rounded-lg p-3">
          <p className="text-xs text-muted-foreground">
            <strong>Bulk Discounts:</strong> 10% off for 20+ trees, 15% off for 50+ trees
          </p>
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          variant="default"
          size="lg"
          onClick={handleContinue}
          disabled={!selectedPackage}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue to Checkout
        </Button>
      </div>
    </div>
  );
};

export default PackageSelector;