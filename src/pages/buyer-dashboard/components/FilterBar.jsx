import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const FilterBar = ({ filters, onFilterChange, onReset }) => {
  const projectTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'mangrove', label: 'Mangrove Restoration' },
    { value: 'solar', label: 'Solar Energy' },
    { value: 'afforestation', label: 'Afforestation' },
    { value: 'wind', label: 'Wind Energy' },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'retired', label: 'Retired' },
    { value: 'pending', label: 'Pending' },
  ];

  const sortOptions = [
    { value: 'date-desc', label: 'Newest First' },
    { value: 'date-asc', label: 'Oldest First' },
    { value: 'tonnage-desc', label: 'Highest Tonnage' },
    { value: 'tonnage-asc', label: 'Lowest Tonnage' },
  ];

  return (
    <div className="bg-card rounded-xl shadow-md p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Select
          label="Project Type"
          options={projectTypeOptions}
          value={filters?.projectType}
          onChange={(value) => onFilterChange('projectType', value)}
        />
        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
        />
        <Select
          label="Sort By"
          options={sortOptions}
          value={filters?.sortBy}
          onChange={(value) => onFilterChange('sortBy', value)}
        />
        <div className="flex items-end">
          <Button
            variant="outline"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={onReset}
            fullWidth
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;