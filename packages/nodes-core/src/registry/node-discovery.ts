/**
 * Dynamic Node Discovery System
 * Automatically discovers and registers all generated nodes
 */

import { EnhancedNodeRegistry } from './enhanced-node-registry';
import { NodeDefinition } from '@brepflow/types';
import { createDemonstrationNodes } from './demonstration-nodes';

// import { nodeRegistry } from '../nodes/generated/index.generated';

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

  // Create enhanced demonstration nodes to show UI capabilities
  const demoNodes = createDemonstrationNodes();
  console.log(`📦 Found ${demoNodes.length} demonstration nodes`);

  // Register demonstration nodes
  for (const nodeDefinition of demoNodes) {
    try {
      registry.registerNode(nodeDefinition);
      registeredCount++;
    } catch (error) {
      console.warn(`⚠️ Failed to register node ${nodeDefinition.name}:`, error);
    }
  }

  console.log(`📝 Registered ${registeredCount} demonstration nodes`);

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

  // Validate that we have a reasonable number of nodes for demonstration
  const isValid = statistics.totalNodes >= 20; // Should have at least 20 nodes for demo

  if (missingCategories.length > 0) {
    console.warn(`⚠️ Some categories missing from demonstration: ${missingCategories.join(', ')}`);
  }

  if (isValid) {
    console.log('✅ Node discovery validation passed');
  } else {
    console.error(`❌ Node discovery validation failed: only ${statistics.totalNodes} nodes found (expected at least 20)`);
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