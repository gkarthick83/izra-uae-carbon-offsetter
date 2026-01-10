import React from 'react';
import Icon from '../../../components/AppIcon';

const PortfolioCard = ({ title, value, subValue, icon, trend, trendValue, variant = 'default' }) => {
  const variantStyles = {
    default: 'bg-card border-border',
    primary: 'bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20',
    success: 'bg-gradient-to-br from-success/10 to-success/5 border-success/20',
    accent: 'bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20',
  };

  const iconColors = {
    default: 'text-primary',
    primary: 'text-primary',
    success: 'text-success',
    accent: 'text-accent',
  };

  return (
    <div className={`${variantStyles?.[variant]} border rounded-xl p-4 md:p-6 transition-smooth hover:shadow-md`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm md:text-base text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground data-text">
            {value}
          </h3>
          {subValue && (
            <p className="text-xs md:text-sm text-muted-foreground mt-1">{subValue}</p>
          )}
        </div>
        <div className={`${iconColors?.[variant]} bg-background/50 p-2 md:p-3 rounded-lg`}>
          <Icon name={icon} size={24} className="md:w-7 md:h-7 lg:w-8 lg:h-8" />
        </div>
      </div>
      {trend && (
        <div className="flex items-center gap-2">
          <Icon 
            name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
            size={16} 
            className={trend === 'up' ? 'text-success' : 'text-error'}
          />
          <span className={`text-xs md:text-sm font-medium ${trend === 'up' ? 'text-success' : 'text-error'}`}>
            {trendValue}
          </span>
          <span className="text-xs md:text-sm text-muted-foreground">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default PortfolioCard;