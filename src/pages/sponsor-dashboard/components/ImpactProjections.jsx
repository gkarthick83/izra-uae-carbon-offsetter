import React from 'react';
import Icon from '../../../components/AppIcon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ImpactProjections = ({ projectionData }) => {
  return (
    <div className="bg-card rounded-xl shadow-md overflow-hidden">
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg md:text-xl font-semibold text-foreground">Environmental Impact Projections</h3>
          <Icon name="TrendingUp" size={20} className="text-success" />
        </div>
        <p className="text-sm text-muted-foreground mt-2">Estimated CO₂ offset over the next 5 years</p>
      </div>

      <div className="p-4 md:p-6">
        <div className="h-64 md:h-80 w-full" aria-label="CO₂ Offset Projection Chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="year" 
                stroke="var(--color-muted-foreground)"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                style={{ fontSize: '12px' }}
                label={{ value: 'CO₂ (kg)', angle: -90, position: 'insideLeft', style: { fill: 'var(--color-muted-foreground)' } }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-card)', 
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  color: 'var(--color-foreground)'
                }}
              />
              <Legend 
                wrapperStyle={{ fontSize: '12px', color: 'var(--color-foreground)' }}
              />
              <Line 
                type="monotone" 
                dataKey="co2Offset" 
                stroke="var(--color-success)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-success)', r: 4 }}
                activeDot={{ r: 6 }}
                name="CO₂ Offset (kg)"
              />
              <Line 
                type="monotone" 
                dataKey="treeGrowth" 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: 'var(--color-primary)', r: 3 }}
                name="Tree Growth Index"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-success/10 rounded-lg p-4 text-center">
            <Icon name="Leaf" size={24} className="mx-auto mb-2 text-success" />
            <p className="text-2xl font-bold text-success mb-1">2,450 kg</p>
            <p className="text-xs text-muted-foreground">Projected 5-Year Offset</p>
          </div>
          <div className="bg-primary/10 rounded-lg p-4 text-center">
            <Icon name="TreePine" size={24} className="mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold text-primary mb-1">98%</p>
            <p className="text-xs text-muted-foreground">Survival Rate</p>
          </div>
          <div className="bg-accent/10 rounded-lg p-4 text-center">
            <Icon name="TrendingUp" size={24} className="mx-auto mb-2 text-accent" />
            <p className="text-2xl font-bold text-accent mb-1">+45%</p>
            <p className="text-xs text-muted-foreground">Annual Growth</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactProjections;