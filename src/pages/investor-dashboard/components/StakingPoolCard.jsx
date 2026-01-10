import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const StakingPoolCard = ({ pool, onStake, onUnstake }) => {
  const [isStakeModalOpen, setIsStakeModalOpen] = useState(false);
  const [isUnstakeModalOpen, setIsUnstakeModalOpen] = useState(false);
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');

  const handleStake = () => {
    if (stakeAmount && parseFloat(stakeAmount) > 0) {
      onStake(pool?.id, parseFloat(stakeAmount));
      setStakeAmount('');
      setIsStakeModalOpen(false);
    }
  };

  const handleUnstake = () => {
    if (unstakeAmount && parseFloat(unstakeAmount) > 0) {
      onUnstake(pool?.id, parseFloat(unstakeAmount));
      setUnstakeAmount('');
      setIsUnstakeModalOpen(false);
    }
  };

  return (
    <>
      <div className="bg-card border border-border rounded-xl p-4 md:p-6 transition-smooth hover:shadow-md">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="text-lg md:text-xl font-semibold text-foreground mb-1">{pool?.name}</h4>
            <p className="text-sm text-muted-foreground">{pool?.description}</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            pool?.status === 'active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
          }`}>
            {pool?.status}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">APY</p>
            <p className="text-lg md:text-xl font-semibold text-success data-text">{pool?.apy}%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Lock Period</p>
            <p className="text-sm md:text-base font-medium text-foreground">{pool?.lockPeriod}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Your Stake</p>
            <p className="text-sm md:text-base font-medium text-foreground data-text">{pool?.userStaked?.toLocaleString()} IZRA</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Total Staked</p>
            <p className="text-sm md:text-base font-medium text-foreground data-text">{pool?.totalStaked?.toLocaleString()} IZRA</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
          <Button 
            variant="default" 
            size="default"
            iconName="Plus"
            iconPosition="left"
            onClick={() => setIsStakeModalOpen(true)}
            fullWidth
            disabled={pool?.status !== 'active'}
          >
            Stake
          </Button>
          <Button 
            variant="outline" 
            size="default"
            iconName="Minus"
            iconPosition="left"
            onClick={() => setIsUnstakeModalOpen(true)}
            fullWidth
            disabled={pool?.userStaked === 0}
          >
            Unstake
          </Button>
        </div>
      </div>
      {isStakeModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl md:text-2xl font-semibold text-foreground">Stake IZRA</h3>
              <button onClick={() => setIsStakeModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <Icon name="X" size={24} />
              </button>
            </div>

            <div className="mb-6">
              <Input
                label="Amount to Stake"
                type="number"
                placeholder="Enter IZRA amount"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e?.target?.value)}
                description={`Available: ${pool?.availableBalance?.toLocaleString()} IZRA`}
              />
            </div>

            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">APY</span>
                <span className="text-sm font-medium text-success">{pool?.apy}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Lock Period</span>
                <span className="text-sm font-medium text-foreground">{pool?.lockPeriod}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" size="default" onClick={() => setIsStakeModalOpen(false)} fullWidth>
                Cancel
              </Button>
              <Button variant="default" size="default" onClick={handleStake} fullWidth>
                Confirm Stake
              </Button>
            </div>
          </div>
        </div>
      )}
      {isUnstakeModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl md:text-2xl font-semibold text-foreground">Unstake IZRA</h3>
              <button onClick={() => setIsUnstakeModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <Icon name="X" size={24} />
              </button>
            </div>

            <div className="mb-6">
              <Input
                label="Amount to Unstake"
                type="number"
                placeholder="Enter IZRA amount"
                value={unstakeAmount}
                onChange={(e) => setUnstakeAmount(e?.target?.value)}
                description={`Staked: ${pool?.userStaked?.toLocaleString()} IZRA`}
              />
            </div>

            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-6">
              <div className="flex gap-3">
                <Icon name="AlertCircle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground">
                  Unstaking before the lock period ends may result in reduced rewards or penalties.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" size="default" onClick={() => setIsUnstakeModalOpen(false)} fullWidth>
                Cancel
              </Button>
              <Button variant="default" size="default" onClick={handleUnstake} fullWidth>
                Confirm Unstake
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StakingPoolCard;