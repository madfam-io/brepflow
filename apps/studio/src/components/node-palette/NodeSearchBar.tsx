import React, { useState, useRef, useEffect } from 'react';
import { NodeFilters, SortOption, ViewMode } from '../../hooks/useNodePalette';

interface NodeSearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filters: NodeFilters;
  onFiltersChange: (filters: NodeFilters) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  availableCategories: string[];
  availableTags: string[];
  resultCount: number;
  totalCount: number;
  isSearching?: boolean;
}

export function NodeSearchBar({
  searchTerm,
  onSearchChange,
  filters,
  onFiltersChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  availableCategories,
  availableTags,
  resultCount,
  totalCount,
  isSearching = false
}: NodeSearchBarProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setIsFilterOpen(false);
        setIsSortOpen(false);
        setIsViewOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClearSearch = () => {
    onSearchChange('');
    searchInputRef.current?.focus();
  };

  const handleFilterChange = (key: keyof NodeFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleCategoryFilter = (category: string) => {
    const categories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    handleFilterChange('categories', categories);
  };

  const toggleTagFilter = (tag: string) => {
    const tags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    handleFilterChange('tags', tags);
  };

  const hasActiveFilters = filters.categories.length > 0 ||
    filters.tags.length > 0 ||
    filters.complexity.length > 0 ||
    filters.showFavoritesOnly ||
    filters.showRecentOnly;

  return (
    <div className="node-search-bar">
      <div className="search-input-container">
        <div className="search-icon">
          {isSearching ? (
            <div className="search-spinner" />
          ) : (
            <span>🔍</span>
          )}
        </div>
        <input
          ref={searchInputRef}
          type="text"
          className="search-input"
          placeholder={`Search ${totalCount} nodes...`}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchTerm && (
          <button
            className="search-clear"
            onClick={handleClearSearch}
            title="Clear search"
          >
            ×
          </button>
        )}
      </div>

      <div className="search-controls">
        {/* Filter Dropdown */}
        <div className="dropdown-container">
          <button
            className={`control-button ${hasActiveFilters ? 'active' : ''}`}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            Filter {hasActiveFilters && <span className="filter-count">({
              filters.categories.length + filters.tags.length + filters.complexity.length
            })</span>}
            <span className="dropdown-arrow">▾</span>
          </button>

          {isFilterOpen && (
            <div className="dropdown-menu filter-dropdown">
              <div className="dropdown-section">
                <h4>Categories</h4>
                <div className="filter-options">
                  {availableCategories.slice(0, 8).map(category => (
                    <label key={category} className="filter-option">
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(category)}
                        onChange={() => toggleCategoryFilter(category)}
                      />
                      <span>{category}</span>
                    </label>
                  ))}
                  {availableCategories.length > 8 && (
                    <div className="more-filters">+{availableCategories.length - 8} more</div>
                  )}
                </div>
              </div>

              <div className="dropdown-section">
                <h4>Complexity</h4>
                <div className="filter-options">
                  {['beginner', 'intermediate', 'advanced'].map(level => (
                    <label key={level} className="filter-option">
                      <input
                        type="checkbox"
                        checked={filters.complexity.includes(level as any)}
                        onChange={(e) => {
                          const complexity = e.target.checked
                            ? [...filters.complexity, level as any]
                            : filters.complexity.filter(c => c !== level);
                          handleFilterChange('complexity', complexity);
                        }}
                      />
                      <span className="capitalize">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="dropdown-section">
                <h4>Tags</h4>
                <div className="filter-options">
                  {availableTags.slice(0, 10).map(tag => (
                    <label key={tag} className="filter-option">
                      <input
                        type="checkbox"
                        checked={filters.tags.includes(tag)}
                        onChange={() => toggleTagFilter(tag)}
                      />
                      <span>{tag}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="dropdown-section">
                <h4>Special</h4>
                <div className="filter-options">
                  <label className="filter-option">
                    <input
                      type="checkbox"
                      checked={filters.showFavoritesOnly}
                      onChange={(e) => handleFilterChange('showFavoritesOnly', e.target.checked)}
                    />
                    <span>⭐ Favorites only</span>
                  </label>
                  <label className="filter-option">
                    <input
                      type="checkbox"
                      checked={filters.showRecentOnly}
                      onChange={(e) => handleFilterChange('showRecentOnly', e.target.checked)}
                    />
                    <span>🕐 Recent only</span>
                  </label>
                </div>
              </div>

              {hasActiveFilters && (
                <div className="dropdown-actions">
                  <button
                    className="clear-filters-btn"
                    onClick={() => onFiltersChange({
                      categories: [],
                      tags: [],
                      complexity: [],
                      showFavoritesOnly: false,
                      showRecentOnly: false
                    })}
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="dropdown-container">
          <button
            className="control-button"
            onClick={() => setIsSortOpen(!isSortOpen)}
          >
            Sort: {sortBy === 'name' ? 'Name' :
                   sortBy === 'category' ? 'Category' :
                   sortBy === 'usage' ? 'Usage' :
                   sortBy === 'recent' ? 'Recent' : 'Relevance'}
            <span className="dropdown-arrow">▾</span>
          </button>

          {isSortOpen && (
            <div className="dropdown-menu sort-dropdown">
              {[
                { value: 'name', label: 'Name' },
                { value: 'category', label: 'Category' },
                { value: 'usage', label: 'Usage' },
                { value: 'recent', label: 'Recent' },
                { value: 'relevance', label: 'Relevance' }
              ].map(option => (
                <button
                  key={option.value}
                  className={`dropdown-option ${sortBy === option.value ? 'selected' : ''}`}
                  onClick={() => {
                    onSortChange(option.value as SortOption);
                    setIsSortOpen(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* View Mode Toggle */}
        <div className="dropdown-container">
          <button
            className="control-button"
            onClick={() => setIsViewOpen(!isViewOpen)}
          >
            View: {viewMode === 'grid' ? '⊞ Grid' :
                   viewMode === 'list' ? '☰ List' : '≡ Compact'}
            <span className="dropdown-arrow">▾</span>
          </button>

          {isViewOpen && (
            <div className="dropdown-menu view-dropdown">
              {[
                { value: 'grid', label: '⊞ Grid', desc: 'Visual cards' },
                { value: 'list', label: '☰ List', desc: 'Detailed rows' },
                { value: 'compact', label: '≡ Compact', desc: 'Dense layout' }
              ].map(option => (
                <button
                  key={option.value}
                  className={`dropdown-option ${viewMode === option.value ? 'selected' : ''}`}
                  onClick={() => {
                    onViewModeChange(option.value as ViewMode);
                    setIsViewOpen(false);
                  }}
                >
                  <div className="view-option">
                    <span>{option.label}</span>
                    <small>{option.desc}</small>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="search-status">
        <span className="result-count">
          {searchTerm || hasActiveFilters ? (
            <>Showing {resultCount} of {totalCount} nodes</>
          ) : (
            <>{totalCount} nodes available</>
          )}
        </span>
      </div>
    </div>
  );
}