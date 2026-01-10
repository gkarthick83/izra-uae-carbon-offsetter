import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticatedHeader from '../../components/ui/AuthenticatedHeader';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PortfolioCard from './components/PortfolioCard';
import StakingPoolCard from './components/StakingPoolCard';
import RewardCard from './components/RewardCard';
import TokenMetricsChart from './components/TokenMetricsChart';
import TransactionHistoryTable from './components/TransactionHistoryTable';
import PlatformImpactCard from './components/PlatformImpactCard';

const InvestorDashboard = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const content = {
    en: {
      pageTitle: 'Investor Dashboard',
      tabs: {
        overview: 'Overview',
        staking: 'Staking',
        rewards: 'Rewards',
        metrics: 'Metrics',
        transactions: 'Transactions',
      },
      portfolio: {
        totalHoldings: 'Total IZRA Holdings',
        stakedAmount: 'Staked Amount',
        availableRewards: 'Available Rewards',
        shareholderStatus: 'Shareholder Status',
      },
      actions: {
        buyTokens: 'Buy IZRA Tokens',
        stakeMore: 'Stake More',
        claimRewards: 'Claim All Rewards',
      },
    },
    ar: {
      pageTitle: 'لوحة تحكم المستثمر',
      tabs: {
        overview: 'نظرة عامة',
        staking: 'التخزين',
        rewards: 'المكافآت',
        metrics: 'المقاييس',
        transactions: 'المعاملات',
      },
      portfolio: {
        totalHoldings: 'إجمالي حيازات IZRA',
        stakedAmount: 'المبلغ المخزن',
        availableRewards: 'المكافآت المتاحة',
        shareholderStatus: 'حالة المساهم',
      },
      actions: {
        buyTokens: 'شراء رموز IZRA',
        stakeMore: 'تخزين المزيد',
        claimRewards: 'المطالبة بجميع المكافآت',
      },
    },
  };

  const t = content?.[currentLanguage];

  const portfolioData = {
    totalHoldings: 125000,
    stakedAmount: 75000,
    availableRewards: 3250,
    shareholderPercentage: 0.15,
    totalValueAED: 437500,
    monthlyGrowth: '+12.5%',
  };

  const stakingPools = [
    {
      id: 1,
      name: "Flexible Staking",
      description: "Stake and unstake anytime with daily rewards",
      apy: 8.5,
      lockPeriod: "No lock",
      userStaked: 25000,
      totalStaked: 5000000,
      availableBalance: 50000,
      status: "active",
    },
    {
      id: 2,
      name: "90-Day Lock",
      description: "Higher rewards with 90-day commitment",
      apy: 15.0,
      lockPeriod: "90 days",
      userStaked: 30000,
      totalStaked: 3500000,
      availableBalance: 50000,
      status: "active",
    },
    {
      id: 3,
      name: "180-Day Lock",
      description: "Maximum rewards with 180-day commitment",
      apy: 22.5,
      lockPeriod: "180 days",
      userStaked: 20000,
      totalStaked: 2000000,
      availableBalance: 50000,
      status: "active",
    },
  ];

  const rewards = [
    {
      id: 1,
      type: "Staking Rewards",
      description: "Monthly rewards from flexible staking pool",
      amount: 1250,
      valueAED: 4375,
      distributionDate: "22/12/2025",
      status: "available",
    },
    {
      id: 2,
      type: "Platform Revenue Share",
      description: "Quarterly revenue distribution to shareholders",
      amount: 2000,
      valueAED: 7000,
      distributionDate: "31/12/2025",
      status: "pending",
    },
    {
      id: 3,
      type: "Bonus Rewards",
      description: "Special bonus for early investors",
      amount: 500,
      valueAED: 1750,
      distributionDate: "15/12/2025",
      status: "claimed",
    },
  ];

  const priceHistoryData = [
    { name: 'Jan', value: 2.8 },
    { name: 'Feb', value: 3.0 },
    { name: 'Mar', value: 3.2 },
    { name: 'Apr', value: 3.1 },
    { name: 'May', value: 3.4 },
    { name: 'Jun', value: 3.5 },
    { name: 'Jul', value: 3.3 },
    { name: 'Aug', value: 3.6 },
    { name: 'Sep', value: 3.7 },
    { name: 'Oct', value: 3.5 },
    { name: 'Nov', value: 3.8 },
    { name: 'Dec', value: 3.5 },
  ];

  const tradingVolumeData = [
    { name: 'Week 1', value: 125000 },
    { name: 'Week 2', value: 145000 },
    { name: 'Week 3', value: 132000 },
    { name: 'Week 4', value: 168000 },
  ];

  const tvlData = [
    { name: 'Jan', value: 5000000 },
    { name: 'Feb', value: 5500000 },
    { name: 'Mar', value: 6200000 },
    { name: 'Apr', value: 6800000 },
    { name: 'May', value: 7500000 },
    { name: 'Jun', value: 8200000 },
    { name: 'Jul', value: 8900000 },
    { name: 'Aug', value: 9600000 },
    { name: 'Sep', value: 10300000 },
    { name: 'Oct', value: 11000000 },
    { name: 'Nov', value: 11800000 },
    { name: 'Dec', value: 12500000 },
  ];

  const transactions = [
    {
      id: 1,
      type: 'stake',
      amount: 10000,
      date: '22/12/2025 14:30',
      status: 'completed',
      txId: '0x7a8b9c...def123',
    },
    {
      id: 2,
      type: 'reward',
      amount: 1250,
      date: '22/12/2025 09:15',
      status: 'completed',
      txId: '0x4e5f6g...hij456',
    },
    {
      id: 3,
      type: 'purchase',
      amount: 25000,
      date: '20/12/2025 16:45',
      status: 'completed',
      txId: '0x1a2b3c...klm789',
    },
    {
      id: 4,
      type: 'unstake',
      amount: 5000,
      date: '18/12/2025 11:20',
      status: 'completed',
      txId: '0x9d8e7f...nop012',
    },
    {
      id: 5,
      type: 'stake',
      amount: 15000,
      date: '15/12/2025 13:00',
      status: 'completed',
      txId: '0x6c5d4e...qrs345',
    },
  ];

  const platformMetrics = {
    treesPlanted: 45230,
    co2Offset: 12850,
    platformRevenue: 2450000,
    activeUsers: 8750,
    shareholderPercentage: 0.15,
  };

  const handleStake = (poolId, amount) => {
    console.log(`Staking ${amount} IZRA in pool ${poolId}`);
  };

  const handleUnstake = (poolId, amount) => {
    console.log(`Unstaking ${amount} IZRA from pool ${poolId}`);
  };

  const handleClaimReward = (rewardId) => {
    console.log(`Claiming reward ${rewardId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader 
        isAuthenticated={true}
        userRole="investor"
        onLogout={handleLogout}
      />
      <main className="main-content">
        <div className="container-safe py-6 md:py-8 lg:py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-2">
                {t?.pageTitle}
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Manage your IZRA token investments and track platform performance
              </p>
            </div>
            <div className="flex flex-wrap gap-2 md:gap-3">
              <Button
                variant="default"
                size="default"
                iconName="ShoppingCart"
                iconPosition="left"
              >
                {t?.actions?.buyTokens}
              </Button>
              <Button
                variant="outline"
                size="default"
                iconName="Download"
                iconPosition="left"
              >
                Export Report
              </Button>
            </div>
          </div>

          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {Object.entries(t?.tabs)?.map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-smooth flex-shrink-0 ${
                  activeTab === key
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-6 md:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <PortfolioCard
                  title={t?.portfolio?.totalHoldings}
                  value={`${portfolioData?.totalHoldings?.toLocaleString()} IZRA`}
                  subValue={`AED ${portfolioData?.totalValueAED?.toLocaleString()}`}
                  icon="Coins"
                  trend="up"
                  trendValue={portfolioData?.monthlyGrowth}
                  variant="primary"
                />
                <PortfolioCard
                  title={t?.portfolio?.stakedAmount}
                  value={`${portfolioData?.stakedAmount?.toLocaleString()} IZRA`}
                  subValue={`${((portfolioData?.stakedAmount / portfolioData?.totalHoldings) * 100)?.toFixed(1)}% of holdings`}
                  icon="Lock"
                  trend="neutral"
                  trendValue=""
                  variant="success"
                />
                <PortfolioCard
                  title={t?.portfolio?.availableRewards}
                  value={`${portfolioData?.availableRewards?.toLocaleString()} IZRA`}
                  subValue={`AED ${(portfolioData?.availableRewards * 3.5)?.toLocaleString()}`}
                  icon="Gift"
                  trend="up"
                  trendValue="+15%"
                  variant="accent"
                />
                <PortfolioCard
                  title={t?.portfolio?.shareholderStatus}
                  value={`${portfolioData?.shareholderPercentage}%`}
                  subValue="Platform ownership"
                  icon="TrendingUp"
                  trend="neutral"
                  trendValue=""
                  variant="default"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                <TokenMetricsChart
                  data={priceHistoryData}
                  type="area"
                  title="IZRA Token Price (AED)"
                  dataKey="value"
                  color="#0D7377"
                />
                <TokenMetricsChart
                  data={tvlData}
                  type="line"
                  title="Total Value Locked (IZRA)"
                  dataKey="value"
                  color="#14A085"
                />
              </div>

              <PlatformImpactCard metrics={platformMetrics} />
            </div>
          )}

          {activeTab === 'staking' && (
            <div className="space-y-6">
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 md:p-6">
                <div className="flex items-start gap-4">
                  <Icon name="Info" size={24} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
                      About Staking
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Stake your IZRA tokens to earn rewards and participate in platform revenue sharing. Choose from flexible or locked staking options based on your investment strategy. Longer lock periods offer higher APY rates.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                {stakingPools?.map((pool) => (
                  <StakingPoolCard
                    key={pool?.id}
                    pool={pool}
                    onStake={handleStake}
                    onUnstake={handleUnstake}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'rewards' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-card border border-border rounded-xl p-4 md:p-6">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-1">
                    Total Available Rewards
                  </h3>
                  <p className="text-2xl md:text-3xl font-semibold text-primary data-text">
                    {portfolioData?.availableRewards?.toLocaleString()} IZRA
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    AED {(portfolioData?.availableRewards * 3.5)?.toLocaleString()}
                  </p>
                </div>
                <Button
                  variant="default"
                  size="lg"
                  iconName="Download"
                  iconPosition="left"
                >
                  {t?.actions?.claimRewards}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {rewards?.map((reward) => (
                  <RewardCard
                    key={reward?.id}
                    reward={reward}
                    onClaim={handleClaimReward}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'metrics' && (
            <div className="space-y-6 md:space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                <TokenMetricsChart
                  data={priceHistoryData}
                  type="area"
                  title="Token Price History (AED)"
                  dataKey="value"
                  color="#0D7377"
                />
                <TokenMetricsChart
                  data={tradingVolumeData}
                  type="bar"
                  title="Weekly Trading Volume (IZRA)"
                  dataKey="value"
                  color="#14A085"
                />
              </div>

              <TokenMetricsChart
                data={tvlData}
                type="line"
                title="Total Value Locked Growth (IZRA)"
                dataKey="value"
                color="#FA7268"
              />

              <PlatformImpactCard metrics={platformMetrics} />
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="space-y-6">
              <TransactionHistoryTable transactions={transactions} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default InvestorDashboard;