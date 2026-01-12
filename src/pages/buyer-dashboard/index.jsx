import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticatedHeader from '../../components/ui/AuthenticatedHeader';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ImpactSummaryCard from './components/ImpactSummaryCard';
import CreditPortfolioTable from './components/CreditPortfolioTable';
import NFTDetailsModal from './components/NFTDetailsModal';
import TransactionHistoryCard from './components/TransactionHistoryCard';
import ImpactVisualization from './components/ImpactVisualization';
import FilterBar from './components/FilterBar';

const BuyerDashboard = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [filters, setFilters] = useState({
    projectType: 'all',
    status: 'all',
    sortBy: 'date-desc'
  });

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const isAuthenticated = true;
  const userRole = 'buyer';

  const summaryData = [
  {
    icon: 'ShoppingCart',
    title: 'Total Credits Purchased',
    value: '0',
    subtitle: 'tCO₂ equivalent',
    trend: null,
    color: 'primary'
  },
  {
    icon: 'Leaf',
    title: 'CO₂ Offset Achieved',
    value: '0',
    subtitle: 'kg CO₂ neutralized',
    trend: null,
    color: 'success'
  },
  {
    icon: 'Image',
    title: 'Active NFT Holdings',
    value: '0',
    subtitle: 'Blockchain verified',
    color: 'accent'
  },
  {
    icon: 'Lock',
    title: 'Retired Credits',
    value: '0',
    subtitle: 'Permanently offset',
    color: 'secondary'
  }];


  const purchasedCredits = [];


  const transactionHistory = [];


  const impactData = {
    byType: [],
    byLocation: []
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const handleViewNFT = (credit) => {
    setSelectedNFT(credit);
  };

  const handleViewReceipt = (transaction) => {
    console.log('Viewing receipt for:', transaction);
    alert(`Receipt for ${transaction?.projectName || transaction?.id} will be downloaded.`);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      projectType: 'all',
      status: 'all',
      sortBy: 'date-desc'
    });
  };

  const filteredCredits = purchasedCredits?.filter((credit) => {
    if (filters?.projectType !== 'all' && credit?.type?.toLowerCase() !== filters?.projectType) {
      return false;
    }
    if (filters?.status !== 'all' && credit?.status !== filters?.status) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader
        isAuthenticated={isAuthenticated}
        userRole={userRole}
        onLogout={handleLogout} />

      <main className="main-content">
        <div className="container-safe py-6 md:py-8 lg:py-12">
          {/* Page Header */}
          <div className="mb-6 md:mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-2">
                  {currentLanguage === 'ar' ? 'لوحة تحكم المشتري' : 'Buyer Dashboard'}
                </h1>
                <p className="text-sm md:text-base text-muted-foreground">
                  {currentLanguage === 'ar' ? 'تتبع أرصدة الكربون الخاصة بك وأصول NFT والأثر البيئي' : 'Track your carbon credits, NFT assets, and environmental impact'}
                </p>
              </div>
              <Button
                variant="default"
                size="lg"
                iconName="ShoppingCart"
                iconPosition="left"
                onClick={() => navigate('/carbon-credit-marketplace')}>

                {currentLanguage === 'ar' ? 'تصفح السوق' : 'Browse Marketplace'}
              </Button>
            </div>
          </div>

          {/* Impact Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            {summaryData?.map((card, index) =>
            <ImpactSummaryCard key={index} {...card} />
            )}
          </div>

          {/* Filter Bar */}
          <div className="mb-6 md:mb-8">
            <FilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters} />

          </div>

          {/* Portfolio Section */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Briefcase" size={24} className="text-primary" />
              <h2 className="text-xl md:text-2xl font-semibold text-foreground">
                {currentLanguage === 'ar' ? 'محفظة الأرصدة' : 'Credit Portfolio'}
              </h2>
            </div>
            <CreditPortfolioTable
              credits={filteredCredits}
              onViewNFT={handleViewNFT}
              onViewReceipt={handleViewReceipt} />

          </div>

          {/* Impact Visualization */}
          <div className="mb-6 md:mb-8">
            <ImpactVisualization impactData={impactData} />
          </div>

          {/* Transaction History */}
          <div className="mb-6 md:mb-8">
            <TransactionHistoryCard
              transactions={transactionHistory}
              onViewReceipt={handleViewReceipt} />

          </div>

          {/* Environmental Impact Statement */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                <Icon name="Award" size={32} className="text-success" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                  {currentLanguage === 'ar' ? 'تأثيرك البيئي' : 'Your Environmental Impact'}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground mb-4">
                  {currentLanguage === 'ar' ? 'لقد قمت بتعويض 245,000 كجم من انبعاثات ثاني أكسيد الكربون من خلال 18 مشروعًا معتمدًا. وهذا يعادل زراعة 11,000 شجرة أو إزالة 53 سيارة من الطريق لمدة عام.' : 'You have offset 245,000 kg of CO₂ emissions through 18 verified projects. This is equivalent to planting 11,000 trees or removing 53 cars from the road for a year.'}
                </p>
                <Button
                  variant="outline"
                  size="default"
                  iconName="Share2"
                  iconPosition="left">

                  {currentLanguage === 'ar' ? 'شارك تأثيرك' : 'Share Your Impact'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* NFT Details Modal */}
      {selectedNFT &&
      <NFTDetailsModal nft={selectedNFT} onClose={() => setSelectedNFT(null)} />
      }
    </div>);

};

export default BuyerDashboard;