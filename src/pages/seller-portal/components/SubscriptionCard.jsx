import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SubscriptionCard = ({ subscription, onRenew, onUpgrade }) => {
  const isActive = subscription?.status === 'active';
  const daysRemaining = Math.ceil((new Date(subscription.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
  const isExpiringSoon = daysRemaining <= 30 && daysRemaining > 0;

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 lg:p-8 shadow-md">
      <div className="flex items-start justify-between mb-4 md:mb-6">
        <div>
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-2">
            Annual Subscription
          </h3>
          <p className="text-sm md:text-base text-muted-foreground">
            {subscription?.plan} Plan
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs md:text-sm font-medium ${
          isActive ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
        }`}>
          {isActive ? 'Active' : 'Expired'}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 md:mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon name="Calendar" size={20} className="text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-xs md:text-sm text-muted-foreground">Expiry Date</p>
            <p className="text-sm md:text-base font-medium text-foreground">
              {new Date(subscription.expiryDate)?.toLocaleDateString('en-GB')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
            <Icon name="DollarSign" size={20} className="text-secondary" />
          </div>
          <div className="min-w-0">
            <p className="text-xs md:text-sm text-muted-foreground">Annual Fee</p>
            <p className="text-sm md:text-base font-medium text-foreground">
              AED {subscription?.annualFee?.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      {isExpiringSoon && (
        <div className="flex items-center gap-2 p-3 md:p-4 bg-warning/10 rounded-lg mb-4">
          <Icon name="AlertTriangle" size={20} className="text-warning flex-shrink-0" />
          <p className="text-xs md:text-sm text-warning">
            Your subscription expires in {daysRemaining} days
          </p>
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          size="default"
          onClick={onRenew}
          iconName="RefreshCw"
          iconPosition="left"
          fullWidth
        >
          Renew Subscription
        </Button>
        <Button
          variant="outline"
          size="default"
          onClick={onUpgrade}
          iconName="TrendingUp"
          iconPosition="left"
          fullWidth
        >
          Upgrade Plan
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionCard;