import React, { useState, useMemo } from 'react';
import { useNodePalette } from '../../hooks/useNodePalette';
import { NodeSearchBar } from './NodeSearchBar';
import { CategoryTreeSidebar } from './CategoryTreeSidebar';
import { NodeCard, NodeListItem, NodeCompactItem } from './NodeCard';
import type { NodeDefinition } from '@brepflow/types';

interface EnhancedNodePaletteProps {
  onNodeDragStart: (event: React.DragEvent, nodeType: string) => void;
  enableAdvancedSearch?: boolean;
  enableCategoryTree?: boolean;
  defaultViewMode?: 'grid' | 'list' | 'compact';
  compact?: boolean;
  className?: string;
}

export function EnhancedNodePalette({
  onNodeDragStart,
  enableAdvancedSearch = true,
  enableCategoryTree = true,
  defaultViewMode = 'list',
  compact = false,
  className
}: EnhancedNodePaletteProps) {
  const {
    registry,
    categoryTree,
    allCategories,
    allTags,
    statistics,
    searchQuery,
    filters,
    sortBy,
    viewMode,
    selectedCategory,
    expandedCategories,
    filteredNodes,
    filteredCount,
    totalNodeCount,
    setSearchQuery,
    setFilters,
    setSortBy,
    setViewMode,
    setSelectedCategory,
    toggleCategoryExpansion,
    clearFilters
  } = useNodePalette({
    initialView: defaultViewMode,
    enableAdvancedFeatures: enableAdvancedSearch
  });

  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [favoriteNodes, setFavoriteNodes] = useState<Set<string>>(new Set());

  // Handle node selection and hover
  const handleNodeSelect = (nodeType: string) => {
    // For now, just show selection - could add node details panel later
    console.log('Node selected:', nodeType);
  };

  const handleNodeHover = (nodeType: string | null) => {
    setHoveredNode(nodeType);
  };

  const handleFavoriteToggle = (nodeType: string) => {
    setFavoriteNodes(prev => {
      const next = new Set(prev);
      if (next.has(nodeType)) {
        next.delete(nodeType);
      } else {
        next.add(nodeType);
      }
      return next;
    });
  };

  // Get node metadata for a node
  const getNodeMetadata = (node: NodeDefinition) => {
    return registry.getNodeMetadata(node.type);
  };

  // Render nodes based on view mode
  const renderNodes = () => {
    if (filteredNodes.length === 0) {
      return (
        <div className="no-nodes-found">
          <div className="no-nodes-icon">🔍</div>
          <div className="no-nodes-text">
            {searchQuery || Object.values(filters).some(f => Array.isArray(f) ? f.length > 0 : f) ? (
              <>
                <h4>No nodes found</h4>
                <p>Try adjusting your search or filters</p>
                <button className="clear-search-btn" onClick={clearFilters}>
                  Clear all filters
                </button>
              </>
            ) : (
              <>
                <h4>Loading nodes...</h4>
                <p>Enhanced node registry is initializing</p>
              </>
            )}
          </div>
        </div>
      );
    }

    switch (viewMode) {
      case 'grid':
        return (
          <div className={`node-grid ${compact ? 'compact' : ''}`}>
            {filteredNodes.map((node) => (
              <NodeCard
                key={node.type}
                node={node}
                metadata={getNodeMetadata(node)}
                isSelected={hoveredNode === node.type}
                isFavorite={favoriteNodes.has(node.type)}
                onSelect={() => handleNodeSelect(node.type)}
                onHover={() => handleNodeHover(node.type)}
                onHoverEnd={() => handleNodeHover(null)}
                onDragStart={onNodeDragStart}
                onFavoriteToggle={() => handleFavoriteToggle(node.type)}
                searchHighlight={searchQuery}
                compact={compact}
              />
            ))}
          </div>
        );

      case 'list':
        return (
          <div className="node-list">
            {filteredNodes.map((node) => (
              <NodeListItem
                key={node.type}
                node={node}
                metadata={getNodeMetadata(node)}
                isSelected={hoveredNode === node.type}
                isFavorite={favoriteNodes.has(node.type)}
                onSelect={() => handleNodeSelect(node.type)}
                onHover={() => handleNodeHover(node.type)}
                onHoverEnd={() => handleNodeHover(null)}
                onDragStart={onNodeDragStart}
                onFavoriteToggle={() => handleFavoriteToggle(node.type)}
                searchHighlight={searchQuery}
              />
            ))}
          </div>
        );

      case 'compact':
        return (
          <div className="node-compact-grid">
            {filteredNodes.map((node) => (
              <NodeCompactItem
                key={node.type}
                node={node}
                metadata={getNodeMetadata(node)}
                isSelected={hoveredNode === node.type}
                isFavorite={favoriteNodes.has(node.type)}
                onSelect={() => handleNodeSelect(node.type)}
                onDragStart={onNodeDragStart}
                onFavoriteToggle={() => handleFavoriteToggle(node.type)}
                searchHighlight={searchQuery}
              />
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const hasActiveFilters = searchQuery.trim() ||
    filters.categories.length > 0 ||
    filters.tags.length > 0 ||
    filters.complexity.length > 0 ||
    filters.showFavoritesOnly ||
    filters.showRecentOnly ||
    selectedCategory;

  return (
    <div className={`enhanced-node-palette ${compact ? 'compact' : ''} ${className || ''}`}>
      <div className="panel-header">
        <div className="panel-title-group">
          <h3 className="panel-title">
            {compact ? 'Nodes' : 'Enhanced Node Library'}
          </h3>
          <div className="panel-subtitle">
            {totalNodeCount} nodes across {allCategories.length} categories
          </div>
        </div>
      </div>

      {enableAdvancedSearch && (
        <NodeSearchBar
          searchTerm={searchQuery}
          onSearchChange={setSearchQuery}
          filters={filters}
          onFiltersChange={setFilters}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          availableCategories={allCategories}
          availableTags={allTags}
          resultCount={filteredCount}
          totalCount={totalNodeCount}
        />
      )}

      <div className="panel-content">
        <div className="content-layout">
          {enableCategoryTree && !compact && (
            <div className="category-sidebar">
              <CategoryTreeSidebar
                categoryTree={categoryTree}
                selectedCategory={selectedCategory}
                expandedCategories={expandedCategories}
                onCategorySelect={setSelectedCategory}
                onCategoryExpand={toggleCategoryExpansion}
                searchQuery={searchQuery}
                compact={compact}
              />
            </div>
          )}

          <div className="nodes-display">
            <div className="nodes-header">
              <div className="results-info">
                {hasActiveFilters ? (
                  <span className="filtered-results">
                    Showing {filteredCount} of {totalNodeCount} nodes
                    {selectedCategory && (
                      <span className="category-filter"> in {selectedCategory}</span>
                    )}
                  </span>
                ) : (
                  <span className="total-results">
                    {totalNodeCount} nodes available
                  </span>
                )}
              </div>

              {hasActiveFilters && (
                <button
                  className="clear-all-btn"
                  onClick={clearFilters}
                  title="Clear all search and filters"
                >
                  ✕ Clear All
                </button>
              )}
            </div>

            <div className="nodes-container">
              {renderNodes()}
            </div>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {filteredNodes.length === 0 && !hasActiveFilters && (
        <div className="loading-state">
          <div className="loading-spinner" />
          <p>Loading enhanced node library...</p>
        </div>
      )}

      {/* Statistics footer (when not compact) */}
      {!compact && (
        <div className="panel-footer">
          <div className="statistics">
            <div className="stat-item">
              <span className="stat-value">{statistics.totalNodes}</span>
              <span className="stat-label">Total Nodes</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{statistics.totalCategories}</span>
              <span className="stat-label">Categories</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{favoriteNodes.size}</span>
              <span className="stat-label">Favorites</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}