
import { describe, it, expect } from 'vitest';
import { AdaptiveLayerHeightNode } from './adaptive-layer-height.node';
import { createTestContext } from '../test-utils';

describe('AdaptiveLayerHeightNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      model: undefined
    } as any;
    const params = {
      minHeight: 0.1,
      maxHeight: 0.3,
      quality: 0.5
    } as any;

    const result = await AdaptiveLayerHeightNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
