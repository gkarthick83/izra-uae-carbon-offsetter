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
    value: '245',
    subtitle: 'tCO₂ equivalent',
    trend: { direction: 'up', value: '+12%' },
    color: 'primary'
  },
  {
    icon: 'Leaf',
    title: 'CO₂ Offset Achieved',
    value: '245,000',
    subtitle: 'kg CO₂ neutralized',
    trend: { direction: 'up', value: '+8%' },
    color: 'success'
  },
  {
    icon: 'Image',
    title: 'Active NFT Holdings',
    value: '18',
    subtitle: 'Blockchain verified',
    color: 'accent'
  },
  {
    icon: 'Lock',
    title: 'Retired Credits',
    value: '5',
    subtitle: 'Permanently offset',
    color: 'secondary'
  }];


  const purchasedCredits = [
  {
    id: 'CC001',
    projectName: 'Abu Dhabi Mangrove Restoration',
    projectImage: "https://images.unsplash.com/photo-1566131976697-d334c1e3496a",
    projectImageAlt: 'Lush green mangrove forest with dense vegetation along coastal waterway in Abu Dhabi',
    location: 'Abu Dhabi, UAE',
    type: 'Mangrove',
    typeIcon: 'TreePine',
    tonnage: 50,
    purchaseDate: '15/11/2025',
    verification: 'Verra VCS',
    status: 'active',
    tokenId: 'NFT-CC001-2025',
    registryId: 'VCS-3421-2025',
    blockchain: 'Polygon',
    mintDate: '15/11/2025',
    owner: 'buyer@example.com',
    transferable: false,
    image: "https://images.unsplash.com/photo-1566131976697-d334c1e3496a",
    imageAlt: 'Lush green mangrove forest with dense vegetation along coastal waterway in Abu Dhabi',
    description: 'This carbon credit represents 50 tonnes of CO₂ offset through mangrove restoration in Abu Dhabi coastal zones.',
    blockchainUrl: 'https://polygonscan.com/tx/0x1234567890abcdef'
  },
  {
    id: 'CC002',
    projectName: 'Dubai Solar Farm Initiative',
    projectImage: "https://img.rocket.new/generatedImages/rocket_gen_img_18363b4a5-1766183617080.png",
    projectImageAlt: 'Modern solar panel array installation with blue photovoltaic cells under bright sunlight in Dubai desert',
    location: 'Dubai, UAE',
    type: 'Solar',
    typeIcon: 'Sun',
    tonnage: 75,
    purchaseDate: '08/11/2025',
    verification: 'Gold Standard',
    status: 'active',
    tokenId: 'NFT-CC002-2025',
    registryId: 'GS-5632-2025',
    blockchain: 'Polygon',
    mintDate: '08/11/2025',
    owner: 'buyer@example.com',
    transferable: false,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_18363b4a5-1766183617080.png",
    imageAlt: 'Modern solar panel array installation with blue photovoltaic cells under bright sunlight in Dubai desert',
    description: 'This carbon credit represents 75 tonnes of CO₂ offset through solar energy generation in Dubai.',
    blockchainUrl: 'https://polygonscan.com/tx/0xabcdef1234567890'
  },
  {
    id: 'CC003',
    projectName: 'Sharjah Coastal Afforestation',
    projectImage: "https://images.unsplash.com/photo-1507854143879-5749b3e3bd51",
    projectImageAlt: 'Young green trees planted in organized rows along sandy coastal area in Sharjah with ocean view',
    location: 'Sharjah, UAE',
    type: 'Afforestation',
    typeIcon: 'Trees',
    tonnage: 40,
    purchaseDate: '22/10/2025',
    verification: 'Verra VCS',
    status: 'active',
    tokenId: 'NFT-CC003-2025',
    registryId: 'VCS-7821-2025',
    blockchain: 'Polygon',
    mintDate: '22/10/2025',
    owner: 'buyer@example.com',
    transferable: false,
    image: "https://images.unsplash.com/photo-1507854143879-5749b3e3bd51",
    imageAlt: 'Young green trees planted in organized rows along sandy coastal area in Sharjah with ocean view',
    description: 'This carbon credit represents 40 tonnes of CO₂ offset through coastal afforestation in Sharjah.',
    blockchainUrl: 'https://polygonscan.com/tx/0x567890abcdef1234'
  },
  {
    id: 'CC004',
    projectName: 'Ras Al Khaimah Wind Energy',
    projectImage: "https://images.unsplash.com/photo-1686936388915-a763e19cd478",
    projectImageAlt: 'White wind turbines standing tall against clear blue sky in mountainous terrain of Ras Al Khaimah',
    location: 'Ras Al Khaimah, UAE',
    type: 'Wind',
    typeIcon: 'Wind',
    tonnage: 60,
    purchaseDate: '05/10/2025',
    verification: 'Gold Standard',
    status: 'active',
    tokenId: 'NFT-CC004-2025',
    registryId: 'GS-9234-2025',
    blockchain: 'Polygon',
    mintDate: '05/10/2025',
    owner: 'buyer@example.com',
    transferable: false,
    image: "https://images.unsplash.com/photo-1686936388915-a763e19cd478",
    imageAlt: 'White wind turbines standing tall against clear blue sky in mountainous terrain of Ras Al Khaimah',
    description: 'This carbon credit represents 60 tonnes of CO₂ offset through wind energy generation in Ras Al Khaimah.',
    blockchainUrl: 'https://polygonscan.com/tx/0xdef1234567890abc'
  },
  {
    id: 'CC005',
    projectName: 'Fujairah Mangrove Conservation',
    projectImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1faf92d57-1765333913332.png",
    projectImageAlt: 'Dense mangrove roots submerged in clear turquoise water along Fujairah coastline with tropical vegetation',
    location: 'Fujairah, UAE',
    type: 'Mangrove',
    typeIcon: 'TreePine',
    tonnage: 20,
    purchaseDate: '18/09/2025',
    verification: 'Verra VCS',
    status: 'retired',
    tokenId: 'NFT-CC005-2025',
    registryId: 'VCS-4567-2025',
    blockchain: 'Polygon',
    mintDate: '18/09/2025',
    owner: 'buyer@example.com',
    transferable: false,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1faf92d57-1765333913332.png",
    imageAlt: 'Dense mangrove roots submerged in clear turquoise water along Fujairah coastline with tropical vegetation',
    description: 'This carbon credit represents 20 tonnes of CO₂ offset through mangrove conservation in Fujairah. This credit has been permanently retired.',
    blockchainUrl: 'https://polygonscan.com/tx/0x234567890abcdef1'
  }];


  const transactionHistory = [
  {
    id: 'TXN001',
    projectName: 'Abu Dhabi Mangrove Restoration',
    date: '15/11/2025',
    tonnage: 50,
    amount: 'AED 18,500',
    paymentMethod: 'IZRA',
    discount: '10%'
  },
  {
    id: 'TXN002',
    projectName: 'Dubai Solar Farm Initiative',
    date: '08/11/2025',
    tonnage: 75,
    amount: 'AED 27,750',
    paymentMethod: 'AED',
    discount: null
  },
  {
    id: 'TXN003',
    projectName: 'Sharjah Coastal Afforestation',
    date: '22/10/2025',
    tonnage: 40,
    amount: 'USDT 4,320',
    paymentMethod: 'USDT',
    discount: null
  },
  {
    id: 'TXN004',
    projectName: 'Ras Al Khaimah Wind Energy',
    date: '05/10/2025',
    tonnage: 60,
    amount: 'AED 22,200',
    paymentMethod: 'IZRA',
    discount: '10%'
  }];


  const impactData = {
    byType: [
    { name: 'Mangrove', value: 70, percentage: 28.6 },
    { name: 'Solar', value: 75, percentage: 30.6 },
    { name: 'Afforestation', value: 40, percentage: 16.3 },
    { name: 'Wind', value: 60, percentage: 24.5 }],

    byLocation: [
    { name: 'Abu Dhabi', percentage: 35 },
    { name: 'Dubai', percentage: 30 },
    { name: 'Sharjah', percentage: 20 },
    { name: 'Other Emirates', percentage: 15 }]

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