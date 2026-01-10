import React from 'react';
import Icon from '../../../components/AppIcon';

const ImpactSummaryCard = ({ icon, title, value, unit, trend, trendValue, color }) => {
  return (
    <div className="bg-card rounded-xl p-4 md:p-6 shadow-md hover:shadow-lg transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center bg-${color}/10`}>
          <Icon name={icon} size={24} className={`text-${color}`} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${
            trend === 'up' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
          }`}>
            <Icon name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={14} />
            <span className="text-xs font-medium">{trendValue}</span>
          </div>
        )}
      </div>
      <h3 className="text-sm md:text-base text-muted-foreground mb-2">{title}</h3>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">{value}</span>
        {unit && <span className="text-sm md:text-base text-muted-foreground">{unit}</span>}
      </div>
    </div>
  );
};

export default ImpactSummaryCard;