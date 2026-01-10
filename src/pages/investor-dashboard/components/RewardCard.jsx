import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RewardCard = ({ reward, onClaim }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 transition-smooth hover:shadow-md">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Gift" size={20} className="text-primary" />
            <h4 className="text-base md:text-lg font-semibold text-foreground">{reward?.type}</h4>
          </div>
          <p className="text-sm text-muted-foreground">{reward?.description}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Amount</p>
          <p className="text-lg md:text-xl font-semibold text-primary data-text">{reward?.amount?.toLocaleString()} IZRA</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Value (AED)</p>
          <p className="text-sm md:text-base font-medium text-foreground data-text">AED {reward?.valueAED?.toLocaleString()}</p>
        </div>
      </div>
      <div className="bg-muted/50 rounded-lg p-3 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-muted-foreground">Distribution Date</span>
          <span className="text-xs font-medium text-foreground">{reward?.distributionDate}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">Status</span>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            reward?.status === 'available' ? 'bg-success/10 text-success' :
            reward?.status === 'pending'? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'
          }`}>
            {reward?.status}
          </span>
        </div>
      </div>
      <Button 
        variant="default" 
        size="default"
        iconName="Download"
        iconPosition="left"
        onClick={() => onClaim(reward?.id)}
        fullWidth
        disabled={reward?.status !== 'available'}
      >
        {reward?.status === 'available' ? 'Claim Reward' : 
         reward?.status === 'pending' ? 'Pending Distribution' : 'Claimed'}
      </Button>
    </div>
  );
};

export default RewardCard;