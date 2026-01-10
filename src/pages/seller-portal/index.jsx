import React, { useState, useEffect } from 'react';
import AuthenticatedHeader from '../../components/ui/AuthenticatedHeader';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import KYCStatusCard from './components/KYCStatusCard';
import SubscriptionCard from './components/SubscriptionCard';
import ProjectSummaryCard from './components/ProjectSummaryCard';
import RevenueChart from './components/RevenueChart';
import ProjectRegistrationForm from './components/ProjectRegistrationForm';
import CreditManagementTable from './components/CreditManagementTable';
import TransactionHistory from './components/TransactionHistory';
import KYCWorkflow from './components/KYCWorkflow';

const SellerPortal = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeView, setActiveView] = useState('dashboard');
  const [isAuthenticated] = useState(true);
  const [userRole] = useState('seller');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleLogout = () => {
    window.location.href = '/login';
  };

  const mockSellerData = {
    kycStatus: 'approved',
    subscription: {
      plan: 'Professional',
      status: 'active',
      expiryDate: '2025-12-22',
      annualFee: 5000
    },
    projects: [
    {
      id: 1,
      name: 'Abu Dhabi Mangrove Restoration',
      type: 'mangrove',
      location: 'UAE',
      region: 'Abu Dhabi Eastern Mangroves',
      status: 'active',
      image: "https://images.unsplash.com/photo-1644372365212-f0b7a16d3491",
      imageAlt: 'Lush green mangrove forest with dense vegetation along coastal waterway in Abu Dhabi with clear blue sky',
      availableCredits: 15000,
      totalRevenue: 450000
    },
    {
      id: 2,
      name: 'Dubai Solar Farm Initiative',
      type: 'solar',
      location: 'UAE',
      region: 'Dubai Desert Conservation Reserve',
      status: 'active',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_18363b4a5-1766183617080.png",
      imageAlt: 'Large-scale solar panel array installation in desert landscape with rows of photovoltaic panels under bright sunlight',
      availableCredits: 8500,
      totalRevenue: 255000
    },
    {
      id: 3,
      name: 'Ras Al Khaimah Afforestation',
      type: 'afforestation',
      location: 'UAE',
      region: 'Ras Al Khaimah Mountain Region',
      status: 'pending',
      image: "https://images.unsplash.com/photo-1624904356416-0f0acf5d1e89",
      imageAlt: 'Dense forest canopy with tall trees creating natural green corridor viewed from ground looking upward',
      availableCredits: 12000,
      totalRevenue: 0
    }],

    credits: [
    {
      id: 1,
      projectName: 'Abu Dhabi Mangrove Restoration',
      location: 'Abu Dhabi, UAE',
      available: 15000,
      priceAED: 30,
      nftStatus: 'converted'
    },
    {
      id: 2,
      projectName: 'Dubai Solar Farm Initiative',
      location: 'Dubai, UAE',
      available: 8500,
      priceAED: 30,
      nftStatus: 'converted'
    },
    {
      id: 3,
      projectName: 'Ras Al Khaimah Afforestation',
      location: 'Ras Al Khaimah, UAE',
      available: 12000,
      priceAED: 25,
      nftStatus: 'pending'
    }],

    revenueData: [
    { month: 'Jan', revenue: 45000, fees: 900 },
    { month: 'Feb', revenue: 52000, fees: 1040 },
    { month: 'Mar', revenue: 48000, fees: 960 },
    { month: 'Apr', revenue: 61000, fees: 1220 },
    { month: 'May', revenue: 55000, fees: 1100 },
    { month: 'Jun', revenue: 68000, fees: 1360 }],

    transactions: [
    {
      id: 1,
      type: 'sale',
      description: 'Carbon Credit Sale - Abu Dhabi Mangrove',
      amount: 15000,
      credits: 500,
      buyer: 'Emirates Environmental Group',
      date: '2025-12-20T14:30:00'
    },
    {
      id: 2,
      type: 'fee',
      description: 'Platform Service Fee (2%)',
      amount: 300,
      date: '2025-12-20T14:30:00'
    },
    {
      id: 3,
      type: 'sale',
      description: 'Carbon Credit Sale - Dubai Solar Farm',
      amount: 9000,
      credits: 300,
      buyer: 'Dubai Sustainability Initiative',
      date: '2025-12-18T10:15:00'
    },
    {
      id: 4,
      type: 'fee',
      description: 'Platform Service Fee (2%)',
      amount: 180,
      date: '2025-12-18T10:15:00'
    },
    {
      id: 5,
      type: 'payout',
      description: 'Monthly Payout to Bank Account',
      amount: 23520,
      date: '2025-12-15T09:00:00'
    }]

  };

  const handleStartKYC = () => {
    setActiveView('kyc');
  };

  const handleKYCComplete = (data) => {
    console.log('KYC submitted:', data);
    setActiveView('dashboard');
  };

  const handleRegisterProject = () => {
    setActiveView('register-project');
  };

  const handleProjectSubmit = (data) => {
    console.log('Project submitted:', data);
    setActiveView('dashboard');
  };

  const handleManageCredits = () => {
    setActiveView('manage-credits');
  };

  const handleViewTransactions = () => {
    setActiveView('transactions');
  };

  const handleRenewSubscription = () => {
    console.log('Renew subscription');
  };

  const handleUpgradeSubscription = () => {
    console.log('Upgrade subscription');
  };

  const renderDashboardView = () =>
  <div className="space-y-6 md:space-y-8">
      <KYCStatusCard
      kycStatus={mockSellerData?.kycStatus}
      onStartKYC={handleStartKYC}
      onViewDetails={handleStartKYC} />


      <SubscriptionCard
      subscription={mockSellerData?.subscription}
      onRenew={handleRenewSubscription}
      onUpgrade={handleUpgradeSubscription} />


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-card rounded-xl p-4 md:p-6 shadow-md">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="Package" size={20} className="text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">Active Projects</p>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-foreground">
            {mockSellerData?.projects?.filter((p) => p?.status === 'active')?.length}
          </p>
        </div>

        <div className="bg-card rounded-xl p-4 md:p-6 shadow-md">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Icon name="Leaf" size={20} className="text-success" />
            </div>
            <p className="text-sm text-muted-foreground">Available Credits</p>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-foreground">
            {mockSellerData?.credits?.reduce((sum, c) => sum + c?.available, 0)?.toLocaleString()}
          </p>
        </div>

        <div className="bg-card rounded-xl p-4 md:p-6 shadow-md">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Icon name="TrendingUp" size={20} className="text-warning" />
            </div>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-foreground">
            AED {mockSellerData?.projects?.reduce((sum, p) => sum + p?.totalRevenue, 0)?.toLocaleString()}
          </p>
        </div>

        <div className="bg-card rounded-xl p-4 md:p-6 shadow-md">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Icon name="Coins" size={20} className="text-secondary" />
            </div>
            <p className="text-sm text-muted-foreground">NFT Credits</p>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-foreground">
            {mockSellerData?.credits?.filter((c) => c?.nftStatus === 'converted')?.length}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
        variant="default"
        size="lg"
        onClick={handleRegisterProject}
        iconName="Plus"
        iconPosition="left"
        fullWidth>

          Register New Project
        </Button>
        <Button
        variant="outline"
        size="lg"
        onClick={handleManageCredits}
        iconName="Settings"
        iconPosition="left"
        fullWidth>

          Manage Credits
        </Button>
        <Button
        variant="outline"
        size="lg"
        onClick={handleViewTransactions}
        iconName="Receipt"
        iconPosition="left"
        fullWidth>

          View Transactions
        </Button>
      </div>

      <div>
        <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4 md:mb-6">
          Active Projects
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {mockSellerData?.projects?.map((project) =>
        <ProjectSummaryCard
          key={project?.id}
          project={project}
          onViewDetails={(id) => console.log('View project:', id)}
          onManageCredits={(id) => console.log('Manage credits:', id)} />

        )}
        </div>
      </div>

      <RevenueChart data={mockSellerData?.revenueData} />
    </div>;


  const renderContent = () => {
    switch (activeView) {
      case 'kyc':
        return (
          <KYCWorkflow
            onComplete={handleKYCComplete}
            onCancel={() => setActiveView('dashboard')} />);


      case 'register-project':
        return (
          <ProjectRegistrationForm
            onSubmit={handleProjectSubmit}
            onCancel={() => setActiveView('dashboard')} />);


      case 'manage-credits':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                Credit Management
              </h2>
              <Button
                variant="outline"
                size="default"
                onClick={() => setActiveView('dashboard')}
                iconName="ArrowLeft"
                iconPosition="left">

                Back to Dashboard
              </Button>
            </div>
            <CreditManagementTable
              credits={mockSellerData?.credits}
              onEditPrice={(id) => console.log('Edit price:', id)}
              onConvertToNFT={(id) => console.log('Convert to NFT:', id)}
              onViewDetails={(id) => console.log('View details:', id)} />

          </div>);

      case 'transactions':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                Transaction History
              </h2>
              <Button
                variant="outline"
                size="default"
                onClick={() => setActiveView('dashboard')}
                iconName="ArrowLeft"
                iconPosition="left">

                Back to Dashboard
              </Button>
            </div>
            <TransactionHistory transactions={mockSellerData?.transactions} />
          </div>);

      default:
        return renderDashboardView();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader
        isAuthenticated={isAuthenticated}
        userRole={userRole}
        onLogout={handleLogout} />


      <main className="main-content">
        <div className="container-safe py-6 md:py-8 lg:py-12">
          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
              Seller Portal
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Manage your carbon credit projects and marketplace presence
            </p>
          </div>

          {renderContent()}
        </div>
      </main>
    </div>);

};

export default SellerPortal;