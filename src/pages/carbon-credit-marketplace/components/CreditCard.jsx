import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CreditCard = ({ credit, onPurchase }) => {
  const {
    id,
    projectName,
    projectImage,
    projectImageAlt,
    projectType,
    location,
    isUAE,
    availableTonnage,
    pricePerTonne,
    currency,
    verificationStandard,
    registryId,
    verificationDate,
    description
  } = credit;

  const formatCurrency = (amount, curr) => {
    if (curr === 'AED') return `AED ${amount?.toFixed(2)}`;
    if (curr === 'USD') return `$${amount?.toFixed(2)}`;
    if (curr === 'USDT' || curr === 'USDC') return `${amount?.toFixed(2)} ${curr}`;
    return `${amount?.toFixed(2)} ${curr}`;
  };

  const getProjectTypeIcon = (type) => {
    switch (type) {
      case 'mangrove': return 'TreePine';
      case 'solar': return 'Sun';
      case 'afforestation': return 'Trees';
      default: return 'Leaf';
    }
  };

  const getProjectTypeLabel = (type) => {
    switch (type) {
      case 'mangrove': return 'Mangrove Restoration';
      case 'solar': return 'Solar Energy';
      case 'afforestation': return 'Afforestation';
      default: return type;
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-smooth hover-lift">
      {/* Project Image */}
      <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden">
        <Image
          src={projectImage}
          alt={projectImageAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          {isUAE && (
            <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full shadow-md">
              UAE
            </span>
          )}
          <span className="px-3 py-1 bg-success text-success-foreground text-xs font-semibold rounded-full shadow-md flex items-center gap-1">
            <Icon name="CheckCircle" size={14} />
            Verified
          </span>
        </div>
      </div>
      {/* Content */}
      <div className="p-4 md:p-5 lg:p-6">
        {/* Project Type Badge */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-lg">
            <Icon name={getProjectTypeIcon(projectType)} size={16} />
            <span className="text-xs font-medium">{getProjectTypeLabel(projectType)}</span>
          </div>
        </div>

        {/* Project Name */}
        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 line-clamp-2">
          {projectName}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-muted-foreground mb-3">
          <Icon name="MapPin" size={16} />
          <span className="text-sm">{location}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {description}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-muted/50 rounded-lg">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Available</p>
            <p className="text-base md:text-lg font-semibold text-foreground data-text">
              {availableTonnage?.toLocaleString()} t
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Price per Tonne</p>
            <p className="text-base md:text-lg font-semibold text-primary data-text">
              {formatCurrency(pricePerTonne, currency)}
            </p>
          </div>
        </div>

        {/* Verification Info */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="text-xs text-muted-foreground">{verificationStandard}</span>
          </div>
          <span className="text-xs text-muted-foreground data-text">ID: {registryId}</span>
        </div>

        {/* Purchase Button */}
        <Button
          variant="default"
          fullWidth
          iconName="ShoppingCart"
          iconPosition="left"
          onClick={() => onPurchase(credit)}
        >
          Purchase Credits
        </Button>

        {/* Verification Date */}
        <p className="text-xs text-center text-muted-foreground mt-3">
          Verified: {new Date(verificationDate)?.toLocaleDateString('en-GB')}
        </p>
      </div>
    </div>
  );
};

export default CreditCard;