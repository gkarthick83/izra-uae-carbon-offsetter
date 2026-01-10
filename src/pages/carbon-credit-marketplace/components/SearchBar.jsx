import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e?.preventDefault();
    onSearch(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSearch} className="mb-6">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Input
            type="search"
            placeholder="Search by project name or registry ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="pr-10"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
            >
              <Icon name="X" size={18} />
            </button>
          )}
        </div>
        <Button
          type="submit"
          variant="default"
          iconName="Search"
          iconPosition="left"
          className="hidden md:flex"
        >
          Search
        </Button>
        <Button
          type="submit"
          variant="default"
          size="icon"
          iconName="Search"
          className="md:hidden"
        />
      </div>
    </form>
  );
};

export default SearchBar;