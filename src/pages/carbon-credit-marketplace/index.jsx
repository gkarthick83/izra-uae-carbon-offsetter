import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticatedHeader from '../../components/ui/AuthenticatedHeader';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MarketplaceFilters from './components/MarketplaceFilters';
import CreditCard from './components/CreditCard';
import PurchaseModal from './components/PurchaseModal';
import SearchBar from './components/SearchBar';
import EmptyState from './components/EmptyState';

const CarbonCreditMarketplace = () => {
  const navigate = useNavigate();
  const [isAuthenticated] = useState(false);
  const [selectedCredit, setSelectedCredit] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    projectType: '',
    location: '',
    verificationStandard: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'relevance'
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const mockCredits = [
  {
    id: 'CC001',
    projectName: 'Abu Dhabi Mangrove Restoration Initiative',
    projectImage: "https://images.unsplash.com/photo-1594336422995-76c2f7aff7f0",
    projectImageAlt: 'Aerial view of lush green mangrove forest with winding waterways in Abu Dhabi coastal area during golden hour',
    projectType: 'mangrove',
    location: 'Abu Dhabi, UAE',
    isUAE: true,
    availableTonnage: 5000,
    pricePerTonne: 85,
    currency: 'AED',
    verificationStandard: 'Verra (VCS)',
    registryId: 'VCS-2024-AUH-001',
    verificationDate: '2024-11-15',
    description: 'Large-scale mangrove restoration project along Abu Dhabi coastline, protecting marine biodiversity and sequestering carbon through native species planting and ecosystem rehabilitation.'
  },
  {
    id: 'CC002',
    projectName: 'Dubai Solar Farm Carbon Offset Program',
    projectImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1e437e970-1765125660235.png",
    projectImageAlt: 'Vast solar panel array installation in Dubai desert with modern city skyline visible in background under clear blue sky',
    projectType: 'solar',
    location: 'Dubai, UAE',
    isUAE: true,
    availableTonnage: 8500,
    pricePerTonne: 72,
    currency: 'AED',
    verificationStandard: 'Gold Standard',
    registryId: 'GS-2024-DXB-003',
    verificationDate: '2024-10-28',
    description: 'Renewable energy project generating clean electricity through solar photovoltaic technology, reducing fossil fuel dependency and offsetting carbon emissions in Dubai region.'
  },
  {
    id: 'CC003',
    projectName: 'Sharjah Coastal Afforestation Project',
    projectImage: "https://images.unsplash.com/photo-1728352874964-37c22ff467bb",
    projectImageAlt: 'Dense green forest with tall trees and undergrowth in Sharjah coastal region with sunlight filtering through canopy',
    projectType: 'afforestation',
    location: 'Sharjah, UAE',
    isUAE: true,
    availableTonnage: 3200,
    pricePerTonne: 68,
    currency: 'AED',
    verificationStandard: 'Verra (VCS)',
    registryId: 'VCS-2024-SHJ-002',
    verificationDate: '2024-12-05',
    description: 'Coastal afforestation initiative planting native tree species to combat desertification, enhance biodiversity, and create carbon sinks in Sharjah emirate.'
  },
  {
    id: 'CC004',
    projectName: 'Amazon Rainforest Conservation Alliance',
    projectImage: "https://images.unsplash.com/photo-1561389745-97596a161957",
    projectImageAlt: 'Dense Amazon rainforest canopy with vibrant green vegetation and mist rising from tropical forest floor at dawn',
    projectType: 'afforestation',
    location: 'Brazil',
    isUAE: false,
    availableTonnage: 12000,
    pricePerTonne: 55,
    currency: 'USD',
    verificationStandard: 'Verra (VCS)',
    registryId: 'VCS-2024-BRA-045',
    verificationDate: '2024-09-20',
    description: 'International rainforest conservation project protecting existing forest ecosystems and preventing deforestation in Brazilian Amazon region through community partnerships.'
  },
  {
    id: 'CC005',
    projectName: 'Ras Al Khaimah Mangrove Nursery',
    projectImage: "https://img.rocket.new/generatedImages/rocket_gen_img_19c5e35eb-1765270103802.png",
    projectImageAlt: 'Young mangrove seedlings growing in nursery with coastal waters and mountains of Ras Al Khaimah in background',
    projectType: 'mangrove',
    location: 'Ras Al Khaimah, UAE',
    isUAE: true,
    availableTonnage: 2800,
    pricePerTonne: 78,
    currency: 'AED',
    verificationStandard: 'Climate Action Reserve',
    registryId: 'CAR-2024-RAK-001',
    verificationDate: '2024-11-30',
    description: 'Mangrove nursery and restoration project establishing new coastal ecosystems in Ras Al Khaimah, supporting marine life and carbon sequestration.'
  },
  {
    id: 'CC006',
    projectName: 'Kenya Wind Energy Carbon Credits',
    projectImage: "https://images.unsplash.com/photo-1694551073674-f8809f1685f4",
    projectImageAlt: 'Modern wind turbines standing tall against orange sunset sky in Kenyan landscape with rolling hills',
    projectType: 'solar',
    location: 'Kenya',
    isUAE: false,
    availableTonnage: 6500,
    pricePerTonne: 48,
    currency: 'USD',
    verificationStandard: 'Gold Standard',
    registryId: 'GS-2024-KEN-012',
    verificationDate: '2024-10-15',
    description: 'Wind energy project generating renewable electricity in Kenya, displacing fossil fuel power generation and providing clean energy to local communities.'
  },
  {
    id: 'CC007',
    projectName: 'Fujairah Mountain Reforestation',
    projectImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1e60a098e-1765893427294.png",
    projectImageAlt: 'Mountain slopes in Fujairah with newly planted trees and terraced landscape restoration work visible',
    projectType: 'afforestation',
    location: 'Fujairah, UAE',
    isUAE: true,
    availableTonnage: 1500,
    pricePerTonne: 82,
    currency: 'AED',
    verificationStandard: 'Verra (VCS)',
    registryId: 'VCS-2024-FUJ-001',
    verificationDate: '2024-12-10',
    description: 'Mountain reforestation project in Fujairah emirate planting drought-resistant native species to prevent soil erosion and sequester atmospheric carbon.'
  },
  {
    id: 'CC008',
    projectName: 'Indonesia Peatland Restoration',
    projectImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1899a7a21-1765001145505.png",
    projectImageAlt: 'Restored peatland ecosystem in Indonesia with water channels and regenerating vegetation under tropical sky',
    projectType: 'mangrove',
    location: 'Indonesia',
    isUAE: false,
    availableTonnage: 9200,
    pricePerTonne: 52,
    currency: 'USD',
    verificationStandard: 'Verra (VCS)',
    registryId: 'VCS-2024-IDN-078',
    verificationDate: '2024-08-25',
    description: 'Peatland restoration and conservation project in Indonesia preventing carbon emissions from degraded peatlands and restoring critical wetland ecosystems.'
  }];


  const filterCredits = (credits) => {
    let filtered = [...credits];

    if (searchQuery) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter((credit) =>
      credit?.projectName?.toLowerCase()?.includes(query) ||
      credit?.registryId?.toLowerCase()?.includes(query) ||
      credit?.location?.toLowerCase()?.includes(query)
      );
    }

    if (filters?.projectType) {
      filtered = filtered?.filter((credit) => credit?.projectType === filters?.projectType);
    }

    if (filters?.location) {
      if (filters?.location === 'uae') {
        filtered = filtered?.filter((credit) => credit?.isUAE);
      } else if (filters?.location === 'international') {
        filtered = filtered?.filter((credit) => !credit?.isUAE);
      } else {
        filtered = filtered?.filter((credit) =>
        credit?.location?.toLowerCase()?.includes(filters?.location?.toLowerCase())
        );
      }
    }

    if (filters?.verificationStandard) {
      filtered = filtered?.filter((credit) =>
      credit?.verificationStandard?.toLowerCase()?.includes(filters?.verificationStandard?.toLowerCase())
      );
    }

    if (filters?.minPrice) {
      filtered = filtered?.filter((credit) => credit?.pricePerTonne >= parseFloat(filters?.minPrice));
    }

    if (filters?.maxPrice) {
      filtered = filtered?.filter((credit) => credit?.pricePerTonne <= parseFloat(filters?.maxPrice));
    }

    switch (filters?.sortBy) {
      case 'price-low':
        filtered?.sort((a, b) => a?.pricePerTonne - b?.pricePerTonne);
        break;
      case 'price-high':
        filtered?.sort((a, b) => b?.pricePerTonne - a?.pricePerTonne);
        break;
      case 'tonnage-high':
        filtered?.sort((a, b) => b?.availableTonnage - a?.availableTonnage);
        break;
      case 'verification-date':
        filtered?.sort((a, b) => new Date(b.verificationDate) - new Date(a.verificationDate));
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredCredits = filterCredits(mockCredits);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      projectType: '',
      location: '',
      verificationStandard: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'relevance'
    });
    setSearchQuery('');
  };

  const handlePurchase = (credit) => {
    setSelectedCredit(credit);
  };

  const handleConfirmPurchase = (purchaseData) => {
    console.log('Purchase confirmed:', purchaseData);
    setSelectedCredit(null);

    setTimeout(() => {
      alert(`Purchase successful!\n\nYou have purchased ${purchaseData?.quantity} tonnes of carbon credits.\nTotal: ${purchaseData?.total?.toFixed(2)}\n\nYour NFT certificate will be minted and sent to your dashboard shortly.`);
    }, 300);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout} />

      <main className="main-content">
        <div className="container-safe py-8 md:py-12">
          {/* Hero Section */}
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-4">
              <Icon name="Leaf" size={20} />
              <span className="text-sm font-medium">Verified Carbon Credits</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Carbon Credit Marketplace
            </h1>
            
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              Purchase verified carbon credits from UAE and international projects. All credits are blockchain-verified and minted as NFTs for transparency.
            </p>
          </div>

          {/* Search Bar */}
          <SearchBar onSearch={setSearchQuery} />

          {/* Filters */}
          <MarketplaceFilters
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
            activeFilters={filters} />


          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm md:text-base text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredCredits?.length}</span> carbon credit{filteredCredits?.length !== 1 ? 's' : ''}
            </p>
            
            {!isAuthenticated &&
            <Button
              variant="outline"
              size="sm"
              iconName="LogIn"
              iconPosition="left"
              onClick={() => navigate('/login')}
              className="hidden md:flex">

                Login to Purchase
              </Button>
            }
          </div>

          {/* Credits Grid */}
          {filteredCredits?.length > 0 ?
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredCredits?.map((credit) =>
            <CreditCard
              key={credit?.id}
              credit={credit}
              onPurchase={handlePurchase} />

            )}
            </div> :

          <EmptyState onReset={handleResetFilters} />
          }

          {/* Info Banner */}
          <div className="mt-12 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                <Icon name="Shield" size={32} className="text-primary" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
                  Blockchain-Verified Transparency
                </h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Every carbon credit purchase is recorded on our blockchain ESG layer and minted as an NFT certificate. Track your environmental impact with complete transparency and verification.
                </p>
              </div>
              
              <Button
                variant="default"
                iconName="ExternalLink"
                iconPosition="right"
                onClick={() => navigate('/landing-page')}
                className="w-full md:w-auto">

                Learn More
              </Button>
            </div>
          </div>
        </div>
      </main>
      {/* Purchase Modal */}
      {selectedCredit &&
      <PurchaseModal
        credit={selectedCredit}
        onClose={() => setSelectedCredit(null)}
        onConfirm={handleConfirmPurchase} />

      }
    </div>);

};

export default CarbonCreditMarketplace;