import React from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ReportingDashboard = () => {
  const treesPlantedData = [
    { month: 'Jan', trees: 450 },
    { month: 'Feb', trees: 680 },
    { month: 'Mar', trees: 920 },
    { month: 'Apr', trees: 1150 },
    { month: 'May', trees: 1380 },
    { month: 'Jun', trees: 1620 }
  ];

  const creditsTraded = [
    { month: 'Jan', credits: 1200 },
    { month: 'Feb', credits: 1850 },
    { month: 'Mar', credits: 2400 },
    { month: 'Apr', credits: 3100 },
    { month: 'May', credits: 3650 },
    { month: 'Jun', credits: 4200 }
  ];

  const revenueBreakdown = [
    { name: 'Tree Sponsorships', value: 45000, color: '#0D7377' },
    { name: 'Carbon Credits', value: 125000, color: '#14A085' },
    { name: 'Seller Subscriptions', value: 15000, color: '#FA7268' },
    { name: 'Platform Fees', value: 8500, color: '#EA580C' }
  ];

  const tokenMetrics = [
    { month: 'Jan', staked: 50000, rewards: 2500 },
    { month: 'Feb', staked: 65000, rewards: 3250 },
    { month: 'Mar', staked: 82000, rewards: 4100 },
    { month: 'Apr', staked: 98000, rewards: 4900 },
    { month: 'May', staked: 115000, rewards: 5750 },
    { month: 'Jun', staked: 135000, rewards: 6750 }
  ];

  const summaryCards = [
    {
      title: "Total Trees Planted",
      value: "6,200",
      change: "+24%",
      trend: "up",
      icon: "TreePine",
      color: "text-success"
    },
    {
      title: "Carbon Credits Traded",
      value: "16,400 tonnes",
      change: "+32%",
      trend: "up",
      icon: "Award",
      color: "text-primary"
    },
    {
      title: "Total Revenue",
      value: "AED 193,500",
      change: "+18%",
      trend: "up",
      icon: "DollarSign",
      color: "text-accent"
    },
    {
      title: "Active Users",
      value: "1,247",
      change: "+15%",
      trend: "up",
      icon: "Users",
      color: "text-secondary"
    }
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards?.map((card, idx) => (
          <div key={idx} className="bg-card rounded-lg p-4 md:p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-${card?.color?.replace('text-', '')}/10 flex items-center justify-center`}>
                <Icon name={card?.icon} size={20} className={card?.color} />
              </div>
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${card?.trend === 'up' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
                <Icon name={card?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={12} />
                {card?.change}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
              {card?.value}
            </h3>
            <p className="text-sm text-muted-foreground">{card?.title}</p>
          </div>
        ))}
      </div>
      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Trees Planted Chart */}
        <div className="bg-card rounded-lg p-4 md:p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Icon name="TreePine" size={20} className="text-success" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-semibold text-foreground">
                Trees Planted (Monthly)
              </h3>
              <p className="text-xs text-muted-foreground">Cumulative tree sponsorships</p>
            </div>
          </div>
          <div className="w-full h-64" aria-label="Monthly Trees Planted Bar Chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={treesPlantedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="trees" fill="var(--color-success)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Credits Traded Chart */}
        <div className="bg-card rounded-lg p-4 md:p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="Award" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-semibold text-foreground">
                Carbon Credits Traded (Monthly)
              </h3>
              <p className="text-xs text-muted-foreground">Total tonnes CO₂ traded</p>
            </div>
          </div>
          <div className="w-full h-64" aria-label="Monthly Carbon Credits Line Chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={creditsTraded}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="credits"
                  stroke="var(--color-primary)"
                  strokeWidth={3}
                  dot={{ fill: 'var(--color-primary)', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Revenue Breakdown */}
        <div className="bg-card rounded-lg p-4 md:p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Icon name="DollarSign" size={20} className="text-accent" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-semibold text-foreground">
                Revenue Breakdown
              </h3>
              <p className="text-xs text-muted-foreground">Total: AED 193,500</p>
            </div>
          </div>
          <div className="w-full h-64" aria-label="Revenue Breakdown Pie Chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100)?.toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {revenueBreakdown?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {revenueBreakdown?.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item?.color }} />
                <div>
                  <p className="text-xs text-muted-foreground">{item?.name}</p>
                  <p className="text-sm font-semibold text-foreground">AED {item?.value?.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Token Metrics */}
        <div className="bg-card rounded-lg p-4 md:p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Icon name="Coins" size={20} className="text-warning" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-semibold text-foreground">
                IZRA Token Metrics
              </h3>
              <p className="text-xs text-muted-foreground">Staking and rewards growth</p>
            </div>
          </div>
          <div className="w-full h-64" aria-label="IZRA Token Metrics Line Chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={tokenMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="staked"
                  stroke="var(--color-warning)"
                  strokeWidth={2}
                  name="Tokens Staked"
                />
                <Line
                  type="monotone"
                  dataKey="rewards"
                  stroke="var(--color-success)"
                  strokeWidth={2}
                  name="Rewards Distributed"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Platform Health */}
      <div className="bg-card rounded-lg p-4 md:p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
            <Icon name="Activity" size={20} className="text-secondary" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-foreground">
            Platform Health Metrics
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">System Uptime</span>
              <Icon name="CheckCircle2" size={16} className="text-success" />
            </div>
            <p className="text-2xl font-bold text-foreground">99.9%</p>
            <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Avg Response Time</span>
              <Icon name="Zap" size={16} className="text-warning" />
            </div>
            <p className="text-2xl font-bold text-foreground">245ms</p>
            <p className="text-xs text-muted-foreground mt-1">API endpoints</p>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Active Sessions</span>
              <Icon name="Users" size={16} className="text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">342</p>
            <p className="text-xs text-muted-foreground mt-1">Current users online</p>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Transaction Volume</span>
              <Icon name="TrendingUp" size={16} className="text-success" />
            </div>
            <p className="text-2xl font-bold text-foreground">1,847</p>
            <p className="text-xs text-muted-foreground mt-1">Last 24 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportingDashboard;