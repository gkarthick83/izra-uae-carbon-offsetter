import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const RevenueChart = ({ data }) => {
  return (
    <div className="bg-card rounded-xl p-4 md:p-6 lg:p-8 shadow-md">
      <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-4 md:mb-6">
        Monthly Revenue
      </h3>
      <div className="w-full h-64 md:h-80 lg:h-96" aria-label="Monthly Revenue Bar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--color-popover)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                color: 'var(--color-popover-foreground)'
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
            />
            <Bar 
              dataKey="revenue" 
              fill="var(--color-primary)" 
              radius={[8, 8, 0, 0]}
              name="Revenue (AED)"
            />
            <Bar 
              dataKey="fees" 
              fill="var(--color-warning)" 
              radius={[8, 8, 0, 0]}
              name="Platform Fees (AED)"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 md:mt-6">
        <div className="p-4 bg-primary/10 rounded-lg">
          <p className="text-xs md:text-sm text-muted-foreground mb-1">Total Revenue</p>
          <p className="text-lg md:text-xl lg:text-2xl font-bold text-primary">
            AED {data?.reduce((sum, item) => sum + item?.revenue, 0)?.toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-warning/10 rounded-lg">
          <p className="text-xs md:text-sm text-muted-foreground mb-1">Platform Fees</p>
          <p className="text-lg md:text-xl lg:text-2xl font-bold text-warning">
            AED {data?.reduce((sum, item) => sum + item?.fees, 0)?.toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-success/10 rounded-lg">
          <p className="text-xs md:text-sm text-muted-foreground mb-1">Net Earnings</p>
          <p className="text-lg md:text-xl lg:text-2xl font-bold text-success">
            AED {data?.reduce((sum, item) => sum + (item?.revenue - item?.fees), 0)?.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;