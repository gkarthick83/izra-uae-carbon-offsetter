import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const KYCStatusCard = ({ kycStatus, onStartKYC, onViewDetails }) => {
  const getStatusConfig = () => {
    switch (kycStatus) {
      case 'approved':
        return {
          icon: 'CheckCircle2',
          iconColor: 'text-success',
          bgColor: 'bg-success/10',
          title: 'KYC Approved',
          description: 'Your account is verified and ready to list projects',
          action: null
        };
      case 'pending':
        return {
          icon: 'Clock',
          iconColor: 'text-warning',
          bgColor: 'bg-warning/10',
          title: 'KYC Under Review',
          description: 'Your documents are being verified by our team',
          action: { label: 'View Status', onClick: onViewDetails }
        };
      case 'rejected':
        return {
          icon: 'XCircle',
          iconColor: 'text-error',
          bgColor: 'bg-error/10',
          title: 'KYC Rejected',
          description: 'Please review feedback and resubmit required documents',
          action: { label: 'Resubmit', onClick: onStartKYC }
        };
      default:
        return {
          icon: 'AlertCircle',
          iconColor: 'text-primary',
          bgColor: 'bg-primary/10',
          title: 'KYC Required',
          description: 'Complete KYC verification to start listing carbon credit projects',
          action: { label: 'Start KYC', onClick: onStartKYC }
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 lg:p-8 shadow-md">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">
        <div className={`flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full ${config?.bgColor} flex items-center justify-center`}>
          <Icon name={config?.icon} size={24} className={config?.iconColor} />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-2">
            {config?.title}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground">
            {config?.description}
          </p>
        </div>

        {config?.action && (
          <Button
            variant="default"
            size="default"
            onClick={config?.action?.onClick}
            iconName="ArrowRight"
            iconPosition="right"
            className="w-full lg:w-auto"
          >
            {config?.action?.label}
          </Button>
        )}
      </div>
    </div>
  );
};

export default KYCStatusCard;