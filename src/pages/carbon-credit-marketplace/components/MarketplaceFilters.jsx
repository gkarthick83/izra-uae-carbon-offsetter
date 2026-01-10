import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const MarketplaceFilters = ({ onFilterChange, onReset, activeFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    projectType: activeFilters?.projectType || '',
    location: activeFilters?.location || '',
    verificationStandard: activeFilters?.verificationStandard || '',
    minPrice: activeFilters?.minPrice || '',
    maxPrice: activeFilters?.maxPrice || '',
    sortBy: activeFilters?.sortBy || 'relevance'
  });

  const projectTypeOptions = [
    { value: '', label: 'All Project Types' },
    { value: 'mangrove', label: 'Mangrove Restoration' },
    { value: 'solar', label: 'Solar Energy' },
    { value: 'afforestation', label: 'Afforestation' }
  ];

  const locationOptions = [
    { value: '', label: 'All Locations' },
    { value: 'uae', label: 'UAE Projects', description: 'Local carbon offset projects' },
    { value: 'abu-dhabi', label: 'Abu Dhabi' },
    { value: 'dubai', label: 'Dubai' },
    { value: 'sharjah', label: 'Sharjah' },
    { value: 'ajman', label: 'Ajman' },
    { value: 'umm-al-quwain', label: 'Umm Al Quwain' },
    { value: 'ras-al-khaimah', label: 'Ras Al Khaimah' },
    { value: 'fujairah', label: 'Fujairah' },
    { value: 'international', label: 'International Projects', description: 'Global carbon offset projects' }
  ];

  const verificationOptions = [
    { value: '', label: 'All Standards' },
    { value: 'verra', label: 'Verra (VCS)' },
    { value: 'gold-standard', label: 'Gold Standard' },
    { value: 'climate-action', label: 'Climate Action Reserve' }
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'tonnage-high', label: 'Tonnage: High to Low' },
    { value: 'verification-date', label: 'Recently Verified' }
  ];

  const handleFilterChange = (field, value) => {
    const updatedFilters = { ...filters, [field]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      projectType: '',
      location: '',
      verificationStandard: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'relevance'
    };
    setFilters(resetFilters);
    onReset();
  };

  const activeFilterCount = Object.values(filters)?.filter(v => v && v !== 'relevance')?.length;

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block bg-card rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Icon name="Filter" size={20} className="text-primary" />
            Filter Credits
          </h3>
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              iconPosition="left"
              onClick={handleReset}
            >
              Clear All ({activeFilterCount})
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Select
            label="Project Type"
            options={projectTypeOptions}
            value={filters?.projectType}
            onChange={(value) => handleFilterChange('projectType', value)}
            placeholder="Select type"
          />

          <Select
            label="Location"
            options={locationOptions}
            value={filters?.location}
            onChange={(value) => handleFilterChange('location', value)}
            placeholder="Select location"
            searchable
          />

          <Select
            label="Verification"
            options={verificationOptions}
            value={filters?.verificationStandard}
            onChange={(value) => handleFilterChange('verificationStandard', value)}
            placeholder="Select standard"
          />

          <Input
            label="Min Price (AED)"
            type="number"
            placeholder="0"
            value={filters?.minPrice}
            onChange={(e) => handleFilterChange('minPrice', e?.target?.value)}
            min="0"
          />

          <Input
            label="Max Price (AED)"
            type="number"
            placeholder="1000"
            value={filters?.maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', e?.target?.value)}
            min="0"
          />
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <Select
            label="Sort By"
            options={sortOptions}
            value={filters?.sortBy}
            onChange={(value) => handleFilterChange('sortBy', value)}
          />
        </div>
      </div>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          fullWidth
          iconName="Filter"
          iconPosition="left"
          onClick={() => setIsOpen(true)}
        >
          Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </Button>
      </div>
      {/* Mobile Filter Panel */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[200]"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-x-0 bottom-0 z-[201] bg-card rounded-t-2xl shadow-xl max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Filters</h3>
              <Button
                variant="ghost"
                size="icon"
                iconName="X"
                onClick={() => setIsOpen(false)}
              />
            </div>

            <div className="p-4 space-y-4">
              <Select
                label="Project Type"
                options={projectTypeOptions}
                value={filters?.projectType}
                onChange={(value) => handleFilterChange('projectType', value)}
              />

              <Select
                label="Location"
                options={locationOptions}
                value={filters?.location}
                onChange={(value) => handleFilterChange('location', value)}
                searchable
              />

              <Select
                label="Verification"
                options={verificationOptions}
                value={filters?.verificationStandard}
                onChange={(value) => handleFilterChange('verificationStandard', value)}
              />

              <Input
                label="Min Price (AED)"
                type="number"
                placeholder="0"
                value={filters?.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e?.target?.value)}
              />

              <Input
                label="Max Price (AED)"
                type="number"
                placeholder="1000"
                value={filters?.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e?.target?.value)}
              />

              <Select
                label="Sort By"
                options={sortOptions}
                value={filters?.sortBy}
                onChange={(value) => handleFilterChange('sortBy', value)}
              />

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={handleReset}
                >
                  Reset
                </Button>
                <Button
                  variant="default"
                  fullWidth
                  onClick={() => setIsOpen(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MarketplaceFilters;