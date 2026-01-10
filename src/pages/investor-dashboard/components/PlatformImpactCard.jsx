import React from 'react';
import Icon from '../../../components/AppIcon';

const PlatformImpactCard = ({ metrics }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/10 p-3 rounded-lg">
          <Icon name="TrendingUp" size={24} className="text-primary" />
        </div>
        <div>
          <h4 className="text-base md:text-lg font-semibold text-foreground">Platform Impact</h4>
          <p className="text-sm text-muted-foreground">Your contribution to ecosystem growth</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-success/5 border border-success/20 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <Icon name="TreePine" size={20} className="text-success" />
            <span className="text-sm font-medium text-muted-foreground">Trees Planted</span>
          </div>
          <p className="text-2xl md:text-3xl font-semibold text-foreground data-text mb-1">
            {metrics?.treesPlanted?.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">Mangrove trees sponsored</p>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <Icon name="Leaf" size={20} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">CO₂ Offset</span>
          </div>
          <p className="text-2xl md:text-3xl font-semibold text-foreground data-text mb-1">
            {metrics?.co2Offset?.toLocaleString()} tons
          </p>
          <p className="text-xs text-muted-foreground">Carbon credits traded</p>
        </div>

        <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <Icon name="DollarSign" size={20} className="text-accent" />
            <span className="text-sm font-medium text-muted-foreground">Platform Revenue</span>
          </div>
          <p className="text-2xl md:text-3xl font-semibold text-foreground data-text mb-1">
            AED {metrics?.platformRevenue?.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">Total transactions</p>
        </div>

        <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <Icon name="Users" size={20} className="text-warning" />
            <span className="text-sm font-medium text-muted-foreground">Active Users</span>
          </div>
          <p className="text-2xl md:text-3xl font-semibold text-foreground data-text mb-1">
            {metrics?.activeUsers?.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">Platform participants</p>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Your Shareholder Percentage</span>
          <span className="text-lg font-semibold text-primary data-text">{metrics?.shareholderPercentage}%</span>
        </div>
      </div>
    </div>
  );
};

export default PlatformImpactCard;