
import { describe, it, expect } from 'vitest';
import { RemoveFeaturesNode } from './removefeatures-node';
import { createTestContext } from '../test-utils';

describe('RemoveFeaturesNode', () => {
  it('should create RemoveFeatures', async () => {
    const context = createTestContext();
    const inputs = {
      shape: null
    };
    const params = {
      minSize: 0.5,
      removeHoles: true,
      removeFillets: false,
      removeChamfers: false
    };

    const result = await RemoveFeaturesNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.simplified).toBeDefined();
  });

  
});