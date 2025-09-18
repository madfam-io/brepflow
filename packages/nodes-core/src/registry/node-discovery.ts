/**
 * Dynamic Node Discovery System
 * Automatically discovers and registers all generated nodes
 */

import { EnhancedNodeRegistry } from './enhanced-node-registry';
import { NodeDefinition } from '@brepflow/types';

// Import the generated node registry containing all 907+ nodes
import { nodeRegistry } from '../nodes/generated/index.generated';

/**
 * Discovers and registers all available nodes
 */
export async function discoverAllNodes(): Promise<{
  registeredCount: number;
  categories: string[];
  statistics: any;
}> {
  const registry = EnhancedNodeRegistry.getInstance();

  console.log('🔍 Starting dynamic node discovery...');

  // Clear any existing registrations
  registry.clear();

  // Register all generated nodes
  const generatedNodes: NodeDefinition[] = Object.values(nodeRegistry);
  console.log(`📦 Found ${generatedNodes.length} generated nodes`);

  // Register nodes in batches for better performance
  const batchSize = 50;
  let registeredCount = 0;

  for (let i = 0; i < generatedNodes.length; i += batchSize) {
    const batch = generatedNodes.slice(i, i + batchSize);
    registry.registerNodes(batch);
    registeredCount += batch.length;

    // Log progress for large batches
    if (registeredCount % 100 === 0 || registeredCount === generatedNodes.length) {
      console.log(`📝 Registered ${registeredCount}/${generatedNodes.length} nodes`);
    }
  }

  // Get final statistics
  const statistics = registry.getStatistics();
  const categories = registry.getCategories();

  console.log('✅ Node discovery complete!');
  console.log(`📊 Registered ${statistics.totalNodes} nodes across ${statistics.totalCategories} categories`);
  console.log(`🏷️ Found ${statistics.totalTags} unique tags`);

  return {
    registeredCount: statistics.totalNodes,
    categories,
    statistics,
  };
}

/**
 * Get a summary of discovered nodes by category
 */
export function getNodeSummary(): Record<string, number> {
  const registry = EnhancedNodeRegistry.getInstance();
  const categories = registry.getCategories();

  return categories.reduce((summary, category) => {
    summary[category] = registry.getNodesByCategory(category).length;
    return summary;
  }, {} as Record<string, number>);
}

/**
 * Validate that all expected node categories are present
 */
export function validateNodeDiscovery(): {
  isValid: boolean;
  missingCategories: string[];
  statistics: any;
} {
  const registry = EnhancedNodeRegistry.getInstance();
  const statistics = registry.getStatistics();

  // Expected categories based on our template generation
  const expectedCategories = [
    'Architecture',
    'MechanicalEngineering',
    'Analysis',
    'Interoperability',
    'Algorithmic',
    'Features',
    'Solid',
    'Sketch',
    'Boolean',
    'Transform',
    'Manufacturing',
    'Assembly',
    'SheetMetal',
    'Advanced',
    'Surface',
    'Mesh',
    'Import',
    'Simulation',
    'Specialized',
    'Mathematics',
    'Data',
    'Fields',
    'Patterns',
    'Fabrication'
  ];

  const discoveredCategories = registry.getCategories();
  const missingCategories = expectedCategories.filter(
    cat => !discoveredCategories.includes(cat)
  );

  const isValid = missingCategories.length === 0 && statistics.totalNodes >= 1000;

  if (!isValid) {
    console.warn('⚠️ Node discovery validation failed:');
    if (missingCategories.length > 0) {
      console.warn(`Missing categories: ${missingCategories.join(', ')}`);
    }
    if (statistics.totalNodes < 1000) {
      console.warn(`Expected 1000+ nodes, found ${statistics.totalNodes}`);
    }
  } else {
    console.log('✅ Node discovery validation passed');
  }

  return {
    isValid,
    missingCategories,
    statistics,
  };
}

/**
 * Initialize the enhanced node registry with all available nodes
 */
export async function initializeNodeRegistry(): Promise<EnhancedNodeRegistry> {
  console.log('🚀 Initializing enhanced node registry...');

  // Discover and register all nodes
  const discoveryResult = await discoverAllNodes();

  // Validate the discovery
  const validation = validateNodeDiscovery();

  if (!validation.isValid) {
    console.error('❌ Node registry initialization failed validation');
    throw new Error(`Node discovery validation failed: ${validation.missingCategories.join(', ')}`);
  }

  console.log('🎉 Enhanced node registry initialized successfully!');
  console.log(`📊 Registry contains ${discoveryResult.registeredCount} nodes`);
  console.log(`📂 Organized into ${discoveryResult.categories.length} categories`);

  return EnhancedNodeRegistry.getInstance();
}

/**
 * Get registry status for debugging and monitoring
 */
export function getRegistryStatus(): {
  isInitialized: boolean;
  nodeCount: number;
  categoryCount: number;
  tagCount: number;
  lastUpdate: string;
} {
  const registry = EnhancedNodeRegistry.getInstance();
  const statistics = registry.getStatistics();

  return {
    isInitialized: statistics.totalNodes > 0,
    nodeCount: statistics.totalNodes,
    categoryCount: statistics.totalCategories,
    tagCount: statistics.totalTags,
    lastUpdate: new Date().toISOString(),
  };
}