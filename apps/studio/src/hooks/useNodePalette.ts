import { useState, useMemo } from 'react';
import { useResilientNodeDiscovery } from './useResilientNodeDiscovery';

export interface NodeFilters {
  categories: string[];
  tags: string[];
  complexity: ('beginner' | 'intermediate' | 'advanced')[];
  showFavoritesOnly: boolean;
  showRecentOnly: boolean;
}

export type SortOption = 'name' | 'category' | 'recent' | 'popularity';
export type ViewMode = 'grid' | 'list' | 'compact';

export interface UseNodePaletteOptions {
  initialFilters?: Partial<NodeFilters>;
  initialSort?: SortOption;
  initialView?: ViewMode;
  enableAdvancedFeatures?: boolean;
}

export function useNodePalette({
  initialFilters = {},
  initialSort = 'name',
  initialView = 'list',
  enableAdvancedFeatures = true
}: UseNodePaletteOptions = {}) {
  // Use the resilient node discovery system
  const {
    nodes: discoveredNodes,
    categoryTree,
    searchNodes,
    discoveryStatus,
    errors,
    isReady,
    nodeCount
  } = useResilientNodeDiscovery();

  // Local state for palette UI
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<NodeFilters>({
    categories: [],
    tags: [],
    complexity: [],
    showFavoritesOnly: false,
    showRecentOnly: false,
    ...initialFilters
  });

  const [sortBy, setSortBy] = useState(initialSort);
  const [viewMode, setViewMode] = useState(initialView);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  // Create registry compatibility layer
  const registry = useMemo(() => ({
    getNodeMetadata: (nodeType: string) => {
      const node = discoveredNodes.find(n => n.type === nodeType);
      return node?.metadata || {
        label: nodeType.split('::').pop() || nodeType,
        description: `${nodeType} node for CAD operations`,
        category: nodeType.split('::')[0] || 'General',
        tags: [nodeType.split('::')[0]?.toLowerCase() || 'general'],
        complexity: 'beginner' as const
      };
    }
  }), [discoveredNodes]);

  // Extract categories and tags from discovered nodes
  const allCategories = useMemo(() => Object.keys(categoryTree), [categoryTree]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    discoveredNodes.forEach(node => {
      if (node.metadata?.tags) {
        node.metadata.tags.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags);
  }, [discoveredNodes]);

  // Statistics
  const statistics = useMemo(() => ({
    totalNodes: nodeCount,
    totalCategories: allCategories.length,
    nodesByCategory: Object.fromEntries(
      Object.entries(categoryTree).map(([cat, data]) => [cat, data.nodes.length])
    ),
    discoveryStatus,
    errors
  }), [nodeCount, allCategories, categoryTree, discoveryStatus, errors]);

  // Enhanced filtering and search logic
  const filteredNodes = useMemo(() => {
    if (!isReady || discoveredNodes.length === 0) {
      return [];
    }

    // Start with search if query exists
    let filtered = searchQuery.trim() ? searchNodes(searchQuery) : [...discoveredNodes];

    // Apply category filter from sidebar selection
    if (selectedCategory) {
      filtered = filtered.filter(node => {
        const nodeCategory = node.metadata?.category || node.category;
        return nodeCategory === selectedCategory;
      });
    }

    // Apply additional category filters
    if (filters.categories.length > 0) {
      filtered = filtered.filter(node => {
        const nodeCategory = node.metadata?.category || node.category;
        return filters.categories.includes(nodeCategory);
      });
    }

    // Apply tag filters
    if (filters.tags.length > 0) {
      filtered = filtered.filter(node => {
        const nodeTags = node.metadata?.tags || [];
        return filters.tags.some(tag => nodeTags.includes(tag));
      });
    }

    // Apply complexity filters
    if (filters.complexity.length > 0) {
      filtered = filtered.filter(node => {
        const nodeComplexity = node.metadata?.complexity || 'beginner';
        return filters.complexity.includes(nodeComplexity);
      });
    }

    // Sort nodes
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name': {
          const aLabel = a.metadata?.label || a.type;
          const bLabel = b.metadata?.label || b.type;
          return aLabel.localeCompare(bLabel);
        }
        case 'category': {
          const aCategory = a.metadata?.category || a.category;
          const bCategory = b.metadata?.category || b.category;
          return aCategory.localeCompare(bCategory);
        }
        case 'recent':
          return 0; // TODO: Implement recent usage tracking
        case 'popularity':
          return 0; // TODO: Implement popularity tracking
        default: {
          const aLabel = a.metadata?.label || a.type;
          const bLabel = b.metadata?.label || b.type;
          return aLabel.localeCompare(bLabel);
        }
      }
    });

    return filtered;
  }, [isReady, discoveredNodes, searchQuery, searchNodes, selectedCategory, filters, sortBy]);

  // Category expansion helpers
  const toggleCategoryExpansion = (category: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  // Reset all filters and search
  const clearFilters = () => {
    setSearchQuery('');
    setFilters({
      categories: [],
      tags: [],
      complexity: [],
      showFavoritesOnly: false,
      showRecentOnly: false
    });
    setSelectedCategory(null);
  };

  return {
    // Registry compatibility
    registry,

    // Discovery status
    isReady,
    discoveryStatus,
    discoveryErrors: errors,

    // Data
    categoryTree,
    allCategories,
    allTags,
    statistics,

    // State
    searchQuery,
    filters,
    sortBy,
    viewMode,
    selectedCategory,
    expandedCategories,

    // Computed
    filteredNodes,
    filteredCount: filteredNodes.length,
    totalNodeCount: nodeCount,

    // Actions
    setSearchQuery,
    setFilters,
    setSortBy,
    setViewMode,
    setSelectedCategory,
    toggleCategoryExpansion,
    clearFilters
  };
}