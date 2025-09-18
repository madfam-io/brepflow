import { NodeRegistry } from '@brepflow/engine-core';

// Import core node definitions (only existing files)
import { sketchNodes } from './sketch';
import { parametricSketchNodes } from './sketch-parametric';
import { solidNodes } from './solid';
import { booleanNodes } from './boolean';
import { featureNodes } from './features';
import { transformNodes } from './transform';
import { ioNodes } from './io';
import { curveNodes } from './curves';
import { surfaceNodes } from './surfaces';
import { dataNodes } from './data';
import { analysisNodes } from './analysis';
import { assemblyNodes } from './assembly';
import { advancedSurfaceNodes } from './advanced-surfaces';
import { simulationNodes } from './simulation';
import * as advancedFilletNodes from './advanced-fillets';
import * as sheetMetalNodes from './sheet-metal';
import { advancedAssemblyNodes } from './assembly-advanced';

// Import enhanced registry system
import { EnhancedNodeRegistry } from './registry/enhanced-node-registry';
import { initializeNodeRegistry, getRegistryStatus } from './registry/node-discovery';

// Register all core nodes (legacy method)
export function registerCoreNodes(): void {
  const registry = NodeRegistry.getInstance();

  registry.registerNodes([
    ...sketchNodes,
    ...parametricSketchNodes,
    ...solidNodes,
    ...booleanNodes,
    ...featureNodes,
    ...transformNodes,
    ...ioNodes,
    ...curveNodes,
    ...surfaceNodes,
    ...dataNodes,
    ...analysisNodes,
    ...assemblyNodes,
    ...advancedSurfaceNodes,
    ...advancedAssemblyNodes,
    ...simulationNodes,
    ...Object.values(advancedFilletNodes),
    ...Object.values(sheetMetalNodes)
  ]);
}

// Enhanced registration with all 1012+ nodes
export async function registerAllNodes(): Promise<EnhancedNodeRegistry> {
  console.log('🚀 Registering all 1012+ nodes with enhanced registry...');

  // Initialize enhanced registry with all generated nodes
  const enhancedRegistry = await initializeNodeRegistry();

  // Also register legacy nodes for backward compatibility
  const legacyNodes = [
    ...sketchNodes,
    ...solidNodes,
    ...booleanNodes,
    ...featureNodes,
    ...transformNodes,
    ...ioNodes,
  ];

  enhancedRegistry.registerNodes(legacyNodes);

  const status = getRegistryStatus();
  console.log(`✅ Enhanced registry initialized with ${status.nodeCount} total nodes`);

  return enhancedRegistry;
}

// Get the enhanced registry instance
export function getEnhancedRegistry(): EnhancedNodeRegistry {
  return EnhancedNodeRegistry.getInstance();
}

// Export individual node categories (only existing modules)
export * from './sketch';
export * from './sketch-parametric';
export * from './solid';
export * from './boolean';
export * from './features';
export * from './transform';
export * from './io';
export * from './curves';
export * from './surfaces';
export * from './data';
export * from './analysis';
export * from './assembly';
export * from './advanced-surfaces';
export * from './simulation';
export * from './assembly-advanced';

// Export enhanced registry system
export * from './registry/enhanced-node-registry';
export * from './registry/node-discovery';
