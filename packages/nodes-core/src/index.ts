import { NodeRegistry } from '@brepflow/engine-core';

// Import node definitions
import { sketchNodes } from './sketch';
import { solidNodes } from './solid';
import { booleanNodes } from './boolean';
import { featureNodes } from './features';
import { transformNodes } from './transform';
import { ioNodes } from './io';
import { curveNodes } from './curves';
import { surfaceNodes } from './surfaces';
import { dataNodes } from './data';
import { analysisNodes } from './analysis';

// Register all core nodes
export function registerCoreNodes(): void {
  const registry = NodeRegistry.getInstance();

  registry.registerNodes([
    ...sketchNodes,
    ...solidNodes,
    ...booleanNodes,
    ...featureNodes,
    ...transformNodes,
    ...ioNodes,
    ...curveNodes,
    ...surfaceNodes,
    ...dataNodes,
    ...analysisNodes,
  ]);
}

// Export individual node categories
export * from './sketch';
export * from './solid';
export * from './boolean';
export * from './features';
export * from './transform';
export * from './io';
export * from './curves';
export * from './surfaces';
export * from './data';
export * from './analysis';