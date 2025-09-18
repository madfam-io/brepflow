
import { describe, it, expect } from 'vitest';
import { FoamStructureNode } from './foamstructure-node';
import { createTestContext } from '../test-utils';

describe('FoamStructureNode', () => {
  it('should create FoamStructure', async () => {
    const context = createTestContext();
    const inputs = {
      container: /* test value */
    };
    const params = {
      bubbleCount: 50,
      sizeVariation: 0.5
    };

    const result = await FoamStructureNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.foam).toBeDefined();
  });

  
});