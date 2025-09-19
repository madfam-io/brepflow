
import { describe, it, expect } from 'vitest';
import { AdaptiveLayerHeightNode } from './adaptivelayerheight.node';
import { createTestContext } from './../../test-utils';

describe('AdaptiveLayerHeightNode', () => {
  it('should create AdaptiveLayerHeight', async () => {
    const context = createTestContext();
    const inputs = {
      model: null
    };
    const params = {
      minHeight: 0.1,
      maxHeight: 0.3,
      quality: 0.5
    };

    const result = await AdaptiveLayerHeightNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.layerHeights).toBeDefined();
  });

  
});