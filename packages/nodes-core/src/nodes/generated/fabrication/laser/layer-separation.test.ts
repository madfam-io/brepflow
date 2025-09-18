
import { describe, it, expect } from 'vitest';
import { LayerSeparationNode } from './layerseparation-node';
import { createTestContext } from '../test-utils';

describe('LayerSeparationNode', () => {
  it('should create LayerSeparation', async () => {
    const context = createTestContext();
    const inputs = {
      drawing: /* test value */
    };
    const params = {
      separateBy: "color"
    };

    const result = await LayerSeparationNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.layers).toBeDefined();
  });

  
});