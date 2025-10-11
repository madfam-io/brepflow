
import { describe, it, expect } from 'vitest';
import { FoamStructureNode } from './foam-structure.node';
import { createTestContext } from '../test-utils';

describe('FoamStructureNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      container: undefined
    } as any;
    const params = {
      bubbleCount: 50,
      sizeVariation: 0.5
    } as any;

    const result = await FoamStructureNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
