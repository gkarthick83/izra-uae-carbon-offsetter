import React from 'react';
import Icon from '../../../components/AppIcon';

const ImpactSummaryCard = ({ icon, title, value, subtitle, trend, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    accent: 'bg-accent/10 text-accent',
    secondary: 'bg-secondary/10 text-secondary',
  };

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 shadow-md hover:shadow-lg transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-lg ${colorClasses?.[color]} flex items-center justify-center`}>
          <Icon name={icon} size={24} className="md:w-7 md:h-7" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
            trend?.direction === 'up' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
          }`}>
            <Icon name={trend?.direction === 'up' ? 'TrendingUp' : 'TrendingDown'} size={14} />
            <span>{trend?.value}</span>
          </div>
        )}
      </div>
      <h3 className="text-sm md:text-base text-muted-foreground mb-2">{title}</h3>
      <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-1">{value}</p>
      {subtitle && (
        <p className="text-xs md:text-sm text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
};

export default ImpactSummaryCard;