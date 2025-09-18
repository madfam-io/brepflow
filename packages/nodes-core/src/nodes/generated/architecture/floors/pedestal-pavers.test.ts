
import { describe, it, expect } from 'vitest';
import { PedestalPaversNode } from './pedestalpavers-node';
import { createTestContext } from '../test-utils';

describe('PedestalPaversNode', () => {
  it('should create PedestalPavers', async () => {
    const context = createTestContext();
    const inputs = {
      area: null
    };
    const params = {
      paverSize: 600,
      pedestalHeight: 100
    };

    const result = await PedestalPaversNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.pavers).toBeDefined();
    expect(result.pedestals).toBeDefined();
  });

  
});