import React from 'react';
import Icon from '../../../components/AppIcon';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const ImpactVisualization = ({ impactData }) => {
  const COLORS = ['#0D7377', '#14A085', '#FA7268', '#16A34A'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover rounded-lg shadow-lg p-3 border border-border">
          <p className="font-medium text-popover-foreground text-sm mb-1">
            {payload?.[0]?.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {payload?.[0]?.value} tCO₂ ({payload?.[0]?.payload?.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-xl shadow-md p-4 md:p-6">
      <div className="flex items-center gap-2 mb-6">
        <Icon name="PieChart" size={24} className="text-primary" />
        <h3 className="text-lg md:text-xl font-semibold text-foreground">
          Impact Distribution
        </h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="h-64 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={impactData?.byType}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {impactData?.byType?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                wrapperStyle={{ fontSize: '14px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Statistics */}
        <div className="space-y-4">
          <div>
            <h4 className="text-sm md:text-base font-semibold text-foreground mb-3">
              By Project Type
            </h4>
            <div className="space-y-3">
              {impactData?.byType?.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS?.[index % COLORS?.length] }}
                    />
                    <span className="text-sm text-foreground">{item?.name}</span>
                  </div>
                  <span className="font-medium text-foreground text-sm">
                    {item?.value} tCO₂
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <h4 className="text-sm md:text-base font-semibold text-foreground mb-3">
              Geographic Distribution
            </h4>
            <div className="space-y-3">
              {impactData?.byLocation?.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-foreground">{item?.name}</span>
                    <span className="text-sm font-medium text-foreground">
                      {item?.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2 transition-smooth"
                      style={{ width: `${item?.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactVisualization;